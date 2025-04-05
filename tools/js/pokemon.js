// 在文件开头添加
console.log('Pokemon.js loaded successfully');

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
    'oval-stone': '椭圆之石',
    'master-ball': '大师球',
    'ultra-ball': '高级球',
    'great-ball': '超级球',
    'poke-ball': '精灵球',
    'potion': '伤药',
    'super-potion': '好伤药',
    'hyper-potion': '厉害伤药',
    'max-potion': '全满药',
    'revive': '活力碎片',
    'max-revive': '活力块',
    'full-restore': '全复药',
    'antidote': '解毒药',
    'burn-heal': '烧伤药',
    'ice-heal': '解冻药',
    'awakening': '解眠药',
    'paralyze-heal': '解麻药',
    'full-heal': '万能药',
    'escape-rope': '离洞绳',
    'repel': '除虫喷雾',
    'super-repel': '白银喷雾',
    'max-repel': '黄金喷雾'
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

// 1. 添加缓存控制
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时
const cache = {
    pokemon: new Map(),
    species: new Map(),
    moves: new Map(),
    evolution: new Map(),
    
    set: function(key, type, data) {
        this[type].set(key, {
            data: data,
            timestamp: Date.now()
        });
    },
    
    get: function(key, type) {
        const item = this[type].get(key);
        if (!item) return null;
        if (Date.now() - item.timestamp > CACHE_DURATION) {
            this[type].delete(key);
            return null;
        }
        return item.data;
    }
};

// 在文件开头添加全局变量
let debounceTimer;

// 修改初始化函数
async function initializePokemonList() {
    if (isInitialized) return;
    
    try {
        showLoadingState('正在加载宝可梦数据...');
        
        // 获取前 1025 个宝可梦的基本列表
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await response.json();
        
        // 批量获取宝可梦的中文名称
        const batchSize = 50;
        const batches = [];
        
        for (let i = 0; i < data.results.length; i += batchSize) {
            const batch = data.results.slice(i, i + batchSize);
            batches.push(batch);
        }
        
        let processedCount = 0;
        const totalCount = data.results.length;
        
        for (const batch of batches) {
            const batchPromises = batch.map(async (pokemon) => {
                try {
                    const speciesUrl = pokemon.url.replace('/pokemon/', '/pokemon-species/');
                    const speciesResponse = await fetchWithRetry(speciesUrl);
                    
                    const chineseName = speciesResponse.names.find(
                        name => name.language.name === 'zh-Hans'
                    )?.name || pokemon.name;
                    
                    processedCount++;
                    if (processedCount % 50 === 0) {
                        showLoadingState(`正在加载宝可梦数据... (${processedCount}/${totalCount})`);
                    }
                    
                    return {
                        id: parseInt(pokemon.url.split('/').slice(-2, -1)[0]),
                        name: pokemon.name,
                        chinese_name: chineseName,
                        url: pokemon.url
                    };
                } catch (error) {
                    console.error(`获取宝可梦 ${pokemon.name} 的数据失败:`, error);
                    return null;
                }
            });
            
            const batchResults = await Promise.all(batchPromises);
            pokemonList.push(...batchResults.filter(result => result !== null));
        }
        
        // 按 ID 排序
        pokemonList.sort((a, b) => a.id - b.id);
        
        // 将数据保存到本地存储
        localStorage.setItem('pokemonList', JSON.stringify({
            data: pokemonList,
            timestamp: Date.now()
        }));
        
        // 初始化完成
        isInitialized = true;
        
        // 设置搜索建议功能
        setupSearchSuggestions();
        
        // 清除加载提示
        document.getElementById('result').innerHTML = '<p class="search-hint">请输入宝可梦名称或ID进行搜索</p>';
        
    } catch (error) {
        console.error('初始化宝可梦列表失败:', error);
        showError('加载宝可梦数据失败，请刷新页面重试');
    }
}

// 修改 displayPokemonList 函数，添加点击事件
function displayPokemonList(pokemonList) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="pokemon-grid">
            ${pokemonList.map(pokemon => `
                <div class="pokemon-item" onclick="searchPokemon('${pokemon.name}')" role="button" tabindex="0">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" 
                         alt="${pokemon.chinese_name}"
                         loading="lazy">
                    <div class="pokemon-info">
                        <span class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</span>
                        <span class="pokemon-name">${pokemon.chinese_name}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // 添加键盘访问支持
    const pokemonItems = resultDiv.querySelectorAll('.pokemon-item');
    pokemonItems.forEach(item => {
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

// 修改 setupSearchSuggestions 函数，添加搜索按钮功能
function setupSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.createElement('button');
    let debounceTimer;
    
    // 创建并添加搜索按钮
    searchButton.className = 'search-button';
    searchButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 1 9 1a8 8 0 0 1 0 16zm0-2A6 6 0 1 0 9 3a6 6 0 0 0 0 12z" fill="currentColor"/>
            <path d="M13.5 13.5L19 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    
    // 将搜索按钮添加到搜索框容器中
    const searchContainer = searchInput.parentElement;
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(searchButton);
    
    // 添加搜索按钮点击事件
    searchButton.addEventListener('click', () => {
        searchPokemon();
    });
    
    // 原有的输入事件处理
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        
        const searchText = e.target.value.toLowerCase().trim();
        
        if (!searchText) {
            document.getElementById('result').innerHTML = '<p class="search-hint">请输入宝可梦名称或ID进行搜索</p>';
            return;
        }

        debounceTimer = setTimeout(() => {
            if (!pokemonList.length) {
                document.getElementById('result').innerHTML = '<div class="loading-container"><div class="loading-spinner"></div><p>正在加载宝可梦数据...</p></div>';
                return;
            }

            const matchedPokemon = pokemonList.filter(pokemon => {
                return pokemon.id.toString().includes(searchText) ||
                       pokemon.chinese_name.toLowerCase().includes(searchText) ||
                       pokemon.name.toLowerCase().includes(searchText);
            });

            if (matchedPokemon.length > 0) {
                displayPokemonList(matchedPokemon);
            } else {
                document.getElementById('result').innerHTML = '<p class="no-results">未找到匹配的宝可梦</p>';
            }
        }, 200);
    });
}

// 3. 优化数据加载
async function fetchWithRetry(url, retries = 3) {
    const cached = cache.get(url, 'pokemon');
    if (cached) return cached;

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            cache.set(url, 'pokemon', data);
            return data;
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
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
        showLoadingState('正在加载宝可梦详细信息...');
        
        // 尝试从缓存的列表中查找宝可梦
        let searchTerm = searchInput;
        let foundPokemon = null;
        
        // 如果不是数字ID，尝试通过名称查找
        if (isNaN(searchInput)) {
            foundPokemon = pokemonList.find(pokemon => 
                pokemon.chinese_name.toLowerCase() === searchInput ||
                pokemon.name.toLowerCase() === searchInput ||
                pokemon.chinese_name.toLowerCase().includes(searchInput) ||
                pokemon.name.toLowerCase().includes(searchInput)
            );
            
            if (foundPokemon) {
                searchTerm = foundPokemon.name;
            }
        }

        // 获取宝可梦详细信息
        const data = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`);
        
        // 如果已经找到中文名称，直接使用
        if (foundPokemon) {
            data.chinese_name = foundPokemon.chinese_name;
        }
        
        // 继续获取其他详细信息...
        const speciesData = await fetchWithRetry(data.species.url);
        
        // 如果没有找到中文名称，从species数据中获取
        if (!data.chinese_name) {
            data.chinese_name = speciesData.names.find(
                name => name.language.name === 'zh-Hans'
            )?.name || data.name;
        }

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
                chinese_name: data.chinese_name
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
        console.error('搜索宝可梦失败:', error);
        showError(`搜索失败: ${error.message}`);
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

// 4. 添加加载状态指示器
function showLoadingState(message = '正在加载...') {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

// 5. 优化渲染性能
function renderPokemonCard(data, speciesData, abilities, chineseDescription) {
    // 使用DocumentFragment提高渲染性能
    const fragment = document.createDocumentFragment();
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    // 计算总种族值
    const totalStats = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    
    // 构建完整的HTML结构
    card.innerHTML = `
        <div class="pokemon-header">
            <div class="pokemon-id">#${String(data.id).padStart(3, '0')}</div>
            <h2 class="pokemon-name">${data.chinese_name}</h2>
            <div class="pokemon-types">
                ${data.types.map(type => `
                    <span class="type-badge ${type.type.name}">
                        ${typeTranslations[type.type.name] || type.type.name}
                    </span>
                `).join('')}
            </div>
        </div>

        <div class="pokemon-content">
            <!-- 图片展示区 -->
            <div class="pokemon-images">
                <div class="main-image">
                    <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" 
                         alt="${data.chinese_name}" 
                         class="pokemon-artwork">
                </div>
                <div class="sprite-variants">
                    <img src="${data.sprites.front_default}" alt="${data.chinese_name} 正面">
                    <img src="${data.sprites.back_default}" alt="${data.chinese_name} 背面">
                    ${data.sprites.front_shiny ? 
                        `<img src="${data.sprites.front_shiny}" alt="${data.chinese_name} 闪光">` : ''}
                </div>
            </div>

            <!-- 描述信息 -->
            <div class="pokemon-description">
                <p>${chineseDescription ? chineseDescription.flavor_text.replace(/\f/g, ' ') : '暂无描述'}</p>
            </div>

            <!-- 基本信息 -->
            <div class="basic-info-container module-section">
                <h3>基本信息</h3>
                <div class="basic-info">
                    <p>身高: ${data.height/10} m</p>
                    <p>体重: ${data.weight/10} kg</p>
                    <p>捕获率: ${speciesData.capture_rate}</p>
                    <p>基础经验值: ${data.base_experience}</p>
                    <p>性别比例: ${speciesData.gender_rate === -1 ? '无性别' : 
                        `雌性 ${(speciesData.gender_rate / 8) * 100}%, 雄性 ${((8 - speciesData.gender_rate) / 8) * 100}%`}</p>
                </div>
            </div>

            <!-- 特性信息 -->
            <div class="abilities module-section">
                <h3>特性</h3>
                ${abilities.map(ability => `
                    <div class="ability">
                        <h4>${ability.name} ${ability.is_hidden ? '(隐藏特性)' : ''}</h4>
                        <p class="ability-description">${ability.description}</p>
                    </div>
                `).join('')}
            </div>

            <!-- 种族值 -->
            ${renderStats(data.stats, totalStats)}

            <!-- 进化链 -->
            <div class="evolution-chain module-section">
                <h3>进化链</h3>
                ${currentPokemonData.evolutionChain.map((pokemon, index, array) => `
                    <div class="evolution-stage ${pokemon.id === data.id ? 'current' : ''}" 
                         onclick="searchPokemon('${pokemon.name}')">
                        <img src="${pokemon.sprite}" alt="${pokemon.chinese_name}">
                        <p>${pokemon.chinese_name}</p>
                        ${pokemon.evolution_details.length > 0 ? 
                            `<p class="evolution-condition">${pokemon.evolution_details.join(', ')}</p>` : ''}
                    </div>
                    ${index < array.length - 1 ? '<div class="evolution-arrow">➜</div>' : ''}
                `).join('')}
            </div>

            <!-- 遭遇地点 -->
            <div class="encounters module-section">
                <h3>遭遇地点</h3>
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

            <!-- 可学会的技能 -->
            <div class="moves module-section">
                <h3>可学会的技能</h3>
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
                            ${currentMoves.map(move => `
                                <tr>
                                    <td>${move.name}</td>
                                    <td>${move.type}</td>
                                    <td>${move.power}</td>
                                    <td>${move.accuracy}</td>
                                    <td>${move.pp}</td>
                                    <td>${move.description}</td>
                                    <td>${move.learnMethods}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="pagination">
                        <button class="page-first" onclick="changePage(1)">首页</button>
                        <button class="page-prev" onclick="changePage(${currentPage - 1})">上一页</button>
                        <span class="pagination-info">
                            第 ${currentPage}/${Math.ceil(data.moves.length / 10)} 页
                        </span>
                        <button class="page-next" onclick="changePage(${currentPage + 1})">下一页</button>
                        <button class="page-last" onclick="changePage(${Math.ceil(data.moves.length / 10)})">末页</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    fragment.appendChild(card);
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').appendChild(fragment);
}

// 6. 添加错误处理和用户反馈
function showError(message, retryCallback = null) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="error-container">
            <p class="error-message">${message}</p>
            ${retryCallback ? `
                <button class="retry-button" onclick="${retryCallback}">
                    重试
                </button>
            ` : ''}
        </div>
    `;
}

// 7. 添加性能监控
const performance = {
    startTime: 0,
    
    start() {
        this.startTime = performance.now();
    },
    
    end(operation) {
        const duration = performance.now() - this.startTime;
        console.log(`${operation} 耗时: ${duration.toFixed(2)}ms`);
        return duration;
    }
};

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

// 添加选择宝可梦的函数
function selectPokemon(name) {
    document.getElementById('searchInput').value = name;
    document.querySelector('.search-suggestions').style.display = 'none';
    searchPokemon(name);
}

// 在页面加载时开始初始化宝可梦列表，但不阻塞用户操作
window.addEventListener('load', () => {
    const cached = localStorage.getItem('pokemonList');
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // 检查数据是否过期（24小时）
        if (now - timestamp < 24 * 60 * 60 * 1000) {
            pokemonList = data;
            isInitialized = true;
            setupSearchSuggestions();
            return;
        }
    }
    
    // 如果没有缓存数据或数据已过期，重新加载
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

// 修改renderMovesTable函数，使用内联onclick属性
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
                    <button onclick="window.loadAllMovesAndChangePage(1)">首页</button>
                    <button onclick="window.loadAllMovesAndChangePage(${currentPage - 1})">上一页</button>
                    <span class="pagination-info">
                        第 ${currentPage}/${totalPages} 页 (共 ${currentPokemonData.data.moves.length} 个技能)
                    </span>
                    <button onclick="window.loadAllMovesAndChangePage(${currentPage + 1})">下一页</button>
                    <button onclick="window.loadAllMovesAndChangePage(${totalPages})">末页</button>
                </div>
            </div>
        </div>
    `;
}

// 添加一个全局函数，确保可以从HTML中调用
window.loadAllMovesAndChangePage = async function(page) {
    console.log("loadAllMovesAndChangePage called with page:", page);
    
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
        console.log("Loading all moves...");
        
        // 加载所有技能数据
        if (currentMoves.length < currentPokemonData.data.moves.length) {
            const allMoves = currentPokemonData.data.moves;
            currentMoves = await loadMovesDetails(allMoves);
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
        
        // 更新分页信息和按钮
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
        
    } catch (error) {
        console.error('加载技能数据失败:', error);
        movesTableBody.innerHTML = `<tr><td colspan="7">加载技能数据失败: ${error.message}</td></tr>`;
    }
};

// 修改 document.addEventListener('DOMContentLoaded') 的部分
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // 确保移除旧的事件监听器
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });

    // 重新添加事件监听器
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为
            
            // 移除所有active类
            document.querySelectorAll('.menu-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // 添加active类到当前点击项
            this.classList.add('active');
            
            // 获取并切换视图
            const viewType = this.getAttribute('data-view');
            console.log('Switching to view:', viewType); // 添加调试日志
            switchView(viewType);
        });
    });

    // 默认显示宝可梦搜索视图
    switchView('pokemon');
});

// 修改 switchView 函数，确保正确调用物品图鉴和浆果图鉴功能

function switchView(view) {
    const resultElement = document.getElementById('result');
    const searchContainer = document.querySelector('.search-container');
    const contentTitle = document.querySelector('.content-container h1');
    
    // 清空结果区域
    resultElement.innerHTML = '';
    
    // 根据视图类型切换内容
    switch(view) {
        case 'pokemon':
            contentTitle.textContent = '宝可梦图鉴';
            searchContainer.style.display = 'block';
            break;
        case 'berry':
            contentTitle.textContent = '浆果图鉴';
            searchContainer.style.display = 'none';
            // 检查浆果图鉴函数是否存在并可调用
            if (typeof initBerryDex === 'function') {
                initBerryDex();
            } else {
                resultElement.innerHTML = '<div class="error">浆果图鉴功能尚未实现</div>';
            }
            break;
        case 'item':
            contentTitle.textContent = '物品图鉴';
            searchContainer.style.display = 'none';
            // 检查物品图鉴函数是否存在并可调用
            if (typeof initItemDex === 'function') {
                initItemDex();
            } else {
                resultElement.innerHTML = '<div class="error">物品图鉴功能尚未实现</div>';
            }
            break;
    }
}