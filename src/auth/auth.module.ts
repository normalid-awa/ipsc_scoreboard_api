//TODO: remove ts ignore
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore
import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UsersService } from "src/users/users.service";
import { Shooter } from "src/shooters/shooter.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User, Shooter])],
	providers: [
		UsersService,
		AuthResolver,
		AuthService,
		LocalStrategy,
		JwtStrategy,
	],
	exports: [AuthService],
})
export class AuthModule {}
