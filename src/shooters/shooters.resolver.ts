import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from "@nestjs/graphql";
import { Shooter } from "./shooter.entity";
import { ShootersService } from "./shooters.service";
import { NotFoundException, UseGuards } from "@nestjs/common";
import {
	CreateShooterArgs,
	ShootersArgs,
	UpdateShooterArgs,
} from "./shooters.dto";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CheckPolicies, PoliciesGuard } from "src/casl/policies.guard";
import { Action } from "src/casl/casl-ability.factory/casl-ability.factory";
import { Club } from "src/clubs/club.entity";
import { User } from "src/users/user.entity";

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
	@UseGuards(JwtAuthGuard, PoliciesGuard)
	@CheckPolicies((ability) => ability.can(Action.Create, Shooter))
	async createShooter(@Args() data: CreateShooterArgs) {
		return await this.shooterService.create(data);
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard, PoliciesGuard)
	@CheckPolicies((ability) => ability.can(Action.Update, Shooter))
	async updateShooter(
		@Args("id", { type: () => Int }) id: number,
		@Args() data: UpdateShooterArgs,
	) {
		return await this.shooterService.update(id, data);
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard, PoliciesGuard)
	@CheckPolicies((ability) => ability.can(Action.Delete, Shooter))
	async removeShooter(@Args("id", { type: () => Int }) id: number) {
		return await this.shooterService.remove(id);
	}

	@ResolveField(() => Club, { nullable: true })
	async club(@Parent() shooter: Shooter) {
		return await this.shooterService.resolveClub(shooter);
	}

	@ResolveField(() => User)
	async owner(@Parent() shooter: Shooter) {
		return await this.shooterService.resolveOwner(shooter);
	}
}
