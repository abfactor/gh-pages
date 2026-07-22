// 默认隐藏 notebook
// 点击切换状态
document.addEventListener('DOMContentLoaded', () => {
    const spacer = document.querySelector('.spacer');
    if (!spacer) return;

    const followingItems = [];
    let sibling = spacer.nextElementSibling;
    while (sibling) {
        followingItems.push(sibling);
        sibling = sibling.nextElementSibling;
    }

    const isExpanded = localStorage.getItem('spacerExpanded') === 'true';
    followingItems.forEach(item => item.style.display = isExpanded ? '' : 'none');
    spacer.style.cursor = 'pointer';

    spacer.addEventListener('click', () => {
        const newExpanded = localStorage.getItem('spacerExpanded') !== 'true';
        followingItems.forEach(item => item.style.display = newExpanded ? '' : 'none');
        localStorage.setItem('spacerExpanded', String(newExpanded));
    });
});

// 打开导航栏跳转到 on-this-page
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('mdbook-sidebar');
    if (!sidebar) return;
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            // 检查是否是 aria-hidden 属性的变化
            if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                const newValue = sidebar.getAttribute('aria-hidden');
                // 当 aria-hidden 变为 "false" 时（即侧边栏显示）
                if (newValue === 'false') {
                    setTimeout(() => {
                        const currentLink = sidebar.querySelector('.on-this-page');
                        if (currentLink) {
                            currentLink.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                                inline: 'nearest'
                            });
                        }
                    }, 500); // 50ms 通常足够，可调整
                }
            }
        }
    });

    observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['aria-hidden']
    });
});

// 添加主页按钮
document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.createElement('button');
    homeButton.id = 'mdbook-home-button';
    homeButton.className = 'icon-button';
    homeButton.type = 'button';
    homeButton.title = 'Home';
    homeButton.setAttribute('aria-label', 'Home');

    homeButton.innerHTML = `
    <span class="fa-svg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <!--
            ! Font Awesome Free 6.2.0 by @fontawesome
            - https://fontawesome.com License
            - https://fontawesome.com/license/free 
            (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
            Copyright 2022 Fonticons, Inc. 
        -->
        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 
        160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40
        40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 
        .1H416 392c-22.1 0-40-17.9-40-40V448 
        384c0-17.7-14.3-32-32-32H256c-17.7 0-32
        14.3-32 32v64 24c0 22.1-17.9 40-40 40H160
        128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6
        .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9
        .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15
        2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
      </svg>
    </span> `;

    homeButton.addEventListener('click', () => {
        const rootPath = window.location.origin;
        window.location.href = rootPath + '/index.html';
    });

    const leftButtons = document.querySelector('.left-buttons');

    if (leftButtons) {
        leftButtons.insertBefore(homeButton, leftButtons.lastChild);
    }

    if (window.location.pathname.endsWith('index.html') ||
        window.location.pathname.endsWith('INTOR_BLOGS.html') ||
        window.location.pathname.endsWith('/')) {
        homeButton.style.display = 'none';
    }
});