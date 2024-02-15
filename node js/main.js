
const http = require ('http')
const fs = require('fs');
const url = require ("node:url")





const readFirst= fs.readFileSync('text/data.json','utf-8')
const parseData= JSON.parse(readFirst)
// console.log(parseData)

const templateHtml=fs.readFileSync('./1-node-farm/starter/templates/overview.html','utf-8')
const overviewfig=fs.readFileSync('./1-node-farm/starter/templates/overview-temp.html','utf-8')
const productcard=fs.readFileSync('./1-node-farm/starter/templates/product.html','utf-8')

// in this read html to can use it to implment with data 


function replace(template,data){

  let output=  template.replace(/{%PRODUCTNAME%}/g,data.productName)
  output=  output.replace(/{%QUANTITY%}/g,data.quantity)
  output=  output.replace(/{%PRICE%}/g,data.price)
  output=  output.replace(/{%DECS%}/g,data.description)
  output=  output.replace(/{%IMAGE%}/g,data.image)
  output=  output.replace(/{%ID%}/g,data.id)
  output=  output.replace(/{%FROM%}/g,data.from)
  output=  output.replace(/{%NUTIRIENTS%}/g,data.nutrients)


  output=  output.replace(/{%ORGANIC%}/g,data.organic)
  if(!data.organic){output.replace(/{%NOT_ORGANIC%}/g,'not-organic')}
  return output;

}
//function to can replace data in html 


// in this we make it read from outsid server to avoid in every requist make server read 
// we will read from outside and make it use in server 


const server = http.createServer((req,res)=>{

const {query,pathname}=(url.parse(req.url,true))
// we destructuring because we need dynamic url contain querystring 
//and we need quiry which it reciveve from html ancor 

    if(pathname === '/' || pathname ==='/overview'){
        let figures=parseData.map((ele)=>{return replace(overviewfig,ele) }).join("")
        const output=templateHtml.replace(/{%PRODUCT_CARD%}/g,figures)
        res.end(output)

        //in this becouse map return array we make join to become string and implment in template 
        // in function replace we use regex becouse we might have many of inserted value and this make with (g)
        

    }else if(pathname === '/product'){


        let specifyproduct=parseData[query.id]
        //in this we take from url query and store object of this id number 
              
        const output=replace(productcard,specifyproduct)
        //use function replace to implment html 

        res.end(output)




    }else if(pathname === '/api'){
        res.end(readFirst)

    }else{
        res.end("page not found ")
        }

})














server.listen(3000,()=>{
    console.log("hello from port 3000")
})





















//------------
//this tring to write and read not related to project but to make me surer understand reading from filesystem 
//------------


// const path = require('path');
// const read=fs.readFileSync('./text/input.txt','utf-8')
// console.log(read)
// console.log("mostafaaaa")

// const write=fs.writeFileSync('./text/output.txt', read+'mooooooooooooooooooooooooooooooooooooooooo')

// this how to read and write from node js into file 

//------------------------------------------------------------------------------------
// const x =fs.readFile('./text/input.txt','utf-8',(err,data)=>{
//     console.log(data)
// fs.writeFileSync('./text/output.txt',data+"mostafaa")
// });

// console.log("sabgtk")

// this call back and asynck not blocking of code untill resd no it go in  background anfd when finish 
// it run 
//-----------------------------------------------------------------------------

//when we create server it calback excuted every time it receve requist 

