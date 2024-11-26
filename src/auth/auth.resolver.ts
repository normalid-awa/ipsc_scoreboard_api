import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginArgs } from "./auth.dto";

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query(() => String)
	async login(@Args() loginArgs: LoginArgs) {
		return await this.authService.login(loginArgs);
	}

	@Query(() => String)
	async whoami(@Args("token") token: string) {
		return await this.authService.whoami(token);
	}

	//TODO: After 2FA implementation is done
	async resetPassword() {}
}
