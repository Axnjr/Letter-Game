import React, { useState , useEffect } from 'react'
import "./App.css"
let speech;
let data;
let words = '8';
let dif = "Level 1"

export default function App(){
    if (window.webkitSpeechRecognition) {
        const SpeechRecognition = window.webkitSpeechRecognition ;
        speech = new SpeechRecognition();
        speech.continuous = true;
      } else {
        speech = null;
    }

    const [isListening, setIsListening] = useState(false);
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const [letter,setLetter] = useState('a')
    const [score,setScore] = useState(0)
    const [good, setGood] = useState(0)
    const [is,setIs] = useState(false)

    function senlen(e){
        if(e.target.value==="Level 1 : 8 words"){words=8;dif="Level 1"}
        if(e.target.value==="Level 2 : 15 words"){words=15;dif="Level 2"}
        if(e.target.value==="Level 3 : 25 words"){words=25;dif="Level 3"}
        if(e.target.value==="Level 4 : 40 words"){words=40;dif="Level 4"}
        if(e.target.value==="Level 5 : 55 words"){words=55;dif="Level 5"}
    }

    const listen = () => {
        setIsListening(!isListening);
        if (isListening) {
        speech.stop();
        window.location.reload()
        } else {
        speech.start();
        }
    };
    useEffect(() => {
        if (!speech) {
        return;}
        let spaces=0;
        let letcount=0;

        speech.onresult = (event) => {
        setIsListening(false);
        speech.stop();
        data = event.results[event.results.length - 1][0].transcript;
        for(let i of data){
            if(i===" "){
                spaces=spaces+1
            }
            if(i===letter){
                letcount++;
            }
        }
        let f = document.getElementById("fill")
        if(spaces+1>=words){
            if(data.length<10){
                f.innerHTML = "That's not a sentence I guess !!"
            }
            if(letcount>0){
                setScore(score-letcount*10)
                f.innerHTML = "<h3>I think you said ... </h3>"+`<p id='said'>${data}</p>`+`
                <h5>You said '${letter}' ${letcount} times !! Your score decreased to ${score-letcount*10} 🙁🐵</h5>`
            }
            if(letcount===0){
                setScore(score+10)
                f.innerHTML = "<h3>I think you said ... </h3>"+`<p id='said'>${data}</p>
                <h5>You said '${letter}' ${letcount} times great !! You scored 10 points 🥳😁</h5>`
            }
        }
        else{
            f.innerHTML=`<h3>You just spoke ${spaces+1} words being on ${dif} difficulty. Try again !</h3>`
        }
        document.getElementById("extracon").style.display="flex";
        };
    }, []);

    function doai(){
        let con;let letcount=0;
        document.getElementById("ai").style.display="none"
        let f = document.getElementById("fill")
        con=data.split(" ")
        for(let i in con){
            for(let j of con[i]){
                if(j===letter){
                    letcount++;
                    delete con[i]
                    con.slice(i)
                }
            }
        }
        if(letcount>0){
            f.innerHTML = `<h2>I can just remove those word untill now 😅🙂!! ?</h2><p id='said'> " ${con.toString().replaceAll(',',' ')} "</p>`
        }
        if(letcount===0){
            f.innerHTML = `<h2>You already did great ! Nothing left for me to do</h2><p id="said">${data}</p>`
        }
    }

    function init_letter(e){
        setLetter(e.target.value)
    }
    if (speech===null) {
      return (
        <div>
          <h1>
            Voice recognition is not supported by your browser, please re-try with
            a supported browser e.g. Chrome , Edge etc ..
          </h1>
        </div>
      );
    } 
    return (
        <div>
            <h1 style={{fontSize:'2rem',margin:'1.5rem'}}>Letter<span id='game'>Game</span></h1>
            <div id='select'>
                <label style={{color:'rgb(106, 0, 255)',marginTop:'5rem',fontSize:'1.5rem'}}>Which Letter :</label>
                <select onChange={(e)=>{init_letter(e)}} name ="letter" id="letter">
                    {
                        alphabet.map((val,id)=>{
                            return(
                                <option style={{fontWeight:'bold',fontSize:'1rem'}} key={id}>{val}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div id='one'>
                <h1>Try and speak a sentence without letter '{letter}' in it !! </h1>
                <label>Sentence Length / Difficulty : </label>
                <select onChange={(e)=>{senlen(e)}}>
                    <option >Level 1 : 8 words</option>
                    <option >Level 2 : 15 words</option>
                    <option >Level 3 : 25 words</option>
                    <option >Level 4 : 40 words</option>
                    <option >Level 5 : 55 words</option>
                </select>
                <p style={{color:'#444',padding:'1rem'}}>You can choose any letter from the drop down and length of sentence from the range.</p>
                <div style={{display:'flex'}}>
                    <h2>Your Score : {score}</h2>
                    <h2 style={{backgroundColor:'rgb(106,0, 255)'}}>FeedBack : <button id='g' disabled={is} onClick={()=>{setGood(good+1);document.getElementById('g').style.border='2px dashed black';setIs(true)}}>🙂</button> | <button disabled={is} id='b' onClick={()=>{setGood(good-1);document.getElementById('b').style.border='2px dashed black';setIs(true)}}>☹️</button></h2>
                </div>
            </div>
            <div id='two'>
                <p id='fill'></p>
                <h1 id="speak" 
                    onClick={()=>{
                        listen();
                        document.getElementById("speak").style.display="none";
                    }} style={{cursor:'pointer',textAlign:'center',marginTop:'-6rem',alignItems:'center',justifyContent:'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" version="1.1" x="0" y="0" viewBox="0 0 296.8 426.4" >
                        <path d="M148.4 276.1c-35.2 0-63.7-28.5-63.7-63.7V63.7C84.7 28.5 113.2 0 148.4 0s63.7 28.5 63.7 63.7v148.7c0 35.2-28.5 63.7-63.7 63.7z" fill="white"/>
                        <rect x="127.2" y="348.5" width="42.5" height="77.9" fill="white"/>
                        <path d="M254.8 213.2c-.1 58.6-47.8 106.3-106.4 106.3-29.4 0-56.1-12-75.4-31.4l-29.7 29.7c26.9 26.9 64 43.6 105.1 43.6 81.9 0 148.3-66.4 148.4-148.3h-42z" fill="white"/>
                        <path d="M73 288.1c-19.1-19.2-31-45.7-31-74.9H0C0 254 16.6 291 43.3 317.8L73 288.1z" fill="white"/>
                    </svg>
                </h1>
                <div id='extracon'>
                    <h1 className='extra' onClick={()=>{window.location.reload()}}>Restart</h1>
                    <h1 id='ai' className='extra' onClick={doai} >Let AI try ! <span style={{color:'rgb(106, 0, 255)'}}> BETA </span></h1>
                </div>
            </div>
        </div>
    )
}