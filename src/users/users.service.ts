import { Injectable, NotFoundException } from "@nestjs/common";
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
		let shooter: Shooter | undefined;
		if (data.shooter) {
			shooter = await this.shooterRepository.findOneBy({
				id: data.shooter,
			});
			if (!shooter) {
				throw new NotFoundException("Shooter not found");
			}
		}

		return await this.userRepository.save({
			name: data.name,
			email: data.email,
			hashedPassword: User.HashPassword(data.password),
			shooter: shooter,
		});
	}

	async findOneById(id: number): Promise<User | undefined> {
		return await this.userRepository.findOneBy({ id });
	}

	async findAll(recipesArgs: UsersArgs): Promise<User[]> {
		return await this.userRepository.find({
			skip: recipesArgs.skip,
			take: recipesArgs.take,
		});
	}

	async update(id: number, data: UpdateUserArgs): Promise<boolean> {
		let shooter: Shooter | undefined;
		if (data.shooter) {
			shooter = await this.shooterRepository.findOneBy({
				id: data.shooter,
			});
			if (!shooter) {
				throw new NotFoundException("Shooter not found");
			}
		}

		return (
			(
				await this.userRepository.update(
					{ id },
					{
						email: data.email,
						name: data.name,
						shooter: shooter,
					},
				)
			).affected > 0
		);
	}

	async remove(id: number): Promise<boolean> {
		return (await this.userRepository.delete(id)).affected > 0;
	}
}
