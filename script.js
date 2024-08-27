const btnOpenMenu = document.getElementById('icon-menu');
const btnCloseMenu = document.getElementById('icon-menu-close');
const btnChangeTheme = document.getElementById('themeChange');
const menu = document.querySelector('main > header dialog');

btnOpenMenu.addEventListener('click', () => {

    menu.showModal();
})

btnCloseMenu.addEventListener('click', () => {

    menu.close();
})

btnChangeTheme.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme');
})

const article = document.querySelector('article');
routie('/profile', () => {

    article.className = 'profile';
    article.innerHTML =
    `
    <div class="avatar">

        <img src="./asset/images/avatar.png" alt="avatar">
        <p>Trần Trọng Hiếu</p>

    </div>

    <ul>

        <li>

            <img src="./asset/images/icon-location.svg" alt="icon-location">
            <p id="address">Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh</p>

        </li>

        <li>

            <img src="./asset/images/icon-email.svg" alt="icon-email">
            <p id="email">hieutt03112003@gmail.com</p>

        </li>

        <li>

            <img src="./asset/images/icon-phone.svg" alt="icon-phone">
            <p id="phone">0825452467</p>

        </li>

        <li>

            <img src="./asset/images/icon-github.svg" alt="icon-github">
               
            <p>GitHub cá nhân</p>

        </li>

    </ul>

    <footer>

        <p>Liên hệ</p>

        <nav>

            <div>
       
                <i class="fa-brands fa-facebook-f"></i>
         
            </div>
         
            <div>
         
                <i class="fa-brands fa-twitter"></i>
         
            </div>
         
            <div>
         
                <i class="fa-brands fa-instagram"></i>
         
            </div>
       
        </nav>

    </footer>`;

    menu.close();
})

function parseMarkdown(fileName) {

    fetch(`./md/${fileName}.md`).then(res => res.text()).then(text => {

        article.innerHTML = marked.parse(text);
        
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

    }).finally(menu.close());
}

routie('/:fileName', fileName => {

    article.className = `${fileName}`;
    parseMarkdown(`${fileName.replace('-', '')}_report`);
})