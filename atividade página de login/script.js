// Elementos da página
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const inputEmail = document.getElementById("inputEmail");
const btSignUp = document.getElementById("btSignUp");
const btLogin = document.getElementById("btLogin");
const btLogout = document.getElementById("btLogout");
const h1IndexTitle = document.getElementById("h1IndexTitle");

const baseURL = "https://parseapi.back4app.com";
const usersURL = `${baseURL}/users`;
const loginURL = `${baseURL}/login`;
const logoutURL = `${baseURL}/logout`;

const headers = {
  "X-Parse-Application-Id": "IjMQNnxBbsuYKEsnvNuQhwiEw9pkLJkwWfhB9aG1",
  "X-Parse-REST-API-Key": "ip0a7zYuKwJNXicmLC5TkLN6DGWVbLhRtIYDjU6R",
};

const headersRevSession = {
  ...headers,
  "X-Parse-Revocable-Session": "1",
};

const headersJson = {
  ...headersRevSession,
  "Content-Type": "application/json",
};

// Função para verificar a validade do token de sessão
const validateSession = async () => {
  const userJson = localStorage.user;
  if (userJson) {
    const user = JSON.parse(userJson);
    const response = await fetch(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
    });

    if (!response.ok) {
      alert("Sessão expirada. Você será redirecionado para o login.");
      localStorage.removeItem('user');
      location.replace('/login.html');
    }
  }
};

// Função para exibir informações do usuário no título da página
const updateUserDisplay = () => {
  const userJson = localStorage.user;
  if (userJson) {
    const user = JSON.parse(userJson);
    h1IndexTitle.innerHTML = ` User (${user.username})`;
    if (btLogout) {
      btLogout.disabled = false;
    }
  }
};

// Função para lidar com o clique do botão de inscrição
const handleBtSignUpClick = async () => {
  const username = inputUsername.value.trim();
  if (!username) {
    alert("Preencha o nome do usuário!");
    inputUsername.focus();
    return;
  }

  const password = inputPassword.value.trim();
  if (!password) {
    alert("Preencha a senha!");
    inputPassword.focus();
    return;
  }

  const email = inputEmail.value.trim();
  if (!email) {
    alert("Preencha o e-mail!");
    inputEmail.focus();
    return;
  }

  const response = await fetch(usersURL, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({ username, password, email }),
  });

  const data = await response.json();
  if (response.ok) {
    alert("Usuário registrado com sucesso!");
    location.replace('/login.html');
  } else {
    alert(`Erro: ${data.error}`);
  }
};

// Função para lidar com o clique do botão de login
const handleBtLoginClick = async () => {
  const username = inputUsername.value.trim();
  if (!username) {
    alert("Preencha o nome do usuário!");
    inputUsername.focus();
    return;
  }

  const password = inputPassword.value.trim();
  if (!password) {
    alert("Preencha a senha!");
    inputPassword.focus();
    return;
  }

  const response = await fetch(loginURL, {
    method: "POST",
    headers: headersRevSession,
    body: new URLSearchParams({
      username,
      password,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    alert(`Erro: ${data.error}`);
    return;
  }

  // Salva os dados do usuário no localStorage
  localStorage.user = JSON.stringify(data);

  // Redireciona para a página desejada ou para a página anterior
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.has("url")) {
    location.replace(searchParams.get("url"));
  } else {
    history.back();
  }
};

// Função para lidar com o clique do botão de logout
const handleBtLogoutClick = async () => {
  const userJson = localStorage.user;
  if (userJson) {
    const user = JSON.parse(userJson);
    const response = await fetch(logoutURL, {
      method: "POST",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      alert(`Erro: ${data.error}`);
      return;
    }

    // Remove o usuário do localStorage e redireciona para o login
    delete localStorage.user;
    alert("Você foi desconectado.");
    location.replace("/login.html");
  }
};

// Configuração dos eventos dos botões
if (btSignUp) {
  btSignUp.onclick = handleBtSignUpClick;
}

if (btLogin) {
  btLogin.onclick = handleBtLoginClick;
}

if (btLogout) {
  btLogout.onclick = handleBtLogoutClick;
}

// Verifica a sessão do usuário e exibe o nome de usuário no título ao carregar a página
window.onload = async () => {
  await validateSession();
  updateUserDisplay();
};
