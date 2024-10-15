document.addEventListener('DOMContentLoaded', function () {
    const usuarios = JSON.parse(document.cookie.match(/usuarios=\[.*\]/)?.[0].match(/\[.*\]/)[0]);
    const usuarioLogado = usuarios.find(usuario => usuario.logado);

    const ancoraSair = new Array(...document.querySelectorAll('a')).find(node => {
        return node.querySelector('li')?.innerText == 'Sair'
    })

    // Adicionando o escutador de click para deslogar o usuário logado
    ancoraSair.addEventListener('click', function () {
        usuarios.forEach(usuario => usuario.logado = false);
        document.cookie = `usuarios=${JSON.stringify(usuarios)};expires=${new Date(2050, 1, 1)};path=/;`
        window.location.href = 'index.html';
    })

    const inputNome = document.querySelector('#username');
    const inputSenha = document.querySelector('#password');

    inputNome.value = usuarioLogado.nome;
    inputSenha.value = usuarioLogado.senha;
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



function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleText = document.querySelector('.toggle-password');
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleText.textContent = "Esconder";
    } else {
        passwordInput.type = "password";
        toggleText.textContent = "Mostrar";
    }
}

const botoes = [...document.querySelectorAll('button')].slice(0, 2);

botoes.forEach(node => {
    node.addEventListener('click', function (evt) {
        const usuarios = JSON.parse(document.cookie.match(/usuarios=\[.*\]/)?.[0].match(/\[.*\]/)[0]);
        const usuarioLogado = usuarios.find(usuario => usuario.logado);
        const spanErros = document.querySelector('.erros');
        const novoNome = document.querySelector('#username').value;
        const novaSenha = document.querySelector('#password').value;
        const botao = evt.target;
        const tipoBotao = botao.dataset.input;


        if (tipoBotao === 'nome') {
            if (usuarioLogado.nome === novoNome) {
                spanErros.innerText = 'O novo nome não pode ser igual ao nome atual';
            } else {
                if (novoNome.length < 4) {
                    spanErros.innerText = 'O nome precisa ter no mínimo 4 caracteres';
                } else if (novoNome.length > 16) {
                    spanErros.innerText = 'O nome não pode ter mais de 16 caracteres';
                } else {
                    spanErros.innerText = '';
                    usuarioLogado.nome = novoNome;
                    setarUsuariosNoBanco(usuarios);
                    mudarClasseBotao(botao);
                }
            }
        } else {
            if (validarSenha(novaSenha)) {
                if (usuarioLogado.senha == novaSenha) {
                    spanErros.innerText = 'A nova senha não pode ser igual a senha atual'
                } else {
                    spanErros.innerText = '';
                    usuarioLogado.senha = novaSenha;
                    setarUsuariosNoBanco(usuarios);
                    mudarClasseBotao(botao)
                }
            } else {
                spanErros.innerText = 'Senha Incorreta';
            }
        }
    })
})

function mudarClasseBotao (botao) {
    botao.classList.add('sucesso');
    setTimeout(function () {
        botao.classList.remove('sucesso');
    }, 1000);
}

function setarUsuariosNoBanco (usuarios) {
    document.cookie = `usuarios=${JSON.stringify(usuarios)};expires=${new Date(2050, 1, 1)};path=/;`;
}

function validarSenha (senha) {
    const quantidadeCorreta = senha.length >= 8 && senha.length <= 14;
    const possuiCaracterMaiusculo = /[A-Z]/.test(senha);
    const possuiCaracterMinusculo = /[a-z]/.test(senha);
    const possuiNumero = /\d/.test(senha);

    return quantidadeCorreta&&possuiCaracterMaiusculo&&possuiCaracterMinusculo&&possuiNumero;
}

document.querySelector('#profile-image').addEventListener('change', function (evt) {
    const imagem = evt.target.files;
    console.log(imagem);
})