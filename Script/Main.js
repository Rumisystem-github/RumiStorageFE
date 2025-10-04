const ACCOUNT_API = "https://account.rumiserver.com/api/";
const LOGIN_PAGE = "https://account.rumiserver.com/Login?rd=storage";

let dialog = new DIALOG_SYSTEM();
let rspa = new RSPA();
let session = null;
let self_user = null;
let current_path = "/";
let mel = {
	dir_contents: document.getElementById("DIR_CONTENTS")
};

window.addEventListener("load", async (E) => {
	session = ReadCOOKIE().SESSION;
	if (session !== null) {
		//ログインする
		self_user = await LOGIN(session);
		if (self_user !== false) {
			current_path = `/home/${self_user.ID}`;
		} else {
			window.location.href = LOGIN_PAGE;
			return;
		}
	}

	await reload_dir();
});

async function reload_dir() {
	const list = await get_directory(current_path);

	mel.dir_contents.innerHTML = "";
	for (let i = 0; i < list.length; i++) {
		const row = list[i];
		mel.dir_contents.appendChild(await gen_dir_item(row));
	}
}