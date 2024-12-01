import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Shooter } from "./shooter.entity";
import { ShootersService } from "./shooters.service";
import { NotFoundException } from "@nestjs/common";
import {
	NewShooterArgs,
	ShootersArgs,
	UpdateShooterArgs,
} from "./shooters.dto";

@Resolver(() => Shooter)
export class ShootersResolver {
	constructor(private readonly shooterService: ShootersService) {}

	@Query(() => Shooter)
	async shooter(@Args("id", { type: () => Int }) id: number) {
		const shooter = await this.shooterService.fineOneById(id);
		if (!shooter) {
			throw new NotFoundException(id);
		}
		return shooter;
	}

	@Query(() => [Shooter])
	async shooters(@Args() args: ShootersArgs) {
		return await this.shooterService.findAll(args);
	}

	@Mutation(() => Shooter)
	async createShooter(@Args() data: NewShooterArgs) {
		return await this.shooterService.create(data);
	}

	@Mutation(() => Boolean)
	async updateShooter(
		@Args("id", { type: () => Int }) id: number,
		@Args() data: UpdateShooterArgs,
	) {
		return await this.shooterService.update(id, data);
	}

	@Mutation(() => Boolean)
	async removeShooter(@Args("id", { type: () => Int }) id: number) {
		return await this.shooterService.remove(id);
	}
}
