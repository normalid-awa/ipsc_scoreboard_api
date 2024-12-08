import { Field, ID, ObjectType } from "@nestjs/graphql";
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

@ObjectType()
@Entity()
export class File {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	path: string;

	@JoinColumn()
	@ManyToOne(() => User, { nullable: true })
	owner?: User;

	@RelationId((file: File) => file.owner)
	ownerId?: number;

	@CreateDateColumn()
	createdAt: Date;
}
