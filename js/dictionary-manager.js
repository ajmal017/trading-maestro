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
	The dictionary manager manages the different dictionaries. It is very simple. Dictionaries can be added and a list of dictionaries can be retrieved. Also, a default dictionary function, to make choosing the dictionary at load easier.
	The file also already provides a global dictionary manager, so that dictionaries can attach themselves to it.
**/
function DictionaryManager(options) {
	// copy options
	this.defaultLanguage = options.defaultLanguage;
	
	// save our list of dictionaries here
	this.dictionaries = {};
}

DictionaryManager.prototype.add = function(dictionary) {
	// add the dictionary to the object
	this.dictionaries[dictionary.id] = dictionary;
}

DictionaryManager.prototype.getDictionaries = function() {
	return this.dictionaries;
}

DictionaryManager.prototype.getDefaultDictionary = function() {
	return this.dictionaries[this.defaultLanguage] || null;
}

DictionaryManager.prototype.getBrowserLanguageDictionary = function() {
	// get language of browser
	var browserLanguage = navigator.language || navigator.userLanguage;
	// if a dictionary for the language exists, return it
	if (this.dictionaries[browserLanguage]) {
		return this.dictionaries[browserLanguage];
	}
	// if not, try to find the main dictionary for the language
	var mainLanguage = (browserLanguage.split('-'))[0];
	for (var language in this.dictionaries) {
		if (this.dictionaries[language].mainOf === mainLanguage) {
			return this.dictionaries[language];
		}
	}
	// if there is no dictionary with the same language, return null
	return null;
}

DictionaryManager.prototype.getAnyDictionary = function() {
	// return the first dictionary we find
	for (var language in this.dictionaries) {
		return this.dictionaries[language];
	}
	// if there are no dictionaries at all, return null
	return null;
}

DictionaryManager.prototype.getStoredDictionary = function() {
	// try to get the stored language. if there is none, return null
	if (window.localStorage) {
		var language = window.localStorage.getItem('language');
		if (language) {
			return this.dictionaries[language] || null;
		}
	}
	return null;
}

DictionaryManager.prototype.storeCurrentDictionary = function(dictionary) {
	if (window.localStorage) {
		window.localStorage.setItem('language', dictionary.id);
	}
}

// global dictionary manager
var dictionaryManager = new DictionaryManager(OPTIONS.DICTIONARY);
