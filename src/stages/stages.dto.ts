import { ArgsType, Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreatePaginationArgs } from "src/types";
import { PaperTarget, Stage } from "./stage.entity";
import { IsInt, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateStagePaperTargetInput
	implements Pick<PaperTarget, "name" | "requiredHits">
{
	@Field()
	@IsString()
	name: string;

	@Field(() => Int)
	@IsInt()
	requiredHits: number;
}

@ArgsType()
export class CreateStageArgs
	implements
		Pick<
			Stage,
			"briefing" | "name" | "noShooots" | "popper" | "walkthroughTime"
		>
{
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsString()
	briefing: string;

	@Field(() => [String])
	attachments: string[];

	@Field(() => Int)
	@IsInt()
	designer: number;

	@Field(() => Int)
	@IsInt()
	noShooots: number;

	@Field(() => [CreateStagePaperTargetInput])
	paperTargets: CreateStagePaperTargetInput[];

	@Field(() => Int)
	@IsInt()
	popper: number;

	@Field()
	@IsNumber()
	walkthroughTime: number;
}

@ArgsType()
export class UpdateStageArgs extends PartialType(CreateStageArgs) {}

@ArgsType()
export class StagesArgs extends CreatePaginationArgs() {}
