# 更新记录

## 0.10.7 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.5`：独立安装插件详情页底栏去重（保留组合包组件委派与对话页热更新卡片），补齐 `bundle-in-use` 组合包占用提示说明，并在检查结果过期或远端版本变更时自动刷新元数据，彻底消除 `check-first` 卡顿。
- Upgrade `@stardustlc/dsh-updates` to `0.2.5`: deduplicate standalone native plugin detail footers while keeping Suite delegation and in-chat reminder cards, surface clear `bundle-in-use` guidance, and automatically refresh expired update checks without `check-first` stalls.

## 0.10.6 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.4`：对话页新增一键热更新提醒卡片，自动检查周期缩短至 6 小时，手动热更新后可顺手开启包含兼容功能小版本的空闲自动更新。
- Upgrade `@stardustlc/dsh-updates` to `0.2.4`: add an actionable in-chat hot-update reminder card, 6-hour background update checks, compatible minor+patch idle auto-updates, and a post-update opt-in prompt.

## 0.10.5 (2026-11-18)

- **交互式聚光灯 + 自动转向箭头分步引导（Coachmark Tour）**：顶栏新增 `? 引导` 按钮，首次进入工作台温和引导一次（跳过或完成后写入 `localStorage` 永久不再打扰），支持真实按钮聚光灯高亮、视口边缘自动翻转小箭头、键盘 `←`/`→`/`Esc` 导航与气泡内一键复制对话指令；移除占高度的静态折叠流程说明框。
- **Interactive Spotlight + Directional Arrow Coachmark Tour**: add a header **? Tour** trigger with one-time non-intrusive first-visit onboarding (`localStorage` persisted), live target spotlighting, auto-flipping directional arrows, keyboard `←`/`→`/`Esc` navigation, and inline 1-click prompt copy, replacing the static collapsible workflow box.

## 0.10.4 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.3：侧边栏工作台平时默认隐藏底部更新栏（零高度占用），仅在检测到兼容新版本或执行更新时浮现单行精简提示条；完整更新设置与检查入口统一保留在 DSH「插件」详情页底部。
- Sync `@stardustlc/dsh-updates` 0.2.3: keep the sidebar workbench update footer hidden by default when up-to-date, surfacing a single-line compact strip only for actionable updates or active jobs while retaining full controls in native Plugin Details.

## 0.10.3 (2026-11-18)

- 在「我的订阅」与单源详情页新增分类/单源上下文感知的一键复制 AI 简报指令按钮，空状态补齐「推荐订阅源 / 导入 OPML」直达入口，并新增可折叠三步订阅简报使用指引。
- Add category- and feed-aware 1-click AI briefing prompt copy buttons in My Feeds and feed details, quick empty-state actions for starter feeds and OPML import, and a collapsible 3-step workflow guide.

## 0.10.2 (2026-11-18)

- 更新区底部新增克制、无打扰的 GitHub 点赞与问题反馈快捷链接，并完善中英文检索关键词。
- Add subtle, non-intrusive GitHub Star and issue feedback links in the update footer, and expand search keywords.

## 0.10.1 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.1：恢复 Suite 整包统一更新（移除独立拆包迁移），保留整包与独立插件的原地热更新与失败自动回滚。
- Sync `@stardustlc/dsh-updates` 0.2.1: restore unified Suite bundle updates (removing standalone conversion) while retaining in-place hot reload and automatic rollback.

## 0.10.0 (2026-11-18)

- 升级至 Workbench UI v2 并深度适配 DeepSeek Harness `>=0.2.2-rc.3`：按需接入宿主组件（`Button`、`Input`、`Checkbox`、`Menu`、`Modal`）并保留独立测试回退，遵循窗口顶部与侧栏留白变量及弹层拖拽排除区域，支持 Cordis 4 `ctx.effect` 热重载卸载清理。
- 新增五套共享界面风格切换（原生清透、米白纸感、Claude 暖书卷、8-Bit 像素、晴空薄荷），默认明亮通透，宿主深色模式下采用柔和石板色底面，并与弹层菜单实时同步；补齐小按钮微交互动画与减少动态效果无障碍适配。
- Upgrade to Workbench UI v2 for DeepSeek Harness `>=0.2.2-rc.3`: integrate lazy host UI primitives with standalone fallbacks, window-chrome clearances, overlay drag exclusions, and Cordis 4 `ctx.effect` unload cleanup.
- Add 5 synced `[data-dsh-style]` theme presets (`harness`, `cream`, `claude`, `pixel8bit`, `mint`) with airy daylight defaults, soft-slate dark mode adaptation, tactile button/icon micro-animations, and `prefers-reduced-motion` support.

## 0.9.14 (2026-11-17)

- 在工作台单独检查和安装兼容版本。自动安装默认关闭，可为该插件开启空闲时的稳定补丁更新。
- Check and install compatible versions separately from the workbench. Automatic installation is off by default. Enable it for this plugin to apply stable patches while idle.

## 0.9.13 (2026-11-14)

- 适配 DSH 0.2.2-rc.3：最低 Harness 版本声明提升至 0.2.2-rc.3，运行时代码未变。
- Support DSH 0.2.2-rc.3: raise the minimum Harness declaration to 0.2.2-rc.3; runtime code is unchanged.

## 0.9.12 (2026-11-08)

- 推荐目录加入 Joho no Todai 的官网英文 RSS，仅登记名称与官方链接；默认不订阅、不抓取文章。明确免费、非独家、可申请移除的出版者收录条件，目录不授予文章或图片的额外使用权（#4）。
- List the official English Joho no Todai feed as metadata only, without automatic subscription. Document free, non-exclusive listing/removal terms and the separation between catalog metadata and content rights.

## 0.9.11 (2026-11-06)

- 订阅工作台改用 DSH 官方认证接口，修复新版桌面端移除 Origin 后点击「订阅」被拒绝的问题。
- 保留旧接口的本机与来源校验，并在新接口保留请求标记、跨站拦截、JSON / 大小限制、并发版本检查和取消。
- Use the authenticated DSH connection for subscription operations when Desktop strips Origin; retain legacy local guards and request, body, revision and cancellation checks.

## 0.9.10 (2026-11-04)

- 同步共享界面：嵌入设置时继承宿主底色，输入框跟随主题，空状态保持可读宽度；新版 DSH 可显示插件设置图标。
- Align embedded surfaces, themed inputs, readable empty states and optional native settings icons.
- 允许带专用请求标记的 DSH 桌面来源保存订阅；继续拒绝伪造来源。
- Accept marked DSH desktop-origin subscription writes while rejecting lookalike origins.


## 0.9.9 (2026-11-03)

- 推荐目录筛空可一键清空；rss_health 对失败/空订阅给出下一步；使用说明补齐排错。
- The recommendation catalog can clear empty filters in one click; rss_health gives next steps for failures and empty subscriptions; troubleshooting docs added.
- 同步共享 workbench-ui v1.1：Page 外的 Empty / Dialog / Status 自带样式与 `.dshw` 主题作用域，Status 新增 warn 色调。
- Sync workbench-ui v1.1: Empty / Dialog / Status now carry their own styles and `.dshw` theme scope outside Page, and Status gains a warn tone.

## 0.9.8 (2026-10-30)

- 重整中英文首页：用途、三步流程图、安装入口与操作示例；详细配置与边界集中到完整说明。
- 保留下载统计、独立更新选择、问题反馈和贡献入口；原封面与运行功能保留。
- Refresh bilingual landing pages, workflow artwork, quick starts and reference navigation.


## 0.9.7 (2026-10-30)

- 原生插件列表与详情新增专门生成的鲸鱼娘图标：大头像、独立功能符号、透明留白，适合 30 / 36 px 显示；原封面保留。
- Add purpose-made whale-girl artwork with a distinct function emblem, transparent padding and small-size readability; preserve the original cover.


## 0.9.6 (2026-10-29)

- 补齐中英文使用流程：准备、入口、具体操作与结果核对；新增累计 npm 下载徽章并保留月统计。
- Add practical getting-started workflows and lifetime npm download badges alongside monthly counts.

## 0.9.5 (2026-10-29)

- 同步仓库与 npm 的简明介绍、中英文 README 和反馈入口；本次为文档与包元数据更新。
- Sync npm descriptions and both README guides with the repository, including issue and pull-request links.

## 0.9.4 (2026-10-28)

- OPML 导出文件正确处理 never/未知审批策略，提示切换模式或由用户显式配置；保留宿主拒绝。仅返回 OPML 内容不增加写确认。

## 0.9.3 (2026-10-27)

- 修复分批更新时的新旧更新控件混用：保留原页面、草稿与安装保护，空闲后接管旧控制器，兼容旧入口。

## 0.9.2 (2026-10-27)

- 更新控件移至原有工作台或原生插件详情页底部；更新记录与选项原地展开，移除独立更新菜单与页面。
- 保留原页面操作与草稿，自动安装默认关闭；安装前确认，遇到未保存修改或运行任务时暂停。

## 0.9.1 (2026-10-27)

- Keep this component's own update entry visible when installed transitively through Suite. Confirm whole-Suite update scope before opening its controls.
- Keep automatic installation off by default and preserve independent installation behavior.

## 0.9.0 (2026-10-26)

- Add this plugin’s own update controls and independent preferences. Automatic installation stays off until explicitly enabled.
- Confirm manual installs, preserve local sources and disabled state, pause for tasks or unsaved changes, and use native DSH recovery without forced restarts.
- Require the public DSH 0.2.1-rc.3 update APIs; Suite components remain managed through Suite.

## 0.8.0（2026-10-25）

- RSS 主工作台，订阅与目录分区、来源详情与分类清楚展示；保存的来源可主动预览最多五篇文章。
- 提供 DSH 原生侧栏入口，保留设置页；统一中英、深浅色、窄屏、键盘焦点与真实空/失败状态。
- 浏览器源码移至 templates/client.js、templates/panels/ 与共享组件，独立构建为 lib/client.js；移除重复的首次引导。
- 官方 DSH 0.2.1-rc.3 Web 逐项实际操作验收，账户模拟和未验收范围见 [工作台说明](docs/WORKBENCH.md)。

## 0.7.1（2026-10-25）

- 修复 #3：RSS / Atom 摘要、正文和订阅描述含大量不闭合的尖括号时，文本清理不再反复扫描剩余内容，避免阻塞 DSH 的其他请求。
- 保留普通 HTML 的文本抽取、实体解码和内容长度上限，增加有独立进程超时保护的回归检查。

## 0.7.0（2026-10-17）

- 设置面板顶部新增「首次使用」分步引导：一次只讲一步，支持上一步/下一步/跳过，看完记在本机不再出现。
- 引导内容与该插件的实际用法一致；可在开发者工具里清掉 `dsh-first-run:dsh-rss:v1` 重新查看。
## 0.6.3 (2026-10-17)

- 修复英文窄窗口中 RSS 标题截断；设置导航改为顶部换行排列，给订阅列表保留可读宽度。样式仅在 RSS 面板打开时生效。
- 在官方 DSH 0.2.1-alpha.5 中检查来源目录、分类、OPML 预览导入与导出、编辑订阅和中英文布局。

## 0.6.2 (2026-10-15)

- 加固直连、HTTP CONNECT 与 TLS 握手的套接字错误隔离，抓取结束会销毁本次请求仍持有的连接，避免错误在请求结束后逃逸。
- 更新 Undici 至 8.12.1；新增独立进程的直连失败、代理 TLS 失败和超时取消回归检查。

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

[历史英文记录](docs/CHANGELOG.en.md)

## 0.6.1 (2026-10-05)

- 增量抓取只消费本次返回的条目，剩余条目可继续分页；并发抓取串行合并游标，避免覆盖其他订阅进度。OPML 限制大小与嵌套深度。

## 0.6.0 (2026-10-04)

- 新增推荐订阅目录：16 个网站原生 RSS/Atom，提供五类主题、关键词与内容语言筛选、近期文章预览、可用性检查和「已订阅」状态。浏览目录不会自动订阅或抓取全部来源。
- 保留「输入地址」和 OPML 导入入口；分类可选择或自定义，已有名称和分类原样保留。预览与订阅共用原来的网络保护与订阅存储。
- 本次真实网络读取通过 16 个来源；可用性仍取决于各用户网络。有效但暂时空的来源会明确解释；失败时保留输入。
- 验收范围见 [0.6.0 推荐源检查](docs/validation-0.6.0.md)。

## 0.5.2 (2026-10-03)

- 修复语言切换时菜单滞后一轮；订阅检查、OPML 跳过原因与后台错误引导支持英文，订阅名称和文章保留原文。
- 验收范围见 [中英文界面检查](docs/validation-language-2026-10-03.md)。

## 0.5.1 (2026-10-02)

修复 VPN 开启 Fake-IP 后外部订阅源被拦截的问题。Windows 默认沿用已启用的手动系统代理；检测到 `198.18.0.0/15` 时，通过 HTTPS DNS 查询真实公网地址，再固定连接地址并保留原域名和 TLS 证书校验。VPN 可以保持开启，无需修改代理软件配置或放开内网访问。抓取、跳转或读取结束后释放本次请求的连接。

106 项 Windows 测试通过；在 VPN 开启、原生 DNS 返回 Fake-IP 的环境中，少数派、Python Insider、NASA 和 GitHub Atom 的检查、添加、抓取、持久化增量去重与搜索通过正常插件调用验证，没有注入测试 DNS 或抓取结果。Python 旧订阅地址也仍可读取。桌面原生窗口的单独验收不包含在这些结果中。

## 0.5.0 (2026-10-02)

新增 **设置 → RSS 订阅** 面板：添加、编辑、移除、搜索、分类筛选、检查可用性与 OPML 导入导出。面板与对话工具共用原有订阅列表，不需要迁移数据。跟随 DSH 的中文/英文和外观设置。

OPML 导入先预览新增、重复和无效项，再确认保存。默认保留重复订阅的名称和分类；勾选更新时会展示变化。保存失败或预览过期时保留输入。移除订阅需要确认具体名称和地址。

同时修复损坏 XML 被部分导入、无效/含密码 URL 被接受，以及并发添加覆盖另一笔订阅的问题。检查记录只保留在本次 DSH 运行中，导入不会自动抓取全部订阅。

94 项 Windows 测试通过；在官方 Harness `0.2.0-rc.2` 中实际操作了添加、编辑、筛选、检查、导入、移除、Tab/Enter/Esc、双页面冲突和重启持久化。桌面原生窗口与窄屏交互本轮未完成验收，外部生产订阅未替代为本地模拟测试。

## 0.4.3 (2026-10-01)

修复订阅 URL 的大小写比较：添加、删除、OPML 导入与搜索统一归一化协议、域名和默认端口，保留路径和查询参数的大小写，避免合并或删除不同订阅源。保留此前的代理 Fake-IP DNS 提示和保留地址检查。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-rss/commits/master)。
