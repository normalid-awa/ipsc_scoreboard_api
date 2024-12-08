import { Resolver } from "@nestjs/graphql";
import { StagesService } from "./stages.service";

@Resolver()
export class StagesResolver {
	constructor(private readonly stagesService: StagesService) {}

	async stages() {}

	async stage() {}

	async createStage() {}

	async updateStage() {}

	async removeStage() {}
}
