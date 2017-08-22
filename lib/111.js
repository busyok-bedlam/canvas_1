"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
//border
var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = w;
canvas.height = h;
var mouse = {
	x: undefined,
	y: undefined
};
var colours = ["#FC6262", "#57CC70", "#F22A8B", "#2A4EF2", "#8E2AF2", "#2AF2F0", "#2AF232", "#F2372A", "#F2DF2A", "#F27D2A"];
window.addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
}, false);
window.addEventListener('resize', function (event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}, false);

var Circle = function () {
	function Circle(r) {
		_classCallCheck(this, Circle);

		this.x = Math.random() * (w - 2 * r) + r;
		this.y = Math.random() * (h - 2 * r) + r;
		this.r = Math.random() * 3 + 1;
		this.dx = Math.random() + 0.5;
		this.dy = Math.random() + 0.5;
		this.colour = colours[Math.floor(Math.random() * colours.length)];
	}

	_createClass(Circle, [{
		key: "draw",
		value: function draw() {

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fillStyle = this.colour;
			ctx.fill();
		}
	}, {
		key: "update",
		value: function update() {
			if (mouse.x - this.x < 60 && mouse.x - this.x > -60 && mouse.y - this.y < 60 && mouse.y - this.y > -60) {
				if (this.r < 60) {
					this.r += 1;
					//	this.color = "#ccc";
				}
			} else if (this.r > 5) {
				this.r -= 1;
				// this.color = "#000";
			}

			if (this.x + this.r > w || this.x - this.r < 0) {
				this.dx = -this.dx;
			}
			if (this.y + this.r > h || this.y - this.r < 0) {
				this.dy = -this.dy;
			}
			this.x += this.dx;
			this.y += this.dy;
		}
	}, {
		key: "move",
		value: function move() {
			this.update();
			this.draw();
		}
	}]);

	return Circle;
}();

var circleArray = [];
for (var i = 0; i < 4000; i++) {
	circleArray.push(new Circle(5));
}

function animate() {
	ctx.beginPath();
	ctx.fillStyle = "#9CAD9E";
	ctx.fillRect(0, 0, w, h);
	for (var _i = 0; _i < 4000; _i++) {
		circleArray[_i].move();
	}
	requestAnimationFrame(animate);
}
animate();