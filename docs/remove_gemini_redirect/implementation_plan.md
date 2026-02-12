# Implementation Plan - Gemini Link Redirect Remover

## Final Architecture: "The Liberator"

### 1. Multi-Pattern Extraction
The extension handles three main patterns:
- Standard: `google.com/url?q=URL`
- Search: `google.com/search?q=http...`
- Embedded: Encoded URLs inside complex Google strings.

### 2. Recursive Shadow DOM Scanning
Gemini uses heavy encapsulation. The script recursively traverses all `shadowRoot` elements starting from `document` to find links.

### 3. Node Liberation (Event Listener Scrubbing)
Standard property updates are often reverted by Gemini's framework (Angular). To prevent this and to strip Google's internal event listeners:
- Found anchors are **cloned** (`cloneNode(true)`).
- The clone's `href` is set to the direct URL.
- Tracking attributes (`jslog`, `ping`, `data-hveid`) are removed.
- The original node is replaced by the clone.

### 4. Continuous Synchronization
- **Interval**: Scans Every 1.5s to catch new incremental responses.
- **Event-driven**: Scans on `mousedown` and `mouseover` for immediate JIT (Just-In-Time) cleaning before the user clicks.
