define('install', ['jquery'], function () {
	var $installButton = $('#install'),
		pathToManifest = 'http://127.0.0.1/SimpleSnake.webapp';

	$(navigator.mozApps.checkInstalled(pathToManifest)).on({
		success: function () {
			console.log(this.result);
			if (this.result) {
				$installButton.hide();
			}
		}
	});

	$installButton.on({
		'click': function (e) {
			$(navigator.mozApps.install(pathToManifest)).on({
				success: function () {
					alert('Done!');
				},
				error: function () {
					debugger;
				}
			});
		}
	});
})
