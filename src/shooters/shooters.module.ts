import { Module } from "@nestjs/common";
import { ShootersResolver } from "./shooters.resolver";
import { ShootersService } from "./shooters.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shooter } from "./shooter.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Shooter])],
	providers: [ShootersResolver, ShootersService],
})
export class ShootersModule {}
