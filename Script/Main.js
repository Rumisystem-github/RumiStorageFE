const ACCOUNT_API = "https://account.rumiserver.com/api/";
const LOGIN_PAGE = "https://account.rumiserver.com/Login?rd=storage";

let dialog = new DIALOG_SYSTEM();
let rspa = new RSPA();
let session = null;
let self_user = null;
let current_path = "/";
let mel = {
	top_bar: {
		path_diplay: document.getElementById("PATH_DISPLAY"),
		button: {
			up: document.getElementById("DIR_UP_BUTTON")
		}
	},
	dir_contents: document.getElementById("DIR_CONTENTS")
};

window.addEventListener("load", async (E) => {
	session = ReadCOOKIE().SESSION;
	if (session !== null) {
		//ログインする
		self_user = await LOGIN(session);
		if (self_user !== false) {
			const path = new URLSearchParams(window.location.search).get("PATH")
			if (path == null) {
				await change_path(`/home/${self_user.ID}`);
			} else {
				await change_path(path);
			}
		} else {
			window.location.href = LOGIN_PAGE;
			return;
		}
	}
});

window.addEventListener("popstate", async (e)=>{
	const path = new URLSearchParams(window.location.search).get("PATH");
	if (path !== current_path) {
		await change_path(path);
	}
});

mel.top_bar.path_diplay.addEventListener("keydown", async (e)=>{
	if (e.key !== "Enter") return;
	await change_path(mel.path_diplay.value);
});

mel.top_bar.button.up.addEventListener("click", async (e)=>{
	let path = current_path;

	//語尾のスラッシュを削除
	if (path.endsWith("/")) {
		path = path.replace(/\/$/, "");
	}

	let path_split = path.split("/");
	path_split.pop();

	await change_path(path_split.join("/"));
});

async function reload_dir() {
	const list = await get_directory(current_path);

	mel.dir_contents.innerHTML = "";
	for (let i = 0; i < list.length; i++) {
		const row = list[i];
		if (row.TYPE === "DIRECTORY") {
			mel.dir_contents.appendChild(await gen_dir_item(row));
		} else {
			mel.dir_contents.appendChild(await gen_file_item(row));
		}
	}
}

async function change_path(path) {
	current_path = path;
	refresh_path_display();
	await reload_dir();
}

function refresh_path_display() {
	mel.top_bar.path_diplay.value = current_path;

	if (decodeURIComponent(window.location.search) != "?PATH=" + current_path) {
		history.pushState("", "", "?PATH=" + current_path);
	}
}