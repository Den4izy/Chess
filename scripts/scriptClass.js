let deskDoc = document.querySelector('#desk');

let step = true;
let arrAllFigures = [];
let id;
class desk{
    arrCells = this.createCells();
    addAllCells(){
        for(let c of this.arrCells){
            this.addCell(c);
        }
    }
    addCell(cell){
        let textHTML = '<div id="' + cell.id + '" class = "' + cell.color + '"></div>';
        deskDoc.innerHTML += textHTML;
    }
    createAllFigures(){
        let arr = this.arrCells;
        for(let c of arr){
            if(c.color == 'black'){
                if(c.number == 8 || c.number == 7 || c.number == 6){
                    new figure(c, 'black', true);
                }
                else if(c.number == 3 || c.number == 2 || c.number == 1){
                    new figure(c, 'white', true);
                }
            }
        }
    }
    createCells(){
        let arrOfCells = [];
        let count;
        let color;
        for(let n = 8; n > 0; n--){
            if(n % 2 == 0){
                count = 0;
            }
            else{
                count = 1;
            }
            for(let w = 1; w < 9; w++){
                count += 1;
                if(count % 2 != 0){
                    color = 'white'; 
                }
                else{
                    color = 'black';
                }
                arrOfCells.push(new cell(w, n, color, false))
            }
        }
        return arrOfCells;
    }
    researchFigures(){
        for(let f of arrAllFigures){
            document.querySelector(f.cell.selector).innerHTML = '<div class="figure' + f.color + '"></div>';
            f.cell.haveFigure = true;
        }
    }
    researchCells(){
        for(let c of deskObj.arrCells){
            if(c.haveFigure == false){
                document.querySelector(c.selector).innerHTML = '';
            }
        }
    }
}

class cell{
    constructor(wordN, number, color, haveFigure){
        this.wordN = wordN;
        this.number = number;
        this.color = color;
        this.haveFigure = haveFigure;
        this.id = getWord(this.wordN) + number;
        this.selector = '#' + this.id;
    }
    haveFigure;
    wordN;
    number;
    color;
    id;
    selector;
}

class figure{
    cell;
    color;
    type;
    constructor(cell, color, type){
        this.cell = cell;
        this.type = type;
        if(this.type){
            this.color = color + " just";
        }
        else{
            this.color = color + " queen"
        }
        arrAllFigures.push(this);
    }
    delete(oldCell){
        for(let i = 0; i < arrAllFigures.length; i++){
            if(arrAllFigures[i].cell.id == oldCell.id){
                arrAllFigures.splice(i, 1);
                //remove(deskObj.arrFigures, k)
            }
        }
        deskObj.researchCells();
        deskObj.researchFigures();
    }
    move(cellCurrent, oldCell){
        new figure(cellCurrent, this.color.split(' ')[0], true);
        oldCell.haveFigure = false;
        this.delete(oldCell);
        if(step){
            step = false;
        }
        else{
            step = true;
        }
        //addClickFigures();
    }
    variantsMove(){
        needBit();
        let arrVariants = [];
        let wT = this.cell.wordN;
        let nT = this.cell.number;
        let w = wT - 1;
        let n;
        let arrBuf = [];
        if(this.color.split(' ')[0] == 'white'){
            if(w > 0 && w < 9){
                n = Number(nT) + 1;
                arrBuf.push(getWord(w) + n);
            }
            w = wT + 1;
            if(w > 0 && w < 9){
                n = Number(nT) + 1;
                arrBuf.push(getWord(w) + n);
            }
        }
        else{
            if(w > 0 && w < 9){
                n = Number(nT) - 1;
                arrBuf.push(getWord(w) + n);
            }
            w = wT + 1;
            if(w > 0 && w < 9){
                n = Number(nT) - 1;
                arrBuf.push(getWord(w) + n);
            }
        }
        for(let i of arrBuf){
            for(let c of deskObj.arrCells){
                if(i == c.id){
                    if(c.haveFigure == false){
                        arrVariants.push(c);
                        break;
                    }
                }
            }
        }
        return arrVariants;
    }
    neighborCells(){ // масів сусідніх клітинок
        let arrId = [];
        let arrCells = [];
        let wT = this.cell.wordN;
        let nT = this.cell.number;
        arrId.push(getWord(wT - 1) + Number(nT + 1));
        arrId.push(getWord(wT + 1) + Number(nT + 1));
        arrId.push(getWord(wT + 1) + Number(nT - 1));
        arrId.push(getWord(wT - 1) + Number(nT - 1));
        for(let i = 0; i < arrId.length; i++){
            if(arrId[i].length > 2 | Number(arrId[i][arrId[i].length - 1]) > 8){
                arrId.splice(i, 1);
                i--;
            }
        }
        for(let id of arrId){
            for(let c of deskObj.arrCells){
                if(id == c.id){
                    arrCells.push(c);
                    break;
                }
            }
        }
        return arrCells;
    }
    figureForCell(cell){ // визначаєм фігуру яка на клітинкі
        if( cell.haveFigure == false){
            return 'none';
        }
        else{
            for(let f of arrAllFigures){
                if(f.cell == cell){
                    return f;
                }
            }
        } 
    }
    enemyColor(figur){ // визначаємо чи ворожа фігура
        if(this.color == figur.color){
            return false;
        }
        else{
            return true;
        }
    }
    // визначаємо чи порожня клітинка за фігурою
    emptySellBackFigure(figur){ 
        let kX = figur.cell.wordN - this.cell.wordN;
        let kY = figur.cell.number - this.cell.number;
        let id = getWord(Number(figur.cell.wordN + kX)) + '' + Number(figur.cell.number + kY);
        let res = false;
        for(let c of deskObj.arrCells){
            if(id == c.id){
                if(c.haveFigure == false){
                    res = true;
                }
            }
        }
        return res;
    }
    // перевіряємо чи може дана фігура бить, якщо так то вертаємо її
    bit(){
        for(let c of this.neighborCells()){
            let f = this.figureForCell(c);
            if(f != 'none'){
                if(this.enemyColor(f)){
                    if(this.emptySellBackFigure(f)){
                        console.log('Need bit');
                        return this;
                    }
                }
            }
        }
    }
    
       

    
}
//////////////   START HERE!!!!   //////////////////////
let deskObj = new desk;
deskObj.addAllCells();
deskObj.createAllFigures();
deskObj.researchFigures();
deskObj.researchCells();
addClickFigures();
addClickBackLight();
/////////////////////////////////



function needBit(){
    let arr = [];
    for(let f of arrAllFigures){
        if(f.bit() != undefined){
            arr.push(f.bit());
        }
        
    }
}


function addClickBackLight(){
    document.querySelector('#desk').addEventListener('click', function(event){
        if(event.target.closest('.backLight')){
            function getCurrentCell(){
                let r;
                for(let c of deskObj.arrCells){
                    if(c.id == event.target.id){
                        return c;
                    }
                }
            }

            function getOldCell(){
                let r;
                for(let c of deskObj.arrCells){
                    if(c.id == id){

                        return c;

                    }
                }
            }
            function getFigure(){
                for(let f of arrAllFigures){
                    if(f.cell.id == id){
                        return f;
                    }
                }
            }
            let cell = getCurrentCell();
            let oldCell = getOldCell();
            getFigure().move(cell, oldCell);
            let elementsAll = document.querySelectorAll('.black, .white');
            // задаємо усім клітинкам стандартний стиль
            for(let el of elementsAll){
                el.classList.remove('backLight');
            }
        }
    })
}

function addClickFigures(){
    document.querySelector('#desk').addEventListener('click', function (event){
        let colorFigure;

        if(step){
            colorFigure = '.figurewhite';
        }
        else{
            colorFigure = '.figureblack';
        }

        if( event.target.closest(colorFigure)){
            function getCurrentFigure(){
                let r;
                for(let f of arrAllFigures){
                    if(f.cell.id == event.target.parentNode.id){
                        return f;
                    }
                }
            }


            id = event.target.parentNode.id;
            let elementsAll = document.querySelectorAll('.black, .white');
            // задаємо усім клітинкам стандартний стиль
            for(let el of elementsAll){
                el.classList.remove('backLight');``
            }

            for(let c of getCurrentFigure().variantsMove()){
                document.querySelector(c.selector).classList.add('backLight');
            }
        }
        else{
        }
    }); 
}




function getWord(num){
    let res = '';
    switch(num){
        case 1:
            res = 'a';
            break;
        case 2:
            res = 'b';
            break;
        case 3:
            res = 'c';
            break;
        case 4:
            res = 'd';
            break;
        case 5:
            res = 'e';
            break;
        case 6:
            res = 'f';
            break;
        case 7:
            res = 'g';
            break;
        case 8:
            res = 'h';
            break;
        default :
            res = 'none';
    }
    return res;
}



