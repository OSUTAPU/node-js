async function loadData() {
    const response = await fetch("https://ghibliapi.herokuapp.com/films");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.statusText);
    }
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
  