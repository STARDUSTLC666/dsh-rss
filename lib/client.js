// This is the browser source. tsc does not rebuild it; check with node --check.
window.__ModuleLoader__.load({ id: 'dsh-rss', factory: require => {
  const React = require('react');
var __FR_KEY = "dsh-first-run:dsh-rss:v1";
var __FR_TITLE = "RSS 订阅 · 首次使用（3 步）";
var __FR_STEPS = [{"title":"先加一个源","body":"粘贴 RSS/Atom 地址，插件会先抓一次验证可用，再存进列表。"},{"title":"增量比全量好用","body":"抓取时选「增量」，只返回上次之后的新条目，适合定时巡检。"},{"title":"跨源搜索","body":"在对话里直接问关键词最近有没有更新，比逐个源翻快得多。","tryIt":"搜一下最近一周提到 DeepSeek 的订阅条目"}];

// ---- first-run guide (shared snippet; keep in sync across plugins) ----
var __FR_STYLE_ID = 'dsh-first-run-css';
var __FR_CSS = [
  '.fr-card{border:1px solid var(--dsw-border,rgba(0,0,0,.10));border-radius:12px;padding:14px 16px;margin:0 0 14px;background:linear-gradient(180deg,rgba(59,130,246,.06),rgba(59,130,246,.02))}',
  '.fr-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}',
  '.fr-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-accent,#3b82f6)}',
  '.fr-title{font-weight:650;font-size:13.5px}',
  '.fr-count{margin-left:auto;font-size:11px;color:var(--dsw-text-weak,#6b7280);font-variant-numeric:tabular-nums}',
  '.fr-step{font-weight:600;font-size:13px;margin:2px 0 4px}',
  '.fr-body{color:var(--dsw-text-weak,#4b5563);font-size:12.5px;line-height:1.65}',
  '.fr-try{margin-top:8px;padding:7px 9px;border-radius:8px;background:rgba(59,130,246,.09);font-size:12px;display:flex;gap:8px}',
  '.fr-try code{font-family:ui-monospace,monospace;white-space:pre-wrap;word-break:break-word}',
  '.fr-bar{display:flex;gap:8px;align-items:center;margin-top:12px}',
  '.fr-progress{display:flex;gap:4px;margin-right:auto}',
  '.fr-seg{width:16px;height:3px;border-radius:2px;background:var(--dsw-border,rgba(0,0,0,.12))}',
  '.fr-seg.on{background:var(--dsw-accent,#3b82f6)}',
  '.fr-btn{border:1px solid var(--dsw-border,rgba(0,0,0,.14));background:transparent;color:inherit;border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer}',
  '.fr-btn:hover{background:rgba(0,0,0,.04)}',
  '.fr-btn.primary{background:var(--dsw-accent,#3b82f6);border-color:transparent;color:#fff}',
  '.fr-btn.ghost{border-color:transparent;color:var(--dsw-text-weak,#6b7280)}',
].join('\n');
function __frEnsureCss() {
  if (typeof document === 'undefined' || document.getElementById(__FR_STYLE_ID)) return;
  var el = document.createElement('style');
  el.id = __FR_STYLE_ID;
  el.textContent = __FR_CSS;
  document.head.appendChild(el);
}
function __frRead() { try { return localStorage.getItem(__FR_KEY) === 'done'; } catch (e) { return false; } }
function __frWrite() { try { localStorage.setItem(__FR_KEY, 'done'); } catch (e) {} }
function __FirstRunCard() {
  var doneState = React.useState(__frRead);
  var done = doneState[0], setDone = doneState[1];
  var idxState = React.useState(0);
  var index = idxState[0], setIndex = idxState[1];
  React.useEffect(function () { __frEnsureCss(); }, []);
  if (done) return null;
  var step = __FR_STEPS[index];
  var last = index >= __FR_STEPS.length - 1;
  var close = function () { __frWrite(); setDone(true); };
  var kids = [
    React.createElement('div', { className: 'fr-head', key: 'h' },
      React.createElement('span', { className: 'fr-dot' }),
      React.createElement('span', { className: 'fr-title' }, __FR_TITLE),
      React.createElement('span', { className: 'fr-count' }, (index + 1) + ' / ' + __FR_STEPS.length)),
    React.createElement('div', { className: 'fr-step', key: 't' }, step.title),
    React.createElement('div', { className: 'fr-body', key: 'b' }, step.body),
  ];
  if (step.tryIt) kids.push(React.createElement('div', { className: 'fr-try', key: 'y' },
    React.createElement('span', null, '可以直接说'),
    React.createElement('code', null, '「' + step.tryIt + '」')));
  var buttons = [React.createElement('div', { className: 'fr-progress', key: 'p' }, __FR_STEPS.map(function (_, i) {
    return React.createElement('span', { key: i, className: 'fr-seg' + (i <= index ? ' on' : '') });
  }))];
  buttons.push(React.createElement('button', { className: 'fr-btn ghost', type: 'button', onClick: close, key: 's' }, '跳过'));
  if (index > 0) buttons.push(React.createElement('button', { className: 'fr-btn', type: 'button', key: 'prev', onClick: function () { setIndex(index - 1); } }, '上一步'));
  buttons.push(React.createElement('button', { className: 'fr-btn primary', type: 'button', key: 'next', onClick: function () { if (last) close(); else setIndex(index + 1); } }, last ? '开始使用' : '下一步'));
  kids.push(React.createElement('div', { className: 'fr-bar', key: 'bar' }, buttons));
  return React.createElement('div', { className: 'fr-card' }, kids);
}
function __withFirstRun(Component) {
  return function FirstRunWrapped(props) {
    return React.createElement(React.Fragment, null, React.createElement(__FirstRunCard, null), React.createElement(Component, props));
  };
}
// ---- end first-run guide ----

  const { useState, useEffect, useRef, useId } = React;
  const h = React.createElement;
  const ROUTE = '_dsh/dsh-rss/subscriptions';
  let language = 'zh';
  const listeners = new Set();
  const words = {
    title: ['RSS 订阅', 'RSS subscriptions'], intro: ['在这里管理订阅，也可以在对话里让 AI 读取和搜索文章。', 'Manage feeds here, then ask AI to read or search articles in a conversation.'],
    recommended: ['推荐订阅源', 'Recommended feeds'], manual: ['输入地址', 'Enter a URL'],
    catalogHint: ['先选感兴趣的分类，再预览或订阅。不会默认添加，也不会自动访问所有网站。', 'Choose a topic, then preview or subscribe. Feeds are not added by default and websites are not contacted automatically.'],
    networkHint: ['可用性取决于你当前的网络，国内外网站可能不同。预览失败可以重试，或改选其他来源。', 'Availability depends on your current network and can differ by website. Retry a failed preview or choose another source.'],
    sourceSearch: ['搜索来源或关键词', 'Search sources or keywords'], sourceLanguage: ['内容语言', 'Content language'], anyLanguage: ['全部语言', 'All languages'], chinese: ['中文', 'Chinese'], english: ['英文', 'English'],
    native: ['网站原生 RSS / Atom', 'Publisher RSS / Atom'], website: ['来源网站', 'Source website'], previewArticles: ['预览并检查', 'Preview and check'], subscribe: ['订阅', 'Subscribe'], subscribed: ['已订阅', 'Subscribed'],
    recentArticles: ['近期文章（最多 5 篇）', 'Recent articles (up to 5)'], noRecentArticles: ['订阅格式有效，但此时没有文章。有些来源只在发布日提供条目。', 'The feed is valid but currently empty. Some sources only include entries on publication days.'], noTitle: ['无标题', 'Untitled'],
    customCategory: ['可选现有分类，也可填写自定义分类。已有分类原样保留。', 'Choose an existing category or type your own. Existing categories are preserved.'],
    rsshubHint: ['其他网站：可在“输入地址”添加原生订阅，或粘贴你选择的 RSSHub 实例生成的地址。', 'For other sites, use “Enter a URL” with a native feed or a URL generated by your chosen RSSHub instance.'],
    add: ['添加订阅', 'Add feed'], import: ['导入 OPML', 'Import OPML'], export: ['导出 OPML', 'Export OPML'], refresh: ['刷新列表', 'Refresh list'],
    search: ['搜索名称或地址', 'Search name or URL'], category: ['分类', 'Category'], all: ['全部分类', 'All categories'], uncategorized: ['未分类', 'Uncategorized'],
    name: ['显示名称', 'Display name'], nameHint: ['留空时使用订阅源的标题', 'Leave blank to use the feed title'], url: ['订阅源地址', 'Feed URL'], categoryHint: ['例如：科技、阅读', 'For example: Tech, Reading'],
    save: ['保存订阅', 'Save feed'], saving: ['正在处理…', 'Working…'], cancel: ['取消', 'Cancel'], close: ['关闭', 'Close'], edit: ['编辑', 'Edit'], remove: ['移除', 'Remove'], check: ['检查可用性', 'Check feed'],
    empty: ['还没有订阅', 'No subscriptions yet'], emptyHint: ['从推荐目录选几个感兴趣的来源，也可以输入 RSS/Atom 地址或导入 OPML。', 'Choose sources from the recommended catalog, enter an RSS/Atom URL, or import OPML.'], noMatch: ['没有匹配项，试试清空筛选。', 'No matches. Try clearing the filters.'], clear: ['清空筛选', 'Clear filters'],
    readonly: ['当前配置为只读。你可以查看、检查和导出订阅。', 'These settings are read-only. You can view, check and export feeds.'],
    pending: ['本次运行尚未检查', 'Not checked during this run'], entries: ['篇文章', 'articles'], checked: ['检查通过', 'Check passed'], failed: ['检查失败', 'Check failed'],
    statusHint: ['检查记录仅保留在本次 DSH 运行中；导入不会自动抓取所有订阅。', 'Check history lasts for this DSH run. Import does not fetch every feed.'],
    deleteTitle: ['移除这个订阅？', 'Remove this feed?'], deleteHint: ['只移除订阅，不会删除原网站的文章。', 'This removes the subscription; the original articles remain on the website.'],
    opml: ['OPML 文本', 'OPML text'], file: ['选择 OPML 文件', 'Choose OPML file'], importHint: ['选择文件或粘贴内容，先预览，再确认导入。最多 1 MiB。', 'Choose a file or paste its content, preview, then confirm. Maximum 1 MiB.'],
    update: ['用导入文件的名称和分类更新重复订阅', 'Update duplicate names and categories from this file'], preserve: ['默认保留现有订阅的名称和分类。', 'Existing names and categories are preserved by default.'],
    preview: ['预览导入', 'Preview import'], confirm: ['确认导入', 'Confirm import'], new: ['新增', 'New'], duplicates: ['重复', 'Duplicates'], invalid: ['跳过无效项', 'Invalid items skipped'], previewEmpty: ['文件中没有可导入的订阅。请确认 outline 包含 xmlUrl。', 'No importable feeds. Check that outlines contain xmlUrl.'],
    keep: ['保留', 'Keep'], change: ['更新为', 'Change to'],
    previewLimit: ['预览最多显示前 20 项，确认会处理全部有效项。', 'Preview shows up to 20 items. Confirmation processes all valid items.'], saved: ['订阅已保存', 'Feed saved'], removed: ['订阅已移除', 'Feed removed'], imported: ['导入完成', 'Import complete'], downloaded: ['已下载 OPML 文件', 'OPML downloaded'],
    loading: ['正在读取订阅…', 'Loading subscriptions…'], retry: ['重新读取', 'Retry'], loadError: ['无法读取订阅。请确认 DSH 仍在运行，然后重试。', 'Cannot load feeds. Check that DSH is running, then retry.'],
    conflict: ['订阅列表已变化，请刷新列表，再保存或重新预览。输入已保留。', 'The list has changed. Refresh it, then save or preview again. Your input is preserved.'], duplicate: ['这个地址已经订阅，请编辑现有订阅。', 'This URL is already subscribed. Edit the existing feed.'],
    bodyLarge: ['文件超过 1 MiB，请拆分后导入。', 'File exceeds 1 MiB. Split it before importing.'], session: ['DSH 会话已失效，请重新打开 DSH 页面。', 'The DSH session has expired. Reopen the DSH page.'], fileError: ['无法读取文件，请重新选择或粘贴 OPML 文本。', 'Cannot read this file. Choose it again or paste OPML text.'],
  };
  const t = key => (words[key] || [key, key])[language === 'en' ? 1 : 0];
  const localized = value => value?.[language === 'en' ? 1 : 0] || '';

  function feedError(message, code) {
    if (language !== 'en' || !/[\u3400-\u9fff]/.test(message || '')) return message;
    if (['conflict', 'duplicate', 'readonly', 'bodyLarge', 'session'].includes(code)) return t(code);
    if (/HTTP/.test(message)) return 'Feed request failed. Check the URL, connection and proxy settings, then retry.';
    if (/YAML|feedsYaml/.test(message)) return 'The feed configuration is invalid. Fix the feedsYaml list in settings before retrying.';
    if (/OPML|outline|xmlUrl/.test(message)) return 'The OPML content is invalid. Export it again with xmlUrl attributes on feed outlines.';
    if (/地址|URL|url|http|https|协议/.test(message)) return 'Enter a valid HTTP or HTTPS feed URL. Local and private-network addresses are not allowed.';
    if (/写入|只读/.test(message)) return 'Could not save the feed configuration. Check write access and reload the list before retrying; your input is preserved.';
    if (/未找到|找不到|没有找到/.test(message)) return 'No matching feed was found. Refresh the subscription list.';
    return 'The feed could not be read. Check the URL, network and proxy settings, then retry.';
  }

  const CSS = `
    .dshr{color:var(--dsw-alias-label-primary,#202737);font-size:14px;line-height:1.55;max-width:920px;min-width:0;overflow-wrap:anywhere}
    .dshr *,.dshr-dialog *{box-sizing:border-box}.dshr h2{font-size:22px;margin:0 0 6px}.dshr p{margin:0 0 12px}
    .dshr-muted{color:var(--dsw-alias-label-tertiary,#657083);font-size:13px}.dshr-toolbar{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
    .dshr button,.dshr-dialog button{font:inherit;min-height:38px;padding:7px 12px;border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:9px;color:inherit;background:var(--dsw-alias-bg-layer-1,#fff);cursor:pointer}
    .dshr button:disabled,.dshr-dialog button:disabled{opacity:.5;cursor:not-allowed}.dshr button:hover:not(:disabled),.dshr-dialog button:hover:not(:disabled){border-color:#5685d4}
    .dshr .primary,.dshr-dialog .primary{background:#366fd2;color:#fff;border-color:#366fd2}.dshr-dialog .danger{background:#b93838;border-color:#b93838;color:#fff}
    .dshr button:focus-visible,.dshr-dialog button:focus-visible,.dshr input:focus-visible,.dshr select:focus-visible,.dshr-dialog input:focus-visible,.dshr-dialog textarea:focus-visible{outline:2px solid #5685d4;outline-offset:2px}
    .dshr-filters{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}.dshr-filters label:first-child{flex:1 1 220px}.dshr label,.dshr-dialog label{display:flex;flex-direction:column;gap:5px;font-size:13px;min-width:0;max-width:100%}
    .dshr input,.dshr select,.dshr-dialog input,.dshr-dialog textarea{font:inherit;font-size:16px;width:100%;min-width:0;min-height:40px;border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:8px;padding:8px 10px;background:var(--dsw-alias-bg-layer-1,#fff);color:inherit}
    .dshr-list{display:grid;gap:10px;margin:0;padding:0;list-style:none}.dshr-card{background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:12px;padding:14px;display:flex;flex-wrap:wrap;gap:12px}
    .dshr-info{flex:1 1 240px;min-width:0}.dshr-info h3{font-size:15px;margin:0 0 4px;overflow-wrap:anywhere}.dshr-url{font-size:12px;overflow-wrap:anywhere;color:var(--dsw-alias-label-tertiary,#657083)}
    .dshr-tag{display:inline-block;border-radius:6px;padding:2px 7px;background:var(--dsw-alias-bg-layer-2,#edf3fc);margin-top:7px;font-size:12px}.dshr-actions{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
    .dshr-status{margin-top:8px;font-size:12px;overflow-wrap:anywhere}.dshr-alert{padding:10px 12px;border-radius:8px;margin:12px 0;overflow-wrap:anywhere;border:1px solid #dba2a2;background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-state-error-primary,#a42a2a)}
    .dshr-notice{padding:9px 12px;border-left:3px solid #366fd2;margin:10px 0;background:var(--dsw-alias-bg-layer-2,#edf3fc);overflow-wrap:anywhere}.dshr-empty{text-align:center;border:1px dashed var(--dsw-alias-border-l2,#c7d2e4);border-radius:12px;padding:32px 16px}
    .dshr-dialog{font:inherit;line-height:1.55;color:var(--dsw-alias-label-primary,#202737);background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:14px;padding:22px;max-width:620px;width:calc(100% - 28px);max-height:calc(100dvh - 28px);overflow:auto;box-shadow:0 18px 70px #0003}
    .dshr-dialog::backdrop{background:#14203366}.dshr-dialog h3{font-size:19px;margin:0 0 12px}.dshr-dialog form{display:grid;gap:14px}.dshr-dialog textarea{min-height:140px;resize:vertical}.dshr-dialog p{margin:0}.dshr-dialog .dshr-buttons{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:14px}
    .dshr-dialog label.dshr-checkbox{display:flex;flex-direction:row;align-items:flex-start;gap:8px}.dshr-checkbox input{width:18px;height:18px;min-height:18px;margin-top:3px;flex-shrink:0}.dshr-preview{border-top:1px solid var(--dsw-alias-border-l2,#d9dee7);padding-top:12px;overflow-wrap:anywhere}.dshr-preview ul{margin:8px 0;padding-left:20px}.dshr-preview li{margin-bottom:5px}
    .dshr-dialog.catalog{max-width:900px}.dshr-dialog select{font:inherit;min-height:40px;padding:8px;border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:inherit;width:100%}
    .dshr-dialog select:focus-visible,.dshr-dialog a:focus-visible{outline:2px solid #5685d4;outline-offset:2px}.dshr-dialog a{color:var(--dsw-alias-accent-primary,#245cb5);overflow-wrap:anywhere}.dshr-dialog .dshr-filters{margin-top:14px}.dshr-dialog .dshr-filters label{flex:1 1 140px}
    .dshr-catalog{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;list-style:none;padding:0;margin:14px 0}.dshr-source{border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:12px;padding:14px;min-width:0;align-self:start}.dshr-source h4{font-size:16px;margin:0 0 6px;overflow-wrap:anywhere}.dshr-source p{margin:8px 0}.dshr-source .dshr-actions{margin-top:12px}.dshr-source.is-selected{border-color:#5685d4}.dshr-source details{margin-top:8px;font-size:12px}.dshr-source summary{cursor:pointer}.dshr-source .dshr-preview{margin-top:12px;font-size:13px}
    @media(max-width:640px){.dshr-catalog{grid-template-columns:1fr}.dshr-dialog .dshr-filters label{flex-basis:100%}}
    @media(max-width:520px){.dshr-dialog{padding:16px}.dshr-actions{width:100%}.dshr-filters label{width:100%}.dshr-toolbar button{flex:1 1 auto}.dshr-card{padding:12px}}
    @media(max-width:640px){
      [role=dialog]:has(.dshr){width:100%!important;max-width:100%!important;flex-direction:column!important}
      [role=dialog]:has(.dshr)>nav+div{min-width:0;width:100%}
      [role=dialog]:has(.dshr)>nav+div>div:has(.dshr){padding:12px!important;min-width:0}
      [role=dialog]:has(.dshr)>nav{width:100%!important;flex-basis:auto!important;border-right:0;max-height:170px;overflow:auto}
      [role=dialog]:has(.dshr)>nav>div:has(>button){display:flex;flex-direction:row!important;flex-wrap:wrap;gap:4px}
    }
  `;
  async function request(action, args, signal) {
    const response = await fetch(new URL(ROUTE, document.baseURI), action ? {
      method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...args }), signal,
    } : { credentials: 'same-origin', signal });
    let value;
    try { value = await response.json(); } catch { throw new Error(response.status === 401 ? t('session') : t('loadError')); }
    if (!response.ok) {
      const error = new Error(['conflict', 'duplicate', 'readonly'].includes(value.code) ? t(value.code) : feedError(value.error, value.code) || t('loadError'));
      error.snapshot = value.snapshot;
      throw error;
    }
    return value;
  }
  function Dialog({ title, busy, onClose, children, wide }) {
    const ref = useRef(null);
    const id = useId();
    useEffect(() => { ref.current.showModal(); return () => ref.current?.close(); }, []);
    return h('dialog', { ref, className: 'dshr-dialog' + (wide ? ' catalog' : ''), 'aria-labelledby': id,
      onKeyDownCapture: event => {
        if (event.nativeEvent.isComposing) return;
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); }
        if (event.key === 'Tab') {
          event.stopPropagation();
          const targets = [...event.currentTarget.querySelectorAll('input:not([disabled]),textarea:not([disabled]),select:not([disabled]),button:not([disabled]),a[href],summary')].filter(node => node.getClientRects().length);
          const first = targets[0], last = targets[targets.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }
      },
      onCancel: event => { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); } },
      h('h3', { id }, title), children);
  }
  function Panel() {
    const [, setLanguage] = useState(language);
    const [state, setState] = useState(null), [loading, setLoading] = useState(true), [busy, setBusy] = useState('');
    const [error, setError] = useState(''), [notice, setNotice] = useState(''), [query, setQuery] = useState(''), [category, setCategory] = useState('*');
    const [modal, setModal] = useState(null), [draft, setDraft] = useState({ url: '', name: '', category: '' });
    const [opml, setOpml] = useState(''), [updateExisting, setUpdateExisting] = useState(false), [preview, setPreview] = useState(null);
    const [catalogQuery, setCatalogQuery] = useState(''), [catalogCategory, setCatalogCategory] = useState('*'), [catalogLanguage, setCatalogLanguage] = useState('*');
    const [sourcePreviews, setSourcePreviews] = useState({}), [selectedSource, setSelectedSource] = useState('');
    const categoryListId = useId();
    const controller = useRef(null), trigger = useRef(null);
    useEffect(() => { listeners.add(setLanguage); return () => listeners.delete(setLanguage); }, []);
    useEffect(() => { void run(null); return () => controller.current?.abort(); }, []);
    async function run(action, args = {}, onSuccess) {
      if (controller.current) return;
      const abort = new AbortController(); controller.current = abort;
      setBusy(action === 'check' && args.id ? args.id : action || 'load'); setError(''); setNotice('');
      try {
        const value = await request(action, args, abort.signal);
        if (value.snapshot) setState(value.snapshot);
        if (onSuccess) onSuccess(value);
        return value;
      } catch (failure) {
        if (!abort.signal.aborted) { if (failure.snapshot) setState(failure.snapshot); setError(failure.message || t('loadError')); }
      } finally { if (!abort.signal.aborted) { setBusy(''); setLoading(false); } controller.current = null; }
    }
    function close() { setModal(null); setError(''); setPreview(null); queueMicrotask(() => trigger.current?.focus()); }
    function open(type, feed, event) {
      trigger.current = event.currentTarget; setError(''); setNotice(''); setPreview(null);
      if (type === 'feed') setDraft(feed ? { url: feed.url, name: feed.name, category: feed.category } : { url: '', name: '', category: '' });
      if (type === 'import') { setOpml(''); setUpdateExisting(false); }
      if (type === 'catalog') { setCatalogQuery(''); setCatalogCategory('*'); setCatalogLanguage('*'); setSelectedSource(''); }
      setModal({ type, feed });
    }
    async function chooseFile(event) {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      if (file.size > 1024 * 1024) { setError(t('bodyLarge')); return; }
      try { setOpml(await file.text()); setPreview(null); setError(''); } catch { setError(t('fileError')); }
    }
    const field = (key, hint) => h('label', { key }, t(key), h('input', {
      name: key, type: key === 'url' ? 'url' : 'text', value: draft[key], placeholder: hint, required: key === 'url', disabled: !!busy,
      list: key === 'category' ? categoryListId : undefined,
      autoFocus: key === 'url', onChange: event => setDraft({ ...draft, [key]: event.target.value }),
    }));
    const buttons = submit => h('div', { className: 'dshr-buttons' },
      h('button', { type: 'button', disabled: !!busy, onClick: close }, t('cancel')), submit);
    const alert = error ? h('div', { role: 'alert', className: 'dshr-alert' }, error) : null;
    const feeds = state?.feeds || [], writable = state?.writable === true;
    const categories = [...new Set(feeds.map(feed => feed.category))].sort();
    const catalog = state?.catalog || { categories: [], sources: [] };
    const sourceCategory = source => localized(catalog.categories.find(category => category.id === source.category)?.name);
    const sourceOptions = catalog.sources.filter(source => (catalogCategory === '*' || source.category === catalogCategory) &&
      (catalogLanguage === '*' || source.language === catalogLanguage) &&
      (source.name + ' ' + source.url + ' ' + (source.description || []).join(' ')).toLowerCase().includes(catalogQuery.trim().toLowerCase()));
    const filtered = feeds.filter(feed => (category === '*' || feed.category === category) && (feed.name + ' ' + feed.url).toLowerCase().includes(query.trim().toLowerCase()));
    return h('section', { className: 'dshr', 'aria-label': t('title') },
      h('h2', null, t('title')), h('p', { className: 'dshr-muted' }, t('intro')),
      state && !writable ? h('p', { className: 'dshr-notice' }, t('readonly')) : null,
      h('div', { className: 'dshr-toolbar' },
        h('button', { className: 'primary', disabled: !state || !!busy, onClick: event => open('catalog', null, event) }, t('recommended')),
        h('button', { disabled: !writable || !!busy, onClick: event => open('feed', null, event) }, t('manual')),
        h('button', { disabled: !writable || !!busy, onClick: event => open('import', null, event) }, t('import')),
        h('button', { disabled: !state || !!busy, onClick: () => run('export', {}, value => {
          const url = URL.createObjectURL(new Blob([value.opml], { type: 'text/x-opml;charset=utf-8' }));
          const a = document.createElement('a'); a.href = url; a.download = 'rss-subscriptions.opml'; a.click();
          setTimeout(() => URL.revokeObjectURL(url), 10000); setNotice(t('downloaded'));
        }) }, t('export')),
        h('button', { disabled: !!busy, onClick: () => run(null) }, t('refresh'))),
      !modal ? alert : null, notice ? h('div', { role: 'status', className: 'dshr-notice' }, notice) : null,
      loading ? h('p', { role: 'status' }, t('loading')) : !state ? h('button', { disabled: !!busy, onClick: () => run(null) }, t('retry')) :
      h(React.Fragment, null,
        feeds.length ? h('div', { className: 'dshr-filters' },
          h('label', null, t('search'), h('input', { type: 'search', value: query, onChange: event => setQuery(event.target.value) })),
          h('label', null, t('category'), h('select', { value: category, onChange: event => setCategory(event.target.value) },
            h('option', { value: '*' }, t('all')), categories.map(value => h('option', { key: value, value }, value || t('uncategorized')))))) : null,
        !feeds.length ? h('div', { className: 'dshr-empty' }, h('strong', null, t('empty')), h('p', { className: 'dshr-muted' }, t('emptyHint'))) :
        !filtered.length ? h('div', { className: 'dshr-empty' }, h('p', null, t('noMatch')), h('button', { onClick: () => { setQuery(''); setCategory('*'); } }, t('clear'))) :
        h('ul', { className: 'dshr-list' }, filtered.map(feed => h('li', { key: feed.id, className: 'dshr-card', 'aria-label': feed.name || feed.url },
          h('div', { className: 'dshr-info' }, h('h3', null, feed.name || feed.url), h('div', { className: 'dshr-url' }, feed.url),
            h('span', { className: 'dshr-tag' }, feed.category || t('uncategorized')),
            h('div', { className: 'dshr-status' }, feed.check ? [
              new Date(feed.check.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN'), ' · ',
              feed.check.ok ? feed.check.entryCount + ' ' + t('entries') + ' · ' + t('checked') : t('failed') + (language === 'en' ? ': ' : '：') + feedError(feed.check.error),
            ] : t('pending'))),
          h('div', { className: 'dshr-actions' },
            h('button', { disabled: !!busy, onClick: () => run('check', { id: feed.id }, value => setNotice(t('checked') + ' · ' + value.check.entryCount + ' ' + t('entries'))) }, busy === feed.id ? t('saving') : t('check')),
            h('button', { disabled: !writable || !!busy, onClick: event => open('feed', feed, event) }, t('edit')),
            h('button', { disabled: !writable || !!busy, onClick: event => open('remove', feed, event) }, t('remove')))))),
        feeds.length ? h('p', { className: 'dshr-muted', style: { marginTop: 12 } }, t('statusHint')) : null),
      modal ? h(Dialog, { title: modal.type === 'catalog' ? t('recommended') : modal.type === 'import' ? t('import') : modal.type === 'remove' ? t('deleteTitle') : modal.feed ? t('edit') : t('add'), wide: modal.type === 'catalog', busy: !!busy, onClose: close },
        alert,
        modal.type === 'catalog' ? h('div', null,
          h('p', { className: 'dshr-muted' }, t('catalogHint')), h('p', { className: 'dshr-muted' }, t('networkHint')),
          notice ? h('p', { role: 'status', className: 'dshr-notice' }, notice) : null,
          h('div', { className: 'dshr-filters' },
            h('label', null, t('sourceSearch'), h('input', { type: 'search', autoFocus: true, value: catalogQuery, disabled: !!busy, onChange: event => setCatalogQuery(event.target.value) })),
            h('label', null, t('category'), h('select', { value: catalogCategory, disabled: !!busy, onChange: event => setCatalogCategory(event.target.value) }, h('option', { value: '*' }, t('all')), catalog.categories.map(category => h('option', { key: category.id, value: category.id }, localized(category.name))))),
            h('label', null, t('sourceLanguage'), h('select', { value: catalogLanguage, disabled: !!busy, onChange: event => setCatalogLanguage(event.target.value) }, h('option', { value: '*' }, t('anyLanguage')), h('option', { value: 'zh' }, t('chinese')), h('option', { value: 'en' }, t('english'))))),
          !sourceOptions.length ? h('p', { role: 'status' }, t('noMatch')) : null,
          h('ul', { className: 'dshr-catalog' }, sourceOptions.map(source => {
            const recent = sourcePreviews[source.id];
            return h('li', { key: source.id, className: 'dshr-source' + (selectedSource === source.id ? ' is-selected' : ''), 'aria-label': source.name },
              h('h4', null, source.name), h('span', { className: 'dshr-tag' }, sourceCategory(source)), ' ', h('span', { className: 'dshr-tag' }, t(source.language === 'zh' ? 'chinese' : 'english')),
              h('p', null, localized(source.description)), h('a', { href: source.website, target: '_blank', rel: 'noopener noreferrer' }, t('website')),
              h('details', null, h('summary', null, t('url')), h('p', { className: 'dshr-url' }, source.url), h('p', { className: 'dshr-muted' }, t('native'))),
              source.check ? h('p', { className: 'dshr-status' }, source.check.ok ? t('checked') + ' · ' + source.check.entryCount + ' ' + t('entries') : t('failed') + ' · ' + feedError(source.check.error)) : null,
              h('div', { className: 'dshr-actions' },
                h('button', { type: 'button', disabled: !!busy, onClick: () => { setSelectedSource(source.id); void run('previewSource', { sourceId: source.id }, value => setSourcePreviews(old => ({ ...old, [source.id]: value.sourcePreview }))); } }, busy === 'previewSource' && selectedSource === source.id ? t('saving') : t('previewArticles')),
                h('button', { type: 'button', className: source.subscribed ? '' : 'primary', disabled: !writable || !!busy || source.subscribed, onClick: () => { setSelectedSource(source.id); void run('add', { url: source.url, name: source.name, category: sourceCategory(source), revision: state.revision }, () => setNotice(t('saved') + ' · ' + source.name)); } }, source.subscribed ? t('subscribed') : t('subscribe'))),
              recent ? h('div', { className: 'dshr-preview', role: 'status' }, h('strong', null, t('recentArticles')), h('p', { className: 'dshr-muted' }, new Date(recent.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN')),
                !recent.entries.length ? h('p', null, t('noRecentArticles')) : h('ul', null, recent.entries.map((entry, index) => h('li', { key: index },
                  entry.link ? h('a', { href: entry.link, target: '_blank', rel: 'noopener noreferrer' }, entry.title || t('noTitle')) : entry.title || t('noTitle'),
                  entry.pubDate ? h('div', { className: 'dshr-muted' }, new Date(entry.pubDate).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')) : null)))) : null);
          })),
          h('p', { className: 'dshr-muted' }, t('rsshubHint')),
          h('div', { className: 'dshr-buttons' }, h('button', { type: 'button', disabled: !!busy, onClick: close }, t('close')))) :
        modal.type === 'feed' ? h('form', { onSubmit: event => { event.preventDefault(); void run(modal.feed ? 'edit' : 'add', { ...draft, id: modal.feed?.id, revision: state.revision }, () => { close(); setNotice(t('saved')); }); } },
          field('url', 'https://example.com/feed.xml'), field('name', t('nameHint')), field('category', t('categoryHint')),
          h('datalist', { id: categoryListId }, [...new Set([...categories, ...catalog.categories.map(category => localized(category.name))])].filter(Boolean).map(value => h('option', { key: value, value }))),
          h('p', { className: 'dshr-muted' }, t('customCategory')),
          error ? h('button', { type: 'button', disabled: !!busy, onClick: () => run(null) }, t('refresh')) : null,
          buttons(h('button', { type: 'submit', className: 'primary', disabled: !!busy }, t(busy ? 'saving' : 'save')))) :
        modal.type === 'remove' ? h('div', null, h('strong', null, modal.feed.name || modal.feed.url), h('p', { className: 'dshr-url' }, modal.feed.url), h('p', null, t('deleteHint')),
          buttons(h('button', { className: 'danger', disabled: !!busy, onClick: () => run('remove', { id: modal.feed.id, revision: state.revision }, () => { close(); setNotice(t('removed')); }) }, t(busy ? 'saving' : 'remove')))) :
        h('form', { onSubmit: event => { event.preventDefault(); void run('preview', { opml, updateExisting }, value => setPreview(value.preview)); } },
          h('p', { className: 'dshr-muted' }, t('importHint')), h('label', null, t('file'), h('input', { type: 'file', accept: '.opml,.xml,text/xml,application/xml,text/x-opml', disabled: !!busy, onChange: chooseFile })),
          h('label', null, t('opml'), h('textarea', { required: true, autoFocus: true, value: opml, disabled: !!busy, onChange: event => { setOpml(event.target.value); setPreview(null); } })),
          h('label', { className: 'dshr-checkbox' }, h('input', { type: 'checkbox', checked: updateExisting, disabled: !!busy, onChange: event => { setUpdateExisting(event.target.checked); setPreview(null); } }), t('update')),
          h('p', { className: 'dshr-muted' }, t('preserve')),
          preview ? h('div', { className: 'dshr-preview', role: 'status' },
            h('strong', null, `${t('new')} ${preview.addedCount} · ${t('duplicates')} ${preview.existedCount} · ${t('invalid')} ${preview.skippedCount}`),
            !preview.addedCount && !preview.existedCount ? h('p', null, t('previewEmpty')) : null,
            h('ul', null, preview.added.slice(0, 20).map(feed => h('li', { key: feed.url }, t('new'), '：', feed.name || feed.url, ' · ', feed.category || t('uncategorized'))),
              (preview.duplicates || []).slice(0, 20).map((item, index) => h('li', { key: 'duplicate-' + index },
                t('duplicates'), '：', item.before.name || item.url, ' · ', item.before.category || t('uncategorized'),
                updateExisting ? ' → ' + (item.after.name || item.url) + ' · ' + (item.after.category || t('uncategorized')) : ' · ' + t('keep'))),
              preview.skipped.slice(0, 20).map((item, index) => h('li', { key: index }, item.title, ' · ', item.url, language === 'en' ? ': ' : '：', feedError(item.reason)))),
            preview.added.length > 20 || preview.skipped.length > 20 || (preview.duplicates || []).length > 20 ? h('p', { className: 'dshr-muted' }, t('previewLimit')) : null) : null,
          h('div', { className: 'dshr-buttons' }, h('button', { type: 'button', disabled: !!busy, onClick: close }, t('cancel')),
            h('button', { type: 'submit', disabled: !!busy || !opml.trim() }, t(busy === 'preview' ? 'saving' : 'preview')),
            preview ? h('button', { type: 'button', className: 'primary', disabled: !!busy || !(preview.addedCount || updateExisting && preview.existedCount), onClick: () => run('import', { opml, updateExisting, revision: preview.revision, token: preview.token }, value => {
              close(); setNotice(`${t('imported')} · ${t('new')} ${value.result.addedCount} · ${t('duplicates')} ${value.result.existedCount} · ${t('invalid')} ${value.result.skippedCount}`);
            }) }, t(busy === 'import' ? 'saving' : 'confirm')) : null))) : null);
  }
  function apply(ctx) {
    ctx.effect(() => {
      const service = ctx.get ? ctx.get('locale') : ctx.locale;
      const update = () => { language = String(service?.getSnapshot?.().active || 'zh').startsWith('en') ? 'en' : 'zh'; for (const notify of listeners) notify(language); };
      update(); return service?.subscribe?.(update) || (() => {});
    }, 'dsh-rss: locale');
    ctx.effect(() => {
      const style = document.createElement('style'); style.dataset.pluginCss = 'dsh-rss/client'; style.textContent = CSS; document.head.appendChild(style);
      return () => style.remove();
    }, 'dsh-rss: styles');
    ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-rss', order: 55, label: () => {
      let lang = language;
      try { const service = ctx.get ? ctx.get('locale') : ctx.locale; if (service?.getSnapshot) lang = String(service.getSnapshot().active || '').startsWith('en') ? 'en' : 'zh'; } catch {}
      return words.title[lang === 'en' ? 1 : 0];
    }, inject: () => ({}) }, __withFirstRun(Panel)));
  }
  return { apply, inject: ['slots', 'locale'] };
} });
