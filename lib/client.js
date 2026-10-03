// This is the browser source. tsc does not rebuild it; check with node --check.
window.__ModuleLoader__.load({ id: 'dsh-rss', factory: require => {
  const React = require('react');
  const { useState, useEffect, useRef, useId } = React;
  const h = React.createElement;
  const ROUTE = '_dsh/dsh-rss/subscriptions';
  let language = 'zh';
  const listeners = new Set();
  const words = {
    title: ['RSS 订阅', 'RSS subscriptions'], intro: ['在这里管理订阅，也可以在对话里让 AI 读取和搜索文章。', 'Manage feeds here, then ask AI to read or search articles in a conversation.'],
    add: ['添加订阅', 'Add feed'], import: ['导入 OPML', 'Import OPML'], export: ['导出 OPML', 'Export OPML'], refresh: ['刷新列表', 'Refresh list'],
    search: ['搜索名称或地址', 'Search name or URL'], category: ['分类', 'Category'], all: ['全部分类', 'All categories'], uncategorized: ['未分类', 'Uncategorized'],
    name: ['显示名称', 'Display name'], nameHint: ['留空时使用订阅源的标题', 'Leave blank to use the feed title'], url: ['订阅源地址', 'Feed URL'], categoryHint: ['例如：科技、阅读', 'For example: Tech, Reading'],
    save: ['保存订阅', 'Save feed'], saving: ['正在处理…', 'Working…'], cancel: ['取消', 'Cancel'], close: ['关闭', 'Close'], edit: ['编辑', 'Edit'], remove: ['移除', 'Remove'], check: ['检查可用性', 'Check feed'],
    empty: ['还没有订阅', 'No subscriptions yet'], emptyHint: ['添加 RSS/Atom 地址，或从阅读器导入 OPML 文件。', 'Add an RSS/Atom URL or import an OPML file from your reader.'], noMatch: ['没有匹配的订阅，试试清空筛选。', 'No matches. Try clearing the filters.'], clear: ['清空筛选', 'Clear filters'],
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
    .dshr{color:var(--dsw-alias-label-primary,#202737);font-size:14px;line-height:1.55;max-width:920px;min-width:0}
    .dshr *,.dshr-dialog *{box-sizing:border-box}.dshr h2{font-size:22px;margin:0 0 6px}.dshr p{margin:0 0 12px}
    .dshr-muted{color:var(--dsw-alias-label-tertiary,#657083);font-size:13px}.dshr-toolbar{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
    .dshr button,.dshr-dialog button{font:inherit;min-height:38px;padding:7px 12px;border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:9px;color:inherit;background:var(--dsw-alias-bg-layer-1,#fff);cursor:pointer}
    .dshr button:disabled,.dshr-dialog button:disabled{opacity:.5;cursor:not-allowed}.dshr button:hover:not(:disabled),.dshr-dialog button:hover:not(:disabled){border-color:#5685d4}
    .dshr .primary,.dshr-dialog .primary{background:#366fd2;color:#fff;border-color:#366fd2}.dshr-dialog .danger{background:#b93838;border-color:#b93838;color:#fff}
    .dshr button:focus-visible,.dshr-dialog button:focus-visible,.dshr input:focus-visible,.dshr select:focus-visible,.dshr-dialog input:focus-visible,.dshr-dialog textarea:focus-visible{outline:2px solid #5685d4;outline-offset:2px}
    .dshr-filters{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}.dshr-filters label:first-child{flex:1 1 220px}.dshr label,.dshr-dialog label{display:flex;flex-direction:column;gap:5px;font-size:13px}
    .dshr input,.dshr select,.dshr-dialog input,.dshr-dialog textarea{font:inherit;font-size:16px;width:100%;min-width:0;min-height:40px;border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:8px;padding:8px 10px;background:var(--dsw-alias-bg-layer-1,#fff);color:inherit}
    .dshr-list{display:grid;gap:10px;margin:0;padding:0;list-style:none}.dshr-card{background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:12px;padding:14px;display:flex;flex-wrap:wrap;gap:12px}
    .dshr-info{flex:1 1 240px;min-width:0}.dshr-info h3{font-size:15px;margin:0 0 4px;overflow-wrap:anywhere}.dshr-url{font-size:12px;overflow-wrap:anywhere;color:var(--dsw-alias-label-tertiary,#657083)}
    .dshr-tag{display:inline-block;border-radius:6px;padding:2px 7px;background:var(--dsw-alias-bg-layer-2,#edf3fc);margin-top:7px;font-size:12px}.dshr-actions{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
    .dshr-status{margin-top:8px;font-size:12px;overflow-wrap:anywhere}.dshr-alert{padding:10px 12px;border-radius:8px;margin:12px 0;overflow-wrap:anywhere;border:1px solid #dba2a2;background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-state-error-primary,#a42a2a)}
    .dshr-notice{padding:9px 12px;border-left:3px solid #366fd2;margin:10px 0;background:var(--dsw-alias-bg-layer-2,#edf3fc);overflow-wrap:anywhere}.dshr-empty{text-align:center;border:1px dashed var(--dsw-alias-border-l2,#c7d2e4);border-radius:12px;padding:32px 16px}
    .dshr-dialog{font:inherit;line-height:1.55;color:var(--dsw-alias-label-primary,#202737);background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dsw-alias-border-l2,#d9dee7);border-radius:14px;padding:22px;max-width:620px;width:calc(100% - 28px);max-height:calc(100dvh - 28px);overflow:auto;box-shadow:0 18px 70px #0003}
    .dshr-dialog::backdrop{background:#14203366}.dshr-dialog h3{font-size:19px;margin:0 0 12px}.dshr-dialog form{display:grid;gap:14px}.dshr-dialog textarea{min-height:140px;resize:vertical}.dshr-dialog p{margin:0}.dshr-dialog .dshr-buttons{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:14px}
    .dshr-dialog label.dshr-checkbox{display:flex;flex-direction:row;align-items:flex-start;gap:8px}.dshr-checkbox input{width:18px;height:18px;min-height:18px;margin-top:3px;flex-shrink:0}.dshr-preview{border-top:1px solid var(--dsw-alias-border-l2,#d9dee7);padding-top:12px;overflow-wrap:anywhere}.dshr-preview ul{margin:8px 0;padding-left:20px}.dshr-preview li{margin-bottom:5px}
    @media(max-width:520px){.dshr-dialog{padding:16px}.dshr-actions{width:100%}.dshr-filters label{width:100%}.dshr-toolbar button{flex:1 1 auto}.dshr-card{padding:12px}}
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
  function Dialog({ title, busy, onClose, children }) {
    const ref = useRef(null);
    const id = useId();
    useEffect(() => { ref.current.showModal(); return () => ref.current?.close(); }, []);
    return h('dialog', { ref, className: 'dshr-dialog', 'aria-labelledby': id,
      onKeyDownCapture: event => {
        if (event.nativeEvent.isComposing) return;
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); }
        if (event.key === 'Tab') {
          event.stopPropagation();
          const targets = [...event.currentTarget.querySelectorAll('input:not([disabled]),textarea:not([disabled]),select:not([disabled]),button:not([disabled])')];
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
      autoFocus: key === 'url', onChange: event => setDraft({ ...draft, [key]: event.target.value }),
    }));
    const buttons = submit => h('div', { className: 'dshr-buttons' },
      h('button', { type: 'button', disabled: !!busy, onClick: close }, t('cancel')), submit);
    const alert = error ? h('div', { role: 'alert', className: 'dshr-alert' }, error) : null;
    const feeds = state?.feeds || [], writable = state?.writable === true;
    const categories = [...new Set(feeds.map(feed => feed.category))].sort();
    const filtered = feeds.filter(feed => (category === '*' || feed.category === category) && (feed.name + ' ' + feed.url).toLowerCase().includes(query.trim().toLowerCase()));
    return h('section', { className: 'dshr', 'aria-label': t('title') },
      h('h2', null, t('title')), h('p', { className: 'dshr-muted' }, t('intro')),
      state && !writable ? h('p', { className: 'dshr-notice' }, t('readonly')) : null,
      h('div', { className: 'dshr-toolbar' },
        h('button', { className: 'primary', disabled: !writable || !!busy, onClick: event => open('feed', null, event) }, t('add')),
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
      modal ? h(Dialog, { title: modal.type === 'import' ? t('import') : modal.type === 'remove' ? t('deleteTitle') : modal.feed ? t('edit') : t('add'), busy: !!busy, onClose: close },
        alert,
        modal.type === 'feed' ? h('form', { onSubmit: event => { event.preventDefault(); void run(modal.feed ? 'edit' : 'add', { ...draft, id: modal.feed?.id, revision: state.revision }, () => { close(); setNotice(t('saved')); }); } },
          field('url', 'https://example.com/feed.xml'), field('name', t('nameHint')), field('category', t('categoryHint')),
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
    }, inject: () => ({}) }, Panel));
  }
  return { apply, inject: ['slots', 'locale'] };
} });
