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

@Entity()
export class Stage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

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

	@OneToMany(() => PaperTarget, (paperTarget) => paperTarget.stage, {
		cascade: true,
	})
	paperTargets: PaperTarget[];

	@RelationId((stage: Stage) => stage.paperTargets)
	paperTargetsId: number[];

	@Column({ type: "int" })
	noShooots: number;

	@Column({ type: "int" })
	popper: number;

	@Column()
	walkthroughTime: number;

	@Column()
	briefing: string;

	@JoinColumn()
	@ManyToOne(() => User)
	designer: User;

	@RelationId((stage: Stage) => stage.designer)
	designerId: number;

	@CreateDateColumn()
	createdAt: Date;
}

@Entity()
export class StageAttachment {
	@PrimaryGeneratedColumn()
	id: number;

	@JoinColumn()
	@ManyToOne(() => File, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	file: File;

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

@Entity()
export class PaperTarget {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: "int" })
	requiredHits: number;

	@JoinColumn()
	@ManyToOne(() => Stage, (stage) => stage.paperTargets, {
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	stage: Stage;
}
