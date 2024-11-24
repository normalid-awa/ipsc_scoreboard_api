import { Controller } from "@nestjs/common";
import {
	RegisterUserRequest,
	RegisterUserResponse,
	UsersServiceController,
	UsersServiceControllerMethods,
} from "./users";

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
	registerUser(request: RegisterUserRequest): RegisterUserResponse {
		return {};
	}
}
