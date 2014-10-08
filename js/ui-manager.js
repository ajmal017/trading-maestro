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

// ui manager object
function UiManager(options) {
	// copy options and references to objects
	this.version = options.version;
	this.player = options.player;
	this.indicators = options.indicators;
	this.scenarioManager = options.scenarioManager;
	this.highScores = options.highScores;
	this.translator = options.translator;
	this.dictionaryManager = options.dictionaryManager;
	this.language = options.language;
	this.initialStatusBarText = options.intialStatusBarText;
	this.red = options.red;
	this.redString = 'rgb(' + this.red[0] + ',' + this.red[1] + ',' + this.red[2] + ')';
	this.green = options.green;
	this.greenString = 'rgb(' + this.green[0] + ',' + this.green[1] + ',' + this.green[2] + ')';
	this.margin = options.margin;
	this.dataShown = options.dataShown;
	this.chartOptions = options.chartOptions;
	this.markerImages = options.markerImages;
	this.markerOptions = options.markerOptions;
	this.progressBarOptions = options.progressBarOptions;
};

UiManager.prototype.setup = function(scenario, statusBarText, activeIndicatorButtons, activeControlButtons) {
	// setup scenario
	this.scenario = scenario;
	this.series = scenario.series;
	
	this.calculateFontSize();
	
	// translate static texts
	this.translateStaticTexts();
	
	// set the currency
	$('.bs-currency').html(scenario.currency);
	
	// create the menu
	this.menu = new Menu({ uiManager: this });
	
	// status bar
	this.statusBar = new StatusBar({
		savedText: statusBarText,
		initialText: this.initialStatusBarText,
		translator: this.translator
	});

	// progress bar
	this.progressBar = new ProgressBar($.extend({
		uiManager: this,
		scenarioName: ScenarioManager.getScenarioNameForLanguage(this.scenario, this.language)
	}, this.progressBarOptions));

	// dashboard
	this.dashboard = new Dashboard({
        uiManager: this,
        activeIndicatorButtons: activeIndicatorButtons,
        activeControlButtons: activeControlButtons
    });
		
	// chart
	this.chart = new Chart({
		uiManager: this,
		chartOptions: this.chartOptions,
        margin: this.margin,
		markerOptions: this.markerOptions,
		markerImages: this.markerImages
    });
	
	// screen blocker
	this.screenBlocker = new ScreenBlocker({
	   uiManager: this
    });
	
	// highscore table
	this.highScoreTable = new HighScoreTable({ uiManager: this });
	
	// set version in about dialog
	$('#about-version').html('v' + this.version);
	
	// set callbacks
	this.setCallbacks();
	
	// tell the series where the starting point is (this depends on how many data points we want to show, because the series will have to start at the last one displayed
	this.series.setInitialTimer(this.dataShown - 1);
	
	// create modal stack
	this.openModals = new Array();
};

UiManager.prototype.setCallbacks = function() {
	
	// 'this' will get overwritten in callbacks, so save a reference to this object
	var self = this;
	
	// callback for resize to recalculate sizes of everything
	$(window).resize(function() {
		self.resize();
		self.draw();
	});
	
	// callback for when we leave focus of the window. we will show the menu, which effectively pauses the game
	$(window).blur(function() {
		// we only need to do this, if we are currently playing (i.e. not paused nor game over)
		if (self.callbacks.isPlaying()) {
			self.menu.showMenu($('.bs-menu-items'), true);
		}
	});
	
	// callback for when we are leaving the page. we will save the game.
	$(window).bind('beforeunload', function() {
		self.saveGame();
	});
};

UiManager.prototype.reset = function() {
	// unblur chart, progress bar and dashboard
    this.chart.unblur();
	this.progressBar.unblur();
	this.dashboard.unblur();
	
	// un-highlight control buttons
	this.dashboard.unHighlightControlButtons();
		
	// create/empty open modal stack
	this.closeAllModals();
};

UiManager.prototype.registerCallbacks = function(callbacks) {
	this.callbacks = {};
	this.callbacks.prepareGame = callbacks.prepareGame;
	this.callbacks.play = callbacks.play;
	this.callbacks.pause = callbacks.pause;
	this.callbacks.isPlaying = callbacks.isPlaying;
	this.callbacks.isOver = callbacks.isOver;
};

UiManager.prototype.calculateFontSize = function() {
	var $body = $('body');
	var fontSize = Math.round($body.height() * 0.021);
	$body.css('font-size', fontSize + 'px');
};

UiManager.prototype.translateStaticTexts = function() {
	var self = this; // copy 'this' object to be able to access it in 'each' function
	$('.translate').each(function() {
		$(this).html(self.translator.translate($(this).attr('data-string')));
	});
};

// callback for resize to recalculate sizes of everything
UiManager.prototype.resize = function() {
	this.calculateFontSize();
	this.chart.resize();
	this.screenBlocker.resize();
};

UiManager.prototype.draw = function() {
	// draw status bar
	this.statusBar.draw();
	// draw the progress bar
	this.progressBar.draw();
	// draw dashboard
	this.dashboard.draw();	
	// draw chart
	this.chart.draw();
};

UiManager.prototype.gameOver = function() {
	// message in status bar
	this.statusBar.setText({ template: 'GameOver', parameters: {} });
	// disable game buttons, like buy/sell and quantity select
	$('.bs-game-button').addClass('bs-is-disabled');
	// blur chart, progressbar and dashboard
	this.dashboard.blur();
	this.progressBar.blur();
	this.chart.blur();
	// show and enable new game button
	$('.bs-new-game-button-container').show();
	// show high score
	this.highScoreTable.show();
	// save the game. this will inform the save state, that there is no more game to resume
	this.saveGame();
};

UiManager.prototype.toggleModal = function($modal) {
	// close modal
	if ($modal.is(':visible')){
		// remove the current modal from the stack, since we are closing it
		this.openModals.pop();
		// and close it
		$modal.modal('hide');
		// if there are is another modal on the stack, show it
		if (this.openModals.length > 0) {
			this.openModals[this.openModals.length - 1].modal('show');
		}
		
	}
	// open modal
	else {
		// if a modal is open already open, hide it
		if (this.openModals.length > 0) {
			this.openModals[this.openModals.length - 1].modal('hide');
		}
		// push the current modal to the stack
		this.openModals.push($modal);
		// and show it
		$modal.modal('show');
	}
};

UiManager.prototype.closeAllModals = function() {
	// create/empty open modal stack
	if (this.openModals) {
		for (var i = 0; i < this.openModals.length; i++) {
			this.openModals[i].modal('hide');
		}
	}
	this.openModals = new Array();
};

UiManager.prototype.newGame = function(scenario) { // scenario parameter is optional
	// grab the new scenario and series, if the scenario has changed
	if (scenario) {
		this.scenario = scenario;
		this.series = scenario.series;
		this.series.setInitialTimer(this.dataShown - 1);
		// set the currency
		$('.bs-currency').html(scenario.currency);
	}
	// hide the highscore
	this.toggleModal($('#highscore-table'));
	// restore initial ui state
	this.reset();
	// tell status bar that a new game begins
	this.statusBar.restart();
	// set name in progress bar
	this.progressBar.setScenarioName(ScenarioManager.getScenarioNameForLanguage(this.scenario, this.language));
	// tell game manager to start a new game
	this.callbacks.prepareGame(scenario);
	// save the game. this will overwrite previous games
	this.saveGame();
	// hide the menu, which will start the timer
	this.menu.hideMenu($('.bs-menu-items'));
	// redraw screen
	this.draw();
};

UiManager.hideLoadingScreen = function() {
	$('#loading-screen').hide();
};

UiManager.prototype.saveGame = function() {
	SaveStateManager.save(this, this.version);
};

UiManager.prototype.getScreenHeight = function() {
	// jquery $(window).height() does not work correctly on firefox for android
	return window.innerHeight;
};
