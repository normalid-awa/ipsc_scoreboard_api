import { Module } from "@nestjs/common";
import { ShootersResolver } from "./shooters.resolver";
import { ShootersService } from "./shooters.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shooter } from "./shooter.entity";
import { CaslModule } from "src/casl/casl.module";

@Module({
	imports: [TypeOrmModule.forFeature([Shooter]), CaslModule],
	providers: [ShootersResolver, ShootersService],
})
export class ShootersModule {}
