import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from "@nestjs/graphql";
import { Match, MatchShooter, MatchStage, MatchStuff } from "./match.entity";
import { Club } from "src/clubs/club.entity";
import { MatchesService } from "./matches.service";
import { CreateMatchArgs, MatchesArgs, UpdateMatchArgs } from "./matches.dto";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard } from "src/auth/auth.guard";
import { User } from "src/users/user.entity";
import {
	Action,
	CaslAbilityFactory,
} from "src/casl/casl-ability.factory/casl-ability.factory";

@Resolver(() => Match)
export class MatchesResolver {
	constructor(
		private readonly matchesService: MatchesService,
		private readonly ability: CaslAbilityFactory,
	) {}

	@Query(() => Match)
	async match(@Args("id", { type: () => Int }) id: number) {
		return await this.matchesService.findOneById(id);
	}

	@Query(() => [Match])
	async matches(@Args() args: MatchesArgs) {
		return await this.matchesService.findAll(args);
	}

	@Mutation(() => Match)
	@UseGuards(JwtAuthGuard)
	async createMatch(@Args() match: CreateMatchArgs) {
		return this.matchesService.create(match);
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async updateMatch(
		@Args("id", { type: () => Int }) id: number,
		@Args() match: UpdateMatchArgs,
		@CurrentUser() user: User,
	) {
		console.log(user,(await this.matchesService.findOneById(id, ["stuffs"]))!);
		if (
			this.ability
				.createForUser(user)
				.can(
					Action.Update,
					(await this.matchesService.findOneById(id, ["stuffs"]))!,
				)
		)
			return this.matchesService.update(id, match);
		throw new UnauthorizedException();
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async removeMatch(
		@Args("id", { type: () => Int }) id: number,
		@CurrentUser() user: User,
	) {
		if (
			this.ability
				.createForUser(user)
				.can(
					Action.Delete,
					(await this.matchesService.findOneById(id, ["stuffs"]))!,
				)
		)
			return await this.matchesService.remove(id);
		throw new UnauthorizedException();
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async finishMatch(
		@Args("id", { type: () => Int }) id: number,
		@CurrentUser() user: User,
	) {
		if (
			this.ability
				.createForUser(user)
				.can(
					Action.Update,
					(await this.matchesService.findOneById(id, ["stuffs"]))!,
				)
		)
			return await this.matchesService.finish(id);
		throw new UnauthorizedException();
	}

	@ResolveField(() => Club, { nullable: true })
	async hostClub(@Parent() match: Match) {
		return await this.matchesService.resolve<Club>(match.id, "hostClub");
	}

	@ResolveField(() => [MatchStage])
	async stages(@Parent() match: Match) {
		return await this.matchesService.resolve<MatchStage>(
			match.id,
			"stages",
		);
	}

	@ResolveField(() => [MatchShooter])
	async shooters(@Parent() match: Match) {
		return await this.matchesService.resolve<MatchShooter>(
			match.id,
			"shooters",
		);
	}

	@ResolveField(() => [MatchStuff])
	async stuffs(@Parent() match: Match) {
		return await this.matchesService.resolve<MatchStuff>(
			match.id,
			"stuffs",
		);
	}
}
