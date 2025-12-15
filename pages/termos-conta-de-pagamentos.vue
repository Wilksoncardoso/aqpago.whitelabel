<template lang="html">
    <div>
        <div class="mx-auto d-flex justify-space-between align-center my-5" style="max-width: 1200px;">
            <div>
                <img class="mb-5" :src="theme?.assets?.logotipe?.img" :width="theme?.assets?.logotipe?.size"></img>
                <h4 class="primary--text mb-1">{{ theme?.data?.business?.name }}</h4>
                <p class="primary--text mb-1">E-mail : {{ theme?.data?.business?.email }}</p>
                <p class="primary--text mb-1">Telefone : {{ theme?.data?.business?.phone }}</p>
            </div>
            <v-btn class="px-3 py-2" color="primary" to="/">Voltar</v-btn>
        </div>
        <section class="hero">
            <h1>Termos e Condições Gerais da Plataforma {{ theme?.data?.business?.name }}</h1>
            <p class="hero-subtitle">Contrato de Credenciamento — Disciplina o acesso, uso e funcionamento das
                plataformas digitais da {{ theme?.data?.business?.name }}</p>
            <div class="hero-meta">
                <div class="meta-item">
                    <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Versão de 25 de Setembro de 2024</span>
                </div>
                <div class="meta-item">
                    <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Validade Indeterminada</span>
                </div>
            </div>
        </section>

        <div class="container">
            <aside class="sidebar">
                <nav class="nav-card">
                    <div class="nav-title">Índice</div>
                    <ul class="nav-list">
                        <li><a href="#intro">Introdução</a></li>
                        <li><a href="#aceite">1. Aceite e Documentos</a></li>
                        <li><a href="#definicoes">2. Definições</a></li>
                        <li><a href="#objeto">3. Objeto</a></li>
                        <li><a href="#servicos">4. Dos Serviços {{ theme?.data?.business?.name }}</a></li>
                        <li><a href="#tarifas">5. Tarifas e Remuneração</a></li>
                        <li><a href="#suporte">6. Suporte ao Cliente</a></li>
                        <li><a href="#comunicacao">7. Comunicação</a></li>
                        <li><a href="#proibicoes">8. Práticas Proibidas</a></li>
                        <li><a href="#declaracoes">9. Declarações e Direitos</a></li>
                        <li><a href="#baas">10. Banking as a Service</a></li>
                        <li><a href="#estorno">11. Estorno de Transações</a></li>
                        <li><a href="#dados">12. Proteção de Dados</a></li>
                        <li><a href="#confidencialidade">13. Confidencialidade</a></li>
                        <li><a href="#propriedade">14. Propriedade Intelectual</a></li>
                        <li><a href="#prazo">15. Prazo e Rescisão</a></li>
                        <li><a href="#disposicoes">16. Disposições Gerais</a></li>
                    </ul>
                </nav>
            </aside>

            <main class="content">
                <section id="intro" class="section intro-section">
                    <h2>Introdução</h2>

                    <p class="lead">Estes Termos e Condições Gerais de Uso da Plataforma {{ theme?.data?.business?.name }} ("Termos de Uso")
                        disciplinam o acesso, uso e funcionamento das plataformas digitais da {{ theme?.data?.business?.name }}, incluindo o site e
                        o aplicativo {{ theme?.data?.business?.name }} (em conjunto, "Plataforma").</p>

                    <div class="parties-card">
                        <h4>Partes do Contrato</h4>
                        <p><strong>CONTRATANTE:</strong> O Cliente, pessoa física ou jurídica, que contrata os serviços
                            prestados pela {{ theme?.data?.business?.name }}.</p>
                        <p><strong>CONTRATADA:</strong> AQPAGO MEIOS DE PAGAMENTO LTDA, sociedade empresária, inscrita
                            no CNPJ/MF sob o nº 49.187.738/0001-07 ("{{ theme?.data?.business?.name }}").</p>
                    </div>

                    <div class="alert-box">
                        <p>PEDIMOS QUE LEIA ESTES TERMOS DE USO COM ATENÇÃO, POIS O USO DA PLATAFORMA ESTÁ SUJEITO À SUA
                            CONCORDÂNCIA E ACEITE A ESTES TERMOS DE USO.</p>
                    </div>
                </section>

                <section id="aceite" class="section">
                    <div class="section-header">
                        <div class="section-number">1</div>
                        <h2>Aceite e Documentos Integrantes</h2>
                    </div>

                    <p><strong>1.1.</strong> Ao ter acesso aos Serviços prestados pela {{ theme?.data?.business?.name }} nas Plataformas, o Cliente
                        declara ter lido e aceito, sem reservas, todas as cláusulas e condições deste Termo e demais
                        instrumentos de contratação dos Serviços.</p>

                    <p><strong>1.2.</strong> Fazem parte integrante e indissociável destes Termos:</p>

                    <div class="doc-badges">
                        <span class="doc-badge">
                            <svg class="doc-badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Política de Segurança e Privacidade
                        </span>
                        <span class="doc-badge">
                            <svg class="doc-badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Política de Anticorrupção e PLD/CFT
                        </span>
                        <span class="doc-badge">
                            <svg class="doc-badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            Política de Segurança Cibernética
                        </span>
                    </div>
                </section>

                <section id="definicoes" class="section">
                    <div class="section-header">
                        <div class="section-number">2</div>
                        <h2>Definições</h2>
                    </div>

                    <ul class="definition-list">
                        <li class="definition-item">
                            <div class="definition-term">API</div>
                            <div class="definition-desc">Application Programming Interface (Interface de Programação de
                                Aplicação). No contexto de APIs, a palavra Aplicação refere-se a qualquer software com
                                uma função distinta. A interface pode ser pensada como um contrato de serviço entre duas
                                aplicações.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Banco Central do Brasil (BCB)</div>
                            <div class="definition-desc">Autarquia federal criada pela Lei nº 4.595/1964, que possui
                                autonomia técnica, operacional, administrativa e financeira (LC 179/2021). Tem por
                                objetivo fundamental assegurar a estabilidade de preços, além de zelar pela estabilidade
                                e eficiência do sistema financeiro.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Bandeiras</div>
                            <div class="definition-desc">Empresas reguladoras que definem regras do mercado de cartões
                                de crédito.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Banking as a Service (BaaS)</div>
                            <div class="definition-desc">Fornecimento de produtos bancários a terceiros não bancários
                                por meio de APIs.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Cadastro</div>
                            <div class="definition-desc">Formulário preenchido pelo Cliente na Plataforma, contendo seus
                                dados pessoais e demais informações necessárias para o seu credenciamento e criação da
                                Conta para utilização dos Serviços.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Chave PIX</div>
                            <div class="definition-desc">Informação relacionada ao titular de uma conta transacional que
                                permite obter informações armazenadas no DICT sobre o usuário recebedor e a
                                correspondente conta transacional.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Chargeback</div>
                            <div class="definition-desc">Contestação de uma compra feita pela pessoa que é titular do
                                cartão utilizado na transação.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Conta</div>
                            <div class="definition-desc">Conta de pagamento de titularidade do Cliente, aberta e
                                gerenciada pela Parceira ("BaaS"), destinada ao carregamento, transferência e resgate de
                                recursos, cujos valores serão convertidos em moeda eletrônica.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Cliente e/ou Estabelecimento Comercial</div>
                            <div class="definition-desc">Pessoa física ou jurídica que possui acesso aos Serviços
                                oferecidos na Plataforma da {{ theme?.data?.business?.name }}, permitindo realizar transações de meios de
                                pagamento.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Credenciado</div>
                            <div class="definition-desc">Pessoa jurídica ou física que possui acesso aos serviços
                                prestados pelo Cliente.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Credenciadoras</div>
                            <div class="definition-desc">Instituições de pagamento que habilitam estabelecimentos
                                comerciais para a aceitação de instrumento de pagamento.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">DICT</div>
                            <div class="definition-desc">Diretório de Identificadores de Contas Transacionais.
                                Componente do PIX que armazena chaves PIX vinculadas às informações sobre os usuários
                                finais e suas correspondentes contas transacionais.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Grupo AQBank</div>
                            <div class="definition-desc">Empresas que fazem parte da Holding financeira da AQBank e que
                                poderão prestar os Serviços aos Clientes por meio de indicação da {{ theme?.data?.business?.name }}.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Lei de Proteção de Dados</div>
                            <div class="definition-desc">Lei nº 13.709/2018 (LGPD) e quaisquer outras leis e
                                regulamentos em relação ao tratamento, proteção e privacidade de dados pessoais.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Login</div>
                            <div class="definition-desc">CPF ou CNPJ e senha de acesso criados pelo Cliente para acesso
                                à Plataforma, após aceite destes Termos de Uso.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">MED</div>
                            <div class="definition-desc">Mecanismo exclusivo do PIX criado para facilitar as devoluções
                                em caso de fraudes, aumentando as possibilidades de a vítima reaver os recursos.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Participante Indireto</div>
                            <div class="definition-desc">AQBANK INSTITUIÇÃO DE PAGAMENTO LTDA (CNPJ/MF
                                00.377.239/0001-85), instituição de pagamento participante facultativa no PIX de forma
                                indireta no SPI.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">PIX</div>
                            <div class="definition-desc">Arranjo de pagamento instituído pelo Banco Central do Brasil,
                                que disciplina a prestação de serviços de pagamentos relacionados com as transações de
                                pagamentos instantâneos.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Plataforma</div>
                            <div class="definition-desc">Software de propriedade exclusiva da {{ theme?.data?.business?.name }} e as plataformas
                                digitais {{ theme?.data?.business?.name }}, incluindo o site e o aplicativo para dispositivos móveis.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Remuneração</div>
                            <div class="definition-desc">Valor devido ao Cliente, após desconto de tributos, taxas,
                                tarifas e demais previsões por força destes Termos.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">SPI</div>
                            <div class="definition-desc">Sistema de Pagamentos Instantâneos. Infraestrutura centralizada
                                e única para liquidação de pagamentos instantâneos entre instituições distintas no
                                Brasil.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Tarifa</div>
                            <div class="definition-desc">Valor que será pago pelo Cliente à {{ theme?.data?.business?.name }} pela utilização dos
                                Serviços prestados e contratados.</div>
                        </li>
                        <li class="definition-item">
                            <div class="definition-term">Transação</div>
                            <div class="definition-desc">Operação em que o Cliente realiza a movimentação de sua Conta,
                                realizando o carregamento, transferência ou resgate de recursos, por meio das
                                modalidades de pagamento disponíveis.</div>
                        </li>
                    </ul>
                </section>

                <section id="objeto" class="section">
                    <div class="section-header">
                        <div class="section-number">3</div>
                        <h2>Objeto</h2>
                    </div>

                    <p><strong>3.1.</strong> Estes Termos de Uso se aplicam e regulamentam os Serviços que serão
                        prestados pela {{ theme?.data?.business?.name }} ao Cliente, individualmente ou por intermédio da(s) Parceira(s), para:</p>

                    <ul class="roman-list">
                        <li>Cadastro e credenciamento do Cliente na Plataforma;</li>
                        <li>Criação de Conta de Pagamento, habilitando o Cliente para realizar Transações para
                            carregamento, transferência e resgate de recursos;</li>
                        <li>Gestão e custódia dos recursos mantidos na Conta de titularidade do Cliente.</li>
                    </ul>

                    <div class="info-box">
                        <p><strong>Importante:</strong> O Cliente se declara ciente de que a {{ theme?.data?.business?.name }} será exclusivamente
                            responsável pelos Serviços de tecnologia relacionados à Plataforma; e a(s) Parceira(s) serão
                            exclusivamente responsáveis pelos Serviços de pagamento prestados aos Clientes.</p>
                    </div>

                    <p><strong>3.3.</strong> Os serviços serão prestados pela {{ theme?.data?.business?.name }} de forma remota, mediante acesso do
                        Cliente à Plataforma {{ theme?.data?.business?.name }}.</p>

                    <p><strong>3.4.</strong> Em contraprestação à utilização dos Serviços prestados pela {{ theme?.data?.business?.name }}, o
                        Cliente pagará as tarifas estabelecidas neste Termos de Uso, se for o caso, e os valores
                        informados em Proposta Comercial.</p>

                    <p><strong>3.6.</strong> Por meio da Plataforma, o Cliente poderá:</p>

                    <ul class="roman-list">
                        <li>Realizar o carregamento e resgate dos recursos disponíveis em Conta;</li>
                        <li>Verificar o saldo e o extrato de movimentações relacionadas a Conta;</li>
                        <li>Pagar boletos bancários;</li>
                        <li>Realizar pagamentos instantâneos via Pix;</li>
                        <li>Utilizar quaisquer outras Funcionalidades que estejam disponíveis.</li>
                    </ul>

                    <p class="sub-clause"><strong>3.6.1.</strong> As funcionalidades disponíveis na Plataforma poderão
                        ser alteradas a qualquer momento e sem a necessidade de aviso prévio, de acordo com as regras da
                        Plataforma.</p>
                </section>

                <section id="servicos" class="section">
                    <div class="section-header">
                        <div class="section-number">4</div>
                        <h2>Dos Serviços {{ theme?.data?.business?.name }}</h2>
                    </div>

                    <p><strong>4.1.</strong> Tendo em vista a impossibilidade de funcionamento integral e ininterrupto
                        de qualquer sistema de telecomunicação ou de tecnologia, durante 365 dias por ano, 24 horas por
                        dia, inclusive em razão da dependência de serviços de telecomunicações prestados por terceiros,
                        a {{ theme?.data?.business?.name }} não garante, de nenhuma forma, a prestação dos Serviços de forma ininterrupta ou isenta
                        de erros e não se responsabiliza pela impossibilidade de realização de qualquer Transação
                        durante os períodos de indisponibilidade do Serviço.</p>

                    <p><strong>4.2.</strong> A {{ theme?.data?.business?.name }} irá prestar os serviços de acordo com as leis e regulamentos
                        aplicáveis à sua atividade.</p>

                    <p><strong>4.3.</strong> A {{ theme?.data?.business?.name }} não será responsável pela:</p>

                    <ul class="roman-list">
                        <li>Intermitência ou indisponibilidade de conexão à internet adotada pelo Cliente;</li>
                        <li>Incapacidade técnica do dispositivo móvel ou sistema operacional;</li>
                        <li>Atividades de pessoas não autorizadas na utilização dos Serviços da {{ theme?.data?.business?.name }}.</li>
                    </ul>
                </section>

                <section id="tarifas" class="section">
                    <div class="section-header">
                        <div class="section-number">5</div>
                        <h2>Cobrança de Tarifas e Remuneração</h2>
                    </div>

                    <p><strong>5.1.</strong> O valor das Tarifas devidas pelo Cliente à {{ theme?.data?.business?.name }} será composta por:</p>

                    <ul class="roman-list">
                        <li>Tarifa por Transação por Cartão;</li>
                        <li>Tarifa pela antecipação de pagamento das Transações com Cartão;</li>
                        <li>Tarifas por Transação realizada na Conta de Pagamento e demais Meios de Pagamento;</li>
                        <li>Demais tarifas previstas na Proposta Comercial, se aplicável.</li>
                    </ul>

                    <p><strong>5.2.</strong> O valor das Tarifas poderá ser atrelado a um determinado volume de
                        Transações realizadas pelo Cliente ou outras condições comerciais, conforme vier a ser acordado
                        pelas Partes.</p>

                    <p><strong>5.3.</strong> A {{ theme?.data?.business?.name }} poderá efetuar o reajuste ou alteração do valor das Tarifas
                        cobradas, assim como incluir novas Tarifas pela prestação dos Serviços, informando previamente o
                        Cliente, com antecedência mínima de 30 (trinta) dias.</p>

                    <div class="info-box">
                        <p><strong>5.4.</strong> Na hipótese de o Cliente não concordar com as alterações, poderá
                            encerrar a contratação de Serviços com a {{ theme?.data?.business?.name }}. A ausência de manifestação pelo Cliente
                            será interpretada como anuência e as novas Tarifas serão aplicadas.</p>
                    </div>

                    <p><strong>5.5.</strong> A Remuneração do Cliente será repassada de acordo com a modalidade
                        escolhida na proposta comercial e/ou Plataforma {{ theme?.data?.business?.name }}, após desconto de:</p>

                    <ul class="roman-list">
                        <li>Impostos, taxas e contribuições incidentes;</li>
                        <li>Eventuais débitos do Cliente por descumprimento de obrigações previstas nestes Termos;</li>
                        <li>Eventuais débitos decorrentes de cancelamento, Chargeback e outras hipóteses de estorno das
                            Transações;</li>
                        <li>Desconto das Tarifas e outras formas de remuneração devidas à {{ theme?.data?.business?.name }}.</li>
                    </ul>
                </section>

                <section id="suporte" class="section">
                    <div class="section-header">
                        <div class="section-number">6</div>
                        <h2>Suporte e Relacionamento com o Cliente</h2>
                    </div>

                    <p><strong>6.1.</strong> O suporte técnico e operacional ao Serviço para o Cliente será realizado
                        diretamente pela {{ theme?.data?.business?.name }} ou por terceiro contratado, através de telefone, chat virtual ou e-mail
                        informados nos sites e comunicações da {{ theme?.data?.business?.name }}.</p>

                    <p><strong>6.2.</strong> O Cliente não é autorizado a pronunciar-se em nome da {{ theme?.data?.business?.name }}, devendo
                        direcionar todos os questionamentos, suporte, auxílio ou outras necessidades de comunicação em
                        relação ao Serviço para o respectivo serviço de atendimento.</p>

                    <p><strong>6.3.</strong> O Cliente será responsável pelo atendimento e suporte ao seu Credenciado,
                        que inclui:</p>

                    <ul class="roman-list">
                        <li>Esclarecimento de dúvidas, atualizações cadastrais e obtenção de informações e documentos
                            para o credenciamento;</li>
                        <li>Comercialização, entrega, instalação, desinstalação e manutenção dos Equipamentos;</li>
                        <li>Todo atendimento relacionado com a utilização da Plataforma {{ theme?.data?.business?.name }}, inclusive sobre as
                            Tarifas cobradas pela utilização dos Serviços.</li>
                    </ul>
                </section>

                <section id="comunicacao" class="section">
                    <div class="section-header">
                        <div class="section-number">7</div>
                        <h2>Comunicação</h2>
                    </div>

                    <p><strong>7.1.</strong> O Cliente expressamente reconhece que a {{ theme?.data?.business?.name }} poderá contactá-lo por meio
                        telefônico e/ou aplicativos que permitem a troca de mensagens, áudios e vídeos pelo celular,
                        mensagens via correio eletrônico, mensagens via SMS e envio de mala direta, com cunho
                        institucional, técnico, comercial e informativo.</p>

                    <div class="info-box">
                        <p>Caso o Cliente não deseje mais ser contatado para estes fins, poderá solicitar o seu
                            cancelamento através de telefone, chat virtual ou e-mail informados nos sites e comunicações
                            da {{ theme?.data?.business?.name }}.</p>
                    </div>

                    <p><strong>7.2.</strong> A {{ theme?.data?.business?.name }} e os Parceiros contratados poderão contatar diretamente o Cliente
                        nos casos previstos em lei ou por decorrência de normativos específicos, assim como para
                        verificar o cumprimento das obrigações previstas no presente Termo.</p>
                </section>

                <section id="proibicoes" class="section">
                    <div class="section-header">
                        <div class="section-number">8</div>
                        <h2>Proibição de Práticas Imorais e/ou Ilegais</h2>
                    </div>

                    <p><strong>8.1.</strong> O Cliente não poderá, em nenhuma hipótese:</p>

                    <ul class="letter-list">
                        <li>Desrespeitar a lei, seja a brasileira ou a do local onde esteja sendo utilizado o Serviço,
                            inclusive as normas relativas à transmissão de dados e as normas de direito autoral e/ou
                            propriedade industrial;</li>
                        <li>Desrespeitar a moral, os bons costumes ou os direitos de terceiros à honra, à vida privada,
                            à imagem e à intimidade pessoal e familiar;</li>
                        <li>Usar linguagem ou imagem obscena, ofensiva ou indecente;</li>
                        <li>Transmitir ou propagar mensagem ou material ilegal, calunioso, injurioso, difamatório,
                            prejudicial, abusivo, ameaçador, vulgar, obsceno, ou de qualquer outra forma censurável;
                        </li>
                        <li>Transmitir ou propagar informações sobre atividades ilegais e incitação ao crime;</li>
                        <li>Transmitir ou propagar programas e arquivos que contenham vírus, inclusive "cavalos de
                            Tróia";</li>
                        <li>Enviar material publicitário não solicitado, inclusive spam, junk mail ou correntes de
                            correspondência;</li>
                        <li>Utilizar o Serviço de forma indevida para capital de giro, agiotagem, empréstimos, entre
                            outros;</li>
                        <li>Obter ou tentar obter acesso não-autorizado a outros sistemas ou redes de computadores
                            conectados ao Serviço;</li>
                        <li>Interferir ou interromper o Serviço ou os servidores ou redes conectadas ao Serviço;</li>
                        <li>Utilizar a marca da {{ theme?.data?.business?.name }}, inclusive fora dos estritos limites aqui autorizados.</li>
                    </ul>

                    <p><strong>8.2.</strong> O Cliente, em sua qualidade de fornecedor de produtos e/ou serviços,
                        obriga-se a cumprir todas as disposições legais e regulamentares aplicáveis à sua atividade, em
                        especial as referentes à proteção do consumidor.</p>

                    <p><strong>8.3.</strong> O Cliente declara estar ciente de que o Serviço e os demais serviços a que
                        tiver acesso em decorrência deste Termo, serão para uso exclusivo do Cliente, que não os poderá
                        comercializar, repassar ou ceder a terceiros a qualquer título.</p>
                </section>

                <section id="declaracoes" class="section">
                    <div class="section-header">
                        <div class="section-number">9</div>
                        <h2>Declarações, Direitos e Responsabilidades do Cliente</h2>
                    </div>

                    <p><strong>9.1.</strong> Enquanto pessoa jurídica, o Cliente declara que:</p>

                    <ul class="roman-list">
                        <li>Seu representante legal tem poderes para representá-la e obrigá-la no âmbito do presente
                            Termo;</li>
                        <li>Possui capacidade jurídica para celebrar e cumprir este Termo, não havendo nenhum
                            impedimento para tanto;</li>
                        <li>Ter condições econômicas de arcar com os pagamentos, custos e despesas decorrentes deste
                            Termo.</li>
                    </ul>

                    <p><strong>9.2.</strong> O Cliente, no ato da anuência e assinatura destes Termos, declara que
                        inexiste em seu nome qualquer condenação definitiva na esfera administrativa ou judicial,
                        notadamente por razões de combate à corrupção.</p>

                    <h3>Direitos do Cliente</h3>

                    <p><strong>9.3.</strong> O Cliente possui os seguintes direitos:</p>

                    <ul class="letter-list">
                        <li>Ter acesso e responsabilidade por toda e qualquer movimentação na Plataforma {{ theme?.data?.business?.name }};</li>
                        <li>Ter acesso a todas as movimentações realizadas, bem como contatar a {{ theme?.data?.business?.name }} em caso de
                            verificação de erros ou inconsistências;</li>
                        <li>Ser atendido pela {{ theme?.data?.business?.name }} por meio dos canais de atendimento;</li>
                        <li>Exercer seus direitos relativamente aos dados pessoais pertinentes;</li>
                        <li>Ter acesso, a qualquer momento, uma via eletrônica deste Termo por meio do site da {{ theme?.data?.business?.name }};
                        </li>
                        <li>Solicitar qualquer alteração e atualização cadastral por meio dos canais de atendimento.
                        </li>
                    </ul>

                    <div class="alert-box">
                        <p><strong>9.4.</strong> O CLIENTE ASSUMIRÁ TODA A RESPONSABILIDADE CIVIL E CRIMINAL PERANTE À
                            AQPAGO E TERCEIROS PELO DESCUMPRIMENTO DESTE TERMO, DA REGULAMENTAÇÃO E DA LEGISLAÇÃO. O
                            CLIENTE INDENIZARÁ A AQPAGO PRONTAMENTE QUAISQUER PREJUÍZOS QUE DER CAUSA.</p>
                    </div>

                    <p><strong>9.5.</strong> O Cliente será o único responsável pela segurança e confidencialidade de
                        suas credenciais de acesso à Plataforma {{ theme?.data?.business?.name }}.</p>

                    <p><strong>9.7.</strong> O Cliente será o único responsável pelo relacionamento com seus
                        Credenciados, principalmente:</p>

                    <ul class="roman-list">
                        <li>Validação e veracidade dos dados para criação, manutenção e encerramento das Contas de
                            Pagamento ("Conheça Seu Cliente/KYC");</li>
                        <li>Relacionamento e atendimento à toda e qualquer demanda do seu Cliente em razão dos Serviços
                            prestados pela {{ theme?.data?.business?.name }}.</li>
                    </ul>

                    <p><strong>9.8.</strong> Em caso de suspeita de fraude nas movimentações e transações do Cliente, a
                        {{ theme?.data?.business?.name }} poderá suspender o acesso do Cliente aos serviços e reter os valores até apuração das
                        investigações.</p>
                </section>

                <section id="baas" class="section">
                    <div class="section-header">
                        <div class="section-number">10</div>
                        <h2>Do Prestador da Solução Tecnológica como BaaS</h2>
                    </div>

                    <p><strong>10.1.</strong> Ao realizar o Cadastro na Plataforma e aderir a este Termos de Uso, o
                        Cliente concorda com a abertura de Conta de pagamento, diretamente no BaaS, à qual poderá ser
                        movimentada por meio dos Serviços.</p>

                    <p><strong>10.2.</strong> O BaaS é uma subcredenciadora e instituição de pagamento autorizada a
                        funcionar pelo Banco Central do Brasil, sujeita às obrigações previstas nas normas do BCB e do
                        COAF, além das regras dos instituidores de arranjo de pagamentos.</p>

                    <h3>Carregamento da Conta</h3>

                    <p><strong>10.5.</strong> O carregamento da Conta poderá ser realizado por um dos meios disponíveis
                        na Plataforma:</p>

                    <ul class="letter-list">
                        <li>Recebimento de recursos na Conta por meio de chave aleatória PIX;</li>
                        <li>Recebimento de recursos na Conta por meio de Open Finance;</li>
                        <li>Recebimento de recursos pela prestação de serviços do Cliente.</li>
                    </ul>

                    <h3>Utilização dos Recursos</h3>

                    <p><strong>10.6.</strong> Os recursos depositados na Conta poderão ser utilizados para transferência
                        ou resgate:</p>

                    <ul class="letter-list">
                        <li>Resgate de recursos, mediante transferência para a conta bancária de titularidade do
                            Cliente;</li>
                        <li>Pagamento de boletos através de Parceiro;</li>
                        <li>Carregamento e utilização do Cartão através de Parceiro;</li>
                        <li>Transferência de recursos por meio do PIX (através de Parceiro).</li>
                    </ul>

                    <div class="info-box">
                        <p><strong>10.7.</strong> Os recursos mantidos na Conta, salvo se expressamente pactuado de modo
                            diverso, não sofrerão qualquer tipo de acréscimo ou alteração, tais como correção monetária
                            e juros.</p>
                    </div>

                    <p><strong>10.12.</strong> Os recursos creditados na Conta do Cliente serão mantidos em conta
                        bancária de titularidade da Parceira, em instituição financeira de primeira linha, e, nos termos
                        do art. 12 da Lei 12.865/2013:</p>

                    <ul class="roman-list">
                        <li>Constituem patrimônio separado, que não se confunde com o da Parceira;</li>
                        <li>Não respondem direta ou indiretamente por nenhuma obrigação da Parceira;</li>
                        <li>Não podem ser dados em garantia de débitos assumidos pela Parceira;</li>
                        <li>Não compõem o ativo da Parceira, para efeito de falência ou liquidação judicial ou
                            extrajudicial.</li>
                    </ul>
                </section>

                <section id="estorno" class="section">
                    <div class="section-header">
                        <div class="section-number">11</div>
                        <h2>Estorno das Transações</h2>
                    </div>

                    <p><strong>11.1.</strong> Havendo a contestação, cancelamento ou estorno da Transação, o Cliente
                        será comunicado assim que a {{ theme?.data?.business?.name }} for notificada pela Parceira e/ou BaaS.</p>

                    <p class="sub-clause"><strong>11.1.1.</strong> Caberá ao Cliente obter e enviar todas as informações
                        e documentos necessários para que se possa afastar o cancelamento ou Chargeback das Transações,
                        no prazo máximo de 7 dias a partir da notificação.</p>

                    <p><strong>11.2.</strong> Caso as Credenciadoras ou Bandeiras deixem de realizar o repasse do valor
                        das Transações contestadas ou canceladas, por qualquer motivo, a {{ theme?.data?.business?.name }} deixará de realizar o
                        respectivo pagamento.</p>

                    <p><strong>11.3.</strong> No caso de inexistência de créditos, extinção do Termo ou qualquer outra
                        situação que dificulte ou impossibilite a compensação de valores, a {{ theme?.data?.business?.name }} comunicará o Cliente,
                        que deverá realizar o pagamento do saldo devedor dentro do prazo máximo de 10 dias a partir da
                        notificação.</p>

                    <div class="alert-box">
                        <p><strong>11.5.</strong> O Cliente assume, de forma solidária, nos termos dos artigos 264 e
                            seguintes do Código Civil, a responsabilidade nos casos de contestação, cancelamento ou
                            estorno da Transação.</p>
                    </div>
                </section>

                <section id="dados" class="section">
                    <div class="section-header">
                        <div class="section-number">12</div>
                        <h2>Proteção e Compartilhamento de Dados</h2>
                    </div>

                    <p><strong>12.1.</strong> Para a execução deste Termo, as Partes realizarão o tratamento de dados e
                        informações pessoais dos Titulares ("Dados Pessoais"), comprometendo-se a cumprir com a
                        legislação aplicável à proteção de dados pessoais, em especial a Lei Geral de Proteção de Dados
                        (Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).</p>

                    <p><strong>12.2.</strong> São considerados "Titulares" quaisquer pessoas físicas identificadas ou
                        identificáveis a quem se referem os Dados Pessoais objeto de tratamento, tais como sócios,
                        administradores, representantes, prepostos e empregados.</p>

                    <div class="info-box">
                        <p><strong>12.4.</strong> As Partes concordam que, no âmbito da execução deste Termo, atuarão
                            como <strong>CONTROLADORES CONJUNTOS</strong>, nos termos da legislação aplicável.</p>
                    </div>

                    <p><strong>12.6.</strong> Os Serviços prestados pela {{ theme?.data?.business?.name }} não envolvem o tratamento de Dados
                        Pessoais Sensíveis (origem racial ou étnica, opiniões políticas, crenças religiosas, dados
                        genéticos, biométricos, de saúde ou orientação sexual).</p>

                    <h3>Obrigações dos Controladores Conjuntos</h3>

                    <p><strong>12.7.</strong> Os CONTROLADORES CONJUNTOS obrigam-se a:</p>

                    <ul class="letter-list">
                        <li>Tratar os Dados Pessoais apenas para as finalidades estabelecidas neste Termo;</li>
                        <li>Não compartilhar dados pessoais com terceiros, salvo nas hipóteses previstas legalmente ou
                            contratualmente;</li>
                        <li>Manter sob sua guarda registros relativos às operações de tratamento de dados pessoais;</li>
                        <li>Informar ao outro CONTROLADOR sobre a correção, eliminação, anonimização ou bloqueio de
                            qualquer dado pessoal;</li>
                        <li>Prestar assistência ao outro CONTROLADOR e disponibilizar aos titulares informações sobre
                            seus dados pessoais;</li>
                        <li>Excluir, restituir ou eliminar de maneira segura os Dados Pessoais após cumpridas as
                            finalidades de tratamento.</li>
                    </ul>

                    <p><strong>12.8.</strong> Caberá a cada uma das Partes comunicar à outra, em até 24 (vinte e quatro)
                        horas, por escrito, sobre qualquer incidente de segurança verificado no curso das atividades de
                        tratamento de Dados Pessoais.</p>
                </section>

                <section id="confidencialidade" class="section">
                    <div class="section-header">
                        <div class="section-number">13</div>
                        <h2>Confidencialidade</h2>
                    </div>

                    <p><strong>13.1.</strong> São "Informações Confidenciais" todos os dados e informações revelados por
                        uma PARTE à outra, incluindo dados relativos às PARTES, seus colaboradores, negócios, produtos
                        ou serviços, estratégias comerciais, segredos comerciais, tecnologias, dados e bancos de dados,
                        invenções, software, procedimentos, clientes, parceiros comerciais, entre outras informações.
                    </p>

                    <p><strong>13.2.</strong> Não serão consideradas Informações Confidenciais os dados e informações
                        que:</p>

                    <ul class="roman-list">
                        <li>Tenham sido obtidos pela PARTE receptora de terceiro licitamente;</li>
                        <li>Tenham se tornado disponíveis ao público em geral por fato alheio à vontade das PARTES;</li>
                        <li>Tenham sido desenvolvidos pela PARTE receptora independentemente.</li>
                    </ul>

                    <p><strong>13.3.</strong> As Informações Confidenciais serão mantidas em estrito sigilo pela PARTE
                        receptora, sendo proibida a sua divulgação para qualquer pessoa ou entidade não autorizada.</p>

                    <div class="info-box">
                        <p><strong>13.7.</strong> As partes não divulgarão quaisquer DADOS CONFIDENCIAIS a terceiros
                            durante a vigência deste Termo, e por um período de <strong>05 (cinco) anos</strong> após o
                            encerramento ou eventual rescisão do presente instrumento.</p>
                    </div>

                    <p><strong>13.9.</strong> Ao concordar com estes Termos de Uso, o usuário declara estar ciente de
                        que seus dados poderão ser compartilhados entre as demais empresas do Grupo AQBank, conforme
                        necessário para a prestação dos serviços disponíveis.</p>
                </section>

                <section id="propriedade" class="section">
                    <div class="section-header">
                        <div class="section-number">14</div>
                        <h2>Propriedade Intelectual</h2>
                    </div>

                    <p><strong>14.1.</strong> O Cliente reconhece que é de titularidade da {{ theme?.data?.business?.name }} toda e qualquer
                        propriedade intelectual empregada na Plataforma, em seu website e em qualquer material criado e
                        disponibilizado pela {{ theme?.data?.business?.name }}, incluindo:</p>

                    <ul class="roman-list">
                        <li>Marcas, denominações sociais, nomes de serviços, slogans, trade dress, logotipos, nome de
                            domínio da internet e outros sinais distintivos;</li>
                        <li>Patentes, pedidos de patente, modelos de utilidade, certificados de adição;</li>
                        <li>Registros de desenhos industriais;</li>
                        <li>Direitos autorais, programas de computador, layouts, formas de apresentação, combinações de
                            cores, códigos fonte;</li>
                        <li>Segredos industriais e know-how.</li>
                    </ul>

                    <div class="alert-box">
                        <p><strong>14.3.</strong> O Cliente se compromete a não violar, reproduzir, imitar, total ou
                            parcialmente, qualquer propriedade intelectual da {{ theme?.data?.business?.name }}, sob pena de multa de <strong>R$
                                300.000,00</strong> (trezentos mil reais).</p>
                    </div>
                </section>

                <section id="prazo" class="section">
                    <div class="section-header">
                        <div class="section-number">15</div>
                        <h2>Prazo, Alterações e Rescisão</h2>
                    </div>

                    <p><strong>15.1.</strong> Este Termo será celebrado por prazo indeterminado, e entra em vigor a
                        partir do aceite e/ou data de conclusão de assinaturas pelo Cliente. Poderá ser rescindido, sem
                        multa e/ou penalidades, com pelo menos 30 (trinta) dias de antecedência.</p>

                    <p><strong>15.2.</strong> A {{ theme?.data?.business?.name }} poderá modificar, adicionar ou remover quaisquer cláusulas ou
                        condições destes Termos. Quando a alteração implicar restrição das condições inicialmente
                        pactuadas, a {{ theme?.data?.business?.name }} informará o Cliente com pelo menos 30 (trinta) dias de antecedência, EXCETO
                        EM RELAÇÃO ÀS TAXAS.</p>

                    <h3>Hipóteses de Rescisão</h3>

                    <p><strong>15.5.</strong> O presente Termo será rescindido e os Serviços interrompidos, de pleno
                        direito, sem a aplicação de qualquer penalidade, nos seguintes casos:</p>

                    <ul class="roman-list">
                        <li>Descumprimento por uma das partes de suas obrigações;</li>
                        <li>Inexatidão das declarações assumidas ou prestadas pelo Cliente;</li>
                        <li>Omissão, incorreção ou falsidade de qualquer informação do Cliente;</li>
                        <li>Falta de atualização das informações cadastrais;</li>
                        <li>Irregularidades graves nas informações prestadas pelo Cliente;</li>
                        <li>Fraude ou suspeita de fraude do Cliente;</li>
                        <li>Uso dos Serviços em desconformidade com a legislação aplicável;</li>
                        <li>Uso não convencional do Serviço que possa causar riscos à {{ theme?.data?.business?.name }};</li>
                        <li>Falecimento do Cliente;</li>
                        <li>Pedido de autofalência, recuperação judicial, insolvência ou dissolução do Cliente;</li>
                        <li>Oferta de produtos e serviços vedados a menores de 18 anos.</li>
                    </ul>

                    <div class="alert-box">
                        <p><strong>15.4.</strong> NA HIPÓTESE DE ENCERRAMENTO DOS SERVIÇOS, O CLIENTE DEVERÁ TOMAR AS
                            PROVIDÊNCIAS NECESSÁRIAS PARA RETIRAR OS RECURSOS DE SUA CONTA TRANSACIONAL MANTIDA JUNTO À
                            AQPAGO.</p>
                    </div>
                </section>

                <section id="disposicoes" class="section">
                    <div class="section-header">
                        <div class="section-number">16</div>
                        <h2>Disposições Gerais</h2>
                    </div>

                    <p><strong>16.1.</strong> O presente Termo constitui integral acordo entre as Partes, substituindo
                        todos os outros documentos, cartas, memorandos, e-mails ou propostas anteriores.</p>

                    <p><strong>16.2.</strong> Durante a vigência destes Termos, cada uma das Partes deverá cumprir e
                        respeitar as leis e regulamentações aplicáveis, incluindo a Lei Federal nº 12.846/2013, Código
                        Penal Brasileiro, Lei de Improbidade Administrativa, Lei de Lavagem de Dinheiro e suas
                        respectivas atualizações ("Leis Anticorrupção").</p>

                    <p><strong>16.3.</strong> A {{ theme?.data?.business?.name }} poderá ceder ou transferir, total ou parcialmente, os seus
                        direitos e obrigações decorrentes destes Termos para sociedades pertencentes ao seu grupo
                        econômico, independente de consentimento do Cliente.</p>

                    <p><strong>16.7.</strong> Estes Termos não estabelecem nenhum vínculo empregatício entre os
                        empregados do Cliente e os da {{ theme?.data?.business?.name }}.</p>

                    <p><strong>16.8.</strong> As Partes declaram que irão se abster de empregar mão de obra infantil ou
                        trabalho escravo, forçado, involuntário, compulsório ou degradante.</p>

                    <p><strong>16.11.</strong> Este Termo constitui título executivo extrajudicial, nos termos do art.
                        784, inciso II, da Lei nº 13.105/2015.</p>

                    <div class="info-box">
                        <p><strong>16.18.</strong> As Partes declaram e concordam que o aceite e a assinatura deste
                            Termo poderá ser realizada em formato eletrônico, reconhecendo a veracidade, autenticidade,
                            integridade, validade e eficácia deste.</p>
                    </div>

                    <p><strong>16.19.</strong> O presente Termo será regido pelas leis da República Federativa do
                        Brasil, ficando eleito o <strong>Foro Central da Comarca da Capital do Estado de São
                            Paulo</strong> para dirimir quaisquer controvérsias relativas às condições deste Termo.</p>
                </section>
            </main>
        </div>

        <script>
        // Highlight current section in navigation
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-list a');

        function highlightNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNav);
        highlightNav();
    </script>
    </div>
</template>
<script>
export default {
    name: "termosPage",
    layout: "DefaultLayout",
    computed: {

        theme() {
            return this.$store?.state?.theme?.data || null;
        },
    },
}
</script>
<style>
        :root {
          
            --aq-navy: #1A2B3C;
            --aq-gray-900: #1F2937;
            --aq-gray-700: #374151;
            --aq-gray-500: #6B7280;
            --aq-gray-300: #D1D5DB;
            --aq-gray-100: #F3F4F6;
            --aq-white: #FFFFFF;
            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            color: var(--aq-gray-700);
            line-height: 1.7;
            background: linear-gradient(180deg, var(--primaryop) 0%, var(--aq-white) 300px);
            min-height: 100vh;
        }

        /* Hero Section */
        .hero {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 2rem 3rem;
            text-align: center;
        }

        .hero h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 700;
            color: var(--aq-navy);
            margin-bottom: 1rem;
        }

        .hero-subtitle {
            font-size: 1.125rem;
            color: var(--aq-gray-500);
            max-width: 700px;
            margin: 0 auto 1.5rem;
        }

        .hero-meta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--aq-gray-500);
            font-size: 0.875rem;
        }

        .meta-icon {
            width: 20px;
            height: 20px;
            color: var(--primary);
        }

        /* Layout */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem 4rem;
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 3rem;
        }

        @media (max-width: 900px) {
            .container {
                grid-template-columns: 1fr;
            }
        }

        /* Sidebar Navigation */
        .sidebar {
            position: sticky;
            top: 20px;
            height: fit-content;
        }

        @media (max-width: 900px) {
            .sidebar {
                position: relative;
                top: 0;
            }
        }

        .nav-card {
            background: var(--aq-white);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--aq-gray-100);
        }

        .nav-title {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--aq-gray-500);
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--aq-gray-100);
        }

        .nav-list {
            list-style: none;
            max-height: 70vh;
            overflow-y: auto;
        }

        .nav-list::-webkit-scrollbar {
            width: 4px;
        }

        .nav-list::-webkit-scrollbar-track {
            background: var(--aq-gray-100);
            border-radius: 4px;
        }

        .nav-list::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 4px;
        }

        .nav-list li {
            margin-bottom: 0.25rem;
        }

        .nav-list a {
            display: block;
            padding: 0.5rem 0.75rem;
            color: var(--aq-gray-700);
            text-decoration: none;
            font-size: 0.8125rem;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .nav-list a:hover {
            background: var(--primaryop);
            color: var(--primary);
        }

        .nav-list a.active {
            background: var(--primary);
            color: white;
            font-weight: 500;
        }

        /* Main Content */
        .content {
            background: var(--aq-white);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--aq-gray-100);
        }

        @media (max-width: 600px) {
            .content {
                padding: 1.5rem;
                border-radius: 16px;
            }
        }

        /* Typography */
        .section {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--aq-gray-100);
        }

        .section:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .section-number {
            width: 40px;
            height: 40px;
            background: var(--primary) ;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            flex-shrink: 0;
        }

        h2 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--aq-navy);
        }

        h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--aq-navy);
            margin: 1.5rem 0 0.75rem;
        }

        h4 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            color: var(--aq-navy);
            margin: 1.25rem 0 0.5rem;
        }

        p {
            margin-bottom: 1rem;
            color: var(--aq-gray-700);
        }

        /* Info Box */
        .info-box {
            background: var(--primaryop);
            border-left: 4px solid var(--primary);
            padding: 1.25rem 1.5rem;
            border-radius: 0 12px 12px 0;
            margin: 1.5rem 0;
        }

        .info-box p {
            margin: 0;
            color: var(--aq-gray-700);
        }

        .info-box strong {
            color: var(--primary);
        }

        /* Alert Box */
        .alert-box {
            background: #FEF3C7;
            border: 1px solid #F59E0B;
            padding: 1.25rem 1.5rem;
            border-radius: 12px;
            margin: 1.5rem 0;
        }

        .alert-box p {
            margin: 0;
            color: #92400E;
            font-weight: 500;
        }

        /* Parties Card */
        .parties-card {
            border-radius: 16px;
            padding: 2rem;
            margin: 1.5rem 0;
        }

        .parties-card h4 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: var(--primaryop);
        }

        .parties-card p {
            margin-bottom: 1rem;
        }

        .parties-card p:last-child {
            margin-bottom: 0;
        }

        .parties-card strong {
            color: var(--primary);
        }

        /* Definition List */
        .definition-list {
            list-style: none;
            margin: 1rem 0;
        }

        .definition-item {
            padding: 1rem 0;
            border-bottom: 1px solid var(--aq-gray-100);
        }

        .definition-item:last-child {
            border-bottom: none;
        }

        .definition-term {
            font-weight: 600;
            color: var(--aq-navy);
            margin-bottom: 0.25rem;
        }

        .definition-desc {
            color: var(--aq-gray-500);
            font-size: 0.9375rem;
        }

        /* Clause List */
        .clause-list {
            list-style: none;
            margin: 1rem 0;
        }

        .clause-item {
            padding: 0.75rem 0;
            padding-left: 1.5rem;
            position: relative;
            border-bottom: 1px solid var(--aq-gray-100);
        }

        .clause-item:last-child {
            border-bottom: none;
        }

        .clause-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 1.1rem;
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
        }

        .clause-item p {
            margin: 0;
        }

        /* Sub-clause styling */
        .sub-clause {
            margin-left: 1.5rem;
            padding: 0.5rem 0;
            color: var(--aq-gray-500);
            font-size: 0.9375rem;
        }

        /* Letter list */
        .letter-list {
            list-style: none;
            margin: 1rem 0 1rem 1rem;
        }

        .letter-list li {
            padding: 0.5rem 0;
            padding-left: 2rem;
            position: relative;
            color: var(--aq-gray-600);
        }

        .letter-list li::before {
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: 600;
        }

        .letter-list li:nth-child(1)::before { content: 'a)'; }
        .letter-list li:nth-child(2)::before { content: 'b)'; }
        .letter-list li:nth-child(3)::before { content: 'c)'; }
        .letter-list li:nth-child(4)::before { content: 'd)'; }
        .letter-list li:nth-child(5)::before { content: 'e)'; }
        .letter-list li:nth-child(6)::before { content: 'f)'; }
        .letter-list li:nth-child(7)::before { content: 'g)'; }
        .letter-list li:nth-child(8)::before { content: 'h)'; }
        .letter-list li:nth-child(9)::before { content: 'i)'; }
        .letter-list li:nth-child(10)::before { content: 'j)'; }
        .letter-list li:nth-child(11)::before { content: 'k)'; }

        /* Roman list */
        .roman-list {
            list-style: none;
            margin: 1rem 0 1rem 1rem;
        }

        .roman-list li {
            padding: 0.5rem 0;
            padding-left: 2.5rem;
            position: relative;
            color: var(--aq-gray-600);
        }

        .roman-list li::before {
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: 600;
        }

        .roman-list li:nth-child(1)::before { content: '(i)'; }
        .roman-list li:nth-child(2)::before { content: '(ii)'; }
        .roman-list li:nth-child(3)::before { content: '(iii)'; }
        .roman-list li:nth-child(4)::before { content: '(iv)'; }
        .roman-list li:nth-child(5)::before { content: '(v)'; }
        .roman-list li:nth-child(6)::before { content: '(vi)'; }
        .roman-list li:nth-child(7)::before { content: '(vii)'; }
        .roman-list li:nth-child(8)::before { content: '(viii)'; }
        .roman-list li:nth-child(9)::before { content: '(ix)'; }
        .roman-list li:nth-child(10)::before { content: '(x)'; }
        .roman-list li:nth-child(11)::before { content: '(xi)'; }

        /* Intro Section */
        .intro-section {
            margin-bottom: 2.5rem;
        }

        .intro-section p {
            font-size: 1.0625rem;
            line-height: 1.8;
        }

        .intro-section .lead {
            font-size: 1.125rem;
            color: var(--aq-gray-900);
            font-weight: 500;
        }

        /* Document Badge */
        .doc-badges {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin: 1rem 0;
        }

        .doc-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: var(--aq-gray-100);
            border-radius: 2rem;
            font-size: 0.8125rem;
            color: var(--aq-gray-700);
        }

        .doc-badge-icon {
            width: 16px;
            height: 16px;
            color: var(--primary);
        }

        /* Animated elements */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .section {
            animation: fadeInUp 0.5s ease forwards;
        }

        /* Print Styles */
        @media print {
            .sidebar {
                display: none;
            }
            
            .container {
                grid-template-columns: 1fr;
            }
            
            .content {
                box-shadow: none;
                border: none;
            }
        }
    </style>