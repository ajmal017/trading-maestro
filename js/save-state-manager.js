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

/**
	The save state manager can save one state at a time. When a game is over, it erases the saved game, so only ongoing games are saved
**/
SaveStateManager = function() {
}

SaveStateManager.save = function(uiManager, version) {
	// if we cannot save, leave
	if (!window.localStorage) {
		return;
	}
	// if the series has ended, delete the state object
	if (uiManager.series.hasEnded()) {
		window.localStorage.removeItem('state');
		return;
	}
	// otherwise, save it
	// first, build the object to be saved
	var state = {
		version: version,
		scenario: uiManager.scenario.name,
		time: uiManager.series.getTimer(),
		markers: uiManager.series.getMarkers(),
		player: {
			money: uiManager.player.getMoney(),
			shares: uiManager.player.getShares(),
			pricePerShare: uiManager.player.getPricePerShare(),
			state: uiManager.player.getState()
		},
		statusBarText: uiManager.statusBar.getGameText(),
		activeIndicators: uiManager.dashboard.getActiveIndicatorButtons(),
		activeControlButtons: uiManager.dashboard.getActiveControlButtons()
	};
	// then write it to local storage
	window.localStorage.setItem('state', $.toJSON(state));
}

SaveStateManager.load = function(scenarioManager, version) {
	// if we cannot load, return null
	if (!window.localStorage) {
		return null;
	}
	// try to read state from local storage
	var state = $.evalJSON(window.localStorage.getItem('state'));
	// if there is no state saved, return null
	if (!state) {
		return null;
	}
	// if there is, check that it has the same version
	if (state.version !== version) {
		return null;
	}
	// if it has, recover it
	// the state can be returned almost the way it comes out of storage, only the scenario has to be recovered
	state.scenario = scenarioManager.getScenarioByName(state.scenario);
	// if for some reason the scenario could not be recovered, return null
	if (!state.scenario) {
		return null;
	}
	// set markers in series
	state.scenario.series.setMarkers(state.markers);
	// we have everything, so return the state
	return state;	
}
