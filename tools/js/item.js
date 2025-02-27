// 使用立即执行函数封装整个物品图鉴功能
(function() {
    // 所有变量和函数都在这个作用域内
    const itemsPerPage = 50;
    let currentItemPage = 1;
    let totalItems = 0;
    let allItems = [];
    let itemDetailsCache = new Map(); // 缓存已加载的物品详情
    let itemCategories = []; // 存储所有物品分类
    let currentCategory = null; // 当前选中的分类，null 表示显示全部
    let categoryItemsCache = new Map(); // 缓存每个分类的物品列表
    
    // 物品分类中文翻译对象
    const categoryTranslations = {
        'stat-boosts': '能力提升',
        'effort-drop': '努力值道具',
        'medicine': '药物',
        'other': '其他',
        'in-a-pinch': '危机道具',
        'picky-healing': '挑剔治疗',
        'type-protection': '属性保护',
        'baking-only': '烘焙专用',
        'collectibles': '收藏品',
        'evolution': '进化道具',
        'spelunking': '探洞道具',
        'held-items': '携带道具',
        'choice': '选择系列',
        'effort-training': '努力训练',
        'bad-held-items': '不良持有物',
        'training': '训练道具',
        'plates': '石板',
        'species-specific': '特定种族',
        'type-enhancement': '属性增强',
        'event-items': '活动物品',
        'gameplay': '游戏玩法',
        'plot-advancement': '剧情推进',
        'unused': '未使用',
        'loot': '战利品',
        'all-mail': '所有邮件',
        'vitamins': '营养剂',
        'healing': '治疗道具',
        'pp-recovery': 'PP恢复',
        'revival': '复活道具',
        'status-cures': '状态治愈',
        'mulch': '肥料',
        'special-balls': '特殊球',
        'standard-balls': '标准球',
        'dex-completion': '图鉴完成',
        'scarves': '围巾',
        'all-machines': '招式学习器',
        'flutes': '笛子',
        'apricorn-balls': '球果球',
        'apricorn-box': '球果盒',
        'data-cards': '数据卡',
        'jewels': '宝石',
        'miracle-shooter': '奇迹发射器',
        'mega-stones': '超级石',
        'memories': '记忆碎片',
        'z-crystals': 'Z纯晶',
        'species-candies': '种族糖果',
        'catching-bonus': '捕获奖励',
        'dynamax-crystals': '极巨结晶',
        'nature-mints': '性格薄荷',
        'curry-ingredients': '咖喱配料',
        'tera-shard': '太晶碎片',
        'sandwich-ingredients': '三明治配料',
        'tm-materials': '招式学习器材料',
        'picnic': '野餐用品'
    };
    
    // 将函数暴露到全局
    window.initItemDex = initItemDex;
    window.loadItemPage = loadItemPage;
    window.showItemDetail = showItemDetail;
    window.selectItemCategory = selectItemCategory;
    
    // 初始化物品图鉴
    async function initItemDex() {
        try {
            console.log("初始化物品图鉴...");
            // 清空结果区域并显示加载中
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = '<div class="loading-spinner"></div>';
            
            // 获取物品总数
            const response = await fetch('https://pokeapi.co/api/v2/item?limit=1');
            const data = await response.json();
            totalItems = data.count;
            
            // 获取物品分类
            await loadItemCategories();
            
            // 加载第一页物品
            await loadItemPage(1);
        } catch (error) {
            console.error('初始化物品图鉴失败:', error);
            document.getElementById('result').innerHTML = `<div class="error">加载物品图鉴失败: ${error.message}</div>`;
        }
    }
    
    // 加载所有物品分类
    async function loadItemCategories() {
        try {
            // 获取物品分类列表
            const response = await fetch('https://pokeapi.co/api/v2/item-category?limit=100');
            const data = await response.json();
            
            // 获取每个分类的详细信息，包括中文名称
            const categoriesWithDetails = await Promise.all(
                data.results.map(async category => {
                    const categoryResponse = await fetch(category.url);
                    const categoryData = await categoryResponse.json();
                    
                    // 尝试获取中文名称 - 优先使用翻译对象
                    let chineseName;
                    if (categoryTranslations[category.name]) {
                        chineseName = categoryTranslations[category.name];
                    } else if (categoryData.names) {
                        const chineseNameObj = categoryData.names.find(name => 
                            name.language.name === 'zh-Hans' || 
                            name.language.name === 'zh-Hant' ||
                            name.language.name === 'zh'
                        );
                        if (chineseNameObj) {
                            chineseName = chineseNameObj.name;
                        } else {
                            chineseName = formatItemName(category.name);
                        }
                    } else {
                        chineseName = formatItemName(category.name);
                    }
                    
                    return {
                        id: categoryData.id,
                        name: category.name,
                        chineseName: chineseName,
                        url: category.url,
                        items: categoryData.items
                    };
                })
            );
            
            // 按 ID 排序分类
            itemCategories = categoriesWithDetails.sort((a, b) => a.id - b.id);
            console.log("物品分类加载完成:", itemCategories.length);
        } catch (error) {
            console.error('加载物品分类失败:', error);
        }
    }
    
    // 选择物品分类
    function selectItemCategory(categoryName) {
        if (categoryName === 'all') {
            currentCategory = null;
        } else {
            currentCategory = categoryName;
        }
        
        // 重新加载第一页
        loadItemPage(1);
    }
    
    // 加载指定页码的物品
    async function loadItemPage(page) {
        try {
            currentItemPage = page;
            
            // 清空结果区域并显示加载中
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = '<div class="loading-spinner"></div>';
            
            let currentItems = [];
            let currentTotal = 0;
            
            // 如果选择了分类，只显示该分类的物品
            if (currentCategory) {
                // 检查缓存中是否有该分类的物品
                if (categoryItemsCache.has(currentCategory)) {
                    currentItems = categoryItemsCache.get(currentCategory);
                } else {
                    // 找到当前选择的分类
                    const selectedCategory = itemCategories.find(cat => cat.name === currentCategory);
                    if (selectedCategory) {
                        // 获取分类中的所有物品详情
                        const itemPromises = selectedCategory.items.map(async item => {
                            // 使用简单的 URL 转换获取物品 API URL
                            const itemUrl = item.url;
                            return {
                                name: item.name,
                                url: itemUrl
                            };
                        });
                        
                        currentItems = await Promise.all(itemPromises);
                        // 缓存该分类的物品
                        categoryItemsCache.set(currentCategory, currentItems);
                    }
                }
                currentTotal = currentItems.length;
            } else {
                // 显示所有物品（使用分页）
                const offset = (page - 1) * itemsPerPage;
                const response = await fetch(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${itemsPerPage}`);
                const data = await response.json();
                currentItems = data.results;
                currentTotal = totalItems;
            }
            
            // 计算分页参数
            const totalPages = currentCategory ? 
                Math.ceil(currentTotal / itemsPerPage) : 
                Math.ceil(totalItems / itemsPerPage);
            
            // 如果有分类，可能需要进行额外的分页
            if (currentCategory) {
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, currentTotal);
                currentItems = currentItems.slice(startIndex, endIndex);
            }
            
            allItems = currentItems;
            
            // 构建物品列表基本框架
            let html = `
                <div class="item-list">
                    <h2>物品图鉴</h2>
                    
                    <!-- 分类选择按钮 -->
                    <div class="category-selector">
                        <button class="category-button ${!currentCategory ? 'active' : ''}" onclick="selectItemCategory('all')">全部物品</button>
                        ${itemCategories.map(category => 
                            `<button class="category-button ${currentCategory === category.name ? 'active' : ''}" 
                                     onclick="selectItemCategory('${category.name}')">
                                ${category.chineseName}
                             </button>`
                        ).join('')}
                    </div>
                    
                    <div class="pagination">
                        <button onclick="loadItemPage(1)" ${page === 1 ? 'disabled' : ''}>首页</button>
                        <button onclick="loadItemPage(${page - 1})" ${page === 1 ? 'disabled' : ''}>上一页</button>
                        <span class="pagination-info">
                            第 ${page}/${totalPages} 页 (共 ${currentTotal} 个物品)
                        </span>
                        <button onclick="loadItemPage(${page + 1})" ${page >= totalPages ? 'disabled' : ''}>下一页</button>
                        <button onclick="loadItemPage(${totalPages})" ${page >= totalPages ? 'disabled' : ''}>末页</button>
                    </div>
                    <div class="loading-indicator">正在加载物品详情，请稍候...</div>
                    <div class="item-grid" id="itemGrid"></div>
                </div>`;
            
            resultElement.innerHTML = html;
            
            // 获取刚刚创建的物品网格元素
            const itemGrid = document.getElementById('itemGrid');
            const loadingIndicator = document.querySelector('.loading-indicator');
            
            // 为每个物品获取详细信息并创建卡片
            let itemsLoaded = 0;
            
            // 创建一个函数用于更新加载进度
            const updateLoadingProgress = () => {
                itemsLoaded++;
                loadingIndicator.textContent = `正在加载物品详情 (${itemsLoaded}/${allItems.length})...`;
                if (itemsLoaded >= allItems.length) {
                    loadingIndicator.style.display = 'none';
                }
            };
            
            // 如果没有物品可显示
            if (allItems.length === 0) {
                loadingIndicator.textContent = '该分类下没有物品';
                return;
            }
            
            // 同时处理多个请求，但限制并发数量以避免过多API请求
            const batchSize = 10; // 每批处理的物品数量
            
            for (let i = 0; i < allItems.length; i += batchSize) {
                const batch = allItems.slice(i, i + batchSize);
                
                // 并行处理当前批次的物品
                await Promise.all(batch.map(async (item) => {
                    let itemDetail;
                    
                    // 检查缓存中是否已有此物品详情
                    if (itemDetailsCache.has(item.url)) {
                        itemDetail = itemDetailsCache.get(item.url);
                    } else {
                        // 获取物品详情
                        const itemResponse = await fetch(item.url);
                        itemDetail = await itemResponse.json();
                        
                        // 缓存物品详情
                        itemDetailsCache.set(item.url, itemDetail);
                    }
                    
                    // 获取中文名称
                    let chineseName = formatItemName(item.name); // 默认格式化名称
                    
                    if (itemDetail.names) {
                        const chineseNameObj = itemDetail.names.find(name => 
                            name.language.name === 'zh-Hans' || 
                            name.language.name === 'zh-Hant' ||
                            name.language.name === 'zh'
                        );
                        
                        if (chineseNameObj) {
                            chineseName = chineseNameObj.name;
                        }
                    }
                    
                    // 创建物品卡片
                    const itemCard = document.createElement('div');
                    itemCard.className = 'item-card';
                    itemCard.onclick = () => showItemDetail(item.url);
                    
                    itemCard.innerHTML = `
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png" 
                             onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'" 
                             alt="${item.name}">
                        <p>${chineseName}</p>
                        <p class="item-id">#${itemDetail.id}</p>
                    `;
                    
                    // 添加到物品网格
                    itemGrid.appendChild(itemCard);
                    
                    // 更新加载进度
                    updateLoadingProgress();
                }));
            }
            
        } catch (error) {
            console.error('加载物品页面失败:', error);
            document.getElementById('result').innerHTML = `<div class="error">加载物品页面失败: ${error.message}</div>`;
        }
    }

    // 格式化物品名称（首字母大写，替换连字符为空格）
    function formatItemName(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // 显示物品详情
    async function showItemDetail(url) {
        try {
            // 清空结果区域并显示加载中
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = '<div class="loading-spinner"></div>';
            
            // 从缓存获取物品详情或发起请求
            let item;
            if (itemDetailsCache.has(url)) {
                item = itemDetailsCache.get(url);
            } else {
                const response = await fetch(url);
                item = await response.json();
                itemDetailsCache.set(url, item);
            }
            
            // 获取中文名称和描述（如果有）
            let chineseName = formatItemName(item.name);
            let chineseDescription = '';
            
            if (item.names) {
                const chineseNameObj = item.names.find(name => 
                    name.language.name === 'zh-Hans' || 
                    name.language.name === 'zh-Hant' ||
                    name.language.name === 'zh'
                );
                if (chineseNameObj) {
                    chineseName = chineseNameObj.name;
                }
            }
            
            if (item.flavor_text_entries) {
                const chineseDescObj = item.flavor_text_entries.find(entry => 
                    entry.language.name === 'zh-Hans' || 
                    entry.language.name === 'zh-Hant' ||
                    entry.language.name === 'zh'
                );
                if (chineseDescObj) {
                    chineseDescription = chineseDescObj.text;
                } else {
                    // 如果没有中文描述，使用英文
                    const englishDescObj = item.flavor_text_entries.find(entry => entry.language.name === 'en');
                    if (englishDescObj) {
                        chineseDescription = englishDescObj.text;
                    }
                }
            }
            
            // 获取分类的中文名称
            let categoryName = item.category ? formatItemName(item.category.name) : '未知';
            if (item.category) {
                const categoryUrl = item.category.url;
                try {
                    const categoryResponse = await fetch(categoryUrl);
                    const categoryData = await categoryResponse.json();
                    const chineseCategoryName = categoryData.names.find(name => 
                        name.language.name === 'zh-Hans' || 
                        name.language.name === 'zh-Hant' ||
                        name.language.name === 'zh'
                    );
                    if (chineseCategoryName) {
                        categoryName = chineseCategoryName.name;
                    }
                } catch (error) {
                    console.error('获取分类中文名称失败:', error);
                }
            }
            
            // 构建物品详情HTML
            let html = `
                <div class="item-detail-card">
                    <div class="item-header">
                        <img class="item-image" 
                             src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png" 
                             onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'" 
                             alt="${item.name}">
                        <div>
                            <h2>${chineseName}</h2>
                            <p class="item-id">#${item.id}</p>
                        </div>
                    </div>
                    
                    <div class="item-description">
                        <p>${chineseDescription || '暂无描述'}</p>
                    </div>
                    
                    <div class="item-info-section">
                        <h3>物品属性</h3>
                        <div class="item-attributes">
                            <div class="item-attribute">
                                <div class="item-attribute-name">分类</div>
                                <div>${categoryName}</div>
                            </div>
                            <div class="item-attribute">
                                <div class="item-attribute-name">价格</div>
                                <div>${item.cost} 元</div>
                            </div>
                            <div class="item-attribute">
                                <div class="item-attribute-name">可持有</div>
                                <div>${item.holdable ? '是' : '否'}</div>
                            </div>
                        </div>
                    </div>`;
            
            // 添加效果描述（如果有）
            if (item.effect_entries && item.effect_entries.length > 0) {
                html += `
                    <div class="item-effect-entries">
                        <h3>物品效果</h3>`;
                
                // 尝试获取中文效果描述
                const chineseEffect = item.effect_entries.find(effect => 
                    effect.language.name === 'zh-Hans' || 
                    effect.language.name === 'zh-Hant' ||
                    effect.language.name === 'zh'
                );
                
                if (chineseEffect) {
                    html += `
                        <div class="item-effect-entry">
                            <p>${chineseEffect.effect}</p>
                            <p><small>${chineseEffect.short_effect || ''}</small></p>
                        </div>`;
                } else {
                    // 如果没有中文效果描述，使用英文
                    for (const effect of item.effect_entries) {
                        if (effect.language.name === 'en') {
                            html += `
                                <div class="item-effect-entry">
                                    <p>${effect.effect}</p>
                                    <p><small>${effect.short_effect || ''}</small></p>
                                </div>`;
                        }
                    }
                }
                
                html += `</div>`;
            }
            
            // 添加返回按钮 - 修改按钮样式
            html += `
                    <div style="text-align: center; margin-top: 30px;">
                        <button class="category-button" onclick="loadItemPage(${currentItemPage})">返回物品列表</button>
                    </div>
                </div>`;
            
            resultElement.innerHTML = html;
        } catch (error) {
            console.error('加载物品详情失败:', error);
            document.getElementById('result').innerHTML = `
                <div class="error">加载物品详情失败: ${error.message}</div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="category-button" onclick="loadItemPage(${currentItemPage})">返回物品列表</button>
                </div>`;
        }
    }
})(); 