# Walkthrough - Installation and Verification

## 1. Load the Extension
1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `/Users/yutaka/Workspace/gemini_link/gemini_redirect_remover` folder.

## 2. Verification
1. Open [Gemini](https://gemini.google.com).
2. Generate a new response with links (e.g., "Give me some direct links to tech news sites").
3. Hover over a link. The status bar (bottom left) should show the direct destination URL immediately.
4. Click the link. It should open in a new tab without showing the Google "Redirecting..." notice.

## 3. Maintenance
If Gemini updates its UI and redirects start appearing again:
- Open the Developer Tools (F12) Console.
- Check for `[GRR] v11` logs.
- If no logs appear, ensure the extension is refreshed in `chrome://extensions`.
