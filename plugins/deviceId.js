export default ({ app }, inject) => {
    // Função para verificar se o script foi carregado
    const waitForScript = () => {
      return new Promise((resolve, reject) => {
        const checkScript = () => {
          if (typeof getSessionID !== 'undefined') {
            resolve();
          } else {
            setTimeout(checkScript, 50); // Verifica a cada 50ms
          }
        };
        checkScript();
      });
    };
  
    // Injetar a função getSessionID
    inject('getSessionID', async (callback) => {
      try {
        await waitForScript();
        getSessionID(callback);
      } catch (error) {
        console.warn('getSessionID is not available.');
      }
    });
  };