let docDesc = document.querySelector('#desk');
createDesk();
let step = true;
let idCellGlob;
let elementsGlob;
let selectorGlob;
addClickFigure();

//case: ф-я перевірки чи потрібно бити needBeat(color) вертає boolean

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
// ф-я робить хід(в параметрах початковий id клітинки та кінцевий)
function move(idStart, idAnd){
    console.log('move: ' + idStart + '-' + idAnd)
    let idF = '#' + idStart;
    let idA = '#' + idAnd;
    document.querySelector(idA).innerHTML = document.querySelector(idF).innerHTML;
    document.querySelector(idF).innerHTML = '';
    let el = document.querySelectorAll('.black');
    if (step){
        step = false;
    }
    else{
        step = true;
    }
    addClickFigure();
}
// ф-я добавки кліка на шашку
function addClickFigure(){
    if(step){
        console.log('stepWhite');
        let elements = document.querySelectorAll('.figurewhite');
        let elements2 = document.querySelectorAll('.figureblack');
        let el;
        let elb;
        for(elb of elements2){
            elb.removeEventListener('click', listenForClickFigure,{once: true});
        }
        for(el of elements){
            el.addEventListener('click', listenForClickFigure,{once: true});
        }
    }
    else{
        console.log('stepBlack');
        let elements = document.querySelectorAll('.figureblack');
        let elements2 = document.querySelectorAll('.figurewhite');
        let el2;
        let el2w;
        for(el2w of elements2){
            el2w.removeEventListener('click', listenForClickFigure,{once: true});
        }
        for(el2 of elements){
            el2.addEventListener('click', listenForClickFigure, {once: true});
        }
    }
    //let elements = document.querySelectorAll('.figurewhite, .figureblack');
    // let el;
    // for(el of elements){
    //     el.addEventListener('click',e =>{
    //         let idCell = e.target.parentNode.id;
    //         let figureColor = e.target.className;
    //         if(step % 2 != 0 && figureColor == 'figurewhite'){
    //             console.log('step white');
    //             // перевірка можливих варіантів хода
    //             variationsOfStep(idCell, figureColor);
    //         }
    //         else if(step % 2 == 0 && figureColor == 'figureblack'){
    //             console.log('step black');
    //             variationsOfStep(idCell, figureColor);
    //         }
    //     })
    // }
    
}
function listenForClickFigure(event){
    // ф-я винесена окремо так як анонімна функція не має ссилки і її не можна убрать з EvenListener
    // так шо пришлось трохи по їбаться
    let idCell = event.target.parentNode.id;
    let figureColor = event.target.className;
    variationsOfStep(idCell, figureColor);
}
function listenForBackLights(event){
    // ф-я використовується де більше одного варіанту
    // там де 1 варіант там вложена ф-я
    // ф-я винесена окремо так як анонімна функція не має ссилки і її не можна убрать з EvenListener
    // так шо пришлось трохи по їбаться
    move(idCellGlob, event.target.id);
    //e.target.style = 'border: none; width: 50px; height: 50px;';
    let k;
    for(k of elementsGlob){
        k.removeEventListener('click', listenForBackLights);
    }
    for(let el of document.querySelectorAll(selectorGlob)){
        el.style = 'border: none; width: 50px; height: 50px;';
    }
}
// ф-я визначає варіанти можливих ходів
function variationsOfStep(idCell, color){
    let arrRes = [];
    let arr = idCell.split('');
    let first = getNumb(arr[0]);
    let last = arr[1];
    let f;
    let l;
    if(color == 'figurewhite'){
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
        if(f > 0 && f < 9){
            l = Number(last) - 1;
            arrRes.push(getWord(f) + '' + l);
        }
        f = first + 1;
        if(f > 0 && f < 9){
            l = Number(last) - 1;
            arrRes.push(getWord(f) + '' + l);
        }
    }
    backlightSteps(arrRes, idCell);

}

// ф-я підсвічує клітинки для можливих ходів
function backlightSteps(arrCell, idCell){
    idCellGlob = idCell;
    let elementsAll = document.querySelectorAll('.black, .white');
    let el;
    // задаємо усім клітинкам стандартний стиль
    for(el of elementsAll){
        el.style = 'border: none; width: 50px; height: 50px;';
    }
    for(let i = 0; i < arrCell.length; i++){
        arrCell[i] = '#' + arrCell[i];
    }
    let selector = arrCell.join(',');
    selectorGlob = selector;
    if(arrCell.length > 1){
        let elements = document.querySelectorAll(selector);
        elementsGlob = elements
        for(let e of elements){
            if(emptyCell(e.id)){
                e.style = 'border: 5px solid red; width: 40px; height: 40px;';
                e.addEventListener('click', listenForBackLights);
            }  
        }
    }else{
        let element = document.querySelector(selector);
        if(emptyCell(element.id)){
            element.style = 'border: 5px solid red; width: 40px; height: 40px;';
            element.addEventListener('click', function funk(){
                move(idCell, element.id)
                //e.target.style = 'border: none; width: 50px; height: 50px;';
                for(el of elementsAll){
                    el.style = 'border: none; width: 50px; height: 50px;';
                }
                element.removeEventListener('click', funk);
            });
        }  
    }
}
function needFights(color){
    let arrRes;
    let color2;
    let elements = document.querySelectorAll('.' + color);
    if(color == 'figurewhite'){
        color2 = 'figureblack';
    }
    else{
        color2 = 'figurewhite';
    }
    let elements2 = document.querySelectorAll('.' + color);
    for(let el of elements){
        let idCell = el.parentNode.id;
        let arrId = idCell.split('');
        let i = getNumb(arrId[0]);
        let k = arrId[1];
        for(let x = 1; x < 5; x++){
            if(i > 2 & k > 2){
                let a = k - 1;
                let a2 = k - 2;
                let id = '#' + getWord(i - 1) + a;
                let id2 = '#' + getWord(i - 2) + a2;
                if(document.querySelector(id).innerHTML != ''){
                    if(document.querySelector(id).childNodes[0]){

                    }
                }
            }
        }
        if(i > 2 & i < 7){
            if( k > 2 & k < 7){

            }
        }
    }
    return arrRes;
}
// перевірка чи вільна клітинка
function emptyCell(idCell){
    let id = '#' + idCell;
    let i = getNumb(idCell.split('')[0]);
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

function emptyFunk(){
    //console.log('emptyFunc');
}

