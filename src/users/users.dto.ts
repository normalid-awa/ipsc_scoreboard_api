import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { CreatePaginationArgs } from "src/types";
import { IsEmail, IsStrongPassword } from "class-validator";

@InputType()
export class NewUserInput implements Pick<User, "name" | "email"> {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsStrongPassword()
	password: string;
}

@InputType()
export class UpdateUserInput implements Partial<NewUserInput> {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	@IsEmail()
	email?: string;

	@Field({ nullable: true })
	password?: string;
}

@ArgsType()
export class UsersArgs extends CreatePaginationArgs(200) {}

export enum UserEvents {
	USER_CREATED = "USER_CREATED",
	USER_UPDATED = "USER_UPDATED",
	USER_REMOVED = "USER_DELETED",
}
