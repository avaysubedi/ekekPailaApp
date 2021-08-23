/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
	config.height = 400;        // 500 pixels high.
	config.toolbar = 'Basic';
	config.enterMode = CKEDITOR.ENTER_BR;

	config.toolbar_Basic =
		[
			[ 'Format', 'Styles', 'FontSize', '-',
				'Bold', 'Italic', 'TextColor', '-',
				'Copy', 'Paste', '-',
				'NumberedList', 'BulletedList', '-',
				'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
				 'Table','Maximize'
			]
		];
		// 'Source',


	// config.toolbar = 'Custom'; //makes all editors use this toolbar
	//config.toolbar_Custom = [Essentials]; //define an empty array or whatever buttons you want.

	//config.height = 400;        // 500 pixels high.

	//config.toolbarStartupExpanded = false;

	// config.toolbarCanCollapse = true;
	//	config.removePlugins = 'elementspath,resize';
	// config.removePlugins = 'elementspath';
	// config.resize_enabled = false;
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
