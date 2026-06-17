async function fazerLogin() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const mensagem = document.getElementById("mensagem");

    try {

        const formData = new FormData();
        formData.append("email", email);
        formData.append("senha", senha);

        const resposta = await fetch(
            "https://192.168.0.246/datix.api/login.php",
            {
                method: "POST",
                body: formData
            }
        );

        const resultado = await resposta.text();

        if (resultado.trim() === "sucesso") {

            localStorage.setItem("logado", "true");
            localStorage.setItem("email", email);

            window.location.href = "dashboard.html";

        } else if (resultado.trim() === "senha_incorreta") {

            mensagem.innerText = "Senha incorreta.";

        } else if (resultado.trim() === "email_nao_encontrado") {

            mensagem.innerText = "E-mail não encontrado.";

        } else if (resultado.trim() === "campos_vazios") {

            mensagem.innerText = "Preencha todos os campos.";

        } else {

            mensagem.innerText = "Erro inesperado.";
        }

    } catch (erro) {

        mensagem.innerText = "Erro de conexão com o servidor.";
        console.error(erro);

    }
}