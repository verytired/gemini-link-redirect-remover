console.log("%cGemini Redirect Remover: Active", "color: #1a73e8; font-weight: bold;");

// 文字列から実際の目的地URLを見つけ出す
function findActualUrl(href) {
  if (!href || typeof href !== 'string') return null;

  try {
    const u = new URL(href);
    // パターンA: google.com/url?q=...
    // パターンB: google.com/search?q=http... (検索後のリダイレクト)
    const q = u.searchParams.get('q') || u.searchParams.get('url');

    if (q && q.startsWith('http')) return q;

    // パターンC: 上記以外でURLの中にhttpが含まれている場合（最終手段）
    if (href.includes('google.com') && href.includes('http', 10)) {
      const match = href.match(/https?%3A%2F%2F[^&]+/);
      if (match) return decodeURIComponent(match[0]);
    }
  } catch (e) { /* ignore */ }
  return null;
}

// 要素をGoogleの支配下から解放する
function liberateElement(a) {
  if (!a || a.dataset.grrFixed) return;

  const currentHref = a.href;
  const cleanUrl = findActualUrl(currentHref);

  // cleanUrlが見つかった場合、またはGoogleのトラッカーがついている場合
  if (cleanUrl || a.hasAttribute('jslog') || a.hasAttribute('data-hveid')) {
    const target = cleanUrl || currentHref;

    // --- 核となる処理：要素をクローンして置き換える (イベントリスナーの全削除) ---
    const newA = a.cloneNode(true);
    newA.href = target;
    newA.dataset.grrFixed = "true";

    // トラッキング系属性を根こそぎ削除
    const trackers = ['jslog', 'data-hveid', 'ping', 'jsaction', 'data-jslog'];
    trackers.forEach(attr => newA.removeAttribute(attr));

    newA.target = "_blank";
    newA.rel = "noopener noreferrer";

    if (a.parentNode) {
      a.parentNode.replaceChild(newA, a);
      console.log(`[GRR] Liberated: ${target}`);
    }
  }
}

// 全てのDOM（Shadow DOM含む）をスキャン
function scanDeep(root) {
  if (!root) return;

  // リンクを検索
  const anchors = root.querySelectorAll('a');
  anchors.forEach(liberateElement);

  // 子要素のShadow DOMを探索
  const all = root.querySelectorAll('*');
  all.forEach(el => {
    if (el.shadowRoot) scanDeep(el.shadowRoot);
  });
}

// 実行管理
function run() {
  scanDeep(document);
}

// 頻繁にスキャン（Geminiの高速なDOM更新に追従）
setInterval(run, 1500);

// インタラクション時にも実行
['mousedown', 'mouseover', 'click'].forEach(type => {
  document.addEventListener(type, run, { capture: true, passive: true });
});

console.log("[GRR] Ready.");
