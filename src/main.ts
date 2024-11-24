import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { ReflectionService } from "@grpc/reflection";
import { readFile } from "fs/promises";

async function bootstrap() {
	const protoBufferPackages = JSON.parse(
		(
			await readFile(join(process.cwd(), "protoBufferPackages.json"))
		).toString(),
	);

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			logger: ["debug", "error", "fatal", "log", "verbose", "warn"],
			transport: Transport.GRPC,
			options: {
				package: protoBufferPackages.map((pkg) => pkg[0]),
				protoPath: protoBufferPackages.map((pkg) => pkg[1]),
				onLoadPackageDefinition: (pkg, server) => {
					new ReflectionService(pkg).addToServer(server);
				},
				url: "localhost:50051",
			},
		},
	);

	await app.listen();
}
bootstrap();
