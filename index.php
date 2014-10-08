<!--
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
-->

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="cache-control" content="no-cache" />
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title class="translate" data-string="Title"></title>
		<link rel="stylesheet" type="text/css" href="font-awesome-4.0.3/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="css/boersenspiel-rt.css" />
	</head>
	
	<body class="" style="">
		<div class="bs-loading-screen" id="loading-screen" style="">
			<div style="">
				<img src="img/ajax-loader.gif" alt="Loading..." style=""></img>
			</div>
		</div>
		<div class="bs-screen" style="">
			<div class="bs-menu" style="">
				<div class="bs-menu-title" id="" style="">
					<a class="" id="bs-menu-title-button" href="javascript:void(0);" style="">
						<i class="fa fa-bars"></i>
					</a>
				</div>
				<div class="bs-menu-items" id="" style="">
					<ul class="" style="list-style: none; margin: 0; padding: 0;">
						<li class="translate" id="menu-resume" style="" data-string="Resume"></li>
						<li class="bs-new-game translate" id="menu-new-game" style="" data-string="Restart"></li>
						<li class="bs-new-scenario translate" id="menu-new-scenario" style="" data-string="NewScenario"></li>
						<li class="translate" id="menu-help" style="" data-string="Help"></li>
						<li class="translate" id="menu-change-language" style="" data-string="ChangeLanguage"></li>
						<li class="translate" id="menu-reset-highscores" style="" data-string="ResetHighscores"></li>
						<li class="translate" id="menu-feedback" style="" data-string="Feedback"></li>
						<li class="translate" id="menu-about" style="" data-string="About"></li>
					</ul>
				</div>
			</div>
						
			<div class="bs-dialog-container bs-scenario-menu" id="scenario-list" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="NewScenario"></div>
						<div class="bs-dialog-body" style="">
							<ul style="">
							</ul>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-dialog-container bs-help" id="help" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="Help"></div>
						<div class="bs-dialog-body" style="">
							<h4 class="bs-first translate" data-string="Overview" style=""></h4>
							<p class="translate" data-string="OverviewDescription"></p>
							<h4 class="translate" data-string="TheScreen" style=""></h4>
							<img src="img/statusbar.jpg" style=""></img>
							<p class="translate" data-string="StatusBarDescription"></p>
							<img src="img/chart.jpg"></img>
							<p class="translate" data-string="ChartDescription"></p>
							<img src="img/markers.jpg"></img>
							<p class="translate" data-string="MarkerDescription"></p>
							<img src="img/progress-bar.jpg"></img>
							<p class="translate" data-string="ProgressBarDescription"></p>
							<img src="img/indicator-buttons.jpg"></img>
							<p class="translate" data-string="IndicatorButtonDescription"></p>
							<img src="img/dashboard.jpg"></img>
							<p class="translate" data-string="DashboardDescription"></p>
							<img src="img/controls.jpg"></img>
							<p class="translate" data-string="ControlDescription"></p>
							<h4 class="translate" data-string="Highscores">Highscores</h4>
							<p class="translate" data-string="HighscoresDescription"></p>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-dialog-container bs-language-menu" id="language-list" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="ChangeLanguage"></div>
						<div class="bs-dialog-body" style="">
							<ul style="">
							</ul>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-dialog-container bs-highscore-reset-menu" id="highscore-reset" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="ResetHighscores"></div>
						<div class="bs-dialog-body" style="">
							<div>
								<span class="translate" style="" data-string="WillResetAllHighscores"></span>
								<span class="translate" style="" data-string="AreYouSure"></span>
							</div>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-confirm-highscore-reset translate" data-string="Yes"></button>
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-dialog-container bs-feedback-dialog" id="feedback" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="Feedback"></div>
						<div class="bs-dialog-body" style="">
							<form style="">
								<div class="translate" data-string="YourMessage" style=""></div>
								<textarea id="feedback-text" style=""></textarea>
							</form>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-send translate" id="send-feedback" data-string="Send"></button>
							<button type="button" class="bs-reset translate" id="reset-feedback" data-string="Reset"></button>
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-dialog-container bs-about-dialog" id="about" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="About"></div>
						<div class="bs-dialog-body" style="">
							<h3 class="translate" data-string="Title"></h3>
							<div id="about-version"></div>
							<div><span class="translate" data-string="writtenBy"></span> <a href="http://www.linkedin.com/pub/pablo-poveda/41/491/586" target="_blank">Pablo Poveda</a></div>
							<div><span class="translate" data-string="LicensedUnder"></span> <a href="http://www.gnu.org/licenses/gpl.html" target="_blank">GPL</a></div>
							<h4 class="translate" data-string="Starring"></h4>
							<div><a href="http://getbootstrap.com/" target="_blank">Bootstrap</a></div>
							<div><a href="http://www.humblesoftware.com/flotr2/index" target="_blank">Flotr2</a></div>
							<div><a href="http://jquery.com/" target="_blank">jQuery</a></div>
							<div><a href="https://code.google.com/p/jquery-json/" target="_blank">jQuery JSON</a></div>
							<div><a href="http://sass-lang.com/" target="_blank">Sass</a></div>
							<div><a href="http://www.ajaxload.info/" target="_blank">www.ajaxload.info</a></div>
							<div><a href="http://www.i2clipart.com/clipart-icon-set-player-512x512-24e1" target="_blank">Mi Brami + OCAL</a></div>
							<h4 class="translate" data-string="ThanksTo"></h4>
							<div>HB The Man</div>
							<div>Encar + Santi</div>
							<div class="translate" data-string="MyWife"></div>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-disclaimer translate" id="disclaimer" data-string="Disclaimer"></button>
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-dialog-container bs-disclaimer-dialog" id="disclaimer-dialog" role="dialog" tabindex="-1">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="Disclaimer"></div>
						<div class="bs-dialog-body" style="">
							<div class="translate" data-string="DisclaimerContent"></div>
							<div class="translate" data-string="DisclaimerTrademarks"></div>
						</div>
						<div class="bs-dialog-footer" style="">
							<button type="button" class="bs-back translate" data-string="Back"></button>
						</div>
					</div>
				</div>
			</div>
						
			<div class="bs-status-bar" id="status-bar" style="">Placeholder needed for height of div calculation</div>
			
			<div class="bs-screen-blocker" id="screen-blocker"></div>
			
			<div class="bs-dialog-container bs-highscore-table" id="highscore-table" role="dialog" tabindex="-1" style="">
				<div class="bs-dialog">
					<div class="bs-dialog-content">
						<div class="bs-dialog-header translate" style="" data-string="Highscores"></div>
						<div class="bs-highscore-table-body" style="">
							<ul style="">
							</ul>
						</div>
						<div class="bs-highscore-table-footer" style="">
							<button type="button" class="bs-new-scenario translate" id="highscore-new-scenario" data-string="NewScenario"></button>
							<button type="button" class="bs-new-game translate" id="highscore-new-game" data-string="PlayAgain"></button>
							<button type="button" class="bs-goto-main-menu translate" id="highscore-main-menu" data-string="MainMenu"></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="bs-chart" id="chart" style=""></div>
			
			<div class="bs-scenario-progress" style="">
				<div class="bs-progress-bar" id="progress-bar" role="progressbar" style=""></div>
				<span id="progress-scenario-name" style=""></span>
			</div>
						
			<div class="bs-dashboard" id="dashboard" style="">
				<div class="bs-indicator-buttons" id="indicator-buttons">
				<div class="col-xs-6" style="margin: 0; padding: 0;">
					<button type="button" class="bs-button bs-game-button bs-indicator-button translate col-xs-4 col-xs-offset-1" data-value="sma_10" data-string="SMA10" style=""></button>
					<button type="button" class="bs-button bs-game-button bs-indicator-button translate col-xs-4 col-xs-offset-2" data-value="sma_20" data-string="SMA20" style=""></button>
				</div>
				<div class="col-xs-6" style="margin: 0; padding: 0;">
					<button type="button" class="bs-button bs-game-button bs-indicator-button translate col-xs-4 col-xs-offset-1" data-value="bollinger_20_2" data-string="Bollinger" style=""></button>
					<button type="button" class="bs-button bs-game-button bs-indicator-button translate col-xs-4 col-xs-offset-2" data-value="sar_0.02_0.02_0.2" data-string="SAR" style=""></button>
				</div>
				</div>
				<div class="bs-price" id="price-display" style="">
					<span class="bs-currency"></span><span id="price">0</span>
				</div>
				
				<div class="bs-player-stats" id="player-stats" style="">
					<div class="bs-player-stat" style="">
						<div class="translate" data-string="Money"></div>
						<div class="bs-player-stat-value"><span class="bs-currency"></span><wbr/><span id="money">0</span></div>
					</div>
					<div class="bs-player-stat" style="">
						<div class="translate" data-string="Portfolio"></div>
						<div class="bs-player-stat-value" id="portfolio">
							<span id="shares">0</span> @ <span class="bs-currency"></span><span id="share-price">0</span> <span class="bs-position-percent" id="position-percent" style="font-size: 0.75em;">0%</span>
						</div>
					</div>
				</div>
			
				<div class="bs-controls" style="">
					<div class="bs-control-buttons" id="upper-controls" style="">
						<button type="button" class="bs-button bs-short-button bs-all-in-button bs-game-button translate" style="" data-value="short" data-string="Short"></button>
						<button type="button" class="bs-button bs-long-button bs-all-in-button bs-game-button translate" style="" data-value="long" data-String="Long"></button>
					</div>
					<div class="bs-control-buttons" id="lower-controls" style="">
						<button type="button" class="bs-button bs-short-button bs-half-button bs-game-button translate" style="" data-value="half-short" data-string="Half"></button>
						<button type="button" class="bs-button bs-close-button bs-game-button translate" style="" data-value="close" data-string="Close"></button>
						<button type="button" class="bs-button bs-long-button bs-half-button bs-game-button translate" style="" data-value="half-long" data-string="Half"></button>
					</div>
				</div>
			</div>
		</div>
	
		<script language="javascript" type="text/javascript" src="lib/jquery-1.11.0.min.js"></script>
		<script language="javascript" type="text/javascript" src="lib/jquery.json-2.4.min.js"></script>
		<script language="javascript" type="text/javascript" src="lib/flotr2-modified-min.js"></script>
		<script language="javascript" type="text/javascript" src="lib/modal.js"></script>
		<script language="javascript" type="text/javascript" src="js/options.js"></script>
		<script language="javascript" type="text/javascript" src="js/menu.js"></script>
		<script language="javascript" type="text/javascript" src="js/screen-blocker.js"></script>
		<script language="javascript" type="text/javascript" src="js/status-bar.js"></script>
		<script language="javascript" type="text/javascript" src="js/progress-bar.js"></script>
        <script language="javascript" type="text/javascript" src="js/chart.js"></script>
		<script language="javascript" type="text/javascript" src="js/dashboard.js"></script>
        <script language="javascript" type="text/javascript" src="js/high-score-table.js"></script>
        <script language="javascript" type="text/javascript" src="js/ui-manager.js"></script>
		<script language="javascript" type="text/javascript" src="js/game-manager.js"></script>
		<script language="javascript" type="text/javascript" src="js/player.js"></script>
		<script language="javascript" type="text/javascript" src="js/series.js"></script>
		<script language="javascript" type="text/javascript" src="js/high-scores.js"></script>
		<script language="javascript" type="text/javascript" src="js/scenario-manager.js"></script>
		<?php
			// load scenario files
			foreach (glob('scenarios/*.js') as $filename) {
				echo "<script language='javascript' type='text/javascript' src='$filename'></script>";
			}
		?>
		<script language="javascript" type="text/javascript" src="js/dictionary-manager.js"></script>
		<?php
			// load dictionary files
			foreach (glob('dictionaries/*.js') as $filename) {
				echo "<script language='javascript' type='text/javascript' src='$filename'></script>";
			}
		?>
		<script language="javascript" type="text/javascript" src="js/save-state-manager.js"></script>			
		<script language="javascript" type="text/javascript" src="js/translator.js"></script>
		<script language="javascript" type="text/javascript" src="js/main.js"></script>
	</body>
</html>
