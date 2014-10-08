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
	id: 'de-DE',
	name: 'Deutsch(DE)',
	mainOf: 'de',
	variableDelimiter: '%',
	data: {
		Title: 'Trading Maestro',
		Resume: 'Weiterspielen',
		Restart: 'Neu starten',
		NewScenario: 'Neues Szenario',
		Help: 'Hilfe',
		Overview: '&Uuml;bersicht',
		OverviewDescription: 'Trading Maestro ist ein B&ouml;rsenspiel mit Schwerpunkt auf Unterhaltung und schneller Action, eher als eine ernste Simulation. Das Ziel ist es durch K&auml;ufe und Leerverk&auml;ufe des Wertpapieres so viel Geld wie m&ouml;glich zu verdienen, bevor das Szenario endet. Um dies zu erreichen kann der Spieler mit 50&#37; oder 100&#37; des verf&uuml;gbaren Geldes long gehen. Die Shortseite funktioniert genauso. Spieler k&ouml;nnen direkt und ohne Beschr&auml;nkung von einer Seite zur anderen wechseln, oder sie k&ouml;nnen die Position schlie&szlig;en und neutral bleiben. Um die Entscheidung zu vereinfachen, haben die Spieler Zugriff auf eine Reihe von Indikatoren. Eine offene Positionen wird am Ende des Szenarios automatisch geschlossen. In allen Szenarien entspricht eine Kerze einem Tag.',
		TheScreen: 'Der Bildschirm',
		StatusBarDescription: 'Im oberen Teil des Bildschirms finden wir den Statusbalken. Er informiert uns &uuml;ber unsere Aktionen und den Stand des Spiels. Auf seiner linken Seite befindet sich der Men&uuml;button, welcher ebenfalls dazu benutzt werden kann, das Spiel zu pausieren.',
		ChartDescription: 'Unter dem Statusbalken ist das Chart. Es ist ein Kerzenchart, welches uns die aktuelle Kursentwicklung in unserem Szenario anzeigt.',
		MarkerDescription: 'Wenn wir einen Trade eingehen oder schlie&szlig;en, markiert ein kleines Symbol im Chart unsere Operation und deren Kurs. Die oben dargestellten Symbole repr&auml;sentieren Longposition, Shortposition und das Schlie&szlig;en einer Position (in dieser Reihenfolge).',
		ProgressBarDescription: 'Der Fortschrittsbalken zeigt uns den Namen des aktuellen Szenarios an, sowie wie weit wir schon gekommen sind. Sobald der Balken komplett gef&uuml;llt ist, endet das Szenario. Bei 75&#37; Fortschritt wechselt die Farbe des Balkens zu Orange und bei 90&#37; zu Rot. Am Ende des Scenarios wird er dann gr&uuml;n.',
		IndicatorButtonDescription: 'Als n&auml;chstes kommen die Indikatorbuttons. Sie schalten die respektiven Indikatoren im Chart ein oder aus. Blau = aus, Orange = an.',
		DashboardDescription: 'Hiernach finden wir das Dashboard mit Information &uuml;ber den aktuellen Kurs (oben), unser Geld (links) und unser Portfolio (rechts). Der Kurs entspricht dem Schlusskurs der Kerze und alle Operationen werden bei diesem Kurs ausgef&uuml;hrt. Das Portfolio zeigt an, wieviele Wertpapiere wir haben, bei welchem Kurs die Position er&ouml;ffnet wurde und den aktuellen Gewinn oder Verlust in Prozent. Shortpositionen haben einen negativen Wert f&uuml;r die Anzahl Wertpapiere.',
		ControlDescription: 'Im unteren Teil ist der Eingabebereich. Ein Button f&uuml;r jeden Zustand. Die roten Buttons auf der linken Seite erlauben es uns 100&#37; oder 50&#37 Short zu gehen, analog funktionieren die gr&uuml;nen auf der rechten Seite f&uuml;r Longpositionen. Der wei&szlig;e Button in der Mitte schlie&szlig;t unsere aktuelle Position, egal ob short oder long. Wenn wir auf einen Button klicken bringt er uns sofort in den gew&auml;hlten Zustand, so dass wir von long zu short (oder umgekehrt) wechseln k&ouml;nnen ohne die Position vorher schlie&szlig;en zu m&uuml;ssen. Der zuletzt gedr&uuml;ckte Button wird hervorgehoben, um unsere Position zu veranschaulichen. Das Dr&uuml;cken eines bereits hervorgehobenen Buttons hat keinen Effekt.',
		Highscores: 'Highscores',
		HighscoresDescription: 'Am Ende jedes Szenarios wird dir deine Highscore f&uuml;r dieses Szenario gezeigt. Diese ist das Geld, mit welchem du das Szenario beendet hast. Kannst du deine Freunde und Kollegen schlagen?',
		ChangeLanguage: 'Sprache &auml;ndern',
		ResetHighscores: 'Highscores l&ouml;schen',
		WillResetAllHighscores: 'Dies wird die Highscores aller Szenarien l&ouml;schen.',
		AreYouSure: 'Bist du sicher?',
		Yes: 'Ja',
		Back: 'Zur&uuml;ck',
		Feedback: 'Feedback',
		YourMessage: 'Deine Nachricht',
		Send: 'Senden',
		Reset: 'L&ouml;schen',
		FeedbackSent: 'Feedback gesendet. Vielen Dank!',
		About: '&Uuml;ber',
		writtenBy: 'programmiert von',
		LicensedUnder: 'Lizensiert unter',
		Starring: 'Mit der Unterst&uuml;tzung von',
		ThanksTo: 'Danke an',
		MyWife: 'Meine Frau',
		Disclaimer: 'Disclaimer',
		DisclaimerContent: 'Trading Maestro ist ein Videospiel und allein f&uuml;r Vergn&uuml;gunszwecke geeignet. Es darf nicht als Anlageberatung oder professionelles Training angesehen werden. Kurse kommen von historischen Daten die Fehler enthalten k&ouml;nnen. In einem Spiel gut zu sein bedeutet nicht, dass man auch in der Realit&auml;t erfolgreich sein wird. Viele wichtige Aspekte des echten Handels sind in diesem Spiel nicht vorhanden. Die Performance der Vergangenheit garantiert keine zuk&uuml;nftigen Ergebnisse. Echter Handel setzt dich Risiko und dem Gesamtverlust des Kapitals aus, oder sogar noch mehr. Investiere nur Geld, dessen Verlust du dir erlauben kannst. Falls du echtest Geld investieren m&ouml;chtest, suche professionelle Beratung und bereite dich gut vor. Trading Maestro ist f&uuml;r jegliche Folgen der Investition echten Geldes nicht haftbar.',
		DisclaimerTrademarks: "S&P500&reg; ist ein eingetragenes Markenzeichen der Standard &amp; Poor's Financial Services LLC. DAX&reg; ist ein eingetragenes Markenzeichen der Deutsche B&ouml;rse AG.",
		Highscores: 'Highscores',
		PlayAgain: 'Erneut spielen',
		MainMenu: 'Men&uuml;',
		SMA10: 'SMA 10',
		SMA20: 'SMA 20',
		Bollinger: 'Bollinger',
		SAR: 'SAR',
		Money: 'Geld',
		Portfolio: 'Portfolio',
		Long: 'Long',
		Short: 'Short',
		Half: '1/2',
		Close: 'Position schlie&szlig;en',
		LongOrShort: 'Long oder Short',
		ResumeScenario: '%scenario% weiterspielen',
		RestartScenario: '%scenario% neu starten',
		PlayScenario: '%scenario% spielen',
		Welcome: 'Willkommen zu Trading Maestro',
		GameOver: 'Game over',
		LanguageChanged: 'Sprache ge&auml;ndert',
		HighscoresReset: 'Highscores gel&ouml;scht',
		WentShort: 'Du bist jetzt 100% short',
		WentLong: 'Du bist jetzt 100% long',
		WentHalfShort: 'Du bist jetzt 50% short',
		Closed: 'Position geschlossen',
		WentHalfLong: 'Du bist jetzt 50% long',
		Pause: 'Pause'
	}
});
