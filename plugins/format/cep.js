export default (context, inject) => {
  const formatCep = (value) => {
    if (!value) {
      return "";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    // realizar a formatação...
    return cleanedValue.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  inject('formatCep', formatCep);
};