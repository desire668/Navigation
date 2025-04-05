// 浆果图鉴相关功能
let currentBerryPage = 1;
const berriesPerPage = 20;
let totalBerries = 0;
let allBerries = [];

// 浆果名称中文翻译对象
const berryTranslations = {
    'cheri': '樱子果',
    'chesto': '零余果',
    'pecha': '桃桃果',
    'rawst': '莓莓果',
    'aspear': '利木果',
    'leppa': '苹野果',
    'oran': '橙橙果',
    'persim': '柿仔果',
    'lum': '木子果',
    'sitrus': '文柚果',
    'figy': '异奇果',
    'wiki': '芭亚果',
    'mago': '芒芒果',
    'aguav': '乐芭果',
    'iapapa': '芭乐果',
    'razz': '蔓莓果',
    'bluk': '墨莓果',
    'nanab': '蕉香果',
    'wepear': '西梨果',
    'pinap': '凰梨果',
    'pomeg': '榴石果',
    'kelpsy': '藻根果',
    'qualot': '比巴果',
    'hondew': '哈密果',
    'grepa': '萄葡果',
    'tamato': '茄番果',
    'cornn': '玉黍果',
    'magost': '岳竹果',
    'rabuta': '茸丹果',
    'nomel': '檬柠果',
    'spelon': '刺角果',
    'pamtre': '椰木果',
    'watmel': '瓜西果',
    'durin': '金枕果',
    'belue': '靛莓果',
    'occa': '欧可果',
    'passho': '帕塞果',
    'wacan': '瓦仓果',
    'rindo': '林档果',
    'yache': '雅档果',
    'chople': '释陀果',
    'kebia': '嘉宝果',
    'shuca': '沙鳞果',
    'coba': '龙睛果',
    'payapa': '啪亚果',
    'tanga': '茶蕾果',
    'charti': '隐逸果',
    'kasib': '香罗果',
    'haban': '莲蒲果',
    'colbur': '通通果',
    'babiri': '巴列果',
    'chilan': '哈密果',
    'liechi': '荔枝果',
    'ganlon': '龙眼果',
    'salac': '沙蔓果',
    'petaya': '龙火果',
    'apicot': '杏仔果',
    'lansat': '兰萨果',
    'starf': '星桃果',
    'enigma': '谜芝果',
    'micle': '奇秘果',
    'custap': '释陀果',
    'jaboca': '嘉宝果',
    'rowap': '莲蒲果',
    'roseli': '玫茄果',
    'kee': '凯利果',
    'maranga': '莲蒲果'
};

// 初始化浆果图鉴
async function initBerryDex() {
    try {
        // 清空结果区域并显示加载中
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = '<div class="loading-spinner"></div>';
        
        // 获取浆果总数
        const response = await fetch('https://pokeapi.co/api/v2/berry?limit=1');
        const data = await response.json();
        totalBerries = data.count;
        
        // 加载第一页浆果
        await loadBerryPage(1);
    } catch (error) {
        console.error('初始化浆果图鉴失败:', error);
        document.getElementById('result').innerHTML = `<div class="error">加载浆果图鉴失败: ${error.message}</div>`;
    }
}

// 加载指定页码的浆果
async function loadBerryPage(page) {
    try {
        currentBerryPage = page;
        const offset = (page - 1) * berriesPerPage;
        
        // 清空结果区域并显示加载中
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = '<div class="loading-spinner"></div>';
        
        // 获取当前页的浆果列表
        const response = await fetch(`https://pokeapi.co/api/v2/berry?offset=${offset}&limit=${berriesPerPage}`);
        const data = await response.json();
        allBerries = data.results;
        
        // 计算总页数
        const totalPages = Math.ceil(totalBerries / berriesPerPage);
        
        // 构建浆果列表HTML
        let html = `
            <div class="berry-list">
                <h2>浆果图鉴</h2>
                <div class="pagination">
                    <button onclick="loadBerryPage(1)" ${page === 1 ? 'disabled' : ''}>首页</button>
                    <button onclick="loadBerryPage(${page - 1})" ${page === 1 ? 'disabled' : ''}>上一页</button>
                    <span class="pagination-info">
                        第 ${page}/${totalPages} 页 (共 ${totalBerries} 个浆果)
                    </span>
                    <button onclick="loadBerryPage(${page + 1})" ${page >= totalPages ? 'disabled' : ''}>下一页</button>
                    <button onclick="loadBerryPage(${totalPages})" ${page >= totalPages ? 'disabled' : ''}>末页</button>
                </div>
                <div class="berry-grid">`;
        
        // 为每个浆果创建卡片
        for (const berry of allBerries) {
            const berryId = berry.url.split('/').filter(Boolean).pop();
            const berryName = berry.name;
            const chineseName = berryTranslations[berryName] || formatBerryName(berryName);
            
            html += `
                <div class="berry-card" onclick="showBerryDetail('${berry.url}')">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/${berryName}-berry.png" 
                         onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/cheri-berry.png'" 
                         alt="${berryName}">
                    <p>${chineseName}</p>
                    <p class="berry-id">#${berryId}</p>
                </div>`;
        }
        
        html += `
                </div>
            </div>`;
        
        resultElement.innerHTML = html;
    } catch (error) {
        console.error('加载浆果页面失败:', error);
        document.getElementById('result').innerHTML = `<div class="error">加载浆果页面失败: ${error.message}</div>`;
    }
}

// 格式化浆果名称（首字母大写，替换连字符为空格）
function formatBerryName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// 显示浆果详情
async function showBerryDetail(url) {
    try {
        // 清空结果区域并显示加载中
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = '<div class="loading-spinner"></div>';
        
        // 获取浆果详情
        const response = await fetch(url);
        const berry = await response.json();
        
        // 获取浆果对应的物品详情
        const itemResponse = await fetch(berry.item.url);
        const item = await itemResponse.json();
        
        // 获取中文名称和描述
        const chineseName = berryTranslations[berry.name] || formatBerryName(berry.name);
        let chineseDescription = '';
        
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
        
        // 构建浆果详情HTML
        let html = `
            <div class="berry-detail-card">
                <div class="berry-header">
                    <img class="berry-image" 
                         src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/${berry.name}-berry.png" 
                         onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/cheri-berry.png'" 
                         alt="${berry.name}">
                    <div>
                        <h2>${chineseName}</h2>
                        <p class="berry-id">#${berry.id}</p>
                    </div>
                </div>
                
                <div class="berry-description">
                    <p>${chineseDescription || '暂无描述'}</p>
                </div>
                
                <div class="berry-info-section">
                    <div class="berry-basic-info">
                        <h3>基本信息</h3>
                        <table class="berry-info-table">
                            <tr>
                                <td>生长时间</td>
                                <td>${berry.growth_time * 4}小时</td>
                            </tr>
                            <tr>
                                <td>最大数量</td>
                                <td>${berry.max_harvest}</td>
                            </tr>
                            <tr>
                                <td>大小</td>
                                <td>${berry.size}毫米</td>
                            </tr>
                            <tr>
                                <td>硬度</td>
                                <td>${berry.firmness.name}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="berry-natural-gift">
                        <h3>自然礼物</h3>
                        <table class="berry-info-table">
                            <tr>
                                <td>属性</td>
                                <td>${berry.natural_gift_type.name}</td>
                            </tr>
                            <tr>
                                <td>威力</td>
                                <td>${berry.natural_gift_power}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="berry-flavors-section">
                    <h3>浆果口味</h3>
                    <div class="flavor-list">
                        ${berry.flavors.map(flavor => `
                            <div class="flavor-item">
                                <span class="flavor-name">${flavor.flavor.name}:</span>
                                <span class="flavor-potency">${flavor.potency}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="back-button" onclick="loadBerryPage(${currentBerryPage})">返回浆果列表</button>
            </div>`;
        
        resultElement.innerHTML = html;
    } catch (error) {
        console.error('加载浆果详情失败:', error);
        document.getElementById('result').innerHTML = `
            <div class="error">加载浆果详情失败: ${error.message}</div>
            <button class="back-button" onclick="loadBerryPage(${currentBerryPage})">返回浆果列表</button>`;
    }
}
