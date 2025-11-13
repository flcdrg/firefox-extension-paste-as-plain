// Create context menu item
browser.contextMenus.create({
  id: "paste-as-plain-text",
  title: "Paste as plain text",
  contexts: ["editable"]
});

// Handle context menu click
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "paste-as-plain-text") {
    browser.tabs.sendMessage(tab.id, {
      action: "pasteAsPlainText"
    });
  }
});
