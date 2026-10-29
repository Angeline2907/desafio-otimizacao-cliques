let controller anterior = null;

async function realizarLeituraComCancelamento() {
    // 2. Se já existe uma leitura em andamento, cancela ela
    if (controllerAnterior) {
        controllerAnterior.abort();
    }

    // Cria um novo controlador para a leitura atual
    controllerAnterior = new AbortController();
    const { signal } = controllerAnterior;

    try {
        const resposta = await fetch('SUA_API_AQUI', { signal });
        const dados = await resposta.json();
        
        renderizarDados(dados);
    } catch (erro) {
        if (erro.name === 'AbortError') {
            console.log("Leitura anterior cancelada com sucesso!");
        } else {
            console.error("Outro erro ocorreu:", erro);
        }
    }
}
