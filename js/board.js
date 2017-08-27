const SQUARE_COUNT = 8;
const BOARD_SIZE = 700;
const SQUARE_SIZE = BOARD_SIZE / SQUARE_COUNT;

class Board {
	constructor() {
		this._ctx = null;

		this._squares = new Array(SQUARE_COUNT);
		for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
			this._squares[y] = new Array(SQUARE_COUNT);
			for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
				this._squares[y][x] = DISK_NULL;
			}
		}

		const half = Math.floor(SQUARE_COUNT / 2);
		this._squares[half - 1][half - 1] = DISK_RED;
		this._squares[half][half - 1] = DISK_WHITE;
		this._squares[half - 1][half] = DISK_YELLOW;
		this._squares[half][half] = DISK_GREEN;

		const that = this;
		document.addEventListener("DOMContentLoaded", function(e) {
			let canvas = document.getElementById("board");
			canvas.width = 700;
			canvas.height = 700;
			that._ctx = canvas.getContext("2d");
			that.update();
		});
	}

	update() {
		this.render();

		let counter = [0, 0, 0, 0, 0];
		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				++counter[this.get(x, y)];
			}
		}

		for(let o of disks) {
			$("#" + o.name + "_counter").text("" + counter[o.id]);
		}
	}

	render() {
		this._ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		this._ctx.fillStyle = "black";
		this._ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				this._ctx.fillStyle = "green";
				this._ctx.fillRect(x * SQUARE_SIZE + 1, y * SQUARE_SIZE + 1, SQUARE_SIZE - 1, SQUARE_SIZE - 1);

				let state = this._squares[y][x];
				this._ctx.fillStyle = disks[state].color;
				this._ctx.beginPath();
				this._ctx.arc(x * SQUARE_SIZE + SQUARE_SIZE / 2, y * SQUARE_SIZE + SQUARE_SIZE / 2 , SQUARE_SIZE / 2 - SQUARE_SIZE / 10, 0, Math.PI * 2, true);
				this._ctx.fill();
			}
		}
	}

	set(x, y, state) {
		if(0 <= x && x < SQUARE_COUNT && 0 <= y && y < SQUARE_COUNT) {
			board._squares[y][x] = state;
		}
 	}
	get(x, y) {
		if(0 <= x && x < SQUARE_COUNT && 0 <= y && y < SQUARE_COUNT) {
			return board._squares[y][x];
		}else{
			return DISK_NULL;
		}
	}

	place(x, y, state) {
		if(this.get(x, y) != DISK_NULL) return false;

		this.set(x, y, state);

		for(let i = 0 ; i < 8 ; ++i) {
			let count = 0;
			let cpos = {x: x, y: y};

			while(true) {
				cpos = shift(cpos.x, cpos.y, i);
				const cstate = this.get(cpos.x, cpos.y);

				if(cstate == state) break;
				if(cstate == DISK_NULL) {
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
		if(this.get(x, y) != DISK_NULL) return 0;

		let maxcount = 0;

		for(let i = 0 ; i < 8 ; ++i) {
			let count = 0;
			let cpos = {x: x, y: y};

			while(true) {
				cpos = shift(cpos.x, cpos.y, i);
				const cstate = this.get(cpos.x, cpos.y);

				if(cstate == state) break;
				if(cstate == DISK_NULL) {
					count = 0;
					break;
				}
				++count;
			}
			maxcount += count;
		}
		return maxcount;
	}

	canPlace(x, y, state) {
		return true;//this.getMaxObtainableCount(x, y, state) > 0;
	}

	getNumber(state) {
		let counter = 0;
		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				++counter;
			}
		}
		return counter;
	}
}

let board = new Board();
