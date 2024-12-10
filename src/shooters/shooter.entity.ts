import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Team } from "src/teams/team.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";

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
	@ManyToOne(() => Team, { nullable: true})
	@JoinColumn()
	team?: Team;

	@RelationId((shooter: Shooter) => shooter.team)
	teamId?: number;

	@CreateDateColumn()
	createdAt: Date;
}
