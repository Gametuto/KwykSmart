chrome.runtime.onInstalled.addListener(() => {
  console.log('KwykSmart extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background:', message);
  sendResponse();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status) {
    console.log('Status received:', request.status);
  }
});
