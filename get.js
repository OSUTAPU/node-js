module.exports = (request, response) => {
  const url = request.url.split("?")[0];

  if (url === "/posts") {
    const id = request.query.searchParams.get("id");

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");

    if (id) {
      response.write(JSON.stringify(request.posts[id]));
    } else {
      response.write(JSON.stringify(request.posts));
    }

    response.end();
  } else {
    response.statusCode = 400;
    response.write(`CANNOT GET ${request.url}`);
    response.end();
  }
};
