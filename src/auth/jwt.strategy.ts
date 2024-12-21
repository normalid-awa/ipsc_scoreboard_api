//TODO: remove ts ignore
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignoremport { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import securityConfig from "config/security.config";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: securityConfig.jwtSecret,
		});
	}

	async validate(payload: any) {
		return await this.usersService.findOneById(payload.sub);
	}
}
