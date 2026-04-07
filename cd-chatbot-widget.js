/**
 * CD Chatbot Widget — Embeddable floating chat bubble
 * Loads CD Chatbot in an iframe overlay on theapexvisionadvisors.com
 */
(function () {
  'use strict';

  // The deployed CD Chatbot URL
  var CHATBOT_URL = 'https://www.perplexity.ai/computer/a/cd-chatbot-DCjaP2RXS.eUDU9f9q6qLg';

  // Prevent double-init
  if (document.getElementById('cd-widget-trigger')) return;

  // --- Create trigger button ---
  var trigger = document.createElement('button');
  trigger.id = 'cd-widget-trigger';
  trigger.className = 'cd-widget-trigger';
  trigger.setAttribute('aria-label', 'Open CD Chatbot');
  trigger.innerHTML =
    // Chat icon (heart + speech bubble hybrid)
    '<svg class="cd-icon-chat" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M16 27C16 27 5 19.5 5 11.5C5 8.42 7.42 6 10.5 6C12.24 6 13.79 6.81 14.84 8.06L16 9.5L17.16 8.06C18.21 6.81 19.76 6 21.5 6C24.58 6 27 8.42 27 11.5C27 19.5 16 27 16 27Z" fill="white" opacity="0.95"/>' +
      '<text x="16" y="17.5" text-anchor="middle" font-size="9" font-weight="700" fill="#0d3b6e" font-family="system-ui,sans-serif" letter-spacing="-0.5">CD</text>' +
    '</svg>' +
    // Close X icon
    '<svg class="cd-icon-close" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">' +
      '<line x1="6" y1="6" x2="18" y2="18"/>' +
      '<line x1="18" y1="6" x2="6" y2="18"/>' +
    '</svg>';

  document.body.appendChild(trigger);

  // --- Create label ---
  var label = document.createElement('div');
  label.className = 'cd-widget-label';
  label.textContent = 'Chat with CD';
  document.body.appendChild(label);

  // --- Create chat window ---
  var chatWindow = document.createElement('div');
  chatWindow.className = 'cd-widget-window';
  chatWindow.id = 'cd-widget-window';
  chatWindow.setAttribute('role', 'dialog');
  chatWindow.setAttribute('aria-label', 'CD Chatbot');
  document.body.appendChild(chatWindow);

  var iframeLoaded = false;
  var isOpen = false;

  function openChat() {
    isOpen = true;
    trigger.classList.add('cd-active', 'cd-opened');
    trigger.setAttribute('aria-label', 'Close CD Chatbot');
    label.classList.add('cd-hidden');

    // Lazy-load iframe on first open
    if (!iframeLoaded) {
      var iframe = document.createElement('iframe');
      iframe.src = CHATBOT_URL;
      iframe.title = 'CD Chatbot — Compassionate Dialogue';
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('allow', 'clipboard-write');
      chatWindow.appendChild(iframe);
      iframeLoaded = true;
    }

    chatWindow.classList.add('cd-visible');
  }

  function closeChat() {
    isOpen = false;
    trigger.classList.remove('cd-active');
    trigger.setAttribute('aria-label', 'Open CD Chatbot');
    label.classList.remove('cd-hidden');
    chatWindow.classList.remove('cd-visible');
  }

  trigger.addEventListener('click', function () {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });

  // Show tooltip briefly on load
  setTimeout(function () {
    label.classList.add('cd-show');
    setTimeout(function () {
      label.classList.remove('cd-show');
    }, 3000);
  }, 2000);
})();
