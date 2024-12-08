import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { File } from "src/files/file.entity";
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

	@Field(() => [StageAttachment])
	@OneToMany(
		() => StageAttachment,
		(stageAttachment) => stageAttachment.stage,
		{
			cascade: true,
		},
	)
	attachments: StageAttachment[];

	@RelationId((stage: Stage) => stage.attachments)
	attachmentsId: number[];

	@Field(() => [PaperTarget])
	@OneToMany(() => PaperTarget, (paperTarget) => paperTarget.stage, {
		cascade: true,
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
export class StageAttachment {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@JoinColumn()
	@ManyToOne(() => File, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	file: File;

	@Field()
	@RelationId((stageAttachment: StageAttachment) => stageAttachment.file)
	fileId: string;

	@JoinColumn()
	@ManyToOne(() => Stage, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	stage: Stage;

	@RelationId((stageAttachment: StageAttachment) => stageAttachment.stage)
	stageId: number;
}

@ObjectType()
@Entity()
export class PaperTarget {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Field()
	@Column()
	name: string;

	@Field(() => Int)
	@Column({ type: "int" })
	requiredHits: number;

	@JoinColumn()
	@ManyToOne(() => Stage, (stage) => stage.paperTargets, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	stage: Stage;
}
