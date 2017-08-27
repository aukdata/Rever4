const SQUARE_COUNT = 16;
const BOARD_SIZE = 700;
const SQUARE_SIZE = BOARD_SIZE / SQUARE_COUNT;

class Board {
	constructor() {
		this._ctx = null;
		this._wins = false;
		this._sorted = false;
		this._squares = new Array(SQUARE_COUNT * SQUARE_COUNT);

		const that = this;
		document.addEventListener("DOMContentLoaded", function(e) {
			let canvas = document.getElementById("board");
			canvas.width = 700;
			canvas.height = 700;
			that._ctx = canvas.getContext("2d");
			that.reset();

			canvas.addEventListener("click", that.onClick.bind(that));
		});
	}

	reset() {
		this._wins = false;
		this._sorted = false;

		for(let i = 0 ; i < SQUARE_COUNT * SQUARE_COUNT ; ++i) {
			this._squares[i] = DISK_NULL;
		}

		const half = Math.floor(SQUARE_COUNT / 2);
		this.set(half - 1, half - 1, DISK_RED);
		this.set(half, half - 1, DISK_BLUE);
		this.set(half - 1, half, DISK_YELLOW);
		this.set(half, half, DISK_GREEN);

		this.update();
	}

	update() {
		this.render();

		let counter = [0, 0, 0, 0, 0];
		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				++counter[this.get(x, y)];
			}
		}

		if(counter[DISK_NULL] <= 0) {
			this._wins = true;
		}

		for(let o of disks) {
			$("#" + o.name + "_counter").text("" + counter[o.id]);
		}
	}

	render() {
		this._ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		this._ctx.fillStyle = "white";
		this._ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				this._ctx.fillStyle = "#EAEAEA";
				this._ctx.fillRect(x * SQUARE_SIZE + 1, y * SQUARE_SIZE + 1, SQUARE_SIZE - 2, SQUARE_SIZE - 2);

				const state = this.get(x, y);
				this._ctx.fillStyle = disks[state].color;
				this._ctx.beginPath();
				this._ctx.arc(x * SQUARE_SIZE + SQUARE_SIZE / 2, y * SQUARE_SIZE + SQUARE_SIZE / 2 , SQUARE_SIZE / 2 - SQUARE_SIZE / 10, 0, Math.PI * 2, true);
				this._ctx.fill();
			}
		}
	}

	set(x, y, state) {
		if(0 <= x && x < SQUARE_COUNT && 0 <= y && y < SQUARE_COUNT) {
			this._squares[y * SQUARE_COUNT + x] = state;
		}
 	}
	get(x, y) {
		if(0 <= x && x < SQUARE_COUNT && 0 <= y && y < SQUARE_COUNT) {
			return this._squares[y * SQUARE_COUNT + x];
		}else{
			return DISK_NULL;
		}
	}

	place(x, y, state) {
		if(this.get(x, y) !== DISK_NULL) return false;

		this.set(x, y, state);

		for(let i = 0 ; i < 8 ; ++i) {
			let count = 0;
			let cpos = {x: x, y: y};

			while(true) {
				cpos = shift(cpos.x, cpos.y, i);
				const cstate = this.get(cpos.x, cpos.y);

				if(cstate === state) break;
				if(cstate === DISK_NULL) {
					count = 0;
					break;
				}
				++count;
			}

			cpos = {x: x, y: y};
			if(count > 0) {
				for(let j = 0 ; j < count ; ++j) {
					cpos = shift(cpos.x, cpos.y, i);
					this.set(cpos.x, cpos.y, state);
				}
			}
		}

		this.update();
		return true;
	}

	getObtainableCount(x, y, state) {
		if(this.get(x, y) !== DISK_NULL) return 0;

		let totalCount = 0;

		for(let i = 0 ; i < 8 ; ++i) {
			let count = 0;
			let cpos = {x: x, y: y};

			while(true) {
				cpos = shift(cpos.x, cpos.y, i);
				const cstate = this.get(cpos.x, cpos.y);

				if(cstate === state) break;
				if(cstate === DISK_NULL) {
					count = 0;
					break;
				}
				++count;
			}
			totalCount += count;
		}
		return totalCount;
	}

	canPlace(x, y, state) {
		if(this.get(x, y) !== DISK_NULL) {
			return false;
		}

		for(let i = 0 ; i < 8 ; ++i) {
			let cpos = {x: x, y: y};

			cpos = shift(cpos.x, cpos.y, i);
			if(this.get(cpos.x, cpos.y) !== DISK_NULL) {
				return true;
			}
		}
		return false;
	}

	getNumber(state) {
		let counter = 0;
		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				if(this.get(x, y) === state) {
					++counter;
				}
			}
		}
		return counter;
	}

	onClick(e) {
		if(this._sorted) {
			this.reset();
			loaded();
			log("Reset");
		}else if(this._wins) {
			this._sorted = true;

			let counter = [0, 0, 0, 0, 0];
			for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
				for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
					++counter[this.get(x, y)];
				}
			}

			this._squares.sort(function(a, b) {
				if( a > b ) return -1;
				if( a < b ) return 1;
				return 0;
			});
			this._squares.sort(function(a, b) {
				if( counter[a] > counter[b] ) return -1;
				if( counter[a] < counter[b] ) return 1;
				return 0;
			});

			this.render();
		}
	}
}

const board = new Board();
