// 添加属性翻译对象
const typeTranslations = {
    'normal': '一般',
    'fighting': '格斗',
    'flying': '飞行',
    'poison': '毒',
    'ground': '地面',
    'rock': '岩石',
    'bug': '虫',
    'ghost': '幽灵',
    'steel': '钢',
    'fire': '火',
    'water': '水',
    'grass': '草',
    'electric': '电',
    'psychic': '超能力',
    'ice': '冰',
    'dragon': '龙',
    'dark': '恶',
    'fairy': '妖精'
};

// 添加栖息地翻译对象
const habitatTranslations = {
    'cave': '洞穴',
    'forest': '森林',
    'grassland': '草地',
    'mountain': '山地',
    'rare': '稀有',
    'rough-terrain': '崎岖地形',
    'sea': '海洋',
    'urban': '城市',
    'waters-edge': '水边'
};

// 添加进化条件翻译对象
const evolutionTriggerTranslations = {
    'level-up': '等级提升',
    'trade': '交换',
    'use-item': '使用道具',
    'shed': '特殊进化',
    'spin': '旋转进化',
    'tower-of-darkness': '暗之塔',
    'tower-of-waters': '水之塔',
    'three-critical-hits': '三次要害',
    'take-damage': '受到伤害',
    'other': '其他方式'
};

// 添加时间翻译
const timeOfDayTranslations = {
    'day': '白天',
    'night': '夜晚'
};

// 添加道具翻译对象
const itemTranslations = {
    'water-stone': '水之石',
    'thunder-stone': '雷之石',
    'fire-stone': '火之石',
    'moon-stone': '月之石',
    'sun-stone': '日之石',
    'shiny-stone': '光之石',
    'dusk-stone': '暗之石',
    'dawn-stone': '觉醒之石',
    'leaf-stone': '叶之石',
    'ice-stone': '冰之石',
    'oval-stone': '椭圆之石'
};

// 修改地点翻译对象
const locationTranslations = {
    'near-moss-rock': '苔岩附近',
    'near-ice-rock': '冰岩附近',
    'mount-coronet': '天冠山',
    'eterna-forest': '永恒森林',
    'sinnoh-route-217': '神奥217号道路',
    'pinwheel-forest': '矢车森林',
    'twist-mountain': '扭曲山',
    'frost-cavern': '冰霜洞窟',
    'kalos-route-20': '卡洛斯20号道路',
    'alola-route-3': '阿罗拉3号道路',
    'poni-grove': '波尼树林',
    'snowpoint-temple': '雪峰神殿',
    'chargestone-cave': '充电岩窟',
    'magnetic-field': '磁场区域',
    'route-217': '217号道路',
    'ancient-tomb': '古代坟墓',
    'desert-ruins': '沙漠遗迹',
    'distortion-world': '扭曲世界',
    'dragonspiral-tower': '龙螺旋之塔',
    'galar-mine': '伽勒尔矿场',
    'glimwood-tangle': '萤光森林',
    'ice-rock': '冰岩',
    'moss-rock': '苔岩',
    'seaside-cave': '海边洞窟',
    'terminus-cave': '终端洞窟',
    'victory-road': '冠军之路'
};

// 添加版本翻译对象
const versionTranslations = {
    'red': '红',
    'blue': '蓝',
    'yellow': '黄',
    'gold': '金',
    'silver': '银',
    'crystal': '水晶',
    'ruby': '红宝石',
    'sapphire': '蓝宝石',
    'emerald': '绿宝石',
    'firered': '火红',
    'leafgreen': '叶绿',
    'diamond': '钻石',
    'pearl': '珍珠',
    'platinum': '白金',
    'heartgold': '心金',
    'soulsilver': '魂银',
    'black': '黑',
    'white': '白',
    'black-2': '黑2',
    'white-2': '白2',
    'x': 'X',
    'y': 'Y',
    'omega-ruby': '欧米伽红宝石',
    'alpha-sapphire': '阿尔法蓝宝石',
    'sun': '太阳',
    'moon': '月亮',
    'ultra-sun': '究极之日',
    'ultra-moon': '究极之月',
    'sword': '剑',
    'shield': '盾',
    'scarlet': '朱',
    'violet': '紫'
};

// 添加遭遇方式翻译
const methodTranslations = {
    'walk': '走路',
    'surf': '冲浪',
    'old-rod': '破旧钓竿',
    'good-rod': '好钓竿',
    'super-rod': '超级钓竿',
    'rock-smash': '碎岩',
    'headbutt': '头锤树木',
    'gift': '获赠',
    'gift-egg': '获赠蛋',
    'only-one': '唯一',
    'cave-spots': '洞窟',
    'dark-grass': '深色草丛',
    'rough-terrain': '崎岖地形'
};

// 在文件开头添加全局变量
let currentPage = 1;
let allMoves = [];
let currentPokemonData = null;

// 在文件开头添加宝可梦名称翻译缓存
let pokemonNameCache = new Map();

// 在文件开头添加新的缓存变量
let pokemonList = [];
let isInitialized = false;

// 添加能力值计算相关的常量
const statColors = {
    'hp': 'hp-bar',
    'attack': 'attack-bar',
    'defense': 'defense-bar',
    'special-attack': 'special-attack-bar',
    'special-defense': 'special-defense-bar',
    'speed': 'speed-bar'
};

const STAT_CALC = {
    HP: {
        base: (base, iv, ev, level) => Math.floor((2 * base + iv + Math.floor(ev/4)) * level/100) + level + 10,
        min: (base, level) => Math.floor((2 * base + 0 + 0) * level/100) + level + 10,
        max: (base, level) => Math.floor((2 * base + 31 + Math.floor(252/4)) * level/100) + level + 10
    },
    OTHER: {
        base: (base, iv, ev, level, nature) => Math.floor((Math.floor((2 * base + iv + Math.floor(ev/4)) * level/100) + 5) * nature),
        min: (base, level) => Math.floor((Math.floor((2 * base + 0 + 0) * level/100) + 5) * 0.9),
        max: (base, level) => Math.floor((Math.floor((2 * base + 31 + Math.floor(252/4)) * level/100) + 5) * 1.1)
    }
};

// 全局变量，跟踪技能加载状态
let isLoadingAllMoves = false;
let allMovesLoaded = false;

// 修改初始化函数
async function initializePokemonList() {
    if (isInitialized) return;
    
    try {
        // 获取前 1000 个宝可梦的基本列表
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await response.json();
        
        // 获取每个宝可梦的中文名称
        const speciesPromises = data.results.map(async (pokemon) => {
            const speciesResponse = await fetch(pokemon.url.replace('/pokemon/', '/pokemon-species/'));
            const speciesData = await speciesResponse.json();
            
            const chineseName = speciesData.names.find(
                name => name.language.name === 'zh-Hans'
            )?.name || pokemon.name;
            
            return {
                id: parseInt(pokemon.url.split('/').slice(-2, -1)[0]),
                name: pokemon.name,
                chinese_name: chineseName
            };
        });
        
        // 等待所有中文名称获取完成
        pokemonList = await Promise.all(speciesPromises);
        
        // 按 ID 排序
        pokemonList.sort((a, b) => a.id - b.id);
        
        // 初始化完成
        isInitialized = true;
        
        // 设置搜索建议功能
        setupSearchSuggestions();
    } catch (error) {
        console.error('初始化宝可梦列表失败:', error);
    }
}

// 修改搜索函数
// 添加请求缓存
const requestCache = new Map();

// 添加延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 带重试的fetch函数
async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
    // 检查缓存
    if (requestCache.has(url)) {
        return requestCache.get(url);
    }

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // 存入缓存
            requestCache.set(url, data);
            return data;
        } catch (error) {
            if (i === retries - 1) throw error;
            await delay(delayMs * (i + 1)); // 递增延迟时间
        }
    }
}

let currentMoves = [];
let moveCache = new Map();

async function searchPokemon(nameOrId = '') {
    const searchInput = (nameOrId || document.getElementById('searchInput').value).toLowerCase();
    const resultDiv = document.getElementById('result');

    if (!searchInput) {
        resultDiv.innerHTML = '<p class="error">请输入宝可梦ID或名称</p>';
        return;
    }

    try {
        // 显示加载提示
        resultDiv.innerHTML = '<p>正在加载宝可梦详细信息，请稍候...</p>';
        
        // 直接尝试搜索，不等待完整列表初始化
        let searchTerm = searchInput;
        
        // 如果是数字ID，直接使用
        if (!isNaN(searchInput)) {
            searchTerm = searchInput;
        } else if (isInitialized) {
            // 如果列表已初始化，尝试查找匹配的宝可梦
            const foundPokemon = pokemonList.find(pokemon => 
                pokemon.chinese_name.toLowerCase() === searchInput ||
                pokemon.name.toLowerCase() === searchInput
            );

            if (foundPokemon) {
                searchTerm = foundPokemon.name;
            }
        }

        // 继续原有的获取宝可梦详细信息的逻辑
        const data = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`);

        // 获取宝可梦的详细种族信息
        const speciesData = await fetchWithRetry(data.species.url);

        // 获取中文名称
        const chineseName = speciesData.names.find(
            name => name.language.name === 'zh-Hans'
        )?.name || data.name;

        // 缓存宝可梦名称
        pokemonNameCache.set(data.name, chineseName);

        // 获取中文描述
        const chineseDescription = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'zh-Hans'
        ) || speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'zh-Hant'
        ) || speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );

        // 获取技能详细信息
        const abilities = await Promise.all(
            data.abilities.map(async (ability) => {
                const abilityData = await fetchWithRetry(ability.ability.url);
                
                // 获取中文特性名称
                const chineseName = abilityData.names.find(
                    name => name.language.name === 'zh-Hans'
                )?.name || ability.ability.name;
                
                // 获取中文特性描述
                const chineseDescription = abilityData.flavor_text_entries.find(
                    entry => entry.language.name === 'zh-Hans'
                ) || abilityData.flavor_text_entries.find(
                    entry => entry.language.name === 'zh-Hant'
                ) || abilityData.flavor_text_entries.find(
                    entry => entry.language.name === 'en'
                );

                return {
                    name: chineseName,
                    is_hidden: ability.is_hidden,
                    description: chineseDescription ? chineseDescription.flavor_text.replace(/\f/g, ' ') : '无描述'
                };
            })
        );

        // 获取进化链数据
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionData = await fetchWithRetry(evolutionChainUrl);

        // 处理进化链数据
        const evolutionChain = await processEvolutionChain(evolutionData.chain);

        // 获取遭遇地点数据
        const encountersData = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`);

        // 处理遭遇地点数据
        const encounters = await processEncounters(encountersData);

        // 保存完整的数据到全局变量
        currentPokemonData = {
            data: {
                ...data,
                chinese_name: chineseName
            },
            speciesData: speciesData,
            abilities: abilities,
            description: chineseDescription,
            evolutionChain: evolutionChain,
            encounters: encounters
        };

        // 重置当前页码和技能数据
        currentPage = 1;
        currentMoves = [];
        allMovesLoaded = false;  // 重置技能加载状态
        
        // 只加载前10个技能的详细信息
        const firstPageMoves = data.moves.slice(0, 10);
        currentMoves = await loadMovesDetails(firstPageMoves);
        
        // 渲染宝可梦卡片
        renderPokemonCard(currentPokemonData.data, currentPokemonData.speciesData, 
                         currentPokemonData.abilities, currentPokemonData.description);
                         
        // 如果列表尚未初始化，在后台开始初始化
        if (!isInitialized) {
            initializePokemonList();
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

async function loadMovesDetails(moves) {
    return await Promise.all(
        moves.map(async (move) => {
            // 检查缓存中是否已有该技能数据
            if (moveCache.has(move.move.url)) {
                return moveCache.get(move.move.url);
            }

            const moveData = await fetchWithRetry(move.move.url);
            
            // 获取中文名称
            const chineseName = moveData.names.find(
                name => name.language.name === 'zh-Hans'
            )?.name || move.move.name;

            // 获取中文描述
            const chineseDescription = moveData.flavor_text_entries.find(
                entry => entry.language.name === 'zh-Hans'
            ) || moveData.flavor_text_entries.find(
                entry => entry.language.name === 'zh-Hant'
            ) || moveData.flavor_text_entries.find(
                entry => entry.language.name === 'en'
            );

            // 获取学习方式
            const learnMethods = move.version_group_details.map(detail => {
                const method = detail.move_learn_method.name;
                const level = detail.level_learned_at;
                
                switch(method) {
                    case 'level-up':
                        return `升级至${level}级`;
                    case 'machine':
                        return 'TM/TR（技能机学习）';
                    case 'egg':
                        return '蛋技能';
                    case 'tutor':
                        return '技能教学';
                    default:
                        return method;
                }
            });

            const moveInfo = {
                name: chineseName,
                description: chineseDescription ? chineseDescription.flavor_text.replace(/\f/g, ' ') : '无描述',
                power: moveData.power || '-',
                accuracy: moveData.accuracy ? `${moveData.accuracy}%` : '-',
                pp: moveData.pp,
                type: typeTranslations[moveData.type.name] || moveData.type.name,
                learnMethods: [...new Set(learnMethods)].join(', ')
            };

            // 将技能数据添加到缓存
            moveCache.set(move.move.url, moveInfo);

            return moveInfo;
        })
    );
}

// 完全重写changePage函数
async function changePage(page) {
    console.log("changePage called with page:", page);
    
    // 防止重复点击
    if (isLoadingAllMoves) {
        console.log("Already loading moves, returning");
        return;
    }
    
    if (!currentPokemonData) {
        console.log("No Pokemon data available");
        return;
    }
    
    const totalPages = Math.ceil(currentPokemonData.data.moves.length / 10);
    if (page < 1 || page > totalPages) {
        console.log("Invalid page number:", page);
        return;
    }

    // 显示加载提示
    const movesTableBody = document.querySelector('.moves-table tbody');
    if (!movesTableBody) {
        console.log("Moves table body not found");
        return;
    }
    
    movesTableBody.innerHTML = '<tr><td colspan="7">加载中...</td></tr>';
    
    try {
        isLoadingAllMoves = true;
        console.log("isLoadingAllMoves set to true");
        
        // 如果还没有加载所有技能，并且不是第一页，则加载所有技能
        if (!allMovesLoaded && (page > 1 || currentMoves.length < 10)) {
            console.log("Loading all moves...");
            
            // 加载所有技能数据
            const allMoves = currentPokemonData.data.moves;
            currentMoves = await loadMovesDetails(allMoves);
            allMovesLoaded = true;
            
            console.log("All moves loaded, count:", currentMoves.length);
        }
        
        currentPage = page;
        const startIndex = (currentPage - 1) * 10;
        const endIndex = Math.min(startIndex + 10, currentMoves.length);
        
        console.log("Displaying moves from", startIndex, "to", endIndex);
        
        // 从已加载的技能数据中获取当前页的数据
        const displayMoves = currentMoves.slice(startIndex, endIndex);
        
        // 更新技能表格
        movesTableBody.innerHTML = displayMoves.map(move => `
            <tr>
                <td>${move.name}</td>
                <td>${move.type}</td>
                <td>${move.power}</td>
                <td>${move.accuracy}</td>
                <td>${move.pp}</td>
                <td>${move.description}</td>
                <td>${move.learnMethods}</td>
            </tr>
        `).join('');
        
        // 更新分页信息
        updatePaginationControls(currentPage, totalPages);
        
    } catch (error) {
        console.error('加载技能数据失败:', error);
        movesTableBody.innerHTML = `<tr><td colspan="7">加载技能数据失败: ${error.message}</td></tr>`;
    } finally {
        isLoadingAllMoves = false;
        console.log("isLoadingAllMoves reset to false");
    }
}

// 添加一个新函数来更新分页控件
function updatePaginationControls(currentPage, totalPages) {
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `第 ${currentPage}/${totalPages} 页 (共 ${currentPokemonData.data.moves.length} 个技能)`;
    }
    
    const prevButtons = document.querySelectorAll('.pagination button:nth-child(1), .pagination button:nth-child(2)');
    const nextButtons = document.querySelectorAll('.pagination button:nth-child(4), .pagination button:nth-child(5)');
    
    prevButtons.forEach(button => {
        button.disabled = currentPage === 1;
    });
    
    nextButtons.forEach(button => {
        button.disabled = currentPage === totalPages;
    });
}

// 修改渲染能力值的部分
function renderStats(stats, totalStats) {
    const statColors = {
        'hp': 'hp-bar',
        'attack': 'attack-bar',
        'defense': 'defense-bar',
        'special-attack': 'special-attack-bar',
        'special-defense': 'special-defense-bar',
        'speed': 'speed-bar'
    };

    return `
        <div class="stats module-section">
            <h3>种族值</h3>
            <table class="stats-table">
                <tbody>
                    ${stats.map(stat => {
                        const maxValue = 255;
                        const percentage = (stat.base_stat / maxValue) * 100;
                        const statName = translateStatName(stat.stat.name);
                        const calculator = statName === 'HP' ? STAT_CALC.HP : STAT_CALC.OTHER;
                        
                        const lv50Min = calculator.min(stat.base_stat, 50);
                        const lv50Max = calculator.max(stat.base_stat, 50);
                        const lv100Min = calculator.min(stat.base_stat, 100);
                        const lv100Max = calculator.max(stat.base_stat, 100);

                        return `
                            <tr>
                                <td>${statName}: ${stat.base_stat}</td>
                                <td class="stat-bar-cell">
                                    <div class="stat-bar-container">
                                        <div class="stat-bar ${statColors[stat.stat.name]}" 
                                             style="width: ${percentage}%"></div>
                                    </div>
                                </td>
                                <td class="stat-range-cell">
                                    ${lv50Min}-${lv50Max} | ${lv100Min}-${lv100Max}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                    <tr>
                        <td>总和: ${totalStats}</td>
                        <td colspan="2"></td>
                    </tr>
                </tbody>
            </table>
            <div class="stat-description">
                <p>• 最小能力值以基础点数、个体值均为0，以及性格降低能力值计算。</p>
                <p>• 最大能力值以基础点数为252，个体值为31，以及性格增加能力值计算。</p>
            </div>
        </div>
    `;
}

// 修改渲染宝可梦卡片的函数
function renderPokemonCard(data, speciesData, abilities, chineseDescription) {
    const totalPages = Math.ceil(currentPokemonData.data.moves.length / 10);

    const evolutionChainHTML = `
        <div class="evolution-chain">
            ${currentPokemonData.evolutionChain.map((pokemon, index, array) => `
                <div class="evolution-stage ${pokemon.id === data.id ? 'current' : ''}" 
                     onclick="searchPokemon('${pokemon.name}')">
                    <img src="${pokemon.sprite}" alt="${pokemon.chinese_name}">
                    <p>${pokemon.chinese_name}</p>
                    ${pokemon.evolution_details.length > 0 ? 
                        `<p class="evolution-condition">${pokemon.evolution_details.join(', ')}</p>` : ''}
                </div>
                ${index < array.length - 1 ? `
                    <div class="evolution-arrow">
                        ➜
                    </div>
                ` : ''}
            `).join('')}
        </div>
    `;

    // 修改种族信息和遭遇地点的 HTML
    const speciesAndEncountersHTML = `
        <div class="clearfix">
            <div class="species-info">
                <h3>种族信息:</h3>
                <p>栖息地: ${speciesData.habitat ? habitatTranslations[speciesData.habitat.name] || speciesData.habitat.name : '未知'}</p>
                <p>捕获率: ${speciesData.capture_rate}</p>
                <p>基础经验值: ${data.base_experience}</p>
                <p>性别比例: ${speciesData.gender_rate === -1 ? '无性别' : 
                    `雌性 ${(speciesData.gender_rate / 8) * 100}%, 雄性 ${((8 - speciesData.gender_rate) / 8) * 100}%`}</p>
            </div>

            <div class="encounters">
                <h3>遭遇地点:</h3>
                ${currentPokemonData.encounters && Object.keys(currentPokemonData.encounters).length > 0 ? `
                    <select class="version-select" onchange="showVersionEncounters(this.value)">
                        <option value="">选择游戏版本</option>
                        ${Object.keys(currentPokemonData.encounters).map(version => 
                            `<option value="${version}">${version}版</option>`
                        ).join('')}
                    </select>
                    <div class="encounter-locations" id="encounterLocations"></div>
                ` : '<p>无野外遭遇地点数据</p>'}
            </div>
        </div>
    `;

    // 计算总种族值
    const totalStats = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    
    // 使用新的渲染函数
    const statsHTML = renderStats(data.stats, totalStats);

    // 使用新的renderMovesTable函数
    const movesTableHTML = renderMovesTable(currentMoves, currentPage, totalPages);

    const pokemonCard = `
        <div class="pokemon-card">
            ${evolutionChainHTML}
            <div class="basic-info-section">
                <div class="pokemon-images">
                    <img src="${data.sprites.front_default}" alt="${data.chinese_name} 正面">
                    <img src="${data.sprites.back_default}" alt="${data.chinese_name} 背面">
                    ${data.sprites.front_shiny ? 
                      `<img src="${data.sprites.front_shiny}" alt="${data.chinese_name} 闪光">` : ''}
                </div>
                
                <h2>${data.chinese_name}</h2>
                
                <div class="pokemon-description">
                    <p>${chineseDescription ? chineseDescription.flavor_text.replace(/\f/g, ' ') : '暂无描述'}</p>
                </div>

                <div class="basic-info-container module-section">
                    <div class="basic-info">
                        <p>图鉴编号: #${data.id.toString().padStart(3, '0')}</p>
                        <p>属性: ${data.types.map(type => typeTranslations[type.type.name] || type.type.name).join(', ')}</p>
                        <p>身高: ${data.height/10} m</p>
                        <p>体重: ${data.weight/10} kg</p>
                    </div>

                    <div class="stats">
                        <table class="stats-table">
                            <tbody>
                                ${data.stats.map(stat => {
                                    const maxValue = 255;
                                    const percentage = (stat.base_stat / maxValue) * 100;
                                    const statName = translateStatName(stat.stat.name);
                                    const calculator = statName === 'HP' ? STAT_CALC.HP : STAT_CALC.OTHER;
                                    
                                    const lv50Min = calculator.min(stat.base_stat, 50);
                                    const lv50Max = calculator.max(stat.base_stat, 50);
                                    const lv100Min = calculator.min(stat.base_stat, 100);
                                    const lv100Max = calculator.max(stat.base_stat, 100);

                                    return `
                                        <tr>
                                            <td>${statName}: ${stat.base_stat}</td>
                                            <td class="stat-bar-cell">
                                                <div class="stat-bar-container">
                                                    <div class="stat-bar ${statColors[stat.stat.name]}" 
                                                         style="width: ${percentage}%"></div>
                                                </div>
                                            </td>
                                            <td class="stat-range-cell">
                                                ${lv50Min}-${lv50Max} | ${lv100Min}-${lv100Max}
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                                <tr>
                                    <td>总和: ${totalStats}</td>
                                    <td colspan="2"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="stat-description">
                            <p>• 最小能力值以基础点数、个体值均为0，以及性格降低能力值计算。</p>
                            <p>• 最大能力值以基础点数为252，个体值为31，以及性格增加能力值计算。</p>
                        </div>
                    </div>
                </div>

                <div class="abilities module-section">
                    <h3>特性:</h3>
                    ${abilities.map(ability => `
                        <div class="ability">
                            <p>${ability.name} ${ability.is_hidden ? '(隐藏特性)' : ''}</p>
                            <p class="ability-description">${ability.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="info-section module-section">
                    ${speciesAndEncountersHTML}
                </div>
                
                ${movesTableHTML}
            </div>
        </div>
    `;

    document.getElementById('result').innerHTML = pokemonCard;
    
    // 在DOM更新后绑定分页按钮事件
    setTimeout(() => {
        const paginationButtons = document.querySelectorAll('.pagination button');
        paginationButtons.forEach(button => {
            // 移除所有现有事件监听器
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // 根据按钮类名设置新的点击事件
            if (newButton.classList.contains('page-first')) {
                newButton.addEventListener('click', () => changePage(1));
            } else if (newButton.classList.contains('page-prev')) {
                newButton.addEventListener('click', () => changePage(currentPage - 1));
            } else if (newButton.classList.contains('page-next')) {
                newButton.addEventListener('click', () => changePage(currentPage + 1));
            } else if (newButton.classList.contains('page-last')) {
                const totalPages = Math.ceil(currentPokemonData.data.moves.length / 10);
                newButton.addEventListener('click', () => changePage(totalPages));
            }
        });
        
        console.log('分页按钮事件已绑定');
    }, 100);
}

// 修改能力值名称翻译函数
function translateStatName(name) {
    const translations = {
        'hp': 'HP',
        'attack': '攻击',
        'defense': '防御',
        'special-attack': '特攻',
        'special-defense': '特防',
        'speed': '速度'
    };
    return translations[name] || name;
}

// 根据能力值获取颜色
function getStatColor(value) {
    if (value >= 150) return '#FF3E3E';      // 红色
    if (value >= 100) return '#4CAF50';      // 绿色
    if (value >= 70) return '#2196F3';       // 蓝色
    if (value >= 50) return '#FFC107';       // 黄色
    return '#9E9E9E';                        // 灰色
}

// 添加回车键搜索功能
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});

// 修改处理进化链的函数
async function processEvolutionChain(chain) {
    const processedChain = [];
    
    async function processStage(stage) {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${stage.species.name}/`);
        const pokemonData = await pokemonResponse.json();
        
        const speciesResponse = await fetch(stage.species.url);
        const speciesData = await speciesResponse.json();
        const chineseName = speciesData.names.find(
            name => name.language.name === 'zh-Hans'
        )?.name || stage.species.name;

        pokemonNameCache.set(stage.species.name, chineseName);

        return {
            name: stage.species.name,
            chinese_name: chineseName,
            id: pokemonData.id,
            sprite: pokemonData.sprites.front_default,
            evolution_details: stage.evolution_details.map(detail => {
                const conditions = [];
                
                // 等级提升
                if (detail.min_level) {
                    conditions.push(`达到${detail.min_level}级`);
                }
                
                // 使用道具
                if (detail.item) {
                    const itemName = itemTranslations[detail.item.name] || detail.item.name;
                    conditions.push(`使用${itemName}`);
                }
                
                // 特定时间
                if (detail.time_of_day) {
                    conditions.push(timeOfDayTranslations[detail.time_of_day]);
                }
                
                // 友好度
                if (detail.min_happiness) {
                    conditions.push(`友好度达到${detail.min_happiness}`);
                }
                
                // 特定地点
                if (detail.location) {
                    const locationName = locationTranslations[detail.location.name] || detail.location.name;
                    conditions.push(`在${locationName}`);
                }
                
                // 已知招式
                if (detail.known_move) {
                    // 获取招式的中文名称（如果有的话）
                    const moveName = detail.known_move.name; // 这里可以添加招式名称的中文翻译
                    conditions.push(`已学会${moveName}`);
                }
                
                // 已知招式类型
                if (detail.known_move_type) {
                    const moveType = typeTranslations[detail.known_move_type.name] || detail.known_move_type.name;
                    conditions.push(`已学会${moveType}属性的招式`);
                }

                // 进化触发器
                if (detail.trigger && detail.trigger.name) {
                    const triggerName = evolutionTriggerTranslations[detail.trigger.name];
                    if (triggerName && !conditions.length) {
                        conditions.push(triggerName);
                    }
                }

                return conditions.join('，');
            }).filter(Boolean)  // 移除空字符串
              .filter((condition, index, self) => self.indexOf(condition) === index)  // 去重
        };
    }

    async function traverseChain(currentChain) {
        const currentStage = await processStage(currentChain);
        processedChain.push(currentStage);

        if (currentChain.evolves_to.length > 0) {
            for (const evolution of currentChain.evolves_to) {
                await traverseChain(evolution);
            }
        }
    }

    await traverseChain(chain);
    return processedChain;
}

// 添加搜索建议相关的代码
function setupSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.search-container');
    
    // 创建建议列表容器
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions';
    searchContainer.appendChild(suggestionsDiv);

    // 添加输入事件监听器
    searchInput.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        
        // 如果输入为空，隐藏建议列表
        if (!searchText) {
            suggestionsDiv.style.display = 'none';
            return;
        }

        // 过滤匹配的宝可梦
        const suggestions = pokemonList.filter(pokemon => 
            pokemon.chinese_name.toLowerCase().includes(searchText) ||
            pokemon.name.toLowerCase().includes(searchText)
        ).slice(0, 10); // 限制显示前10个结果

        // 显示建议列表
        if (suggestions.length > 0) {
            suggestionsDiv.style.display = 'block';
            suggestionsDiv.innerHTML = suggestions.map(pokemon => `
                <div class="suggestion-item" onclick="selectPokemon('${pokemon.name}')">
                    ${pokemon.chinese_name} (${pokemon.name})
                </div>
            `).join('');
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });

    // 点击其他地方时隐藏建议列表
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });

    // 添加键盘导航
    searchInput.addEventListener('keydown', function(e) {
        const items = suggestionsDiv.getElementsByClassName('suggestion-item');
        const activeItem = suggestionsDiv.querySelector('.suggestion-item:hover');
        
        if (items.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            let nextItem;

            if (!activeItem) {
                nextItem = e.key === 'ArrowDown' ? items[0] : items[items.length - 1];
            } else {
                const currentIndex = Array.from(items).indexOf(activeItem);
                if (e.key === 'ArrowDown') {
                    nextItem = items[currentIndex + 1] || items[0];
                } else {
                    nextItem = items[currentIndex - 1] || items[items.length - 1];
                }
            }

            if (nextItem) {
                Array.from(items).forEach(item => item.classList.remove('active'));
                nextItem.classList.add('active');
                nextItem.scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Enter' && activeItem) {
            e.preventDefault();
            activeItem.click();
        }
    });
}

// 添加选择宝可梦的函数
function selectPokemon(name) {
    document.getElementById('searchInput').value = name;
    document.querySelector('.search-suggestions').style.display = 'none';
    searchPokemon(name);
}

// 在页面加载时开始初始化宝可梦列表，但不阻塞用户操作
window.addEventListener('load', () => {
    // 延迟一秒开始加载，让页面先完成渲染
    setTimeout(initializePokemonList, 1000);
});

// 添加处理遭遇地点的函数
async function processEncounters(encountersData) {
    // 按版本分组
    const groupedEncounters = encountersData.reduce((acc, encounter) => {
        encounter.version_details.forEach(version => {
            const versionName = versionTranslations[version.version.name] || version.version.name;
            if (!acc[versionName]) {
                acc[versionName] = [];
            }
            
            const locationName = encounter.location_area.name
                .replace(/-/g, ' ')
                .replace(/area/g, '区域')
                .replace(/route/g, '道路')
                .replace(/cave/g, '洞窟')
                .replace(/forest/g, '森林')
                .replace(/city/g, '城市')
                .replace(/town/g, '小镇');

            const methods = version.encounter_details.map(detail => {
                const method = methodTranslations[detail.method.name] || detail.method.name;
                const chance = detail.chance;
                const level = detail.min_level === detail.max_level ? 
                    `${detail.min_level}级` : 
                    `${detail.min_level}-${detail.max_level}级`;
                return `${method}（${level}，出现概率${chance}%）`;
            });

            acc[versionName].push({
                location: locationName,
                methods: [...new Set(methods)]
            });
        });
        return acc;
    }, {});

    return groupedEncounters;
}

// 添加显示版本遭遇信息的函数
function showVersionEncounters(version) {
    const locationsDiv = document.getElementById('encounterLocations');
    if (!version) {
        locationsDiv.innerHTML = '';
        return;
    }

    const locations = currentPokemonData.encounters[version];
    locationsDiv.innerHTML = locations.map(loc => `
        <div class="encounter-location">
            <strong>${loc.location}</strong>
            <ul class="encounter-methods">
                ${loc.methods.map(method => `<li>${method}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// 添加获取种族值范围的函数
async function getStatRanges(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}/`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取种族值范围失败:', error);
        return null;
    }
}

// 修改renderMovesTable函数，使用新的renderMovesTable函数
function renderMovesTable(moves, currentPage, totalPages) {
    return `
        <div class="moves module-section">
            <h3>可学会的技能:</h3>
            <div class="moves-list">
                <table class="moves-table">
                    <thead>
                        <tr>
                            <th>技能名称</th>
                            <th>属性</th>
                            <th>威力</th>
                            <th>命中</th>
                            <th>PP值</th>
                            <th>效果</th>
                            <th>获得方式</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${moves.length > 0 ? moves.map(move => `
                            <tr>
                                <td>${move.name}</td>
                                <td>${move.type}</td>
                                <td>${move.power}</td>
                                <td>${move.accuracy}</td>
                                <td>${move.pp}</td>
                                <td>${move.description}</td>
                                <td>${move.learnMethods}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="7">加载中...</td></tr>'}
                    </tbody>
                </table>
                <div class="pagination">
                    <button class="page-first">首页</button>
                    <button class="page-prev">上一页</button>
                    <span class="pagination-info">
                        第 ${currentPage}/${totalPages} 页 (共 ${currentPokemonData.data.moves.length} 个技能)
                    </span>
                    <button class="page-next">下一页</button>
                    <button class="page-last">末页</button>
                </div>
            </div>
        </div>
    `;
}