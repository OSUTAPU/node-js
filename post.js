module.exports = (request, response) => {
  // Вибір дії залежно від ссилки запиту
  switch (request.url) {
      case "/posts":
          // Додавання тіла запиту до масиву постів
          request.posts.push(request.body);

          // Встановлюємо статус що все круто
          response.statusCode = 200;

          // Встановлення заголовка
          response.setHeader("Content-Type", "application/json");

          // Відправлення відповіді з усіма постами у форматі JSON
          response.write(JSON.stringify(request.posts));

          response.end();
          break;
      default:
          // Встановлюємо статус що все так собі
          response.statusCode = 400;

          // Відправлення повідомлення про помилку, що неможливо зробити POST запит
          response.write(`CANNOT POST ${request.url}`);

          response.end();
  }
};
