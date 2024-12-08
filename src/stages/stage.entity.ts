import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";

@ArgsType()
@ObjectType()
@Entity()
export class Stage {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Field()
	@Column()
	name: string;

	@Field(() => [PaperTarget])
	@OneToMany(() => PaperTarget, (paperTarget) => paperTarget.stage, {
		eager: true,
	})
	paperTargets: PaperTarget[];

	@RelationId((stage: Stage) => stage.paperTargets)
	paperTargetsId: number[];

	@Field(() => Int)
	@Column({ type: "int" })
	noShooots: number;

	@Field(() => Int)
	@Column({ type: "int" })
	popper: number;

	@Field()
	@Column()
	walkthroughTime: number;

	@Field()
	@Column()
	briefing: string;

	@Field(() => User)
	@JoinColumn()
	@ManyToOne(() => User)
	designer: User;

	@RelationId((stage: Stage) => stage.designer)
	designerId: number;

	@CreateDateColumn()
	@Field()
	createdAt: Date;
}

@ObjectType()
@Entity()
export class PaperTarget {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Field(() => Int)
	@Column({ type: "int" })
	requiredHits: number;

	@Field(() => Stage)
	@JoinColumn()
	@ManyToOne(() => Stage, (stage) => stage.paperTargets)
	stage: Stage;
}
