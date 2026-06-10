// ═══════════════════════════════════════════════════
//   GenZ Laundry — Hotels & Resorts JS
//   hotels.js
// ═══════════════════════════════════════════════════

// ── Hotel data ─────────────────────────────────────
const HOTELS = {
  'ummed-bhawan': {
    name:     'Ummed Bhawan Palace',
    tier:     'Palace',
    tierClass:'tier-palace',
    stars:    '★★★★★',
    location: 'Circuit House Road, Ratanada, Jodhpur',
    tagline:  '"Where royal heritage meets modern luxury — and every garment is treated like royalty."',
    about:    'Ummed Bhawan Palace is a stunning 1943 Art Deco masterpiece built by Maharaja Ummed Singh of Jodhpur. Spread across 26 acres of manicured gardens, the palace features 70 luxuriously appointed suites and rooms, a rooftop pool, Marwar-inspired spa, and multiple fine-dining venues. The palace seamlessly blends its storied royal heritage with contemporary five-star hospitality, welcoming guests from across the globe.',
    // Real images from public/ummedbhawan/ — numbered ummed_bhawan1.jpg … ummed_bhawan6.jpg
    // If an image fails to load the slide falls back to the gradient colour
    gallery: [
      {
        type:    'video',
        src:     'public/ummed_bhawan/ummed_bhawan_motion.mp4',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-crown',
        caption: 'Ummed Bhawan Palace — Jodhpur\'s Royal Heritage'
      },
      {
        src:     'public/ummed_bhawan/ummed_bhawan1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-crown',
        caption: 'Ummed Bhawan Palace — Majestic Heritage Facade'
      },
      {
        src:     'public/ummed_bhawan/ummed_bhawan2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1a0a00,#5c2d00,#78350f)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Royal Suite — Pristine Linens by GenZ Laundry'
      },
      {
        src:     'public/ummed_bhawan/ummed_bhawan3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)',
        fallbackIcon: 'fas fa-bath',
        caption: 'Spa & Pool Linen — Fresh & Perfectly Laundered'
      },
      {
        src:     'public/ummed_bhawan/ummed_bhawan4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Garments — Express Dry Cleaning Service'
      },
      {
        src:     'public/ummed_bhawan/ummed_bhawan5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Staff Uniforms — Immaculate Every Day'
      },
      {
        src:     'public/ummed_bhawan/ummed_bhawan6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Banquet & Dining Linen — Hospitality-Grade Finish'
      },
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Bed Linen Service',      desc: 'King & twin beds, pillow covers, duvet covers — washed, pressed and returned spotless.' },
      { icon: 'fas fa-bath',      title: 'Spa & Pool Towels',      desc: 'High-frequency turnover with consistent freshness and fluffy texture.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Garments',         desc: 'Delicate handling of suits, sarees, ethnic wear with express 4-hour option.' },
      { icon: 'fas fa-user-tie',  title: 'Staff Uniforms',         desc: 'Daily uniform processing for all hotel departments — reception, kitchen, spa, housekeeping.' },
      { icon: 'fas fa-store',     title: 'Curtains & Drapes',      desc: 'Periodic deep-cleaning of all room and banquet curtains without damage to fabric.' },
      { icon: 'fas fa-utensils',  title: 'Banquet & Table Linen',  desc: 'Tablecloths, napkins and event linen processed to hospitality-grade standards.' },
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for VIP Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Friendly, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Custom Volume Pricing & Monthly Billing' },
      { icon: 'fas fa-truck',      text: 'Silent, Discreet Pickup & Delivery Logistics' },
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Ummed%20Bhawan%20Palace%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.',
    reviews: [
      {
        name:       'Ajeng Alifah',
        meta:       '8 reviews · 1 photo',
        rating:     5,
        text:       'I used Gen Z Laundry during my one-month stay in India, and I was very happy with their service. The prices were reasonable, and they offered free pickup and delivery, which was very convenient. My clothes always came back fresh, clean, and well cared for. The team was reliable, professional, and easy to communicate with. I highly recommend Gen Z Laundry to anyone looking for a quality laundry service.',
        when:       '4 days ago',
        ownerReply: 'A whole month with us — that truly means the world! 🙏 Reviews like yours remind us exactly why we do what we do. Knowing your clothes came back fresh and that our team made your stay a little easier is the best feeling. Whenever you\'re back in Jodhpur, we\'ll be right here ready to take care of everything. Safe travels, Ajeng! 💙✨',
        replyWhen:  '3 days ago'
      }
    ]
  },

  'radisson': {
    name:     'Radisson Jodhpur',
    tier:     'Hotel',
    tierClass:'tier-resort',
    stars:    '★★★★★',
    location: 'Fateh Sagar Lake Road, Jodhpur',
    tagline:  '"International luxury meets Jodhpur hospitality — with every garment cared for to perfection."',
    about:    'Radisson Jodhpur is a premier five-star international hotel offering world-class amenities in the heart of the Blue City. Featuring elegantly appointed rooms and suites, an outdoor pool, multi-cuisine restaurant, fully equipped spa, and state-of-the-art conference facilities. Gen-Z Laundry is proud to be the trusted laundry partner for this iconic property, delivering express garment care for guests and staff alike.',
    gallery: [
      {
        src:         'public/radissonhotels/radissonhotels1.jpg',
        fallbackBg:  'linear-gradient(135deg,#1e3a8a,#1d4ed8,#1e40af)',
        fallbackIcon:'fas fa-hotel',
        caption:     'Radisson Jodhpur — World-Class International Hotel'
      },
      {
        src:         'public/radissonhotels/radissonhotels2.jpeg',
        fallbackBg:  'linear-gradient(135deg,#0f172a,#1e3a8a,#1d4ed8)',
        fallbackIcon:'fas fa-bed',
        caption:     'Premium Rooms — Pristine Linen Service by GenZ Laundry'
      },
      {
        src:         'public/radissonhotels/radissonhotels3.jpeg',
        fallbackBg:  'linear-gradient(135deg,#1e3a8a,#1d4ed8,#1e40af)',
        fallbackIcon:'fas fa-swimmer',
        caption:     'Luxury Pool & Lounge Area — Pristine Towels by GenZ Laundry'
      },
      {
        src:         'public/radissonhotels/radissonhotels4.jpeg',
        fallbackBg:  'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon:'fas fa-tshirt',
        caption:     'Guest Laundry & Dry Cleaning — Express 4-Hour Turnaround'
      },
      {
        src:         'public/radissonhotels/radissonhotels5.jpeg',
        fallbackBg:  'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon:'fas fa-user-tie',
        caption:     'Radisson Front Desk & Hotel Staff — Crisp Professional Uniforms'
      },
      {
        src:         'public/radissonhotels/radissonhotels6.jpeg',
        fallbackBg:  'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon:'fas fa-utensils',
        caption:     'Fine Dining Restaurant — Premium Hospitality Table Linen'
      },
      {
        src:         'public/radissonhotels/radissonhotels7.jpeg',
        fallbackBg:  'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon:'fas fa-hot-tub',
        caption:     'Spa robes & fluffy towels stacked neatly'
      },
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Bed & Room Linen',       desc: 'Sheets, pillow covers, duvet covers — laundered to international 5-star standards.' },
      { icon: 'fas fa-bath',      title: 'Pool & Spa Towels',      desc: 'High-volume towel service with consistent softness and hygiene every day.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Garments',         desc: 'Express dry cleaning and laundry for international and domestic guests.' },
      { icon: 'fas fa-user-tie',  title: 'Staff Uniforms',         desc: 'All department uniforms — front desk, F&B, housekeeping, spa — processed daily.' },
      { icon: 'fas fa-utensils',  title: 'Restaurant & Banquet Linen', desc: 'Table linen, napkins and event cloths cleaned to Radisson brand standards.' },
      { icon: 'fas fa-store',     title: 'Curtains & Soft Furnishings', desc: 'Periodic deep-clean for all room curtains and lobby soft furnishings.' },
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for VIP Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Hotel Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Certified, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Volume Contract Pricing & Monthly Billing' },
      { icon: 'fas fa-star',       text: 'Trusted by International 5-Star Standards' },
    ],
    reviews: [
      {
        name:       'Amandine',
        meta:       'Local Guide · 24 reviews · 10 photos',
        rating:     5,
        text:       'Perfect amazing',
        when:       '2 weeks ago',
        ownerReply: 'The best reward for our team is a happy customer. Thanks for the amazing review! 🌟 Our team is ready to welcome you again 💙',
        replyWhen:  '1 week ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Radisson%20Jodhpur%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'taj-hari-mahal': {
    name:     'Taj Hari Mahal',
    tier:     'Palace & Resort',
    tierClass:'tier-palace',
    stars:    '★★★★★',
    location: '5, Residency Road, Jodhpur',
    tagline:  '"Where royal Marwari architecture meets legendary Taj hospitality — garment care fit for kings."',
    about:    'Taj Hari Mahal is a magnificent 5-star palace hotel spread over six acres of landscaped gardens. Embellished with grand domes, arches, and columns inspired by 14th-century royal Marwar architecture, the resort features palatial rooms, a large outdoor pool, spa, and signature dining. Gen-Z Laundry is proud to provide premium laundry services for their guest rooms, banquets, and staff.',
    gallery: [
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-crown',
        caption: 'Taj Hari Mahal — Grand Palace Architecture & Lawns'
      },
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1a0a00,#5c2d00,#78350f)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Palatial Guest Rooms — Pristine Linens by GenZ Laundry'
      },
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Outdoor Swimming Pool — Fluffy Pool Towels'
      },
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Laundry — Premium Care for Royal Attire'
      },
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Hotel Staff Uniforms — Immaculate & Professionally Pressed'
      },
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Fine Dining Table Linen — Spotless Tablecloths & Napkins'
      },
      {
        src:     'public/taj_hari_mahal/taj_hari_mahal7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Jiva Spa Linens — Freshly Laundered Luxury Towels & Robes'
      },
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Royal Linen Service',    desc: 'King beds, pillow covers, duvet covers — washed, pressed and returned spotless.' },
      { icon: 'fas fa-bath',      title: 'Spa & Pool Towels',      desc: 'High-frequency towel cleaning with fluffy texture and complete sanitization.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Garments',         desc: 'Care for delicate silk sarees, sherwanis, suits with express 4-hour option.' },
      { icon: 'fas fa-user-tie',  title: 'Staff Uniforms',         desc: 'Daily uniform processing for banquet, front desk, and housekeeping staff.' },
      { icon: 'fas fa-store',     title: 'Curtains & Drapes',      desc: 'Periodic deep-cleaning of royal drapes and banquet curtains.' },
      { icon: 'fas fa-utensils',  title: 'Banquet Table Linen',    desc: 'Event tablecloths, satin napkins cleaned to absolute pristine standards.' },
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for VIP Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Hotel Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Certified, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Volume Contract Pricing & Monthly Billing' },
      { icon: 'fas fa-star',       text: 'Trusted by Taj Hotels Group standards' },
    ],
    reviews: [
      {
        name:       'Ravi K. Mehta',
        meta:       'Local Guide · 45 reviews',
        rating:     5,
        text:       'The dry cleaning service provided by Gen-Z laundry for my silk sherwani during my stay at Taj Hari Mahal Jodhpur was absolutely top-notch. It was returned within hours in pristine condition.',
        when:       '3 weeks ago',
        ownerReply: 'We are delighted to hear you had a great experience, Ravi! Caring for delicate ethnic wear is our specialty. Thank you! 💙',
        replyWhen:  '2 weeks ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Taj%20Hari%20Mahal%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'raas-jodhpur': {
    name:     'RAAS Jodhpur',
    tier:     'Boutique Resort',
    tierClass:'tier-boutique',
    stars:    '★★★★★',
    location: 'Makrana Mohalla, Jodhpur',
    tagline:  '"Jodhpur\'s first boutique hotel, blending 18th-century heritage with chic contemporary design."',
    about:    'RAAS Jodhpur is a boutique sanctuary set in the heart of the walled city, featuring spectacular views of the Mehrangarh Fort. Comprising four original 18th-century red sandstone structures alongside modern architectural interventions, RAAS features luxury rooms, a heated pool, organic wellness spa, and rooftop dining. Gen-Z Laundry provides premium hospitality laundry services for guest garments and fine linen, meeting their meticulous standards of contemporary luxury.',
    gallery: [
      {
        src:     'public/raas_jodhpur/raas_jodhpur1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#311005,#521c0b,#73270f)',
        fallbackIcon: 'fas fa-hotel',
        caption: 'RAAS Jodhpur — Red Sandstone Heritage with Fort Views'
      },
      {
        src:     'public/raas_jodhpur/raas_jodhpur2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0f172a,#1e293b,#334155)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Luxury Guest Room — Contemporary Linens by GenZ Laundry'
      },
      {
        src:     'public/raas_jodhpur/raas_jodhpur3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0284c7,#0369a1,#075985)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Sandstone Pool Area — Fluffy Wellness Towels'
      },
      {
        src:     'public/raas_jodhpur/raas_jodhpur4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0d9488,#0f766e,#115e59)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Laundry — Eco-Safe Gentle Dry Cleaning'
      },
      {
        src:     'public/raas_jodhpur/raas_jodhpur5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#581c87,#6b21a8,#7e22ce)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Hotel Team Uniforms — Spotless and Sharp'
      },
      {
        src:     'public/raas_jodhpur/raas_jodhpur6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#991b1b,#7f1d1d,#b91c1c)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Rooftop Dining Table Setup — Hospitality-Grade Linen'
      },
      {
        src:     'public/raas_jodhpur/raas_jodhpur7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Ila Spa Wellness Linen — Hypoallergenic Towels'
      },
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Boutique Room Linen',    desc: 'Eco-friendly washing & pressing of bed linens, sheets and premium pillowcases.' },
      { icon: 'fas fa-bath',      title: 'Pool & Spa Towels',      desc: 'Sanitized pool towels returned soft, absorbent, and beautifully folded.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Wardrobe Care',    desc: 'Specialized dry cleaning for delicate designer guest clothes and traditionalwear.' },
      { icon: 'fas fa-user-tie',  title: 'Bespoke Staff Uniforms', desc: 'Daily laundry and crisp pressing for reception, F&B, and spa staff uniforms.' },
      { icon: 'fas fa-store',     title: 'Curtains & Linens',      desc: 'Periodic cleaning for lobby drapery and luxury room curtains.' },
      { icon: 'fas fa-utensils',  title: 'Fine Dining Linen',      desc: 'Rooftop dining table linen processed to high-end hygienic standards.' },
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for Boutique Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: '100% Eco-Certified, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Flexible Contract Pricing & Invoicing' },
      { icon: 'fas fa-feather',    text: 'Discreet, Silent Delivery Logistics' },
    ],
    reviews: [
      {
        name:       'Charlotte Dumont',
        meta:       'Travel Blogger · 12 reviews',
        rating:     5,
        text:       'Staying at RAAS Jodhpur was magical. My designer dresses were laundered perfectly by their partner Gen-Z Laundry and returned in a garment bag looking brand new.',
        when:       '1 month ago',
        ownerReply: 'Thank you for the kind words, Charlotte! We are proud to take care of our boutique partners guest wardrobes. 💙',
        replyWhen:  '3 weeks ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20RAAS%20Jodhpur%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'ummed-jodhpur': {
    name:     'The Ummed Jodhpur Palace Resort',
    tier:     'Resort',
    tierClass:'tier-resort',
    stars:    '★★★★★',
    location: 'Banar Road, Prem Nagar, Jodhpur',
    tagline:  '"A sprawling 28-acre palace resort designed by Hafeez Contractor, celebrating Rajasthan\'s royal grandeur."',
    about:    'The Ummed Jodhpur Palace Resort & Spa is a grand 5-star retreat located on the outskirts of Jodhpur. Designed by renowned architect Hafeez Contractor, the resort features 28 acres of lush gardens, palatial courtyards, a massive swimming pool, and sophisticated dining. Gen-Z Laundry handles high-volume bulk linen and uniform cleaning for The Ummed, ensuring consistent five-star freshness and hygiene.',
    gallery: [
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-hotel',
        caption: 'The Ummed Jodhpur Palace Resort & Spa — 28-Acre Estate'
      },
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1a0a00,#5c2d00,#78350f)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Palatial Suites — Pristine Bedding by GenZ Laundry'
      },
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Massive Swimming Pool — Fluffy Pool Towels'
      },
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Laundry — Premium Express Turnaround'
      },
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Housekeeping & Resort Staff Uniforms — Immaculate Quality'
      },
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Royal Banquet Hall Settings — Pristine Tablecloths & Linens'
      },
      {
        src:     'public/ummed_jodhpur/ummed_jodhpur7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Spa & Wellness Center — Sanitized Plush Robes'
      },
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'High-Volume Linen Care', desc: 'Washing, ironing, and delivery of bed linens, sheets, pillow covers at scale.' },
      { icon: 'fas fa-bath',      title: 'Resort Pool Towels',     desc: 'Soft, absorbent, sanitized pool and spa towels in high volume.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Dry Cleaning',     desc: 'Express laundry and gentle dry cleaning for tourist and business guests.' },
      { icon: 'fas fa-user-tie',  title: 'Housekeeping Uniforms',  desc: 'Uniform processing for resort housekeeping, F&B, security, and reception staff.' },
      { icon: 'fas fa-store',     title: 'Curtains & Drapery',     desc: 'Periodic cleaning for grand lobbies and event hall curtains.' },
      { icon: 'fas fa-utensils',  title: 'Banquet & F&B Linen',    desc: 'Tablecloths, napkins, seat covers processed for royal banquets.' },
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: 'Express SLA for Destination Wedding Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Resort Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Friendly, Hypoallergenic Laundry Solutions' },
      { icon: 'fas fa-tag',        text: 'Bulk Volume Contracts & Monthly Billing' },
      { icon: 'fas fa-truck',      text: 'Heavy-Duty Logistics for Sprawling Estates' },
    ],
    reviews: [
      {
        name:       'Siddharth Sharma',
        meta:       'Local Guide · 108 reviews',
        rating:     5,
        text:       'Attended a destination wedding at The Ummed. My garments were dry cleaned by Gen-Z Laundry in record time after a spill. Incredible service, saved the evening.',
        when:       '2 months ago',
        ownerReply: 'We are thrilled that we could help you out during such an important event! Thank you for the five-star review, Siddharth. 💙',
        replyWhen:  '2 months ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20The%20Ummed%20Jodhpur%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'ajit-bhawan': {
    name:     'Ajit Bhawan',
    tier:     'Heritage Hotel',
    tierClass:'tier-palace',
    stars:    '★★★★★',
    location: 'Circuit House Road, Jodhpur',
    tagline:  '"India\'s first heritage hotel, offering a rare blend of royal lifestyle and contemporary comforts."',
    about:    'Ajit Bhawan is a historic heritage hotel built for Maharajadhiraj Sir Ajit Singhji, the younger brother of Maharaja Umaid Singhji. Spread across beautiful gardens, it offers charming red-sandstone cottages and rooms, combining authentic Rajput hospitality with premium modern amenities. Gen-Z Laundry is proud to serve this historic hotel, keeping its heritage linens and guest garments in immaculate condition.',
    gallery: [
      {
        src:     'public/ajit_bhawan/ajit_bhawan1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-crown',
        caption: 'Ajit Bhawan — India\'s First Heritage Hotel'
      },
      {
        src:     'public/ajit_bhawan/ajit_bhawan2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1a0a00,#5c2d00,#78350f)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Heritage Rooms — Crisp Linen by GenZ Laundry'
      },
      {
        src:     'public/ajit_bhawan/ajit_bhawan3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Courtyard Pool Area — Soft Absorbent Towels'
      },
      {
        src:     'public/ajit_bhawan/ajit_bhawan4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Wardrobe — Premium Eco-Friendly Care'
      },
      {
        src:     'public/ajit_bhawan/ajit_bhawan5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Immaculate Staff Uniforms'
      },
      {
        src:     'public/ajit_bhawan/ajit_bhawan6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Royal Dining Table Linen'
      },
      {
        src:     'public/ajit_bhawan/ajit_bhawan7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Spa robes & fluffy towels'
      }
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Heritage Linen Service', desc: 'Bed linens, sheets and pillowcases processed to exceptional standards.' },
      { icon: 'fas fa-bath',      title: 'Pool & Spa Towels',      desc: 'Sanitized pool towels returned soft, absorbent, and beautifully folded.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Wardrobe Care',    desc: 'Specialized dry cleaning for delicate designer guest clothes and traditionalwear.' },
      { icon: 'fas fa-user-tie',  title: 'Bespoke Staff Uniforms', desc: 'Daily laundry and crisp pressing for reception, F&B, and spa staff uniforms.' },
      { icon: 'fas fa-store',     title: 'Curtains & Linens',      desc: 'Periodic cleaning for lobby drapery and luxury room curtains.' },
      { icon: 'fas fa-utensils',  title: 'Fine Dining Linen',      desc: 'Restaurant and dining table linen processed to high-end hygienic standards.' }
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for Heritage Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Friendly, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Custom Volume Pricing & Monthly Billing' },
      { icon: 'fas fa-truck',      text: 'Silent, Discreet Pickup & Delivery Logistics' }
    ],
    reviews: [
      {
        name:       'Vikramaditya Singh',
        meta:       'Local Guide · 15 reviews',
        rating:     5,
        text:       'Exceptional service. The laundry partner Gen-Z Laundry dry cleaned my traditional Jodhpuri suit perfectly within a few hours for a family function.',
        when:       '3 weeks ago',
        ownerReply: 'Thank you, Vikramaditya! Traditional attire is handled with utmost care. Glad we could help! 💙',
        replyWhen:  '2 weeks ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Ajit%20Bhawan%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'inn-season': {
    name:     'Hotel Inn Season',
    tier:     'Boutique Hotel',
    tierClass:'tier-boutique',
    stars:    '★★★★',
    location: 'P.W.D. Road, Jodhpur',
    tagline:  '"An Art Deco oasis of serenity and style, situated in a tranquil corner of Jodhpur."',
    about:    'Hotel Inn Season is a boutique heritage hotel housed in an elegant Art Deco estate dating back to the 1930s. Featuring spacious suites, lush gardens, and a beautiful swimming pool, the hotel offers a serene oasis away from the city\'s hustle. Gen-Z Laundry provides premium hospitality laundry services, ensuring every guest experience is flawless.',
    gallery: [
      {
        src:     'public/inn_season/inn_season1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#1e40af)',
        fallbackIcon: 'fas fa-hotel',
        caption: 'Hotel Inn Season — Serene Art Deco Estate'
      },
      {
        src:     'public/inn_season/inn_season2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0f172a,#1e3a8a,#1d4ed8)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Art Deco Suites — Pristine Bedding by GenZ Laundry'
      },
      {
        src:     'public/inn_season/inn_season3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#1e40af)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Tranquil Pool Area — Soft Towels'
      },
      {
        src:     'public/inn_season/inn_season4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Wardrobe — Premium Eco-Friendly Care'
      },
      {
        src:     'public/inn_season/inn_season5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Staff Uniforms — Immaculate Quality'
      },
      {
        src:     'public/inn_season/inn_season6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Hotel Dining Linen'
      },
      {
        src:     'public/inn_season/inn_season7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Spa & Pool Towels'
      }
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Boutique Room Linen',    desc: 'Washing, ironing, and delivery of bed linens, sheets, pillow covers.' },
      { icon: 'fas fa-bath',      title: 'Pool & Bath Towels',     desc: 'Soft, absorbent, sanitized pool and spa towels in high volume.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Dry Cleaning',     desc: 'Express laundry and gentle dry cleaning for boutique hotel guests.' },
      { icon: 'fas fa-user-tie',  title: 'Bespoke Staff Uniforms', desc: 'Daily laundry and crisp pressing for reception, F&B, and spa staff uniforms.' },
      { icon: 'fas fa-store',     title: 'Curtains & Drapery',     desc: 'Periodic cleaning for lobby drapery and luxury room curtains.' },
      { icon: 'fas fa-utensils',  title: 'Fine Dining Linen',      desc: 'Restaurant and dining table linen processed to high-end hygienic standards.' }
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for Boutique Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: '100% Eco-Certified, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Volume Contract Pricing & Monthly Billing' },
      { icon: 'fas fa-truck',      text: 'Discreet, Silent Delivery Logistics' }
    ],
    reviews: [
      {
        name:       'Saira Banu',
        meta:       'Traveler · 8 reviews',
        rating:     5,
        text:       'The laundry service at Inn Season was fantastic. My cotton dresses were pressed so beautifully and smelled amazing. Highly recommend!',
        when:       '1 month ago',
        ownerReply: 'Thank you, Saira! We love keeping cottons crisp and fresh. Hope to serve you again! 💙',
        replyWhen:  '3 weeks ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Hotel%20Inn%20Season%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'devi-bhawan': {
    name:     'Devi Bhawan',
    tier:     'Heritage Resort',
    tierClass:'tier-resort',
    stars:    '★★★★',
    location: 'Defense Lab Road, Ratanada, Jodhpur',
    tagline:  '"An 80-year-old heritage home offering a peaceful green sanctuary in the Blue City."',
    about:    'Devi Bhawan is a family-run heritage hotel boasting comfortable old-world rooms surrounded by sprawling, lush green gardens. Decorated with antique Rajput furniture and fixtures, it provides a quiet and authentic home-away-from-home experience. Gen-Z Laundry supports the estate with consistent bulk linen washing and express guest dry cleaning.',
    gallery: [
      {
        src:     'public/devi_bhawan/devi_bhawan1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-crown',
        caption: 'Devi Bhawan — Historic Heritage Gardens'
      },
      {
        src:     'public/devi_bhawan/devi_bhawan2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1a0a00,#5c2d00,#78350f)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Heritage Rooms — Crisp Linen by GenZ Laundry'
      },
      {
        src:     'public/devi_bhawan/devi_bhawan3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Garden Swimming Pool — Fluffy Towels'
      },
      {
        src:     'public/devi_bhawan/devi_bhawan4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Wardrobe — Premium Eco-Friendly Care'
      },
      {
        src:     'public/devi_bhawan/devi_bhawan5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Housekeeping & Staff Uniforms'
      },
      {
        src:     'public/devi_bhawan/devi_bhawan6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Dining Room Table Linens'
      },
      {
        src:     'public/devi_bhawan/devi_bhawan7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Spa & Wellness Center — Sanitized Plush Robes'
      }
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Heritage Linen Service', desc: 'Bed linens, sheets and pillowcases processed to exceptional standards.' },
      { icon: 'fas fa-bath',      title: 'Pool & Spa Towels',      desc: 'Sanitized pool towels returned soft, absorbent, and beautifully folded.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Wardrobe Care',    desc: 'Specialized dry cleaning for delicate designer guest clothes and traditionalwear.' },
      { icon: 'fas fa-user-tie',  title: 'Bespoke Staff Uniforms', desc: 'Daily laundry and crisp pressing for reception, F&B, and spa staff uniforms.' },
      { icon: 'fas fa-store',     title: 'Curtains & Linens',      desc: 'Periodic cleaning for lobby drapery and luxury room curtains.' },
      { icon: 'fas fa-utensils',  title: 'Fine Dining Linen',      desc: 'Restaurant and dining table linen processed to high-end hygienic standards.' }
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for Heritage Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Friendly, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Custom Volume Pricing & Monthly Billing' },
      { icon: 'fas fa-truck',      text: 'Silent, Discreet Pickup & Delivery Logistics' }
    ],
    reviews: [
      {
        name:       'David Miller',
        meta:       'Global Traveler · 32 reviews',
        rating:     5,
        text:       'Stunning garden property. The laundry service was incredibly quick, and my linen shirts came back perfectly ironed.',
        when:       '2 weeks ago',
        ownerReply: 'Hi David! We specialize in handling linen fabrics. Thank you for the wonderful feedback! 💙',
        replyWhen:  '1 week ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Devi%20Bhawan%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'rohet-house': {
    name:     'The Rohet House',
    tier:     'Luxury Boutique House',
    tierClass:'tier-boutique',
    stars:    '★★★★★',
    location: 'P.W.D. Road, Jodhpur',
    tagline:  '"A beautiful family home of the House of Rohet, transformed into an intimate luxury boutique retreat."',
    about:    'The Rohet House is an exclusive boutique property designed with stunning hand-painted murals, vibrant Rajasthani colors, and luxurious contemporary amenities. Featuring six rooms and two suites, it offers travelers an intimate, personalized, and culturally rich experience in Jodhpur. Gen-Z Laundry handles their premium linens and guest wardrobe care with absolute precision and discretion.',
    gallery: [
      {
        src:     'public/rohet_house/rohet_house1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#311005,#521c0b,#73270f)',
        fallbackIcon: 'fas fa-hotel',
        caption: 'The Rohet House — Intimate Luxury & Artistic Suites'
      },
      {
        src:     'public/rohet_house/rohet_house2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0f172a,#1e293b,#334155)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Luxury Guest Room — Contemporary Linens by GenZ Laundry'
      },
      {
        src:     'public/rohet_house/rohet_house3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0284c7,#0369a1,#075985)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Sandstone Pool Area — Fluffy Wellness Towels'
      },
      {
        src:     'public/rohet_house/rohet_house4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#0d9488,#0f766e,#115e59)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Laundry — Eco-Safe Gentle Dry Cleaning'
      },
      {
        src:     'public/rohet_house/rohet_house5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#581c87,#6b21a8,#7e22ce)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Hotel Team Uniforms — Spotless and Sharp'
      },
      {
        src:     'public/rohet_house/rohet_house6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#991b1b,#7f1d1d,#b91c1c)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Boutique Dining Table Setup'
      },
      {
        src:     'public/rohet_house/rohet_house7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Ila Spa Wellness Linen'
      }
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'Boutique Room Linen',    desc: 'Eco-friendly washing & pressing of bed linens, sheets and premium pillowcases.' },
      { icon: 'fas fa-bath',      title: 'Pool & Spa Towels',      desc: 'Sanitized pool towels returned soft, absorbent, and beautifully folded.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Wardrobe Care',    desc: 'Specialized dry cleaning for delicate designer guest clothes and traditionalwear.' },
      { icon: 'fas fa-user-tie',  title: 'Bespoke Staff Uniforms', desc: 'Daily laundry and crisp pressing for reception, F&B, and spa staff uniforms.' },
      { icon: 'fas fa-store',     title: 'Curtains & Linens',      desc: 'Periodic cleaning for lobby drapery and luxury room curtains.' },
      { icon: 'fas fa-utensils',  title: 'Fine Dining Linen',      desc: 'Restaurant and dining table linen processed to high-end hygienic standards.' }
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: '4-Hour Express Turnaround for Boutique Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: '100% Eco-Certified, Hypoallergenic Detergents' },
      { icon: 'fas fa-tag',        text: 'Flexible Contract Pricing & Invoicing' },
      { icon: 'fas fa-feather',    text: 'Discreet, Silent Delivery Logistics' }
    ],
    reviews: [
      {
        name:       'Ayesha Sen',
        meta:       'Luxury Explorer · 14 reviews',
        rating:     5,
        text:       'Every detail at The Rohet House is curated, including their dry cleaning. My heavy silks were handled with perfect care by Gen-Z Laundry.',
        when:       '3 weeks ago',
        ownerReply: 'Thank you, Ayesha! We treat every luxury fabric with meticulous attention. 💙',
        replyWhen:  '2 weeks ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20The%20Rohet%20House%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  },

  'indana-palace': {
    name:     'Indana Palace Jodhpur',
    tier:     'Palace',
    tierClass:'tier-palace',
    stars:    '★★★★★',
    location: 'Opposite Military Area, Airport Road, Jodhpur',
    tagline:  '"A modern palace reflecting the royal heritage, architectural grandeur, and vibrant spirit of Marwar."',
    about:    'Indana Palace Jodhpur is a premier 5-star hotel featuring spectacular palatial architecture, ornate inner courtyards, hand-carved pillars, and exquisite stone work. Spread over manicured grounds near the airport, the hotel boasts 80 opulent rooms, a state-of-the-art health club, pool, spa, and grand banquet halls. Gen-Z Laundry manages high-volume hospitality linens and banquet uniforms to the highest luxury standards.',
    gallery: [
      {
        src:     'public/indana_palace/indana_palace1.jpeg',
        fallbackBg: 'linear-gradient(135deg,#78350f,#92400e,#b45309)',
        fallbackIcon: 'fas fa-crown',
        caption: 'Indana Palace — Palatial Architecture & Courtyards'
      },
      {
        src:     'public/indana_palace/indana_palace2.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1a0a00,#5c2d00,#78350f)',
        fallbackIcon: 'fas fa-bed',
        caption: 'Palatial Rooms — Crisp Linen by GenZ Laundry'
      },
      {
        src:     'public/indana_palace/indana_palace3.jpeg',
        fallbackBg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)',
        fallbackIcon: 'fas fa-swimmer',
        caption: 'Grand Pool Area — Soft Absorbent Towels'
      },
      {
        src:     'public/indana_palace/indana_palace4.jpeg',
        fallbackBg: 'linear-gradient(135deg,#134e4a,#0f766e,#14b8a6)',
        fallbackIcon: 'fas fa-tshirt',
        caption: 'Guest Wardrobe — Premium Eco-Friendly Care'
      },
      {
        src:     'public/indana_palace/indana_palace5.jpeg',
        fallbackBg: 'linear-gradient(135deg,#4c1d95,#6d28d9,#8b5cf6)',
        fallbackIcon: 'fas fa-user-tie',
        caption: 'Immaculate Staff Uniforms'
      },
      {
        src:     'public/indana_palace/indana_palace6.jpeg',
        fallbackBg: 'linear-gradient(135deg,#7f1d1d,#991b1b,#dc2626)',
        fallbackIcon: 'fas fa-utensils',
        caption: 'Royal Dining & Banquet Table Linen'
      },
      {
        src:     'public/indana_palace/indana_palace7.jpeg',
        fallbackBg: 'linear-gradient(135deg,#334155,#475569,#64748b)',
        fallbackIcon: 'fas fa-spa',
        caption: 'Spa robes & fluffy towels'
      }
    ],
    services: [
      { icon: 'fas fa-bed',       title: 'High-Volume Linen Care', desc: 'Washing, ironing, and delivery of bed linens, sheets, pillow covers at scale.' },
      { icon: 'fas fa-bath',      title: 'Resort Pool Towels',     desc: 'Soft, absorbent, sanitized pool and spa towels in high volume.' },
      { icon: 'fas fa-tshirt',    title: 'Guest Dry Cleaning',     desc: 'Express laundry and gentle dry cleaning for tourist and wedding guests.' },
      { icon: 'fas fa-user-tie',  title: 'Resort Staff Uniforms',  desc: 'Uniform processing for resort housekeeping, F&B, security, and reception staff.' },
      { icon: 'fas fa-store',     title: 'Curtains & Drapery',     desc: 'Periodic cleaning for grand lobbies and event hall curtains.' },
      { icon: 'fas fa-utensils',  title: 'Banquet & F&B Linen',    desc: 'Tablecloths, napkins, seat covers processed for royal banquets.' }
    ],
    highlights: [
      { icon: 'fas fa-bolt',       text: 'Express SLA for Destination Wedding Guests' },
      { icon: 'fas fa-shield-alt', text: 'Fully Insured — Up to ₹20,000 per Item' },
      { icon: 'fas fa-user-tie',   text: 'Dedicated Resort Account Manager, 24/7' },
      { icon: 'fas fa-leaf',       text: 'Eco-Friendly, Hypoallergenic Laundry Solutions' },
      { icon: 'fas fa-tag',        text: 'Bulk Volume Contracts & Monthly Billing' },
      { icon: 'fas fa-truck',      text: 'Heavy-Duty Logistics for Sprawling Estates' }
    ],
    reviews: [
      {
        name:       'Rajesh K. Verma',
        meta:       'Event Planner · 84 reviews',
        rating:     5,
        text:       'Organized a large destination wedding at Indana Palace. The table linen and banquet clothes handled by Gen-Z Laundry were pristine and delivered exactly on time.',
        when:       '2 weeks ago',
        ownerReply: 'Thank you, Rajesh! Large-scale wedding logistics is a specialty of our bulk service. 💙',
        replyWhen:  '1 week ago'
      }
    ],
    whatsapp: 'Hi%20Gen-Z%20Laundry!%20I%20am%20from%20Indana%20Palace%20Jodhpur%20and%20would%20like%20to%20discuss%20a%20laundry%20partnership.'
  }
};

// ── DOM references ──────────────────────────────────
const backdrop     = document.getElementById('hotelModalBackdrop');
const modalClose   = document.getElementById('hotelModalClose');
const galTrack     = document.getElementById('hmGalleryTrack');
const galDots      = document.getElementById('hmGalDots');
const galPrev      = document.getElementById('hmGalPrev');
const galNext      = document.getElementById('hmGalNext');

let currentGallery = [];
let currentSlide   = 0;
let autoSlideTimer = null;

// ── Open modal ──────────────────────────────────────
function openHotelModal(hotelKey) {
  const data = HOTELS[hotelKey];
  if (!data) return;

  // Populate header
  const tierEl = document.getElementById('hmTier');
  tierEl.textContent  = data.tier;
  tierEl.className    = 'hm-tier ' + data.tierClass;
  document.getElementById('hmStars').textContent    = data.stars;
  document.getElementById('modalHotelName').textContent = data.name;
  document.getElementById('hmLocation').querySelector('span').textContent = data.location;
  document.getElementById('hmTagline').textContent  = data.tagline;
  document.getElementById('hmAbout').textContent    = data.about;

  // Build gallery
  currentGallery = data.gallery;
  currentSlide   = 0;
  buildGallery(data.gallery);

  // Build services
  const svcGrid = document.getElementById('hmServicesGrid');
  svcGrid.innerHTML = data.services.map(s => `
    <div class="hm-svc-item">
      <div class="hm-svc-icon"><i class="${s.icon}"></i></div>
      <div>
        <strong>${s.title}</strong>
        <span>${s.desc}</span>
      </div>
    </div>
  `).join('');

  // Build highlights
  const hlGrid = document.getElementById('hmHighlights');
  hlGrid.innerHTML = data.highlights.map(h => `
    <div class="hm-highlight-item">
      <i class="${h.icon}"></i>
      <span>${h.text}</span>
    </div>
  `).join('');

  // Build reviews (if any)
  const reviewsSection = document.getElementById('hmReviewsSection');
  const reviewsGrid    = document.getElementById('hmReviewsGrid');
  if (data.reviews && data.reviews.length && reviewsSection && reviewsGrid) {
    reviewsGrid.innerHTML = data.reviews.map(r => `
      <div class="hm-review-card">
        <div class="hm-review-top">
          <div class="hm-reviewer-avatar">${r.name.charAt(0).toUpperCase()}</div>
          <div class="hm-reviewer-info">
            <strong>${r.name}</strong>
            <span>${r.meta}</span>
          </div>
          <div class="hm-review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        </div>
        <p class="hm-review-text">"${r.text}"</p>
        <div class="hm-review-when"><i class="fas fa-clock"></i> ${r.when}</div>
        ${r.ownerReply ? `
        <div class="hm-owner-reply">
          <div class="hm-owner-reply-header"><i class="fas fa-store"></i> <strong>Gen-Z Laundry Owner</strong> · <span>${r.replyWhen || '1 week ago'}</span></div>
          <p>${r.ownerReply}</p>
        </div>` : ''}
      </div>
    `).join('');
    reviewsSection.style.display = 'block';
  } else if (reviewsSection) {
    reviewsSection.style.display = 'none';
  }

  // WhatsApp link
  document.getElementById('hmWhatsApp').href =
    `https://api.whatsapp.com/send/?phone=918233853727&text=${data.whatsapp}`;

  // Show modal
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Auto-advance gallery
  startAutoSlide();

  // Scroll modal to top
  document.getElementById('hotelModalInner').scrollTop = 0;
}

// ── Close modal ─────────────────────────────────────
function closeHotelModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  stopAutoSlide();
  // Pause any playing video
  document.querySelectorAll('.hm-gallery-slide video').forEach(function(v) {
    v.pause();
    v.currentTime = 0;
  });
  document.querySelectorAll('.hm-video-play-btn').forEach(function(b) {
    b.style.display = 'flex';
  });
}

// ── Gallery builder ──────────────────────────────────
function buildGallery(slides) {
  galTrack.innerHTML = '';
  galDots.innerHTML  = '';

  slides.forEach(function(slide, i) {
    var div = document.createElement('div');
    div.className = 'hm-gallery-slide';
    div.dataset.index = i;
    div.style.background = slide.fallbackBg || '#1e293b';

    if (slide.type === 'video') {
      // ── Video slide ──────────────────────────────
      var video = document.createElement('video');
      video.src           = slide.src;
      video.muted         = true;
      video.loop          = false;
      video.playsInline   = true;
      video.controls      = false;
      video.preload       = 'metadata';
      video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';

      // Play icon overlay (shown before play)
      var playBtn = document.createElement('button');
      playBtn.className   = 'hm-video-play-btn';
      playBtn.innerHTML   = '<i class="fas fa-play"></i>';
      playBtn.setAttribute('aria-label', 'Play video');

      // When video ends — show play button again, restart auto-slide
      video.addEventListener('ended', function() {
        playBtn.style.display = 'flex';
        startAutoSlide();
      });

      // Click play button — play video, pause auto-slide
      playBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        playBtn.style.display = 'none';
        video.play();
        stopAutoSlide();
      });

      // Error fallback
      video.onerror = function() {
        div.style.background = slide.fallbackBg || '#1e293b';
        div.innerHTML = '<i class="' + (slide.fallbackIcon || 'fas fa-video') + '" style="font-size:4.5rem;color:rgba(255,255,255,0.1);"></i>';
        if (slide.caption) appendCaption(div, slide.caption);
      };

      div.appendChild(video);
      div.appendChild(playBtn);

      // Video badge
      var badge = document.createElement('div');
      badge.className = 'hm-video-badge';
      badge.innerHTML = '<i class="fas fa-film"></i> Video';
      div.appendChild(badge);

      if (slide.caption) appendCaption(div, slide.caption);

    } else if (slide.src) {
      // ── Image slide ──────────────────────────────
      var img = document.createElement('img');
      img.alt = slide.caption || '';
      img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';

      img.onerror = function() {
        div.style.background = slide.fallbackBg || '#1e293b';
        div.innerHTML = '<i class="' + (slide.fallbackIcon || 'fas fa-image') + '" style="font-size:4.5rem;color:rgba(255,255,255,0.1);"></i>';
        if (slide.caption) appendCaption(div, slide.caption);
      };

      img.onload = function() {
        if (slide.caption) appendCaption(div, slide.caption);
      };

      img.src = slide.src;
      div.appendChild(img);

    } else {
      // ── Gradient fallback slide ───────────────────
      div.style.background = slide.fallbackBg || slide.bg || '#1e293b';
      div.innerHTML = '<i class="' + (slide.fallbackIcon || slide.icon || 'fas fa-image') + '" style="font-size:4.5rem;color:rgba(255,255,255,0.1);"></i>';
      if (slide.caption) appendCaption(div, slide.caption);
    }

    galTrack.appendChild(div);

    // Dot button
    var dot = document.createElement('button');
    dot.className = 'hm-gal-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    // First dot gets a video icon
    if (slide.type === 'video') dot.innerHTML = '<i class="fas fa-play" style="font-size:0.45rem;"></i>';
    dot.addEventListener('click', function() { goToSlide(i); restartAutoSlide(); });
    galDots.appendChild(dot);
  });

  goToSlide(0, false);
}

function appendCaption(parent, text) {
  // Avoid duplicate captions
  if (parent.querySelector('.hm-caption')) return;
  var cap = document.createElement('div');
  cap.className = 'hm-caption';
  cap.style.cssText = 'position:absolute;bottom:0;left:0;right:0;padding:14px 20px;background:linear-gradient(transparent,rgba(0,0,0,0.72));color:rgba(255,255,255,0.9);font-size:0.78rem;font-weight:500;line-height:1.4;pointer-events:none;';
  cap.textContent = text;
  parent.appendChild(cap);
}

function goToSlide(idx, animate) {
  if (animate === false) {
    galTrack.style.transition = 'none';
  } else {
    galTrack.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  }

  // Pause any playing video when leaving its slide
  var prevSlide = galTrack.querySelectorAll('.hm-gallery-slide')[currentSlide];
  if (prevSlide) {
    var prevVideo = prevSlide.querySelector('video');
    var prevPlayBtn = prevSlide.querySelector('.hm-video-play-btn');
    if (prevVideo && !prevVideo.paused) {
      prevVideo.pause();
      prevVideo.currentTime = 0;
      if (prevPlayBtn) prevPlayBtn.style.display = 'flex';
    }
  }

  currentSlide = (idx + currentGallery.length) % currentGallery.length;
  galTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
  galDots.querySelectorAll('.hm-gal-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === currentSlide);
  });
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideTimer = setInterval(function() {
    goToSlide(currentSlide + 1);
  }, 3500);
}

function stopAutoSlide() {
  if (autoSlideTimer) { clearInterval(autoSlideTimer); autoSlideTimer = null; }
}

// ── Gallery controls ─────────────────────────────────
if (galPrev) {
  galPrev.addEventListener('click', function() {
    goToSlide(currentSlide - 1);
    restartAutoSlide();
  });
}
if (galNext) {
  galNext.addEventListener('click', function() {
    goToSlide(currentSlide + 1);
    restartAutoSlide();
  });
}

function restartAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Touch swipe for gallery
(function() {
  const gallery = document.getElementById('hmGallery');
  if (!gallery) return;
  let startX = 0;
  gallery.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
  gallery.addEventListener('touchend', function(e) {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
      restartAutoSlide();
    }
  }, { passive: true });
})();

// ── Event bindings ────────────────────────────────────
if (modalClose) {
  modalClose.addEventListener('click', closeHotelModal);
}

if (backdrop) {
  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) closeHotelModal();
  });
}

document.addEventListener('keydown', function(e) {
  if (!backdrop || !backdrop.classList.contains('open')) return;
  if (e.key === 'Escape') closeHotelModal();
  if (e.key === 'ArrowLeft')  { goToSlide(currentSlide - 1); restartAutoSlide(); }
  if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); restartAutoSlide(); }
});

// ── Wire up hotel cards ──────────────────────────────
document.querySelectorAll('.hotel-card[data-hotel]').forEach(function(card) {
  card.addEventListener('click',   function() { openHotelModal(card.dataset.hotel); });
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openHotelModal(card.dataset.hotel);
    }
  });
});

// ── View More toggle implementation ──────────────────
document.addEventListener('DOMContentLoaded', function() {
  const btnViewMore = document.getElementById('btnViewMore');
  const viewMoreContainer = document.getElementById('viewMoreContainer');
  if (btnViewMore && viewMoreContainer) {
    btnViewMore.addEventListener('click', function() {
      const hiddenCards = document.querySelectorAll('.hotel-card-hidden');
      hiddenCards.forEach(function(card, idx) {
        // Set staggered delay for premium feel
        card.style.animationDelay = (idx * 0.1) + 's';
        card.classList.remove('hotel-card-hidden');
        card.classList.add('hotel-card-reveal');
      });
      // Hide the view more button container
      viewMoreContainer.style.display = 'none';
    });
  }
});

