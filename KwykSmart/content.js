let statusMessage = '';

// Fonction pour créer et afficher le popup
function createPopup() {
  const popup = document.createElement('div');
  popup.id = 'kwyk-popup';
  popup.innerHTML = `
    <div class="kwyk-popup-content">
      <p>Voulez-vous copier les questions et les calculs ?</p>
      <button id="kwyk-yes" class="kwyk-button">Oui</button>
      <button id="kwyk-no" class="kwyk-button kwyk-button-no">Non</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('kwyk-yes').addEventListener('click', copyContent);
  document.getElementById('kwyk-no').addEventListener('click', () => {
    statusMessage = 'L\'utilisateur a choisi de ne pas copier.';
    chrome.runtime.sendMessage({status: statusMessage});
    popup.style.display = 'none';
  });
}

// Fonction pour extraire tout le texte d'un élément, excluant les formules LaTeX
function getTextFromElement(element) {
  let text = '';
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "BR") {
      text += '\n';
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('katex')) {
      text += getTextFromElement(node);
    }
  });
  return text;
}

// Fonction pour copier le contenu
function copyContent() {
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get('latexMode', function(result) {
      console.log('latexMode:', result.latexMode); // Log de vérification
      let parentElement = document.querySelector('.exercise_question');

      if (parentElement) {
        // Obtenir tout le texte de la question, en excluant les éléments KaTeX
        let text = getTextFromElement(parentElement).trim();

        let fullText = `Questions: ${text}\n`;

        if (result.latexMode) {
          // Récupérer le code LaTeX
          let latexElements = parentElement.querySelectorAll('.katex-mathml annotation[encoding="application/x-tex"]');
          let latexCodes = Array.from(latexElements).map(el => el.textContent).join('\n');
          fullText += `Calculs LaTeX: ${latexCodes}`;
        } else {
          // Récupérer le texte KaTeX
          let katexElements = parentElement.querySelectorAll('.katex-html');
          let katexTexts = Array.from(katexElements).map(el => el.innerText).join('\n');
          fullText += `Calculs KaTeX: ${katexTexts}`;
        }

        navigator.clipboard.writeText(fullText).then(() => {
          statusMessage = 'Questions et calculs bien copiés.';
          chrome.runtime.sendMessage({status: statusMessage});
          document.getElementById('kwyk-popup').style.display = 'none';
        }).catch(err => {
          statusMessage = `Échec de la copie dans le presse-papier: ${err}`;
          chrome.runtime.sendMessage({status: statusMessage});
        });
      } else {
        statusMessage = 'Aucune question trouvée.';
        chrome.runtime.sendMessage({status: statusMessage});
      }
    });
  } else {
    console.error('chrome.storage.local is undefined');
  }
}

// Vérifier les URLs pour afficher le popup
const devoirsPattern = /https:\/\/www\.kwyk\.fr\/devoirs\/\d+/;
const exercicesPattern = /https:\/\/www\.kwyk\.fr\/exercices\/.*/;

if (window.location.href.match(devoirsPattern) || window.location.href.match(exercicesPattern)) {
  statusMessage = 'Le popup est affiché, en attente de l\'utilisateur.';
  createPopup();
}

// Pour répondre à la demande de statut
if (chrome && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getStatus') {
      sendResponse({status: statusMessage});
    }
  });
} else {
  console.error('chrome.runtime.onMessage is undefined');
}