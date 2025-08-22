export default (context, inject) => {

  const TextRecarga = (value) => {
    if (!value || value === undefined) {
      return "";
    }
    const text = value;
    switch (text) {

      case "MINECOINS":
        return "Minecraft Minecoins";

      case text:
        return text;
    }

  };

  inject('TextRecarga', TextRecarga);
};