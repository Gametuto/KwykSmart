document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('latex-toggle');

  if (toggle) {
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get('latexMode', function(result) {
        toggle.checked = result.latexMode || false;
      });

      toggle.addEventListener('change', function() {
        chrome.storage.local.set({latexMode: toggle.checked}, function() {
          console.log('Latex mode set to ' + toggle.checked);
        });
      });
    } else {
      console.error('chrome.storage.local is undefined');
    }
  } else {
    console.error('Toggle element not found');
  }

  // Demander le statut initial
  if (chrome && chrome.tabs) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'getStatus'}, function(response) {
          let statusElement = document.getElementById('status');
          if (statusElement && response && response.status) {
            statusElement.textContent = response.status;
            if (response.status.includes('copiés')) {
              statusElement.className = 'notification is-success';
            } else if (response.status.includes('utilisateur a choisi de ne pas copier')) {
              statusElement.className = 'notification is-warning';
            } else {
              statusElement.className = 'notification is-danger';
            }
          } else {
            statusElement.textContent = 'Vérification du statut...';
            statusElement.className = 'notification is-info';
          }
        });
      } else {
        console.error('No active tab found or tab id is undefined');
      }
    });
  } else {
    console.error('chrome.tabs is undefined');
  }
});
