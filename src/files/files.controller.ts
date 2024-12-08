import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/auth.guard";
import { User } from "src/users/user.entity";

@Controller("files")
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post("upload")
	@UseInterceptors(FileInterceptor("file"))
	@UseGuards(AuthGuard("jwt"))
	uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: User,
	) {
		return this.filesService.upload(file, user);
	}

	@Post("update")
	@UseInterceptors(FileInterceptor("file"))
	async updateFile(
		@Body("id") id: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.filesService.update(id, file);
	}

	@Get(":id")
	async getFile(@Param("id") id: string) {
		return this.filesService.readFile(id);
	}
}
