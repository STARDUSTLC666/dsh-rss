function rssText(zh, en) {
  return language === 'en' ? en : zh;
}

function RssExternalLink({ href, children, className, ...props }) {
  return h(
    'a',
    {
      ...props,
      className: ['rss-ext-link', className].filter(Boolean).join(' '),
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    h('span', null, children),
    h(W.Icon, { name: 'external', size: 13 }),
  );
}

function RssArticlePreview({ value, loading = false }) {
  return h(
    'section',
    { className: 'rss-section rss-articles' },
    h('h3', null, t('recentArticles')),
    loading
      ? h(
          'div',
          { className: 'rss-preview-skeleton' },
          [0, 1, 2].map(i => h(W.Skeleton, { key: i, variant: 'card', label: i === 0 ? rssText('正在获取近期文章…', 'Fetching recent entries…') : undefined })),
        )
      : !value
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
                    { key: index, className: 'rss-article-item', 'data-dsh-row': '', 'data-dsh-card': '' },
                    entry.link
                      ? h(RssExternalLink, { href: entry.link, className: 'rss-article-link', 'data-dsh-serif': '' }, entry.title || t('noTitle'))
                      : h('strong', { 'data-dsh-serif': '' }, entry.title || t('noTitle')),
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

function RssPromptButton({ prompt, label, variant = 'outline', setNotice, className }) {
  return h(W.CopyPrompt, {
    prompt,
    label,
    variant,
    className,
    copiedLabel: rssText('已复制', 'Copied'),
    statusText: rssText('已复制指令，粘贴到对话发送即可', 'Prompt copied — paste into chat'),
    failedText: rssText('复制失败', 'Copy failed'),
    onCopied: () => setNotice?.(rssText('已复制 AI 简报指令，回到对话粘贴发送即可。', 'AI briefing prompt copied — paste it into chat.')),
  });
}

function RssFeedBrowser({
  feeds,
  filtered,
  categories,
  query,
  setQuery,
  category,
  setCategory,
  writable,
  busy,
  run,
  open,
  setNotice,
  onOpenCatalog,
  onOpenTransfer,
}) {
  const [activeId, setActiveId] = useState(null),
    [previews, setPreviews] = useState({});
  const active = filtered.find(feed => feed.id === activeId) || filtered[0];
  if (!feeds.length) {
    return h(
      W.Empty,
      {
        title: t('empty'),
        icon: 'rss',
        action: h(
          'div',
          { className: 'dsh-wb-actions rss-empty-actions' },
          onOpenCatalog
            ? h(
                W.Button,
                { icon: 'rss', variant: 'primary', disabled: !!busy, onClick: onOpenCatalog },
                t('recommended'),
              )
            : null,
          h(
            W.Button,
            { icon: 'plus', variant: onOpenCatalog ? 'outline' : 'primary', onClick: event => open('feed', null, event), disabled: !writable || !!busy },
            t('add'),
          ),
          onOpenTransfer
            ? h(
                W.Button,
                { icon: 'upload', disabled: !writable || !!busy, onClick: onOpenTransfer },
                t('import'),
              )
            : null,
        ),
      },
      t('emptyHint'),
    );
  }
  const dailyBriefingPrompt = rssText(
    '抓取我订阅源的最新文章，按分类生成今日重点简报',
    'Fetch the latest articles from my subscribed feeds and generate today’s key briefing by category',
  );
  const categoryItems = [
    { id: '*', label: t('all') },
    ...categories.map(value => ({ id: value, label: value || t('uncategorized') })),
  ];
  return h(W.Split, {
    selected: activeId && filtered.some(feed => feed.id === activeId) ? activeId : null,
    onBack: () => setActiveId(null),
    backLabel: rssText('返回订阅列表', 'Back to feeds'),
    listWidth: 380,
    splitKey: 'dsh-rss:feeds-split-width',
    minWidth: 260,
    maxWidth: 560,
    resizerLabel: rssText('调整订阅列表宽度', 'Resize feeds list'),
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
        { className: 'rss-list-filter', 'data-tour': 'rss-category-filter' },
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
        h(
          'div',
          { className: 'rss-briefing-bar' },
          h(RssPromptButton, {
            variant: 'primary',
            setNotice,
            prompt: dailyBriefingPrompt,
            label: rssText('复制今日简报指令', 'Copy daily briefing prompt'),
          }),
          category !== '*'
            ? h(RssPromptButton, {
                setNotice,
                prompt: rssText(
                  '抓取「' + (category || t('uncategorized')) + '」分类订阅源的最新文章并整理重点摘要',
                  'Fetch the latest articles in the “' + (category || t('uncategorized')) + '” category and summarize key highlights',
                ),
                label: rssText('复制本分类简报', 'Copy category briefing'),
              })
            : null,
        ),
      ),
      busy === 'load'
        ? h(
            'div',
            { className: 'rss-refresh-skeleton' },
            h(W.Skeleton, { variant: 'row', label: t('refresh') }),
          )
        : null,
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
          actions: h(
            React.Fragment,
            null,
            h(W.IconButton, {
              icon: 'refresh',
              spinning: busy === 'previewFeed' && active?.id === feed.id,
              disabled: !!busy,
              label: rssText('检查并预览', 'Check and preview'),
              'data-rss-quick-action': 'preview',
              onClick: () => {
                setActiveId(feed.id);
                run('previewFeed', { id: feed.id }, value =>
                  setPreviews(old => ({ ...old, [feed.id]: value.feedPreview })),
                );
              },
            }),
            h(W.IconButton, {
              icon: 'edit',
              disabled: !writable || !!busy,
              label: t('edit'),
              'data-rss-quick-action': 'edit',
              onClick: event => open('feed', feed, event),
            }),
            h(W.IconButton, {
              icon: 'trash',
              variant: 'danger',
              disabled: !writable || !!busy,
              label: t('remove'),
              'data-rss-quick-action': 'remove',
              onClick: event => open('remove', feed, event),
            }),
          ),
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
          h('h2', { className: 'rss-detail-title', 'data-dsh-editorial-heading': '', 'data-dsh-serif': '' }, active.name || active.url),
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
          h(
            'section',
            { className: 'rss-briefing-card', 'data-dsh-card': '' },
            h(
              'div',
              { className: 'rss-briefing-head' },
              h('strong', null, rssText('AI 对话简报指令', 'AI chat briefing prompts')),
              h('span', { className: 'rss-muted' }, rssText('一键复制后粘贴到聊天即可让助手抓取并提炼结论', 'Copy in one click and paste into chat for instant AI takeaways')),
            ),
            h(
              'div',
              { className: 'dsh-wb-prompt-chips' },
              h(RssPromptButton, {
                variant: 'primary',
                setNotice,
                prompt: rssText(
                  '抓取「' + (active.name || active.url) + '」最新更新并提炼 3 条核心结论',
                  'Fetch the latest updates from “' + (active.name || active.url) + '” and distill 3 key takeaways',
                ),
                label: rssText('复制单源提炼指令', 'Copy 3-takeaway prompt'),
              }),
              h(RssPromptButton, {
                setNotice,
                prompt: dailyBriefingPrompt,
                label: rssText('复制全站今日简报', 'Copy daily briefing'),
              }),
            ),
          ),
          h(RssArticlePreview, { value: previews[active.id], loading: busy === 'previewFeed' }),
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
    splitKey: 'dsh-rss:catalog-split-width',
    minWidth: 260,
    maxWidth: 560,
    resizerLabel: rssText('调整来源列表宽度', 'Resize sources list'),
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
          actions: h(
            React.Fragment,
            null,
            h(W.IconButton, {
              icon: 'refresh',
              spinning: busy === 'previewSource' && active?.id === source.id,
              disabled: !!busy,
              label: t('previewArticles'),
              'data-rss-quick-action': 'preview',
              onClick: () => {
                setActiveId(source.id);
                run('previewSource', { sourceId: source.id }, value =>
                  setPreviews(old => ({ ...old, [source.id]: value.sourcePreview })),
                );
              },
            }),
            h(W.IconButton, {
              icon: source.subscribed ? 'check' : 'plus',
              disabled: !writable || !!busy || source.subscribed,
              label: source.subscribed ? t('subscribed') : t('subscribe'),
              'data-rss-quick-action': 'subscribe',
              onClick: () =>
                run(
                  'add',
                  { url: source.url, name: source.name, category: categoryOf(source), revision: state.revision },
                  () => setNotice(t('saved') + ' · ' + source.name),
                ),
            }),
          ),
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
          h('h2', { className: 'rss-detail-title', 'data-dsh-editorial-heading': '', 'data-dsh-serif': '' }, active.name),
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
          h(RssArticlePreview, { value: previews[active.id], loading: busy === 'previewSource' }),
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
  max-width: 72ch;
}

.rss-workbench .rss-skeleton-split {
  flex: 1;
  min-height: 0;
}

.rss-workbench .rss-skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.rss-workbench .rss-skeleton-detail {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 24px;
}

.rss-workbench .rss-refresh-skeleton {
  padding: 4px 8px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.rss-workbench .rss-preview-skeleton {
  display: grid;
  gap: 8px;
  margin-block-start: 6px;
}

[data-dsh-style="eink"] .rss-workbench .rss-article-item {
  padding: 12px 14px;
  line-height: 1.65;
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
  font-family: var(--dsh-font-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
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

.rss-workbench .rss-empty-actions {
  justify-content: center;
}

.rss-workbench .rss-briefing-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.rss-workbench .rss-briefing-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: var(--w-radius-md);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
}

.rss-workbench .rss-briefing-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 10px;
}

.rss-workbench .rss-briefing-head > strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--w-ink);
}

.rss-workbench .rss-briefing-head > .rss-muted {
  margin: 0;
  font-size: 12px;
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
