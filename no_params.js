browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].url) {
      const activeTab = tabs[0];
      const strippedUrl = activeTab.url.split("?")[0];

      // Send message to content script and handle the response asynchronously
      browser.tabs
        .sendMessage(activeTab.id, { text: strippedUrl })
        .then((response) => {
          if (response && response.success) {
            // Show notification
            browser.notifications.create({
              type: "basic",
              iconUrl: browser.extension.getURL("icons/no_params.png"),
              title: "Copy Successful",
              message:
                "The URL has been copied to the clipboard without parameters.",
            });
          } else {
            console.error("Error copying text: ", response.error);
          }
        })
        .catch((err) => console.error("Message sending failed", err));
    }
  });
});
