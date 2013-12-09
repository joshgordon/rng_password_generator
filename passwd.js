var http = require("http"); 
var url = require("url") ;
var RandBytes = new require("randbytes"); 
var fs = require("fs"); 

var randomSource = new RandBytes.urandom({
  filePath: "/dev/hwrng"
      });


function pathToInt(path)
{ 
  var out = path.replace(/[^0-9]/g, ''); 
  return parseInt(out, 10); 
}

function start()
{ 
  function onRequest(request, response)
  {
    var pathname = url.parse(request.url).pathname; 
    console.log("Request for " + pathname + " recived.");
    var times = pathToInt(pathname); 
    console.log("Looping " + times + " times"); 

    response.writeHead(200, {"Content-Type": "text/plain"});

    var file = fs.readFileSync('./diceware8k.txt', 'utf-8'); 
    var lines = file.split('\n'); 
    
    response.write("password: "); 

    for (var i=0; i<times; i++)
      { 
	var randNum;
	RandBytes.getRandomBytes(2, function(buff) {
	    randNum = buff[0] + buff[1] * 256;
	    response.write(lines[+randNum & 0x1fff] + " ");}); 
      }
    
   
    response.write("\n"); 
    response.end(); 
  }

  http.createServer(onRequest).listen(9000); 
  
  console.log("wat"); 

}

start()
