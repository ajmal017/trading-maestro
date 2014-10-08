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

// document ready, i.e. startup or main()
$(document).ready(function() {
	
	// load the last ongoing game
	var lastSavedGame = SaveStateManager.load(scenarioManager, OPTIONS.version);
	
	// create objects
	var player = lastSavedGame ? new Player(lastSavedGame.player) : new Player(OPTIONS.PLAYER);
	var scenario = lastSavedGame ? lastSavedGame.scenario : scenarioManager.getLastPlayedScenario() || scenarioManager.getDefaultScenario();
	var highScores = new HighScores(OPTIONS.HIGHSCORES);
	// try to get the dictionaries in the following order: browser language, default language, any language 
	var dictionary = dictionaryManager.getStoredDictionary() || dictionaryManager.getBrowserLanguageDictionary() || dictionaryManager.getDefaultDictionary() || dictionaryManager.getAnyDictionary();
	if (!dictionary) {
		alert('Error: No dictionary found');
		return;
	}
	var translator = new Translator({ dictionary: dictionary });
	
	// extend game options with dynamic data
	var gameOptions = {
		player: player,
		highScores: highScores
	};
	$.extend(gameOptions, OPTIONS.GAME);
	
	// create game manager
	gameManager = new GameManager(gameOptions);
	
	// extend ui options with dynamic data
	var uiOptions = {
		version: OPTIONS.version,
		player: player,
		indicators: scenarioManager.getIndicators(),
		scenarioManager: scenarioManager,	
		highScores: highScores,
		translator: translator,
		dictionaryManager: dictionaryManager,
		language: dictionary.id
	};
	$.extend(uiOptions, OPTIONS.UI);
	
	// create ui manager
	var uiManager = new UiManager(uiOptions);
		
	// register callbacks for game manager and ui manager
	gameManager.registerCallbacks({
		draw: uiManager.draw.bind(uiManager),
		uiGameOver: uiManager.gameOver.bind(uiManager)
	});
	uiManager.registerCallbacks({
		prepareGame: gameManager.prepareGame.bind(gameManager),
		play: gameManager.play.bind(gameManager),
		pause: gameManager.pause.bind(gameManager),
		isPlaying: gameManager.isPlaying.bind(gameManager),
		isOver: gameManager.isOver.bind(gameManager)
	});

	// create the save state manager
	saveStateManager = new SaveStateManager({
		gameManager: gameManager,
		uiManager: uiManager,
		scenarioManager: scenarioManager
	});

	// prepare the game
	if (lastSavedGame) {
		gameManager.prepareGame(scenario, lastSavedGame.time, lastSavedGame.player);
	}
	else {
		gameManager.prepareGame(scenario);
	}

	// setup the ui manager
	if (lastSavedGame) {
		uiManager.setup(scenario, lastSavedGame.statusBarText, lastSavedGame.activeIndicators, lastSavedGame.activeControlButtons);
	}
	else {
		uiManager.setup(scenario);
	}
	
	// hide the loading screen
	UiManager.hideLoadingScreen();

	// open the main menu
	uiManager.menu.mainMenu(lastSavedGame != null);
});
