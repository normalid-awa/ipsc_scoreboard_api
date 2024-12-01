import { Injectable } from "@nestjs/common";
import { CreateUserArgs, UpdateUserArgs, UsersArgs } from "./users.dto";
import { User } from "./user.entity";
import { DeepPartial, Repository } from "typeorm";
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

	private constructShooterJoinFromShooterId(
		shooterId: number | undefined | null,
	): DeepPartial<User> {
		if (shooterId !== undefined) {
			// @ts-expect-error The type of TypeORM is wrong, if it's null it will set the id to null while undefined doens't.
			return { shooter: { id: shooterId } };
		}
		return {};
	}

	async create(data: CreateUserArgs): Promise<User> {
		return await this.userRepository.save(
			{
				name: data.name,
				email: data.email,
				hashedPassword: User.HashPassword(data.password),
				...this.constructShooterJoinFromShooterId(data.shooterId),
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
		return (
			((
				await this.userRepository.update(
					{ id },
					{
						email: data.email,
						name: data.name,
						...this.constructShooterJoinFromShooterId(data.shooterId),
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
