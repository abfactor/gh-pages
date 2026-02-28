// 默认隐藏 notebook
// 点击切换状态
document.addEventListener('DOMContentLoaded', function () {
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
                    }, 200); // 50ms 通常足够，可调整
                }
            }
        }
    });

    observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['aria-hidden']
    });
});