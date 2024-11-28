// Base inicial do estoque
let stock = {
    "Armanezamento": {
        "HD 500 gb (Dvr)": 10,
        "HD 1 tb (Dvr)": 10,
        "HD 2 tb (Dvr)": 10,
    },
"Cabos": {
        "Cabo Coaxial (Câmera)": 10,
        "Cabo Coaxial Blindado (Câmera)": 10,
        "Cabo de Alarme (Alarme)": 10,
        "Cabo de Rede 5e": 10,
        "Cabo de Rede Cat6": 10,
        "Cabo de Rede Outros": 10,
    },
    "Câmeras": {
        "Câmara Analogica Intelbras": 10,
        "Câmara Analogica Hikvison": 10,
        "Câmera Analogica Hilook": 10,
        "Câmera Analogica MultiTech": 10,
        "Câmera Ip Intelbras": 10,
        "Câmera Ip Hikvison": 10,
        "Caixinha de Câmera": 10,
    },
    "Central e Periféricos": {
        "Central de Alarme Intelbras": 10,
        "Central de Alarme JFL": 10,
        "Sensor de alarme intelbras": 10,
        "sensor de alarme sem fio intelbras": 10,
        "Teclado de Central Intelbras": 10,
        "Teclado de Central JFL": 10,
        "Bateria de Central ": 10,
        "Baterias Controle e Sensor": 10,
    },
    "Conectores": {
        "Conector BNC(Câmera)": 20,
        "Conector P4 (Câmera)": 20,
        "Conector RJ (Cabo de Rede)": 20,
        "Conector Balun (Câmera)": 20,
    },
"Dvr": {
        "Dvr 4 Canais Hikvison": 10,
        "Dvr 8 Canais Hikvison": 10,
        "Dvr 16 Canais Hikvison": 10,
        "Dvr 4 Canais Intelbras": 10,
        "Dvr 8 Canais Intelbras": 10,
        "Dvr 16 Canais Intelbras": 10,
        "Dvr 4 Canais Hilook": 10,
        "Dvr 8 Canais Hilook": 10,
        "Dvr 16 Canais Hilook": 10,
    },
    "Fontes de Alimentação": {
        "Fonte Comeia de 5a (Câmera)": 10,
        "Fonte Comeia de 10a (Câmera)": 10,
        "Fonte Intelbras": 10,
        "Fonte de Dvr 12v Intelbras (Dvr)": 10,
        "Fonte de Dvr 12v Paralela (Dvr)": 10,
    },
    "Parafuso e Bucha": {
        "Parafuso Philips nº8": 10,
        "Parafuso Philips nº6": 10,
        "Bucha nº8": 10,
        "Bicha nº6": 10,
        "Parafuso Auto Brocante": 10,
    },
    "Outros": {
        "Fita Isolante": 10,
        "Rack Caixa Organziadora (Dvr)": 10,
    }
};

// Função para mostrar o filtro de categorias somente quando o usuário clicar
function showCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.style.display = 'block'; // Exibe o filtro quando o usuário começa a interagir
    updateCategoryFilter(); // Atualiza as categorias
}

// Função para atualizar o dropdown de categorias no filtro
function updateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = `<option value="">Selecione uma categoria</option>`; // Reseta o filtro

    Object.keys(stock).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Função para filtrar o estoque com base na categoria selecionada
function filterStockByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const tableBody = document.getElementById('stockTable');
    tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar

    if (category === "") return;

    Object.keys(stock[category]).forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product}</td>
            <td>${category}</td>
            <td>${stock[category][product]}</td>
        `;
        tableBody.appendChild(row);
        });
    }

// Atualiza a tabela de estoque, organizando por categoria
function updateStockTable() {
    const tableBody = document.getElementById('stockTable');
    tableBody.innerHTML = '';

    Object.keys(stock).forEach(category => {
        const categoryRow = document.createElement('tr');
        categoryRow.innerHTML = `<td colspan="3"><strong>${category}</strong></td>`;
        categoryRow.style.backgroundColor = '#f2f2f2';
        tableBody.appendChild(categoryRow);

        Object.keys(stock[category]).forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product}</td>
                <td>${category}</td>
                <td>${stock[category][product]}</td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Atualiza o histórico de operações
function updateOperationHistory(employee, product, operation, quantity, date, destination) {
    const historyBody = document.getElementById('operationHistory');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${employee}</td>
        <td>${product}</td>
        <td>${operation}</td>
        <td>${quantity}</td>
        <td>${date}</td>
        <td>${destination}</td>
    `;

    historyBody.appendChild(row);
}

// Processa as operações de entrada, saída, compra e devolução
function processOperation() {
    const itemName = document.getElementById('itemName').value.trim();
    const category = document.getElementById('category').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const operation = document.getElementById('operation').value;
    const employeeName = document.getElementById('employeeName').value.trim();
    const operationDate = document.getElementById('operationDate').value;
    const destinationType = document.getElementById('destinationType').value;
    const destinationName = document.getElementById('destinationName').value.trim();
    const destination = `${destinationType} - ${destinationName}`;

    if (!itemName || !category || isNaN(quantity) || quantity <= 0 || !employeeName || !operationDate || !destinationName) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    if (!stock[category]) stock[category] = {};
    if (!stock[category][itemName]) stock[category][itemName] = 0;

    switch (operation.toLowerCase()) {
        case 'entrada':
        case 'compra':
        case 'devolucao':
            stock[category][itemName] += quantity;
            break;
        case 'saida':
            if (stock[category][itemName] < quantity) {
                alert('Quantidade insuficiente no estoque.');
                return;
            }
            stock[category][itemName] -= quantity;
            break;
        default:
            alert('Operação inválida.');
            return;
    }

    updateStockTable();
    updateOperationHistory(employeeName, itemName, operation, quantity, operationDate, destination);
    alert('Operação realizada com sucesso!');

    document.getElementById('itemName').value = '';
    document.getElementById('category').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('employeeName').value = '';
    document.getElementById('operationDate').value = '';
    document.getElementById('destinationName').value = '';
}

    function saveStockToLocalStorage() {
        localStorage.setItem('stock', JSON.stringify(stock));
}
    function loadStockFromLocalStorage() {
        const storedStock = localStorage.getItem('stock');
        if (storedStock) stock = JSON.parse(storedStock);
}
// Inicializa a exibição da tabela e o filtro de categorias
window.onload = function () {
    loadStockFromLocalStorage();
    updateStockTable();
    updateCategoryFilter(); // Carrega o filtro de categorias
    showCategoryFilter(); // Exibe o filtro de categorias na tela
};
