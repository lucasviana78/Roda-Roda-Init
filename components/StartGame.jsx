import '../src/App.css'
import './StartGame.css'

const StartGame = ({ startGame }) => {

  return (
    <div>
      <h1 className="text-white">Secret Word</h1>
      <p className='text-emphasis'>Clique no botão abaixo para começar a jogar </p>
      <button className='button-iniciar-jogo' onClick={startGame}> Começar o jogo </button>
    </div>
  )
}

export default StartGame