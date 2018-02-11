// Retrieve language from either URL or POST parameters
function getParameter(name,dflt) {
	var value = new RegExp(name+"=([^&]*)","i").exec(window.location);
	if (value!=null && value.length>1) return decodeURIComponent(value[1].replace(/\+/g,' ')); else return dflt;
}
var lang = getParameter("language","${serverParam:language}");
if (lang.length==0) {
	lang="en";  
}


var content = document.getElementById('preview_div').innerHTML;
if (content.length==0) {
	document.getElementById('preview_div').innerHTML = '<span id="previewMessage">Press the Update button.</span>'
}
if (content.length>0 && (lang == 'ar' || lang == 'he')) {
	var prevBox = document.getElementById('preview_div');
	prevBox.setAttribute('dir', 'rtl');
}			

String.prototype.splice = function(idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

String.prototype.getMatchIndices = function( find ) {
	var indices=[],data,exp = (typeof find=='string'?new RegExp(find, 'g'):find);  

	while ((data = exp.exec(this))) {
		indices.push(data.index);
	}

	return indices.length?indices:[];
};

function preview(){
	var data = getDataFromPlugin();
	var data_preview = getDataPreview(data);
	var data_code = (data.replace(/</g,"&lt;")).trim();

	var preview_div = document.getElementById("preview_div");
	preview_div.innerHTML = data_preview;

	var htmlcode_div = document.getElementById("htmlcode_div");
	var code_block = document.getElementById("code_block");

	htmlcode_div.innerHTML = "<pre class='wrs_inline'><code id='code_block' style='color:#e0e0e0'>"+data_code+"</code></pre>";

	highlight_code();

	Prism.highlightAll();
}

function highlight_code(){
	var htmlcode_div = document.getElementById("htmlcode_div");

	var html_content = htmlcode_div.innerHTML;
	var open_highlight = "<pre class='language-xml wrs_inline' style='word-wrap:break-word;background-color:white'><code>";
	var close_highlight = "</code></pre>";
	
	if (_wrs_conf_saveMode == "xml") {

		/* MATH TAGS */

		var indexs_end = html_content.getMatchIndices("&lt;/math&gt;");

		for (var i = indexs_end.length-1; i >= 0; i--) {
			var actual_index_end = indexs_end[i]+13;
			html_content = html_content.splice(actual_index_end, 0, close_highlight);  
		}

		var indexs_start = html_content.getMatchIndices("&lt;math");

		for (var i = indexs_start.length-1; i >= 0; i--) {
			var actual_index_start = indexs_start[i];
			html_content = html_content.splice(actual_index_start, 0, open_highlight);  
		}

	}
	else if (_wrs_conf_saveMode == "image") {

		/* IMG TAGS */

		indexs_end = html_content.getMatchIndices('" /&gt;');

		for (var i = indexs_end.length-1; i >= 0; i--) {
			var actual_index_end = indexs_end[i]+7;
			html_content = html_content.splice(actual_index_end, 0, close_highlight);  
		}

		if (indexs_end.length == 0) {
			indexs_end = html_content.getMatchIndices('px;"&gt;');

			for (var i = indexs_end.length-1; i >= 0; i--) {
				var actual_index_end = indexs_end[i]+8;
				html_content = html_content.splice(actual_index_end, 0, close_highlight);  
			}		
		}

		indexs_start = html_content.getMatchIndices("&lt;img");
		
		for (var i = indexs_start.length-1; i >= 0; i--) {
			var actual_index_start = indexs_start[i];
			html_content = html_content.splice(actual_index_start, 0, open_highlight);  
		}
	}
	else if (_wrs_conf_saveMode == "base64") {
		/* IMG TAGS */

		indexs_end = html_content.getMatchIndices('" /&gt;');

		for (var i = indexs_end.length-1; i >= 0; i--) {
			var actual_index_end = indexs_end[i]+7;
			html_content = html_content.splice(actual_index_end, 0, close_highlight);  
		}

		if (indexs_end.length == 0) {
			indexs_end = html_content.getMatchIndices('px;"&gt;');

			for (var i = indexs_end.length-1; i >= 0; i--) {
				var actual_index_end = indexs_end[i]+8;
				html_content = html_content.splice(actual_index_end, 0, close_highlight);  
			}		
		}

		if (indexs_end.length == 0) {
			indexs_end = html_content.getMatchIndices('px;"/&gt;');

			for (var i = indexs_end.length-1; i >= 0; i--) {
				var actual_index_end = indexs_end[i]+9;
				html_content = html_content.splice(actual_index_end, 0, close_highlight);  
			}		
		}

		indexs_start = html_content.getMatchIndices("&lt;IMG");
		if (indexs_start.length != indexs_end.length) {
			indexs_start = html_content.getMatchIndices("&lt;img");
		}
		for (var i = indexs_start.length-1; i >= 0; i--) {
			var actual_index_start = indexs_start[i];
			html_content = html_content.splice(actual_index_start, 0, open_highlight);  
		}
	}
	htmlcode_div.innerHTML = html_content;
}



function displayHTML() {
	var preview_div = document.getElementById("preview_div");
	preview_div.style.display = "none";
	var htmlcode_div = document.getElementById("htmlcode_div");
	htmlcode_div.style.display = "block";
}

function displayPreview() {
	var preview_div = document.getElementById("preview_div");
	preview_div.style.display = "block";
	var htmlcode_div = document.getElementById("htmlcode_div");
	htmlcode_div.style.display = "none";
}

function change_mode(mode){
	var new_mode = "";
	var new_editMode = "default";
	var new_parseModes = ['latex'];

	if (mode == 'xml') {
		new_mode = 'xml';
	}
	else if (mode == 'image') {
		new_mode = 'image';
	}
	else if (mode == 'base64') {
		new_mode = 'base64';
		new_editMode = "image";
		new_parseModes = ['latex', 'xml'];
	}

	_wrs_conf_parseModes = new_parseModes;
	_wrs_conf_editMode = new_editMode;
	_wrs_conf_saveMode = new_mode;
	preview();
}


function change_language() {
	var e = document.getElementById("lang_select");
	var lang = e.options[e.selectedIndex].value;
	var prevBox = document.getElementById('preview_div');

	if (lang == 'ar' || lang == 'he') {
		prevBox.setAttribute('dir', 'rtl');   
	}else{
		prevBox.setAttribute('dir', 'ltr'); 
	}

	reset_editor(lang);
}

function set_parameters(){
	var e = document.getElementById("editor_parameters");

	if (check_valid_json()) {
		var json_params = eval('[' + e.value + '][0]');
		set_parameters_specific_plugin(json_params);
	}
}

function enable_disable_set_button () {
	var button_set = document.getElementById("set_parameters");
	var text_area = document.getElementById("editor_parameters");

	if (text_area.value.length > 0) {
		button_set.disabled = false;
	}
	else {
		button_set.disabled = true;
	}

	var notification = document.getElementById("notification_set_parameters");
	notification.className = "wrs_display_none";
	notification.innerHTML = "";
}

function check_valid_json() {

	var notification = document.getElementById("notification_set_parameters");
	var button_set = document.getElementById("set_parameters");
	var text_area = document.getElementById("editor_parameters");
	var error = isValidJson(text_area.value);

	if (error == "") {

		notification.className = "wrs_notification_valid";
		notification.innerHTML = "Done";
		//text_area.placeholder = text_area.value;
		button_set.disabled = true;
		return true;
	}
	else {
		notification.className = "wrs_notification_invalid";  
		notification.innerHTML = "This is not a valid JSON";
		//text_area.placeholder = "";
		return false;
	}
}

function set_value(){
	var text_area = document.getElementById("editor_parameters");
	if (text_area.value.length > 0) {
		//text_area.value = text_area.placeholder;
		enable_disable_set_button();
	}

}

function isValidJson(json) {
	try {
		var v1 = JSON.parse(JSON.stringify(eval('['+json+'][0]')));
		return "";
	} 
	catch (e) {
		return e.message;
	}
}


var js = document.createElement("script");
js.type = "text/javascript";
js.src = "@param.js.demo.wirisplugin.script.path@/WIRISplugins.js?viewer=image";
document.head.appendChild(js);

