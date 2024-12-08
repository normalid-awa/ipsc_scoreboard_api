import { Module } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { StagesResolver } from "./stages.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stage } from "./stage.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Stage])],
	providers: [StagesService, StagesResolver],
})
export class StagesModule {}
