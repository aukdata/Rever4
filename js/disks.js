const DISK_NULL = 0;
const DISK_RED = 1;
const DISK_BLUE = 2;
const DISK_YELLOW = 3;
const DISK_GREEN = 4;

let disks = new Array(5);
disks[DISK_NULL] = {id: DISK_NULL, color: "", name: ""};
disks[DISK_RED] = {id: DISK_RED, color: "#B53E2F", name: "red"};
disks[DISK_BLUE] = {id: DISK_BLUE, color: "#26547C", name: "blue"};
disks[DISK_YELLOW] = {id: DISK_YELLOW, color: "#FFC744", name: "yellow"};
disks[DISK_GREEN] = {id: DISK_GREEN, color: "#2C7043", name: "green"};

document.addEventListener("DOMContentLoaded", function(e) {
	$(".red_disk").css("color", disks[DISK_RED].color);
	$(".blue_disk").css("color", disks[DISK_BLUE].color);
	$(".yellow_disk").css("color", disks[DISK_YELLOW].color);
	$(".green_disk").css("color", disks[DISK_GREEN].color);
});
