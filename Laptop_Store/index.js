const fs = require('fs');           //core module
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');          // method of fs module

//console.log(__dirname);         // current directory path        

const laptopData = JSON.parse(json);        // converts to JSON Objects

const server = http.createServer((req, res) =>{

   const pathName = url.parse(req.url,true).pathname;
   const id = url.parse(req.url, true).query.id;
   
   if(pathName === '/products' || pathName === '/' ){
        res.writeHead(200,{'Content-type':'text/html'});

        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8',(err, data) => {
            let overview = data;    
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                    const card = laptopData.map(element => replaceTemplate(data, element)).join('');
                    overview = overview.replace('{%CARDS%}',card);
                    res.end(overview);
        });
    });

    } 
    

    else if(pathName === '/laptop' && id < laptopData.length){
        res.writeHead(200,{'Content-type':'text/html'});

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8',(err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);             
            });
        }
        
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data)=>{
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        })
    }
    
    else{
        res.writeHead(404,{'Content-type':'text/html'});
        res.end('Invalid URL');
    }

});

server.listen(3000, 'localhost',()=>{
    console.log("Listening on localhost: 3000");
});

function replaceTemplate(html, laptop){
    let output = html.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}