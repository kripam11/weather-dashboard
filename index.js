import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.OPENWEATHER_API_KEY;


app.get("/",(req,res)=>{
    res.render("index.ejs",{
        error: null,
        weather: null,
        rainTomorrow: false,
      
    });
});

app.post("/", async (req,res)=>{
    try{
        const yourCity = req.body.city;
        const response = await axios.get(API_URL,{
            params : {
                q : yourCity,
                appid : API_KEY,
                units : "metric",
            }
        });
        const weather = {
            city : response.data.name,
            temp: response.data.main.temp,
           feelsLike: response.data.main.feels_like,
           humidity: response.data.main.humidity,
           wind: response.data.wind.speed,
            condition: response.data.weather[0].main
        }
        res.render("index.ejs",{
            weather,
      rainTomorrow: false,
      error : null
        })
    }
    catch(error){
        console.log("unable to load",error.message);
        res.render("index.ejs",{
            error : "city not found",
            weather : null,
            rainTomorrow : false,
        })
    }
});

app.get("/coordinates", (req,res)=>{
    res.send("GET route hit");
});

app.post("/coordinates", async (req,res)=>{
     try{
        const lat = req.body.lat;
        const lon = req.body.lon;
        // console.log("Lat:", lat);
        // console.log("Lon:", lon);
        const response = await axios.get(API_URL,{
            params : {
                lat : lat,
                lon : lon,
                appid : API_KEY,
                units : "metric",
            }
        });
        
        const weather = {
            city : response.data.name,
            temp: response.data.main.temp,
           feelsLike: response.data.main.feels_like,
           humidity: response.data.main.humidity,
           wind: response.data.wind.speed,
            condition: response.data.weather[0].main
        }
        res.render("index.ejs",{
            weather,
      rainTomorrow: false,
      error : null
        })
    }
    catch(error){
        console.log("unable to load",error.message);
        res.render("index.ejs",{
            error : "city not found",
            weather : null,
            rainTomorrow : false,
        })
    }

})



if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`server running at port ${port}`);
    });
}

export default app;