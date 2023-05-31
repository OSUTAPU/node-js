const fs = require("fs");

module.exports = (request, response, next) => {
    // Створення порожнього масиву для зберігання даних
    let data = [];

    // Обробник події "data"
    request.on("data", dataChunk => {
        // Додавання отриманих даних до масиву
        data.push(dataChunk);
    });

    // Обробник події "end"
    request.on("end", () => {
        // Об'єднання всіх отриманих даних і конвертація у рядок
        request.body = Buffer.concat(data).toString();

        // Перевірка заголовка
        if (request.headers["content-type"] === "application/json") {
            // Парсинг тіла запиту з формату JSON у об'єкт
            request.body = JSON.parse(request.body);
        }

        next(request, response);
    });
};