import {
	AbilityBuilder,
	createMongoAbility,
	ExtractSubjectType,
	InferSubjects,
	MongoAbility,
} from "@casl/ability";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Shooter } from "src/shooters/shooter.entity";
import { Team } from "src/teams/team.entity";
import { User } from "src/users/user.entity";

export type Subjects =
	| InferSubjects<typeof User>
	| InferSubjects<typeof Shooter>
	| InferSubjects<typeof Team>
	| "all";

export enum Action {
	Manage = "manage",
	Create = "create",
	Read = "read",
	Update = "update",
	Delete = "delete",
}

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
	constructor() {}

	createForUser(user: User) {
		const { can, cannot, build } = new AbilityBuilder<
			MongoAbility<[Action, Subjects]>
		>(createMongoAbility);

		if (user?.isSystemAdmin || false) {
			can(Action.Manage, "all");
		} else {
			can(Action.Read, "all");

			cannot(Action.Create, User);
			can<User>(Action.Update, User, { id: user.id });
			can(Action.Delete, User, { id: user.id });

			can<Shooter>(Action.Create, Shooter);
			can<Shooter>(Action.Update, Shooter);
			can<Shooter>(Action.Delete, Shooter);

			can<Team>(Action.Create, Team);
			can<Team>(Action.Update, Team, { ownerId: user.id });
			can<Team>(Action.Delete, Team, { ownerId: user.id });
		}

		return build({
			// Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>,
		});
	}

	async validateUserAbility<T extends Subjects>(
		user: User,
		subject: () => Promise<T | null>,
		action: Action,
	) {
		const subjectValue = await subject();
		if (!subjectValue) throw new UnauthorizedException();
		return this.createForUser(user).can(action, subjectValue);
	}
}
