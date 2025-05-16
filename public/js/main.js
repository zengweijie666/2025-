// 初始化 AOS 动画库
document.addEventListener('DOMContentLoaded', function () {
    // 初始化AOS动画
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // 更新页面标题
    document.title = websiteData.siteConfig.siteTitle;

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 更新管理员邮箱
    const adminEmailElements = document.querySelectorAll('.admin-email, .site-footer .fas.fa-envelope + p');
    adminEmailElements.forEach(el => {
        if (el) {
            el.textContent = websiteData.siteConfig.adminEmail;
        }
    });

    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 加载首页视频集合
    const videoCollection = document.querySelector('.video-collection .row');
    if (videoCollection && websiteData.videoData) {
        // 清空现有内容
        videoCollection.innerHTML = '';

        // 从data.js加载视频数据
        websiteData.videoData.forEach((video, index) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'col-md-6';
            videoCard.setAttribute('data-aos', 'zoom-in');
            if (index > 0) {
                videoCard.setAttribute('data-aos-delay', index * 100);
            }

            videoCard.innerHTML = `
                <div class="video-card">
                    <div class="video-thumbnail">
                        <img src="${video.thumbnailUrl}" alt="${video.title}">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <h3>${video.title}</h3>
                    <p>${video.date}</p>
                </div>
            `;

            videoCollection.appendChild(videoCard);
        });
    }

    // 加载首页推荐回忆
    const featuredPhoto = document.querySelector('.featured-photo');
    const featuredMessage = document.querySelector('.featured-message .message-content');

    if (featuredPhoto && websiteData.galleryData && websiteData.galleryData.length > 0) {
        const photo = websiteData.galleryData[0]; // 使用第一张照片作为推荐
        featuredPhoto.innerHTML = `
            <img src="${photo.imageUrl}" alt="${photo.title}" class="img-fluid rounded shadow">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
            </div>
        `;
    }

    if (featuredMessage && websiteData.blessingData && websiteData.blessingData.length > 0) {
        const blessing = websiteData.blessingData[0]; // 使用第一条祝福作为推荐
        featuredMessage.innerHTML = `
            <p class="quote">"${blessing.content}"</p>
            <p class="author">— ${blessing.name}</p>
        `;
    }

    // 毕业倒计时/已毕业天数
    const daysCounter = document.getElementById('days-counter');
    if (daysCounter) {
        // 从data.js获取毕业日期
        const graduationDate = new Date(websiteData.siteConfig.graduationDate);
        const today = new Date();

        // 计算天数差异
        const diffTime = today - graduationDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            // 已经毕业
            daysCounter.textContent = diffDays;
            document.getElementById('countdown-display').innerHTML = '已毕业 <span id="days-counter">' + diffDays + '</span> 天';
        } else {
            // 还未毕业，显示倒计时
            daysCounter.textContent = Math.abs(diffDays);
            document.getElementById('countdown-display').innerHTML = '距离毕业还有 <span id="days-counter">' + Math.abs(diffDays) + '</span> 天';
        }
    }

    // 我们的足迹地图
    const footprintsMap = document.getElementById('footprints-map');
    if (footprintsMap && window.echarts) {
        const map = echarts.init(footprintsMap);

        // 从data.js获取足迹数据
        const locationData = websiteData.locationData;

        const option = {
            backgroundColor: '#f4f1de',
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    const location = locationData.find(item => item.name === params.name);
                    if (location && location.message) {
                        return `${params.name}<br/>${location.message}`;
                    }
                    return params.name;
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: '#ddd'
                    },
                    emphasis: {
                        areaColor: '#f4f1de'
                    }
                },
                regions: [{
                    name: '南海诸岛',
                    value: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0,
                            label: {
                                show: false
                            }
                        }
                    }
                }]
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: locationData,
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 2
                        }
                    }
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: locationData,
                    symbolSize: function (val) {
                        return val[2] || 12;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                const location = locationData.find(item => item.name === params.name);
                                return location && location.itemStyle ? location.itemStyle.color : '#6a8caf';
                            },
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
        };

        map.setOption(option);

        // 窗口大小改变时调整地图大小
        window.addEventListener('resize', function () {
            map.resize();
        });

        // 添加位置提交
        const submitLocationBtn = document.getElementById('submitLocation');
        if (submitLocationBtn) {
            submitLocationBtn.addEventListener('click', function () {
                const name = document.getElementById('name').value || '匿名同学';
                const city = document.getElementById('city').value;
                const message = document.getElementById('message').value || '';

                if (city) {
                    // 使用data.js中的辅助函数添加位置
                    // 注意：这里需要实际的坐标数据，暂时用随机坐标代替
                    // 实际项目中可以通过地理编码API获取城市坐标
                    const randomLng = 100 + Math.random() * 20;
                    const randomLat = 30 + Math.random() * 10;

                    const newLocation = websiteData.helpers.addLocation(city, [randomLng, randomLat], message);

                    // 更新地图数据
                    const newLocationData = [...locationData, newLocation];
                    map.setOption({
                        series: [{
                            data: newLocationData
                        }, {
                            data: newLocationData
                        }]
                    });

                    alert('位置已添加成功！管理员审核后将显示在地图上。');
                    // 关闭模态框
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addLocationModal'));
                    modal.hide();
                    // 清空表单
                    document.getElementById('locationForm').reset();
                } else {
                    alert('请输入城市名称');
                }
            });
        }
    }

    // 照片墙筛选功能（如果在照片墙页面）
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 添加当前按钮的active类
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // 视频点击播放
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    if (videoThumbnails.length > 0) {
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                // 这里简单示例，实际项目中可能会打开一个模态框播放视频
                const videoTitle = this.nextElementSibling.textContent;
                alert('播放视频: ' + videoTitle);
                // 在实际项目中，可以实现弹出视频播放器的功能
            });
        });
    }

    // 祝福墙点赞功能
    const likeButtons = document.querySelectorAll('.blessing-like');
    if (likeButtons.length > 0) {
        likeButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const likeCount = this.querySelector('.like-count');
                let count = parseInt(likeCount.textContent);
                count++;
                likeCount.textContent = count;

                // 添加点赞动画效果
                this.querySelector('i').classList.add('liked');
                setTimeout(() => {
                    this.querySelector('i').classList.remove('liked');
                }, 500);
            });
        });
    }

    // 照片墙图片点击查看大图
    const galleryImages = document.querySelectorAll('.gallery-item');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function () {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgTitle = this.querySelector('h3') ? this.querySelector('h3').textContent : '';
                const imgDesc = this.querySelector('p') ? this.querySelector('p').textContent : '';

                // 创建大图查看层
                const overlay = document.createElement('div');
                overlay.className = 'img-overlay';

                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';

                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-btn';
                closeBtn.innerHTML = '&times;';

                const img = document.createElement('img');
                img.src = imgSrc;

                const caption = document.createElement('div');
                caption.className = 'img-caption';
                caption.innerHTML = `<h3>${imgTitle}</h3><p>${imgDesc}</p>`;

                imgContainer.appendChild(closeBtn);
                imgContainer.appendChild(img);
                imgContainer.appendChild(caption);
                overlay.appendChild(imgContainer);
                document.body.appendChild(overlay);

                // 禁止滚动
                document.body.style.overflow = 'hidden';

                // 点击关闭
                closeBtn.addEventListener('click', function () {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = 'auto';
                });

                // 点击遮罩层关闭
                overlay.addEventListener('click', function (e) {
                    if (e.target === overlay) {
                        document.body.removeChild(overlay);
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });
    }

    // 祝福表单提交
    const blessingForm = document.getElementById('blessing-form');
    if (blessingForm) {
        blessingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('blessing-name').value || '匿名同学';
            const content = document.getElementById('blessing-content').value;

            if (content.trim() === '') {
                alert('请输入祝福内容');
                return;
            }

            // 使用data.js中的辅助函数添加祝福
            websiteData.helpers.addBlessing(name, content);

            alert('祝福已提交，审核通过后将显示在祝福墙上');
            this.reset();
        });
    }
}); 