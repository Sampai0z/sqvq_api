document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Previne o envio do formulário

  // Captura os valores dos campos
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Exibe os valores no console (para fins de teste)
  console.log("E-mail:", email);
  console.log("Senha:", password);

  // Realiza a requisição GET com os dados passados na URL
  try {
    const response = await fetch(
      `http://localhost:3000/api/clientes/login?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET", // Método GET
        headers: {
          "Content-Type": "application/json", // Não é necessário enviar body, mas é bom manter
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const token = data.token;
      localStorage.setItem("authToken", token);

      // Redireciona para a página concluída
      console.log("Login bem-sucedido:", data);
      window.location.href = "concluido.html";
    } else {
      const error = await response.json();
      console.error("Erro no login:", error);
      alert("Erro ao fazer login, tente novamente!");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao tentar conectar com o servidor!");
  }
});



