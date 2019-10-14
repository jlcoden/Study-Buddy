// Snapping example thumbs up
var element = document.getElementById('grid-snap')
var x = 0; var y = 0

interact(element)
    .draggable({
        modifiers: [
            interact.modifiers.snap({
                targets: [
                    interact.createSnapGrid({ x: 30, y: 30 })
                ],
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            interact.modifiers.restrict({
                restriction: element.parentNode,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                endOnly: true
            })
        ],
        inertia: true
    })
    .on('dragmove', function (event) {
        x += event.dx
        y += event.dy

        event.target.style.webkitTransform =
            event.target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'
    });

// Snapping example thumbs down, suffix "1" added to original code
var element1 = document.getElementById('grid-snap1')
var x1 = 0; var y1 = 0

interact(element1)
    .draggable({
        modifiers: [
            interact.modifiers.snap({
                targets: [
                    interact.createSnapGrid({ x1: 30, y1: 30 })
                ],
                range: Infinity,
                relativePoints: [{ x1: 0, y1: 0 }]
            }),
            interact.modifiers.restrict({
                restriction: element.parentNode,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                endOnly: true
            })
        ],
        inertia: true
    })
    .on('dragmove', function (event) {
        x1 += event.dx
        y1 += event.dy

        event.target.style.webkitTransform =
            event.target.style.transform =
            'translate(' + x1 + 'px, ' + y1 + 'px)'
    });