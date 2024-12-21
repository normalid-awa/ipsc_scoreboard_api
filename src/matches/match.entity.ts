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

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ nullable: true })
	url: string;

	@Column()
	date: Date;

	@Column({ default: false })
	finished: boolean;

	@ManyToOne(() => Club, {
		nullable: true,
		cascade: true,
	})
	hostClub?: Club;

	//**
	// If it's not public, it will only be visible to the host club
	//  */
	@Column({ default: false })
	isPublic: boolean;

	@OneToMany(() => MatchStage, (matchStage) => matchStage.match, {
		cascade: true,
	})
	stages: MatchStage[];

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.match, {
		cascade: true,
	})
	shooters: MatchShooter[];

	@OneToMany(() => MatchStuff, (matchStuff) => matchStuff.match, {
		cascade: true,
	})
	stuffs: MatchStuff[];

	@OneToMany(() => MatchClassification, (matchClassification) => matchClassification.match, {
		cascade: true,
	})
	classifications: MatchClassification[];

	@OneToMany(() => MatchDivision, (matchDivision) => matchDivision.match, {
		cascade: true,
	})
	divisions: MatchDivision[];

	@Column({ enum: Sport })
	sport: Sport;

	@CreateDateColumn()
	createdAt: Date;
}

@Entity()
export class MatchStage {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId((matchStage: MatchStage) => matchStage.match)
	matchId: number;

	@ManyToOne(() => Stage)
	stage: Stage;

	@RelationId((matchStage: MatchStage) => matchStage.stage)
	stageId: number;
}

@Entity()
export class MatchClassification {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId(
		(matchClassification: MatchClassification) => matchClassification.match,
	)
	matchId: number;

	@Column()
	classification: string;
}

@Entity()
export class MatchDivision {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId((matchDivision: MatchDivision) => matchDivision.match)
	matchId: number;

	@Column()
	division: string;
}

@Entity()
export class MatchShooter {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;
	
	@RelationId((matchShooter: MatchShooter) => matchShooter.match)
	matchId: number;
	
	@ManyToOne(() => Shooter)
	shooter: Shooter;
	
	@RelationId((matchShooter: MatchShooter) => matchShooter.shooter)
	shooterId: number;
	
	@ManyToOne(() => MatchClassification)
	classification: MatchClassification;
	
	@RelationId((matchShooter: MatchShooter) => matchShooter.classification)
	classificationId: number;
	
	@ManyToOne(() => MatchDivision)
	division: MatchDivision;
	
	@RelationId((matchShooter: MatchShooter) => matchShooter.division)
	divisionId: number;
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
export class MatchStuff {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	match: Match;

	@RelationId((matchStuff: MatchStuff) => matchStuff.match)
	matchId: number;

	@ManyToOne(() => User)
	user: User;

	@RelationId((matchStuff: MatchStuff) => matchStuff.user)
	userId: number;

	@Column({ enum: StuffPosition })
	position: StuffPosition;
}
