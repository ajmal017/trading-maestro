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

function Dashboard(options) {
    
    this.uiManager = options.uiManager;
    
    // restore indicators from last saved game, if there is one
	if (options.activeIndicatorButtons) {
		this.setActiveIndicatorButtons(options.activeIndicatorButtons);
	}
	
	// restore control button state from last saved game, if there is one
	if (options.activeControlButtons) {
		this.setActiveControlButtons(options.activeControlButtons);
	}
	
	// set callbacks
	this.setCallbacks();
}

Dashboard.prototype.setCallbacks = function() {

    // 'this' will get overwritten in callbacks, so save a reference to this object
	var self = this;
	
	// clicked on indicator button
	$('.bs-indicator-button').click(function() {
		self.indicatorButtonClicked(this);
	});
	
	// clicked on go short button
	$('.bs-short-button.bs-all-in-button').click(function() {
		self.shortButtonClicked($(this));
	});
	
	// clicked on go long button
	$('.bs-long-button.bs-all-in-button').click(function() {
		self.longButtonClicked($(this));
	});
	
	// clicked on go half short button
	$('.bs-short-button.bs-half-button').click(function() {
		self.halfShortButtonClicked($(this));
	});
	
	// clicked on close button
	$('.bs-close-button').click(function() {
		self.closeButtonClicked($(this));
	});
	
	// clicked on go half long button
	$('.bs-long-button.bs-half-button').click(function() {
		self.halfLongButtonClicked($(this));
	});
};

Dashboard.prototype.blur = function() {
    $('#dashboard').addClass('bs-is-blurred');
};

Dashboard.prototype.unblur = function() {
	$('#dashboard').removeClass('bs-is-blurred');
};

Dashboard.prototype.draw = function() {
    if ($('#dashboard').is(':visible')) {
		$('#money').html(this.uiManager.player.getMoney().toFixed(2));
		$('#shares').html(this.uiManager.player.getShares());
		$('#share-price').html(this.uiManager.player.getPricePerShare().toFixed(this.uiManager.scenario.decimals));
		$('#price').html(this.uiManager.series.getCurrent().toFixed(this.uiManager.scenario.decimals));
		var positionPercent;
		if (this.uiManager.player.getShares() === 0) {
			positionPercent = 0;
		}
		else if (this.uiManager.player.getShares() > 0) {
			positionPercent = (this.uiManager.series.getCurrent() / this.uiManager.player.getPricePerShare() - 1)  * 100.0;
		}
		else {
			positionPercent = (this.uiManager.player.getPricePerShare() / this.uiManager.series.getCurrent() - 1)  * 100.0;
		}
		if (positionPercent > 0) {
			$('#position-percent').css('color', this.uiManager.greenString);
		}
		else if (positionPercent < 0) {
			$('#position-percent').css('color', this.uiManager.redString);
		}
		else {
			$('#position-percent').css('color', '');
		}
		$('#position-percent').html(positionPercent.toFixed(2) + '%');
	}
};

Dashboard.prototype.indicatorButtonClicked = function(indicatorButton) {
	// toggle the clicked button color and associated indicator
	if ($(indicatorButton).hasClass('bs-highlight')) {
		$(indicatorButton).removeClass('bs-highlight');
		this.uiManager.indicators[$(indicatorButton).attr('data-value')].draw = false;
	}
	else {
		$(indicatorButton).addClass('bs-highlight');
		this.uiManager.indicators[$(indicatorButton).attr('data-value')].draw = true;
	}
	// redraw screen with updated indicators
	this.uiManager.draw();
};

Dashboard.prototype.shortButtonClicked = function($button) {
	// if the player is already short, ignore
	if (this.uiManager.player.isShort()) {
		return;
	}
	
	// otherwise, do the transaction
	var action = this.uiManager.player.goShort(this.uiManager.series.getCurrent());
	
	// mark the entry
	this.uiManager.series.markShort();
		
	// update the statusbar
	this.uiManager.statusBar.setText({ template: 'WentShort', parameters: {} });
	
	this.highlightControlButton($button);
	this.highlightPortfolio(action);
	
	//redraw screen
	this.uiManager.draw();
};

Dashboard.prototype.longButtonClicked = function($button) {
	// if the player is already long, ignore
	if (this.uiManager.player.isLong()) {
		return;
	}
	
	// otherwise, do the transaction
	var action = this.uiManager.player.goLong(this.uiManager.series.getCurrent());
	
	// mark the entry
	this.uiManager.series.markLong();
		
	// update the statusbar
	this.uiManager.statusBar.setText({ template: 'WentLong', parameters: {} });
	
	this.highlightControlButton($button);
	this.highlightPortfolio(action);
	
	//redraw screen
	this.uiManager.draw();
};

Dashboard.prototype.halfShortButtonClicked = function($button) {
	// if the player is already half short, ignore
	if (this.uiManager.player.isHalfShort()) {
		return;
	}
	
	// otherwise, do the transaction
	var action = this.uiManager.player.goHalfShort(this.uiManager.series.getCurrent());
	
	// mark the entry
	this.uiManager.series.markShort();
	
	// update the statusbar
	this.uiManager.statusBar.setText({ template: 'WentHalfShort', parameters: {} });
	
	this.highlightControlButton($button);
	this.highlightPortfolio(action);
	
	//redraw screen
	this.uiManager.draw();
};

Dashboard.prototype.closeButtonClicked = function($button) {
	// if the player is already closed, ignore
	if (this.uiManager.player.isClosed()) {
		return;
	}
	
	// otherwise, do the transaction
	var action = this.uiManager.player.close(this.uiManager.series.getCurrent());
	
	// mark the exit
	this.uiManager.series.markClose();
		
	// update the statusbar
	this.uiManager.statusBar.setText({ template: 'Closed', parameters: {} });
	
	this.highlightControlButton($button);
	this.highlightPortfolio(action);
	
	//redraw screen
	this.uiManager.draw();
};

Dashboard.prototype.halfLongButtonClicked = function($button) {
	// if the player is already half long, ignore
	if (this.uiManager.player.isHalfLong()) {
		return;
	}
	
	// otherwise, do the transaction
	var action = this.uiManager.player.goHalfLong(this.uiManager.series.getCurrent());
	
	// mark the entry
	this.uiManager.series.markLong();
	
	// update the statusbar
	this.uiManager.statusBar.setText({ template: 'WentHalfLong', parameters: {} });
	
	this.highlightControlButton($button);
	this.highlightPortfolio(action);
	
	//redraw screen
	this.uiManager.draw();
};

Dashboard.prototype.highlightControlButton = function($button) {
	// unhighlight all controls
	this.unHighlightControlButtons();
	// highlight this control
	$button.addClass('bs-highlight');
};

Dashboard.prototype.unHighlightControlButtons = function() {
	// unhighlight all controls
	$('.bs-controls button').removeClass('bs-highlight');
};

Dashboard.prototype.highlightPortfolio = function(action) {
	// no action, no highlight
	if (action !== 'buy' && action !== 'sell') {
		return;
	}
	// assign color depending on action
	var rgb = action === 'buy' ? this.uiManager.green : this.uiManager.red;
	// highlight portfolio change
	var $portfolio = $('#portfolio');
	$portfolio.css('zoom', 1.1);
	$({ alpha: 1.0 }).animate({ alpha: 0.7 }, {
		duration: 300,
		step: function() {
			$portfolio.css('color', 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + this.alpha + ')');
		},
		complete: function() {
			$portfolio.css('color', '');
			$portfolio.css('zoom', '');
		}
	});
};

Dashboard.prototype.getActiveIndicatorButtons = function() {
	var buttons = [];
	$('.bs-indicator-button').each(function() {
		if ($(this).hasClass('bs-highlight')) {
			buttons.push($(this).attr('data-value'));
		}
	});
	return buttons;
};

Dashboard.prototype.getActiveControlButtons = function() {
	var buttons = [];
	$('.bs-control-buttons button').each(function() {
		if ($(this).hasClass('bs-highlight')) {
			buttons.push($(this).attr('data-value'));
		}
	});
	return buttons;
};

Dashboard.prototype.setActiveIndicatorButtons = function(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		$('.bs-indicator-button[data-value="' + buttons[i] + '"]').addClass('bs-highlight');
		this.uiManager.indicators[buttons[i]].draw = true;
	}
};

Dashboard.prototype.setActiveControlButtons = function(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		$('.bs-control-buttons button[data-value="' + buttons[i] + '"]').addClass('bs-highlight');
	}
};

Dashboard.prototype.getHeight = function() {
	return $('#indicator-buttons').outerHeight(true) + $('#price-display').outerHeight(true) + $('#player-stats').outerHeight(true) + $('#upper-controls').outerHeight(true) + $('#lower-controls').outerHeight(true);
};
