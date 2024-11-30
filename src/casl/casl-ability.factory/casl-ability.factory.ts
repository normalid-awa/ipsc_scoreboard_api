import {
	Ability,
	AbilityBuilder,
	AbilityClass,
	ExtractSubjectType,
	InferSubjects,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/user.entity";

type Subjects = InferSubjects<typeof User> | "all";

export enum Action {
	Manage = "manage",
	Create = "create",
	Read = "read",
	Update = "update",
	Delete = "delete",
}

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
	createForUser(user: User) {
		const { can, cannot, build } = new AbilityBuilder<
			Ability<[Action, Subjects]>
		>(Ability as AbilityClass<AppAbility>);

		if (user.isSystemAdmin) {
			can(Action.Manage, "all");
		} else {
			can(Action.Read, "all");

			can<User>(Action.Update, User, { id: user.id });
			can(Action.Delete, User, { id: user.id });
			cannot(Action.Create, User);
		}

		return build({
			// Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}
