async function acessarRotaProtegida() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("Token não encontrado. Faça login novamente.");
    alert("Token não encontrado. Faça login novamente.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/protegida", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar o token no cabeçalho
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Acesso autorizado", data);
      alert("Acesso autorizado. Dados recebidos: " + JSON.stringify(data));
    } else {
      const errorData = await response.json();
      console.error("Erro ao acessar a rota protegida", errorData.message);
      alert("Erro ao acessar a rota protegida: " + errorData.message);
    }
  } catch (error) {
    console.error("Erro ao tentar acessar a rota protegida", error);
    alert("Erro ao tentar acessar a rota protegida.");
  }
}

// Adiciona um evento de clique ao botão
document
  .getElementById("acessar-rota")
  .addEventListener("click", acessarRotaProtegida);
