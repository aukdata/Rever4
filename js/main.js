document.addEventListener("DOMContentLoaded", function(e) {
	let players = new Array(4);
	for(let i=0; i < 4; ++i) {
		players[i] = new Player(i + 1);
	}

	let turn = 0;
	const next = function() {
		if(players[turn % 4].place()) {
			++turn;
			$("#turn").text("Turn : " + players[turn % 4].getColor());
		}
		setTimeout(next, 100);
	}

	next();
});
