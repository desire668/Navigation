// 搜索功能
function search() {
    const searchEngine = document.getElementById('searchEngine').value;
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        window.open(searchEngine + encodeURIComponent(searchTerm), '_blank');
    }
}

// 设置相关功能
function toggleSettings() {
    const dropdown = document.getElementById('settingsDropdown');
    dropdown.classList.toggle('show');

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.settings-btn') && 
            !e.target.closest('.settings-dropdown')) {
            dropdown.classList.remove('show');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// 壁纸相关功能
function clearWallpaper() {
    document.body.style.backgroundImage = '';
    localStorage.removeItem('wallpaper');
    document.getElementById('settingsDropdown').classList.remove('show');
}

// 暗色模式切换
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('darkModeIcon');
    const text = document.getElementById('darkModeText');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.textContent = '🌜';
        text.textContent = '切换日间模式';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.textContent = '🌞';
        text.textContent = '切换夜间模式';
        localStorage.setItem('darkMode', 'disabled');
    }
    
    document.getElementById('settingsDropdown').classList.remove('show');
}
//跟随系统切换主题颜色
function toggleSystemTheme() {
    // 检查系统的颜色模式
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        document.body.classList.add('dark-mode'); // 添加黑夜模式样式
    } else {
        document.body.classList.remove('dark-mode'); // 移除黑夜模式样式
    }
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    toggleSystemTheme(); // 当系统主题变化时调用
});

// 网格展开/收起功能
function toggleGrid(btn) {
    const grid = btn.closest('.nav-section').querySelector('.nav-grid');
    const isCollapsed = grid.classList.contains('collapsed');
    
    grid.classList.toggle('collapsed');
    btn.textContent = isCollapsed ? '收起' : '展开更多';
}

// 添加网址相关功能
function showAddSiteModal(btn) {
    currentSection = btn.closest('.nav-section');
    document.getElementById('addSiteModal').style.display = 'block';
    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
}

function closeModal() {
    document.getElementById('addSiteModal').style.display = 'none';
}

function addNewSite() {
    const name = document.getElementById('siteName').value.trim();
    const url = document.getElementById('siteUrl').value.trim();
    
    if (name && url) {
        const grid = currentSection.querySelector('.nav-grid');
        const addBtn = grid.querySelector('.add-site-btn');
        
        const newSite = document.createElement('a');
        newSite.href = url.startsWith('http') ? url : 'https://' + url;
        newSite.className = 'nav-item';
        newSite.target = '_blank';
        newSite.appendChild(document.createTextNode(name));
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = (e) => deleteSite(deleteBtn, e);
        deleteBtn.textContent = '';
        newSite.appendChild(deleteBtn);
        
        grid.insertBefore(newSite, addBtn);
        
        const totalItems = grid.children.length;
        if (totalItems > 5 && !currentSection.classList.contains('has-more')) {
            currentSection.classList.add('has-more');
            grid.classList.add('collapsed');
        }

        saveSites();

        // 为新添加的网址添加拖拽功能
        newSite.setAttribute('draggable', 'true');
        newSite.addEventListener('dragstart', handleDragStart);
        newSite.addEventListener('dragend', handleDragEnd);
    }
    
    closeModal();
}

// 删除网址
function deleteSite(btn, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const item = btn.closest('.nav-item');
    const section = item.closest('.nav-section');
    const grid = item.closest('.nav-grid');
    
    item.remove();
    
    const totalItems = grid.children.length;
    if (totalItems <= 5) {
        section.classList.remove('has-more');
        grid.classList.remove('collapsed');
    }

    saveSites();
}

// 保存和加载网址
function saveSites() {
    const sites = {};
    document.querySelectorAll('.nav-section').forEach(section => {
        const category = section.querySelector('h2').textContent;
        const sitesList = [];
        section.querySelectorAll('.nav-item:not(.add-site-btn)').forEach(item => {
            const name = item.childNodes[0].textContent.trim();
            sitesList.push({
                name: name,
                url: item.href
            });
        });
        sites[category] = sitesList;
    });
    localStorage.setItem('sites', JSON.stringify(sites));
}

function loadSavedSites(sites) {
    Object.entries(sites).forEach(([category, sitesList]) => {
        const section = Array.from(document.querySelectorAll('.nav-section')).find(
            section => section.querySelector('h2').textContent === category
        );
        if (section) {
            const grid = section.querySelector('.nav-grid');
            const addBtn = grid.querySelector('.add-site-btn');
            grid.innerHTML = '';
            sitesList.forEach(site => {
                const siteElement = document.createElement('a');
                siteElement.href = site.url;
                siteElement.className = 'nav-item';
                siteElement.target = '_blank';
                siteElement.appendChild(document.createTextNode(site.name));
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = (e) => deleteSite(deleteBtn, e);
                deleteBtn.textContent = '';
                siteElement.appendChild(deleteBtn);
                
                grid.appendChild(siteElement);
            });
            grid.appendChild(addBtn);
        }
    });

    // 重新初始化拖拽功能
    initDragAndDrop();
}

// 添加天气相关功能
async function getWeather() {
    try {
        // 首先获取位置信息
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // 这里使用和风天气 API（需要替换为你自己的 API 密钥）
        const key = 'f0ab36b7383f4210b0e26f19481ddedb';
        const { latitude, longitude } = position.coords;
        
        // 获取天气数据
        const response = await fetch(`https://devapi.qweather.com/v7/weather/now?key=${key}&location=${longitude},${latitude}`);
        const data = await response.json();

        if (data.code === '200') {
            const weather = data.now;
            document.getElementById('temperature').textContent = `${weather.temp}°C`;
            document.getElementById('weather-desc').textContent = weather.text;
            
            // 保存天气数据到 localStorage
            localStorage.setItem('weatherData', JSON.stringify({
                temp: weather.temp,
                text: weather.text,
                timestamp: Date.now()
            }));
        }
    } catch (error) {
        console.error('获取天气信息失败:', error);
    }
}

function toggleWeather() {
    const widget = document.getElementById('weather-widget');
    const isHidden = widget.style.display === 'none';
    const icon = document.getElementById('weatherIcon');
    const text = document.getElementById('weatherText');
    
    widget.style.display = isHidden ? 'flex' : 'none';
    text.textContent = isHidden ? '隐藏天气' : '显示天气';
    
    localStorage.setItem('weatherDisplay', isHidden ? 'show' : 'hide');
    
    if (isHidden) {
        getWeather();
        // 设置定时更新天气
        startWeatherUpdate();
    } else {
        stopWeatherUpdate();
    }
}

let weatherUpdateInterval;

function startWeatherUpdate() {
    // 每30分钟更新一次天气
    weatherUpdateInterval = setInterval(getWeather, 30 * 60 * 1000);
}

function stopWeatherUpdate() {
    if (weatherUpdateInterval) {
        clearInterval(weatherUpdateInterval);
    }
}

// 页面加载时的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 搜索框回车事件
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            search();
        }
    });

    // 壁纸相关功能
    const wallpaperInput = document.getElementById('wallpaperInput');
    
    wallpaperInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                document.body.style.backgroundImage = `url(${imageUrl})`;
                localStorage.setItem('wallpaper', imageUrl);
            }
            reader.readAsDataURL(file);
        }
    });

    // 从 localStorage 加载壁纸
    const savedWallpaper = localStorage.getItem('wallpaper');
    if (savedWallpaper) {
        document.body.style.backgroundImage = `url(${savedWallpaper})`;
    }

    // 加载暗色模式设置
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeIcon').textContent = '🌜';
        document.getElementById('darkModeText').textContent = '切换日间模式';
    }

    // 检查是否需要显示展开按钮
    document.querySelectorAll('.nav-section').forEach(section => {
        const grid = section.querySelector('.nav-grid');
        const totalItems = grid.children.length;
        
        if (totalItems > 5) {
            section.classList.add('has-more');
            grid.classList.add('collapsed');
        }
    });

    // 加载保存的网址
    const savedSites = localStorage.getItem('sites');
    if (savedSites) {
        loadSavedSites(JSON.parse(savedSites));
    }

    // 检查天气显示设置
    const weatherDisplay = localStorage.getItem('weatherDisplay');
    if (weatherDisplay === 'show') {
        const widget = document.getElementById('weather-widget');
        widget.style.display = 'flex';
        document.getElementById('weatherText').textContent = '隐藏天气';
        
        // 尝试加载缓存的天气数据
        const cachedWeather = localStorage.getItem('weatherData');
        if (cachedWeather) {
            const data = JSON.parse(cachedWeather);
            const timestamp = data.timestamp;
            const now = Date.now();
            
            // 如果缓存数据不超过30分钟，直接使用
            if (now - timestamp < 30 * 60 * 1000) {
                document.getElementById('temperature').textContent = `${data.temp}°C`;
                document.getElementById('weather-desc').textContent = data.text;
            } else {
                getWeather();
            }
        } else {
            getWeather();
        }
        
        startWeatherUpdate();
    }

    // 初始化拖拽功能
    initDragAndDrop();

    // 初始化可编辑标题
    initEditableHeaders();

    // 使用更精确的选择器
    const importButton = document.querySelector('.settings-item:nth-child(6)'); // 导入配置按钮
    const gamesButton = document.querySelector('.settings-item:last-child'); // 游戏推荐按钮

    // 导入配置按钮事件
    if (importButton) {
        importButton.onclick = function() {
            document.getElementById('importInput').click();
        };
    }

    // 游戏推荐按钮事件 - 删除重复的选择器，直接使用上面定义的 gamesButton
    if (gamesButton) {
        gamesButton.onclick = toggleGames;
    }

    // 检查游戏推荐显示设置
    const gamesDisplay = localStorage.getItem('gamesDisplay');
    if (gamesDisplay === 'show') {
        const widget = document.getElementById('game-recommendations');
        widget.style.display = 'block';
        document.getElementById('gamesText').textContent = '隐藏游戏推荐';
        fetchGameRecommendations();
    }
});

// 全局变量
let currentSection = null; 

// 在 script.js 中添加拖拽相关功能
function initDragAndDrop() {
    // 为所有网址添加拖拽功能
    document.querySelectorAll('.nav-item:not(.add-site-btn)').forEach(item => {
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    // 为所有网格添加放置区域
    document.querySelectorAll('.nav-grid').forEach(grid => {
        grid.addEventListener('dragover', handleDragOver);
        grid.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const grid = e.currentTarget;
    const draggable = document.querySelector('.dragging');
    if (!draggable) return;

    // 获取最近的放置位置
    const afterElement = getDragAfterElement(grid, e.clientY);
    const addBtn = grid.querySelector('.add-site-btn');
    
    if (afterElement) {
        grid.insertBefore(draggable, afterElement);
    } else {
        grid.insertBefore(draggable, addBtn);
    }
}

function handleDrop(e) {
    e.preventDefault();
    const sourceHTML = e.dataTransfer.getData('text/plain');
    const draggable = document.querySelector('.dragging');
    
    if (draggable) {
        // 如果是同一个网格内的拖拽，不需要重新创建元素
        draggable.classList.remove('dragging');
    } else {
        // 如果是跨网格拖拽，创建新元素
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sourceHTML;
        const newItem = tempDiv.firstChild;
        
        // 重新绑定事件
        newItem.setAttribute('draggable', 'true');
        newItem.addEventListener('dragstart', handleDragStart);
        newItem.addEventListener('dragend', handleDragEnd);
        newItem.querySelector('.delete-btn').onclick = (e) => deleteSite(newItem.querySelector('.delete-btn'), e);
        
        const grid = e.currentTarget;
        const afterElement = getDragAfterElement(grid, e.clientY);
        const addBtn = grid.querySelector('.add-site-btn');
        
        if (afterElement) {
            grid.insertBefore(newItem, afterElement);
        } else {
            grid.insertBefore(newItem, addBtn);
        }
    }
    
    // 更新所有分类的展开/折叠状态
    document.querySelectorAll('.nav-section').forEach(section => {
        const grid = section.querySelector('.nav-grid');
        const totalItems = grid.children.length;
        
        if (totalItems > 5) {
            section.classList.add('has-more');
            grid.classList.add('collapsed');
        } else {
            section.classList.remove('has-more');
            grid.classList.remove('collapsed');
        }
    });
    
    // 保存更新后的网址
    saveSites();
}

function getDragAfterElement(grid, y) {
    const draggableElements = [...grid.querySelectorAll('.nav-item:not(.dragging):not(.add-site-btn)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
} 

// 添加双击编辑分类名称功能
function initEditableHeaders() {
    document.querySelectorAll('.nav-section-header h2').forEach(header => {
        header.addEventListener('dblclick', handleHeaderDblClick);
    });
}

function handleHeaderDblClick(e) {
    const header = e.target;
    const originalText = header.textContent;
    
    // 创建输入框
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    input.className = 'category-edit-input';
    
    // 替换标题为输入框
    header.style.display = 'none';
    header.parentNode.insertBefore(input, header);
    input.focus();
    input.select();

    // 处理输入框失去焦点和回车事件
    function handleEdit() {
        const newText = input.value.trim();
        if (newText && newText !== originalText) {
            header.textContent = newText;
            // 更新localStorage中的分类名称
            updateCategoryName(originalText, newText);
        }
        input.remove();
        header.style.display = '';
    }

    input.addEventListener('blur', handleEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEdit();
        }
    });
}

function updateCategoryName(oldName, newName) {
    const sites = JSON.parse(localStorage.getItem('sites') || '{}');
    if (sites[oldName]) {
        sites[newName] = sites[oldName];
        delete sites[oldName];
        localStorage.setItem('sites', JSON.stringify(sites));
    }
}

// 导出设置
function exportSettings() {
    const settings = {
        sites: JSON.parse(localStorage.getItem('sites') || '{}'),
        darkMode: localStorage.getItem('darkMode'),
        wallpaper: localStorage.getItem('wallpaper'),
        weatherDisplay: localStorage.getItem('weatherDisplay'),
        gamesDisplay: localStorage.getItem('gamesDisplay'),
        timestamp: new Date().toISOString()
    };

    // 创建并下载文件
    const dataStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nav-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 导入设置
function importSettings(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const settings = JSON.parse(e.target.result);
                
                // 确认导入
                if (confirm('确定要导入新的配置吗？这将覆盖当前的所有设置。')) {
                    // 导入网址数据
                    if (settings.sites) {
                        localStorage.setItem('sites', JSON.stringify(settings.sites));
                        loadSavedSites(settings.sites);
                    }
                    
                    // 导入暗色模式设置
                    if (settings.darkMode) {
                        localStorage.setItem('darkMode', settings.darkMode);
                        if (settings.darkMode === 'enabled') {
                            document.body.classList.add('dark-mode');
                            document.getElementById('darkModeIcon').textContent = '🌜';
                            document.getElementById('darkModeText').textContent = '切换日间模式';
                        }
                    }
                    
                    // 导入壁纸
                    if (settings.wallpaper) {
                        localStorage.setItem('wallpaper', settings.wallpaper);
                        document.body.style.backgroundImage = `url(${settings.wallpaper})`;
                    }
                    
                    // 导入天气显示设置
                    if (settings.weatherDisplay) {
                        localStorage.setItem('weatherDisplay', settings.weatherDisplay);
                        const widget = document.getElementById('weather-widget');
                        widget.style.display = settings.weatherDisplay === 'show' ? 'flex' : 'none';
                        document.getElementById('weatherText').textContent = 
                            settings.weatherDisplay === 'show' ? '隐藏天气' : '显示天气';
                    }

                    // 导入游戏推荐显示设置
                    if (settings.gamesDisplay) {
                        localStorage.setItem('gamesDisplay', settings.gamesDisplay);
                        const widget = document.getElementById('game-recommendations');
                        widget.style.display = settings.gamesDisplay === 'show' ? 'block' : 'none';
                        document.getElementById('gamesText').textContent = 
                            settings.gamesDisplay === 'show' ? '隐藏游戏推荐' : '显示游戏推荐';
                        if (settings.gamesDisplay === 'show') {
                            fetchGameRecommendations();
                        }
                    }
                }
            } catch (error) {
                alert('导入失败：配置文件格式不正确');
                console.error('导入错误：', error);
            }
        };
        reader.readAsText(file);
    }
}

// AI助手相关功能
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// OpenAI API配置
const OPENAI_API_KEY = 'sk-204292cbf80e410e82d185dde6ba71ed'; // Deepseek API密钥
const API_URL = 'https://api.deepseek.com/v1/chat/completions';  // Deepseek API端点

// 初始化拖拽功能
document.addEventListener("DOMContentLoaded", function() {
    const aiIcon = document.getElementById("ai-icon");
    const aiAssistant = document.getElementById("ai-assistant");

    aiIcon.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    // 添加回车发送功能
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// 拖拽相关函数
function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === document.getElementById("ai-icon")) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, document.getElementById("ai-assistant"));
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

// 聊天功能
function toggleChat() {
    const chatWindow = document.getElementById("ai-chat-window");
    if (chatWindow.style.display === "none" || !chatWindow.style.display) {
        chatWindow.style.display = "flex";
        // 添加一条欢迎消息
        if (!chatWindow.querySelector('.message')) {
            addMessageToChat("assistant", "你好！我是AI助手，有什么可以帮你的吗？");
        }
    } else {
        chatWindow.style.display = "none";
    }
}

async function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    
    if (!message) return;

    // 添加用户消息到聊天窗口
    addMessageToChat("user", message);
    input.value = "";

    try {
        // 显示加载状态
        addMessageToChat("assistant", "思考中...", "loading-message");
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",  // 使用 Deepseek 的模型
                messages: [{
                    role: "user",
                    content: message
                }],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        const data = await response.json();
        
        // 移除加载消息
        removeLoadingMessage();
        
        // 添加AI回复
        if (data.choices && data.choices[0] && data.choices[0].message) {
            addMessageToChat("assistant", data.choices[0].message.content);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        removeLoadingMessage();
        addMessageToChat("assistant", "抱歉，发生了错误，请稍后重试。");
        console.error("Error:", error);
    }
}

function addMessageToChat(role, content, className = "") {
    const messagesDiv = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role} ${className}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${role === "user" ? "👤" : "🤖"} ${content}
        </div>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeLoadingMessage() {
    const loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// 文件上传处理
document.getElementById('chat-file-input').addEventListener('change', handleFileUpload);

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        const content = e.target.result;
        addMessageToChat("user", `已上传文件: ${file.name}`);
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [{
                        role: "user",
                        content: `请分析这个文件内容：${content}`
                    }],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                addMessageToChat("assistant", data.choices[0].message.content);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            addMessageToChat("assistant", "文件处理过程中发生错误，请稍后重试。");
            console.error("Error:", error);
        }
    };
    reader.readAsText(file);
}

// 添加一些样式
const style = document.createElement('style');
style.textContent = `
    .message {
        margin: 8px 0;
        padding: 8px;
        border-radius: 8px;
        max-width: 80%;
    }

    .message.user {
        background-color: #e3f2fd;
        margin-left: auto;
    }

    .message.assistant {
        background-color: #f5f5f5;
        margin-right: auto;
    }

    .message-content {
        word-wrap: break-word;
    }

    .loading-message {
        opacity: 0.6;
    }
`;
document.head.appendChild(style); 

// 初始化AI助手
document.addEventListener("DOMContentLoaded", function() {
    // ... 现有的代码 ...

    // 为AI图标添加点击事件
    const aiIcon = document.getElementById("ai-icon");
    aiIcon.addEventListener("click", function(e) {
        if (!isDragging) {  // 只有在非拖拽状态下才触发点击事件
            toggleChat();
        }
    });
}); 

