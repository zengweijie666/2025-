/**
 * 毕业回忆胶囊网站数据文件
 * 集中存储网站所需的各类数据
 */

// 网站配置
const siteConfig = {
    // 毕业日期设置
    graduationDate: '',

    // 网站标题
    siteTitle: '时光不散，青春永驻 - 毕业回忆胶囊',

    // 网站管理员联系方式
    adminEmail: 'admin@example.com'
};

// 足迹地图数据
let locationData = [
    { name: '北京', value: [116.405285, 39.904989], symbolSize: 18, itemStyle: { color: '#6a8caf' }, message: '首都北京，梦想启航的地方' },
    { name: '上海', value: [121.472644, 31.231706], symbolSize: 15, itemStyle: { color: '#e8b87d' }, message: '魔都上海，繁华都市的记忆' },
    { name: '广州', value: [113.280637, 23.125178], symbolSize: 14, itemStyle: { color: '#e07a5f' }, message: '羊城广州，南方的温暖' },
    { name: '深圳', value: [114.085947, 22.547], symbolSize: 13, itemStyle: { color: '#3d405b' }, message: '创新之城，年轻人的天堂' },
    { name: '杭州', value: [120.153576, 30.287459], symbolSize: 12, itemStyle: { color: '#6a8caf' }, message: '西湖风光，诗意生活' }
];

// 照片墙数据
let galleryData = [];

// 不再使用固定的连续编号方式初始化照片
// 加载照片将在页面加载时通过scanForImages函数动态完成

// 视频数据
let videoData = [
    // {
    //     id: 1,
    //     title: '毕业典礼花絮',
    //     date: '2025年6月20日',
    //     thumbnailUrl: 'https://tvax4.sinaimg.cn/large/008vtbnrly1i1hqyi2nrcj31bf0zkwmw.jpg',
    //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    //     description: '记录了我们毕业典礼上的精彩瞬间，那一刻我们喜极而泣，也充满对未来的期待。'
    // }
];

// 祝福留言数据
let blessingData = [
    // {
    //     id: 1,
    //     name: '小红',
    //     content: '四年时光如白驹过隙，同窗情谊却会长存。感谢有你们，让我的大学生活绚烂多彩。愿未来的我们都能找到属于自己的光芒！',
    //     date: '2025-06-10',
    //     likes: 42,
    //     isTimeLetter: false
    // },

];

// 时光轴数据
let timelineData = [
    // {
    //     id: 1,
    //     title: '开学典礼',
    //     date: '2021年9月1日',
    //     content: '我们相聚在这个美丽的校园，开始了大学四年的征程',
    //     imageUrl: 'https://tvax4.sinaimg.cn/large/008vtbnrly1i1hqyi2nrcj31bf0zkwmw.jpg'
    // }
];

// 故事数据
let storyData = [
    // {
    //     id: 1,
    //     title: '青春不散场',
    //     author: '李明',
    //     content: '那年的毕业晚会，我们在操场上举办了一场盛大的篝火晚会。每个人都写下了自己的心愿，装进纸灯笼，然后一起放飞。看着那些灯笼缓缓上升，消失在夜空中，我们相信，总有一天，这些愿望都会实现。',
    //     category: 'activity',
    //     imageUrl: 'https://tvax4.sinaimg.cn/large/008vtbnrly1i1hqyi2nrcj31bf0zkwmw.jpg',
    //     date: '2024-05-20',
    //     likes: 12
    // }
];

// 辅助函数

// 添加足迹地点（只修改内存中的数据，不保存到本地存储）
function addLocation(city, coordinates, name = '', message = '') {
    const newLocation = {
        name: city,
        value: coordinates,
        symbolSize: 12,
        itemStyle: { color: getRandomColor() },
        message: message
    };

    locationData.push(newLocation);
    return newLocation;
}

// 获取随机颜色
function getRandomColor() {
    const colorPalette = ['#6a8caf', '#e8b87d', '#e07a5f', '#3d405b', '#81b29a'];
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

// 添加照片
function addGalleryImage(title, description, imageUrl, category = 'other') {
    const newId = galleryData.length > 0 ? Math.max(...galleryData.map(item => item.id)) + 1 : 1;

    const newImage = {
        id: newId,
        title: title,
        description: description,
        imageUrl: imageUrl,
        category: category
    };

    galleryData.push(newImage);
    return newImage;
}

// 添加视频
function addVideo(title, videoUrl, description = '', category = 'other', thumbnailUrl = '', date = '') {
    const newId = videoData.length > 0 ? Math.max(...videoData.map(item => item.id)) + 1 : 1;

    // 设置默认日期为当前日期
    if (!date) {
        const today = new Date();
        date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    const newVideo = {
        id: newId,
        title: title,
        videoUrl: videoUrl,
        description: description,
        category: category,
        thumbnailUrl: thumbnailUrl || 'https://tvax4.sinaimg.cn/large/008vtbnrly1i1hqyi2nrcj31bf0zkwmw.jpg',
        date: date
    };

    videoData.push(newVideo);
    return newVideo;
}

// 添加祝福留言
function addBlessing(name, message, isTimeLetter = false, date = '') {
    const newId = blessingData.length > 0 ? Math.max(...blessingData.map(item => item.id)) + 1 : 1;

    // 设置默认日期为当前日期
    if (!date) {
        const today = new Date();
        date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    const newBlessing = {
        id: newId,
        name: name,
        content: message,
        isTimeLetter: isTimeLetter,
        date: date,
        likes: 0
    };

    blessingData.push(newBlessing);
    return newBlessing;
}

// 添加时光轴事件
function addTimelineEvent(title, date, content, imageUrl) {
    const newId = timelineData.length > 0 ? Math.max(...timelineData.map(item => item.id)) + 1 : 1;

    const newEvent = {
        id: newId,
        title: title,
        date: date,
        content: content,
        imageUrl: imageUrl || 'https://tvax4.sinaimg.cn/large/008vtbnrly1i1hqyi2nrcj31bf0zkwmw.jpg'
    };

    timelineData.push(newEvent);
    // 按日期排序
    timelineData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return newEvent;
}

// 添加故事
function addStory(title, author, content, category, imageUrl, date, likes = 0) {
    const newId = storyData.length > 0 ? Math.max(...storyData.map(item => item.id)) + 1 : 1;

    // 设置默认日期为当前日期
    if (!date) {
        const today = new Date();
        date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    const newStory = {
        id: newId,
        title: title,
        author: author,
        content: content,
        category: category || 'other',
        imageUrl: imageUrl || 'https://tvax4.sinaimg.cn/large/008vtbnrly1i1hqyi2nrcj31bf0zkwmw.jpg',
        date: date,
        likes: likes
    };

    storyData.push(newStory);
    return newStory;
}

// 导出所有数据供其他JS文件使用
const websiteData = {
    siteConfig,
    locationData,
    galleryData,
    videoData,
    blessingData,
    timelineData,
    storyData,
    // 导出辅助函数
    helpers: {
        addLocation,
        addGalleryImage,
        addVideo,
        addBlessing,
        addTimelineEvent,
        addStory
    }
};

// 处理微博图床图片加载
document.addEventListener('DOMContentLoaded', function () {
    // 检查是否已经存在referrer meta标签
    if (!document.querySelector('meta[name="referrer"]')) {
        // 添加meta标签，控制referrer策略，解决微博图床防盗链问题
        const meta = document.createElement('meta');
        meta.name = 'referrer';
        meta.content = 'no-referrer';
        document.head.appendChild(meta);
        console.log('[Image] 已添加referrer控制，优化图片加载');
    }
});

// 修复微博图片链接
function fixImageUrl(url) {
    if (!url) return '';

    // 处理协议相对URL（以//开头的URL）
    if (url.startsWith('//')) {
        return 'https:' + url;
    }

    // 已经是完整URL
    return url;
}

// 从data.js加载并渲染照片墙
function renderGallery() {
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (!galleryContainer || !websiteData.galleryData) return;

    console.log('[Gallery] 开始渲染照片墙');

    // 清空容器
    galleryContainer.innerHTML = '';

    // 对图片数据按照id排序
    const sortedGalleryData = [...websiteData.galleryData].sort((a, b) => a.id - b.id);

    // 添加照片项
    sortedGalleryData.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', photo.category);
        // 添加图片ID作为属性，方便调试
        galleryItem.setAttribute('data-image-id', photo.id);

        // 确保图片URL是完整的
        const fixedImageUrl = fixImageUrl(photo.imageUrl);

        // 创建一个具有完整图片信息但不立即加载的容器
        galleryItem.innerHTML = `
            <div class="gallery-img-container" 
                 data-src="${fixedImageUrl}" 
                 style="background-color: #f0f0f0; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <span>加载中...</span>
            </div>
            <div class="gallery-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
            </div>
        `;

        galleryContainer.appendChild(galleryItem);
    });

    // 立即加载图片，不要延迟
    loadGalleryImages();

    // 更新筛选功能
    if (typeof updateFilters === 'function') {
        updateFilters();
    }

    // 添加照片点击查看大图功能
    if (typeof addGalleryImageClickHandlers === 'function') {
        addGalleryImageClickHandlers();
    }
}

// 加载画廊图片
function loadGalleryImages() {
    console.log('[Gallery] 开始加载图片');

    const imgContainers = document.querySelectorAll('.gallery-img-container');
    imgContainers.forEach(container => {
        const src = container.getAttribute('data-src');
        console.log('[Image] 加载图片:', src);

        // 创建图片并设置属性
        const img = new Image();
        img.className = 'gallery-img';
        img.alt = container.parentNode.querySelector('h3')?.textContent || '照片';
        img.referrerPolicy = 'no-referrer'; // 关键：不发送 Referer 信息
        img.crossOrigin = 'anonymous'; // 尝试使用匿名跨域

        // 图片加载成功后替换容器内容
        img.onload = function () {
            container.innerHTML = '';
            container.appendChild(img);
            console.log('[Image] 图片加载成功:', src);
        };

        // 图片加载失败时显示错误信息并尝试备用方法
        img.onerror = function () {
            console.error('[Image] 图片加载失败:', src);

            // 尝试通过Image Proxy加载图片
            const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(src)}`;
            console.log('[Image] 尝试使用代理:', proxyUrl);

            const proxyImg = new Image();
            proxyImg.className = 'gallery-img';
            proxyImg.alt = img.alt;

            proxyImg.onload = function () {
                container.innerHTML = '';
                container.appendChild(proxyImg);
                console.log('[Image] 代理图片加载成功');
            };

            proxyImg.onerror = function () {
                console.error('[Image] 代理图片加载失败');
                container.innerHTML = '<div style="padding: 20px; text-align: center;">图片加载失败</div>';
            };

            proxyImg.src = proxyUrl;
        };

        // 开始加载图片
        img.src = src;
    });
}

// 更新数据源中的所有图片URL，确保它们都是完整URL
function updateAllImageUrls() {
    // 更新照片墙数据
    galleryData.forEach(item => {
        item.imageUrl = fixImageUrl(item.imageUrl);
    });

    // 更新视频数据
    videoData.forEach(item => {
        item.thumbnailUrl = fixImageUrl(item.thumbnailUrl);
    });

    // 更新时光轴数据
    timelineData.forEach(item => {
        item.imageUrl = fixImageUrl(item.imageUrl);
    });

    // 更新故事数据
    if (storyData) {
        storyData.forEach(item => {
            item.imageUrl = fixImageUrl(item.imageUrl);
        });
    }

    console.log('[Data] 所有图片URL已更新为完整链接');
}

// 动态扫描并加载图片
function scanForImages() {
    console.log('[Gallery] 开始初始化照片数据');

    // 清空当前galleryData
    galleryData = [];

    // 在浏览器环境中，我们无法直接扫描服务器上的文件夹
    // 所以我们使用一个预设的照片数组来初始化
    // 这个数组包含可能存在的所有照片编号
    const possiblePhotos = [
        // 在实际环境中，这里会根据实际情况动态生成
        // 现在我们假设有36张照片，但也可能有些编号不存在
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100
    ];


    // 记录照片加载的计数和状态
    let loadedCount = 0;
    let totalToCheck = possiblePhotos.length;

    // 为每个可能的照片编号创建一个照片对象
    possiblePhotos.forEach(id => {
        const imgPath = `public/images/图片${id}.jpg`;

        // 直接创建照片对象并添加到galleryData
        const newImage = {
            id: id,
            title: '',
            description: '',
            imageUrl: imgPath,
            category: 'graduation',
            // 添加一个标志，指示这张照片是否已验证存在
            verified: false
        };

        galleryData.push(newImage);
    });

    // 排序galleryData，确保按ID顺序
    galleryData.sort((a, b) => a.id - b.id);

    // 更新websiteData中的galleryData
    websiteData.galleryData = [...galleryData];

    console.log(`[Gallery] 初始化了 ${galleryData.length} 个照片对象`);

    // 触发自定义事件，通知页面照片数据已准备好
    const event = new CustomEvent('galleryDataReady');
    document.dispatchEvent(event);

    // 在后台验证每张照片是否真实存在
    setTimeout(() => {
        verifyImages();
    }, 100);
}

// 验证图片是否存在
function verifyImages() {
    console.log('[Gallery] 开始验证照片是否存在');

    let verifiedCount = 0;
    let pendingVerifications = galleryData.length;

    galleryData.forEach((photo, index) => {
        const img = new Image();

        img.onload = function () {
            // 照片存在
            photo.verified = true;
            verifiedCount++;
            pendingVerifications--;

            console.log(`[Gallery] 照片ID ${photo.id} 已验证存在`);

            checkIfVerificationComplete();
        };

        img.onerror = function () {
            // 照片不存在，标记为移除
            photo.shouldRemove = true;
            pendingVerifications--;

            console.log(`[Gallery] 照片ID ${photo.id} 不存在`);

            checkIfVerificationComplete();
        };

        // 开始加载图片
        img.src = photo.imageUrl;
    });

    function checkIfVerificationComplete() {
        if (pendingVerifications === 0) {
            console.log(`[Gallery] 所有照片验证完成，共有 ${verifiedCount} 张照片存在`);

            // 过滤掉不存在的照片
            galleryData = galleryData.filter(photo => !photo.shouldRemove);

            // 更新websiteData中的galleryData
            websiteData.galleryData = [...galleryData];

            // 触发照片验证完成事件
            const event = new CustomEvent('galleryImagesVerified', {
                detail: {
                    totalImages: galleryData.length,
                    verifiedImages: verifiedCount
                }
            });
            document.dispatchEvent(event);
        }
    }
}

// 添加统一的DOMContentLoaded事件处理
document.addEventListener('DOMContentLoaded', function () {
    console.log('[App] 页面已加载，初始化数据');

    // 首先更新所有图片URL
    updateAllImageUrls();

    // 然后扫描并加载图片
    scanForImages();
}); 