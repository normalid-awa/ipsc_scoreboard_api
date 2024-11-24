import { Module } from "@nestjs/common";
import { HeroModule } from "./hero/hero.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DatabaseConfig} from "config/database.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [() => DatabaseConfig],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => DatabaseConfig,
		}),
		HeroModule,
		UsersModule,
	],
})
export class AppModule {}
