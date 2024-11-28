// Usuários e senhas (substitua por uma lógica de autenticação no servidor se necessário)
const users = {
    "admin": { password: "@lf@1019", role: "admin" },
    "user": { password: "AF@525456", role: "funcionario" },
    "operador": { password: "Alf@5253", role: "operador" }
};

// Controle de tentativas
let loginAttempts = 0;
let lockoutTime = 0;

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Verificar se está bloqueado
    if (lockoutTime > Date.now()) {
        const remainingTime = Math.ceil((lockoutTime - Date.now()) / 60000); // Converter para minutos
        errorMessage.style.display = "block";
        errorMessage.textContent = `Acesso bloqueado. Tente novamente em ${remainingTime} minuto(s).`;
        return;
    }

    // Verificar credenciais
    if (users[username] && users[username].password === password) {
        // Resetar tentativas em caso de sucesso
        loginAttempts = 0;
        lockoutTime = 0;

        // Redirecionar com base no papel do usuário
        if (users[username].role === "admin") {
            window.location.href = "./index.html"; // Admin
        } else {
            window.location.href = "./index.html"; // Usuário normal
        }
    } else {
        loginAttempts++;
        errorMessage.style.display = "block";
        errorMessage.textContent = "Usuário ou senha incorretos.";

        // Bloquear após 3 tentativas falhas
        if (loginAttempts >= 3) {
            lockoutTime = Date.now() + 10 * 60 * 1000; // Bloqueio de 10 minutos
            errorMessage.textContent = "Muitas tentativas falhas. Acesso bloqueado por 10 minutos.";
        }
    }
});
