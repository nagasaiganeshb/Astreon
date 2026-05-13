/**
 * Astreon LLC — Main JavaScript
 * ─────────────────────────────
 * Modules:
 *  1. Scroll Restoration
 *  2. Navbar scroll behaviour
 *  3. Mobile drawer
 *  4. Intersection Observer (reveal animations)
 *  5. Counter animation (stats strip)
 *  6. Contact form  ← EmailJS
 */

/* ── 1. Scroll Restoration ── */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', () => window.scrollTo(0, 0));


/* ── 2. Navbar scroll behaviour ── */
const nav = document.getElementById('nav');
window.addEventListener(
  'scroll',
  () => nav.classList.toggle('on', scrollY > 30),
  { passive: true }
);


/* ── 3. Mobile drawer ── */
const hbg = document.getElementById('hbg');
const drw = document.getElementById('drw');

hbg.addEventListener('click', () => {
  const isOpen = drw.classList.toggle('o');
  hbg.classList.toggle('o', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/** Called from inline onclick="cd()" links inside the drawer */
function cd() {
  drw.classList.remove('o');
  hbg.classList.remove('o');
  document.body.style.overflow = '';
}


/* ── 4. Intersection Observer — reveal animations ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.01 }
);
document.querySelectorAll('.r').forEach((el) => revealObserver.observe(el));


/* ── 5. Counter animation (stats strip) ── */
function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();

  (function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  })(start);
}

let counted = false;
const strip = document.getElementById('strip');

if (strip) {
  new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.cnt').forEach((el) =>
          animateCounter(el, +el.dataset.n)
        );
      }
    },
    { threshold: 0.3 }
  ).observe(strip);
}


/* ── 6. Contact form — EmailJS ── */

/**
 * EmailJS configuration.
 * Replace the three placeholder strings below with your real credentials
 * from https://dashboard.emailjs.com
 *
 * PUBLIC_KEY  → Account → API Keys → Public Key
 * SERVICE_ID  → Email Services → your service ID
 * TEMPLATE_ID → Email Templates → your template ID
 *
 * Template variables used (must match your EmailJS template):
 *   {{first_name}}, {{last_name}}, {{email}},
 *   {{phone}}, {{service}}, {{message}}
 */
const EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',   // ← replace
  serviceId:  'YOUR_SERVICE_ID',   // ← replace
  templateId: 'YOUR_TEMPLATE_ID',  // ← replace
};

(function initEmailJS() {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
})();

const contactForm = document.getElementById('cf');
if (contactForm) {
  contactForm.addEventListener('submit', function handleSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('sb');
    const btnText = document.getElementById('st2');
    const msgBox = document.getElementById('fm');

    // Loading state
    btn.disabled = true;
    btnText.textContent = 'Sending…';
    msgBox.style.display = 'none';
    msgBox.className = '';

    const templateParams = {
      first_name: this.first_name.value.trim(),
      last_name:  this.last_name.value.trim(),
      email:      this.email.value.trim(),
      phone:      this.phone.value.trim() || 'Not provided',
      service:    this.service.value,
      message:    this.message.value.trim(),
    };

    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
      .then(() => {
        msgBox.className = 'ok';
        msgBox.style.display = 'block';
        msgBox.textContent = '✓ Message sent! We\'ll be in touch shortly.';
        contactForm.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        msgBox.className = 'err';
        msgBox.style.display = 'block';
        msgBox.textContent =
          'Something went wrong. Please try again or email us directly at hello@astreonllc.com';
      })
      .finally(() => {
        btn.disabled = false;
        btnText.textContent = 'Send Message →';
      });
  });
}
