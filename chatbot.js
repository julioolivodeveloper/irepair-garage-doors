(function () {
  /* ── STYLES ── */
  const css = `
  #cb-btn {
    position:fixed;bottom:28px;right:28px;z-index:9999;
    width:60px;height:60px;border-radius:50%;
    background:linear-gradient(135deg,#06b6d4,#0891b2);
    border:none;cursor:pointer;
    box-shadow:0 6px 28px rgba(6,182,212,.55);
    display:flex;align-items:center;justify-content:center;
    transition:transform .2s,box-shadow .2s;
    animation:cb-bounce 2.8s infinite;
  }
  #cb-btn:hover{transform:scale(1.1);box-shadow:0 10px 36px rgba(6,182,212,.7)}
  #cb-btn svg{width:28px;height:28px;fill:#fff;transition:opacity .2s}
  #cb-btn .cb-icon-close{display:none}
  #cb-btn.open .cb-icon-chat{display:none}
  #cb-btn.open .cb-icon-close{display:block}
  #cb-btn.open{animation:none}
  @keyframes cb-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

  #cb-badge{
    position:absolute;top:-4px;right:-4px;
    background:#ef4444;color:#fff;
    font-size:.65rem;font-weight:800;
    width:20px;height:20px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    border:2px solid #080f1e;
    animation:cb-pulse 2s infinite;
  }
  @keyframes cb-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}

  #cb-panel {
    position:fixed;bottom:102px;right:28px;z-index:9998;
    width:360px;height:520px;max-height:calc(100vh - 140px);
    background:#0d1b2a;border:1px solid rgba(255,255,255,.1);
    border-radius:20px;display:flex;flex-direction:column;
    box-shadow:0 24px 64px rgba(0,0,0,.6);
    transform:scale(.85) translateY(20px);opacity:0;
    pointer-events:none;transition:all .3s cubic-bezier(.34,1.56,.64,1);
    overflow:hidden;
  }
  #cb-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}

  #cb-header{
    background:linear-gradient(135deg,#06b6d4,#0891b2);
    padding:16px 18px;display:flex;align-items:center;gap:12px;
    flex-shrink:0;
  }
  .cb-avatar{
    width:42px;height:42px;border-radius:50%;
    background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.4);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
  }
  .cb-avatar svg{width:22px;height:22px;fill:#fff}
  .cb-hinfo h4{font-size:.95rem;font-weight:800;color:#fff;margin:0 0 2px}
  .cb-hinfo p{font-size:.75rem;color:rgba(255,255,255,.85);margin:0;display:flex;align-items:center;gap:4px}
  .cb-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;display:inline-block}

  #cb-messages{
    flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;
    scroll-behavior:smooth;min-height:0;
  }
  #cb-messages::-webkit-scrollbar{width:4px}
  #cb-messages::-webkit-scrollbar-thumb{background:rgba(6,182,212,.4);border-radius:2px}

  .cb-msg{display:flex;flex-direction:column;gap:4px;max-width:88%}
  .cb-msg.bot{align-self:flex-start}
  .cb-msg.user{align-self:flex-end}
  .cb-bubble{
    padding:10px 14px;border-radius:14px;font-size:.87rem;line-height:1.55;
    font-family:'Inter',sans-serif;
  }
  .cb-msg.bot .cb-bubble{
    background:#152238;color:#e2e8f0;
    border-bottom-left-radius:4px;border:1px solid rgba(255,255,255,.07);
  }
  .cb-msg.user .cb-bubble{
    background:linear-gradient(135deg,#06b6d4,#0891b2);color:#fff;
    border-bottom-right-radius:4px;
  }

  .cb-actions{display:flex;flex-direction:column;gap:6px;margin-top:4px}
  .cb-action-btn{
    display:flex;align-items:center;gap:8px;
    background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.3);
    color:#06b6d4;padding:9px 14px;border-radius:10px;
    font-size:.82rem;font-weight:700;cursor:pointer;text-decoration:none;
    font-family:'Inter',sans-serif;transition:background .2s,border-color .2s;
  }
  .cb-action-btn:hover{background:rgba(6,182,212,.2);border-color:rgba(6,182,212,.6)}
  .cb-action-btn.primary{background:#06b6d4;color:#fff;border-color:#06b6d4}
  .cb-action-btn.primary:hover{background:#0891b2}
  .cb-action-btn svg{width:16px;height:16px;flex-shrink:0}

  .cb-typing{display:flex;align-items:center;gap:5px;padding:10px 14px;background:#152238;border-radius:14px;border-bottom-left-radius:4px;border:1px solid rgba(255,255,255,.07);width:fit-content}
  .cb-typing span{width:7px;height:7px;background:#06b6d4;border-radius:50%;animation:cb-type 1.2s infinite}
  .cb-typing span:nth-child(2){animation-delay:.2s}
  .cb-typing span:nth-child(3){animation-delay:.4s}
  @keyframes cb-type{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}

  #cb-faqs{
    padding:10px 12px 6px;border-top:1px solid rgba(255,255,255,.07);
    display:flex;flex-wrap:wrap;gap:6px;flex-shrink:0;
  }
  .cb-faq-btn{
    background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
    color:#94a3b8;padding:6px 12px;border-radius:999px;
    font-size:.76rem;font-weight:600;cursor:pointer;
    font-family:'Inter',sans-serif;transition:all .2s;
    white-space:nowrap;
  }
  .cb-faq-btn:hover{background:rgba(6,182,212,.15);border-color:rgba(6,182,212,.4);color:#06b6d4}

  #cb-input-row{
    padding:10px 12px 14px;display:flex;gap:8px;align-items:center;flex-shrink:0;
    border-top:1px solid rgba(255,255,255,.07);
  }
  #cb-input{
    flex:1;background:#152238;border:1px solid rgba(255,255,255,.1);
    color:#fff;padding:10px 14px;border-radius:999px;
    font-size:.87rem;font-family:'Inter',sans-serif;outline:none;
    transition:border-color .2s;
  }
  #cb-input::placeholder{color:#64748b}
  #cb-input:focus{border-color:rgba(6,182,212,.5)}
  #cb-send{
    width:38px;height:38px;border-radius:50%;
    background:#06b6d4;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;transition:background .2s,transform .15s;
  }
  #cb-send:hover{background:#0891b2;transform:scale(1.08)}
  #cb-send svg{width:17px;height:17px;fill:#fff}

  @media(max-width:420px){
    #cb-panel{width:calc(100vw - 24px);right:12px;bottom:96px;height:480px;max-height:calc(100vh - 130px)}
  }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── FAQ DATA ── */
  const PHONE = '2103287023';
  const PHONE_DISPLAY = '210-328-7023';
  const GOOGLE = 'https://maps.app.goo.gl/MhemUgTdHSqUedU77';

  const contactBtns = [
    { label: `📞 Llamar: ${PHONE_DISPLAY}`, href: `tel:+1${PHONE}`, cls: 'primary' },
    { label: '💬 WhatsApp', href: `https://wa.me/1${PHONE}`, cls: '' },
    { label: '✉️ Enviar mensaje', href: 'index.html#contact', cls: '' },
  ];

  const faqs = [
    {
      q: '🗓️ ¿Servicio el mismo día?',
      a: '¡Sí! Ofrecemos servicio el mismo día en la mayoría de los casos. Llama a Edgar y agendamos para hoy.',
      btns: contactBtns,
    },
    {
      q: '📍 ¿Dónde operan?',
      a: 'Servimos toda el área de San Antonio, TX — incluyendo Helotes, Leon Valley, Converse, Universal City, Live Oak, Schertz, Boerne, Bulverde, Garden Ridge, Cibolo, New Braunfels y más.',
      btns: [{ label: '📍 Ver áreas de servicio', href: 'index.html#areas', cls: '' }, ...contactBtns.slice(0,1)],
    },
    {
      q: '💰 ¿Cuánto cuesta?',
      a: 'El precio depende del servicio. Ofrecemos estimados GRATIS sin compromiso. Llama a Edgar y te da un precio claro antes de comenzar — sin costos ocultos.',
      btns: contactBtns,
    },
    {
      q: '🔧 ¿Qué servicios ofrecen?',
      a: '✅ Puertas de garage residenciales\n✅ Puertas comerciales\n✅ Gate openers (abre-portones)\n✅ Reparación de resortes\n✅ Instalación de motores\n✅ Reparación y mantenimiento general',
      btns: [{ label: '🔍 Ver todos los servicios', href: 'index.html#services', cls: '' }, ...contactBtns.slice(0,1)],
    },
    {
      q: '⭐ ¿Tienen reseñas?',
      a: '¡Tenemos 169 reseñas de 5 estrellas en Google! Clientes como Delonna, Steven, Jerry y Demani comparten su experiencia. Ve las reseñas reales en Google Maps.',
      btns: [{ label: '⭐ Ver reseñas en Google', href: GOOGLE, cls: '' }, { label: '🖼️ Ver portafolio', href: 'portfolio.html', cls: '' }],
    },
    {
      q: '🏢 ¿Hacen trabajo comercial?',
      a: '¡Sí! Instalamos puertas comerciales seccionales, enrollables y de alta resistencia para bodegas, negocios y propiedades industriales en San Antonio.',
      btns: [{ label: '🏢 Ver servicios comerciales', href: 'commercial.html', cls: '' }, ...contactBtns.slice(0,1)],
    },
    {
      q: '⚙️ ¿Qué marcas instalan?',
      a: 'Somos especialistas en LiftMaster y Chamberlain — las marcas más confiables del mercado. También trabajamos con Linear, DoorKing y otras marcas de calidad.',
      btns: contactBtns.slice(0,1),
    },
    {
      q: '🕐 ¿Cuánto tiempo tarda?',
      a: 'La mayoría de las instalaciones toman 1–3 horas. El reemplazo de resortes generalmente 45 minutos. Los openers en menos de una hora. Edgar no se va hasta que todo funciona perfectamente.',
      btns: contactBtns,
    },
  ];

  const BOT_WELCOME = '¡Hola! 👋 Soy el asistente de **iRepair Garage Doors**. Puedo responder tus preguntas o conectarte directamente con Edgar.\n\n¿En qué te puedo ayudar hoy?';

  /* ── KEYWORD MAP ── */
  const keywords = [
    { keys: ['precio','costo','cobran','cuanto','cuánto','quote','estimate'], idx: 2 },
    { keys: ['servicio','servicios','hacen','ofrecen','service'], idx: 3 },
    { keys: ['area','áreas','donde','dónde','ciudad','location','san antonio'], idx: 1 },
    { keys: ['reseña','resena','review','estrella','rating','google'], idx: 4 },
    { keys: ['comercial','commercial','bodega','warehouse','negocio'], idx: 5 },
    { keys: ['marca','brand','liftmaster','chamberlain'], idx: 6 },
    { keys: ['tiempo','cuanto','tarda','demora','how long','rapido'], idx: 7 },
    { keys: ['mismo dia','hoy','urgente','emergency','rapido'], idx: 0 },
    { keys: ['hola','hi','hello','buenos','buenas','hey'], idx: -1 },
  ];

  /* ── BUILD DOM ── */
  document.body.insertAdjacentHTML('beforeend', `
    <button id="cb-btn" aria-label="Abrir chat">
      <span id="cb-badge">1</span>
      <svg class="cb-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      <svg class="cb-icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>
    </button>

    <div id="cb-panel" role="dialog" aria-label="Chat iRepair">
      <div id="cb-header">
        <div class="cb-avatar">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <div class="cb-hinfo">
          <h4>iRepair Garage Doors</h4>
          <p><span class="cb-dot"></span> Disponible ahora · 210-328-7023</p>
        </div>
      </div>

      <div id="cb-messages"></div>

      <div id="cb-faqs">
        ${faqs.map((f, i) => `<button class="cb-faq-btn" data-idx="${i}">${f.q}</button>`).join('')}
      </div>

      <div id="cb-input-row">
        <input id="cb-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off" maxlength="200">
        <button id="cb-send" aria-label="Enviar">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `);

  /* ── REFS ── */
  const btn    = document.getElementById('cb-btn');
  const panel  = document.getElementById('cb-panel');
  const msgs   = document.getElementById('cb-messages');
  const input  = document.getElementById('cb-input');
  const sendBtn= document.getElementById('cb-send');
  const badge  = document.getElementById('cb-badge');

  /* ── HELPERS ── */
  function renderText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  function addMsg(role, html, actions) {
    const div = document.createElement('div');
    div.className = `cb-msg ${role}`;
    let inner = `<div class="cb-bubble">${html}</div>`;
    if (actions && actions.length) {
      inner += `<div class="cb-actions">${actions.map(a =>
        `<a href="${a.href}" class="cb-action-btn ${a.cls||''}" target="${a.href.startsWith('http')?'_blank':'_self'}" rel="noopener">${a.label}</a>`
      ).join('')}</div>`;
    }
    div.innerHTML = inner;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'cb-msg bot';
    t.id = 'cb-typing-msg';
    t.innerHTML = '<div class="cb-typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('cb-typing-msg');
    if (t) t.remove();
  }

  function botReply(faqIdx) {
    showTyping();
    setTimeout(() => {
      removeTyping();
      if (faqIdx === -1) {
        addMsg('bot', '¡Hola! 👋 ¿Cómo te puedo ayudar hoy? Elige una pregunta abajo o escríbeme directamente.', contactBtns);
      } else {
        const f = faqs[faqIdx];
        addMsg('bot', renderText(f.a), f.btns);
      }
    }, 850);
  }

  function handleUserInput(text) {
    if (!text.trim()) return;
    addMsg('user', text);
    input.value = '';

    const lower = text.toLowerCase();
    let match = -99;
    for (const rule of keywords) {
      if (rule.keys.some(k => lower.includes(k))) { match = rule.idx; break; }
    }

    if (match === -99) {
      showTyping();
      setTimeout(() => {
        removeTyping();
        addMsg('bot', 'Entiendo tu pregunta 😊 Para darte la mejor respuesta, Edgar puede ayudarte directamente:', contactBtns);
      }, 900);
    } else {
      botReply(match);
    }
  }

  /* ── EVENTS ── */
  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    badge.style.display = 'none';
    if (isOpen && msgs.children.length === 0) {
      setTimeout(() => addMsg('bot', renderText(BOT_WELCOME), contactBtns), 400);
    }
    if (isOpen) input.focus();
  });

  document.querySelectorAll('.cb-faq-btn').forEach(b => {
    b.addEventListener('click', () => {
      const idx = parseInt(b.dataset.idx);
      addMsg('user', faqs[idx].q);
      botReply(idx);
    });
  });

  sendBtn.addEventListener('click', () => handleUserInput(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleUserInput(input.value); });

  document.addEventListener('click', e => {
    if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn) {
      panel.classList.remove('open');
      btn.classList.remove('open');
    }
  });

  /* ── SHOW BADGE AFTER 3s ── */
  setTimeout(() => { badge.style.display = 'flex'; }, 3000);

})();
