import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fetch from 'node-fetch';
import fs from 'fs';

let news = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

let category = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

news[7] = { "asss": "sasasa" };

const fetchnews = async (category, id) => {
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=7467d5a072504d18b7a10c69ec6ef6bd&pageSize=100`)
    let parsedData = await data.json();
    data = JSON.stringify(parsedData);
    news[id] = data;
}

const Fetch = async () => {
    for (var i = 0; i < 7; i++) {
        await fetchnews(category[i], i).then(() => {
            fs.writeFile(`${category[i]}.json`, news[i], err => {
                if (err) {
                    console.log(`Error Updating ${category[i]} News`, err)
                } else {
                    console.log(`${i}.${category[i-1]} News Updated Successfully`)
                }
            })
        }).catch((e) => console.log(e))
    }
}
Fetch();
export default Fetch;