define('app', ['underscore', 'paper'], function () {

	var canvas = document.getElementById('canvas');
	paper.setup(canvas);

	paper.project.currentStyle = {
		strokeColor: 'black',
		strokeWidth: 10,
		strokeCap: 'round',
		strokeJoin: 'round'
	};

	var direction = [1, 0],
		k = 5,
		timestep = 50,
		screen = {
			width: 300,
			height: 300
		},
		snake = new paper.Path({
			segments: _.map(_.range(10), function (x) {
				return [10 + x * k, 50];
			}),
			closed: false
		});

	window.addEventListener('keypress', function (e) {
		switch (e.charCode) {
			case 119: //w
				direction[0] = 0;
				direction[1] = -1;
				break;
			case 97: //a
				direction[0] = -1;
				direction[1] = 0;
				break;
			case 115: //s
				direction[0] = 0;
				direction[1] = 1;
				break;
			case 100: //d
				direction[0] = 1;
				direction[1] = 0;
				break;
		}
	});

	var update = _.throttle(function () {
		var last = _.last(snake.segments),
			nextX, nextY;

		if (last.point.x === 0 || last.point.x === screen.width) {
			direction[0] = -direction[0];
		}

		if (last.point.y === 0 || last.point.y === screen.height) {
			direction[1] = -direction[1];
		}

		nextX = (last.point.x + k * direction[0]);
		nextY = (last.point.y + k * direction[1]);

		snake.removeSegment(0);
		snake.addSegment([nextX, nextY]);
	}, timestep);

	paper.view.onFrame = function(e) {
		update();
	};

	paper.view.draw();
})