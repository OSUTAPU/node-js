module.exports = (request, response) => {
  const url = request.url.split("?")[0];

  if (url === "/posts" && request.query.searchParams.has("id")) {
    const id = request.query.searchParams.get("id");
    request.posts.splice(id, 1);
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(request.posts));
    response.end();
  } else {
    response.statusCode = 400;
    response.write(`CANNOT DELETE ${request.url}`);
    response.end();
  }
};
