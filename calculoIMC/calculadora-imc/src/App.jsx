import { useState } from 'react'
import './App.css'

function App() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState(null)

  const calcularIMC = (e) => {
    e.preventDefault()
    
    // Converte os valores, aceitando tanto ponto quanto vírgula na altura
    const pesoNum = parseFloat(peso.replace(',', '.'))
    const alturaNum = parseFloat(altura.replace(',', '.'))

    if (!pesoNum || !alturaNum) {
      alert("Por favor, preencha campos válidos.")
      return
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum)
    let classificacao = ''

    if (imcCalculado < 18.5) {
      classificacao = 'Abaixo do peso'
    } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
      classificacao = 'Peso normal'
    } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
      classificacao = 'Sobrepeso'
    } else if (imcCalculado >= 30 && imcCalculado <= 34.9) {
      classificacao = 'Obesidade grau 1'
    } else if (imcCalculado >= 35 && imcCalculado <= 39.9) {
      classificacao = 'Obesidade grau 2'
    } else {
      classificacao = 'Obesidade grau 3'
    }

    setResultado({
      imc: imcCalculado.toFixed(2),
      classificacao: classificacao
    })
  }

  const limparFormulario = () => {
    setPeso('')
    setAltura('')
    setResultado(null)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Calculadora de IMC</h2>
        <form onSubmit={calcularIMC}>
          <div className="input-group">
            <label htmlFor="peso">Peso (kg):</label>
            <input
              type="number"
              id="peso"
              step="0.1"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 75.5"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="altura">Altura (m):</label>
            <input
              type="number"
              id="altura"
              step="0.01"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ex: 1.75"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-calcular">Calcular</button>
            <button type="button" className="btn-limpar" onClick={limparFormulario}>Limpar</button>
          </div>
        </form>

        {resultado && (
          <div className="resultado-box">
            <h3>Seu Resultado</h3>
            <p className="imc-valor">IMC: <strong>{resultado.imc}</strong></p>
            <p className="imc-classificacao">Classificação: <br/><span>{resultado.classificacao}</span></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App