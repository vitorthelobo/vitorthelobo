# Layout do pack

```
<nome>/
  index.html                  grid de cards com preview; abre cada efeito
  README.md                   o que é, como usar, como afinar, requisitos
  INTEGRATE.md                receita da stack do cliente (skill integrate-effect)
  LICENSE                     licença + créditos (three.js MIT, Ashima MIT)
  effects/
    shader-background/
      aurora-veil.html        standalone com CONFIG embutido
      aurora-veil.config.json
      aurora-veil.prompt.md   (só em pack pra designer/dev)
    particle-forms/...
  previews/
    shader-background-aurora-veil.jpg   1440×900, q 70
  vendor/                     (só com --inline-three) three.module.js + addons usados
```

## index.html (contrato)
- Sem framework: grid CSS, cards com `<img>` do preview, título, família, dois botões (`abrir` → o HTML; `copiar CONFIG` → clipboard).
- Filtro por família e busca por nome. Dark por padrão, segue `prefers-color-scheme`.
- Não carrega nenhum efeito inline (o index é leve); o preview é a imagem.

## Modelo de licença (cliente)
> Licença de uso. Os arquivos deste pacote ("Efeitos") foram produzidos por The Lobo Design para <CLIENTE>. <CLIENTE> pode usar, modificar e publicar os Efeitos em qualquer canal próprio, sem limite de tempo. Não é permitido revender, sublicenciar ou redistribuir os Efeitos como produto. Bibliotecas de terceiros mantêm suas licenças: three.js (MIT, © three.js authors), simplex noise (MIT, © Ashima Arts / Stefan Gustavson).

## Modelo de licença (venda)
> Uma licença por comprador. Uso em projetos próprios e de clientes, ilimitado. Proibido redistribuir os arquivos como pack, template ou produto derivado. Terceiros: three.js (MIT), Ashima noise (MIT).

## Nomes
- Pack: `<marca|tema>-motion-kit-v<N>` ou `<família>-vol<N>`.
- Preview: `<família>-<preset>.jpg`.
