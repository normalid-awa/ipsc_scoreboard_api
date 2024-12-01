import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shooter } from "./shooter.entity";
import { Repository } from "typeorm";
import {
	NewShooterArgs,
	ShootersArgs,
	UpdateShooterArgs,
} from "./shooters.dto";

@Injectable()
export class ShootersService {
	constructor(
		@InjectRepository(Shooter)
		private readonly shooterRepository: Repository<Shooter>,
	) {}

	async create(newShooter: NewShooterArgs) {
		return await this.shooterRepository.save({
			firstName: newShooter.firstName,
			lastName: newShooter.lastName,
		});
	}

	async fineOneById(id: number) {
		return await this.shooterRepository.findOneBy({ id });
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
				await this.shooterRepository.update(id, {
					firstName: data.firstName,
					lastName: data.lastName,
				})
			)?.affected || 0) > 0
		);
	}

	async remove(id: number) {
		return ((await this.shooterRepository.delete(id)).affected || 0) > 0;
	}
}
