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

function Translator(options) {
	this.setDictionary(options.dictionary);
}

Translator.prototype.setDictionary = function(dictionary) {
	// copy options
	this.dictionary = dictionary.data;
	// add g option to variable pattern from dictionary
	this.variablePattern = new RegExp('(' + dictionary.variableDelimiter + '[^' + dictionary.variableDelimiter + ']+' + dictionary.variableDelimiter + ')', 'g');
	this.delimiter = new RegExp(dictionary.variableDelimiter, 'g');
}

Translator.prototype.translate = function(string, parameters) {
	// (deep) copy the parameters first, so as not to change the original parameters
	var translatedParameters = $.extend(true, {}, parameters);
	// first, translate the parameters
	for (parameterKey in parameters) {
		translatedParameters[parameterKey] = this.translate(parameters[parameterKey].template, parameters[parameterKey].parameters);
	}
	// first, do a normal translation of the string
	var translation = this.dictionary[string] || string;
	// now replace all variables with the corresponding value in the parameters
	function replaceVariable(variable) {
		variable = variable.replace(this.delimiter, '');
		return translatedParameters[variable] || '';
	}
	translation = translation.replace(this.variablePattern, replaceVariable.bind(this));
	return translation;
}