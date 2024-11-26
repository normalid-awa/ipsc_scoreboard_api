import { IStrategyOptions, Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: "email",
			passwordField: "password",
		} satisfies IStrategyOptions);
	}

	async validate(email: string, password: string) {
		return await this.authService.validateUser(email, password);
	}
}
