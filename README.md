# LaundryDone - Premium Bilingual Laundry Service Website

A professional, conversion-optimized website for a premium local laundry service, fully bilingual in English and Hindi.

## Features

- 🌐 **Full Bilingual Support**: Seamless English/Hindi language switching
- 🎨 **Modern Design**: Minimalist, professional aesthetic with Rajasthan-inspired accents
- 📱 **Fully Responsive**: Optimized for all devices
- ♿ **Accessible**: WCAG 2.1 AA compliant
- ⚡ **Performance**: Fast loading, optimized assets
- 📧 **Lead Generation**: Contact forms, phone, WhatsApp integration

## Project Structure

```
├── index.html              # Homepage
├── services.html           # Services page
├── pricing.html            # Pricing page
├── how-it-works.html       # How it works page
├── booking.html            # Booking form
├── faq.html                # FAQ page
├── about.html              # About & Contact page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── i18n.js             # Internationalization module
│   ├── language-toggle.js  # Language switching logic
│   └── forms.js            # Form handling
├── data/
│   ├── content-en.json     # English content
│   └── content-hi.json     # Hindi content
└── assets/
    └── images/             # Images and icons
```

## Setup

1. Clone or download this repository
2. Open `index.html` in a browser, or use a local server:
   ```bash
   npm run dev
   ```

## Language Toggle

The language toggle is located in the top-right header. Click to switch between English (English) and Hindi (हिंदी). The entire site content updates instantly without page reload.

## Form Handling

Booking forms are configured to use Formspree by default. To set up:
1. Sign up at https://formspree.io
2. Update the form action URLs in `booking.html` with your Formspree endpoint

Alternatively, integrate with your preferred form handling service (Google Sheets, email, etc.).

## Customization

- **Colors**: Edit CSS variables in `css/styles.css`
- **Content**: Update JSON files in `data/` directory
- **Images**: Replace placeholder images in `assets/images/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT


