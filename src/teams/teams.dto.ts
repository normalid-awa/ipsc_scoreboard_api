import { ArgsType, Field, Int, PartialType } from "@nestjs/graphql";
import { Team } from "./team.entity";
import { IsInt, IsOptional, IsString } from "class-validator";
import { CreatePaginationArgs } from "src/types";

@ArgsType()
export class CreateTeamArgs
	implements Omit<Team, "id" | "createdAt" | "owner">
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
export class UpdateTeamArgs extends PartialType(CreateTeamArgs) {}

@ArgsType()
export class TeamsArgs extends CreatePaginationArgs() {}
