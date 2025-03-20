# avec un typescript globale et ts-node
npm i -g typescript
npm init -y
npm i ts-node
tsc -init

npm i typescript@5.7.2 --save-exact

echo "console.log(\"jean\")" > index.ts
ts-node index.ts

------------

transpiler vs compiler

transpiler le code d'un langage vers un autre