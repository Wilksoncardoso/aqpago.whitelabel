export default (context, inject) => {
  const Formdoc = (value) => {
    if (!value) {
      return "";
    }
    let doc = value.replace(/[^\d]/g, "");
    if (doc.length === 11) {
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (doc.length === 14) {
      return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  };

  inject('Formdoc', Formdoc);
};