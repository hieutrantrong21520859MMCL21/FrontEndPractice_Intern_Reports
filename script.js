const reports = document.querySelectorAll("main .reports a[href*='week']");
      
reports.forEach(report => {

    report.addEventListener('click', () => {

        const hashPos = report.href.indexOf('#');
        const fileName = report.href.slice(hashPos + 1);

        fetch(`./${fileName.replace('-', '')}_report.md`)
            .then(res => res.text())
            .then(res => {

                document.querySelector(`main .sections section[id=${fileName}]`).innerHTML = marked.parse(res);
            })
    })
})