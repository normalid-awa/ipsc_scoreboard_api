import { ArgsType, Field, PartialType } from "@nestjs/graphql";
import { Shooter } from "./shooter.entity";
import { CreatePaginationArgs } from "src/types";

@ArgsType()
export class ShootersArgs extends CreatePaginationArgs(200) {}

@ArgsType()
export class CreateShooterArgs
	implements Pick<Shooter, "firstName" | "lastName">
{
	@Field()
	firstName: string;

	@Field()
	lastName: string;
}

@ArgsType()
export class UpdateShooterArgs extends PartialType(CreateShooterArgs) {}
