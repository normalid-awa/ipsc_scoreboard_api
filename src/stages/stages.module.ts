import { Module } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { StagesResolver } from "./stages.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stage } from "./stage.entity";
import { CaslModule } from "src/casl/casl.module";

@Module({
	imports: [TypeOrmModule.forFeature([Stage]), CaslModule],
	providers: [StagesService, StagesResolver],
})
export class StagesModule {}
