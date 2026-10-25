function rssText(zh, en) { return language === 'en' ? en : zh; }

function RssArticlePreview({ value }) {
  return h('section', { className: 'w-section rss-articles' },
    h('h3', null, t('recentArticles')),
    !value ? h('p', { className: 'w-muted' }, rssText('点击“检查并预览”后获取近期条目，不会因打开此页而访问来源。', 'Choose Check and preview to fetch recent entries. Opening this page does not contact the source.')) :
      h(React.Fragment, null,
        h('p', { className: 'w-muted' }, new Date(value.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN')),
        value.entries.length ? h('ul', { className: 'rss-article-list' }, value.entries.map((entry, index) => h('li', { key: index },
          entry.link ? h('a', { href: entry.link, target: '_blank', rel: 'noopener noreferrer' }, entry.title || t('noTitle')) : h('strong', null, entry.title || t('noTitle')),
          entry.pubDate && !Number.isNaN(Date.parse(entry.pubDate)) ? h('p', { className: 'w-muted' }, new Date(entry.pubDate).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')) : null))) : h('p', { className: 'w-muted' }, t('noRecentArticles'))));
}

function RssFeedBrowser({ feeds, filtered, categories, query, setQuery, category, setCategory, writable, busy, run, open }) {
  const [activeId, setActiveId] = useState(null), [previews, setPreviews] = useState({});
  const active = filtered.find(feed => feed.id === activeId) || filtered[0];
  if (!feeds.length) return h(W.Empty, { title: t('empty'), icon: 'rss', action: h(W.Button, { onClick: event => open('feed', null, event), disabled: !writable || !!busy }, t('add')) }, t('emptyHint'));
  return h(W.Split, { selected: activeId && filtered.some(feed => feed.id === activeId) ? activeId : null, onBack: () => setActiveId(null), backLabel: rssText('返回订阅列表', 'Back to feeds'), listWidth: 380,
    list: h('div', null,
      h('div', { className: 'w-master-toolbar' }, h(W.Search, { label: t('search'), value: query, onChange: event => { setQuery(event.target.value); setActiveId(null); } }), h(W.IconButton, { icon: 'refresh', label: t('refresh'), disabled: !!busy, onClick: () => run(null) })),
      h('div', { className: 'rss-list-filter' }, h('select', { 'aria-label': t('category'), value: category, onChange: event => { setCategory(event.target.value); setActiveId(null); } }, h('option', { value: '*' }, t('all')), categories.map(value => h('option', { key: value, value }, value || t('uncategorized'))))),
      filtered.map(feed => h(W.Row, { key: feed.id, title: feed.name || feed.url, active: feed.id === active?.id, meta: feed.url, description: feed.category || t('uncategorized'), status: feed.check ? t(feed.check.ok ? 'checked' : 'failed') : t('pending'), onClick: () => setActiveId(feed.id) })),
      !filtered.length ? h(W.Empty, { title: t('noMatch'), action: h(W.Button, { onClick: () => { setQuery(''); setCategory('*'); } }, t('clear')) }) : null),
    detail: active ? h('article', { className: 'rss-feed-detail' },
      h('h2', { className: 'w-detail-title' }, active.name || active.url), h('p', { className: 'w-detail-meta rss-url' }, active.url),
      h('div', { className: 'rss-detail-actions' }, h('span', { className: 'w-tag' }, active.category || t('uncategorized')), h('div', { className: 'w-toolbar' },
        h(W.Button, { variant: 'primary', disabled: !!busy, onClick: () => run('previewFeed', { id: active.id }, value => setPreviews(old => ({ ...old, [active.id]: value.feedPreview }))) }, busy === 'previewFeed' ? t('saving') : rssText('检查并预览', 'Check and preview')),
        h(W.Button, { icon: 'edit', variant: 'ghost', disabled: !writable || !!busy, onClick: event => open('feed', active, event) }, t('edit')),
        h('details', { className: 'rss-more' }, h('summary', { 'aria-label': rssText('更多订阅操作', 'More feed actions') }, h(W.Icon, { name: 'more', size: 20 })), h(W.Button, { variant: 'danger', disabled: !writable || !!busy, onClick: event => open('remove', active, event) }, t('remove'))))),
      h(RssArticlePreview, { value: previews[active.id] }),
      h('details', { className: 'w-section' }, h('summary', null, rssText('来源检查', 'Source check')),
        active.check ? h(React.Fragment, null, h('p', { className: 'w-muted' }, new Date(active.check.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN')),
          h(W.Status, { tone: active.check.ok ? 'success' : 'error' }, active.check.ok ? t('checked') + ' · ' + active.check.entryCount + ' ' + t('entries') : t('failed') + ' · ' + feedError(active.check.error))) : h('p', { className: 'w-muted' }, t('pending')),
        h('p', { className: 'w-muted' }, t('statusHint')))) : h(W.Empty, { title: t('noMatch'), icon: 'rss' }) });
}

function RssCatalog({ catalog, sources, query, setQuery, category, setCategory, contentLanguage, setContentLanguage, busy, writable, state, run, previews, setPreviews, setNotice }) {
  const [activeId, setActiveId] = useState(null);
  const active = sources.find(source => source.id === activeId) || sources[0];
  const categoryOf = source => localized(catalog.categories.find(category => category.id === source.category)?.name);
  return h(W.Split, { selected: activeId && sources.some(source => source.id === activeId) ? activeId : null, onBack: () => setActiveId(null), backLabel: rssText('返回来源目录', 'Back to source catalog'), listWidth: 380,
    list: h('div', null,
      h('div', { className: 'w-master-toolbar' }, h(W.Search, { label: t('sourceSearch'), value: query, onChange: event => { setQuery(event.target.value); setActiveId(null); } })),
      h('div', { className: 'rss-list-filter rss-catalog-filters' },
        h('label', { className: 'w-field' }, t('category'), h('select', { value: category, onChange: event => { setCategory(event.target.value); setActiveId(null); } }, h('option', { value: '*' }, t('all')), catalog.categories.map(category => h('option', { key: category.id, value: category.id }, localized(category.name))))),
        h('label', { className: 'w-field' }, t('sourceLanguage'), h('select', { value: contentLanguage, onChange: event => { setContentLanguage(event.target.value); setActiveId(null); } }, h('option', { value: '*' }, t('anyLanguage')), h('option', { value: 'zh' }, t('chinese')), h('option', { value: 'en' }, t('english'))))),
      sources.map(source => h(W.Row, { key: source.id, title: source.name, active: source.id === active?.id, meta: categoryOf(source) + ' · ' + t(source.language === 'zh' ? 'chinese' : 'english'), description: localized(source.description), status: source.subscribed ? t('subscribed') : undefined, onClick: () => setActiveId(source.id) })),
      !sources.length ? h(W.Empty, { title: t('noMatch') }) : null),
    detail: active ? h('article', null,
      h('h2', { className: 'w-detail-title' }, active.name), h('p', { className: 'w-detail-meta' }, categoryOf(active) + ' · ' + t(active.language === 'zh' ? 'chinese' : 'english')),
      h('section', { className: 'w-section' }, h('p', null, localized(active.description)), h('p', { className: 'w-muted rss-url' }, active.url), h('a', { href: active.website, target: '_blank', rel: 'noopener noreferrer' }, t('website')),
        h('div', { className: 'w-toolbar rss-catalog-actions' }, h(W.Button, { disabled: !!busy, onClick: () => run('previewSource', { sourceId: active.id }, value => setPreviews(old => ({ ...old, [active.id]: value.sourcePreview }))) }, busy === 'previewSource' ? t('saving') : t('previewArticles')),
          h(W.Button, { variant: 'primary', disabled: !writable || !!busy || active.subscribed, onClick: () => run('add', { url: active.url, name: active.name, category: categoryOf(active), revision: state.revision }, () => setNotice(t('saved') + ' · ' + active.name)) }, active.subscribed ? t('subscribed') : t('subscribe')))),
      h(RssArticlePreview, { value: previews[active.id] }), h('section', { className: 'w-section' }, h('p', { className: 'w-muted' }, t('catalogHint')), h('p', { className: 'w-muted' }, t('networkHint')), h('p', { className: 'w-muted' }, t('rsshubHint')))) : h(W.Empty, { title: t('noMatch'), icon: 'rss' }) });
}

const RSS_WORKBENCH_CSS = `
.rss-workbench .rss-list-filter{padding:0 16px 16px;display:grid;gap:12px}.rss-workbench .rss-list-filter select{width:100%}.rss-workbench .rss-catalog-filters{grid-template-columns:1fr 1fr}.rss-workbench .rss-url{overflow-wrap:anywhere}.rss-workbench .rss-detail-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px}.rss-workbench .rss-more{position:relative;align-self:center}.rss-workbench .rss-more>summary{list-style:none;padding:8px;min-width:36px;min-height:36px;border-radius:6px}.rss-workbench .rss-more>summary:after{display:none}.rss-workbench .rss-more[open]>.w-button{position:absolute;inset-inline-end:0;top:100%;z-index:4;min-width:100px;box-shadow:0 6px 24px #0002}.rss-workbench .rss-articles>p{margin-top:12px}.rss-workbench .rss-article-list{padding:0;list-style:none;margin:12px 0 0}.rss-workbench .rss-article-list li{padding:18px 0;border-bottom:1px solid var(--w-border)}.rss-workbench .rss-article-list li:last-child{border:0}.rss-workbench .rss-article-list a{font-size:14px;font-weight:550;text-decoration:none}.rss-workbench .rss-article-list a:hover{text-decoration:underline}.rss-workbench .rss-article-list p{margin-top:6px}.rss-workbench .rss-catalog-actions{margin-top:20px}.rss-workbench .rss-transfer{width:min(740px,100%);padding:24px 0}.rss-workbench .rss-transfer form{display:grid;gap:16px}.rss-workbench .rss-transfer label{display:grid;gap:6px}.rss-workbench .rss-transfer textarea{min-height:150px}.rss-workbench .rss-transfer .dshr-checkbox{display:flex;align-items:flex-start;gap:8px}.rss-workbench .rss-transfer .dshr-checkbox input{margin-top:3px}.rss-workbench .rss-transfer .dshr-buttons{display:flex;gap:8px;flex-wrap:wrap}.rss-workbench .rss-transfer button,.rss-workbench .dshr-dialog button{min-height:36px;padding:8px 12px;border:1px solid var(--w-border);border-radius:8px;background:var(--w-bg);font-size:14px;cursor:pointer}.rss-workbench .rss-transfer button.primary,.rss-workbench .dshr-dialog button.primary{background:var(--w-primary);color:var(--w-on-primary);border-color:var(--w-primary)}.rss-workbench .dshr-dialog{background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);box-shadow:0 18px 70px #0003;border-radius:12px;max-height:calc(100dvh - 32px);width:min(620px,calc(100vw - 32px));padding:24px}.rss-workbench .dshr-dialog label{display:grid;gap:6px;margin:16px 0}.rss-workbench .dshr-dialog input:not([type=checkbox]),.rss-workbench .dshr-dialog textarea{width:100%}.rss-workbench .dshr-dialog form{min-width:0}.rss-workbench .dshr-dialog .dshr-url{overflow-wrap:anywhere}.rss-workbench .dshr-preview{border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);padding:16px}.rss-workbench .dshr-dialog .dshr-buttons{margin-top:20px}.rss-workbench .dshr-dialog h3{font-size:20px}.rss-workbench.dshr{max-width:none;margin:0;font-size:14px}.rss-workbench .dshr-alert,.rss-workbench .dshr-notice{background:var(--w-soft);border:1px solid var(--w-border);color:inherit}.rss-workbench .dshr-muted{color:var(--w-muted)}
@container dsh-workbench (max-width:760px){.rss-workbench .rss-list-filter{padding-inline:0}.rss-workbench .rss-catalog-filters{grid-template-columns:1fr 1fr}.rss-workbench .rss-detail-actions>.w-toolbar{width:100%}}
`;
