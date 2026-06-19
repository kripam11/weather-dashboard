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

function getApiKey() {
    return process.env.OPENWEATHER_API_KEY?.trim();
}

function getWeatherError(error) {
    const status = error.response?.status;

    if (!getApiKey()) {
        return "Weather service is not configured. Add OPENWEATHER_API_KEY in Vercel and redeploy.";
    }
    if (status === 401) {
        return "Invalid API key. Check OPENWEATHER_API_KEY in Vercel project settings.";
    }
    if (status === 404) {
        return "City not found. Try another city name.";
    }

    console.error("Weather API error:", status, error.response?.data || error.message);
    return "Unable to fetch weather right now. Please try again.";
}

async function fetchWeather(params) {
    const response = await axios.get(API_URL, {
        params: {
            ...params,
            appid: getApiKey(),
            units: "metric",
        },
    });

    return {
        city: response.data.name,
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        condition: response.data.weather[0].main,
    };
}

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        error: null,
        weather: null,
        rainTomorrow: false,
      
    });
});

app.post("/", async (req, res) => {
    try {
        const yourCity = req.body.city?.trim();

        if (!yourCity) {
            return res.render("index.ejs", {
                error: "Please enter a city name.",
                weather: null,
                rainTomorrow: false,
            });
        }

        const weather = await fetchWeather({ q: yourCity });

        res.render("index.ejs", {
            weather,
            rainTomorrow: false,
            error: null,
        });
    } catch (error) {
        res.render("index.ejs", {
            error: getWeatherError(error),
            weather: null,
            rainTomorrow: false,
        });
    }
});

app.get("/coordinates", (req,res)=>{
    res.send("GET route hit");
});

app.post("/coordinates", async (req, res) => {
    try {
        const lat = req.body.lat;
        const lon = req.body.lon;

        if (!lat || !lon) {
            return res.render("index.ejs", {
                error: "Location data missing. Please allow location access and try again.",
                weather: null,
                rainTomorrow: false,
            });
        }

        const weather = await fetchWeather({ lat, lon });

        res.render("index.ejs", {
            weather,
            rainTomorrow: false,
            error: null,
        });
    } catch (error) {
        res.render("index.ejs", {
            error: getWeatherError(error),
            weather: null,
            rainTomorrow: false,
        });
    }
});



if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`server running at port ${port}`);
    });
}

export default app;