import { ArgsType, Field, Int, PartialType } from "@nestjs/graphql";
import { Club } from "./club.entity";
import { IsInt, IsOptional, IsString } from "class-validator";
import { CreatePaginationArgs } from "src/types";

@ArgsType()
export class CreateClubArgs
	implements Omit<Club, "id" | "createdAt" | "owner">
{
	@Field()
	@IsString()
	name: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	description?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	url?: string;

	@Field(() => Int)
	@IsInt()
	ownerId: number;
}

@ArgsType()
export class UpdateClubArgs extends PartialType(CreateClubArgs) {}

@ArgsType()
export class ClubsArgs extends CreatePaginationArgs() {}
