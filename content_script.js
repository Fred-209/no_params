browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    navigator.clipboard
      .writeText(message.text)
      .then(() => {
        console.log("Stripped URL copied to clipboard");
        sendResponse({ success: true });
      })
      .catch((err) => {
        console.error("Copy failed", err);
        sendResponse({ success: false, error: err.toString() });
      });
  }
  return true;
});
