const cardsContainer = document.getElementById("parkCards");

async function getData() {
  try {
    const response = await fetch(
      "https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=12&api_key=dubXrvunnNJrzMYcwpIk2PHAzKFdFJw6gdedXzvr"
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function coordinateConverter(lat, long) {
  let latitude = "";
  let longitude = "";

  if (lat < 0) {
    latitude = (parseFloat(lat) * -1).toFixed(3) + " S";
  } else {
    latitude = parseFloat(lat).toFixed(3) + " N";
  }

  if (long < 0) {
    longitude = (parseFloat(long) * -1).toFixed(3) + " W";
  } else {
    longitude = parseFloat(long).toFixed(3) + " E";
  }

  return latitude + " " + longitude;
}

function truncateString(string) {
  if(string.length <= 150) {
    return string;
  }
  return string.slice(0, 150) + "...";
}

function title(park) {
  return `
    <h3>${park.fullName}</h3>
  `;
}

function imageContainer(park) {
  return `
    <div class="imageContainer">
      <img src=${park.images[0].url} alt=${park.fullName} />
    </div>
  `;
}

function description(park) {
  return `
    <p class="description">${truncateString(park.description)}</p>
  `;
}

function coordinates(park) {
  return `
    <p class="location"><i class="fas fa-map-marked-alt"></i> ${coordinateConverter(
      park.latitude,
      park.longitude
    )}</p>
  `;
}

function activities(park) {
  return `
    <ul>Popular Activities:
    ${park.activities.slice(0, 3).map((activity) => {
      return `<li>${activity.name}</li>`;
    }).join("")}
    </ul>
  `;
}

function detailsContainer(park) {
  return `
    <div class="detailsContainer">
      ${imageContainer(park)}
      ${description(park)}
      ${coordinates(park)}
      ${activities(park)}
    </div>
  `;
}

function websiteContainer(park) {
  return `
    <p class="link"><a href=${park.url} target="_blank"><i class="fas fa-globe"></i> Visit this park's website</a></p>
  `;
}

async function loadApp() {
  const data = await getData();
  const parks = data.data.map((park) => {
    return `
      <div class="card">
        ${title(park)}
        ${detailsContainer(park)}
        ${websiteContainer(park)}
      </div>
    `;
  }).join("");
  cardsContainer.innerHTML += parks;
}

loadApp();
