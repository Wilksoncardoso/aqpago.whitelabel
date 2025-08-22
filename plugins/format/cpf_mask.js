export default (context, inject) => {
  const CpfMask = (value) => {
    if (!value) {
      return "";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    // realizar a formatação...
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-***");
  };

  inject('maskcpf', CpfMask);
};