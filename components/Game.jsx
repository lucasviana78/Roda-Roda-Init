import { useState, useRef } from 'react'
import '../src/App.css'
import './Game.css'

const Game = ({ VerifyLetter, score, tip, chance, word, listWordLetters, listLetterUsed, listCorrectLetter }) => {
  const [formLetter, setFormLetter] = useState([])
  const letterInputRef = useRef(null)

  // Form Submit
  const handleSubmit = (data) => {
    data.preventDefault();
    VerifyLetter(formLetter)
    setFormLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div>
      <span className='text-white'>
        Pontuação: {score}
      </span>

      <h1 className='text-white'> Adivinhe a palavra: </h1>

      <h3 className='text-white'>
        Dica sobre a palavra: <span className='text-emphasis'>  <b> {tip} </b> </span>
      </h3>

      <p className='text-white'> Você ainda tem  {chance} chance(s)</p>

      <div className='chart-game'>
        <div className='chart-game-padding'>
          {listWordLetters.map((letter, index) => listCorrectLetter.includes(letter) ? <div className='box-game' key={index}> {letter}</div> : <div className='box-game-empty' key={index}> * </div>)}
        </div>
      </div>

      <p className='text-white'> Tente adivinhar a palavra </p>
      <div>
        <form onSubmit={handleSubmit}>
          <span>
            <input type="text" name="formLetter" className='area-letter' maxLength="1" autoFocus onChange={(e) => setFormLetter(e.target.value.toUpperCase())} value={formLetter} ref={letterInputRef} />
          </span>
          <button type='submit' className="button-jogo"> Chutar Letra!</button>
        </form>
      </div>

      <p className='text-white'> Letras já utilizadas: {listLetterUsed.map((letter) => letter + " ")} </p>
      <p className='text-white upper'>  </p>
    </div>
  )
}

export default Game