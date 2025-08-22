export default (context, inject) => {
  const formatCpf = (value) => {
    if (!value) {
      return "";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    // realizar a formatação...
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  inject('formatCpf', formatCpf);
};