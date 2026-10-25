# Template · entrada do catálogo

### <nome-do-preset>
- Família: <shader-background | particle-forms | orb-reactive | holo-material | text-motion | cursor-fx | post-image-fx>
- Eixos: <2d|2.5d|3d> · <mood> · <dark|light> · motionEnergy <0 a 1> · density <0 a 1>
- CONFIG: `{ ... objeto completo, com seed ... }`
- Screenshot: `catalog/<família>/<nome>.png` (1440x900 em t = 3 s) e `<nome>.phone.png` (390x844 DPR 3)
- Prompt: `catalog/<família>/<nome>.prompt.md`
- Medido: fps desktop / phone (contagem de draws por segundo), programs linkados, data
- Origem: brief ou referência que gerou o preset

# Template · entrada do fix-catalog

### <título curto do fix> · <rule | observed> · <n projetos> · <fonte>
- Sintoma: o que se via.
- Causa: o que estava errado.
- Correção: o que mudou, com o trecho de código quando couber.
- Medido: antes → depois, com o instrumento e a config.
