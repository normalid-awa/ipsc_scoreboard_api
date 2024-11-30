import {
	CanActivate,
	ExecutionContext,
	Injectable,
	SetMetadata,
} from "@nestjs/common";
import {
	AppAbility,
	CaslAbilityFactory,
} from "./casl-ability.factory/casl-ability.factory";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

export interface PolicyHandlerImpl {
	handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = PolicyHandlerImpl | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = "check_policy";
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
	SetMetadata(CHECK_POLICIES_KEY, handlers);

@Injectable()
export class PoliciesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: CaslAbilityFactory,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const policyHandlers =
			this.reflector.get<PolicyHandler[]>(
				CHECK_POLICIES_KEY,
				context.getHandler(),
			) || [];

		const ctx = GqlExecutionContext.create(context);
		const { user } = ctx.getContext().req;

		const ability = this.caslAbilityFactory.createForUser(user);

		return policyHandlers.every((handler) =>
			this.execPolicyHandler(handler, ability),
		);
	}

	private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
		if (typeof handler === "function") {
			return handler(ability);
		}
		return handler.handle(ability);
	}
}
