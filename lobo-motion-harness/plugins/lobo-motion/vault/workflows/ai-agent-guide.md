---
tags: [workflow, rules]
updated: 2026-10-25
---

# Guia do agente · hard rules

Estas regras não são opcionais. Várias são contraintuitivas; cada uma existe por um defeito medido (ver [[fix-catalog]]).

## Hard rules

1. **CONFIG-first.** Todo efeito nasce de um objeto CONFIG com ranges e defaults. Cores, contagens, intensidades e seed nunca ficam literais no shader ou no componente. Painel, URL, favorito e prompt leem o mesmo objeto. (`rules/config-first.md`)
2. **Uma biblioteca de motion por projeto.** A que já está instalada vence. Nunca adicione outra por preferência.
3. **Um ticker por página, tempo em segundos.** Todo `+=` por frame escalado por `dt`. Nenhum frame cap fixo em celular. Desktop em 120 Hz: gate do draw a 12,5 ms, easing continua por tick.
4. **DPR entre 1 e 1,5, renderer e composer juntos.** Abaixo de 1 é ruído; 3x é nove vezes o fill. Partículas invisíveis saem do clip no vertex shader. Bloom pela metade em celular.
5. **Pré-aqueça tudo debaixo do loader.** Compile shaders contra os targets reais, suba texturas, rode cada pass uma vez. `programs.length` não cresce depois do handoff.
6. **Canvas sobrevive ao iOS.** Caixa em `100lvh`; resize só quando tamanho ou DPR mudam; nunca parar de desenhar um canvas visível; `webglcontextlost` com rebuild.
7. **Reduced motion e robot form.** `prefers-reduced-motion` toca a entrada e para de avançar o tempo, sem esconder conteúdo. User agent de bot recebe imagem estática e nenhum download de WebGL.
8. **Meça antes de reportar.** Build de produção, user agent de pessoa, mediana de 3 runs. SwiftShader não dá fps absoluto: só contagens transferem (draws, programs, frames). Leia toda screenshot que uma ferramenta gerar.
9. **Honestidade de verificação.** Nunca reporte uma verificação que não rodou, nunca invente preset que o brief não pediu, nunca edite `templates/` ou `references/` das skills sem sign-off.
10. **Registre.** Preset novo vai pro [[effect-catalog]]. Número medido vai pro [[fix-catalog]] como `rule` (3 ou mais projetos) ou `observed` (1 a 2). Leitura que enganou vai pro [[pitfalls]]. Escolha com alternativas vira ADR no [[decisions-log]].

## Antes de construir
- Leia o brief nos cinco eixos ([[README]]). Faltando, pergunte uma vez e assuma o default.
- Peça referências visuais. Imagem vale mais que adjetivo.
- Procure um preset próximo no catálogo e parta do CONFIG dele.

## Como reportar
Arquivos criados ou mudados, o CONFIG final, números por tier (fps, draws, programs), screenshots lidas, o que não foi verificado e por quê. Separe violação de hard rule (corrija) de julgamento (discuta).

## Depois de mudar
- Preset ou efeito novo: entrada no [[effect-catalog]]
- Algo medido: [[fix-catalog]] com antes e depois
- Ferramenta ou leitura que enganou: [[pitfalls]]
- Decisão de arquitetura: ADR no [[decisions-log]]
- Skill, agent ou command novo: linha nas tabelas do `README.md` do plugin
