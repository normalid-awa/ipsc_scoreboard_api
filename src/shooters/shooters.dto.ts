import { ArgsType, Field, Int, PartialType } from "@nestjs/graphql";
import { Shooter, Sport } from "./shooter.entity";
import { CreatePaginationArgs } from "src/types";
import { IsEnum, IsInt, IsOptional } from "class-validator";

@ArgsType()
export class ShootersArgs extends CreatePaginationArgs(200) {}

@ArgsType()
export class CreateShooterArgs
	implements Pick<Shooter, "firstName" | "lastName" | "sport">
{
	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field(() => Int, { nullable: true })
	@IsInt()
	@IsOptional()
	owner?: number;

	@Field(() => Sport)
	@IsEnum(Sport)
	sport: Sport;
}

@ArgsType()
export class UpdateShooterArgs extends PartialType(CreateShooterArgs) {}
