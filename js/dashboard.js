if(localStorage.getItem("logado") !== "true"){
    window.location.href = "login.html";
}

async function carregarDashboard(){

    try{

        const resposta = await fetch(
            "http://192.168.0.246/datix.api/dashboard.php"
        );

        const dados = await resposta.json();

        document.getElementById("clientes").innerText =
            dados.totalClientes;

        document.getElementById("online").innerText =
            "-";

        document.getElementById("offline").innerText =
            "-";

        document.getElementById("ultimo").innerText =
            dados.ultimoCliente;

    }catch(erro){

        console.log(erro);

    }

}

carregarDashboard();

document.getElementById("logout")
.addEventListener("click", () => {

    localStorage.removeItem("logado");

    window.location.href = "login.html";

});