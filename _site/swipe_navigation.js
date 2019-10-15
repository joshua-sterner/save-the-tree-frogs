function setPageIndicator(indicator_class) {
    let indicator = document.getElementById("page-indicator");
    indicator.className = indicator_class;
}

function switchPage(url, indicator_class) {
    setPageIndicator(indicator_class);
    document.getElementById('content').innerHTML = loaded_pages[url];
}

var loaded_pages = {};

function loadPageContent(page, done) {
    let url = page.querySelector('div a').href;
    if (document.URL != url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'document';
        xhr.onload = function() {
            let content = xhr.response.getElementById('content');
            loaded_pages[url] = content.innerHTML;
            done();
        };
        xhr.send();
    } else {
        let content = document.getElementById('content');
        loaded_pages[url] = content.innerHTML;
        done();
    }
}

function loadPages(pages, done) {
    pages.forEach((page) => {
        loadPageContent(page, done);
    });
}

function setupPageSwitching() {
    let pages = document.querySelectorAll('nav ul li');
    
    let pagesLoaded = 0;
    loadPages(pages, () => {
        pagesLoaded++;
        if (pagesLoaded == pages.length) {
            finalizePageSwitching(pages);
        }
    });
}

function finalizePageSwitching(pages) {
    pages.forEach(function(page) {
        let indicator_class = page.className;
        let link = page.querySelector('div a');
        let url = link.href;
        link.addEventListener('click', () => {
            switchPage(url, indicator_class);
        });
        link.href='javascript:';
    });
}

setupPageSwitching();
