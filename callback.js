function loadData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ghibliapi.herokuapp.com/films", true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(xhr.statusText, null);
      }
    };
    xhr.onerror = function() {
      callback(xhr.statusText, null);
    };
    xhr.send();
  }
  
  loadData(function(error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      // Виводимо дані на сторінку
      const filmsList = document.getElementById("filmsList");
      data.forEach(function(film) {
        const li = document.createElement("li");
        li.textContent = film.title;
        filmsList.appendChild(li);
      });
    }
  });
  