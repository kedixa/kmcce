function kedixa_kazelink_set_message(value) {
    document.getElementsByClassName('ChatSend-txt')[0].value = value;
}
function kedixa_kazelink_send_message() {
    document.getElementsByClassName('ChatSend-button')[0].click();
}
function kedixa_kazelink_set_counter_tag() {
    if(document.getElementById('kedixa_kazelink_counter_tag')) {
        alert('标签已存在');
        return;
    }
    // config kedixa_kazelink_config
    var counter_html = '<div id="kedixa_kazelink_counter_tag">\n';
    var barrage_template = '';
    for(var key in kedixa_kazelink_config) {
        var item = kedixa_kazelink_config[key];
        if(item.type === 'template') {
            barrage_template = item.default_value;
        }
        else if(item.type === 'number') {
            var input_id = 'kedixa_kazelink_' + key;
            var html = '<form class="kedixa_kazelink_container">';
            html += '<label>' + item.label + ': </label>';
            html += '<input type="text" class="kedixa_kazelink_input_number" id="' +
                input_id + '" value="' + item.default_value + '"></input>';
            if(typeof(item.buttons) !== 'undefined') {
                for(var i = 0; i < item.buttons.length; i++) {
                    var btn = item.buttons[i];
                    var btn_id = 'kedixa_kazelink_' + btn.name;
                    var btn_html = '';
                    if(btn.action >= 0) {
                        btn_html += '<input type="button" class="kedixa_kazelink_button_a" id="' +
                            btn_id + '" value="' + btn.label + '"></input>';
                    }
                    else {
                        btn_html += '<input type="button" class="kedixa_kazelink_button_b" id="' +
                            btn_id + '" value="' + btn.label + '"></input>';
                    }
                    html += btn_html;
                }
            }
            html += '</form>\n';
            counter_html += html;
        }
        else if(item.type === 'text') {
            var input_id = 'kedixa_kazelink_' + key;
            var html = '<form class="kedixa_kazelink_container">\n';
            html += '<label>' + item.label + ':</label>\n';
            html += '<input type="text" id="' + input_id + '"</input><br/>';
            html += '</form>';
            counter_html += html;
        }
    }
    var template_form = '<form class="kedixa_kazelink_container">\
        <label>弹幕模板:</label><br/>\
        <textarea id="kedixa_kazelink_barrage_template" class="kedixa_kazelink_barrage_template">' +
        barrage_template + '</textarea><br/>\
        <input type="button" id="kedixa_kazelink_generate_text" class="kedixa_kazelink_button_c" value="定制弹幕">\
        <input type="button" id="kedixa_kazelink_send_barrage" class="kedixa_kazelink_button_c" value="直接发送"><br/>\
        </form>';
    counter_html += template_form;
    counter_html += '</div>';
    var div = document.createElement("div");
    div.id="kedixa_kazelink_tag_wrapper";
    div.innerHTML = counter_html;
    document.body.appendChild(div);
    // generate click action
    var K = function(id) { return document.getElementById(id); };
    var change_number = function(id, c) {
        var old_value = parseInt(K(id).value);
        var new_value = old_value + c;
        K(id).value = new_value;
        var dict = {};
        dict[id] = new_value;
        chrome.storage.local.set(dict, function(){});
    };
    for(var key in kedixa_kazelink_config) {
        var item = kedixa_kazelink_config[key];
        if(item.type === 'number') {
            var input_id = 'kedixa_kazelink_' + key;
            var dict = {};
            dict[input_id] = item.default_value;
            chrome.storage.local.get(dict, function() {
                var local_input_id = input_id;
                return function(result) {
                    K(local_input_id).value = result[local_input_id];
                };
            }());
            if(typeof(item.buttons) !== 'undefined') {
                for(var i = 0; i < item.buttons.length; i++) {
                    var btn = item.buttons[i];
                    var btn_id = 'kedixa_kazelink_' + btn.name;
                    K(btn_id).onclick = function() {
                        var local_input_id = input_id;
                        var local_btn = btn;
                        return function() {
                            change_number(local_input_id, local_btn.action);
                            if(typeof(local_btn.affect) !== 'undefined') {
                                for(var i = 0; i < local_btn.affect.length; i++) {
                                    var affect_id = 'kedixa_kazelink_' + local_btn.affect[i];
                                    document.getElementById(affect_id).click();
                                }
                            }
                        };
                    }();
                }
            }
        }
        else if(item.type === 'text') {
            var input_id = 'kedixa_kazelink_' + key;
            var dict = {};
            dict[input_id] = item.default_value;
            chrome.storage.local.get(dict, function() {
                var local_input_id = input_id;
                return function(result) {
                    K(local_input_id).value = result[local_input_id];
                };
            }());
        }
    }
    K('kedixa_kazelink_generate_text').onclick = function() {
        var text = K('kedixa_kazelink_barrage_template').value;
        for(var key in kedixa_kazelink_config) {
            var item = kedixa_kazelink_config[key];
            if(item.type === 'number' || item.type === 'text') {
                var input_id = 'kedixa_kazelink_' + key;
                text = text.replace('{' + key + '}', K(input_id).value);
            }
        }
        kedixa_kazelink_set_message(text);
    };
    K('kedixa_kazelink_send_barrage').onclick = function () {
        K('kedixa_kazelink_generate_text').click();
        document.getElementsByClassName('ChatSend-button')[0].click();
    };
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request == 'kedixa_kazelink_set_counter_tag') {
        kedixa_kazelink_set_counter_tag();
    }
    else if(request == 'kedixa_kazelink_reset_counter_tag') {
        var div = document.getElementById('kedixa_kazelink_tag_wrapper');
        if(div)
            document.body.removeChild(div);
        for(var key in kedixa_kazelink_config) {
            var item = kedixa_kazelink_config[key];
            var input_id = 'kedixa_kazelink_' + key;
            chrome.storage.local.remove(input_id, function(){});
        }
        kedixa_kazelink_set_counter_tag();
    }
    else if(request == 'kedixa_kazelink_remove_counter_tag') {
        var div = document.getElementById('kedixa_kazelink_tag_wrapper');
        if(div)
            document.body.removeChild(div);
    }
    else {
        alert('unknown request ' + request);
    }
    return true;
});
