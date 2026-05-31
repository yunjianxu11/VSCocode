/**
 * 津门泥人张非遗数字展示网站 - 主交互脚本
 * 包含：导航栏滚动变色、图片模态框、留言表单验证
 */

(function() {
    'use strict';

    // ==================== 1. 导航栏滚动变色特效 ====================
    const navbar = document.getElementById('mainNavbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // ==================== 2. 图片模态框动态加载 ====================
    const imgModal = document.getElementById('imgModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // 获取所有可以打开模态框的元素（图片 + 按钮）
    const modalTriggers = document.querySelectorAll('.gallery-img, .view-btn');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // 获取图片地址和标题
            let imgUrl = this.getAttribute('data-img');
            let title = this.getAttribute('data-title');
            
            // 如果触发元素是图片且没有 data-img，尝试从父级查找或使用当前图片地址转换
            if (!imgUrl && this.tagName === 'IMG') {
                imgUrl = this.src.replace('/400/300', '/800/600');
                title = this.getAttribute('data-title') || this.alt || '泥人作品';
            }
            
            // 如果还没有获取到标题，尝试从卡片标题获取
            if (!title) {
                const card = this.closest('.card');
                if (card) {
                    const cardTitle = card.querySelector('.card-title');
                    if (cardTitle) title = cardTitle.innerText;
                }
            }
            
            // 设置模态框内容
            if (modalImage) {
                modalImage.src = imgUrl || 'https://picsum.photos/id/30/800/600';
            }
            if (modalCaption) {
                modalCaption.innerText = title || '泥人张彩塑精粹';
            }
        });
    });
    
    // Bootstrap 模态框关闭时可选清理（无需额外操作）
    
    // ==================== 3. 留言表单验证 ====================
    const form = document.getElementById('messageForm');
    const nameInput = document.getElementById('nameInput');
    const msgInput = document.getElementById('messageInput');
    const nameError = document.getElementById('nameError');
    const msgError = document.getElementById('msgError');
    const feedbackDiv = document.getElementById('formFeedback');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // 清空之前的错误提示
            if (nameError) nameError.innerText = '';
            if (msgError) msgError.innerText = '';
            if (feedbackDiv) feedbackDiv.innerHTML = '';
            
            const nameVal = nameInput ? nameInput.value.trim() : '';
            const msgVal = msgInput ? msgInput.value.trim() : '';
            
            // 姓名验证
            if (nameVal === '') {
                if (nameError) nameError.innerText = '请填写您的姓名';
                isValid = false;
            } else if (nameVal.length < 2) {
                if (nameError) nameError.innerText = '姓名至少两个字符';
                isValid = false;
            }
            
            // 留言内容验证
            if (msgVal === '') {
                if (msgError) msgError.innerText = '留言内容不能为空';
                isValid = false;
            } else if (msgVal.length < 5) {
                if (msgError) msgError.innerText = '留言内容不少于5个字';
                isValid = false;
            }
            
            // 提交反馈
            if (isValid && feedbackDiv) {
                feedbackDiv.innerHTML = '<span class="text-success"><i class="fas fa-check-circle"></i> 感谢您的留言！传承因您更精彩。</span>';
                if (form) form.reset();
                
                // 3秒后自动清除提示
                setTimeout(() => {
                    if (feedbackDiv) feedbackDiv.innerHTML = '';
                }, 4000);
            } else if (!isValid && feedbackDiv) {
                feedbackDiv.innerHTML = '<span class="text-danger"><i class="fas fa-exclamation-triangle"></i> 请正确填写留言信息。</span>';
                
                setTimeout(() => {
                    if (feedbackDiv && feedbackDiv.innerHTML.includes('请正确填写')) {
                        feedbackDiv.innerHTML = '';
                    }
                }, 3000);
            }
        });
    }
    
    // ==================== 4. 平滑滚动（可选增强体验）====================
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
})();