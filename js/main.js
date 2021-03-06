let loaded = function() {
	let players = new Array(4);
	for(let i=0; i < 4; ++i) {
		players[i] = new Player(i + 1);
	}

	let turn = 0;
	const next = function() {
		if(players[turn % 4].place()) {
			++turn;
			$(".turn_cursor").css("color", "white");
			$("#" + players[turn % 4].getColor() + "_turn_cursor").css("color", "darkred");
		}

		if(board.getNumber(DISK_NULL) > 0) {
			setTimeout(next, 100);
		}else{
			$(".turn_cursor").css("color", "white");
		}
	}

	next();
}

document.addEventListener("DOMContentLoaded", loaded);
