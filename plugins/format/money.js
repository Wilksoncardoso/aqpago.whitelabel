
export default async ({ app }, inject) => {

  inject('formatMoney', (value) => {
    if (!value || value === null || value === "") {
      return "0,00";
    }
    if (typeof value === "string") value = parseFloat(value);

    function numberToReal(numero) {
      return numero.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return numberToReal(value);
  });
};