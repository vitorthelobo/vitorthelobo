# Dossiê — Procurement Autopilot (Desafio 39)

Pesquisa de mercado para validação da ideia · Hackathon sprint · Ago/2026

> **Veredito em 3 linhas:** a dor existe dos dois lados e é grande, recente e documentada — descoberta de fornecedor "às cegas" para quem compra, aquisição de cliente cara e calote para quem vende. A ideia de plataforma dois lados + perfis + score **não existe de forma dominante no formato exato** no Brasil, mas existe **parcialmente em cada nicho grande** (Zax, Bionexo, Juntos Somos Mais, Mercado Eletrônico). O maior risco da ideia é o clássico *cold start* de marketplace — por isso a recomendação final é começar pelo **autopilot de cotação (valor single-player)** e deixar a rede/score como consequência, não como pré-requisito.

---

## 1. Dores dos COMPRADORES

1. **Descoberta às cegas.** 51% dos compradores B2B dizem que *identificar o fornecedor/solução certa* é a etapa mais difícil e demorada de todo o processo de compra (6sense, 2025). A busca real acontece via Google, indicação e WhatsApp, sem dado estruturado.
2. **Confiança e golpe.** O "golpe do falso fornecedor" (pagamento antecipado via Pix a empresa de fachada) é padrão recorrente; fraudes financeiras somaram **R$ 10,1 bi no Brasil em 2024** (+17% a.a., Febraban). Um único esquema no setor de autopeças movimentou ~R$ 6 mi.
3. **Informação imprecisa.** 81% dos compradores B2B sofrem com dados incorretos de preço/estoque/prazo, e **75% trocariam de fornecedor por causa disso** (Sana Commerce, 2025).
4. **Vaivém de cotação por e-mail/WhatsApp.** Só montar uma lista inicial confiável de fornecedores leva **até 5 semanas em média** (TealBook). O ciclo de RFQ é feito em planilha, sem padrão.
5. **Comparação maçã-com-laranja.** Unidades, frete, impostos, prazos e pagamento diferentes em cada proposta; sem histórico de preços para saber se a oferta é boa.
6. **Sem poder de barganha.** Pequenos negócios compram pouco e pagam mais caro; pesquisa Sebrae/IBGE (Pulso dos Pequenos Negócios) aponta exatamente essa desvantagem — e 77% relataram alta de custos em 30 dias.
7. **Pedido mínimo (MOQ) e condições hostis à PME.** Fornecedor bom prioriza cliente grande.
8. **Homologação/cadastro lento.** Onboarding de fornecedor leva de 2–3 semanas (simples) a 4+ semanas (complexo); metas de mercado ficam em 30–45 dias.
9. **Erro operacional.** 33% dos pedidos B2B feitos online em 2025 continham erros (Sana) — por e-mail/WhatsApp é pior.
10. **Compra complexa e sem recurso.** 77% dos compradores B2B classificam sua última compra como "muito complexa ou difícil" (Gartner); 42% trocam de fornecedor por atendimento ruim; quando dá errado, não há avaliação pública nem garantia.

## 2. Dores dos FORNECEDORES

1. **Custo de aquisição de cliente (CAC) alto.** Dependência de indicação, feiras e representantes comerciais (comissão + conflito de canal + zero visibilidade de pipeline).
2. **Cotação fantasma.** Cliente pede orçamento e some; propostas paradas semanas; cotações usadas só para pressionar o fornecedor atual. Follow-up manual se perde.
3. **Risco de crédito do comprador.** **8,9 milhões de CNPJs inadimplentes** no Brasil (dez/2025, recorde histórico), com **R$ 213 bi** em dívidas negativadas — 8,5 mi são micro e pequenas empresas (Serasa Experian). O fornecedor vende a prazo sem saber para quem.
4. **Prazo e caixa.** 77% das transações B2B no Brasil são a prazo (R$ 4,1 tri, Qive); prazo médio de pagamento no Brasil chega a **66 dias** (Coface). Recuperação de dívida despenca de 82% (até 10 dias de atraso) para ~50% (20+ dias) e ≤12% (180+ dias).
5. **Invisibilidade digital.** Penetração digital do B2B brasileiro é **inferior a 3%** de um mercado de R$ 2,2 tri/ano; catálogo em PDF desatualizado, pedidos por e-mail/WhatsApp/representante.
6. **Guerra de preço.** Sem perfil, avaliação ou diferenciação visível, o comprador compara só preço (leilão para o fundo).
7. **Operação comercial manual.** Tabela de preço desatualizada, pedido digitado errado, retrabalho.
8. **Homologação repetida.** Cada cliente grande exige o mesmo pacote de documentos de novo.
9. **Churn silencioso.** 75% dos compradores se dizem dispostos a trocar de fornecedor (Sana); o fornecedor raramente sabe por quê.
10. **Demanda invisível.** Compradores ativos procurando exatamente o que ele vende nunca o encontram.

---

## 3. Respostas às 6 perguntas

### 3.1 Nichos que concentram as VENDAS (volume)

Atacado distribuidor brasileiro faturou **R$ 616,6 bi em 2025** (ABAD/NielsenIQ). Participação por categoria:

| Categoria | Share |
|---|---|
| Alimentos | 45,5% |
| Higiene e beleza | 17,2% |
| Outros | 14,7% |
| Material de construção | 8,1% |
| Bebidas | 7,5% |
| Bazar | 7,1% |

Leitura: **alimentos + bebidas + higiene ≈ 70%** do atacado tradicional — categorias de recompra frequente (compra semanal/mensal), o que importa para um produto de recorrência. Fora do atacado clássico, pesam ainda insumos industriais/MRO, embalagens e saúde (a Bionexo sozinha processa ~5.000 cotações/dia só em produtos hospitalares).

### 3.2 Nichos de fornecedores mais PROCURADOS (demanda de busca, não volume)

Proxy: conteúdo de busca, polos físicos e o mercado paralelo de "listas de fornecedores".

- **Moda/confecção** — o mais procurado; nichos fitness, plus size, moda evangélica e infantil; polos Brás, 25 de Março, Goiânia, Blumenau/Jaraguá do Sul. É o nicho onde nasceu a Zax.
- **Cosméticos e beleza** (revenda e white label)
- **Produtos pet** (presentes em ~50% dos lares brasileiros)
- **Artigos infantis**
- **Casa e decoração / utilidades**
- **Alimentos artesanais, suplementos e gourmet** (setor cresceu 18,4% no e-commerce em 2024)
- **Eletrônicos e acessórios para revenda**

**Sinal de demanda forte:** pessoas literalmente **pagam por listas de fornecedores** — e-books e cursos no Hotmart vendem "2.500 contatos de fornecedores", "170 fornecedores por nicho", além de grupos pagos de WhatsApp. Existe mercado informal inteiro monetizando só a *descoberta* — sem resolver confiança nem cotação.

### 3.3 Quanto tempo demora para achar fornecedor

| Etapa | Tempo típico | Fonte |
|---|---|---|
| Montar lista inicial confiável | **~5 semanas** | TealBook |
| Resposta de cotação (RFQ) séria | 15–30 dias úteis | Guelcos (padrão internacional) |
| Homologação/onboarding | 2–3 semanas (simples) a 4+ (complexo); metas 30–45 dias | Precoro, Veridion, KPI Depot |
| Ciclo completo (necessidade → pedido) | semanas a meses | — |
| PME informal (Google/WhatsApp/indicação) | horas a dias — mas **às cegas**, sem validação | — |

Contexto Gartner: 77% acham a compra B2B muito complexa; o comprador passa só **17% do tempo do processo** falando com fornecedores (o resto é pesquisa e alinhamento interno); 67% preferem jornada sem vendedor.

### 3.4 Principais problemas no fluxo de compra e venda

| Etapa | Problema | De quem dói mais |
|---|---|---|
| Especificação | Necessidade mal descrita → cotações incomparáveis | Ambos |
| Busca | Google/indicação/WhatsApp, sem dado de confiabilidade | Comprador |
| Cotação | RFQ por e-mail sem padrão; fornecedor demora ou não responde; cotação fantasma | Ambos |
| Comparação | Planilha manual; unidades/frete/imposto/prazo diferentes; sem histórico de preço | Comprador |
| Negociação | Sem benchmark; pequeno não tem barganha | Comprador |
| Pedido | Digitação manual; 33% dos pedidos com erro | Ambos |
| Entrega | Sem tracking; atraso vira parada de produção/venda | Comprador |
| Pagamento | Prazo médio 66 dias; inadimplência recorde; cobrança manual | Fornecedor |
| Recompra/avaliação | Experiência não vira dado; conhecimento preso na cabeça do comprador; recompra não trabalhada | Ambos |

### 3.5 Perdas financeiras e de recursos (por lado)

**Lado do comprador**
- **Sobrepreço por compra fora de contrato/processo ("maverick spend")**: 5–16% das economias negociadas se perdem (The Hackett Group); estimativas chegam a 20% do potencial de savings.
- **Custo de processar pedido manualmente**: US$ 14–54 por pedido (APQC); outras análises apontam US$ 50–150.
- **Golpes**: pagamento antecipado a fornecedor falso (parte dos R$ 10,1 bi/ano de fraudes).
- **Erros e retrabalho**: 33% de pedidos com erro → devolução, estoque errado, frete duplo.
- **Parada operacional**: atraso de fornecedor único = prateleira vazia ou produção parada.
- **Horas de gente cara**: semanas de um sócio/comprador montando planilha de cotação.

**Lado do fornecedor**
- **Inadimplência**: R$ 213 bi negativados; vender a prazo (77% das transações) sem análise = perda direta; após 20 dias de atraso, só ~50% se recupera.
- **Capital de giro travado**: receber em 66 dias em média força desconto ou antecipação cara.
- **CAC desperdiçado**: feiras, representantes e horas cotando para clientes que somem (cotação fantasma).
- **Margem corroída**: guerra de preço por indiferenciação.
- **Churn não detectado**: cliente troca em silêncio (75% dispostos a trocar).

### 3.6 Oportunidades perdidas

**Pelos vendedores (fornecedores)**
1. Demanda ativa que nunca os encontra (invisibilidade digital em mercado com <3% de penetração).
2. Recompra e cross-sell não trabalhados (sem CRM, sem gatilho de reposição).
3. Vender para bons pagadores fora do radar geográfico/da rede de indicação.
4. Inteligência de mercado: nunca sabem o que está sendo cotado e a que preço (a Bionexo monetiza isso com índice de preços).
5. Usar reputação real (entregas no prazo) como ativo comercial — hoje ela não existe em lugar nenhum.

**Pelos compradores**
1. Fornecedores melhores/mais baratos que nunca conhecem (ficam no 1º que respondeu).
2. Segundo fornecedor (dual sourcing) — resiliência barata que quase nenhuma PME tem.
3. Negociar com histórico de preço (hoje negociam no escuro).
4. Compra agregada com pares do mesmo nicho (volume = desconto).
5. Usar o próprio histórico de bom pagador para conseguir prazo/desconto — o "score reverso" que hoje não existe fora do crédito bancário.

---

## 4. Cinco formas de resolver a conexão fornecedor ↔ comprador

1. **Marketplace dois lados com perfil + avaliação + score bilateral** (a ideia do time) — rede de confiança; transação dentro da plataforma.
2. **Autopilot de cotação** (o Desafio 39 literal): comprador descreve a necessidade → sistema acha/consulta fornecedores, dispara RFQ padronizada, estrutura as respostas e devolve **comparativo pronto para decisão** + histórico de preço. Funciona sem os dois lados estarem na plataforma (usa e-mail/WhatsApp dos fornecedores existentes + bases públicas de CNPJ).
3. **Camada de confiança**: verificação + dossiê de fornecedor (CNPJ, idade, sócios, processos, reputação) com selo — dado, não transação. "Serasa da relação comercial".
4. **Diretório curado de UM nicho** com botão "pedir cotação" (curadoria manual, liquidez concentrada).
5. **Central/rede de compras por nicho**: agregação de demanda de várias PMEs para ganhar preço (ou versão concierge: matchmaker humano assistido por IA).

---

## 5. Pré-mortem da ideia do time (plataforma + perfis + score)

### 5.1 Oportunidades que ela cria
- **Dado proprietário como moat**: histórico de preços + avaliações de transações reais não existem em lugar nenhum de forma horizontal; quem acumular primeiro vira referência (efeito Reclame Aqui/Serasa).
- **Score bilateral é o diferencial real**: Serasa cobre crédito; avaliações públicas cobrem B2C. Ninguém diz "esse COMPRADOR paga em dia" + "esse FORNECEDOR entrega no prazo". Isso destrava o que os dois lados mais querem.
- **Fintech embutida é a monetização grande**: score confiável → oferecer prazo (net-60), antecipação de recebíveis e garantia de transação. A Faire provou o modelo: o gancho dela não é o catálogo, é **pagar em 60 dias com risco absorvido pela plataforma**.
- **Mercado gigante e cru**: B2B digital BR = R$ 2,2 tri com <3% online, crescendo ~18% a.a.
- **Dados agregados** (benchmark de preço por categoria) viram produto próprio.

### 5.2 Furos e problemas (a parte sincera)
1. **Cold start dos dois lados** — o assassino clássico de marketplace. Comprador só vem se tiver fornecedor; fornecedor só vem se tiver demanda. Em hackathon, efeito de rede é **indemonstrável**.
2. **Horizontal demais = liquidez zero.** "Fornecedores de tudo" dilui a oferta; todos os cases que funcionaram são de nicho (Zax = moda, Bionexo = saúde, Clubbi = minimercado, JSM = construção).
3. **Desintermediação.** Depois do 1º contato, os dois lados migram para o WhatsApp e a plataforma não vê mais nada — take rate morre. (Zax contornou cobrando mensalidade, não comissão; Faire cobra só no 1º pedido do lojista novo.)
4. **Score frio + manipulável.** Sem transações não há avaliação (ovo-galinha da confiança); avaliações compradas/de fachada; risco jurídico real de um score público de empresas (difamação, concorrência desleal) e responsabilização se um fornecedor "verificado" aplicar golpe.
5. **Seleção adversa.** Fornecedor excelente já tem carteira cheia; quem corre para se cadastrar tende a ser quem não vende. Sem curadoria, a plataforma nasce com estoque ruim.
6. **Verificação custa caro.** KYC/antifraude/checagem de documentos têm custo por fornecedor; quem paga essa conta no início?
7. **Concorrência real não é outra startup** — é o hábito: WhatsApp + Google + indicação custam zero. E cada nicho grande já tem player forte (tabela abaixo).

### 5.3 Dores que ela resolve (se superar os furos)
Descoberta às cegas (dor nº 1 do comprador) · confiabilidade/golpe · comparação padronizada · CAC do fornecedor · risco de crédito (se o score incluir comportamento de pagamento) · invisibilidade digital do fornecedor.

### 5.4 Existe no mercado? (exato vs. parcial)

**Exatamente igual** (horizontal, PME, perfil dos dois lados, avaliação + score bilateral, Brasil): **não encontramos player dominante**. Existem tentativas pequenas (ex.: Fornecefy) — sinal de que a tese ocorre a outros, sem vencedor ainda.

**Parcialmente:**

| Player | O que faz | O que NÃO faz do conceito do time |
|---|---|---|
| **Faire** (EUA/UE) | O mais próximo em mecânica: marketplace atacado marca↔lojista, perfis, avaliações, descoberta por ML, **net-60 com risco de crédito absorvido**, devolução grátis no 1º pedido; 15%+US$10 no 1º pedido, recompra sem comissão | Não atua no Brasil; foco lifestyle/varejo independente; score não é público/bilateral |
| **Zax** (BR) | Marketplace B2B de moda (Brás): 1.000+ fornecedores, sem pedido mínimo, lojista paga em até 90 dias, fornecedor recebe em 24h, mensalidade sem comissão; R$ 43 mi captados | Só moda; sem score bilateral público; descoberta limitada ao catálogo |
| **Bionexo** (BR) | Cotações saúde: 2.500+ compradores, ~5.000 cotações/dia, índice de preços próprio | Só saúde; enterprise; sem score de comprador |
| **Mercado Eletrônico / Nimbi** (BR) | E-procurement enterprise: RFQ com mapa comparativo, leilão reverso, homologação, validação Receita/Caixa; ME declara 1 mi de fornecedores e R$ 100 bi+/ano | Vendido para grandes empresas (caro/complexo); PME está fora; sem reputação pública |
| **Juntos Somos Mais** (BR) | Ecossistema construção civil (indústria↔loja↔profissional), fidelidade + marketplace | Só construção; nasce da indústria, não neutro |
| **Clubbi** (BR) | Abastecimento de minimercados | Só nicho grocery/regional |
| **B2Brazil** (BR) | Diretório/marketplace B2B com verificação, foco comércio exterior | Descoberta estática; sem fluxo de cotação rico nem score bilateral |
| **Serasa Experian** | Score de crédito por CNPJ | Só crédito; não cobre entrega/qualidade/comportamento comercial; caro para PME consultar sempre |
| **Reclame Aqui** | Reputação pública de empresas | B2C, sem transação, sem lado do comprador |
| **Alibaba** | RFQ global + Verified Supplier + Trade Assurance | Importação; não resolve fornecedor nacional/prazo/NF |
| **Listas do Hotmart / grupos de WhatsApp** | Vendem a descoberta crua (2.500 contatos etc.) | Zero validação, zero cotação — mas provam que **pagam pela dor** |

---

## 6. Cinco soluções alternativas mais rápidas de validar

| # | Solução | Furos | Oportunidades | Validação |
|---|---|---|---|---|
| 1 | **Cotador Autopilot** — comprador descreve a necessidade (chat/WhatsApp); IA monta RFQ, dispara para fornecedores dele + base pública, estrutura respostas em comparativo com recomendação | Taxa de resposta dos fornecedores; parsing de respostas bagunçadas; frete/imposto complicam comparação | **Valor single-player (sem cold start)**; é o Desafio 39 literal; histórico de preço nasce como subproduto; demo real em 1 dia | Concierge: rodar 2–3 compras reais no próprio sprint |
| 2 | **Dossiê do Fornecedor** — cola CNPJ/site e recebe checagem de risco (Receita/BrasilAPI, idade, sócios, processos, reputação, presença digital) | Disposição a pagar baixa isolada; dados de crédito bons são pagos; não resolve descoberta | Ataca a dor nº 1 (confiança/golpe); construível no sprint com APIs públicas; vira módulo de qualquer solução futura | Landing + 20 testes com lojistas reais |
| 3 | **Diretório curado de UM nicho** (ex.: confecção ou embalagens) com "pedir cotação" | Curadoria manual não escala; SEO demora; cold start reduzido mas presente | Liquidez concentrada; começa com planilha+Instagram; listas pagas do Hotmart provam disposição a pagar | 50 fornecedores curados + fila de espera de compradores |
| 4 | **Compra agregada por nicho** (juntar pedidos de várias PMEs) | Coordenação, logística e faturamento complexos; confiança entre concorrentes; ciclo longo | Ataca a dor Sebrae (sem barganha); desconto mensurável = proposta de valor óbvia | Não cabe no sprint; teste com 1 grupo de WhatsApp existente |
| 5 | **Leilão reverso de necessidades** (comprador publica, fornecedores dão lance) | Corrida ao fundo no preço afasta fornecedores bons; precisa dos dois lados; qualidade despenca | Demo chamativa; funciona em commodities | Arriscada como tese principal |

### ⭐ SELETAS — recomendação para o sprint

**MVP = Solução 1 + Solução 2** ("Autopilot de cotação com camada de confiança"), com o marketplace + score do time como **visão de roadmap**, não como MVP:

1. **Hoje (demo):** comprador diz o que precisa → agente monta a RFQ, consulta fornecedores (e-mail/WhatsApp + base pública de CNPJ), devolve comparativo pronto para decisão com dossiê de risco de cada fornecedor.
2. **Amanhã (produto):** cada compra alimenta histórico de preços e avaliações de transação **reais** — resolvendo o problema do "score frio".
3. **Depois (visão):** com liquidez e dados, vira a rede com perfis + score bilateral + fintech (prazo garantido estilo Faire).

Essa sequência elimina o furo nº 1 (cold start), entrega o Desafio 39 na letra, e transforma o marketplace de aposta arriscada em consequência natural dos dados. No pitch: a demo é o autopilot; o score é o final da história, não o começo.

### Validação em horas (durante o hackathon)
- 5 entrevistas com quem compra (lojista/PME) + 5 com quem vende — perguntar a última compra difícil, quanto tempo levou, onde perdeu dinheiro.
- 1 concierge test: pegar uma necessidade real de alguém do evento e rodar a cotação manualmente com o fluxo do autopilot.
- Landing A/B: "receba 3 cotações comparadas em 48h" vs. "verifique seu fornecedor antes de pagar" — medir cliques/cadastros.

---

## Fontes principais

- 6sense — [B2B Buyer Experience Report 2025](https://6sense.com/science-of-b2b/buyer-experience-report-2025/) (51% descoberta como etapa mais difícil)
- Gartner — [B2B Buying Journey](https://www.gartner.com/en/sales/insights/b2b-buying-journey) e [pesquisa 2026](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) (77% compra complexa; 17% do tempo com fornecedores; 67% rep-free)
- Sana Commerce — [B2B Buyer Report 2025](https://www.sana-commerce.com/news/b2b-buyer-report-2025/) (81% dados imprecisos; 75% trocariam; 33% pedidos com erro)
- TealBook via [Veridion](https://veridion.com/insights/articles/supplier-onboarding-checklist) (~5 semanas para lista inicial); [Precoro](https://precoro.com/blog/supplier-onboarding/) e [KPI Depot](https://kpidepot.com/kpi/supplier-onboarding-time) (onboarding 2–4+ semanas, metas 30–45 dias)
- APQC — [custo por pedido de compra](https://www.apqc.org/resource-library/resource/how-efficient-your-procurement-process-benchmarks-reveal-wide-performance) (US$ 14–54+); [Ascend](https://www.ascendsoftware.com/blog/the-average-cost-of-processing-a-purchase-order-a-detailed-analysis) (US$ 50–150)
- The Hackett Group via [Sievo](https://sievo.com/blog/maverick-spend) e [Zoho](https://www.zoho.com/procurement/academy/procurement/maverick-spend-in-procurement-a-guide-to-identifying-and-preventing-it.html) (maverick spend: 5–16% das economias perdidas)
- Serasa Experian — [inadimplência recorde 2025](https://www.serasaexperian.com.br/sala-de-imprensa/indicadores/recorde-historico-empresas-encerraram-2025-com-rdollar-213-bilhoes-em-dividas-e-inadimplencia-no-maior-patamar-ja-registrado-aponta-serasa-experian/) (8,9 mi CNPJs; R$ 213 bi)
- Coface/Qive via [CartaCapital](https://www.cartacapital.com.br/do-micro-ao-macro/pagamentos-b2b-brasil-prazo/) (77% a prazo; 66 dias); [IGR](https://saladeimprensa.intelligenzia.com.br/releases/mercado-b2b-sofre-para-recuperar-debitos-com-mais-de-20-dias-de-atraso-aponta-estudo/792500) (recuperação por faixa de atraso)
- Febraban via [CartaCapital](https://www.cartacapital.com.br/do-micro-ao-macro/banco-alerta-para-golpe-do-falso-fornecedor-e-orienta-para-prevencao/) (R$ 10,1 bi em fraudes 2024); [Sincopeças](https://portaldaautopeca.com.br/noticias/local/golpe-da-loja-falsa-traz-prejuizos-economicos-e-reputacionais-ao-varejo-de-autopecas/) (golpe autopeças R$ 6 mi)
- ABAD/NielsenIQ — [faturamento e categorias 2025](https://abad.com.br/indicadores/atacado-distribuidor-chega-a-r-6166-bilhoes-de-faturamento-e-reforca-protagonismo-nacional/) (R$ 616,6 bi; shares por categoria)
- Flexy/E-commerce Brasil — [mercado B2B digital](https://blog.flexy.com.br/e-commerce-b2b-brasil-mercado/) e [baixa maturidade](https://www.ecommercebrasil.com.br/noticias/e-commerce-b2b-no-brasil-um-mercado-bilionario-em-expansao-e-com-baixa-maturidade-digital) (R$ 2,2 tri; <3% digital); [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-ecommerce-market) (CAGR ~18,4%)
- Sebrae/IBGE — [Pulso dos Pequenos Negócios](https://mt.agenciasebrae.com.br/cultura-empreendedora/pesquisa-nacional-aponta-dificuldades-que-os-pequenos-negocios-enfrentam-para-se-desenvolverem/) (falta de barganha dos pequenos)
- Players: [Zax](https://exame.com/insight/zax-startup-que-digitaliza-o-atacado-do-bras-capta-r-32-milhoes/p) ([como funciona](https://www.zaxapp.com.br/)); [Bionexo](https://bionexo.com/marketplace-vendas/); [Mercado Eletrônico](https://analistadecadastro.com.br/mercado-eletronico/); [Nimbi](https://logweb.com.br/nimbi-lanca-inovacoes-em-sua-plataforma-de-e-procurement/); [Faire](https://research.contrary.com/company/faire) ([net-60](https://resolvepay.com/blog/faire-net-60), [taxas](https://www.brahmin-solutions.com/blog/what-is-faire-wholesale)); [Juntos Somos Mais / Clubbi / B2Brazil](https://blog.vindi.com.br/marketplace-b2b/); [Fornecefy](https://fornecefy.com.br/)
- Sinal de demanda: [listas de fornecedores vendidas no Hotmart](https://hotmart.com/pt-br/marketplace/produtos/fornecedores-full-lista-de-fornecedores-atacado-e-revenda-2-500-contatos-para-e-commerce/K104450839Q)
- Nichos procurados: [Nuvemshop](https://www.nuvemshop.com.br/blog/fornecedores-de-produtos-para-revenda/), [iFood blog](https://blog-parceiros.ifood.com.br/produtos-para-revenda/), [SuperFrete](https://superfrete.com/blog/nichos-que-mais-vendem-na-internet), [Bertholdo](https://www.bertholdo.com.br/blog/melhores-nichos-de-e-commerce/)
- RFQ: [Guelcos](https://guelcos.com.br/conteudo/estudo-de-mercado/rfi-rfp-rfq-rfx-o-que-sao-e-para-o-que-servem-essas-requests/) (prazos padrão de resposta)

*Notas: números de institutos diferentes (Serasa, Coface, Qive, ABAD) usam metodologias distintas — usar como ordem de grandeza, não precisão decimal. Pesquisado em 29/08/2026.*
