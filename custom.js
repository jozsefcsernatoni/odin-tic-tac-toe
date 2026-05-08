const game=(()=>{
let arrPlayers=[];
let board=[
        ["","",""],
        ["","",""],
        ["","",""]
    ];

const arrMarkers=["X","O"];
let curPlayerIndex=0;

const createPlayer=function (name, marker){
    let player={name,marker};
    arrPlayers.push(player);
}


const readBoard=function(){
    
    const virtBoard=document.querySelectorAll(".square");
    for(let i=0;i<virtBoard.length;i++){
        let [usrColumn,usrRow]=virtBoard[i].id;
        virtBoard[i].textContent=board[usrColumn][usrRow];
    }
}

//
const getWin=function(){
function getRows(){
            for(let i=0;i<3;i++){
                let curRow=board[i].slice(0,3);
                if(curRow[0]===curRow[1] && curRow[1]===curRow[2] && curRow[0]!=""){
                return curRow[0];  
            }
            }
        }

        function getColumn(){
            for(let i=0;i<3;i++){
                let curCol = board.map(x => x[i]); 
                if(curCol[0]===curCol[1] && curCol[1]===curCol[2] && curCol[0]!=""){
                    return curCol[0];
                }}

        }

        function getDiag(){
            if((board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!="") || (board[2][0]===board[1][1] && board[0][2]===board[1][1] && board[2][0]!=" ")){
                return board[1][1];
            }
        }

        if(getRows() || getColumn() || getDiag()){
            arrPlayers.filter(function(el){
                const winMarker=getRows() || getColumn() || getDiag();
                if(el.marker===winMarker){
                    console.log (el.name);
                }
                
               
            });
        } else if(board.flat().indexOf("")===-1){
            console.log ("it's a tie");
        }
    }


//

const readCurPlayerIndex=function(){
const tempPlayer=curPlayerIndex;
if (curPlayerIndex){
    curPlayerIndex=0;
} else {
    curPlayerIndex=1;
}
return tempPlayer;
}


const readClicks=function(){
    const divContainer=document.querySelector(".container");
    divContainer.addEventListener("click",function(e){
        let [usrColumn,usrRow]=e.target.id;
        if(board[usrColumn][usrRow]==""){
            board[usrColumn][usrRow]=arrMarkers[readCurPlayerIndex()];
            readBoard();
            console.log(board);
            
            getWin();
        }
    });
}

const updateName=function(){
    const btnEdit=document.querySelector("#btnedit");
    const allHeader=document.querySelectorAll(".header>*");
    const selectors=document.querySelectorAll("select");

    selectors[0].addEventListener("change",function(ev){
            if(selectors[0].selectedIndex==1){
                selectors[1].selectedIndex=2;            }  
                else {selectors[1].selectedIndex=1;}    
        } 
    );
    selectors[1].addEventListener("change",function(ev){
            if(selectors[1].selectedIndex==1){
                selectors[0].selectedIndex=2;            }  
                else {selectors[0].selectedIndex=1;}    
        } 
    );



    btnEdit.addEventListener("click",function(e){
        if(e.target.textContent==="Edit"){
           for(let i=0;i<selectors.length;i++) 
          {
                for(let j=0;j<arrMarkers.length;j++){
                    const option=document.createElement("option");
                    option.value=arrMarkers[j];
                    option.id=arrMarkers[j];
                    option.textContent=arrMarkers[j];
                    selectors[i].appendChild(option);
                } 
              }
           





            let temp;
            for(let i=0; i<allHeader.length; i++){
                if(allHeader[i].classList.contains("hide")) {
                    allHeader[i].classList.toggle("hide");
                    
                } else if(!(allHeader[i].classList.contains("show"))){
                    allHeader[i].classList.toggle("hide");
     
                }
            if(allHeader[i].tagName=="DIV"){
                temp=allHeader[i].textContent;
            }
             if(allHeader[i].tagName=="INPUT"){
                allHeader[i].value=temp ;

            }
            }
                btnEdit.textContent="Save";
            } else if(e.target.textContent==="Save"){
                let inputs=[];
                    let sel=[];

                for(let i=0; i<allHeader.length; i++){
                if(allHeader[i].classList.contains("hide")) {
                    allHeader[i].classList.toggle("hide");
                    
                } else if(!(allHeader[i].classList.contains("show"))){
                    allHeader[i].classList.toggle("hide");
     
                }
            }


                for(let i=0; i<allHeader.length; i++){
                    
                if(allHeader[i].tagName=="INPUT"){
                    inputs.push(allHeader[i].value );
                }
                if(allHeader[i].tagName=="SELECT"){
                    sel.push(allHeader[i].value) ;
                }
                
                }
                    if(arrPlayers.length===0){
                        
                        createPlayer(inputs[0],sel[0]);
                        createPlayer(inputs[1],sel[1]);
                    }
                        
                    else {
                        arrPlayers=[];
                        createPlayer(inputs[0],sel[0]);
                        createPlayer(inputs[1],sel[1]);
                    }
                    console.log(arrPlayers);
                }
       
    });
}



updateName();
readBoard();
readClicks();

//console.log(player1);

// user input to create users
let usrPlayer1="";

//console.log(usrPlayer1Mark());

// show the board
//console.log(readBoard());

// make move


})();