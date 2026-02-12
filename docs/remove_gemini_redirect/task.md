# Gemini Link Redirect Remover - Task Overview (Final)

## Goal
Remove Google's redirect wrappers (both `/url?q=` and `/search?q=`) from Gemini's interface to allow direct navigation to URLs.

## Success Criteria
- [x] Automatically detect and purify links in the main DOM and Shadow DOM.
- [x] Handle Google Search redirect patterns.
- [x] Strip tracking attributes (`jslog`, `ping`, etc.) and break original event listeners by node cloning.
- [x] Ensure links open in a new tab without redirect pages.

## Deliverables
- `manifest.json`: Extension config (V3).
- `content.js`: Recursive scanner and node liberator.
