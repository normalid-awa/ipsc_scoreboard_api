import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}
