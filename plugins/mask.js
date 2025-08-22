export default ({ app }, inject) => {
  // Máscara para CPF/CNPJ
  const maskDoc = (value) => {
    if (!value) return ''
    let doc = value.replace(/[^\d]/g, '')
    if (doc.length === 11) {
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else if (doc.length === 14) {
      return doc.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      )
    }
    return value
  }
  // Máscara para CPF/CNPJ com restrição visual
  const maskDocNo = (value) => {
    if (!value) return ''
    let doc = value.replace(/[^\d]/g, '')
    if (doc.length === 11) {
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**')
    } else if (doc.length === 14) {
      return doc.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '**.$2.$3/$4-**'
      )
    }
    return value
  }

  // Máscara para dinheiro
  const maskMoney = (value) => {
    if (!value || value === null || value === '') return '0,00'
    if (typeof value === 'string') value = parseFloat(value)
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Máscara para telefone
  const maskTel = (value) => {
    if (!value) return ''
    const cleanedValue = value.replace(/[^\d]/g, '')
    return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  // Máscara de percentual
  const percentual = (value) => {
    if (value == null || isNaN(value)) return "0,00 %";
    let tax = Number(value).toFixed(2).replace(".", ",");
    return `${tax} %`;
  }


  // Máscara para remove
  const maskRemove = (value) => {
    if (!value) return ''
    return value.replace(/[^\d]/g, '');
  }

  // Máscara para CEP
  const maskEnd = (value) => {
    if (!value) return ''
    const cleanedValue = value.replace(/[^\d]/g, '')
    return cleanedValue.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  // Máscara para Float
  const pFloat = (value) => {
    if (!value) return ''
    const conversao = parseFloat(value)
    return conversao
  }

  // Primeira maiuscula
  const textCaptalizer = (value) => {
    if (!value) return ''; // Evita erro caso o valor seja null ou undefined
    const text = value.toLowerCase();
    return text
      .split(' ')
      .map((word) => {
        if (word.length > 2 || word.length === 1) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  };

   // Primeira letra
  const fisttext = (text) => {
    if (!text) return ''
    let name = text.charAt(0).toUpperCase()
    return name
  }

  const lowercase = (text) => {
    if (!text) return ''
    let name = text.toLowerCase()
    return name
  }
   // Primeiro e ultima palavra
   const fistendtext = (text) => {
    if (!text) return "";
      let nomes = text.trim().split(" ");
      if(nomes.length > 1){
        let primeiroNome = nomes[0];
        let ultimoNome = nomes[nomes.length - 1];
        return `${primeiroNome} ${ultimoNome}`;
      }
      return nomes[0]
  }
  //url teste
  const Url = 'https://aqpago.vercel.app' // 'http://192.168.3.75:3002' or 'https://aqpago.vercel.app'



  // Injeta a função para uso global
  
  inject("lowercase", lowercase);
  inject("textCap", textCaptalizer);

  inject("percentual", percentual);
  inject('maskNo', maskRemove)
  inject('maskDoc', maskDoc)
  inject('maskDocNo', maskDocNo)
  inject('maskMoney', maskMoney)
  inject('maskTel', maskTel)
  inject('maskEnd', maskEnd)
  inject('maskCEP', maskEnd)
  inject('pFloat', pFloat)
  inject('url', Url)
  inject('textCaptalizer', textCaptalizer)
  inject('fisttext', fisttext)
  inject('fistendtext', fistendtext)
}
