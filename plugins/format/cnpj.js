export default (context, inject) => {
  const formatCnpj = (value) => {
    if (!value) {
      return "";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    // realizar a formatação...
    return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  inject('formatCnpj', formatCnpj);
};