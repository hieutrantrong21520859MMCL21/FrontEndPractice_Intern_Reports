const btnOpenNav = document.getElementById('icon-menu');
const btnCloseNav = document.getElementById('icon-menu-close');
const btnChangeTheme = document.getElementById('themeChange');
const nav_container = document.querySelector('header .navbar-only-small-medium-screen .navbar-wrapper');

btnOpenNav.addEventListener('click', () => {

    nav_container.classList.add('active');
})

btnCloseNav.addEventListener('click', () => {

    nav_container.classList.remove('active');
})

document.addEventListener('click', event => {

    const navbar = nav_container.querySelector('.navbar');

    if (event.clientX <= screen.width - navbar.offsetWidth) {

        nav_container.classList.remove('active');
    }
})

btnChangeTheme.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme');
})

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

                    <details name="${fileName}">

                        <summary>
                            <div>${work}</div>
                        </summary>
                        <ul>${details_per_work[index]}</ul>

                    </details>

                </li>`;
            })

            article.querySelector('section ul').innerHTML = htmlText;
        }

    }).finally(nav_container.classList.remove('active'));
}

routie('/:fileName', fileName => {

    article.className = `${fileName}`;

    if (fileName.startsWith('week-')) {
        
        fileName = fileName.replace('-', '') + '_report';
    }

    parseMarkdown(fileName);
})