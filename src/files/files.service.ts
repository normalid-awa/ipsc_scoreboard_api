import {
	Injectable,
	InternalServerErrorException,
	StreamableFile,
} from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { File } from "./file.entity";
import { EntityManager, Equal, Repository } from "typeorm";
import * as fs from "fs/promises";
import filesConfig from "config/files.config";
import * as path from "path";
import { User } from "src/users/user.entity";
import { createReadStream } from "fs";

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(File)
		private readonly fileRepository: Repository<File>,
		@InjectEntityManager()
		private readonly entityManager: EntityManager,
	) {}

	async findOneById(id: string) {
		return await this.fileRepository.findOneBy({
			id: Equal(id),
		});
	}

	async readFile(id: string) {
		const file = await this.fileRepository.findOneBy({
			id: Equal(id),
		});
		if (!file) return null;

		const dir = path.dirname(file.path);
		const splitted = dir.split(path.sep);
		const mime = `${splitted[splitted.length - 2]}/${splitted[splitted.length - 1]}`;

		return new StreamableFile(createReadStream(file.path), {
			type: mime,
			disposition: `attachment; filename=${file.name}`,
		});
	}

	async upload(file: Express.Multer.File, owner?: User) {
		const ownerInsert = owner ? { owner } : {};
		const dir = path.join(filesConfig.uploadDir, file.mimetype);
		const fileEntity = this.fileRepository.create({
			name: file.originalname,
			path: dir,
			...ownerInsert,
		});

		return await this.entityManager.transaction(
			async (transactionalEntityManager) => {
				const repo = transactionalEntityManager.getRepository(File);
				const uuid = (await repo.save(fileEntity)).id;

				if (!uuid) {
					throw new InternalServerErrorException(
						"Failed to generate UUID",
					);
				}

				try {
					await fs.opendir(dir, { recursive: true });
				} catch (r) {
					if (r.code === "ENOENT") {
						await fs.mkdir(dir, {
							recursive: true,
						});
					}
				}
				const fullPath = path.join(
					dir,
					`${uuid}.${file.originalname.split(".").pop()}`,
				);

				await fs.writeFile(fullPath, file.buffer);

				await repo.update(uuid, {
					path: fullPath,
				});

				return uuid;
			},
		);
	}

	async update(id: string, file: Express.Multer.File) {
		const fileEntity = await this.fileRepository.findOneBy({
			id: Equal(id),
		});

		if (!fileEntity) return false;

		const originalBackup = `${fileEntity.path}.old`;
		await fs.rename(fileEntity.path, originalBackup);

		try {
			const dir = path.join(filesConfig.uploadDir, file.mimetype);

			try {
				await fs.opendir(dir, { recursive: true });
			} catch (r) {
				if (r.code === "ENOENT") {
					await fs.mkdir(dir, {
						recursive: true,
					});
				}
			}
			const fullPath = path.join(
				dir,
				`${fileEntity.id}.${file.originalname.split(".").pop()}`,
			);

			await fs.writeFile(fullPath, file.buffer);

			await this.fileRepository.update(fileEntity.id, {
				path: fullPath,
			});

			await fs.rm(originalBackup, { force: true });
			return true;
		} catch (e) {
			await fs.rename(
				originalBackup,
				originalBackup.substring(0, originalBackup.length - 4),
			);
			return false;
		}
	}
}
