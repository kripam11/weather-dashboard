# 🌦️ WeatherSphere

A modern weather dashboard built with **Node.js**, **Express.js**, **EJS**, and **Axios** that provides real-time weather information through both **city-based search** and **automatic location detection**.

## ✨ Features

### 🔍 Search Weather by City

Enter any city name and instantly get live weather information.

### 📍 Current Location Detection

Uses the browser's Geolocation API to automatically fetch weather data based on the user's current location.

### 🌡️ Real-Time Weather Data

Get accurate weather information including:

* Current Temperature
* Feels Like Temperature
* Humidity
* Wind Speed
* Current Weather Condition

### 💡 Weather Suggestions

Provides weather-based recommendations to help users plan their day.

### 📱 Responsive User Interface

Designed with a modern and responsive layout for desktop and mobile devices.

### ⚠️ Error Handling

Handles invalid city names and API errors gracefully.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* EJS

### Backend

* Node.js
* Express.js

### APIs & Libraries

* Axios
* OpenWeatherMap API
* Browser Geolocation API

---

## 📸 Screenshots

### 🏠 Dashboard

The main dashboard displaying real-time weather information and weather insights.

![Dashboard]

---

### 📍 Current Location Weather

Weather fetched automatically using the browser's Geolocation API and the user's current coordinates.

![Current Location]

---

### 🔍 Search by City

Search weather conditions for any city and instantly retrieve live weather data.

![Search By City]


## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/kripam11/weather-dashboard.git
cd weather-dashboard
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
nodemon index.js
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📂 Project Structure

```text
weather-dashboard/
│
├── public/
│       └── style.css
│
├── screenshots/
│   ├── dashboard.png
│   ├── geolocation.png
│   └── searchByCity.png
│
├── views/
│   └── index.ejs
│
├── index.js
├── package.json
└── README.md
```

---

## 🌍 APIs Used

### OpenWeatherMap API

Used to retrieve:

* Temperature
* Feels Like Temperature
* Humidity
* Wind Speed
* Weather Conditions

### Browser Geolocation API

Used to:

* Access user coordinates
* Fetch weather data based on current location

---

## 🎯 Learning Outcomes

This project helped explore and implement:

* REST API Integration
* Async/Await
* Express Routing
* GET & POST Requests
* Server-Side Rendering with EJS
* Geolocation Services
* Form Handling
* Error Handling
* Responsive UI Design

---

## 🔮 Future Improvements

* 5-Day Weather Forecast
* Air Quality Index (AQI)
* Sunrise & Sunset Information
* Weather Analytics Dashboard

---

## 👨‍💻 Author

**Kripa**

Built to explore backend development, API integration, geolocation services, and modern web application development using Node.js and Express.js.

