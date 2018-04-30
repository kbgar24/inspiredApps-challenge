    
    $('#challenge-info').click(() => {
        swal({
          title: 'About the App',
          type: 'info',
          html:
            '<p>The first tool was built using ReactJS and ' +
            '<a target="_blank" href="https://react-dnd.github.io/react-dnd/">ReactDnD</a>' +
            ', a popular drag-and-drop library created by Redux author Dan Abramov</p>' +
            '<p>The second tool was built using vanilla JavaScript and the native ' +
            '<a target="blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">HTML5 Canvas API</a>.</p>',
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        })
    })

    $('#challenge-help').click(() => {
        swal({
          title: 'Game Play',
          html:
            '<p>Using one of the provided tools, drag and drop each dot onto its appropriate spot in the InspireApps logo</p>.'+ 
            '<p> When properly placed, the selected dot will snap into place. When impoperly placed, the selected dot will return to its starting position.</p>'+
            '<p>The task is complete when all the dots have been correctly placed on the logo.</p>'+
            '<p>Good luck!</p>' ,
          confirmButtonText: 'Thanks!',
          imageUrl: '/assets/img/ia-logo-complete.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'InspiredApps Logo',
        })
    })

    for (let i in document.links) {
      document.links[i].onfocus = document.links[i].blur;
    }