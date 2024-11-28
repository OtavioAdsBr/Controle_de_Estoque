// Supondo que o histórico de operações seja armazenado em um array global
let operationHistoryData = [];

// Função para carregar o histórico de operações na página
function loadOperationHistory() {
    const operationHistory = JSON.parse(localStorage.getItem("operationHistory")) || []; // Recupera os dados ou cria um array vazio
    const historyBody = document.getElementById("operationHistory");

    operationHistory.forEach(operation => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${operation.employee}</td>
            <td>${operation.product}</td>
            <td>${operation.operation}</td>
            <td>${operation.quantity}</td>
            <td>${operation.date}</td>
            <td>${operation.destination}</td>
        `;
        historyBody.appendChild(row);
    });
    localStorage.setItem("operationHistory", JSON.stringify(operationHistory));
}

saveOperationHistoryToLocalStorage();
const operationHistory = [];// Inicializa o histórico de operações
const historyRows = document.querySelectorAll('#operationHistory tr');

historyRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const operationData = {
        employee: cells[0].textContent,
        product: cells[1].textContent,
        operation: cells[2].textContent,
        quantity: preseInt(cells[3].textContent),
        date: cells[4].textContent,
        destination: cells[5].textContent
    };
    operationHistory.push(operationData);
});

localStorage.setItem("operationHistory", JSON.stringify(operationHistory));
// Função para voltar para o índice principal
function goBack() {
    window.location.href = 'index.html';
}

// Carregar o histórico de operações assim que a página for carregada
window.onload = function () {
    loadStockFromLocalStorage();
    loadOperationHistoryFromLocalStorage();
    updateStockTable();
    updateCategoryFilter();
    showCategoryFilter();
}
