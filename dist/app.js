const profile = window.PROFILE || {};
const entries = window.DETAILS || {};
const main = document.getElementById('content');
const sections = [...main.querySelectorAll('.page-section')];
const sidebar = document.querySelector('.sidebar');
const navigation = document.querySelector('.section-nav');
const navigationLinks = [...navigation.querySelectorAll('a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const initialHash = location.hash;

for (const [attribute, key] of [['name','name'], ['role','role'], ['bio','bio'], ['tagline','tagline'], ['initials','initials'], ['english-name','englishName']]) {
  if (profile[key]) document.querySelectorAll(`[data-${attribute}]`).forEach(element => { element.textContent = profile[key]; });
}
document.title = `${profile.name || '个人主页'} · ${profile.role || ''} | ${profile.initials || 'XR'} OS`;
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-github]').forEach(link => { if (profile.github) link.href = profile.github; });
if (profile.avatar) {
  document.querySelectorAll('[data-avatar]').forEach(image => {
    image.alt = `${profile.name || ''}的个人头像`;
    image.addEventListener('load', () => { image.hidden = false; image.closest('.avatar-slot').classList.add('has-avatar'); });
    image.addEventListener('error', () => { image.hidden = true; image.closest('.avatar-slot').classList.remove('has-avatar'); });
    image.src = profile.avatar;
  });
}

function element(tag, className, text) {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (text !== undefined) result.textContent = text;
  return result;
}
function makeCover(item) {
  if (item.image && item.href) {
    const cover = element('a','cover-art article-cover');
    cover.href = item.href;
    cover.target = '_blank';
    cover.rel = 'noopener noreferrer';
    cover.setAttribute('aria-label',`${item.title}，打开公众号原文`);
    const image = element('img');
    image.src = item.image;
    image.alt = item.imageAlt || `${item.title}的文章首图`;
    image.width = 1080;
    image.height = 608;
    image.loading = 'lazy';
    image.decoding = 'async';
    cover.append(image);
    return cover;
  }
  const cover = element('div', `cover-art cover-${item.cover || 'research'}`);
  cover.setAttribute('aria-hidden', 'true');
  cover.append(element('span','cover-label',`${profile.initials || 'XR'} STUDIO / ${item.type || 'EXPLORATION'}`));
  cover.append(element('strong','cover-title',item.coverTitle || item.title));
  cover.append(element('span','cover-subtitle',item.coverSubtitle || ''));
  const scene = element('div','cover-scene');
  scene.append(element('i'),element('i'),element('i'),element('b','',item.cover === 'focus' ? '25:00' : item.cover === 'desktop' ? 'XR' : '↗'));
  cover.append(scene);
  return cover;
}
function makeCard(item, index, count) {
  const card = element('article',item.image ? 'deck-card article-card' : 'deck-card');
  card.dataset.slideIndex = String(index);
  card.setAttribute('role','group');
  card.setAttribute('aria-roledescription','幻灯片');
  card.setAttribute('aria-label',`${item.title}，${index + 1} / ${count}`);
  const copy = element('div','card-copy');
  const meta = element('div','card-meta');
  meta.append(element('span','',`${String(index + 1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`),element('span','',item.type || ''));
  const action = element(item.href ? 'a' : 'button','card-action');
  action.append(element('span','',item.action || '查看详情'),element('span','','↗'));
  if (item.href) {
    action.href = item.href;
    if (item.download) action.setAttribute('download','');
    else if (new URL(item.href,location.href).origin !== location.origin) { action.target = '_blank'; action.rel = 'noopener noreferrer'; }
  } else {
    action.type = 'button';
    action.dataset.detail = item.detail || '';
  }
  copy.append(meta,element('h3','',item.title),element('p','',item.description || ''),action);
  card.append(makeCover(item),copy);
  return card;
}
function setupCarousel(carousel) {
  const items = Array.isArray(profile[carousel.dataset.collection]) ? profile[carousel.dataset.collection] : [];
  const stage = carousel.querySelector('.deck-stage');
  const cards = items.map((item,index) => makeCard(item,index,items.length));
  stage.append(...cards);
  const previous = carousel.querySelector('[data-previous]');
  const next = carousel.querySelector('[data-next]');
  const counter = carousel.querySelector('.deck-counter');
  const progress = carousel.querySelector('.deck-progress > i');
  let index = 0;
  let suppressClickUntil = 0;
  function show(nextIndex) {
    if (!cards.length) return;
    const focusedCard = document.activeElement?.closest('.deck-card');
    index = (nextIndex + cards.length) % cards.length;
    cards.forEach((card,position) => {
      let distance = (position - index + cards.length) % cards.length;
      if (distance > cards.length / 2) distance -= cards.length;
      card.style.setProperty('--shift',String(distance));
      card.style.setProperty('--scale',distance === 0 ? '1' : '.85');
      card.style.setProperty('--turn',`${-distance * 8}deg`);
      card.classList.toggle('is-current',distance === 0);
      card.classList.toggle('is-away',Math.abs(distance) > 1);
      card.inert = distance !== 0;
      card.setAttribute('aria-hidden',String(distance !== 0));
    });
    if (focusedCard?.inert) carousel.focus({preventScroll:true});
    carousel.dataset.index = String(index);
    counter.textContent = `${String(index + 1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
    progress.style.width = `${(index + 1) / cards.length * 100}%`;
  }
  previous.disabled = next.disabled = cards.length < 2;
  previous.addEventListener('click',() => show(index - 1));
  next.addEventListener('click',() => show(index + 1));
  carousel.addEventListener('keydown',event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key) || event.target.closest('input,textarea,select')) return;
    event.preventDefault();
    show(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let horizontalDelta = 0;
  let lastWheel = 0;
  stage.addEventListener('wheel',event => {
    if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 2) return;
    event.preventDefault();
    if (Date.now() - lastWheel < 420) return;
    horizontalDelta += event.deltaX;
    if (Math.abs(horizontalDelta) > 45) {
      show(index + (horizontalDelta > 0 ? 1 : -1));
      horizontalDelta = 0;
      lastWheel = Date.now();
    }
  },{passive:false});
  let touchStart;
  stage.addEventListener('pointerdown',event => {
    if (event.pointerType === 'touch') touchStart = {x:event.clientX,y:event.clientY};
  });
  stage.addEventListener('pointerup',event => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClickUntil = Date.now() + 350;
      show(index + (dx < 0 ? 1 : -1));
    }
  });
  stage.addEventListener('pointercancel',() => { touchStart = null; });
  stage.addEventListener('click',event => {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  },true);
  if (cards.length) show(0);
  else { stage.append(element('p','empty-collection','内容待补充。')); counter.textContent = '00 / 00'; progress.style.width = '0'; }
}
document.querySelectorAll('.carousel').forEach(setupCarousel);
document.querySelector('.status-summary').textContent = `${profile.projects?.length || 0} PROJECTS · ${profile.resources?.length || 0} RESOURCES · ${profile.writing?.length || 0} ARTICLES`;

const dialog = document.getElementById('detail-dialog');
function showDetail(entry) {
  if (!entry) return;
  document.getElementById('dialog-label').textContent = entry.label;
  document.getElementById('dialog-title').textContent = entry.title;
  const body = document.getElementById('dialog-body');
  body.replaceChildren();
  entry.blocks.forEach(([title,copy]) => {
    const section = element('section');
    section.append(element('h3','',title),element('p','',copy));
    body.append(section);
  });
  dialog.showModal();
}
document.addEventListener('click',event => {
  const button = event.target.closest('button[data-detail]');
  if (button) showDetail(entries[button.dataset.detail]);
});
document.getElementById('close-dialog').addEventListener('click',() => dialog.close());
dialog.addEventListener('click',event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
const validEmail = profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);
function contact() {
  if (validEmail) location.href = `mailto:${encodeURIComponent(profile.email)}?subject=${encodeURIComponent('从个人主页来打个招呼')}`;
  else if (profile.wechat) showDetail({label:'SAY HELLO',title:'很高兴认识你',blocks:[['微信',profile.wechat]]});
  else showDetail({label:'SAY HELLO',title:'很高兴认识你',blocks:[['联系方式待补充','联系邮箱或微信尚未公开，补充后会在这里展示。']]});
}
document.getElementById('contact-button').addEventListener('click',contact);
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click',contact));
if (validEmail || profile.wechat) {
  document.getElementById('contact-note').hidden = true;
  document.querySelectorAll('[data-contact-label]').forEach(label => { label.textContent = validEmail ? profile.email : `微信：${profile.wechat}`; });
  const sidebarContact = document.querySelector('[data-sidebar-contact]');
  sidebarContact.textContent = `${validEmail ? profile.email : '通过微信联系'} ↗`;
  if (validEmail) sidebarContact.href = `mailto:${profile.email}`;
}

// 所有章节始终保留在同一滚动容器中。导航只反映阅读位置，不控制面板显隐。
let activeSection = '';
const aliases = {home:'about',work:'projects',notes:'writing'};
function normalizedSection(hash) {
  const id = hash.replace(/^#/,'');
  return aliases[id] || id;
}
function setActive(id) {
  if (id === activeSection) return;
  activeSection = id;
  navigationLinks.forEach(link => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('active',active);
    if (active) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
    if (active && matchMedia('(max-width: 760px)').matches) {
      navigation.scrollTo({left:link.offsetLeft - navigation.offsetLeft - navigation.clientWidth / 2 + link.offsetWidth / 2,behavior:reducedMotion.matches ? 'instant' : 'smooth'});
    }
  });
  if (location.hash !== `#${id}`) history.replaceState(null,'',`#${id}`);
}
function syncActiveSection() {
  const cursor = main.getBoundingClientRect().top + Math.min(main.clientHeight * .28,180);
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= cursor) current = section;
    else break;
  }
  if (main.scrollTop + main.clientHeight >= main.scrollHeight - 3) current = sections[sections.length - 1];
  setActive(current.id);
}
function scrollToSection(id,behavior = 'instant') {
  const target = sections.find(section => section.id === normalizedSection(id));
  if (!target) return false;
  const top = target.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop;
  main.scrollTo({top,behavior});
  if (behavior === 'instant' || behavior === 'auto') syncActiveSection();
  return true;
}
document.addEventListener('click',event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const id = normalizedSection(link.hash);
  if (!sections.some(section => section.id === id)) return;
  event.preventDefault();
  if (location.hash !== `#${id}`) history.pushState(null,'',`#${id}`);
  scrollToSection(id,reducedMotion.matches ? 'instant' : 'smooth');
});
let scrollFrame;
main.addEventListener('scroll',() => {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(syncActiveSection);
},{passive:true});
// 在左栏滚动，仍然滚动右侧正文；保留 Ctrl+滚轮缩放及横向导航手势。
sidebar.addEventListener('wheel',event => {
  if (event.ctrlKey || dialog.open || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
  event.preventDefault();
  const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? main.clientHeight : 1;
  main.scrollTop += event.deltaY * multiplier;
},{passive:false});
function restoreHash() { if (!scrollToSection(normalizedSection(location.hash))) syncActiveSection(); }
window.addEventListener('popstate',restoreHash);
window.addEventListener('hashchange',restoreHash);
new ResizeObserver(() => requestAnimationFrame(syncActiveSection)).observe(main);
if (!scrollToSection(normalizedSection(initialHash))) syncActiveSection();
