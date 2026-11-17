function rssText(zh, en) {
  return language === 'en' ? en : zh;
}

function RssExternalLink({ href, children, className }) {
  return h(
    'a',
    {
      className: ['rss-ext-link', className].filter(Boolean).join(' '),
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    h('span', null, children),
    h(W.Icon, { name: 'external', size: 13 }),
  );
}

function RssArticlePreview({ value }) {
  return h(
    'section',
    { className: 'rss-section rss-articles' },
    h('h3', null, t('recentArticles')),
    !value
      ? h(
          'p',
          { className: 'rss-muted' },
          rssText(
            '点击“检查并预览”后获取近期条目，不会因打开此页而访问来源。',
            'Choose Check and preview to fetch recent entries. Opening this page does not contact the source.',
          ),
        )
      : h(
          React.Fragment,
          null,
          h('p', { className: 'rss-muted' }, new Date(value.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN')),
          value.entries.length
            ? h(
                'ul',
                { className: 'rss-article-list' },
                value.entries.map((entry, index) =>
                  h(
                    'li',
                    { key: index, className: 'rss-article-item', 'data-dsh-row': '' },
                    entry.link
                      ? h(RssExternalLink, { href: entry.link, className: 'rss-article-link' }, entry.title || t('noTitle'))
                      : h('strong', null, entry.title || t('noTitle')),
                    entry.pubDate && !Number.isNaN(Date.parse(entry.pubDate))
                      ? h(
                          'p',
                          { className: 'rss-muted' },
                          new Date(entry.pubDate).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN'),
                        )
                      : null,
                  ),
                ),
              )
            : h('p', { className: 'rss-muted' }, t('noRecentArticles')),
        ),
  );
}

function RssFeedBrowser({ feeds, filtered, categories, query, setQuery, category, setCategory, writable, busy, run, open }) {
  const [activeId, setActiveId] = useState(null),
    [previews, setPreviews] = useState({});
  const active = filtered.find(feed => feed.id === activeId) || filtered[0];
  if (!feeds.length) {
    return h(
      W.Empty,
      {
        title: t('empty'),
        icon: 'rss',
        action: h(W.Button, { icon: 'plus', variant: 'primary', onClick: event => open('feed', null, event), disabled: !writable || !!busy }, t('add')),
      },
      t('emptyHint'),
    );
  }
  const categoryItems = [
    { id: '*', label: t('all') },
    ...categories.map(value => ({ id: value, label: value || t('uncategorized') })),
  ];
  return h(W.Split, {
    selected: activeId && filtered.some(feed => feed.id === activeId) ? activeId : null,
    onBack: () => setActiveId(null),
    backLabel: rssText('返回订阅列表', 'Back to feeds'),
    listWidth: 380,
    list: h(
      'div',
      { className: 'rss-master-pane' },
      h(
        'div',
        { className: 'dsh-wb-master-toolbar' },
        h(W.Search, {
          label: t('search'),
          clearLabel: t('clear'),
          value: query,
          onChange: event => {
            setQuery(event.target.value);
            setActiveId(null);
          },
        }),
        h(W.IconButton, {
          icon: 'refresh',
          spinning: busy === 'load',
          label: t('refresh'),
          disabled: !!busy,
          onClick: () => run(null),
        }),
      ),
      h(
        'div',
        { className: 'rss-list-filter' },
        h(W.ChoiceMenu, {
          icon: 'filter',
          label: t('category'),
          value: category,
          items: categoryItems,
          onChange: next => {
            setCategory(next);
            setActiveId(null);
          },
        }),
      ),
      filtered.map(feed =>
        h(W.Row, {
          key: feed.id,
          title: feed.name || feed.url,
          active: feed.id === active?.id,
          meta: feed.url,
          description: feed.category || t('uncategorized'),
          status: feed.check ? t(feed.check.ok ? 'checked' : 'failed') : t('pending'),
          statusTone: feed.check ? (feed.check.ok ? 'success' : 'error') : undefined,
          onClick: () => setActiveId(feed.id),
        }),
      ),
      !filtered.length
        ? h(W.Empty, {
            title: t('noMatch'),
            icon: 'rss',
            action: h(
              W.Button,
              {
                icon: 'close',
                onClick: () => {
                  setQuery('');
                  setCategory('*');
                },
              },
              t('clear'),
            ),
          })
        : null,
    ),
    detail: active
      ? h(
          'article',
          { className: 'rss-feed-detail' },
          h('h2', { className: 'rss-detail-title', 'data-dsh-editorial-heading': '' }, active.name || active.url),
          h('p', { className: 'rss-url' }, active.url),
          h(
            'div',
            { className: 'rss-detail-actions' },
            h('span', { className: 'dsh-wb-tag' }, active.category || t('uncategorized')),
            h(
              'div',
              { className: 'dsh-wb-toolbar' },
              h(
                W.Button,
                {
                  variant: 'primary',
                  icon: 'refresh',
                  spinning: busy === 'previewFeed',
                  disabled: !!busy,
                  onClick: () =>
                    run('previewFeed', { id: active.id }, value =>
                      setPreviews(old => ({ ...old, [active.id]: value.feedPreview })),
                    ),
                },
                busy === 'previewFeed' ? t('saving') : rssText('检查并预览', 'Check and preview'),
              ),
              h(
                W.Button,
                { icon: 'edit', disabled: !writable || !!busy, onClick: event => open('feed', active, event) },
                t('edit'),
              ),
              h(
                W.Button,
                { icon: 'trash', variant: 'danger', disabled: !writable || !!busy, onClick: event => open('remove', active, event) },
                t('remove'),
              ),
            ),
          ),
          h(RssArticlePreview, { value: previews[active.id] }),
          h(
            W.Details,
            { summary: rssText('来源检查', 'Source check'), className: 'rss-check-details' },
            active.check
              ? h(
                  React.Fragment,
                  null,
                  h(
                    'p',
                    { className: 'rss-muted' },
                    new Date(active.check.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN'),
                  ),
                  h(
                    W.Status,
                    { tone: active.check.ok ? 'success' : 'error', className: 'rss-inline-status' },
                    active.check.ok
                      ? t('checked') + ' · ' + active.check.entryCount + ' ' + t('entries')
                      : t('failed') + ' · ' + feedError(active.check.error),
                  ),
                )
              : h('p', { className: 'rss-muted' }, t('pending')),
            h('p', { className: 'rss-muted' }, t('statusHint')),
          ),
        )
      : h(W.Empty, { title: t('noMatch'), icon: 'rss' }),
  });
}

function RssCatalog({
  catalog,
  sources,
  query,
  setQuery,
  category,
  setCategory,
  contentLanguage,
  setContentLanguage,
  busy,
  writable,
  state,
  run,
  previews,
  setPreviews,
  setNotice,
}) {
  const [activeId, setActiveId] = useState(null);
  const active = sources.find(source => source.id === activeId) || sources[0];
  const categoryOf = source => localized(catalog.categories.find(item => item.id === source.category)?.name);
  const categoryItems = [
    { id: '*', label: t('all') },
    ...catalog.categories.map(item => ({ id: item.id, label: localized(item.name) })),
  ];
  const languageItems = [
    { id: '*', label: t('anyLanguage') },
    { id: 'zh', label: t('chinese') },
    { id: 'en', label: t('english') },
  ];
  return h(W.Split, {
    selected: activeId && sources.some(source => source.id === activeId) ? activeId : null,
    onBack: () => setActiveId(null),
    backLabel: rssText('返回来源目录', 'Back to source catalog'),
    listWidth: 380,
    list: h(
      'div',
      { className: 'rss-master-pane' },
      h(
        'div',
        { className: 'dsh-wb-master-toolbar' },
        h(W.Search, {
          label: t('sourceSearch'),
          clearLabel: t('clear'),
          value: query,
          onChange: event => {
            setQuery(event.target.value);
            setActiveId(null);
          },
        }),
      ),
      h(
        'div',
        { className: 'rss-list-filter rss-catalog-filters' },
        h(
          'div',
          { className: 'rss-filter-field' },
          h('span', { className: 'rss-filter-label' }, t('category')),
          h(W.ChoiceMenu, {
            icon: 'folder',
            label: t('category'),
            value: category,
            items: categoryItems,
            onChange: next => {
              setCategory(next);
              setActiveId(null);
            },
          }),
        ),
        h(
          'div',
          { className: 'rss-filter-field' },
          h('span', { className: 'rss-filter-label' }, t('sourceLanguage')),
          h(W.ChoiceMenu, {
            icon: 'filter',
            label: t('sourceLanguage'),
            value: contentLanguage,
            items: languageItems,
            onChange: next => {
              setContentLanguage(next);
              setActiveId(null);
            },
          }),
        ),
      ),
      sources.map(source =>
        h(W.Row, {
          key: source.id,
          title: source.name,
          active: source.id === active?.id,
          meta: categoryOf(source) + ' · ' + t(source.language === 'zh' ? 'chinese' : 'english'),
          description: localized(source.description),
          status: source.subscribed ? t('subscribed') : undefined,
          statusTone: source.subscribed ? 'success' : undefined,
          onClick: () => setActiveId(source.id),
        }),
      ),
      !sources.length
        ? h(W.Empty, {
            title: t('noMatch'),
            icon: 'rss',
            action:
              query || category !== '*' || contentLanguage !== '*'
                ? h(
                    W.Button,
                    {
                      icon: 'close',
                      onClick: () => {
                        setQuery('');
                        setCategory('*');
                        setContentLanguage('*');
                      },
                    },
                    t('clear'),
                  )
                : null,
          })
        : null,
    ),
    detail: active
      ? h(
          'article',
          { className: 'rss-feed-detail' },
          h('h2', { className: 'rss-detail-title', 'data-dsh-editorial-heading': '' }, active.name),
          h(
            'p',
            { className: 'rss-muted' },
            categoryOf(active) + ' · ' + t(active.language === 'zh' ? 'chinese' : 'english'),
          ),
          h(
            'section',
            { className: 'rss-section' },
            h('p', null, localized(active.description)),
            h('p', { className: 'rss-url' }, active.url),
            h(RssExternalLink, { href: active.website }, t('website')),
            h(
              'div',
              { className: 'dsh-wb-toolbar rss-catalog-actions' },
              h(
                W.Button,
                {
                  icon: 'refresh',
                  spinning: busy === 'previewSource',
                  disabled: !!busy,
                  onClick: () =>
                    run('previewSource', { sourceId: active.id }, value =>
                      setPreviews(old => ({ ...old, [active.id]: value.sourcePreview })),
                    ),
                },
                busy === 'previewSource' ? t('saving') : t('previewArticles'),
              ),
              h(
                W.Button,
                {
                  variant: 'primary',
                  icon: active.subscribed ? 'check' : 'plus',
                  'data-active': active.subscribed ? 'true' : undefined,
                  disabled: !writable || !!busy || active.subscribed,
                  onClick: () =>
                    run(
                      'add',
                      { url: active.url, name: active.name, category: categoryOf(active), revision: state.revision },
                      () => setNotice(t('saved') + ' · ' + active.name),
                    ),
                },
                active.subscribed ? t('subscribed') : t('subscribe'),
              ),
            ),
          ),
          h(RssArticlePreview, { value: previews[active.id] }),
          h(
            'section',
            { className: 'rss-section' },
            h('p', { className: 'rss-muted' }, t('catalogHint')),
            h('p', { className: 'rss-muted' }, t('networkHint')),
            h('p', { className: 'rss-muted' }, t('rsshubHint')),
          ),
        )
      : h(W.Empty, { title: t('noMatch'), icon: 'rss' }),
  });
}

const RSS_WORKBENCH_CSS = `
.rss-workbench {
  min-width: 0;
}

.rss-workbench .rss-list-filter {
  padding: 10px 14px;
  display: grid;
  gap: 10px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.rss-workbench .rss-catalog-filters {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.rss-workbench .rss-filter-field {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.rss-workbench .rss-filter-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--w-muted);
}

.rss-workbench .rss-feed-detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rss-workbench .rss-detail-title {
  margin: 0;
  font-size: 18px;
  line-height: 25px;
  font-weight: 650;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-url,
.rss-dialog-url {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12px;
  color: var(--w-muted);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-muted,
.rss-dialog-muted {
  margin: 4px 0;
  color: var(--w-muted);
  font-size: 12.5px;
  line-height: 19px;
}

.rss-workbench .rss-detail-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding-block: 4px;
}

.rss-workbench .rss-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 14px;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.rss-workbench .rss-section > h3 {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--w-ink);
}

.rss-workbench .rss-section > p {
  margin: 0;
}

.rss-workbench .rss-ext-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--w-link);
  font-size: 13px;
  font-weight: 550;
  text-decoration: none;
  align-self: flex-start;
  overflow-wrap: anywhere;
}

.rss-workbench .rss-ext-link:hover {
  text-decoration: underline;
}

.rss-workbench .rss-article-list {
  padding: 0;
  list-style: none;
  margin: 6px 0 0;
  display: grid;
  gap: 6px;
}

.rss-workbench .rss-article-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
}

.rss-workbench .rss-article-item p {
  margin: 0;
}

.rss-workbench .rss-catalog-actions {
  margin-block-start: 6px;
}

.rss-workbench .rss-inline-status {
  margin: 4px 0;
}

.rss-workbench .rss-transfer {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: min(760px, 100%);
  padding: 20px 18px 28px;
}

.rss-workbench .rss-transfer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.rss-workbench .rss-transfer-head h3 {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 650;
}

.rss-workbench .rss-transfer-card {
  display: grid;
  gap: 14px;
  padding: 16px 18px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  background: var(--w-bg-1);
}

.rss-workbench .rss-transfer-field,
.rss-dialog-field {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.rss-workbench .rss-transfer-field > span,
.rss-dialog-field > span {
  font-size: 13px;
  font-weight: 550;
  color: var(--w-ink);
}

.rss-workbench .rss-file-input {
  font: inherit;
  font-size: 12.5px;
  color: var(--w-muted);
}

.rss-workbench .rss-file-input::file-selector-button {
  margin-inline-end: 10px;
  padding: 5px 11px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-base);
  color: var(--w-ink);
  font: inherit;
  font-size: 12.5px;
  font-weight: 550;
  cursor: pointer;
}

.rss-workbench .rss-preview-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-sm);
  background: var(--w-bg-base);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-preview-box ul {
  margin: 4px 0;
  padding-inline-start: 18px;
}

.rss-workbench .rss-preview-box li {
  margin-block-end: 4px;
}

.rss-dialog-form {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.rss-dialog-confirm {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rss-dialog-confirm p {
  margin: 0;
}

.rss-dialog-status {
  margin: 0 0 12px;
}

[role="dialog"]:has(.rss-workbench) {
  width: min(1160px, calc(100dvw - 48px)) !important;
  max-width: 1160px !important;
}

@container dsh-workbench (max-width: 760px) {
  .rss-workbench .rss-catalog-filters {
    grid-template-columns: 1fr;
  }
  .rss-workbench .rss-detail-actions > .dsh-wb-toolbar {
    width: 100%;
  }
}
`;
