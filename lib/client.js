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
      h(Styles, { key: 'styles' }),
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
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
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
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
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
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
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
function __stardustUpdatesFooter(React, name) {
  return React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, __stardustUpdatesFooter(React, name));
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
  const suiteUpdating = next.job?.name === '@stardustlc/dsh-suite' && ['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state);
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && (row.enabled || suiteUpdating));
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
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
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
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 8, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < 8 && !record.upgrading) {
    // An earlier loaded participant may still own an older client revision. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 8; pools.set(root, shared);
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
  const { useState, useEffect, useRef } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const REPOS = { 'dsh-calendar': 'dsh-calendar', 'dsh-cite': 'dsh-cite', 'dsh-code-security': 'dsh-code-security', 'dsh-codex-port': 'dsh-codex-port', 'deepseek-computer-use': 'deepseek-computer-use', 'dsh-dingtalk': 'dsh-dingtalk', '@stardustlc/dsh-docker': 'dsh-docker', '@stardustlc/dsh-dream': 'dsh-dream', 'dsh-email': 'dsh-email', 'dsh-ffmpeg': 'dsh-ffmpeg', 'dsh-flakefinder': 'dsh-flakefinder', 'dsh-hyperframes': 'dsh-hyperframes', 'dsh-minimal-ptc': 'dsh-minimal-ptc', 'dsh-ppt': 'dsh-ppt', 'dsh-remotion': 'dsh-remotion', '@stardustlc/dsh-review': 'dsh-review', 'dsh-rss': 'dsh-rss', 'dsh-slack': 'dsh-slack', 'dsh-sql': 'dsh-sql', '@stardustlc/dsh-suite': 'dsh-suite', 'dsh-voice': 'dsh-voice' };
  const repoUrl = pkg => Object.hasOwn(REPOS, pkg) ? 'https://github.com/STARDUSTLC666/' + REPOS[pkg] : null;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, autoScope: 'compatible', deferredUntil: 0, ignoredVersion: null };
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
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer,.plugin-updates-reminder') || node.querySelector('.plugin-updates-footer,.plugin-updates-reminder'))));
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
  const STALE_CHECK_MS = 30 * 60 * 1000, STALE_RETRY_MS = 5 * 60 * 1000, staleChecks = new Map(), staleInFlight = new Set();
  function refreshIfStale(row) {
    if (!alive || !row || row.sourceKind !== 'registry' || row.bundledBy || !row.available || row.updating) return;
    const now = Date.now();
    if (row.checkedAt && now - row.checkedAt <= STALE_CHECK_MS) return;
    if (staleInFlight.has(row.name) || now - (staleChecks.get(row.name) ?? -Infinity) < STALE_RETRY_MS) return;
    staleChecks.set(row.name, now);
    staleInFlight.add(row.name);
    void (async () => {
      try { await api({ action: 'check', name: row.name }); await refresh(); }
      catch { /* Offline or transient errors stay silent and throttled by staleChecks. */ }
      finally { staleInFlight.delete(row.name); }
    })();
  }
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
      'release-changed': t('发现更新的发布版本（或发布信息已更新），已刷新至最新状态，请再次确认安装。', 'A newer release or updated metadata was found and refreshed; confirm again to install.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
      'version-mismatch': t('宿主装入的版本与目标不同。请重新检查版本和软件源策略。', 'The installed version differs from the target. Check the release and registry policy.'),
      'unexpected-package': t('宿主装入的包或版本与目标不同。请检查版本和软件源策略。', 'The installed package or version differed from the target. Check the release and registry policy.'),
      'version-unconfirmed': t('尚未确认新版已加载，请在插件详情中检查当前版本。', 'The new version could not be confirmed. Check the installed version in plugin details.'),
      'build-blocked': t('构建脚本等待批准。请查看原生插件管理中的安装提示。', 'Build scripts await approval. Review the install details in native plugin management.'),
      'bundle-in-use': t('宿主暂时无法热卸载旧版（通常因本轮刚更新过其他共用底层依赖的插件，内存路径待刷新；或同时启用了包含此组件的组合包）：直接手动重启一次 DSH 即可继续更新，无需逐个停用插件。', 'The host cannot hot-unload the previous version right now (usually because another plugin sharing dependencies was updated earlier in this session, or a bundle containing this component is also active): restart DSH once and retry without disabling plugins one by one.'),
      'already-installed': t('该包已在当前配置中，请刷新或重启 DSH 后查看当前版本。', 'This package is already present in the profile; refresh or restart DSH to inspect its version.'),
      'incompatible-version': t('目标版本与当前运行的 DSH 版本不兼容。', 'The target version is incompatible with the running DSH version.'),
      'stop-profile': t('当前配置未启用热重载，需关闭 DSH 后再通过命令行更新。', 'This profile runs without hot reload; stop DSH and update via CLI.'),
      'not-removable': t('此内置或受保护插件不支持在此处移除替换。', 'This built-in or protected bundle cannot be replaced here.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    if (job.state === 'installing') {
      const phase = ({
        checking: t('宿主正在检查版本', 'Host checking release'),
        removing: t('正在卸载旧版', 'Unloading the previous version'),
        applying: t('正在加载新版', 'Loading the new version'),
        restoring: t('正在恢复旧版', 'Restoring the previous version'),
      })[job.phase];
      if (phase) return phase;
    }
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  const FOOTER_CSS = '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:16px;padding-top:14px;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}'
    + '.dshw.plugin-updates-footer.is-inline{display:block!important;width:100%!important;max-width:100%!important;margin-block:auto 0!important;margin-inline:0!important;padding:6px 14px!important;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));background:var(--dsw-alias-bg-layer-1,var(--w-soft,#f7f8fa));font-size:12px;line-height:1.45}'
    + '.plugin-updates-footer .updates-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 12px;min-block-size:28px;min-width:0}'
    + '.plugin-updates-footer .updates-bar-info,.plugin-updates-footer .updates-bar-actions,.plugin-updates-footer .updates-head-actions,.plugin-updates-footer .updates-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;min-width:0}'
    + '.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 12px}'
    + '.plugin-updates-footer .updates-compact-bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px 12px}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options{margin-top:0;min-width:0}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options[open]{flex:1 1 100%}'
    + '.plugin-updates-footer h2{font-size:13.5px;line-height:1.4;margin:0;font-weight:600}'
    + '.plugin-updates-footer .updates-pill{display:inline-flex;align-items:center;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-pill.is-accent{background:color-mix(in srgb,var(--w-accent,#4f6bdb) 14%,transparent);color:var(--w-accent,#4f6bdb)}'
    + '.plugin-updates-footer .updates-pill.is-error{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#ad3636) 14%,transparent);color:var(--dsw-alias-state-error-primary,#ad3636)}'
    + '.plugin-updates-footer .updates-mono,.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere;margin:0}'
    + '.plugin-updates-footer .updates-badge{padding:1px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-meta-line,.plugin-updates-footer .updates-note{margin:3px 0 0;font-size:12px;line-height:1.55}'
    + '.plugin-updates-footer .updates-inline-msg.is-error{color:var(--dsw-alias-state-error-primary,#ad3636);font-size:12px}'
    + '.plugin-updates-footer .w-button.is-sm{min-block-size:26px;min-inline-size:26px;min-height:26px;padding:3px 9px;font-size:12px;gap:5px;border-radius:6px}'
    + '.plugin-updates-footer .updates-options{margin-top:8px}'
    + '.plugin-updates-footer .updates-options>summary{cursor:pointer;display:inline-flex;align-items:center;gap:0.55ch;min-block-size:24px;font-size:12px;line-height:1.5;font-weight:500;color:var(--dsw-alias-label-secondary,#657080);list-style:none}'
    + '.plugin-updates-footer .updates-options>summary:after{display:none}'
    + '.plugin-updates-footer .updates-options>summary::before{content:"";inline-size:6px;block-size:6px;flex-shrink:0;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;rotate:-45deg}'
    + '.plugin-updates-footer .updates-options>summary:dir(rtl)::before{rotate:135deg}'
    + '.plugin-updates-footer .updates-options[open]>summary::before{rotate:45deg}'
    + '.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer details::details-content{interpolate-size:allow-keywords;overflow:clip;contain:layout}'
    + '.plugin-updates-footer details:not([open])::details-content{block-size:0}'
    + '.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;padding:10px 0 2px}'
    + '.plugin-updates-footer>.w-section{margin:8px 0 0;padding:0;border:0}'
    + '.plugin-updates-footer .w-toolbar{margin-top:8px!important}'
    + '.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}'
    + '.plugin-updates-footer .w-switch-track{flex-shrink:0}'
    + '.plugin-updates-footer .updates-notes{margin-top:8px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:8px;background:var(--dsw-alias-bg-base,var(--w-bg,#fff))}'
    + '.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;overflow:auto;margin:6px 0;padding:10px;font:12px/1.65 ui-monospace,monospace}'
    + '.plugin-updates-footer .updates-notes pre code{font:inherit;background:transparent;padding:0}'
    + '.plugin-updates-footer .updates-links{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;margin-top:10px;padding-top:8px;border-top:1px dashed var(--dsw-alias-border-l3,#e5e7eb);font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-links a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;min-block-size:24px;gap:4px}'
    + '.plugin-updates-footer .updates-links a:hover{color:var(--dsw-alias-label-primary,#202124);text-decoration:underline}'
    + '.plugin-updates-footer .updates-links a:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer .w-overlay,.plugin-updates-reminder .w-overlay{z-index:1002}'
    + '.plugin-updates-reminder{position:fixed;inset-inline-end:16px;inset-block-end:16px;z-index:998;box-sizing:border-box;width:min(410px,calc(100vw - 32px));padding:11px 13px;border-radius:10px;border:var(--dsh-control-border-width,1px) solid var(--dsw-alias-border-l2,#d8dee9);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#202124);box-shadow:0 8px 24px rgba(15,23,42,.12);font-size:12px;line-height:1.5}'
    + '.plugin-updates-reminder .reminder-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}'
    + '.plugin-updates-reminder .reminder-title{display:flex;align-items:center;flex-wrap:wrap;gap:6px;min-width:0;font-weight:600;font-size:12.5px}'
    + '.plugin-updates-reminder .reminder-close{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary,#657080);cursor:pointer;padding:2px 5px;border-radius:5px;font-size:14px;line-height:1}'
    + '.plugin-updates-reminder .reminder-close:hover{background:var(--dsw-alias-bg-layer-2,#eef1f6);color:var(--dsw-alias-label-primary,#202124)}'
    + '.plugin-updates-reminder .reminder-actions{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:8px}'
    + '.plugin-updates-reminder .w-button.is-sm{min-block-size:26px;min-inline-size:26px;min-height:26px;padding:3px 9px;font-size:12px;gap:5px;border-radius:6px}'
    + '.plugin-updates-reminder .updates-pill{display:inline-flex;align-items:center;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;background:color-mix(in srgb,var(--w-accent,#4f6bdb) 14%,transparent);color:var(--w-accent,#4f6bdb)}'
    + '.plugin-updates-reminder .updates-pill.is-error{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#ad3636) 14%,transparent);color:var(--dsw-alias-state-error-primary,#ad3636)}'
    + '.plugin-updates-reminder .updates-mono{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere}'
    + '.plugin-updates-reminder .updates-notes{margin-top:8px;padding:8px 10px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:7px;background:var(--dsw-alias-bg-layer-1,#f7f8fa)}'
    + '.plugin-updates-reminder .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:160px;overflow:auto;margin:4px 0;padding:6px;font:11.5px/1.6 ui-monospace,monospace}'
    + '.plugin-updates-footer .updates-auto-nudge,.plugin-updates-reminder .updates-auto-nudge{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:6px;font-size:12px;color:var(--dsw-alias-label-secondary,#657080)}'
    + '@media(pointer:coarse){.plugin-updates-footer .w-button.is-sm{min-block-size:32px;min-height:32px;padding:5px 11px}}'
    + '@media(prefers-reduced-motion:no-preference){.plugin-updates-footer .updates-options>summary::before{transition:rotate .18s ease}.plugin-updates-footer details::details-content{transition:block-size .22s ease,content-visibility .22s ease allow-discrete}}'
    + '@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}';
  function FooterFrame({ name, label, inline = false, supplement = false, head, children }) {
    return h('section', { className: 'dshw plugin-updates-footer' + (inline ? ' is-inline' : ''), 'data-plugin-update-footer': name, 'aria-label': label + (supplement ? t(' · 自动更新与反馈', ' · Auto-update and feedback') : t(' · 版本与更新', ' · Version and updates')) },
      h('style', null, W.styles),
      h('style', null, FOOTER_CSS),
      head, children);
  }
  function Panel({ name, inline = false }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenActiveJob = useRef ? useRef(null) : { current: null };
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    if (job && ['verifying', 'installing', 'cancelling'].includes(job.state)) seenActiveJob.current = job.id;
    const panelStaleTarget = !!snapshot && !!row && !!original && (!inline || (row.sourceKind === 'registry' && row.available && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release?.version));
    useEffect(() => { if (panelStaleTarget && !activeJob()) refreshIfStale(row); }, [panelStaleTarget, row?.name, row?.available, row?.checkedAt]);
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { staleChecks.set(target, Date.now()); await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      setError(''); setWorking(true);
      try {
        try {
          await heartbeat();
          const started = await api(request);
          seenActiveJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
          await refresh();
        } finally { manualOperation = false; notify(); }
      } catch (err) {
        setError(err.message);
        if (request.action === 'install' && ['check-first', 'release-changed'].includes(err?.message)) {
          staleChecks.set(target, Date.now());
          await api({ action: 'check', name: target }).catch(() => {});
        }
        await refresh().catch(() => {});
      } finally { setWorking(false); }
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (inline && (!snapshot || !row || !original)) return null;
    if (!snapshot) return h('p', { className: 'dshw w-muted' }, t('正在读取更新状态…', 'Loading update status…'));
    if (!row || !original) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const staleWindows = (snapshot.pages.clients || []).some(client => !client.fresh);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy);
    const installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known
      || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const managed = row.sourceKind === 'registry';
    const showUpdate = managed && row.available;
    const deferred = prefs.deferredUntil > Date.now();
    const ignored = !!row.release?.version && prefs.ignoredVersion === row.release.version;
    const actionableUpdate = showUpdate && !deferred && !ignored;
    const canConfirm = showUpdate && row.release?.version === selectedVersion && !installLocked && !row.loadError;
    const isSuite = target === '@stardustlc/dsh-suite';
    const jobResult = job?.outcome?.result;
    const jobReason = job ? job.reason || (jobResult?.pendingBuilds || jobResult?.failureKind === 'build-blocked' ? 'build-blocked' : jobResult?.error?.code) : null;
    const jobActiveThis = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canCancel = jobActiveThis && !['applying', 'restoring'].includes(job.phase);
    const jobAttentionThis = !!job && ['restart-required', 'restored', 'restore-failed', 'unknown', 'failed'].includes(job.state) && (unconfirmed || dismissedJobId !== job.id);
    const jobJustCompleted = !!job && job.state === 'complete' && seenActiveJob.current === job.id && dismissedJobId !== job.id;
    const canSuggestAuto = !!job && job.state === 'complete' && !jobReason && job.mode !== 'automatic' && (!prefs.autoInstall || prefs.autoScope !== 'compatible') && managed && !snapshot.preferenceError && dismissedJobId !== job.id;
    const inlineJobVisible = jobActiveThis || jobAttentionThis || jobJustCompleted;
    if (inline && !actionableUpdate && !inlineJobVisible && !working && !checking && !error && !dialog && !notesOpen) return null;
    const notesSection = notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') },
      h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')),
      loadingNotes ? h('p', { className: 'w-muted updates-note' }, t('正在读取…', 'Loading…'))
        : notes?.text ? h('pre', { tabIndex: 0, role: 'region', 'aria-label': t('更新记录内容', 'Release notes content') }, h('code', null, notes.text))
        : h('p', { className: 'w-muted updates-note' }, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')),
      notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog')));
    const windowsDialog = dialog === 'windows' && h(W.Dialog, { title: t('断开的窗口都已关闭？', 'Are the disconnected windows closed?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))));
    const confirmDialog = ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? (isSuite ? t('允许 Suite 空闲时自动热更新？', 'Allow idle automatic updates for Suite?') : t('允许这个插件空闲时自动热更新？', 'Allow idle automatic updates for this plugin?')) : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), isSuite && h('p', null, t('此处设置作用于 Suite 整包（包含 18 个组件）。独立安装的其他插件不受影响。', 'This setting applies to the whole Suite (including its 18 components). Other independently installed plugins are unaffected.')), h('p', null, t('你正在主动启用自动安装。只处理通过当前 DSH 与 Node 兼容性校验的稳定版本（含功能小版本与补丁，跨主版本仍需手动确认）；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for compatible stable releases (minor and patch updates matching this DSH and Node runtime; major upgrades still require manual confirmation). Running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('支持热更新时原地重载，不会自动重启 DSH；其他插件不会跟着开启，可随时关闭。', 'Hot-reloads in place when supported and never restarts DSH automatically. Other plugins remain unchanged; turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true, autoScope: 'compatible' }, 'enable-idle-compatible-updates')); } }, t('允许空闲自动热更新', 'Allow idle automatic updates')))) :
      h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
        h('p', null, selectedVersion === row.release?.version ? t('Harness 会热更新并重新加载；需要手动重启时，更新区会显示宿主结果，停用状态会保留。', 'Harness hot-updates and reloads in place. If a manual restart is needed, it appears in the update result; disabled status is preserved.') : (showUpdate && row.release?.version ? message('release-changed') : message('check-first'))),
        h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          showUpdate && row.release?.version && row.release.version !== selectedVersion
            ? h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: () => { setError(''); setSelectedVersion(row.release.version); } }, t('更新为 v', 'Use v') + row.release.version)
            : h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name: target, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))));
    const checkButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : isSuite ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates'));
    const recheckButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : t('重新检查', 'Check again'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setError(''); if (job && !jobActiveThis && !unconfirmed) setDismissedJobId(job.id); setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('更新 Suite 至 v', 'Update Suite to v') : t('更新至 v', 'Update to v')) + row.release.version)
      : managed ? checkButton() : null;
    if (inline) {
      const lockHint = unconfirmed ? message('operation-unconfirmed')
        : snapshot.updaterRestart ? message('restart-required')
        : snapshot.preferenceError ? message('preferences-unreadable')
        : (snapshot.pages.dirty || ownPage.dirty) ? t('请先保存修改后再更新', 'Save changes before updating')
        : (snapshot.activity.busy || pageBusy) ? t('当前任务或对话框结束后可更新', 'Finish active task or dialog to update')
        : (!snapshot.activity.known || !snapshot.pages.known) ? t('等待窗口状态确认', 'Waiting for window confirmation')
        : '';
      return h(FooterFrame, { name, label: title, inline: true, head: h('div', { className: 'updates-bar' },
        h('div', { className: 'updates-bar-info' },
          inlineJobVisible
            ? h(React.Fragment, null,
              h('span', { className: 'updates-pill' + (jobActiveThis ? ' is-accent' : ['failed', 'restore-failed', 'unknown', 'restored'].includes(job.state) ? ' is-error' : '') }, jobLabel(job)),
              job.to && h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + job.from + ' → ' + job.to),
              jobReason && h('span', { className: 'updates-inline-msg is-error' }, message(jobReason)))
            : actionableUpdate ? h(React.Fragment, null,
              h('span', { className: 'updates-pill is-accent' }, isSuite ? t('Suite 新版本', 'Suite update') : t('有新版本', 'Update available')),
              h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + 'v' + row.version + ' → v' + row.release.version),
              lockHint && h('span', { className: 'w-muted' }, '· ' + lockHint)) : null,
          error && h('span', { className: 'updates-inline-msg is-error', role: 'alert' }, message(error))),
        h('div', { className: 'updates-bar-actions' },
          staleWindows && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDialog('windows') }, t('确认已关闭窗口', 'Confirm closed windows')),
          canCancel && h(W.Button, { className: 'is-sm', disabled: job?.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && error === 'check-first' && managed && recheckButton(actionableUpdate ? 'ghost' : 'primary'),
          !jobActiveThis && actionableUpdate && row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版', 'Ignore')),
          !jobActiveThis && actionableUpdate && primary,
          !jobActiveThis && !actionableUpdate && canSuggestAuto && h(W.Button, { variant: 'primary', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
          !jobActiveThis && !actionableUpdate && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => { setError(''); setNotesOpen(false); if (job) setDismissedJobId(job.id); } }, t('关闭', 'Dismiss')))) },
        notesSection, windowsDialog, confirmDialog);
    }
    function progress() {
      if (!job || (!jobActiveThis && !unconfirmed && dismissedJobId === job.id)) return null;
      if (job.state === 'complete' && !jobReason) {
        return job.to ? h('div', null,
          h('p', { className: 'w-muted updates-note' }, '✓ ' + jobLabel(job) + ' · ' + job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
          canSuggestAuto && h('div', { className: 'updates-auto-nudge' },
            h('span', null, t('以后有兼容新版本时，需要空闲自动热更新吗？', 'Auto-install future compatible updates while idle?')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭', 'Dismiss')))) : null;
      }
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
        job.state === 'restart-required' && jobResult?.restartReason === 'package-moved' && h('p', { className: 'w-muted updates-note' }, t('新版已就绪；因多个独立插件共用底层依赖，请先手动重启一次 DSH 生效后再继续更新其他插件。', 'Installed; because standalone plugins share dependencies, restart DSH once before updating additional plugins.')),
        jobReason && h(W.Status, { tone: 'error' }, message(jobReason)),
        h('div', { className: 'updates-bar-actions', style: { marginTop: '6px' } },
          canCancel && h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭提示', 'Dismiss'))));
    }
    function windowControls() {
      if (!staleWindows) return null;
      return h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { className: 'is-sm', onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows')));
    }
    const incompatibleText = row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : '';
    const optionsSection = h('details', { className: 'updates-options' },
      h('summary', null, !original.bundledBy ? t('自动更新与提醒', 'Auto-update & reminders') : t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? (prefs.autoScope === 'compatible' ? t('空闲自动热更新：兼容版', 'Idle auto-update: compatible') : t('空闲自动热更新：仅补丁', 'Idle auto-update: patches')) : t('空闲自动热更新：关', 'Idle auto-update: off')),
      h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: isSuite ? t('自动检查 Suite 整包更新', 'Automatically check Suite updates') : t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每 6 小时最多一次。只影响这个安装包，关闭后仍可手动检查。', 'On by default, at most every 6 hours. This affects only this bundle; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: isSuite ? t('空闲时自动热更新 Suite 兼容版本', 'Auto-install compatible Suite updates while idle') : t('空闲时自动热更新兼容版本', 'Auto-install compatible updates while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => event.target.checked ? (setError(''), setDialog('automatic')) : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅在空闲且无未保存修改时热更新兼容稳定版（含功能小版本与补丁，不含跨主版本）。其他插件的开关不变。', 'Off by default. Explicitly enable compatible stable updates (minor and patch, excluding major) while idle with no unsaved changes. Other plugins’ settings stay unchanged.')), prefs.autoInstall && prefs.autoScope !== 'compatible' && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('升级为包含兼容功能小版本', 'Include compatible minor updates')))));
    const errorStatus = error && h(W.Status, { tone: 'error' }, error === 'check-first' && managed ? h('div', { className: 'updates-bar-actions' }, h('span', null, message(error)), recheckButton('ghost')) : message(error));
    const linksNav = (() => {
      const ownRepo = repoUrl(original.name), suiteRepo = repoUrl('@stardustlc/dsh-suite'), starRepo = isSuite ? suiteRepo : ownRepo;
      if (!ownRepo && !starRepo) return null;
      return h('nav', { className: 'updates-links', 'aria-label': t('开源仓库与反馈', 'Repository and feedback') },
        starRepo && h('a', { href: starRepo, target: '_blank', rel: 'noreferrer noopener' }, isSuite ? t('★ 觉得好用？在 GitHub 给 dsh-suite 点个 Star', '★ Useful? Star dsh-suite on GitHub') : t('★ 觉得好用？在 GitHub 点个 Star', '★ Useful? Star on GitHub')),
        ownRepo && h('a', { href: ownRepo + '/issues', target: '_blank', rel: 'noreferrer noopener' }, t('提交建议 / 问题反馈', 'Feedback & issues')),
        isSuite && original.name !== '@stardustlc/dsh-suite' && ownRepo && h('a', { href: ownRepo, target: '_blank', rel: 'noreferrer noopener' }, t('组件仓库', 'Component repo')),
        !isSuite && suiteRepo && h('a', { href: suiteRepo, target: '_blank', rel: 'noreferrer noopener' }, t('了解 dsh-suite（18 合 1 组合包）', 'Explore dsh-suite (18-in-1 bundle)')));
    })();
    if (!original.bundledBy) {
      // Native bundle detail pages in DSH already render their own Version & Source sections
      // ("重新检查", version list & "更新" button). Keep only non-duplicative auto-update preferences,
      // inline changelog notes, compatibility/error diagnostics, and GitHub feedback links here.
      return h(FooterFrame, { name, label: title, supplement: true, head: h('div', { className: 'updates-compact-bar' },
        optionsSection,
        (row.release || (showUpdate && (!deferred || !ignored))) && h('div', { className: 'updates-head-actions' },
          row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('推迟提醒 24h', 'Snooze 24h')),
          showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版提醒', 'Mute reminder')))) },
        notesSection,
        incompatibleText && h(W.Status, null, incompatibleText),
        errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
        snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停，建议先重启一次 DSH 再继续更新其他共用依赖的插件。', 'An update awaits a manual restart; idle auto-updates are paused. Restart DSH once before updating other plugins that share dependencies.')),
        prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
        (prefs.autoInstall || jobActiveThis) && windowControls(),
        jobActiveThis && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
        jobActiveThis && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
        deferred && h('p', { className: 'w-muted updates-note' }, t('已推迟此插件的对话页与工作台提醒 24 小时。', 'Chat and workbench reminders for this plugin are snoozed for 24 hours.')),
        unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
        progress(),
        linksNav,
        windowsDialog, confirmDialog
      );
    }
    const status = !managed ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : incompatibleText || (row.available ? (ignored ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet'));
    return h(FooterFrame, { name, label: title, head: h('div', { className: 'updates-head' },
      h('div', null,
        h('div', { className: 'updates-title-row' }, h('h2', null, t('随 Suite 整包管理', 'Managed via Suite bundle')), h('span', { className: 'updates-mono updates-badge' }, original.name + ' · v' + original.version)),
        h('p', { className: 'w-muted updates-meta-line' }, status, row.checkedAt ? ' · ' + t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN') : ''),
        h('p', { className: 'updates-version updates-note' }, target + ' · v' + row.version, row.release?.version && row.release.version !== row.version ? ' → v' + row.release.version : '')),
      h('div', { className: 'updates-head-actions' },
        showUpdate && checkButton('ghost'),
        row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
        showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')),
        primary)) },
      notesSection,
      optionsSection,
      errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停。', 'An update awaits a manual restart; idle auto-updates are paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (showUpdate || jobActiveThis) && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (showUpdate || jobActiveThis) && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      deferred && h(W.Status, null, t('已推迟 Suite 提醒和自动安装 24 小时，仍可手动更新。', 'Suite reminders and automatic installation are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      progress(),
      linksNav,
      windowsDialog, confirmDialog
    );
  }
  function InlineFooter({ name }) { return h(Panel, { name, inline: true }); }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name, inline: false }) : null;
  }
  function Reminder() {
    const snapshot = useSnapshot(), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [error, setError] = useState(''), [dialog, setDialog] = useState(null), [selectedTarget, setSelectedTarget] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenJob = useRef ? useRef(null) : { current: null };
    const footerVisible = [...(document.querySelectorAll?.('[data-plugin-update-footer]') || [])].some(node => node.getClientRects?.().length);
    const job = snapshot?.job && seenJob.current === snapshot.job.id && dismissedJobId !== snapshot.job.id ? snapshot.job : null;
    const yielded = footerVisible && !job && !dialog && !working && !checking && !error && !legacyHint;
    const candidate = yielded ? null : snapshot?.rows?.find(item => {
      const prefs = preferences(item.name);
      return item.sourceKind === 'registry' && item.available && !item.updating && !item.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== item.release?.version && !notified.has(item.name + '@' + item.release?.version);
    });
    const targetName = job?.name || selectedTarget || candidate?.name;
    const row = targetName ? originalRow(targetName) : null;
    useEffect(() => { if (!yielded && row && (candidate || selectedTarget) && !activeJob()) refreshIfStale(row); }, [yielded, row?.name, row?.available, row?.checkedAt, !!candidate, selectedTarget]);
    if (yielded) return null;
    if (!legacyHint && !candidate && !job && !dialog && !(error && row)) return null;
    if (legacyHint && !candidate && !job && !dialog && !(error && row)) {
      const hint = legacyHint;
      return h('aside', { className: 'dshw plugin-updates-reminder', role: 'status', 'aria-live': 'polite' },
        h('style', null, W.styles), h('style', null, FOOTER_CSS),
        h('div', { className: 'reminder-head' },
          h('span', null, hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.')),
          h('button', { type: 'button', className: 'reminder-close', 'aria-label': t('关闭', 'Dismiss'), onClick: () => { legacyHint = null; notify(); } }, '×')));
    }
    if (!row || !snapshot) return null;
    const prefs = preferences(row.name), isSuite = row.name === '@stardustlc/dsh-suite', label = language() === 'en' ? row.labelEn : row.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(c => c.id !== id && c.busy);
    const checkingThis = checking || snapshot.checkingNames?.includes(row.name);
    const installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known || row.loadError;
    const jobResult = job?.outcome?.result;
    const jobReason = job ? job.reason || (jobResult?.pendingBuilds || jobResult?.failureKind === 'build-blocked' ? 'build-blocked' : jobResult?.error?.code) : null;
    const jobRunning = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canSuggestAuto = !!job && job.state === 'complete' && !jobReason && (!prefs.autoInstall || prefs.autoScope !== 'compatible') && !snapshot.preferenceError;
    const key = row.release?.version ? row.name + '@' + row.release.version : null;
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (err) { setError(err.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function checkReminder() { setError(''); setChecking(true); try { staleChecks.set(row.name, Date.now()); await api({ action: 'check', name: row.name }); await refresh(); } catch (err) { setError(err.message); } finally { setChecking(false); } }
    async function runInstall() {
      setDialog(null); manualOperation = true; notify();
      setError(''); setWorking(true);
      try {
        try {
          await heartbeat();
          const started = await api({ action: 'install', name: row.name, version: selectedVersion, confirmation: 'update-installed-plugin' });
          seenJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
          if (key && ['complete', 'restart-required'].includes(state?.job?.state)) notified.add(key);
          await refresh();
        } finally { manualOperation = false; notify(); }
      } catch (err) {
        setError(err.message);
        if (['check-first', 'release-changed'].includes(err?.message)) {
          staleChecks.set(row.name, Date.now());
          await api({ action: 'check', name: row.name }).catch(() => {});
        }
        await refresh().catch(() => {});
      } finally { setWorking(false); }
    }
    async function toggleNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      if (!row.release?.version) return;
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: row.name, version: row.release.version })); } catch (err) { setError(err.message); } finally { setLoadingNotes(false); }
    }
    function dismiss() {
      setError(''); setNotesOpen(false); setDialog(null); setSelectedTarget(null);
      if (key && !jobRunning) notified.add(key);
      if (job) setDismissedJobId(job.id);
      notify();
    }
    const confirmDialog = ['install', 'automatic'].includes(dialog) && h(W.Dialog, {
      title: dialog === 'automatic'
        ? (isSuite ? t('允许 Suite 空闲时自动热更新？', 'Allow idle automatic updates for Suite?') : t('允许这个插件空闲时自动热更新？', 'Allow idle automatic updates for this plugin?'))
        : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')),
      closeLabel: t('关闭', 'Close'),
      onClose: () => setDialog(null),
    }, dialog === 'automatic'
      ? h('div', { className: 'w-stack' },
        h('p', null, label + ' · ' + row.name),
        h('p', null, t('你正在主动启用自动安装。只处理通过当前 DSH 与 Node 兼容性校验的稳定版本（含功能小版本与补丁，跨主版本仍需手动确认）；有任务、未保存修改、未知窗口或等待重启时暂停，随时可关闭。', 'You are explicitly enabling automatic installation for compatible stable releases (minor and patch updates matching this DSH and Node runtime; major upgrades still require manual confirmation). Running tasks, unsaved changes, unknown windows or a pending restart pause it; turn it off anytime.')),
        h('div', { className: 'w-toolbar' },
          h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')),
          h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(async () => { await api({ action: 'preferences', name: row.name, revision: state.preferences.revision, changes: { checkEnabled: true, autoInstall: true, autoScope: 'compatible' }, consent: 'enable-idle-compatible-updates' }); dismiss(); }); } }, t('允许空闲自动热更新', 'Allow idle automatic updates'))))
      : h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-mono' }, row.name + ' · v' + row.version + ' → v' + selectedVersion),
        h('p', null, row.release?.version === selectedVersion ? t('Harness 会原地热更新并重新加载，无需离开当前聊天；若需要手动重启会在此处说明。', 'Harness hot-updates and reloads in place without leaving your chat; if a manual restart is needed, it appears here.') : (row.available && row.release?.version ? message('release-changed') : message('check-first'))),
        h('div', { className: 'w-toolbar' },
          h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          row.available && row.release?.version && row.release.version !== selectedVersion
            ? h(W.Button, { variant: 'primary', disabled: installLocked, onClick: () => { setError(''); setSelectedVersion(row.release.version); } }, t('更新为 v', 'Use v') + row.release.version)
            : h(W.Button, { variant: 'primary', disabled: installLocked || row.release?.version !== selectedVersion, onClick: runInstall }, t('安装此版本', 'Install this version')))));
    return h('aside', { className: 'dshw plugin-updates-reminder', 'data-plugin-update-reminder': row.name, role: 'status', 'aria-live': 'polite' },
      h('style', null, W.styles), h('style', null, FOOTER_CSS),
      h('div', { className: 'reminder-head' },
        h('div', { className: 'reminder-title' },
          h('span', { className: 'updates-pill' + (job && ['failed', 'restore-failed', 'unknown', 'restored'].includes(job.state) ? ' is-error' : '') },
            job ? jobLabel(job) : isSuite ? t('Suite 新版本', 'Suite update') : label + t(' 有新版本', ' update')),
          h('span', { className: 'updates-mono' }, job ? ('v' + job.from + ' → v' + job.to) : ('v' + row.version + (row.release?.version ? ' → v' + row.release.version : '')))),
        !jobRunning && h('button', { type: 'button', className: 'reminder-close', 'aria-label': t('关闭提醒', 'Dismiss reminder'), onClick: dismiss }, '×')),
      jobReason && h('p', { className: 'updates-inline-msg is-error', style: { margin: '4px 0 0' } }, message(jobReason)),
      error && h('p', { className: 'updates-inline-msg is-error', role: 'alert', style: { margin: '4px 0 0' } }, message(error)),
      !job && installLocked && h('p', { className: 'w-muted', style: { margin: '4px 0 0' } },
        (snapshot.pages.dirty || ownPage.dirty) ? t('请先保存修改后再更新', 'Save changes before updating')
          : (snapshot.activity.busy || pageBusy) ? t('当前对话或任务结束后即可一键热更新', 'Hot-update available once the active turn finishes')
          : ''),
      canSuggestAuto && h('div', { className: 'updates-auto-nudge' },
        h('span', null, t('下次有兼容新版本时，空闲自动热更新？', 'Auto-install future compatible updates while idle?')),
        h(W.Button, { variant: 'primary', className: 'is-sm', disabled: working, onClick: () => { setError(''); setSelectedTarget(row.name); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates'))),
      !jobRunning && !unconfirmed && !['complete', 'restart-required'].includes(job?.state) && h('div', { className: 'reminder-actions' },
        row.available && row.release?.version && h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || checkingThis, onClick: () => { setError(''); if (job) setDismissedJobId(job.id); setSelectedTarget(row.name); setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('热更新 Suite 至 v', 'Update Suite to v') : t('热更新至 v', 'Update to v')) + row.release.version),
        error === 'check-first' && h(W.Button, { variant: row.available ? 'ghost' : 'primary', className: 'is-sm', icon: 'refresh', disabled: working || checkingThis, onClick: checkReminder }, checkingThis ? t('正在检查…', 'Checking…') : t('重新检查', 'Check again')),
        row.release?.version && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: toggleNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        row.available && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(async () => { await api({ action: 'later', name: row.name, revision: state.preferences.revision }); dismiss(); }) }, t('明天再提醒', 'Remind tomorrow'))),
      jobRunning && !['applying', 'restoring'].includes(job.phase) && h('div', { className: 'reminder-actions' },
        h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update'))),
      notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') },
        loadingNotes ? h('p', { className: 'w-muted', style: { margin: 0 } }, t('正在读取…', 'Loading…'))
          : notes?.text ? h('pre', { tabIndex: 0 }, h('code', null, notes.text))
          : h('p', { className: 'w-muted', style: { margin: 0 } }, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')),
        notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog'))),
      confirmDialog);
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
  const client = { t, Footer: InlineFooter, NativeFooter, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
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
// Generated from templates/client.js, templates/panels/, templates/style-switcher.js, templates/themes-and-motion.css and templates/workbench-ui.js. Edit the sources.
(function () {
const DSH_THEMES_AND_MOTION_CSS = "/* ==========================================================================\n * DeepSeek Harness (>=0.2.2-rc.3) Unified Workbench Themes & Motion System v3\n * Shared across STARDUSTLC666 workbench plugins:\n *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,\n *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes\n *\n * Design Principles:\n * 1. NEVER TOO DARK: Airy daylight defaults; when host `body[data-ds-dark-theme]`\n *    is active under `harness`, soften to breathable slate (#1f232b / #272c36),\n *    never pitch black (#000 / #090a0f / #151517).\n * 2. 13 SWITCHABLE PRESETS via `[data-dsh-style]` + 8 FONT PAIRINGS via `[data-dsh-font]`:\n *    - `harness`   (原生清透 / Native Airy)\n *    - `cream`     (米白纸感 / Warm Cream — stacked paper, dashed rows, bookmark tab)\n *    - `claude`    (Claude 暖书卷 / Claude Warmth — editorial serif, paper grain, borderless cards)\n *    - `pixel8bit` (8-Bit 掌机 / Bright 8-Bit — dot-matrix header, 2px borders, ▶ cursor, pixel progress)\n *    - `mint`      (晴空薄荷 / Airy Mint)\n *    - `glass`     (晴昼琉璃 / Daylight Glass — pastel aurora mesh, frosted blur, specular inner rim)\n *    - `eink`      (护眼墨水屏 / E-Ink Paper — matte warm paper, #171716 ink, 60ms snappy transitions)\n *    - `blueprint` (工程晒图 / Blueprint — cyanotype grid, Prussian #0d3b66 ink, safety-orange #e05a2b, `+` ticks)\n *    - `risograph` (波普孔版 / Riso Zine — halftone header, 2px #18181b outlines, #ff3e7f/#2563eb offset shadows)\n *    - `win98`     (千禧复古 / Retro 98 — Platinum silver 3D raised/sunken bevels, royal-blue titlebar accent)\n *    - `songhui`   (宋韵朱砂 / Song Xuan — gold-flecked Xuan paper, 3px double #b83b2a masthead, seal stamps)\n *    - `frutiger`  (晴空水晶 / Aqua Gloss — sky-aqua gradient, glossy specular 999px aqua pills)\n *    - `gazette`   (铅字晨报 / Gazette — warm newsprint, 4px double #161514 masthead, 1px column rules, #9b1c1c seal)\n *    - Dual-layer Chinese + Latin typography per preset + independent `[data-dsh-font]` overrides\n *      (`auto`, `songkai`, `fangsong`, `poster`, `retro98`, `serif`, `arcade`, `modern`)\n * 3. SHARED v3 LAYOUT & MOTION PRIMITIVES:\n *    - Unified 48px Single-Row Header (`.dsh-header`) + compact `.dsh-style-switcher` + `.dsh-font-trigger`\n *    - Sliding Tab Indicator (`.dsh-tablist` + `.dsh-tab-indicator`) + 140ms Panel Enter\n *    - Resizable Split Pane (`.dsh-split-pane`, `.dsh-split-resizer`, <760px auto-stack)\n *    - Theme-Tinted Shimmer Skeleton (`.dsh-skeleton`)\n *    - Row Hover Quick-Action Bar (`.dsh-row-actions`)\n *    - Calm Compact Update Strip (`[data-plugin-update-footer]`)\n * 4. PORTALED OVERLAY SYNC + `prefers-reduced-motion` + `forced-colors` compliance.\n * ========================================================================== */\n\n/* --------------------------------------------------------------------------\n * 1. Motion Timing & Base Token Fallbacks (Standalone + Host Safe)\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]),\n:where([data-dsh-portal-synced]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n  --dsh-ease-out: cubic-bezier(0.22, 1, 0.36, 1);\n  --dsh-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  /* Standard cubic-bezier fallback before linear() physics spring */\n  --dsh-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --dsh-motion-fast: 140ms;\n  --dsh-motion-base: 200ms;\n  --dsh-motion-dialog: 220ms;\n  --dsh-control-border-width: 0.5px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsh-serif-font: \"Palatino Linotype\", Georgia, \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", \"STSong\", \"华文宋体\", serif;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n@supports (transition-timing-function: linear(0, 1)) {\n  :where([data-dsh-style]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n    --dsh-ease-spring: linear(\n      0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%,\n      1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%,\n      1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1\n    );\n  }\n}\n\n/* Electron / macOS 0.2.2+ window-drag-regions rule:\n * Exclude ONLY the visible overlay owner box itself (never `[data-window-drag-exclude] *`,\n * so scrolled/clipped descendants cannot register offscreen no-drag rects over headers). */\n[data-window-drag-exclude] {\n  -webkit-app-region: no-drag;\n}\n\n/* --------------------------------------------------------------------------\n * 2. Preset 1: `harness` — 原生清透 / Native Airy\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"harness\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:where(body:not([data-ds-dark-theme])) [data-dsh-style=\"harness\"],\n:where(body:not([data-ds-dark-theme])) :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style=\"harness\"]) {\n  color-scheme: light;\n  accent-color: var(--dsw-alias-state-business-primary, #4176e6);\n}\n\n/* Standalone fallbacks when host ui-theme stylesheet is not mounted (e.g. jsdom / preview) */\n:root:not([data-dsh-host-tokens]) [data-dsh-style=\"harness\"] {\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 8px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n}\n\nbody:not([data-ds-dark-theme]) [data-dsh-style=\"harness\"] {\n  --dsh-surface-spotlight: rgba(65, 118, 230, 0.06);\n}\n\n/* NEVER TOO DARK: Soft breathable slate when host dark mode is active in `harness` mode */\nbody[data-ds-dark-theme] [data-dsh-style=\"harness\"],\nbody[data-ds-dark-theme] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  color-scheme: dark;\n  accent-color: #7aaaff;\n  --dsw-alias-bg-base: #1f232b;\n  --dsw-alias-bg-layer-1: #272c36;\n  --dsw-alias-bg-layer-2: #2f3542;\n  --dsw-alias-bg-layer-3: #373e4d;\n  --dsw-alias-bg-overlay: #2a303c;\n  --dsw-alias-bg-module-platform: #2c323e;\n  --dsw-alias-settings-card-fill: #262b35;\n  --dsw-alias-settings-card-stroke: rgba(226, 232, 240, 0.12);\n  --dsw-specific-menu: rgba(39, 44, 54, 0.96);\n  --dsw-alias-border-l1: rgba(226, 232, 240, 0.09);\n  --dsw-alias-border-l2: rgba(226, 232, 240, 0.15);\n  --dsw-alias-border-l3: rgba(226, 232, 240, 0.22);\n  --dsw-alias-border-l4: rgba(226, 232, 240, 0.28);\n  --dsw-alias-label-primary: #eef2f7;\n  --dsw-alias-label-secondary: #b6c0cf;\n  --dsw-alias-label-tertiary: #8d98ab;\n  --dsw-alias-label-dimmed: #737e91;\n  --dsw-alias-brand-primary: #7aaaff;\n  --dsw-alias-brand-text: #eef2f7;\n  --dsw-alias-state-business-primary: #7aaaff;\n  --dsw-alias-state-business-tertiary: rgba(122, 170, 255, 0.16);\n  --dsw-alias-link: #8bb6ff;\n  --dsw-alias-button-primary-fill: #5b8def;\n  --dsw-alias-button-primary-hover: #6f9cf4;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(226, 232, 240, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(226, 232, 240, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(122, 170, 255, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.16);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-label: #fcd34d;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.15);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-elevation-panel: 0 4px 16px rgba(10, 14, 22, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.12);\n  --dsw-elevation-prominent: 0 14px 38px rgba(10, 14, 22, 0.42), 0 0 0 1px rgba(226, 232, 240, 0.16);\n  --dsh-button-hover-shadow: 0 2px 8px rgba(10, 14, 22, 0.25);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(10, 14, 22, 0.32);\n  --dsh-surface-spotlight: rgba(122, 170, 255, 0.10);\n}\n\n/* --------------------------------------------------------------------------\n * 3. Preset 2: `cream` — 米白纸感 / Warm Cream (Deepened Materiality)\n *    - Stacked-paper double-edge card shadow\n *    - Dashed notebook row dividers\n *    - Warm bookmark-style active tab accent\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"cream\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"cream\"], :has([data-dsh-style=\"cream\"])) {\n  color-scheme: light;\n  accent-color: #9e5829;\n  --dsw-alias-bg-base: #faf7f0;\n  --dsw-alias-bg-layer-1: #f3efe4;\n  --dsw-alias-bg-layer-2: #eae3d3;\n  --dsw-alias-bg-layer-3: #e0d7c3;\n  --dsw-alias-bg-overlay: #fcfaf4;\n  --dsw-alias-bg-module-platform: #efe9da;\n  --dsw-alias-settings-card-fill: #fdfbf6;\n  --dsw-alias-settings-card-stroke: #d4c8ae;\n  --dsw-specific-menu: rgba(252, 250, 244, 0.97);\n  --dsw-alias-border-l1: #e6dec8;\n  --dsw-alias-border-l2: #d4c8ae;\n  --dsw-alias-border-l3: #c0b193;\n  --dsw-alias-border-l4: #ad9c7c;\n  --dsw-alias-label-primary: #2b2620;\n  --dsw-alias-label-secondary: #655b4e;\n  --dsw-alias-label-tertiary: #857968;\n  --dsw-alias-label-dimmed: #9c907f;\n  --dsw-alias-brand-primary: #9e5829;\n  --dsw-alias-brand-text: #2b2620;\n  --dsw-alias-state-business-primary: #a65e2e;\n  --dsw-alias-state-business-tertiary: rgba(166, 94, 46, 0.13);\n  --dsw-alias-link: #934e20;\n  --dsw-alias-button-primary-fill: #9e5829;\n  --dsw-alias-button-primary-hover: #86481e;\n  --dsw-alias-button-primary-ink: #fffdf9;\n  --dsw-alias-interactive-bg-hover: rgba(108, 84, 50, 0.075);\n  --dsw-alias-interactive-bg-active: rgba(166, 94, 46, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(166, 94, 46, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 56, 44, 0.11);\n  --dsw-alias-state-error-primary: #b9382c;\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-label: #8c3d08;\n  --dsw-alias-state-warn-tertiary: #fdefd6;\n  --dsw-alias-state-success-primary: #2a6f4e;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 13px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.42);\n  --dsw-elevation-prominent: 0 14px 34px rgba(68, 52, 32, 0.14), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.48);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(84, 62, 34, 0.09);\n  --dsh-card-shadow: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1;\n  --dsh-card-hover-shadow: 0 4px 10px rgba(68, 52, 32, 0.10), 4px 4px 0 #e2d7be;\n  --dsh-surface-spotlight: rgba(166, 94, 46, 0.08);\n  --dsh-font-display: \"Trebuchet MS\", \"STKaiti\", \"华文楷体\", \"Noto Serif SC SemiBold\", serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"cream\"] :where([data-dsh-card], .dsh-card) {\n  border-color: var(--dsw-alias-border-l2);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n[data-dsh-style=\"cream\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px dashed var(--dsw-alias-border-l2);\n}\n\n[data-dsh-style=\"cream\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: rgba(158, 88, 41, 0.10);\n  color: #7d4119;\n  box-shadow: inset 0 2px 0 rgba(158, 88, 41, 0.22);\n}\n\n[data-dsh-style=\"cream\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  border-block-end-color: #9e5829;\n  border-block-end-width: 2.5px;\n}\n\n/* --------------------------------------------------------------------------\n * 4. Preset 3: `claude` — Claude 暖书卷 / Claude Warmth (Deepened Materiality)\n *    - Editorial serif on headings, reader/detail titles & card titles (`[data-dsh-serif]`)\n *    - Subtle warm paper texture\n *    - Soft borderless surface cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"claude\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) {\n  color-scheme: light;\n  accent-color: #c96442;\n  --dsw-alias-bg-base: #f5f4ed;\n  --dsw-alias-bg-layer-1: #ece9df;\n  --dsw-alias-bg-layer-2: #e3dfd2;\n  --dsw-alias-bg-layer-3: #d8d3c3;\n  --dsw-alias-bg-overlay: #faf9f4;\n  --dsw-alias-bg-module-platform: #e7e3d6;\n  --dsw-alias-settings-card-fill: #faf9f4;\n  --dsw-alias-settings-card-stroke: transparent;\n  --dsw-specific-menu: rgba(250, 249, 244, 0.97);\n  --dsw-alias-border-l1: #e4e0d3;\n  --dsw-alias-border-l2: #d5d0c3;\n  --dsw-alias-border-l3: #c1bbb0;\n  --dsw-alias-border-l4: #aba495;\n  --dsw-alias-label-primary: #1f1e1b;\n  --dsw-alias-label-secondary: #5d5a51;\n  --dsw-alias-label-tertiary: #7b776c;\n  --dsw-alias-label-dimmed: #948f83;\n  --dsw-alias-brand-primary: #c96442;\n  --dsw-alias-brand-text: #1f1e1b;\n  --dsw-alias-state-business-primary: #c96442;\n  --dsw-alias-state-business-tertiary: rgba(201, 100, 66, 0.14);\n  --dsw-alias-link: #b35030;\n  --dsw-alias-button-primary-fill: #c96442;\n  --dsw-alias-button-primary-hover: #b25232;\n  --dsw-alias-button-primary-ink: #faf9f5;\n  --dsw-alias-interactive-bg-hover: rgba(31, 30, 27, 0.055);\n  --dsw-alias-interactive-bg-active: rgba(201, 100, 66, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(201, 100, 66, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(180, 48, 42, 0.11);\n  --dsw-alias-state-error-primary: #b4302a;\n  --dsw-alias-state-warn-primary: #b85d19;\n  --dsw-alias-state-warn-label: #8c430c;\n  --dsw-alias-state-warn-tertiary: #f7e8d6;\n  --dsw-alias-state-success-primary: #2d6a4f;\n  --dsw-radius-xs: 7px;\n  --dsw-radius-sm: 10px;\n  --dsw-radius-md: 14px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: 0 2px 12px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.18);\n  --dsw-elevation-prominent: 0 16px 38px rgba(31, 30, 27, 0.13), 0 2px 8px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.24);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(31, 30, 27, 0.08);\n  --dsh-card-shadow: 0 1px 3px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.13);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(31, 30, 27, 0.08), 0 0 0 1px rgba(145, 139, 126, 0.20);\n  --dsh-surface-spotlight: rgba(201, 100, 66, 0.08);\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Subtle warm paper grain texture */\n[data-dsh-style=\"claude\"] {\n  background-color: var(--dsw-alias-bg-base);\n  background-image:\n    radial-gradient(rgba(31, 30, 27, 0.024) 0.75px, transparent 0),\n    linear-gradient(180deg, rgba(255, 253, 247, 0.45), rgba(236, 233, 223, 0.25));\n  background-size: 16px 16px, 100% 100%;\n}\n\n/* Soft borderless surface cards */\n[data-dsh-style=\"claude\"] :where([data-dsh-card], .dsh-card) {\n  background: var(--dsw-alias-settings-card-fill);\n  border-color: transparent;\n  box-shadow: var(--dsh-card-shadow);\n}\n\n/* Editorial display font applied to workbench headings, reader/detail titles & card titles (overrideable via [data-dsh-font]) */\n[data-dsh-style=\"claude\"] :where(\n  header h1,\n  [data-dsh-editorial-heading],\n  [data-dsh-serif],\n  [data-dsh-card] :is(h2, h3, .dsh-card-title),\n  .dsh-card :is(h2, h3, .dsh-card-title),\n  [data-dsh-reader] :is(h1, h2),\n  .dsh-reader :is(h1, h2)\n),\n:where([role=\"dialog\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) header h2 {\n  font-family: var(--dsh-font-display);\n  font-weight: var(--dsh-display-weight, 700);\n  letter-spacing: var(--dsh-display-tracking, -0.01em);\n}\n\n/* --------------------------------------------------------------------------\n * 5. Preset 4: `pixel8bit` — 8-Bit 掌机 / Bright 8-Bit (Deepened Materiality)\n *    - 1px dot-matrix header pattern (`6px 6px`)\n *    - 2px solid #1e2826 borders + 2px 2px 0 pixel shadows\n *    - Animated `▶` active row cursor + stepped pixel progress helper\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"pixel8bit\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  color-scheme: light;\n  accent-color: #2e7d5b;\n  --dsw-alias-bg-base: #f4f6e8;\n  --dsw-alias-bg-layer-1: #e7eed2;\n  --dsw-alias-bg-layer-2: #dbe5c0;\n  --dsw-alias-bg-layer-3: #cedaad;\n  --dsw-alias-bg-overlay: #f9fbf0;\n  --dsw-alias-bg-module-platform: #e2ebc9;\n  --dsw-alias-settings-card-fill: #edf2dc;\n  --dsw-alias-settings-card-stroke: #1e2826;\n  --dsw-specific-menu: #f9fbf0;\n  --dsw-alias-border-l1: #7e9478;\n  --dsw-alias-border-l2: #1e2826;\n  --dsw-alias-border-l3: #1e2826;\n  --dsw-alias-border-l4: #1e2826;\n  --dsw-alias-label-primary: #1e2826;\n  --dsw-alias-label-secondary: #3d514c;\n  --dsw-alias-label-tertiary: #58706a;\n  --dsw-alias-label-dimmed: #6e857f;\n  --dsw-alias-brand-primary: #2e7d5b;\n  --dsw-alias-brand-text: #1e2826;\n  --dsw-alias-state-business-primary: #2e7d5b;\n  --dsw-alias-state-business-tertiary: rgba(46, 125, 91, 0.18);\n  --dsw-alias-link: #226448;\n  --dsw-alias-button-primary-fill: #2e7d5b;\n  --dsw-alias-button-primary-hover: #24674a;\n  --dsw-alias-button-primary-ink: #f4f6e8;\n  --dsw-alias-interactive-bg-hover: #dfe9c4;\n  --dsw-alias-interactive-bg-active: #cfe0ad;\n  --dsw-alias-interactive-bg-hover-accent: rgba(46, 125, 91, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(217, 91, 67, 0.18);\n  --dsw-alias-state-error-primary: #d95b43;\n  --dsw-alias-state-warn-primary: #c47614;\n  --dsw-alias-state-warn-label: #7a4808;\n  --dsw-alias-state-warn-tertiary: #f6e7b4;\n  --dsw-alias-state-success-primary: #2e7d5b;\n  --dsh-pixel-accent-secondary: #d95b43;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-panel: 2px 2px 0px #1e2826;\n  --dsw-elevation-prominent: 4px 4px 0px #1e2826;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 2px 2px 0px #1e2826;\n  --dsh-button-hover-shadow: 3px 3px 0px #1e2826;\n  --dsh-card-shadow: 2px 2px 0px #1e2826;\n  --dsh-card-hover-shadow: 4px 4px 0px #1e2826;\n  --dsh-surface-spotlight: rgba(46, 125, 91, 0.12);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.03em;\n  --dsh-body-tracking: 0.03em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Subtle 1px dot-matrix header pattern (`6px 6px`) */\n[data-dsh-style=\"pixel8bit\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background-color: var(--dsw-alias-bg-layer-1);\n  background-image: radial-gradient(rgba(30, 40, 38, 0.14) 1px, transparent 0);\n  background-size: 6px 6px;\n  border-block-end: 2px solid #1e2826;\n}\n\n/* Crisp 0px corners, 2px solid borders, and arcade shadows in `pixel8bit` */\n[data-dsh-style=\"pixel8bit\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border-width: 2px;\n  border-color: #1e2826;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  border: 2px solid #1e2826 !important;\n  box-shadow: 4px 4px 0px #1e2826 !important;\n  backdrop-filter: none;\n}\n\n[data-dsh-style=\"pixel8bit\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"pixel8bit\"] .dsh-tab-indicator {\n  border-block-end-color: #d95b43;\n  border-block-end-width: 3px;\n}\n\n/* Animated `▶` active row cursor (`[data-dsh-row][data-active=\"true\"]` or `.dsh-pixel-cursor`) */\n.dsh-pixel-cursor {\n  display: none;\n  flex: none;\n  font-size: 10px;\n  line-height: 1;\n  color: var(--dsh-pixel-accent-secondary, #d95b43);\n}\n\n@keyframes dsh-pixel-cursor-nudge {\n  0%, 100% { translate: 0px 0px; }\n  50% { translate: 2px 0px; }\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  box-shadow: inset 3px 0 0 #d95b43;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]):not(:has(.dsh-pixel-cursor))::before {\n  content: \"▶\";\n  display: inline-block;\n  flex: none;\n  margin-inline-end: 6px;\n  font-size: 10px;\n  line-height: 1;\n  color: #d95b43;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-pixel-cursor {\n  display: inline-flex;\n  align-items: center;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]):not(:has(.dsh-pixel-cursor))::before,\n  [data-dsh-style=\"pixel8bit\"] :where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-pixel-cursor {\n    animation: dsh-pixel-cursor-nudge 760ms steps(2, end) infinite;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 6. Preset 5: `mint` — 晴空薄荷 / Airy Mint\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"mint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"mint\"], :has([data-dsh-style=\"mint\"])) {\n  color-scheme: light;\n  accent-color: #0f766e;\n  --dsw-alias-bg-base: #f5fafb;\n  --dsw-alias-bg-layer-1: #eaf3f6;\n  --dsw-alias-bg-layer-2: #dcebf0;\n  --dsw-alias-bg-layer-3: #cce1e8;\n  --dsw-alias-bg-overlay: #fafdff;\n  --dsw-alias-bg-module-platform: #e3eff3;\n  --dsw-alias-settings-card-fill: #eef6f8;\n  --dsw-alias-settings-card-stroke: #c7dde5;\n  --dsw-specific-menu: rgba(250, 253, 255, 0.97);\n  --dsw-alias-border-l1: #d5e6ec;\n  --dsw-alias-border-l2: #bdd5de;\n  --dsw-alias-border-l3: #9ec0cd;\n  --dsw-alias-border-l4: #7faab9;\n  --dsw-alias-label-primary: #132a2e;\n  --dsw-alias-label-secondary: #426067;\n  --dsw-alias-label-tertiary: #628088;\n  --dsw-alias-label-dimmed: #7c98a0;\n  --dsw-alias-brand-primary: #0f766e;\n  --dsw-alias-brand-text: #132a2e;\n  --dsw-alias-state-business-primary: #0f766e;\n  --dsw-alias-state-business-tertiary: rgba(15, 118, 110, 0.13);\n  --dsw-alias-link: #0284c7;\n  --dsw-alias-button-primary-fill: #0f766e;\n  --dsw-alias-button-primary-hover: #0d635c;\n  --dsw-alias-button-primary-ink: #f5fafb;\n  --dsw-alias-interactive-bg-hover: rgba(15, 118, 110, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(15, 118, 110, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(2, 132, 199, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(200, 50, 64, 0.11);\n  --dsw-alias-state-error-primary: #c83240;\n  --dsw-alias-state-warn-primary: #b4690e;\n  --dsw-alias-state-warn-label: #864c07;\n  --dsw-alias-state-warn-tertiary: #fdf1d6;\n  --dsw-alias-state-success-primary: #0f766e;\n  --dsh-mint-sky-accent: #0284c7;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 3px 12px rgba(15, 76, 92, 0.07), 0 0 0 1px rgba(127, 170, 185, 0.28);\n  --dsw-elevation-prominent: 0 14px 34px rgba(15, 76, 92, 0.13), 0 2px 6px rgba(15, 76, 92, 0.05), 0 0 0 1px rgba(127, 170, 185, 0.34);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(15, 118, 110, 0.11);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(2, 132, 199, 0.10);\n  --dsh-surface-spotlight: rgba(2, 132, 199, 0.08);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* --------------------------------------------------------------------------\n * 7. Preset 6: `glass` — 晴昼琉璃 / Daylight Glass (NEW!)\n *    - Pastel aurora daylight mesh background over `#f3f7ff`\n *    - Frosted translucent glass surfaces (`rgba(255,255,255,0.70)`, blur(14px) saturate(140%))\n *    - Crisp white specular inner border (`inset 0 1px 0 rgba(255,255,255,0.9)`)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"glass\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n  color-scheme: light;\n  accent-color: #4f6df5;\n  --dsw-alias-bg-base: #f3f7ff;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.70);\n  --dsw-alias-bg-layer-2: rgba(240, 245, 255, 0.78);\n  --dsw-alias-bg-layer-3: rgba(226, 236, 255, 0.84);\n  --dsw-alias-bg-overlay: rgba(255, 255, 255, 0.84);\n  --dsw-alias-bg-module-platform: rgba(244, 248, 255, 0.76);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.70);\n  --dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.82);\n  --dsw-specific-menu: rgba(255, 255, 255, 0.86);\n  --dsw-alias-border-l1: rgba(148, 173, 219, 0.24);\n  --dsw-alias-border-l2: rgba(132, 159, 212, 0.34);\n  --dsw-alias-border-l3: rgba(114, 144, 204, 0.46);\n  --dsw-alias-border-l4: rgba(96, 128, 196, 0.56);\n  --dsw-alias-label-primary: #172033;\n  --dsw-alias-label-secondary: #4b5973;\n  --dsw-alias-label-tertiary: #6b7994;\n  --dsw-alias-label-dimmed: #8895ae;\n  --dsw-alias-brand-primary: #4f6df5;\n  --dsw-alias-brand-text: #172033;\n  --dsw-alias-state-business-primary: #4f6df5;\n  --dsw-alias-state-business-tertiary: rgba(79, 109, 245, 0.14);\n  --dsw-alias-link: #3b59e2;\n  --dsw-alias-button-primary-fill: #4f6df5;\n  --dsw-alias-button-primary-hover: #3f5de3;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(79, 109, 245, 0.08);\n  --dsw-alias-interactive-bg-active: rgba(79, 109, 245, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(14, 165, 233, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 56, 82, 0.12);\n  --dsw-alias-state-error-primary: #d13850;\n  --dsw-alias-state-warn-primary: #c06a12;\n  --dsw-alias-state-warn-label: #8a4a09;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.18);\n  --dsw-alias-state-success-primary: #15805d;\n  --dsw-radius-xs: 8px;\n  --dsw-radius-sm: 11px;\n  --dsw-radius-md: 15px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 18px rgba(59, 92, 168, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.72);\n  --dsw-elevation-prominent: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 16px 40px rgba(59, 92, 168, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.80);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 3px 10px rgba(79, 109, 245, 0.12);\n  --dsh-card-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 16px rgba(59, 92, 168, 0.07);\n  --dsh-card-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.96), 0 10px 26px rgba(59, 92, 168, 0.12);\n  --dsh-surface-spotlight: rgba(79, 109, 245, 0.08);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"glass\"] {\n  background-color: #f3f7ff;\n  background-image:\n    radial-gradient(64% 58% at 12% 8%, rgba(125, 211, 252, 0.30) 0%, transparent 65%),\n    radial-gradient(58% 52% at 88% 14%, rgba(196, 181, 253, 0.28) 0%, transparent 65%),\n    radial-gradient(60% 55% at 52% 96%, rgba(153, 246, 228, 0.24) 0%, transparent 68%);\n}\n\n[data-dsh-style=\"glass\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n  background: rgba(255, 255, 255, 0.70);\n  -webkit-backdrop-filter: blur(14px) saturate(140%);\n  backdrop-filter: blur(14px) saturate(140%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 16px rgba(59, 92, 168, 0.07);\n}\n\n@supports not (backdrop-filter: blur(1px)) {\n  [data-dsh-style=\"glass\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n    background: rgba(255, 255, 255, 0.92);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 8. Preset 7: `eink` — 护眼墨水屏 / E-Ink Paper (NEW!)\n *    - Warm matte e-paper (`#F2F1EC` base, `#EAE8E1` layer, `#F7F6F2` card)\n *    - High-contrast `#171716` charcoal ink, crisp `1px solid #9E9C93` rules\n *    - `2px–4px` sharp corners, ultra-snappy `60ms` transitions, zero chromatic distraction\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"eink\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"eink\"], :has([data-dsh-style=\"eink\"])) {\n  color-scheme: light;\n  accent-color: #171716;\n  --dsw-alias-bg-base: #f2f1ec;\n  --dsw-alias-bg-layer-1: #eae8e1;\n  --dsw-alias-bg-layer-2: #e1dfd6;\n  --dsw-alias-bg-layer-3: #d6d3c9;\n  --dsw-alias-bg-overlay: #f7f6f2;\n  --dsw-alias-bg-module-platform: #eae8e1;\n  --dsw-alias-settings-card-fill: #f7f6f2;\n  --dsw-alias-settings-card-stroke: #9e9c93;\n  --dsw-specific-menu: #f7f6f2;\n  --dsw-alias-border-l1: #c5c2b8;\n  --dsw-alias-border-l2: #9e9c93;\n  --dsw-alias-border-l3: #78766e;\n  --dsw-alias-border-l4: #54534d;\n  --dsw-alias-label-primary: #171716;\n  --dsw-alias-label-secondary: #484742;\n  --dsw-alias-label-tertiary: #66645d;\n  --dsw-alias-label-dimmed: #807e76;\n  --dsw-alias-brand-primary: #171716;\n  --dsw-alias-brand-text: #171716;\n  --dsw-alias-state-business-primary: #171716;\n  --dsw-alias-state-business-tertiary: rgba(23, 23, 22, 0.10);\n  --dsw-alias-link: #171716;\n  --dsw-alias-button-primary-fill: #171716;\n  --dsw-alias-button-primary-hover: #2f2f2c;\n  --dsw-alias-button-primary-ink: #f7f6f2;\n  --dsw-alias-interactive-bg-hover: rgba(23, 23, 22, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(23, 23, 22, 0.12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(23, 23, 22, 0.08);\n  --dsw-alias-interactive-bg-hover-danger: rgba(23, 23, 22, 0.10);\n  --dsw-alias-state-error-primary: #2d2c28;\n  --dsw-alias-state-warn-primary: #45443e;\n  --dsw-alias-state-warn-label: #171716;\n  --dsw-alias-state-warn-tertiary: #e6e4db;\n  --dsw-alias-state-success-primary: #242422;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 3px;\n  --dsw-radius-md: 4px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 0 0 1px #9e9c93;\n  --dsw-elevation-prominent: 0 2px 0 #9e9c93, 0 0 0 1px #78766e;\n  --dsh-control-border-width: 1px;\n  --dsh-motion-fast: 60ms;\n  --dsh-motion-base: 60ms;\n  --dsh-motion-dialog: 60ms;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: none;\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: none;\n  --dsh-surface-spotlight: rgba(23, 23, 22, 0.06);\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"eink\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 1px solid #9e9c93;\n  box-shadow: none;\n}\n\n[data-dsh-style=\"eink\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px solid #c5c2b8;\n}\n\n[data-dsh-style=\"eink\"] :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: none !important;\n  scale: none !important;\n  transition-duration: 60ms;\n}\n\n/* --------------------------------------------------------------------------\n * 9. Preset 8: `blueprint` — 工程晒图 / Blueprint (NEW!)\n *    - Light cyanotype drafting paper (`#eaf3fb`) + dual millimeter grid (`24px` + `6px`)\n *    - Prussian engineering blue (`#0d3b66`) ink & `1px solid #1b5e8a` crisp rules\n *    - Industrial safety-orange (`#e05a2b`) primary accent + technical monospace\n *    - Tiny `+` crosshair registration ticks on cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"blueprint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"blueprint\"], :has([data-dsh-style=\"blueprint\"])) {\n  color-scheme: light;\n  accent-color: #e05a2b;\n  --dsw-alias-bg-base: #eaf3fb;\n  --dsw-alias-bg-layer-1: #f4f9fe;\n  --dsw-alias-bg-layer-2: #dfeef9;\n  --dsw-alias-bg-layer-3: #cfe3f4;\n  --dsw-alias-bg-overlay: #f7fbff;\n  --dsw-alias-bg-module-platform: #e3f0fa;\n  --dsw-alias-settings-card-fill: rgba(244, 249, 254, 0.92);\n  --dsw-alias-settings-card-stroke: #1b5e8a;\n  --dsw-specific-menu: rgba(247, 251, 255, 0.98);\n  --dsw-alias-border-l1: rgba(27, 94, 138, 0.28);\n  --dsw-alias-border-l2: #1b5e8a;\n  --dsw-alias-border-l3: #0d3b66;\n  --dsw-alias-border-l4: #092b4c;\n  --dsw-alias-label-primary: #0d3b66;\n  --dsw-alias-label-secondary: #1d4e78;\n  --dsw-alias-label-tertiary: #3b6f99;\n  --dsw-alias-label-dimmed: #5b89ad;\n  --dsw-alias-brand-primary: #e05a2b;\n  --dsw-alias-brand-text: #0d3b66;\n  --dsw-alias-state-business-primary: #e05a2b;\n  --dsw-alias-state-business-tertiary: rgba(224, 90, 43, 0.14);\n  --dsw-alias-link: #0d3b66;\n  --dsw-alias-button-primary-fill: #e05a2b;\n  --dsw-alias-button-primary-hover: #c94b20;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(27, 94, 138, 0.08);\n  --dsw-alias-interactive-bg-active: rgba(224, 90, 43, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(224, 90, 43, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 45, 38, 0.12);\n  --dsw-alias-state-error-primary: #b92d26;\n  --dsw-alias-state-warn-primary: #c05614;\n  --dsw-alias-state-warn-label: #7c3408;\n  --dsw-alias-state-warn-tertiary: #fce9d8;\n  --dsw-alias-state-success-primary: #156d5b;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 0 0 1px #1b5e8a;\n  --dsw-elevation-prominent: 0 8px 24px rgba(13, 59, 102, 0.14), 0 0 0 1px #1b5e8a;\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 0 #1b5e8a;\n  --dsh-card-shadow: 0 0 0 1px #1b5e8a;\n  --dsh-card-hover-shadow: 0 3px 0 #1b5e8a;\n  --dsh-surface-spotlight: rgba(27, 94, 138, 0.09);\n  --dsh-font-display: \"Cascadia Mono SemiBold\", \"Cascadia Mono\", \"STZhongsong\", \"华文中宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-body: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.02em;\n  --dsh-body-tracking: 0.02em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"blueprint\"] {\n  background-color: #eaf3fb;\n  background-image:\n    linear-gradient(to right, rgba(18, 78, 120, 0.09) 1px, transparent 1px),\n    linear-gradient(to bottom, rgba(18, 78, 120, 0.09) 1px, transparent 1px),\n    linear-gradient(to right, rgba(18, 78, 120, 0.045) 1px, transparent 1px),\n    linear-gradient(to bottom, rgba(18, 78, 120, 0.045) 1px, transparent 1px);\n  background-size: 24px 24px, 24px 24px, 6px 6px, 6px 6px;\n}\n\n[data-dsh-style=\"blueprint\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(244, 249, 254, 0.90);\n  border-block-end: 1px solid #1b5e8a;\n}\n\n[data-dsh-style=\"blueprint\"] :where([data-dsh-card], .dsh-card) {\n  position: relative;\n  border: 1px solid #1b5e8a;\n  background: rgba(244, 249, 254, 0.92);\n}\n\n[data-dsh-style=\"blueprint\"] :where([data-dsh-card], .dsh-card):not([role=\"tab\"])::after {\n  content: \"+\";\n  position: absolute;\n  inset-block-start: 4px;\n  inset-inline-end: 6px;\n  font-family: ui-monospace, \"Cascadia Mono\", Menlo, Consolas, monospace;\n  font-size: 11px;\n  line-height: 1;\n  color: #e05a2b;\n  opacity: 0.78;\n  pointer-events: none;\n}\n\n[data-dsh-style=\"blueprint\"] :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 1px solid #1b5e8a;\n}\n\n/* --------------------------------------------------------------------------\n * 10. Preset 9: `risograph` — 波普孔版 / Riso Zine (NEW!)\n *     - Warm printmaking paper (`#faf6ee`), bold `2px solid #18181b` outlines\n *     - Vibrant offset hard shadows (`3px 3px 0 #18181b` buttons, `4px 4px 0 #2563eb`/`#ff3e7f` cards/dialogs)\n *     - Subtle halftone dot pattern (`7px 7px`) on header\n *     - Electric pink `#ff3e7f` & marker-yellow `#fde047` accents + `translate(2px, 2px)` shadow-collapse press\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"risograph\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) {\n  color-scheme: light;\n  accent-color: #ff3e7f;\n  --dsw-alias-bg-base: #faf6ee;\n  --dsw-alias-bg-layer-1: #f5efe2;\n  --dsw-alias-bg-layer-2: #ede4d1;\n  --dsw-alias-bg-layer-3: #e3d7be;\n  --dsw-alias-bg-overlay: #fffdf7;\n  --dsw-alias-bg-module-platform: #f5efe2;\n  --dsw-alias-settings-card-fill: #fffdf7;\n  --dsw-alias-settings-card-stroke: #18181b;\n  --dsw-specific-menu: #fffdf7;\n  --dsw-alias-border-l1: #d4cbb8;\n  --dsw-alias-border-l2: #18181b;\n  --dsw-alias-border-l3: #18181b;\n  --dsw-alias-border-l4: #18181b;\n  --dsw-alias-label-primary: #18181b;\n  --dsw-alias-label-secondary: #3f3f46;\n  --dsw-alias-label-tertiary: #52525b;\n  --dsw-alias-label-dimmed: #71717a;\n  --dsw-alias-brand-primary: #ff3e7f;\n  --dsw-alias-brand-text: #18181b;\n  --dsw-alias-state-business-primary: #ff3e7f;\n  --dsw-alias-state-business-tertiary: rgba(255, 62, 127, 0.14);\n  --dsw-alias-link: #2563eb;\n  --dsw-alias-button-primary-fill: #ff3e7f;\n  --dsw-alias-button-primary-hover: #e62e6d;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(253, 224, 71, 0.38);\n  --dsw-alias-interactive-bg-active: #fde047;\n  --dsw-alias-interactive-bg-hover-accent: rgba(37, 99, 235, 0.14);\n  --dsw-alias-interactive-bg-hover-danger: rgba(255, 62, 127, 0.18);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-warn-primary: #ca8a04;\n  --dsw-alias-state-warn-label: #713f12;\n  --dsw-alias-state-warn-tertiary: #fef08a;\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-radius-xs: 3px;\n  --dsw-radius-sm: 4px;\n  --dsw-radius-md: 6px;\n  --dsw-radius-lg: 8px;\n  --dsw-radius-xl: 10px;\n  --dsw-elevation-panel: 4px 4px 0px #2563eb;\n  --dsw-elevation-prominent: 4px 4px 0px #ff3e7f;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 3px 3px 0px #18181b;\n  --dsh-button-hover-shadow: 4px 4px 0px #2563eb;\n  --dsh-card-shadow: 4px 4px 0px #2563eb;\n  --dsh-card-hover-shadow: 5px 5px 0px #ff3e7f;\n  --dsh-surface-spotlight: rgba(253, 224, 71, 0.35);\n  --dsh-font-display: Impact, \"Arial Black\", \"Noto Sans SC Black\", \"SimHei\", \"黑体\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC Medium\", \"Noto Sans SC\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 900;\n  --dsh-display-tracking: -0.02em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"risograph\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background-color: #fffdf7;\n  background-image: radial-gradient(rgba(255, 62, 127, 0.15) 1px, transparent 0);\n  background-size: 7px 7px;\n  border-block-end: 2px solid #18181b;\n}\n\n[data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #18181b;\n  box-shadow: 3px 3px 0px #18181b;\n}\n\n[data-dsh-style=\"risograph\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 2px solid #18181b;\n  box-shadow: 4px 4px 0px #2563eb;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) {\n  border: 2px solid #18181b !important;\n  box-shadow: 4px 4px 0px #ff3e7f !important;\n}\n\n[data-dsh-style=\"risograph\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: #fde047;\n  color: #18181b;\n  font-weight: 700;\n}\n\n[data-dsh-style=\"risograph\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"risograph\"] .dsh-tab-indicator {\n  border-block-end-color: #ff3e7f;\n  border-block-end-width: 3px;\n}\n\n/* --------------------------------------------------------------------------\n * 11. Preset 10: `win98` — 千禧复古 / Retro 98 (NEW!)\n *     - Classic bright Platinum/Win98 silver-gray (`#dcdcdc` / `#e4e4e4`, `#ffffff` wells)\n *     - Authentic 3D beveled raised borders flipping to sunken bevels on `:active` / `[aria-selected=\"true\"]`\n *     - `0px` sharp corners + royal-blue (`#1b4f9c` -> `#3b82c4`) header accent\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"win98\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) {\n  color-scheme: light;\n  accent-color: #1b4f9c;\n  --dsw-alias-bg-base: #dcdcdc;\n  --dsw-alias-bg-layer-1: #e4e4e4;\n  --dsw-alias-bg-layer-2: #d0d0d0;\n  --dsw-alias-bg-layer-3: #c0c0c0;\n  --dsw-alias-bg-overlay: #e4e4e4;\n  --dsw-alias-bg-module-platform: #d4d4d4;\n  --dsw-alias-settings-card-fill: #ffffff;\n  --dsw-alias-settings-card-stroke: #808080;\n  --dsw-specific-menu: #dcdcdc;\n  --dsw-alias-border-l1: #b8b8b8;\n  --dsw-alias-border-l2: #808080;\n  --dsw-alias-border-l3: #5a5a5a;\n  --dsw-alias-border-l4: #222222;\n  --dsw-alias-label-primary: #111111;\n  --dsw-alias-label-secondary: #333333;\n  --dsw-alias-label-tertiary: #555555;\n  --dsw-alias-label-dimmed: #767676;\n  --dsw-alias-brand-primary: #1b4f9c;\n  --dsw-alias-brand-text: #111111;\n  --dsw-alias-state-business-primary: #1b4f9c;\n  --dsw-alias-state-business-tertiary: rgba(27, 79, 156, 0.14);\n  --dsw-alias-link: #0b3c88;\n  --dsw-alias-button-primary-fill: #1b4f9c;\n  --dsw-alias-button-primary-hover: #245cb0;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(27, 79, 156, 0.09);\n  --dsw-alias-interactive-bg-active: rgba(27, 79, 156, 0.16);\n  --dsw-alias-interactive-bg-hover-accent: rgba(59, 130, 196, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.13);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-warn-primary: #9a5b08;\n  --dsw-alias-state-warn-label: #6e3f04;\n  --dsw-alias-state-warn-tertiary: #fef3c7;\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-panel: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n  --dsw-elevation-prominent: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a, 4px 4px 12px rgba(0, 0, 0, 0.18);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n  --dsh-button-hover-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n  --dsh-card-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;\n  --dsh-card-hover-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;\n  --dsh-surface-spotlight: rgba(27, 79, 156, 0.10);\n  --dsh-font-display: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-body: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-mono: \"Fixedsys\", Consolas, \"Courier New\", \"SimSun\", \"宋体\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"win98\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n/* Raised 3D bevel buttons */\n[data-dsh-style=\"win98\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 0;\n  background-color: #dcdcdc;\n  box-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n}\n\n/* Keep primary buttons royal blue with 3D bevel */\n[data-dsh-style=\"win98\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {\n  background-color: #1b4f9c;\n  color: #ffffff;\n  box-shadow: inset 1.5px 1.5px 0 #6ca0e8, inset -1.5px -1.5px 0 #0d2b57, inset 2.5px 2.5px 0 #4a82d1, inset -2.5px -2.5px 0 #143c78;\n}\n\n/* Sunken 3D bevel on active / pressed / selected controls */\n[data-dsh-style=\"win98\"] :where(button, [role=\"button\"]):is(:active, [aria-pressed=\"true\"], [aria-expanded=\"true\"]):not(:disabled):not([aria-disabled=\"true\"]),\n[data-dsh-style=\"win98\"] [role=\"tab\"][aria-selected=\"true\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) :where(button, [role=\"button\"]):is(:active, [aria-pressed=\"true\"]):not(:disabled):not([aria-disabled=\"true\"]) {\n  translate: 0px 0px !important;\n  scale: 1 !important;\n  background-color: #e4e4e4;\n  box-shadow: inset 1.5px 1.5px 0 #5a5a5a, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #9a9a9a, inset -2.5px -2.5px 0 #f4f4f4 !important;\n}\n\n/* Sunken white list/card/input wells */\n[data-dsh-style=\"win98\"] :where([data-dsh-card], .dsh-card, input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border: 0;\n  background: #ffffff;\n  box-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;\n}\n\n/* Bright Win98 Platinum raised toolbar header with iconic royal-blue titlebar stripe */\n[data-dsh-style=\"win98\"] :where(.dsh-header, [data-dsh-header], .pageHeader, .dsh-wb-header, .topbar) {\n  background: linear-gradient(180deg, #ececec 0%, #dcdcdc 100%) !important;\n  color: #111111;\n  border-block-start: 3px solid #1b4f9c !important;\n  border-block-end: 2px solid #808080;\n  box-shadow: inset 0 1px 0 #ffffff, inset 0 -1px 0 #808080;\n}\n\n[data-dsh-style=\"win98\"] .dsh-header-badge {\n  background: linear-gradient(90deg, #1b4f9c 0%, #3b82c4 100%);\n  color: #ffffff;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) header {\n  background: linear-gradient(90deg, #1b4f9c 0%, #3b82c4 100%);\n  color: #ffffff;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) header h2 {\n  color: #ffffff;\n}\n\n/* --------------------------------------------------------------------------\n * 12. Preset 11: `songhui` — 宋韵朱砂 / Song Xuan (NEW!)\n *     - Warm gold-flecked Xuan paper (`#f7f3e8`, subtle `18px` gold-dust radial dots)\n *     - Double cinnabar masthead border (`3px double #b83b2a`)\n *     - Cinnabar seal-stamp primary buttons (`#b83b2a` with `#fbf9f2` ink, `2px` crisp corners)\n *     - Classical Songti / serif typography\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"songhui\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"songhui\"], :has([data-dsh-style=\"songhui\"])) {\n  color-scheme: light;\n  accent-color: #b83b2a;\n  --dsw-alias-bg-base: #f7f3e8;\n  --dsw-alias-bg-layer-1: #f0ead9;\n  --dsw-alias-bg-layer-2: #e7dec8;\n  --dsw-alias-bg-layer-3: #dcd0b4;\n  --dsw-alias-bg-overlay: #fbf9f2;\n  --dsw-alias-bg-module-platform: #ede6d4;\n  --dsw-alias-settings-card-fill: #fbf9f2;\n  --dsw-alias-settings-card-stroke: #d4c4a2;\n  --dsw-specific-menu: #fbf9f2;\n  --dsw-alias-border-l1: #e4dac2;\n  --dsw-alias-border-l2: #cfbda0;\n  --dsw-alias-border-l3: #b8a382;\n  --dsw-alias-border-l4: #9d8765;\n  --dsw-alias-label-primary: #252019;\n  --dsw-alias-label-secondary: #5c5142;\n  --dsw-alias-label-tertiary: #7d705e;\n  --dsw-alias-label-dimmed: #998c79;\n  --dsw-alias-brand-primary: #b83b2a;\n  --dsw-alias-brand-text: #252019;\n  --dsw-alias-state-business-primary: #b83b2a;\n  --dsw-alias-state-business-tertiary: rgba(184, 59, 42, 0.12);\n  --dsw-alias-link: #9e2f20;\n  --dsw-alias-button-primary-fill: #b83b2a;\n  --dsw-alias-button-primary-hover: #9f3021;\n  --dsw-alias-button-primary-ink: #fbf9f2;\n  --dsw-alias-interactive-bg-hover: rgba(184, 59, 42, 0.065);\n  --dsw-alias-interactive-bg-active: rgba(184, 59, 42, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(184, 59, 42, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(184, 59, 42, 0.15);\n  --dsw-alias-state-error-primary: #a62b1c;\n  --dsw-alias-state-warn-primary: #9c6216;\n  --dsw-alias-state-warn-label: #704309;\n  --dsw-alias-state-warn-tertiary: #f7ecd1;\n  --dsw-alias-state-success-primary: #2e664b;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 2px 10px rgba(66, 52, 32, 0.06), 0 0 0 1px #cfbda0;\n  --dsw-elevation-prominent: 0 12px 30px rgba(66, 52, 32, 0.14), 0 0 0 1px #b8a382;\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(184, 59, 42, 0.12);\n  --dsh-card-shadow: 0 1px 2px rgba(66, 52, 32, 0.05);\n  --dsh-card-hover-shadow: 0 6px 16px rgba(66, 52, 32, 0.09);\n  --dsh-surface-spotlight: rgba(184, 59, 42, 0.07);\n  --dsh-font-display: \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", \"SimSun\", \"宋体\", serif;\n  --dsh-font-body: \"Palatino Linotype\", \"STKaiti\", \"华文楷体\", \"KaiTi\", \"楷体\", \"Noto Serif SC\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"STFangsong\", \"华文仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.04em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Gold-flecked Xuan paper */\n[data-dsh-style=\"songhui\"] {\n  background-color: #f7f3e8;\n  background-image:\n    radial-gradient(rgba(196, 152, 64, 0.18) 1px, transparent 0),\n    radial-gradient(rgba(196, 152, 64, 0.11) 0.75px, transparent 0);\n  background-size: 18px 18px, 29px 29px;\n  background-position: 0 0, 9px 7px;\n}\n\n/* Double cinnabar masthead border */\n[data-dsh-style=\"songhui\"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(251, 249, 242, 0.90);\n  border-block-end: 3px double #b83b2a;\n}\n\n/* Cinnabar seal-stamp primary buttons & badge */\n[data-dsh-style=\"songhui\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  background: #b83b2a;\n  color: #fbf9f2;\n  border-color: #9e2f20;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(251, 249, 242, 0.28);\n}\n\n/* --------------------------------------------------------------------------\n * 13. Preset 12: `frutiger` — 晴空水晶 / Aqua Gloss (NEW!)\n *     - Bright Frutiger Aero sky-aqua gradient (`#eaf7ff` -> `#f4fbff`)\n *     - Glossy upper-half specular aqua pill buttons (`linear-gradient` + `inset 0 1.5px 0`)\n *     - Pill `999px` control radius + luminous translucent cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"frutiger\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) {\n  color-scheme: light;\n  accent-color: #0284c7;\n  --dsw-alias-bg-base: #eaf7ff;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.78);\n  --dsw-alias-bg-layer-2: rgba(232, 246, 255, 0.86);\n  --dsw-alias-bg-layer-3: rgba(209, 236, 255, 0.90);\n  --dsw-alias-bg-overlay: rgba(248, 253, 255, 0.93);\n  --dsw-alias-bg-module-platform: rgba(232, 246, 255, 0.84);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.82);\n  --dsw-alias-settings-card-stroke: rgba(56, 189, 248, 0.44);\n  --dsw-specific-menu: rgba(248, 253, 255, 0.95);\n  --dsw-alias-border-l1: rgba(56, 189, 248, 0.26);\n  --dsw-alias-border-l2: rgba(14, 165, 233, 0.36);\n  --dsw-alias-border-l3: rgba(2, 132, 199, 0.48);\n  --dsw-alias-border-l4: rgba(3, 105, 161, 0.58);\n  --dsw-alias-label-primary: #0c2b45;\n  --dsw-alias-label-secondary: #275373;\n  --dsw-alias-label-tertiary: #487596;\n  --dsw-alias-label-dimmed: #6c96b5;\n  --dsw-alias-brand-primary: #0284c7;\n  --dsw-alias-brand-text: #0c2b45;\n  --dsw-alias-state-business-primary: #0284c7;\n  --dsw-alias-state-business-tertiary: rgba(14, 165, 233, 0.16);\n  --dsw-alias-link: #0369a1;\n  --dsw-alias-button-primary-fill: #0284c7;\n  --dsw-alias-button-primary-hover: #0369a1;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(14, 165, 233, 0.10);\n  --dsw-alias-interactive-bg-active: rgba(14, 165, 233, 0.18);\n  --dsw-alias-interactive-bg-hover-accent: rgba(56, 189, 248, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 56, 82, 0.13);\n  --dsw-alias-state-error-primary: #c83244;\n  --dsw-alias-state-warn-primary: #c06a12;\n  --dsw-alias-state-warn-label: #8a4a09;\n  --dsw-alias-state-warn-tertiary: #fef0d6;\n  --dsw-alias-state-success-primary: #0f766e;\n  --dsw-radius-xs: 10px;\n  --dsw-radius-sm: 999px;\n  --dsw-radius-md: 18px;\n  --dsw-radius-lg: 22px;\n  --dsw-radius-xl: 26px;\n  --dsw-elevation-panel: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 6px 20px rgba(14, 165, 233, 0.12), 0 0 0 1px rgba(56, 189, 248, 0.36);\n  --dsw-elevation-prominent: inset 0 1.5px 0 rgba(255, 255, 255, 0.95), 0 16px 38px rgba(14, 165, 233, 0.18), 0 0 0 1px rgba(56, 189, 248, 0.44);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 2px 6px rgba(14, 165, 233, 0.12);\n  --dsh-button-hover-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.96), 0 4px 12px rgba(2, 132, 199, 0.22);\n  --dsh-card-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 6px 20px rgba(14, 165, 233, 0.10);\n  --dsh-card-hover-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.98), 0 10px 26px rgba(2, 132, 199, 0.16);\n  --dsh-surface-spotlight: rgba(14, 165, 233, 0.10);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"frutiger\"] {\n  background-color: #eaf7ff;\n  background-image:\n    radial-gradient(60% 48% at 15% 6%, rgba(125, 211, 252, 0.34) 0%, transparent 65%),\n    linear-gradient(180deg, #eaf7ff 0%, #f4fbff 55%, #e5f5fe 100%);\n}\n\n[data-dsh-style=\"frutiger\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border-radius: 999px;\n  border: 1px solid rgba(14, 165, 233, 0.42);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 244, 255, 0.88) 49%, rgba(204, 236, 255, 0.92) 51%, rgba(235, 249, 255, 0.96) 100%);\n  box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 2px 6px rgba(14, 165, 233, 0.12);\n}\n\n[data-dsh-style=\"frutiger\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  border-radius: 999px;\n  border: 1px solid #0284c7;\n  color: #ffffff;\n  background: linear-gradient(180deg, #7dd3fc 0%, #0ea5e9 48%, #0284c7 52%, #38bdf8 100%);\n  box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.88), 0 3px 10px rgba(2, 132, 199, 0.24);\n}\n\n[data-dsh-style=\"frutiger\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]) {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 250, 255, 0.78) 100%);\n  -webkit-backdrop-filter: blur(10px) saturate(130%);\n  backdrop-filter: blur(10px) saturate(130%);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n/* --------------------------------------------------------------------------\n * 14. Preset 13: `gazette` — 铅字晨报 / Gazette\n *     - Warm newsprint base (`#f6f3ec`), `#ede8dd` layer, `#faf8f3` card, `#161514` ink\n *     - `4px double #161514` masthead border on `.pageHeader` / `.dsh-header`\n *     - Crisp `1px solid #161514` column rules, `0px–2px` editorial corners\n *     - `#9b1c1c` crimson seal/editorial accent & high-contrast ink buttons\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"gazette\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) {\n  color-scheme: light;\n  accent-color: #9b1c1c;\n  --dsw-alias-bg-base: #f6f3ec;\n  --dsw-alias-bg-layer-1: #ede8dd;\n  --dsw-alias-bg-layer-2: #e3dccd;\n  --dsw-alias-bg-layer-3: #d6cebc;\n  --dsw-alias-bg-overlay: #faf8f3;\n  --dsw-alias-bg-module-platform: #ebe5d8;\n  --dsw-alias-settings-card-fill: #faf8f3;\n  --dsw-alias-settings-card-stroke: #161514;\n  --dsw-specific-menu: #faf8f3;\n  --dsw-alias-border-l1: #cec6b6;\n  --dsw-alias-border-l2: #161514;\n  --dsw-alias-border-l3: #161514;\n  --dsw-alias-border-l4: #161514;\n  --dsw-alias-label-primary: #161514;\n  --dsw-alias-label-secondary: #43403c;\n  --dsw-alias-label-tertiary: #635f59;\n  --dsw-alias-label-dimmed: #827d75;\n  --dsw-alias-brand-primary: #9b1c1c;\n  --dsw-alias-brand-text: #161514;\n  --dsw-alias-state-business-primary: #9b1c1c;\n  --dsw-alias-state-business-tertiary: rgba(155, 28, 28, 0.12);\n  --dsw-alias-link: #9b1c1c;\n  --dsw-alias-button-primary-fill: #161514;\n  --dsw-alias-button-primary-hover: #2d2b28;\n  --dsw-alias-button-primary-ink: #faf8f3;\n  --dsw-alias-interactive-bg-hover: rgba(22, 21, 20, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(155, 28, 28, 0.11);\n  --dsw-alias-interactive-bg-hover-accent: rgba(155, 28, 28, 0.10);\n  --dsw-alias-interactive-bg-hover-danger: rgba(155, 28, 28, 0.14);\n  --dsw-alias-state-error-primary: #9b1c1c;\n  --dsw-alias-state-warn-primary: #9a5b08;\n  --dsw-alias-state-warn-label: #6e3f04;\n  --dsw-alias-state-warn-tertiary: #f6ead2;\n  --dsw-alias-state-success-primary: #1f5c3a;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 1px;\n  --dsw-radius-md: 2px;\n  --dsw-radius-lg: 2px;\n  --dsw-radius-xl: 2px;\n  --dsw-elevation-panel: 0 1px 0 #161514, 0 0 0 1px #161514;\n  --dsw-elevation-prominent: 3px 3px 0 #161514, 0 0 0 1px #161514;\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 0 #161514;\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: 2px 2px 0 #161514;\n  --dsh-surface-spotlight: rgba(155, 28, 28, 0.06);\n  --dsh-font-display: Garamond, Georgia, \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"Courier New\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"gazette\"] {\n  background-color: #f6f3ec;\n}\n\n/* Broadsheet 4px double masthead border */\n[data-dsh-style=\"gazette\"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: #faf8f3;\n  border-block-end: 4px double #161514;\n}\n\n/* Crisp 1px solid #161514 column rules & editorial cards */\n[data-dsh-style=\"gazette\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  background: #faf8f3;\n  border: 1px solid #161514;\n  border-radius: 2px;\n  box-shadow: none;\n}\n\n[data-dsh-style=\"gazette\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px solid #161514;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-split-leading {\n  border-inline-end: 1px solid #161514;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-split-resizer::before {\n  background: #161514;\n}\n\n/* 0px–2px editorial corners, crimson seal accent & high-contrast ink buttons */\n[data-dsh-style=\"gazette\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 1px solid #161514;\n  border-radius: 1px;\n}\n\n[data-dsh-style=\"gazette\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {\n  background: #161514;\n  color: #faf8f3;\n  border-color: #161514;\n}\n\n[data-dsh-style=\"gazette\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary):hover:not(:disabled) {\n  background: #9b1c1c;\n  border-color: #9b1c1c;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-header-badge {\n  background: #9b1c1c;\n  color: #faf8f3;\n  border-radius: 1px;\n}\n\n[data-dsh-style=\"gazette\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"gazette\"] .dsh-tab-indicator {\n  border-block-end-color: #9b1c1c;\n  border-block-end-width: 2.5px;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) {\n  border: 1px solid #161514 !important;\n  border-radius: 2px !important;\n}\n\n/* --------------------------------------------------------------------------\n * 14b. Independent `[data-dsh-font]` Overrides & Dual-Layer Typography Rules\n *      When `data-dsh-font=\"auto\"` (or unset), each `[data-dsh-style]` uses its\n *      own Windows-verified Chinese + Latin signature font stack.\n * -------------------------------------------------------------------------- */\n:root[data-dsh-font=\"songkai\"] [data-dsh-style],\n:root[data-dsh-font=\"songkai\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"songkai\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"songkai\"],\n[data-dsh-portal-synced][data-dsh-font=\"songkai\"] {\n  --dsh-font-display: \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", \"SimSun\", \"宋体\", serif;\n  --dsh-font-body: \"Palatino Linotype\", \"STKaiti\", \"华文楷体\", \"KaiTi\", \"楷体\", \"Noto Serif SC\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"STFangsong\", \"华文仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.04em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"fangsong\"] [data-dsh-style],\n:root[data-dsh-font=\"fangsong\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"fangsong\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"fangsong\"],\n[data-dsh-portal-synced][data-dsh-font=\"fangsong\"] {\n  --dsh-font-display: \"Cascadia Mono SemiBold\", \"Cascadia Mono\", \"STZhongsong\", \"华文中宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-body: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.02em;\n  --dsh-body-tracking: 0.02em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"poster\"] [data-dsh-style],\n:root[data-dsh-font=\"poster\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"poster\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"poster\"],\n[data-dsh-portal-synced][data-dsh-font=\"poster\"] {\n  --dsh-font-display: Impact, \"Arial Black\", \"Noto Sans SC Black\", \"SimHei\", \"黑体\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC Medium\", \"Noto Sans SC\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 900;\n  --dsh-display-tracking: -0.02em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"retro98\"] [data-dsh-style],\n:root[data-dsh-font=\"retro98\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"retro98\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"retro98\"],\n[data-dsh-portal-synced][data-dsh-font=\"retro98\"] {\n  --dsh-font-display: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-body: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-mono: \"Fixedsys\", Consolas, \"Courier New\", \"SimSun\", \"宋体\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"serif\"] [data-dsh-style],\n:root[data-dsh-font=\"serif\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"serif\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"serif\"],\n[data-dsh-portal-synced][data-dsh-font=\"serif\"] {\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"arcade\"] [data-dsh-style],\n:root[data-dsh-font=\"arcade\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"arcade\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"arcade\"],\n[data-dsh-portal-synced][data-dsh-font=\"arcade\"] {\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"modern\"] [data-dsh-style],\n:root[data-dsh-font=\"modern\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"modern\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"modern\"],\n[data-dsh-portal-synced][data-dsh-font=\"modern\"] {\n  --dsh-font-display: \"Source Sans 3\", \"Segoe UI\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Segoe UI\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Dual-layer body typography application (workbench + form controls + portaled menus/modals) */\n:where([data-dsh-style], [data-dsh-portal-synced]),\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(button, input, select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(button, input, select, textarea) {\n  font-family: var(--dsh-font-body);\n  letter-spacing: var(--dsh-body-tracking, normal);\n}\n\n/* Dual-layer display typography application (headings, tabs, header title, editorial titles) */\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(\n  h1,\n  h2,\n  h3,\n  [role=\"tab\"],\n  .dsh-header-title,\n  [data-dsh-serif],\n  [data-dsh-editorial-heading],\n  [data-dsh-card] :is(h2, h3, .dsh-card-title),\n  .dsh-card :is(h2, h3, .dsh-card-title),\n  [data-dsh-reader] :is(h1, h2),\n  .dsh-reader :is(h1, h2)\n),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(h1, h2, h3, header h2, [role=\"tab\"], [data-dsh-serif]) {\n  font-family: var(--dsh-font-display);\n  font-weight: var(--dsh-display-weight, 700);\n  letter-spacing: var(--dsh-display-tracking, normal);\n}\n\n/* Monospace code typography */\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(code, pre, kbd, samp),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(code, pre, kbd, samp) {\n  font-family: var(--dsh-font-mono);\n}\n\n/* --------------------------------------------------------------------------\n * 11. Interactive Dynamics: Tactile Button Physics & Active States\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n  /* Identity transforms prevent mid-interaction stacking-context shifts */\n  translate: 0px 0px;\n  scale: 1;\n  transition-property: background-color, border-color, color, box-shadow, opacity, translate, scale;\n  transition-duration: var(--dsh-motion-fast);\n  transition-timing-function: var(--dsh-ease-out);\n}\n\n/* Visible active style on open menu triggers */\n:where([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  @media (hover: hover) {\n    :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: 0px -0.5px;\n    }\n\n    [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 3px 3px 0px #1e2826;\n      transition-timing-function: steps(2, end);\n      transition-duration: 70ms;\n    }\n\n    [data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 4px 4px 0px #2563eb;\n    }\n  }\n\n  /* Tactile spring press on standard themes */\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    scale: 0.965;\n    translate: 0px 0.5px;\n    transition-duration: 80ms;\n  }\n\n  /* Stepped 8-Bit arcade press (`translate(1px, 1px)` + crisp 1px pixel shadow) */\n  [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 1px 1px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #1e2826 !important;\n    transition-timing-function: steps(2, end);\n    transition-duration: 50ms;\n  }\n\n  /* Risograph shadow-collapse button press (`translate(2px, 2px)`) */\n  [data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 2px 2px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #18181b !important;\n    transition-duration: 60ms;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 12. Small-Button SVG Icon Micro-Animations\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n  translate: 0px 0px;\n  rotate: 0deg;\n  scale: 1;\n  transform-origin: center;\n}\n\n@keyframes dsh-icon-spin {\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes dsh-icon-wiggle {\n  0% { rotate: 0deg; }\n  25% { rotate: -12deg; }\n  55% { rotate: 10deg; }\n  80% { rotate: -5deg; }\n  100% { rotate: 0deg; }\n}\n\n@keyframes dsh-icon-pop {\n  0% { scale: 1; }\n  45% { scale: 1.26; }\n  75% { scale: 0.94; }\n  100% { scale: 1; }\n}\n\n@keyframes dsh-icon-bounce {\n  0%, 100% { translate: 0px 0px; }\n  45% { translate: 0px 2.5px; }\n  75% { translate: 0px -1px; }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n    transition:\n      translate var(--dsh-motion-base) var(--dsh-ease-spring),\n      rotate 240ms var(--dsh-ease-spring),\n      scale var(--dsh-motion-base) var(--dsh-ease-spring);\n  }\n\n  /* 1) `down` / chevron: 180deg flip on `[aria-expanded=\"true\"]` or `details[open]` */\n  :where([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"], details[open] > summary) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n    rotate: 180deg;\n  }\n\n  /* 2) `refresh` / `sync`: smooth 180deg spin on hover, continuous spin when busy */\n  :where([data-dsh-style]) :where(button, [role=\"button\"])[aria-busy=\"true\"] :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"]),\n  :where([data-dsh-style]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-icon=\"refresh\"])[data-spinning=\"true\"] {\n    animation: dsh-icon-spin 0.85s linear infinite;\n  }\n\n  @media (hover: hover) {\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-dsh-icon=\"reload\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"], svg[data-icon=\"reload\"]) {\n      rotate: 180deg;\n    }\n\n    /* 3) `plus` / `close`: crisp 90deg turn */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"plus\"], svg[data-dsh-icon=\"add\"], svg[data-dsh-icon=\"close\"], svg[data-dsh-icon=\"x\"], svg[data-icon=\"plus\"], svg[data-icon=\"add\"], svg[data-icon=\"close\"], svg[data-icon=\"x\"]) {\n      rotate: 90deg;\n    }\n\n    /* 4) `send` / `external` / `link`: forward/diagonal glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], a):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"send\"], svg[data-dsh-icon=\"external\"], svg[data-dsh-icon=\"link\"], svg[data-icon=\"send\"], svg[data-icon=\"external\"], svg[data-icon=\"link\"]) {\n      translate: 2px -1.5px;\n    }\n\n    /* 5) `reply` / `left` / `undo`: leading glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"reply\"], svg[data-dsh-icon=\"left\"], svg[data-dsh-icon=\"undo\"], svg[data-icon=\"reply\"], svg[data-icon=\"left\"], svg[data-icon=\"undo\"]) {\n      translate: -2px 0px;\n    }\n\n    /* 6) `right` / `play`: trailing nudge & pulse */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"right\"], svg[data-icon=\"right\"]) {\n      translate: 2px 0px;\n    }\n\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"play\"], svg[data-icon=\"play\"]) {\n      translate: 1.5px 0px;\n      scale: 1.14;\n    }\n\n    /* 7) `trash` / `delete`: tactile warning wiggle */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"trash\"], svg[data-dsh-icon=\"delete\"], svg[data-icon=\"trash\"], svg[data-icon=\"delete\"]) {\n      animation: dsh-icon-wiggle 360ms var(--dsh-ease-in-out);\n    }\n\n    /* 8) `star` / `check` / `copy` / `bookmark`: spring pop */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-dsh-icon=\"bookmark\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"], svg[data-icon=\"bookmark\"]) {\n      scale: 1.18;\n    }\n\n    /* 9) `download` / `export`: vertical bounce */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"download\"], svg[data-dsh-icon=\"export\"], svg[data-icon=\"download\"], svg[data-icon=\"export\"]) {\n      animation: dsh-icon-bounce 420ms var(--dsh-ease-out);\n    }\n\n    /* 10) `palette` / `sparkles` / `edit`: playful tilt */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"palette\"], svg[data-dsh-icon=\"sparkles\"], svg[data-dsh-icon=\"edit\"], svg[data-icon=\"palette\"], svg[data-icon=\"sparkles\"], svg[data-icon=\"edit\"]) {\n      rotate: -12deg;\n      scale: 1.08;\n    }\n\n    /* Closed chevron gentle downward cue on hover */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"])[aria-expanded=\"false\"]:hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n      translate: 0px 1.5px;\n    }\n  }\n\n  /* Pop feedback when toggled into active/pressed/checked state */\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where([aria-pressed=\"true\"], [aria-checked=\"true\"], [data-active=\"true\"], [data-copied=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"]) {\n    animation: dsh-icon-pop 300ms var(--dsh-ease-spring);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 13. v3 Layout Primitives: Unified 48px Single-Row Header\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  min-height: 48px;\n  padding: 6px 14px;\n  flex: none;\n  min-width: 0;\n  background: var(--dsw-alias-bg-base);\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n}\n\n.dsh-header-leading {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.dsh-header-brand {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n  flex: none;\n  white-space: nowrap;\n}\n\n.dsh-header-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  width: 24px;\n  height: 24px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-button-primary-fill, #4176e6);\n  color: var(--dsw-alias-button-primary-ink, #ffffff);\n}\n\n.dsh-header-title {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: var(--dsh-display-weight, 650);\n  line-height: 1.25;\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n}\n\n.dsh-header-tabs {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.dsh-header-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: none;\n  white-space: nowrap;\n}\n\n@container (max-width: 759px) {\n  :where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {\n    flex-wrap: wrap;\n    padding-block: 6px;\n  }\n\n  .dsh-header-leading {\n    flex-wrap: wrap;\n    gap: 6px 10px;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 14. v3 Tabs: Sliding Indicator + 140ms `@starting-style` Panel Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where([role=\"tablist\"], .dsh-tablist) {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  min-width: 0;\n  overflow-x: auto;\n  scrollbar-width: thin;\n}\n\n:where([data-dsh-style]) [role=\"tab\"] {\n  position: relative;\n  flex: none;\n  white-space: nowrap;\n}\n\n/* Static fallback underline when sliding indicator is not active (or in forced-colors) */\n:where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  content: \"\";\n  position: absolute;\n  inset-inline: 6px;\n  inset-block-end: 0;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  pointer-events: none;\n}\n\n[data-dsh-style] :where([data-dsh-tablist][data-indicator-ready=\"true\"], .dsh-tablist[data-indicator-ready=\"true\"]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  opacity: 0;\n}\n\n.dsh-tab-indicator {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-end: 0;\n  height: 2px;\n  width: var(--dsh-tab-w, 0px);\n  translate: var(--dsh-tab-x, 0px) 0px;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  border-radius: 2px 2px 0 0;\n  pointer-events: none;\n  opacity: 0;\n  transition:\n    translate 180ms var(--dsh-ease-out),\n    width 180ms var(--dsh-ease-out),\n    opacity 120ms ease-out;\n}\n\n[data-indicator-ready=\"true\"] > .dsh-tab-indicator {\n  opacity: 1;\n}\n\n.dsh-tablist-pill > .dsh-tab-indicator {\n  inset-block: 3px;\n  height: auto;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-interactive-bg-active);\n  z-index: 0;\n}\n\n.dsh-tablist-pill > [role=\"tab\"] {\n  z-index: 1;\n}\n\n[data-dsh-style=\"eink\"] .dsh-tab-indicator {\n  transition-duration: 60ms;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-tab-indicator {\n  border-radius: 0px !important;\n  transition-timing-function: steps(4, end);\n}\n\n/* 140ms `@starting-style` + keyframe fade-in for active tab panels */\n@keyframes dsh-tab-panel-enter {\n  from {\n    opacity: 0;\n    translate: 0px 4px;\n  }\n  to {\n    opacity: 1;\n    translate: 0px 0px;\n  }\n}\n\n:where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {\n  opacity: 1;\n  translate: 0px 0px;\n  transition:\n    opacity 140ms var(--dsh-ease-out),\n    translate 140ms var(--dsh-ease-out);\n  animation: dsh-tab-panel-enter 140ms var(--dsh-ease-out);\n}\n\n@starting-style {\n  :where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {\n    opacity: 0;\n    translate: 0px 4px;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 15. v3 Resizable Split Pane (`.dsh-split-pane` + `.dsh-split-resizer`)\n *     - Pointer-capture drag + double-click reset + ArrowLeft/ArrowRight\n *     - Auto-stack fallback below 760px container/viewport width\n * -------------------------------------------------------------------------- */\n.dsh-split-pane {\n  display: flex;\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n  width: 100%;\n}\n\n.dsh-split-leading {\n  flex: none;\n  min-width: 0;\n  min-height: 0;\n  width: var(--dsh-split-size, 320px);\n}\n\n.dsh-split-trailing {\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n}\n\n.dsh-split-resizer {\n  position: relative;\n  flex: none;\n  width: 9px;\n  min-height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: col-resize;\n  touch-action: none;\n  user-select: none;\n  background: transparent;\n  outline: none;\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"] {\n  width: 100%;\n  height: 9px;\n  min-height: 9px;\n  cursor: row-resize;\n}\n\n.dsh-split-resizer::before {\n  content: \"\";\n  width: 1px;\n  height: 100%;\n  background: var(--dsw-alias-border-l2);\n  transition:\n    width 120ms var(--dsh-ease-out),\n    background-color 120ms var(--dsh-ease-out);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]::before {\n  width: 100%;\n  height: 1px;\n}\n\n.dsh-split-resizer::after {\n  content: \"\";\n  position: absolute;\n  width: 3px;\n  height: 28px;\n  border-radius: 999px;\n  background: var(--dsw-alias-border-l3);\n  opacity: 0;\n  transition:\n    opacity 120ms var(--dsh-ease-out),\n    background-color 120ms var(--dsh-ease-out);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]::after {\n  width: 28px;\n  height: 3px;\n}\n\n.dsh-split-resizer:hover::before,\n.dsh-split-resizer:focus-visible::before,\n.dsh-split-resizer[data-dragging=\"true\"]::before {\n  width: 2px;\n  background: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]:is(:hover, :focus-visible, [data-dragging=\"true\"])::before {\n  width: 100%;\n  height: 2px;\n}\n\n.dsh-split-resizer:is(:hover, :focus-visible, [data-dragging=\"true\"])::after {\n  opacity: 1;\n  background: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-split-resizer:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary);\n  outline-offset: -2px;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-split-resizer::before {\n  width: 2px;\n  background: #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-split-resizer::after {\n  border-radius: 0px;\n}\n\n@container (max-width: 759px) {\n  .dsh-split-pane {\n    flex-direction: column;\n    overflow-y: auto;\n  }\n\n  .dsh-split-leading {\n    width: 100% !important;\n    max-width: 100%;\n    flex: none;\n  }\n\n  .dsh-split-resizer {\n    display: none;\n  }\n}\n\n@media (max-width: 759px) {\n  .dsh-split-pane {\n    flex-direction: column;\n    overflow-y: auto;\n  }\n\n  .dsh-split-leading {\n    width: 100% !important;\n    max-width: 100%;\n    flex: none;\n  }\n\n  .dsh-split-resizer {\n    display: none;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 16. v3 Theme-Tinted Shimmer Skeleton & Pixel Progress Helpers\n * -------------------------------------------------------------------------- */\n@keyframes dsh-skeleton-shimmer {\n  0% { background-position: 100% 0; }\n  100% { background-position: -100% 0; }\n}\n\n.dsh-skeleton-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n}\n\n.dsh-skeleton {\n  display: block;\n  width: 100%;\n  height: 12px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background-color: var(--dsw-alias-bg-layer-2, #e5e7eb);\n  background-image: linear-gradient(\n    90deg,\n    var(--dsw-alias-bg-layer-2, #e5e7eb) 0%,\n    color-mix(in oklab, var(--dsw-alias-bg-overlay, #ffffff) 82%, var(--dsw-alias-state-business-primary, #4176e6) 18%) 48%,\n    var(--dsw-alias-bg-layer-2, #e5e7eb) 100%\n  );\n  background-size: 220% 100%;\n  background-position: 100% 0;\n}\n\n.dsh-skeleton-circle {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex: none;\n}\n\n.dsh-skeleton-card {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px 14px;\n  border-radius: var(--dsw-radius-md, 12px);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n}\n\n.dsh-skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"eink\"])) .dsh-skeleton[data-animated=\"true\"] {\n    animation: dsh-skeleton-shimmer 1.35s var(--dsh-ease-in-out) infinite;\n  }\n\n  [data-dsh-style=\"pixel8bit\"] .dsh-skeleton[data-animated=\"true\"] {\n    border-radius: 0px !important;\n    border: 1px solid #1e2826;\n    animation-timing-function: steps(4, end);\n  }\n}\n\n[data-dsh-style=\"eink\"] .dsh-skeleton {\n  background-image: none;\n  border: 1px solid #c5c2b8;\n}\n\n/* Stepped pixel progress helper */\n.dsh-progress {\n  position: relative;\n  width: 100%;\n  height: 6px;\n  overflow: clip;\n  border-radius: 999px;\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.dsh-progress-bar {\n  height: 100%;\n  width: var(--dsh-progress-value, 0%);\n  border-radius: inherit;\n  background: var(--dsw-alias-state-business-primary);\n  transition: width 200ms var(--dsh-ease-out);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-progress {\n  height: 10px;\n  border-radius: 0px !important;\n  border: 2px solid #1e2826;\n  background: var(--dsw-alias-bg-layer-1);\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-progress-bar {\n  border-radius: 0px !important;\n  background: repeating-linear-gradient(\n    90deg,\n    #2e7d5b 0px,\n    #2e7d5b 6px,\n    #24674a 6px,\n    #24674a 8px\n  );\n  transition-timing-function: steps(8, end);\n}\n\n/* --------------------------------------------------------------------------\n * 17. v3 Interactive Cards, Rows, Quick-Action Bar & Top-Layer Dialog Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where([data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: 0px 0px;\n  transition:\n    background-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    border-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    box-shadow var(--dsh-motion-base) var(--dsh-ease-out),\n    translate var(--dsh-motion-base) var(--dsh-ease-out);\n}\n\n/* Row Hover Quick-Action Bar (`.dsh-row-actions`) */\n.dsh-row-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex: none;\n  translate: 0px 0px;\n  transition:\n    opacity var(--dsh-motion-fast) var(--dsh-ease-out),\n    translate var(--dsh-motion-fast) var(--dsh-ease-out);\n}\n\n@media (hover: hover) {\n  :where([data-dsh-row], .dsh-row) .dsh-row-actions:not([data-always-visible=\"true\"]) {\n    opacity: 0;\n    translate: 4px 0px;\n    pointer-events: none;\n  }\n\n  :where([data-dsh-row], .dsh-row):is(:hover, :focus-within, [data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-row-actions {\n    opacity: 1;\n    translate: 0px 0px;\n    pointer-events: auto;\n  }\n}\n\n@media (hover: hover) and (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where([data-dsh-card], .dsh-card):hover {\n    translate: 0px -1.5px;\n    box-shadow: var(--dsh-card-hover-shadow);\n  }\n\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 4px 4px 0px #1e2826;\n  }\n\n  [data-dsh-style=\"risograph\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 5px 5px 0px #ff3e7f;\n  }\n\n  :where([data-dsh-style]) :where([data-dsh-row], .dsh-row):hover:not([data-selected=\"true\"]):not([aria-selected=\"true\"]):not([data-active=\"true\"]) {\n    background-color: var(--dsh-surface-spotlight, var(--dsw-alias-interactive-bg-hover));\n  }\n}\n\n/* Modal / Dialog & Popover Top-Layer Entrance + Scroll Containment */\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n  overscroll-behavior: contain;\n  opacity: 1;\n  transition-property: opacity, scale, translate, display, overlay;\n  transition-duration: var(--dsh-motion-dialog);\n  transition-timing-function: var(--dsh-ease-out);\n  /* Separate declaration after transition so older parsers never drop transitions */\n  transition-behavior: allow-discrete;\n}\n\n@starting-style {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: 1;\n    translate: 0px 0px;\n  }\n\n  @starting-style {\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n      scale: 0.965;\n      translate: 0px 6px;\n    }\n  }\n}\n\ndialog[open]::backdrop {\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n\n/* --------------------------------------------------------------------------\n * 18. v3 Calm Compact Update Strip (`[data-plugin-update-footer]`)\n *     Keeps `@stardustlc/dsh-updates` footer compact at bottom without\n *     crushing or cutting off `flex: 1` split-pane columns.\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) [data-plugin-update-footer] {\n  flex: none;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 32px;\n  margin: 0;\n  padding: 6px 14px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px 12px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n}\n\n:where([data-dsh-style]) [data-plugin-update-footer] :where(button, a) {\n  min-height: 24px;\n  font-size: 11.5px;\n}\n\n:where([data-dsh-style]) [data-show-updates=\"false\"] [data-plugin-update-footer] {\n  display: none;\n}\n\n/* --------------------------------------------------------------------------\n * 19. Unified Header Style & Font Switcher Chrome (`.dsh-style-switcher`)\n * -------------------------------------------------------------------------- */\n.dsh-style-switcher {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  flex: none;\n  white-space: nowrap;\n}\n\n.dsh-style-trigger.dsh-style-trigger,\n.dsh-font-trigger.dsh-font-trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 28px;\n  height: 28px;\n  padding-inline: 8px;\n  width: auto;\n  flex-shrink: 0;\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 500;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-sm, 8px);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.dsh-font-trigger.dsh-font-trigger {\n  gap: 5px;\n  padding-inline: 7px;\n}\n\n.dsh-font-glyph {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  min-width: 16px;\n  height: 16px;\n  padding-inline: 3px;\n  border-radius: var(--dsw-radius-xs, 4px);\n  background: var(--dsw-alias-state-business-tertiary, rgba(65, 118, 230, 0.12));\n  color: var(--dsw-alias-state-business-primary, var(--dsw-alias-label-primary));\n  font-family: var(--dsh-font-display);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.dsh-style-label,\n.dsh-font-label {\n  white-space: nowrap;\n  line-height: 1;\n}\n\n@media (hover: hover) {\n  .dsh-style-trigger.dsh-style-trigger:hover:not(:disabled),\n  .dsh-font-trigger.dsh-font-trigger:hover:not(:disabled) {\n    color: var(--dsw-alias-label-primary);\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.dsh-style-swatch {\n  display: inline-block;\n  flex: none;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  corner-shape: round;\n  background: var(--dsh-swatch-color, var(--dsw-alias-state-business-primary));\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-style-swatch {\n  border-radius: 0px !important;\n  corner-shape: square;\n  box-shadow: 1px 1px 0px #1e2826;\n}\n\n.dsh-style-fallback-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsh-style-fallback-menu {\n  position: absolute;\n  inset-block-start: calc(100% + 4px);\n  inset-inline-end: 0;\n  z-index: 2147483001;\n  display: grid;\n  gap: 2px;\n  min-width: 186px;\n  max-height: min(420px, 70dvh);\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 4px;\n  background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base));\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-md, 12px);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n.dsh-style-fallback-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  min-height: 28px;\n  padding: 4px 8px;\n  border: 0;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  font-size: 12px;\n  text-align: start;\n  cursor: pointer;\n}\n\n.dsh-style-fallback-item-leading {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n}\n\n.dsh-style-fallback-item[aria-checked=\"true\"] {\n  background: var(--dsw-alias-interactive-bg-active);\n  font-weight: 600;\n}\n\n@media (hover: hover) {\n  .dsh-style-fallback-item:hover:not(:disabled) {\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n/* Fallback Modal & Menu Chrome (when host `@deepseek-ai/dsh-client-ui-primitives` is absent) */\n.dsh-fallback-modal-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  display: grid;\n  place-items: center;\n  padding: 16px;\n}\n\n.dsh-fallback-modal-mask {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.36);\n}\n\n.dsh-fallback-modal-dialog {\n  position: relative;\n  z-index: 1;\n  max-width: min(560px, calc(100dvw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: clip;\n  display: flex;\n  flex-direction: column;\n  border-radius: var(--dsw-radius-md, 12px);\n  background: var(--dsw-alias-bg-layer-1, #f8fafc);\n  color: var(--dsw-alias-label-primary, #1f232b);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n/* --------------------------------------------------------------------------\n * 20. Accessibility: Reduced Motion & Windows High Contrast (Forced Colors)\n * -------------------------------------------------------------------------- */\n@media (prefers-reduced-motion: reduce) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row, .dsh-row-actions, .dsh-tab-panel, [data-dsh-tab-panel]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n    translate: none !important;\n    scale: none !important;\n    animation: none !important;\n    transition-property: background-color, border-color, color, opacity;\n    transition-duration: 90ms;\n  }\n\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], summary) svg,\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row)::before,\n  [data-dsh-style=\"pixel8bit\"] .dsh-pixel-cursor {\n    animation: none !important;\n    transition: none !important;\n    translate: none !important;\n    scale: none !important;\n  }\n\n  .dsh-tab-indicator {\n    transition-property: opacity;\n    transition-duration: 90ms;\n  }\n\n  .dsh-skeleton {\n    animation: none !important;\n    background-image: none;\n  }\n\n  /* Short, non-spatial fade only for top-layer dialogs under reduced motion */\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: none !important;\n    translate: none !important;\n    transition-duration: 100ms;\n  }\n}\n\n@media (forced-colors: active) {\n  :where([data-dsh-style]) :where(button, input, select, textarea, [data-dsh-card], .dsh-card),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], :has([data-dsh-style])) {\n    border: 1px solid ButtonText;\n  }\n\n  :where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n    opacity: 1 !important;\n    border-block-end: 3px solid Highlight;\n  }\n\n  .dsh-tab-indicator {\n    background: transparent !important;\n    border-block-end: 3px solid Highlight;\n  }\n\n  .dsh-split-resizer::before,\n  .dsh-split-resizer::after {\n    background: ButtonText;\n  }\n\n  .dsh-skeleton {\n    border: 1px solid GrayText;\n    background: Canvas;\n  }\n}\n";
/**
 * DeepSeek Harness (>=0.2.2-rc.3) Unified Style Switcher, Layout & Motion Primitives v3
 * Shared across STARDUSTLC666 workbench plugins:
 *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,
 *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes
 *
 * Zero external runtime imports: accepts `React` and optional `require` so this
 * module can be bundled via esbuild IIFE or inlined into classic DSH client
 * scripts without requiring `react` in plugin `node_modules` or triggering
 * eager UI `require()` calls during `window.__ModuleLoader__.load`.
 */

const DSH_STYLE_STORAGE_KEY = 'dsh-stardust:ui-style';
const DSH_STYLE_EVENT = 'dsh-stardust-style';
const DSH_DEFAULT_STYLE = 'harness';

const DSH_FONT_STORAGE_KEY = 'dsh-stardust:ui-font';
const DSH_FONT_EVENT = 'dsh-stardust-font';
const DSH_DEFAULT_FONT = 'arcade';

const DSH_FONTS = Object.freeze([
  Object.freeze({
    id: 'arcade',
    zh: '幼圆等宽（默认）',
    zhShort: '幼圆',
    en: 'YouYuan Mono (Default)',
    enShort: 'YouYuan',
  }),
  Object.freeze({
    id: 'auto',
    zh: '跟随风格专属字',
    zhShort: '专属字',
    en: 'Match Style Font',
    enShort: 'Style Font',
  }),
  Object.freeze({
    id: 'songkai',
    zh: '中宋+楷书',
    zhShort: '中宋楷',
    en: 'Song + Kai',
    enShort: 'Song+Kai',
  }),
  Object.freeze({
    id: 'fangsong',
    zh: '工程仿宋',
    zhShort: '仿宋',
    en: 'Blueprint FangSong',
    enShort: 'FangSong',
  }),
  Object.freeze({
    id: 'poster',
    zh: '重磅画报黑',
    zhShort: '画报黑',
    en: 'Poster Sans',
    enShort: 'Poster',
  }),
  Object.freeze({
    id: 'retro98',
    zh: '千禧新宋',
    zhShort: '新宋98',
    en: 'Retro 98 SimSun',
    enShort: 'Retro 98',
  }),
  Object.freeze({
    id: 'serif',
    zh: '思源书宋',
    zhShort: '书宋',
    en: 'Book Serif',
    enShort: 'Serif',
  }),
  Object.freeze({
    id: 'modern',
    zh: '现代思源黑',
    zhShort: '思源黑',
    en: 'Modern Sans',
    enShort: 'Modern',
  }),
]);

const DSH_STYLES = Object.freeze([
  Object.freeze({
    id: 'harness',
    zh: '原生清透',
    zhShort: '原生',
    en: 'Native Airy',
    enShort: 'Native',
    swatch: '#4176e6',
    surface: '#f8fafc',
  }),
  Object.freeze({
    id: 'cream',
    zh: '米白纸感',
    zhShort: '米白色',
    en: 'Warm Cream',
    enShort: 'Cream',
    swatch: '#9e5829',
    surface: '#faf7f0',
  }),
  Object.freeze({
    id: 'claude',
    zh: 'Claude 暖书卷',
    zhShort: 'Claude风',
    en: 'Claude Warmth',
    enShort: 'Claude',
    swatch: '#c96442',
    surface: '#f5f4ed',
  }),
  Object.freeze({
    id: 'pixel8bit',
    zh: '8-Bit 掌机',
    zhShort: '8-Bit',
    en: 'Bright 8-Bit',
    enShort: '8-Bit',
    swatch: '#2e7d5b',
    surface: '#f4f6e8',
  }),
  Object.freeze({
    id: 'mint',
    zh: '晴空薄荷',
    zhShort: '薄荷',
    en: 'Airy Mint',
    enShort: 'Mint',
    swatch: '#0f766e',
    surface: '#f5fafb',
  }),
  Object.freeze({
    id: 'glass',
    zh: '晴昼琉璃',
    zhShort: '琉璃',
    en: 'Daylight Glass',
    enShort: 'Glass',
    swatch: '#4f6df5',
    surface: '#f3f7ff',
  }),
  Object.freeze({
    id: 'eink',
    zh: '护眼墨水屏',
    zhShort: '墨水屏',
    en: 'E-Ink Paper',
    enShort: 'E-Ink',
    swatch: '#171716',
    surface: '#f2f1ec',
  }),
  Object.freeze({
    id: 'blueprint',
    zh: '工程晒图',
    zhShort: '晒图',
    en: 'Blueprint',
    enShort: 'Blueprint',
    swatch: '#0d3b66',
    surface: '#eaf3fb',
  }),
  Object.freeze({
    id: 'risograph',
    zh: '波普孔版',
    zhShort: '孔版',
    en: 'Riso Zine',
    enShort: 'Riso',
    swatch: '#ff3e7f',
    surface: '#faf6ee',
  }),
  Object.freeze({
    id: 'win98',
    zh: '千禧复古',
    zhShort: '复古98',
    en: 'Retro 98',
    enShort: 'Retro 98',
    swatch: '#1b4f9c',
    surface: '#dcdcdc',
  }),
  Object.freeze({
    id: 'songhui',
    zh: '宋韵朱砂',
    zhShort: '宋韵',
    en: 'Song Xuan',
    enShort: 'Song',
    swatch: '#b83b2a',
    surface: '#f7f3e8',
  }),
  Object.freeze({
    id: 'frutiger',
    zh: '晴空水晶',
    zhShort: '水晶',
    en: 'Aqua Gloss',
    enShort: 'Aqua',
    swatch: '#0ea5e9',
    surface: '#eaf7ff',
  }),
  Object.freeze({
    id: 'gazette',
    zh: '铅字晨报',
    zhShort: '晨报',
    en: 'Gazette',
    enShort: 'Gazette',
    swatch: '#9b1c1c',
    surface: '#f6f3ec',
  }),
]);

const VALID_STYLE_IDS = new Set(DSH_STYLES.map(preset => preset.id));
const VALID_FONT_IDS = new Set(DSH_FONTS.map(preset => preset.id));

function resolveWindow(win) {
  if (win && typeof win === 'object') return win;
  return typeof window !== 'undefined' ? window : null;
}

function resolveReact(explicitReact) {
  if (explicitReact && typeof explicitReact.createElement === 'function') return explicitReact;
  if (typeof globalThis !== 'undefined' && globalThis.React && typeof globalThis.React.createElement === 'function') {
    return globalThis.React;
  }
  return null;
}

function clampNumber(value, min, max) {
  const lo = Number.isFinite(min) ? min : 0;
  const hi = Number.isFinite(max) ? Math.max(lo, max) : lo;
  const num = Number(value);
  if (!Number.isFinite(num)) return lo;
  return Math.min(hi, Math.max(lo, num));
}

function normalizeDshStyle(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return VALID_STYLE_IDS.has(key) ? key : DSH_DEFAULT_STYLE;
}

function getDshStylePreset(value) {
  const id = normalizeDshStyle(value);
  return DSH_STYLES.find(preset => preset.id === id) || DSH_STYLES[0];
}

function readDshStyle(win) {
  const target = resolveWindow(win);
  if (!target) return DSH_DEFAULT_STYLE;
  try {
    const raw = target.localStorage?.getItem(DSH_STYLE_STORAGE_KEY);
    return normalizeDshStyle(raw);
  } catch {
    return DSH_DEFAULT_STYLE;
  }
}

function normalizeDshFont(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return VALID_FONT_IDS.has(key) ? key : DSH_DEFAULT_FONT;
}

function getDshFontPreset(value) {
  const id = normalizeDshFont(value);
  return DSH_FONTS.find(preset => preset.id === id) || DSH_FONTS[0];
}

function readDshFont(win) {
  const target = resolveWindow(win);
  if (!target) return DSH_DEFAULT_FONT;
  try {
    const raw = target.localStorage?.getItem(DSH_FONT_STORAGE_KEY);
    return normalizeDshFont(raw);
  } catch {
    return DSH_DEFAULT_FONT;
  }
}

/**
 * Stamps `[data-dsh-style]`, `[data-dsh-font]`, and `[data-window-drag-exclude]` onto
 * any currently open portaled `[role="dialog"]` / `[role="menu"]` surfaces in
 * `document.body` that were synced via `createOverlaySyncRef` or carry
 * `[data-dsh-portal-synced]`, plus `[data-dsh-font]` onto `document.documentElement`.
 */
function syncPortaledOverlays(style, doc, font) {
  const normalized = normalizeDshStyle(style);
  const normalizedFont = normalizeDshFont(font ?? readDshFont());
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) return;
  if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
    targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
  }
  if (typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced]')) {
    el.setAttribute('data-dsh-style', normalized);
    el.setAttribute('data-dsh-font', normalizedFont);
    if (!el.hasAttribute('data-window-drag-exclude')) {
      el.setAttribute('data-window-drag-exclude', '');
    }
  }
}

function syncPortaledFont(font, doc) {
  const normalizedFont = normalizeDshFont(font);
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) return;
  if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
    targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
  }
  if (typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced], [data-dsh-style]')) {
    el.setAttribute('data-dsh-font', normalizedFont);
  }
}

function writeDshStyle(nextStyle, win) {
  const normalized = normalizeDshStyle(nextStyle);
  const target = resolveWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_STYLE_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledOverlays(normalized, target.document, readDshFont(target));
    if (typeof target.dispatchEvent === 'function') {
      try {
        const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEventCtor(DSH_STYLE_EVENT, { detail: { style: normalized } }));
        } else if (typeof Event === 'function') {
          const ev = new Event(DSH_STYLE_EVENT);
          ev.detail = { style: normalized };
          target.dispatchEvent(ev);
        }
      } catch {
        // Ignore synthetic event errors in minimal VM environments.
      }
    }
  }
  return normalized;
}

function writeDshFont(nextFont, win) {
  const normalized = normalizeDshFont(nextFont);
  const target = resolveWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_FONT_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledFont(normalized, target.document);
    if (typeof target.dispatchEvent === 'function') {
      try {
        const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEventCtor(DSH_FONT_EVENT, { detail: { font: normalized } }));
        } else if (typeof Event === 'function') {
          const ev = new Event(DSH_FONT_EVENT);
          ev.detail = { font: normalized };
          target.dispatchEvent(ev);
        }
      } catch {
        // Ignore synthetic event errors in minimal VM environments.
      }
    }
  }
  return normalized;
}

function subscribeDshStyle(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshStyle(event?.detail?.style ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document, readDshFont(target));
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_STYLE_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshStyle(event?.newValue ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document, readDshFont(target));
    onChange(next);
  };
  target.addEventListener(DSH_STYLE_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_STYLE_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

function subscribeDshFont(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshFont(event?.detail?.font ?? readDshFont(target));
    syncPortaledFont(next, target.document);
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_FONT_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshFont(event?.newValue ?? readDshFont(target));
    syncPortaledFont(next, target.document);
    onChange(next);
  };
  target.addEventListener(DSH_FONT_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_FONT_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

/**
 * React hook returning `[style, setStyle]`, synced across plugins, tabs, and
 * portaled dialogs via `localStorage['dsh-stardust:ui-style']` + `dsh-stardust-style`.
 * Safe in minimal VM registration tests where `React.useState` may be absent.
 */
function useDshStyle(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshStyle(win), next => writeDshStyle(next, win)];
  }
  const [style, setStyleState] = React.useState(() => readDshStyle(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshStyle(win);
      setStyleState(prev => (prev === current ? prev : current));
      syncPortaledOverlays(current, resolveWindow(win)?.document, readDshFont(win));
      return subscribeDshStyle(next => {
        setStyleState(prev => (prev === next ? prev : next));
      }, win);
    }, [win]);
  }
  const setStyle = next => {
    const resolved = typeof next === 'function' ? next(style) : next;
    const applied = writeDshStyle(resolved, win);
    setStyleState(applied);
    return applied;
  };
  return [style, setStyle];
}

/**
 * React hook returning `[font, setFont]`, synced via `localStorage['dsh-stardust:ui-font']`
 * + `dsh-stardust-font` and applied via `[data-dsh-font]`.
 */
function useDshFont(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshFont(win), next => writeDshFont(next, win)];
  }
  const [font, setFontState] = React.useState(() => readDshFont(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshFont(win);
      setFontState(prev => (prev === current ? prev : current));
      syncPortaledFont(current, resolveWindow(win)?.document);
      return subscribeDshFont(next => {
        setFontState(prev => (prev === next ? prev : next));
      }, win);
    }, [win]);
  }
  const setFont = next => {
    const resolved = typeof next === 'function' ? next(font) : next;
    const applied = writeDshFont(resolved, win);
    setFontState(applied);
    return applied;
  };
  return [font, setFont];
}

/**
 * Callback ref for elements rendered inside host `@deepseek-ai/dsh-client-ui-primitives`
 * `Modal` or `Menu` portals (`createPortal(..., document.body)`).
 * Host `Modal` and `Menu` do not spread arbitrary `data-*` props onto their outer
 * `<div role="dialog">` / `<div role="menu">` wrapper, so attaching this ref to an
 * inner header/body wrapper promotes `data-dsh-style`, `data-dsh-font`, and
 * `data-window-drag-exclude` onto the portaled overlay frame itself.
 */
function createOverlaySyncRef(style, font) {
  const normalized = normalizeDshStyle(style);
  const normalizedFont = normalizeDshFont(font ?? readDshFont());
  return node => {
    if (!node || typeof node.setAttribute !== 'function') return;
    node.setAttribute('data-dsh-style', normalized);
    node.setAttribute('data-dsh-font', normalizedFont);
    node.setAttribute('data-window-drag-exclude', '');
    node.setAttribute('data-dsh-portal-synced', 'true');
    if (typeof node.closest === 'function') {
      const overlay = node.closest('[role="dialog"], [role="alertdialog"], [role="menu"], dialog');
      if (overlay) {
        overlay.setAttribute('data-dsh-style', normalized);
        overlay.setAttribute('data-dsh-font', normalizedFont);
        overlay.setAttribute('data-window-drag-exclude', '');
        overlay.setAttribute('data-dsh-portal-synced', 'true');
      }
    }
  };
}

/**
 * Shared crisp 24x24 stroke icons for workbench headers, buttons, and micro-animations.
 */
const DSH_ICON_PATHS = Object.freeze({
  mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
  inbox: ['M4 13 6 5h12l2 8v6H4z', 'M4 13h5l1 3h4l1-3h5'],
  send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
  search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
  plus: ['M12 5v14M5 12h14'],
  refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
  close: ['m6 6 12 12M18 6 6 18'],
  left: ['m14 5-7 7 7 7'],
  right: ['m10 5 7 7-7 7'],
  down: ['m5 9 7 7 7-7'],
  download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
  file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
  folder: ['M3 5h7l2 3h9v12H3z'],
  edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
  trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
  check: ['m5 12 4 4L19 6'],
  star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
  reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
  lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3M12 14v3'],
  clip: ['m8 13 6-6a2.5 2.5 0 0 1 3.5 3.5l-7 7a4 4 0 0 1-5.7-5.7l8-8a5 5 0 0 1 7.1 7.1l-8 8'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  image: ['M3 4h18v16H3z', 'm3 17 6-6 5 5 2-2 5 5M16 8h.01'],
  copy: ['M9 9h10v11H9z', 'M5 15H4V4h10v1'],
  external: ['M14 4h6v6', 'M10 14 20 4', 'M18 13v6H5V6h6'],
  link: ['M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11 4.9', 'M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L13 19.1'],
  play: ['m7 5 12 7-12 7Z'],
  palette: ['M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-2.2-4-4-9-4Z', 'M7.5 10.5h.01M10.5 7.5h.01M14.5 7.5h.01'],
  sparkles: ['m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z', 'M19 15v4M17 17h4'],
  calendar: ['M4 6h16v14H4z', 'M8 3v4M16 3v4M4 10h16'],
  shield: ['M12 3 5 6v6c0 5 3.4 8.3 7 9 3.6-.7 7-4 7-9V6Z'],
  rss: ['M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M4 11a9 9 0 0 1 9 9', 'M4 5a15 15 0 0 1 15 15'],
  grip: ['M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01'],
});

function renderDshIcon(React, { name = 'file', size = 16, paths = DSH_ICON_PATHS, ...props } = {}) {
  const h = React.createElement;
  const segments = paths[name] || DSH_ICON_PATHS[name] || DSH_ICON_PATHS.file;
  return h(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.65,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      focusable: 'false',
      'data-dsh-icon': name,
      ...props,
    },
    segments.map((d, index) => h('path', { key: index, d })),
  );
}

/**
 * Measures the active `[role="tab"][aria-selected="true"]` inside a `[role="tablist"]`
 * and drives CSS variables `--dsh-tab-x` / `--dsh-tab-w` for `.dsh-tab-indicator`.
 * Falls back cleanly to static `::after` border underline when layout is unavailable (jsdom)
 * or under `@media (forced-colors: active)`.
 */
function useSlidingTabIndicator(React, activeValue, options = {}) {
  const tablistRef = typeof React?.useRef === 'function' ? React.useRef(null) : { current: null };
  const [metrics, setMetrics] = typeof React?.useState === 'function'
    ? React.useState({ x: 0, width: 0, ready: false })
    : [{ x: 0, width: 0, ready: false }, () => {}];

  const syncIndicator = () => {
    const list = tablistRef.current;
    if (!list || typeof list.querySelector !== 'function') return;
    const activeTab = list.querySelector('[role="tab"][aria-selected="true"]');
    if (!activeTab) {
      list.setAttribute?.('data-indicator-ready', 'false');
      setMetrics(prev => (prev.ready ? { x: 0, width: 0, ready: false } : prev));
      return;
    }
    let x = typeof activeTab.offsetLeft === 'number' ? activeTab.offsetLeft : 0;
    let width = typeof activeTab.offsetWidth === 'number' ? activeTab.offsetWidth : 0;
    if (!width && typeof activeTab.getBoundingClientRect === 'function' && typeof list.getBoundingClientRect === 'function') {
      const tabRect = activeTab.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      if (tabRect && listRect && tabRect.width > 0) {
        width = tabRect.width;
        x = tabRect.left - listRect.left + (list.scrollLeft || 0);
      }
    }
    const ready = width > 0;
    if (list.style && typeof list.style.setProperty === 'function') {
      list.style.setProperty('--dsh-tab-x', `${Math.round(x)}px`);
      list.style.setProperty('--dsh-tab-w', `${Math.round(width)}px`);
    }
    list.setAttribute?.('data-indicator-ready', ready ? 'true' : 'false');
    setMetrics(prev => (
      prev.x === Math.round(x) && prev.width === Math.round(width) && prev.ready === ready
        ? prev
        : { x: Math.round(x), width: Math.round(width), ready }
    ));
  };

  const effectHook = typeof React?.useLayoutEffect === 'function'
    ? React.useLayoutEffect
    : (typeof React?.useEffect === 'function' ? React.useEffect : null);

  if (effectHook) {
    const deps = Array.isArray(options?.deps) ? [activeValue, ...options.deps] : [activeValue];
    effectHook(() => {
      syncIndicator();
      const list = tablistRef.current;
      const win = resolveWindow(options?.win);
      let ro = null;
      if (list && typeof win?.ResizeObserver === 'function') {
        try {
          ro = new win.ResizeObserver(() => syncIndicator());
          ro.observe(list);
        } catch {
          ro = null;
        }
      }
      if (win && typeof win.addEventListener === 'function') {
        win.addEventListener('resize', syncIndicator);
      }
      return () => {
        ro?.disconnect?.();
        if (win && typeof win.removeEventListener === 'function') {
          win.removeEventListener('resize', syncIndicator);
        }
      };
    }, deps);
  }

  const indicatorStyle = {
    '--dsh-tab-x': `${metrics.x}px`,
    '--dsh-tab-w': `${metrics.width}px`,
  };

  return {
    tablistRef,
    ready: metrics.ready,
    indicatorStyle,
    tablistProps: {
      ref: tablistRef,
      'data-dsh-tablist': '',
      'data-indicator-ready': metrics.ready ? 'true' : 'false',
    },
    indicatorProps: {
      className: 'dsh-tab-indicator',
      'aria-hidden': 'true',
      style: indicatorStyle,
    },
    syncIndicator,
  };
}

/**
 * Resizable split-pane hook with `localStorage` persistence, clamping, reset,
 * and ready-to-spread `resizerProps` for `DshSplitResizer`.
 */
function useResizableSplit(
  React,
  { key, initial = 320, min = 220, max = 560, orientation = 'vertical', reverse = false, win } = {},
) {
  const clampedInitial = clampNumber(initial, min, max);
  const readStored = () => {
    const target = resolveWindow(win);
    if (!key || !target) return clampedInitial;
    try {
      const raw = target.localStorage?.getItem(key);
      if (raw == null || raw === '') return clampedInitial;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? clampNumber(parsed, min, max) : clampedInitial;
    } catch {
      return clampedInitial;
    }
  };

  const writeStored = nextSize => {
    const clamped = Math.round(clampNumber(nextSize, min, max));
    const target = resolveWindow(win);
    if (key && target) {
      try {
        target.localStorage?.setItem(key, String(clamped));
      } catch {
        // Ignore restricted storage errors.
      }
    }
    return clamped;
  };

  const hasHooks = Boolean(React && typeof React.useState === 'function');
  const [size, setSizeState] = hasHooks ? React.useState(() => readStored()) : [readStored(), () => {}];
  const [isDragging, setIsDragging] = hasHooks ? React.useState(false) : [false, () => {}];

  const setSize = next => {
    const resolved = typeof next === 'function' ? next(size) : next;
    const applied = writeStored(resolved);
    setSizeState(applied);
    return applied;
  };

  const reset = () => {
    const applied = writeStored(clampedInitial);
    setSizeState(applied);
    return applied;
  };

  return {
    size,
    width: size,
    setSize,
    reset,
    isDragging,
    setIsDragging,
    paneStyle: { '--dsh-split-size': `${size}px` },
    resizerProps: {
      value: size,
      initial: clampedInitial,
      min,
      max,
      orientation,
      reverse,
      onChange: setSize,
      onReset: reset,
      onDraggingChange: setIsDragging,
    },
  };
}

function renderDshSplitResizer(
  React,
  {
    value = 320,
    initial,
    min = 220,
    max = 560,
    orientation = 'vertical',
    reverse = false,
    step = 16,
    label = 'Resize pane',
    onChange,
    onReset,
    onDraggingChange,
    className,
    style,
    ...rest
  } = {},
) {
  const R = resolveReact(React);
  if (!R) return null;
  const h = R.createElement;
  const dragRef = typeof R.useRef === 'function' ? R.useRef(null) : { current: null };
  const [dragging, setDragging] = typeof R.useState === 'function' ? R.useState(false) : [false, () => {}];

  const isHorizontal = orientation === 'horizontal';
  const clampedValue = Math.round(clampNumber(value, min, max));

  const setDragActive = active => {
    setDragging(active);
    onDraggingChange?.(active);
  };

  const cleanupWindowListeners = () => {
    const drag = dragRef.current;
    if (drag?.cleanup) {
      drag.cleanup();
    }
    dragRef.current = null;
  };

  if (typeof R.useEffect === 'function') {
    R.useEffect(() => cleanupWindowListeners, []);
  }

  const updateFromClientPos = (clientX, clientY) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rawDelta = isHorizontal ? (clientY - drag.startY) : (clientX - drag.startX);
    const delta = reverse ? -rawDelta : rawDelta;
    const next = Math.round(clampNumber(drag.startValue + delta, min, max));
    onChange?.(next);
  };

  const handlePointerDown = event => {
    if (event?.button !== undefined && event.button !== 0) return;
    event?.preventDefault?.();
    const targetEl = event?.currentTarget;
    const pointerId = event?.pointerId;
    const startX = Number(event?.clientX ?? 0);
    const startY = Number(event?.clientY ?? 0);

    cleanupWindowListeners();

    let captured = false;
    if (targetEl && typeof targetEl.setPointerCapture === 'function' && pointerId !== undefined) {
      try {
        targetEl.setPointerCapture(pointerId);
        captured = true;
      } catch {
        captured = false;
      }
    }

    const win = resolveWindow();
    let cleanup = null;
    if (!captured && win && typeof win.addEventListener === 'function') {
      const onWinMove = moveEvent => updateFromClientPos(Number(moveEvent.clientX ?? 0), Number(moveEvent.clientY ?? 0));
      const onWinUp = () => {
        cleanupWindowListeners();
        setDragActive(false);
      };
      win.addEventListener('pointermove', onWinMove);
      win.addEventListener('mousemove', onWinMove);
      win.addEventListener('pointerup', onWinUp);
      win.addEventListener('mouseup', onWinUp);
      win.addEventListener('pointercancel', onWinUp);
      cleanup = () => {
        win.removeEventListener('pointermove', onWinMove);
        win.removeEventListener('mousemove', onWinMove);
        win.removeEventListener('pointerup', onWinUp);
        win.removeEventListener('mouseup', onWinUp);
        win.removeEventListener('pointercancel', onWinUp);
      };
    }

    dragRef.current = { startX, startY, startValue: clampedValue, pointerId, captured, cleanup };
    setDragActive(true);
  };

  const handlePointerMove = event => {
    if (!dragRef.current) return;
    updateFromClientPos(Number(event?.clientX ?? 0), Number(event?.clientY ?? 0));
  };

  const handlePointerEnd = event => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.captured && event?.currentTarget && typeof event.currentTarget.releasePointerCapture === 'function' && drag.pointerId !== undefined) {
      try {
        event.currentTarget.releasePointerCapture(drag.pointerId);
      } catch {
        // Ignore release errors when pointer already detached.
      }
    }
    cleanupWindowListeners();
    setDragActive(false);
  };

  const handleKeyDown = event => {
    const key = event?.key;
    const deltaStep = event?.shiftKey ? step * 2 : step;
    const dir = reverse ? -1 : 1;
    let next = null;
    if ((!isHorizontal && key === 'ArrowLeft') || (isHorizontal && key === 'ArrowUp')) {
      next = clampNumber(clampedValue - deltaStep * dir, min, max);
    } else if ((!isHorizontal && key === 'ArrowRight') || (isHorizontal && key === 'ArrowDown')) {
      next = clampNumber(clampedValue + deltaStep * dir, min, max);
    } else if (key === 'Home') {
      next = min;
    } else if (key === 'End') {
      next = max;
    }
    if (next !== null) {
      event?.preventDefault?.();
      onChange?.(Math.round(next));
    }
  };

  const handleDoubleClick = () => {
    if (typeof onReset === 'function') {
      onReset();
    } else if (initial !== undefined) {
      onChange?.(Math.round(clampNumber(initial, min, max)));
    }
  };

  return h('div', {
    ...rest,
    role: 'separator',
    tabIndex: 0,
    'aria-orientation': orientation,
    'aria-label': label,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': clampedValue,
    'data-dsh-resizer': '',
    'data-dragging': dragging ? 'true' : 'false',
    'data-window-drag-exclude': '',
    className: ['dsh-split-resizer', className].filter(Boolean).join(' '),
    style,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
    onLostPointerCapture: handlePointerEnd,
    onKeyDown: handleKeyDown,
    onDoubleClick: handleDoubleClick,
  });
}

function createSplitResizerComponent(React) {
  return function DshSplitResizerWithReact(props) {
    return renderDshSplitResizer(React, props);
  };
}

function DshSplitResizer(props = {}) {
  const { React: explicitReact, ...rest } = props;
  return renderDshSplitResizer(resolveReact(explicitReact), rest);
}

/**
 * Theme-tinted shimmer skeleton helper (`DshSkeleton` / `createSkeletonComponent` / `renderDshSkeleton`).
 * Honors `prefers-reduced-motion: reduce` and `eink` zero-distraction mode automatically via CSS.
 */
function renderDshSkeleton(
  React,
  {
    variant = 'text',
    lines = 3,
    width,
    height,
    radius,
    animated = true,
    label,
    className,
    style,
    ...rest
  } = {},
) {
  const R = resolveReact(React);
  if (!R) return null;
  const h = R.createElement;
  const a11yProps = label
    ? { role: 'status', 'aria-busy': 'true', 'aria-label': label }
    : { 'aria-hidden': 'true' };

  const baseBar = (barWidth, barHeight, key) =>
    h('span', {
      key,
      className: 'dsh-skeleton',
      'data-dsh-skeleton': variant,
      'data-animated': animated ? 'true' : 'false',
      style: {
        width: barWidth ?? width,
        height: barHeight ?? height,
        borderRadius: radius,
      },
    });

  if (variant === 'circle') {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', 'dsh-skeleton-circle', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'circle',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height, ...style },
    });
  }

  if (variant === 'rect') {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'rect',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height: height ?? '80px', borderRadius: radius, ...style },
    });
  }

  if (variant === 'row') {
    return h(
      'div',
      {
        ...a11yProps,
        ...rest,
        className: ['dsh-skeleton-row', className].filter(Boolean).join(' '),
        style,
      },
      h('span', {
        className: 'dsh-skeleton dsh-skeleton-circle',
        'data-dsh-skeleton': 'circle',
        'data-animated': animated ? 'true' : 'false',
      }),
      h(
        'div',
        { className: 'dsh-skeleton-group' },
        baseBar('58%', '12px', 'r1'),
        baseBar('84%', '10px', 'r2'),
      ),
    );
  }

  if (variant === 'card') {
    return h(
      'div',
      {
        ...a11yProps,
        ...rest,
        className: ['dsh-skeleton-card', className].filter(Boolean).join(' '),
        style,
      },
      baseBar('46%', '14px', 'c1'),
      baseBar('100%', '11px', 'c2'),
      baseBar('74%', '11px', 'c3'),
    );
  }

  const count = Math.max(1, Math.round(Number(lines) || 1));
  if (count === 1) {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'text',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height, borderRadius: radius, ...style },
    });
  }

  const bars = [];
  for (let i = 0; i < count; i += 1) {
    const isLast = i === count - 1;
    bars.push(baseBar(isLast ? '68%' : '100%', height, `l-${i}`));
  }
  return h(
    'div',
    {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton-group', className].filter(Boolean).join(' '),
      style,
    },
    bars,
  );
}

function createSkeletonComponent(React) {
  return function DshSkeletonWithReact(props) {
    return renderDshSkeleton(React, props);
  };
}

function DshSkeleton(props = {}) {
  const { React: explicitReact, ...rest } = props;
  return renderDshSkeleton(resolveReact(explicitReact), rest);
}

/**
 * Lazily resolves `@deepseek-ai/dsh-client-ui-primitives` on render and supplies
 * semantic, accessible HTML fallbacks when running in standalone `jsdom` or `node:vm`
 * tests where host UI primitives are not mounted.
 *
 * IMPORTANT: Call ONLY inside component render paths — never eagerly inside
 * `window.__ModuleLoader__.load({ factory })` or `apply(ctx)`.
 */
// React uses function identity to reconcile components. Keep wrappers and
// fallback controls stable across renders so a form update cannot remount a
// modal and repeat its initial autofocus. Resolve the host before consulting
// the cache so late loading, unloading and replacement still take effect.
const hostPrimitivesByReact = new WeakMap();

function resolveHostPrimitives(React, requireFn) {
  const h = React.createElement;
  let host = null;
  if (typeof requireFn === 'function') {
    try {
      host = requireFn('@deepseek-ai/dsh-client-ui-primitives') || null;
    } catch {
      host = null;
    }
  }

  let cached = hostPrimitivesByReact.get(React);
  if (!cached) {
    cached = new Map();
    hostPrimitivesByReact.set(React, cached);
  }
  if (cached.has(host)) return cached.get(host);

  function FallbackButton({ variant = 'ghost', size = 'md', icon, className, children, type = 'button', ...rest }) {
    const cls = ['dsh-btn', `dsh-btn-${variant}`, `dsh-btn-${size}`, className].filter(Boolean).join(' ');
    return h(
      'button',
      { type, className: cls, ...rest },
      icon != null ? h('span', { className: 'dsh-fallback-btn-icon' }, icon) : null,
      children,
    );
  }

  function FallbackInput({ icon, className, ...rest }) {
    const cls = ['dsh-fallback-input-wrap', className].filter(Boolean).join(' ');
    return h(
      'span',
      { className: cls },
      icon != null ? h('span', { className: 'dsh-fallback-input-icon' }, icon) : null,
      h('input', rest),
    );
  }

  function FallbackCheckbox({ checked = false, onChange, label, disabled = false, title, className, ...rest }) {
    return h(
      'label',
      { className, title },
      h('input', {
        type: 'checkbox',
        checked: Boolean(checked),
        disabled,
        onChange: event => onChange?.(Boolean(event?.target?.checked)),
        ...rest,
      }),
      h('span', null, label),
    );
  }

  function FallbackSwitch({ checked = false, onChange, label, disabled = false, title, className }) {
    return h(
      'button',
      {
        type: 'button',
        role: 'switch',
        'aria-checked': Boolean(checked),
        'aria-label': label,
        title,
        disabled,
        className,
        onClick: () => onChange?.(!checked),
      },
      h('span', null),
    );
  }

  function FallbackSegmentedControl({ id, value, options = [], onChange, label, disabled = false, className }) {
    return h(
      'div',
      { role: 'tablist', 'aria-label': label, className },
      options.map(opt => {
        const selected = opt.value === value;
        return h(
          'button',
          {
            key: opt.value,
            id: id ? `${id}-${opt.value}` : undefined,
            type: 'button',
            role: 'tab',
            'aria-selected': selected,
            tabIndex: selected ? 0 : -1,
            disabled: disabled || Boolean(opt.disabled),
            onClick: () => {
              if (!disabled && !opt.disabled && opt.value !== value) onChange?.(opt.value);
            },
          },
          opt.label,
        );
      }),
    );
  }

  function renderPortalSyncNode(styleValue, fontValue) {
    const syncStyle = normalizeDshStyle(styleValue ?? readDshStyle());
    const syncFont = normalizeDshFont(fontValue ?? readDshFont());
    return h('span', {
      key: '__dsh_portal_sync__',
      ref: createOverlaySyncRef(syncStyle, syncFont),
      hidden: true,
      'aria-hidden': 'true',
      'data-dsh-style': syncStyle,
      'data-dsh-font': syncFont,
    });
  }

  function FallbackMenu({
    open = false,
    anchor,
    items = [],
    children,
    selectedId,
    onSelect,
    onClose,
    footer,
    className,
    listClassName,
    dshStyle,
    dshFont,
  }) {
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    const font = normalizeDshFont(dshFont ?? readDshFont());
    return h(
      'div',
      { className: ['dsh-style-fallback-wrap', className].filter(Boolean).join(' ') },
      anchor,
      open
        ? h(
            'div',
            {
              role: 'menu',
              'data-dsh-style': style,
              'data-dsh-font': font,
              'data-window-drag-exclude': '',
              'data-dsh-portal-synced': 'true',
              className: ['dsh-style-fallback-menu', listClassName].filter(Boolean).join(' '),
              onKeyDown: event => {
                if (event?.key === 'Escape') {
                  event.stopPropagation?.();
                  onClose?.();
                }
              },
            },
            items.map(item => {
              const stylePreset = VALID_STYLE_IDS.has(item.id) ? getDshStylePreset(item.id) : null;
              return h(
                'button',
                {
                  key: item.id,
                  type: 'button',
                  role: 'menuitemradio',
                  'aria-checked': item.id === selectedId,
                  disabled: Boolean(item.disabled),
                  className: 'dsh-style-fallback-item',
                  onClick: () => {
                    if (!item.disabled) {
                      onSelect?.(item.id);
                      onClose?.();
                    }
                  },
                },
                h(
                  'span',
                  { className: 'dsh-style-fallback-item-leading' },
                  stylePreset
                    ? h('span', {
                        className: 'dsh-style-swatch',
                        'aria-hidden': 'true',
                        style: { '--dsh-swatch-color': stylePreset.swatch },
                      })
                    : null,
                  h('span', null, item.label),
                ),
                item.id === selectedId ? h('span', { 'aria-hidden': 'true' }, '✓') : null,
              );
            }),
            children,
            footer,
          )
        : null,
    );
  }

  function FallbackModal({
    open = true,
    onClose,
    title,
    closeLabel = 'Close',
    children,
    footer,
    className,
    contentClassName,
    onKeyDownCapture,
    headless = false,
    dshStyle,
    dshFont,
  }) {
    if (!open) return null;
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    const font = normalizeDshFont(dshFont ?? readDshFont());
    return h(
      'div',
      {
        className: 'dsh-fallback-modal-root',
        role: 'presentation',
        'data-dsh-style': style,
        'data-dsh-font': font,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        onKeyDownCapture: event => {
          onKeyDownCapture?.(event);
          if (!event?.defaultPrevented && event?.key === 'Escape') {
            onClose?.();
          }
        },
      },
      h('div', { className: 'dsh-fallback-modal-mask', 'aria-hidden': 'true', onClick: onClose }),
      h(
        'div',
        {
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': title,
          tabIndex: -1,
          'data-dsh-style': style,
          'data-dsh-font': font,
          'data-window-drag-exclude': '',
          'data-dsh-portal-synced': 'true',
          className: ['dsh-fallback-modal-dialog', className].filter(Boolean).join(' '),
        },
        headless
          ? children
          : h(
              React.Fragment || 'div',
              null,
              h(
                'header',
                null,
                h('h2', null, title),
                h('button', { type: 'button', 'aria-label': closeLabel, onClick: onClose }, '×'),
              ),
              h('div', { className: contentClassName }, children),
              footer ? h('footer', null, footer) : null,
            ),
      ),
    );
  }

  const WrappedMenu = host?.Menu
    ? function HostMenuWithStyle({ dshStyle, dshFont, children, ...menuProps }) {
        if (!menuProps.open) {
          return children !== undefined ? h(host.Menu, menuProps, children) : h(host.Menu, menuProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle, dshFont);
        return children !== undefined && children !== null
          ? h(host.Menu, menuProps, children, syncNode)
          : h(host.Menu, menuProps, syncNode);
      }
    : FallbackMenu;

  const WrappedModal = host?.Modal
    ? function HostModalWithStyle({ dshStyle, dshFont, children, ...modalProps }) {
        if (!modalProps.open) {
          return children !== undefined ? h(host.Modal, modalProps, children) : h(host.Modal, modalProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle, dshFont);
        return children !== undefined && children !== null
          ? h(host.Modal, modalProps, children, syncNode)
          : h(host.Modal, modalProps, syncNode);
      }
    : FallbackModal;

  const resolved = {
    ...(host || {}),
    isFallback: !host,
    Button: host?.Button || FallbackButton,
    Input: host?.Input || FallbackInput,
    Checkbox: host?.Checkbox || FallbackCheckbox,
    Switch: host?.Switch || FallbackSwitch,
    SegmentedControl: host?.SegmentedControl || FallbackSegmentedControl,
    Menu: WrappedMenu,
    Modal: WrappedModal,
  };
  cached.set(host, resolved);
  return resolved;
}

/**
 * Compact standalone Font Pairing Switcher (`FontSwitcher`), synced via
 * `localStorage['dsh-stardust:ui-font']` + `dsh-stardust-font` and `[data-dsh-font]`.
 */
function createFontSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  return function FontSwitcher({
    font: controlledFont,
    style: controlledStyle,
    onChange,
    lang = 'zh',
    id = 'dsh-font-switcher',
    compact = true,
    disabled = false,
    align = 'end',
    className,
    open: controlledOpen,
    onOpenChange,
  } = {}) {
    const [syncedFont, setSyncedFont] = useDshFont(React);
    const [syncedStyle] = useDshStyle(React);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const [internalOpen, setInternalOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const open = controlledOpen !== undefined ? Boolean(controlledOpen) : internalOpen;
    const setOpen = next => {
      const resolved = typeof next === 'function' ? next(open) : Boolean(next);
      if (controlledOpen === undefined) setInternalOpen(resolved);
      onOpenChange?.(resolved);
    };
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshFontPreset(activeFont);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = isZh ? `字体搭配：${preset.zh}` : `Font pairing: ${preset.en}`;
    const visibleText = compact
      ? (isZh ? preset.zhShort : preset.enShort)
      : (isZh ? preset.zh : preset.en);
    const items = DSH_FONTS.map(option => ({
      id: option.id,
      label: isZh ? `${option.zh} (${option.enShort})` : `${option.en}`,
    }));
    const selectFont = nextId => {
      const applied = writeDshFont(nextId);
      setSyncedFont(applied);
      onChange?.(applied);
      setOpen(false);
    };

    return h(P.Menu, {
      open: open && !disabled,
      selectedId: activeFont,
      dshStyle: activeStyle,
      dshFont: activeFont,
      items,
      align,
      portal: !P.isFallback,
      autoFocus: true,
      minWidthFromAnchor: true,
      className,
      onClose: () => setOpen(false),
      onSelect: selectFont,
      anchor: h(
        P.Button,
        {
          id,
          variant: 'outline',
          size: 'sm',
          disabled,
          className: 'dsh-font-trigger',
          'aria-label': triggerLabel,
          'aria-haspopup': 'menu',
          'aria-expanded': Boolean(open && !disabled),
          title: triggerLabel,
          onClick: () => setOpen(prev => !prev),
          onKeyDown: event => {
            if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
              event.preventDefault?.();
              setOpen(true);
            }
          },
        },
        h('span', { className: 'dsh-font-glyph', 'aria-hidden': 'true' }, isZh ? '字' : 'Aa'),
        h('span', { className: 'dsh-font-label' }, visibleText),
        renderDshIcon(React, { name: 'down', size: 13 }),
      ),
    });
  };
}

/**
 * Ready-made 13-preset Style Switcher + compact Font Pairing Switcher (`StyleSwitcher`).
 * Renders the style menu trigger with a live color swatch alongside the compact
 * font-pairing trigger (`showFontSwitcher = true` by default), syncing via
 * `localStorage['dsh-stardust:ui-style']` / `['dsh-stardust:ui-font']` and custom events.
 */
function createStyleSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  const FontSwitcher = createFontSwitcherComponent(React, requireFn);
  return function StyleSwitcher({
    style: controlledStyle,
    font: controlledFont,
    onChange,
    onFontChange,
    showFontSwitcher = true,
    lang = 'zh',
    id = 'dsh-style-switcher',
    compact = false,
    disabled = false,
    align = 'end',
    className,
  } = {}) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const [syncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const [open, setOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const [fontOpen, setFontOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshStylePreset(activeStyle);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = isZh ? `界面风格：${preset.zh}` : `UI style: ${preset.en}`;
    const visibleText = compact
      ? (isZh ? preset.zhShort : preset.enShort)
      : (isZh ? preset.zh : preset.en);
    const items = DSH_STYLES.map(option => ({
      id: option.id,
      label: isZh ? `${option.zh} (${option.enShort})` : `${option.en}`,
    }));
    const selectStyle = nextId => {
      const applied = writeDshStyle(nextId);
      setSyncedStyle(applied);
      onChange?.(applied);
      setOpen(false);
    };

    return h(
      'div',
      {
        className: ['dsh-style-switcher', className].filter(Boolean).join(' '),
        'data-window-drag-exclude': '',
      },
      h(P.Menu, {
        open: open && !disabled,
        selectedId: activeStyle,
        dshStyle: activeStyle,
        dshFont: activeFont,
        items,
        align,
        portal: !P.isFallback,
        autoFocus: true,
        minWidthFromAnchor: true,
        onClose: () => setOpen(false),
        onSelect: selectStyle,
        anchor: h(
          P.Button,
          {
            id,
            variant: 'outline',
            size: 'sm',
            disabled,
            className: 'dsh-style-trigger',
            'aria-label': triggerLabel,
            'aria-haspopup': 'menu',
            'aria-expanded': Boolean(open && !disabled),
            title: triggerLabel,
            onClick: () => {
              setFontOpen(false);
              setOpen(prev => !prev);
            },
            onKeyDown: event => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault?.();
                setFontOpen(false);
                setOpen(true);
              }
            },
          },
          h('span', {
            className: 'dsh-style-swatch',
            'aria-hidden': 'true',
            style: { '--dsh-swatch-color': preset.swatch },
          }),
          h('span', { className: 'dsh-style-label' }, visibleText),
          renderDshIcon(React, { name: 'down', size: 14 }),
        ),
      }),
      showFontSwitcher
        ? h(FontSwitcher, {
            id: `${id}-font`,
            font: controlledFont,
            style: activeStyle,
            onChange: onFontChange,
            lang,
            compact: true,
            disabled,
            align,
            open: fontOpen && !disabled,
            onOpenChange: next => {
              if (next) setOpen(false);
              setFontOpen(next);
            },
          })
        : null,
    );
  };
}

/* DSH Workbench UI v3 — DeepSeek Harness (>=0.2.2-rc.3) Host Primitives,
 * 13-Style Theme Switcher (`harness`, `cream`, `claude`, `pixel8bit`, `mint`,
 * `glass`, `eink`, `blueprint`, `risograph`, `win98`, `songhui`, `frutiger`, `gazette`),
 * 8 Font Pairings (`arcade` default, `auto`, `songkai`, `fangsong`, `poster`, `retro98`, `serif`, `modern`),
 * Unified 48px Single-Row Header, Sliding Tab Indicator, Resizable Split Panes,
 * Theme-Tinted Shimmer Skeletons, Row Hover Quick Actions, and Calm Update Strip.
 */
function createWorkbenchUI(React, require) {
  const h = React.createElement;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const useSafeId = (fallback = 'dsh-wb-id') => (typeof React.useId === 'function' ? React.useId() : fallback);
  const useSafeState = initial => (
    typeof React.useState === 'function'
      ? React.useState(initial)
      : [typeof initial === 'function' ? initial() : initial, () => {}]
  );
  const useSafeRef = initial => (typeof React.useRef === 'function' ? React.useRef(initial) : { current: initial });
  const useSafeEffect = (fn, deps) => {
    if (typeof React.useEffect === 'function') React.useEffect(fn, deps);
  };

  // Lazy host primitive resolution: NEVER call require('@deepseek-ai/dsh-client-ui-primitives') eagerly!
  const primitives = () => resolveHostPrimitives(React, require);
  const StyleSwitcher = createStyleSwitcherComponent(React, require);
  const FontSwitcher = createFontSwitcherComponent(React, require);
  const DshSplitResizer = createSplitResizerComponent(React);
  const Skeleton = createSkeletonComponent(React);

  const WORKBENCH_ICON_PATHS = Object.freeze({
    ...DSH_ICON_PATHS,
    filter: ['M4 5h16M7 12h10M10 19h4'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    settings: [
      'm9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z',
      'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z',
    ],
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
  });

  function Icon({ name = 'file', size = 16, ...props }) {
    return renderDshIcon(React, { name, size, paths: WORKBENCH_ICON_PATHS, ...props });
  }

  function Button({
    children,
    icon,
    iconSize = 15,
    variant = 'outline',
    size = 'sm',
    spinning = false,
    copied = false,
    className,
    ...props
  }) {
    const P = primitives();
    const resolvedVariant = variant || 'outline';
    const hostVariant = resolvedVariant === 'danger'
      ? 'ghost'
      : (resolvedVariant === 'primary' || resolvedVariant === 'ghost' ? resolvedVariant : 'outline');
    return h(
      P.Button,
      {
        variant: hostVariant,
        size,
        'aria-busy': spinning ? 'true' : props['aria-busy'],
        'data-copied': copied ? 'true' : props['data-copied'],
        ...props,
        className: cx('dsh-wb-btn', 'dsh-wb-btn-' + resolvedVariant, className),
        icon: icon ? h(Icon, { name: icon, size: iconSize, 'data-spinning': spinning ? 'true' : undefined }) : undefined,
      },
      children,
    );
  }

  function IconButton({ label, icon, iconSize = 16, variant = 'ghost', size = 'sm', spinning = false, className, ...props }) {
    return h(Button, {
      ...props,
      icon,
      iconSize,
      variant,
      size,
      spinning,
      className: cx('dsh-wb-icon-btn', className),
      'aria-label': label,
      title: props.title ?? label,
    });
  }

  function Input({ icon, className, ...props }) {
    const P = primitives();
    return h(P.Input, {
      ...props,
      icon: icon ? h(Icon, { name: icon, size: 15 }) : undefined,
      className: cx('dsh-wb-input', className),
    });
  }

  function Checkbox({ label, checked = false, onChange, hiddenLabel = false, disabled = false, className, id, ...props }) {
    const P = primitives();
    const fallbackId = useSafeId('dsh-wb-chk');
    const inputId = id || fallbackId;
    if (P.isFallback) {
      return h(
        'label',
        { htmlFor: inputId, className: cx('dsh-wb-checkbox', hiddenLabel && 'dsh-wb-checkbox-hidden', className), title: props.title },
        h('input', {
          ...props,
          id: inputId,
          type: 'checkbox',
          checked: Boolean(checked),
          disabled: Boolean(disabled),
          onChange: event => onChange?.(Boolean(event?.target?.checked)),
        }),
        h('span', null, label),
      );
    }
    return h(P.Checkbox, {
      ...props,
      id: inputId,
      checked: Boolean(checked),
      disabled: Boolean(disabled),
      label,
      className: cx('dsh-wb-checkbox', hiddenLabel && 'dsh-wb-checkbox-hidden', className),
      onChange: next => {
        const value = typeof next === 'boolean' ? next : Boolean(next?.target?.checked);
        onChange?.(value);
      },
    });
  }

  function Switch({ label, checked = false, onChange, disabled = false, className }) {
    const P = primitives();
    return h(
      'div',
      { className: cx('dsh-wb-switch-row', className) },
      h(P.Switch, {
        checked: Boolean(checked),
        disabled: Boolean(disabled),
        label,
        className: 'dsh-wb-switch',
        onChange: next => {
          const value = typeof next === 'boolean' ? next : Boolean(next?.target?.checked);
          onChange?.(value);
        },
      }),
      h('span', { className: 'dsh-wb-switch-text' }, label),
    );
  }

  function ChoiceMenu({
    label,
    id,
    value,
    items = [],
    onChange,
    disabled = false,
    children,
    className,
    align = 'start',
    icon,
  }) {
    const [open, setOpen] = useSafeState(false);
    const [style] = useDshStyle(React);
    const [font] = useDshFont(React);
    const P = primitives();
    const currentValue = String(value ?? '');
    const selected = items.find(item => String(item.id) === currentValue);
    return h(
      'div',
      { className: cx('dsh-wb-choice', className), 'data-window-drag-exclude': '' },
      h(P.Menu, {
        open: Boolean(open && !disabled),
        selectedId: currentValue,
        dshStyle: style,
        dshFont: font,
        items: items.map(item => ({ ...item, id: String(item.id) })),
        align,
        portal: !P.isFallback,
        autoFocus: true,
        minWidthFromAnchor: true,
        className: 'dsh-wb-menu',
        onClose: () => setOpen(false),
        onSelect: next => {
          setOpen(false);
          if (String(next) !== currentValue) onChange?.(next);
        },
        anchor: h(
          Button,
          {
            id,
            variant: 'outline',
            className: 'dsh-wb-menu-btn',
            disabled: Boolean(disabled || items.length === 0),
            'aria-label': label,
            'aria-haspopup': 'menu',
            'aria-expanded': Boolean(open && !disabled),
            onClick: () => setOpen(prev => !prev),
            onKeyDown: event => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault?.();
                setOpen(true);
              }
            },
          },
          icon ? h(Icon, { name: icon, size: 14 }) : null,
          h('span', { className: 'dsh-wb-menu-value' }, children ?? selected?.label ?? label),
          h(Icon, { name: 'down', size: 14 }),
        ),
      }),
    );
  }

  function Search({ label, value = '', onChange, clearLabel = 'Clear', disabled = false, className, ...props }) {
    const id = useSafeId('dsh-wb-search');
    const hasValue = String(value || '').length > 0;
    return h(
      'div',
      { className: cx('dsh-wb-search', className) },
      h(Input, {
        type: 'search',
        id,
        icon: 'search',
        'aria-label': label,
        placeholder: label,
        value,
        disabled,
        onChange,
        ...props,
      }),
      hasValue && !disabled
        ? h(IconButton, {
            icon: 'close',
            iconSize: 13,
            label: clearLabel,
            className: 'dsh-wb-search-clear',
            onClick: () => onChange?.({ target: { value: '' } }),
          })
        : null,
    );
  }

  const tourSessionDone = new Set();

  function readTourDone(storageKey) {
    if (!storageKey) return false;
    if (tourSessionDone.has(storageKey)) return true;
    try {
      return typeof window !== 'undefined' && window.localStorage?.getItem(storageKey) === 'done';
    } catch {
      return false;
    }
  }

  function writeTourDone(storageKey) {
    if (!storageKey) return;
    tourSessionDone.add(storageKey);
    try {
      if (typeof window !== 'undefined') window.localStorage?.setItem(storageKey, 'done');
    } catch {
      // Ignore storage quota / security errors.
    }
  }

  function computeTourLayout(target, preferredSide, cardEl) {
    const vw = (typeof window !== 'undefined' && window.innerWidth) || 1280;
    const vh = (typeof window !== 'undefined' && window.innerHeight) || 800;
    const cw = cardEl?.offsetWidth || 320;
    const ch = cardEl?.offsetHeight || 196;
    const pad = 5;
    const gap = 12;
    const raw = target?.getBoundingClientRect?.();
    if (!target) {
      return {
        spotlight: null,
        side: 'center',
        left: Math.max(12, Math.round((vw - cw) / 2)),
        top: Math.max(12, Math.round((vh - ch) / 2)),
        arrowX: 28,
        arrowY: 24,
      };
    }
    const hasBox = Boolean(raw && (raw.width > 0 || raw.height > 0));
    const rect = hasBox ? raw : { left: 120, top: 72, width: 140, height: 32 };
    const spotlight = {
      left: Math.round(rect.left - pad),
      top: Math.round(rect.top - pad),
      width: Math.round(rect.width + pad * 2),
      height: Math.round(rect.height + pad * 2),
    };
    const spaceBottom = vh - spotlight.top - spotlight.height;
    const spaceTop = spotlight.top;
    const spaceRight = vw - spotlight.left - spotlight.width;
    const spaceLeft = spotlight.left;
    let side = preferredSide || 'bottom';
    if (side === 'right' && spaceRight < cw + gap + 12) {
      side = spaceBottom >= ch + gap + 12 ? 'bottom' : spaceLeft >= cw + gap + 12 ? 'left' : 'top';
    } else if (side === 'left' && spaceLeft < cw + gap + 12) {
      side = spaceRight >= cw + gap + 12 ? 'right' : 'bottom';
    } else if (side === 'bottom' && spaceBottom < ch + gap + 12 && spaceTop > spaceBottom) {
      side = 'top';
    } else if (side === 'top' && spaceTop < ch + gap + 12 && spaceBottom > spaceTop) {
      side = 'bottom';
    }
    let left = spotlight.left;
    let top = spotlight.top + spotlight.height + gap;
    if (side === 'top') top = spotlight.top - ch - gap;
    else if (side === 'right') { left = spotlight.left + spotlight.width + gap; top = spotlight.top; }
    else if (side === 'left') { left = spotlight.left - cw - gap; top = spotlight.top; }
    left = Math.round(Math.max(12, Math.min(vw - cw - 12, left)));
    top = Math.round(Math.max(12, Math.min(vh - ch - 12, top)));
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return {
      spotlight,
      side,
      left,
      top,
      arrowX: Math.round(Math.max(18, Math.min(cw - 18, centerX - left))),
      arrowY: Math.round(Math.max(18, Math.min(ch - 18, centerY - top))),
    };
  }

  function CoachmarkTour({
    rootRef,
    steps = [],
    step = 0,
    manual = false,
    style = 'harness',
    font = DSH_DEFAULT_FONT,
    lang = 'zh',
    layout: rawLayout,
    setLayout,
    onStep,
    onClose,
    onCopyPrompt,
  }) {
    const layerRef = useSafeRef(null);
    const cardRef = useSafeRef(null);
    const nextBtnRef = useSafeRef(null);
    const copyTimerRef = useSafeRef(null);
    const [copied, setCopied] = useSafeState(false);
    const [copyNotice, setCopyNotice] = useSafeState('');
    const titleId = useSafeId('dsh-wb-tour') + '-title';
    const isEn = String(lang || '').toLowerCase().startsWith('en');
    const l = (zh, en) => (isEn ? en : zh);
    const current = steps[Math.max(0, Math.min(steps.length - 1, step))] || {};
    const layout = rawLayout && typeof rawLayout === 'object' && rawLayout.side
      ? rawLayout
      : { spotlight: null, side: current.side || 'bottom', left: 24, top: 76, arrowX: 28, arrowY: 24 };

    useSafeEffect(() => () => {
      if (copyTimerRef.current && typeof clearTimeout === 'function') clearTimeout(copyTimerRef.current);
    }, []);

    useSafeEffect(() => {
      const node = layerRef.current;
      if (!node) return undefined;
      try {
        node.setAttribute?.('popover', 'manual');
        node.showPopover?.();
      } catch {
        // Ignore when Popover API is unavailable in synthetic test DOM.
      }
      return () => {
        try { node.hidePopover?.(); } catch {}
      };
    }, []);

    function queryTourTarget(scope, selector) {
      if (!scope || !selector || typeof scope.querySelector !== 'function') return null;
      try {
        return scope.querySelector(selector);
      } catch {
        try {
          const escaped = String(selector).replace(/(^|[\s,>+~(])#([^\s,>+~()[\]]+)/g, (_, prefix, id) => {
            const esc = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(id) : null;
            return prefix + (esc ? '#' + esc : '[id="' + id.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]');
          });
          return scope.querySelector(escaped);
        } catch {
          return null;
        }
      }
    }

    useSafeEffect(() => {
      function measure() {
        const scope = rootRef?.current || (typeof document !== 'undefined' ? document : null);
        if (!scope || typeof scope.querySelector !== 'function') return;
        const target = queryTourTarget(scope, current.selector)
          || queryTourTarget(scope, current.fallback)
          || null;
        setLayout?.(computeTourLayout(target, current.side, cardRef.current));
      }
      measure();
      const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(measure) : null;
      if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
        return () => {
          if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
        };
      }
      window.addEventListener('resize', measure, { passive: true });
      window.addEventListener('scroll', measure, true);
      return () => {
        if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure, true);
      };
    }, [step, current.selector, current.fallback, current.side]);

    useSafeEffect(() => {
      if (!manual) return;
      const btn = nextBtnRef.current || cardRef.current?.querySelector?.('[data-tour-next]');
      btn?.focus?.();
    }, [manual, step]);

    async function handleCopy() {
      if (!current.prompt) return;
      const copyFn = onCopyPrompt || writeClipboardText;
      const ok = await copyFn(current.prompt);
      if (ok !== false) {
        if (copyTimerRef.current && typeof clearTimeout === 'function') clearTimeout(copyTimerRef.current);
        setCopied(true);
        let msg = l('已复制指令，粘贴到对话发送即可', 'Prompt copied — paste into chat');
        if (msg === lastWbCopyAnnouncement) msg += '\u00A0';
        lastWbCopyAnnouncement = msg;
        setCopyNotice(msg);
        if (typeof setTimeout === 'function') {
          const timer = setTimeout(() => {
            setCopied(false);
            setCopyNotice('');
          }, 1800);
          timer?.unref?.();
          copyTimerRef.current = timer;
        }
      }
    }

    const isLast = step >= steps.length - 1;
    const isCopied = copied === true;
    function finish() { onClose?.(manual); }
    function onKeyDown(event) {
      if (event.isComposing || event.nativeEvent?.isComposing) return;
      if (event.key === 'Escape') { event.preventDefault?.(); event.stopPropagation?.(); finish(); }
      else if (event.key === 'ArrowRight' && !isLast) { event.preventDefault?.(); onStep?.(step + 1, true); }
      else if (event.key === 'ArrowLeft' && step > 0) { event.preventDefault?.(); onStep?.(step - 1, true); }
    }

    return h(
      'div',
      {
        ref: layerRef,
        className: 'dsh-wb-tour-layer',
        'data-dsh-style': style,
        'data-dsh-font': normalizeDshFont(font),
        'data-wb-tour': current.id || String(step),
        'data-window-drag-exclude': '',
      },
      layout.spotlight
        ? h('div', {
            className: 'dsh-wb-tour-spotlight',
            'data-tour-spotlight': current.id || String(step),
            'aria-hidden': 'true',
            style: {
              left: layout.spotlight.left + 'px',
              top: layout.spotlight.top + 'px',
              width: layout.spotlight.width + 'px',
              height: layout.spotlight.height + 'px',
            },
          })
        : h('div', { className: 'dsh-wb-tour-backdrop', 'aria-hidden': 'true' }),
      h(
        'div',
        {
          ref: cardRef,
          role: 'dialog',
          'aria-modal': 'false',
          'aria-labelledby': titleId,
          tabIndex: -1,
          onKeyDown,
          className: 'dsh-wb-tour-card',
          'data-side': layout.side,
          'data-tour-card': current.id || String(step),
          style: {
            left: layout.left + 'px',
            top: layout.top + 'px',
            '--arrow-x': layout.arrowX + 'px',
            '--arrow-y': layout.arrowY + 'px',
          },
        },
        h('span', { className: 'dsh-wb-tour-arrow', 'data-tour-arrow': layout.side, 'aria-hidden': 'true' }),
        h(
          'div',
          { className: 'dsh-wb-tour-head' },
          h(
            'div',
            { className: 'dsh-wb-tour-step-meta' },
            h('span', { className: 'dsh-wb-tour-badge' }, (step + 1) + ' / ' + steps.length),
            h(
              'span',
              { className: 'dsh-wb-tour-dots', 'aria-hidden': 'true' },
              steps.map((item, idx) =>
                h('span', {
                  key: item.id || idx,
                  className: 'dsh-wb-tour-dot',
                  'data-active': idx === step ? 'true' : undefined,
                }),
              ),
            ),
          ),
          h('button', { type: 'button', className: 'dsh-wb-tour-skip', 'data-tour-skip': '', onClick: finish }, l('跳过', 'Skip')),
        ),
        h('h2', { id: titleId, className: 'dsh-wb-tour-title', 'data-dsh-editorial-heading': '' }, current.title),
        h('p', { className: 'dsh-wb-tour-desc' }, current.desc),
        current.prompt
          ? h(
              'div',
              { className: 'dsh-wb-tour-inline-action' },
              h(
                Button,
                {
                  type: 'button',
                  variant: 'outline',
                  icon: isCopied ? 'check' : 'copy',
                  copied: isCopied,
                  'data-copy-prompt': current.prompt,
                  'data-copied': isCopied ? 'true' : undefined,
                  title: current.prompt,
                  onClick: () => { void handleCopy(); },
                },
                isCopied ? l('已复制', 'Copied') : (current.promptLabel || l('复制对话指令', 'Copy prompt')),
              ),
              h(
                'span',
                {
                  className: 'dsh-wb-copy-status',
                  role: 'status',
                  'data-visible': isCopied ? 'true' : undefined,
                },
                typeof copyNotice === 'string' ? copyNotice : '',
              ),
            )
          : null,
        h(
          'div',
          { className: 'dsh-wb-tour-footer' },
          step > 0
            ? h(Button, { type: 'button', variant: 'ghost', onClick: () => onStep?.(step - 1, true), 'data-tour-prev': '' }, l('上一步', 'Back'))
            : h('span', null),
          h(
            'div',
            { className: 'dsh-wb-tour-nav' },
            h(
              Button,
              {
                ref: nextBtnRef,
                type: 'button',
                variant: 'primary',
                'data-tour-next': '',
                onClick: () => (isLast ? finish() : onStep?.(step + 1, true)),
              },
              isLast ? l('完成引导', 'Done') : l('下一步', 'Next'),
            ),
          ),
        ),
      ),
    );
  }

  function Page({
    title,
    subtitle,
    icon = 'shield',
    lang = 'zh',
    navigation,
    toolbar,
    actions,
    children,
    workbench = false,
    showUpdates = true,
    className,
    rootRef: externalRootRef,
    style: controlledStyle,
    font: controlledFont,
    onStyleChange,
    onFontChange,
    styleSwitcherId,
    tourSteps = null,
    tourStorageKey = 'dsh-wb.tour.v1',
    onTourCopyPrompt,
    modalOpen = false,
    ...props
  }) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const [syncedFont, setSyncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const pageRootRef = useSafeRef(null);
    const triggerRef = useSafeRef(null);
    const [tour, setTour] = useSafeState({ open: false, step: 0, manual: false });
    const [tourLayout, setTourLayout] = useSafeState(null);
    const hasTour = Array.isArray(tourSteps) && tourSteps.length > 0;
    const isEn = String(lang || '').toLowerCase().startsWith('en');

    useSafeEffect(() => {
      if (!workbench || !hasTour || modalOpen || readTourDone(tourStorageKey)) return undefined;
      if (typeof setTimeout !== 'function') return undefined;
      const timer = setTimeout(() => {
        const hasModalInDom = typeof document !== 'undefined' && Boolean(document.querySelector?.('[role="dialog"][aria-modal="true"], dialog[open]:not([popover])'));
        if (!hasModalInDom && !readTourDone(tourStorageKey)) {
          setTour({ open: true, step: 0, manual: false });
        }
      }, 280);
      timer?.unref?.();
      return () => {
        if (typeof clearTimeout === 'function') clearTimeout(timer);
      };
    }, [workbench, hasTour, modalOpen, tourStorageKey]);

    useSafeEffect(() => {
      if (modalOpen && tour.open) {
        setTour(prev => (prev.open ? { ...prev, open: false } : prev));
      }
    }, [modalOpen, tour.open]);

    function closeTour(restoreFocus = false) {
      writeTourDone(tourStorageKey);
      setTour(prev => ({ ...prev, open: false }));
      if (restoreFocus && typeof setTimeout === 'function') {
        const timer = setTimeout(() => {
          const btn = triggerRef.current || pageRootRef.current?.querySelector?.('[data-tour-trigger]');
          btn?.focus?.();
        }, 0);
        timer?.unref?.();
      }
    }

    const bindPageRef = node => {
      pageRootRef.current = node;
      if (typeof externalRootRef === 'function') externalRootRef(node);
      else if (externalRootRef && typeof externalRootRef === 'object') externalRootRef.current = node;
    };

    return h(
      'section',
      {
        ...props,
        ref: bindPageRef,
        className: cx('dsh-wb-page', !workbench && 'dsh-wb-embedded', className),
        'data-dsh-style': activeStyle,
        'data-dsh-font': activeFont,
        'data-main': workbench ? 'true' : 'false',
      },
      h(Styles, { key: 'dsh-wb-styles' }),
      h(
        'header',
        { className: 'dsh-wb-header dsh-header', 'data-dsh-header': '' },
        h(
          'div',
          { className: 'dsh-header-leading' },
          h(
            'div',
            { className: 'dsh-header-brand' },
            h('span', { className: 'dsh-header-badge dsh-wb-brand', 'aria-hidden': 'true' }, h(Icon, { name: icon, size: 14 })),
            h('h1', { className: 'dsh-header-title dsh-wb-title', 'data-dsh-editorial-heading': '' }, title),
          ),
          navigation ? h('div', { className: 'dsh-header-tabs' }, navigation) : null,
        ),
        h(
          'div',
          { className: 'dsh-header-actions dsh-wb-header-actions', 'data-window-drag-exclude': '' },
          actions,
          hasTour
            ? h(
                Button,
                {
                  ref: triggerRef,
                  type: 'button',
                  variant: 'ghost',
                  className: 'dsh-wb-tour-trigger',
                  'data-tour-trigger': '',
                  'aria-label': isEn ? 'Interactive guide' : '使用引导',
                  'aria-expanded': Boolean(tour.open),
                  title: isEn ? 'Interactive guide' : '使用引导',
                  onClick: () => (tour.open && tour.manual ? closeTour(true) : setTour({ open: true, step: 0, manual: true })),
                },
                isEn ? '? Tour' : '? 引导',
              )
            : null,
          h(StyleSwitcher, {
            id: styleSwitcherId,
            style: activeStyle,
            font: activeFont,
            showFontSwitcher: true,
            lang,
            compact: true,
            onChange: next => {
              setSyncedStyle(next);
              onStyleChange?.(next);
            },
            onFontChange: next => {
              setSyncedFont(next);
              onFontChange?.(next);
            },
          }),
        ),
      ),
      toolbar ? h('div', { className: 'dsh-wb-subbar' }, toolbar) : null,
      h('div', { className: 'dsh-wb-body', 'data-show-updates': showUpdates ? 'true' : 'false' }, children),
      hasTour && tour.open && !modalOpen
        ? h(CoachmarkTour, {
            rootRef: pageRootRef,
            steps: tourSteps,
            step: tour.step,
            manual: tour.manual,
            style: activeStyle,
            font: activeFont,
            lang,
            layout: tourLayout,
            setLayout: setTourLayout,
            onStep: (next, isManual) => setTour({ open: true, step: next, manual: Boolean(isManual) }),
            onClose: closeTour,
            onCopyPrompt: onTourCopyPrompt,
          })
        : null,
    );
  }

  function Tabs({ items = [], value, onChange, label, id: customId, children, footer, className }) {
    const baseId = customId || useSafeId('dsh-wb-tabs');
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    const itemKey = items.map(item => `${item.id}:${item.count ?? ''}`).join('|');
    const tabs = useSlidingTabIndicator(React, active, { deps: [itemKey] });
    function onKeyDown(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault?.();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (index + step + items.length) % items.length;
      if (items[next]) {
        onChange?.(items[next].id);
        event.currentTarget?.parentElement?.querySelectorAll?.('[role="tab"]')?.[next]?.focus?.();
      }
    }
    const tablist = h(
      'div',
      {
        ...tabs.tablistProps,
        className: cx('dsh-wb-tabs', 'dsh-tablist', 'dsh-tablist-pill', className),
        role: 'tablist',
        'aria-label': label,
      },
      items.map((item, index) =>
        h(
          Button,
          {
            key: item.id,
            variant: 'ghost',
            icon: item.icon,
            role: 'tab',
            id: baseId + '-tab-' + item.id,
            'aria-controls': baseId + '-panel',
            'aria-selected': active === item.id,
            tabIndex: active === item.id ? 0 : -1,
            className: 'dsh-wb-tab',
            onClick: () => onChange?.(item.id),
            onKeyDown: event => onKeyDown(event, index),
          },
          h('span', null, item.label),
          item.count !== undefined ? h('span', { className: 'dsh-wb-count' }, item.count) : null,
        ),
      ),
      h('span', tabs.indicatorProps),
    );
    if (children === undefined && footer === undefined) return tablist;
    return h(
      'div',
      { className: 'dsh-wb-tabs-layout' },
      tablist,
      h(
        'div',
        {
          key: active,
          className: 'dsh-wb-tab-panel dsh-tab-panel',
          'data-dsh-tab-panel': '',
          id: baseId + '-panel',
          role: 'tabpanel',
          'aria-labelledby': baseId + '-tab-' + active,
        },
        children,
        footer,
      ),
    );
  }

  function TabPanel({ id, activeTab, children, className }) {
    return h(
      'div',
      {
        className: cx('dsh-wb-tab-panel', 'dsh-tab-panel', className),
        'data-dsh-tab-panel': '',
        id: id + '-panel',
        role: 'tabpanel',
        'aria-labelledby': id + '-tab-' + activeTab,
      },
      children,
    );
  }

  function Status({ children, tone = 'info', action, className }) {
    if (!children) return null;
    return h(
      'div',
      {
        className: cx('dsh-wb-status', className),
        'data-tone': tone,
        role: tone === 'error' ? 'alert' : 'status',
        'aria-live': tone === 'error' ? 'assertive' : 'polite',
      },
      h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 16 }),
      h('div', { className: 'dsh-wb-status-text' }, children),
      action ? h('div', { className: 'dsh-wb-status-action' }, action) : null,
    );
  }

  function Empty({ title, children, action = null, icon = 'file', className }) {
    return h(
      'div',
      { className: cx('dsh-wb-empty', className) },
      h('span', { className: 'dsh-wb-empty-icon', 'aria-hidden': 'true' }, h(Icon, { name: icon, size: 22 })),
      h('h2', null, title),
      children ? h('div', { className: 'dsh-wb-empty-desc' }, children) : null,
      action ? h('div', { className: 'dsh-wb-actions' }, action) : null,
    );
  }

  function Split({
    list,
    detail,
    selected,
    onBack,
    backLabel,
    className,
    listWidth = 360,
    splitKey,
    minWidth = 240,
    maxWidth = 560,
    resizerLabel = 'Resize list pane',
  }) {
    const ref = useSafeRef(null);
    const split = useResizableSplit(React, {
      key: splitKey,
      initial: listWidth,
      min: minWidth,
      max: maxWidth,
    });
    useSafeEffect(() => {
      if (!selected || !ref.current || !(ref.current.clientWidth <= 760)) return;
      const heading = ref.current.querySelector?.('.dsh-wb-detail h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus?.({ preventScroll: true });
      }
    }, [selected]);
    return h(
      'div',
      {
        ref,
        className: cx('dsh-wb-split', 'dsh-split-pane', className),
        'data-selected': selected ? 'true' : 'false',
        style: { ...split.paneStyle, '--dsh-list-width': split.size + 'px' },
      },
      h('div', { className: 'dsh-wb-master dsh-split-leading' }, list),
      h(DshSplitResizer, { ...split.resizerProps, label: resizerLabel }),
      h(
        'div',
        { className: 'dsh-wb-detail dsh-split-trailing' },
        selected
          ? h(
              Button,
              { className: 'dsh-wb-back', icon: 'left', variant: 'ghost', onClick: onBack },
              backLabel,
            )
          : null,
        detail,
      ),
    );
  }

  function Row({ title, meta, description, active, onClick, children, actions, status, statusTone, className, disabled, serif = true }) {
    return h(
      'div',
      {
        className: cx('dsh-wb-row', 'dsh-row', active && 'is-selected', className),
        'data-dsh-row': '',
        'data-active': active ? 'true' : 'false',
        'data-selected': active ? 'true' : 'false',
      },
      children ? h('div', { className: 'dsh-wb-row-select' }, children) : null,
      h(
        'button',
        {
          type: 'button',
          className: 'dsh-wb-row-btn',
          onClick,
          disabled,
          'aria-pressed': Boolean(active),
        },
        h(
          'span',
          { className: 'dsh-wb-row-head' },
          h(
            'span',
            { className: 'dsh-wb-row-title-wrap' },
            h('span', { className: 'dsh-pixel-cursor', 'aria-hidden': 'true' }, '▶'),
            h('strong', serif ? { 'data-dsh-serif': '' } : null, title),
          ),
          status ? h('span', { className: 'dsh-wb-tag', 'data-tone': statusTone }, status) : null,
        ),
        meta ? h('span', { className: 'dsh-wb-row-meta' }, meta) : null,
        description ? h('span', { className: 'dsh-wb-row-desc' }, description) : null,
      ),
      actions ? h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' }, actions) : null,
    );
  }

  function Details({ summary, children, open, className }) {
    return h(
      'details',
      { className: cx('dsh-wb-details', className), open },
      h(
        'summary',
        { className: 'dsh-wb-summary' },
        h('span', null, summary),
        h(Icon, { name: 'down', size: 14 }),
      ),
      h('div', { className: 'dsh-wb-details-body' }, children),
    );
  }

  let lastWbCopyAnnouncement = '';

  function legacyClipboardWrite(text) {
    try {
      if (typeof document === 'undefined' || typeof document.createElement !== 'function' || typeof document.execCommand !== 'function' || !document.body?.append) {
        return false;
      }
      const field = Object.assign(document.createElement('textarea'), { value: text });
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0';
      document.body.append(field);
      field.select?.();
      try { return Boolean(document.execCommand('copy')); } finally { field.remove?.(); }
    } catch {
      return false;
    }
  }

  async function writeClipboardText(text) {
    if (!text) return false;
    try {
      if (typeof navigator !== 'undefined' && typeof navigator?.clipboard?.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fall through to legacy textarea copy when clipboard API rejects.
    }
    return legacyClipboardWrite(text);
  }

  function CopyPrompt({
    prompt,
    label,
    copiedLabel = 'Copied',
    statusText = 'Copied to clipboard',
    failedText = 'Copy failed',
    variant = 'outline',
    size = 'sm',
    className,
    onCopied,
  }) {
    const text = typeof prompt === 'string' ? prompt.trim() : '';
    const [copied, setCopied] = useSafeState(false);
    const [failed, setFailed] = useSafeState(false);
    const [announcement, setAnnouncement] = useSafeState('');
    const timerRef = useSafeRef(null);
    useSafeEffect(() => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }, []);
    if (!text) return null;

    const isCopied = copied === true;
    const isFailed = failed === true;
    const triggerCopy = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      writeClipboardText(text).then(ok => {
        setCopied(ok);
        setFailed(!ok);
        let msg = ok ? statusText : failedText;
        if (msg === lastWbCopyAnnouncement) msg += '\u00A0';
        lastWbCopyAnnouncement = msg;
        setAnnouncement(msg);
        if (ok) onCopied?.(text);
        if (typeof setTimeout === 'function') {
          const timer = setTimeout(() => {
            setCopied(false);
            setFailed(false);
            setAnnouncement('');
          }, 2000);
          timer?.unref?.();
          timerRef.current = timer;
        }
      });
    };

    return h(
      'span',
      { className: cx('dsh-wb-copy-wrap', className) },
      h(
        Button,
        {
          type: 'button',
          variant,
          size,
          icon: isCopied ? 'check' : 'copy',
          copied: isCopied,
          'data-copied': isCopied ? 'true' : undefined,
          'data-failed': isFailed ? 'true' : undefined,
          'data-copy-prompt': text,
          title: text,
          onClick: triggerCopy,
        },
        isCopied ? copiedLabel : (label || text),
      ),
      h(
        'span',
        {
          className: 'dsh-wb-copy-status',
          role: 'status',
          'data-visible': isCopied || isFailed ? 'true' : undefined,
        },
        typeof announcement === 'string' ? announcement : '',
      ),
      isFailed ? h('code', { className: 'dsh-wb-copy-fallback', tabIndex: 0 }, text) : null,
    );
  }

  function Dialog({ title, children, onClose, closeLabel = 'Close', className, busy = false, footer, tone, wide = false }) {
    const [style] = useDshStyle(React);
    const [font] = useDshFont(React);
    const titleId = useSafeId('dsh-wb-dialog-title');
    const P = primitives();
    const close = () => {
      if (!busy) onClose?.();
    };
    return h(
      P.Modal,
      {
        open: true,
        headless: true,
        dshStyle: style,
        dshFont: font,
        title,
        closeLabel,
        onClose: close,
        backdropBlur: false,
        className: cx('dsh-wb-dialog', wide && 'dsh-wb-dialog-wide', className),
      },
      h(Styles, { key: 'dsh-wb-dialog-styles' }),
      h(
        'div',
        {
          ref: createOverlaySyncRef(style, font),
          className: 'dsh-wb-dialog-frame',
          'data-dsh-style': style,
          'data-dsh-font': font,
          'data-window-drag-exclude': '',
        },
        h(
          'header',
          { className: 'dsh-wb-dialog-header' },
          h('h2', { id: titleId, 'data-tone': tone, 'data-dsh-editorial-heading': '' }, title),
          h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: close }),
        ),
        h('div', { className: 'dsh-wb-dialog-body', 'aria-busy': busy ? 'true' : undefined }, children),
        footer ? h('footer', { className: 'dsh-wb-dialog-footer' }, footer) : null,
      ),
    );
  }

  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    ctx.slots.inject('main', () =>
      ctx.slots.register(
        { name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) },
        component,
      ),
    );
    ctx.slots.inject('sidebar.panellist', () =>
      ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) {
        return h(Icon, { name: icon, size });
      }),
    );
  }

  const WORKBENCH_V2_CSS = `
.dsh-wb-page,
.dsh-wb-dialog-frame,
.dsh-wb-tour-layer {
  --w-bg-base: var(--dsw-alias-bg-base, #ffffff);
  --w-bg-1: var(--dsw-alias-bg-layer-1, #f8fafc);
  --w-bg-2: var(--dsw-alias-bg-layer-2, #f1f5f9);
  --w-border: var(--dsw-alias-border-l2, #e2e8f0);
  --w-border-strong: var(--dsw-alias-border-l3, #cbd5e1);
  --w-ink: var(--dsw-alias-label-primary, #1e293b);
  --w-muted: var(--dsw-alias-label-secondary, #526075);
  --w-tertiary: var(--dsw-alias-label-tertiary, #64748b);
  --w-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dsh-plugin-workbench-accent: var(--w-accent);
  --w-accent-soft: var(--dsw-alias-interactive-bg-hover-accent, rgba(65, 118, 230, 0.10));
  --w-hover: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.045));
  --w-active: var(--dsw-alias-interactive-bg-active, rgba(65, 118, 230, 0.11));
  --w-primary-fill: var(--dsw-alias-button-primary-fill, #3b6fe0);
  --w-primary-hover: var(--dsw-alias-button-primary-hover, #2f5fc8);
  --w-primary-ink: var(--dsw-alias-button-primary-ink, #ffffff);
  --w-danger: var(--dsw-alias-state-error-primary, #c6392f);
  --w-danger-soft: var(--dsw-alias-interactive-bg-hover-danger, rgba(198, 57, 47, 0.10));
  --w-warn: var(--dsw-alias-state-warn-primary, #b45309);
  --w-warn-label: var(--dsw-alias-state-warn-label, #92400e);
  --w-warn-soft: var(--dsw-alias-state-warn-tertiary, #fef3c7);
  --w-success: var(--dsw-alias-state-success-primary, #1f7a53);
  --w-link: var(--dsw-alias-link, #2f63d4);
  --w-radius-xs: var(--dsw-radius-xs, 6px);
  --w-radius-sm: var(--dsw-radius-sm, 8px);
  --w-radius-md: var(--dsw-radius-md, 12px);
  box-sizing: border-box;
  color: var(--w-ink);
  font-family: var(--dsh-font-body, var(--dsh-font-family-content, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif));
  font-size: 13px;
  line-height: 20px;
  text-align: start;
}

.dsh-wb-page *,
.dsh-wb-page *::before,
.dsh-wb-page *::after,
.dsh-wb-dialog-frame *,
.dsh-wb-dialog-frame *::before,
.dsh-wb-dialog-frame *::after,
.dsh-wb-tour-layer *,
.dsh-wb-tour-layer *::before,
.dsh-wb-tour-layer *::after {
  box-sizing: border-box;
}

.dsh-wb-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  min-width: 0;
  padding-block-start: var(--dsh-frame-top-clearance, 0px);
  padding-inline-start: var(--dsh-frame-leading-clearance, 0px);
  background-color: var(--w-bg-base);
  container-type: inline-size;
  container-name: dsh-workbench;
}

.dsh-wb-embedded {
  height: min(740px, 82dvh);
  padding: 0;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  overflow: clip;
}

.dsh-wb-header {
  min-height: 48px;
}

.dsh-wb-brand,
.dsh-wb-empty-icon {
  display: grid;
  place-items: center;
  flex: none;
  color: var(--w-accent);
  background: var(--w-accent-soft);
  border-radius: var(--w-radius-sm);
}

:where(.dsh-header-badge.dsh-wb-brand) {
  width: 24px;
  height: 24px;
  border-radius: var(--w-radius-xs);
  background: var(--w-primary-fill);
  color: var(--w-primary-ink);
}

.dsh-wb-header-actions,
.dsh-wb-actions,
.dsh-wb-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.dsh-wb-header-actions {
  margin-inline-start: auto;
  justify-content: flex-end;
  flex: none;
  flex-wrap: nowrap;
  gap: 6px;
}

.dsh-wb-subbar {
  display: flex;
  flex: none;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: var(--w-bg-1);
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-body,
.dsh-wb-tabs-layout,
.dsh-wb-tab-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.dsh-wb-body {
  overflow: auto;
  overscroll-behavior: contain;
}

.dsh-wb-body:has(> .dsh-wb-tab-panel) {
  overflow: hidden;
}

.dsh-wb-body > [data-plugin-update-footer],
.dsh-wb-tab-panel > [data-plugin-update-footer] {
  flex: none;
  box-sizing: border-box;
  width: 100%;
  min-height: 32px;
  margin: 0;
  padding: 6px 14px;
  background: var(--w-bg-1);
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-body[data-show-updates="false"] [data-plugin-update-footer] {
  display: none;
}

.dsh-wb-tabs {
  display: flex;
  flex: none;
  align-items: center;
  gap: 2px;
  min-width: 0;
  overflow-x: auto;
  padding: 4px 14px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.dsh-header .dsh-wb-tabs {
  padding: 0;
  border-block-end: 0;
  background: transparent;
}

.dsh-wb-tab {
  flex: none;
  min-height: 30px;
  padding: 4px 10px;
  border: 0;
  border-radius: var(--w-radius-xs);
  background: transparent;
  color: var(--w-muted);
  font-weight: 550;
  white-space: nowrap;
  box-shadow: none;
}

.dsh-wb-tab[aria-selected="true"] {
  color: var(--w-ink);
  font-weight: 650;
}

.dsh-wb-tabs:not([data-indicator-ready="true"]) .dsh-wb-tab[aria-selected="true"] {
  background: var(--w-hover);
}

.dsh-wb-tab-panel {
  overflow: auto;
  overscroll-behavior: contain;
}

.dsh-wb-tab-panel:has(> .dsh-wb-split) {
  overflow: hidden;
}

.dsh-wb-count,
.dsh-wb-tag {
  display: inline-flex;
  align-items: center;
  flex: none;
  padding: 1px 7px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
  color: var(--w-muted);
  font-size: 11.5px;
  line-height: 17px;
  font-weight: 550;
}

.dsh-wb-tag[data-tone="error"],
.dsh-wb-tag[data-tone="critical"],
.dsh-wb-tag[data-tone="high"] {
  background: var(--w-danger-soft);
  color: var(--w-danger);
}

.dsh-wb-tag[data-tone="warn"],
.dsh-wb-tag[data-tone="medium"] {
  background: var(--w-warn-soft);
  color: var(--w-warn-label);
}

.dsh-wb-tag[data-tone="success"] {
  background: var(--w-accent-soft);
  color: var(--w-success);
}

/* Buttons (both host primitives().Button and semantic FallbackButton) */
.dsh-wb-btn.dsh-wb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: auto;
  min-height: 30px;
  padding: 4px 11px;
  border-radius: var(--w-radius-sm);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  font-weight: 550;
  cursor: pointer;
  text-align: center;
  white-space: normal;
  text-decoration: none;
}

.dsh-wb-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dsh-wb-btn-outline {
  background: var(--w-bg-base);
  color: var(--w-ink);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  box-shadow: var(--dsh-button-shadow, none);
}

.dsh-wb-btn-ghost {
  background: transparent;
  color: var(--w-muted);
  border: var(--dsh-control-border-width, 0.5px) solid transparent;
}

.dsh-wb-btn-primary {
  background: var(--w-primary-fill);
  color: var(--w-primary-ink);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-primary-fill);
  box-shadow: var(--dsh-button-shadow, none);
}

.dsh-wb-btn-danger {
  background: var(--w-bg-base);
  color: var(--w-danger);
  border: var(--dsh-control-border-width, 0.5px) solid color-mix(in oklab, var(--w-danger) 32%, var(--w-border));
}

.dsh-wb-icon-btn.dsh-wb-icon-btn {
  flex: none;
  width: 30px;
  min-width: 30px;
  padding-inline: 0;
}

.dsh-fallback-btn-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
}

@media (hover: hover) {
  .dsh-wb-btn-outline:hover:not(:disabled) {
    background: var(--w-hover);
    border-color: var(--w-accent);
  }
  .dsh-wb-btn-ghost:hover:not(:disabled) {
    background: var(--w-hover);
    color: var(--w-ink);
  }
  .dsh-wb-btn-primary:hover:not(:disabled) {
    background: var(--w-primary-hover);
    border-color: var(--w-primary-hover);
  }
  .dsh-wb-btn-danger:hover:not(:disabled) {
    background: var(--w-danger-soft);
    border-color: var(--w-danger);
  }
}

/* Inputs, Textareas, Checkboxes & Choice Menus */
.dsh-wb-input.dsh-wb-input,
.dsh-fallback-input-wrap.dsh-wb-input {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  width: 100%;
  min-height: 32px;
  padding: 3px 10px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  border-radius: var(--w-radius-sm);
  background: var(--w-bg-base);
  color: var(--w-ink);
  box-shadow: none;
}

.dsh-fallback-input-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
  color: var(--w-tertiary);
}

.dsh-wb-input > input {
  flex: 1;
  min-width: 0;
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  padding: 2px 0;
}

.dsh-wb-input:focus-within,
.dsh-wb-textarea:focus-visible {
  border-color: var(--w-accent);
  outline: 2px solid var(--w-accent);
  outline-offset: 1px;
}

.dsh-wb-textarea {
  width: 100%;
  min-width: 0;
  min-height: 120px;
  padding: 8px 11px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  border-radius: var(--w-radius-sm);
  background: var(--w-bg-base);
  color: var(--w-ink);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  resize: vertical;
}

.dsh-wb-checkbox.dsh-wb-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 2px 0;
  color: var(--w-ink);
  cursor: pointer;
  font-size: 13px;
}

.dsh-wb-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  flex: none;
  accent-color: var(--w-accent);
}

.dsh-wb-checkbox-hidden > span {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.dsh-wb-choice {
  display: block;
  min-width: 0;
}

.dsh-wb-choice > .dsh-style-fallback-wrap,
.dsh-wb-menu.dsh-wb-menu {
  display: block;
  width: 100%;
  min-width: 0;
}

.dsh-wb-menu-btn.dsh-wb-menu-btn {
  width: 100%;
  min-height: 32px;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 10px;
  text-align: start;
}

.dsh-wb-menu-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsh-wb-search {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.dsh-wb-search-clear.dsh-wb-search-clear {
  position: absolute;
  inset-inline-end: 3px;
  width: 24px;
  min-width: 24px;
  min-height: 24px;
}

.dsh-wb-search:has(.dsh-wb-search-clear) .dsh-wb-input {
  padding-inline-end: 28px;
}

/* Status Banner */
.dsh-wb-status {
  display: flex;
  flex: none;
  align-items: flex-start;
  gap: 8px;
  margin: 10px 18px 0;
  padding: 9px 12px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
  color: var(--w-muted);
  font-size: 12.5px;
  line-height: 19px;
}

.dsh-wb-status > svg {
  flex: none;
  margin-block-start: 1.5px;
}

.dsh-wb-status-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.dsh-wb-status[data-tone="error"] {
  background: var(--w-danger-soft);
  border-color: color-mix(in oklab, var(--w-danger) 28%, var(--w-border));
  color: var(--w-danger);
}

.dsh-wb-status[data-tone="warn"] {
  background: var(--w-warn-soft);
  color: var(--w-warn-label);
}

.dsh-wb-status[data-tone="success"] {
  background: var(--w-accent-soft);
  color: var(--w-success);
}

/* Empty State */
.dsh-wb-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 200px;
  flex: 1;
  padding: 28px 18px;
  text-align: center;
  overflow-wrap: anywhere;
}

.dsh-wb-empty-icon {
  width: 44px;
  height: 44px;
  margin-block-end: 4px;
}

.dsh-wb-empty > h2 {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  color: var(--w-ink);
}

.dsh-wb-empty-desc {
  max-width: 44ch;
  color: var(--w-muted);
  font-size: 13px;
  line-height: 20px;
}

/* Master-Detail Split & Interactive Rows */
.dsh-wb-split {
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
  width: 100%;
}

.dsh-wb-master {
  display: flex;
  flex-direction: column;
  flex: none;
  width: var(--dsh-split-size, var(--dsh-list-width, 360px));
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  background: transparent;
}

.dsh-wb-detail {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  overflow-wrap: anywhere;
  padding: 20px 24px;
  background: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  .dsh-wb-detail > article {
    opacity: 1;
    translate: 0px 0px;
    transition: opacity var(--dsh-motion-base, 200ms) var(--dsh-ease-out),
      translate var(--dsh-motion-base, 200ms) var(--dsh-ease-out);
  }
  @starting-style {
    .dsh-wb-detail > article {
      opacity: 0;
      translate: 0px 4px;
    }
  }
}

.dsh-wb-master-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 14px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
}

.dsh-wb-row {
  display: flex;
  align-items: stretch;
  min-width: 0;
  position: relative;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-inline-start: 3px solid transparent;
}

.dsh-wb-row.is-selected {
  background: var(--w-active);
  border-inline-start-color: var(--w-accent);
}

.dsh-wb-row.is-selected .dsh-wb-tag:not([data-tone]) {
  background: var(--w-accent-soft);
  color: var(--w-accent);
}

.dsh-wb-row-select {
  display: flex;
  align-items: flex-start;
  padding: 14px 0 0 12px;
}

.dsh-wb-row-btn.dsh-wb-row-btn {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  min-width: 0;
  padding: 12px 14px;
  border: 0 !important;
  box-shadow: none !important;
  background: transparent;
  color: inherit;
  text-align: start;
  cursor: pointer;
}

.dsh-wb-row > .dsh-row-actions {
  align-self: center;
  padding-inline-end: 8px;
}

.dsh-wb-row > .dsh-row-actions .dsh-wb-icon-btn.dsh-wb-icon-btn {
  width: 26px;
  min-width: 26px;
  min-height: 26px;
}

.dsh-wb-row-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.dsh-wb-row-title-wrap {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
}

.dsh-wb-row-title-wrap > strong {
  font-size: 13.5px;
  line-height: 19px;
  font-weight: 600;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.dsh-wb-row-meta,
.dsh-wb-row-desc {
  color: var(--w-muted);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
}

.dsh-wb-row-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dsh-wb-back.dsh-wb-back {
  display: none;
  align-self: flex-start;
  margin-block-end: 12px;
}

/* Details Disclosure with Animated Chevron */
.dsh-wb-details {
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  padding-block: 14px;
}

.dsh-wb-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  list-style: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--w-ink);
}

.dsh-wb-summary::-webkit-details-marker {
  display: none;
}

.dsh-wb-details-body {
  padding-block-start: 10px;
}

/* Interactive Spotlight + Directional Arrow CoachmarkTour & CopyPrompt */
[popover]:is(:popover-open, .\\:popover-open) {
  display: block;
}

.dsh-wb-tour-trigger.dsh-wb-tour-trigger {
  font-weight: 600;
}

.dsh-wb-tour-layer {
  --tour-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --tour-bg: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base, #ffffff));
  --tour-ink: var(--dsw-alias-label-primary, #1b2230);
  --tour-muted: var(--dsw-alias-label-secondary, #5b667a);
  --tour-border: var(--dsw-alias-border-l2, #d8e0ec);
  --tour-radius: var(--dsw-radius-md, 12px);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: visible;
  pointer-events: none;
  z-index: 2147483000;
  color: var(--tour-ink);
  font-size: 13px;
  line-height: 1.55;
  font-family: var(--dsh-font-body, var(--ds-font-family-ui, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif));
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] {
  --tour-radius: 0px;
}

.dsh-wb-tour-spotlight {
  position: fixed;
  pointer-events: none;
  border-radius: calc(var(--tour-radius) * 0.75 + 2px);
  box-shadow:
    0 0 0 2px var(--tour-accent),
    0 0 0 5px color-mix(in oklab, var(--tour-accent) 22%, transparent),
    0 0 0 9999px rgba(15, 23, 42, 0.26);
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-spotlight {
  border-radius: 0px;
}

.dsh-wb-tour-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: rgba(15, 23, 42, 0.24);
}

.dsh-wb-tour-card {
  position: fixed;
  inset: auto;
  margin: 0;
  width: min(328px, calc(100dvw - 24px));
  max-block-size: calc(100dvh - 24px);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 13px 15px 12px;
  border: 1px solid var(--tour-border);
  border-radius: var(--tour-radius);
  background: var(--tour-bg);
  color: var(--tour-ink);
  box-shadow: var(--dsw-elevation-prominent, 0 16px 40px rgba(15, 23, 42, 0.18));
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card {
  border-width: 2px;
  border-color: #1e2826;
  box-shadow: 4px 4px 0px #1e2826;
}

.dsh-wb-tour-arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--tour-bg);
  transform: rotate(45deg);
  pointer-events: none;
}

.dsh-wb-tour-card[data-side="bottom"] > .dsh-wb-tour-arrow {
  top: -6px;
  left: calc(var(--arrow-x, 28px) - 5px);
  border-top: 1px solid var(--tour-border);
  border-left: 1px solid var(--tour-border);
}

.dsh-wb-tour-card[data-side="top"] > .dsh-wb-tour-arrow {
  bottom: -6px;
  left: calc(var(--arrow-x, 28px) - 5px);
  border-bottom: 1px solid var(--tour-border);
  border-right: 1px solid var(--tour-border);
}

.dsh-wb-tour-card[data-side="right"] > .dsh-wb-tour-arrow {
  left: -6px;
  top: calc(var(--arrow-y, 24px) - 5px);
  border-bottom: 1px solid var(--tour-border);
  border-left: 1px solid var(--tour-border);
}

.dsh-wb-tour-card[data-side="left"] > .dsh-wb-tour-arrow {
  right: -6px;
  top: calc(var(--arrow-y, 24px) - 5px);
  border-top: 1px solid var(--tour-border);
  border-right: 1px solid var(--tour-border);
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="bottom"] > .dsh-wb-tour-arrow {
  border-top: 2px solid #1e2826;
  border-left: 2px solid #1e2826;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="top"] > .dsh-wb-tour-arrow {
  border-bottom: 2px solid #1e2826;
  border-right: 2px solid #1e2826;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="right"] > .dsh-wb-tour-arrow {
  border-bottom: 2px solid #1e2826;
  border-left: 2px solid #1e2826;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="left"] > .dsh-wb-tour-arrow {
  border-top: 2px solid #1e2826;
  border-right: 2px solid #1e2826;
}

.dsh-wb-tour-card[data-side="center"] > .dsh-wb-tour-arrow {
  display: none;
}

.dsh-wb-tour-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.dsh-wb-tour-step-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dsh-wb-tour-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  background: color-mix(in oklab, var(--tour-accent) 14%, transparent);
  color: var(--tour-accent);
}

.dsh-wb-tour-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dsh-wb-tour-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--tour-border);
}

.dsh-wb-tour-dot[data-active="true"] {
  width: 14px;
  background: var(--tour-accent);
}

.dsh-wb-tour-skip {
  min-block-size: 24px;
  min-inline-size: 24px;
  padding: 2px 6px;
  border: 0;
  border-radius: var(--dsw-radius-xs, 6px);
  background: transparent;
  color: var(--tour-muted);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
}

.dsh-wb-tour-skip:hover {
  color: var(--tour-ink);
  background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.05));
}

.dsh-wb-tour-title {
  margin: 0;
  font-size: 14px;
  line-height: 1.38;
  font-weight: 650;
  color: var(--tour-ink);
}

.dsh-wb-tour-desc {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--tour-muted);
}

.dsh-wb-tour-inline-action {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-block-start: 2px;
}

.dsh-wb-tour-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-block-start: 2px;
  padding-block-start: 8px;
  border-block-start: 0.5px solid var(--tour-border);
}

.dsh-wb-tour-nav {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-inline-start: auto;
}

@media (pointer: coarse) {
  .dsh-wb-tour-skip {
    min-block-size: 32px;
    padding: 4px 10px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .dsh-wb-tour-spotlight {
    transition:
      top 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      left 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      width 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      height 0.24s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .dsh-wb-tour-card {
    transition: top 0.22s cubic-bezier(0.22, 1, 0.36, 1), left 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .dsh-wb-tour-dot {
    transition: width 0.2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dsh-wb-tour-spotlight,
  .dsh-wb-tour-card,
  .dsh-wb-tour-dot {
    transition: none;
  }
}

.dsh-wb-prompt-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
}

.dsh-wb-empty .dsh-wb-prompt-chips {
  justify-content: center;
}

.dsh-wb-copy-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  max-width: 100%;
}

.dsh-wb-copy-status {
  font-size: 11.5px;
  line-height: 17px;
  color: var(--w-muted);
  opacity: 0;
  pointer-events: none;
  max-inline-size: 0;
  overflow: clip;
  white-space: nowrap;
  transition: opacity 0.16s ease;
}

.dsh-wb-copy-status[data-visible="true"] {
  opacity: 1;
  max-inline-size: 280px;
  padding: 2px 6px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
}

.dsh-wb-copy-fallback {
  display: inline-block;
  max-width: 100%;
  padding: 2px 6px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
  color: var(--w-ink);
  font: 11.5px/1.5 var(--dsh-font-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
  overflow-wrap: anywhere;
  user-select: text;
}

/* Portaled / Fallback Modal Dialog */
.dsh-wb-dialog.dsh-wb-dialog {
  box-sizing: border-box;
  width: min(560px, 100%);
  max-height: 100%;
  min-height: 0;
  padding: 0;
  gap: 0;
  border: 0;
  background: var(--w-bg-1);
  box-shadow: var(--dsw-elevation-prominent);
}

.dsh-wb-dialog-wide.dsh-wb-dialog-wide {
  width: min(860px, 100%);
  max-width: min(860px, calc(100dvw - 32px));
}

.dsh-wb-dialog-frame {
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100dvh - 40px);
  background: var(--w-bg-1);
  color: var(--w-ink);
}

.dsh-wb-dialog-header,
.dsh-wb-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: none;
  gap: 8px;
  padding: 12px 18px;
  background: var(--w-bg-base);
}

.dsh-wb-dialog-header {
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-dialog-header > h2 {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 650;
  color: var(--w-ink);
}

.dsh-wb-dialog-header > h2[data-tone="warn"] {
  color: var(--w-warn);
}

.dsh-wb-dialog-body {
  min-height: 0;
  min-width: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 18px;
}

.dsh-wb-dialog-footer {
  flex-wrap: wrap;
  justify-content: flex-end;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

/* Focus Indicators */
.dsh-wb-page :focus-visible,
.dsh-wb-dialog-frame :focus-visible,
.dsh-wb-tour-layer :focus-visible {
  outline: 2px solid var(--w-accent);
  outline-offset: 2px;
}

/* Container Queries */
@container dsh-workbench (max-width: 760px) {
  .dsh-wb-header {
    flex-wrap: wrap;
    padding: 6px 12px;
  }
  .dsh-wb-header-actions {
    width: 100%;
    margin-inline-start: 0;
    justify-content: flex-start;
  }
  .dsh-wb-tabs {
    padding-inline: 8px;
  }
  .dsh-wb-tab-panel:has(> .dsh-wb-split) {
    overflow: auto;
  }
  .dsh-wb-split {
    display: flex;
    flex-direction: column;
    min-height: 360px;
  }
  .dsh-wb-split > .dsh-split-resizer {
    display: none;
  }
  .dsh-wb-split[data-selected="false"] > .dsh-wb-detail {
    display: none;
  }
  .dsh-wb-split[data-selected="true"] > .dsh-wb-master {
    display: none;
  }
  .dsh-wb-master {
    width: 100% !important;
    flex: 1;
    border-inline-end: 0;
  }
  .dsh-wb-detail {
    padding: 16px 14px;
  }
  .dsh-wb-back.dsh-wb-back {
    display: inline-flex;
  }
}
`;

  const styles = WORKBENCH_V2_CSS + '\n' + DSH_THEMES_AND_MOTION_CSS;

  function ensureStylesInHead() {
    if (typeof document === 'undefined' || !document.head || typeof document.querySelector !== 'function') {
      return false;
    }
    const id = 'dsh-workbench-ui-v3';
    if (!document.querySelector('style[data-plugin-css="' + id + '"]')) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-plugin-css', id);
      styleEl.textContent = styles;
      document.head.appendChild(styleEl);
    }
    return true;
  }

  function Styles() {
    useSafeEffect(() => {
      ensureStylesInHead();
    }, []);
    if (ensureStylesInHead()) return null;
    return h('style', { 'data-plugin-css': 'dsh-workbench-ui-v3' }, styles);
  }

  return {
    Icon,
    Button,
    IconButton,
    Input,
    Checkbox,
    Switch,
    ChoiceMenu,
    Search,
    Page,
    Tabs,
    TabPanel,
    Status,
    Empty,
    Split,
    SplitResizer: DshSplitResizer,
    Skeleton,
    Row,
    Details,
    CopyPrompt,
    CoachmarkTour,
    computeTourLayout,
    writeClipboardText,
    Dialog,
    StyleSwitcher,
    FontSwitcher,
    Styles,
    register,
    primitives,
    styles,
    DSH_STYLES,
    DSH_DEFAULT_STYLE,
    normalizeDshStyle,
    getDshStylePreset,
    useDshStyle,
    readDshStyle,
    writeDshStyle,
    subscribeDshStyle,
    DSH_FONTS,
    DSH_DEFAULT_FONT,
    normalizeDshFont,
    getDshFontPreset,
    useDshFont,
    readDshFont,
    writeDshFont,
    subscribeDshFont,
    syncPortaledFont,
    syncPortaledOverlays,
    createOverlaySyncRef,
    useResizableSplit,
    useSlidingTabIndicator,
  };
}

// Editable browser entry. Build with node scripts/build-client.mjs.
window.__ModuleLoader__.load(__stardustUpdatesWrap({ id: 'dsh-rss', factory: require => {
        const React = require('react');
        const W = createWorkbenchUI(React, require);
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

        const { useState, useEffect, useRef, useId } = React;
        const h = React.createElement;
        const ROUTE = 'api/dsh-rss/subscriptions';
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
        async function request(action, args, signal) {
            const response = await fetch(new URL(ROUTE, document.baseURI), action ? {
                method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-DSH-RSS': '1' }, body: JSON.stringify({ action, ...args }), signal,
            } : { credentials: 'same-origin', headers: { 'X-DSH-RSS': '1' }, signal });
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
        function Panel({ workbench = false } = {}) {
            const [activeTab, setActiveTab] = useState('feeds');
            function exportFeeds() {
                return run('export', {}, value => {
                    const url = URL.createObjectURL(new Blob([value.opml], { type: 'text/x-opml;charset=utf-8' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'rss-subscriptions.opml';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    setTimeout(() => URL.revokeObjectURL(url), 10000);
                    setNotice(t('downloaded'));
                });
            }
            const [, setLanguage] = useState(language);
            const [state, setState] = useState(null), [loading, setLoading] = useState(true), [busy, setBusy] = useState('');
            const [error, setError] = useState(''), [notice, setNotice] = useState(''), [query, setQuery] = useState(''), [category, setCategory] = useState('*');
            const [modal, setModal] = useState(null), [draft, setDraft] = useState({ url: '', name: '', category: '' });
            const [opml, setOpml] = useState(''), [updateExisting, setUpdateExisting] = useState(false), [preview, setPreview] = useState(null);
            const [catalogQuery, setCatalogQuery] = useState(''), [catalogCategory, setCatalogCategory] = useState('*'), [catalogLanguage, setCatalogLanguage] = useState('*');
            const [sourcePreviews, setSourcePreviews] = useState({});
            const categoryListId = typeof useId === 'function' ? useId() : 'rss-cat-list';
            const feedFormId = categoryListId + '-form';
            const rssTabsId = categoryListId + '-tabs';
            const controller = useRef(null), trigger = useRef(null);
            // Update protection: dsh-rss
            __stardustUpdatesGuard(React, "dsh-rss", { dirty: !!opml.trim(), busy: !!busy || !!modal });

            useEffect(() => { listeners.add(setLanguage); return () => listeners.delete(setLanguage); }, []);
            useEffect(() => { void run(null); return () => controller.current?.abort(); }, []);
            async function run(action, args = {}, onSuccess) {
                if (controller.current) return;
                const abort = new AbortController();
                controller.current = abort;
                setBusy(action === 'check' && args.id ? args.id : action || 'load');
                setError('');
                setNotice('');
                try {
                    const value = await request(action, args, abort.signal);
                    abort.signal.throwIfAborted();
                    if (value.snapshot) setState(value.snapshot);
                    if (onSuccess) onSuccess(value);
                    return value;
                }
                catch (failure) {
                    if (!abort.signal.aborted) {
                        if (failure.snapshot) setState(failure.snapshot);
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
            function close() {
                if (!modal && activeTab === 'transfer') setActiveTab('feeds');
                setModal(null);
                setError('');
                setPreview(null);
                queueMicrotask(() => trigger.current?.focus?.());
            }
            function open(type, feed, event) {
                trigger.current = event?.currentTarget || null;
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
                }
                setModal({ type, feed });
            }
            async function chooseFile(event) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
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
            const fieldIcon = { url: 'link', name: 'edit', category: 'folder' };
            const field = (key, hint) => h('label', { key, htmlFor: feedFormId + '-' + key, className: 'rss-dialog-field' },
                h('span', null, t(key)),
                h(W.Input, {
                    id: feedFormId + '-' + key,
                    name: key,
                    icon: fieldIcon[key] || 'file',
                    type: key === 'url' ? 'url' : 'text',
                    value: draft[key],
                    placeholder: hint,
                    required: key === 'url',
                    disabled: !!busy,
                    list: key === 'category' ? categoryListId : undefined,
                    autoFocus: key === 'url',
                    onChange: event => setDraft({ ...draft, [key]: event.target.value }),
                }));

            const feeds = state?.feeds || [], writable = state?.writable === true;
            const categories = [...new Set(feeds.map(feed => feed.category))].sort();
            const catalog = state?.catalog || { categories: [], sources: [] };
            const sourceOptions = catalog.sources.filter(source =>
                (catalogCategory === '*' || source.category === catalogCategory) &&
                (catalogLanguage === '*' || source.language === catalogLanguage) &&
                (source.name + ' ' + source.url + ' ' + (source.description || []).join(' ')).toLowerCase().includes(catalogQuery.trim().toLowerCase()));
            const filtered = feeds.filter(feed =>
                (category === '*' || feed.category === category) &&
                (feed.name + ' ' + feed.url).toLowerCase().includes(query.trim().toLowerCase()));

            const rssTourSteps = [
                {
                    id: 'catalog',
                    selector: '#' + rssTabsId + '-tab-catalog',
                    fallback: '[data-tour="rss-recommended"]',
                    side: 'bottom',
                    title: rssText('推荐来源与先预览再订阅', 'Recommended sources & preview first'),
                    desc: rssText(
                        '先从「推荐订阅源」按分类挑选并点「预览并检查」查看近期文章，确认喜欢后再订阅；仅浏览目录不会自动联网。',
                        'Pick topics from Recommended feeds and preview recent entries before subscribing; browsing never contacts sites automatically.',
                    ),
                },
                {
                    id: 'add-feed',
                    selector: '[data-tour="rss-add"]',
                    side: 'bottom',
                    title: rssText('添加自定义 RSS / Atom 源', 'Add custom RSS / Atom feeds'),
                    desc: rssText(
                        '点击「添加订阅」可输入任意网站的原生 RSS / Atom 地址，并设置显示名称与自定义分类分组。',
                        'Click Add feed to enter any publisher RSS / Atom URL with a display name and custom category.',
                    ),
                },
                {
                    id: 'ai-briefing',
                    selector: '[data-tour="rss-category-filter"]',
                    fallback: '#' + rssTabsId + '-tab-feeds',
                    side: 'bottom',
                    title: rssText('让 AI 汇总今日订阅简报', 'Summarize today’s briefing with AI'),
                    desc: rssText(
                        '订阅管理就绪后，一键复制下方指令发到对话，助手会自动抓取最新更新、按主题提炼要点并附上原文链接。',
                        'Copy the prompt below into chat so AI fetches updates across your feeds and summarizes key takeaways with links.',
                    ),
                    prompt: rssText(
                        '汇总我订阅源里今天的重点更新，按主题提炼要点并附上原文链接',
                        'Summarize today’s key updates across my RSS feeds by topic with source links',
                    ),
                    promptLabel: rssText('复制：汇总今日重点更新', 'Copy: Summarize today’s updates'),
                },
                {
                    id: 'opml',
                    selector: '#' + rssTabsId + '-tab-transfer',
                    side: 'bottom',
                    title: rssText('OPML 批量导入与导出备份', 'OPML batch import & backup'),
                    desc: rssText(
                        '从其他阅读器迁移时可在「导入与导出」先预览新增与重复项再确认导入，也可随时一键导出 OPML 备份。',
                        'Preview new and duplicate feeds before importing an OPML file, or export an OPML backup anytime.',
                    ),
                },
            ];

            return __stardustUpdatesInlinePage(React,h(W.Page, {
                workbench,
                icon: 'rss',
                lang: language,
                title: t('title'),
                className: 'dshr rss-workbench',
                navigation: h(W.Tabs, {
                    id: rssTabsId,
                    label: rssText('RSS 视图', 'RSS views'),
                    value: activeTab,
                    onChange: setActiveTab,
                    items: [
                        { id: 'feeds', label: rssText('我的订阅', 'My feeds'), count: feeds.length },
                        { id: 'catalog', label: t('recommended'), count: catalog.sources.length || undefined },
                        { id: 'transfer', label: rssText('导入与导出', 'Import and export') },
                    ],
                }),
                tourSteps: rssTourSteps,
                tourStorageKey: 'dsh-rss.tour.v1',
                modalOpen: Boolean(modal),
                onTourCopyPrompt: async text => {
                    const ok = await W.writeClipboardText(text);
                    if (ok) {
                        setNotice(rssText('已复制 AI 简报指令，回到对话粘贴发送即可。', 'AI briefing prompt copied — paste it into chat.'));
                    }
                    return ok;
                },
                actions: h(React.Fragment, null,
                    h(W.Button, { icon: 'plus', variant: 'primary', 'data-tour': 'rss-add', disabled: !writable || !!busy, onClick: event => open('feed', null, event) }, t('add')),
                    h(W.Button, { icon: 'rss', 'data-tour': 'rss-recommended', disabled: !state || !!busy, onClick: () => setActiveTab('catalog') }, t('recommended')),
                    h(W.IconButton, { icon: 'refresh', spinning: busy === 'load', label: t('refresh'), disabled: !!busy, onClick: () => run(null) })),
            },
                h('style', { 'data-plugin-css': 'dsh-rss/workbench' }, RSS_WORKBENCH_CSS),
                state && !writable ? h(W.Status, { tone: 'warn' }, t('readonly')) : null,
                !modal ? h(W.Status, { tone: 'error' }, error) : null,
                h(W.Status, { tone: 'success' }, notice),
                h(W.TabPanel, { key: activeTab, id: rssTabsId, activeTab },
                    loading ? h('div', { className: 'rss-skeleton-split dsh-split-pane' },
                        h('div', { className: 'rss-skeleton-list dsh-split-leading', style: { '--dsh-split-size': '380px' } },
                            [0, 1, 2, 3, 4].map(i => h(W.Skeleton, { key: i, variant: 'row' }))),
                        h('div', { className: 'rss-skeleton-detail dsh-split-trailing' },
                            h(W.Skeleton, { variant: 'card', label: t('loading') }),
                            h(W.Skeleton, { variant: 'text', lines: 4 })))
                    : !state ? h(W.Empty, { title: t('loadError'), icon: 'rss', action: h(W.Button, { icon: 'refresh', disabled: !!busy, onClick: () => run(null) }, t('retry')) })
                    : activeTab === 'feeds' ? h(RssFeedBrowser, {
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
                        onOpenCatalog: () => setActiveTab('catalog'),
                        onOpenTransfer: () => setActiveTab('transfer'),
                    })
                    : activeTab === 'catalog' ? h(RssCatalog, { catalog, sources: sourceOptions, query: catalogQuery, setQuery: setCatalogQuery, category: catalogCategory, setCategory: setCatalogCategory, contentLanguage: catalogLanguage, setContentLanguage: setCatalogLanguage, busy, writable, state, run, previews: sourcePreviews, setPreviews: setSourcePreviews, setNotice })
                    : h('div', { className: 'rss-transfer' },
                        h('div', { className: 'rss-transfer-head' },
                            h('div', null,
                                h('h3', null, rssText('订阅备份与迁移', 'Back up and move subscriptions')),
                                h('p', { className: 'rss-muted' }, t('preserve'))),
                            h(W.Button, { icon: 'download', disabled: !state || !!busy, onClick: exportFeeds }, t('export'))),
                        h('form', {
                            className: 'rss-transfer-card',
                            'data-dsh-card': '',
                            onSubmit: event => {
                                event.preventDefault();
                                void run('preview', { opml, updateExisting }, value => setPreview(value.preview));
                            },
                        },
                            h('p', { className: 'rss-muted' }, t('importHint')),
                            h('label', { className: 'rss-transfer-field', htmlFor: feedFormId + '-opml-file' },
                                h('span', null, t('file')),
                                h('input', { id: feedFormId + '-opml-file', className: 'rss-file-input', type: 'file', accept: '.opml,.xml,text/xml,application/xml,text/x-opml', disabled: !!busy, onChange: chooseFile })),
                            h('label', { className: 'rss-transfer-field', htmlFor: feedFormId + '-opml-text' },
                                h('span', null, t('opml')),
                                h('textarea', { id: feedFormId + '-opml-text', className: 'dsh-wb-textarea', required: true, autoFocus: true, value: opml, disabled: !!busy, onChange: event => { setOpml(event.target.value); setPreview(null); } })),
                            h(W.Checkbox, {
                                label: t('update'),
                                checked: updateExisting,
                                disabled: !!busy,
                                onChange: checked => { setUpdateExisting(checked); setPreview(null); },
                            }),
                            preview ? h('div', { className: 'rss-preview-box', role: 'status' },
                                h('strong', null, `${t('new')} ${preview.addedCount} · ${t('duplicates')} ${preview.existedCount} · ${t('invalid')} ${preview.skippedCount}`),
                                !preview.addedCount && !preview.existedCount ? h('p', null, t('previewEmpty')) : null,
                                h('ul', null,
                                    preview.added.slice(0, 20).map(feed => h('li', { key: feed.url }, t('new'), '：', feed.name || feed.url, ' · ', feed.category || t('uncategorized'))),
                                    (preview.duplicates || []).slice(0, 20).map((item, index) => h('li', { key: 'duplicate-' + index }, t('duplicates'), '：', item.before.name || item.url, ' · ', item.before.category || t('uncategorized'), updateExisting ? ' → ' + (item.after.name || item.url) + ' · ' + (item.after.category || t('uncategorized')) : ' · ' + t('keep'))),
                                    preview.skipped.slice(0, 20).map((item, index) => h('li', { key: index }, item.title, ' · ', item.url, language === 'en' ? ': ' : '：', feedError(item.reason)))),
                                preview.added.length > 20 || preview.skipped.length > 20 || (preview.duplicates || []).length > 20 ? h('p', { className: 'rss-muted' }, t('previewLimit')) : null) : null,
                            h('div', { className: 'dsh-wb-toolbar' },
                                h(W.Button, { type: 'button', icon: 'close', disabled: !!busy, onClick: close }, t('cancel')),
                                h(W.Button, { type: 'submit', icon: 'search', disabled: !!busy || !opml.trim() }, t(busy === 'preview' ? 'saving' : 'preview')),
                                preview ? h(W.Button, {
                                    type: 'button',
                                    variant: 'primary',
                                    icon: 'check',
                                    disabled: !!busy || !(preview.addedCount || (updateExisting && preview.existedCount)),
                                    onClick: () => run('import', { opml, updateExisting, revision: preview.revision, token: preview.token }, value => {
                                        close();
                                        setNotice(`${t('imported')} · ${t('new')} ${value.result.addedCount} · ${t('duplicates')} ${value.result.existedCount} · ${t('invalid')} ${value.result.skippedCount}`);
                                    }),
                                }, t(busy === 'import' ? 'saving' : 'confirm')) : null)))),
                modal ? h(W.Dialog, {
                    title: modal.type === 'remove' ? t('deleteTitle') : modal.feed ? t('edit') : t('add'),
                    tone: modal.type === 'remove' ? 'warn' : undefined,
                    closeLabel: t('close'),
                    busy: !!busy,
                    onClose: close,
                    footer: modal.type === 'feed' ? h(React.Fragment, null,
                        error ? h(W.Button, { icon: 'refresh', disabled: !!busy, onClick: () => run(null) }, t('refresh')) : null,
                        h(W.Button, { disabled: !!busy, onClick: close }, t('cancel')),
                        h(W.Button, { type: 'submit', form: feedFormId, variant: 'primary', icon: 'check', disabled: !!busy }, t(busy ? 'saving' : 'save')))
                    : h(React.Fragment, null,
                        h(W.Button, { disabled: !!busy, onClick: close }, t('cancel')),
                        h(W.Button, { variant: 'danger', icon: 'trash', disabled: !!busy, onClick: () => run('remove', { id: modal.feed.id, revision: state.revision }, () => { close(); setNotice(t('removed')); }) }, t(busy ? 'saving' : 'remove'))),
                },
                    error ? h(W.Status, { tone: 'error', className: 'rss-dialog-status' }, error) : null,
                    modal.type === 'feed' ? h('form', {
                        id: feedFormId,
                        className: 'rss-dialog-form',
                        onSubmit: event => {
                            event.preventDefault();
                            void run(modal.feed ? 'edit' : 'add', { ...draft, id: modal.feed?.id, revision: state.revision }, () => { close(); setNotice(t('saved')); });
                        },
                    },
                        field('url', 'https://example.com/feed.xml'),
                        field('name', t('nameHint')),
                        field('category', t('categoryHint')),
                        h('datalist', { id: categoryListId }, [...new Set([...categories, ...catalog.categories.map(item => localized(item.name))])].filter(Boolean).map(value => h('option', { key: value, value }))),
                        h('p', { className: 'rss-dialog-muted' }, t('customCategory')))
                    : h('div', { className: 'rss-dialog-confirm' },
                        h('strong', null, modal.feed.name || modal.feed.url),
                        h('p', { className: 'rss-dialog-url' }, modal.feed.url),
                        h('p', null, t('deleteHint')))) : null),"dsh-rss");
        }
        function apply(ctx) {
            W.register(ctx, { id: 'dsh-rss.workbench', label: () => t('title'), icon: 'rss', component: Panel, order: 56 });
            ctx.effect(() => {
                const service = ctx.get ? ctx.get('locale') : ctx.locale;
                const update = () => {
                    language = String(service?.getSnapshot?.().active || 'zh').startsWith('en') ? 'en' : 'zh';
                    for (const notify of listeners) notify(language);
                };
                update();
                return service?.subscribe?.(update) || (() => { });
            }, 'dsh-rss: locale');
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
    } },{"name":"dsh-rss","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.11.1","label":"RSS 订阅","labelEn":"RSS","suiteComponent":true,"sectionIds":["dsh-rss"],"iconData":"data:image/webp;base64,UklGRnxYAABXRUJQVlA4WAoAAAAQAAAA/wAA/wAAQUxQSDsYAAABDARtpObOv2zGA8kERMQE8HvDrd8qemG/ZbricMHxnRPfnIXoBdbM3TNSz5ihevJOmBDpDNtHG4WRN7pDuiT4hrVhBxSqbfm/u/jDts2QJP//nojI1qtnOUavOfasbdu2bdu2bdu2d2x7x+rpDmTcx1EVGZlVmVn15ysinNHWCzYfqtXWLAsiVO2vb0mSLEmSbOv/f7ndRPoSpszErNZv3QARAYu2rSrVEiJL6YTnBd7HP1V983//8T+wMM5F4BjBWfU9J4SISQgXvIqCBw6Na7r03/f4My+6+LyTDt68PSsGVMn7g2IeW3P7i98YtihExNj/frh2UyJR9aJ2eYttcMaHs61DbqVkwShlYLHy3cHEeZVDsWxpe9J3K2ARKqWNCSPGGCVDqHvbEK92ez3vnQVrlTKhtWHUWPeU0vi1SxWzxXpm63db4YY4xgMbub0Ff7StVpYJRtt8ahBKU2QzG2vCiJH4soFYlbprozdDGGUiXBbvfPbuauQxQavftgxa+YsZG7ks7uOMkQOqj+Wcdp8Ao1xqxxnvpS4HKrxcdSCo8X4Lt6axNqH15kBjm7tXF8sC2vQPKB2lbaIQvy2evopEdYnjqGWQBcp6YLSUjsxltJJShzbGhRq/FJJbTeK43YnT4ysVaWwYZRGRvT1XOcIHlq1TPQ451b0EpX1UVQZQY9688djdtxzYb8iux173+qhWQCsPHG93ElXDtf0a0nhKF22gvjy7X50/bbXdT/sRTqkcta04nYJq4Vb7ATL0GA31+hBX7yCE4I7WqchgYvcfYbQX1/o2jBeSGIjKrJhi1PiVE3+0WYVR2xToGMSQ0EkI8bNXQPtwSwQ84P4KTLAK61jwfuQjHafxRBsSInGTrP9U6DCM4AYHjiKusftOBx1/6tG79FrTDais4tZ9aPW7y2MUa/6MFQT11G8+TBSXUOBoYDY8591JLXCMnPXtjds1FH+MCupOgfLqVXAmBTyZBjKazMMLcIzCgSQEo+3fa4aF1apgtAVgx928abEBWylj6L/c+pzGKVQTTzBWDGGdtjzkzPOP3XxNehgqInesS7XU9Q1HJDEm0h7TShqg5ZGmChnIqO5XqDAKhauSVKVFBup+2TcLHPErnPngocucXY1fidPm06Edto2RSGSIhWcS4xUx7OoY9ygJlkABW3/oxysdDaSUKrRY1myNs5n34TVnLISMaZNEGbiw8+aaxCtg2MDWIhGNMY77ooaxBIqYPYbChq7y9W+++RODawEYHRXV57V3LtcULsA/XVzLhNNlVaGO3y34ERjMXi+eUwS1ex5Q0ZzlZqRGSWX8jdG/gKQka8FngjFfJcYFq0Bhu0JHXahxRPxFgrYaDxVRxFg9JdeT87Vb9HaJK6gohK2544lnnrBTZ0ZMVB7/M5+v8Hr8fkDHSCiPAlJWIgM61GDh+kSdH5iDoln05UG1laYu4tRjZWgiMFi0gQceGcPfzkhI6sJeCQhNOPvn+yfAGimlgcXwQ4jzynJ8o1truP5FsWGC9mgJtU2ErW2hsUAotbFOKaUsXmlPopKEiaHQnovGrUIsLlnrzIJXDRdTqIDleF6U1L6iWCmM6U6ikhy3hCYCietifU5v+PRwccGi7xKij02lt60+ZX3ileP4aKjoR9jWXn56MFZD28CEiXAsvwMq9uj8viPaE6sQCOhmSI/E+Q2xmK5HQc9AeksbM8gFEi2UeKVieIIe90DihuixUzXUdNmgz1ToxJtZNcuAcCV0f+KDSVQiHEkimhy21ZMj5jdL42tMrRxWcjsCsglfU8AqBO71HuwdgaD+n7tjTYxf0oaF35qaDBOaLUiIyhB8jheHuRB0QjOM1CbKVHGUllY18ackBbPPaqgIgYK2gfYc3OUEc7rS6V3wth68ZYvrNH4WFYOhmxEXlUDnMipqNSatSYEjaWsdJhAcZDl7nmtdR1Tb8q42JFj+vdO8Fz5WTMiq46ATVDQkuroqMq+OAh52rvHv4EowfI9/jdYwuvtxv4DOhgyT1Jw1K/OIFJX+5I6+Mv+tME7rTID0nJRfnf0LtDebmVop9kUYhdUin8aTNZR/u/6P7sjCSF9raMI48fKsLcgBCaGR+KIzidzb2rNnwcItDrUsOC/OEWsH2fQNfZkUxm5IQf7H17Y9/p1/FsIkEh0F004ysFcCk/ZQYtLGud9lonD54JnQUTZLGnM7zaBKSSjsTh+Y/1ZIDe20ACYiXSVvNmagITVzEue8/Czkvx55Pymo7+JoC3OMiZikI0E4KVDEWHMK10mM6pzvz2HUebSrYEh4V+kNxEvXGH61qrD7Z1viucb7kJ4GdgOTgDqhtNRsDk5ei+x+JBjLcdhZPrfyqDGzjlakPQ0UiJT4Mfdz7iCR3/2OTuyJmhlGa/JAq/2MIyyRmIq9/SK3/lWQMUUhTZMa02rJbqMZLZcJW7bKqWX0vzHQMZCd6wa9wh01ti8scETtM2xVYvnteLVJMOP7XFZnvkLhmifz6QV0NWQJHSbWbhjGzQqC3cBenU5vkcvNs1AldxiplhUUS+11Qcs1yF9pzFmXeB7xLlQ8TwR2gxtUZwCB4zoEkXg1n3jKO9ae5U1xjyjGgqjNElQge/Gj9iCRQxzj2bjkY9Rs6wr2q6SIhb+hhZ7vHD5r0gzzchl4foR6THb8ogXkjO5oJfKBvAVxTgePtya0jGc3ixxMpL9KpZcK7TFGDsqXZVT7IBLmsF07QHngHASpHl8U3s0VGLX5BFInFRFsrvQKTVEp6GNFd+e/7hROL6A1tIngVfBVayVYYZkKCt/m6GJBp0MlpRe1wOhUgDmL3rOC31YXu39zs99zmTW2HFDB4waH1LrJGdVILC94xdW3lIjDZiKryZN2V+DdSi2QwgkkcuJ6rQxN6fCxsf2Gj+HyeH9R5MF/1eTDCxx9S+glGXQTk8yoSMdMEnT9qHcWTV7an5w+KQrcyXhmnAZSxuATCmJSbpYNvJJufs2FY7TqNGieLyD4/oAJlwSpL/PpLtar4giwPPgbrIBh3gJ+XFB1IFWSEDLXbtH4XRDLATZusWZYqtij1OBkmcEfu2dPquxMIgdYbxkM8TX5j1LhC5Xq1rKiJPaoXAxMZdQ4EXq8B2mRD7AXOHBsLi6fGLuyVw4sp9ehXKQoNWGegrU3sFZwxyrq3ZWDQ0F7Qv+RD6Y1lCSKnL+/0av2S0kxDOZ2JZaLJ87knDt1mgCXT+4xFn+SwgUksu+axoJNu+wLyxh/7CN4zg94/CpOpG/+y2j8ExDLQbNLHT0ylmZdwBbdMD9+Y24pKUIYg51IZN0N0KE5Mg3rCA2HOAHPI4Zb8PsdH8AYi/u9bBxWeDLrEHQnZGKxiJ0wfqPMSH4/2QAddB9pXzKY3SHrh/xPz5BzFg0tE+H9zPsauJcOMQK37LsseKdl22PU4T8YfyUKbqb2NoOUgfD7U8Tajy9pfJ3tjaDzi1JHkks26yNOtCbmNO3N70XpLdWParLs9osMMA6QsSPompjSIbOLRvpJ0I0/SuE+EkJkNpamGdD+OhbyeynKD+F8STB6Hv36JrSQE/RLmxTn+mFZHWmnSm0WPoLEVTykAKt1PF0Mmp/qV8wkAWeZCzsHyv9VEWF9Himbb3bjyxTgNx1CfX2EMxyJi8KtGQrbKDrIfBm6fSwioChP+no7fuqN8A1LxIxhu6lQITD18QPWCpzcwrODN/0iF2znrVK+vjMKvdX5JYhDdf4bKg1gyfCPnrz/4nUzUhG7T5aZJLnE8zDQxnZKnsov2h14JTBOACwWbEM8GzGsMR7aT2o2wZQ6VSZOXR5b3uPsd4gRaCVlC37nxDIz1URCgBEiaSJtr0Bs9Jx+8BzQhM0bEs/EPUtg2DRwlwwRIS8xvhlH9kNvxrZukgUIugcycdunD8k89cjFoK+N8BbmGpPbZOCA0ToLkVhnNuOcjGaD5AFk3uGbCe/WzQVMLJO4nUQW/OuhSiCMVzMJUx0hLOVCUe+MJQwL/uyumfBXnQidvHYEM6Km6cAkvgPw+tICjbwKR2bDPzEiccMhicoS8QpsYa4CUs1ZipHuFKcZ2HwHlZyhMkwAFOsKGPjCbr4AJRJQgtJ4jBjLQsy9pTWl5qfollsDGDmb1xfn71pBX0GcZWasSXog60qsRqXQ7DJ0iOFbksiCY4J+gkoRJCDnjFrJjldrVO5HDBVzL26kIBMuoP1bwxK0KDlpgIqW8K3YwVztvFZOVoVXV8/IDCVC0GW24FLAIkjKhjAOm2jt4y4qtleFg6mOZaO5Le4rtrcTElAtJ+AeWRB9Wn1h0AObc2nM6EgZcEXGXecLZ2L5EqShAD6KjbwrKdCrsTUHg6MyIW8EnA5ZEDPIGA7Fk6USvfsFjfsXTy1cKWmgzyKeiTjXfBJhSe47+PmcFddl0g8Q0A4MoD4cSCILe/zgSVA6TI5H7cNzqnUHj3Q+yXM41e3yB0/tx9LfF4V0b/8DrPLlb0BS27fimjLGadvxoxdOeZm+pM23f1tD6/iygWYcn6bqtubNyHohKH3X92vA6MTNqEImqfS0Wub2dmCs7JP+WU49F0AnlLRroMsUTsz/6mc2hccpSF/WegYry1QIZDNB/zTMzJs1n30agwPStozY79BlGz0Rrra0AMZ9mdBgyfZUk7b9GirlIsCGRTp8WrIGz1Mj1Fg0OOUGp6Dz0JoCehq2jkmd+zJm4jJvp3Qto4af0GqsTXLbbVhOSXYVi8zSmHKwuw71ucR5qrbb8GQ37u4HKhjo/U48Xlk0HqglkWqkHV/WKASkRAYunKAmbD0dkVJaI/Ftl1Qt49Tn8XmI0baWVTi6w6XAvVzKgp3UL83PdXJtuz3uVyZt4XBhis119cLT9ZgEbOEOFKTc8GT0FlpNqo2DU9CFVw9NNe+6ugUZaPPOFKStce3wG4ySUqXdOFqHlWFjQa+m4Iu3IJG2BLb6o82wcAebZg3s18/AYLvbyP0ApDF7U+Kpz7CxzpE33fKG+3LJzxwpP0muNDuutmb1+e/Up+ViwmmIvAStMgT6i6gWeEulpOJanSUeofR1MEEQsJpbW5AN2TvBW9vu0RZBv9tcPHlwNjqeOfV8sAxNsc4Qxb+AGiUceQRezMS2xLJg6+hc6K/CvLJyzmEGsodo0S/2SlybCa/GGXHfTbgu/RaqxMof1NmlFj1nhzPbZ8ALaNDCon+x2cotdiookF/G7QMjBvgqzqM46bues2LdxublWU45tfbeCjGEb4ml7jaeCpWU5zcOLyV6zmsxYWOwsCuxlF3/KUimhKBQj6p2MU/Fd9Ff3492M/Gacx7QrougwuSIBgefgAm9evmmr5lZELIkzqcg1dbnKSpUiakQQC6KHJGPQFNXo66CO1PcBNTwKLQOywk4k3JOGB/5BY4N8GxqYAFt8BukSVEtSBVwjN/4EMn0+3niqXU+H7rAN+LOpIHBg/JNZpY/3JPSRlDj0/DGoWUJNI2Cp6+P/FGrCwuxl3ZV8ZKUhK1/oIyv9ho6BrokKtTurD2yyCjJyMwJgx1JpOIOWALp//Wu+Qk6sRc7zwrL+EijMWMNYqm8VsCGyk8uO+gzqKRsVSER+MqKZrkovJCGL+isuOrWYF7DS1E+XE+/JlOP65+kxdT/GTSN2XViBSGNkXQRZEJKMDbY6bIXGjIEBsvKMzE5+s/BcfiTeraGJhlH8MwCv4yH7QZhGq6H7KCyH3J6FjKMxegG72Pn/mOOsXPQmplNbUHn0DD+BbQeRN+MXPYlNSQYaG6wdH0atATJWwdg2D4DSetNah9xM+8W9ChkkuL7OKJ3SxmPQuremj/6b2PeMx6GfwWhnlGKfVnmCxnVjYROgs/7fhPrZ3pWrtmyU7DqEGBF1vgrlbklE8nvLSh98Oy1vlrrt9DAEv7GIVpl1hArL7aAcyb+lCm952HrRTuoy6suTCElk9qUF4K2hUnWzWjKOvLjloibUf7jnaswmN2u3Ju+pkBjq+aXX5Ze8rSdTt4Gm7PBvE7lBaPVp8NoDL0O2lfZJeOS/oNyFI7d7zGjmd+FWPnn1lN4sS9MucuTvO6MD4/kcu2FZJMiU6aFTWUWvAXtAiXxJP0Flbg8uGRdQh+0d7BeOEvCq41LGf9zDsob9Caa8QUdAJOBwaYucCIjnGERJAlWQdzmaExdrfzoPBatKwfSs+l7aS6+sli7TFKQK4ytI1b+aUZGAP+utca0Mve2HqbUdUzHXNn6pfgyVzo2/JKC4oFT22c1Jr2i0mAyzgbI1PWkpc4tFN4knsqAq21eXYaS1Ifd5FMlQotFPHaqcc4FsQ1I7e2cPKBNFpgSH7cu/sQF1yYbba8vPiYPJ6fT78Dp7X+a/fyvyxzOI2EimpOvC2vQBunMvCVoZ/wm5YF51fASjmqGDS3BJzrIzLgDTm/hH5M+NIe3srT+AXDHGr+mNOK28wI8FcCL1wABKfIzZSTuJ5HK8b4lihzRX4GJDqEXqvH244IKvRjBw4Ep4UZI8v1tq7Su14VNNUnWkGkhX1uzDwnPzO9MLBU8D0XAR4thkiA0KTQVPmTQGsPIYkwPhQ+IpxPru1B+fA3mnRGGybAdnNM8kq17bJHj0pI63koCjW8P9ZRGJVBiSGOKsSWVyrQflqAxrah0u7JzdyE41io8sztUMslzdzOEGjnWsciIu2UREvemNujkiCiF/fhyoA4TPgAaIn3tfzrzlCLz8oP5idGKoiWtx/A5NS2Ch8LqkNdnwfgbXflLdoishCCN+hLpv4uI0xs+T8/iS2xzkwvgXO3ZPR3qhL1GaLdOEVtIYxJAl65zWF9APJFO44OMIAOvohJ0C6S1ZVatxYsmcnCor5EKdGOHBDqDJZukCEb130GV/wmL0vRKRhjMO4pmjAddBoXrU374uusoyKxNPWBYgpPsOhpDG4lRqnbd4ZAmPj9l5tF7NRcxJ3r2HtYY7Jb2EyeC2n0Yefi+BNxYLpOoWGw5FZMDUzt7BSVuTf+BG8HE9So691bZett6P4j8PvRkmfzJAMe47mPBWBYm3hv8HayRkYogfZ3SaqYBmqpzxbcojO1IPBuTjoojhwOlErbdyP4XK8+isomOEzQWDsjKG5gEp/rdnptnTSKa3FFAEVqFyrAxXpvGKEFzmz96X7FTdlblw4rZt9tU6Ni6keODyVBr8h0bG6MRBt7MYaIoLN+Fgkwts6GWLoeM/arJCZqd7kfYhExingl4saXVCot2oCBzS037CTK2UzgZSjmKh3uyxANJsujk7k9NPOXK3Rys+1yoUrOCW5u+u+xwSMkvob+SyqrFaPy8FgVZfOfYoJlQJq7ys9aWgk1vUItLVOHoK1B4730qxIP1JIiyaNf7CaHyLjVYKx33ndVIRWGocVYcfNxdcWdaY94BziJNs2nrzpoJCy2lVM6CSAET2oTUxGwFT6pjCvJWsqFhXylcxjK81LL2F3y9BDayrvIpTz1kdRJuygJzHDSNUsrDwx6NjzcrZyht8ecumV6jrPuVmva55KFXXnvm9pMHNRI9jtakjUvuTTN+MgRg3UW7a62kspBSGze9vyf7GC2NxbBDg8yvSI/F8LRgdR9BmqQUjr9Uqbgi0towBlpZrHzwyK9klK9hsWRBMRHWGHepwsokhCmEAOb7g+rzsSZFLgLhLJWcM+LU+CJClWCQcoKq0jiUkdrNTQmuN0qGFv893p0Y9Tz3pV/Gz180d+xPT528XtdTXhi+NASg5/06DtYp92OudbnTYtxDW/JcLtmacTp2PkKlY2C0UtZI5UxLr7WU2sJ+9I4FiinSsFpFX0/nLk0fQPjvmW2JIq8JbGjfsW1ddMqTbv132HXbnu1Y465PTHeXMO3+mREZWa025PCHdqkvjhRiOV19XdNjS4scIaVyjENlwClDPBnov5e35bTV0zOcZCxRbmoKBq5Z9P21Q2rJrS+5iHKPELyQCJ/oS7TqNpe9M2YpfEbN/v2RY3vUOH9zJs//N6Ppgm8WwWtaJr5xRo/tr33r7+kLFi+cOfT9m3ZtR06BuMYOR5189A5N/U974ocJ85qVbF0+b/Ivz121V2d3kd6e7+Ia35/XEYVMHiVt7VpD9jvxoutuuOHq0w7esXtbRk4Iy/kKBIk67nzBY+99/+tv37775BX7b1ofIdmqXZq6rsEjiYsTh+o6bdSnV4/1Ov4v8uvxcmXzgCf43YPcL9k+WY4v0EcE3JOIKFswUTS8mBA/4crGNT4+dP/NUKVYrb6PokU6M+7USJ78w1li3V8hSQXjJKuq/AcLRlXf/N9//J8VBABWUDggGkAAAPCpAJ0BKgABAAE+MRSIQqIhJpacfURoAwS1N3C48HNtT/YdmliDyv93/Yr2O6q/UP7P/gv8D/bf2d+VnWj1z5Unm/7P/u/8J/jv/H/ofmP/nv97/jv2w+UP6b/8PuA/qd/tP75/k/2k+Kz9sPdj+535K/AT+s/4j/u/673iP9f+1Hud/tH+n/6P+i/x3yAf0b/G/8X1uv//7jH+X/7XsCfs3/+vXR/+P+8+DH+uf7v9wf+h8h37Mf938//kA//nqAf9jiY/7r6IvCX8n4R/jXzb90/un7N/37/4e+b/peNrpX/qehv8f+0n4T/E/t9/jP2y+TP+F/hPFv48/2/qBfkH81/wv5Q/4D9nPr3+v7T7ev81/uPUF9hvpn+j/xH7e/4f0rP8r0Q+w3/D9wD+X/0z/Tf3b95/8l89f7D/q+LD+F/1nsBfzb+s/6//Rf5H9nPpd/nP+r/n/yq9sX55/gf+h/jv9B+zH2Dfyn+mf6v+9f5v/wf5n///+j7y/Yx+yv/n9z/9h/+y1I0lq5DdL8GcKRpK3hTGjt5rNTW3RAimg/4acAyyjxDdL8B4Se6XmhkGUXJIhX+/1mjVAXOBcNIOw2Gq097cI/pjvQeruCYzluGcIZYqWTKryea3TjMhCC8kEfIOXCaguCBHSd74dkVZfz57p4t9+RltaWo0E255/pdBoM9YtZgbQc+ZR/3zSS1hUUHR10Ou0ERvXqqrvk+Xn+i//Jf2i+P4kmHKk+9dQwKlb2F5gEDP3kG+QRj8nHvEj4hvn+FuT211vH6mzEzhSL6DHxmJA1HzsbZZqf7miR0NUBZPh609p7SGkJmHthhMbZBMJFj+VhvvX98/59EyLS+gfRr5Q1fk1J+399QkNGuysck/3Iby+zpwYh+C3u36Q7NsuL1zE7As62mM5S07IuGqBIaHyucS3ZOFP0JAnSfZEQe9vvB57IKW/xtTmbj5hxlIymrr33NTTOWVwPNCgaN/RotKwCx9cYFYbpVdvV6c9/4CeH7MOmFM6sehAZIvjwOPHCp/uxLh5aHC/08D/ECAYno6ICDgh64r27gyUdK3Wh5gBA179nkPuLNfsrWGEEqUF7GwqA2pki68ewzLViLB6xmEpuCnh56HmP7Tl4muX2vSP4k/whNpjpuoxIcCgGER8GovmY5RNVebJ8DzziplwwF9U414ljUtE0TwT9dIq0XygDTZ0jbjSQPKMmGxCVdBdHizJbueZIda/X/Nh8KU23BliL06S71z5E5GXNU+v5+afetpU14tlwmdSAfB6ixpby9EZh2vcqY4O44+NjLtzbiBd+i36r4Ve57E45Th0AT1LOdSaRb5YrF++y6tFkn2h3FygYQmhsxQhSAc1ihN48aSpOAOnuuPujk/WIhxIuoh4rPEWsJ5iQ/3p0fQvkxQYD4JwvnI6pehbQYO6zkIkAhih88KwN6E/vT2yllSDEJll56bLY1uxfdxKNSeLiU4xJEVJOH/TPj3dc4eBahh17/HBV6quf2UY1yYT4tJzOrjf2Kr0q4fuZ0a8J3dc3gCS7bjgrOMnu1c1zREs+3Jw/yLNv3/d/eM+0sIKXtHTmr3ZbVvsl930vHOjxEKIgvh7BHmTEwS2lIkXcdljGbIWyph1SzT7x+ToOaDUg8fK8Ur7MWbS2RInX73JL7GvaavDpO1N1+i5ZbZXj6JuxSOdJ70cWWJuJR+kLrOkqwRQbuCa9fiuQf//y2lJC+Qm4EiSu33beWR5IHLMsD+EEgiePuOoAVLFXtDjmr7QX/PcQnz1KjfrV2Grg1pNM4rWmadNhaRI+B5v9o0lq5DdL8GcKRSAAD+/+gXgAAf0FlpkzMPF0mEmIC36kU0QQpGdLxM6T15TxjXVHL7TJZLD0M/wZyuqe7ygZpYtpEIdIu3Rai5w/5AD48zrMTc1DjN/mxhJiQQqT8M1j36cqiHIG9JM8dfOBle3TCR1Z9CHo+x0myPa58PG3QktQnCG1koIEcf1bPBISvqFuPPP538eFwBdcDQkuSGMsvLAJg/EDsXVrRaYPU32EdpG5pS+uTNEyqMoZHgDQki9WfV8Nn0Vqv86AHNt6rTT3iS1LdcLC+iQYMVUWjfP03g+fDVtnheADcHzYVkBV/wX1/PCw3P1o14bskWikiOBO96WOLnm/tDfyXVzYJWzS9rCmlZ7y8RdmMtEYgwJ8VCCuxBGI4znkT1Mi1ylFjPq+FexeEoOjd2J5tJuNuJq9nfPJuryQbTW/GQv0sxnX2pYG3HnLmoaQ8tAbRJwOz3qhT+ce5Ckem2/sZ5GmgB7k0HXYxhrWd41sjc8co5nfhm1S3hre1AhQRw4YtbsYjixMxdi6/oy2qLDhD7Ea0+Z93ICoiTKlg0znQh1NF0xFqMTDGOyrDYq679IfMBPcJSEqtUaGNUi45716OmXzmZPCvFakUBEkyvYA6Sd3H+mKpVghDIfCqXFsrTPq3FgdxbK0WuQ+MgDZC2tLYMK7IvTIeb9KKwQzUAOZKx+Ywtn9sO7vrG/YPa7zmoP39OxtIXWRNwSc7LTFhHPRAhyJt3fO+zs7EgE+LwjvsOmbI9uqZE+K0jHaFtdfqkdWXmqsf++rSsSlLXHtAh2lB2CLsZFbvaFkLtk/t96jonLtGQ6qaTJzDJBJSds7N0JJ9jW+xrL73e9tquvBY4/Hvp+4HgJ5j1dFrBEy6kvQEYb/fj1tbwu1WPtydM/rPFmMYEyWqvuHIPpb8JfFPuY8Rr765v1d7Uye1gqHsXrHg0vEl74bL2xgc7uHydchmiOXN3Dt+cPOthB6v7X2x2WOds03qS2Nz3J2Bq+dG5jLEkXHuSfvMAxbCQMnD2XaOYIoYjQUXMOWCtgwnyWkMrBj3ukEspiFK2sjie49J13G9Q28dqmlcy2Fir54SDSsgehLsEpnQB9Jn09UfL4xczobMhuBX1eC4+wl1RP6iBds50vIjc/fUTUqJ8lk2XiGa8jzyCTdDJh35PSOEs3rsRjKwfAFW6VofyJLmBST2NimxeJpqIi+BNo4AvwTiNSgi9yykG4t49F5wVwWhr4wCdg0N2fEZI4TjrSbETeSLx+xaxZdhUf+yPbE0hEKkHL8t+WJ3GzESpnG4duKN2gIwotQXGOixKwLAbUDusujuvNE31jlSJ16/RTS1HTjr0zKwjJdRY2IDNBtBppjN9Hq+qdBleaMe/5ZKuVzpTW6i/dXpV1Kzu/dwEMvU5T3zbTJuVmtp9WONB9+TAFWs/JPoLprh3g5XKMP21T6pOdM7o0laVIbKfUyJ376UmDDKki6v7LrOUVUxdOts0cZuOlOVHhBNa0NK8UuZN/heuV0qFecR+w7ak+Io4C+QqBMpuJOwsJgd/IVAyz3Fml7vGaU41cB+P9Nw4Vr6Oqs6QDCSErawOdrmDXNudHvdthUUpFwwMfop5IBU3rR9qwLcYqtFTfmFUmcubNO9Yamg2antLmVKx1nNJsAPMF7111zUjYXIlD0U2lDghG5Zwe8qGt9ZyhXzZrS5e01UxELN5qaWlJ3F/Hp9bP9/HCAI/eeoXtUX0cUWxqawF8lmMrzMBXHvOkcBv+MpRpXLGAQCNA0hHwvHd8MAw42XoNebGIuUpJU+jxzdLKvYde4V1HqSX3mOk6zmnveW3vx4TOv9/3glBIsDLHT7fIt+6zDebkOf7IIPmPfkajn0XKeNF3iQ/nVDnTds4o6ogvHdLJ3Tp70cjBlUXX+88b8Kkv8TL5Lp6uR/g0ZukYii+S6QRpHneOTR+tbHMw1GB2yzjnSgsSWgOCC4B04rvBT5PiOtey3Mq5ljx/AfqCHwUcde8CUw6frzDlZptOKBp92hvYWVaT/OgK4fvIxNMp3yAs/Jv8qEPQsNjmdihn/LjTZ56H7TB+LRz4Rfjyh3EPUyXMcunqhgCvJ+Tpn1+1bDD16XNIYE1cBcBaU2kbzt5IZaPXeFdo4ALUlhb7gnJYFRLGdXtM87LiONEsFQYSX+cRiC0ShEGm3m+SphWVB06V6oyobemoXvPi8dCFcvAnLrF2IM4z/56tGy6TXEZzjIWis8iutyg2POsjSsnJEmZSkwzS/80GL8lgyJehSM5p82jw16aAfbekGYVljPvNjohABBqMzxJwEtzkLgJkzFvFwSxbCA6F5KD6C/wNwDP3J+IB2RyP2gOOnIvLlh50QLYXmXQbVuuk66+xtCSTmA8ODdIhPq2DntYg12wWhAPZE0+KDmmKVsd+cPXvOetBi6ATJk1i8K/OocY2Y+UcsLpRLWpL5HkcDUczsMuhBe/Bd4weEC8wP/pVo0ODYDceQVG3BWBALoUwRfUH5hx5L/VlNAGi37H9uWlXLz6ROFCua/7zRgCaWJadoYn26G8nNUR0mn95rEUuT1+2D+gAvlIvQASC4mjrxgrqwrlbPPjzv41WuRCDratd9BDSyey8dxDF7UUhmepfgMjdrT00C0K6DUXv87nV9rNjDv9c1ubsU9kljIpRddVFoBLeOOYW6I247+UOpVUhkvaRQ5Tce+cya79wXFRVJVJT6gIIJQOtVfVbix8U5+HKZXQlC8ijAUzwSN1OVumHsqgSesRdsoAn2CwMZdlOUimHVfEs8DkUxymI1ns8/e2hEqFUm4VWmnNU/pD+MmBJDgSeR/CM4Mr8Fopos6RXsiCkedAM6DLRkN3CAr+mtraTRXgG/KeNVkZZ191Yf0bRKf9fhB64GljjgIDLaoDkF757+Hl26UjT9xzZbaVaQ75zvmt1TIn1lftlG1ZjUGr4PhH7mfF284RTGviSt8+ljRdLOxH6k5ggfwcUuwBn4hhlZG2vGJuBLvuQOVNLev6mZ57dUJlFUSbTtnJUeS5AjhQsaBiOBcbszX4YYqFoxe04ls7kMGmEYhmKvrcaqUizq/gxfiOTVKJiNtIywygDkzmPwpgg0Bug+BMqxYWUBahdxETjXyd3uKg84sLYy+ZmKmI9m/Oo1hfGWUtvcSkDuLDNA7mRCyJZ9R9ZqMTU2QV6VJtFz+SOG32YAehpBSQFgzy317UUHZpAHaLGiMe120kCXhN3IBSwBUktZal1sZIu4wgCf3vuy0RHbG/2KPT5dXQWw8Xc6lMCqTfFGUNpRVdnm+FkILec8xmj39C1Gm75VTXEu+YoQ8YJflEVngCGD5TiKhaBWFtGhwsF+EaCu+2awb7wEK1MIiCYM/y9Lm3m4T0Kj4ZAn2Uh88Sx9uMrLHsiqnfLPr1tD+rtR6bskLhFd+DcPjZA57XuIrJ7+BL2AdTfkQVbfHosFIWtrowYeMQlcRzxUQRbVHdtXLGnMaihcmOyymtKCN3Oaej/nSbN3/bqKk31sfxVIYkzoi5rxk2nlbwJsT+q7+EOgWOGUVvMffj8YfdD+98Q+UeOw4HFH5CETL+/uXaNddk8R35Be0Cgf8N++MZtuJr2DkBBvIpS3CRPOWLWvD9dm9nbThQnI3IKobQNy+Mz2vqQV5Lnib+FwkecldAAlaOjKv5jm4V3iVPFzihCmk+bGZN9qDhSjzD9XZqnLNHfi3+zoayh4NMiHtnPrqzcsdDUQ8CV5jU6sVSAgMF1rqreE6R143V8rDJiH3MtrTuV+PxmotZzAVtWJcQNRknv0+sNHLNl/6BHb8tiztQOy+NVca+QuCTQEW8U3il9MeTZCJmrphMhtDSSMC1FkWXGVUI5vIw0ZVY+NTSK3QPset+rIItm9nrwaV8DJ28pp5GNECgJ5TRykaoelF88epiSLVwYmVW8Cac3HsEa6CwjS3DM0cbtMspZHtPue2aSDmmlI2yYwlQQLeDsgAi/QxBEmEoZ6nCBy8mXfk9hCIXex1GgCss4w8eDLQACO30hyr6+ThjLqawMZJut/vzAh8YtawgH1In2cFZ3ADGXnLigVq+FCobPghCkm9avSmoO0oSp1lp42oZqEuIEK90hPbkwfIQTJBRDMqdcxC6gVNieWOmZMYaa63s/5jw7QGRXvngcadvkKs12RpS9+jtLUEfwznp7EPhrFj8ea0RRiGSfJLYT3FUXjRHCrh9kKXOGJhvqaKfnexWSTKhtVzTju3PzmtehH5qIs4DKvxwesYM7HtHxPzir5xOGvmb90t1Io7+a2JPi5cUc6XOKjv0AFl+eeoXbmuNdMHem0Fwz6/NddlMHx0Swj0qfag4kTQUa4cZhHVe4Pc1XZ9Q05Jgwj8It+5megfaDxyhfR5j+FiZQDWTUz+M+wU8QXi3ccdYf2f1/JdH+XH+Bc/5Eu9UDlcfv5ZgB9IbGmXhoY/qSvlVc5MHHc7w4/HZ9gfZA6Yy+Vk/zXhEigaQbSmgTLukW6ulMV9+KoPAZdQaoGIw0Jus8lhm4L7uRJUrdnhDe9f+3unSGVL9We+/4DLuzPCwF7uIPv2pp39Pbx4NH53ehAkxzmupTsjnMopWgxtjfSa87QYDi47aP8NuW+8KQihg4BSEIyRWtu7JZGeMKaWUu/ZNlvEAoR6ZP6ENBtt+VslNdBIT47Hjea6Vbfy2q9NlZqLchKwErHf4MkGDoP/zZlf4CgAZFj2NM7Dmv6vo5PkF8SlbGcgd8Q693rzErWn4OhJoPwBIammtv4XqBVJRNclkzU7H10hGDSWyfk9YIeo68B6+Jx9bPE5qq00n5rU5hgJJvfTFCKNW6JJe+HAhMypvsHW3vFrN0iGnulZ/AI/6UZM4933iQNRWMbz4NZ932aK1+ZSCQb5SYxDckLVcyDdwutfmnOxnaT5VWefGZTGnHKK/NHgNJv9oItQ/9sE9jrLLHLzjSIk8jHZyHtaY1a1YIhI8iDzJZgBzVHcWhw/aSrjBJPINDOdglCa+3xyh9IVDJXSggjCMjimophNWhmLbDS2IkaCn72gsiKOwX4sjcs4kxSvtLiGOkGOJ8awvdczITYnJ2/Elrihnz7F7NxW3JvNwvRap1tAtzQOnzICJliqDGW5gQWIlC1u718oIu1hM89z2v5faRL3mgEQ1tZBLh5QhN7Q8EfjAqjm2MfxCXu7BjyD4d4vhsXVrgnZKOyBTsWEqb0I066a+ZYKARmS4k3WRfZm5qSiTI/9EtfjVuOF17+eMEW8DkFAzgpYHnsDKFhWCQyoWbLo7w173wE5ubOItjMNSX9PQ0mZku64VwyYGcxcqrAyIZPgL0mExgXGeHjevN/3TpuRGU4LxqAKuzCYyWeva1Q4+F/edQD6tP/ukwxjShE2kIJdvN4/UF1HGOEvYnpkASUg9exPTgoAQ6LzstZa3oL1Q0xrXhMyQp+Cl37ZsgQ3WIDdgjaROHVf8uP0Tt5A6tThAtuMdQh/QBd6dU3h2vKMvIhaRBbwbkH8CH5WPwit7XDBHk8pZHBYg6fWxPiIiHTS4snmcA7yuLGaM4FerhIRywP3KKXhivsTJKmKH1t5JFabyG4ufkNMDs9bvXoJEX3AhiFA9g0DEXcK60DuVgggC/luO5xLS20CpDa0Ky6Jzno6D9cBtkXSGJaNnnQWo6cgJcCnSY9UAxkeDX+zyxZbxREK7TTONBvrykB6cR7cAK9PyUbXrNBiOvxDzrpULc2G/D+vylznR13RCmoCBUTn4IJqHnCQlFGC9fuwAdsVVkwSwCGTUpchOI2k15uJKPae3J1bbpRuYoamt3wqxCULCCli6RLnUEYEhogFqDmzZ+JysD2rzNCpA/AEC0V7+4RsEvEqmyqcaUQ20whf/BLiG3GSalXusNrPHg0tlI8Gj/d5N1D2L8e8sELtz7nCEi8N3BLbSACRSiPx6UTLkriv86S0IGdu69ne8U6WtEHS4h5ExKkS7qMsofti6tPEzEfir5XVQURsBV48Gm+lCoEQgLAScSPmPJcLh8IdOZnHhVx0k3X0DfdxA78m2a7yJaPMb8WyAsv/KaEtFGjuQmnZgyBOZFxl1fngyH9+7ch2dT4FuEOJeYaYSiWmr7vq2MAX2z90nxN5MLyjCvu1B41bLpnCmClgHwhOoY0/kA9DImgZfhmHsIgJWi590mUw3EFGTuorSowiDk8xceSSn9urbowDZBq2FHE4yDXDrr86prAx8vTyWEVMOwCyVChqXvLFlIpoOOc+Kl2TzkmOaJPIH839f7NhV+j6Bhp8gAH31x49tNZBbQJjQG5z30JYfKrEnumOf3b8qBYTcQ1zGt829Gp7I0+EcCf5wK+Yanlw5TmWUpGaNHcAuKjlEssprWcmG2NqqPThD83kQ4eFwdW6wHxgTIKWfheJEpxA3jdNj0+T9rKToq8+vYZBLK8dd3t7OdnNPGwN+QiwZdiW7c8ZlsvJH/V4lY5K9ZA5oLDWktHJfdypBqQEalU8o9bu/zMMPTvkF2n9H3O/+MRY5DKTauYZps+mP4mDWfLpPlUsis3L8LKTw0nHHfdatIHpqqwp0J6uhJSvYNBODzPwkbotLv46rNOlXDzL4Y6LcOKqVyiBSBYbFmiLdR4PQadtqvARfMyz2/HeEgoui6Z0T6H7974PHBL/QZdyBZ5Uf+jX2UJzP5F5Set6YA8I3xLApTszogLZopAH2/MDz1EuQZ1BRycfbSiJCKnK2JFB96hHnZ5troy+325bT7KuhIIpW3iHPGuYRVlbq/sktk4pQerdyLaOc+T/Koo5R0aOsGnpjInojnH+z+F8EB6IaYZxnItO6t3tAfhSE8Zby/gdD4hMwbPIJqs2Uc5gkVrzmlgz7YrLW9tkTOsaI1lFUbhkRBbb55Rp3qqeKIcpvHPNt+zLF9aiczdjHt7D1+C1iDOoafJv38UIXWVvCTuoFPc9E3T0ztV0/S2gAtvgmTk0SLRwvIlN4RUUjXjIWEeqAzVrw8XuesXDv4APf6o3grhu9a5aGXr0xwofpx0+TLwUN3Uf4Brm1L6IwmTpAygmYqiJlDb58yXXEb/pPm21FPdiFgYM5+qwgg039/MSXp7qbdvRByEDxecEjq3EUz5GEjdWRVMxOWKetruXN6RRl1JCidOSvuBJxDmm81QOOWSaRpD4NeK435lZNS2b0XzHkZl4a1G+k7DQtrXGyDNKbOBdlmBQOYQcxEEqGz6K6Yk2uIgqRtVGib+LBjabiFCRQolTxvGGLZhKSPR/TTCvz2Tnkq3coqRGUXeCXX9rfpb+L8M8MQlkojvmfzHUexHYeU3rNW+q156kqG97d7wtnRJqAP2do3BPlV9Yt0andoiLCaJdoBMLvLO5+sV77c8yA/Bp5NVKjAfjvU2wIrIcbIS7L5Y7RPVfaRXv6d8tRBTaJi79MqkniXZQ8z9N359FHyF2u7P2oV0yOSrUzLJV8IfM5yZMN7MYq1xgzQ37S/hq+XsWRcKVZc99AVc3uYOT0jO8uMl5f9KDujTOs82QM9+xlghd64uZkKIkjbAwTNxLU1PaT/IQmgS0SUS1rJXykz7aTHxGjf2jCi8w8350dCCxJrG60NcQeiwA7lE6iNve8vf70kX3qNCCHtv9vxdhc7l+QKamk2KD98yVnqp5zDnsyQbVeE3T6mLrNTvFP1i0T44dWto5wfqcPVwEZbICwZ+wRr0TflG1PJ/Cy32QkZAdS/ji+lvXH4OMaJ9ET7VLZgY+iagBv+AqwXudrQshiilD8qkKF54NWmc9tkkCiK3SyomNW8EX/cQgcSAkFFV+SEUojJrkFv6kAzIFkEZ+lbqBFNH532lzbRC9+S3/0rlE2Z9aWq0uEOsFC0GcZLBisexomhwinjxPJ9+Kslxn5ubDg78IOZbv5usH344+NXZeJOBHpGx9bqb5IRVMB8IQ1MltkDLoT9F9fBkucHx2z3rIvQsyFZkeqRi5GNPxubq23yxDFDEd1bWQ8DONwi8uQ5txTvzwRXdj0s9jRaxIkj0jC4rtY9P+os8aoyAR5JZqOa6nd39qdf1U3Rem0MDgiCV3ist/yErgwCCz5VzmW69AyB4xhVvFsrFuReZ2r+a8SOgAiOG24g8J6X0qJXfFpkPhmcCbT9NEefYHuUjbOXoQzuOAghS3JUJ3O+QOIt+x3fBQFFe4M/016e0gLabjQdDG4QalSfrrokhFs5bsv7vsvLnWNUmtpJZOgC5XRNmJYgVLKw5sXQmOeYdeyxLOes+zWN0F4/91jObBe+p6c+SZaObi8fgLxOaHCujuLL5k52+w4ZLDp+QRARHHDanvzJgdiZKW/fTU4aiaHSfSA+czYTPB6l0OGnqDUeZRHfTgczZRP4Js4bV2mYva2p6EArvyezrOPtOQ2b9j3yYllIftk8+Wa2juDZBgz+SILtaTgMQw7/cqDjVp/jE/dQiH/yy1Ggirw/1TVY+nlStwYOmqtl2Bpa/XQUKVIhdAmQJ2c3+g5mCE+2UAaZ6ufSslGvsUeh1Ak6BIzYgoZzZ4kh1fNTNipmbsiU9WvXwnvES74EEiTocvj5pDmzvK3ZQ22y72gKciAx7onE3Q8vnmmC2T1C8Q6XXKsic/XIPOJUdh/f6hysN9GDiBc8kYz1aPEoYotnz+pRAJSUv9I2Cr0hH3MkxKIxTzksdwRfmaI+WV2cffkMrsB0hjxSxwdN/IrCed0VsZx+GnWM0lFq7glMBHkoirCyBF8XrrrQr7DCe712xhcaKMfdmLJblUMT6O51MjqvfY5d+8qmDr1vSv9w70aOYXEVxmBePZulV++G0DbARoeaXwr86QCkRYP/TEc0Ss3RTo8TojRFoTs36bqslgdjoENRaBrDPx8xjKhDgA+9EJEGe1SeGIZS1w+aGR/cvgCHYJX8GJNBZC8p+t01F3+Ls1cMMXDmPhTVR4EUrVzuEMLurdNYkYwrHPUIXkrD2YuLbYXMRAMqNwgo4zKaaM3VP1aNryPyExsRA2pukRls9M65EkVIBpsYqg3nXAEeFgTsSdcItSROqTyYYsMNVPfa8NcBR0Kw4uEUYt7lCnPUVKjCx3mqddRUCQw7MZSc7d+ZOKEP/t1SSLw3RtZjM6Mu1xzbwd1c6vW4O+LYheavgrZy1Aa2ay/PHmjW23MqTGWn9gq88nVfXsAVFoGzj9Mn6gd/CvbFiUv1zrPZuYiplIli7UJd5kDibiV830kWZM5hCS/5VHBsuoPjS5wc+h2NTVaNZTMHUamRd0TL3TSy7V+FeICB5gmGN76KFj5qm6VGI9iLheT5LsJfVQsfBRcirnCNPJINuFCIlrwsiCmp2nDLWm787d1IOoIRLd8G0pAqKL9QZrgjJfeezZsHXATjTcoWeHIIVaH5G8GWqkVMw+19DzvS9dOaXw5joaOm2gGhzLv656/GPUSS1jAK9piiQdL6rY3fWCOUuRGaBTbDSSvxf4htC8vUQJu3sRJOzPgan4Vku9LKPDVfmicHKvykO5u82pqLXMyTGJXyrGY3jmpng6viKWkm2jrITx4Q7v0lDEAvpVqLNwdceQYaq3wjG3HGRJvPAW9jrnwZ4vL2xfAbzppqkPfKPP/vHxkFIzsa2Ysg5KO57sRiD6KEgJ+AHIsSYnPFDtwNzZxy+LLcUJbjF3Xp8TVBFfH2ebPDd0WY4go3/QCCZLInDu90mEbL1tW7B1sdoQKZeA8VohGm1EAz2y+x2XRYxX4yqfrMr6ZaA7wVN9v/7wWPlPdh80qKGKLNp/M+0T0FVwKtx0WI3rmGmOGBNvYrh3V01vtj4lEweZ8fHoDenxAexi7KdRr/KUCI4I2Fl9RqOWt/NAS54eVa+3/89sJzQov/S2LSD1gffI9Ld3ypIazk8U1170zj31AjjYyVafknZqTQrnE18rsNlB9d9+bX0rIp32g//8Iv0sPlqDDiumVTN/UUgPq6gnVTIo4+S305O2kK3ASWH1wWWVbGW6mDPEDQF2He937U9Dr9me6zvzEFt7cplRqMjm3etpdOl61Zq6lqkvuPiEDxqy2uRt67fpqtiv4m/HaBJgUMa0cj4AYsrCEOvrCJAp50upqDHCjlPEL/yFunSvtmu68/loKOnNPtopNGorOf9xhy5KfuGX/qQZuObnfCO2A/R7JWqtTo+p4RML+EQiqJmBUCTEGBDq32137toW62PB+KFUexh41WeI4zSPvuHF2T108ruUmEKgPKm82rYt0U1XPE55kzYrorj+LRMLy2kF1F4W2242zlulMSp38MxkL/N5XTli5nYqY+4kZ5KqeWsKNxKXHaDoVgNpeHC97KGFm7VmqIonhcz3z5sVojVHX/SnPbP5COaZTFAmiuxFf28cz/GsHwyck/WTU7+TfaBaG/mzW+CKE4ypVYH1kqmay+hdAAWJdQqQKyJvghMRsFTsinnD6z6rJjnIcCbdYpvjmCUCOkOA/rskskoZ0nOZ9c6+opxvPm/eqifXcWmuTop2IvI4dD13SSVwU+VMogR4xLj8eXn5nNInvpDCjTCcMC8DG+5FIxbmEZVY85PBSwwVVB2rTZGCXS5iupEh/DfARVhZYbidiMCDWJ9OQbhzj+HAbFyecSmWYrgb64q01+L71He7NwGYyaQ6e17wWyklF1wMaZDUPjn3RIy7lF4GdLarQURQR5Mph3+V5kgXz1k7qSGzhM6sXI89WvgSfqO9jd0SWzmKDOubNpaRMc6vvSCYPFu3QlooP5aWiC4a7HGaWey4cmc2atouWifQ3yc04E5+RsEMhJBqxSdafWrkSeEzdtNDFpC2eSQH27+yAbfepBrd3ZFFTcYRI2TDbVfmEtGzkynWNjnCUVaRSMSBPHjOMb4Zl2TTBXoqH2ttuBakqSC8000EpGkTV1hb3TOi6fNzF5PEkazlocNmTyrjnBN9N9hHKiw954GvfCB80Rr1fcmdSvsEQa1r9a0VoPulhBNajRCP9yJ6UHGlLPigqnujLh3WfdiGcmaNRAng36nbC43jdx6wUSsiKK3Szl9HAeDgvUK5XemGIhBVuba8k5ZPEBqKInymv++PLDQ00isoMPzcym7oi7dzcx7cmYbdlMH7GoW9x2cPAf0cnHI5kEe69Nxrs3sX6F8mvab+gqh/1BwChtwlcUjs55/h/jTm2x9nWwf5nWled8BrXcswCQuibVEx9d+UZuyJWjZxZabTUBcqm/1x4mgq8c3DDdYulK8Mgux4BaYN3V8q9DrzPKETc5tMusn6DABQDpxI8FxwVNYuX459IJ91wIQUNdcCtT7wObBCKyzLtuVRsjmYJe1ctJlKEFEjkjx6LFMrdACgfoZ/J4cfX9i7+DbVCfVSxf4d3dw0PwuNdROrA/6x2gEDN9eHRU5K1iQ/qdPRodxreBq9A1qxnV57Wb0Y/BinGE4WXImsgVK6qCK/AiordJr6GS45Itx6nubQ1c4tuDna1HUOvgyCAC92XGTz2Sv+u4LRFb2/1p6OlNS2zQ4cNFexY+p07RuI19XQ+EhdUSQG47cJINf9p4FEGPHzO2o1EggGt0ntLWNQTO8aoQy1SJrL9seyKQI0Ec+eve0egfmOr3ry2cAM2fdmCoRRfSzor9s4lUvxqWznqjXcvlJm5VOPProcHqikdG3I3fj8g6D9oeQ6P89Qz8n48kekKkjLO9Hqwpei1IdzMF8Ygcz5wNgDmOeJz6UeHmqLpX0ijNW234+Xhk8AroxxEKKQSsLA7qeSsrCF2O1fX7xA9Ldtcc8YoTyRVg/frCY1+1wEOCe2w09M1D1kZP55w8c/07j65FZNU/M8VXE0CnUkHR+EAMzZhPzaoKX1VnB6JGR1tpKUgq+GQ0BRxyKZ3azkzrysTS1Ng9tuSfK/YNvODxWDja0a3NwOSjCceaSvkfRGh4ST+Ai4lwETSj9bStWjkvmWes6iwe/1av3NBz3A38TgiQAhTyKHBpgtV65hOU7VuJPWKUpwcSLsOWC3uyBfpQm7+6tQvPxn2f0N/9vsCp70ZgZHqfxx6fY84WDQ6mZTQajTgcwxrxb/XzKyQ4v1D8tN3197iYWqeB2yP9Nf5JWfwRdbuwvW/ndZibTWF7MwdUyb5LYsxjTzzGvdfyGYmuYp9vmFVDaWVuBOawFAOau60VGwBp8ofcxnu+/mYuwN5c64flKDSd2fCtvLUGl0n3LoHK9DVF1dGlynDKl4HttF/JKtNI3vsIJkfTmKETKnEERCht4wal5lxgsqOl6X8FBZ4+CDeN5kT5dYYLADRw2fNGOcCbKDNpWXOx6XvEUIWYJ092KRT31HHzJ9jYFwrlE4coKHFOXrJCaZcX/BW8DrM40/wS5LxOFa4C/bBk9BjpTzOu0hxreg/N3FMlQINME0D8QbVsVd+d5OdqQfKfpj60/t4MKMK96eyfK23KqM4NjV/AjXM/jJd/3ygeNXofR2wTBuRDW/hWapMBNsAOYPuIVPoDWBlPdBZwgMNzCoBZiuZDk6Ko2xh5c+P8/Fnh36aOyQ6GYAcP6zCo7m/9xWvzJaDpSJ0fG5Y+ZjqHKiwE7ibMm/lPD+hrkWy/TB9071HiTfcpcmOBNYmlVSQJc+/IKGsLSVjvIzKtwZqEerSmdkWdJBX4oVc8Vetuo2HGQGmdOzo0mdXtsdhgtZhE4ovCB0emO8oOSRv8mOnnoEttTVQ4ig+GzX6R6Mtkpw1HC6n7/88QXjn8ZO2HDnpOX9dFh1ktyZ4FF2JATWqeFs8GUHEz8eYRXeYIxSGzEYnkDfS5JMEgt68HTa7w+w69WRVA/dAB6ahxI2ldnryUFn0PQChxa34aPTBAVbqNOnlgb5DQWmm6mgrJLWip+ZAQD4uPArMRUKfFmV0MMdYRvgsorUz06420RhS/QHp25t43VWsI1aP2JbP5DDHKrCtgRDWEE9c1krP/mcCQiZS8mu5VP9INThjvWh2r/N/UqJU1bqCf0kszRKbP3NRedVEY6Op/tKiVa/lQDB+tb/EQR0gy4j4w9cKp3XtRCjSea0D/7r0JZ04mUP3lmP1c+ceSdr77AYdw/usrgBU7aDIwBUryLZNs+i3aN+QfQ9yDIjmKCKRc2ibxQ7Tczh9PYOWTDdtX1eOzJC/ljxabc3QrD3n7i3UQdAQ0TMoOG9TYZVnjhnf4aObxrSKrTXfxpYBB0/7t0zqcvnjwkTMcubLsGGynsEwIviHfRoiSiVkDTLnFCxCKumpY7iyRB4Vg5EtUi+let4uvzs7A/SSdf/Fk3TZA3eJoqE+Dy7LlEld/3MJGAfvSxypeeG3Op6B7WSXKDTc2yx2X2rgE1pkvWjdkeuH6/5mV6oAHYj99Fm5j8Rxq5SsGWr39+gaAd6v6lgDQijaDDuVMrKYOsKYafHdOjfTov8eDv6gHuSCkPwCWvyX40S32TlYE75LPWGTs2xK6K9W4Yv0hVzKt8n2SJSjwD4DsevA3+mEPbwBYpcJFNIz7oY5BBQojHhdU9yZIwCo9pggAvSOZNl/BIfnnMcCA5upt0jIjMfCB4ioI+7IieJ5jCNOGcDdUgBYx89brZqcrn5/yTmK0Fea/wpCWkd4kRrgc3+0ge/vODrN5aMv6ewAg3kYE+ATyEkJvjndZuz8Pmrm2z/P/4fOhfu3Oq2fj/UtUlqEb2srQZO64STe7LSf+ym761DNgipHFsooeMaxFTEfBp0IF/gqumS8CIfWDDUvFmr0xRj5yZAvTED72w9Mex9/gvXONoxO0wUGORqcL8f5DNKFq/Y2iv397hKLGoULf5gtlAYC4iDaBouRvytUN8g+mw5+nLAT2fn5EARPXZASqfpuRxMV8RyPxrKUPnfYpzzOpp2PDmJPEx5RQub0AIGxF96Y8GMvglGcObcd/2KiBFNOdmQicJ0DRRFe//sdTshxMbBJ0POszIkJahy7RsHyxj51AA+UgdH9HHHbgZOU6jP/hyYeg4eEyHD3OFW3xaMNXln9jmP33N2sB+RKYPsNPfmhM0nSoPrS3II0ouSP01nOFMKDkamGZWRAhgjjVOyRZJ+TUbrZwj4/humGMGihgdxcDwXmjN6xeetstg9HEWh+P/KwtmRe/8btBse7A31jDUreJ/0vlaA1q95rEEXghVkWVpqgbj/2F631DU0jc4oh88lL+gtX20Ui5tlH6my0m+JRVwBUieeDuJlEnDU1MLICox/TQP1p15l5xaztpBWAMVflmy+mLFVx5bRtoXwQ+/gMKRjiIREZx9xjDc6H1YBnWpz9bBHnVQQOCpEgdQwEyOE3R3CUhXNvEm7V704erY6PmnIo7zHDCRJ8jMjTsTGBQARrizSGARuDZanjMsoR4/dSnSVcIn2H0nnpO/pw5EJRL0tiZlmFjQB61SfjQCD8SLZ9TUPavxD5G+GDsScArCKeUgexuIyA/fE7EfHecqHfATqeOuK5BmcgUui/dWPAlZ2rjrybqEjnRjQxklGYNTMZ30Dc/KZcqd6UXQcFtSSpr2j/cy2nunGMzCVqEoZb5+WzkRvnzNhKUIrHnRwuLyy/i7PF2T/GD4TbA+6FZJ/zhuBzAwbfT6Q5u/Z8PBhAgX2u42cslqIX2cl/f3YYT2DO5MkySucc0AgR19x/euKOmlHy1HM4MwvEcNrJeokgU4zIebjtR3Et7b6iAJ/U9cJoxmSB5qNfX9O+VG5R7LTuNvojqHoK20oMZ5ZsoIW47q4RfQ1jnmvYlMmVsEMMiP1hrKfmtnsYBE8IsX9AaK7/rs7h0VI8Jp1+21nPevdeFmlYn7AZo3XoNIw1vPBSGTnIUZWDOaA4phhGkmYwjLu7LXzwc97zwry5TGaoAAJOpXdmfsfkmGNjYpZCBKdHUAsW6MkxkvUU+PsCdIHABIhfmR8YXBMaY3Cz1STkx10ya6y1XSEPxq++xWc1hhQvKo6fEvE2B2rVDxE8WuBqRPc7HewRqMRWRbZCf/tNaYptTIhaXeyI4DaVAcofkrxqCEhyKcP4kMPZPQatgxq/PwCa4Nzp6+iMJq/wqrCC2tp/UgDaEQIMY+S7Lqzv0LN7yTgndwRplDUu1k78d4kxVvbOkX+msVHJ1zDBOYB+A2kobXhsPgY5ttqiQ9ydki835R3mdFggrmdfnmw2A8AFWf8itd0AOQgk3lj6szuZY5ciMZFzCfmhegEPIbtg9rW7IipATe44U/28fKlvtgzmS4xer7jAJv/no08JQt4NcD5Dxjyog0bIWiGkBGtVPE3t3OGjkabQ7heu7DaN/zr1LaqwZp+TFhmO9qlZ/CkYow0/ou6iFaRt9Kk2P9+PwersffF6++qIcZEaBgtS4bYC4qO2L0ECBZwppbLDwZ0mE19eEswSsFcyxhZuwd8pDwYxfrr6uIetOQh5OBN3gN3a2DgRWigx1lnmzLMwLOkK/oS8x33lJFeJKZ3jhPkQbUDu+KytN6Muvc7+Dgtz5n4b8k/VOiIn9Q+06sZn8ijobRi8R+WEWCIP2h4QWFqYP277aZaI8l8SYKDLE/R3nAP4LLC5UjaFEyM0Y4/alC/fkP3vi8SxFVOttMrCTBxcIivRk12E+wKcp7PeDEkXeQKGk5AVjhLmoY7ZrJGKkJQDoZ3aGV8jFbszEUuHTZOMQQzAmAZbRoUsgB0iEe0wXnYb0Osl1putt4pFs+O7I9GsEDf+VJ5SLxd2ZzdaL/lmDwPyGn2jDTZk74AyqRNue72VtdviGzmPSGUCMnAYywO0rdShMiEzvzKZC2H6gHGLol2GJ4YjISFaVD4inLsPrN/zZWqnPC2tKgcJdOcbqkAOKSWlJAyNtHv0L8YVvpN/sNdO/UBQSF1/wNEvK+AqL7OI4OazLAy2jwhMmCPYz6Ro9c4eKUv7ok/vl6z+CrOe2ikEoV3JFt2ayotECmeQkltPQaJlwySwUppof366rJv4LKerKeuk9EZ3miAZve72GIU0VpD3UMmG7aQRw2uxNVj3prQlxyUpDS4DCHHW2SHSSCLtnN+xmXFVPDLL9n56kp+ja7FQsbrwLrr0RANYmehHdhk8MzUyr84NN0UewdR2dge+mfyCrfhTUJ+sqh+ljRQZ5iysFXIOUHO4UYr/HsTM0nV6/EUDC2VHCLmTt+f8wAVVIWIjlmay/gIRju5twayhdp5QZFOkOF5/xeUCi+nqKpGseqM4R84maIc+zrxoiUbLgePqI933Lm3A32uv5PyqpsXyLyHV4IfGbxkhtny8WGrrTpf4Gwnvm5oZGCPkzXgsGEDyvmFwkV2U2IAfrbPHxJh0NJ3yh8GUJGMgTn1PWWKkxZJMwWXiiytZgRjOHNUEwRvMT3Z4n2+P4pukTf97M9CJCXCZD8hwtswcYMUq1yXfYC1lDZLontZLQYv77+wLsHlBMQbBpRr6y20wRE1g0d6zRJTz+cYS5yvQbXXfx/22gSOt7qVO79seVRa3gzSdlBGkaqomwvYlJvIcTFUymsR2tWDmBUHnabQ4Vw0gFxo9gn5xY/Yiyc0l7dSftXm2k1xoduimeTqRzlMFk4SPxmBL8d9d86dY5ytZqUZnf+YqAFncFSyHV2pLuK72nKvIc1ps8nnFME/jxivMQPUQ0KKnv65gT4WhxW0gbXq3pnLkt3gM1Mi9KJ2IIciXtN4B2R4I9wtJ6R64BEkKJhfRe1kv53eU0fVMD2IYwdbQLzy9yxX6/gt21MUvGbmO+evqs5qqm3JwDGokxv1D/2/G4h+/q9R4ckH6bS1q6XaFRxNYye3kyLEiTskIxJ3KI5JdpQqn29MIChEHyPQam7n6oEYzXHxdSVjMvvUvsO5qfzUI6hgohO6WzaJk5XB9DemrUctSTvJD+iiYvWRxdGdxrChpLSZ7qlauolzEGgp2+a2RsjlLsq3Z4dauF99/gS05W4C2wpcq/7fhdF7wqf5/wvbMN57leA2+oURoIHu7B+JO/AgdM/FS/kL7Izho9bU6j7AzBA3OF20pLgJLOIvxDSrjv8P3FqkOv7931W7uEsmcEfzhzawKpx4Eo9MED6icxYckY3wL6RbkVV/foMKsc5rHswcVORjbFVn4Vqu+okfzc7hD+at+KBclRNCo5A4ghq84kHlt3Amz9PMxS9/Qe02j21Olvl2ZViLZu5s9eJQMOsBsBuhiQQRRNVz5u0iXdHxeq2EmXM++/HVqeQppvA89cW2y2/V4D7i/HWCQ42vxxXPWNmGmmXNQvHCp1fghskU+o7TLSN9DlPLwNqGdydGrAePAb/tYyJdSJRxj0s02Vf6wIvIzowHbtEv3ObSTou5yg94YZHWj/enCpabizfaVEDSgJa4xJvcd1gkJHGfZojKiwxC2yfIFi8Ep+PeOicgHNAJznXNNiJanT2v8sQA636TaUfg7SfUaQd/KYQWUYW/29J3lpXktirqBVO0WmM9/TqqkoK74n+bzReuAgRaC/E4iZepqDCJHV9kTUEyBIKZB49FyBeu38rzlQaEaB424yLBnOKGz+1uqxaRcljcmK1yyxkfHHn5qWu4gss4B+gXCuSG+zHUMGs5lWdsiMldd+DgGyY15c+rzRNJ0mTZuc30zt8ROGdOdaR0uxYvpDHcrAiDpjbPUpy4d99Ka8IiLwRKgW+NDzdcpzCFKbWYdrmUyoxCasZebxT8tBQYabI2P2v2JVa/4IfgxlatoMmresE6IwOk+hMGojuIDAllBxpuoCiLJn8fjp8xv5qkaBDlBuF9CugoC2Hzqyoqb1OUeQaIyBCpmPIcKwLtVk0zpS/OH3pEkPn/sSWiI8x5IOBIjRQPU55Zv9zJ65IV4GzH9/7aX2hf9z4idn44609EQ3RE3rC18NRkrGVgbwboJIwrmZo4SQDobjVaGl+m13Y/bd6XD/S6n/XSV/9QIcEH0lZ7Id/pmqCS/hdioqrYLMrPU36rZ2JjlWuYX6RTfV0aP/EeA2sQZPI8QzBzYooQ3WUXj9YO8n8Ugxq+k+1R68MMF87fHJm7YRVJLmFFfMbKfTm5IVF1fVwhI5uHfW18y/X2ceKRMQ/xLDKtc5ztAqbBnnEsg/JIXykcdo8YNDQ6vyjNkL/7mAW3c6fB4sf35EWdC4aF3ktlbd0g/1rgV7RvS7+7LnC/A8/kO/VDv1U1qKE33HgaKCFjIsDAjb8NQKKY5qubVEbW2AqN2tjyYJoUfCGFWe5mTXNI3GLBX+BxnRNfSoWDBxk/ooj9eyoCbSfZfi0nwaBR4/g7addfVgcOho0SB5M6RJzlhRD06dIToUd10bPn1aKH6bi/pOV3Zt/KZm8dYx1DT+UKE3weQBe3UCmulmvIWUkB8HekLCdlRF2KvAcv9yI9z3CsD6W9LPk+SFnj/6llk0Ca7s9EfXQleKEw7VCE3KIhS8JU1Rj1sNqugsuXeIPyOdqOGfFTv7aTzSokEhm2bHkOsO1kzj8WtpjXlG13G/Y28SMxj4qlpHsIUyvfLi2dStQu6Y0ot0WV4iPyLzZ/6OgVXCUmpxUrdOv46rkZi+jUaW7P8ZrAXyZ+mKt8Ldv/OxHePCjUAoOIDreJ5EBigo9Ei4dM6y84DV1EDhIoqi6WWnNy4hRzIYAV6vAAI9kJsglWeChaEUaUKcLRyha51Y9HwEdqY8El3ETEuCBaEY82gOP1Hx9BVYXfl2fG/6VKnLKsWOzRZq0UVIleHTOxFezSNiyVYCl1Og4RQC+cpVVjDruiCJXLL8HQbk0vXHGaAi2GbDFP13RoA06HCnD7GlRZApPhLtA0iGy3GgqDC98yko9qhIyU5ewy8YXifJ/68O3ml8hyiqBeO6UIQntMdAz6ECAqYbl7PHcZeQNbT7q6iV5w6GT/nul7WnXQb83tIXc4oSsOOGHf3Rtw0SDD59CVYxaWY0as21f3iLQ9H1NvQdoFaZEMIoxaABW9Ln70DaJ0Bw5WzYLdWdBhr0CQJKp+X2xdXOETdTSAEB0DvgUF6G8m1KCtyCXLAPJgH4l3AfX2HWjcYoyFSYFdJ2PIq1yzlYfdzMnBumSwPeKhrOQ9o4vsTZujM2mWeSXdAYIBMrw0xskrF1GMqztdZHry31waZf/6qoE7pobCl6G4PyDpoMIxiyIVmC6GQIUbLtKQe/0mPta1ZqIjCTQwdN+GUh30aJLzgW+v47xISzYG+tBoiBBLzTOEy+wXNB9mUjPFmBVSpwYtPzr8YyuTAertSwDWIRUqFGZ1VequPY45dGvKtUYpR7uJebI1823udDZaxgpuHgNsrGMZczjzAa5K3/suFSyg6tPfDEW5CCcsjBxODl+i9M1ANDT1AQJDee9y2NryaEbbT93WYsxAQ/wyIc5W+VI6gnkwtZgNi0t2ZahrW6hBI1O/x8e/jmrZRU1FQfjQMfBtTPDZBzhmdpXhSK8mYjm0W7NsdHuC8pRfgTuGXp6JOhedOR1NyVPB1In/TXNvC0IeU48xerZINBE+Nc3AkceSd05cnUN5iSw9huZvZYrbn1BDWXOV47ifVTOEsZ/ClsrU0vXluQ5+iAUXS5WBw/MCc/ydCofLJzHFa5RH53293E7ZdN/Tk53U3vcO/X9m9r8ff8uj4soKBQko7okdfQsmyLjg4raGiv4z0jIgf0GlWyjdajSeWgHYqdnwCf/iCk6qtZKDIvK/eUM3pnb1u7okJVuv9tp5zRfMntku74U9FopH0U2zQfGjmauHKftdLLLLKru4pnDltp5+EBTfrVP3g0eFkZRxcGOPoDwtbBJ1+hrLgLbbmNMKXAY4PQNTnvlY/aR0XrPzx6xaZgpvliMrNzaIgZIiCelg3sNQxyh/Ym5F2TK8/2bnTaNExS6VPY0t9S/9AO+v4oeKCM4d/ouOoM78ZAqbBi4Qbi5RWH5NjlgJfeA2U3Nw22NCfs55pbbzmfdzXOS5bM7MXQHramfE5uYQFeJoNUjQ7gFqLZ4wRq05+XM4kygC42fRmrrvrC3RjKIHrpRchho8ur/+j9yoUI/FruaNgy1yNWYQoO7vPzEIzswRW78/hMGtSmT22WxXd55D38DSWy7PwAqcjfg1eX6sSNVQQ+3Ay+YWDz4ZD5Rfd5O1jC9spe+A0+wxp3/B5e2KQYQexRuVqVim1PEZJHLr5KST66gmxaDMT/6Z5OWVm7gU6Xl2AGqwfllNSZqKxDLQQfWSTAhpSYuSgauQAAA=="}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
