import { Injectable } from "@nestjs/common";
import { CreateUserArgs, UpdateUserArgs, UsersArgs } from "./users.dto";
import { User } from "./user.entity";
import { Equal, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(data: CreateUserArgs): Promise<User> {
		return await this.userRepository.save(
			{
				name: data.name,
				email: data.email,
				hashedPassword: User.HashPassword(data.password),
			},
			{ reload: true },
		);
	}

	async findOneById(id: number): Promise<User | null> {
		return await this.userRepository.findOneBy({ id: Equal(id) });
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
					{ id: Equal(id) },
					{
						email: data.email,
						name: data.name,
					},
				)
			)?.affected || 0) > 0
		);
	}

	async remove(id: number): Promise<boolean> {
		return (
			((await this.userRepository.delete({ id: Equal(id) }))?.affected ||
				0) > 0
		);
	}

	async resolve<T>(id: number, relation: keyof User): Promise<T | undefined> {
		return (
			await this.userRepository.findOne({
				where: { id: Equal(id) },
				select: { [relation]: true },
				relations: [relation],
			})
		)?.[relation] as T;
	}
}
