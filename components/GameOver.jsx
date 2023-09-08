import '../src/App.css'

const GameOver = ({ score, RestartGame }) => {
  return (
    <div>
      <h1 className="text-white"> Fim de jogo! </h1>
      <h2 className='text-white'> A sua pontuação foi de: <span className='text-emphasis'> {score} </span> </h2>
      <button className='button-jogo' onClick={RestartGame}>Reiniciar Jogo</button>
    </div>
  )
}

export default GameOver