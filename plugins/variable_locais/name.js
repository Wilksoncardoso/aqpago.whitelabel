export default (context, inject) => {
    const Name_default = (value) => {
        // Check if value is undefined or null
        if (value === undefined || value === null) {
            return ''; // or return value if you prefer to keep undefined/null
        }

        // Convert to string in case it's not (numbers, booleans, etc.)
        const stringValue = String(value);

        let decodedString;
        try {
            decodedString = stringValue.replace(/\\u([\dA-F]{4})/gi, (_, group) =>
                String.fromCharCode(parseInt(group, 16))
            );
        } catch (e) {
            decodedString = stringValue; // fallback to original if replace fails
        }

        let text;
        try {
            text = decodedString.replace(/\s+/g, '');
        } catch (e) {
            text = decodedString; // fallback if replace fails
        }
        switch (true) {
            case text === 'invoice_boleto':
                return 'Boleto Báncario';

            case text === 'transfer':
                return 'Transferência';

            case text === 'invoice_boleto':
                return 'Boleto Báncario';

            case text === 'transaction-order':
                return 'Ajuste Tesouraria';

            case text === 'AQPagoGestor':
                return 'Ajuste Tesouraria';

            case text === 'Origeminterna-Chaveinformadanãocadastrada.':
                return 'Chave Pix não existe na Dict';

            case text === 'Origeminterna-Chaveinformadanãocadastrada.':
                return 'Chave Pix não existe na Dict';

            case text === 'Failuretotransactwithoutservice':
                return 'Falha no processamento';

            case text === 'Failuretotransactwithoutservice':
                return 'Falha no processamento';

            case text === 'ZOOPTECNOLOGIAINST':
                return 'Aqpago Meios de Pagamentos Ltda';

            case /^DOCKSOLUÇÕESEMMEIOSDEPAGAMENTOSS/.test(text):
                return 'Aqpago Meios de Pagamentos Ltda';

            default:
                return value; // Retornar o valor original caso não seja nenhum dos casos acima
        }
    };

    inject('Name_default', Name_default);
};