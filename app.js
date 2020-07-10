const wrap = document.createElement('div')
wrap.classList.add('wrap')
document.body.appendChild(wrap)

const content = document.createElement('div')

async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function changePage(pathname) {
    content.innerHTML = await fetchHtmlAsText(((pathname === '' || pathname === '/') ? 'main' : pathname) + '.html')
}

async function loadHome(pathname) {
    const footer = document.createElement('footer')
    footer.innerHTML = await fetchHtmlAsText('footer.html')
    document.body.appendChild(footer)

    const nav = document.createElement('nav')
    const cs = ['navbar', 'navbar-expand-lg', 'navbar-light']
    cs.forEach(c => nav.classList.add(c))
    nav.innerHTML = await fetchHtmlAsText('nav.html')
    wrap.appendChild(nav)
    wrap.appendChild(content)

    await changePage(pathname)
}

const tokens = location.pathname.split('/')

loadHome(tokens[tokens.length - 1])

const onNavigate = async (pathname) => {
    history.pushState(
        {},
        pathname,
        pathname
    )

    await changePage(pathname)
}

onpopstate = () => {
    console.log('state poped')
}