// 分店页面专用功能
class RestaurantPage {
    constructor(branchName) {
        this.branchName = branchName;
        this.init();
    }

    init() {
        this.initPageNavigation();
        this.initModal();
        this.initBackgroundElements();
        this.initFormHandlers();
        this.checkFirstVisit();
    }

    // 页面导航功能
    initPageNavigation() {
        // 显示默认页面
        this.showPage('forside');
        
        // 绑定导航链接点击事件
        document.querySelectorAll('.nav-menu a, .mobile-nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const pageId = href.substring(1);
                    this.showPage(pageId);
                    
                    // 更新导航状态
                    this.updateNavigation(link);
                    
                    // 关闭移动端菜单
                    const mobileNav = document.querySelector('.mobile-nav');
                    if (mobileNav) {
                        mobileNav.classList.remove('active');
                        const menuBtn = document.querySelector('.mobile-menu-btn');
                        if (menuBtn) {
                            window.commonUtils?.updateMenuIcon(menuBtn, false);
                        }
                    }
                }
            });
        });
    }

    // 显示指定页面
    showPage(pageId) {
        // 隐藏所有页面
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        
        // 显示目标页面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // 触发页面特定的初始化
            this.initPageSpecific(pageId);
        }
    }

    // 更新导航状态
    updateNavigation(activeLink) {
        document.querySelectorAll('.nav-menu a, .mobile-nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // 页面特定初始化
    initPageSpecific(pageId) {
        switch (pageId) {
            case 'kontaktos':
                this.initMap();
                break;
            case 'allyoucaneat':
                this.animatePrices();
                break;
            case 'bookbord':
                this.initReservationForm();
                break;
        }
    }

    // 初始化地图
    initMap() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer && !mapContainer.querySelector('iframe')) {
            // 根据分店设置不同的地图位置
            let mapSrc = '';
            if (this.branchName === 'soborg') {
                mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.5!2d12.4924!3d55.7308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253b3b3b3b3b3%3A0x1234567890!2zU8O4Ym9yZyBIb3ZlZGdhZGUgMTI0QSwgMjg2MCBTZ2JvcmcsIERlbm1hcms!5e0!3m2!1sen!2sdk!4v1234567890';
            } else if (this.branchName === 'frederiksberg') {
                mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.5!2d12.5277!3d55.6825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253b3b3b3b3b3%3A0x1234567890!2zTm9yZHJlIEZhc2FudmVqIDE1OCBzdC50diwgMjAwMCBGcmVkZXJpa3NiZXJnLCBEZW5tYXJr!5e0!3m2!1sen!2sdk!4v1234567890';
            }
            
            const iframe = document.createElement('iframe');
            iframe.src = mapSrc;
            iframe.width = '100%';
            iframe.height = '400';
            iframe.style.border = 'none';
            iframe.loading = 'lazy';
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
            
            mapContainer.appendChild(iframe);
        }
    }

    // 价格动画
    animatePrices() {
        const priceElements = document.querySelectorAll('.price');
        priceElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'scale(1.1)';
                element.style.color = '#ff4444';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }, index * 200);
        });
    }

    // 初始化预订表单
    initReservationForm() {
        const form = document.querySelector('#bookbord form');
        if (form) {
            // 添加日期限制（不能选择过去的日期）
            const dateInput = form.querySelector('input[type="date"]');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }

            // 添加时间限制
            const timeInput = form.querySelector('input[type="time"]');
            if (timeInput) {
                timeInput.min = '12:00';
                timeInput.max = '22:00';
            }
        }
    }

    // 模态框功能
    initModal() {
        // 显示欢迎模态框的函数
        window.showModal = () => {
            const modal = document.getElementById('welcomeModal');
            if (modal && window.modalManager) {
                window.modalManager.showModal('welcomeModal');
            }
        };

        // 关闭模态框的函数
        window.closeModal = () => {
            const modal = document.getElementById('welcomeModal');
            if (modal && window.modalManager) {
                window.modalManager.closeModal(modal);
                // 设置已显示标记
                const storageKey = `${this.branchName}_welcomeModalShown`;
                localStorage.setItem(storageKey, 'true');
            }
        };
    }

    // 检查首次访问
    checkFirstVisit() {
        const storageKey = `${this.branchName}_welcomeModalShown`;
        const hasShown = localStorage.getItem(storageKey);
        
        if (!hasShown) {
            // 延迟显示欢迎模态框
            setTimeout(() => {
                const modal = document.getElementById('welcomeModal');
                if (modal) {
                    window.showModal();
                }
            }, 1500);
        }
    }

    // 初始化背景元素
    initBackgroundElements() {
        this.createEnhancedFloatingElements();
        this.addScrollParallax();
    }

    // 创建增强的浮动元素
    createEnhancedFloatingElements() {
        // 为每个页面内容区域添加浮动元素
        document.querySelectorAll('.page-content').forEach(section => {
            if (!section.querySelector('.floating-elements')) {
                const floatingContainer = document.createElement('div');
                floatingContainer.className = 'floating-elements';
                floatingContainer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 1;
                    overflow: hidden;
                `;

                // 根据页面类型选择不同的元素
                const elements = this.getElementsForPage(section.id);
                
                elements.forEach((emoji, index) => {
                    const element = document.createElement('div');
                    element.className = 'floating-element';
                    element.textContent = emoji;
                    element.style.cssText = `
                        position: absolute;
                        font-size: ${Math.random() * 1.5 + 1}rem;
                        opacity: ${Math.random() * 0.15 + 0.05};
                        animation: float ${Math.random() * 4 + 8}s ease-in-out infinite;
                        animation-delay: ${Math.random() * 3}s;
                        left: ${Math.random() * 85 + 5}%;
                        top: ${Math.random() * 85 + 5}%;
                        z-index: 1;
                        pointer-events: none;
                        transform-origin: center;
                    `;
                    
                    floatingContainer.appendChild(element);
                });

                section.style.position = 'relative';
                section.appendChild(floatingContainer);
            }
        });
    }

    // 根据页面获取对应的装饰元素
    getElementsForPage(pageId) {
        const elementSets = {
            'forside': ['🍣', '🥢', '🍱', '🥟', '🦐', '🍤', '🐟', '🍜'],
            'takeaway': ['📱', '🚚', '📦', '🍱', '⏰', '🎯', '✅', '🚀'],
            'allyoucaneat': ['🍽️', '🍣', '🥢', '🍱', '🦐', '🍤', '🥟', '🍜', '🎉', '⭐'],
            'bookbord': ['📅', '🕐', '👥', '🍽️', '📞', '✉️', '📝', '🎯'],
            'kontaktos': ['📍', '📞', '✉️', '🕐', '🗺️', '🏪', '📱', '💬']
        };
        
        return elementSets[pageId] || ['🍣', '🥢', '🍱', '🥟'];
    }

    // 添加滚动视差效果
    addScrollParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index % 3) * 0.2;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
            });
        });
    }

    // 表单处理
    initFormHandlers() {
        // 预订表单
        const bookingForm = document.querySelector('#bookbord form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission(bookingForm);
            });
        }

        // 联系表单
        const contactForm = document.querySelector('#kontaktos form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(contactForm);
            });
        }
    }

    // 处理预订表单提交
    handleBookingSubmission(form) {
        const formData = new FormData(form);
        const reservationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests'),
            message: formData.get('message')
        };

        // 显示预订确认
        const successMessage = `
            Din bordreservation er modtaget!<br><br>
            <strong>Detaljer:</strong><br>
            📅 ${reservationData.date} kl. ${reservationData.time}<br>
            👥 ${reservationData.guests} personer<br>
            📧 Bekræftelse sendes til ${reservationData.email}
        `;

        this.showCustomSuccessModal('Reservation Bekræftet! 🎉', successMessage, 5000);
        
        // 重置表单
        form.reset();
    }

    // 处理联系表单提交
    handleContactSubmission(form) {
        const formData = new FormData(form);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        this.showCustomSuccessModal(
            'Besked Modtaget! 📧',
            `Tak ${contactData.name}! Vi har modtaget din besked og vender tilbage inden for 24 timer.`,
            4000
        );
        
        form.reset();
    }

    // 显示自定义成功模态框
    showCustomSuccessModal(title, message, duration = 3000) {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 3rem 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                margin: 1rem;
                transform: scale(0.8);
                transition: transform 0.3s ease;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">🎉</div>
                <h3 style="color: #2d2d2d; margin-bottom: 1.5rem; font-size: 1.8rem;">${title}</h3>
                <div style="color: #666; margin-bottom: 2rem; line-height: 1.6; font-size: 1.1rem;">${message}</div>
                <button class="btn" onclick="this.closest('.success-modal').remove(); document.body.style.overflow='auto';" style="
                    background: #ff4444;
                    color: white;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">
                    Fantastisk! ✨
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // 显示动画
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div > div').style.transform = 'scale(1)';
        }, 10);

        // 自动关闭
        setTimeout(() => {
            if (modal.parentElement) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }, duration);

        return modal;
    }

    // 添加页面切换动画
    addPageTransitions() {
        const style = document.createElement('style');
        style.textContent = `
            .page-content {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s ease;
            }
            
            .page-content.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            .feature-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .page-content.active .feature-card {
                opacity: 1;
                transform: translateY(0);
            }
            
            .page-content.active .feature-card:nth-child(1) { transition-delay: 0.1s; }
            .page-content.active .feature-card:nth-child(2) { transition-delay: 0.2s; }
            .page-content.active .feature-card:nth-child(3) { transition-delay: 0.3s; }
            .page-content.active .feature-card:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);
    }

    // 添加特殊效果
    addSpecialEffects() {
        // 鼠标悬停时的粒子效果
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.02) { // 2% 概率
                this.createMouseParticle(e.clientX, e.clientY);
            }
        });
    }

    // 创建鼠标粒子
    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #ff4444;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particleFade 1.5s ease-out forwards;
        `;

        // 添加粒子动画
        const keyframes = `
            @keyframes particleFade {
                0% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) translateY(-50px);
                }
            }
        `;

        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }

        document.body.appendChild(particle);

        // 清理粒子
        setTimeout(() => {
            if (particle.parentElement) {
                particle.remove();
            }
        }, 1500);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 从页面URL或数据属性获取分店名称
    const branchName = document.body.getAttribute('data-branch') || 
                      (window.location.pathname.includes('soborg') ? 'soborg' : 'frederiksberg');
    
    window.restaurantPage = new RestaurantPage(branchName);
    
    // 使功能全局可用
    window.showPage = (pageId) => {
        if (window.restaurantPage) {
            window.restaurantPage.showPage(pageId);
        }
    };
});

// 导出类供其他脚本使用
window.RestaurantPage = RestaurantPage;