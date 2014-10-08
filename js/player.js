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

// player object
function Player(options) {
}

Player.prototype.newGame = function(options) {
	this.money = options.startingMoney;
	this.shares = options.shares || 0;
	this.pricePerShare = options.pricePerShare || 0;
	this.state = options.state || 'closed';
}

Player.prototype.getMoney = function() {
	return this.money;
}

Player.prototype.getShares = function() {
	return this.shares;
}

Player.prototype.getPricePerShare = function() {
	return this.pricePerShare;
}

Player.prototype.getState = function() {
	return this.state;
};

Player.prototype.isClosed = function() {
	return this.state === 'closed';
}

Player.prototype.isLong = function() {
	return this.state === 'long';
}

Player.prototype.isHalfLong = function() {
	return this.state === 'halflong';
}

Player.prototype.isShort = function() {
	return this.state === 'short';
}

Player.prototype.isHalfShort = function() {
	return this.state === 'halfshort';
}

Player.prototype.close = function(price) {
	var action = ''; // did we buy or sell in order to close
	// check our state
	switch(this.state) {
	case 'short':
	case 'halfshort':
		this.money += this.shares * (price - 2 * this.pricePerShare);
		action = 'buy';
		break;
	case 'halflong':
	case 'long':
		this.money += this.shares * price;
		action = 'sell';
		break;
	}
	// set shares and price per share to 0
	this.shares = 0;
	this.pricePerShare = 0;
	// update state
	this.state = 'closed';
	// return if we bought or sold
	return action;
}

Player.prototype.goLong = function(price) {
	var action = ''; // did we buy or sell in order to close
	// check our state
	switch(this.state) {
	case 'short':
	case 'halfshort':
		// if we come from a short position, close the position first
		this.close(price);
		// then go to the closed state (no break)
	case 'closed':
	case 'halflong':
		// calculate how many shares we can buy
		var shares = Math.floor(this.money / price);
		// calculate the price per share
		this.pricePerShare = (price * shares + this.pricePerShare * this.shares) / (shares + this.shares);
		// then buy them all
		this.money -= price * shares;
		this.shares += shares;
		action = 'buy';
		break;
	}
	// update state
	this.state = 'long';
	// return if we bought or sold
	return action;
}

Player.prototype.goHalfLong = function(price) {
	var action = ''; // did we buy or sell in order to close
	// check our state
	switch(this.state) {
	case 'short':
	case 'halfshort':
		// if we come from a short position, close the position first
		this.close(price);
		// then go to the closed state (no break)
	case 'closed':
		// calculate how many shares we can buy
		var shares = Math.floor(0.5 * this.money / price);
		// price per share is price
		this.pricePerShare = price;
		// then buy them all
		this.money -= price * shares;
		this.shares = shares;
		action = 'buy';
		break;
	case 'long':
		// calculate how many shares we have to sell
		var shares = Math.ceil(0.5 * this.shares);
		// price per share does not change
		// sell them
		this.money += price * shares;
		this.shares -= shares;
		action = 'sell';
		break;
	}
	// update state
	this.state = 'halflong';
	// return if we bought or sold
	return action;
}

Player.prototype.goShort = function(price) {
	var action = ''; // did we buy or sell in order to close
	// check our state
	switch(this.state) {
	case 'halflong':
	case 'long':
		// if we come from a long position, close the position first
		this.close(price);
		// then go to the closed state (no break)
	case 'closed':
	case 'halfshort':
		// calculate how many shares we can sell
		var shares = Math.floor(this.money / price);
		// calculate the price per share
		this.pricePerShare = (price * shares + this.pricePerShare * -this.shares) / (shares + -this.shares);
		// sell them
		this.money -= price * shares;
		this.shares -= shares;
		action = 'sell';
		break;
	}
	// update state
	this.state = 'short';
	// return if we bought or sold
	return action;
}

Player.prototype.goHalfShort = function(price) {
	var action = ''; // did we buy or sell in order to close
	// check our state
	switch(this.state) {
	case 'halflong':
	case 'long':
		// if we come from a long position, close the position first
		this.close(price);
		// then go to the closed state (no break)
	case 'closed':
		// calculate how many shares we can buy
		// calculate how many shares we can sell
		var shares = Math.floor(0.5 * this.money / price);
		// price per share is price
		this.pricePerShare = price;
		// sell them
		this.money -= price * shares;
		this.shares = -shares;
		action = 'sell';
		break;
	case 'short':
		// calculate how many shares we have to buy
		var shares = Math.floor(0.5 * this.shares); // this returns a negative number
		// price per share does not change
		// buy them
		this.money += shares * (price - 2 * this.pricePerShare);
		this.shares -= shares;
		action = 'buy';
		break;
	}
	// update state
	this.state = 'halfshort';
	// return if we bought or sold
	return action;
}
