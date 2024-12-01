import { Module } from "@nestjs/common";
import { TeamsResolver } from "./teams.resolver";
import { TeamsService } from "./teams.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { User } from "src/users/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Team, User])],
	providers: [TeamsResolver, TeamsService],
})
export class TeamsModule {}
