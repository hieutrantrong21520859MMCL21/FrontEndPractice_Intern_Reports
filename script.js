const article = document.querySelector('article');

function parseMarkdown(fileName) {

    fetch(`./md/${fileName}.md`).then(res => res.text()).then(text => {

        article.innerHTML = marked.parse(text);

        if (fileName.startsWith('week')) {
            const works = Array.from(article.querySelectorAll('section h3')).map(ele => ele.innerHTML);
            const details_per_work = Array.from(article.querySelectorAll('section ul')).map(ele => ele.innerHTML);
        
            article.querySelector('section').innerHTML = '';
            article.querySelector('section').appendChild(document.createElement('ul'));
        
            let htmlText = '';
            works.forEach((work, index) => {

                htmlText += `
                <li>

                    <div>
                        <div id="work-${index}">${work}</div>
                    </div>

                    <div class="details">
                    
                        <ul>${details_per_work[index]}</ul>

                    </div>

                </li>`;
            })

            article.querySelector('section ul').innerHTML = htmlText;
        }

    }).finally(() => {

        // First check of devices' screen
        let mql = window.matchMedia('(max-width: 992px)');

        if (mql.matches) {

            // Custom screen for small and medium devices's screen
            handleSmall_MediumScreen();
            console.log('small,med');
        }
        else {
        
            // Custom screen for large devices' screen
            handleLargeScreen();
            console.log('large');
        }

        // Listen for changes of devices' screen
        mql.onchange = e => {
        
            if (e.matches) {
            
                // Custom screen for small-screen and medium-screen devices
                handleSmall_MediumScreen();
                console.log('small,med');
            }
            else {
            
                // Custom screen for large devices' screen
                handleLargeScreen();
                console.log('large');
            }
        };
    });
}

function handleSmall_MediumScreen() {

    // Draw a Table of Contents (reports only, not profile)
    const aside = document.querySelector('main > aside');
    aside.className = 'no-ToC-in-small-medium-screen';
    aside.innerHTML = '';

    // Modify article for only small and medium devices' screen
    document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

        ele.className = `work-${index} small-medium-screen-only`;
    })

    // Draw a navigation bar used only in small and medium devices' screen
    const header_div = document.querySelector('main header > div:last-child');
    header_div.className = 'navbar-only-small-medium-screen';
    header_div.innerHTML = `
    <img src="./asset/images/icon-menu.svg" alt="icon-menu" id="icon-menu">

    <div class="navbar-wrapper">

        <div class="navbar">

            <div class="buttons">

                <img src="./asset/images/icon-menu-close.svg" alt="icon-menu-close" id="icon-menu-close">
                <input type="checkbox" id="changeTheme">
                     
            </div>
        
            <ul class="tabs">
    
                <li id="profile">

                    <a href="#/profile" aria-content="page">Thông tin cá nhân</a>

                </li>

                <li id="intern-reports">

                    <details>

                        <summary>Báo cáo thực tập</summary>
                        <div>

                            <a href="#/week-1" aria-content="page">Tuần 1</a>
                            <a href="#/week-2" aria-content="page">Tuần 2</a>
                            <a href="#/week-3" aria-content="page">Tuần 3</a>
                            <a href="#/week-4" aria-content="page">Tuần 4</a>
                            <a href="#/week-5" aria-content="page">Tuần 5</a>
                            <a href="#/week-6" aria-content="page">Tuần 6</a>
                            <a href="#/week-7" aria-content="page">Tuần 7</a>
                            <a href="#/week-8" aria-content="page">Tuần 8</a>

                        </div>

                    </details>

                </li>
    
            </ul>
        
        </div>
      
    </div>`;
    
    const nav_container = header_div.querySelector('.navbar-wrapper');
    const btnChangeTheme = header_div.querySelector('#changeTheme');
    const btnOpenNav = header_div.querySelector('#icon-menu');
    const btnCloseNav = header_div.querySelector('#icon-menu-close');

    // Events
    btnChangeTheme.addEventListener('click', () => {

        document.body.classList.toggle('dark-theme');
    })

    btnOpenNav.addEventListener('click', () => {

        nav_container.classList.add('active');
    })
    
    btnCloseNav.addEventListener('click', () => {
    
        nav_container.classList.remove('active');
    })

    nav_container.addEventListener('click', event => {
    
        const navbar = nav_container.querySelector('.navbar');
        
        if (event.clientX <= screen.width - navbar.offsetWidth) {
        
            nav_container.classList.remove('active');
        }
    })

    const first_div_elements = document.querySelectorAll("main article section > ul li .small-medium-screen-only");
    first_div_elements.forEach((ele, index) => {

        ele.addEventListener('click', () => {

            ele.classList.toggle('active');

            const others = Array.from(first_div_elements).slice();
            others.splice(index, 1);
            others.forEach(o => o.classList.remove('active'));
        })
    })
}

function handleLargeScreen() {

    // Draw options in the header (only seen in large devices' screen)
    const header_div = document.querySelector('main header > div:last-child');
    header_div.className = 'navbar-only-large-screen';
    header_div.innerHTML = `
    <ul class="tabs">

        <li id="profile">

            <a href="#/profile" aria-content="page">Thông tin cá nhân</a>

        </li>

        <li id="intern-reports">

            <details>

                <summary>Báo cáo thực tập</summary>

                <div>
                    <a href="#/week-1" aria-content="page">Tuần 1</a>
                    <a href="#/week-2" aria-content="page">Tuần 2</a>
                    <a href="#/week-3" aria-content="page">Tuần 3</a>
                    <a href="#/week-4" aria-content="page">Tuần 4</a>
                    <a href="#/week-5" aria-content="page">Tuần 5</a>
                    <a href="#/week-6" aria-content="page">Tuần 6</a>
                    <a href="#/week-7" aria-content="page">Tuần 7</a>
                    <a href="#/week-8" aria-content="page">Tuần 8</a>
                </div>

            </details>

        </li>

    </ul>
    
    <input type="checkbox" id="changeTheme">`;

    // Modify article for only large devices' screen
    document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

        ele.className = `work-${index} large-screen-only`;
    })

    // Draw a Table of Contents (reports only, not profile)
    const aside = document.querySelector('main > aside');
    aside.className = 'ToC-only-large-screen';
    aside.innerHTML = '';

    const ul = document.createElement('ul');
    let htmlText = '';

    document.querySelectorAll('main article section > ul > li [id*="work-"]').forEach((ele, index) => {

        htmlText += `
        <li>

            <a href="#${ele.getAttribute('id')}">Công việc ${index + 1}</a>

        </li>`;
    })

    ul.innerHTML = htmlText;
    aside.appendChild(ul);

    // Events
    const btnChangeTheme = header_div.querySelector('#changeTheme');

    btnChangeTheme.addEventListener('click', () => {

        document.body.classList.toggle('dark-theme');
    })
}

routie('/:fileName', fileName => {

    article.className = `${fileName}`;

    if (fileName.startsWith('week-')) {
        
        fileName = fileName.replace('-', '') + '_report';
    }

    parseMarkdown(fileName);
})