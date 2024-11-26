import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

export interface SecurityConfig {
	jwtSecret: string;
}

export function CreatePaginationArgs(maxTake: number = 50) {
	@ArgsType()
	class CommonPaginationArgs {
		@Field(() => Int, { nullable: true })
		@Min(0)
		skip: number = 0;
	
		@Field(() => Int, { nullable: true })
		@Min(1)
		take: number = 25;
	}
	Reflect.decorate([Max(maxTake)], CommonPaginationArgs.prototype, "take");
	return CommonPaginationArgs;
}
