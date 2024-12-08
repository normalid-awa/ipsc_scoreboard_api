import { join } from "path";
import { cwd } from "process";
import { FilesConfig } from "src/types";

export default {
	maxFiles: 10,
	maxFileSize: 10 * 1024 * 1024, // 10 MB
	uploadDir: join(cwd(), "uploads")
} satisfies FilesConfig;

