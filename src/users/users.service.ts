import { Injectable } from "@nestjs/common";
import { NewUserInput, UsersArgs } from "./users.dto";
import { User } from "./user.entity";


@Injectable()
export class UsersService {
	/**
	 * MOCK
	 * Put some real business logic here
	 * Left for demonstration purposes
	 */

	async create(data: NewUserInput): Promise<User> {
		return {} as any;
	}

	async findOneById(id: string): Promise<User | undefined> {
		return {} as any;
	}

	async findAll(recipesArgs: UsersArgs): Promise<User[]> {
		return [] as User[];
	}

	async remove(id: string): Promise<boolean> {
		return true;
	}
}
