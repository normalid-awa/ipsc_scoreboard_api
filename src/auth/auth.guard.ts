import {
	createParamDecorator,
	ExecutionContext,
	Injectable,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req.user;
	},
);

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
	getRequest(context: ExecutionContext) {
		const gqlExecutionContext = GqlExecutionContext.create(context);
		const gqlContext = gqlExecutionContext.getContext();
		const gqlArgs = gqlExecutionContext.getArgs();

		gqlContext.req.body = { ...gqlContext.req.body, ...gqlArgs };
		return gqlExecutionContext.getContext().req;
	}
}
