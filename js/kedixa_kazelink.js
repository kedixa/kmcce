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
    var counter_html = '\
    <div id="kedixa_kazelink_counter_tag">\
        <form class="kedixa_kazelink_container">\
            <label>胜场：</label>\
            <input type="text" class="kedixa_kazelink_input_number" id="kedixa_kazelink_text_win" value="0"></input>\
            <input type="button" class="kedixa_kazelink_button_add" id="kedixa_kazelink_win_add" value="+1">\
            <input type="button" class="kedixa_kazelink_button_sub" id="kedixa_kazelink_win_sub" value="-1">\
        </form>\
        <form class="kedixa_kazelink_container">\
            <label>败场：</label>\
            <input type="text" class="kedixa_kazelink_input_number" id="kedixa_kazelink_text_lose" value="0"></input>\
            <input type="button" class="kedixa_kazelink_button_add" id="kedixa_kazelink_lose_add" value="+1">\
            <input type="button" class="kedixa_kazelink_button_sub" id="kedixa_kazelink_lose_sub" value="-1">\
        </form>\
        <form class="kedixa_kazelink_container">\
            <label>喝汤：</label>\
            <input type="text" class="kedixa_kazelink_input_number" id="kedixa_kazelink_text_soup" value="0"></input>\
            <input type="button" class="kedixa_kazelink_button_add" id="kedixa_kazelink_soup_add" value="+1">\
            <input type="button" class="kedixa_kazelink_button_sub" id="kedixa_kazelink_soup_sub" value="-1">\
        </form>\
        <form class="kedixa_kazelink_container">\
            <label>点评：</label>\
            <input type="text" id="kedixa_kazelink_text_comment" value="牛六不开"></input><br/>\
            <label>定制弹幕模式：</label><br/>\
            <textarea id="kedixa_kazelink_textarea" style="min-width: 280px; min-height: 100px;">胜利：%%win%%，失败：%%lose%%，喝汤：%%soup%%，点评：%%comment%%</textarea><br/>\
            <input type="button" id="kedixa_kazelink_generate_text" value="定制弹幕">\
        </form>\
    </dvi>';
    var K = function(id) { return document.getElementById(id); };
    var change_value = function(id, c) {
        var old_value = parseInt(K(id).value);
        var new_value = old_value + c;
        if(new_value >= 0) K(id).value = old_value + c;
    };
    var div = document.createElement("div");
    div.id="kedixa_kazelink_tag_wrapper";
    div.innerHTML = counter_html;
    document.body.appendChild(div);
    K('kedixa_kazelink_win_add').onclick = function() { change_value('kedixa_kazelink_text_win', 1); };
    K('kedixa_kazelink_win_sub').onclick = function() { change_value('kedixa_kazelink_text_win', -1); };
    K('kedixa_kazelink_lose_add').onclick = function() { change_value('kedixa_kazelink_text_lose', 1); };
    K('kedixa_kazelink_lose_sub').onclick = function() { change_value('kedixa_kazelink_text_lose', -1); };
    K('kedixa_kazelink_soup_add').onclick = function() { change_value('kedixa_kazelink_text_soup', 1); change_value('kedixa_kazelink_text_lose', 1); };
    K('kedixa_kazelink_soup_sub').onclick = function() { change_value('kedixa_kazelink_text_soup', -1); change_value('kedixa_kazelink_text_lose', -1); };
    K('kedixa_kazelink_generate_text').onclick = function() {
        var text = K('kedixa_kazelink_textarea').value;
        text = text.replace('%%win%%', K('kedixa_kazelink_text_win').value);
        text = text.replace('%%lose%%', K('kedixa_kazelink_text_lose').value);
        text = text.replace('%%soup%%', K('kedixa_kazelink_text_soup').value);
        text = text.replace('%%comment%%', K('kedixa_kazelink_text_comment').value);
        kedixa_kazelink_set_message(text);
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
});
