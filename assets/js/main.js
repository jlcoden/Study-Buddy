console.log('Hello.');


function allowDropP(ev) {
    ev.preventDefault();
}
function dragP(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}
function dropP(ev) {
    ev.preventDefault();
    console.log(ev);    
    var data = ev.dataTransfer.getData('text');
    console.log(data);
    // var copyButton = document.createElement('div');
    let copyButton = $('<div>');
    copyButton.addClass((data === 'preferredTemplate') ? 'preferred event-template' : 'busy event-template');
    // copyButton.setAttribute('class', (data === 'preferredTemplate') ? '.busy.event-template' : 'buttonCannot');
    // var original = document.getElementById(data);
    // copyButton.src = original.src;
    //ev.target.appendChild(copyButton);
    //console.log(ev.target);
    $(ev.target).append(copyButton);    
}
