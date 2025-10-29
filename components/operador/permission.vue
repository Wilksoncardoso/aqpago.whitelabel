<template>
  <div></div>
</template>

<script>
export default {
  name: "PermissionValidator",

  data() {
    return {
      hasAccess: true, // libera até verificar
    };
  },

  computed: {
    currentRoute() {
      return this.$route.path;
    },
    data_user() {
      return this.$store?.state?.user?.user__data || {};
    },
    user_tipo() {
      return this.data_user?.user_tipo;
    },
    acconunt_permission() {
      return this.data_user?.user_permissao || {};
    },
  },

  watch: {
    user_tipo: {
      immediate: true,
      handler(newVal) {
        if (newVal !== undefined) this.checkPermissions();
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
        // Rota OPerador regras
        "/painel/extrato": ["digital_account"],
        "/painel/extrato-vendas": ["vendas"],
        "/painel/cobranca-pix": ["pix_charge"],
        "/painel/transferencia-pix": ["transfer"],
        "/painel/minhaschaves-pix": ["my_keys"],
        "/painel/pixcopiaecola": ["pix_copy_paste"],
        "/painel/link_payment": ["payment_link"],
        "/painel/clientes": ["client"],

        // Rota Responsavel regras
        "/painel/integracao": ["api", true],
        // "/painel/theme": ["mkt", true],
      };

      const spec = routePermissions[this.currentRoute];

      // Se a rota não tiver regra explícita, mantém acesso
      if (!spec) {
        this.hasAccess = true;
        return;
      }

      const arr = Array.isArray(spec) ? spec : [spec];
      const requireResponsavel = arr.includes(true);
      const requiredPerms = arr.filter((v) => v !== true);

      const hasAnyRequiredPerm = requiredPerms.some(
        (perm) => this.acconunt_permission?.[perm] === 1
      );

      if (requireResponsavel) {
        this.hasAccess = this.user_tipo === "responsavel" && hasAnyRequiredPerm;
      } else {
        if (this.user_tipo === "operador") {
          this.hasAccess = hasAnyRequiredPerm;
        } else {
          this.hasAccess = true;
        }
      }

      if (!this.hasAccess) {
        const onlyRespMsg =
          requireResponsavel && this.user_tipo !== "responsavel"
            ? "Acesso permitido apenas para Adiministrador."
            : "Você não tem permissão para acessar essa página.";

        this.$toast?.error(onlyRespMsg, { position: "bottom-center" });
        this.$router.push("/painel/");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
