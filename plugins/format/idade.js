export default ({ app }, inject) => {
    inject('calcularIdade', (dataNascimento) => {
      if (!dataNascimento) return null;
      const dataNascimentoMoment = app.$moment(dataNascimento, "YYYY-MM-DD");
      const dataAtual = app.$moment();
      const diferencaAnos = dataAtual.diff(dataNascimentoMoment, "years");
      return diferencaAnos;
    });
  };