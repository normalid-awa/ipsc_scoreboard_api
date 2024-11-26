import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	// const protoBufferPackages = JSON.parse(
	// 	(
	// 		await readFile(join(process.cwd(), "protoBufferPackages.json"))
	// 	).toString(),
	// );

	// const app = await NestFactory.createMicroservice<MicroserviceOptions>(
	// 	AppModule,
	// 	{
	// 		logger: ["debug", "error", "fatal", "log", "verbose", "warn"],
	// 		transport: Transport.GRPC,
	// 		options: {
	// 			package: protoBufferPackages.map((pkg) => pkg[0]),
	// 			protoPath: protoBufferPackages.map((pkg) => pkg[1]),
	// 			onLoadPackageDefinition: (pkg, server) => {
	// 				new ReflectionService(pkg).addToServer(server);
	// 			},
	// 			url: "0.0.0.0:50051",
	// 		},
	// 	},
	// );

	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}
bootstrap();
