import React, {useEffect, useState} from 'react'
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import Typewriter from "typewriter-effect";
import './App.css'
import "./fp.css";
// returns JSX element to display Leaderboard
function LBDisplay() {
    const [entries, setEntries] = useState([{
            username: "",
            wpm: 0,
            accuracy: 0
        }])
    useEffect(() => { // fetches json as a promise and sets state entries
        fetch('http://localhost:3001/display').then(res => res.json()).then(jsonRes => setEntries(jsonRes));
    })
    return (<div className="result-container">
        <table>
            <tr>
                <th>
                    Username
                </th>
                <th>
                    WPM
                </th>
                <th>
                    Accuracy
                </th>
            </tr>
            {
            entries.map(entry => <tr>
                <td> {
                    entry.username
                }</td>
                <td> {
                    entry.wpm
                }</td>
                <td> {
                    entry.accuracy
                }</td>
            </tr>)
        } </table>
    </div>)
};
// App class which renders all the properties of application using React Component functionalities
class App extends React.Component {
    state = {
        text: '',
        inputValue: '',
        lastLetter: '',
        words: [],
        correctWords: [],
        completedWords: [],
        completedWordCount: 0,
        completed: false,
        startTime: undefined,
        correct: [],
        wpm: 0,
        started: false,
        progress: 0,
        username: "",
        accuracy: 0,
        characters: 0
    };
    setText = () => {
        fetch('http://localhost:3001/text').then(res => res.json()).then(jsonRes => {
            this.setState({
                text: jsonRes.text, // sets text clouds which is fetched from the database randomly
                words: jsonRes.text.split(' '), // words state variable holds all words in the text paragraph in an array
            })
        });
    };
    startGame = () => { // constructor
        this.setText();
        this.setState({
            started: true,
            startTime: Date.now(),
            completed: false,
            progress: 0,
            inputValue: '',
            lastLetter: '',
            correctWords: [],
            completedWords: [],
            completedWordCount: 0,
            correct: [],
            wpm: 0,
            username: "",
            accuracy: 0,
            characters: 0
        });
    };
    handleChange = e => {
        const {
            words,
            correctWords,
            completedWordCount,
            completedWords,
            correct,
            characters
        } = this.state;
        const inputValue = e.target.value;
        const lastLetter = inputValue[inputValue.length - 1];
        const currentWord = words[0];
        let c = false;
        // If space => word completed. Check the word
        if (lastLetter === ' ') {
            const newWords = [...words.slice(1)];
            const newcompletedWordCount = completedWordCount + 1;
            const newcompletedWords = [
                ...completedWords,
                inputValue.trim()
            ];
            // check to see if it matches the currentWord
            // trim because it has the space
            if (inputValue.trim() === currentWord) { // remove the word from the wordsArray
                c = true;
                const newCorrectWords = [
                    ...correctWords,
                    currentWord
                ];
                this.setState({correctWords: newCorrectWords});
            }
            const newCorrect = [
                ...correct,
                c
            ]; // Get the total progress by checking how many words are left
            const progress = // value for progress bar
            (newcompletedWords.length / (newWords.length + newcompletedWords.length)) * 100;
            this.setState({
                words: newWords,
                correct: newCorrect,
                completedWords: newcompletedWords,
                completedWordCount: newcompletedWordCount,
                inputValue: '',
                completed: newWords.length === 0,
                progress
            });
        } else {
            const ch = characters + 1;
            this.setState({characters: ch, inputValue, lastLetter});
        }
        this.calculateWPM();
        this.calculateAccuracy();
    };
    timeLeft = ({remainingTime}) => { // function for timer display
        return (<div className="timer">
            <div className="value"> {remainingTime}</div>
        </div>);
    }
    // Calculate wpm
    calculateWPM = () => {
        const {startTime, completedWords} = this.state;
        const now = Date.now();
        const diff = (now - startTime) / 1000
        const wordsTyped = Math.ceil( // words typed setting average word size as 6 letters
            completedWords.reduce((acc, word) => (acc += word.length), 0) / 6);
        const wpm = Math.ceil(wordsTyped / (diff / 60)); // words typed per minute
        this.setState({wpm});
    };
    calculateAccuracy = () => {
        const {correctWords, completedWordCount} = this.state;
        const accuracy = Math.floor((correctWords.length) * 100 / completedWordCount); // accuracy in percentage
        this.setState({accuracy: accuracy})
    };
    addUserName = (event) => { // add username to leaderboard
        const newUsername = event.target.value;
        this.setState({username: newUsername})
    };
    addToLeaderboard = (event) => { // make database entry for leaderboard
        const {wpm, username, accuracy} = this.state;
        event.preventDefault();
        const newLBEntry = {
            wpm: wpm,
            username: username,
            accuracy: accuracy
        }
        fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newLBEntry)
        });
    };
    render() { // components to be rendered
        const {
            text,
            inputValue,
            correctWords,
            completedWords,
            wpm,
            correct,
            started,
            completed,
            progress,
            username,
            characters,
            accuracy
        } = this.state;
        if (!started)  // if not started, display homepage
            return (<div className="fp-container">
                <div data-aos="fade-left">
                    <h1 className="fp-header">Ready to start typing??...</h1>
                    <div className="fp-typewriter-container">
                        <Typewriter options={
                            {
                                strings: [
                                    "Fast?", "Accurate?", "Flawless?"
                                ],
                                autoStart: true,
                                loop: true
                            }
                        }/>
                    </div>
                    <div className="fp-start-Now-btn-div">
                        <button className="fp-start-now-btn"
                            onClick={
                                this.startGame
                        }>Start Now</button>
                    </div>
                </div>
            </div>);
        
        if (!text) 
            return <p>Loading...</p>;
         // No text fetched from database check
        if (completed) {
            return( // After completion of test, display scores and leaderboard
			<div>
                <div className='container'>
                    <h2>
                        Your WPM is
                        <strong> {wpm}</strong>
                        <br/>
                        Your Accuracy is
                        <strong> {accuracy}
                            %</strong>
                    </h2>
                    <button className='fp-start-now-btn'
                        onClick={
                            this.startGame
                    }>
                        Play again
                    </button>
                </div>
                <form onSubmit={
                    this.addToLeaderboard
                }>
                    <div className="form-group">
                        <input onChange={
                                this.addUserName
                            }
                            value={username}
                            autoComplete="off"
                            className="text"
                            placeholder="UserName"></input>
                    </div>
                    <div className='btn-center'>
                        <button className='fp-start-now-btn'>Add to LeaderBoard</button>
                    </div>
                </form>
                <div>
                    <LBDisplay/>
                </div>
            </div>);
        }
        return( // test 
		<div className='mp'>
            <h1>Type the text below</h1>
            <br/>
            <div className='main-container'>
                <div className='wpm'>
                    <h4>
                        <strong>WPM:
                        </strong>
                        <br/> {wpm} </h4>
                    <div className='cwords'>
                        <h4>
                            Correct Words:
                            <br/> {
                            correctWords.length
                        }</h4>
                    </div>
                    <div className='cwords'>
                        <h4>
                            CPM:
                            <br/> {characters}</h4>
                    </div>
                    <div className="timer">
                        <CountdownCircleTimer strokeWidth={4}
                            size={70}
                            isPlaying
                            duration={60}
                            colors={
                                [
                                    [
                                        "#EDC988", 0.33
                                    ],
                                    [
                                        "#FFA372", 0.33
                                    ],
                                    ["#FF414D"]
                                ]
                            }
                            onComplete={
                                () => {
                                    this.setState({completed: true})
                                    return [false, 0]
                                }
                        }> {
                            this.timeLeft
                        } </CountdownCircleTimer>
                    </div>
                </div>
                <progress value={progress}
                    max='100'></progress>
                <p className='text'> {
                    text.split(" ").map((word, w_idx) => { // booleans
                        let wrongHighlight = false;
                        let correctHighlight = false;
                        let currentWord = false;
                        // if word is present in completedWords array, check if it's correct and highlight accordingly
                        if (completedWords.length > w_idx) {
                            if (correct[w_idx]) 
                                correctHighlight = true;
                             else 
                                wrongHighlight = true;
                            
                        }
                        if (completedWords.length === w_idx) {
                            currentWord = true;
                        }
                        return (<span className={
                                `word 
                                ${
                                    correctHighlight && 'green'
                                }
								${
                                    wrongHighlight && 'red'
                                }
                                ${
                                    currentWord && 'underline'
                                }`
                            }
                            key={w_idx}> {
                            word.split('').map((letter, l_idx) => {
                                const isWronglyTyped = letter !== inputValue[l_idx];
                                const shouldBeHighlighted = l_idx < inputValue.length;
                                return (<span className={
                                        `letter ${
                                            currentWord && shouldBeHighlighted
                                                ? isWronglyTyped
                                                    ? 'red'
                                                    : 'green'
                                                : ''
                                            }`
                                    }
                                    key={l_idx}> {letter} </span>);
                            })
                        } </span>);
                    })
                } </p>
                <input type='text'
                    onChange={
                        this.handleChange
                    }
                    value={inputValue}
                    autoFocus/>
            </div>
        </div>);
    };;
}
export default App
// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');
floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});
close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});