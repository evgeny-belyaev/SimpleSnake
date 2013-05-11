define('app', ['underscore', 'paper', 'install'], function () {

	var canvas = document.getElementById('canvas');
	paper.setup(canvas);

	paper.project.currentStyle = {
		strokeColor: 'black',
		strokeWidth: 5,
		strokeCap: 'round',
		strokeJoin: 'round'
	};

	var direction = [1, 0],
		k = 5,
		timestep = 50,
		snake = new paper.Path({
			segments: _.map(_.range(10), function (x) {
				return [10 + x * k, 50];
			})
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

	paper.view.onFrame = _.throttle(function () {
		snake.removeSegment(0);

		var last = _.last(snake.segments);
		snake.addSegment([
			last.point.x + k * direction[0],
			last.point.y + k * direction[1]
		]);
	}, timestep);

	paper.view.draw();

})