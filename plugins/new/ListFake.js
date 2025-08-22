export default ({ app }, inject) => {


  const ArrayTransaction =
    [
      {
        "id": 1,
        "date": "2025-07-01",
        "pix": {
          "type": "email",
          "value": "eng.wilksoncardoso@gmail.com",
          "name": "Wilkson Cardoso",
          "document": "02130412270",
          "bank": "C6 Bank",
          "conta": "321321-3",
          "agencia": "0001",
          "identificador": "312312445532432"
        },
        "amount": 100,
        "status": "created",
        "operador": "Andreia Silva Brito",
        "description": "Pagamento teste"
      },
      {
        "id": 2,
        "date": "2025-07-02",
        "pix": {
          "type": "cpf",
          "value": "12345678901",
          "name": "Ana Carolina Souza",
          "document": "98765432100",
          "bank": "Nubank",
          "conta": "456789-0",
          "agencia": "0001",
          "identificador": "789012345678901"
        },
        "amount": 250.50,
        "status": "canceled",
        "operador": "Carlos Eduardo Lima",
        "description": "Pagamento cancelado"
      },
      {
        "id": 3,
        "date": "2025-07-02",
        "pix": {
          "type": "phone",
          "value": "11987654321",
          "name": "Roberto Almeida",
          "document": "45678912300",
          "bank": "Itaú",
          "conta": "123456-7",
          "agencia": "1234",
          "identificador": "345678901234567"
        },
        "amount": 75.20,
        "status": "created",
        "operador": "Fernanda Oliveira",
        "description": "Transferência rápida"
      },
      {
        "id": 4,
        "date": "2025-07-03",
        "pix": {
          "type": "evp",
          "value": "a1b2c3d4-e5f6-g7h8-i9j0",
          "name": "Juliana Santos",
          "document": "32165498700",
          "bank": "Bradesco",
          "conta": "654321-8",
          "agencia": "5678",
          "identificador": "890123456789012"
        },
        "amount": 150.75,
        "status": "canceled",
        "operador": "Ricardo Gomes",
        "description": "Estorno"
      },
      {
        "id": 5,
        "date": "2025-07-04",
        "pix": {
          "type": "email",
          "value": "maria.silva@outlook.com",
          "name": "Maria Silva",
          "document": "14725836900",
          "bank": "Santander",
          "conta": "987654-1",
          "agencia": "4321",
          "identificador": "234567890123456"
        },
        "amount": 300,
        "status": "created",
        "operador": "Patricia Alves",
        "description": "Pagamento mensal"
      },
      {
        "id": 6,
        "date": "2025-07-05",
        "pix": {
          "type": "cpf",
          "value": "36925814700",
          "name": "Lucas Oliveira",
          "document": "96385274100",
          "bank": "Banco do Brasil",
          "conta": "741852-9",
          "agencia": "1597",
          "identificador": "678901234567890"
        },
        "amount": 89.90,
        "status": "canceled",
        "operador": "Gustavo Henrique",
        "description": "Pagamento cancelado"
      },
      {
        "id": 7,
        "date": "2025-07-06",
        "pix": {
          "type": "phone",
          "value": "11912345678",
          "name": "Camila Rocha",
          "document": "25836914700",
          "bank": "Inter",
          "conta": "369258-4",
          "agencia": "0001",
          "identificador": "123456789012345"
        },
        "amount": 420.50,
        "status": "created",
        "operador": "Amanda Costa",
        "description": "Pagamento de serviços"
      },
      {
        "id": 8,
        "date": "2025-07-07",
        "pix": {
          "type": "evp",
          "value": "b5c6d7e8-f9g0-h1i2-j3k4",
          "name": "Rodrigo Mendes",
          "document": "65498732100",
          "bank": "Caixa",
          "conta": "852963-7",
          "agencia": "3579",
          "identificador": "456789012345678"
        },
        "amount": 125.30,
        "status": "created",
        "operador": "Thiago Pereira",
        "description": "Transferência"
      },
      {
        "id": 9,
        "date": "2025-07-08",
        "pix": {
          "type": "email",
          "value": "joao.santos@yahoo.com",
          "name": "João Santos",
          "document": "78945612300",
          "bank": "Safra",
          "conta": "159753-2",
          "agencia": "2468",
          "identificador": "567890123456789"
        },
        "amount": 75,
        "status": "canceled",
        "operador": "Larissa Martins",
        "description": "Estorno"
      },
      {
        "id": 10,
        "date": "2025-07-09",
        "pix": {
          "type": "cpf",
          "value": "85274196300",
          "name": "Fernanda Lima",
          "document": "32198765400",
          "bank": "Original",
          "conta": "357159-8",
          "agencia": "1357",
          "identificador": "678901234567890"
        },
        "amount": 210,
        "status": "created",
        "operador": "Diego Souza",
        "description": "Pagamento"
      },
      {
        "id": 11,
        "date": "2025-07-10",
        "pix": {
          "type": "phone",
          "value": "11976543210",
          "name": "Pedro Costa",
          "document": "14785236900",
          "bank": "Neon",
          "conta": "753951-4",
          "agencia": "0001",
          "identificador": "789012345678901"
        },
        "amount": 50,
        "status": "canceled",
        "operador": "Carolina Ribeiro",
        "description": "Cancelado"
      },
      {
        "id": 12,
        "date": "2025-07-11",
        "pix": {
          "type": "evp",
          "value": "c9d8e7f6-g5h4-i3j2-k1l0",
          "name": "Beatriz Almeida",
          "document": "36914725800",
          "bank": "Next",
          "conta": "456123-9",
          "agencia": "0001",
          "identificador": "890123456789012"
        },
        "amount": 180.90,
        "status": "created",
        "operador": "Marcelo Dias",
        "description": "Transferência"
      },
      {
        "id": 13,
        "date": "2025-07-12",
        "pix": {
          "type": "email",
          "value": "carla.oliveira@gmail.com",
          "name": "Carla Oliveira",
          "document": "25814736900",
          "bank": "Pan",
          "conta": "987123-5",
          "agencia": "3698",
          "identificador": "901234567890123"
        },
        "amount": 95.50,
        "status": "created",
        "operador": "Rafaela Santos",
        "description": "Pagamento"
      },
      {
        "id": 14,
        "date": "2025-07-13",
        "pix": {
          "type": "cpf",
          "value": "65432198700",
          "name": "Marcos Vinicius",
          "document": "98712365400",
          "bank": "Banrisul",
          "conta": "321654-7",
          "agencia": "1472",
          "identificador": "012345678901234"
        },
        "amount": 300,
        "status": "canceled",
        "operador": "Vanessa Lima",
        "description": "Cancelado"
      },
      {
        "id": 15,
        "date": "2025-07-14",
        "pix": {
          "type": "phone",
          "value": "11923456789",
          "name": "Tatiane Souza",
          "document": "14736925800",
          "bank": "Mercado Pago",
          "conta": "654987-1",
          "agencia": "0001",
          "identificador": "123456789012345"
        },
        "amount": 75.25,
        "status": "created",
        "operador": "Felipe Cardoso",
        "description": "Pagamento"
      },
      {
        "id": 16,
        "date": "2025-07-15",
        "pix": {
          "type": "evp",
          "value": "d4e5f6g7-h8i9-j0k1-l2m3",
          "name": "Gabriel Martins",
          "document": "25836914700",
          "bank": "PicPay",
          "conta": "852741-6",
          "agencia": "0001",
          "identificador": "234567890123456"
        },
        "amount": 420,
        "status": "canceled",
        "operador": "Luana Ferreira",
        "description": "Estorno"
      },
      {
        "id": 17,
        "date": "2025-07-16",
        "pix": {
          "type": "email",
          "value": "alexandre.costa@hotmail.com",
          "name": "Alexandre Costa",
          "document": "36925814700",
          "bank": "BTG",
          "conta": "753159-2",
          "agencia": "2583",
          "identificador": "345678901234567"
        },
        "amount": 150,
        "status": "created",
        "operador": "Juliana Alves",
        "description": "Transferência"
      },
      {
        "id": 18,
        "date": "2025-07-17",
        "pix": {
          "type": "cpf",
          "value": "98765432109",
          "name": "Patricia Gomes",
          "document": "12378945600",
          "bank": "BS2",
          "conta": "456789-3",
          "agencia": "0001",
          "identificador": "456789012345678"
        },
        "amount": 85.75,
        "status": "created",
        "operador": "Roberto Santos",
        "description": "Pagamento"
      },
      {
        "id": 19,
        "date": "2025-07-18",
        "pix": {
          "type": "phone",
          "value": "11934567890",
          "name": "Daniel Ribeiro",
          "document": "45612378900",
          "bank": "PagSeguro",
          "conta": "159357-8",
          "agencia": "0001",
          "identificador": "567890123456789"
        },
        "amount": 200,
        "status": "canceled",
        "operador": "Aline Costa",
        "description": "Cancelado"
      },
      {
        "id": 20,
        "date": "2025-07-19",
        "pix": {
          "type": "evp",
          "value": "e6f7g8h9-i0j1-k2l3-m4n5",
          "name": "Vanessa Oliveira",
          "document": "78912345600",
          "bank": "C6 Bank",
          "conta": "357951-4",
          "agencia": "0001",
          "identificador": "678901234567890"
        },
        "amount": 350.50,
        "status": "created",
        "operador": "Bruno Lima",
        "description": "Pagamento de serviços"
      }
    ]



  inject("ListFakeArrayTransaction", ArrayTransaction)
}
