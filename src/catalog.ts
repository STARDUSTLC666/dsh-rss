/** Publisher-hosted feeds; browsing this list never contacts their websites. */
export const sourceCategories = [
  { id: 'technology', name: ['科技资讯', 'Technology news'] },
  { id: 'research', name: ['AI 与科研', 'AI and research'] },
  { id: 'software', name: ['软件更新', 'Software updates'] },
  { id: 'reading', name: ['阅读与博客', 'Reading and blogs'] },
  { id: 'interests', name: ['生活与兴趣', 'Life and interests'] },
] as const

export interface RecommendedSource {
  id: string
  name: string
  url: string
  website: string
  category: typeof sourceCategories[number]['id']
  language: 'zh' | 'en'
  description: readonly [string, string]
}

// Descriptions are original catalog copy. Article content belongs to publishers.
// These are native RSS/Atom endpoints, without an RSSHub instance dependency.
export const recommendedSources: readonly RecommendedSource[] = [
  { id: 'ithome', name: 'IT之家', url: 'https://www.ithome.com/rss/', website: 'https://www.ithome.com/', category: 'technology', language: 'zh', description: ['数码产品、科技行业与软件资讯。', 'Consumer devices, technology and software news.'] },
  { id: 'sspai', name: '少数派', url: 'https://sspai.com/feed', website: 'https://sspai.com/', category: 'technology', language: 'zh', description: ['数字生活、效率工具与使用经验。', 'Digital life, productivity tools and practical guides.'] },
  { id: 'ifanr', name: '爱范儿', url: 'https://www.ifanr.com/feed', website: 'https://www.ifanr.com/', category: 'technology', language: 'zh', description: ['科技产品、设计与数字生活观察。', 'Technology products, design and digital life.'] },
  { id: 'hacker-news', name: 'Hacker News', url: 'https://news.ycombinator.com/rss', website: 'https://news.ycombinator.com/', category: 'technology', language: 'en', description: ['技术社区的热门文章与讨论链接。', 'Popular articles and discussions from the technology community.'] },
  { id: 'arxiv-ai', name: 'arXiv · Artificial Intelligence', url: 'https://rss.arxiv.org/rss/cs.AI', website: 'https://arxiv.org/list/cs.AI/recent', category: 'research', language: 'en', description: ['人工智能论文更新；非发布日可能没有条目。', 'AI paper announcements; non-publication days can have no entries.'] },
  { id: 'hugging-face', name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml', website: 'https://huggingface.co/blog', category: 'research', language: 'en', description: ['开放模型、数据集与机器学习实践。', 'Open models, datasets and machine-learning practice.'] },
  { id: 'deepmind', name: 'Google DeepMind', url: 'https://deepmind.google/blog/rss.xml', website: 'https://deepmind.google/blog/', category: 'research', language: 'en', description: ['研究团队发布的 AI 研究和产品进展。', 'AI research and product updates from the research team.'] },
  { id: 'appinn', name: '小众软件', url: 'https://www.appinn.com/feed/', website: 'https://www.appinn.com/', category: 'software', language: 'zh', description: ['实用软件、工具推荐和更新介绍。', 'Useful applications, tools and software updates.'] },
  { id: 'harness', name: 'DeepSeek Harness releases', url: 'https://github.com/deepseek-ai/DeepSeek-Harness/releases.atom', website: 'https://github.com/deepseek-ai/DeepSeek-Harness/releases', category: 'software', language: 'en', description: ['DSH 官方 GitHub 版本发布记录。', 'Official DSH releases published on GitHub.'] },
  { id: 'python', name: 'Python Insider', url: 'https://blog.python.org/feeds/posts/default', website: 'https://blog.python.org/', category: 'software', language: 'en', description: ['Python 官方版本发布与项目消息。', 'Official Python releases and project news.'] },
  { id: 'rust', name: 'Rust Blog', url: 'https://blog.rust-lang.org/feed.xml', website: 'https://blog.rust-lang.org/', category: 'software', language: 'en', description: ['Rust 官方版本与语言生态进展。', 'Official Rust releases and ecosystem updates.'] },
  { id: 'nodejs', name: 'Node.js Blog', url: 'https://nodejs.org/en/feed/blog.xml', website: 'https://nodejs.org/en/blog', category: 'software', language: 'en', description: ['Node.js 官方版本、安全更新与项目消息。', 'Official Node.js releases, security updates and project news.'] },
  { id: 'moonlight', name: '月光博客', url: 'https://www.williamlong.info/rss.xml', website: 'https://www.williamlong.info/', category: 'reading', language: 'zh', description: ['互联网、技术应用与个人博客文章。', 'Personal writing about the internet and technology.'] },
  { id: 'simon-willison', name: 'Simon Willison', url: 'https://simonwillison.net/atom/everything/', website: 'https://simonwillison.net/', category: 'reading', language: 'en', description: ['开发实践、数据工具与 AI 使用笔记。', 'Development practice, data tools and AI notes.'] },
  { id: 'nasa', name: 'NASA', url: 'https://www.nasa.gov/feed/', website: 'https://www.nasa.gov/', category: 'interests', language: 'en', description: ['航天任务、科学发现与宇宙探索。', 'Space missions, science and exploration.'] },
  { id: 'xkcd', name: 'xkcd', url: 'https://xkcd.com/rss.xml', website: 'https://xkcd.com/', category: 'interests', language: 'en', description: ['关于科学、技术和日常生活的漫画更新。', 'Comics about science, technology and everyday life.'] },
]

/** Feed-provided links stay text-only or become ordinary HTTP(S) links. */
export function articleLink(value: string, base: string): string {
  if (!value || value.length > 4096) return ''
  try {
    const url = new URL(value, base)
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : ''
  } catch { return '' }
}
