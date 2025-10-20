async function gen_dir_item(data) {
	let item = document.createElement("DIV");
	item.className = "DIR_ITEM";

	let icon = document.createElement("IMG");
	item.appendChild(icon);
	icon.src = "/icons/dir.png";

	let name = document.createElement("DIV");
	item.appendChild(name);
	name.innerText = data.PATH.split("/")[data.PATH.split("/").length - 1];

	//開く動作
	icon.addEventListener("dblclick", (e)=>{
		change_path(data.PATH);
	});

	return item;
}

async function gen_file_item(data) {
	let item = document.createElement("DIV");
	item.className = "DIR_ITEM";

	let icon = document.createElement("IMG");
	item.appendChild(icon);
	icon.src = "/icons/unknown.png";

	let name = document.createElement("DIV");
	item.appendChild(name);
	name.innerText = data.PATH.split("/")[data.PATH.split("/").length - 1];

	//開く動作
	icon.addEventListener("dblclick", (e)=>{
		//開く
	});

	return item;
}