// 通用功能模块
class CommonUtils {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initScrollEffects();
        this.initSmoothScrolling();
        this.initAnimations();
    }

    // 移动端菜单功能
    initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

        if (mobileMenuBtn && mobileNav) {
            // 切换移动端菜单
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                this.updateMenuIcon(mobileMenuBtn, mobileNav.classList.contains('active'));
            });

            // 点击链接后关闭菜单
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    this.updateMenuIcon(mobileMenuBtn, false);
                });
            });

            // 点击菜单外部关闭
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                    mobileNav.classList.remove('active');
                    this.updateMenuIcon(mobileMenuBtn, false);
                }
            });
        }
    }

    // 更新菜单图标
    updateMenuIcon(btn, isOpen) {
        btn.innerHTML = isOpen ? '✕' : '☰';
    }

    // 滚动效果
    initScrollEffects() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // 导航高亮
        this.updateActiveNavigation();
        window.addEventListener('scroll', () => this.updateActiveNavigation());
    }

    // 更新导航活跃状态
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // 平滑滚动
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 动画效果
    initAnimations() {
        // 创建观察者来触发动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fadeInUp');
                }
            });
        }, observerOptions);

        // 观察所有卡片和内容区域
        document.querySelectorAll('.card, .feature-card, .action-card').forEach(el => {
            observer.observe(el);
        });
    }

    // 显示成功消息
    showSuccessMessage(title, message, duration = 3000) {
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
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                margin: 1rem;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h3 style="color: #2d2d2d; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
                <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">${message}</p>
                <button class="btn" onclick="this.closest('.success-modal').remove(); document.body.style.overflow='auto';">
                    Fantastisk!
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
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        }, duration);

        return modal;
    }

    // 表单处理
    handleFormSubmission(form, successTitle, successMessage) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showSuccessMessage(successTitle, successMessage);
        });
    }
}

// 模态框管理
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // 点击外部关闭模态框
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });
    }

    showModal(modalId, delay = 0) {
        setTimeout(() => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // 添加显示动画
                setTimeout(() => {
                    modal.classList.add('modal-show');
                }, 10);
            }
        }, delay);
    }

    closeModal(modal) {
        if (typeof modal === 'string') {
            modal = document.getElementById(modal);
        }
        
        if (modal) {
            modal.classList.remove('modal-show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            this.closeModal(modal);
        });
    }
}

// 背景元素动画
class BackgroundAnimations {
    constructor() {
        this.createFloatingElements();
    }

    createFloatingElements() {
        const floatingContainer = document.querySelector('.floating-elements');
        if (!floatingContainer) return;

        const elements = ['🍣', '🥢', '🍱', '🥟', '🦐', '🍤', '🐟', '🍜'];
        
        elements.forEach((emoji, index) => {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = emoji;
            element.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 1 + 1.5}rem;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: float ${Math.random() * 3 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 90}%;
                top: ${Math.random() * 90}%;
                z-index: 1;
                pointer-events: none;
            `;
            
            floatingContainer.appendChild(element);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.commonUtils = new CommonUtils();
    window.modalManager = new ModalManager();
    window.backgroundAnimations = new BackgroundAnimations();
    
    // 为表单添加处理器
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const formType = form.closest('[id]')?.id || 'form';
        let successTitle, successMessage;
        
        switch (formType) {
            case 'bookbord':
                successTitle = 'Reservation Modtaget!';
                successMessage = 'Din bordreservation er modtaget. Vi ser frem til at byde dig velkommen!';
                break;
            default:
                successTitle = 'Tak for din besked!';
                successMessage = 'Vi har modtaget din henvendelse og vender tilbage snarest.';
        }
        
        window.commonUtils.handleFormSubmission(form, successTitle, successMessage);
    });
});

// 导出用于其他脚本使用
window.CommonUtils = CommonUtils;
window.ModalManager = ModalManager;
window.BackgroundAnimations = BackgroundAnimations;