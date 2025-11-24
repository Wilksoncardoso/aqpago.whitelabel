export default function ({ $axios, redirect, app, $auth }, inject) {
  let toastCooldown = false;

  // $axios.onRequest((config) => {
  //     if (process.client) {
  //         const location = localStorage.getItem('location_token') ; // 'local' ou 'workspace'
  //         const tokenKey = `auth._token.${location}`;
  //         const token = localStorage.getItem(tokenKey);

  //         if (token) {
  //             config.headers.common['Authorization'] = token; // o token já vem com 'Bearer '
  //         }
  //     }

  //     return config;
  // });


  $axios.onRequest((config) => {

    if (process.client && config.url.includes('token=main')) {
      const token = localStorage.getItem("auth._token.local");
      // 2. Limpa o header antes de adicionar
      delete config.headers.common.Authorization;
      delete config.headers.Authorization;

      if (token) {
        config.headers.common.Authorization = token;
        config.headers.Authorization = token; // Dupla garantia
      }
    }
    else if (process.client) {
      // 1. Crie um mecanismo à prova de falhas para ler o localStorage
      const getAuthToken = () => {
        try {
          // Força sincronização entre abas
          const event = new Event('storageSync');
          window.dispatchEvent(event);

          // Obtém a estratégia atual
          const location = localStorage.getItem('location_token') || 'local';
          const tokenKey = `auth._token.${location}`;

          // Limpa qualquer cache do Chrome
          const token = localStorage.getItem(tokenKey);
          if (!token) {
            localStorage.removeItem(tokenKey);
          }

          return token;
        } catch (error) {
          console.error('Error reading auth token:', error);
          return null;
        }
      };

      // 2. Limpa o header antes de adicionar
      delete config.headers.common.Authorization;
      delete config.headers.Authorization;

      // 3. Adiciona o novo token
      const token = getAuthToken();
      if (token) {
        config.headers.common.Authorization = token;
        config.headers.Authorization = token; // Dupla garantia
      }
    }
    return config;
  });

  app.$errorHandler = (error) => {
    const message = error.response?.data?.message ||
      error.response?.data?.mensagem ||
      error.response?.data?.error ||
      "Aconteceu um erro inesperado. Por favor, tente novamente mais tarde.";

    if (!toastCooldown) {
      app.$toast.error(message, {
        position: 'bottom-center',
      });
      toastCooldown = true;

      setTimeout(() => {
        toastCooldown = false;
      }, 3000);
    }
  };

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      app.$errorHandler(error);
      localStorage.removeItem('auth._token.local');
      localStorage.removeItem('auth._token.workspace');

      localStorage.removeItem('auth._token_expiration.local');
      localStorage.removeItem('auth._token_expiration.workspace');

      localStorage.removeItem('location_token');

      redirect("/login");
    }
    if(code === 500){
      app.$errorHandler('Aconteceu um erro inesperado. Por favor, tente novamente mais tarde.');
    }
  });
}
