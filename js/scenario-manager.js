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
	The scenario manager manages the different scenarios. It is very simple. Scenarios can be added and a list of scenarios can be retrieved. Also, a default scenario function, to make choosing the scenario at load easier.
	The file also already provides a global scenario manager, so that scenarios can attach themselves to it.
**/
function ScenarioManager(options) {
	// copy options
	this.seriesOptions = options.seriesOptions;
	
	// create the ids for the indicators
	this.indicators = {};
	for (var i = 0; i < options.indicatorOptions.length; i++) {
		var id = Series.generateIndicatorId(options.indicatorOptions[i]);
		this.indicators[id] = options.indicatorOptions[i];
	}
	
	// save our list of scenarios here
	this.scenarios = [];
}

ScenarioManager.prototype.add = function(scenario) {
	// create the scenario series
	scenario.series = new Series($.extend(this.seriesOptions, { scenario: scenario, indicators: this.indicators }));
	// remove the scenario data, since we don't need it anymore and we want to avoid having the same information twice in memory
	delete scenario.data;
	// add the scenario to the list
	this.scenarios.push(scenario);
}

ScenarioManager.prototype.getScenario = function(index, shouldSaveAsLast) {
	// if the save scenario as last flag is set, try to save it
	if (shouldSaveAsLast && window.localStorage) {
		if (this.scenarios[index]) {
			window.localStorage.setItem('lastPlayedScenario', this.scenarios[index].name);
		}
	}
	return this.scenarios[index];
}

ScenarioManager.prototype.getScenarioByName = function(name) {
	// search for the scenario name in the scenario list
	for (var i = 0; i < this.scenarios.length; i++) {
		if (this.scenarios[i].name === name) {
			return this.scenarios[i];
		}
	}
	// return null if we could not find it
	return null;
}

ScenarioManager.prototype.getScenarios = function() {
	return this.scenarios;
}

ScenarioManager.prototype.getLastPlayedScenario = function() {
	// try to fetch the last played scenario from local storage
	if (window.localStorage) {
		var name = window.localStorage.getItem('lastPlayedScenario');
		if (name != null) {
			return this.getScenarioByName(name);
		}
	}
	// return null otherwise
	return null;
}

ScenarioManager.prototype.getDefaultScenario = function() {
	return this.scenarios[0];
}

ScenarioManager.prototype.getIndicators = function() {
	return this.indicators;
}

ScenarioManager.getScenarioNameForLanguage = function(scenario, language) {
	// check if the scenario has alternative names
	if (scenario.names) {
		// try to find an exact match
		if (scenario.names[language]) {
			return scenario.names[language];
		}
		// no exact match, try to find a match for the same language from a different region
		var languageRegExp = new RegExp((language.split('-'))[0]); // language ids and region ids have different case (language is lower, region is upper) so no risk of matching a language with a region
		for (var id in scenario.names) {
			if (id.match(languageRegExp)) {
				return scenario.names[id];
			}
		}
	}
	
	// no language match found, return the standard name property
	return scenario.name;
}

// global scenario manager
var scenarioManager = new ScenarioManager({ seriesOptions: OPTIONS.SERIES, indicatorOptions: OPTIONS.INDICATORS });
