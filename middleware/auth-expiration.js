// export default function ({ $token, redirect, app, route, store }) {

//   if (process.client) {
//     // Verifica token principal
//     const mainExp = localStorage.getItem('main_token_exp')
//     const now = Math.floor(Date.now() / 1000)

//     const acconunt_permission = {
//       balance_view: true, // saldo
//       api: true, //api
//       digital_account: false, // conta digital
//       sales: false, // vendas
//       pix_charge: true, // cobrança pix
//       transfer: true, // transferencia
//       pix_copy_paste: true, // pix copia e cola
//       my_keys: true, // minhas chaves
//       payment_link: true, // link pagamento
//     };

//     let user_tipo;
//     try {
//       user_tipo = store?.state?.user?.user__data?.user_tipo; // Ou await this.$axios.get(...)


//       const routePermissions = {
//         "/painel/extrato": ["digital_account", "sales"],
//         "/painel/cobranca-pix": ["pix_charge"],
//         "/painel/transferencia-pix": ["transfer"],
//         "/painel/minhaschaves-pix": ["my_keys"],
//         "/painel/pixcopiaecola": ["pix_copy_paste"],
//         "/painel/link_payment": ["payment_link"],
//         "/painel/integracao": ["api"],
//       };

//       const requiredPermissions = routePermissions[route.path];

//       if (requiredPermissions) {
//         // Verifica se o usuário tem PELO MENOS UMA das permissões necessárias
//         const hasPermission = requiredPermissions.some(
//           perm => acconunt_permission[perm] === true
//         );

//         if (!hasPermission && user_tipo === "operador") {
//           app.$toast.error("Você não tem permissão para acessar essa página", {
//             position: "bottom-center",
//           });
//           return redirect('/painel/'); // Ou outra rota de fallback
//         }
//       }
//     } catch (error) {
//       console.error("Erro ao carregar user_tipo", error);
//     }


//   }
// }

export default function ({ $token, redirect, app, route, store }) {
  if (process.client) {
    // Verifica token principal
    const mainExp = localStorage.getItem('main_token_exp');
    const now = Math.floor(Date.now() / 1000);

    // if (mainExp && now > mainExp) {
    //   localStorage.removeItem('main_token');
    //   localStorage.removeItem('main_token_exp');
    //   return redirect('/login');
    // }

    // const acconunt_permission = {
    //   balance_view: true,
    //   api: true,
    //   digital_account: false,
    //   sales: false,
    //   pix_charge: true,
    //   transfer: true,
    //   pix_copy_paste: true,
    //   my_keys: true,
    //   payment_link: true,
    // };

    // // Função para verificar permissões
    // const checkPermissions = () => {
    //   const user_tipo = store?.state?.user?.user__data?.user_tipo;

    //   if (user_tipo === null || user_tipo === undefined) {
    //     // Se user_tipo ainda não estiver carregado, tenta novamente após 100ms
    //     setTimeout(checkPermissions, 500);
    //     return;
    //   }

    //   const routePermissions = {
    //     "/painel/extrato": ["digital_account", "sales"],
    //     "/painel/cobranca-pix": ["pix_charge"],
    //     "/painel/transferencia-pix": ["transfer"],
    //     "/painel/minhaschaves-pix": ["my_keys"],
    //     "/painel/pixcopiaecola": ["pix_copy_paste"],
    //     "/painel/link_payment": ["payment_link"],
    //     "/painel/integracao": ["api"],
    //   };

    //   const requiredPermissions = routePermissions[route.path];

    //   if (requiredPermissions) {
    //     const hasPermission = requiredPermissions.some(
    //       perm => acconunt_permission[perm] === true
    //     );

    //     if (!hasPermission && user_tipo === "operador") {
    //       app.$toast.error("Você não tem permissão para acessar essa página", {
    //         position: "bottom-center",
    //       });
    //       return redirect('/painel/');
    //     }
    //   }
    // };

    // // Inicia a verificação
    // checkPermissions();
  }
}