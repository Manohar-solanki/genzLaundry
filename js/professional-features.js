// ============================================
// Professional Features - Business Tools
// ============================================

// 1. Order Tracking System
class OrderTracker {
    constructor() {
        this.init();
    }

    init() {
        this.createOrderTrackingWidget();
    }

    createOrderTrackingWidget() {
        const widget = document.createElement('div');
        widget.className = 'order-tracker-widget';
        widget.innerHTML = `
            <div class="tracker-header">
                <h3><i class="fas fa-box"></i> Track Your Order</h3>
                <button class="tracker-close" aria-label="Close">&times;</button>
            </div>
            <div class="tracker-content">
                <div class="tracker-input-group">
                    <input type="text" id="orderNumber" placeholder="Enter Order Number" class="tracker-input">
                    <button class="btn btn-primary tracker-btn">Track</button>
                </div>
                <div id="orderStatus" class="order-status hidden"></div>
            </div>
        `;
        widget.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 320px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
            border: 1px solid #E2E8F0;
        `;
        document.body.appendChild(widget);

        // Toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'order-tracker-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-box"></i>';
        toggleBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(toggleBtn);

        let isOpen = false;
        toggleBtn.addEventListener('click', () => {
            isOpen = !isOpen;
            widget.style.transform = isOpen ? 'translateY(0)' : 'translateY(100%)';
            toggleBtn.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        widget.querySelector('.tracker-close').addEventListener('click', () => {
            isOpen = false;
            widget.style.transform = 'translateY(100%)';
            toggleBtn.style.transform = 'rotate(0deg)';
        });

        // Track order
        widget.querySelector('.tracker-btn').addEventListener('click', () => {
            const orderNum = document.getElementById('orderNumber').value;
            if (orderNum) {
                this.trackOrder(orderNum);
            }
        });
    }

    trackOrder(orderNumber) {
        const statusDiv = document.getElementById('orderStatus');
        statusDiv.classList.remove('hidden');
        
        // Simulate order tracking (replace with actual API call)
        const statuses = [
            { stage: 'Received', progress: 25, icon: 'fa-check-circle', color: '#10B981' },
            { stage: 'In Progress', progress: 50, icon: 'fa-spinner', color: '#F59E0B' },
            { stage: 'Quality Check', progress: 75, icon: 'fa-clipboard-check', color: '#0EA5E9' },
            { stage: 'Ready for Delivery', progress: 100, icon: 'fa-truck', color: '#2563EB' }
        ];

        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        statusDiv.innerHTML = `
            <div class="order-status-content">
                <div class="status-header">
                    <i class="fas ${randomStatus.icon}" style="color: ${randomStatus.color}"></i>
                    <span class="status-stage">${randomStatus.stage}</span>
                </div>
                <div class="progress-bar" style="margin-top: 1rem;">
                    <div class="progress-fill" style="width: ${randomStatus.progress}%"></div>
                </div>
                <p class="status-message" style="margin-top: 0.5rem; color: #64748B; font-size: 0.875rem;">
                    Order #${orderNumber} is ${randomStatus.stage.toLowerCase()}
                </p>
            </div>
        `;
    }
}

// 2. Service Availability Checker
class ServiceAvailability {
    constructor() {
        this.init();
    }

    init() {
        this.addAvailabilityIndicator();
    }

    addAvailabilityIndicator() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const availability = document.createElement('div');
            availability.className = 'service-availability';
            availability.innerHTML = `
                <span class="availability-dot"></span>
                <span class="availability-text">Available Now</span>
            `;
            availability.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.25rem 0.75rem;
                background: rgba(16, 185, 129, 0.1);
                border-radius: 999px;
                font-size: 0.75rem;
                font-weight: 500;
                color: #10B981;
            `;
            
            const dot = availability.querySelector('.availability-dot');
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                background: #10B981;
                border-radius: 50%;
                animation: pulse-dot 2s infinite;
            `;
            
            card.style.position = 'relative';
            card.appendChild(availability);
        });
    }
}

// 3. Professional Booking Calendar
class BookingCalendar {
    constructor() {
        this.init();
    }

    init() {
        this.createCalendarWidget();
    }

    createCalendarWidget() {
        const calendarBtn = document.querySelector('#bookingForm');
        if (!calendarBtn) return;

        // Add date/time picker to form
        const form = document.getElementById('bookingForm');
        if (form) {
            const dateGroup = document.createElement('div');
            dateGroup.className = 'form-group';
            dateGroup.innerHTML = `
                <input type="date" id="pickupDate" required min="${new Date().toISOString().split('T')[0]}">
                <label for="pickupDate">📅 Preferred Pickup Date</label>
            `;
            
            const timeGroup = document.createElement('div');
            timeGroup.className = 'form-group';
            timeGroup.innerHTML = `
                <select id="pickupTime" required>
                    <option value="">Select Time Slot</option>
                    <option value="09:00-11:00">Morning (9:00 AM - 11:00 AM)</option>
                    <option value="11:00-13:00">Midday (11:00 AM - 1:00 PM)</option>
                    <option value="13:00-15:00">Afternoon (1:00 PM - 3:00 PM)</option>
                    <option value="15:00-17:00">Evening (3:00 PM - 5:00 PM)</option>
                </select>
                <label for="pickupTime">⏰ Preferred Time Slot</label>
            `;
            
            const serviceSelect = form.querySelector('#service');
            if (serviceSelect) {
                serviceSelect.parentElement.after(dateGroup);
                dateGroup.after(timeGroup);
            }
        }
    }
}

// 4. Service Comparison Tool
class ServiceComparison {
    constructor() {
        this.init();
    }

    init() {
        this.createComparisonWidget();
    }

    createComparisonWidget() {
        const servicesSection = document.querySelector('.services');
        if (!servicesSection) return;

        const compareBtn = document.createElement('button');
        compareBtn.className = 'btn btn-outline';
        compareBtn.innerHTML = '<i class="fas fa-balance-scale"></i> Compare Services';
        compareBtn.style.cssText = `
            margin: 2rem auto;
            display: block;
        `;
        
        servicesSection.querySelector('.container').appendChild(compareBtn);

        compareBtn.addEventListener('click', () => {
            this.showComparisonModal();
        });
    }

    showComparisonModal() {
        const modal = document.createElement('div');
        modal.className = 'comparison-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Service Comparison</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="comparison-table">
                    <table class="pro-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Wash & Fold</th>
                                <th>Dry Cleaning</th>
                                <th>Ironing</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Turnaround Time</td>
                                <td>24-48 hours</td>
                                <td>2-3 days</td>
                                <td>Same day</td>
                            </tr>
                            <tr>
                                <td>Price Range</td>
                                <td>₹15-20/piece</td>
                                <td>₹80-150/piece</td>
                                <td>₹8-12/piece</td>
                            </tr>
                            <tr>
                                <td>Fabric Types</td>
                                <td>Cotton, Synthetic</td>
                                <td>All Delicate</td>
                                <td>All Types</td>
                            </tr>
                            <tr>
                                <td>Stain Treatment</td>
                                <td>✓</td>
                                <td>✓✓</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// 5. Professional Statistics Dashboard
class StatisticsDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.createDashboard();
    }

    createDashboard() {
        const aboutSection = document.querySelector('.about-stats');
        if (!aboutSection) return;

        const stats = [
            { label: 'Orders Completed', value: '5000+', icon: 'fa-check-circle', trend: '+12%' },
            { label: 'Customer Satisfaction', value: '99%', icon: 'fa-star', trend: '+2%' },
            { label: 'Average Rating', value: '4.9/5', icon: 'fa-thumbs-up', trend: '+0.1' },
            { label: 'Response Time', value: '<30 min', icon: 'fa-clock', trend: '-5 min' }
        ];

        stats.forEach(stat => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            statCard.innerHTML = `
                <div class="stat-icon">
                    <i class="fas ${stat.icon}"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-trend positive">${stat.trend}</div>
                </div>
            `;
            statCard.style.cssText = `
                background: white;
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid #E2E8F0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 1rem;
            `;
            aboutSection.appendChild(statCard);
        });
    }
}

// 6. Professional FAQ Search
class FAQSearch {
    constructor() {
        this.init();
    }

    init() {
        this.addSearchToFAQ();
    }

    addSearchToFAQ() {
        const faqSection = document.querySelector('.faq');
        if (!faqSection) return;

        const searchBox = document.createElement('div');
        searchBox.className = 'faq-search';
        searchBox.innerHTML = `
            <div class="search-input-wrapper">
                <i class="fas fa-search"></i>
                <input type="text" id="faqSearch" placeholder="Search frequently asked questions...">
            </div>
        `;
        searchBox.style.cssText = `
            max-width: 600px;
            margin: 0 auto 2rem;
        `;
        
        const container = faqSection.querySelector('.container');
        const faqContainer = faqSection.querySelector('.faq-container');
        
        if (faqContainer) {
            faqContainer.parentElement.insertBefore(searchBox, faqContainer);
        }

        const searchInput = document.getElementById('faqSearch');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                const matches = question.includes(query) || answer.includes(query);
                
                item.style.display = matches ? '' : 'none';
            });
        });
    }
}

// 7. Service Recommendations Engine
class ServiceRecommendations {
    constructor() {
        this.init();
    }

    init() {
        this.addRecommendations();
    }

    addRecommendations() {
        const servicesSection = document.querySelector('.services');
        if (!servicesSection) return;

        const recSection = document.createElement('div');
        recSection.className = 'service-recommendations';
        recSection.innerHTML = `
            <div class="recommendation-card">
                <h4><i class="fas fa-lightbulb"></i> Recommended for You</h4>
                <p>Based on your location and preferences, we recommend:</p>
                <div class="recommendation-list">
                    <div class="rec-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Express Service for urgent orders</span>
                    </div>
                    <div class="rec-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Premium Care Package for delicate items</span>
                    </div>
                </div>
            </div>
        `;
        recSection.style.cssText = `
            margin-top: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
            border-radius: 12px;
            border: 1px solid rgba(37, 99, 235, 0.1);
        `;
        
        const container = servicesSection.querySelector('.container');
        container.appendChild(recSection);
    }
}

// 8. Professional Notification System
class ProfessionalNotifications {
    constructor() {
        this.init();
    }

    init() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'pro-notifications';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" style="margin-left: auto; background: none; border: none; cursor: pointer; font-size: 1.2rem; opacity: 0.7;">&times;</button>
            </div>
        `;
        
        const container = document.getElementById('pro-notifications');
        container.appendChild(notification);

        notification.style.animation = 'slideInRight 0.3s ease';

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.remove(notification);
        });

        setTimeout(() => {
            this.remove(notification);
        }, duration);
    }

    remove(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    getIcon(type) {
        const icons = {
            info: 'fa-info-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle'
        };
        return icons[type] || icons.info;
    }
}

// 9. Professional Loading States
class ProfessionalLoader {
    static show(element) {
        const loader = document.createElement('div');
        loader.className = 'pro-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <p>Processing...</p>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            z-index: 1000;
            border-radius: 12px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(loader);
        
        return loader;
    }

    static hide(loader) {
        loader.remove();
    }
}

// 10. Service Area Checker
class ServiceAreaChecker {
    constructor() {
        this.init();
    }

    init() {
        this.addAreaChecker();
    }

    addAreaChecker() {
        const contactForm = document.getElementById('bookingForm');
        if (!contactForm) return;

        const addressInput = document.getElementById('address');
        if (addressInput) {
            addressInput.addEventListener('blur', () => {
                const address = addressInput.value.toLowerCase();
                const serviceAreas = ['jodhpur', 'shastri nagar', 'ratanada', 'paota', 'chopasni', 'sardarpura'];
                const isServiceable = serviceAreas.some(area => address.includes(area));
                
                if (address && !isServiceable) {
                    const proNotifications = window.proNotifications || new ProfessionalNotifications();
                    proNotifications.show('We may not service this area. Please contact us to confirm.', 'warning', 6000);
                }
            });
        }
    }
}

// Initialize all professional features
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        @keyframes pulse-dot {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.2);
            }
        }
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #E2E8F0;
            border-top-color: #2563EB;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .hidden {
            display: none;
        }
        .tracker-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .tracker-btn {
            width: 100%;
        }
        .order-status {
            margin-top: 1rem;
            padding: 1rem;
            background: #F8FAFC;
            border-radius: 8px;
        }
        .status-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            color: #1E293B;
        }
        .faq-search input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            font-size: 1rem;
        }
        .search-input-wrapper {
            position: relative;
        }
        .search-input-wrapper i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #94A3B8;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748B;
        }
    `;
    document.head.appendChild(style);

    // Initialize features
    new OrderTracker();
    new ServiceAvailability();
    new BookingCalendar();
    new ServiceComparison();
    new StatisticsDashboard();
    new FAQSearch();
    new ServiceRecommendations();
    new ServiceAreaChecker();
    
    // Global notification system
    window.proNotifications = new ProfessionalNotifications();
    window.ProfessionalLoader = ProfessionalLoader;
    
    // Show welcome notification
    setTimeout(() => {
        window.proNotifications.show('Welcome! Track orders, compare services, and more.', 'info', 4000);
    }, 2000);
});

console.log('💼 Professional features loaded!');

