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
	id: 'es-ES',
	name: 'Espa&ntilde;ol(ES)',
	mainOf: 'es',
	variableDelimiter: '%',
	data: {
		Title: 'Trading Maestro',
		Resume: 'Reanudar',
		Restart: 'Reiniciar',
		NewScenario: 'Nuevo escenario',
		Help: 'Ayuda',
		Overview: 'Resumen',
		OverviewDescription: 'Trading Maestro en un juego de bolsa enfocado a la diversi&oacute;n y acci&oacute;n r&aacute;pida, m&aacute;s que una simulaci&oacute;n seria. El objetivo es ganar la mayor cantidad de dinero posible por medio de compras y ventas cortas del valor antes de que el escenario termine. Para conseguir esto, el jugador puede abrir una posici&oacute;n larga con 100&#37; &oacute; 50&#37; del dinero disponible. Para las posiciones cortas es similar. Los jugadores pueden pasar de un estado a otro sin limitaci&oacute;n, o pueden cerrar la posici&oacute;n y permanecer neutrales. Para ayudarles en su toma de decisi&oacute;n, los jugadores disponen de un conjunto de indicadores. Una posici&oacute;n abierta se cierra autom&aacute;ticamente al final del escenario. En todos los escenarios una vela corresponde a un d&iacute;a.',
		TheScreen: 'La pantalla',
		StatusBarDescription: 'En la parte superior de la pantalla encontramos la barra de estado. Ella nos informa sobre nuestras acciones y el estado del juego. En su lado izquierdo podemos encontrar el bot&oacute;n del men&uacute;, que tambi&eacute;n sirve para pausar el juego.',
		ChartDescription: 'Debajo de la barra de estado est&aacute; el gr&aacute;fico. Es un gr&aacute;fico de velas que nos muestra los precios actuales en nuestro escenario.',
		MarkerDescription: 'Cuando entramos o salimos de una transacci&oacute;n, un peque&ntilde;o s&iacute;mbolo marca nuestra operaci&oacute;n y su precio. Los s&iacute;mbolos mostrados encima representan posiciones largas, posiciones cortas y cierre de posici&oacute;n (en ese orden).',
		ProgressBarDescription: 'La barra de progreso nos muestra el nombre del escenario actual, as&iacute; como nuestro avance en &eacute;l. Una vez se haya rellenado completamente, el escenario termina. Cuando se llega al 75&#37; del escenario, la barra cambia su color a naranja y a rojo en el 90&#37;. Finalmente, al terminar el escenario, se vuelve verde.',
		IndicatorButtonDescription: 'Siguen los botones de los indicadores. Estos apagan y encienden sus indicadores correspondientes. Azul = apagado, naranja = encendido.',
		DashboardDescription: 'Despu&eacute;s encontramos el cuadro de mando con informaci&oacute;n sobre el precio actual del valor (arriba), nuestro dinero (izquierda) y nuestra cartera de inversiones (derecha). El precio corresponde al precio de cierre de la vela y todas las operaciones se ejecutar&aacute;n con este precio. La cartera muestra la cantidad de valores que tenemos, a qu&eacute; precio entramos en la posici&oacute;n y la ganancia actual de nuestra posici&oacute;n en porcentaje. Posiciones cortas usan un signo negativo para denotar la cantidad.',
		ControlDescription: 'Finalmente tenemos la secci&oacute;n de controles. Un bot&oacute;n para cada estado. Los botones rojos a la izquierda nos permiten posicionarnos 100&#37; &oacute; 50&#37; en corto, mientras que los botones verdes a la derecha nos permiten hacer lo mismo en largo. El bot&oacute;n blanco en el centro cerrar&aacute; nuestra posici&oacute;n actual, independiente de que estemos en corto o en largo. Apretar un bot&oacute;n nos llevar&aacute; inmediatamente al estado correspondiente, as&iacute; que podemos pasar de largo a corto (y viceversa) sin antes tener que cerrar la posici&oacute;n. El &uacute;ltimo bot&oacute;n apretado ser&aacute; realzado para mostrarnos nuestra posici&oacute;n actual. Apretar un bot&oacute;n realzado no tiene efecto.',
		Highscores: 'Highscores',
		HighscoresDescription: 'Al final de cada escenario te ser&aacute; mostrado tu highscore para ese escenario, que no es m&aacute;s que la cantidad de dinero con la lo has finalizado. &iquest;Puedes vencer a tus amigos y compa&ntilde;eros de trabajo?',
		ChangeLanguage: 'Cambiar idioma',
		ResetHighscores: 'Borrar highscores',
		WillResetAllHighscores: 'Esto borrar&aacute; los highscores de todos los escenarios.',
		AreYouSure: '&iquest;Est&aacute;s seguro?',
		Yes: 'S&iacute;',
		Back: 'Volver',
		Feedback: 'Comentarios',
		YourMessage: 'Tu mensaje',
		Send: 'Enviar',
		Reset: 'Borrar',
		FeedbackSent: 'Comentarios enviados. &iexcl;Muchas gracias!',
		About: 'Sobre',
		writtenBy: 'programado por',
		LicensedUnder: 'Licenciado bajo',
		Starring: 'Con el apoyo de',
		ThanksTo: 'Gracias a',
		MyWife: 'Mi mujer',
		Disclaimer: 'Aviso legal',
		DisclaimerContent: 'Trading Maestro es un videojuego solamente apto para el entretenimiento. No debe verse como asesoramiento financiero ni formaci&oacute;n profesional. Los precios provienen de datos hist&oacute;ricos que pueden contener errores. Ser bueno en un juego no implica tener &eacute;xito en la vida real. Hay muchos aspectos importantes del trading real que no est&aacute;n presentes en este juego. El desempe&ntilde;o en el pasado no garantiza resultados en el futuro. Trading real te expone a riesgos y la p&eacute;rdida de todo tu dinero, o incluso m&aacute;s. Invierte s&oacute;lo dinero que te puedas permitir perder. Si quieres invertir dinero real, busca asesoramiento profesional y prep&aacute;rate bien. Trading Maestro no es responsable por cualquier tipo de consecuencia que pueda surgir por invertir dinero real.',
		DisclaimerTrademarks: "S&P500&reg; es una marca registrada de Standard &amp; Poor's Financial Services LLC. DAX&reg; es una marca registrada de Deutsche B&ouml;rse AG.",
		PlayAgain: 'Jugar de nuevo',
		MainMenu: 'Men&uacute;',
		SMA10: 'SMA 10',
		SMA20: 'SMA 20',
		Bollinger: 'Bollinger',
		SAR: 'SAR',
		Money: 'Dinero',
		Portfolio: 'Cartera',
		Long: 'Largo',
		Short: 'Corto',
		Half: '1/2',
		Close: 'Cerrar posici&oacute;n',
		LongOrShort: 'Largo o corto',
		ResumeScenario: 'Reanudar %scenario%',
		RestartScenario: 'Reiniciar %scenario%',
		PlayScenario: 'Jugar %scenario%',
		Welcome: 'Bienvenido a Trading Maestro',
		GameOver: 'Game over',
		LanguageChanged: 'Idioma cambiado',
		HighscoresReset: 'Highscores borrados',
		WentShort: 'Ahora est&aacute;s 100&#37; corto',
		WentLong: 'Ahora est&aacute;s 100&#37; largo',
		WentHalfShort: 'Ahora est&aacute;s 50&#37; corto',
		Closed: 'Posici&oacute;n cerrada',
		WentHalfLong: 'Ahora est&aacute;s 50&#37; largo',
		Pause: 'Pausa'
	}
});
