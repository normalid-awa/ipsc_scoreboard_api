import {
	ArgsType,
	Field,
	GraphQLISODateTime,
	InputType,
	Int,
	PartialType,
} from "@nestjs/graphql";
import { Match, StuffPosition } from "./match.entity";
import { Sport } from "src/shooters/shooter.entity";
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsInt,
	IsOptional,
	IsUrl,
} from "class-validator";
import { CreatePaginationArgs } from "src/types";

@InputType()
export class CreateMatchStuffInput {
	@Field(() => Int)
	@IsInt()
	user: number;

	@Field(() => StuffPosition)
	@IsEnum(StuffPosition)
	position: StuffPosition;
}

@ArgsType()
export class CreateMatchArgs
	implements
		Pick<
			Match,
			"name" | "description" | "url" | "date" | "sport" | "isPublic"
		>
{
	@Field()
	@IsUrl()
	url: string;

	@Field(() => GraphQLISODateTime)
	@IsDate()
	date: Date;

	@Field(() => Sport)
	@IsEnum(Sport)
	sport: Sport;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	hostClub?: number;

	@Field()
	@IsBoolean()
	isPublic: boolean;

	@Field(() => [Int])
	@IsInt({ each: true })
	stages: number[];

	@Field(() => [Int])
	@IsInt({ each: true })
	shooters: number[];

	@Field(() => [CreateMatchStuffInput])
	stuffs: CreateMatchStuffInput[];

	@Field(() => [String])
	classifications: string[];

	@Field(() => [String])
	divisions: string[];
}

@ArgsType()
export class UpdateMatchArgs extends PartialType(CreateMatchArgs) {}

@ArgsType()
export class MatchesArgs extends CreatePaginationArgs() {}
