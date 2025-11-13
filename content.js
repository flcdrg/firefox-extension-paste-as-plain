// Listen for messages from background script
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "pasteAsPlainText") {
    pasteAsPlainText();
  }
});

async function pasteAsPlainText() {
  try {
    // Get clipboard text
    const text = await navigator.clipboard.readText();
    
    // Get the active element
    const activeElement = document.activeElement;
    
    if (!activeElement) {
      return;
    }
    
    // Handle different input types
    if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
      // For input and textarea elements
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const value = activeElement.value;
      
      // Insert plain text at cursor position
      activeElement.value = value.substring(0, start) + text + value.substring(end);
      
      // Set cursor position after inserted text
      activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
      
      // Trigger input event for frameworks that listen to it
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (activeElement.isContentEditable) {
      // For contentEditable elements (avoid deprecated execCommand)
      insertTextAtCursorInContentEditable(activeElement, text);
    }
  } catch (err) {
    console.error('Failed to paste as plain text:', err);
  }
}

function insertTextAtCursorInContentEditable(element, text) {
  try {
    // Ensure the element has focus
    if (document.activeElement !== element) {
      element.focus();
    }

    const doc = element.ownerDocument || document;
    const selection = doc.getSelection();
    if (!selection) {
      return;
    }

    let range = null;
    if (selection.rangeCount > 0) {
      const currentRange = selection.getRangeAt(0);
      if (element.contains(currentRange.startContainer) && element.contains(currentRange.endContainer)) {
        range = currentRange;
      }
    }

    if (!range) {
      // Place caret at end if no valid selection inside element
      range = doc.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Replace current selection with plain text content
    range.deleteContents();

    const frag = doc.createDocumentFragment();
    const lines = String(text).split(/\r?\n/);
    const endsWithNewline = /\r?\n$/.test(text);

    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        frag.appendChild(doc.createElement('br'));
      }
      if (lines[i].length > 0) {
        frag.appendChild(doc.createTextNode(lines[i]));
      }
    }

    if (endsWithNewline) {
      frag.appendChild(doc.createElement('br'));
    }

    const lastNode = frag.lastChild;
    range.insertNode(frag);

    // Move caret to the end of the inserted content
    if (lastNode) {
      range.setStartAfter(lastNode);
      range.setEndAfter(lastNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Notify listeners (frameworks) about the input change
    try {
      element.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
    } catch (_) {
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
  } catch (e) {
    console.error('Failed to insert text into contentEditable:', e);
  }
}
