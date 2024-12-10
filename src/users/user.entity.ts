import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Shooter } from "src/shooters/shooter.entity";
import { Stage } from "src/stages/stage.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column({ unique: true })
	@Field(() => String)
	email: string;

	@Column()
	@Field(() => String)
	name: string;

	@Column()
	hashedPassword: string;

	static HashPassword(rawPassword: string): string {
		//TODO: Implement password hashing
		return rawPassword;
	}

	@Field(() => [Shooter], { nullable: true })
	@OneToMany(() => Shooter, (team) => team.owner, { nullable: true })
	shooters?: Shooter[];

	@Field(() => [Stage], { nullable: true })
	@OneToMany(() => Stage, (stage) => stage.designer, { nullable: true })
	stages?: Stage[];

	@Column({ default: false })
	verified: boolean;

	@Column({ default: false })
	isSystemAdmin: boolean;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;
}
