import { Module } from "@nestjs/common";
import { MatchesResolver } from "./matches.resolver";
import { MatchesService } from "./matches.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "./match.entity";
import { CaslModule } from "src/casl/casl.module";

@Module({
	imports: [TypeOrmModule.forFeature([Match]), CaslModule],
	providers: [MatchesResolver, MatchesService],
})
export class MatchesModule {}
