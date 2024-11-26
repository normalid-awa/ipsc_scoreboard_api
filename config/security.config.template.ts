import { JwtModuleOptions } from "@nestjs/jwt";
import { IsStrongPasswordOptions } from "class-validator";
import { SecurityConfig } from "src/types";

export default {
	jwtSecret: "secretKey",
} satisfies IsStrongPasswordOptions & SecurityConfig & JwtModuleOptions;