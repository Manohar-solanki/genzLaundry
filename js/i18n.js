// Enhanced Internationalization System
class I18nSystem {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.translations = {};
        this.callbacks = [];
        this.init();
    }

    // Detect user's preferred language
    detectLanguage() {
        // Check localStorage first
        const saved = localStorage.getItem('genZ-language');
        if (saved) return saved;

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('hi')) return 'hi';

        // Check if user is likely from India (default to Hindi)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
            return 'hi';
        }

        return 'en'; // Default fallback
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageToggle();
        this.applyTranslations();
        this.setupLanguageDetection();
    }

    async loadTranslations() {
        this.translations = {
            en: {
                // Navigation
                nav: {
                    home: "Home",
                    services: "Services",
                    pricing: "Pricing",
                    about: "About",
                    contact: "Contact",
                    bookNow: "Book Now"
                },

                // Hero Section
                hero: {
                    title: "Premium Laundry &",
                    titleHighlight: "Dry Cleaning",
                    titleSuffix: "Service",
                    subtitle: "⚡ Jodhpur's First Express Laundry Service - Lightning-fast 4-hour delivery, premium care, and eco-friendly cleaning that fits your busy lifestyle!",
                    bookPickup: "Book Pickup Now",
                    callNow: "Call Now",
                    features: {
                        pickup: "Express Pickup & Delivery in 4 Hours",
                        eco: "Free Steam Iron",
                        service: "24 Hour Service"
                    },
                    card: {
                        title: "Professional Care",
                        subtitle: "Expert handling of all fabric types with modern technology"
                    }
                },

                // Services
                services: {
                    title: "Our Premium Services",
                    subtitle: "🌟 Complete laundry solutions for all your needs with modern technology",
                    washFold: {
                        title: "Wash & Fold",
                        description: "Regular laundry service with professional washing, drying, and folding using premium detergents",
                        features: ["Cotton & synthetic fabrics", "Advanced stain treatment", "Premium fabric softener", "Hygienic packaging"]
                    },
                    dryCleaning: {
                        title: "Dry Cleaning",
                        description: "Specialized cleaning for delicate and formal garments with eco-friendly solvents",
                        features: ["Suits & formal wear", "Silk & delicate fabrics", "Wedding dresses & sarees", "Leather & suede items"],
                        badge: "Most Popular"
                    },
                    ironing: {
                        title: "Premium Ironing",
                        description: "Professional pressing and ironing for crisp, wrinkle-free clothes with expert techniques",
                        features: ["Steam pressing technology", "Shirt & trouser creasing", "Hanging service included", "Starch on request"]
                    },
                    textiles: {
                        title: "Home Textiles",
                        description: "Specialized cleaning service for household items and large textiles with care",
                        features: ["Bed sheets & pillows", "Curtains & drapes", "Blankets & comforters", "Carpets & rugs"]
                    }
                },

                // How it Works
                howItWorks: {
                    title: "How It Works",
                    subtitle: "Simple 3-step process for hassle-free laundry",
                    steps: [
                        {
                            title: "Schedule Pickup",
                            description: "Book online or call us to schedule a convenient pickup time"
                        },
                        {
                            title: "We Clean",
                            description: "Professional cleaning with eco-friendly products and expert care"
                        },
                        {
                            title: "Fresh Delivery",
                            description: "Clean, fresh clothes delivered back to your doorstep"
                        }
                    ]
                },

                // Pricing
                pricing: {
                    title: "Transparent Pricing",
                    subtitle: "No hidden charges, competitive rates",
                    dryCleaningNotice: {
                        title: "Dry Cleaning Services",
                        description: "For premium dry cleaning services, pricing is customized based on garment type and fabric.",
                        callText: "Call us now for an instant quote!"
                    },
                    washFold: {
                        title: "Wash & Fold",
                        price: "₹30",
                        unit: "/piece",
                        features: ["Regular cotton clothes", "Washing & drying", "Folding included", "Stain treatment"]
                    },
                    dryCleaning: {
                        title: "Dry Cleaning",
                        price: "₹160",
                        unit: "/piece",
                        features: ["Suits & formal wear", "Delicate fabrics", "Professional pressing", "Starch on request"],
                        badge: "Best Value"
                    },
                    ironing: {
                        title: "Ironing Only",
                        price: "₹16",
                        unit: "/piece",
                        features: ["Steam pressing", "Crease setting", "Hanging service", "Quick turnaround"]
                    },
                    note: "Free pickup and delivery for orders above ₹600"
                },

                // About
                about: {
                    title: "Why Choose GenZ Laundry?",
                    subtitle: "We're Jodhpur's premier laundry service, committed to providing exceptional garment care with modern technology and traditional attention to detail.",
                    features: [
                        {
                            title: "Insured Service",
                            description: "Your garments are fully insured during our care"
                        },
                        {
                            title: "Eco-Friendly",
                            description: "Biodegradable detergents and sustainable practices"
                        },
                        {
                            title: "Quick Turnaround",
                            description: "24-48 hour service for most items"
                        }
                    ],
                    stats: {
                        customers: "Happy Customers",
                        orders: "Orders Completed",
                        satisfaction: "Satisfaction Rate"
                    }
                },

                // Contact
                contact: {
                    title: "Get In Touch",
                    subtitle: "Ready to experience premium laundry service?",
                    info: {
                        phone: "Phone",
                        whatsapp: "WhatsApp",
                        whatsappText: "Chat with us",
                        email: "Email",
                        serviceArea: "Service Area",
                        serviceAreaText: "Jodhpur & surrounding areas"
                    },
                    form: {
                        title: "✨ Book Your Pickup",
                        subtitle: "Fill in your details and we'll contact you within 30 minutes!",
                        name: "👤 Full Name",
                        phone: "📱 Phone Number",
                        address: "📍 Pickup Address",
                        service: "🔽 Select Service",
                        services: {
                            washFold: "🧺 Wash & Fold",
                            dryCleaning: "👔 Dry Cleaning",
                            ironing: "🔥 Ironing Only",
                            textiles: "🏠 Home Textiles"
                        },
                        submit: "Schedule Pickup Now",
                        security: "🔒 Your information is secure and will only be used for service purposes"
                    },
                    map: {
                        title: "Our Service Location",
                        description: "📍 We provide pickup and delivery services across Jodhpur"
                    }
                },

                // Footer
                footer: {
                    description: "Premium laundry and dry cleaning service in Jodhpur. Professional garment care delivered to your doorstep.",
                    quickLinks: "Quick Links",
                    contactInfo: "Contact Info",
                    copyright: "© 2025 GenZ Laundry. All rights reserved."
                },

                // Common
                common: {
                    learnMore: "Learn More",
                    bookNow: "Book Now",
                    callNow: "Call Now",
                    whatsapp: "WhatsApp"
                },

                // Price Calculator
                calculator: {
                    title: "Price Calculator",
                    subtitle: "💰 Get instant price estimates for your laundry needs",
                    formTitle: "Calculate Your Order Cost",
                    shirts: "👔 Shirts",
                    pants: "👖 Pants/Trousers",
                    suits: "🤵 Suits (Dry Clean)",
                    sarees: "👘 Sarees",
                    bedsheets: "🛏️ Bed Sheets",
                    blankets: "🛌 Blankets",
                    subtotal: "Subtotal:",
                    delivery: "Delivery Fee:",
                    total: "Total:",
                    freeDelivery: "🚚 Free delivery on orders above ₹600",
                    bookNow: "Book These Items"
                },

                // Reviews
                reviews: {
                    title: "What Our Customers Say",
                    subtitle: "⭐ Real reviews from satisfied customers across Jodhpur"
                },

                // FAQ
                faq: {
                    title: "Frequently Asked Questions",
                    subtitle: "❓ Quick answers to common questions",
                    q1: {
                        question: "What areas do you serve in Jodhpur?",
                        answer: "We provide pickup and delivery services across all major areas of Jodhpur including Shastri Nagar, Ratanada, Paota, Chopasni, Sardarpura, and surrounding localities."
                    },
                    q2: {
                        question: "How long does it take to clean clothes?",
                        answer: "Regular wash & fold takes 24-48 hours. Dry cleaning typically takes 2-3 days. Express service available for urgent orders with additional charges."
                    },
                    q3: {
                        question: "Do you handle delicate fabrics like silk and wool?",
                        answer: "Yes! We specialize in delicate fabrics including silk, wool, cashmere, and ethnic wear. Our expert team uses appropriate cleaning methods for each fabric type."
                    },
                    q4: {
                        question: "What if my clothes get damaged?",
                        answer: "All garments are fully insured during our care. In the rare event of damage, we provide fair compensation based on the garment's value."
                    },
                    q5: {
                        question: "Do you offer same-day service?",
                        answer: "Same-day service is available for urgent orders with 50% additional charges. Please call us before 10 AM for same-day pickup and delivery."
                    },
                    q6: {
                        question: "What payment methods do you accept?",
                        answer: "We accept cash on delivery, UPI payments (PhonePe, Google Pay, Paytm), and bank transfers. Payment is collected at the time of delivery."
                    }
                },

                // Gallery
                gallery: {
                    title: "Our Work Gallery",
                    subtitle: "📸 See the quality of our professional cleaning services"
                }
            },

            hi: {
                // Navigation
                nav: {
                    home: "होम",
                    services: "सेवाएं",
                    pricing: "मूल्य",
                    about: "हमारे बारे में",
                    contact: "संपर्क",
                    bookNow: "बुक करें"
                },

                // Hero Section  
                hero: {
                    title: "प्रीमियम लॉन्ड्री और",
                    titleHighlight: "ड्राई क्लीनिंग",
                    titleSuffix: "सेवा",
                    subtitle: "⚡ जोधपुर की पहली एक्सप्रेस लॉन्ड्री सेवा - बिजली की तेज़ 4 घंटे की डिलीवरी, प्रीमियम देखभाल, और पर्यावरण-अनुकूल सफाई जो आपकी व्यस्त जीवनशैली के अनुकूल है!",
                    bookPickup: "अभी पिकअप बुक करें",
                    callNow: "अभी कॉल करें",
                    features: {
                        pickup: "4 घंटे में एक्सप्रेस पिकअप और डिलीवरी",
                        eco: "मुफ्त स्टीम आयरन",
                        service: "24 घंटे की सेवा"
                    },
                    card: {
                        title: "पेशेवर देखभाल",
                        subtitle: "आधुनिक तकनीक के साथ सभी प्रकार के कपड़ों की विशेषज्ञ हैंडलिंग"
                    }
                },

                // Services
                services: {
                    title: "हमारी प्रीमियम सेवाएं",
                    subtitle: "🌟 आधुनिक तकनीक के साथ आपकी सभी जरूरतों के लिए संपूर्ण लॉन्ड्री समाधान",
                    washFold: {
                        title: "धुलाई और तह",
                        description: "प्रीमियम डिटर्जेंट का उपयोग करके पेशेवर धुलाई, सुखाने और तह के साथ नियमित लॉन्ड्री सेवा",
                        features: ["सूती और सिंथेटिक कपड़े", "उन्नत दाग उपचार", "प्रीमियम फैब्रिक सॉफ्टनर", "स्वच्छ पैकेजिंग"]
                    },
                    dryCleaning: {
                        title: "ड्राई क्लीनिंग",
                        description: "पर्यावरण-अनुकूल सॉल्वेंट्स के साथ नाजुक और औपचारिक कपड़ों के लिए विशेष सफाई",
                        features: ["सूट और औपचारिक पोशाक", "रेशम और नाजुक कपड़े", "शादी के कपड़े और साड़ियां", "चमड़े और साबर के सामान"],
                        badge: "सबसे लोकप्रिय"
                    },
                    ironing: {
                        title: "प्रीमियम इस्त्री",
                        description: "विशेषज्ञ तकनीकों के साथ कुरकुरे, झुर्री-मुक्त कपड़ों के लिए पेशेवर प्रेसिंग और इस्त्री",
                        features: ["स्टीम प्रेसिंग तकनीक", "शर्ट और पैंट की क्रीजिंग", "हैंगिंग सेवा शामिल", "अनुरोध पर स्टार्च"]
                    },
                    textiles: {
                        title: "घरेलू वस्त्र",
                        description: "घरेलू सामान और बड़े वस्त्रों के लिए देखभाल के साथ विशेष सफाई सेवा",
                        features: ["बेड शीट और तकिए", "पर्दे और ड्रेप्स", "कंबल और रजाई", "कालीन और गलीचे"]
                    }
                },

                // How it Works
                howItWorks: {
                    title: "यह कैसे काम करता है",
                    subtitle: "परेशानी-मुक्त लॉन्ड्री के लिए सरल 3-चरणीय प्रक्रिया",
                    steps: [
                        {
                            title: "पिकअप शेड्यूल करें",
                            description: "ऑनलाइन बुक करें या हमें कॉल करके सुविधाजनक पिकअप समय निर्धारित करें"
                        },
                        {
                            title: "हम साफ करते हैं",
                            description: "पर्यावरण-अनुकूल उत्पादों और विशेषज्ञ देखभाल के साथ पेशेवर सफाई"
                        },
                        {
                            title: "ताजी डिलीवरी",
                            description: "साफ, ताजे कपड़े वापस आपके दरवाजे पर पहुंचाए जाते हैं"
                        }
                    ]
                },

                // Pricing
                pricing: {
                    title: "पारदर्शी मूल्य निर्धारण",
                    subtitle: "कोई छुपी हुई फीस नहीं, प्रतिस्पर्धी दरें",
                    dryCleaningNotice: {
                        title: "ड्राई क्लीनिंग सेवाएं",
                        description: "प्रीमियम ड्राई क्लीनिंग सेवाओं के लिए, मूल्य निर्धारण कपड़े के प्रकार और फैब्रिक के आधार पर अनुकूलित किया जाता है।",
                        callText: "तुरंत कोटेशन के लिए अभी कॉल करें!"
                    },
                    washFold: {
                        title: "धुलाई और तह",
                        price: "₹30",
                        unit: "/पीस",
                        features: ["नियमित सूती कपड़े", "धुलाई और सुखाना", "तह शामिल", "दाग उपचार"]
                    },
                    dryCleaning: {
                        title: "ड्राई क्लीनिंग",
                        price: "₹160",
                        unit: "/पीस",
                        features: ["सूट और औपचारिक पोशाक", "नाजुक कपड़े", "पेशेवर प्रेसिंग", "अनुरोध पर स्टार्च"],
                        badge: "सर्वोत्तम मूल्य"
                    },
                    ironing: {
                        title: "केवल इस्त्री",
                        price: "₹16",
                        unit: "/पीस",
                        features: ["स्टीम प्रेसिंग", "क्रीज सेटिंग", "हैंगिंग सेवा", "त्वरित टर्नअराउंड"]
                    },
                    note: "₹600 से अधिक के ऑर्डर पर मुफ्त पिकअप और डिलीवरी"
                },

                // About
                about: {
                    title: "GenZ लॉन्ड्री क्यों चुनें?",
                    subtitle: "हम जोधपुर की प्रमुख लॉन्ड्री सेवा हैं, आधुनिक तकनीक और पारंपरिक ध्यान के साथ असाधारण कपड़े की देखभाल प्रदान करने के लिए प्रतिबद्ध हैं।",
                    features: [
                        {
                            title: "बीमाकृत सेवा",
                            description: "हमारी देखभाल के दौरान आपके कपड़े पूरी तरह से बीमाकृत हैं"
                        },
                        {
                            title: "पर्यावरण-अनुकूल",
                            description: "बायोडिग्रेडेबल डिटर्जेंट और टिकाऊ प्रथाएं"
                        },
                        {
                            title: "त्वरित टर्नअराउंड",
                            description: "अधिकांश वस्तुओं के लिए 24-48 घंटे की सेवा"
                        }
                    ],
                    stats: {
                        customers: "खुश ग्राहक",
                        orders: "पूर्ण ऑर्डर",
                        satisfaction: "संतुष्टि दर"
                    }
                },

                // Contact
                contact: {
                    title: "संपर्क में रहें",
                    subtitle: "प्रीमियम लॉन्ड्री सेवा का अनुभव करने के लिए तैयार हैं?",
                    info: {
                        phone: "फोन",
                        whatsapp: "व्हाट्सऐप",
                        whatsappText: "हमसे चैट करें",
                        email: "ईमेल",
                        serviceArea: "सेवा क्षेत्र",
                        serviceAreaText: "जोधपुर और आसपास के क्षेत्र"
                    },
                    form: {
                        title: "✨ अपना पिकअप बुक करें",
                        subtitle: "अपनी जानकारी भरें और हम 30 मिनट के भीतर आपसे संपर्क करेंगे!",
                        name: "👤 पूरा नाम",
                        phone: "📱 फोन नंबर",
                        address: "📍 पिकअप पता",
                        service: "🔽 सेवा चुनें",
                        services: {
                            washFold: "🧺 धुलाई और तह",
                            dryCleaning: "👔 ड्राई क्लीनिंग",
                            ironing: "🔥 केवल इस्त्री",
                            textiles: "🏠 घरेलू वस्त्र"
                        },
                        submit: "अभी पिकअप शेड्यूल करें",
                        security: "🔒 आपकी जानकारी सुरक्षित है और केवल सेवा उद्देश्यों के लिए उपयोग की जाएगी"
                    },
                    map: {
                        title: "हमारा सेवा स्थान",
                        description: "📍 हम जोधपुर भर में पिकअप और डिलीवरी सेवाएं प्रदान करते हैं"
                    }
                },

                // Footer
                footer: {
                    description: "जोधपुर में प्रीमियम लॉन्ड्री और ड्राई क्लीनिंग सेवा। आपके दरवाजे तक पेशेवर कपड़े की देखभाल।",
                    quickLinks: "त्वरित लिंक",
                    contactInfo: "संपर्क जानकारी",
                    copyright: "© 2025 GenZ लॉन्ड्री। सभी अधिकार सुरक्षित।"
                },

                // Common
                common: {
                    learnMore: "और जानें",
                    bookNow: "अभी बुक करें",
                    callNow: "अभी कॉल करें",
                    whatsapp: "व्हाट्सऐप"
                },

                // Price Calculator
                calculator: {
                    title: "मूल्य कैलकुलेटर",
                    subtitle: "💰 अपनी लॉन्ड्री आवश्यकताओं के लिए तुरंत मूल्य अनुमान प्राप्त करें",
                    formTitle: "अपने ऑर्डर की लागत की गणना करें",
                    shirts: "👔 शर्ट",
                    pants: "👖 पैंट/ट्राउजर",
                    suits: "🤵 सूट (ड्राई क्लीन)",
                    sarees: "👘 साड़ियां",
                    bedsheets: "🛏️ बेड शीट",
                    blankets: "🛌 कंबल",
                    subtotal: "उप-योग:",
                    delivery: "डिलीवरी शुल्क:",
                    total: "कुल:",
                    freeDelivery: "🚚 ₹600 से अधिक के ऑर्डर पर मुफ्त डिलीवरी",
                    bookNow: "इन वस्तुओं को बुक करें"
                },

                // Reviews
                reviews: {
                    title: "हमारे ग्राहक क्या कहते हैं",
                    subtitle: "⭐ जोधपुर भर के संतुष्ट ग्राहकों की वास्तविक समीक्षाएं"
                },

                // FAQ
                faq: {
                    title: "अक्सर पूछे जाने वाले प्रश्न",
                    subtitle: "❓ सामान्य प्रश्नों के त्वरित उत्तर",
                    q1: {
                        question: "आप जोधपुर में कौन से क्षेत्रों में सेवा देते हैं?",
                        answer: "हम जोधपुर के सभी प्रमुख क्षेत्रों में पिकअप और डिलीवरी सेवाएं प्रदान करते हैं जिनमें शास्त्री नगर, रतनाडा, पाओटा, चोपासनी, सरदारपुरा और आसपास के इलाके शामिल हैं।"
                    },
                    q2: {
                        question: "कपड़े साफ करने में कितना समय लगता है?",
                        answer: "नियमित धुलाई और तह में 24-48 घंटे लगते हैं। ड्राई क्लीनिंग में आमतौर पर 2-3 दिन लगते हैं। अतिरिक्त शुल्क के साथ तत्काल ऑर्डर के लिए एक्सप्रेस सेवा उपलब्ध है।"
                    },
                    q3: {
                        question: "क्या आप रेशम और ऊन जैसे नाजुक कपड़ों को संभालते हैं?",
                        answer: "हां! हम रेशम, ऊन, कश्मीरी और जातीय पोशाक सहित नाजुक कपड़ों में विशेषज्ञ हैं। हमारी विशेषज्ञ टीम प्रत्येक कपड़े के प्रकार के लिए उपयुक्त सफाई विधियों का उपयोग करती है।"
                    },
                    q4: {
                        question: "यदि मेरे कपड़े क्षतिग्रस्त हो जाएं तो क्या होगा?",
                        answer: "हमारी देखभाल के दौरान सभी कपड़े पूरी तरह से बीमाकृत हैं। क्षति की दुर्लभ घटना में, हम कपड़े के मूल्य के आधार पर उचित मुआवजा प्रदान करते हैं।"
                    },
                    q5: {
                        question: "क्या आप उसी दिन सेवा प्रदान करते हैं?",
                        answer: "50% अतिरिक्त शुल्क के साथ तत्काल ऑर्डर के लिए उसी दिन सेवा उपलब्ध है। कृपया उसी दिन पिकअप और डिलीवरी के लिए सुबह 10 बजे से पहले हमें कॉल करें।"
                    },
                    q6: {
                        question: "आप कौन से भुगतान तरीके स्वीकार करते हैं?",
                        answer: "हम कैश ऑन डिलीवरी, UPI भुगतान (PhonePe, Google Pay, Paytm), और बैंक ट्रांसफर स्वीकार करते हैं। भुगतान डिलीवरी के समय एकत्र किया जाता है।"
                    }
                },

                // Gallery
                gallery: {
                    title: "हमारी कार्य गैलरी",
                    subtitle: "📸 हमारी पेशेवर सफाई सेवाओं की गुणवत्ता देखें"
                }
            }
        };
    }

    createLanguageToggle() {
        const header = document.querySelector('.nav-menu');
        if (!header) return;

        const langToggle = document.createElement('li');
        langToggle.className = 'language-toggle';
        langToggle.innerHTML = `
            <button class="lang-switch" aria-label="Toggle Language">
                <span class="lang-switch-track">
                    <span class="lang-switch-option" data-lang="en">EN</span>
                    <span class="lang-switch-option" data-lang="hi">हिं</span>
                    <span class="lang-switch-slider"></span>
                </span>
            </button>
        `;

        header.appendChild(langToggle);

        const switchBtn = langToggle.querySelector('.lang-switch');
        const slider = langToggle.querySelector('.lang-switch-slider');
        const options = langToggle.querySelectorAll('.lang-switch-option');

        // Set initial position
        if (this.currentLanguage === 'hi') {
            slider.style.transform = 'translateX(100%)';
        }

        // Toggle on click
        switchBtn.addEventListener('click', () => {
            const newLang = this.currentLanguage === 'en' ? 'hi' : 'en';
            this.setLanguage(newLang);
        });

        // Click individual options
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setLanguage(opt.dataset.lang);
            });
        });
    }

    setLanguage(lang) {
        if (lang !== 'en' && lang !== 'hi') return;

        this.currentLanguage = lang;
        localStorage.setItem('genZ-language', lang);
        document.documentElement.lang = lang;

        this.applyTranslations();
        this.updateLanguageToggle();
        this.callbacks.forEach(callback => callback(lang));
    }

    updateLanguageToggle() {
        const slider = document.querySelector('.lang-switch-slider');
        if (slider) {
            slider.style.transform = this.currentLanguage === 'hi' ? 'translateX(100%)' : 'translateX(0)';
        }
        document.querySelectorAll('.lang-switch-option').forEach(opt => {
            const isActive = opt.dataset.lang === this.currentLanguage;
            opt.style.color = isActive ? '#2563EB' : '';
        });
    }

    applyTranslations() {
        const t = this.translations[this.currentLanguage];
        if (!t) return;

        // Apply translations to elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedValue(t, key);

            if (translation) {
                if (element.tagName === 'INPUT' && element.type !== 'submit') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page title
        document.title = this.currentLanguage === 'hi'
            ? 'GenZ लॉन्ड्री - जोधपुर में प्रीमियम लॉन्ड्री और ड्राई क्लीनिंग सेवा'
            : 'GenZ Laundry - Premium Laundry & Dry Cleaning Service in Jodhpur';
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    setupLanguageDetection() {
        // Auto-detect and set language without popup
        // Only show popup if user manually wants to change language later
        if (!localStorage.getItem('genZ-language-set')) {
            // Set default language based on detection without popup
            localStorage.setItem('genZ-language-set', 'true');
            // Language is already set in constructor based on detection
        }
    }

    // Remove the popup function - no longer needed
    // Language detection happens automatically in constructor

    onLanguageChange(callback) {
        this.callbacks.push(callback);
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    t(key) {
        return this.getNestedValue(this.translations[this.currentLanguage], key) || key;
    }
}

// Initialize the i18n system
const i18n = new I18nSystem();