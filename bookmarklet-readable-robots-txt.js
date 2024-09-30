javascript:(function(){
  fetch(window.location.origin + '/robots.txt')
    .then(response => response.text())
    .then(text => {
      let lines = text.split('\n');
      let output = "<pre style='font-family:monospace'>";
      
      lines.forEach(line => {
        line = line.trim();
        
        if (line.startsWith('User-agent:')) {
          output += "<strong style='color:blue'>" + line + "</strong><br>";
        } else if (line.startsWith('Disallow:')) {
          output += "<span style='color:red'>" + line + "</span><br>";
        } else if (line.startsWith('Allow:')) {
          output += "<span style='color:green'>" + line + "</span><br>";
        } else if (line) {
          output += line + "<br>";
        }
      });
      
      output += "</pre>";
      
      let modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '10%';
      modal.style.left = '10%';
      modal.style.width = '80%';
      modal.style.height = '80%';
      modal.style.backgroundColor = '#fff';
      modal.style.padding = '20px';
      modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      modal.style.overflowY = 'auto';
      modal.style.zIndex = '10000';
      modal.innerHTML = output;

      let closeButton = document.createElement('button');
      closeButton.innerText = 'Close';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.style.padding = '10px 20px';
      closeButton.style.cursor = 'pointer';
      closeButton.onclick = function() {
        document.body.removeChild(modal);
      };

      modal.appendChild(closeButton);
      document.body.appendChild(modal);
    })
    .catch(error => alert('Error fetching robots.txt: ' + error));
})();
