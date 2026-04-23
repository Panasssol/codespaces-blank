// Array de objetos com nome e nota dos alunos
const alunos = [
  { nome: "Ana", nota: 8.5 },
  { nome: "Bruno", nota: 5.0 },
  { nome: "Carla", nota: 6.0 },
  { nome: "Daniel", nota: 4.5 },
  { nome: "Eduarda", nota: 9.2 },
  { nome: "Felipe", nota: 7.3 },
  { nome: "Gabriela", nota: 3.8 }
];

// Função arrow que retorna apenas os alunos aprovados (nota >= 6)
const filtrarAprovados = (lista) => lista.filter(({ nota }) => nota >= 6);

// Executando a função
const aprovados = filtrarAprovados(alunos);

// Exibindo o resultado
console.log("Alunos aprovados:");
aprovados.forEach(({ nome, nota }) => {
  console.log(`- ${nome}: ${nota}`);
});