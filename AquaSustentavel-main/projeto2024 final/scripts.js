
document.addEventListener('DOMContentLoaded', function () {
    const cookieUsuariosJson = document.cookie.match(/usuarios=\[.*\]/)?.[0].match(/\[.*\]/)[0];
    const usuarios = cookieUsuariosJson&&JSON.parse(cookieUsuariosJson);
    const usuarioLogado = usuarios?usuarios.find(usuario => usuario.logado):undefined;
    const menuUsuario = document.querySelector('.menu-user');

    // Adicionando alguns elementos de ancora funcionais apenas se exitir um usuário logado 
    if (usuarioLogado) {
        const menuUserDeslogado = menuUsuario.innerHTML;
        menuUsuario.innerHTML = `
            <a href="perfil.html">
                <li>Perfil</li>
            </a>
            ${menuUsuario.innerHTML}
            <div id="menu-line"></div>
            <a>
                <li>Sair</li>
            </a>
        `
        const ancoraSair = new Array(...document.querySelectorAll('a')).find(node => {
            return node.querySelector('li')?.innerText == 'Sair'
        })

        // Adicionando o escutador de click para deslogar o usuário logado
        ancoraSair.addEventListener('click', function () {
            usuarios.forEach(usuario => usuario.logado = false);
            document.cookie = `usuarios=${JSON.stringify(usuarios)};expires=${new Date(2050, 1, 1)};path=/;`
            menuUsuario.innerHTML = menuUserDeslogado;
        })
    }
})

/* Sistema para esconder o menu quando um evento de click
for disparado em qualquer elemento filho do body */
document.querySelector('body').addEventListener('click', function (evt) {
    if (evt.target.id == 'icon-menu') {
        return;
    }
    document.querySelector('.menu-user').classList.remove('show');
})

/* Escutador de evento para alternar entre mostrar e esconder menu */
document.querySelector('#icon-menu').addEventListener('click', function () {
    document.querySelector('.menu-user').classList.toggle('show');
})

document.querySelector('#quizzes').addEventListener('click', function () {
    const cookieUsuariosJson = document.cookie.match(/usuarios=\[.*\]/)?.[0].match(/\[.*\]/)[0];
    const usuarios = cookieUsuariosJson&&JSON.parse(cookieUsuariosJson);
    const usuarioLogado = usuarios?usuarios.find(usuario => usuario.logado):undefined;
    
    if (usuarioLogado) {
        window.location.href = 'quizz.html';
    } else {
        window.location.href = 'cadastro.html';
    }
})
