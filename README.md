INSTRUÇÕES ÚTEIS

---

Para colocar o logo da compasss no card de login (lado esquerdo), foi necessário modificar diretamente o componente react do adminJS, localizado no caminho: \node_modules\@adminjs\design-system\build\atoms\illustrations

Nessa pasta há diversas figuras default do adminjs. Eu retornei null em alguns arquivos dessa pasta para ocultar figuras específicas que não são interessantes para o projeto, e no arquivo astronaut.js eu modifiquei o código para retornar o icone da compasss, que se encontra na pasta /public. (nesse arquivo havia a figura de um astronauta, que agora retorna o nosso logo)

---
