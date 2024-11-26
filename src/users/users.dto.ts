import { ArgsType, Field } from "@nestjs/graphql";
import { User } from "./user.entity";
import { CreatePaginationArgs } from "src/types";
import { IsEmail, IsStrongPassword } from "class-validator";
import { SecurityConfig } from "config/security.config";

@ArgsType()
export class NewUserArgs implements Pick<User, "name" | "email"> {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsStrongPassword(SecurityConfig)
	password: string;
}

@ArgsType()
export class UpdateUserArgs implements Partial<NewUserArgs> {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	@IsEmail()
	email?: string;
}

@ArgsType()
export class UsersArgs extends CreatePaginationArgs(200) {}

export enum UserEvents {
	USER_CREATED = "USER_CREATED",
	USER_UPDATED = "USER_UPDATED",
	USER_REMOVED = "USER_DELETED",
}
