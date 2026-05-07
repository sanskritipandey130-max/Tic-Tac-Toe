document.addEventListener("DOMContentLoaded",()=>{

let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let playerOName = localStorage.getItem("playerO") || "Player O";
let playerXName = localStorage.getItem("playerX") || "Player X";


let turnO = true; //playerX, playerO
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        
        if(turnO === true) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

         checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (Winner) => {

    let winnerName = Winner ==="O" ? playerOName : playerXName;
    msg.innerText = `Congratulations, ${winnerName} wins!`;

    let audio = new Audio("win.mp3");
    audio.play();

    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText; 
        let pos2 = boxes[pattern[1]].innerText; 
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                console.log("Winner", pos1);
                showWinner(pos1);
                return true;
            }
        }
    }
    let isDraw = true;

    boxes.forEach((box) => {
        if(box.innerText === "") {
            isDraw = false;
        }
    });

    if(isDraw) {
        showDraw();   // you must create this function
        return true;
    }

    return false;
};

const showDraw = () => {
    msg.innerText = "🤝 It's a Draw!";

    let audio = new Audio("fahhh.mp3");
    audio.play();

    msgContainer.classList.remove("hide");
    disableBoxes();
};

const goToLogin = () => {

    // optional: clear saved names
    localStorage.removeItem("playerO");
    localStorage.removeItem("playerX");

    // go back to login page
    window.location.href = "index.html";
};
newGameBtn.addEventListener("click", goToLogin);
resetBtn.addEventListener("click", resetGame);

 })   