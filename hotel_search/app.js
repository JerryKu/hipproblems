const express = require('express');
const app = express();
const rp = require('request-promise');

//scrape(): asynchronous function that sends GET requests
//to the scraper API Endpoint for every Hotel
//and stores the results in memory as a JSON Object
//returns a merged JSON object sorted by ecstasy
async function scrape(req, res){
  let results = [];
  let Expedia = await rp('http://localhost:9000/scrapers/Expedia').then((res)=>{return JSON.parse(res)}).catch((err)=>{console.log(err)});
  let Orbitz = await rp('http://localhost:9000/scrapers/Orbitz').then((res)=>{return JSON.parse(res)}).catch((err)=>{console.log(err)});
  let Travelocity = await rp('http://localhost:9000/scrapers/Travelocity').then((res)=>{return JSON.parse(res)}).catch((err)=>{console.log(err)});
  let Hilton = await rp('http://localhost:9000/scrapers/Hilton').then((res)=>{return JSON.parse(res)}).catch((err)=>{console.log(err)});
  let Priceline = await rp('http://localhost:9000/scrapers/Priceline').then((res)=>{return JSON.parse(res)}).catch((err)=>{console.log(err)});

  sortHotels(Expedia['results'], Orbitz['results'], Travelocity['results'], Hilton['results'], Priceline['results'], results)
  res.send({"results":results});
}

//sortHotels(): Sorts all of the Hotels by merge sort and returns array of sorted results by ecstasy
const sortHotels = function(H1, H2, H3, H4, H5, res){
  //start all array indexes at 0
  let H1indx = H2indx = H3indx = H4indx = H5indx = 0;
  //while each index has not reached the end
  while(H1indx !== H1.length && H2indx !== H2.length && H3indx !== H3.length && H4indx !== H4.length
  && H5indx !== H5.length){
    //if index for a hotel has reached the end, the current ecstacy value will be 0 for that hotel;
    let H1curr = H1[H1indx].ecstasy || 0;
    let H2curr = H2[H2indx].ecstasy || 0;
    let H3curr = H3[H3indx].ecstasy || 0;
    let H4curr = H4[H4indx].ecstasy || 0;
    let H5curr = H5[H5indx].ecstasy || 0;
    //find max of all 5 current ecstasy values
    let max = Math.max(H1curr,H2curr,H3curr,H4curr,H5curr);
    //if the max is that ecstasy value, push on the result to the result array and increase the index for that hotel
    switch(max){
      case H1curr:
        res.push(H1[H1indx]);
        H1indx++;
        break;
      case H2curr:
        res.push(H2[H2indx]);
        H2indx++;
        break;
      case H3curr:
        res.push(H3[H3indx]);
        H3indx++;
        break;
      case H4curr:
        res.push(H4[H4indx]);
        H4indx++;
        break;
      case H5curr:
        res.push(H5[H5indx]);
        H5indx++;
        break;
    }
  }
  return res;
}

//API endpoint that calls the scrape function
app.get('/hotels/search', (req, res) => {
  scrape(req,res);
})

app.listen(8000, ()=>console.log("listening on port 8000"));
