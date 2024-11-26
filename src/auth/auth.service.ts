import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { LoginArgs } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(
		email: string,
		password: string,
	): Promise<Omit<User, "hashedPassword">> {
		const user = await this.userRepository.findOne({
			where: { email },
		});

		if (!user || User.HashPassword(password) !== user.hashedPassword) {
			return null;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { hashedPassword, ...desensitiveData } = user;
		return desensitiveData;
	}

	async login(credentials: LoginArgs) {
		const user = await this.validateUser(
			credentials.email,
			credentials.password,
		);
		if (!user) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id };
		return await this.jwtService.signAsync(payload);
	}

	async whoami(token: string) {
		return JSON.stringify(await this.jwtService.decode(token));
	}
}
