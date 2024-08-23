// const reports = document.querySelectorAll("main .reports a[href*='week']");
      
// reports.forEach(report => {

//     report.addEventListener('click', () => {

//         const hashPos = report.href.indexOf('#');
//         const fileName = report.href.slice(hashPos + 1);

//         fetch(`./${fileName.replace('-', '')}_report.md`)
//             .then(res => res.text())
//             .then(res => {

//                 document.querySelector(`main .sections section[id=${fileName}]`).innerHTML = marked.parse(res);
//             })
//     })
// })

const btnOpenMenu = document.getElementById('icon-menu');
const btnCloseMenu = document.getElementById('icon-menu-close');
const menu = document.querySelector('main > header dialog');

btnOpenMenu.addEventListener('click', () => {

    menu.showModal();
})

btnCloseMenu.addEventListener('click', () => {

    menu.close();
})

const article = document.querySelector('article');
routie('', () => {

    article.className = 'profile';
    article.innerHTML =
    `
    <div class="avatar">

        <img src="./asset/images/avatar.png" alt="avatar">
        <p>Trần Trọng Hiếu</p>

    </div>

    <ul>

        <li>

            <img src="./asset/images/icon-location-32.png" alt="icon-location">
            <p id="address">Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh</p>

        </li>

        <li>

            <img src="./asset/images/icon-email-32.png" alt="icon-email">
            <p id="email">hieutt03112003@gmail.com</p>

        </li>

        <li>

            <img src="./asset/images/icon-phone-32.png" alt="icon-phone">
            <p id="phone">0825452467</p>

        </li>

        <li>

            <img src="./asset/images/icon-github-32.png" alt="icon-github">
               
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
})

function parseMarkdown(fileName) {

    fetch(`./md/${fileName}.md`).then(res => res.text()).then(text => {

        article.innerHTML = marked.parse(text);
    })
}

routie('/:fileName', fileName => {

    article.className = `${fileName}`;
    parseMarkdown(`${fileName.replace('-', '')}_report`);
    menu.close();
})