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

function ScreenBlocker(options) {
    this.uiManager = options.uiManager;
    this.resize();
	this.setCallbacks();
}

ScreenBlocker.prototype.resize = function() {
    $('#screen-blocker').height($('.bs-screen').outerHeight(true) - $('#status-bar').outerHeight(true));
};

ScreenBlocker.prototype.setCallbacks = function() {
	var self = this;
    // clicked on screen blocker
	$('#screen-blocker').click(function() {
		self.screenBlockerClicked(this);
	});
};

ScreenBlocker.prototype.screenBlockerClicked = function() {
	var $bsMenuItems = $('.bs-menu-items');
	this.uiManager.menu.hideMenu($bsMenuItems);
};
