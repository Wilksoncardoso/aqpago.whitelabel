export default (context, inject) => {
  const formatTel = (value) => {
    if (!value) {
      return "";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    // realizar a formatação...
    return cleanedValue.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1)$2 $3 - $4");
  };

  inject('formatTel', formatTel);
};