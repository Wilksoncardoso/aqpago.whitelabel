
export default (context, inject) => {
    const Status = (status) => {

        if (!status) {
            return status; 
        }

        switch (status) {
            case "PENDENTE":
              return "Pendente";
            case "APROVADA":
              return "Aprovado";
            case "APROVADO":
              return "Aprovado";
            case "FALHADA":
              return "Falhada";
            case "CANCELADA":
              return "Cancelada";
            case "ANALISANDO":
              return "Em analise";
            case "PAGAMENTO REPROVADO":
              return "Pagamento reprovado";
            case "reversed":
              return "Revertida";
            case "refunded":
              return "Estornada";
            case "dispute":
              return "Em Disputa";
            case "FALHA NO PAGAMENTO":
              return "Falha no pagamento";
            default:
              return status;
          }


    };

    inject('return_status_link', Status);
};
