var http = require("http"); 
var url = require("url") ;
var RandBytes = new require("randbytes"); 

var randomSource = new RandBytes.urandom({
  filePath: "/dev/hwrng"
      });


function start()
{ 
  function onRequest(request, response)
  {
    var pathname = url.parse(request.url).pathname; 
    console.log("Request for " + pathname + " recived.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    
    var randNum;
    RandBytes.getRandomBytes(2, function(buff) {
	randNum = buff[0] + buff[1] * 256;});
    response.write ("" + randNum); 
    
    response.write("password"); 
    response.end(); 
  }

  http.createServer(onRequest).listen(9000); 
  
  console.log("wat"); 

}

start()
