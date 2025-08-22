export default ({ app }, inject) => {
  const type_client = (value) => {
    if (!value) return ''
    switch (value) {
      case 'responsavel':
        return 'administrador'
      case value:
        return value
    }
  }
  const getTypePayment = (type) => {
    switch (type) {
      case 'credit_avista':
        return 'Crédito à vista'
      case 'credit':
        return 'Crédito parcelado'
      case 'debit':
        return 'Débito'
      case 'bolet':
        return 'Boleto bancário'
      case 'pix':
        return 'Pix'
      default:
        return type
    }
  }

  const getTypePixStatus = (status) => {
    switch (status) {
      case "created":
        return "Criado";

      case "canceled":
        return "Cancelado";

      case status:
        return status;
    }

  }

  const getTypePixIcon = (type) => {
    switch (type) {
      case "email":
        return "IconTypekeypixEmail";
      case "cpf":
        return "IconTypekeypixCpf";
      case "phone":
        return "IconTypekeypixCelular";
      case "evp":
        return "IconTypekeypixAleatorio";
      case "cnpj":
        return "IconTypekeypixCnpj";
      case type:
        return type;
    }
  }
  const getTypePix = (type) => {
    switch (type) {
      case "email":
        return "E-mail";
      case "cpf":
        return "CPF";
      case "phone":
        return "Telefone";
      case "evp":
        return "Chave Aleatória";
      case "cnpj":
        return "CNPJ";
      case type:
        return type;
    }
  }



  const getTypePaymentSales = (type) => {
    switch (type) {
      case 'credit':
        return 'Crédito'
      case 'debit':
        return 'Débito'
      case 'bolet':
        return 'Boleto bancário'
      case 'pix':
        return 'Pix'
      default:
        return type
    }
  }


  const ReturnTypeContDigital = (type, resource) => {
    if (type === "ted-cip") return "CIP";
    if (type === "p2p") return "P2P";
    if (type === "boleto" || resource === "invoice_boleto") return "Boleto";
    if (
      type === "pix" ||
      type === "manual" ||
      resource === "invoice-pix" ||
      resource === "transfer" ||
      resource === "returned"
    ) return "Pix";
    if (resource === "transaction-order") return "Interno";

    return [type, resource];
  };


  const ReturnStatusContaDigital = (status, type, resource, input) => {
    const pix = ["pix", "invoice-pix", "manual", "transfer", "p2p"];
    // return [status, type, resource, input];
    if (status === "created" && resource === "invoice_boleto") {
      return "Criado";
    } else if (status === "created") {
      return "Aguardando";
    } else if (status === "failed") {
      return "Falha";
    } else if (status === "blocked") {
      return "Bloqueado";
    } else if (status === "returned" || resource === "returned") {
      return "Devolvido";
    } else if (
      (input === "in" && pix.includes(type)) ||
      (resource === "transaction-order" && input === "in") ||
      (type === "ted-cip" && input === "in") ||
      (status === "paid" && input === "in")
    ) {
      return "Recebido";
    } else if (
      (input === "out" && pix.includes(type)) ||
      status === "paid" ||
      (resource === "transaction-order" && input === "out") ||
      (type === "ted-cip" && input === "out")
    ) {
      return "Enviado";
    } else {
      return [status, type, resource, input];
    }
  }

  const getInputContaDigital = (input) => {
    switch (input) {
      case 'in':
        return 'Entrada'

      case 'out':
        return 'Saída'

      default:
        return input;
    }
  }

  const getIconContaDigital = (resource, input, status) => {
    if (resource == 'transaction-order') {
      return 'IconExtratoAqpago'
    } else if (status == 'Falha') {
      return 'IconExtratoFailed'
    } else if (status == 'Aguardando' || status == 'Criado') {
      return 'IconExtratoTime'
    } else if (input == 'out') {
      return 'IconExtratoOut'
    } else if (input == 'in') {
      return 'IconExtratoIn'
    } else {
      return 'IconExtratoAqpago'
    }
  }

  const getTerminal = (type) => {
    return type === 'online' ? 'Virtual' : 'POS'
  }

  const getParcela = (type) => {
    return type > 1 ? 'Em ' + type + 'x' : 'À vista'
  }

  const getFlag = (value) => {
    let flag = value.toLowerCase()

    switch (flag) {
      case 'mastercard':
        return 'FlagMastercard'

      case 'visa':
        return 'FlagVisa'

      case 'american express':
        return 'FlagAmex'

      case 'amex':
        return 'FlagAmex'

      case 'elo':
        return 'FlagElo'

      case 'hipercard':
        return 'FlagHipercard'

      case 'hiper':
        return 'FlagHiper'

      case 'mastercard':
        return 'FlagMastercard'

      case 'maestro':
        return 'FlagMastercard'

      case 'visa':
        return 'FlagVisa'

      case 'visa electron':
        return 'FlagVisa'

      case 'cabal':
        return 'FlagCabal'

      case 'diners Club':
        return 'FlagDinersclub'

      case 'jcb':
        return 'FlagJcb'

      case 'discover':
        return 'FlagDiscover'

      case 'aura':
        return 'FlagAura'

      case 'bolet':
        return 'FlagDefault'

      case 'pix':
        return 'FlagDefault'

      default:
        return 'FlagDefault'
    }
  }

  const getAntecipacao = (type) => {
    return type ? 'ativo' : 'bloqueado'
  }

  const getStatusStore = (type) => {
    return type === '' ? 'Status' : type ? 'ativado' : 'desativado'
  }

  const GetUFBR = [
    { value: "AC", text: "Acre" },
    { value: "AL", text: "Alagoas" },
    { value: "AP", text: "Amapá" },
    { value: "AM", text: "Amazonas" },
    { value: "BA", text: "Bahia" },
    { value: "CE", text: "Ceará" },
    { value: "DF", text: "Distrito Federal" },
    { value: "ES", text: "Espírito Santo" },
    { value: "GO", text: "Goiás" },
    { value: "MA", text: "Maranhão" },
    { value: "MT", text: "Mato Grosso" },
    { value: "MS", text: "Mato Grosso do Sul" },
    { value: "MG", text: "Minas Gerais" },
    { value: "PA", text: "Pará" },
    { value: "PB", text: "Paraíba" },
    { value: "PR", text: "Paraná" },
    { value: "PE", text: "Pernambuco" },
    { value: "PI", text: "Piauí" },
    { value: "RJ", text: "Rio de Janeiro" },
    { value: "RN", text: "Rio Grande do Norte" },
    { value: "RS", text: "Rio Grande do Sul" },
    { value: "RO", text: "Rondônia" },
    { value: "RR", text: "Roraima" },
    { value: "SC", text: "Santa Catarina" },
    { value: "SP", text: "São Paulo" },
    { value: "SE", text: "Sergipe" },
    { value: "TO", text: "Tocantins" },
  ];

  inject('GetUFBR', GetUFBR)
  inject('getTerminal', getTerminal)
  inject('getStatusStore', getStatusStore)
  inject('getAntecipacao', getAntecipacao)
  inject('getFlag', getFlag)
  inject('getParcela', getParcela)
  inject('getTypePaymentSales', getTypePaymentSales)
  inject('getTypePayment', getTypePayment)
  inject('type_client', type_client)
  inject('getTypePix', getTypePix)
  inject('getTypePixIcon', getTypePixIcon)
  inject('getTypePixStatus', getTypePixStatus)
  inject('ReturnTypeContDigital', ReturnTypeContDigital)
  inject('ReturnStatusContaDigital', ReturnStatusContaDigital)
  inject("getInputContaDigital", getInputContaDigital);
  inject("getIconContaDigital", getIconContaDigital)
}
