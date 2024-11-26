import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DatabaseConfig } from "config/database.config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [() => DatabaseConfig],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => DatabaseConfig,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: !(process.env.NODE_ENV === "production"),
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			installSubscriptionHandlers: true,
		}),
		UsersModule,
	],
})
export class AppModule {}
