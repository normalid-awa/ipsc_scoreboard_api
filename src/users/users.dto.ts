import { ArgsType, Field, Int, OmitType, PartialType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { CreatePaginationArgs } from "src/types";
import {
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	IsStrongPassword,
} from "class-validator";
import securityConfig from "config/security.config";

@ArgsType()
export class CreateUserArgs implements Pick<User, "name" | "email"> {
	@Field()
	@IsString()
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
	shooter?: number;
}

@ArgsType()
export class UpdateUserArgs extends PartialType(
	OmitType(CreateUserArgs, ["password"]),
) {}

@ArgsType()
export class UsersArgs extends CreatePaginationArgs(200) {}

export enum UserEvents {
	USER_CREATED = "USER_CREATED",
	USER_UPDATED = "USER_UPDATED",
	USER_REMOVED = "USER_DELETED",
}
