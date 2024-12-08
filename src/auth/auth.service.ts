import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Equal, Repository } from "typeorm";
import { LoginArgs } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email: Equal(email) },
		});

		if (!user || User.HashPassword(password) !== user.hashedPassword) {
			throw new UnauthorizedException();
		}

		return user;
	}

	async login(credentials: LoginArgs) {
		const user = await this.validateUser(
			credentials.email,
			credentials.password,
		);
		const payload = { sub: user.id };
		return await this.jwtService.signAsync(payload);
	}
}
