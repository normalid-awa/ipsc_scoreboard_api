import { Module } from "@nestjs/common";
import { ShootersResolver } from "./shooters.resolver";
import { ShootersService } from "./shooters.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shooter } from "./shooter.entity";
import { User } from "src/users/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Shooter, User])],
	providers: [ShootersResolver, ShootersService],
})
export class ShootersModule {}
