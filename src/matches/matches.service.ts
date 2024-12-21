import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { Match, MatchClassification, MatchDivision, MatchShooter, MatchStage, MatchStuff } from "./match.entity";
import { CreateMatchArgs, MatchesArgs, UpdateMatchArgs } from "./matches.dto";
import { Stage } from "src/stages/stage.entity";
import { Shooter } from "src/shooters/shooter.entity";
import { User } from "src/users/user.entity";

@Injectable()
export class MatchesService {
	constructor(
		@InjectRepository(Match)
		private readonly matchRepository: Repository<Match>,
	) {}

	async findAll(args: MatchesArgs) {
		return await this.matchRepository.find({ ...args });
	}

	async findOneById(id: number, relation: (keyof Match)[] = []) {
		return await this.matchRepository.findOne({
			where: { id: Equal(id) },
			relations: [...relation],
		});
	}

	async create(match: CreateMatchArgs) {
		let hostClub = {};
		if (match.hostClub) {
			hostClub = { hostClub: { id: match.hostClub } };
		}

		const stages = match.stages.map((stageId) => {
			const stage = new MatchStage();
			stage.stage = { id: stageId } as Stage;
			return stage;
		});

		const shooters = match.shooters.map((shooterId) => {
			const shooter = new MatchShooter();
			shooter.shooter = { id: shooterId } as Shooter;
			return shooter;
		});

		const stuffs = match.stuffs.map((stuff) => {
			const newStuff = new MatchStuff();
			newStuff.user = { id: stuff.user } as User;
			newStuff.position = stuff.position;
			return newStuff;
		});

		const divisions = match.divisions.map((division) => {
			const newDivision = new MatchDivision();
			newDivision.division = division;
			return newDivision;
		});

		const classifications = match.classifications.map((classification) => {
			const newClassification = new MatchClassification();
			newClassification.classification = classification;
			return newClassification;
		});

		const newMatch = this.matchRepository.create({
			name: match.name,
			description: match.description,
			url: match.url,
			date: match.date,
			sport: match.sport,
			...hostClub,
			isPublic: match.isPublic,
			stages: stages,
			shooters: shooters,
			stuffs: stuffs,
			divisions: divisions,
			classifications: classifications,
		});
		return await this.matchRepository.save(newMatch);
	}

	async update(id: number, match: UpdateMatchArgs) {
		const existingMatch = await this.matchRepository.findOne({
			where: { id: Equal(id) },
		});
		if (!existingMatch) return false;

		let hostClub = {};
		if (match.hostClub !== undefined && match.hostClub !== null) {
			hostClub = { hostClub: { id: match.hostClub } };
		}

		let stages = {};
		if (match.stages !== undefined) {
			stages = {
				stages: (match.stages || []).map((stageId) => {
					const stage = new MatchStage();
					stage.stage = { id: stageId } as Stage;
					return stage;
				}),
			};
		}

		let shooters = {};
		if (match.shooters !== undefined) {
			shooters = {
				shooters: (match.shooters || []).map((shooterId) => {
					const shooter = new MatchShooter();
					shooter.shooter = { id: shooterId } as Shooter;
					return shooter;
				}),
			};
		}

		let stuffs = {};
		if (match.stuffs !== undefined) {
			stuffs = {
				stuffs: (match.stuffs || []).map((stuff) => {
					const newStuff = new MatchStuff();
					newStuff.user = { id: stuff.user } as User;
					newStuff.position = stuff.position;
					return newStuff;
				}),
			};
		}

		let classifications = {};
		if (match.classifications !== undefined) {
			classifications = {
				classifications: (match.classifications || []).map((classification) => {
					const newClassification = new MatchClassification();
					newClassification.classification = classification;
					return newClassification;
				}),
			};
		}

		let divisions = {};
		if (match.divisions !== undefined) {
			divisions = {
				divisions: (match.divisions || []).map((division) => {
					const newDivision = new MatchDivision();
					newDivision.division = division;
					return newDivision;
				}),
			};
		}

		return new Boolean(
			await this.matchRepository.save({
				id,
				name: match.name,
				description: match.description,
				url: match.url,
				date: match.date,
				sport: match.sport,
				...hostClub,
				...stages,
				...shooters,
				...stuffs,
				...classifications,
				...divisions,
			}),
		);
	}

	async remove(id: number) {
		return (
			((await this.matchRepository.delete({ id: Equal(id) }))?.affected ||
				0) > 0
		);
	}

	async finish(id: number) {
		return (
			((
				await this.matchRepository.update(
					{ id: Equal(id) },
					{ finished: true },
				)
			).affected || 0) > 0
		);
	}

	async resolve<T>(
		id: number,
		relation: keyof Match,
	): Promise<T | undefined> {
		return (
			await this.matchRepository.findOne({
				where: { id: Equal(id) },
				select: { [relation]: true },
				relations: [relation],
			})
		)?.[relation] as T;
	}
}
