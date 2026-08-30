# Autopilot de Eventos — Design System v1.0

> Sistema de design completo para o **Autopilot de Eventos** (autopilot-eventos-demo.vercel.app).
> Direção visual baseada nas referências aprovadas: dark premium com gradientes mesh, glassmorphism,
> botões pill e tipografia de hierarquia forte — adaptado para **dois temas: Light e Dark**.

---

## Índice

1. [Princípios](#1-princípios)
2. [Fundamentos (Design Tokens)](#2-fundamentos-design-tokens)
3. [Temas Light & Dark](#3-temas-light--dark)
4. [Componentes](#4-componentes)
5. [Padrões de página](#5-padrões-de-página)
6. [Acessibilidade](#6-acessibilidade)
7. [Checklist de implementação](#7-checklist-de-implementação)

---

## 1. Princípios

| Princípio | O que significa na prática |
|---|---|
| **Confiança primeiro** | O produto vende *verificação*. Verde/âmbar/vermelho de status nunca são decorativos — cada cor semântica carrega significado auditável (Verificado / Atenção / Evitar). |
| **Uma ação por tela** | O wizard tem sempre 1 CTA primário. Nunca dois botões primários competindo. |
| **Profundidade com leveza** | Glassmorphism e gradientes mesh criam atmosfera premium (referências Zentra/Creative.style), mas o conteúdo fica sempre sobre superfície sólida e legível. |
| **Evidência visível** | Todo dado aponta para a fonte. Links `fonte ↗` e marcadores `(inferência)` / `(perfil simulado)` são componentes de primeira classe. |
| **Temas gêmeos** | Nenhum componente existe só em um tema. Todo token tem par light/dark com o mesmo contraste mínimo (WCAG AA). |

---

## 2. Fundamentos (Design Tokens)

### 2.1 Cor — Paleta base

#### Brand · Maré (teal/cyan — cor do produto, extraída do app atual)

| Token | Hex | Uso |
|---|---|---|
| `mare-50`  | `#EFF9FA` | fundos tingidos (light) |
| `mare-100` | `#DCF1F4` | hover de superfícies tingidas (light) |
| `mare-200` | `#B9E3EA` | bordas ativas (light) |
| `mare-300` | `#8FD0DB` | **botão primário (dark)**, barras de score |
| `mare-400` | `#6BB9C6` | hover do primário (dark), links (dark) |
| `mare-500` | `#4C9FAE` | ícones/acento neutro entre temas |
| `mare-600` | `#3B8494` | **botão primário (light)**, links (light) |
| `mare-700` | `#316B7A` | hover do primário (light) |
| `mare-800` | `#295361` | texto sobre tinta clara |
| `mare-900` | `#1F3F4B` | texto de alto contraste sobre `mare-100` |

#### Accent · Aurora (azul — gradientes e momentos hero, ref. Zentra azul)

`aurora-400 #60A5FA` · `aurora-500 #3B82F6` · `aurora-600 #2563EB` · `aurora-700 #1D4ED8`

#### Accent · Ember (laranja — destaque de conversão/paywall, ref. Zentra laranja)

`ember-400 #FB923C` · `ember-500 #F97316` · `ember-600 #EA580C`

> **Regra de uso dos accents:** Aurora e Ember aparecem apenas em *gradientes de atmosfera*
> (hero, paywall, ilustração de fundo) e micro-destaques. Ações e navegação são sempre **Maré**.

#### Neutros

| Token | Light | Dark |
|---|---|---|
| `neutral-0`   | `#FFFFFF` | `#0C0E12` |
| `neutral-50`  | `#F7F8FA` | `#101318` |
| `neutral-100` | `#F1F3F6` | `#161A21` |
| `neutral-200` | `#E4E8EE` | `#1C212A` |
| `neutral-300` | `#D2D8E0` | `#262C37` |
| `neutral-400` | `#A9B2BF` | `#39414F` |
| `neutral-500` | `#7C8696` | `#5B6472` |
| `neutral-600` | `#5B6572` | `#8B94A3` |
| `neutral-700` | `#3F4854` | `#B7BFCC` |
| `neutral-800` | `#252C35` | `#DBE0E8` |
| `neutral-900` | `#14181D` | `#F3F5F8` |

#### Semânticas (status de verificação — coração do produto)

| Papel | Light | Dark | Tinta de fundo (light) | Tinta de fundo (dark) |
|---|---|---|---|---|
| `success` (✓ Verificado) | `#15803D` | `#4ADE80` | `#EAF7EF` | `rgba(74,222,128,.12)` |
| `warning` (⚠ Atenção)    | `#A16207` | `#FACC15` | `#FBF3E0` | `rgba(250,204,21,.12)` |
| `danger` (✕ Evitar)      | `#B91C1C` | `#F87171` | `#FBEAEA` | `rgba(248,113,113,.12)` |
| `info`                   | `#3B8494` | `#8FD0DB` | `#EFF9FA` | `rgba(143,208,219,.12)` |

### 2.2 Cor — Tokens semânticos de superfície

```css
/* ============ LIGHT (default) ============ */
:root {
  /* Superfícies */
  --bg:            #F7F8FA;   /* fundo da página */
  --surface:       #FFFFFF;   /* cards, painéis */
  --surface-2:     #F1F3F6;   /* painéis internos, inputs */
  --surface-3:     #E4E8EE;   /* hover de superfícies */
  --border:        #E4E8EE;
  --border-strong: #D2D8E0;

  /* Texto */
  --text:          #14181D;
  --text-muted:    #5B6572;
  --text-subtle:   #7C8696;
  --text-invert:   #F3F5F8;

  /* Ação */
  --primary:          #3B8494;
  --primary-hover:    #316B7A;
  --primary-contrast: #FFFFFF;
  --primary-tint:     #DCF1F4;
  --link:             #3B8494;
  --focus-ring:       rgba(59,132,148,.45);

  /* Status */
  --success: #15803D;  --success-bg: #EAF7EF;  --success-border: #BBE5CB;
  --warning: #A16207;  --warning-bg: #FBF3E0;  --warning-border: #EAD9A8;
  --danger:  #B91C1C;  --danger-bg:  #FBEAEA;  --danger-border:  #F1C2C2;
  --info:    #3B8494;  --info-bg:    #EFF9FA;  --info-border:    #B9E3EA;

  /* Glass (ref. Cannabis Lab / Creative.style) */
  --glass-bg:     rgba(255,255,255,.55);
  --glass-border: rgba(255,255,255,.65);
  --glass-blur:   20px;

  /* Gradiente mesh (ref. Zentra) */
  --mesh-hero:    radial-gradient(120% 90% at 20% 10%, #DCEBFF 0%, transparent 55%),
                  radial-gradient(100% 80% at 85% 20%, #DCF1F4 0%, transparent 50%),
                  #F7F8FA;
  --mesh-paywall: radial-gradient(110% 90% at 80% 0%, #FFE8D9 0%, transparent 55%),
                  radial-gradient(100% 80% at 10% 30%, #DCF1F4 0%, transparent 50%),
                  #F7F8FA;

  --shadow-1: 0 1px 2px rgba(20,24,29,.06);
  --shadow-2: 0 4px 16px rgba(20,24,29,.08);
  --shadow-3: 0 12px 40px rgba(20,24,29,.14);

  color-scheme: light;
}

/* ============ DARK ============ */
[data-theme="dark"] {
  --bg:            #101318;
  --surface:       #161A21;
  --surface-2:     #1C212A;
  --surface-3:     #262C37;
  --border:        #262C37;
  --border-strong: #39414F;

  --text:          #F3F5F8;
  --text-muted:    #B7BFCC;
  --text-subtle:   #8B94A3;
  --text-invert:   #14181D;

  --primary:          #8FD0DB;
  --primary-hover:    #6BB9C6;
  --primary-contrast: #10242B;   /* texto escuro sobre teal claro, como no app */
  --primary-tint:     rgba(143,208,219,.12);
  --link:             #8FD0DB;
  --focus-ring:       rgba(143,208,219,.45);

  --success: #4ADE80;  --success-bg: rgba(74,222,128,.10);  --success-border: rgba(74,222,128,.35);
  --warning: #FACC15;  --warning-bg: rgba(250,204,21,.10);  --warning-border: rgba(250,204,21,.35);
  --danger:  #F87171;  --danger-bg:  rgba(248,113,113,.10); --danger-border:  rgba(248,113,113,.35);
  --info:    #8FD0DB;  --info-bg:    rgba(143,208,219,.10); --info-border:    rgba(143,208,219,.35);

  --glass-bg:     rgba(255,255,255,.06);
  --glass-border: rgba(255,255,255,.12);
  --glass-blur:   20px;

  --mesh-hero:    radial-gradient(120% 90% at 20% 10%, rgba(37,99,235,.28) 0%, transparent 55%),
                  radial-gradient(100% 80% at 85% 20%, rgba(76,159,174,.22) 0%, transparent 50%),
                  #101318;
  --mesh-paywall: radial-gradient(110% 90% at 80% 0%, rgba(249,115,22,.20) 0%, transparent 55%),
                  radial-gradient(100% 80% at 10% 30%, rgba(76,159,174,.18) 0%, transparent 50%),
                  #101318;

  --shadow-1: 0 1px 2px rgba(0,0,0,.40);
  --shadow-2: 0 4px 16px rgba(0,0,0,.45);
  --shadow-3: 0 12px 40px rgba(0,0,0,.55);

  color-scheme: dark;
}
```

### 2.3 Tipografia

| Papel | Fonte | Fallback |
|---|---|---|
| UI & corpo | **Inter** | `-apple-system, "Segoe UI", Roboto, sans-serif` |
| Números/score | **JetBrains Mono** | `ui-monospace, "SF Mono", Consolas, monospace` |

> Uma família só para tudo (Inter) mantém o produto coeso; o mono entra **apenas** em scores
> (`93/100`), pesos (`30%`) e valores monetários do paywall quando tabulares.

**Escala (rem base 16px):**

| Token | Tamanho / Altura | Peso | Uso |
|---|---|---|---|
| `display`   | 40–48px / 1.1 | 800 | Preço do paywall ("R$ 20,00"), números hero |
| `h1`        | 30–34px / 1.2 | 700 | Título de página ("Ranking de fornecedores"), pergunta do wizard |
| `h2`        | 22–24px / 1.25 | 700 | Título de card grande ("Desbloqueie a busca") |
| `h3`        | 17–18px / 1.35 | 600 | Nome do fornecedor, título de seção de card |
| `body`      | 16px / 1.55 | 400 | Texto padrão |
| `body-sm`   | 14px / 1.5 | 400 | Meta-informações, texto de callout |
| `caption`   | 12.5px / 1.4 | 400 | Disclaimers, "(perfil simulado)" |
| `eyebrow`   | 12px / 1.3 | 600 | **CAPS + letter-spacing .08em** — "PESQUISA COMPLETA", "CADASTRAL (PESO 30%)", grupos de categorias |
| `score`     | 13px mono / 1 | 600 | `52/100`, valores das barras |

Regras:
- Máx. 68ch de largura para blocos de texto corrido.
- `h1` da pergunta do wizard nunca quebra hierarquia: 1 por tela.
- Eyebrows sempre em `--text-subtle`; nunca na cor primária.

### 2.4 Espaçamento (grid de 4px)

`space-1: 4px` · `space-2: 8px` · `space-3: 12px` · `space-4: 16px` · `space-5: 20px` · `space-6: 24px` · `space-8: 32px` · `space-10: 40px` · `space-12: 48px` · `space-16: 64px` · `space-20: 80px`

- Padding interno de cards: `space-6` (24px); cards densos (fornecedor): `space-5`.
- Gap entre cards de opção do wizard: `space-3` (12px).
- Gap entre seções de página: `space-10` a `space-12`.

### 2.5 Layout & Container

| Token | Valor | Uso |
|---|---|---|
| `container-wizard` | `max-width: 680px` | Todo o fluxo de perguntas |
| `container-paywall` | `max-width: 440px` | Card de pagamento centralizado |
| `container-report` | `max-width: 880px` | Página de ranking/resultado |
| `page-padding` | `24px` mobile / `32px` desktop | Respiro lateral |

Breakpoints: `sm 640px` · `md 768px` · `lg 1024px` · `xl 1280px`. Mobile-first.

### 2.6 Raio de borda

| Token | Valor | Uso |
|---|---|---|
| `radius-sm`   | `8px`  | Inputs pequenos, badges retangulares, painéis internos |
| `radius-md`   | `12px` | Cards de opção, inputs, callouts |
| `radius-lg`   | `16px` | Cards principais (fornecedor, paywall) |
| `radius-xl`   | `24px` | Card glass hero, modais |
| `radius-pill` | `999px` | **Botões, chips, badges de status, barra de progresso** |

> Upgrade em relação ao app atual: botões e chips migram para **pill** (referências Zentra/
> Creative.style). Cards permanecem retos com `radius-lg`.

### 2.7 Elevação & Glass

| Nível | Sombra | Uso |
|---|---|---|
| 0 | nenhuma | Conteúdo no fluxo |
| 1 | `--shadow-1` | Cards em repouso |
| 2 | `--shadow-2` | Cards em hover, dropdowns |
| 3 | `--shadow-3` | Modais, paywall, toasts |

**Receita glass** (hero, paywall, banner flutuante):

```css
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}
```

Usar glass **somente** sobre `--mesh-hero`/`--mesh-paywall`. Sobre fundo chapado, usar `--surface`.

### 2.8 Iconografia

- Biblioteca: **Lucide** (stroke 1.75px, tamanho padrão 18px; 16px em badges/inline).
- Ícones de status são fixos e nunca trocam: `check` (✓ verificado), `alert-triangle` (⚠ atenção), `x` (✕ evitar), `lock` (privacidade), `external-link` (fonte ↗), `file-down` (PDF), `search`, `arrow-left`, `arrow-right`, `chevron-right` (disclosure), `sparkles` (demo), `moon`/`sun` (tema).
- Cor do ícone herda do texto (`currentColor`).

### 2.9 Motion

| Token | Valor | Uso |
|---|---|---|
| `ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas, expansões |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transições de tema, hovers |
| `duration-fast` | `120ms` | Hover, focus, press |
| `duration-base` | `200ms` | Seleção de card, chips |
| `duration-slow` | `320ms` | Passo do wizard (slide+fade), accordion, modal |

Receitas:
- **Troca de pergunta do wizard:** saída `fade` 120ms → entrada `translateY(8px) + fade` 320ms `ease-out-soft`.
- **Barra de progresso:** `width` anima 320ms a cada passo.
- **Barras de score:** animam de 0 → valor no mount (600ms, stagger 60ms entre as 4).
- **Accordion "ver verificação completa":** `grid-template-rows` 0fr→1fr, 320ms.
- Respeitar `prefers-reduced-motion: reduce` — zerar todas as animações não essenciais.

### 2.10 Z-index

`base 0` · `dropdown 40` · `sticky-header 50` · `modal-backdrop 90` · `modal 100` · `toast 110`

---

## 3. Temas Light & Dark

### 3.1 Estratégia

1. Tokens semânticos (`--surface`, `--text`, …) definidos em `:root` (light) e sobrescritos em `[data-theme="dark"]`.
2. Padrão do sistema via `prefers-color-scheme`; escolha manual persiste em `localStorage("ap-theme")` e estampa `data-theme` no `<html>`.
3. **Nenhum componente usa hex direto** — só tokens. Isso garante paridade total entre temas.
4. Imagens/gradientes têm par por tema (`--mesh-*` já resolve isso).

### 3.2 Theme Toggle (componente)

- Botão de ícone pill (40×40px), no header, à direita: ícone `sun` (no dark) / `moon` (no light).
- Fundo `--surface-2`, borda `--border`; hover `--surface-3`.
- Transição de tema: `background-color, color, border-color 200ms ease-in-out` no `body` e superfícies (evitar `transition: all`).
- `aria-label="Alternar tema claro/escuro"` + `aria-pressed`.

### 3.3 Diferenças intencionais entre temas

| Elemento | Light | Dark |
|---|---|---|
| Botão primário | fundo `mare-600`, texto branco | fundo `mare-300`, **texto escuro** `#10242B` (padrão atual do app) |
| Card | branco + `--shadow-1` + borda `--border` | `--surface` + borda `--border` (sombra quase nula; borda faz o trabalho) |
| Mesh hero | pastéis azul/teal sobre off-white | azul profundo/teal sobre near-black (ref. Zentra) |
| Banner demo | `--warning-bg` sólido | `--warning-bg` translúcido sobre `--bg` |

---

## 4. Componentes

Inventário completo derivado das telas do app + estados necessários.

### 4.1 Button

**Variantes:**

| Variante | Aparência | Uso no app |
|---|---|---|
| `primary` | pill, fundo `--primary`, texto `--primary-contrast`, peso 600 | "Começar pelo meu evento", "Continuar →", "Ir para pagamento →", "Pesquisar fornecedores" |
| `secondary` | pill, fundo `--surface-2`, borda `--border-strong`, texto `--text` | "← Voltar", "Nova pesquisa" |
| `outline` | pill, transparente, borda `--primary`, texto `--primary` | Ações alternativas em cards |
| `ghost` | pill, transparente, texto `--text-muted`; hover `--surface-2` | Ações terciárias, ícones |
| `link` | inline, sublinhado, cor `--link` | "Já sei a categoria que preciso →", "‹ Voltar e revisar" |
| `danger` | pill, fundo `--danger`, texto branco | Exclusões (futuro) |

**Tamanhos:** `sm 36px` / `md 44px` (padrão) / `lg 52px` (CTAs de wizard e paywall, full-width no container). Padding horizontal: `20 / 24 / 32px`. Ícone à esquerda ou direita com gap `8px`.

**Estados:**
- *Hover:* `--primary-hover`; secundário: `--surface-3`. Elevação sutil `translateY(-1px)` + `--shadow-2` (apenas primário).
- *Active/press:* `scale(0.98)`, 120ms.
- *Focus-visible:* `box-shadow: 0 0 0 3px var(--focus-ring)`.
- *Disabled:* opacidade `.45`, `cursor: not-allowed`, sem hover (padrão atual do "Continuar" antes de selecionar).
- *Loading:* spinner 16px substitui o ícone; texto vira "Pesquisando…"; `aria-busy="true"`.

### 4.2 IconButton

40×40px (`sm 32`), pill, mesmas variantes de Button. Sempre com `aria-label`. Usos: toggle de tema, fechar modal, copiar link.

### 4.3 TextLink

Cor `--link`, sublinhado persistente (padrão do app), hover: `--primary-hover` + sublinhado 2px. Com seta direcional quando navegacional ("→" / "‹").

### 4.4 Input (text / número / cidade)

- Altura `48px`, `radius-md`, fundo `--surface-2`, borda `1px --border`, padding `0 16px`, texto `--text`, placeholder `--text-subtle`.
- *Focus:* borda `--primary` + ring `0 0 0 3px var(--focus-ring)`.
- *Erro:* borda `--danger` + mensagem `body-sm` em `--danger` com ícone `alert-circle` abaixo.
- *Disabled:* opacidade `.5`.
- **Label:** `body-sm` 600, `--text`, margem inferior `8px` (ex.: "Em que cidade?" — pode usar `h3` quando é a pergunta da tela).
- **Helper text:** `caption`, `--text-muted`.
- Variante com ícone à esquerda (ex.: `search` / `map-pin`): padding-left `44px`.

### 4.5 Select / Dropdown

Mesma pele do Input + chevron `--text-subtle`. Menu: `--surface`, `radius-md`, `--shadow-2`, item 40px com hover `--surface-2`, item selecionado com check `--primary`.

### 4.6 OptionCard (Radio) — escolha única do wizard

Anatomia: `[radio 20px] [label 600] (texto auxiliar --text-muted)` em card full-width.

| Estado | Spec |
|---|---|
| Repouso | fundo `--surface`, borda `1px --border`, `radius-md`, padding `18px 20px`, cursor pointer |
| Hover | borda `--border-strong`, fundo `--surface-2` |
| **Selecionado** | borda `1.5px --primary`, fundo `--primary-tint`, radio preenchido `--primary` |
| Focus-visible | ring `--focus-ring` |
| Disabled | opacidade `.5` |

- Radio custom: círculo 20px, borda 2px `--border-strong`; selecionado: anel `--primary` + dot 10px.
- Card inteiro é clicável (input real oculto, `role="radio"` via input nativo dentro de `<label>`).
- Auto-avanço opcional após 250ms da seleção (manter "Continuar" para acessibilidade).

### 4.7 OptionCard (Checkbox) — escolha múltipla do wizard

Igual ao 4.6, com checkbox quadrado `radius: 6px` 20px; marcado: fundo `--primary` + check branco (dark: check `--primary-contrast`). Texto auxiliar entre parênteses em `--text-muted` `body-sm` (ex.: "(som, telão, iluminação, palestrante)").

### 4.8 Chip / Tag selecionável — categorias

Pill, altura `40px`, padding `0 18px`, `body-sm` 500.

| Estado | Spec |
|---|---|
| **Ativa (na pesquisa)** | borda `1.5px --primary`, texto `--primary` (light: `mare-700`), fundo `--primary-tint`, prefixo `✓` |
| Inativa (removida) | borda `1px --border`, texto `--text-subtle`, fundo transparente, sem `✓`, opacidade `.7` |
| Hover | eleva contraste da borda |

Interação toggle com microanimação `scale .96 → 1` (120ms). Abaixo do grupo, instrução em `caption`: "Toque numa categoria para tirar ou devolver à pesquisa."

**ChipGroup:** eyebrow do grupo ("ESPAÇO & INFRAESTRUTURA") + chips com wrap, gap `10px`, margem entre grupos `space-6`.

### 4.9 Badge de status (Verificado / Atenção / Evitar)

Pill, altura `26px`, padding `0 12px`, `caption` 600 + score mono.

| Tipo | Conteúdo | Cores |
|---|---|---|
| `verified` | `✓ Verificado · 93/100` | texto `--success`, fundo `--success-bg`, borda `--success-border` |
| `caution` | `⚠ Atenção · 52/100` | texto `--warning`, fundo `--warning-bg`, borda `--warning-border` |
| `avoid` | `✕ Evitar · 0/100` | texto `--danger`, fundo `--danger-bg`, borda `--danger-border` |

Posição: canto superior direito do card do fornecedor. Nunca clicável.

### 4.10 Badge informativo / meta

- **Cache badge:** `📋 validado há menos de 30 dias — reaproveitado` — pill `radius-sm`, fundo `--info-bg`, texto `--info`, borda `--info-border`, `caption`.
- **Marcador de inferência:** `(inferência)` / `(perfil simulado)` — apenas texto `caption` em `--text-subtle`, itálico. Nunca em cor de status.
- **Rank:** `1º ·` prefixo do nome em `--text-muted`, peso 600.

### 4.11 Alert / Banner

**a) Banner global (demo mode)** — full-width no topo, fixo:
fundo `--warning-bg`, texto `--warning`, borda inferior `--warning-border`, `body-sm`, ícone `sparkles`, centralizado. Código inline (`.env`) em `--surface-2` mono.

**b) Callout de aviso (ECAD)** — no fluxo:
fundo `--warning-bg`, borda `1px --warning-border`, `radius-md`, padding `12px 16px`, ícone `⚠`, `body-sm`.

**c) Callout de bloqueio (dentro do card)** — "Não conseguimos confirmar o CNPJ…":
fundo `--warning-bg`, **borda esquerda `3px --warning`**, `radius-sm`, texto `--text` com prefixo `→`.

**d) Callout eliminatório** — "Critério eliminatório: CNPJ BAIXADO…":
fundo `--danger-bg`, **borda esquerda `3px --danger`**, texto `--text`, termo "Critério eliminatório:" em peso 700, link `fonte ↗` embutido.

**e) Nota de privacidade:** linha simples `🔒 Relatório privado — só você vê.` em `body-sm --text-muted`.

### 4.12 Card (superfícies)

| Variante | Spec | Uso |
|---|---|---|
| `card` | fundo `--surface`, borda `1px --border`, `radius-lg`, padding `24px`, elevação 1 | padrão |
| `card-glass` | receita `.glass` + `radius-xl`, sobre mesh | hero da landing, paywall |
| `panel` (interno) | fundo `--surface-2`, `radius-sm`, padding `16px`, sem sombra | "O que vamos pesquisar", "O que não conseguimos verificar" |
| `panel-dashed` | fundo `--surface`, **borda `1px dashed --border-strong`**, `radius-md` | painel de metodologia "Como pontuamos" |

### 4.13 SupplierCard (card de fornecedor no ranking)

Anatomia (de cima para baixo):
1. **Header:** `{rank}º · {Nome}` (`h3`) + Badge de status à direita.
2. **Linha de contato:** telefone · URL · @handle `(perfil simulado)` — `body-sm --text-muted`, links em `--link`.
3. **Cache badge** (opcional).
4. **Resumo** (`body`, `--text`): 1–2 linhas de evidências principais.
5. **Callout** (opcional: aviso ou eliminatório).
6. **ScoreBars** (4 barras — ver 4.14).
7. **Disclosure** "ver verificação completa" (ver 4.15).
8. **Panel** "O que não conseguimos verificar" (lista bullet `--text-muted`).

Card: `card` base; hover: borda `--border-strong` (não eleva — página densa). Cards da seção "não recomendamos" ganham borda `--danger-border` sutil.

### 4.14 ScoreBar (barra de pontuação com rótulo)

Linha: `[label 130px] [track flex-1] [valor mono 32px, alinhado à direita]`

- Label: `body-sm --text-muted` — "Cadastral (30%)".
- Track: altura `8px`, `radius-pill`, fundo `--surface-3` (light: `neutral-200`).
- Fill: `radius-pill`, cor por contexto: padrão `mare-300` (dark) / `mare-500` (light); pode assumir `--warning`/`--danger` quando o card é Atenção/Evitar (opcional v2).
- Valor: `score` mono, `--text`.
- Gap vertical entre barras: `10px`. Animação de preenchimento no mount (ver Motion).

### 4.15 Disclosure / Accordion ("ver verificação completa")

- Trigger: `▸ ver verificação completa` → aberto: `▾ ocultar verificação completa`. Cor `--link`, `body-sm` 600, chevron rotaciona 90°, 200ms.
- Conteúdo aberto: separador `--border` acima; grupos por eyebrow ("CADASTRAL (PESO 30%)") com ChecklistItems.
- `aria-expanded` + `aria-controls`; animação `grid-rows` 320ms.

### 4.16 ChecklistItem (linha de evidência)

`[ícone status 16px] [texto] [fonte ↗] [(inferência)?]`

- Ícone: `✓ --success` / `⚠ --warning` / `✕ --danger`.
- Texto: `body-sm`, critério em peso 500 + detalhe após ":" em regular ("CNPJ ativo na Receita Federal: situação ATIVA…").
- **SourceLink `fonte ↗`:** `--link`, sublinhado, ícone `external-link` 12px, `target="_blank" rel="noopener"`.
- Espaçamento vertical: `12px` entre itens.

### 4.17 ProgressBar (wizard)

- Linha acima da pergunta: `Pergunta 3 de 10` (`body-sm --text-muted`) + track full-width.
- Track: `6px`, `radius-pill`, fundo `--surface-3`; fill `--primary`, anima 320ms.
- `role="progressbar"` com `aria-valuenow/min/max`.

### 4.18 PageHeader (relatório)

1. `h1` "Ranking de fornecedores"
2. Meta-linha: `Buffet completo (almoço/jantar) · **Curitiba** · 30/08/2026` — `body`, `--text-muted`, cidade em 600 `--text`.
3. Nota de privacidade (4.11e).
4. **ActionRow:** Button primary sm `📄 Baixar PDF` + Button secondary sm `Nova pesquisa`, gap `12px`.

### 4.19 SectionHeader (dentro do relatório)

- Padrão: `h3` + contagem `(9 verificados)` em `body-sm --text-muted`.
- **Variante rejeitados:** régua superior `2px --danger` (60% opacidade) + título `✕ Encontramos, mas não recomendamos — veja por quê` com ícone `--danger`, peso 700.

### 4.20 PricingCard (paywall)

Sobre `--mesh-paywall`, container 440px, variante `card-glass` (dark) / `card` + `--shadow-3` (light):

1. Eyebrow "PESQUISA COMPLETA" (`--text-subtle`).
2. `h2` "Desbloqueie a busca".
3. **Preço `display`**: "R$ 20,00" + sub `caption` "pagamento único por pesquisa".
4. Separador `--border`.
5. Lista de benefícios: `✓ --success` + `body-sm`, gap `12px`.
6. `panel` interno "O que vamos pesquisar:" (peso 600 no prefixo, resto `--text-muted`).
7. Button primary lg full-width "Ir para pagamento →".
8. TextLink "‹ Voltar e revisar".
9. Disclaimer `caption --text-subtle`.

### 4.21 Modal / Dialog

Backdrop `rgba(0,0,0,.5)` (light) / `rgba(0,0,0,.65)` (dark) + blur 4px. Painel: `--surface`, `radius-xl`, `--shadow-3`, max-width `480px`, padding `32px`; título `h2`, corpo `body --text-muted`, ações à direita (secondary + primary). Entrada: `scale .96→1 + fade` 200ms. Focus trap, `Esc` fecha, `aria-modal`.

### 4.22 Toast

Canto inferior direito (mobile: base full-width), `--surface`, borda esquerda `3px` na cor do status, `radius-md`, `--shadow-3`, ícone + `body-sm` + botão fechar. Auto-dismiss 5s, animação slide-up. Ex.: "PDF gerado com sucesso."

### 4.23 Tooltip

Fundo `neutral-800` (light) / `neutral-300` (dark) com texto invertido, `caption`, `radius-sm`, padding `6px 10px`, seta 6px, delay 300ms. Uso: explicar pesos ("Reputação 40%").

### 4.24 Spinner & Loading da pesquisa

- **Spinner:** anel 20px, `--primary`, 0.8s linear.
- **SearchProgress (tela de espera pós-pagamento):** card central com spinner 32px, `h3` "Pesquisando fornecedores…", sublinha `body-sm --text-muted` que troca a cada etapa ("Consultando Receita Federal…", "Verificando Reclame Aqui…"), + ProgressBar indeterminada (fill 30% animando `translateX`).

### 4.25 Skeleton

Blocos `--surface-3` com shimmer (gradiente translúcido animando 1.4s). Prover skeleton do SupplierCard (header + 2 linhas + 4 barras). Respeitar reduced-motion (fica estático).

### 4.26 EmptyState

Ícone 40px `--text-subtle` em círculo `--surface-2`, `h3`, texto `body-sm --text-muted`, CTA opcional. Ex.: "Nenhum fornecedor verificável encontrado nesta cidade."

### 4.27 Header do app (top bar)

Altura `64px`, fundo `--bg` (com `backdrop-filter: blur(12px)` + fundo translúcido quando sticky), logo "Autopilot de Eventos" (`body` 700, `--text`), ThemeToggle à direita. Borda inferior `--border` apenas ao rolar.

### 4.28 Footer (mínimo)

`caption --text-subtle`, links `--text-muted`: termos, privacidade, contato. Padding `space-10` vertical.

### 4.29 Divider

`1px --border` sólido. Variante `dashed` para blocos de metodologia. Margem vertical `space-6`.

### 4.30 KBD / código inline

Para o banner demo (".env"): mono `caption`, fundo `--surface-2`, borda `--border`, `radius: 4px`, padding `1px 6px`.

---

## 5. Padrões de página

### 5.1 Landing (hero)

- Fundo `--mesh-hero` (ref. Zentra: aurora azul→teal no dark, pastéis no light).
- Conteúdo em `container-wizard`, alinhado à esquerda (desktop) / centro (mobile): logo → `h1` → parágrafo `--text-muted` (máx. 52ch) → Button primary lg full-width → TextLink.
- Opcional v2: hero dentro de `card-glass` (ref. Cannabis Lab) com o mesh vazando por trás.

### 5.2 Wizard (10 perguntas)

Estrutura fixa: Header → ProgressBar → `h1` pergunta → stack de OptionCards → ButtonRow (`← Voltar` secondary + `Continuar →` primary, grid 1fr/1.4fr, gap `12px`).
- "Continuar" desabilitado até haver seleção (single) — multi permite 0 seleções.
- Transição entre passos: ver Motion 2.9.
- Estado é preservado ao voltar.

### 5.3 Resumo de categorias

`h1` com contagem dinâmica → meta-linha → Callout ECAD (condicional) → ChipGroups por eyebrow → instrução → Input cidade → ButtonRow com CTA de label dinâmico ("Pesquisar fornecedores (12 categorias · Curitiba)").

### 5.4 Paywall

Fundo `--mesh-paywall` (toque de Ember = momento de conversão), PricingCard centralizado vertical.

### 5.5 Relatório / Ranking

PageHeader → `panel-dashed` metodologia → por categoria: SectionHeader + SupplierCards ordenados → SectionHeader variante rejeitados + cards Evitar. Âncoras por categoria para navegação futura (TOC sticky em `xl`, v2).

### 5.6 Hierarquia de feedback

| Severidade | Componente |
|---|---|
| Informação de sistema | Banner global (demo) |
| Aviso contextual | Callout warning (ECAD, CNPJ não confirmado) |
| Bloqueio/eliminação | Callout danger com borda esquerda |
| Confirmação de ação | Toast success |
| Erro de formulário | Mensagem inline no Input |

---

## 6. Acessibilidade

- **Contraste:** todos os pares texto/fundo dos tokens ≥ 4.5:1 (texto) e 3:1 (UI). Atenção especial: `--warning` sobre `--warning-bg` é usado só em texto ≥ 600 de peso; nunca amarelo puro sobre branco no light (por isso `#A16207`).
- **Status nunca só por cor:** ícones ✓/⚠/✕ + rótulo textual sempre acompanham (já é padrão do produto — manter).
- **Foco visível** em tudo que é interativo (ring `--focus-ring`, 3px).
- **Wizard:** OptionCards são inputs nativos (`radio`/`checkbox`) dentro de `<label>`; navegação por setas entre radios; `fieldset/legend` por pergunta.
- **Progresso** anunciado: `aria-live="polite"` no "Pergunta X de 10".
- **Links externos** (`fonte ↗`): `aria-label="fonte: {critério} (abre em nova aba)"`.
- **Reduced motion** respeitado em barras, wizard e shimmer.
- Alvos de toque ≥ 44×44px (chips têm 40px de altura + padding de área clicável).

---

## 7. Checklist de implementação

- [ ] Colar bloco de tokens (2.2) num `tokens.css`; zero hex fora dele.
- [ ] Carregar Inter (400/500/600/700/800) + JetBrains Mono (600) com `font-display: swap`.
- [ ] `<html data-theme>` + script anti-FOUC lendo `localStorage("ap-theme")` antes do paint.
- [ ] ThemeToggle no header (4.27 / 3.2).
- [ ] Migrar botões e chips para `radius-pill`.
- [ ] Aplicar `--mesh-hero` na landing e `--mesh-paywall` no paywall (par light/dark automático).
- [ ] Substituir cores de status hardcoded pelos pares semânticos (light precisa dos tons escuros!).
- [ ] Adicionar estados que faltam no app: loading do CTA, SearchProgress, skeleton, toast, empty state, erro de input.
- [ ] Testar as 8 telas nos dois temas + `prefers-reduced-motion`.

---

*Autopilot de Eventos DS v1.0 · 30/08/2026 · Base visual: referências Zentra / Creative.style / Cannabis Lab + telas atuais do app.*
