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

dictionaryManager.add({
	id: 'en-US',
	name: 'English(US)',
	mainOf: 'en',
	variableDelimiter: '%',
	data: {
		Title: 'Trading Maestro',
		Resume: 'Resume',
		Restart: 'Restart',
		NewScenario: 'New scenario',
		Help: 'Help',
		Overview: 'Overview',
		OverviewDescription: 'Trading Maestro is a trading game with a focus on quick action and fun, not so much a serious simulation. The purpose is to make as much money as possible buying and short selling the asset until the scenario ends. In order to achieve this, the player can go long with 100&#37; of the money available or with 50&#37;. The short side is similar. Players can jump from one state to the other without limitation, or they can close the position and stay neutral. In order to aid them with their decision making, players have access to a set of indicators. An open position will automatically be closed at the end of a scenario. In all scenarios a candle corresponds to a day.',
		TheScreen: 'The screen',
		StatusBarDescription: 'At the top of the screen we find the status bar. It informs us about our actions and the game state. On its left side, you can find the menu button, which is also used to pause the game.',
		ChartDescription: 'Below the status bar is the chart. It is a candle stick chart showing us the current prices in our scenario.',
		MarkerDescription: 'When we enter or exit a trade, a little symbol in the chart will mark our operations and their price. The symbols illustrated above represent (in order of appearance) long positions, short positions and the closing of a position.',
		ProgressBarDescription: 'The progress bar shows us the name of the current scenario and how far we are into it. Once it fills completely, the scenario is over. When you reach 75&#37; of the scenario, it changes its color to orange and at 90&#37; it turns red. Finally, at the end of the scenario, it becomes green.',
		IndicatorButtonDescription: 'Next, we find the indicator buttons. They can be toggled to turn their corresponding indicator on or off in the chart. Blue = off, orange = on.',
		DashboardDescription: 'After this, we find the dashboard with information about the current price of the asset (top), our money (left) and our portfolio (right). The price corresponds to the closing price of the candle and is the one at which all operations are executed. The portfolio shows how many assets we have, at what price we entered the position and the current gain of our position in percent. Short positions have a negative value for asset quantity.',
		ControlDescription: 'Finally, we have the control section. One button for each state. The red buttons on the left allow us to go 100&#37; or 50&#37; short, while the green ones on the right allow us to do the same on the long side. The white button in the middle will close our current position, regardless of us being long or short. Pressing a button will immediately take us to that state, so we can from long to short (or vice versa) without having to close the position first. The last pressed button will be highlighted to show us our current position. Pressing a highlighted button has no effect.',
		Highscores: 'Highscores',
		HighscoresDescription: 'At the end of each scenario, you will be shown your highscore for that scenario, which is just the amount of money you end it with. Can you beat your friends and colleagues?',
		ChangeLanguage: 'Change language',
		ResetHighscores: 'Reset highscores',
		WillResetAllHighscores: 'This will reset the highscores of all scenarios.',
		AreYouSure: 'Are you sure?',
		Yes: 'Yes',
		Back: 'Back',
		Feedback: 'Feedback',
		YourMessage: 'Your message',
		Send: 'Send',
		Reset: 'Reset',
		FeedbackSent: 'Feedback sent. Thank you!',
		About: 'About',
		writtenBy: 'written by',
		LicensedUnder: 'Licensed under',
		Starring: 'Starring',
		ThanksTo: 'Thanks to',
		MyWife: 'My wife',
		Disclaimer: 'Disclaimer',
		DisclaimerContent: 'Trading Maestro is a video game for entertainment purposes only. It must not be regarded as financial advice or professional training. Prices come from historical data that may contain errors. Being good in a game does not mean you are going to succeed in real life. There are many important aspects of real trading that are not present in the game. Past performance does not guarantee future results. Real trading exposes you to risk and losing all of your money, or even more. Only invest money you can afford to lose. If you want to invest real money, seek professional advice and prepare yourself well. Trading Maestro is not liable for any consequences resulting from you investing real money.',
		DisclaimerTrademarks: "S&P500&reg; is a registered trademark of Standard &amp; Poor's Financial Services LLC. DAX&reg; is a registered trademark of Deutsche B&ouml;rse AG.",
		PlayAgain: 'Play again',
		MainMenu: 'Menu',
		SMA10: 'SMA 10',
		SMA20: 'SMA 20',
		Bollinger: 'Bollinger',
		SAR: 'SAR',
		Money: 'Money',
		Portfolio: 'Portfolio',
		Long: 'Long',
		Short: 'Short',
		Half: '1/2',
		Close: 'Close position',
		LongOrShort: 'Go long or short',
		ResumeScenario: 'Resume %scenario%',
		RestartScenario: 'Restart %scenario%',
		PlayScenario: 'Play %scenario%',
		Welcome: 'Welcome to Trading Maestro',
		GameOver: 'Game over',
		LanguageChanged: 'Language changed',
		HighscoresReset: 'Highscores reset',
		WentShort: 'You now are 100% short',
		WentLong: 'You now are 100% long',
		WentHalfShort: 'You now are 50% short',
		Closed: 'Position closed',
		WentHalfLong: 'You now are 50% long',
		Pause: 'Pause'
	}
});
