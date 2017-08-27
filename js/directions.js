// 701
// 6*2
// 543

let shift = function(x, y, dir) {
	switch(dir) {
		case 0: --y; break;
		case 1: ++x, --y; break;
		case 2: ++x; break;
		case 3: ++x, ++y; break;
		case 4: ++y; break;
		case 5: --x, ++y; break;
		case 6: --x; break;
		case 7: --x, --y; break;
	}
	return {x: x, y: y};
}
