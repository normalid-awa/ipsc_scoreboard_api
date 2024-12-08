import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from "@nestjs/graphql";
import { StagesService } from "./stages.service";
import { PaperTarget, Stage, StageAttachment } from "./stage.entity";
import { CreateStageArgs, StagesArgs, UpdateStageArgs } from "./stages.dto";
import { User } from "src/users/user.entity";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard } from "src/auth/auth.guard";
import {
	Action,
	CaslAbilityFactory,
} from "src/casl/casl-ability.factory/casl-ability.factory";

@Resolver(() => Stage)
export class StagesResolver {
	constructor(
		private readonly stagesService: StagesService,
		private readonly ability: CaslAbilityFactory,
	) {}

	@Query(() => [Stage])
	async stages(@Args() args: StagesArgs) {
		return await this.stagesService.findAll(args);
	}

	@Query(() => Stage)
	async stage(@Args("id", { type: () => Int }) id: number) {
		return await this.stagesService.findOneById(id);
	}

	@Mutation(() => Stage)
	@UseGuards(JwtAuthGuard)
	async createStage(
		@Args() data: CreateStageArgs,
		@CurrentUser() user: User,
	) {
		if (this.ability.createForUser(user).can(Action.Create, Stage))
			return await this.stagesService.create(data);
		throw new UnauthorizedException();
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async updateStage(
		@Args("id", { type: () => Int }) id: number,
		@Args() data: UpdateStageArgs,
		@CurrentUser() user: User,
	) {
		if (this.ability.createForUser(user).can(Action.Update, Stage))
			return await this.stagesService.update(id, data);
		throw new UnauthorizedException();
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async removeStage(
		@Args("id", { type: () => Int }) id: number,
		@CurrentUser() user: User,
	) {
		if (this.ability.createForUser(user).can(Action.Delete, Stage))
			return await this.stagesService.remove(id);
		throw new UnauthorizedException();
	}

	@ResolveField(() => StageAttachment)
	async attachments(@Parent() stage: Stage) {
		return this.stagesService.resolveAttachments(stage);
	}

	@ResolveField(() => [PaperTarget])
	async paperTargets(@Parent() stage: Stage) {
		return this.stagesService.resolvePaperTargets(stage);
	}

	@ResolveField(() => User)
	async designer(@Parent() stage: Stage) {
		return this.stagesService.resolveDesigner(stage);
	}
}
