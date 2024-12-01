import { Injectable } from "@nestjs/common";
import { NewUserArgs, UpdateUserArgs, UsersArgs } from "./users.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Shooter } from "src/shooters/shooter.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Shooter)
		private readonly shooterRepository: Repository<Shooter>,
	) {}

	async create(data: NewUserArgs): Promise<User> {
		return await this.userRepository.save(
			{
				name: data.name,
				email: data.email,
				hashedPassword: User.HashPassword(data.password),
				shooter: { id: data.shooter },
			},
			{ reload: true },
		);
	}

	async findOneById(id: number): Promise<User | null> {
		return await this.userRepository.findOneBy({ id });
	}

	async findAll(recipesArgs: UsersArgs): Promise<User[]> {
		return await this.userRepository.find({
			skip: recipesArgs.skip,
			take: recipesArgs.take,
		});
	}

	async update(id: number, data: UpdateUserArgs): Promise<boolean> {
		let shooter = {};
		if (data.shooter) {
			shooter = { shooter: { id: data.shooter } };
		}
		return (
			((
				await this.userRepository.update(
					{ id },
					{
						email: data.email,
						name: data.name,
						...shooter,
					},
				)
			)?.affected || 0) > 0
		);
	}

	async remove(id: number): Promise<boolean> {
		return ((await this.userRepository.delete(id))?.affected || 0) > 0;
	}

	async resolveShooter(id: number) {
		return await this.shooterRepository.findOne({ where: { id } });
	}
}
