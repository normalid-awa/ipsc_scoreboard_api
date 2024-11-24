import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export const DatabaseConfig = {
	type: "postgres",
	host: "",
	port: 0,
	username: "",
	password: "",
	database: "",
	entities: ["dist/**/*.entity{.ts,.js}"],
	migrations: ["dist/src/migrations/*{.ts,.js}"],
	autoLoadEntities: true,
} satisfies TypeOrmModuleOptions;

export const AppDataSource = new DataSource(DatabaseConfig);