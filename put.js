module.exports = (request, response) => {
    // Отримання частини ссилки перед знаком питання о_0
    const url = request.url.split("?")[0];

    // Вибір дії залежно від ссилки
    switch (url) {
        case "/posts":
            const id = request.query.searchParams.get("id");

            response.statusCode = 200;

            response.setHeader("Content-Type", "application/json");

            // Зміна посту з вказаною айдішкою на новий пост з тілом запиту
            request.posts[id] = request.body;

            // Відправлення зміненого посту у форматі JSON
            response.write(JSON.stringify(request.posts[id]));

            response.end();
            break;
        default:
            response.statusCode = 400;

            // не можна зробити пут запит
            response.write(`CANNOT PUT ${request.url}`);

            response.end();
            break;
    }
};
