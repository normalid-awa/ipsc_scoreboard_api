import { Logger, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import {
	Args,
	Int,
	Mutation,
	Query,
	Resolver,
	Subscription,
} from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { NewUserInput, UpdateUserInput, UserEvents, UsersArgs } from "./users.dto";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	async user(@Args("id", { type: () => Int }) id: number): Promise<User> {
		const recipe = await this.usersService.findOneById(id);
		if (!recipe) {
			throw new NotFoundException(id);
		}
		return recipe;
	}

	@Query(() => [User])
	users(@Args() recipesArgs: UsersArgs): Promise<User[]> {
		return this.usersService.findAll(recipesArgs);
	}

	@Mutation(() => User)
	async createUser(
		@Args("newUserData") newUserData: NewUserInput,
	): Promise<User> {
		const user = await this.usersService.create(newUserData);
		pubSub.publish(UserEvents.USER_CREATED, { userAdded: user });
		return user;
	}

	@Mutation(() => Boolean)
	async updateUser(
		@Args("id", { type: () => Int }) id: number,
		@Args("newUserData") newUserData: UpdateUserInput,
	): Promise<boolean> {
		const user = await this.usersService.update(id, newUserData);
		if (user) {
			pubSub.publish(UserEvents.USER_UPDATED, { userUpdated: id });
		}
		return user;
	}

	@Mutation(() => Boolean)
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
}
