class AI {
	constructor(mydisk) {
		this._disk = mydisk;
	}

	place() {
		let candidates = [];

		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				const obtainable = board.getObtainableCount(x, y, this._disk);
				if(board.canPlace(x, y, this._disk)) {
					candidates.push({x: x, y: y, obtainable: obtainable});
				}
			}
		}

		if(candidates.length > 0) {
			const candidate = candidates[Math.floor(Math.random() * candidates.length)];
			board.place(candidate.x, candidate.y, this._disk);
		}
		return true;
	}
}
