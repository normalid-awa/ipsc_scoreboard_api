import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
	Column,
	CreateDateColumn,
	Entity, PrimaryGeneratedColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column()
	@Field()
	firstName: string;

	@Column()
	@Field()
	lastName: string;

	@CreateDateColumn()
	createdAt: Date;
}
