export default (context, inject) => {
    const Status = (status) => {

        if (!status) {
            return status; 
        }
        
        // Correct method name is toLowerCase, not tolowerCase
        let setStatus = status.toLowerCase() || '';

        switch (setStatus) {
            case "efetivado":
              return "Pago";
            
            default:
              return setStatus;
        }
    };

    inject('return_status_pagamento_boleto', Status);
};