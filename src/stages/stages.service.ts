import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "./stage.entity";
import { Repository } from "typeorm";
import { CreateStageArgs, UpdateStageArgs } from "./stages.dto";

@Injectable()
export class StagesService {
	constructor(
		@InjectRepository(Stage)
		private readonly stageRepository: Repository<Stage>,
	) {}

	async create(data: CreateStageArgs) {}

	async findOneById(id: number) {}

	async findAll() {}

	async update(id: number, data: UpdateStageArgs) {}

	async remove() {}
}
