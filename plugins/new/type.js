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

  const getTypeSeller = (type) => {
    switch (type) {
      case 'inactive':
        return 'Inativo'
      case 'active':
        return 'Aprovado'
      case 'analysis':
        return 'Em análise'
      case 'refused':
        return 'Recusado'

      case 'created':
        return 'Criado'

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
      return "Criado";
    } else if (status === "failed") {
      return "Falha";
    } else if (status === "blocked") {
      return "Bloqueado";
    } else if (status === "expired") {
      return "Expirado";
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

  const DataTimeReturn = (input) => {
    // Guardas
    if (!input) return ""; // ou "—"

    // Normaliza para Date
    const parseToDate = (val) => {
      if (val instanceof Date) return new Date(val.getTime());

      if (typeof val === "number") return new Date(val); // timestamp

      if (typeof val === "string") {
        const s = val.trim();
        // DD/MM/YYYY
        if (/\d{2}\/\d{2}\/\d{4}/.test(s)) {
          const [dd, mm, yyyy] = s.split("/");
          // cria como YYYY-MM-DD para evitar locale
          return new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
        }
        // YYYY-MM-DD (ou ISO)
        if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
          // deixa o Date cuidar do resto
          return new Date(s);
        }
      }
      // Falhou
      return new Date("Invalid");
    };

    const inicio = parseToDate(input);
    if (isNaN(inicio.getTime())) return ""; // ou "Data inválida"

    const dataFim = new Date(); // agora

    // Se a data de início é no futuro, você pode decidir o que fazer.
    // Aqui, forço a diferença não-negativa (troco as datas).
    let start = inicio;
    let end = dataFim;
    if (inicio > dataFim) {
      start = dataFim;
      end = inicio;
    }

    let anos = end.getFullYear() - start.getFullYear();
    let meses = end.getMonth() - start.getMonth();
    let dias = end.getDate() - start.getDate();

    // Ajusta dias negativos "pegando emprestado" do mês anterior
    if (dias < 0) {
      meses--;
      // último dia do mês anterior ao 'end'
      const ultimoDiaMesAnterior = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
    }

    // Ajusta meses negativos
    if (meses < 0) {
      anos--;
      meses += 12;
    }

    return `${anos} ano(s), ${meses} mês(es)`;
  };

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
  inject('getTypeSeller', getTypeSeller)
  inject('getTerminal', getTerminal)
  inject('DataTimeReturn', DataTimeReturn)
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
