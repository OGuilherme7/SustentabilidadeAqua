const spanErros = document.querySelector('#erros');

document.querySelector("#btn-cadastro").addEventListener('click', function (evt) {
    evt.preventDefault()

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email');
    const senha = document.querySelector('#senha');
    const regexEmail = /^[a-zA-Z\d]+@[a-z]+\.[a-z]+$/;
    const regexCookieUsuarios = /usuarios=\[.*\]/;

    //Inicializando o cookie com um array vazio
    if (!document.cookie.match(regexCookieUsuarios)) {
        document.cookie = `usuarios=${JSON.stringify([])};expires=${new Date(2050, 1, 1)};path=/;`;
    }

    if (regexEmail.test(email.value) && validarSenha(senha.value)) {
        spanErros.innerText = '';
        spanErros.classList.remove('erros');
        
        const usuarios = JSON.parse(document.cookie.match(regexCookieUsuarios)[0].match(/\[.*\]/)[0]);
        if (usuarios.find(usuario => usuario.email == email.value)) {
            spanErros.innerText = 'Email já existente'
            spanErros.classList.add('erros');
        } else {
            //Deslogando todos usuarios
            usuarios.forEach(usuario => {
                usuario.logado = false;
            })

            usuarios.push({nome, email: email.value, senha: senha.value, logado: true});
            document.cookie = `usuarios=${JSON.stringify(usuarios)};expires=${new Date(2050, 1, 1)};path=/;`
            window.location.href = 'index.html';
        }
    } else if (!regexEmail.test(email.value)) {
        spanErros.innerText = 'Email Inválido';
        spanErros.classList.add('erros');
    } else {
        spanErros.innerText = 'Senha Inválida';
        spanErros.classList.add('erros');
    }
})

function validarSenha (senha) {
    const quantidadeCorreta = senha.length >= 8 && senha.length <= 14;
    const possuiCaracterMaiusculo = /[A-Z]/.test(senha);
    const possuiCaracterMinusculo = /[a-z]/.test(senha);
    const possuiNumero = /\d/.test(senha);

    return quantidadeCorreta&&possuiCaracterMaiusculo&&possuiCaracterMinusculo&&possuiNumero;
}
