import { Injectable } from "@nestjs/common";
import { NewUserInput, UpdateUserInput, UsersArgs } from "./users.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(data: NewUserInput): Promise<User> {
		return await this.userRepository.save({
			name: data.name,
			email: data.email,
			hashedPassword: User.HashPassword(data.password),
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

	async update(id: number, data: UpdateUserInput): Promise<boolean> {
		return (
			(
				await this.userRepository.update(id, {
					email: data.email,
					name: data.name,
					hashedPassword: User.HashPassword(data.password),
				})
			).affected > 0
		);
	}

	async remove(id: number): Promise<boolean> {
		return (await this.userRepository.delete(id)).affected > 0;
	}
}
