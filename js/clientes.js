let todosClientes = [];

// Verifica login
if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
}

// Gera uma linha da tabela
function gerarLinha(cliente) {

    return `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.email}</td>
            <td>${cliente.fone}</td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarCliente(${cliente.id})">
                    ✏️
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirCliente(${cliente.id})">
                    🗑️
                </button>

            </td>
        </tr>
    `;
}

// Carrega clientes
async function carregarClientes() {

    try {

        const resposta = await fetch(
            "http://192.168.0.246/datix.api/listar_clientes.php"
        );

        const clientes = await resposta.json();

        todosClientes = clientes;

        const tabela = document.getElementById("listaClientes");

        tabela.innerHTML = "";

        clientes.forEach(cliente => {

            tabela.innerHTML += gerarLinha(cliente);

        });

        document.getElementById("totalClientes").innerText =
            `Total: ${clientes.length}`;

    } catch (erro) {

        console.error("Erro ao carregar clientes:", erro);

    }

}

// Pesquisa em tempo real
function filtrarClientes() {

    const termo = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const tabela = document.getElementById("listaClientes");

    tabela.innerHTML = "";

    const filtrados = todosClientes.filter(cliente =>

        cliente.nome.toLowerCase().includes(termo) ||
        cliente.email.toLowerCase().includes(termo) ||
        cliente.cpf.includes(termo)

    );

    filtrados.forEach(cliente => {

        tabela.innerHTML += gerarLinha(cliente);

    });

}

// Editar cliente
function editarCliente(id) {

    alert("Editar cliente ID: " + id);

}

// Excluir cliente
async function excluirCliente(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const formData = new FormData();
        formData.append("id", id);

        const resposta = await fetch(
            "http://192.168.0.246/datix.api/excluir_clientes.php",
            {
                method: "POST",
                body: formData
            }
        );

        const resultado = await resposta.json();

        if (resultado.success) {

            alert("Cliente excluído com sucesso!");

            carregarClientes();

        } else {

            alert(resultado.message);

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao conectar ao servidor.");

    }

}

// Logout
const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", () => {

        localStorage.removeItem("logado");

        window.location.href = "login.html";

    });

}

// Inicia carregamento
carregarClientes();