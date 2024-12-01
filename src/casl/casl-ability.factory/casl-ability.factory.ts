import {
	Ability,
	AbilityBuilder,
	AbilityClass,
	ExtractSubjectType,
	InferSubjects,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Shooter } from "src/shooters/shooter.entity";
import { User } from "src/users/user.entity";

type Subjects =
	| InferSubjects<typeof User>
	| InferSubjects<typeof Shooter>
	| "all";

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

			cannot(Action.Create, User);
			can<User>(Action.Update, User, { id: user.id });
			can(Action.Delete, User, { id: user.id });

			can<Shooter>(Action.Create, Shooter);
			can<Shooter>(Action.Update, Shooter);
			can<Shooter>(Action.Delete, Shooter);
		}

		return build({
			// Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}
