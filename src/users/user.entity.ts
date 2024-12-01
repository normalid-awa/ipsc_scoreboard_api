import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Shooter } from "src/shooters/shooter.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
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

	@OneToOne(() => Shooter, { nullable: true })
	@Field(() => Shooter, { nullable: true })
	@JoinColumn()
	shooter?: Shooter;

	@Column({ default: false })
	verified: boolean;

	@Column({ default: false })
	isSystemAdmin: boolean;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;
}
