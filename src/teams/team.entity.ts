import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Shooter } from "src/shooters/shooter.entity";
import { User } from "src/users/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
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

	@Field(() => [Shooter], { nullable: true })
	@OneToMany(() => Shooter, (shooter) => shooter.team, { nullable: true })
	members?: Shooter[];

	@CreateDateColumn()
	@Field()
	createdAt: Date;
}
