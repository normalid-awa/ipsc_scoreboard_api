import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
	],
	providers: [AuthResolver, AuthService],
	exports: [AuthService],
})
export class AuthModule {}
