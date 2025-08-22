export default ({}, inject) => {
  // Regex para máscara de boleto bancário (47 dígitos)
  const regexMascaraBancario = /(\d{5})\.(\d{5})\s(\d{5})\.(\d{6})\s(\d{5})\.(\d{6})\s(\d{1})\s(\d{11})/;

  // Regex para máscara de boleto de concessionária (48 dígitos)
  const regexMascaraConcessionaria = /(\d{12})\s(\d{12})\s(\d{12})\s(\d{12})/;

  // Regex para validar números de boletos bancários (sem máscara)
  const regexBancario = /^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{11})$/;


  // Regex para validar números de boletos de concessionária (sem máscara)
  const regexConcessionaria = /^(\d{12})(\d{12})(\d{12})(\d{12})$/;

  /**
   * Formatar número do boleto com a máscara correspondente
   * @param {string} boleto - Número do boleto (somente números)
   * @returns {string} - Número formatado com máscara
   */
  const formatarBoleto = (boleto) => {
    const sanitizedBoleto = boleto.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (sanitizedBoleto.length === 44) {
      // Máscara para boleto bancário
      return sanitizedBoleto.replace(regexBancario, '$1.$2 $3.$4 $5.$6 $7 $8');
    }

    if (sanitizedBoleto.length === 48) {
      // Máscara para boleto de concessionária
      return sanitizedBoleto.replace(regexConcessionaria, '$1 $2 $3 $4');
    }

    return boleto; // Retorna como está se não for 47 ou 48 dígitos
  };

  /**
   * Verifica se o número do boleto é válido (somente no formato esperado)
   * @param {string} boleto - Número do boleto (com ou sem máscara)
   * @returns {boolean} - True se for válido, false caso contrário
   */
  const validarBoleto = (boleto) => {
    const sanitizedBoleto = boleto.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (sanitizedBoleto.length === 47) {
      return regexBancario.test(sanitizedBoleto);
    }

    if (sanitizedBoleto.length === 48) {
      return regexConcessionaria.test(sanitizedBoleto);
    }

    return false; // Retorna inválido se não tiver 47 ou 48 dígitos
  };

  // Injetar as funções no Nuxt para uso global
  inject('boletoValidator', {
    formatarBoleto,
    validarBoleto,
    regexMascaraBancario,
    regexMascaraConcessionaria,
  });
};