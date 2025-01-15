import React from 'react'
import clsx from 'clsx';
import Confetti from 'react-confetti'
import { languages } from "./languages"
import { getFarewellText , getRandomWord } from './utils'

// let word = getRandomWord().split("")

export default function AssemblyEndgame(){
     
    const alphabets = "abcdefghijklmnopqrstuvwxyz".split("")
    const [currentWord , setCurrentWord ] = React.useState(getRandomWord().split(""))

    console.log(currentWord)

    const [guessedLetters, setGuessedLetters] = React.useState([])
    
    let wrongGuessCount = guessedLetters.filter( 
        (letter) =>  { 
            return !currentWord.includes(letter)
    }).length   
        
    let a = wrongGuessCount - 1
   
    const isGameWon = currentWord.every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= (languages.length - 1)

    let isGameOver = isGameLost || isGameWon;

    const languageElements = languages.map( (language , index)=> {
    const isLanguageLost = index < wrongGuessCount

    return (
        <div className={`languageCard ${isLanguageLost ? "lost" : null}`}
            key={index} 
            style ={{
                        backgroundColor : language.backgroundColor,
                        color : language.color
                    }} > 
            {isLanguageLost ? "💀" : language.name}
        </div>
        )
    } )

    
    function addGuessedLetter(letter) {

        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? 
                prevLetters : 
                [...prevLetters, letter]
        )

    }

    const wordElement = currentWord.map( (word , index)=>{ 

        const isCorrect = guessedLetters.includes(word)

        return ( <span key={index}> 

                    { isCorrect ? word : ""} 
        
                </span>) 

    } )

    const keyboardElement = alphabets.map( (letter)=> {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)

        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button 
                key={letter}
                onClick={()=> addGuessedLetter(letter)}
                className= { className } 
                disabled = {isGameOver}
                >
                    {letter.toLocaleUpperCase()} 
            </button>
        )
    })

    function newGame(){
        wrongGuessCount = 0
        setGuessedLetters([])
        setCurrentWord(getRandomWord().split(""))
    }

    return (
        <>
            {isGameWon ? <Confetti /> : null}

            <header>
                <h1> Assembly :  Endgame</h1>
                <p id="instruction"> Guess the word in under 8 attempts to keep the programming world safe from Assembly!  </p>
            </header>

            {isGameOver ? 
                <section className = {isGameWon ? "gameWon" : "gameLost"}>
                    <h2> {isGameWon ? "You Win!" : "You Lost!"}</h2>
                    <p> {isGameWon ? "Well Done" : "You lose! Better start learning Assembly 😭"} 🎉</p>
                </section> 
                :   <section className = "elims">

                        <h2> { a >= 0 ? getFarewellText( languages[a].name ) : "Lets Start The Game" } </h2> 

                    </section> 
            }
            

            <div className="languages">
                {languageElements}
            </div>

            <div id='words'> {wordElement} </div>

            <div id='keyboard'>
                {keyboardElement}
            </div> 

            {isGameOver ? <button onClick={newGame} className="new-game"> New Game </button> : null}
            
        </>
    )   
}   