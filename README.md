# The Lo Down with Isha Lo — website

Run: double-click `START SERVER.bat` (or `node serve.mjs`) → http://localhost:3210

Pages: `index.html` · `programs.html` (certs, labs, workshops) · `team.html` · `join.html` (1M Women) · `partners.html` · `paper.html` (The End of the End)

All client-specific links/settings are in `CONFIG` at the top of `js/main.js`
(team email, GHL join-form URL, 3 Stripe links, May 2027 deadline, early-bird cutoff).

## Brand
Palette + logo come from her live site (greige, mustard gold, charcoal, copper CTA). Tokens are in `css/style.css` `:root`.
Logo files: `images/logo-full.png` (with tagline), `images/logo-mark.png` (LD monogram, used in header/footer/favicon).
Team photos are cropped from her live Team page screenshot (`images/team-*.jpg`, `face-*.jpg`). Higher-res originals would sharpen them.

## White paper
Every "Download" button/book opens the live PDF (`CONFIG.paper` in `js/main.js`).

## Still needed
- Photos for Britney, W. King, S. Carrington, Darrin Thompson (monogram placeholders now)
- Forms: registration, individual/org interest, partnership inquiry and lab reservations still open pre-filled emails. Swap for GHL form URLs (only the Join 1M Women form was provided)
- Chat: "Ask the guide" is a scripted stand-in; replace with the GoHighLevel chat widget
- Confirm: 2× (home) vs ~3× (join page) automation-risk stat wording; lab dates' year; Sept 16 lab has passed (auto-marks "Completed")
- The green "Join Now" button inside the join form is styled in GoHighLevel (change it there to copper)
