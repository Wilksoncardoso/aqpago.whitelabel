export default (context, inject) => {
  const float = (value) => {
      var valor = parseFloat(value)
    return valor
  };

  inject('float', float);
};