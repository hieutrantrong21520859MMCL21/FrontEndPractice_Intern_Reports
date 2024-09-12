/*
Viết một trang blog sử dụng hash router để dịch chuyển không làm load lại trang
Cấu trúc:
- Homepage: /
- Các trang thành phần: /:fileName
 - /tab_name-* với * là chữ số, tab_name là các nội dung trong navigation bar
*/

// Element có tag là `aside` và class là `ToC` chứa bảng Table of Content của nội dung
const toc = document.querySelector('aside.ToC');

// Element có tag là `article` sẽ chứa nội dung chính của bài viết
const article = document.querySelector('article');

// Biến chứa giá trị của thành phần `dark_mode` lưu trong local storage
let dark_mode = localStorage.getItem('dark_mode');

// Biến lưu giá trị mới nhất của tọa độ trục Y khi cuộn màn hình
let lastScrollYPos = 0;

// Giá trị hằng số của số báo cáo tiến độ thực tập (có thể thay đổi)
const amount_week_report = 8;

// Hàm hiển thị màn hình loading khi chuyển trang
function showLoader() {

    document.querySelector('.loader').style.visibility = 'visible';
}

// Hàm ẩn màn hình loading sau khi chuyển trang
function hideLoader() {

    document.querySelector('.loader').style.visibility = 'hidden';
}

// Hàm hiển thị nội dung sau khi hết loading
function contentFadeIn() {
    article.style.visibility = 'visible';
    toc.style.visibility = 'visible';
}

// Hàm ẩn nội dung khi đang loading
function contentFadeOut() {
    article.style.visibility = 'hidden';
    toc.style.visibility = 'hidden';
}

// Hàm parse văn bản Markdown thành văn bản HTML
function parseMarkdown(fileName) {

    fetch(`./md/${fileName}.md`)
    .then(res => res.text())
    .then(text => {
        
        article.innerHTML = marked.parse(text);

        if (fileName !== 'profile') {

            // Biến lấy giá trị số trong fileName
            let id = '';

            // Thiết kế khung hiển thị đối với nội dung là các báo cáo tiến độ
            if (fileName.startsWith('week')) {

                id = fileName.split('_')[0].replace('week','');

                const works = Array.from(article.querySelectorAll('section h3')).map(ele => ele.innerHTML);
                const details_per_work = Array.from(article.querySelectorAll('section ul')).map(ele => ele.innerHTML);
            
                article.querySelector('section').innerHTML = '';
                article.querySelector('section').appendChild(document.createElement('ul'));
            
                let htmlText = '';
                works.forEach((work, index) => {
                    htmlText += `
                    <li>
                        <div>
                            <div id="work-${index + 1}">${work}</div>
                        </div>
                        <div class="details">
                            <ul>${details_per_work[index]}</ul>
                        </div>
                    </li>`;
                })

                article.querySelector('section ul').innerHTML = htmlText;
            }

            /* Vẽ các nút trong trang nội dung (dựa vào biến `id`)
                - Trang 1 và trang cận cuối chỉ có một nút
                - Các trang còn lại đều có 2 nút
            */
            const aside_buttons = document.createElement('aside');
            aside_buttons.className = 'moving-buttons';
            aside_buttons.style.display = 'flex';

            if (id == 1) {

                aside_buttons.style.justifyContent = 'flex-end';

                aside_buttons.innerHTML = `
                <button id="forward">
                    <p>Next</p>
                    <div>
                        <p>Tuần 2</p>
                        <img src="./asset/images/icon-double-arrow-right.svg" alt="icon-forward"/>
                    </div>
                </button>`;

                aside_buttons.querySelector('#forward').addEventListener('click', () => {

                    window.location.hash = '#/week-2';
                });
            }
            else if (id == amount_week_report) {

                aside_buttons.style.justifyContent = 'flex-start';

                aside_buttons.innerHTML = `
                <button id="backward">
                    <p>Previous</p>
                    <div>
                       <img src="./asset/images/icon-double-arrow-left.svg" alt="icon-backward"/>
                       <p>Tuần ${amount_week_report - 1}</p>
                    </div>
                </button>`;

                aside_buttons.querySelector('#backward').addEventListener('click', () => {

                    window.location.hash = `#/week-${amount_week_report - 1}`;
                });
            }
            else {

                aside_buttons.style.justifyContent = 'space-between';

                aside_buttons.innerHTML = `
                <button id="backward">
                    <p>Previous</p>
                    <div>
                       <img src="./asset/images/icon-double-arrow-left.svg" alt="icon-backward"/>
                       <p>Tuần ${id - 1}</p>
                    </div>
                </button>
                <button id="forward">
                   <p>Next</p>
                   <div>
                      <p>Tuần ${+id + 1}</p>
                      <img src="./asset/images/icon-double-arrow-right.svg" alt="icon-forward"/>
                   </div>
                </button>`;

                aside_buttons.querySelector('#backward').addEventListener('click', () => {

                    window.location.hash = `#/week-${id - 1}`;
                });

                aside_buttons.querySelector('#forward').addEventListener('click', () => {

                    window.location.hash = `#/week-${+id + 1}`;
                });
            }

            article.appendChild(aside_buttons);

            // Xử lý nội dung hiển thị tương ứng màn hình thiết bị
            window.innerWidth <= 992 ? handleSmallMediumScreen() : handleLargeScreen();
        }

    }).catch(() => { // Khi trang không được tìm thấy

        article.innerHTML = `
        <h1>404</h1>
        <h3>Trang không hợp lệ!</h3>
        <p>Rất tiếc, trang yêu cầu không hợp lệ. Nhấn vào logo để quay lại trang chủ hoặc chọn nội dung tìm kiếm khác!</p>`;
        article.className = 'not-found';

        toc.innerHTML = '';

    }).finally(() => {

        hideLoader();
        contentFadeIn();
    })
}

// routie('/:page/:section', (page, section) => {

    

//     if (section) {

//         // Scroll to this section
//         document.getElementById(section.slice(1,)).scrollIntoView({

//             behavior: 'smooth',
//             block: 'start'
//         })
//     }
//     else {

        
//     }
// })

// Xử lý khi route tới trang `/`
routie('', () => {

    dark_mode = localStorage.getItem('dark_mode');
    
    article.className = 'profile';
    toc.innerHTML = '';

    // Bật màn hình loading trong 300ms
    showLoader();
    contentFadeOut();
    setTimeout(() => {
        parseMarkdown('profile');
    }, 300);
})

// Xử lý khi route tới các trang nội dung chính
routie('/:fileName', fileName => {

    dark_mode = localStorage.getItem('dark_mode');
    
    article.className = `${fileName}`;

    // Bật màn hình loading trong 300ms
    showLoader();
    contentFadeOut();
    setTimeout(() => {
        parseMarkdown(`${fileName.replace('-', '') + '_report'}`);
    }, 300);
})

// Trở về trang `/` khi click vào logo
document.querySelector('main header .logo').addEventListener('click', () => {

    window.location.hash = '';
})

// Hiển thị thanh tiêu đề chỉ khi màn hình cuộn lên
window.addEventListener('scroll', () => {

    let currentScrollYPos = window.scrollY;
    if (currentScrollYPos == 0) {

        document.querySelector('main header').classList.remove('scrolled-up');
    }
    else if (currentScrollYPos - lastScrollYPos < 0) {

        document.querySelector('main header').classList.add('scrolled-up');
    }
    else {

        document.querySelector('main header').classList.remove('scrolled-up');
    }

    lastScrollYPos = currentScrollYPos;
})

/* Xử lý giao diện với các thiết bị cỡ vừa và nhỏ (độ rộng màn hình <= 992px) */
function handleSmallMediumScreen() {

    // Thiết lập lại giá trị của lastScrollYPos
    lastScrollYPos = 0;

    // Không hiển thị bảng ToC ở màn hình vừa và nhỏ
    toc.className = 'ToC only-small-medium-screen';
    toc.innerHTML = '';

    // Thay đổi class trong các element
    document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

        ele.className = `work-${index + 1} small-medium-screen-only`;
    })

    // Thay đổi hình thái của navigation bar trên màn hình vừa và nhỏ
    const header_div = document.querySelector('main header > div:last-child');
    header_div.className = 'navbar-only-small-medium-screen';
    header_div.innerHTML = `
    <img src="./asset/images/icon-menu.svg" alt="icon-menu" id="icon-menu">
    <div class="navbar-wrapper">
        <div class="navbar">
            <div class="buttons">
                <img src="./asset/images/icon-menu-close.svg" alt="icon-menu-close" id="icon-menu-close">
                <input type="checkbox" id="themeSwitch">
            </div>
            <ul class="tabs">
                <li id="intern-reports">
                    <div>Báo cáo thực tập</div>
                    <div>
                        ${innerHTML = Array.from({length: 8})
                        .map((_, index) => `<a href="#/week-${index + 1}" aria-content="page">Tuần ${index + 1}</a>`)
                        .join('\n')}
                    </div>
                </li>
            </ul>
        </div>
    </div>`;

    /* Các sự kiện */
    const nav_container = header_div.querySelector('.navbar-wrapper');

    // Thay màu nền
    if (dark_mode === 'active') {

        document.body.classList.add('dark-theme');
    }

    const btnThemeSwitch = header_div.querySelector('#themeSwitch');
    btnThemeSwitch.addEventListener('click', () => {

        dark_mode = localStorage.getItem('dark_mode');

        if (dark_mode !== 'active') {

            document.body.classList.add('dark-theme');
            localStorage.setItem('dark_mode', 'active');
        }
        else {

            document.body.classList.remove('dark-theme');
            localStorage.setItem('dark_mode', '');
        }
    })

    // Bật navigation bar
    const btnOpenNav = header_div.querySelector('#icon-menu');
    btnOpenNav.addEventListener('click', () => {

        nav_container.classList.add('active');
    })

    // Đóng navigation bar
    const btnCloseNav = header_div.querySelector('#icon-menu-close');
    btnCloseNav.addEventListener('click', () => {
    
        nav_container.classList.remove('active');
    })

    // Đóng navigation bar khi chạm vào ngoài navigation bar (chỉ trên thiết bị vừa và nhỏ)
    nav_container.addEventListener('click', event => {
    
        const navbar = nav_container.querySelector('.navbar');
        
        if (event.clientX <= screen.width - navbar.offsetWidth) {
        
            nav_container.classList.remove('active');
        }
    })

    // Hiển thị chi tiết công việc (theo kiểu FAQ)
    const first_div_elements = document.querySelectorAll("main article section > ul li .small-medium-screen-only");
    first_div_elements.forEach((ele, index) => {

        ele.addEventListener('click', () => {

            ele.classList.toggle('active');

            const the_others = Array.from(first_div_elements).slice();
            the_others.splice(index, 1);
            the_others.forEach(o => o.classList.remove('active'));
        })
    })

    // Hiển thị các nội dung trên navigation bar (theo kiều FAQ)
    document.querySelectorAll("main header > div:last-child ul.tabs > li").forEach((ele, index) => {
        ele.addEventListener('click', () => {
        
            ele.classList.toggle('active');
        
            const the_others = Array.from(document.querySelectorAll("main header > div:last-child ul.tabs > li")).slice();
            the_others.splice(index, 1);
            the_others.forEach(o => o.classList.remove('active'));
        })
    })
}

/* Xử lý giao diện với các thiết bị cỡ vừa và nhỏ (độ rộng màn hình > 992px) */
function handleLargeScreen() {

    // Thiết lập lại giá trị của lastScrollYPos
    lastScrollYPos = 0;

    // Thay đổi hình thái của navigation bar trên màn hình lớn
    const header_div = document.querySelector('main header > div:last-child');
    header_div.className = 'navbar-only-large-screen';
    header_div.innerHTML = `
    <ul class="tabs">
        <li id="intern-reports">
            <div>Báo cáo thực tập</div>
            <div>
                ${innerHTML = Array.from({length: 8})
                .map((_, index) => `<a href="#/week-${index + 1}" aria-content="page">Tuần ${index + 1}</a>`)
                .join('\n')}
            </div>
        </li>
    </ul>
    <input type="checkbox" id="themeSwitch">`;

    // Thay đổi class trong các element
    document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

        ele.className = `work-${index + 1} large-screen-only`;
    })

    // Thiết lập lại ToC mỗi khi chuyển trang
    toc.className = 'ToC only-large-screen';
    toc.innerHTML = '';

    const ul = document.createElement('ul');
    let htmlText = '';

    document.querySelectorAll('main article section > ul > li [id*="work-"]').forEach((ele, index) => {

        htmlText += `
        <li>

            <div id="#${ele.getAttribute('id')}">${ele.textContent}</div>

        </li>`;
    })

    ul.innerHTML = htmlText;
    toc.appendChild(ul);

    /* Các sự kiện */
    const btnThemeSwitch = header_div.querySelector('#themeSwitch');

    // Thay nền
    if (dark_mode === 'active') {

        document.body.classList.add('dark-theme');
    }

    btnThemeSwitch.addEventListener('click', () => {

        dark_mode = localStorage.getItem('dark_mode');

        if (dark_mode !== 'active') {

            document.body.classList.add('dark-theme');
            localStorage.setItem('dark_mode', 'active');
        }
        else {

            document.body.classList.remove('dark-theme');
            localStorage.setItem('dark_mode', '');
        }
    })

    // Hiển thị các nội dung trên navigation bar (theo kiểu FAQ)
    document.querySelectorAll("main header > div:last-child ul.tabs > li").forEach((ele, index) => {
        ele.addEventListener('click', () => {
        
            ele.classList.toggle('active');
        
            const the_others = Array.from(document.querySelectorAll("main header > div:last-child ul.tabs > li")).slice();
            the_others.splice(index, 1);
            the_others.forEach(o => o.classList.remove('active'));
        })
    })

    // let tmp_hash = window.location.hash;
    // if (tmp_hash.endsWith('/')) {

    //     tmp_hash = tmp_hash.slice(0, -1);
    // }

    document.querySelectorAll('main aside.ToC ul > li div').forEach(ele => {

        ele.addEventListener('click', () => {

            window.location.hash = `${tmp_hash}${ele.getAttribute('id')}`;
        })
    })
}

// First check of devices' screen
let mql = window.matchMedia('(max-width: 992px)');

if (mql.matches) {
    // Modify screen for small and medium devices
    handleSmallMediumScreen();
    console.log('small,med');
}
else {

    // Modify screen for large devices
    handleLargeScreen();
    console.log('large');
}

// Listen for changes of devices' screen
mql.onchange = e => {
    
    dark_mode = localStorage.getItem('dark_mode');

    if (e.matches) {
    
        // Modify screen for small and medium devices
        handleSmallMediumScreen();
        console.log('small,med');
    }
    else {
    
        // Modify screen for large devices
        handleLargeScreen();
        console.log('large');
    }
};