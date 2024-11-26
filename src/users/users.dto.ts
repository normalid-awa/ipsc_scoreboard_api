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

@ArgsType()
export class UsersArgs extends CreatePaginationArgs(200) {}
