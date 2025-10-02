//--------------------------------------------------るみ鯖アカウント
async function get_account(ID) {
	let AJAX = await fetch(ACCOUNT_API + "User?ID=" + ID + "&SERVICE=RUMICHAT", {
		method: "GET",
		headers: {
			TOKEN: session
		},
		cache: "no-store"
	});

	const RESULT = await AJAX.json();
	if (RESULT.STATUS) {
		return RESULT.ACCOUNT;
	} else {
		throw new Error(RESULT.ERR);
	}
}
async function get_account_from_uid(UID) {
	let AJAX = await fetch(ACCOUNT_API + "User?UID=" + UID + "&SERVICE=RUMICHAT", {
		method: "GET",
		headers: {
			TOKEN: session
		},
		cache: "no-store"
	});

	const RESULT = await AJAX.json();
	if (RESULT.STATUS) {
		return RESULT.ACCOUNT;
	} else {
		throw new Error(RESULT.ERR);
	}
}
//--------------------------------------------------ディレクトリ
async function get_directory(path) {
	let AJAX = await fetch("/api/Directory?PATH=" + path, {
		method: "GET",
		headers: {
			TOKEN: session
		},
		cache: "no-store"
	});

	const RESULT = await AJAX.json();
	if (RESULT.STATUS) {
		return RESULT.LIST;
	} else {
		throw new Error(RESULT.ERR);
	}
}