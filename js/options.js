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

// configuration options
const OPTIONS = {
	// the version of the game
	version: '0.81',
	
	// player options
	PLAYER: {
	},

	// series options
	SERIES: {
		barWidth: 1, // controls width of bars/ticks in chart, i.e. how many time units is a bar/tick
		timePosition: 0
	},
	
	// indicator options
	INDICATORS: [
		{
			type: 'sma',
			parameters: {
				length: 20
			},
			displayOptions: {
				lines: { 
					show: true
				},
				color: 'orange'
			}
		},
		{
			type: 'sma',
			parameters: {
				length: 10
			},
			displayOptions: {
				lines: { 
					show: true
				},
				color: 'slategray'
			}
		},
		{
			type: 'bollinger',
			parameters: {
				length: 20,
				multiplier: 2
			},
			displayOptions: {
				lines: { 
					show: true
				},
				color: 'lavender'
			}
		},
		{
			type: 'sar',
			parameters: {
				intialAccelerationFactor: 0.02,
				accelerationFactorStep: 0.02,
				maxAccelerationFactor: 0.2
			},
			displayOptions: {
				points: {
					show: true,
					radius: 1
				},
				color: 'steelblue'
			}
		}
	],
	
	// high score options
	HIGHSCORES: {
		maxScores: 10,
		load: true
	},

	// game options
	GAME: {
		timeOut: 1500, // in ms, controls the speed of the game
	},

	// UI options
	UI: {
		intialStatusBarText: {
			template: 'LongOrShort',
			parameters: {}
		},
		margin: 0,
		red: [217, 83, 79],
		green: [92, 184, 92],
		dataShown: 40, // amount of data points shown in chart
		chartOptions: {
			candles: {
				show: true,
				candleWidth: 0.5, //function() { return this.SERIES.barWidth / 2; },
				upFillColor: '#5bc0de',
				downFillColor: '#d2322d'
			},
			xaxis: {
				noTicks: 0
			},
			grid: {
				horizontalLines: false,
				outlineWidth: 0
			}
		},
		markerImages: {
			longMarker: 'img/long-marker.png',
			shortMarker: 'img/short-marker.png',
			closeMarker: 'img/close-marker.png'
		},
		markerOptions: {
			show: true,
			position: 'cm'
		},
		progressBarOptions: {
			level2: 75,
			level3: 90
		}
	},
		
	// dictionary options
	DICTIONARY: {
		defaultLanguage: 'en-US'
	}
}
