// import {paragraphs} from "./paragraphs";

const typingText = document.querySelector(".presentation p");
const inputField = document.querySelector(".container .input-field");
const mistakeTag = document.querySelector(".mistakes span");
const timetag = document.querySelector(".time span strong");
const wpmtag = document.querySelector(".wpm span");
const cpmtag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime;

let characterIndex = mistakes = isTyping = 0;

function randomParagraph(){

    let randomIndex = Math.floor(Math.random()*paragraphs.length);
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());

}

function initiateTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedCharacter = inputField.value.split("")[characterIndex];

    if(!isTyping){
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }

    if(typedCharacter == null){
        characterIndex--;
        if(mistakes>0){
            mistakes--;
        }
        characters[characterIndex].classList.remove("correct", "incorrect");
    }else{
        if(characters[characterIndex].innerText === typedCharacter){
            characters[characterIndex].classList.add("correct");
        }else{
            characters[characterIndex].classList.add("incorrect");
            mistakes++;
        }

        characterIndex++;
    }

    characters.forEach(span => span.classList.remove("active"));
    characters[characterIndex].classList.add("active");

    let wpm = Math.round((((characterIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    wpm = (wpm < 0) || (!wpm) || (wpm === Infinity) ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    cpmtag.innerText = (characterIndex - mistakes);
    wpmtag.innerText = wpm;
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timetag.innerText = timeLeft;
    }else{
        clearInterval();
    }
}

randomParagraph();
inputField.addEventListener("input", initiateTyping);