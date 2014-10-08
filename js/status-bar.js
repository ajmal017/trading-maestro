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

function StatusBar(options) {
	this.savedText = options.savedText;
	this.initialText = options.initialText;
	this.translator = options.translator;
	this.prevTexts = new Array();
}

StatusBar.prototype.resume = function() {
	this.text = this.savedText || this.initialText;
	// set the saved status bar text to null, since it is not valid anymore
	this.savedText = null;
};

StatusBar.prototype.restart = function(scenario) {
	this.savedText = null;
	this.text = this.initialText;
};

StatusBar.prototype.setText = function(text) {
	this.text = text;
	this.animate();
};

StatusBar.prototype.setTemporaryText = function(text) {
	// update the text without saving it
	$('#status-bar').html(this.translator.translate(text.template, text.parameters));
	this.animate();
};

StatusBar.prototype.getText = function() {
	return this.text;
};

StatusBar.prototype.getGameText = function() {
	// return the last relevant game message, i.e. ignore pause. also, if there is a saved message, we are in the main menu and thus want to return the saved message
	if (this.savedText) {
		return this.savedText;
	}
	if (this.text.template === 'Pause') {
		return this.prevTexts[this.prevTexts.length - 1];
	}
	return this.text;
};

StatusBar.prototype.pushText = function() {
	this.prevTexts.push(this.text);
};

StatusBar.prototype.popText = function() {
	this.text = this.prevTexts.pop();
};

StatusBar.prototype.draw = function() {
	$('#status-bar').html(this.translator.translate(this.text.template, this.text.parameters));
};

StatusBar.prototype.getHeight = function() {
	return $('#status-bar').outerHeight(true);
};

StatusBar.prototype.animate = function() {
	var $statusBar = $('#status-bar');
	$statusBar.css('font-weight', 'bold');
	// animate on anything, since jquery cannot animate on font weight
	$({ fontSize: 1 }).animate({ fontSize: 1 }, {
		duration: 300,
		step: function() {
		},
		complete: function() {
			$statusBar.css('font-weight', 'normal');
		}
	});
};
