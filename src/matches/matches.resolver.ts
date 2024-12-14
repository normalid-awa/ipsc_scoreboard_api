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

@Resolver(() => Match)
export class MatchesResolver {
	constructor(private readonly matchesService: MatchesService) {}

	@Query(() => Match)
	async match(@Args("id", { type: () => Int }) id: number) {
		return await this.matchesService.findOneById(id);
	}

	@Query(() => [Match])
	async matches(@Args() args: MatchesArgs) {
		return await this.matchesService.findAll(args);
	}

	@Mutation(() => Match)
	async createMatch(@Args() match: CreateMatchArgs) {
		return this.matchesService.create(match);
	}

	@Mutation(() => Boolean)
	async updateMatch(
		@Args("id", { type: () => Int }) id: number,
		@Args() match: UpdateMatchArgs,
	) {
		return this.matchesService.update(id, match);
	}

	@Mutation(() => Boolean)
	async removeMatch(@Args("id", { type: () => Int }) id: number) {
		return await this.matchesService.remove(id);
	}

	@Mutation(() => Boolean)
	async finishMatch(@Args("id", { type: () => Int }) id: number) {
		return await this.matchesService.finish(id);
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
