<?php

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
	
// prevent this file from being cached by the browser
header("Cache-Control: max-age=0, no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: Thu, 01 Jan 1970 00:00:00 GMT");
// add the correct Content-Type for the cache manifest
header('Content-Type: text/cache-manifest');

// hash to keep track of any files that changed
$hash = '';
// path from cache manifest dir to root dir
$path_to_root = '../';

// write the first line
echo "CACHE MANIFEST\n";

// allow the client to access non cached resources
echo "NETWORK:\n*\n";

// write the explicit section
echo "CACHE:\n";

// write code files first
dynamic_file_list('dictionaries', 'js');
dynamic_file_list('js', 'js');
dynamic_file_list('lib', 'js');
dynamic_file_list('scenarios', 'js');

// then write resources
$static_file_list = array(
	'index.php',
	'font-awesome-4.0.3/css/font-awesome.min.css',
	'font-awesome-4.0.3/fonts/FontAwesome.otf',
	'font-awesome-4.0.3/fonts/fontawesome-webfont.eot',
	'font-awesome-4.0.3/fonts/fontawesome-webfont.svg',
	'font-awesome-4.0.3/fonts/fontawesome-webfont.ttf',
	'font-awesome-4.0.3/fonts/fontawesome-webfont.woff');
foreach ($static_file_list as $filename) {
	// add file to hash
	$hash .= md5_file($filename);
	// replace spaces with %20 or it will break
	echo $path_to_root . str_replace(' ', '%20', $filename) . "\n";
}
dynamic_file_list('css', 'css');
dynamic_file_list('img', 'gif');

// write hash to manifest
echo '# Hash: ' . md5($hash) . "\n";

/** functions *****************/

/**
create a file list for a (relative path) directory and an extension
**/
function dynamic_file_list($dir, $extension) {
	$dir .= $path_to_root;
	foreach (glob($dir . '/*.' . $extension) as $filename) {
		// add file to hash
		$hash .= md5_file($filename);
		// replace spaces with %20 or it will break
		echo str_replace(' ', '%20', $filename) . "\n";
	}
}
?>