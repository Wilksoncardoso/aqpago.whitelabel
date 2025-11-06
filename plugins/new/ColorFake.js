export default ({ app }, inject) => {


    const CreatedThemeColorFake = {
        "payload": {
            "assets": {
                "initcomp": {
                    "right": true,
                    "img": "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg"
                },
                "logotipe": {
                    "img": "https://aqbank.com.br/wp-content/uploads/2024/07/Brand.svg",
                    "size": 100
                },

            },
            "styles": {
                "color": {
                    "primary": "#0d9378",
                    "primary_op": "#a6f3e4",
                    "secondary": "#012f26"
                },
                "menuleft": {
                    "background": {
                        "primary": "#02130f",
                        "secondary": "#02130f"
                    },
                    "font": {
                        "color": "#ffffff",
                    },
                    "title": {
                        "color": "#b3b3b3",
                    }
                }
            },
            "data": {
                "initcomp": {
                    "title": "Procode",
                    "description": "Desenvolvimento de Software ",
                    "bottom_text": "Procode Desenvolvimento de Software de Qualidade LTDA",
                    "app": false,
                    "googlepay": "",
                    "appstore": "",
                },
                "business": {
                    "name": "Procode",
                    "email": "procode@gmail.com",
                    "phone": "91983958559",
                    "whatsapp": "91983958559",
                    "website": "procodepj.com.br",
                    "external_link": {
                        "link_payment": ""
                    },
                    "termos": ""
                },
                "api": {
                    "base_url": ""
                }
            },
            "seo": {
                "favicon": "https://aqbank.com.br/wp-content/uploads/2024/06/Favicon.svg",
                "title": "AQBank - whitelabel",
                "description": "Teste title",
                "locale": "pt-br",
                "theme-color": "#0d9378",
                "image-url": "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png",
                "twitter-site": "https://x.com/aqbankdigital",
                "twitter-title": "aqbank digital",
                "twitter-description": "Aqbank é uma fintech brasileira especializada em abertura e movimentação de contas-correntes digitais e emissão de cartões de débito, crédito e pré-pago.",
                "twitter-image-url": "https://aqbank.com.br/wp-content/uploads/2024/07/Banner-1.png"
            }
        }
    }


    inject("CreatedThemeColorFake", CreatedThemeColorFake)
}
