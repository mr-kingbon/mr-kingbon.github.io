# MrKingBon Portfolio

A stunning cyberpunk-themed single-page portfolio showcasing my full-stack development work, payment systems, and gaming platforms.

![Portfolio Preview](https://via.placeholder.com/1200x600/06060e/00f2ff?text=MrKingBon+Portfolio)

## 🚀 Live Demo

**URL**: [mrkingbon.is-a.dev](https://mrkingbon.is-a.dev)

## ✨ Features

- **Cyberpunk Dark Theme** — Deep space background with cyan/purple neon accents
- **Particle Animation** — Interactive background with connecting nodes
- **Typewriter Effect** — Animated hero text cycling through keywords
- **Glassmorphism Cards** — Modern frosted glass UI components
- **Responsive Design** — Fully optimized for all screen sizes
- **Smooth Scroll** — Elegant navigation with scroll-triggered animations
- **Code Block Display** — Terminal-style code preview in hero section

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript** — Vanilla JS with Intersection Observer
- **Fonts** — Space Grotesk, Inter, JetBrains Mono
- **Icons** — Remix Icons

## 📁 Project Structure

```
portfolio/
├── index.html      # Main portfolio page
├── css/
│   └── style.css   # All styles
├── js/
│   └── main.js     # Animations & interactions
├── CNAME           # Custom domain config
└── README.md       # This file
```

## 🚦 Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. **Create a new GitHub repository** named:
   - `mr-kingbon.github.io` (for user page) OR
   - Any name for project pages (e.g., `portfolio`)

2. **Push the portfolio code:**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   
   # Add your GitHub repo as remote
   git remote add origin https://github.com/mr-kingbon/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **main** (or **master**)
   - Path: `/ (root)`
   - Click **Save**

4. **Your site will be live at:**
   - `https://mr-kingbon.github.io` (user page) OR
   - `https://mr-kingbon.github.io/repo-name` (project page)

---

### Option 2: Setting Up is-a.dev Domain

After deploying to GitHub Pages, you can get a free `mrkingbon.is-a.dev` subdomain:

#### Step 1: Fork the is-a.dev Register Repository
1. Go to: https://github.com/is-a-dev/register
2. Click **Fork** (top right)
3. Wait for the fork to complete

#### Step 2: Create Your Domain File
1. In your forked repository, go to `domains/` folder
2. Click **Add file** → **Create new file**
3. Name the file: `mrkingbon.json`
4. Add this content:
```json
{
  "owner": {
    "username": "mr-kingbon",
    "email": "chingkheiluwang423@gmail.com"
  },
  "record": {
    "CNAME": "mr-kingbon.github.io"
  }
}
```
5. Commit the file (Commit changes)

#### Step 3: Submit a Pull Request
1. Go to your forked repository
2. Click **Contribute** → **Open pull request**
3. Fill in the PR template
4. Click **Create pull request**

#### Step 4: Wait for Approval
- Usually takes a few hours to 2 days
- Once approved, your domain `mrkingbon.is-a.dev` will point to your GitHub Pages!

#### Step 5: Add CNAME File (Already Done!)
The `CNAME` file in this project already contains `mrkingbon.is-a.dev` — just make sure it's in your GitHub Pages deploy.

---

### Option 3: Manual Deployment

You can also deploy to any static hosting:

```bash
# Build (if you add build tools later)
npm run build

# Preview locally
npx serve .
```

## 🎨 Customization

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --accent-cyan: #00f2ff;    /* Change primary accent */
    --accent-purple: #7c3aed; /* Change secondary accent */
    --bg-primary: #06060e;     /* Change background */
}
```

### Adding More Projects

Edit the projects section in `index.html`:

```html
<div class="project-card">
    <div class="project-header">
        <div class="project-icon">
            <i class="ri-your-icon"></i>
        </div>
    </div>
    <h3 class="project-title">Your Project Name</h3>
    <!-- ... rest of the card -->
</div>
```

### Updating Contact Links

Edit the contact section in `index.html`:

```html
<a href="https://your-new-link.com" class="contact-link">
    <!-- ... -->
</a>
```

## 📄 License

MIT License — Feel free to use this portfolio as a template!

## 🤝 Credits

- **Design Inspiration**: Cyberpunk/glassmorphism UI trends
- **Icons**: [Remix Icons](https://remixicon.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)

---

**Built with ❤️ by MrKingBon**