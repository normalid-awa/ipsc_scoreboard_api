import { Controller, Logger } from "@nestjs/common";
import {
	RegisterUserRequest,
	RegisterUserResponse,
	UsersServiceController,
	UsersServiceControllerMethods,
} from "./users";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { QueryFailedError, Repository } from "typeorm";
import {
	GrpcInternalException,
	GrpcInvalidArgumentException,
} from "nestjs-grpc-exceptions";
import checksPassword from "src/guard/password.guard";
import checksEmail from "src/guard/email.guard";
import { PostgresError } from "pg-error-enum";

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async registerUser(
		request: RegisterUserRequest,
	): Promise<RegisterUserResponse> {
		const checkPasswordResult = checksPassword(request.password);
		if (checkPasswordResult != true)
			throw new GrpcInvalidArgumentException(checkPasswordResult.reason);

		const emailCheckResult = checksEmail(request.email);
		if (emailCheckResult != true)
			throw new GrpcInvalidArgumentException(emailCheckResult.message);

		const hashedPassword = User.HashPassword(request.password);

		try {
			await this.usersRepository.insert({
				email: request.email,
				hashedPassword,
				name: request.username,
			});
		} catch (error) {
			this.logger.debug(JSON.stringify(error));

			if (error instanceof QueryFailedError)
				if (error.driverError.code == PostgresError.UNIQUE_VIOLATION)
					throw new GrpcInvalidArgumentException(
						`${error.driverError.detail} already exists`,
					);

			// fallback
			this.logger.error(error);
			throw new GrpcInternalException("Internal server error");
		}

		return {};
	}
}
