import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { Shooter } from "src/shooters/shooter.entity";
import { CaslModule } from "src/casl/casl.module";

@Module({
	imports: [TypeOrmModule.forFeature([User, Shooter]), CaslModule],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
