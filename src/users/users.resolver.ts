import { Logger, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { NewUserInput, UsersArgs } from "./users.dto";

@Resolver(() => User)
export class UsersResolver {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	async user(@Args("id") id: string): Promise<User> {
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
		const recipe = await this.usersService.create(newUserData);
		// pubSub.publish("recipeAdded", { recipeAdded: recipe });
		return recipe;
	}

	@Mutation(() => Boolean)
	async removeUser(@Args("id") id: string) {
		return this.usersService.remove(id);
	}

	@Subscription(() => User)
	userAdded() {
		// return pubSub.asyncIterator("uesrAdded");
	}
}
