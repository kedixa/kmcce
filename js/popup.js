function sendMessageToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function(response) {
			if(callback) callback(response);
		});
	});
}
document.getElementById('set_counter_tag').onclick = function() {
	sendMessageToContentScript('kedixa_kazelink_set_counter_tag', (response) => { });
};
document.getElementById('reset_counter_tag').onclick = function() {
	sendMessageToContentScript('kedixa_kazelink_reset_counter_tag', (response) => { });
};
document.getElementById('remove_counter_tag').onclick = function() {
	sendMessageToContentScript('kedixa_kazelink_remove_counter_tag', (response) => { });
};
function getCurrentTabId(callback) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}
