import { Shooter } from "src/shooters/shooter.entity";
import { Stage } from "src/stages/stage.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	name: string;

	@Column()
	hashedPassword: string;

	static HashPassword(rawPassword: string): string {
		//TODO: Implement password hashing
		return rawPassword;
	}

	@OneToMany(() => Shooter, (shooter) => shooter.owner, { nullable: true })
	shooters?: Shooter[];

	@OneToMany(() => Stage, (stage) => stage.designer, { nullable: true })
	stages?: Stage[];

	@Column({ default: false })
	verified: boolean;

	@Column({ default: false })
	isSystemAdmin: boolean;

	@CreateDateColumn()
	createdAt: Date;
}
