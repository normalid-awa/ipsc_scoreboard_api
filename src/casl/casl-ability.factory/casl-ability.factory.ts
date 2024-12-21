import {
	AbilityBuilder,
	createMongoAbility,
	ExtractSubjectType,
	InferSubjects,
	MongoAbility,
} from "@casl/ability";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { File } from "src/files/file.entity";
import { Shooter } from "src/shooters/shooter.entity";
import { Stage } from "src/stages/stage.entity";
import { Club } from "src/clubs/club.entity";
import { User } from "src/users/user.entity";
import { Match, StaffPosition } from "src/matches/match.entity";

export type Subjects =
	| InferSubjects<typeof User>
	| InferSubjects<typeof Shooter>
	| InferSubjects<typeof Club>
	| InferSubjects<typeof File>
	| InferSubjects<typeof Stage>
	| InferSubjects<typeof Match>
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

			can<Club>(Action.Create, Club);
			can<Club>(Action.Update, Club, { ownerId: user.id });
			can<Club>(Action.Delete, Club, { ownerId: user.id });

			can<File>(Action.Create, File);
			can<File>(Action.Update, File, { ownerId: user.id });
			can<File>(Action.Delete, File, { ownerId: user.id });

			can<Stage>(Action.Create, Stage);
			can<Stage>(Action.Update, Stage, { designerId: user.id });
			can<Stage>(Action.Delete, Stage, { designerId: user.id });

			can<Match>(Action.Create, Match);
			can<Match>(Action.Update, Match, {
				///@ts-expect-error casl lib didn't define this type of subject
				"stuffs.position": {
					$in: [
						StaffPosition.CRO,
						StaffPosition.RM,
						StaffPosition.SO,
						StaffPosition.MD,
						StaffPosition.RO,
					],
				},
				"stuffs.userId": user.id,
			});
			can<Match>(Action.Delete, Match, {
				///@ts-expect-error casl lib didn't define this type of subject
				"stuffs.position": {
					$in: [
						StaffPosition.CRO,
						StaffPosition.RM,
						StaffPosition.SO,
						StaffPosition.MD,
					],
				},
				"stuffs.userId": user.id,
			});
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
