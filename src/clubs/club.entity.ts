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
export class Club {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@Column({ nullable: true })
	url?: string;

	@OneToOne(() => User, { cascade: true, onUpdate: "SET NULL" })
	@JoinColumn()
	owner: User;

	@RelationId((club: Club) => club.owner)
	ownerId: number;

	@OneToMany(() => Shooter, (shooter) => shooter.club, { nullable: true })
	members?: Shooter[];

	@CreateDateColumn()
	createdAt: Date;
}
