# Bhuran Karate Academy

A responsive, dependency-free website for Bhuran Karate Academy in Shaheed Nagar, Agra. Editorial typography, navy/gold/warm-white styling matched to the supplied academy logo, real academy photography, gallery lightbox, reviews, embedded map, a mobile menu and a persistent mobile contact bar.

## Run locally

Requires Node.js 18 or newer. No installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Run `npm run check` for JavaScript syntax validation. Deploy the contents of `dist/` to any static host. All internal asset links are relative, including support for a GitHub Pages repository subpath.

## Enquiries

The form validates the details and opens a review dialog. Visitors can send the composed enquiry by SMS to the academy's listed number, or copy it for their preferred messaging app. There is no backend inbox, automated SMS sending, or server-side storage. No visitor details are sent just by filling or preparing the form.

## Hero video

The hero uses **3840 × 2160 UHD stock footage by Artem Podrez**, supplied from Pexels on desktop, with a locally hosted **1280 × 720** version on mobile to reduce data usage. Source: https://www.pexels.com/video/men-practicing-karate-6263395/. License: https://www.pexels.com/license/.

This is illustrative stock footage, not footage of the academy; the hero has a discreet stock credit. Academy gallery photos remain real listing images. The original Maps video was not downloaded after its media security block.

`dist/site-config.js` controls both sources. Muted inline looping, pause/play, reduced-motion preferences, data-saver handling, playback error fallback and background-tab pausing are implemented. The real academy photo remains the fallback. Desktop UHD playback requires access to the Pexels CDN; mobile video is included in the repository.

## Logo and colours

The user-supplied original badge is retained at `dist/assets/logo-original.png`. `dist/assets/bhuran-logo.png` is an AI-assisted, high-resolution restoration keeping the blue curved lettering, gold rings, circular layout and red dragon. Very fine details are reconstructed from the tiny source, not a certified exact vector trace. The website uses this badge in its header, footer and favicon. The original circular identity supersedes the initial draft monogram.

Brand palette: deep navy `#102578`, gold `#EFAD18`, warm white `#FAF9F3`, dragon red `#ED2435`.

## Verified business details

- **Listing name:** Bhuran karate academy (the supplied GitHub repository uses the spelling `burhan`).
- **Address:** E/3/1414, near Bhagat Singh Statue, Shaheed Nagar, Tajganj, Agra, Uttar Pradesh 282001.
- **Phone:** +91 75003 45441.
- **Coordinates:** 27.1498046, 78.0374383.
- **Google Maps:** https://maps.app.goo.gl/WHwf1YjnLNgi2k3N9
- **Rating at inspection, 30 October 2026:** 4.8/5 from 18 reviews. This is static listing information, not a live rating feed.

Class schedules, pricing, coach qualifications, minimum ages and trial offers are not invented. Training sections invite visitors to confirm suitable classes with the academy.

## Assets and attribution

`academy-team.jpg`, `training.jpg`, and `karate-class.jpg` were obtained from the supplied business's Google Maps listing. The high-resolution team photo was selected through the **By owner** gallery. The site links the listing and owner profile. The training images are listing imagery; see `ASSETS.md` for their source URLs. Before public business use, the business should confirm its reuse rights to the listing media.

Google Fonts supplies Manrope and Barlow Condensed, with local fallback fonts. Google Maps supplies the map. No analytics or advertising scripts are added. The supplied circular badge is preserved and restored. The adjacent wordmark is styled to match the website.

## Hosting

The static publish directory is `dist`. `.openai/hosting.json` contains the private Sites preview identity; no credentials are included. The GitHub repository can independently deploy `dist` to GitHub Pages, Vercel, Netlify, or Cloudflare Pages.


## Deployment reliability and mobile verification

Vercel is explicitly configured as Other (framework null), publishing dist as static files. The local preview lives in scripts/preview.mjs and is not a production server. Run node scripts/check-site.mjs to validate the deploy configuration, required page assets and JavaScript. A READY deployment must also pass HTTP checks on the real public domain.

Mobile fixes include staggered hero motion, dialog transitions, scroll locking/restoration, scrollable landscape menus, keyboard-aware contact controls, 44px minimum dialog/video controls, 16px form fields to avoid iOS zoom, narrow-screen wrapping, and background-video suspension outside the hero. Reduced-motion and data-saver preferences remain respected.
