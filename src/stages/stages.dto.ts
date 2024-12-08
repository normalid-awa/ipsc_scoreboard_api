import { ArgsType, PartialType, PickType } from "@nestjs/graphql";
import { Stage } from "./stage.entity";
import { CreatePaginationArgs } from "src/types";

@ArgsType()
export class CreateStageArgs extends PickType(Stage, [
	"briefing",
	"walkthroughTime",
	"popper",
	"noShooots",
	"name",
	"designerId",
	"paperTargetsId",
]) {}

@ArgsType()
export class UpdateStageArgs extends PartialType(CreateStageArgs) {}

@ArgsType()
export class StagesArgs extends CreatePaginationArgs() {}
