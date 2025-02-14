
const apiUrl = 'http://localhost:3000/locais';

// Função que lista os locais inseridos no arquivo locais.json
async function listarLocais() {
    const response = await fetch(apiUrl);
    const locais = await response.json();
    
    const locaisList = document.getElementById('locais-list');
    locaisList.innerHTML = '';

    locais.forEach(local => {
        const localCard = document.createElement('div');
        localCard.className = 'col-md-4';
        
        localCard.innerHTML = `
            <div class="card mb-3 shadow-sm" style="height: 35rem;">
                <img src="${local.foto}" class="card-img-top" alt="${local.titulo} width="100" height="225">
                <div class="card-body">
                    <h5 class="card-title">${local.titulo}</h5>
                    <p class="card-text">${local.descricao}</p>

                    <button class="btn btn-success" onclick="editarLocal('${local.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="excluirLocal('${local.id}')">Excluir</button>
                </div>
                
            </div>
        `;

        locaisList.appendChild(localCard);
    });
}

// Função que adiciona um novo local
async function adicionarLocal(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const foto = document.getElementById('foto').value;

    const novoLocal = {
        id: Date.now().toString(),
        titulo,
        descricao,
        foto
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoLocal)
    });

    listarLocais();
    document.getElementById('add-local-form').reset();
}

// Função para editar um local
async function editarLocal(id) {
    const titulo = prompt('Novo título:');
    const descricao = prompt('Nova descrição:');
    const foto = prompt('Novo link da foto:');

    await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, descricao, foto })
    });

    listarLocais();
}

// Função para excluir um local
async function excluirLocal(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    listarLocais();
}

document.getElementById('add-local-form').addEventListener('submit', adicionarLocal);
listarLocais();
