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
        console.log('errorGetWord')
    }
    return res;
}

function addFiguereoOnDesk(color, idCell){
    let id = '#' + idCell;
    document.querySelector(id).innerHTML = createFigure(color);
}