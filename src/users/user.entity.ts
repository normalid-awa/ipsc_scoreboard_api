import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Column({ default: false })
	verified: boolean;
}
