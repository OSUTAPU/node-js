module.exports = (request, response) => {
    // Отримуємо ссилку без параметрів запиту
    const url = request.url.split("?")[0];

    switch(url) {
        case "/posts":
            // Перевіряємо, чи є параметр айді у запиті
            if (request.query.searchParams.get("id")) {
                // Отримуємо айдішку з параметрів запиту
                const id = request.query.searchParams.get("id");

                // Встановлюємо статус що все круто
                response.statusCode = 200;

                // Встановлюємо заголовок 
                response.setHeader("Content-Type", "application/json");

                // Відправляємо відповідь з постом за вказаним ідентифікатором у форматі JSON
                response.write(JSON.stringify(request.posts[id]));

                response.end();
            } else {
                // Встановлюємо статус що все круто
                response.statusCode = 200;

                // Встановлюємо заголовок 
                response.setHeader("Content-Type", "application/json");

                // Відправляємо відповідь з усіма постами у форматі JSON
                response.write(JSON.stringify(request.posts));

                response.end();
            }
            break;
        default:
            // Встановлюємо статус що все так собі
            response.statusCode = 400;

            // якщо ресурс не можна отримати, то буде помилка
            response.write(`CANNOT GET ${request.url}`);

            response.end();
            break;
    }
};
