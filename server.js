const http = require("http");
const fs = require("fs");

// Встановлення порту для сервера
const PORT = process.env.PORT || 4000;

// Підключення модулів з різними обробниками запитів
const get = require("./get");
const post = require("./post");
const put = require("./put");
const deleteR = require("./delete");

// Підключення модуля з даними постів
const posts = require("./data");

// Підключення модуля для отримання тіла запиту
const getBody = require("./getBody");

// Створення сервера HTTP
const server = http.createServer((request, response) => {
    // Передача даних постів у об'єкт запиту
    request.posts = posts;

    // Створення об'єкту запиту для отримання параметрів запиту
    request.query = new URL(request.url, `http://${request.headers.host}`);

    // Вибір обробника запиту залежно від методу
    switch (request.method) {
        case "GET":
            getBody(request, response, get);
            break;
        case "POST":
            getBody(request, response, post);
            break;
        case "PUT":
            getBody(request, response, put);
            break;
        case "DELETE":
            getBody(request, response, deleteR);
            break;
        default:
            response.statusCode = 400;

            // Відправлення повідомлення що відповіді нема
            response.write("No Response");

            response.end();
    }
});

// Запуск сервера на вказаному порті
server.listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`API Server is running on port ${PORT}`);
    }
});
