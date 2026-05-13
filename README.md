# Astreon LLC — Website

## Project Structure

```
astreon/
├── index.html              ← Main HTML (clean, no inline styles/scripts)
├── assets/
│   ├── css/
│   │   └── main.css        ← All styles (16 organised sections, ~600 lines)
│   └── js/
│       └── main.js         ← All JavaScript (6 modules, fully commented)
└── README.md
```

---

## EmailJS Setup (Contact Form)

The contact form uses **EmailJS** — no backend required. Follow these steps:

### 1. Create a free account
Go to [https://emailjs.com](https://emailjs.com) and sign up.

### 2. Add an Email Service
- Dashboard → **Email Services** → Add Service
- Connect your Gmail / Outlook / SMTP
- Copy the **Service ID** (e.g. `service_abc123`)

### 3. Create an Email Template
- Dashboard → **Email Templates** → Create New
- Use these **exact variable names** in your template:

| Variable        | Description                  |
|-----------------|------------------------------|
| `{{first_name}}`| Sender's first name          |
| `{{last_name}}` | Sender's last name           |
| `{{email}}`     | Sender's email address       |
| `{{phone}}`     | Sender's phone (or "Not provided") |
| `{{service}}`   | Service of interest          |
| `{{message}}`   | Message body                 |

**Example template:**
```
Subject: New Inquiry from {{first_name}} {{last_name}} — {{service}}

Name:    {{first_name}} {{last_name}}
Email:   {{email}}
Phone:   {{phone}}
Service: {{service}}

Message:
{{message}}
```

- Copy the **Template ID** (e.g. `template_xyz789`)

### 4. Get your Public Key
- Dashboard → **Account** → **API Keys**
- Copy the **Public Key**

### 5. Update `assets/js/main.js`

Open `assets/js/main.js` and replace the three placeholder values:

```js
const EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',   // ← paste here
  serviceId:  'YOUR_SERVICE_ID',   // ← paste here
  templateId: 'YOUR_TEMPLATE_ID',  // ← paste here
};
```

That's it — the form is ready.

---

## Enabling / Disabling Sections

Several sections are commented out in the HTML. To enable them, simply remove
the `<!--` and `-->` around the relevant block:

- **Stats strip** (`#strip`) — metrics bar below the hero
- **Social links** in the footer
- **Additional services** (Staffing, Dev, Managed IT, Data Eng)
- **Additional industries** (Government, Professional Services)
- **Phone number** in the contact info panel

---

## Deploying

This is a pure static site — deploy anywhere:

| Platform       | Command / Notes                          |
|----------------|------------------------------------------|
| **Netlify**    | Drag & drop the `astreon/` folder        |
| **Vercel**     | `vercel deploy` in the project root      |
| **GitHub Pages**| Push to a repo, enable Pages on `main`  |
| **Any web host**| Upload all files via FTP / cPanel       |

> ⚠️ Keep the folder structure intact — `index.html` must sit alongside the
> `assets/` folder so the relative paths resolve correctly.

---

## CSS / JS Quick Reference

### CSS (`assets/css/main.css`)
Sections are clearly delimited with `/* ─── N. Name ─── */` comments:

1. Reset & Base
2. CSS Variables
3. Navigation
4. Hero Section
5. Stats Strip
6. Section Base
7. Services
8. Why Astreon
9. Industries / Domains
10. Tech Marquee
11. Testimonials
12. About
13. Contact
14. Footer
15. Reveal Animations
16. Responsive

### JS (`assets/js/main.js`)
Six self-contained modules with clear comments:

1. Scroll Restoration
2. Navbar scroll behaviour
3. Mobile drawer (`cd()` global used by inline `onclick`)
4. IntersectionObserver reveal animations
5. Counter animation (stats strip)
6. Contact form (EmailJS)

---

© 2025 Astreon LLC
