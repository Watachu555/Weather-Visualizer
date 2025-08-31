# 🌦️ Weather Visualizer  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![WeatherAPI](https://img.shields.io/badge/WeatherAPI-blue?style=for-the-badge&logo=cloud&logoColor=white)  
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange?style=for-the-badge)  
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)  

A responsive and interactive Weather App that fetches real-time data from WeatherAPI through a custom Node.js/Express backend. The frontend dynamically adapts its background and particle effects based on live weather conditions, creating an immersive user experience.  

---

## ✨ Features  
- 🎨 Dynamic particle backgrounds (rain, snow, clouds, sun, stars at night)  
- 🌈 Smooth gradient transitions based on weather and time of day  
- 📡 Secure backend proxy (hides API key with Express + dotenv)  
- ⚡ Real-time weather updates via WeatherAPI  
- 📱 Responsive design for desktop & mobile  
- 🔄 Separation of concerns → frontend + backend architecture  
- 🛡️ CORS enabled for safe frontend-backend communication  

---

## 🧱 Project Structure  

WeatherAPI/
│── backend/ # Node.js + Express backend (API proxy)
│ ├── server.js # Backend server
│ ├── package.json # Dependencies & scripts
│ └── .env # API keys (not committed)
│
│── frontend/ # HTML, CSS, JS frontend
│ ├── index.html # Main UI
│ ├── styles.css # Styling + responsiveness
│ └── app.js # Weather logic + background effects


---

## ⚙️ Setup & Installation  

### 1️⃣ Clone Repo  
```bash
git clone https://github.com/Arsh-pixel-cmd/Weather-Visualizer.git
cd Weather-Visualizer
```

## 2️⃣ Backend Setup  

```bash
cd backend
npm install
```

Create a .env file inside backend/:


---

### Run backend  

```bash
npm start
# Backend runs at → http://localhost:8080
```

## 3️⃣ Frontend Setup  

In a separate terminal:  

```bash
cd frontend
npx live-server
# Frontend runs at → something like http://127.0.0.1:63813
```

## 🚀 Usage  

1. Start backend → `npm start` in `/backend`  
2. Start frontend → `npx live-server` in `/frontend`  
3. Open frontend in browser → type a city → enjoy dynamic weather visualization 🌦️  

---

## 📚 What You’ll Learn  

- Use Express.js as an API proxy to hide API keys  
- Securely store secrets with dotenv  
- Create dynamic particle animations with HTML Canvas  
- Handle real-time weather data & update UI with JS  
- Build responsive design using flexbox + media queries  

---

## 🙋 Author  

**Arsh Mishra**  
Aspiring Software Engineer | Frontend & Full-Stack Developer  

---

## 🤝 Contributing
1. Fork the project  
2. Create a feature branch (`git checkout -b feature/newFeature`)  
3. Commit changes (`git commit -m "Added new feature"`)  
4. Push & Open a PR  

---

## 📜 License
Licensed under the **MIT License** — feel free to use & modify.  

---

## 🌐 Connect with Me
💼 [LinkedIn](https://www.linkedin.com/in/arsh-mishra-030093325/)  
💻 [GitHub](https://github.com/Arsh-pixel-cmd)  
