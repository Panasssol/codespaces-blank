// ========================================
// CLASSE ABSTRATA (classe pai)
// ========================================
class Veiculo {
    constructor(marca, modelo, ano) {
        // Impede a instanciação direta da classe abstrata
        if (this.constructor === Veiculo) {
            throw new Error("A classe Veiculo é abstrata e não pode ser instanciada diretamente.");
        }

        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.ligado = false;
    }

    ligar() {
        this.ligado = true;
        console.log(`${this.marca} ${this.modelo} foi ligado.`);
    }

    desligar() {
        this.ligado = false;
        console.log(`${this.marca} ${this.modelo} foi desligado.`);
    }

    // Método abstrato - deve ser implementado pelas classes filhas
    exibirInformacoes() {
        throw new Error("O método 'exibirInformacoes()' deve ser implementado pela classe filha.");
    }
}

// ========================================
// CLASSE FILHA 1 - CARRO
// ========================================
class Carro extends Veiculo {
    constructor(marca, modelo, ano, numeroPortas) {
        super(marca, modelo, ano); // chama o construtor da classe pai
        this.numeroPortas = numeroPortas;
    }

    exibirInformacoes() {
        console.log(`Carro: ${this.marca} ${this.modelo} (${this.ano}) - ${this.numeroPortas} portas`);
    }

    abrirPortaMalas() {
        console.log(`O porta-malas do ${this.modelo} foi aberto.`);
    }
}

// ========================================
// CLASSE FILHA 2 - MOTO
// ========================================
class Moto extends Veiculo {
    constructor(marca, modelo, ano, cilindradas) {
        super(marca, modelo, ano);
        this.cilindradas = cilindradas;
    }

    exibirInformacoes() {
        console.log(`Moto: ${this.marca} ${this.modelo} (${this.ano}) - ${this.cilindradas}cc`);
    }

    empinar() {
        if (this.ligado) {
            console.log(`A ${this.modelo} está empinando! 🏍️`);
        } else {
            console.log(`Ligue a moto antes de empinar!`);
        }
    }
}

// ========================================
// CRIAÇÃO DAS INSTÂNCIAS
// ========================================
const carro1 = new Carro("Toyota", "Corolla", 2023, 4);
const carro2 = new Carro("Fiat", "Uno", 2020, 2);
const moto1 = new Moto("Honda", "CB 500", 2022, 500);

// ========================================
// TESTANDO OS OBJETOS
// ========================================
console.log("=== Informações dos Veículos ===");
carro1.exibirInformacoes();
carro2.exibirInformacoes();
moto1.exibirInformacoes();

console.log("\n=== Ações ===");
carro1.ligar();
carro1.abrirPortaMalas();

moto1.ligar();
moto1.empinar();

carro2.desligar();