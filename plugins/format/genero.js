export default (context, inject) => {
  const formatGenero = (value) => {
    if (!value) {
      return "";
    }
    const genero = value;
    switch (genero) {
      case 'M':
        return 'Masculino'
        case 'F':
          return 'Feminino'
      default:
         return 'não localizado'
    }
  
  };

  inject('formatGenero', formatGenero);
};