
export class InvalidEmailError extends Error {
	constructor() {
		super("Invalid email");
	}
}

export default function checksEmail(email: string): true | InvalidEmailError {
	if (!email.includes("@")) {
		throw new InvalidEmailError();
	}
	return true;
}
