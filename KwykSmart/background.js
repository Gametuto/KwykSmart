// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('KwykSmart extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copy') {
    const mode = request.mode;
    const tabId = sender.tab.id;
    chrome.tabs.sendMessage(tabId, {action: 'copy', mode: mode}, function(response) {
      sendResponse(response);
    });
  } else if (request.action === 'getStatus') {
    // Logique pour obtenir le statut (facultatif)
    sendResponse({status: 'Statut obtenu'});
  }
});