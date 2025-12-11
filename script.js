/* -----------------------------
   Portfolio interactive scripts
   - Typewriter
   - Parallax hero card
   - Skill bars animation
   - Projects filter
   - Sidebar active-link on scroll
   - Contact form (mailto)
   - Small helpers
   ----------------------------- */

/* TYPEWRITER */
const phrases = [
  'Machine Learning',
  'Deep Learning',
  'Data Visualization',
  'Model Deployment',
  'SQL & Python'
];

const typeEl = document.getElementById('typewriter');
let pi = 0, ti = 0, deleting = false;

function typeTick(){
  const current = phrases[pi];
  if(!deleting){
    typeEl.textContent = current.slice(0, ++ti);
    if(ti === current.length){
      deleting = true;
      setTimeout(typeTick, 900);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --ti);
    if(ti === 0){
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(typeTick, deleting ? 50 : 90);
}
document.addEventListener('DOMContentLoaded', () => {
  // start typewriter
  if(typeEl) typeTick();
  // init skill bars
  initSkillBars();
  // init project filters
  initFilters();
  // init scroll active nav
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
  // set years
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
  document.getElementById('yearFooter').textContent = y;
});

/* PARALLAX HERO CARD */
const heroCard = document.getElementById('heroCard');
if(heroCard){
  heroCard.addEventListener('mousemove', function(e){
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    heroCard.style.transform = `translate3d(${(x-0.5)*10}px, ${(y-0.5)*8}px, 0) rotateX(${(y-0.5)*3}deg) rotateY(${(x-0.5)*3}deg)`;
    const p1 = heroCard.querySelector('.p1');
    const p2 = heroCard.querySelector('.p2');
    const p3 = heroCard.querySelector('.p3');
    if(p1) p1.style.transform = `translate(${(x-0.5)*20}px, ${(y-0.5)*10}px)`;
    if(p2) p2.style.transform = `translate(${(x-0.5)*-18}px, ${(y-0.5)*-8}px)`;
    if(p3) p3.style.transform = `translate(${(x-0.5)*8}px, ${(y-0.5)*6}px)`;
  });
  heroCard.addEventListener('mouseleave', function(){
    heroCard.style.transform = '';
    ['p1','p2','p3'].forEach(c=>{ const el = heroCard.querySelector('.'+c); if(el) el.style.transform=''; });
  });
}

/* SKILL BARS */
function initSkillBars(){
  const bars = document.querySelectorAll('.skill .skill-bar');
  bars.forEach(bar=>{
    const percent = bar.getAttribute('data-percent') || 60;
    const inner = bar.querySelector('span');
    // trigger when visible
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          inner.style.width = percent + '%';
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.3});
    obs.observe(bar);
  });
}

/* PROJECT FILTERS */
function initFilters(){
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project');
  filters.forEach(f=>{
    f.addEventListener('click', ()=>{
      filters.forEach(ff=>ff.classList.remove('active'));
      f.classList.add('active');
      const filter = f.getAttribute('data-filter');
      cards.forEach(card=>{
        if(filter === 'all' || card.getAttribute('data-type') === filter){
          card.style.display = '';
          card.classList.remove('dim');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* SIDEBAR ACTIVE LINK ON SCROLL */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.side-nav .nav-link');

function onScroll(){
  const y = window.scrollY;
  sections.forEach(section=>{
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.side-nav .nav-link[href="#${id}"]`);
    if(y >= top && y < bottom){
      navLinks.forEach(l=>l.classList.remove('active'));
      if(link) link.classList.add('active');
    }
  });
}

/* CONTACT FORM (mailto fallback) */
const form = document.getElementById('contactForm');
const notice = document.getElementById('formNotice');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    if(!name || !email || !msg){
      notice.textContent = 'Please complete all fields.';
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:collegevenkadesh@gmail.com?subject=${subject}&body=${body}`;
    notice.textContent = 'Opening your email client...';
  });
}

/* SMALL HELPERS */
// smooth internal link scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});
