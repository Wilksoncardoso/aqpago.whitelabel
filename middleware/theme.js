export default async function themeMiddleware({ app, store, req, route }) {
  // 1) Descobre o domínio/host correto (SSR + Vercel + Client)
  const host =
    process.server
      ? (req?.headers?.["x-forwarded-host"] || req?.headers?.host)
      : window.location.host

  // const domain = 'aqpago-whitelabel.vercel.app'
  const domain = (route?.query?.domain || host || "").toString().trim()

  // se por algum motivo não tiver domain, não quebra SSR
  if (!domain) return

  // 2) Evita refetch se já carregou para esse mesmo domínio
  const currentDomain = store.state.theme?.domain
  const alreadyLoaded = store.state.theme?.loaded

  if (alreadyLoaded && currentDomain === domain) return

  // Se mudou o domínio, reseta (opcional, mas recomendado)
  if (currentDomain && currentDomain !== domain && store._mutations?.["theme/resetTheme"]) {
    store.commit("theme/resetTheme")
  }

  store.commit("theme/setDomain", domain)
  store.commit("theme/setLoaded", false)

  try {
    // 3) Busca theme_id pelo domínio
    const themeRes = await app.$axios.get(
      `/public/whitelabel/theme?domain=${encodeURIComponent(domain)}&token=none`
    )

    const themeId = themeRes?.data?.body?.theme_id
    if (!themeId) {
      // não encontrou theme_id => deixa não carregado e sai
      return
    }

    store.commit("theme/salvarIdTheme", themeId)

    // 4) Busca config do tema (SEO/assets/styles/etc)
    const configRes = await app.$axios.get(
      "/public/whitelabel/config?token=none",
      {
        headers: {
          "X-Theme-Id": themeId,
        },
      }
    )
    console.log(configRes)
    const data = configRes?.data
    if (!data) return

    store.commit("theme/salvar", data)

    store.commit(
      "theme/salvarLink",
      data?.data?.business?.external_link?.link_payment || "https://aqbank.online/"
    )

    store.commit("theme/setLoaded", true)
  } catch (err) {
    // Importante: não derrubar SSR por erro de API
    // Você pode logar no server pra debugar
    if (process.server) {
      // eslint-disable-next-line no-console
      console.error("[middleware/theme] erro:", err?.message || err)
    }
    store.commit("theme/setLoaded", false)
  }
}
