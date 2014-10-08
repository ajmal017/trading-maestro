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

function ProgressBar(options) {
	this.uiManager = options.uiManager;
	this.start = 0;
	this.level2 = options.level2;
	this.level3 = options.level3;
	this.complete = 100;
	this.state = this.start;
	this.$progressBar = $('#progress-bar');
	this.$scenarioName = $('#progress-scenario-name');
	this.$progressBar.addClass('progress-bar-info');
	this.$scenarioName.addClass('bs-outline-info');
	if (options.scenarioName) {
		this.setScenarioName(options.scenarioName);
	}
}

ProgressBar.prototype.draw = function() {
	var progress = this.uiManager.series.getProgress();
	if (progress < this.level2) {
		if (this.state !== this.start) {
			this.$progressBar.addClass('progress-bar-info');
			this.$progressBar.removeClass('progress-bar-warning');
			this.$progressBar.removeClass('progress-bar-danger');
			this.$progressBar.removeClass('progress-bar-success');
			this.$scenarioName.addClass('bs-outline-info');
			this.$scenarioName.removeClass('bs-outline-warning');
			this.$scenarioName.removeClass('bs-outline-danger');
			this.state = this.start;
		}
	}
	else if (progress < this.level3) {
		if (this.state !== this.level2) {
			this.$progressBar.removeClass('progress-bar-info');
			this.$progressBar.addClass('progress-bar-warning');
			this.$progressBar.removeClass('progress-bar-danger');
			this.$progressBar.removeClass('progress-bar-success');
			this.$scenarioName.removeClass('bs-outline-info');
			this.$scenarioName.addClass('bs-outline-warning');
			this.$scenarioName.removeClass('bs-outline-danger');
			this.state = this.level2;
		}
	}
	else if (progress < this.complete) {
		if (this.state !== this.level3) {
			this.$progressBar.removeClass('progress-bar-info');
			this.$progressBar.removeClass('progress-bar-warning');
			this.$progressBar.addClass('progress-bar-danger');
			this.$progressBar.removeClass('progress-bar-success');
			this.$scenarioName.removeClass('bs-outline-info');
			this.$scenarioName.removeClass('bs-outline-warning');
			this.$scenarioName.addClass('bs-outline-danger');
			this.state = this.level3;
		}
	}
	else {
		if (this.state !== this.complete) {
			this.$progressBar.removeClass('progress-bar-info');
			this.$progressBar.removeClass('progress-bar-warning');
			this.$progressBar.removeClass('progress-bar-danger');
			this.$progressBar.addClass('progress-bar-success');
			this.$scenarioName.removeClass('bs-outline-info');
			this.$scenarioName.removeClass('bs-outline-warning');
			this.$scenarioName.removeClass('bs-outline-danger');
			this.state = this.complete;
		}
	}
	this.$progressBar.css('width', progress + '%');
};

ProgressBar.prototype.getHeight = function() {
	return this.$progressBar.parent().outerHeight(true);
};

ProgressBar.prototype.setScenarioName = function(name) {
	this.$scenarioName.html(name);
};

ProgressBar.prototype.blur = function() {
    this.$progressBar.addClass('bs-is-blurred');
	this.$scenarioName.addClass('bs-is-blurred');
};

ProgressBar.prototype.unblur = function() {
	this.$progressBar.removeClass('bs-is-blurred');
	this.$scenarioName.removeClass('bs-is-blurred');
};
