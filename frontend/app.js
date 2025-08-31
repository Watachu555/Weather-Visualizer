document.addEventListener('DOMContentLoaded', () => {
  const weatherButton = document.getElementById('getWeatherBtn');
  const locationInput = document.getElementById('locationInput');
  const weatherDisplay = document.getElementById('weatherResult');
  const body = document.body;

  // 🎨 Particle Background
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let weatherType = "default";
  let isDay = true;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      if (weatherType === "rain") {
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 4 + 4;
        this.color = isDay ? "rgba(0, 150, 255, 0.6)" : "rgba(100, 180, 255, 0.8)";
      } else if (weatherType === "snow") {
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.color = "rgba(255, 255, 255, 0.9)";
      } else if (weatherType === "cloud") {
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.3;
        this.color = isDay ? "rgba(200,200,200,0.5)" : "rgba(180,180,180,0.4)";
      } else if (weatherType === "sun") {
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
        this.color = isDay ? "rgba(255,200,0,0.7)" : "rgba(255,255,200,0.5)";
      } else if (!isDay) { // ⭐ Night stars
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = "rgba(255,255,255,0.8)";
      } else {
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
        this.color = "rgba(255,255,255,0.7)";
      }
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
        this.reset();
        this.y = 0;
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      if (weatherType === "rain") {
        ctx.fillRect(this.x, this.y, 2, 10);
      } else {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }

  function initParticles(count = 100) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // ✅ Smooth background gradient changer
  function setBackgroundGradient(newGradient) {
    body.style.transition = "background 1s ease-in-out";
    body.style.background = newGradient;
  }

  // 🌤 Weather API (through backend proxy)
  weatherButton.addEventListener('click', () => {
    const userLocation = locationInput.value.trim().toLowerCase();

    if (!userLocation) {
      weatherDisplay.innerHTML = `<p>Please enter a location!</p>`;
      weatherDisplay.classList.remove('show');
      return;
    }

    // Call your backend instead of WeatherAPI directly
    fetch(`http://localhost:8080/api/weather?city=${userLocation}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          weatherDisplay.innerHTML = `<p>${data.error.message}</p>`;
          weatherDisplay.classList.remove('show');
        } else {
          const { name, region, country } = data.location;
          const { temp_c, condition, is_day } = data.current;

          isDay = is_day === 1;

          weatherDisplay.innerHTML = `
            <h2>Weather in ${name}, ${region}, ${country}</h2>
            <p>Temperature: ${temp_c}°C</p>
            <p>Condition: ${condition.text}</p>
            <img src="https:${condition.icon}" alt="${condition.text}" />
          `;

          const cond = condition.text.toLowerCase();

          // 🎨 Background gradient + particle type + day/night
          if (cond.includes("sun")) {
            setBackgroundGradient(isDay
              ? "linear-gradient(135deg, #f6d365, #fda085)"
              : "linear-gradient(135deg, #2c3e50, #000000)"
            );
            weatherType = "sun";
          } else if (cond.includes("rain")) {
            setBackgroundGradient(isDay
              ? "linear-gradient(135deg, #667db6, #0082c8)"
              : "linear-gradient(135deg, #2c3e50, #000428)"
            );
            weatherType = "rain";
          } else if (cond.includes("snow")) {
            setBackgroundGradient(isDay
              ? "linear-gradient(135deg, #83a4d4, #b6fbff)"
              : "linear-gradient(135deg, #283e51, #485563)"
            );
            weatherType = "snow";
          } else if (cond.includes("cloud")) {
            setBackgroundGradient(isDay
              ? "linear-gradient(135deg, #bdc3c7, #2c3e50)"
              : "linear-gradient(135deg, #232526, #414345)"
            );
            weatherType = "cloud";
          } else {
            setBackgroundGradient(isDay
              ? "linear-gradient(135deg, #1e3c72, #2a5298)"
              : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            );
            weatherType = "default";
          }

          initParticles(weatherType === "snow" ? 150 : 100);

          weatherDisplay.classList.add('show');
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherDisplay.innerHTML = `<p>Could not fetch weather data. Try again later.</p>`;
        weatherDisplay.classList.remove('show');
      });
  });
});
