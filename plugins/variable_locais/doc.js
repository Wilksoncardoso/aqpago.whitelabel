export default (context, inject) => {
  const Doc_default = (value) => {
    if (!value) {
      return value;
    }

    let doc = value.replace(/\s+/g, "");

    switch (doc) {
      case "19468242000132":
        return "49187738000107"; // aqpago

      default:
        return value;
    }
  };
  // url teste
  const Url = "https://marketplace-aqpago.vercel.app"; // "http://192.168.3.75:3009" or "https://marketplace-aqpago.vercel.app"

  inject('url', Url)
  inject("Doc_default", Doc_default);
};
