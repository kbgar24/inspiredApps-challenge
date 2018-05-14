
    const canvas = document.getElementById('canvas');
    const emptyLogo = document.getElementById('emptyLogo');
    const redDot = document.getElementById('redDot');
    const blackDot = document.getElementById('blackDot');
    const greenDot = document.getElementById('greenDot');
    const blueDot = document.getElementById('blueDot');
    const ctx = canvas.getContext('2d');

    let dotPositions = initialDots();
    let canDrag = true;
    let mouseX;
    let mouseY;
    let startX;
    let startY;

    ctx.drawImage(emptyLogo, 75, 100, 350, 350);
    initialDots().forEach(({ src, x, y, w, h }) => {
      ctx.drawImage(src, x, y, w, h);
    })

    const resetPositions = () => {
      for (let solution in solutionLocations) {
        solutionLocations[solution].occupied = false;
      }
      dotPositions = initialDots();
      draw();
    }
      
    const mouseWithinDot = (mouseX, mouseY, dot) => (
      mouseX > dot.x && mouseX < dot.x + dot.w && mouseY > dot.y && mouseY < dot.y + dot.h
    )

    const mouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const canvasBounds = canvas.getBoundingClientRect();
        const offsetX = canvasBounds.left;
        const offsetY = canvasBounds.top;

        mouseX = parseInt(e.clientX) - offsetX;
        mouseY = parseInt(e.clientY) - offsetY;
        canDrag = false;

        for (let dot of dotPositions) {
          if (dot.notDraggable){
            continue;
          }
          if (mouseWithinDot(mouseX, mouseY, dot)) {
            canDrag = true;
            dot.isDragging = true;
          }
        }

        startX = mouseX;
        startY = mouseY;

    }
      
    const isDotInCircle = (midPoint, dotX, dotY) => {
        const distanceSquared = Math.pow((dotX - midPoint.x + 30), 2) + Math.pow((dotY - midPoint.y + 30), 2)
        const distance = Math.sqrt(distanceSquared);
        return 42.5 > (distance + 27.5)
    }
      
    const returnDotToStart = (dot) => {
        const initial = initialDots().find((initial) => initial.name === dot.name );
        dot.x = initial.x;
        dot.y = initial.y;
        draw();
    }

   

    const handleDotOnTarget = () => {
        dotPositions.forEach((dot, i) => { 
            dot.isDragging = false;
            for (let solution in solutionLocations) {
              const target = solutionLocations[solution];
              if (!target.occupied && dot.type === target.type && isDotInCircle(target.midPoint, dot.x, dot.y)) {
                dotPositions[i].x = target.dotLocation.x;
                dotPositions[i].y = target.dotLocation.y;
                dotPositions[i].notDraggable = true;
                dotPositions[i].isComplete = true;
                target.occupied = true;
                draw();
                setTimeout( checkFinished, 150);
              } 
            }
            !dotPositions[i].isComplete && returnDotToStart(dot);
        })
    }

    const checkFinished = () => {
      const count = Object.keys(solutionLocations).reduce((tv, cv) => {
        return solutionLocations[cv].occupied ? ++tv : tv;
      },0);
      count === 5 && swal("Great Job!", "You have successfully fixed the InspiredApps logo!", "success");
    }

    const mouseMove = (e) => {
        if (canDrag) {
            e.preventDefault();
            e.stopPropagation();

            const canvasBounds = canvas.getBoundingClientRect();
            const offsetX = canvasBounds.left;
            const offsetY = canvasBounds.top;

            mouseX = parseInt(e.clientX) - offsetX;
            mouseY = parseInt(e.clientY) - offsetY;

            const dX = mouseX - startX;```
            const dY = mouseY - startY;
            
            for (let dot of dotPositions) {
              if (dot.isDragging) {
                dot.x += dX;
                dot.y += dY;
              }
            }

            draw();

            startX = mouseX;
            startY = mouseY;

        }
    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const draw = () => {
        clearCanvas();
        dotPositions.forEach(({ src, x, y, w, h, isDragging }) => {
            isDragging && $('#canvas').css('cursor', 'grab');   
            ctx.drawImage(src, x, y, w, h);
        })
    }

    const mouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        canDrag = false;
        handleDotOnTarget()
    }

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp
    canvas.onmousemove = mouseMove
