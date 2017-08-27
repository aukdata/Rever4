class Player {
	constructor(mydisk) {
		this._clicked = false;
		this._waiting = false;
		this._mydisk = mydisk;
		this._ai = new AI(mydisk);

		document.getElementById("board").addEventListener("click", this.onClick.bind(this));
	}

	place() {
		if($("#" + this.getColor() + "_ai_toggle").prop("checked")) {
			this._ai.place();
			return true;
		}else{
			if(this._clicked) {
				this._clicked = false;
				return true;
			}else{
				this._waiting = true;
				return false;
			}
		}
	}

	onClick(e) {
		if(this._waiting) {
			let rect = e.target.getBoundingClientRect();
			let x = Math.floor((e.clientX - rect.left) / SQUARE_SIZE);
			let y = Math.floor((e.clientY - rect.top) / SQUARE_SIZE);

			if(board.canPlace(x, y, this._mydisk)) {
				board.place(x, y, this._mydisk);
				this._clicked = true;
				this._waiting = false;
			}else{
				log("Error : You cannot place the disk there.")
			}
		}
	}

	getColor() {
		return disks[this._mydisk].name;
	}
}
