function wrs_addEvent(element, event, func) {
	if (element.addEventListener) {
		element.addEventListener(event, func, false);
	}
	else if (element.attachEvent) {
		element.attachEvent('on' + event, func);
	}
}

wrs_addEvent(window, 'load', function () {
	// Hide the textarea
	var textarea = document.getElementById('example');
	textarea.style.display = 'none';

	var example_content = document.getElementById('example_content');

	// Create the toolbar
	var toolbar = document.createElement('div');
	toolbar.id = textarea.id + '_toolbar';

	_wrs_conf_CASEnabled = false;
	
	// Create the WYSIWYG editor
	var iframe = document.createElement('iframe');
	iframe.id = textarea.id + '_iframe';
	
	wrs_addEvent(iframe, 'load', function () {
		// Setting design mode ON
		iframe.contentWindow.document.designMode = 'on';
		
		// Setting the content
		if (iframe.contentWindow.document.body) {
			iframe.contentWindow.document.body.innerHTML = example_content.innerHTML;

			// WE INIT THE WIRIS PLUGIN HERE
			wrs_int_init(iframe,toolbar);
		}
	});

	iframe.src = 'generic_wiris/tests/generic_demo.html';		// We set an empty document instead of about:blank for use relative paths for images
	iframe.width = "100%";
	iframe.height = 200;

	// Insert the WYSIWYG editor before the textarea
	textarea.parentNode.insertBefore(iframe, textarea);
	
	// Insert the toolbar before the WYSIWYG editor
	iframe.parentNode.insertBefore(toolbar, iframe);
	
	// When the user submits the form, set the textarea value with the WYSIWYG editor content
	//var form = document.getElementById('exampleForm');
	
	//wrs_addEvent(form, 'submit', function () {
	// WE CALL THE PLUGIN HERE
	textarea.value = wrs_endParse(iframe.contentWindow.document.body.innerHTML);
	//});
});

function getDataFromPlugin() {
	var iframe = document.getElementById('example_iframe');
	return wrs_endParse(iframe.contentWindow.document.body.innerHTML);
}

function getDataPreview(data) {
	return wrs_initParse(data);
}

function changeDPI() {
	ls = document.getElementsByClassName('Wirisformula');
	for (i=0;i<ls.length;i++) {
		img = ls[i];
		img.width = img.clientWidth;
		img.src = img.src + "&dpi=600";
	}
}

function set_parameters_specific_plugin(json_params) {
	_wrs_int_wirisProperties = json_params;
}

function reset_editor(lang){
	_wrs_int_language = lang;
}