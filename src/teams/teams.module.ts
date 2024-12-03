import { Module } from "@nestjs/common";
import { TeamsResolver } from "./teams.resolver";
import { TeamsService } from "./teams.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { User } from "src/users/user.entity";
import { CaslModule } from "src/casl/casl.module";

@Module({
	imports: [TypeOrmModule.forFeature([Team, User]), CaslModule],
	providers: [TeamsResolver, TeamsService],
})
export class TeamsModule {}