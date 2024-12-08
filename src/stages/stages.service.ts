import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaperTarget, Stage, StageAttachment } from "./stage.entity";
import { Equal, Repository } from "typeorm";
import { CreateStageArgs, StagesArgs, UpdateStageArgs } from "./stages.dto";
import { File } from "src/files/file.entity";

@Injectable()
export class StagesService {
	constructor(
		@InjectRepository(Stage)
		private readonly stageRepository: Repository<Stage>,
	) {}

	async create(data: CreateStageArgs) {
		const paperTargets = data.paperTargets.map((target) => {
			const paperTarget = new PaperTarget();
			paperTarget.name = target.name;
			paperTarget.requiredHits = target.requiredHits;
			return paperTarget;
		});

		const attachments = data.attachments.map((attachment) => {
			const stageAttachment = new StageAttachment();
			stageAttachment.file = { id: attachment } as File;
			return stageAttachment;
		});

		return await this.stageRepository.save(
			{
				name: data.name,
				briefing: data.briefing,
				designer: {
					id: data.designer,
				},
				attachments: attachments,
				noShooots: data.noShooots,
				popper: data.popper,
				paperTargets: paperTargets,
				walkthroughTime: data.walkthroughTime,
			},
			{ reload: true, transaction: true },
		);
	}

	async findOneById(id: number) {
		return await this.stageRepository.findOneBy({ id: Equal(id) });
	}

	async findAll(args: StagesArgs) {
		return await this.stageRepository.find({
			skip: args.skip,
			take: args.take,
		});
	}

	async update(id: number, data: UpdateStageArgs) {
		const stage = await this.stageRepository.findOneBy({ id: Equal(id) });
		if (!stage) return false;

		let attachments = {};
		if (data.attachments !== undefined) {
			attachments = {
				attachments: (data.attachments || []).map((attachment) => {
					const stageAttachment = new StageAttachment();
					stageAttachment.file = { id: attachment } as File;
					return stageAttachment;
				}),
			};
		}

		let paperTargets = {};
		if (data.paperTargets !== undefined) {
			paperTargets = {
				paperTargets: (data.paperTargets || []).map((target) => {
					const paperTarget = new PaperTarget();
					paperTarget.name = target.name;
					paperTarget.requiredHits = target.requiredHits;
					return paperTarget;
				}),
			};
		}

		let designer = {};
		if (data.designer !== undefined) {
			designer = {
				designer: {
					id: data.designer,
				},
			};
		}

		return new Boolean(
			await this.stageRepository.save({
				id,
				name: data.name,
				briefing: data.briefing,
				noShooots: data.noShooots,
				popper: data.popper,
				walkthroughTime: data.walkthroughTime,
				...attachments,
				...paperTargets,
				...designer,
			}),
		);
	}

	async remove(id: number) {
		return (
			((await this.stageRepository.delete({ id: Equal(id) })).affected ||
				0) > 0
		);
	}

	async resolveAttachments(stage: Stage) {
		return (
			(
				await this.stageRepository.findOne({
					where: { id: Equal(stage.id) },
					relations: {
						attachments: true,
					},
				})
			)?.attachments || []
		);
	}

	async resolvePaperTargets(stage: Stage) {
		return (
			(
				await this.stageRepository.findOne({
					where: { id: Equal(stage.id) },
					relations: {
						paperTargets: true,
					},
				})
			)?.paperTargets || []
		);
	}

	async resolveDesigner(stage: Stage) {
		return (
			(
				await this.stageRepository.findOne({
					where: { id: Equal(stage.id) },
					relations: {
						designer: true,
					},
				})
			)?.designer || {}
		);
	}
}
