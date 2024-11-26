import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard, LocalAuthGuard } from "./auth.guard";
import { User } from "src/users/user.entity";
import { LoginArgs } from "./auth.dto";

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query(() => String)
	@UseGuards(LocalAuthGuard)
	async login(@CurrentUser() user: User, @Args() loginArgs: LoginArgs) {
		console.log(user);
		return await this.authService.login(loginArgs);
	}

	@Query(() => User)
	@UseGuards(JwtAuthGuard)
	whoAmI(@CurrentUser() user: User) {
		return user;
	}

	//TODO: After 2FA implementation is done
	async resetPassword() {}
}
