// 数据定义
const data = {
    agents: [
        { name: '乌鲁鲁', image: '干员/乌鲁鲁.jpg' },
        { name: '威龙', image: '干员/威龙.jpg' },
        { name: '峰医', image: '干员/峰医.jpg' },
        { name: '无名', image: '干员/无名.jpg' },
        { name: '深蓝', image: '干员/深蓝.jpg' },
        { name: '牧羊人', image: '干员/牧羊人.jpg' },
        { name: '疾风', image: '干员/疾风.jpg' },
        { name: '红狼', image: '干员/红狼.jpg' },
        { name: '蛊', image: '干员/蛊.jpg' },
        { name: '露娜', image: '干员/露娜.jpg' },
        { name: '骇爪', image: '干员/骇爪.jpg' }
    ],
    armors: [
        { name: 'DT-AVS防弹衣', image: '护甲/DT-AVS防弹衣.png' },
        { name: 'FS复合防弹衣', image: '护甲/FS复合防弹衣.png' },
        { name: 'HA-2防弹装甲', image: '护甲/HA-2防弹装甲.png' },
        { name: 'HMP特勤防弹衣', image: '护甲/HMP特勤防弹衣.png' },
        { name: 'HT战术背心', image: '护甲/HT战术背心.png' },
        { name: 'Hvk-2防弹衣', image: '护甲/Hvk-2防弹衣.png' },
        { name: 'Hvk快拆防弹衣', image: '护甲/Hvk快拆防弹衣.png' },
        { name: 'MK-2战术背心', image: '护甲/MK-2战术背心.png' },
        { name: 'TG-H防弹衣', image: '护甲/TG-H防弹衣.png' },
        { name: 'TG战术防弹衣', image: '护甲/TG战术防弹衣.png' },
        { name: '制式防弹背心', image: '护甲/制式防弹背心.png' },
        { name: '安保防弹衣', image: '护甲/安保防弹衣.png' },
        { name: '射手战术背心', image: '护甲/射手战术背心.png' },
        { name: '尼龙防弹衣', image: '护甲/尼龙防弹衣.png' },
        { name: '摩托马甲', image: '护甲/摩托马甲.png' },
        { name: '武士防弹背心', image: '护甲/武士防弹背心.png' },
        { name: '泰坦防弹装甲', image: '护甲/泰坦防弹装甲.png' },
        { name: '特里克MAS2.0装甲', image: '护甲/特里克MAS2.0装甲.png' },
        { name: '突击手防弹背心', image: '护甲/突击手防弹背心.png' },
        { name: '简易防刺服', image: '护甲/简易防刺服.png' },
        { name: '精英防弹背心', image: '护甲/精英防弹背心.png' },
        { name: '轻型防弹衣', image: '护甲/轻型防弹衣.png' },
        { name: '通用战术背心', image: '护甲/通用战术背心.png' },
        { name: '重型突击背心', image: '护甲/重型突击背心.png' },
        { name: '金刚防弹衣', image: '护甲/金刚防弹衣.png' }
    ],
    helmets: [
        { name: 'D6 战术头盔', image: '头盔/D6 战术头盔.png' },
        { name: 'DAS 防弹头盔', image: '头盔/DAS 防弹头盔.png' },
        { name: 'DICH 训练头盔', image: '头盔/DICH 训练头盔.png' },
        { name: 'DICH-1战术头盔', image: '头盔/DICH-1战术头盔.png' },
        { name: 'DICH-9重型头盔', image: '头盔/DICH-9重型头盔.png' },
        { name: 'DRO 战术头盔', image: '头盔/DRO 战术头盔.png' },
        { name: 'GN 久战重型夜视头盔', image: '头盔/GN 久战重型夜视头盔.png' },
        { name: 'GN 重型夜视头盔', image: '头盔/GN 重型夜视头盔.png' },
        { name: 'GN 重型头盔', image: '头盔/GN 重型头盔.png' },
        { name: 'GT1 战术头盔', image: '头盔/GT1 战术头盔.png' },
        { name: 'GT5 指挥官头盔', image: '头盔/GT5 指挥官头盔.png' },
        { name: 'H01 战术头盔', image: '头盔/H01 战术头盔.png' },
        { name: 'H07 战术头盔', image: '头盔/H07 战术头盔.png' },
        { name: 'H09 防暴头盔', image: '头盔/H09 防暴头盔.png' },
        { name: 'H70 夜视精英头盔', image: '头盔/H70 夜视精英头盔.png' },
        { name: 'H70 精英头盔', image: '头盔/H70 精英头盔.png' },
        { name: 'MC201 头盔', image: '头盔/MC201 头盔.png' },
        { name: 'MC防弹头盔', image: '头盔/MC防弹头盔.png' },
        { name: 'MHS 战术头盔', image: '头盔/MHS 战术头盔.png' },
        { name: 'Mask-1铁壁头盔', image: '头盔/Mask-1铁壁头盔.png' },
        { name: '复古摩托头盔', image: '头盔/复古摩托头盔.png' },
        { name: '奔尼帽', image: '头盔/奔尼帽.png' },
        { name: '安保头盔', image: '头盔/安保头盔.png' },
        { name: '户外棒球帽', image: '头盔/户外棒球帽.png' },
        { name: '老式钢盔', image: '头盔/老式钢盔.png' },
        { name: '防暴头盔', image: '头盔/防暴头盔.png' }
    ],
    weapons: [
        { name: '.357左轮', image: '武器/.357左轮.png' },
        { name: '725双管霰弹枪', image: '武器/725双管霰弹枪.png' },
        { name: '93R', image: '武器/93R.png' },
        { name: 'AK-12突击步枪', image: '武器/AK-12突击步枪.png' },
        { name: 'AKM突击步枪', image: '武器/AKM突击步枪.png' },
        { name: 'AKS-74U突击步枪', image: '武器/AKS-74U突击步枪.png' },
        { name: 'AS Val突击步枪', image: '武器/AS Val突击步枪.png' },
        { name: 'ASh-12战斗步枪', image: '武器/ASh-12战斗步枪.png' },
        { name: 'AUG突击步枪', image: '武器/AUG突击步枪.png' },
        { name: 'AWM狙击步枪', image: '武器/AWM狙击步枪.png' },
        { name: 'CAR-15突击步枪', image: '武器/CAR-15突击步枪.png' },
        { name: 'G17', image: '武器/G17.png' },
        { name: 'G18', image: '武器/G18.png' },
        { name: 'G3战斗步枪', image: '武器/G3战斗步枪.png' },
        { name: 'K416突击步枪', image: '武器/K416突击步枪.png' },
        { name: 'K437突击步枪', image: '武器/K437突击步枪.png' },
        { name: 'M1014霰弹枪', image: '武器/M1014霰弹枪.png' },
        { name: 'M14射手步枪', image: '武器/M14射手步枪.png' },
        { name: 'M16A4突击步枪', image: '武器/M16A4突击步枪.png' },
        { name: 'M1911', image: '武器/M1911.png' },
        { name: 'M249轻机枪', image: '武器/M249轻机枪.png' },
        { name: 'M250通用机枪', image: '武器/M250通用机枪.png' },
        { name: 'M4A1突击步枪', image: '武器/M4A1突击步枪.png' },
        { name: 'M700狙击步枪', image: '武器/M700狙击步枪.png' },
        { name: 'M7战斗步枪', image: '武器/M7战斗步枪.png' },
        { name: 'M870霰弹枪', image: '武器/M870霰弹枪.png' },
        { name: 'MP5冲锋枪', image: '武器/MP5冲锋枪.png' },
        { name: 'MP7冲锋枪', image: '武器/MP7冲锋枪.png' },
        { name: 'Mini-14射手步枪', image: '武器/Mini-14射手步枪.png' },
        { name: 'P90冲锋枪', image: '武器/P90冲锋枪.png' },
        { name: 'PKM通用机枪', image: '武器/PKM通用机枪.png' },
        { name: 'PSG-1射手步枪', image: '武器/PSG-1射手步枪.png' },
        { name: 'PTR-32突击步枪', image: '武器/PTR-32突击步枪.png' },
        { name: 'QBZ95-1突击步枪', image: '武器/QBZ95-1突击步枪.png' },
        { name: 'QCQ171冲锋枪', image: '武器/QCQ171冲锋枪.png' },
        { name: 'QJB201轻机枪', image: '武器/QJB201轻机枪.png' },
        { name: 'QSZ92G', image: '武器/QSZ92G.png' },
        { name: 'R93狙击步枪', image: '武器/R93狙击步枪.png' },
        { name: 'S12K霰弹枪', image: '武器/S12K霰弹枪.png' },
        { name: 'SCAR-H战斗步枪', image: '武器/SCAR-H战斗步枪.png' },
        { name: 'SG552突击步枪', image: '武器/SG552突击步枪.png' },
        { name: 'SKS射手步枪', image: '武器/SKS射手步枪.png' },
        { name: 'SMG-45冲锋枪', image: '武器/SMG-45冲锋枪.png' },
        { name: 'SR-25射手步枪', image: '武器/SR-25射手步枪.png' },
        { name: 'SR-3M紧凑突击步枪', image: '武器/SR-3M紧凑突击步枪.png' },
        { name: 'SR9射手步枪', image: '武器/SR9射手步枪.png' },
        { name: 'SV-98狙击步枪', image: '武器/SV-98狙击步枪.png' },
        { name: 'SVD狙击步枪', image: '武器/SVD狙击步枪.png' },
        { name: 'UZI冲锋枪', image: '武器/UZI冲锋枪.png' },
        { name: 'VSS射手步枪', image: '武器/VSS射手步枪.png' },
        { name: 'Vector冲锋枪', image: '武器/Vector冲锋枪.png' },
        { name: '勇士冲锋枪', image: '武器/勇士冲锋枪.png' },
        { name: '沙漠之鹰', image: '武器/沙漠之鹰.png' },
        { name: '腾龙突击步枪', image: '武器/腾龙突击步枪.png' },
        { name: '野牛冲锋枪', image: '武器/野牛冲锋枪.png' }
    ],
    maps: [
        '机密大坝',
        '机密长弓',
        '机密航天',
        '机密巴克什',
        '绝密航天',
        '绝密巴克什',
        '绝密监狱'
    ],
    // 地图分类
    secretMaps: [
        '机密大坝',
        '机密长弓',
        '机密航天',
        '机密巴克什'
    ],
    topSecretMaps: [
        '绝密航天',
        '绝密巴克什',
        '绝密监狱'
    ]
};

// DOM 元素
const randomizeBtn = document.getElementById('randomize-btn');
const resetBtn = document.getElementById('reset-btn');
const mapFilter = document.getElementById('map-filter');
const agentImg = document.getElementById('agent-img');
const agentName = document.getElementById('agent-name');
const armorImg = document.getElementById('armor-img');
const armorName = document.getElementById('armor-name');
const helmetImg = document.getElementById('helmet-img');
const helmetName = document.getElementById('helmet-name');
const weaponImg = document.getElementById('weapon-img');
const weaponName = document.getElementById('weapon-name');
const mapName = document.getElementById('map-name');

// 随机选择函数
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 添加脉动动画
function addPulseAnimation(element) {
    element.classList.add('pulse');
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 500);
}

// 根据筛选选项获取地图数组
function getFilteredMaps() {
    const filterValue = mapFilter.value;
    
    switch (filterValue) {
        case 'secret':
            return data.secretMaps;
        case 'top-secret':
            return data.topSecretMaps;
        case 'all':
        default:
            return data.maps;
    }
}

// 随机抽取函数
function randomize() {
    // 随机选择干员
    const randomAgent = getRandomItem(data.agents);
    agentImg.src = randomAgent.image;
    agentName.textContent = randomAgent.name;
    addPulseAnimation(document.getElementById('agent-result'));
    
    // 随机选择护甲
    const randomArmor = getRandomItem(data.armors);
    armorImg.src = randomArmor.image;
    armorName.textContent = randomArmor.name;
    addPulseAnimation(document.getElementById('armor-result'));
    
    // 随机选择头盔
    const randomHelmet = getRandomItem(data.helmets);
    helmetImg.src = randomHelmet.image;
    helmetName.textContent = randomHelmet.name;
    addPulseAnimation(document.getElementById('helmet-result'));
    
    // 随机选择武器
    const randomWeapon = getRandomItem(data.weapons);
    weaponImg.src = randomWeapon.image;
    weaponName.textContent = randomWeapon.name;
    addPulseAnimation(document.getElementById('weapon-result'));
    
    // 根据筛选选项随机选择地图
    const filteredMaps = getFilteredMaps();
    const randomMap = getRandomItem(filteredMaps);
    mapName.textContent = randomMap;
    addPulseAnimation(document.getElementById('map-result'));
}

// 重置函数
function reset() {
    agentImg.src = '';
    agentName.textContent = '点击随机抽取按钮开始';
    
    armorImg.src = '';
    armorName.textContent = '点击随机抽取按钮开始';
    
    helmetImg.src = '';
    helmetName.textContent = '点击随机抽取按钮开始';
    
    weaponImg.src = '';
    weaponName.textContent = '点击随机抽取按钮开始';
    
    mapName.textContent = '点击随机抽取按钮开始';
}

// 事件监听
randomizeBtn.addEventListener('click', randomize);
resetBtn.addEventListener('click', reset);
mapFilter.addEventListener('change', randomize);

// 页面加载完成后添加淡入效果并自动抽取一次
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
        // 页面加载完成后自动执行一次随机抽取
        randomize();
    }, 100);
});