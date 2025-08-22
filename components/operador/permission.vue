<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "PermissionValidator",

  data() {
    return {
      hasAccess: true, // Default permite acesso até verificação
    };
  },

  computed: {
    currentRoute() {
      return this.$route.path;
    },
    data_user() {
      return this.$store?.state?.user?.user__data;
    },
    user_tipo() {
      return this.data_user?.user_tipo;
    },
    acconunt_permission() {
      return this.data_user?.user_permissao;
    },
  },

  watch: {
    user_tipo: {
      immediate: true, // Executa imediatamente ao criar o componente
      handler(newVal) {
        if (newVal !== undefined) {
          this.checkPermissions();
        }
      },
    },
    currentRoute() {
      this.checkPermissions();
    },
  },

  methods: {
    checkPermissions() {
      if (!this.user_tipo) return;

      const routePermissions = {
        "/painel/extrato": ["digital_account", "vendas"],
        "/painel/cobranca-pix": ["pix_charge"],
        "/painel/transferencia-pix": ["transfer"],
        "/painel/minhaschaves-pix": ["my_keys"],
        "/painel/pixcopiaecola": ["pix_copy_paste"],
        "/painel/link_payment": ["payment_link"],
        "/painel/integracao": ["api"],
      };

      const requiredPermissions = routePermissions[this.currentRoute];
      if (requiredPermissions) {
        this.hasAccess =
          requiredPermissions.some(
            (perm) => this.acconunt_permission[perm] === 1
          ) || this.user_tipo !== "operador";



        if (!this.hasAccess && this.user_tipo === "operador") {
          this.$toast?.error(
            "Você não tem permissão para acessar essa página",
            {
              position: "bottom-center",
            }
          );
          this.$router.push("/painel/");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
