export default function ({ $auth }) {
    $auth.$storage.watchState('loggedIn', (loggedIn) => {

      if (loggedIn) {
        const token = $auth.strategy.token.get(); // Obtém o token atual
        const expiresInMinutes = $auth.$state.user?.expira_em || 60; // Pega o tempo de expiração da API, ou 60 min por padrão
        
        const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos
        const expirationTime = now + expiresInMinutes * 60; // Convertendo minutos para segundos
  
        localStorage.setItem('token_expiration', expirationTime);
      }
    });
  }
  