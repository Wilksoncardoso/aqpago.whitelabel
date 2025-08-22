export default (context, inject) => {

  const iconrecarga = (value) => {
    if (!value || value === undefined) {
      return "";
    }
    const icon = value;
    switch (icon) {
      case "LEVEL UP":
        return "IconUp";

      case "DAZN":
        return "IconDazn";

      case "STEAM":
        return "IconSteam";

      case "RAZER GOLD":
        return "IconGolden";

      case "PLAYSTATION CARD":
        return "IconPlaystation";

      case "PLAYSTATION":
        return "IconPlaystation";

      case "TIM":
        return "IconTim";

      case "OI":
        return "IconOi";

      case "OI FIXO":
        return "IconOi";

      case "CLARO":
        return "IconClaro";

      case "CLARO TV":
        return "IconClaro";

      case "ALGAR CEL":
        return "IconAlgar";

      case "ALGAR FIXA":
        return "IconAlgar";

      case "VIVO":
        return "IconVivo";

      case "SERCOMTELC":
        return "IconSercomtelc";

      case "SERCOMTELF":
        return "IconSercomtelc";

      case "CORREIOS CELULAR":
        return "IconCorreios";

      case "MC DONALDS":
        return "IconMc";

      case "GOOGLEPLAY":
        return "IconGooglepay";

      case "IFOOD VARIAVEL":
        return "IconIfood";

      case "IFOOD VARIAVEL":
        return "IconIfood";

      case "NETFLIX":
        return "IconNetflix";

      case "SPOTIFY":
        return "IconSpotify";

      case "UBER":
        return "IconUber";

      case "UBER VARIAVEL":
        return "IconUber";

      case "XBOX":
        return "IconXbox";

      case "XBOX CARD":
        return "IconXbox";

      case "XBOX LIVE":
        return "IconXbox";

      case "XBOX GAME PASS":
        return "IconXbox";

      case "XBOX GAME PASS ULTI":
        return "IconXbox";

      case "SKY":
        return "IconSky";

      case "OI TV":
        return "IconOitv";

      case "ZE DELIVERY":
        return "IconZe";

      case "MINECOINS":
        return "IconMinecraft";

      case "MINECRAFT":
        return "IconMinecraft";

      case "LEAGUE OF LEGENDS":
        return "IconLol";


      case icon:
        return "IconVivo";
    }

  };

  inject('iconrecarga', iconrecarga);
};