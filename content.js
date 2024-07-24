document.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'click' });
  });