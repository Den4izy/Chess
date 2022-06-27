
let docDesc = document.querySelector('#desk');
createDesk();
//addFiguereoOnDesk('black', 'g7');
addClickFigure();
let step = 1;

function createDesk(){
    let res = '';
    let count = 0;
    let cl;
    let figure = '';
    for(let n = 8; n > 0; n--){
        count++;
        if(n % 2 == 0){
            count = 0;
        }
        else{
            count = 1;
        }
        for(let w = 1; w < 9; w++){
            count += 1;
            let idOfCell = getWord(w) + '' + n;
            if(count % 2 != 0){
                cl = 'white'; 
                figure = '';
            }
            else{
                cl = 'black';
                if(n == 8 | n == 7 | n == 6){
                    figure = createFigure('black');
                }else if(n == 3 | n == 2 | n == 1){
                    figure = createFigure('white');
                }else{
                    figure = '';
                }
            }
            res += '<div id="' + idOfCell + '" class="' + cl + '">' + figure + '</div>';
        }
    }
    docDesc.innerHTML = res;
}
function createFigure(color){
    return '<div class="figure' + color + '"></div>';
}
function addFiguereoOnDesk(color, idCell){
    let id = '#' + idCell;
    document.querySelector(id).innerHTML = createFigure(color);
}
function move(idStart, idAnd){
    let idF = '#' + idStart;
    let idA = '#' + idAnd;
    document.querySelector(idA).innerHTML = document.querySelector(idF).innerHTML;
    document.querySelector(idF).innerHTML = '';
    addClickFigure()
}
// ф-я добавки кліка на шашку
function addClickFigure(){
    let elements = document.querySelectorAll('.figurewhite, .figureblack');
    let el;
    for(el of elements){
        el.addEventListener('click',e =>{
            let idCell = e.target.parentNode.id;
            let figureColor = e.target.className;
            if(step % 2 != 0 && figureColor == 'figurewhite'){
                console.log('step white');
                // перевірка можливих варіантів хода
                console.log(variationsOfStep(idCell, figureColor));
                
            }
            else if(step % 2 == 0 && figureColor == 'figureblack'){
                console.log('step black');
                console.log(variationsOfStep(idCell, figureColor));
            }
            console.log(idCell);
            console.log(figureColor);
            
        })
    }
    
}
// ф-я вертає масів з клітинками на які можна ходити даною фігурою
function variationsOfStep(idCell, color){
    let arrRes = [];
    let arr = idCell.split('');
    let first = getNumb(arr[0]);
    let last = arr[1];
    let f;
    let l;
    if(color == 'figurewhite'){
        console.log('first = ' + first);
        f = first - 1;
        if(f > 0 && f < 9){
            l = Number(last) + 1;
            arrRes.push(getWord(f) + '' + l);
        }
        f = first + 1;
        if(f > 0 && f < 9){
            l = Number(last) + 1;
            arrRes.push(getWord(f) + '' + l);
        }
    }
    else{
        f = first - 1;
        l = Number(last) - 1;
        arrRes[0] = getWord(f) + '' + l;
        f = first + 1;
        l = Number(last) - 1;
        arrRes[1] = getWord(f) + '' + l;s
    }
    backlightSteps(arrRes);

}
// ф-я підсвічує клітинки для можливих ходів
function backlightSteps(arrCell){
    console.log(arrCell);
    let elementsAll = document.querySelectorAll('.black, .white');
    let el;
    // задаємо усім клітинкам стандартний стиль
    for(el of elementsAll){
        el.style = 'border: none; width: 50px; height: 50px;';
    }
    for(let i = 0; i < arrCell.length; i++){
        arrCell[i] = '#' + arrCell[i];
    }
    console.log(arrCell);
    selector = arrCell.join(',');
    console.log('selector = ' + selector);
    // задаємо поточним клітинкам стиль підсвітки
    if(arrCell.length > 1){
        let elements = document.querySelectorAll(selector);
        for(let e of elements){
            if(emptyCell(e.id)){
                e.style = 'border: 5px solid red; width: 40px; height: 40px;';
            }  
        }
    }else{
        let id = '#' + arrCell[0];
        console.log('id = ' + id);
        let element = document.querySelector(selector);
        console.log('elem = ' + element);
        if(emptyCell(element.id)){
            element.style = 'border: 5px solid red; width: 40px; height: 40px;';
        }  
    }
       
}
// перевірка чи вільна клітинка та чи не виходить вона за межі
function emptyCell(idCell){
    let id = '#' + idCell;
    let i = getNumb(idCell.split('')[0]);
    console.log(i);
    if(i > 0 && i < 9){
        let elem = document.querySelector(id);
        if(elem.innerHTML == ''){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
    
    
}
function deleteFigureOnDesk(idCell){
    let id = '#' + idCell;
    document.querySelector(id).innerHTML = '';
}
function test(){
    move('e3', 'd4');
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
        console.log('limit')
    }
    return res;
}
function getNumb(letter){
    let res = '';
    switch(letter){
        case 'a':
            res = 1;
            break;
        case 'b':
            res = 2;
            break;
        case 'c':
            res = 3;
            break;
        case 'd':
            res = 4;
            break;
        case 'e':
            res = 5;
            break;
        case 'f':
            res = 6;
            break;
        case 'g':
            res = 7;
            break;
        case 'h':
            res = 8;
            break;
        default :
        console.log('errorGetWord')
    }
    return res;
}

