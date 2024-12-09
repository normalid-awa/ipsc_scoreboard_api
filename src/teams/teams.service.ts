import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Equal, Repository } from "typeorm";
import { CreateTeamArgs, TeamsArgs, UpdateTeamArgs } from "./teams.dto";

@Injectable()
export class TeamsService {
	constructor(
		@InjectRepository(Team)
		private readonly teamRepository: Repository<Team>,
	) {}

	async findOneById(id: number) {
		return await this.teamRepository.findOne({ where: { id: Equal(id) } });
	}

	async findAll(pagination: TeamsArgs) {
		return await this.teamRepository.find({
			skip: pagination.skip,
			take: pagination.take,
		});
	}

	async create(data: CreateTeamArgs) {
		return await this.teamRepository.save(
			{
				name: data.name,
				description: data.description,
				url: data.url,
				owner: {
					id: data.ownerId,
				},
			},
			{ reload: true },
		);
	}

	async update(id: number, data: UpdateTeamArgs) {
		let ownerParam = {};
		if (data.ownerId !== undefined) {
			ownerParam = { owner: { id: data.ownerId } };
		}

		return (
			((
				await this.teamRepository.update(
					{ id: Equal(id) },
					{
						description: data.description,
						name: data.name,
						url: data.url,
						...ownerParam,
					},
				)
			)?.affected || 0) > 0
		);
	}

	async remove(id: number) {
		return (
			((await this.teamRepository.delete({ id: Equal(id) }))?.affected ||
				0) > 0
		);
	}

	async resolve<T>(id: number, relation: keyof Team): Promise<T | undefined> {
		return (
			await this.teamRepository.findOne({
				where: { id: Equal(id) },
				select: { [relation]: true },
				relations: [relation],
			})
		)?.[relation] as T;
	}
}
