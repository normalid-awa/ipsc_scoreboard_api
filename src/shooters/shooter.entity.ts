import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Team } from "src/teams/team.entity";
import { User } from "src/users/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";

export enum Sport {
	IDPA = "IDPA",
	IPSC = "IPSC",
	ThreeGun = "3-Gun",
	USPSA = "USPSA",
}

registerEnumType(Sport, {
	name: "Sport",
});

@ObjectType()
@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column()
	@Field()
	firstName: string;

	@Column()
	@Field()
	lastName: string;

	@Field({ nullable: true })
	@ManyToOne(() => Team, { nullable: true })
	@JoinColumn()
	team?: Team;

	@RelationId((shooter: Shooter) => shooter.team)
	teamId?: number;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { nullable: true })
	@JoinColumn()
	owner?: User;

	@RelationId((shooter: Shooter) => shooter.owner)
	ownerId?: number;

	@Column({ enum: Sport })
	@Field(() => Sport)
	sport: Sport;

	@CreateDateColumn()
	createdAt: Date;
}
