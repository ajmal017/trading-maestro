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

// series object
function Series(options) {
	
	// copy options
	this.barWidth = options.barWidth;
	this.timePosition = options.timePosition;
	
	// copy the positions of the different price elements, shifting them if the timePosition is inserted before them
	this.openPricePosition = options.scenario.openPricePosition >= options.timePosition ? options.scenario.openPricePosition + 1 : options.scenario.openPricePosition;
	this.highPricePosition = options.scenario.highPricePosition >= options.timePosition ? options.scenario.highPricePosition + 1 : options.scenario.highPricePosition;
	this.lowPricePosition = options.scenario.lowPricePosition >= options.timePosition ? options.scenario.lowPricePosition + 1 : options.scenario.lowPricePosition;
	this.closePricePosition = options.scenario.closePricePosition >= options.timePosition ? options.scenario.closePricePosition + 1 : options.scenario.closePricePosition;
		
	// create data array with time indices for prices. time depends on the bar width (which is the width of the bars in time units)
	var source = options.scenario.data; // shorthand for data from scenario
	this.data = []; // the data array to store the series with time indices in
	var timer = 0; // counter of time units
	// loop through all prices of the series
	for (var i = 0; i < source.length; i++) {
		var entry = [timer]; // init our current price entry with only the timer
		// and then add all prices (e.g. open, high, low, close) to the current price entry
		for (var j = 0; j < source[i].length; j++) {
			entry.push(source[i][j]);
		}
		this.data.push(entry); // copy the entry into the data array
		timer += this.barWidth; // advance the timer one bar
	}
	
	// calculate the indicators
	this.calculateIndicators(options.indicators);
	
	// set vars and pointers to initial state
	this.reset();
}

Series.prototype.reset = function() {
	this.timer = this.initialTimer || 0; // set the timer to the initial value, if another entity has told us, otherwise start at 0
	this.endFlag = false;
	this.markers = new Array();
};

Series.prototype.setInitialTimer = function(timer) {
	// check that the initial timer is not out of bounds
	if (timer < 0) {
		timer = 0;
	}
	else if (timer >= this.data.length) {
		timer = this.data.length - 1;
	}
	this.initialTimer = timer;
	// if the current timer is not already more advanced than the initial timer, set it to the initial timer. it can be more advanced when resuming a saved game
	if (this.timer < timer) {
		this.timer = timer;
	}
};

// return the last dataPoints data points from the current timer
Series.prototype.getData = function(dataPoints) {
	// move the timer forward so that we get all data points
	if (this.timer < dataPoints) {
		// make sure that we actually have all the data points requested
		if (dataPoints > this.data.length) {
			dataPoints = this.data.length;
		}
		// move timer
		this.timer = dataPoints - 1;
	}
	// extract the requested data points from the array
	var slice = this.data.slice(this.timer - dataPoints + 1, this.timer + 1); // this.timer + 1 because of the way slice works
	return slice;
};

Series.prototype.getCurrent = function() {
	return this.data[this.timer][this.closePricePosition];
};

Series.prototype.hasEnded = function() {
	return this.endFlag;
};

Series.prototype.getTimer = function() {
	return this.timer;
};

// fetch the next price in the series
Series.prototype.next = function() {
	
	// if the series has ended, nothing changes
	if (this.endFlag) {
		return;
	}
	
	// advance the series
	this.timer++;
	
	// check end of series
	if (this.timer >= this.data.length - 1) {
		this.endFlag = true;
		// set timer back to point to last price
		this.timer = this.data.length - 1;
	}
}

// fast forward the timer to the time given in the argument
Series.prototype.fastForward = function(time) {
	// we set it to the previous point and then next to get the relevant checks performed
	this.timer = time - 1;
	this.next();
};

// progress of series in %
Series.prototype.getProgress = function() {
	// get start and end points of series
	var start = this.initialTimer || 0;
	var end = this.data.length - 1 || 0;
	// calculate total length of series
	var total = end - start;
	// get where we currently are. remember that we start the series from the initial timer, not 0, so discount it for the progress
	var current = this.timer || 0;
	current -= start;
	// calculate progress in percent
	progress = current / total * 100;
	return progress;
};

Series.prototype.markClose = function() {
	this.mark('close');
};

Series.prototype.markLong = function() {
	this.mark('long');
};

Series.prototype.markShort = function() {
	this.mark('short');
};

Series.prototype.mark = function(type) {
	// index of last element in marker list
	var last = this.markers.length - 1;
	// markers can only be added at the end of the list
	if (last >= 0 && this.markers[last][0] > this.timer) {
		return;
	}
	// overwrite markers that are already set
	if (last >= 0 && this.markers[last][0] === this.timer) {
		this.markers[last][2] = type;
	}
	// add new ones
	else {
		this.markers.push([this.timer, this.data[this.timer][this.closePricePosition], type]);
	}
};

Series.isCloseMark = function(mark) {
	return mark[2] === 'close';
};

Series.isLongMark = function(mark) {
	return mark[2] === 'long';
};

Series.isShortMark = function(mark) {
	return mark[2] === 'short';
};

Series.prototype.getMarkers = function(dataPoints) {
	// if the dataPoints parameter is omitted or null, return all data points
	if (dataPoints == null) {
		return this.markers;
	}
	// find the all the markers that have a timestamp between now and now - data point to get
	var first = this.timer - dataPoints + 1;
	var selectedMarkers = new Array();
	for (var i = this.markers.length - 1; i >= 0; i--) {
		if (this.markers[i][0] <= this.timer && this.markers[i][0] >= first) {
			selectedMarkers.push(this.markers[i]);
		}
		else if (this.markers[i][0] < first) {
			// the markers list is ordered, so once we are past the first (we go from back to front), we can exit the loop
			break;
		}
	}
	return selectedMarkers;
};

Series.prototype.setMarkers = function(markers) {
	this.markers = markers;
};

// indicators -- refactor this into its own class some day
Series.prototype.calculateIndicators = function(indicators) {
	
	this.indicators = {};
	
	// indicators is an array with indicator definitions
	// all indicators have an id, a type and optional parameters. the parameters themselves depend on the indicator
	for (var id in indicators) {
		// sma
		if (indicators[id].type === 'sma') {
			// the sma takes a length parameter
			try {
				this.calculateSMA(id, indicators[id].parameters.length);
			}
			catch(e) {
				console.error("Error in parameters passed to SMA");
				console.error(e);
			}
		}
		// bollinger bands
		else if (indicators[id].type === 'bollinger') {
			// bollinger bands take a length and a multiplier parameter
			try {
				this.calculateBollingerBands(id, indicators[id].parameters.length, indicators[id].parameters.multiplier);
			}
			catch(e) {
				console.error("Error in parameters passed to Bollinger Bands");
				console.error(e);
			}
		}
		// parabolic sar
		else if (indicators[id].type === 'sar') {
			// the sar takes an initial acceleration factor, an acceleration factor step and a max acceleration factor as parameters
			try {
				this.calculateSAR(id, indicators[id].parameters.intialAccelerationFactor, indicators[id].parameters.accelerationFactorStep, indicators[id].parameters.maxAccelerationFactor);
			}
			catch(e) {
				console.error("Error in parameters passed to Parabolic SAR");
				console.error(e);
			}
		}
	}
};

Series.generateIndicatorId = function(indicator) {
	// build id from type and parameters
	var id = indicator.type;
	// to make it deterministic, the parameters have to be looped in the same order
	var sortedParameterKeys = Object.keys(indicator.parameters).sort();
	for (var i = 0; i < sortedParameterKeys.length; i++) {
		id += '_' + indicator.parameters[sortedParameterKeys[i]];
	}
	return id;
};

Series.prototype.getIndicator = function(id, dataPoints) {
	// get the slice of dataPoints for every component of the indicator
	var slices = {};
	for (var component in this.indicators[id]) {
		var slice = this.indicators[id][component].slice(this.timer - dataPoints + 1, this.timer + 1); // this.timer + 1 because of the way slice works
		slices[component] = slice;
	}
	return slices;
};

// calculate the SMA
Series.prototype.calculateSMA = function(id, length) {
	
	// check if the indicator is cached
	if (this.indicators[id]) {
		return;
	}
	
	var series = [];
	var sum = 0;
	var sma;
	
	for (var i = 0; i < this.data.length; i++) {
		sum += this.data[i][this.closePricePosition];
		if (i < length) {
			sma = sum / (i + 1);
		}
		else {	
			sum -= this.data[i - length][this.closePricePosition];
			sma = sum / length;
		}	
		series.push([this.data[i][this.timePosition], sma]);
	}
	
	this.indicators[id] = { sma: series };
};

// calculate Bollinger Bands
Series.prototype.calculateBollingerBands = function(id, length, multiplier) {

	// check if the indicator is cached
	if (this.indicators[id]) {
		return;
	}
	
	// we depend on the SMA of our length. calculate its id. create a fake sma options object
	var smaOptions = {
		type: 'sma',
		parameters: {
			length: length
		}
	};
	var smaId = Series.generateIndicatorId(smaOptions);
	// once we have the id, calculate the sma itself
	this.calculateSMA(smaId, length);
	
	// here we are going to store the results
	var upperSeries = [];
	var lowerSeries = [];
	
	// calculate the values
	for (var i = 0; i < this.data.length; i++) {
		var sum = 0;
		var realLength = Math.min(length, i + 1); // make sure to not get out of bounds
		// calculate stdev
		for (var j = 0; j < realLength; j++) {
			sum += Math.pow(this.data[i - j][this.closePricePosition] - this.indicators[smaId]['sma'][i - j][1], 2);
		}
		var stdev = Math.sqrt(sum / realLength);
		// calculate upper and lower bands
		var upper = this.indicators[smaId]['sma'][i][1] + multiplier * stdev;
		var lower = this.indicators[smaId]['sma'][i][1] - multiplier * stdev;
		upperSeries.push([this.data[i][this.timePosition], upper]);
		lowerSeries.push([this.data[i][this.timePosition], lower]);
	}
	
	this.indicators[id] = { upper: upperSeries, lower: lowerSeries };
};

// calculate Parabolic SAR
Series.prototype.calculateSAR = function(id, intialAccelerationFactor, accelerationFactorStep, maxAccelerationFactor) {
	
	// check if the indicator is cached
	if (this.indicators[id]) {
		return;
	}
	
	// always start out long. therefore the sar and extreme point are initialized to low and high of the first bar respectively
	var isLong = true;
	var extremePoint = this.data[this.timePosition][this.highPricePosition];
	var sar = this.data[this.timePosition][this.lowPricePosition];
	var accelerationFactor = intialAccelerationFactor;
	
	// store results here
	var series = [[this.data[0][this.timePosition], sar]];
		
	// calculate for each day
	for (var i = 0; i < this.data.length - 1; i++) {
		if (isLong) {
			// update extreme point
			var isNewExtreme = this.data[i][this.highPricePosition] > extremePoint;
			if (isNewExtreme) {
				extremePoint = this.data[i][this.highPricePosition];
			}
			
			// update sar
			// first, check that we do not turn
			if (sar > this.data[i][this.lowPricePosition]) {
				// we do turn
				// sar is previous extreme point
				sar = extremePoint;
				series.push([this.data[i + 1][this.timePosition], sar]);
				// switch to short
				isLong = false;
				// reset acceleration Factor
				accelerationFactor = intialAccelerationFactor;
			}
			// we do not turn, make normal calculations
			else {
				sar += accelerationFactor * (extremePoint - sar);
				// the sar cannot be higher than today's or yesterday's low
				if (sar > this.data[i][this.lowPricePosition]) {
					sar = this.data[i][this.lowPricePosition];
				}
				if (i > 0 && sar > this.data[i - 1][this.lowPricePosition]) {
					sar = this.data[i - 1][this.lowPricePosition];
				}
				// add tomorrow's sar to the series
				series.push([this.data[i + 1][this.timePosition], sar]);
				
				// update acceleration Factor
				if (isNewExtreme) {
					accelerationFactor += accelerationFactorStep;
					if (accelerationFactor > maxAccelerationFactor) {
						accelerationFactor = maxAccelerationFactor;
					}
				}
			}
		}
		// short
		else {
			// update extreme point
			var isNewExtreme = this.data[i][this.lowPricePosition] < extremePoint;
			if (isNewExtreme) {
				extremePoint = this.data[i][this.lowPricePosition];
			}
			
			// update sar
			// first, check that we do not turn
			if (sar < this.data[i][this.highPricePosition]) {
				// we do turn
				// sar is previous extreme point
				sar = extremePoint;
				series.push([this.data[i + 1][this.timePosition], sar]);
				// switch to short
				isLong = true;
				// reset acceleration Factor
				accelerationFactor = intialAccelerationFactor;
			}
			// we do not turn, make normal calculations
			else {
				sar += accelerationFactor * (extremePoint - sar);
				// the sar cannot be lower than today's or yesterday's high
				if (sar < this.data[i][this.highPricePosition]) {
					sar = this.data[i][this.highPricePosition];
				}
				if (i > 0 && sar < this.data[i - 1][this.highPricePosition]) {
					sar = this.data[i - 1][this.highPricePosition];
				}
				// add tomorrow's sar to the series
				series.push([this.data[i + 1][this.timePosition], sar]);
				
				// update acceleration Factor
				if (isNewExtreme) {
					accelerationFactor += accelerationFactorStep;
					if (accelerationFactor > maxAccelerationFactor) {
						accelerationFactor = maxAccelerationFactor;
					}
				}
			}
		}
	}
	
	this.indicators[id] = { sar: series };
};
