import { Logger, NotFoundException, UseGuards } from "@nestjs/common";
import { User } from "./user.entity";
import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
	Subscription,
} from "@nestjs/graphql";
import { UsersService } from "./users.service";
import {
	CreateUserArgs,
	UpdateUserArgs,
	UserEvents,
	UsersArgs,
} from "./users.dto";
import { PubSub } from "graphql-subscriptions";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { Shooter } from "src/shooters/shooter.entity";
import { CheckPolicies, PoliciesGuard } from "src/casl/policies.guard";
import { Action } from "src/casl/casl-ability.factory/casl-ability.factory";

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	async user(@Args("id", { type: () => Int }) id: number): Promise<User> {
		const user = await this.usersService.findOneById(id);
		if (!user) {
			throw new NotFoundException(id);
		}
		return user;
	}

	@Query(() => [User])
	users(@Args() recipesArgs: UsersArgs): Promise<User[]> {
		return this.usersService.findAll(recipesArgs);
	}

	@Mutation(() => User)
	@UseGuards(JwtAuthGuard, PoliciesGuard)
	async createUser(@Args() newUserData: CreateUserArgs): Promise<User> {
		const user = await this.usersService.create(newUserData);
		pubSub.publish(UserEvents.USER_CREATED, { userAdded: user });
		return user;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard, PoliciesGuard)
	@CheckPolicies((ability) => ability.can(Action.Update, User))
	async updateUser(
		@Args("id", { type: () => Int }) id: number,
		@Args() newUserData: UpdateUserArgs,
	): Promise<boolean> {
		const user = await this.usersService.update(id, newUserData);
		if (user) {
			pubSub.publish(UserEvents.USER_UPDATED, { userUpdated: id });
		}
		return user;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard, PoliciesGuard)
	@CheckPolicies((ability) => ability.can(Action.Delete, User))
	async removeUser(@Args("id", { type: () => Int }) id: number) {
		pubSub.publish(UserEvents.USER_REMOVED, id);
		const user = await this.usersService.remove(id);
		if (user) {
			pubSub.publish(UserEvents.USER_REMOVED, { userRemoved: id });
		}
		return user;
	}

	@Subscription(() => User)
	userAdded() {
		return pubSub.asyncIterableIterator(UserEvents.USER_CREATED);
	}

	@Subscription(() => Int)
	userUpdated() {
		return pubSub.asyncIterableIterator(UserEvents.USER_UPDATED);
	}

	@Subscription(() => Int)
	userRemoved() {
		return pubSub.asyncIterableIterator(UserEvents.USER_REMOVED);
	}

	@ResolveField(() => Shooter)
	async shooter(@Parent() user: User) {
		if (!user.shooterId) {
			return null;
		}
		return this.usersService.resolveShooter(user.shooterId);
	}
}
