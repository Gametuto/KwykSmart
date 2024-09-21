// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('KwykSmart extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background:', message);

  if (message.status) {
    console.log('Status received:', message.status);
  }

  sendResponse();
});