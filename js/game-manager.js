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

// game manager object
function GameManager(options) {
	// copy options
	this.player = options.player;
	this.highScores = options.highScores;
	this.timeOut = options.timeOut;
};

GameManager.prototype.prepareGame = function(scenario, time, playerOptions) {
	// stop the previous timer if there is one
	if (this.timer) {
		clearInterval(this.timer);
	}
	
	// if we have a scenario, switch to it
	if (scenario) {
		this.switchScenario(scenario);
	}
	
	// if we have a point in time, fast forward series to it
	if (time) {
		this.series.fastForward(time);
	}
	// otherwise, reset the series
	else {
		this.series.reset();
	}
	
	// init player with standard configuration or the one we were given
	if (playerOptions) {
		// the one passed as parameter
		this.player.newGame({
			startingMoney: playerOptions.money,
			shares: playerOptions.shares,
			pricePerShare: playerOptions.pricePerShare,
			state: playerOptions.state
		});
	}
	else {
		// standard
		this.player.newGame({
			startingMoney: this.startingMoney
		});
	}
}

GameManager.prototype.switchScenario = function(scenario) {
	this.scenario = scenario;
	this.series = scenario.series;
	this.startingMoney = scenario.startingMoney;
}

GameManager.prototype.registerCallbacks = function(callbacks) {
	this.draw = callbacks.draw;
	this.uiGameOver = callbacks.uiGameOver;
};

// new tick, new price
GameManager.prototype.tick = function() {
	// fetch new price
	this.series.next();

	// check for game ending condition
	if (this.series.hasEnded()) {
		this.gameOver();	
	}
	
	//redraw screen
	this.draw();
};

GameManager.prototype.gameOver = function() {
	
	// stop timer and set it to null, so we can ask its state
	clearInterval(this.timer);
	this.timer = null;
	
	// close open positions
	if (this.player.getShares() != 0) {
		this.player.close(this.series.getCurrent());
		this.series.markClose();
	}
	
	// add current score to highscores
	var score = this.player.getMoney();
	this.highScores.add(this.scenario.name, score);
	
	// set state to ended
	this.ongoing = false;
	
	// inform UI about game over
	this.uiGameOver();
};

GameManager.prototype.pause = function() {
	// stop timer and set it to null, so we can ask its state
	clearInterval(this.timer);
	this.timer = null;
};

GameManager.prototype.play = function() {
	if (!this.series.hasEnded()) {
		// mark game as ongoing
		this.ongoing = true;
		// set timer
		this.timer = setInterval(this.tick.bind(this), this.timeOut);
	}
}

GameManager.prototype.isPlaying = function() {
	// just see if the timer has a non null value
	return this.timer != null;
}

GameManager.prototype.isOver = function() {
	return !this.ongoing;
}