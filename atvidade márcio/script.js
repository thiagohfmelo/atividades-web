const olDespesas = document.getElementById("olDespesas");
const inputDescricao = document.getElementById("inputDescricao");
const inputValor = document.getElementById("inputValor");
const btAdicionar = document.getElementById("btAdicionar");
const totalDespesas = document.getElementById("totalDespesas");

const baseURL = "https://parseapi.back4app.com/classes/Despesa";
const headers = {
  "X-Parse-Application-Id": "4cRNaPFAu9tGO59OrBIJpH4v6qeHUUbtReuVmjP7",
  "X-Parse-REST-API-Key": "x3OZm4ZBkTNLy3jJUc9JImiuAi6XK4ih7zfKOVwk",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const createList = (data) => {
  olDespesas.innerHTML = "";
  let total = 0;
  const despesas = data.results;
  despesas.forEach((despesa) => {
    total += despesa.valor;
    const li = document.createElement("li");
    li.textContent = `${despesa.descricao}: R$ ${despesa.valor.toFixed(2)} `;
    
    const input = document.createElement("input");
    input.type = "number";
    input.value = despesa.valor;
    input.onchange = () => handleValorChange(input, despesa);
    li.appendChild(input);
    
    const bt = document.createElement("button");
    bt.innerHTML = "x";
    bt.onclick = () => handleBtRemoverClick(bt, despesa);
    li.appendChild(bt);
    
    olDespesas.appendChild(li);
  });
  
  totalDespesas.textContent = total.toFixed(2);
};

const handleValorChange = async (input, despesa) => {
  const novoValor = parseFloat(input.value);
  if (isNaN(novoValor) || novoValor < 0) {
    alert("Valor inválido!");
    input.value = despesa.valor;
    return;
  }

  try {
    input.disabled = true;
    const response = await fetch(`${baseURL}/${despesa.objectId}`, {
      method: "PUT",
      headers: headersJson,
      body: JSON.stringify({ valor: novoValor }),
    });
    input.disabled = false;
    if (!response.ok) {
      input.value = despesa.valor;
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    getDespesas();
  } catch (error) {
    console.log(error);
  }
};

const handleBtRemoverClick = async (bt, despesa) => {
  try {
    bt.disabled = true;
    const response = await fetch(`${baseURL}/${despesa.objectId}`, {
      method: "DELETE",
      headers: headers,
    });
    bt.disabled = false;
    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    getDespesas();
  } catch (error) {
    console.log(error);
  }
};

const getDespesas = async () => {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    const data = await response.json();
    createList(data);
  } catch (error) {
    console.log(error);
  }
};

const handleBtAdicionarClick = async () => {
  const descricao = inputDescricao.value.trim();
  const valor = parseFloat(inputValor.value);
  
  if (!descricao || isNaN(valor) || valor < 0) {
    alert("Necessário adicionar uma descrição e um valor válido!");
    inputDescricao.focus();
    return;
  }
  
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: headersJson,
      body: JSON.stringify({ descricao: descricao, valor: valor }),
    });
    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    inputDescricao.value = "";
    inputValor.value = "";
    inputDescricao.focus();
    getDespesas();
  } catch (error) {
    console.log(error);
  }
};

window.onload = getDespesas;
btAdicionar.onclick = handleBtAdicionarClick;
