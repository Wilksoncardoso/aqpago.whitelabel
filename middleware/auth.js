

export default function ({ $axios, store, redirect, app }) {

  const setAuthorizationHeader = (token) => {
    $axios.setHeader("Authorization", `Bearer ${token}`);
  };


  $axios.onRequest((config) => {
    const token = localStorage.getItem("token") || store.state.auth.token.token;
    if (token) {
      // config.headers.common['Authorization'] = `Bearer ${token}` || localStorage.getItem('token')
      setAuthorizationHeader(token);
    }

    if (token) {
      store.commit("auth/setToken", { token: localStorage.getItem("token") });
      config.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthorizationHeader(token);
    }
  });

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status);
  //   if (code === 401 ) {
  //     // if (code === 401 || code === 403) {
  //     redirect("/login");
  //   }
  // });


  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status);
  //   if (code === 401 && !toastShown) {
  //     toastShown = true; // Marca como exibido
  //     // Redireciona para a página de login
  //     redirect("/login");

  //     // Limpa o estado de exibição do toast após um tempo
  //     setTimeout(() => {
  //       toastShown = false;
  //     }, 3000); // Tempo limite para reabilitar o toast
  //   }
  // });


  // Verificar se o token ainda é válido
  $axios
    .get("/auth/load-session")
    .then((response) => {
      if (!response.success) {
        let termos = false;

         store.commit("load_session/salvar", response.data );
        
        // console.log(store.state.auth.token.token)

        if (termos) {
          redirect("/painel/termos");
        }
        // Se o token não for válido, redirecionar para a página de login
        // redirect('/painel/inicio')
      }
    })
    .catch((error) => {
      // Se a solicitação falhar, redirecionar para a página de login
      setAuthorizationHeader("");
      redirect("/login");
      // app.$toast.error(error.response.data.message);
    });
}
