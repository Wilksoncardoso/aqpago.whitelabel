export default ({ app }, inject) => {
    const textCaptalizer = (value) => {
      return value
        .split(" ")
        .map((word) => {
          if (word.length > 2 || word.length === 1) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(" ");
    };
  
    // Injeta a função para uso global
    inject("textCap", textCaptalizer);
  };
  