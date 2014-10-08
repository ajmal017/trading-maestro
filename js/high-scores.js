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

// high scores object
function HighScores(options) {
	
	// check if we need to try to load a highscore
	if (options.load) {
		// try to restore options
		if (window.localStorage) {
			var savedOptions = $.evalJSON(window.localStorage.getItem('highscores'));
			if (savedOptions) {
				// overwrite options with the saved options
				options = savedOptions;
			}
		}
	}
	
	// copy options. they will contain the saved options if loading was enabled and highscores had been saved
	this.maxScores = options.maxScores;
	
	// copy scores list from options or create empty object
	this.scores = options.scores || {};
	
	// initialize last score to value in options or empty object
	this.lastScoreIndex = options.lastScoreIndex || {};
}

// reset highscore in memory and local storage
HighScores.prototype.reset = function() {
	// create empty object
	this.scores = {};
	
	// initialize last score to empty object
	this.lastScoreIndex = {};
	
	// delete from local storage, if there is support for it
	if (window.localStorage) {
		window.localStorage.removeItem('highscores');
	}
}

HighScores.prototype.add = function(scenario, score) {
	// check if the scenario key already exists, otherwise create it and initialize it to the empty list
	if (!this.scores[scenario]) {
		this.scores[scenario] = [];
	}
	// same for last score index, only the initialization is to null
	if(this.lastScoreIndex[scenario] == null) {
		this.lastScoreIndex[scenario] = null;
	}
	
	// add score to list in a sorted fashion
	var i = 0;
	while (i < this.scores[scenario].length && i < this.maxScores && score <= this.scores[scenario][i]) {
		i++;
	}
	// if our score does not occupy a position at maxScores or more, add it
	if (i < this.maxScores) {
		this.scores[scenario].splice(i, 0, score);
		// mark the score as last score, so it can be highlighted
		this.lastScoreIndex[scenario] = i;
		// cut off the elements that are now exceeding maxScores
		while (this.scores[scenario].length > this.maxScores) {
			this.scores[scenario].pop();
		}
		// save the new highscore table, if the browser has support
		if (window.localStorage) {
			window.localStorage.setItem('highscores', $.toJSON(this));
		}
	}
	// if we have not added the new score, reset the last score index
	else {
		this.lastScoreIndex[scenario] = null;
	}
}

HighScores.prototype.getScores = function(scenario) {
	return this.scores[scenario];
}

HighScores.prototype.getLastScoreIndex = function(scenario) {
	return this.lastScoreIndex[scenario];
}