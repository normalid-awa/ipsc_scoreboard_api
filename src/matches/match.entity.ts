import {
	Field,
	GraphQLISODateTime,
	Int,
	ObjectType,
	registerEnumType,
} from "@nestjs/graphql";
import { Club } from "src/clubs/club.entity";
import { Shooter, Sport } from "src/shooters/shooter.entity";
import { Stage } from "src/stages/stage.entity";
import { User } from "src/users/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";

@ObjectType()
@Entity()
export class Match {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	description: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	url: string;

	@Field(() => GraphQLISODateTime)
	@Column("date")
	date: Date;

	@Field()
	@Column({ default: false })
	finished: boolean;

	@Field(() => Club, { nullable: true })
	@ManyToOne(() => Club, {
		nullable: true,
		cascade: true,
	})
	hostClub?: Club;

	@Field(() => [MatchStage])
	@OneToMany(() => MatchStage, (matchStage) => matchStage.match, {
		cascade: true,
	})
	stages: MatchStage[];

	@Field(() => [MatchShooter])
	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.match, {
		cascade: true,
	})
	shooters: MatchShooter[];

	@Field(() => [MatchStuff])
	@OneToMany(() => MatchStuff, (matchStuff) => matchStuff.match, {
		cascade: true,
	})
	stuffs: MatchStuff[];

	@Field(() => Sport)
	@Column({ enum: Sport })
	sport: Sport;

	@CreateDateColumn()
	createdAt: Date;
}

@Entity()
@ObjectType()
export class MatchStage {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId((matchStage: MatchStage) => matchStage.match)
	matchId: number;

	@Field()
	@ManyToOne(() => Stage)
	stage: Stage;

	@RelationId((matchStage: MatchStage) => matchStage.stage)
	stageId: number;
}

@Entity()
@ObjectType()
export class MatchShooter {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId((matchShooter: MatchShooter) => matchShooter.match)
	matchId: number;

	@Field()
	@ManyToOne(() => Shooter)
	shooter: Shooter;

	@RelationId((matchShooter: MatchShooter) => matchShooter.shooter)
	shooterId: number;
}

export enum StuffPosition {
	RO = "RO",
	CRO = "CRO",
	SO = "SO",
	QM = "QM",
	RM = "RM",
	MD = "MD",
}

registerEnumType(StuffPosition, {
	name: "StuffPosition",
});

@Entity()
@ObjectType()
export class MatchStuff {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId((matchStuff: MatchStuff) => matchStuff.match)
	matchId: number;

	@Field()
	@ManyToOne(() => User)
	user: User;

	@RelationId((matchStuff: MatchStuff) => matchStuff.user)
	userId: number;

	@Field(() => StuffPosition)
	@Column({ enum: StuffPosition })
	position: StuffPosition;
}
