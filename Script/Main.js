const ACCOUNT_API = "https://account.rumiserver.com/api/";
const LOGIN_PAGE = "https://account.rumiserver.com/Login?rd=storage";

let dialog = new DIALOG_SYSTEM();
let rspa = new RSPA();
let session = null;
let self_user = null;
let current_path = "/";
let mel = {
	path_diplay: document.getElementById("PATH_DISPLAY"),
	dir_contents: document.getElementById("DIR_CONTENTS")
};

window.addEventListener("load", async (E) => {
	session = ReadCOOKIE().SESSION;
	if (session !== null) {
		//ログインする
		self_user = await LOGIN(session);
		if (self_user !== false) {
			current_path = `/home/${self_user.ID}`;
			refresh_path_display();
		} else {
			window.location.href = LOGIN_PAGE;
			return;
		}
	}

	await reload_dir();
});

window.addEventListener("popstate", async (e)=>{
	const path = new URLSearchParams(window.location.search).get("PATH");
	if (path !== current_path) {
		current_path = path;
		refresh_path_display();
		await reload_dir();
	}
});

mel.path_diplay.addEventListener("keydown", async (e)=>{
	if (e.key !== "Enter") return;

	current_path = mel.path_diplay.value;
	refresh_path_display();
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

function refresh_path_display() {
	mel.path_diplay.value = current_path;

	if (decodeURIComponent(window.location.search) != "?PATH=" + current_path) {
		history.pushState("", "", "?PATH=" + current_path);
	}
}