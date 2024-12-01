import { ArgsType, Field, Int } from "@nestjs/graphql";
import { User } from "./user.entity";
import { CreatePaginationArgs } from "src/types";
import { IsEmail, IsInt, IsOptional, IsStrongPassword } from "class-validator";
import securityConfig from "config/security.config";

@ArgsType()
export class CreateUserArgs implements Pick<User, "name" | "email"> {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsStrongPassword(securityConfig)
	password: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	shooter: number;
}

@ArgsType()
export class UpdateUserArgs implements Partial<CreateUserArgs> {
	@Field({ nullable: true })
	@IsOptional()
	name?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsEmail()
	email?: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	shooter?: number;
}

@ArgsType()
export class UsersArgs extends CreatePaginationArgs(200) {}

export enum UserEvents {
	USER_CREATED = "USER_CREATED",
	USER_UPDATED = "USER_UPDATED",
	USER_REMOVED = "USER_DELETED",
}
