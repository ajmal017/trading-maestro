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

function Menu(options) {

    // copy uiManager
    this.uiManager = options.uiManager;

    // register modals
    $('#scenario-list').modal({ show: false });
	$('#help').modal({ show: false });
	$('#about').modal({ show: false });
	
	// fill scenario list
	this.fillScenarioList();
	
	// fill language list
	this.fillLanguageList();
	
	// set callbacks
	this.setCallbacks();
}

Menu.prototype.setCallbacks = function() {
	// 'this' will get overwritten in callbacks, so save a reference to this object
	var self = this;

    // clicked on menu button
	$('#bs-menu-title-button').click(function() {
		self.menuButtonClicked();
	});
	
	// clicked on resume menu button
	$('#menu-resume').click(function() {
		self.resumeButtonClicked();
	});
	
	// clicked on new game button (either menu or somewhere else)
	$('.bs-new-game').click(function() {
		self.newGameButtonClicked();
	});
	
	// clicked on new scenario button (either menu or somewhere else)
	$('.bs-new-scenario').click(function() {
		self.newScenarioButtonClicked();
	});
	
	// clicked on back button
	$('.bs-back').click(function() {
		self.backButtonClicked(this);
	});
	
	// clicked on help button
	$('#menu-help').click(function() {
		self.helpButtonClicked();
	});
		
	// clicked on change language menu button
	$('#menu-change-language').click(function() {
		self.changeLanguageButtonClicked();
	});
	
	// clicked on reset highscores button
	$('#menu-reset-highscores').click(function() {
		self.resetHighscoresButtonClicked();
	});
	
	// clicked on highscore reset confirmation
	$('#highscore-reset .bs-confirm-highscore-reset').click(function() {
		self.confirmResetHighscoresButtonClicked();
	});
	
	// clicked on feedback button
	$('#menu-feedback').click(function() {
		self.feedbackButtonClicked();
	});
	
	// textarea changes
	$('#feedback-text').bind('input propertychange', function() {
		self.feedbackTextChanged();
	});
	
	// clicked on send feedback button
	$('#send-feedback').click(function() {
		self.sendFeedbackButtonClicked();
	});
	
	// clicked on reset feedback button
	$('#reset-feedback').click(function() {
		self.resetFeedbackButtonClicked();
	});
	
	// clicked on about button
	$('#menu-about').click(function() {
		self.aboutButtonClicked();
	});
	
	// clicked on about button
	$('#disclaimer').click(function() {
		self.disclaimerButtonClicked();
	});
	
	// clicked on main menu button
	$('.bs-goto-main-menu').click(function() {
		self.mainMenuButtonClicked();
	});
};

Menu.prototype.fillScenarioList = function() {
	var $list = $('#scenario-list ul');
	// empty the list first
	$list.html('');
	// and then fill it
	var scenarioList = this.uiManager.scenarioManager.getScenarios();
	for (var i = 0; i < scenarioList.length; i++) {
		// add index of scenario in list for faster access
		$list.append('<li data-value="' + i + '">' + ScenarioManager.getScenarioNameForLanguage(scenarioList[i], this.uiManager.language) + '</li>');
	}
	// callback for clicking on scenario button, i.e. chosing a new scenario
	var self = this;
	$('.bs-scenario-menu li').click(function() {
		self.scenarioButtonClicked(this);
	});
};

Menu.prototype.fillLanguageList = function() {
	var $list = $('#language-list ul');
	var dictionaries = this.uiManager.dictionaryManager.getDictionaries();
	var sortedLanguageKeys = Object.keys(dictionaries).sort();
	for (var i = 0; i < sortedLanguageKeys.length; i++) {
		// add key of dictionary for faster access
		var dictionary = dictionaries[sortedLanguageKeys[i]];
		$list.append('<li data-value="' + sortedLanguageKeys[i] + '">' + dictionary.name + '</li>');
	}
	// callback for clicking on a language button, i.e. chosing a new language
	var self = this;
	$('.bs-language-menu li').click(function() {
		self.languageButtonClicked(this);
	});
};

Menu.prototype.menuButtonClicked = function() {
	var $bsMenuItems = $('.bs-menu-items');
	if ($bsMenuItems.is(':visible')) {
		this.hideMenu($bsMenuItems);
	}
	else {
		this.showMenu($bsMenuItems);
	}
};

Menu.prototype.resumeButtonClicked = function() {
	var $bsMenuItems = $('.bs-menu-items');
	this.hideMenu($bsMenuItems);
};

Menu.prototype.newGameButtonClicked = function() {
	this.uiManager.newGame();
};

Menu.prototype.newScenarioButtonClicked = function() {
	// show the scenario selection menu
	this.uiManager.toggleModal($('#scenario-list'));
};

Menu.prototype.scenarioButtonClicked = function(scenarioButton) {
	// get the selected scenario
	var index = parseInt($(scenarioButton).attr('data-value'));
	var scenario = this.uiManager.scenarioManager.getScenario(index, true);
	// start new game with new scenario
	this.uiManager.newGame(scenario);
};

Menu.prototype.backButtonClicked = function(button) {
	// find corresponding modal
	var $modal = $(button).parents('.bs-dialog-container');
	// hide the corresponding modal
	this.uiManager.toggleModal($modal);
};

Menu.prototype.helpButtonClicked = function() {
	// show the scenario selection menu
	this.uiManager.toggleModal($('#help'));
};

Menu.prototype.changeLanguageButtonClicked = function() {
	// show the scenario selection menu
	this.uiManager.toggleModal($('#language-list'));
};

Menu.prototype.languageButtonClicked = function(languageButton) {
	// get the selected language
	this.uiManager.language = $(languageButton).attr('data-value');
	// and associated dictionary
	var dictionary = (this.uiManager.dictionaryManager.getDictionaries())[this.uiManager.language];
	// now set the new dictionary in the translator
	this.uiManager.translator.setDictionary(dictionary);
	// get the translated scenario name
	var scenarioName = ScenarioManager.getScenarioNameForLanguage(this.uiManager.scenario, this.uiManager.language)
	// retranslate all static texts
	this.uiManager.translateStaticTexts();
	// refill scenario list
	this.fillScenarioList();
	// update scenario name in progress bar
	this.uiManager.progressBar.setScenarioName(scenarioName);
	// temporarily update the status bar, until the game is resumed
	this.uiManager.statusBar.setTemporaryText({ template: 'LanguageChanged', parameter: {} });
	// if we are in the main menu, the strings for resume game and new game are a bit different
	if (this.isMainMenu) {
		$('#menu-resume').html(this.uiManager.translator.translate('ResumeScenario', { scenario: { template: scenarioName, parameters: {} } }));
		$('#menu-new-game').html(this.uiManager.translator.translate('PlayScenario', { scenario: { template: scenarioName, parameters: {} } }));
	}
	// hide the language selection menu
	this.uiManager.toggleModal($('#language-list'));
	// write the language selection to local storage
	this.uiManager.dictionaryManager.storeCurrentDictionary(dictionary);
};

Menu.prototype.resetHighscoresButtonClicked = function() {
	this.uiManager.toggleModal($('#highscore-reset'));
}

Menu.prototype.confirmResetHighscoresButtonClicked = function() {
	// reset the highscores
	this.uiManager.highScores.reset();
	// temporarily update the status bar, until the game is resumed
	this.uiManager.statusBar.setTemporaryText({ template: 'HighscoresReset', parameter: {} });
	// remove highscores from screen
	$('#highscore-table .bs-highscore-table-entries').html('');
	// hide the confirmation dialog
	this.uiManager.toggleModal($('#highscore-reset'));
};

Menu.prototype.feedbackButtonClicked = function() {
	// if there is no content in the dialog, disable the send button
	if ($('#feedback-text').val() == '') {
		$('#send-feedback').attr("disabled", "disabled");
	}
	// show the feedback dialog
	this.uiManager.toggleModal($('#feedback'));
};

Menu.prototype.feedbackTextChanged = function() {
	if ($('#feedback-text').val() == '') {
		$('#send-feedback').attr("disabled", "disabled");
	}
	else {
		$('#send-feedback').removeAttr("disabled");
	}
}

Menu.prototype.sendFeedbackButtonClicked = function() {
	// post the feedback to the server
	$.post('http://projecttradecore.com/tradingmaestro/php/send-feedback.php', { message: $('#feedback-text').val() });
	// update status bar
	this.uiManager.statusBar.setTemporaryText({ template: 'FeedbackSent', parameter: {} });
	// hide the feedback dialog
	this.uiManager.toggleModal($('#feedback'));
};

Menu.prototype.resetFeedbackButtonClicked = function() {
	// remove text
	$('#feedback-text').val('');
	// disable send button
	$('#send-feedback').attr("disabled", "disabled");
};

Menu.prototype.aboutButtonClicked = function() {
	// show the about dialog
	this.uiManager.toggleModal($('#about'));
};

Menu.prototype.disclaimerButtonClicked = function() {
	// show disclaimer dialog
	this.uiManager.toggleModal($('#disclaimer-dialog'));
};

Menu.prototype.mainMenu = function(hasSavedGame) {
	// set the statusbar to welcome message
	this.uiManager.statusBar.setText({ template: 'Welcome', parameter: {} });
	// the side menu also acts as main menu, so show it
	this.showMenu($('.bs-menu-items'));
	// it will be a little bit different though. we can either have a saved game, in which case we need to rename resume to resume <scenario name> and new game to restart <scenario name>. if there is no saved game we only need one button to start the current scenario (so no resume + restart) and it should read play <scenario name>.
	var scenarioName = ScenarioManager.getScenarioNameForLanguage(this.uiManager.scenario, this.uiManager.language);
	if (hasSavedGame) {
		$('#menu-resume').html(this.uiManager.translator.translate('ResumeScenario', { scenario: { template: scenarioName, parameters: {} } }));
		$('#menu-new-game').html(this.uiManager.translator.translate('RestartScenario', { scenario: { template: scenarioName, parameters: {} } }));
	}
	else {
		$('#menu-resume').html(this.uiManager.translator.translate('PlayScenario', { scenario: { template: scenarioName, parameters: {} } }));
		$('#menu-new-game').hide();
	}
	// save state that we are in the main menu
	this.isMainMenu = true;
	// draw the screen
	this.uiManager.draw();
};

Menu.prototype.mainMenuButtonClicked = function() {
	// reset game manager
	this.uiManager.callbacks.prepareGame();
	// reset ui
	this.uiManager.reset();
	// call main menu function
	this.mainMenu();
};

Menu.prototype.showMenu = function($menuItems, instant) {
	// tell the game manager to pause
	this.uiManager.callbacks.pause();
	// disable game buttons, like buy/sell and quantity select
	$('.bs-game-button').addClass('bs-is-disabled');
	// highlight the menu button
	$('#bs-menu-title-button').addClass('bs-highlight');
	// display the menu
	$menuItems.show();
	// if the statusbar is displaying neither game over nor the welcome message, update it to display paused
	if (this.uiManager.statusBar.getText().template !== 'GameOver' && this.uiManager.statusBar.getText().template !== 'Welcome') {
		this.uiManager.statusBar.pushText();
		this.uiManager.statusBar.setText({ template: 'Pause', parameters: {} });
		this.uiManager.draw();
	}
	// we can either instantly show the menu or animate it, depending on the flag
	if (instant) {
		$menuItems.css('width', '100%');
		$('#screen-blocker').show();
	}
	else {
		var start = 0;
		var end = 100;
		var duration = 200;
		this.animateMenu($menuItems, start, end, duration);
		$('#screen-blocker').show(duration);
	}
	// showing the menu (aka pausing) is a good moment to save the game. we have to make sure to be in a game though.
	if (!this.uiManager.callbacks.isOver()) {
		this.uiManager.saveGame();
	}
};

Menu.prototype.hideMenu = function($menuItems) {
	// tell game manager to resume playing
	this.uiManager.callbacks.play();
	// enable game buttons
	$('.bs-game-button').removeClass('bs-is-disabled');
	// unhighlight the menu button
	$('#bs-menu-title-button').removeClass('bs-highlight');
	// if we were displaying the pause message on the status bar, have it display the previous message
	if (this.uiManager.statusBar.getText().template === 'Pause') {
		this.uiManager.statusBar.popText();
		this.uiManager.draw();
	}
	// hide the menu with an animation
	var start = 100;
	var end = 0;
	var duration = 200;
	this.animateMenu($menuItems, start, end, duration);
	$('#screen-blocker').hide(duration);
	// if we are coming from the main menu, the side menu had been changed a bit. restore it
	if (this.isMainMenu) {
		// menu-resume has had its text changed
		$('#menu-resume').html(this.uiManager.translator.translate($('#menu-resume').attr('data-string')));
		// menu-new-game might have been hidden or had its text changed. account for both.
		$('#menu-new-game').show();
		$('#menu-new-game').html(this.uiManager.translator.translate($('#menu-new-game').attr('data-string')));
		// change statusbar message from welcome to the last message from the last game or the initial message
		this.uiManager.statusBar.resume();
		// we are no longer in the main menu, so set the flag accordingly
		this.isMainMenu = false;
	}
	this.uiManager.draw();
};

Menu.prototype.animateMenu = function($menuItems, start, end, duration) {
	$({width: start}).animate({width: end}, {
		duration: duration,
		step: function() {
			$menuItems.css('width', this.width + '%');
		},
		complete: function() {
			// make sure the animation finishes in the correct state. sometimes it does not.
			$menuItems.css('width', end + '%');
			// hide the menu if we want to close it
			if (end == 0) {
				$menuItems.hide();
			}
		}
	});
};
