import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { Club } from "src/clubs/club.entity";
import { Shooter, Sport } from "src/shooters/shooter.entity";
import { Stage } from "src/stages/stage.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	Point,
	PrimaryGeneratedColumn,
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

	@Field(() => String)
	@Column("point")
	location: Point;

	@Field()
	@Column({ default: false })
	finished: boolean;

	@Field(() => Club, { nullable: true })
	@ManyToOne(() => Club, { nullable: true })
	hostClub?: Club;

	@Field(() => [MatchStage])
	@OneToMany(() => MatchStage, (matchStage) => matchStage.match)
	stages: MatchStage[];

	@Field(() => [MatchShooter])
	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.match)
	shooters: MatchShooter[];

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
		cascade: true,
		onDelete: "CASCADE",
	})
	match: Match;

	@Field()
	@ManyToOne(() => Stage)
	stage: Stage;
}

@Entity()
@ObjectType()
export class MatchShooter {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@ManyToOne(() => Match, {
		cascade: true,
		onDelete: "CASCADE",
	})
	match: Match;

	@Field()
	@ManyToOne(() => Shooter)
	shooter: Shooter;
}
