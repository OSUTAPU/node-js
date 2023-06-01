module.exports = (request, response) => {
  const url = request.url.split("?")[0];

  if (url === "/posts") {
    request.posts.push(request.body);
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(request.posts));
    response.end();
  } else {
    response.statusCode = 400;
    response.write(`CANNOT POST ${request.url}`);
    response.end();
  }
};
