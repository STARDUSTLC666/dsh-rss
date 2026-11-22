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

function rssFeedHost(url) {
  try {
    return new URL(String(url || '')).hostname.replace(/^www\./, '') || String(url || '');
  } catch {
    return String(url || '');
  }
}

function rssFreshnessStamp(feed) {
  if (!feed?.check) return rssText('未检 · 待抓取', 'Pending · Unchecked');
  const timeText = feed.check.checkedAt && !Number.isNaN(Date.parse(feed.check.checkedAt))
    ? new Date(feed.check.checkedAt).toLocaleTimeString(language === 'en' ? 'en-US' : 'zh-CN', { hour: '2-digit', minute: '2-digit' })
    : '';
  if (feed.check.ok) {
    return rssText(
      `已检 · ${feed.check.entryCount ?? 0} 篇${timeText ? ' · ' + timeText : ''}`,
      `Live · ${feed.check.entryCount ?? 0} items${timeText ? ' · ' + timeText : ''}`,
    );
  }
  return rssText('连接异常' + (timeText ? ' · ' + timeText : ''), 'Error' + (timeText ? ' · ' + timeText : ''));
}

function RssFeedBrowser({
  feeds,
  filtered,
  categories,
  query,
  setQuery,
  category,
  setCategory,
  viewMode: controlledViewMode,
  setViewMode: controlledSetViewMode,
  writable,
  busy,
  run,
  open,
  setNotice,
  onOpenCatalog,
  onOpenTransfer,
}) {
  const [activeId, setActiveId] = useState(null),
    [previews, setPreviews] = useState({}),
    [localViewMode, setLocalViewMode] = useState(() => {
      try {
        const saved = typeof window !== 'undefined' ? window.localStorage?.getItem('dsh-rss:feeds-view-mode') : null;
        return saved === 'list' ? 'list' : 'zine';
      } catch {
        return 'zine';
      }
    }),
    [expandedId, setExpandedId] = useState(null),
    [transitionId, setTransitionId] = useState(null);
  const cardRefs = useRef(new Map()),
    triggerRefs = useRef(new Map()),
    readerSheetRef = useRef(null),
    readerHeadingRef = useRef(null),
    pendingTransitionRef = useRef(null),
    lastOpenedIdRef = useRef(null),
    focusTargetRef = useRef(null);

  const viewMode = controlledViewMode || localViewMode;
  const setViewMode = next => {
    const mode = next === 'list' ? 'list' : 'zine';
    if (mode === 'list') {
      setExpandedId(null);
      setTransitionId(null);
    }
    if (controlledSetViewMode) controlledSetViewMode(mode);
    else {
      setLocalViewMode(mode);
      try {
        if (typeof window !== 'undefined') window.localStorage?.setItem('dsh-rss:feeds-view-mode', mode);
      } catch {}
    }
  };

  function prefersReducedMotion() {
    try {
      return Boolean(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
    } catch {
      return false;
    }
  }

  function clearAllTransitionNames() {
    for (const el of cardRefs.current.values()) {
      if (el?.style) el.style.viewTransitionName = '';
    }
    if (readerSheetRef.current?.style) readerSheetRef.current.style.viewTransitionName = '';
  }

  function runStoryTransition(nextId, activeCardId) {
    const canTransition =
      typeof document !== 'undefined' &&
      typeof document.startViewTransition === 'function' &&
      !prefersReducedMotion();
    focusTargetRef.current = nextId ? 'reader' : activeCardId;
    if (!canTransition) {
      setTransitionId(null);
      setExpandedId(nextId);
      return;
    }
    clearAllTransitionNames();
    if (nextId) {
      const cardEl = cardRefs.current.get(nextId);
      if (cardEl?.style) cardEl.style.viewTransitionName = 'dsh-rss-story-hero';
    } else if (readerSheetRef.current?.style) {
      readerSheetRef.current.style.viewTransitionName = 'dsh-rss-story-hero';
    }
    try {
      const vt = document.startViewTransition(() => {
        clearAllTransitionNames();
        setTransitionId(activeCardId);
        setExpandedId(nextId);
        return new Promise(resolve => {
          const done = () => {
            clearTimeout(timer);
            if (pendingTransitionRef.current === done) pendingTransitionRef.current = null;
            resolve();
          };
          const timer = setTimeout(done, 80);
          pendingTransitionRef.current = done;
        });
      });
      Promise.resolve(vt?.finished).finally(() => {
        clearAllTransitionNames();
        setTransitionId(null);
      });
    } catch {
      clearAllTransitionNames();
      setTransitionId(null);
      setExpandedId(nextId);
    }
  }

  function openStory(feedId) {
    lastOpenedIdRef.current = feedId;
    setActiveId(feedId);
    runStoryTransition(feedId, feedId);
  }

  function closeStory() {
    const closingId = expandedId || lastOpenedIdRef.current;
    runStoryTransition(null, closingId);
  }

  useEffect(() => {
    if (pendingTransitionRef.current) {
      const resolve = pendingTransitionRef.current;
      pendingTransitionRef.current = null;
      resolve();
    }
    if (focusTargetRef.current === 'reader' && expandedId) {
      focusTargetRef.current = null;
      readerHeadingRef.current?.focus?.({ preventScroll: true });
    } else if (focusTargetRef.current && !expandedId) {
      const returnId = focusTargetRef.current;
      focusTargetRef.current = null;
      triggerRefs.current.get(returnId)?.focus?.({ preventScroll: true });
    }
  }, [expandedId]);

  const setCardRef = id => el => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  };
  const setTriggerRef = id => el => {
    if (el) triggerRefs.current.set(id, el);
    else triggerRefs.current.delete(id);
  };

  const active = filtered.find(feed => feed.id === activeId) || filtered[0];
  const expandedFeed = expandedId ? feeds.find(feed => feed.id === expandedId) || null : null;

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
  const viewToggle = h(
    'div',
    {
      className: 'rss-view-toggle',
      role: 'group',
      'aria-label': rssText('订阅视图模式', 'Feeds view mode'),
      'data-tour': 'rss-view-toggle',
      'data-window-drag-exclude': '',
    },
    h(
      'button',
      {
        type: 'button',
        className: 'rss-view-toggle-btn',
        'data-rss-view-toggle': 'zine',
        'data-active': viewMode === 'zine' ? 'true' : 'false',
        'aria-pressed': viewMode === 'zine',
        onClick: () => setViewMode('zine'),
      },
      rssText('画报', 'Zine'),
    ),
    h(
      'button',
      {
        type: 'button',
        className: 'rss-view-toggle-btn',
        'data-rss-view-toggle': 'list',
        'data-active': viewMode === 'list' ? 'true' : 'false',
        'aria-pressed': viewMode === 'list',
        onClick: () => setViewMode('list'),
      },
      rssText('列表', 'List'),
    ),
  );

  if (viewMode === 'list') {
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
          viewToggle,
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

  // DEFAULT BESPOKE VIEW: 编辑部画报桌面 + View Transitions 原地展开 (Editorial Zine Spread)
  const leadFeed = filtered[0] || null;
  const featureFeeds = filtered.slice(1, 3);
  const bentoFeeds = filtered.slice(3);

  function renderCardPreview(feed, maxItems) {
    const previewData = previews[feed.id];
    const isLoadingThis = busy === 'previewFeed' && activeId === feed.id;
    if (isLoadingThis) {
      return h(
        'div',
        { className: 'rss-zine-preview-skeleton' },
        [0, 1].map(i => h(W.Skeleton, { key: i, variant: 'row' })),
      );
    }
    if (previewData?.entries?.length) {
      return h(
        'ul',
        { className: 'rss-zine-headlines' },
        previewData.entries.slice(0, maxItems).map((entry, idx) =>
          h(
            'li',
            { key: idx, className: 'rss-zine-headline-item' },
            h('span', { className: 'rss-zine-headline-num', 'aria-hidden': 'true' }, String(idx + 1).padStart(2, '0')),
            entry.link
              ? h(RssExternalLink, { href: entry.link, className: 'rss-zine-headline-link', 'data-dsh-serif': '' }, entry.title || t('noTitle'))
              : h('span', { className: 'rss-zine-headline-text', 'data-dsh-serif': '' }, entry.title || t('noTitle')),
          ),
        ),
      );
    }
    const host = rssFeedHost(feed.url);
    const summaryEl = h(
      'p',
      { className: 'rss-zine-summary' },
      feed.check?.ok
        ? rssText(
            `来自 ${host} · 最近校验收录 ${feed.check.entryCount ?? 0} 篇更新，点击卡片展开阅读或立即抓取最新头条。`,
            `Dispatch from ${host} · ${feed.check.entryCount ?? 0} entries verified. Expand to read or fetch live headlines.`,
          )
        : feed.check && !feed.check.ok
        ? rssText(
            `来自 ${host} · 上次检查未能连接（${feedError(feed.check.error)}），可在阅读页重试或编辑来源地址。`,
            `From ${host} · Last check reported an issue (${feedError(feed.check.error)}). Expand to retry or edit.`,
          )
        : rssText(
            `来自 ${host} · 尚未在本轮抓取文章列表。点按卡片展开阅读单，或直接一键复制 AI 提炼指令。`,
            `Source at ${host} · Headlines not fetched this session. Open the reader sheet or copy an AI takeaway prompt.`,
          ),
    );
    if (maxItems >= 4) {
      return h(
        'div',
        { className: 'rss-zine-hero-deck' },
        summaryEl,
        h(
          'div',
          { className: 'rss-zine-hero-callout' },
          h(
            'div',
            { className: 'rss-zine-callout-copy' },
            h('strong', null, rssText('封面源快捷读取', 'Cover dispatch ready')),
            h(
              'span',
              { className: 'rss-muted' },
              rssText('点击抓取近期最多 5 篇头条，或直接点击卡片展开居中阅读单。', 'Fetch up to 5 recent headlines now, or click anywhere on the card to open the Reader Sheet.'),
            ),
          ),
          h(
            W.Button,
            {
              variant: 'outline',
              size: 'sm',
              icon: 'refresh',
              spinning: busy === 'previewFeed' && activeId === feed.id,
              disabled: !!busy,
              onClick: () => {
                setActiveId(feed.id);
                run('previewFeed', { id: feed.id }, value =>
                  setPreviews(old => ({ ...old, [feed.id]: value.feedPreview })),
                );
              },
            },
            rssText('抓取头条预览', 'Fetch headlines'),
          ),
        ),
      );
    }
    return summaryEl;
  }

  function renderZineCard(feed, roleKind, issueIndex) {
    const singlePrompt = rssText(
      '抓取「' + (feed.name || feed.url) + '」最新更新并提炼 3 条核心结论',
      'Fetch the latest updates from “' + (feed.name || feed.url) + '” and distill 3 key takeaways',
    );
    const isHero = roleKind === 'hero';
    const isFeature = roleKind === 'feature';
    const statusTone = feed.check ? (feed.check.ok ? 'success' : 'error') : 'idle';
    const issueLabel = 'NO. ' + String(issueIndex + 1).padStart(2, '0');
    return h(
      'article',
      {
        key: feed.id,
        ref: setCardRef(feed.id),
        className: 'rss-zine-card rss-zine-card-' + roleKind,
        'data-dsh-card': '',
        'data-rss-zine-card': roleKind,
        'data-rss-feed-id': feed.id,
        'data-tour': isHero ? 'rss-zine-hero' : undefined,
        style: transitionId === feed.id ? { viewTransitionName: 'dsh-rss-story-hero' } : undefined,
        onClick: event => {
          if (event?.target?.closest?.('button, a, input, textarea, select, [role="button"]')) return;
          openStory(feed.id);
        },
      },
      h(
        'div',
        { className: 'rss-zine-card-meta' },
        h(
          'div',
          { className: 'rss-zine-card-tags' },
          h('span', { className: 'rss-zine-issue' }, isHero ? rssText('封面头条 · ', 'COVER · ') + issueLabel : issueLabel),
          h('span', { className: 'dsh-wb-tag rss-zine-cat-tag' }, feed.category || t('uncategorized')),
        ),
        h(
          'span',
          { className: 'rss-zine-freshness', 'data-tone': statusTone },
          h('span', { className: 'rss-zine-dot', 'aria-hidden': 'true' }),
          rssFreshnessStamp(feed),
        ),
      ),
      h(
        'button',
        {
          type: 'button',
          ref: setTriggerRef(feed.id),
          className: 'rss-zine-card-trigger',
          'data-rss-zine-open': feed.id,
          onClick: () => openStory(feed.id),
        },
        h(
          'h2',
          {
            className: isHero ? 'rss-zine-hero-title' : isFeature ? 'rss-zine-feature-title' : 'rss-zine-bento-title',
            'data-dsh-editorial-heading': '',
            'data-dsh-serif': '',
          },
          feed.name || feed.url,
        ),
        h('span', { className: 'rss-zine-host-stamp' }, rssFeedHost(feed.url) + ' · ' + feed.url),
      ),
      renderCardPreview(feed, isHero ? 4 : isFeature ? 2 : 2),
      h(
        'div',
        { className: 'rss-zine-card-footer' },
        h(RssPromptButton, {
          variant: isHero ? 'primary' : 'outline',
          setNotice,
          prompt: singlePrompt,
          label: isHero
            ? rssText('复制单源提炼指令', 'Copy 3-takeaway prompt')
            : rssText('提炼 3 条结论', '3-takeaway prompt'),
        }),
        h(
          'div',
          { className: 'rss-zine-card-utils' },
          h(W.IconButton, {
            icon: 'refresh',
            spinning: busy === 'previewFeed' && activeId === feed.id,
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
          h(
            W.Button,
            {
              variant: 'ghost',
              size: 'sm',
              icon: 'book',
              'data-rss-zine-expand-btn': feed.id,
              onClick: () => openStory(feed.id),
            },
            rssText('阅读', 'Read'),
          ),
        ),
      ),
    );
  }

  return h(
    'div',
    { className: 'rss-zine-desk', 'data-rss-view': 'zine' },
    expandedFeed
      ? h(
          'article',
          {
            ref: readerSheetRef,
            className: 'rss-zine-reader',
            'data-dsh-card': '',
            'data-rss-zine-reader': expandedFeed.id,
            style: transitionId === expandedFeed.id ? { viewTransitionName: 'dsh-rss-story-hero' } : undefined,
            onKeyDown: event => {
              if (event.key === 'Escape') {
                event.stopPropagation?.();
                closeStory();
              }
            },
          },
          h(
            'div',
            { className: 'rss-zine-reader-topbar' },
            h(
              W.Button,
              {
                variant: 'outline',
                icon: 'left',
                'data-rss-zine-back': '',
                onClick: closeStory,
              },
              rssText('收拢回画报桌', 'Back to zine desk'),
            ),
            h(
              'div',
              { className: 'rss-zine-reader-badges' },
              h('span', { className: 'dsh-wb-tag' }, expandedFeed.category || t('uncategorized')),
              h(
                'span',
                {
                  className: 'rss-zine-freshness',
                  'data-tone': expandedFeed.check ? (expandedFeed.check.ok ? 'success' : 'error') : 'idle',
                },
                h('span', { className: 'rss-zine-dot', 'aria-hidden': 'true' }),
                rssFreshnessStamp(expandedFeed),
              ),
              viewToggle,
            ),
          ),
          h(
            'header',
            { className: 'rss-zine-reader-header' },
            h(
              'h2',
              {
                ref: readerHeadingRef,
                tabIndex: -1,
                className: 'rss-zine-reader-title',
                'data-dsh-editorial-heading': '',
                'data-dsh-serif': '',
              },
              expandedFeed.name || expandedFeed.url,
            ),
            h('p', { className: 'rss-url' }, expandedFeed.url),
            h(
              'div',
              { className: 'dsh-wb-toolbar rss-zine-reader-actions' },
              h(
                W.Button,
                {
                  variant: 'primary',
                  icon: 'refresh',
                  spinning: busy === 'previewFeed',
                  disabled: !!busy,
                  onClick: () => {
                    setActiveId(expandedFeed.id);
                    run('previewFeed', { id: expandedFeed.id }, value =>
                      setPreviews(old => ({ ...old, [expandedFeed.id]: value.feedPreview })),
                    );
                  },
                },
                busy === 'previewFeed' ? t('saving') : rssText('检查更新', 'Check updates'),
              ),
              h(
                W.Button,
                { icon: 'edit', disabled: !writable || !!busy, onClick: event => open('feed', expandedFeed, event) },
                t('edit'),
              ),
              h(
                W.Button,
                {
                  icon: 'trash',
                  variant: 'danger',
                  disabled: !writable || !!busy,
                  onClick: event => open('remove', expandedFeed, event),
                },
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
              h(
                'span',
                { className: 'rss-muted' },
                rssText('一键复制后粘贴到聊天即可让助手抓取并提炼结论', 'Copy in one click and paste into chat for instant AI takeaways'),
              ),
            ),
            h(
              'div',
              { className: 'dsh-wb-prompt-chips' },
              h(RssPromptButton, {
                variant: 'primary',
                setNotice,
                prompt: rssText(
                  '抓取「' + (expandedFeed.name || expandedFeed.url) + '」最新更新并提炼 3 条核心结论',
                  'Fetch the latest updates from “' + (expandedFeed.name || expandedFeed.url) + '” and distill 3 key takeaways',
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
          h(RssArticlePreview, { value: previews[expandedFeed.id], loading: busy === 'previewFeed' }),
          h(
            W.Details,
            { summary: rssText('来源检查', 'Source check'), className: 'rss-check-details' },
            expandedFeed.check
              ? h(
                  React.Fragment,
                  null,
                  h(
                    'p',
                    { className: 'rss-muted' },
                    new Date(expandedFeed.check.checkedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-CN'),
                  ),
                  h(
                    W.Status,
                    { tone: expandedFeed.check.ok ? 'success' : 'error', className: 'rss-inline-status' },
                    expandedFeed.check.ok
                      ? t('checked') + ' · ' + expandedFeed.check.entryCount + ' ' + t('entries')
                      : t('failed') + ' · ' + feedError(expandedFeed.check.error),
                  ),
                )
              : h('p', { className: 'rss-muted' }, t('pending')),
            h('p', { className: 'rss-muted' }, t('statusHint')),
          ),
        )
      : h(
          React.Fragment,
          null,
          h(
            'div',
            { className: 'rss-zine-strip', 'data-tour': 'rss-category-filter', 'data-dsh-card': '' },
            h(
              'div',
              { className: 'rss-zine-strip-top' },
              viewToggle,
              h(
                'div',
                { className: 'rss-zine-cat-pills', role: 'group', 'aria-label': t('category') },
                categoryItems.map(item =>
                  h(
                    'button',
                    {
                      key: item.id,
                      type: 'button',
                      className: 'rss-zine-cat-pill',
                      'data-active': category === item.id ? 'true' : 'false',
                      'aria-pressed': category === item.id,
                      onClick: () => {
                        setCategory(item.id);
                        setActiveId(null);
                      },
                    },
                    item.label,
                  ),
                ),
              ),
              h(
                'div',
                { className: 'rss-zine-strip-right' },
                h(W.Search, {
                  label: t('search'),
                  clearLabel: t('clear'),
                  value: query,
                  className: 'rss-zine-search',
                  onChange: event => {
                    setQuery(event.target.value);
                    setActiveId(null);
                  },
                }),
                h(
                  'span',
                  { className: 'rss-zine-briefing-anchor', 'data-tour': 'rss-briefing-cta' },
                  h(RssPromptButton, {
                    variant: 'primary',
                    setNotice,
                    prompt: dailyBriefingPrompt,
                    label: rssText('复制今日简报指令', 'Copy daily briefing prompt'),
                  }),
                ),
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
                h(W.IconButton, {
                  icon: 'refresh',
                  spinning: busy === 'load',
                  label: t('refresh'),
                  disabled: !!busy,
                  onClick: () => run(null),
                }),
              ),
            ),
          ),
          busy === 'load'
            ? h(
                'div',
                { className: 'rss-refresh-skeleton' },
                h(W.Skeleton, { variant: 'row', label: t('refresh') }),
              )
            : null,
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
            : h(
                'div',
                { className: 'rss-zine-spread' },
                h(
                  'div',
                  { className: 'rss-zine-lead-band', 'data-solo': featureFeeds.length === 0 ? 'true' : 'false' },
                  leadFeed ? h('div', { className: 'rss-zine-hero-col' }, renderZineCard(leadFeed, 'hero', 0)) : null,
                  featureFeeds.length
                    ? h(
                        'div',
                        { className: 'rss-zine-feature-col' },
                        featureFeeds.map((feed, idx) => renderZineCard(feed, 'feature', idx + 1)),
                      )
                    : null,
                ),
                bentoFeeds.length
                  ? h(
                      'div',
                      { className: 'rss-zine-bento-grid' },
                      bentoFeeds.map((feed, idx) => renderZineCard(feed, 'bento', idx + 3)),
                    )
                  : null,
              ),
        ),
  );
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

/* Segmented View Toggle (画报 / 列表) */
.rss-workbench .rss-view-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: 999px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-2);
  flex: none;
}

.rss-workbench .rss-view-toggle-btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--w-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              box-shadow var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out);
}

.rss-workbench .rss-view-toggle-btn:hover {
  color: var(--w-ink);
}

.rss-workbench .rss-view-toggle-btn[data-active="true"] {
  background: var(--w-bg-base);
  color: var(--w-ink);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

/* Editorial Zine Spread (编辑部画报桌面) */
.rss-workbench .rss-zine-desk {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px 28px;
  min-width: 0;
  flex: 1;
  overflow: auto;
  background:
    radial-gradient(circle at 12% 0%, var(--w-accent-soft) 0%, transparent 45%),
    var(--w-bg-base);
}

.rss-workbench .rss-zine-strip {
  position: sticky;
  top: 0;
  z-index: 4;
  padding: 10px 14px;
  border-radius: var(--w-radius-md);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-base);
  background: color-mix(in srgb, var(--w-bg-base) 90%, transparent);
  backdrop-filter: blur(10px);
  box-shadow: var(--dsh-card-shadow, 0 4px 14px rgba(15, 23, 42, 0.05));
}

.rss-workbench .rss-zine-strip-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
}

.rss-workbench .rss-zine-cat-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  flex: 1 1 220px;
  min-width: 0;
}

.rss-workbench .rss-zine-cat-pill {
  appearance: none;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-1);
  color: var(--w-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 550;
  line-height: 1.2;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              border-color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              transform var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out);
}

.rss-workbench .rss-zine-cat-pill:hover {
  color: var(--w-ink);
  border-color: var(--w-accent);
  background: var(--w-accent-soft);
}

.rss-workbench .rss-zine-cat-pill[data-active="true"] {
  background: var(--w-primary-fill);
  color: var(--w-primary-ink);
  border-color: transparent;
}

.rss-workbench .rss-zine-strip-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-inline-start: auto;
}

.rss-workbench .rss-zine-search {
  width: clamp(160px, 20vw, 240px);
}

.rss-workbench .rss-zine-spread {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.rss-workbench .rss-zine-lead-band {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.rss-workbench .rss-zine-hero-col {
  grid-column: span 7;
  min-width: 0;
  display: flex;
}

.rss-workbench .rss-zine-lead-band[data-solo="true"] .rss-zine-hero-col {
  grid-column: span 12;
}

.rss-workbench .rss-zine-feature-col {
  grid-column: span 5;
  min-width: 0;
  display: grid;
  gap: 14px;
  grid-auto-rows: minmax(0, 1fr);
}

.rss-workbench .rss-zine-bento-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  min-width: 0;
}

.rss-workbench .rss-zine-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 18px 20px;
  cursor: pointer;
  border-radius: var(--w-radius-md);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-1);
  box-shadow: var(--dsh-card-shadow, none);
  transition: transform var(--dsh-motion-base, 200ms) var(--dsh-ease-out, ease-out),
              box-shadow var(--dsh-motion-base, 200ms) var(--dsh-ease-out, ease-out),
              border-color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out);
}

.rss-workbench .rss-zine-card-hero {
  padding: 24px 26px;
  background: linear-gradient(155deg, var(--w-bg-1) 0%, var(--w-bg-base) 100%);
  border-inline-start: 3px solid var(--w-accent);
}

.rss-workbench .rss-zine-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--dsh-card-hover-shadow, 0 8px 22px rgba(15, 23, 42, 0.08));
  border-color: var(--w-accent);
}

.rss-workbench .rss-zine-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.rss-workbench .rss-zine-card-tags {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.rss-workbench .rss-zine-issue {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--w-accent);
}

.rss-workbench .rss-zine-freshness {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 550;
  color: var(--w-muted);
}

.rss-workbench .rss-zine-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--w-tertiary);
  flex: none;
}

.rss-workbench .rss-zine-freshness[data-tone="success"] {
  color: var(--w-success);
}

.rss-workbench .rss-zine-freshness[data-tone="success"] .rss-zine-dot {
  background: var(--w-success);
}

.rss-workbench .rss-zine-freshness[data-tone="error"] {
  color: var(--w-danger);
}

.rss-workbench .rss-zine-freshness[data-tone="error"] .rss-zine-dot {
  background: var(--w-danger);
}

.rss-workbench .rss-zine-card-trigger {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  text-align: start;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.rss-workbench .rss-zine-card-trigger:focus-visible {
  outline: 2px solid var(--w-accent);
  outline-offset: 4px;
  border-radius: var(--w-radius-xs);
}

.rss-workbench .rss-zine-hero-title {
  margin: 0;
  width: fit-content;
  max-width: 100%;
  font-size: clamp(22px, 2.5vw, 30px);
  line-height: 1.24;
  font-weight: 750;
  color: var(--w-ink);
  overflow-wrap: anywhere;
  transition: color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out);
}

.rss-workbench .rss-zine-feature-title {
  margin: 0;
  width: fit-content;
  max-width: 100%;
  font-size: 17px;
  line-height: 1.32;
  font-weight: 700;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-zine-bento-title {
  margin: 0;
  width: fit-content;
  max-width: 100%;
  font-size: 15.5px;
  line-height: 1.35;
  font-weight: 680;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-zine-card-trigger:hover h2 {
  color: var(--w-accent);
}

.rss-workbench .rss-zine-host-stamp {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11.5px;
  color: var(--w-tertiary);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-zine-headlines {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: grid;
  gap: 8px;
  border-block-start: var(--dsh-control-border-width, 0.5px) dashed var(--w-border-strong);
  padding-block-start: 10px;
}

.rss-workbench .rss-zine-headline-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.rss-workbench .rss-zine-headline-num {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  font-weight: 700;
  color: var(--w-accent);
  flex: none;
}

.rss-workbench .rss-zine-headline-link,
.rss-workbench .rss-zine-headline-text {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--w-ink);
}

.rss-workbench .rss-zine-summary {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--w-muted);
}

.rss-workbench .rss-zine-hero-deck {
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  justify-content: space-between;
}

.rss-workbench .rss-zine-hero-callout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 14px;
  padding: 12px 14px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) dashed var(--w-border-strong);
  background: var(--w-bg-base);
}

.rss-workbench .rss-zine-callout-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 200px;
}

.rss-workbench .rss-zine-callout-copy > strong {
  font-size: 12.5px;
  font-weight: 650;
  color: var(--w-ink);
}

.rss-workbench .rss-zine-callout-copy > .rss-muted {
  margin: 0;
  font-size: 12px;
}

.rss-workbench .rss-zine-briefing-anchor {
  display: inline-flex;
  align-items: center;
}

.rss-workbench .rss-zine-preview-skeleton {
  display: grid;
  gap: 6px;
}

.rss-workbench .rss-zine-card-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-block-start: auto;
  padding-block-start: 10px;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.rss-workbench .rss-zine-card-utils {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: auto;
}

/* Centered Editorial Reader Sheet */
.rss-workbench .rss-zine-reader {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(820px, 100%);
  margin-inline: auto;
  padding: 22px 26px 28px;
  border-radius: var(--w-radius-lg, 16px);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-1);
  box-shadow: var(--dsh-card-hover-shadow, 0 10px 28px rgba(15, 23, 42, 0.08));
}

.rss-workbench .rss-zine-reader-topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-block-end: 12px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.rss-workbench .rss-zine-reader-badges {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.rss-workbench .rss-zine-reader-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rss-workbench .rss-zine-reader-title {
  margin: 0;
  width: fit-content;
  max-width: 100%;
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1.25;
  font-weight: 750;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.rss-workbench .rss-zine-reader-title:focus {
  outline: none;
}

.rss-workbench .rss-zine-reader-actions {
  margin-block-start: 4px;
}

/* Native View Transitions */
::view-transition-old(dsh-rss-story-hero),
::view-transition-new(dsh-rss-story-hero) {
  animation-duration: 280ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

[data-dsh-style="pixel8bit"] .rss-workbench .rss-zine-card,
[data-dsh-style="pixel8bit"] .rss-workbench .rss-zine-reader,
[data-dsh-style="pixel8bit"] .rss-workbench .rss-zine-strip {
  border-width: 2px;
  border-radius: 2px;
  box-shadow: 4px 4px 0 var(--w-border-strong);
}

[data-dsh-style="gazette"] .rss-workbench .rss-zine-card-hero {
  border-inline-start: 0;
  border-block-start: 4px double var(--w-ink);
  border-block-end: 2px solid var(--w-ink);
}

[data-dsh-style="songhui"] .rss-workbench .rss-zine-card-hero {
  border-inline-start: 3px double var(--w-accent);
}

[data-dsh-style="risograph"] .rss-workbench .rss-zine-card,
[data-dsh-style="risograph"] .rss-workbench .rss-zine-reader {
  border-width: 2px;
  box-shadow: 4px 4px 0 var(--w-accent);
}

[data-dsh-style="blueprint"] .rss-workbench .rss-zine-card,
[data-dsh-style="blueprint"] .rss-workbench .rss-zine-reader {
  border-style: dashed;
}

[data-dsh-style="eink"] .rss-workbench .rss-zine-strip {
  backdrop-filter: none;
  background: var(--w-bg-base);
}

[data-dsh-style="win98"] .rss-workbench .rss-view-toggle,
[data-dsh-style="win98"] .rss-workbench .rss-view-toggle-btn,
[data-dsh-style="win98"] .rss-workbench .rss-zine-cat-pill,
[data-dsh-style="win98"] .rss-workbench .rss-zine-card,
[data-dsh-style="win98"] .rss-workbench .rss-zine-reader {
  border-radius: 0;
}

@media (prefers-reduced-motion: reduce) {
  .rss-workbench .rss-zine-card,
  .rss-workbench .rss-zine-cat-pill,
  .rss-workbench .rss-view-toggle-btn {
    transition: none !important;
  }
  .rss-workbench .rss-zine-card:hover {
    transform: none !important;
  }
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}

@container dsh-workbench (max-width: 1220px) {
  .rss-workbench .dsh-wb-header {
    flex-wrap: wrap;
    row-gap: 6px;
    column-gap: 8px;
    padding: 6px 12px;
  }

  .rss-workbench .dsh-wb-header > .dsh-header-leading {
    flex: 0 0 auto;
    max-width: 100%;
    gap: 6px;
  }

  .rss-workbench .dsh-wb-header .dsh-wb-tab {
    padding: 4px 8px;
  }

  .rss-workbench .dsh-wb-header > .dsh-wb-header-actions {
    flex: 1 1 auto;
    min-width: 0;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 4px;
  }

  .rss-workbench .dsh-wb-header .dsh-wb-btn {
    padding-inline: 8px;
  }
}

@container dsh-workbench (max-width: 900px) {
  .rss-workbench .rss-zine-hero-col,
  .rss-workbench .rss-zine-feature-col {
    grid-column: span 12;
  }
  .rss-workbench .rss-zine-bento-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container dsh-workbench (max-width: 760px) {
  .rss-workbench .rss-catalog-filters {
    grid-template-columns: 1fr;
  }
  .rss-workbench .rss-detail-actions > .dsh-wb-toolbar {
    width: 100%;
  }
  .rss-workbench .rss-zine-desk {
    padding: 12px 12px 24px;
  }
  .rss-workbench .rss-zine-bento-grid {
    grid-template-columns: 1fr;
  }
  .rss-workbench .rss-zine-reader {
    padding: 16px 14px 22px;
  }
}
`;
