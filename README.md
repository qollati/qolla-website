# Qolla Website

Static GitHub Pages site. Home, privacy and support pages share `styles.css` and `theme.js`. Both original sky images and the botanical Qolla logo are included.

## Deployment

Upload all files and folders to the root of `qollati/qolla-website` on the `main` branch. Set GitHub Pages to deploy from `main` and `/ (root)`. The homepage works both under a repository path and a custom domain because links are relative.

Test theme toggle, keyboard Tab navigation, Zoom at 200%, VoiceOver, mobile layouts, privacy/support links and contact aliases before switching App Store URLs.

Do not remove Notion pages until the new URLs work. When connecting GoDaddy DNS to GitHub Pages, leave MX, SPF, DKIM and DMARC records untouched.


Night logo update: Qolla_original_logo_night.png is a true transparent lavender variant of the original illustrated Q, with its line details preserved. Each page chooses between two images through CSS (no JavaScript required for logo selection). Upload the new PNG and the updated styles.css plus each page HTML.
