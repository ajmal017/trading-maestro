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

function HighScoreTable(options) {
    this.uiManager = options.uiManager;
    $('#highscore-table').modal({ show: false, keyboard: false, backdrop: 'static' });
}

HighScoreTable.prototype.show = function() {
    // remove old highscore table entries
	var highScoreTable = $('#highscore-table ul');
	highScoreTable.html('');
	// generate and draw new highscore table
	var i = 0; // index of score, so that we can highlight the last score
	var lastScoreIndex = this.uiManager.highScores.getLastScoreIndex(this.uiManager.scenario.name);
	this.uiManager.highScores.getScores(this.uiManager.scenario.name).forEach(function(score) {
		// class to add to the highlighted score (i.e. the last score), so it can be highlighted per css
		var highlightClass = '';
		if (i == lastScoreIndex) {
			highlightClass = 'bs-highlight';
		}
		// create and add the score html to the table
		highScoreTable.append(
			'<li class="' + highlightClass + '">' + score.toFixed(2) + '</li>'
		);
		i++; // increase current score index
	});
	// if we have not obtained a new highscore, show ... and the obtained score
	if (lastScoreIndex === null) {
		highScoreTable.append(
			'<li>...</li>'
		);
		highScoreTable.append(
			'<li class="bs-highlight">' + this.uiManager.player.getMoney().toFixed(2) + '</li>'
		);
	}
	// activate highscore table modal with a static backdrop, i.e. clicking on it won't close the modal
	this.uiManager.toggleModal($('#highscore-table'));
};
