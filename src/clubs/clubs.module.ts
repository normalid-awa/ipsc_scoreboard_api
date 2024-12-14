import { Module } from "@nestjs/common";
import { ClubsResolver } from "./clubs.resolver";
import { ClubsService } from "./clubs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Club } from "./club.entity";
import { CaslModule } from "src/casl/casl.module";

@Module({
	imports: [TypeOrmModule.forFeature([Club]), CaslModule],
	providers: [ClubsResolver, ClubsService],
})
export class ClubsModule {}
