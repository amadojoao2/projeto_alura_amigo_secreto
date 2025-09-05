//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Nome: João Paulo Borges

// 1) Array para armazenar os nomes
const amigos = [];

// 2) Função para atualizar a lista na página
function atualizarLista() {
  const lista = document.getElementById('listaAmigos');
  if (!lista) return;

  // Limpar a lista antes de adicionar novamente (evita duplicados visuais)
  lista.innerHTML = "";

  // Percorrer o array com for e criar <li> para cada nome
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement('li');
    li.textContent = amigos[i]; // textContent evita injeção de HTML
    lista.appendChild(li);
  }
}

// 3) Função para adicionar amigos (captura, valida, push e limpa input)
function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const resultado = document.getElementById('resultado');
  if (!input) return;

  const nome = (input.value || "").trim();

  // Validar entrada vazia com a mensagem solicitada
  if (!nome) {
    alert("Por favor, insira um nome.");
    input.focus();
    return;
  }

  // Adicionar ao array
  amigos.push(nome);

  // Atualizar a lista visível
  atualizarLista();

  // Limpar o campo e manter o foco
  input.value = "";
  input.focus();

  // Limpar eventual resultado anterior
  if (resultado) resultado.innerHTML = "";
}

// 4) Função para sortear aleatoriamente um nome do array
function sortearAmigo() {
  const resultado = document.getElementById('resultado');

  // Validação: mínimo de 2 nomes (meu requisito)
  if (amigos.length < 2) {
    alert('Adicione pelo menos dois nomes antes de sortear.');
    return;
  }

  // Índice aleatório com Math.random() e Math.floor()
  const indice = Math.floor(Math.random() * amigos.length);
  const sorteado = amigos[indice];

  // Exibir o resultado na página
  if (resultado) {
    resultado.innerHTML = `<li>🎉 O amigo secreto é: <strong>${escapeHtml(sorteado)}</strong></li>`;
  }
}

// Suporte: adicionar com Enter
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('amigo');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        adicionarAmigo();
      }
    });
  }
});

// Utilitário simples para escapar HTML quando for inserir como string
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Expor funções para o HTML (onclick)
window.adicionarAmigo = adicionarAmigo;
window.sortearAmigo = sortearAmigo;