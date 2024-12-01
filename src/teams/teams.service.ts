import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Repository } from "typeorm";
import { CreateTeamArgs, TeamsArgs, UpdateTeamArgs } from "./teams.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class TeamsService {
	constructor(
		@InjectRepository(Team)
		private readonly teamRepository: Repository<Team>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async findOneById(id: number) {
		return await this.teamRepository.findOne({ where: { id } });
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
					{ id },
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
		return ((await this.teamRepository.delete({ id }))?.affected || 0) > 0;
	}

	async resolveOwner(id: number) {
		return await this.userRepository.findOne({ where: { id } });
	}
}
