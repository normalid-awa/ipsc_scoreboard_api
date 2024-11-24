export enum PasswordCheckFailReason {
	TooShort = "Password is too short",
}

export class PasswordNotNotStrongEnoughError extends Error {
	constructor(readonly reason: PasswordCheckFailReason) {
		super("Password is not strong enough");
	}
}

export default function checksPassword(rawPassword: string): true | PasswordNotNotStrongEnoughError {
	if (rawPassword.length < 8) {
		return new PasswordNotNotStrongEnoughError(
			PasswordCheckFailReason.TooShort,
		);
	}
	return true;
}
