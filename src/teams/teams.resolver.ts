import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from "@nestjs/graphql";
import { TeamsService } from "./teams.service";
import { CreateTeamArgs, TeamsArgs, UpdateTeamArgs } from "./teams.dto";
import { Team } from "./team.entity";
import { User } from "src/users/user.entity";

@Resolver(() => Team)
export class TeamsResolver {
	constructor(private readonly teamsService: TeamsService) {}

	@Query(() => [Team])
	async teams(@Args() pagination: TeamsArgs) {
		return await this.teamsService.findAll(pagination);
	}

	@Query(() => Team)
	async team(@Args("id", { type: () => Int }) id: number) {
		return await this.teamsService.findOneById(id);
	}

	@Mutation(() => Team)
	async createTeam(@Args() data: CreateTeamArgs) {
		return await this.teamsService.create(data);
	}

	@Mutation(() => Boolean)
	async updateTeam(
		@Args("id", { type: () => Int }) id: number,
		@Args() data: UpdateTeamArgs,
	) {
		return await this.teamsService.update(id, data);
	}

	@Mutation(() => Boolean)
	async removeTeam(@Args("id", { type: () => Int }) id: number) {
		return await this.teamsService.remove(id);
	}

	@ResolveField(() => User)
	async owner(@Parent() team: Team) {
		if (!team.owner) {
			return null;
		}
		return this.teamsService.resolveOwner(team.ownerId);
	}
}
