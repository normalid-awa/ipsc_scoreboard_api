import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shooter } from "./shooter.entity";
import { Equal, Repository } from "typeorm";
import {
	CreateShooterArgs,
	ShootersArgs,
	UpdateShooterArgs,
} from "./shooters.dto";

@Injectable()
export class ShootersService {
	constructor(
		@InjectRepository(Shooter)
		private readonly shooterRepository: Repository<Shooter>,
	) {}

	async create(newShooter: CreateShooterArgs) {
		return await this.shooterRepository.save({
			firstName: newShooter.firstName,
			lastName: newShooter.lastName,
		});
	}

	async fineOneById(id: number) {
		return await this.shooterRepository.findOneBy({ id: Equal(id) });
	}

	async findAll(args: ShootersArgs) {
		return await this.shooterRepository.find({
			take: args.take,
			skip: args.skip,
		});
	}

	async update(id: number, data: UpdateShooterArgs) {
		return (
			((
				await this.shooterRepository.update(
					{ id: Equal(id) },
					{
						firstName: data.firstName,
						lastName: data.lastName,
					},
				)
			)?.affected || 0) > 0
		);
	}

	async remove(id: number) {
		return (
			((await this.shooterRepository.delete({ id: Equal(id) }))
				.affected || 0) > 0
		);
	}

	async resolveTeam(shooter: Shooter) {
		return (
			await this.shooterRepository.findOne({
				where: { id: Equal(shooter.id) },
				relations: {
					team: true,
				},
			})
		)?.team;
	}
}
