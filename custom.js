const players=(()=>{
    const markers=["X","O"];
    let arrPlayers=[];

    const createPlayer=function(name, marker){
        arrPlayers.push({name,marker});
    };
    const getPlayers=function(){
        return arrPlayers;
    };

    const getPlayerMarker=function(usrID){
        return arrPlayers[usrID].marker;
    };

    const getAvMarker=function(){
        if(arrPlayers.length){
            markers.splice(markers.indexOf(arrPlayers[0].marker),1);
            return markers;
        } else {
            return markers;
        }
    }
    return {getPlayerMarker,getAvMarker,getPlayers, createPlayer};
})();


const gameboard=(()=>{
    let board=[
        [" "," "," "],
        [" "," "," "],
        [" "," "," "]
        ];
    

    function loadBoard(){
        const virtBoard=document.querySelectorAll(".square");
        /*virtBoard.addEventListener("click",function(e){
             console.log(e.target.id);
        
        })*/
       const flatBoard=board.flat();
       for(let i=0;i<9;i++){
        virtBoard[i].textContent=flatBoard[i];
       }
    }

    const makeMove=function(usrColumn,usrRow, usrMarker){
        if(board[usrRow][usrColumn]==" "){
            board[usrRow][usrColumn]=usrMarker;
        }
    }
    const getBoard=function(){
        return board;
    }

    const getWin=function(){
        function getRows(){
            for(let i=0;i<3;i++){
                let curRow=board[i].slice(0,3);
                if(curRow[0]===curRow[1] && curRow[1]===curRow[2] && curRow[0]!=" "){
                return curRow[0];
                break;
            }
            }
        }

        function getColumn(){
            for(let i=0;i<3;i++){
                let curCol = board.map(x => x[i]); 
                if(curCol[0]===curCol[1] && curCol[1]===curCol[2] && curCol[0]!=" "){
                    return curCol[0];
                    break;
                }}

        }

        function getDiag(){
            if((board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!=" ") || (board[2][0]===board[1][1] && board[0][2]===board[1][1] && board[2][0]!=" ")){
                return board[1][1];
            }
        }

        if(getRows() || getColumn() || getDiag()){
        return getRows() || getColumn() || getDiag();
        } else if(board.flat().indexOf(" ")===-1){
            return "it's a tie";
        }
            
    }
    return {loadBoard,getWin,makeMove,getBoard}
})();

const manager=(()=>{
    let curPlayerIndex=0;
    function getCurPlayer(){
        return curPlayerIndex;
    }
    

    function toggleCurPlayer(){
        if(curPlayerIndex){
            curPlayerIndex=0;
        } else {
            curPlayerIndex=1;
        }
    }

    
    return {getCurPlayer,toggleCurPlayer};
})();






players.createPlayer("Josh","O");
console.log(players.getAvMarker());
players.createPlayer("Ernie","X");
console.log(players.getPlayers());




gameboard.makeMove( 1,1,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 0,0,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 2,0,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 0,2,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 0,1,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 2,1,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 1,2,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 1,0,players.getPlayerMarker(manager.getCurPlayer()));
manager.toggleCurPlayer();
gameboard.makeMove( 2,2,players.getPlayerMarker(manager.getCurPlayer()));

console.log(gameboard.getBoard());
console.log(gameboard.getWin());
gameboard.loadBoard();