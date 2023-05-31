module.exports = (request, response) => {
  // Отримуємо посилання без параметрів запиту
  const url = request.url.split("?")[0];

  switch (url) {
    case "/posts":
      // Отримуємо айдішку з параметрів запиту
      const id = request.query.searchParams.get("id");

      // Встановлюємо статус що все круто
      response.statusCode = 200;

      // Встановлюємо заголовок
      response.setHeader("Content-Type", "application/json");

      // Видаляємо пост з масиву за вказаним айді
      request.posts.splice(id, 1);

      // Відправляємо відповідь з масивом у форматі JSON
      response.write(JSON.stringify(request.posts));

      response.end();
      break;
    default:
      // Встановлюємо статус що все так собі
      response.statusCode = 400;

      // якщо ресурс не можна видалити, то буде помилка
      response.write(`CANNOT DELETE ${request.url}`);

      response.end();
      break;
  }
};
