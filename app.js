APIKEY = "31eb6a3b9c3c2edf42ac1b785e0de037";

var city = document.getElementById("city");
var condition = document.getElementById("condition");
var temp = document.getElementById("temp");
var part2 = document.getElementById("part2");
var modal = document.getElementById("modal");
var button = document.querySelector(".change_btn");
var close_btn = document.querySelector(".close_btn");
var save_btn = document.querySelector(".save_btn");
var new_city = document.getElementById("new_city");
var error = document.querySelector(".error");
var icon = document.querySelector("#icon");
var container = document.getElementById("container");
var video = document.querySelector(".vid video");

const weather = {
  2: "videos/thunderstorm.mp4",
  3: "videos/drizzle.mp4",
  5: "videos/rain.mp4",
  6: "videos/snow.mp4",
  7: "videos/atmosphere.mp4",
  8: "videos/Clouds - 4753.mp4",
};

console.log(weather[2]);

if (getItem("city")) {
  city_name = getItem("city");
} else {
  city_name = city.textContent;
}

function showDetails(cityName) {
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},&appid=${APIKEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //     if(data.message == "city not found"){
      //         // error.style.display="block"
      // }
      console.log(data);
      if (data.cod == "200") {
        condition.textContent = data.weather[0].description;
        temp.textContent = `${(+data.main.temp - 273.13).toFixed(2)} °C`;
        showCond(data);
        // error.style.display ="block"
        city.textContent = data.name;
        cityName = new_city.value;

        if (cityName) {
          setItem(cityName);
        }

        new_city.value = "";
        // error.style.display ="none"
        modal.style.display = "none";
      } else {
        // city.textContent ="Enter a valid city"f
        error.style.display = "block";
      }
    });
}

window.addEventListener("load", (e) => {
  showDetails(city_name);
});

save_btn.addEventListener("click", () => {
  console.log(new_city.value);
  showDetails(new_city.value);
});

let id;

function showCond(event) {
  id = event.weather[0].id;
  id = id / 100;
  id = Math.floor(id);
  console.log(id);
  // container.style.backgroundColor = weather[id];
  video.setAttribute("src", weather[id]);
  icon.innerHTML = `<img src ="http://openweathermap.org/img/wn/${event.weather[0].icon}@2x.png">`;
  part2.innerHTML = `
    <div class="cond">RELATIVE HUMIDITY: ${event.main.humidity}%</div></div>
    <div class="cond">VISIBILITY: ${event.visibility}m</div>
    <div  class="cond">PRESSURE: ${event.main.pressure}hPa</div>
    <div class="cond">WIND: ${event.wind.speed}m/s</div>
    `;
}

button.addEventListener("click", () => {
  error.style.display = "none";
  modal.style.display = "flex";
});

close_btn.addEventListener("click", () => {
  modal.style.display = "none";
  new_city.value = "";
});

new_city.addEventListener("click", () => {
  new_city.value = "";
  error.style.display = "none";
});

function setItem(val) {
  localStorage.setItem("city", val);
}

function getItem(value) {
  return localStorage.getItem(value);
}
