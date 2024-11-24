/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require("child_process");
const { writeFileSync, readFileSync } = require("fs");
const { glob } = require("glob");
const path = require("path");
const { cwd } = require("process");

glob(path.join(cwd(), "src", "**", "*.proto").replace(/\\/g, "/"), {
	nodir: true,
}).then((files) => {
	const command = [
		"protoc",
		'--plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd"',
		"--ts_proto_opt=nestJs=true",
		"--ts_proto_out=.",
		`--proto_path=${path.join(cwd())} `,
		...files.map((v) => `"${v}"`),
	];

	const filesPackagePair = [];
	files.forEach((file) => {
		const fileContent = readFileSync(file).toString();
		const pacakgeName = fileContent
			.match(/(package )(?:\w+)/g)[0]
			.replace("package ", "")
			.trim();
		filesPackagePair.push([pacakgeName, file]);
	});
	writeFileSync("./protoBufferPackages.json", JSON.stringify(filesPackagePair));
	console.log(filesPackagePair);
	exec(command.join(" "), (error, stdout, stderr) => {
		if (error) {
			console.error(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}
		console.log(`ProtoBuf generated successfully ${stdout}`);
	});
});
