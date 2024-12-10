import { ArgsType, Field, OmitType, PartialType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { CreatePaginationArgs } from "src/types";
import {
	IsEmail, IsString,
	IsStrongPassword
} from "class-validator";
import securityConfig from "config/security.config";

@ArgsType()
export class CreateUserArgs
	implements
		Omit<
			User,
			| "hashedPassword"
			| "id"
			| "verified"
			| "isSystemAdmin"
			| "createdAt"
		>
{
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsStrongPassword(securityConfig)
	password: string;
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
