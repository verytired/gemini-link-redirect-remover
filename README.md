# Gemini Redirect Remover

Chrome extension to remove Google's redirect wrappers (both `/url?q=` and `/search?q=`) from the Gemini (gemini.google.com) interface, allowing direct navigation to target URLs.

## Features
- **Deep Clean**: Recursively scans Shadow DOM to find and fix hidden links.
- **Node Liberation**: Clones anchor elements to strip Google's event listeners and tracking attributes (`jslog`, `ping`, etc.).
- **Multi-Pattern Support**: Handles both standard redirects and search-based redirects.
- **JIT Processing**: Re-scans on user interaction to ensure links are fixed just-in-time.

## Installation
1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the `gemini_redirect_remover` folder.

## Technical Details
Gemini is built with high levels of encapsulation. This extension uses a recursive "Nuclear Node Replacement" strategy to bypass framework-level event hijacking, ensuring that clicks lead directly to the intended destination.
