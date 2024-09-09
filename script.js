let dark_mode = localStorage.getItem('dark_mode');

const aside = document.querySelector('main > aside');
const article = document.querySelector('article');

const ENTRANCE_CLASS = 'animate__animated animate__fadeIn';
const EXIT_CLASS = 'animate__animated animate__fadeOut';

function showLoader() {

    document.querySelector('.loader').style.visibility = 'visible';
}

function hideLoader() {

    document.querySelector('.loader').style.visibility = 'hidden';
}

// function parseMarkdown(fileName) {

//     fetch(`./md/${fileName}.md`).then(res => res.text()).then(text => {
        
//         const article = document.querySelector('article');
//         article.innerHTML = marked.parse(text);

//         if (fileName.startsWith('week')) {

//             const works = Array.from(article.querySelectorAll('section h3')).map(ele => ele.innerHTML);
//             const details_per_work = Array.from(article.querySelectorAll('section ul')).map(ele => ele.innerHTML);
        
//             article.querySelector('section').innerHTML = '';
//             article.querySelector('section').appendChild(document.createElement('ul'));
        
//             let htmlText = '';
//             works.forEach((work, index) => {

//                 htmlText += `
//                 <li>

//                     <div>
//                         <div id="work-${index + 1}">${work}</div>
//                     </div>

//                     <div class="details">
                    
//                         <ul>${details_per_work[index]}</ul>

//                     </div>

//                 </li>`;
//             })

//             article.querySelector('section ul').innerHTML = htmlText;
//         }

//     }).finally(() => {

//         // First check of devices' screen
//         let mql = window.matchMedia('(max-width: 992px)');

//         if (mql.matches) {

//             // Modify screen for small and medium devices
//             handleSmall_MediumScreen();
//             console.log('small,med');
//         }
//         else {
        
//             // Modify screen for large devices
//             handleLargeScreen();
//             console.log('large');
//         }

//         // Listen for changes of devices' screen
//         mql.onchange = e => {

//             dark_mode = localStorage.getItem('dark_mode');
        
//             if (e.matches) {
            
//                 // Modify screen for small and medium devices
//                 handleSmall_MediumScreen();
//                 console.log('small,med');
//             }
//             else {
            
//                 // Modify screen for large devices
//                 handleLargeScreen();
//                 console.log('large');
//             }
//         };
//     })
// }

// function handleSmall_MediumScreen() {

//     // Draw a Table of Contents (reports only, not profile)
//     const aside = document.querySelector('main > aside');
//     aside.className = 'no-ToC-in-small-medium-screen';
//     aside.innerHTML = '';

//     // Modify article for only small and medium devices' screen
//     document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

//         ele.className = `work-${index + 1} small-medium-screen-only`;
//     })

//     // Draw a navigation bar used only in small and medium devices' screen
//     const header_div = document.querySelector('main header > div:last-child');
//     header_div.className = 'navbar-only-small-medium-screen';
//     header_div.innerHTML = `
//     <img src="./asset/images/icon-menu.svg" alt="icon-menu" id="icon-menu">

//     <div class="navbar-wrapper">

//         <div class="navbar">

//             <div class="buttons">

//                 <img src="./asset/images/icon-menu-close.svg" alt="icon-menu-close" id="icon-menu-close">
//                 <input type="checkbox" id="themeSwitch">
                     
//             </div>
        
//             <ul class="tabs">
    
//                 <li id="intern-reports">

//                     <details>

//                         <summary>Báo cáo thực tập</summary>
//                         <div>

//                             <a href="#/week-1" aria-content="page">Tuần 1</a>
//                             <a href="#/week-2" aria-content="page">Tuần 2</a>
//                             <a href="#/week-3" aria-content="page">Tuần 3</a>
//                             <a href="#/week-4" aria-content="page">Tuần 4</a>
//                             <a href="#/week-5" aria-content="page">Tuần 5</a>
//                             <a href="#/week-6" aria-content="page">Tuần 6</a>
//                             <a href="#/week-7" aria-content="page">Tuần 7</a>
//                             <a href="#/week-8" aria-content="page">Tuần 8</a>

//                         </div>

//                     </details>

//                 </li>
    
//             </ul>
        
//         </div>
      
//     </div>`;

//     /* Events */
//     const nav_container = header_div.querySelector('.navbar-wrapper');

//     // Set theme
//     if (dark_mode === 'active') {

//         document.body.classList.add('dark-theme');
//     }

//     const btnThemeSwitch = header_div.querySelector('#themeSwitch');
//     btnThemeSwitch.addEventListener('click', () => {

//         dark_mode = localStorage.getItem('dark_mode');

//         if (dark_mode !== 'active') {

//             document.body.classList.add('dark-theme');
//             localStorage.setItem('dark_mode', 'active');
//         }
//         else {

//             document.body.classList.remove('dark-theme');
//             localStorage.setItem('dark_mode', '');
//         }
//     })

//     // Open navigation bar
//     const btnOpenNav = header_div.querySelector('#icon-menu');
//     btnOpenNav.addEventListener('click', () => {

//         nav_container.classList.add('active');
//     })

//     // Close navigation bar
//     const btnCloseNav = header_div.querySelector('#icon-menu-close');
//     btnCloseNav.addEventListener('click', () => {
    
//         nav_container.classList.remove('active');
//     })

//     // Close navigation bar when touch outside the bar
//     nav_container.addEventListener('click', event => {
    
//         const navbar = nav_container.querySelector('.navbar');
        
//         if (event.clientX <= screen.width - navbar.offsetWidth) {
        
//             nav_container.classList.remove('active');
//         }
//     })

//     // FAQ's event 
//     const first_div_elements = document.querySelectorAll("main article section > ul li .small-medium-screen-only");
//     first_div_elements.forEach((ele, index) => {

//         ele.addEventListener('click', () => {

//             ele.classList.toggle('active');

//             const the_others = Array.from(first_div_elements).slice();
//             the_others.splice(index, 1);
//             the_others.forEach(o => o.classList.remove('active'));
//         })
//     })

//     const logo = document.querySelector('main header .logo');
//     logo.addEventListener('click', () => {

//         window.location.hash = '';
//     })
// }

// function handleLargeScreen() {

//     // Draw options in the header (only seen in large devices' screen)
//     const header_div = document.querySelector('main header > div:last-child');
//     header_div.className = 'navbar-only-large-screen';
//     header_div.innerHTML = `
//     <ul class="tabs">

//         <li id="intern-reports">

//             <details>

//                 <summary>Báo cáo thực tập</summary>

//                 <div>
//                     <a href="#/week-1" aria-content="page">Tuần 1</a>
//                     <a href="#/week-2" aria-content="page">Tuần 2</a>
//                     <a href="#/week-3" aria-content="page">Tuần 3</a>
//                     <a href="#/week-4" aria-content="page">Tuần 4</a>
//                     <a href="#/week-5" aria-content="page">Tuần 5</a>
//                     <a href="#/week-6" aria-content="page">Tuần 6</a>
//                     <a href="#/week-7" aria-content="page">Tuần 7</a>
//                     <a href="#/week-8" aria-content="page">Tuần 8</a>
//                 </div>

//             </details>

//         </li>

//     </ul>
    
//     <input type="checkbox" id="themeSwitch">`;

//     // Modify article for only large devices' screen
//     document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

//         ele.className = `work-${index + 1} large-screen-only`;
//     })

//     // Draw a Table of Contents (reports only, not profile)
//     const aside = document.querySelector('main > aside');
//     aside.className = 'ToC-only-large-screen';
//     aside.innerHTML = '';

//     const ul = document.createElement('ul');
//     let htmlText = '';

//     document.querySelectorAll('main article section > ul > li [id*="work-"]').forEach((ele, index) => {

//         htmlText += `
//         <li>

//             <a href="#${ele.getAttribute('id')}" aria-current="page">${ele.textContent}</a>

//         </li>`;
//     })

//     ul.innerHTML = htmlText;
//     aside.appendChild(ul);

//     /* Events */
//     const btnThemeSwitch = header_div.querySelector('#themeSwitch');

//     // Set theme
//     if (dark_mode === 'active') {

//         document.body.classList.add('dark-theme');
//     }

//     btnThemeSwitch.addEventListener('click', () => {

//         dark_mode = localStorage.getItem('dark_mode');

//         if (dark_mode !== 'active') {

//             document.body.classList.add('dark-theme');
//             localStorage.setItem('dark_mode', 'active');
//         }
//         else {

//             document.body.classList.remove('dark-theme');
//             localStorage.setItem('dark_mode', '');
//         }
//     })

//     const logo = document.querySelector('main header .logo');
//     logo.addEventListener('click', () => {

//         window.location.hash = '';
//     })
// }

// routie('', () => {

//     dark_mode = localStorage.getItem('dark_mode');

//     const article = document.querySelector('article');
//     article.className = 'profile';

//     // Show loader in 300ms
//     article.innerHTML = '';
//     document.querySelector('aside').style.visibility = 'hidden';
//     showLoader();
//     setTimeout(() => {
//         hideLoader();
//         parseMarkdown('profile');
//     }, 300);
//     // parseMarkdown('profile');
// })

// routie('/:fileName', fileName => {

//     dark_mode = localStorage.getItem('dark_mode');

//     const article = document.querySelector('article');
//     article.className = `${fileName}`;

//     // Show loader in 300ms
//     article.innerHTML = '';
//     document.querySelector('aside').style.visibility = 'hidden';
//     showLoader();
//     setTimeout(() => {
//         hideLoader();
//         parseMarkdown(`${fileName.replace('-', '') + '_report'}`);
//     }, 300);
//     // parseMarkdown(`${fileName.replace('-', '') + '_report'}`);
// })

function contentFadeIn() {
    article.classList.remove('animate__animated', 'animate__fadeOut');
    article.classList.add('animate__animated', 'animate__fadeIn');
    aside.classList.remove('animate__animated', 'animate__fadeOut');
    aside.classList.add('animate__animated', 'animate__fadeIn');
}

function contentFadeOut() {
    article.classList.remove('animate__animated', 'animate__fadeIn');
    article.classList.add('animate__animated', 'animate__fadeOut');
    aside.classList.remove('animate__animated', 'animate__fadeIn');
    aside.classList.add('animate__animated', 'animate__fadeOut');
}

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
                        <div id="work-${index + 1}">${work}</div>
                    </div>
                    <div class="details">

                        <ul>${details_per_work[index]}</ul>
                    </div>
                </li>`;
            })

            article.querySelector('section ul').innerHTML = htmlText;

            window.innerWidth <= 992 ? handleSmallMediumScreen() : handleLargeScreen();
        }
    }).catch(() => {

        article.innerHTML = '';
        aside.innerHTML = '';

    }).finally(() => {

        hideLoader();
        // contentFadeIn();
    })
}

routie('/:page/:section', (page, section) => {

    if (section) {

        // Scroll to this section
        document.getElementById(section.slice(1,)).scrollIntoView({

            behavior: 'smooth',
            block: 'start'
        })
    }
    else {

        
    }
})

routie('', () => {

    dark_mode = localStorage.getItem('dark_mode');
    
    article.className = 'profile';
    aside.innerHTML = '';

    // Show loader in 300ms
    showLoader();
    // contentFadeOut();
    setTimeout(() => {
        // hideLoader();
        parseMarkdown('profile');
    }, 300);
})

routie('/:fileName', fileName => {

    dark_mode = localStorage.getItem('dark_mode');
    
    article.className = `${fileName}`;

    // Show loader in 300ms
    showLoader();
    // contentFadeOut();
    setTimeout(() => {
        // hideLoader();
        parseMarkdown(`${fileName.replace('-', '') + '_report'}`);
    }, 300);
})

const logo = document.querySelector('main header .logo');
logo.addEventListener('click', () => {

    window.location.hash = '';
})

function handleSmallMediumScreen() {

    // Draw a Table of Contents (reports only, not profile)
    aside.className = 'no-ToC-in-small-medium-screen';
    aside.innerHTML = '';

    // Modify article for only small and medium devices' screen
    document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

        ele.className = `work-${index + 1} small-medium-screen-only`;
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
                <input type="checkbox" id="themeSwitch">
                    
            </div>
        
            <ul class="tabs">
    
                <li id="intern-reports">

                    <div>Báo cáo thực tập</div>

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

                </li>
    
            </ul>
        
        </div>
    
    </div>`;

    /* Events */
    const nav_container = header_div.querySelector('.navbar-wrapper');

    // Set theme
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

    // Open navigation bar
    const btnOpenNav = header_div.querySelector('#icon-menu');
    btnOpenNav.addEventListener('click', () => {

        nav_container.classList.add('active');
    })

    // Close navigation bar
    const btnCloseNav = header_div.querySelector('#icon-menu-close');
    btnCloseNav.addEventListener('click', () => {
    
        nav_container.classList.remove('active');
    })

    // Close navigation bar when touch outside the bar
    nav_container.addEventListener('click', event => {
    
        const navbar = nav_container.querySelector('.navbar');
        
        if (event.clientX <= screen.width - navbar.offsetWidth) {
        
            nav_container.classList.remove('active');
        }
    })

    // FAQ's event 
    const first_div_elements = document.querySelectorAll("main article section > ul li .small-medium-screen-only");
    first_div_elements.forEach((ele, index) => {

        ele.addEventListener('click', () => {

            ele.classList.toggle('active');

            const the_others = Array.from(first_div_elements).slice();
            the_others.splice(index, 1);
            the_others.forEach(o => o.classList.remove('active'));
        })
    })

    document.querySelectorAll("main header > div:last-child ul.tabs > li").forEach((ele, index) => {
        ele.addEventListener('click', () => {
        
            ele.classList.toggle('active');
        
            const the_others = Array.from(document.querySelectorAll("main header > div:last-child ul.tabs > li")).slice();
            the_others.splice(index, 1);
            the_others.forEach(o => o.classList.remove('active'));
        })
    })
}

function handleLargeScreen() {

    // Draw options in the header (only seen in large devices' screen)
    const header_div = document.querySelector('main header > div:last-child');
    header_div.className = 'navbar-only-large-screen';
    header_div.innerHTML = `
    <ul class="tabs">

        <li id="intern-reports">

            <div>Báo cáo thực tập</div>

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

        </li>

    </ul>
    
    <input type="checkbox" id="themeSwitch">`;

    // Modify article for only large devices' screen
    document.querySelectorAll('main article section > ul > li > div:first-child').forEach((ele, index) => {

        ele.className = `work-${index + 1} large-screen-only`;
    })

    // Draw a Table of Contents (reports only, not profile)
    aside.className = 'ToC-only-large-screen';
    aside.innerHTML = '';

    const ul = document.createElement('ul');
    let htmlText = '';

    document.querySelectorAll('main article section > ul > li [id*="work-"]').forEach((ele, index) => {

        htmlText += `
        <li>

            <div id="#${ele.getAttribute('id')}">${ele.textContent}</div>

        </li>`;
    })

    ul.innerHTML = htmlText;
    aside.appendChild(ul);

    /* Events */
    const btnThemeSwitch = header_div.querySelector('#themeSwitch');

    // Set theme
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

    document.querySelectorAll("main header > div:last-child ul.tabs > li").forEach((ele, index) => {
        ele.addEventListener('click', () => {
        
            ele.classList.toggle('active');
        
            const the_others = Array.from(document.querySelectorAll("main header > div:last-child ul.tabs > li")).slice();
            the_others.splice(index, 1);
            the_others.forEach(o => o.classList.remove('active'));
        })
    })

    const tmp_hash = window.location.hash;
    if (tmp_hash.endsWith('/')) {

        tmp_hash = tmp_hash.slice(0, -1);
    }

    document.querySelectorAll('main aside ul > li div').forEach(ele => {

        ele.addEventListener('click', () => {

            window.location.hash = `${tmp_hash}/${ele.getAttribute('id')}`;
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