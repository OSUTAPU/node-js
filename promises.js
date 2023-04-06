function loadData() {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://ghibliapi.herokuapp.com/films", true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = function() {
        reject(xhr.statusText);
      };
      xhr.send();
    });
  }
  
  loadData()
    .then(function(data) {
      console.log(data);
      // Виводимо дані на сторінку
      const filmsList = document.getElementById("filmsList");
      data.forEach(function(film) {
        const li = document.createElement("li");
        li.textContent = film.title;
        filmsList.appendChild(li);
      });
    })
    .catch(function(error) {
      console.error(error);
    });
  