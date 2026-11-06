(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),(function(){document.addEventListener(`DOMContentLoaded`,function(){let e=document.getElementById(`announcementBar`),t=document.getElementById(`annDismiss`);e&&t&&(localStorage.getItem(`genz_ann_dismissed`)===`true`?e.style.display=`none`:t.addEventListener(`click`,function(){e.style.display=`none`,localStorage.setItem(`genz_ann_dismissed`,`true`)}));let n=document.getElementById(`siteHeader`);window.addEventListener(`scroll`,function(){if(n&&(window.scrollY>40?n.classList.add(`scrolled`):n.classList.remove(`scrolled`),window.innerWidth<=768)){let e=document.querySelector(`.floating-wa`);e&&e.classList.toggle(`scrolled-visible`,window.scrollY>380)}},{passive:!0});let r=document.getElementById(`hamburgerBtn`),i=document.getElementById(`navMenu`),a=document.getElementById(`siteHeader`);if(r&&i){function e(){i.classList.remove(`active`),a&&a.classList.remove(`menu-open`),r.setAttribute(`aria-expanded`,`false`),r.innerHTML=`<i class="fas fa-bars"></i>`,document.body.style.overflow=``}r.addEventListener(`click`,function(e){e.stopPropagation();let t=i.classList.toggle(`active`);a&&a.classList.toggle(`menu-open`,t),r.setAttribute(`aria-expanded`,t?`true`:`false`),r.innerHTML=t?`<i class="fas fa-times"></i>`:`<i class="fas fa-bars"></i>`,document.body.style.overflow=t?`hidden`:``}),i.querySelectorAll(`a`).forEach(function(t){t.addEventListener(`click`,e)}),document.addEventListener(`keydown`,function(t){t.key===`Escape`&&i.classList.contains(`active`)&&e()})}let o=document.querySelectorAll(`.faq-item`);o.forEach(function(e){let t=e.querySelector(`.faq-header`)||e.querySelector(`.faq-header-btn`)||e.querySelector(`.faq-question`);t&&t.addEventListener(`click`,function(){let t=e.classList.contains(`active`);o.forEach(function(e){e.classList.remove(`active`)}),t||e.classList.add(`active`)})});let s=document.getElementById(`bookingForm`);s&&s.addEventListener(`submit`,function(e){e.preventDefault();let t=document.getElementById(`bookingName`)||document.getElementById(`name`),n=document.getElementById(`bookingPhone`)||document.getElementById(`phone`),r=document.getElementById(`bookingAddress`)||document.getElementById(`address`),i=document.getElementById(`bookingService`)||document.getElementById(`service`),a=document.getElementById(`bookingDate`),o=t?t.value.trim():``,c=n?n.value.trim():``,l=r?r.value.trim():``,u=i?i.value:``,d=a?a.value:``;if(!o){alert(`Please enter your full name.`),t&&t.focus();return}if(!c||!/^[6-9]\d{9}$/.test(c)){alert(`Please enter a valid 10-digit Indian phone number.`),n&&n.focus();return}if(!l){alert(`Please enter your hotel, hostel or doorstep pickup address in Jodhpur.`),r&&r.focus();return}if(!u){alert(`Please select a service.`),i&&i.focus();return}let f=`Hi Gen-Z Laundry Team! 👕✨\n\nI want to book a laundry pickup in Jodhpur:\n\n👤 Name: ${o}\n📞 Phone: ${c}\n📍 Address: ${l}\n🧺 Service: ${{"wash-fold":`Wash & Fold`,"wash-iron":`Wash & Iron`,"dry-cleaning":`Dry Cleaning`,express:`Express 6-Hour Service`,"shoe-cleaning":`Shoe Cleaning`,"sofa-cleaning":`Sofa Cleaning`,"steam-iron":`Steam Ironing`}[u]||u}`;d&&(f+=`\n📅 Preferred Date/Time: ${d}`),f+=`

Please confirm my pickup. Thank you!`;let p=`https://wa.me/918233853727?text=${encodeURIComponent(f)}`,m=s.querySelector(`button[type="submit"]`);if(m){let e=m.innerHTML;m.innerHTML=`<i class="fas fa-check-circle"></i> Opening WhatsApp...`,m.style.background=`#15803D`,setTimeout(function(){m.innerHTML=e,m.style.background=``,s.reset()},3e3)}window.open(p,`_blank`)});let c=document.querySelectorAll(`.svc-card-btn-wa[data-service]`),l={"Wash & Fold":`wash-fold`,"Wash & Steam Iron":`wash-iron`,"Delicate Dry Clean":`dry-cleaning`,"6-Hour Express":`express`,"Shoe Cleaning":`shoe-cleaning`,"Sofa Cleaning":`sofa-cleaning`};c.forEach(function(e){e.addEventListener(`click`,function(t){let n=e.getAttribute(`data-service`),r=l[n]||``,i=document.getElementById(`bookingService`);i&&r&&(i.value=r)})});let u=document.getElementById(`habCheckBtn`);u&&u.addEventListener(`click`,function(){let e=(document.getElementById(`habLocation`)||{}).value||``,t=(document.getElementById(`habService`)||{}).value||``,n=document.getElementById(`bookingAddress`),r=document.getElementById(`bookingService`);e&&n&&!n.value&&(n.value=e),t&&r&&(r.value=t.includes(`Fold`)?`wash-fold`:t.includes(`Dry Clean`)?`dry-cleaning`:t.includes(`Press`)||t.includes(`Iron`)?`wash-iron`:`wash-fold`)});let d=document.getElementById(`reviewsContainer`);d&&fetch(`data/reviews.json`).then(function(e){return e.json()}).then(function(e){e&&e.reviews&&e.reviews.length>0&&(d.innerHTML=e.reviews.map(function(e){return`
                <div class="review-card">
                  <div class="review-stars">★★★★★</div>
                  <p class="review-text">"${e.text}"</p>
                  <div class="review-author">
                    <div class="review-avatar" style="background:${e.avatarColor||`#2563EB`}">
                      ${e.avatarText||e.author.substring(0,2).toUpperCase()}
                    </div>
                    <div class="review-meta">
                      <strong>${e.author}</strong>
                      <span>${e.source} · ✓ Verified Customer</span>
                    </div>
                  </div>
                </div>
              `}).join(``))}).catch(function(e){console.log(`Using static review fallback:`,e)});let f=document.getElementById(`processVideoTrack`),p=document.getElementById(`processPrevBtn`),m=document.getElementById(`processNextBtn`),h=document.querySelectorAll(`.video-step-card`),g=document.querySelectorAll(`.step-nav-pill`),_=document.getElementById(`videoLightboxModal`),v=document.getElementById(`lightboxBackdrop`),y=document.getElementById(`lightboxCloseBtn`),b=document.getElementById(`lightboxVideoPlayer`),x=document.getElementById(`lightboxStepBadge`),S=document.getElementById(`lightboxTitle`),C=document.getElementById(`lightboxDesc`),w=document.getElementById(`modalPrevStepBtn`),T=document.getElementById(`modalNextStepBtn`),E=document.getElementById(`heroVideoActionBtn`)||document.getElementById(`heroVideoTeaserBtn`),D=1,O=h.length||10;function k(e){let t=document.querySelector(`.video-step-card[data-step="${e}"]`);return t?{step:e,video:t.getAttribute(`data-video`),title:t.getAttribute(`data-title`),desc:t.getAttribute(`data-desc`)}:null}function A(e){let t=k(e);if(!t||!_||!b)return;D=e,x.textContent=`STEP ${String(e).padStart(2,`0`)} OF ${String(O).padStart(2,`0`)}`,S.textContent=t.title,C.textContent=t.desc,b.pause(),b.innerHTML=`
        <source src="${t.video}" type="video/mp4">
        <source src="public/${t.video}" type="video/mp4">
      `,b.load(),b.currentTime=0,b.muted=!0,b.volume=0,_.classList.add(`active`),_.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`;let n=b.play();n!==void 0&&n.catch(function(){b.muted=!0,b.play()})}function j(){_&&b&&(_.classList.remove(`active`),_.setAttribute(`aria-hidden`,`true`),b.pause(),b.muted=!0,document.body.style.overflow=``)}if(y&&y.addEventListener(`click`,j),v&&v.addEventListener(`click`,j),document.addEventListener(`keydown`,function(e){e.key===`Escape`&&_&&_.classList.contains(`active`)&&j()}),w&&w.addEventListener(`click`,function(){A(D>1?D-1:O)}),T&&T.addEventListener(`click`,function(){A(D<O?D+1:1)}),h.forEach(function(e){e.addEventListener(`click`,function(){A(parseInt(e.getAttribute(`data-step`),10))})}),E&&E.addEventListener(`click`,function(e){let t=document.getElementById(`process`);t&&(e.preventDefault(),t.scrollIntoView({behavior:`smooth`}),setTimeout(function(){A(1)},600))}),g.forEach(function(e){e.addEventListener(`click`,function(){let t=e.getAttribute(`data-step`),n=document.querySelector(`.video-step-card[data-step="${t}"]`);if(n&&f){g.forEach(function(e){e.classList.remove(`active`),e.setAttribute(`aria-selected`,`false`)}),e.classList.add(`active`),e.setAttribute(`aria-selected`,`true`);let t=n.offsetLeft-f.offsetLeft-10;f.scrollTo({left:t,behavior:`smooth`})}})}),p&&f&&p.addEventListener(`click`,function(){f.scrollBy({left:-320,behavior:`smooth`})}),m&&f&&m.addEventListener(`click`,function(){f.scrollBy({left:320,behavior:`smooth`})}),f&&`IntersectionObserver`in window){let e=new IntersectionObserver(function(e){e.forEach(function(e){let t=e.target.querySelector(`video`);if(e.isIntersecting){if(t&&t.paused){let e=t.play();e!==void 0&&e.catch(function(){})}let n=e.target.getAttribute(`data-step`),r=document.getElementById(`processStepNav`);g.forEach(function(e){e.getAttribute(`data-step`)===n?(e.classList.add(`active`),e.setAttribute(`aria-selected`,`true`),r&&r.scrollTo({left:e.offsetLeft-r.offsetLeft-16,behavior:`smooth`})):(e.classList.remove(`active`),e.setAttribute(`aria-selected`,`false`))})}else t&&!t.paused&&t.pause()})},{root:f,threshold:.6});h.forEach(function(t){e.observe(t)})}let M=document.getElementById(`calculator-root`);if(M){let e={categories:[{id:`tops-basics`,name:`Tops & Basics`,icon:`👕`,items:[{id:`tshirt`,name:`T-Shirt (Wash & Iron)`,price:50},{id:`vest`,name:`Vest / Banyan`,price:40},{id:`formal_shirt`,name:`Formal Shirt (Wash & Iron)`,price:50},{id:`casual_shirt`,name:`Casual Shirt (Wash & Iron)`,price:50},{id:`white_shirt`,name:`White Shirt (Wash & Iron)`,price:60},{id:`kurti`,name:`Kurti (Wash & Iron)`,price:60},{id:`womens_top`,name:`Women's Casual Top`,price:50},{id:`undergarment`,name:`Undergarment (Wash & Fold)`,price:30}]},{id:`bottoms`,name:`Bottoms & Pants`,icon:`👖`,items:[{id:`jeans`,name:`Jeans (Wash & Iron)`,price:50},{id:`trousers`,name:`Trousers (Wash & Iron)`,price:50},{id:`chinos`,name:`Chinos (Wash & Iron)`,price:50},{id:`track_pants`,name:`Track Pants (Wash & Iron)`,price:60},{id:`joggers`,name:`Joggers (Wash & Iron)`,price:50},{id:`shorts`,name:`Shorts (Wash & Iron)`,price:40},{id:`pyjama`,name:`Pyjama (Wash & Iron)`,price:40},{id:`leggings`,name:`Leggings (Wash & Iron)`,price:50}]},{id:`winter`,name:`Winter Wear`,icon:`❄️`,items:[{id:`woolen_sweater`,name:`Woolen Sweater (Dry Clean)`,price:200},{id:`pullover`,name:`Pullover (Dry Clean)`,price:180},{id:`hoodie`,name:`Hoodie (Dry Clean)`,price:150},{id:`sweatshirt`,name:`Sweatshirt (Dry Clean)`,price:100},{id:`wool_shawl`,name:`Pure Wool Shawl (Dry Clean)`,price:220},{id:`wool_stole`,name:`Pure Wool Stole (Dry Clean)`,price:80},{id:`heavy_jacket`,name:`Heavy Winter Jacket (Dry Clean)`,price:380},{id:`parka`,name:`Parka (Dry Clean)`,price:420}]},{id:`suits`,name:`Suits & Blazers`,icon:`👔`,items:[{id:`suit_2pc`,name:`2-Piece Suit (Dry Clean)`,price:400},{id:`suit_3pc`,name:`3-Piece Suit (Dry Clean)`,price:500},{id:`blazer`,name:`Blazer (Dry Clean)`,price:250},{id:`nehru_jacket`,name:`Nehru Jacket (Dry Clean)`,price:150}]},{id:`ethnic`,name:`Ethnic & Wedding`,icon:`👘`,items:[{id:`kurta_pajama`,name:`Kurta Pajama (Cotton Dry Clean)`,price:200},{id:`salwar_kurti_2pc`,name:`Salwar Kurti 2pc (Dry Clean)`,price:150},{id:`silk_saree`,name:`Silk Saree (Dry Clean)`,price:300},{id:`chiffon_saree`,name:`Chiffon Saree (Dry Clean)`,price:250},{id:`banarasi_saree`,name:`Banarasi Saree (Dry Clean)`,price:280},{id:`bridal_lehenga`,name:`Bridal Heavy Lehenga (Dry Clean)`,price:500},{id:`royal_sherwani`,name:`Royal Groom Sherwani (Dry Clean)`,price:550},{id:`royal_achkan`,name:`Royal Groom Achkan (Dry Clean)`,price:600},{id:`dupatta`,name:`Dupatta (Wash & Iron)`,price:50},{id:`stole`,name:`Stole (Dry Clean)`,price:60}]},{id:`bedding`,name:`Bedding & Linens`,icon:`🛏️`,items:[{id:`single_bedsheet`,name:`Single Bedsheet (Wash & Iron)`,price:50},{id:`double_bedsheet`,name:`Double Bedsheet (Wash & Iron)`,price:80},{id:`king_bedsheet`,name:`King Size Bedsheet (Wash & Iron)`,price:100},{id:`blanket_single`,name:`Single Bed Blanket (Dry Clean)`,price:200},{id:`blanket_double`,name:`Double Bed Blanket (Dry Clean)`,price:300},{id:`heavy_razai`,name:`Double Bed Heavy Razai (Dry Clean)`,price:400},{id:`curtain`,name:`Curtains per panel (Wash & Iron)`,price:80},{id:`pillow_cover`,name:`Pillow Cover (Wash & Fold)`,price:20},{id:`sofa_cover`,name:`Sofa Cover (Wash & Fold)`,price:80}]},{id:`specialized`,name:`Specialized Care`,icon:`✨`,items:[{id:`shoes_spa`,name:`Shoes Deep Spa (Per Pair)`,price:250},{id:`sofa_seat`,name:`Sofa Home Service (Per Seat)`,price:250},{id:`carpet_clean`,name:`Carpet Deep Clean`,price:600}]}]},t={};e.categories.forEach(function(e){e.items.forEach(function(e){t[e.id]=e.price})}),M.innerHTML=`
        <div class="order-calc-card">
          <div class="calc-header">
            <span class="calc-badge"><i class="fas fa-calculator"></i> INSTANT ORDER ESTIMATOR</span>
            <h2 class="calc-title">Interactive Order Price Calculator</h2>
            <p class="calc-sub">Transparent pricing with no hidden charges &mdash; calculate your order cost instantly</p>
          </div>

          <div class="calc-student-note">
            <i class="fas fa-user-graduate"></i>
            <span>Prices shown are student friendly &amp; regular rates. Professional luxury care pricing may vary.</span>
          </div>
        
        <div class="calc-express-notice">
          <div class="express-notice-left">
            <i class="fas fa-bolt express-notice-icon"></i>
            <div>
              <span class="express-notice-title">⚡ Express 4-Hour Delivery Available</span>
              <span class="express-notice-desc">Need it fast? Express delivery available across all Jodhpur locations.</span>
            </div>
          </div>
          <a href="https://wa.me/918233853727?text=Hi%20Gen-Z%20Laundry!%20I%20want%20to%20know%20about%20Express%204-Hour%20service%20pricing." target="_blank" rel="noopener noreferrer" class="express-notice-btn">
            <i class="fab fa-whatsapp"></i> Ask Price
          </a>
        </div>

        <div class="calc-toolbar">
          <div class="calc-search-wrap">
            <i class="fas fa-search"></i>
            <input type="text" class="calc-search" id="calcSearchInput" placeholder="Search garment (e.g. Jeans, Shirt, Hoodie)..." aria-label="Search items">
          </div>
          <div class="calc-actions">
            <button type="button" class="calc-btn-aux" id="calcResetBtn" title="Reset all counts">
              <i class="fas fa-undo-alt"></i> Reset
            </button>
            <span class="calc-item-count" id="calcItemCountBadge" title="Total pieces">0 pieces</span>
          </div>
        </div>

        <div class="calc-category-tabs" role="tablist">
          ${e.categories.map(function(e,t){return`
              <button type="button" class="calc-tab ${t===0?`active`:``}" data-cat="${e.id}">
                <span>${e.icon}</span> <span>${e.name}</span>
              </button>
            `}).join(``)}
        </div>

        <div class="calc-panels">
          ${e.categories.map(function(e,t){return`
              <div class="calc-panel ${t===0?`active`:``}" id="panel-${e.id}">
                <div class="calc-grid">
                  ${e.items.map(function(e){return`
                      <div class="calc-item" data-item-id="${e.id}" data-item-name="${e.name.toLowerCase()}">
                        <div>
                          <label for="qty-${e.id}">${e.name}</label>
                          <span class="calc-item-price">₹${e.price}/pc</span>
                        </div>
                        <div class="quantity-control">
                          <button type="button" class="qty-btn" data-act="dec" data-id="${e.id}">−</button>
                          <input type="text" id="qty-${e.id}" class="qty-input" value="0" readonly>
                          <button type="button" class="qty-btn" data-act="inc" data-id="${e.id}">+</button>
                        </div>
                      </div>
                    `}).join(``)}
                </div>
              </div>
            `}).join(``)}
        </div>

        <div class="calc-summary-bar">
          <div class="calc-total-box">
            <span class="calc-total-label">Estimated Total:</span>
            <span class="calc-total-val" id="calcTotalVal">₹0</span>
          </div>
          <div class="calc-summary-actions">
            <button type="button" class="calc-copy-btn" id="calcCopyBtn">
              <i class="fas fa-copy"></i> Copy Estimate
            </button>
            <a href="https://wa.me/918233853727?text=Hi%20Gen-Z%20Laundry!%20I%20want%20to%20book%20a%20pickup." target="_blank" rel="noopener noreferrer" class="calc-whatsapp-btn" id="calcWhatsAppBtn">
              <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;function n(){let n=0,r=0,i=[];Object.keys(t).forEach(function(a){let o=document.getElementById(`qty-`+a),s=o&&parseInt(o.value,10)||0;if(s>0){r+=s;let o=s*t[a];n+=o;let c=a;e.categories.forEach(function(e){e.items.forEach(function(e){e.id===a&&(c=e.name)})}),i.push(`${c} x ${s} (₹${o})`)}});let a=document.getElementById(`calcTotalVal`);a&&(a.textContent=`₹`+n);let o=document.getElementById(`calcItemCountBadge`);o&&(o.textContent=r+` `+(r===1?`piece`:`pieces`));let s=document.getElementById(`calcWhatsAppBtn`);if(s){if(i.length>0){let e=`Hi Gen-Z Laundry! 🧺

I calculated my order on your website:
`+i.map(function(e){return`• `+e}).join(`
`)+`\n\nEstimated Total: ₹${n}\n\nPlease schedule my doorstep pickup!`;s.href=`https://wa.me/918233853727?text=${encodeURIComponent(e)}`}else s.href=`https://wa.me/918233853727?text=Hi%20Gen-Z%20Laundry!%20I%20want%20to%20book%20a%20pickup.`}}M.addEventListener(`click`,function(e){let t=e.target.closest(`.qty-btn`);if(!t)return;let r=t.getAttribute(`data-id`),i=t.getAttribute(`data-act`),a=document.getElementById(`qty-`+r);if(!a)return;let o=parseInt(a.value,10)||0;i===`inc`&&o++,i===`dec`&&o>0&&o--,a.value=o,n()});let r=M.querySelectorAll(`.calc-tab`);r.forEach(function(e){e.addEventListener(`click`,function(){r.forEach(function(e){e.classList.remove(`active`)}),e.classList.add(`active`);let t=e.getAttribute(`data-cat`);M.querySelectorAll(`.calc-panel`).forEach(function(e){e.classList.remove(`active`),e.id===`panel-`+t&&e.classList.add(`active`)})})});let i=document.getElementById(`calcSearchInput`);i&&i.addEventListener(`input`,function(e){let t=e.target.value.toLowerCase().trim();M.querySelectorAll(`.calc-item`).forEach(function(e){let n=e.getAttribute(`data-item-name`)||``;e.style.display=n.indexOf(t)!==-1||t===``?`flex`:`none`})});let a=document.getElementById(`calcResetBtn`);a&&a.addEventListener(`click`,function(){Object.keys(t).forEach(function(e){let t=document.getElementById(`qty-`+e);t&&(t.value=`0`)}),i&&(i.value=``,M.querySelectorAll(`.calc-item`).forEach(function(e){e.style.display=`flex`})),n()});let o=document.getElementById(`calcCopyBtn`);o&&o.addEventListener(`click`,function(){let n=0,r=[`🧺 Gen-Z Laundry — Price Estimate:`];Object.keys(t).forEach(function(i){let a=document.getElementById(`qty-`+i),o=a&&parseInt(a.value,10)||0;if(o>0){let a=o*t[i];n+=a;let s=i;e.categories.forEach(function(e){e.items.forEach(function(e){e.id===i&&(s=e.name)})}),r.push(`• ${s} x ${o} = ₹${a}`)}}),r.push(`Total: ₹${n}`),r.push(`Book at: https://genzlaundry.com/ or call +91 82338 53727`),navigator.clipboard.writeText(r.join(`
`)).then(function(){let e=o.innerHTML;o.innerHTML=`<i class="fas fa-check"></i> Copied!`,setTimeout(function(){o.innerHTML=e},2e3)}).catch(function(){})})}console.log(`🏰 Gen-Z Laundry Blue City Theme & 10-Step Video Showcase initialized.`)})})();