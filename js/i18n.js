/**
 * Internationalization (i18n) Module
 * Handles language switching and content translation
 */

class I18n {
  constructor() {
    this.currentLanguage = 'en';
    this.content = {};
    this.callbacks = [];
    
    // Load saved language preference or default to English
    const savedLang = localStorage.getItem('laundrydone-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      this.currentLanguage = savedLang;
    }
  }

  /**
   * Initialize i18n system
   */
  async init() {
    try {
      // Load both language files
      const [enContent, hiContent] = await Promise.all([
        fetch('data/content-en.json').then(r => r.json()),
        fetch('data/content-hi.json').then(r => r.json())
      ]);

      this.content = {
        en: enContent,
        hi: hiContent
      };

      // Set initial language
      this.setLanguage(this.currentLanguage);
    } catch (error) {
      console.error('Error loading language files:', error);
      // Fallback: try to continue with empty content
      this.content = { en: {}, hi: {} };
    }
  }

  /**
   * Set the current language
   * @param {string} lang - Language code ('en' or 'hi')
   */
  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'hi') {
      console.warn(`Invalid language code: ${lang}. Defaulting to 'en'`);
      lang = 'en';
    }

    this.currentLanguage = lang;
    localStorage.setItem('laundrydone-language', lang);

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Update page direction if needed (Hindi uses LTR, but good practice)
    document.documentElement.setAttribute('dir', 'ltr');

    // Update all translatable elements
    this.updateContent();

    // Trigger callbacks
    this.callbacks.forEach(callback => callback(lang));
  }

  /**
   * Get translated text
   * @param {string} key - Dot-separated key path (e.g., 'nav.home')
   * @param {object} params - Optional parameters for string interpolation
   * @returns {string} Translated text
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.content[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Simple parameter replacement
    let translated = value;
    Object.keys(params).forEach(param => {
      translated = translated.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    });

    return translated;
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getLanguage() {
    return this.currentLanguage;
  }

  /**
   * Toggle between languages
   */
  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'hi' : 'en';
    this.setLanguage(newLang);
  }

  /**
   * Register a callback for language changes
   * @param {function} callback - Function to call when language changes
   */
  onLanguageChange(callback) {
    this.callbacks.push(callback);
  }

  /**
   * Update all content on the page
   */
  updateContent() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.t(key);
      
      if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
        element.placeholder = text;
      } else if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
        element.value = text;
      } else if (element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });

    // Update meta tags
    this.updateMetaTags();

    // Update page title
    this.updatePageTitle();
  }

  /**
   * Update meta tags
   */
  updateMetaTags() {
    const meta = this.content[this.currentLanguage]?.meta;
    if (!meta) return;

    // Update description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', meta.keywords);
  }

  /**
   * Update page title
   */
  updatePageTitle() {
    const meta = this.content[this.currentLanguage]?.meta;
    if (!meta) return;

    const pageTitle = document.querySelector('title');
    if (pageTitle) {
      const page = this.getCurrentPage();
      const pageKey = page === 'home' ? 'home' : page;
      const pageName = this.t(`nav.${pageKey}`) || page;
      pageTitle.textContent = `${meta.siteName} - ${pageName}`;
    }
  }

  /**
   * Get current page name from URL
   * @returns {string} Page name
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'home';
    return page === 'index.html' || page === '' ? 'home' : page;
  }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}

