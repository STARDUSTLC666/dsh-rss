// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h('style', null, styles),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'w-empty' }, h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);background:var(--w-bg);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name }));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && row.enabled);
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 2 };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if (record.uiRevision !== 2 && !record.migration) {
    // The first loaded participant may still own a pre-footer client. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    record.migration = Promise.resolve().then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 2; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发布信息已变化，本次未安装。请重新检查。', 'Release metadata changed. Nothing was installed; check again.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  function jobLabel(job) {
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  function FooterFrame({ name, label, subtitle, actions, children }) {
    return h('section', { className: 'dshw plugin-updates-footer', 'data-plugin-update-footer': name, 'aria-label': label + t(' · 版本与更新', ' · Version and updates') },
      h('style', null, W.styles),
      h('style', null, '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:28px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l3,#e5e7eb);min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px}.plugin-updates-footer h2{font-size:14px;line-height:22px;margin:0;font-weight:600}.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere;margin:4px 0}.plugin-updates-footer .updates-options{margin-top:12px}.plugin-updates-footer .updates-options>summary{cursor:pointer;font-size:12px;line-height:22px;color:var(--dsw-alias-label-secondary,#657080)}.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:4px}.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;padding:14px 0 0}.plugin-updates-footer .updates-note{margin:5px 0 0;font-size:12px;line-height:1.6}.plugin-updates-footer>.w-section{margin:10px 0 0;padding:0;border:0}.plugin-updates-footer .w-toolbar{margin-top:10px!important}.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}.plugin-updates-footer .w-switch-track{flex-shrink:0}.plugin-updates-footer .updates-notes{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:10px}.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:240px;overflow:auto;font:12px/1.7 ui-monospace,monospace}.plugin-updates-footer .w-overlay{z-index:1002}@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}'),
      h('div', { className: 'updates-head' }, h('div', null, h('h2', null, t('版本与更新', 'Version and updates')), h('p', { className: 'updates-subtitle w-muted' }, subtitle)), actions), children);
  }
  function Panel({ name }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false);
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function install() {
      setDialog(null); manualOperation = true; notify();
      await perform(async () => {
        try {
          await heartbeat();
          const started = await api({ action: 'install', name: row.name, version: row.release.version, confirmation: 'update-installed-plugin' });
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
        } finally { manualOperation = false; notify(); }
      });
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (!snapshot || !row) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state), pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy), installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const status = row.sourceKind !== 'registry' ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查官方插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : row.release && !row.release.compatible ? t('新版本暂不兼容当前环境', 'Latest release is incompatible with this environment') : row.available ? (prefs.ignoredVersion === row.release.version ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有新版本', 'Update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet');
    return h(FooterFrame, { name, label: title, subtitle: original.name + ' · ' + original.version, actions: h(W.Button, { icon: 'refresh', disabled: checkingThis || row.sourceKind !== 'registry', onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : target === '@stardustlc/dsh-suite' ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates')) },
      original.bundledBy && h(W.Status, null, t('此插件随 Suite 安装。以下设置与安装作用于 Suite 整包，以保持组件版本一致。单独安装的插件可以独立更新。', 'This plugin was installed through Suite. These controls update Suite as a package so its components stay consistent. Independently installed plugins update individually.')),
      h('section', { className: 'w-section' }, (original.bundledBy || row.available) && h('p', { className: 'updates-version' }, target + ' · ' + row.version, row.release?.version && row.release.version !== row.version ? ' → ' + row.release.version : ''), h('p', { className: 'w-muted updates-note' }, status), !row.enabled && h('p', { className: 'w-muted' }, t('当前已停用，更新后仍保持停用。', 'Currently disabled; it will remain disabled after updating.')), row.checkedAt && h('p', { className: 'w-muted updates-note' }, t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN')),
        h('div', { className: 'w-toolbar' }, row.available && row.sourceKind === 'registry' && h(W.Button, { variant: 'primary', icon: 'download', disabled: installLocked || row.loadError, onClick: () => setDialog('install') }, target === '@stardustlc/dsh-suite' ? t('更新 Suite 整包', 'Update whole Suite') : t('更新此插件', 'Update this plugin')), row.release && h(W.Button, { variant: 'ghost', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')), row.available && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')), row.available && prefs.ignoredVersion !== row.release.version && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')))),
      notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') }, h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')), loadingNotes ? h('p', null, t('正在读取…', 'Loading…')) : notes?.text ? h('pre', null, notes.text) : h('p', null, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')), notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog'))),
      h('details', { className: 'updates-options' }, h('summary', null, t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? t('自动安装：开', 'Install: on') : t('自动安装：关', 'Install: off')), h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每天最多一次。只影响这个插件，关闭后仍可手动检查。', 'On by default, at most once daily. This affects only this plugin; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: t('空闲时自动安装这个插件的补丁', 'Install patches for this plugin while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => event.target.checked ? setDialog('automatic') : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅空闲且没有未保存修改时安装兼容补丁。其他插件的开关不变。', 'Off by default. Explicitly enable compatible patches while idle with no unsaved changes. Other plugins’ settings stay unchanged.'))))),
      error && h(W.Status, { tone: 'error' }, message(error)), snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有更新等待手动重启后生效。你可以继续工作，自动安装已暂停。', 'Some updates need a manual restart. Continue your work; automatic installation is paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      snapshot.pages.clients.some(client => !client.fresh) && h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows'))),
      (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')), (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      prefs.deferredUntil > Date.now() && h(W.Status, null, t('此插件已推迟提醒和自动安装 24 小时，仍可手动更新。', 'Reminders and automatic installation for this plugin are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      job && h('section', { className: 'w-section', 'aria-label': t('这个插件的更新进度', 'Update progress for this plugin') }, h('h3', null, jobLabel(job)), h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁更新', ' · Automatic patch') : '')), (job.reason || job.outcome?.result?.error?.code) && h(W.Status, { tone: 'error' }, message(job.reason || job.outcome.result.error.code)), activeJob() && h(W.Button, { disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')), h('p', { className: 'w-muted updates-note' }, t('安装开始后，取消由官方包管理器处理；已落盘的写入以实际结果或恢复状态为准。', 'After installation starts, the native package manager handles cancellation. Completed writes and recovery are reported as they occur.'))),
      dialog && h(W.Dialog, { title: dialog === 'windows' ? t('断开的窗口都已关闭？', 'Are the disconnected windows closed?') : dialog === 'automatic' ? t('允许这个插件自动安装补丁？', 'Allow automatic patches for this plugin?') : t('确认更新此插件', 'Confirm this plugin update'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
        target === '@stardustlc/dsh-suite' && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        dialog === 'windows' ? h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))) :
        dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), h('p', null, t('你正在主动启用这个插件的自动安装。只处理兼容的稳定补丁；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for this plugin. Only compatible stable patches qualify; running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('不会自动重启 DSH，其他插件不会跟着开启。可随时关闭。', 'DSH will not restart automatically, and other plugins will not be enabled for automatic updates. Turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true }, 'enable-idle-patch-updates')); } }, t('允许此插件自动安装补丁', 'Allow patches for this plugin')))) :
        h('div', { className: 'w-stack' }, h('p', { className: 'updates-version' }, target + ': ' + row.version + ' → ' + row.release.version), h('p', null, t('通过 DSH 官方插件管理器安装。需要重启时，由你手动决定时间；停用状态会保留。', 'Install through DSH’s native plugin manager. Choose when to restart if needed; disabled status is preserved.')), h('p', { className: 'w-muted' }, t('来源：npm 官方 registry，网络不可达时回退 npmmirror。安装前再次核对版本与完整性。', 'Source: official npm registry, with npmmirror fallback if unreachable. Version and integrity are checked again before installation.')), (ownPage.dirty || snapshot.pages.dirty) && h(W.Status, null, message('page-dirty')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: install }, t('确认安装此版本', 'Install this version')))))
    );
  }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name }) : null;
  }
  function Reminder() {
    useSnapshot();
    const row = state?.rows.find(row => { const prefs = preferences(row.name); return row.available && !row.updating && !row.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release.version && !notified.has(row.name + '@' + row.release.version); });
    if (!row && !legacyHint) return null;
    let Toast; try { Toast = require('@deepseek-ai/dsh-client-ui-primitives').Toast; } catch { return null; }
    if (!Toast) return null;
    const hint = legacyHint, key = hint ? 'legacy-' + hint : row.name + '@' + row.release.version;
    return h(Toast, { key, text: hint ? hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.') : (language() === 'en' ? row.labelEn : row.label) + t('有新版本，可在页面底部查看。', ' has an update. Review it at the bottom of its page.'), icon: h(W.Icon, { name: 'refresh', size: 18 }), holdMs: 7000, onDone: () => { if (hint) legacyHint = null; else notified.add(key); notify(); } });
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'stardustlc.plugin-update-reminder' }, Reminder));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: Panel, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
// Generated from templates/client.js, templates/panels/ and templates/workbench-ui.js. Edit the sources.
(function () {
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h('style', null, styles),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'w-empty' }, h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);background:var(--w-bg);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, register, styles };
}

// Editable browser entry. Build with node scripts/build-client.mjs.
window.__ModuleLoader__.load(__stardustUpdatesWrap({ id: 'dsh-rss', factory: require => {
        const React = require('react');
        const W = createWorkbenchUI(React);
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
            if (language !== 'en' || !/[\u3400-\u9fff]/.test(message || ''))
                return message;
            if (['conflict', 'duplicate', 'readonly', 'bodyLarge', 'session'].includes(code))
                return t(code);
            if (/HTTP/.test(message))
                return 'Feed request failed. Check the URL, connection and proxy settings, then retry.';
            if (/YAML|feedsYaml/.test(message))
                return 'The feed configuration is invalid. Fix the feedsYaml list in settings before retrying.';
            if (/OPML|outline|xmlUrl/.test(message))
                return 'The OPML content is invalid. Export it again with xmlUrl attributes on feed outlines.';
            if (/地址|URL|url|http|https|协议/.test(message))
                return 'Enter a valid HTTP or HTTPS feed URL. Local and private-network addresses are not allowed.';
            if (/写入|只读/.test(message))
                return 'Could not save the feed configuration. Check write access and reload the list before retrying; your input is preserved.';
            if (/未找到|找不到|没有找到/.test(message))
                return 'No matching feed was found. Refresh the subscription list.';
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
            try {
                value = await response.json();
            }
            catch {
                throw new Error(response.status === 401 ? t('session') : t('loadError'));
            }
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
                    if (event.nativeEvent.isComposing)
                        return;
                    if (event.key === 'Escape') {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!busy)
                            onClose();
                    }
                    if (event.key === 'Tab') {
                        event.stopPropagation();
                        const targets = [...event.currentTarget.querySelectorAll('input:not([disabled]),textarea:not([disabled]),select:not([disabled]),button:not([disabled]),a[href],summary')].filter(node => node.getClientRects().length);
                        const first = targets[0], last = targets[targets.length - 1];
                        if (event.shiftKey && document.activeElement === first) {
                            event.preventDefault();
                            last?.focus();
                        }
                        else if (!event.shiftKey && document.activeElement === last) {
                            event.preventDefault();
                            first?.focus();
                        }
                    }
                },
                onCancel: event => { event.preventDefault(); event.stopPropagation(); if (!busy)
                    onClose(); } }, h('h3', { id }, title), children);
        }
        function Panel({workbench=false}={}) {
const [activeTab,setActiveTab] = useState('feeds');
function exportFeeds(){return run('export',{},value=>{const url=URL.createObjectURL(new Blob([value.opml],{type:'text/x-opml;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='rss-subscriptions.opml';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);setNotice(t('downloaded'));});}
            const [, setLanguage] = useState(language);
            const [state, setState] = useState(null), [loading, setLoading] = useState(true), [busy, setBusy] = useState('');
            const [error, setError] = useState(''), [notice, setNotice] = useState(''), [query, setQuery] = useState(''), [category, setCategory] = useState('*');
            const [modal, setModal] = useState(null), [draft, setDraft] = useState({ url: '', name: '', category: '' });
            const [opml, setOpml] = useState(''), [updateExisting, setUpdateExisting] = useState(false), [preview, setPreview] = useState(null);
            const [catalogQuery, setCatalogQuery] = useState(''), [catalogCategory, setCatalogCategory] = useState('*'), [catalogLanguage, setCatalogLanguage] = useState('*');
            const [sourcePreviews, setSourcePreviews] = useState({}), [selectedSource, setSelectedSource] = useState('');
            const categoryListId = useId();
            const controller = useRef(null), trigger = useRef(null);
// Update protection: dsh-rss
__stardustUpdatesGuard(React, "dsh-rss", { dirty: !!opml.trim(), busy: !!busy || !!modal });

            useEffect(() => { listeners.add(setLanguage); return () => listeners.delete(setLanguage); }, []);
            useEffect(() => { void run(null); return () => controller.current?.abort(); }, []);
            async function run(action, args = {}, onSuccess) {
                if (controller.current)
                    return;
                const abort = new AbortController();
                controller.current = abort;
                setBusy(action === 'check' && args.id ? args.id : action || 'load');
                setError('');
                setNotice('');
                try {
                    const value = await request(action, args, abort.signal);
abort.signal.throwIfAborted();
                    if (value.snapshot)
                        setState(value.snapshot);
                    if (onSuccess)
                        onSuccess(value);
                    return value;
                }
                catch (failure) {
                    if (!abort.signal.aborted) {
                        if (failure.snapshot)
                            setState(failure.snapshot);
                        setError(failure.message || t('loadError'));
                    }
                }
                finally {
                    if (!abort.signal.aborted) {
                        setBusy('');
                        setLoading(false);
                    }
                    controller.current = null;
                }
            }
            function close() { if(!modal && activeTab === 'transfer') setActiveTab('feeds'); setModal(null); setError(''); setPreview(null); queueMicrotask(() => trigger.current?.focus()); }
            function open(type, feed, event) {
                trigger.current = event.currentTarget;
                setError('');
                setNotice('');
                setPreview(null);
                if (type === 'feed')
                    setDraft(feed ? { url: feed.url, name: feed.name, category: feed.category } : { url: '', name: '', category: '' });
                if (type === 'import') {
                    setOpml('');
                    setUpdateExisting(false);
                }
                if (type === 'catalog') {
                    setCatalogQuery('');
                    setCatalogCategory('*');
                    setCatalogLanguage('*');
                    setSelectedSource('');
                }
                setModal({ type, feed });
            }
            async function chooseFile(event) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file)
                    return;
                if (file.size > 1024 * 1024) {
                    setError(t('bodyLarge'));
                    return;
                }
                try {
                    setOpml(await file.text());
                    setPreview(null);
                    setError('');
                }
                catch {
                    setError(t('fileError'));
                }
            }
            const field = (key, hint) => h('label', { key }, t(key), h('input', {
                name: key, type: key === 'url' ? 'url' : 'text', value: draft[key], placeholder: hint, required: key === 'url', disabled: !!busy,
                list: key === 'category' ? categoryListId : undefined,
                autoFocus: key === 'url', onChange: event => setDraft({ ...draft, [key]: event.target.value }),
            }));
            const buttons = submit => h('div', { className: 'dshr-buttons' }, h('button', { type: 'button', disabled: !!busy, onClick: close }, t('cancel')), submit);
            const alert = error ? h('div', { role: 'alert', className: 'dshr-alert' }, error) : null;
            const feeds = state?.feeds || [], writable = state?.writable === true;
            const categories = [...new Set(feeds.map(feed => feed.category))].sort();
            const catalog = state?.catalog || { categories: [], sources: [] };
            const sourceCategory = source => localized(catalog.categories.find(category => category.id === source.category)?.name);
            const sourceOptions = catalog.sources.filter(source => (catalogCategory === '*' || source.category === catalogCategory) &&
                (catalogLanguage === '*' || source.language === catalogLanguage) &&
                (source.name + ' ' + source.url + ' ' + (source.description || []).join(' ')).toLowerCase().includes(catalogQuery.trim().toLowerCase()));
            const filtered = feeds.filter(feed => (category === '*' || feed.category === category) && (feed.name + ' ' + feed.url).toLowerCase().includes(query.trim().toLowerCase()));
            return __stardustUpdatesInlinePage(React,h(W.Page,{workbench,title:t('title'),subtitle:rssText('选择可信来源，先预览再订阅。','Choose trusted sources. Preview before subscribing.'),className:'dshr rss-workbench',actions:h(React.Fragment,null,
 h(W.Button,{icon:'plus',variant:'primary',disabled:!writable || !!busy,onClick:event=>open('feed',null,event)},t('add')),
 h(W.Button,{icon:'rss',disabled:!state || !!busy,onClick:()=>setActiveTab('catalog')},t('recommended')))},
 h('style',null,RSS_WORKBENCH_CSS),
 state && !writable ? h(W.Status,null,t('readonly')) : null,
 !modal ? h(W.Status,{tone:'error'},error) : null,h(W.Status,{tone:'success'},notice),
 h(W.Tabs,{label:rssText('RSS 视图','RSS views'),value:activeTab,onChange:setActiveTab,items:[{id:'feeds',label:rssText('我的订阅','My feeds')},{id:'catalog',label:t('recommended')},{id:'transfer',label:rssText('导入与导出','Import and export')}]},
 loading ? h(W.Empty,{title:t('loading'),icon:'rss'}) : !state ? h(W.Empty,{title:t('loadError'),action:h(W.Button,{disabled:!!busy,onClick:()=>run(null)},t('retry'))}) :
 activeTab === 'feeds' ? h(RssFeedBrowser,{feeds,filtered,categories,query,setQuery,category,setCategory,writable,busy,run,open}) :
 activeTab === 'catalog' ? h(RssCatalog,{catalog,sources:sourceOptions,query:catalogQuery,setQuery:setCatalogQuery,category:catalogCategory,setCategory:setCatalogCategory,contentLanguage:catalogLanguage,setContentLanguage:setCatalogLanguage,busy,writable,state,run,previews:sourcePreviews,setPreviews:setSourcePreviews,setNotice}) :
 h('div',{className:'rss-transfer'},h('div',{className:'w-toolbar'},h('h3',null,rssText('订阅备份与迁移','Back up and move subscriptions')),h(W.Button,{icon:'download',disabled:!state || !!busy,onClick:exportFeeds},t('export'))),h('p',{className:'w-muted'},t('preserve')),h('form', { onSubmit: event => { event.preventDefault(); void run('preview', { opml, updateExisting }, value => setPreview(value.preview)); } }, h('p', { className: 'dshr-muted' }, t('importHint')), h('label', null, t('file'), h('input', { type: 'file', accept: '.opml,.xml,text/xml,application/xml,text/x-opml', disabled: !!busy, onChange: chooseFile })), h('label', null, t('opml'), h('textarea', { required: true, autoFocus: true, value: opml, disabled: !!busy, onChange: event => { setOpml(event.target.value); setPreview(null); } })), h('label', { className: 'dshr-checkbox' }, h('input', { type: 'checkbox', checked: updateExisting, disabled: !!busy, onChange: event => { setUpdateExisting(event.target.checked); setPreview(null); } }), t('update')), h('p', { className: 'dshr-muted' }, t('preserve')), preview ? h('div', { className: 'dshr-preview', role: 'status' }, h('strong', null, `${t('new')} ${preview.addedCount} · ${t('duplicates')} ${preview.existedCount} · ${t('invalid')} ${preview.skippedCount}`), !preview.addedCount && !preview.existedCount ? h('p', null, t('previewEmpty')) : null, h('ul', null, preview.added.slice(0, 20).map(feed => h('li', { key: feed.url }, t('new'), '：', feed.name || feed.url, ' · ', feed.category || t('uncategorized'))), (preview.duplicates || []).slice(0, 20).map((item, index) => h('li', { key: 'duplicate-' + index }, t('duplicates'), '：', item.before.name || item.url, ' · ', item.before.category || t('uncategorized'), updateExisting ? ' → ' + (item.after.name || item.url) + ' · ' + (item.after.category || t('uncategorized')) : ' · ' + t('keep'))), preview.skipped.slice(0, 20).map((item, index) => h('li', { key: index }, item.title, ' · ', item.url, language === 'en' ? ': ' : '：', feedError(item.reason)))), preview.added.length > 20 || preview.skipped.length > 20 || (preview.duplicates || []).length > 20 ? h('p', { className: 'dshr-muted' }, t('previewLimit')) : null) : null, h('div', { className: 'dshr-buttons' }, h('button', { type: 'button', disabled: !!busy, onClick: close }, t('cancel')), h('button', { type: 'submit', disabled: !!busy || !opml.trim() }, t(busy === 'preview' ? 'saving' : 'preview')), preview ? h('button', { type: 'button', className: 'primary', disabled: !!busy || !(preview.addedCount || updateExisting && preview.existedCount), onClick: () => run('import', { opml, updateExisting, revision: preview.revision, token: preview.token }, value => {
                                close();
                                setNotice(`${t('imported')} · ${t('new')} ${value.result.addedCount} · ${t('duplicates')} ${value.result.existedCount} · ${t('invalid')} ${value.result.skippedCount}`);
                            }) }, t(busy === 'import' ? 'saving' : 'confirm')) : null)))),
 modal ? h(Dialog,{title:modal.type === 'remove' ? t('deleteTitle') : modal.feed ? t('edit') : t('add'),busy:!!busy,onClose:close},alert,modal.type === 'feed' ? h('form', { onSubmit: event => { event.preventDefault(); void run(modal.feed ? 'edit' : 'add', { ...draft, id: modal.feed?.id, revision: state.revision }, () => { close(); setNotice(t('saved')); }); } }, field('url', 'https://example.com/feed.xml'), field('name', t('nameHint')), field('category', t('categoryHint')), h('datalist', { id: categoryListId }, [...new Set([...categories, ...catalog.categories.map(category => localized(category.name))])].filter(Boolean).map(value => h('option', { key: value, value }))), h('p', { className: 'dshr-muted' }, t('customCategory')), error ? h('button', { type: 'button', disabled: !!busy, onClick: () => run(null) }, t('refresh')) : null, buttons(h('button', { type: 'submit', className: 'primary', disabled: !!busy }, t(busy ? 'saving' : 'save')))) : h('div', null, h('strong', null, modal.feed.name || modal.feed.url), h('p', { className: 'dshr-url' }, modal.feed.url), h('p', null, t('deleteHint')), buttons(h('button', { className: 'danger', disabled: !!busy, onClick: () => run('remove', { id: modal.feed.id, revision: state.revision }, () => { close(); setNotice(t('removed')); }) }, t(busy ? 'saving' : 'remove'))))) : null),"dsh-rss");
        }
        function apply(ctx) {
W.register(ctx,{id:'dsh-rss.workbench',label:()=>t('title'),icon:'rss',component:Panel,order:56});

            ctx.effect(() => {
                const service = ctx.get ? ctx.get('locale') : ctx.locale;
                const update = () => { language = String(service?.getSnapshot?.().active || 'zh').startsWith('en') ? 'en' : 'zh'; for (const notify of listeners)
                    notify(language); };
                update();
                return service?.subscribe?.(update) || (() => { });
            }, 'dsh-rss: locale');
            ctx.effect(() => {
                const style = document.createElement('style');
                style.dataset.pluginCss = 'dsh-rss/client';
                style.textContent = CSS;
                document.head.appendChild(style);
                return () => style.remove();
            }, 'dsh-rss: styles');
            ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-rss', order: 55, label: () => {
                    let lang = language;
                    try {
                        const service = ctx.get ? ctx.get('locale') : ctx.locale;
                        if (service?.getSnapshot)
                            lang = String(service.getSnapshot().active || '').startsWith('en') ? 'en' : 'zh';
                    }
                    catch { }
                    return words.title[lang === 'en' ? 1 : 0];
                }, inject: () => ({}) }, Panel));
        }
        return { apply, inject: ['slots', 'locale'] };
    } },{"name":"dsh-rss","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.9.8","label":"RSS 订阅","labelEn":"RSS","suiteComponent":true}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
