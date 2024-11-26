import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DatabaseConfig } from "config/database.config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import securityConfig from "config/security.config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [() => DatabaseConfig, () => securityConfig],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => DatabaseConfig,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: !(process.env.NODE_ENV === "production"),
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			subscriptions: {
				"graphql-ws": true,
			},
		}),
		JwtModule.register({
			...securityConfig,
			global: true,
			signOptions: {
				expiresIn: "60s",
			},
			secret: securityConfig.jwtSecret,
		}),
		PassportModule.register({ session: true }),
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
