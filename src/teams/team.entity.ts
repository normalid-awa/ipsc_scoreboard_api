import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";

@Entity()
@ObjectType()
export class Team {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column()
	@Field()
	name: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	description?: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	url?: string;

	@OneToOne(() => User, { cascade: true, onUpdate: "SET NULL" })
	@JoinColumn()
	@Field(() => User)
	owner: User;

	@RelationId((team: Team) => team.owner)
	ownerId: number;

	@CreateDateColumn()
	@Field()
	createdAt: Date;
}
