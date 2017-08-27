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
			candidates.sort(function(a, b) {
				if( a.obtainable > b.obtainable ) return -1;
				if( a.obtainable < b.obtainable ) return 1;
				return 0;
			});

			const r = Math.random();
			const p = Math.pow(r, 16);

			const candidate = candidates[Math.floor(p * candidates.length)];
			board.place(candidate.x, candidate.y, this._disk);
		}
		return true;
	}
}
