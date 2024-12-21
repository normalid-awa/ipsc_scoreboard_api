import { registerEnumType } from "@nestjs/graphql";
import { Club } from "src/clubs/club.entity";
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

export enum Sport {
	IDPA = "IDPA",
	IPSC = "IPSC",
	ThreeGun = "3-Gun",
	USPSA = "USPSA",
}

registerEnumType(Sport, {
	name: "Sport",
});

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@ManyToOne(() => Club, { nullable: true })
	@JoinColumn()
	club?: Club;

	@RelationId((shooter: Shooter) => shooter.club)
	clubId?: number;

	@ManyToOne(() => User, { nullable: true })
	@JoinColumn()
	owner?: User;

	@RelationId((shooter: Shooter) => shooter.owner)
	ownerId?: number;

	@Column({ enum: Sport })
	sport: Sport;

	@CreateDateColumn()
	createdAt: Date;
}
