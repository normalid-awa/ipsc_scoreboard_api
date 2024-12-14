import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from "@nestjs/graphql";
import { ClubsService } from "./clubs.service";
import { CreateClubArgs, ClubsArgs, UpdateClubArgs } from "./clubs.dto";
import { Club } from "./club.entity";
import { User } from "src/users/user.entity";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard } from "src/auth/auth.guard";
import {
	Action,
	CaslAbilityFactory,
} from "src/casl/casl-ability.factory/casl-ability.factory";
import { Shooter } from "src/shooters/shooter.entity";

@Resolver(() => Club)
export class ClubsResolver {
	constructor(
		private readonly clubsServices: ClubsService,
		private readonly ability: CaslAbilityFactory,
	) {}

	@Query(() => [Club])
	async clubs(@Args() pagination: ClubsArgs) {
		return await this.clubsServices.findAll(pagination);
	}

	@Query(() => Club)
	async club(@Args("id", { type: () => Int }) id: number) {
		return await this.clubsServices.findOneById(id);
	}

	@Mutation(() => Club)
	async createClub(@Args() data: CreateClubArgs) {
		return await this.clubsServices.create(data);
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async updateClub(
		@Args("id", { type: () => Int }) id: number,
		@Args() data: UpdateClubArgs,
		@CurrentUser() user: User,
	) {
		if (
			!(await this.ability.validateUserAbility(
				user,
				async () => await this.clubsServices.findOneById(id),
				Action.Update,
			))
		)
			throw new UnauthorizedException();
		return await this.clubsServices.update(id, data);
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async removeClub(
		@Args("id", { type: () => Int }) id: number,
		@CurrentUser() user: User,
	) {
		if (
			!(await this.ability.validateUserAbility(
				user,
				async () => await this.clubsServices.findOneById(id),
				Action.Delete,
			))
		)
			throw new UnauthorizedException();
		return await this.clubsServices.remove(id);
	}

	@ResolveField(() => User)
	async owner(@Parent() club: Club) {
		return await this.clubsServices.resolve(club.id, "owner") as User;
	}

	@ResolveField(() => [Shooter], { nullable: true })
	async members(@Parent() club: Club) {
		return await this.clubsServices.resolve(club.id, "members") as Shooter[];
	}
}
