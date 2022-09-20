const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method  = req.method;

    
  if (url === "/") {
    res.write("<html>");
    res.write("<head><tilte> Enter Chat.</title></head>");
    res.write(
      "<body><form action='/urlPath' method='POST'><input type='text' name='any><button cursor='pointer' type='submit'>Send</button></form></body>"
    );
    res.write("</html");
    res.end();
    return res.end();
  }
  if (url === "/urlPath" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
        const parserBody = Buffer.concat(body).toString();
        const any = parserBody.split('=')[1];
    fs.writeFileSync("urlPath.txt", any, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    });
        console.log(parserBody);
    });
  }
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><tilte> My First Node.</title></head>");
  res.write("<body><h1>Hello From Node.</h1></body>");
  res.write("</html");
  res.end();
}
//   module.exports = requestHandler; 
module.export = {
    handler : requestHandler,
    someText : 'some hard coded text'

}

//   module.exports.someText = 'some hard coded text';
//   module.exports.handler = requestHandler;
  exports.someText = 'some hard coded text';
  exports.handler = requestHandler;

