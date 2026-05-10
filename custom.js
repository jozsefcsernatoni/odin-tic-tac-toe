const game=(()=>{

const allHeaderInput=document.querySelectorAll(".header>input");
const allHeaderSelectors=document.querySelectorAll(".header>select")

function gameStatus(){
    let gameOn=false;
    const setGame=function(state){
        gameOn=state;
    }
    const getGame=function(){
        return gameOn;
    }
    return {setGame,getGame};
}

const gameSwitch=gameStatus();

function curPlayerMan(){
    let curPlayerIndex=1;
    const getcurPlayerIndex=function(){
        if(curPlayerIndex){
            curPlayerIndex=0;
        } else {
            curPlayerIndex=1;
        }
        return curPlayerIndex;
    };

const resetcurPlayerIndex=function(){
    curPlayerIndex=1;
    return curPlayerIndex;
}

    return{getcurPlayerIndex,resetcurPlayerIndex};
}

const playerIndex=curPlayerMan();

function playerMan(){
    let arrPlayers=[];

    function nodeValue(nodeArr){
    let arr=[];
    nodeArr.forEach(element => {
        arr.push(element.value);
    });
    return arr;
    }

   

    const setPlayers=function(nameNodeL, markerNodeL){
        let inputs=nodeValue(nameNodeL);
        let selectors=nodeValue(markerNodeL);
        for(let i=0;i<inputs.length; i++){
                let player={name:inputs[i], 
                marker:selectors[i]
            };
    arrPlayers.push(player);
    }
 
    }
    const clearPlayers=function(){
        arrPlayers=[];
    }

    const getPlayers=function(){
        return arrPlayers;
    }
   return {setPlayers,clearPlayers,getPlayers};
}


const playerMaker=playerMan();

function boardMan(){
let board=[
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    const getBoard=function(){
        return board;
    }
    const resetBoard=function(){
        board=[
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    }
    return {getBoard,resetBoard};
}

const boardManager=boardMan();




const init=function(){
    window.addEventListener("load",function(e){
        playerMaker.setPlayers(allHeaderInput,allHeaderSelectors); 

    })
}

const startGame=function(){
    const btStart=document.querySelector("#btnstart");
    btStart.addEventListener("click",function()
    {
        gameSwitch.setGame(true);
        btStart.textContent="Restart";;
        if(btStart.textContent==="Restart"){
        boardManager.resetBoard();
        playerIndex.resetcurPlayerIndex();
        displayUnit.setDisplay("");
        readBoard();
        }
    }
);
}




const readBoard=function(){
    
    const virtBoard=document.querySelectorAll(".square");
    for(let i=0;i<virtBoard.length;i++){
        let [usrColumn,usrRow]=virtBoard[i].id;
        virtBoard[i].textContent=boardManager.getBoard()[usrColumn][usrRow];
    }
}

//
const getWin=function(){
function getRows(){
            for(let i=0;i<2;i++){
                let curRow=boardManager.getBoard()[i].slice(0,3);
                if(curRow[0]===curRow[1] && curRow[1]===curRow[2] && curRow[0]!=""){
                return curRow[0];  
            }
            }
        }

        function getColumn(){
            for(let i=0;i<2;i++){
                let curCol = boardManager.getBoard().map(x => x[i]); 
                if(curCol[0]===curCol[1] && curCol[1]===curCol[2] && curCol[0]!=""){
                    return curCol[0];
                }}

        }

        function getDiag(){
            if((boardManager.getBoard()[0][0]===boardManager.getBoard()[1][1] && boardManager.getBoard()[1][1]===boardManager.getBoard()[2][2] && boardManager.getBoard()[0][0]!="") || (boardManager.getBoard()[2][0]===boardManager.getBoard()[1][1] && boardManager.getBoard()[0][2]===boardManager.getBoard()[1][1] && boardManager.getBoard()[2][0]!=" ")){
                return boardManager.getBoard()[1][1];
            }
        }

        if(getRows() || getColumn() || getDiag()){
            playerMaker.getPlayers().filter(function(el){
                const winMarker=getRows() || getColumn() || getDiag();
                if(el.marker===winMarker){
                    displayUnit.setDisplay("And the winner is: " +el.name);
                    gameSwitch.setGame(false);
                }
                
               
            });
        } else if(boardManager.getBoard().flat().indexOf("")===-1){
            displayUnit.setDisplay("It's a tie!");
            gameSwitch.setGame(false);
        }
    }





const readClicks=function(){
    const divContainer=document.querySelector(".container");
        divContainer.addEventListener("click",function(e){
        let [usrColumn,usrRow]=e.target.id;
        if(boardManager.getBoard()[usrColumn][usrRow]=="" && gameSwitch.getGame()){
            boardManager.getBoard()[usrColumn][usrRow]=allHeaderSelectors[playerIndex.getcurPlayerIndex()].value;
            readBoard();
            
            getWin();
        }
        });
    
}

const updateName=function(){
const btnEdit=document.querySelector("#btnedit");


btnEdit.addEventListener("click",function(e){
    if(e.target.textContent==="Edit"){
        for(let i=0;i<allHeaderInput.length;i++){
            allHeaderInput[i].removeAttribute("disabled");
            allHeaderSelectors[i].removeAttribute("disabled");
    }
        
    btnEdit.textContent="Save";
    }  else if(e.target.textContent==="Save"){
            for(let i=0;i<allHeaderInput.length;i++){
            allHeaderInput[i].setAttribute("disabled","");
            allHeaderSelectors[i].setAttribute("disabled","");
            } 
            playerMaker.clearPlayers();       
            playerMaker.setPlayers(allHeaderInput,allHeaderSelectors);  
            btnEdit.textContent="Edit";
            }
    });


   
    {
        allHeaderSelectors[0].addEventListener("change",function(ev){
            if(allHeaderSelectors[0].selectedIndex==0){
                allHeaderSelectors[1].selectedIndex=1;            }  
                else {allHeaderSelectors[1].selectedIndex=0;}    
        } 
    );}
    allHeaderSelectors[1].addEventListener("change",function(ev){
            if(allHeaderSelectors[1].selectedIndex==0){
                allHeaderSelectors[0].selectedIndex=1;            }  
                else {allHeaderSelectors[0].selectedIndex=0;}    
        } 
    );



   
}


function displayMan(){
    const display=document.querySelector(".display");

    const setDisplay=function(content){
        display.textContent=content;
    }
    return {setDisplay};
}
const displayUnit=displayMan();


init();
updateName();
startGame();
readBoard();
readClicks();

})();