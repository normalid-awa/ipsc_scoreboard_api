import { Module } from "@nestjs/common";
import { MatchesResolver } from "./matches.resolver";
import { MatchesService } from "./matches.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "./match.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Match]),
	],
	providers: [MatchesResolver, MatchesService],
})
export class MatchesModule {}
