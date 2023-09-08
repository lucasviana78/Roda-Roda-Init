import { useEffect, useState } from 'react'
import './App.css'
import StartGame from '../components/startGame'
import Game from '../components/Game'
import GameOver from '../components/GameOver'


function App() {
  //Init stages for game
  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
  ]

  // Words
  const data_words = [
    { key: 1, word: "Advogado", tip: "Profissão" },
    { key: 2, word: "Médico", tip: "Profissão" },
    { key: 3, word: "Programador", tip: "Profissão" },
    { key: 4, word: "Melancia", tip: "Fruta" },
    { key: 5, word: "Morango", tip: "Fruta" },
    { key: 6, word: "Banana", tip: "Fruta" }
  ]

  //Params for game
  let [score, setScore] = useState(0);
  const [tip, setTip] = useState();
  let [chance, setChance] = useState(3);
  const [word, setWord] = useState()
  const [listWordLetters, setListWordLetters] = useState([])
  const [listLetterUsed, setListLettersUsed] = useState([])
  const [listCorrectLetter, setListCorrectLetter] = useState([])
  const [listWrongtLetter, setWrongCorrectLetter] = useState([])

  //Generate WORD
  const generateRandomWord = (e) => {
    const number = Math.floor(Math.random() * e.length)

    return [e[number].word, e[number].tip]
  }

  // Reset game Fields 
  const resetFields = () => {
    setListWordLetters([])
    setListLettersUsed([])
    setListCorrectLetter([])

    // reset word for game
    FillInTable()
  }


  // Set start to game control 
  const [currentStage, setCurrentStage] = useState(stages[0].name)

  // Generate Word 
  const FillInTable = () => {
    const listWordTip = generateRandomWord(data_words)
    setListWordLetters(listWordTip[0].split("").map((l) => l.toUpperCase()))
    setWord(listWordTip[0])
    setTip(listWordTip[1])
  }


  const ComputingGame = () => {
    setScore(score = score + 100)
    setChance(3)
    resetFields()
  }


  // Change status to start game
  const startGame = () => {
    FillInTable()
    setCurrentStage(stages[1].name)
  }


  const RestartGame = () => {
    setScore(0)
    setChance(3)
    resetFields()
    setCurrentStage(stages[1].name)
  }

  
  const endGame = () => {
    setCurrentStage(stages[2].name)
  }


  const VerifyLetter = (letra) => {

    //Correct or Wrong
    if (listWordLetters.includes(letra)) {
      setListCorrectLetter((listCorrectLetter) => [
        ...listCorrectLetter, letra
      ])
    } else {
      setWrongCorrectLetter((listWrongtLetter) => [
        ...listWrongtLetter, letra
      ]);
      setChance(chance = chance - 1)
    }
    // Verify Chance
    if (chance < 1) { endGame() }

    setListLettersUsed((listLetterUsed) => [...listLetterUsed, letra])
  }


  //EFC corret word
  useEffect(() => {
    const arrUniqueWLetter = [...new Set(listWordLetters)].sort((a, b) => a.name > b.name ? 1 : -1,);
    const arrUniqueCLetter = [...new Set(listCorrectLetter)].sort((a, b) => a.name > b.name ? 1 : -1,);

    if (((arrUniqueWLetter.length) === arrUniqueCLetter.length) && arrUniqueWLetter.length != 0) {
      ComputingGame()
    }

  }, [listCorrectLetter])


  return (
    <div>
      {currentStage === "start" && <StartGame startGame={startGame} />}
      {currentStage === "game" && <Game
        VerifyLetter={VerifyLetter}
        score={score}
        tip={tip}
        chance={chance}
        word={word}
        listWordLetters={listWordLetters}
        listLetterUsed={listLetterUsed}
        listCorrectLetter={listCorrectLetter}
      />}
      {currentStage === "end" && <GameOver score={score} RestartGame={RestartGame} />}
    </div>
  )
}

export default App
