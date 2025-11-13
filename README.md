# Paste as Plain Text - Firefox Extension

A simple Firefox extension that adds a "Paste as plain text" option to the browser's context menu.

## Features

- Adds a context menu item when right-clicking on editable fields (input, textarea, contentEditable)
- Pastes clipboard content as plain text, removing all formatting
- Works on all websites
- Lightweight and privacy-friendly

## Installation

### From Source

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Navigate to the extension directory and select `manifest.json`

### From Firefox Add-ons Store

(Coming soon - after submission to Mozilla Add-ons)

## Usage

1. Copy formatted text from any source
2. Right-click on any text input field, textarea, or contentEditable element
3. Select "Paste as plain text" from the context menu
4. The text will be pasted without any formatting

## Permissions

- `contextMenus` - To add the context menu item
- `activeTab` - To interact with the current tab
- `clipboardRead` - To read clipboard content

## Development

The extension consists of three main files:

- `manifest.json` - Extension configuration
- `background.js` - Creates the context menu and handles clicks
- `content.js` - Handles the actual paste operation

### Icons

The extension uses two icons (`icons/icon-48.png` and `icons/icon-96.png`). Their source is a single SVG (`icons/icon.svg`) showing a clipboard and a page to represent Paste.

To regenerate PNGs from the SVG (preferred: pnpm):

1. Install dependencies

```pwsh
pnpm install
```

1. Build the icons

```pwsh
pnpm build:icons
```

This will overwrite `icons/icon-48.png` and `icons/icon-96.png` with rasterized images from the SVG.

Alternative with npm:

```pwsh
npm install
npm run build:icons
```

## License

See [LICENSE](LICENSE) file for details.
