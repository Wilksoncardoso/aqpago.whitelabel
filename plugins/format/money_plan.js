
export default async ({ app }, inject) => {

  inject('money_plan', (value) => {
    if (!value || value === null || value === "") {
      return " - ";
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