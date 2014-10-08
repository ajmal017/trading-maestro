/**
Copyright 2014, Pablo Daniel Poveda Stahl

This file is part of Trading Maestro.

Trading Maestro is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Trading Maestro is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Trading Maestro.  If not, see <http://www.gnu.org/licenses/>.
**/

function Chart(options) {
    this.uiManager = options.uiManager;
	this.chartOptions = options.chartOptions;
	this.margin = options.margin;
	// markers
	this.markerOptions = options.markerOptions;
	this.longMarker = new Image();
	this.longMarker.onload = this.markerImagesLoaded.bind(this);
	this.longMarker.src = options.markerImages.longMarker;
	this.shortMarker = new Image();
	this.shortMarker.onload = this.markerImagesLoaded.bind(this);
	this.shortMarker.src = options.markerImages.shortMarker;
	this.closeMarker = new Image();
	this.closeMarker.onload = this.markerImagesLoaded.bind(this);
	this.closeMarker.src = options.markerImages.closeMarker;
	
	// calculate height of chart
    this.resize();
}

Chart.prototype.resize = function() {
    // the chart takes up the space left by all other elements minus a margin
	$('#chart').height(Math.floor((this.uiManager.getScreenHeight() - this.uiManager.statusBar.getHeight() - this.uiManager.progressBar.getHeight()  - this.uiManager.dashboard.getHeight()) * (1 - this.margin)));
};

Chart.prototype.draw = function() {
	// update chart
	// first, build an array with the price series and the active indicators
	var series = [this.uiManager.series.getData(this.uiManager.dataShown)];
	for (var id in this.uiManager.indicators) {
		if (this.uiManager.indicators[id].draw) {
			var components = this.uiManager.series.getIndicator(id, this.uiManager.dataShown); // get the components that make up the indicator, this can be one (SMA) or more (Bollinger Bands)
			for (var name in components) {
				series.push($.extend({ data: components[name] }, this.uiManager.indicators[id].displayOptions));
			}
		}
	}
	
	// add the markers
	var closeMarker = this.closeMarker;
	var longMarker = this.longMarker;
	var shortMarker = this.shortMarker;
	var labelFormatter = function(marker) {
		if (Series.isCloseMark(marker.data[marker.index])) {
			return closeMarker;
		}
		if (Series.isLongMark(marker.data[marker.index])) {
			return longMarker;
		}
		if (Series.isShortMark(marker.data[marker.index])) {
			return shortMarker;
		}
	};
	// if the marker images have loaded, add the markers to the series so they can be drawn
	if (closeMarker.complete && longMarker.complete && shortMarker.complete) {
		series.push({
			// fix bug here to only get markers that are in this.uiManager.dataShown
			data: this.uiManager.series.getMarkers(this.uiManager.dataShown),
			markers: $.extend(this.markerOptions, {
				labelFormatter: labelFormatter
			})
		});
	}
		
	// then draw the chart
	if ($('#chart').is(':visible')) {
		Flotr.draw(document.getElementById('chart'), series, this.chartOptions);
	}
};

Chart.prototype.blur = function() {
    $('#chart').addClass('bs-is-blurred');
};

Chart.prototype.unblur = function() {
	$('#chart').removeClass('bs-is-blurred');
};

Chart.prototype.markerImagesLoaded = function() {
	// redraw the chart once all the marker images have loaded
	if (this.closeMarker.complete && this.longMarker.complete && this.shortMarker.complete) {
		this.draw();
	}
};
