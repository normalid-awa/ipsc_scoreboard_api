import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Club } from "./club.entity";
import { Equal, Repository } from "typeorm";
import { CreateClubArgs, ClubsArgs, UpdateClubArgs } from "./clubs.dto";

@Injectable()
export class ClubsService {
	constructor(
		@InjectRepository(Club)
		private readonly clubRepository: Repository<Club>,
	) {}

	async findOneById(id: number) {
		return await this.clubRepository.findOne({ where: { id: Equal(id) } });
	}

	async findAll(pagination: ClubsArgs) {
		return await this.clubRepository.find({
			skip: pagination.skip,
			take: pagination.take,
		});
	}

	async create(data: CreateClubArgs) {
		return await this.clubRepository.save(
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

	async update(id: number, data: UpdateClubArgs) {
		let ownerParam = {};
		if (data.ownerId !== undefined) {
			ownerParam = { owner: { id: data.ownerId } };
		}

		return (
			((
				await this.clubRepository.update(
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
			((await this.clubRepository.delete({ id: Equal(id) }))?.affected ||
				0) > 0
		);
	}

	async resolve<T>(id: number, relation: keyof Club): Promise<T | undefined> {
		return (
			await this.clubRepository.findOne({
				where: { id: Equal(id) },
				select: { [relation]: true },
				relations: [relation],
			})
		)?.[relation] as T;
	}
}
