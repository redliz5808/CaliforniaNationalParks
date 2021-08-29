const cardsContainer = document.getElementById("parkCards");


async function getData() {
  try {
    const response = await fetch("https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=12&api_key=dubXrvunnNJrzMYcwpIk2PHAzKFdFJw6gdedXzvr");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

getData()
  .then(data => {
    const parks = data.data;

    function coordinateConverter(lat, long) {
      let latitude = "";
      let longitude = "";

      if(lat < 0) {
        latitude = (parseFloat(lat) * -1).toFixed(3) + " S";
      } else {
        latitude = parseFloat(lat).toFixed(3) + " N";
      }

      if(long < 0) {
        longitude = (parseFloat(long) * -1).toFixed(3) + " W";
      } else {
        longitude = parseFloat(long).toFixed(3) + " E";
      }

      return latitude + " " + longitude;
    }

    parks.map(park => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const title = document.createElement("h3");
        title.innerHTML = park.fullName;

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("detailsContainer");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");
        const image = document.createElement("img");
        image.setAttribute("src",park.images[0].url);
        image.setAttribute("alt",park.fullName);
        imageContainer.appendChild(image);

        const description = document.createElement("p");
        description.classList.add("description");
        description.innerHTML = park.description;

        const location = document.createElement("p");
        location.classList.add("location");
        location.innerHTML = `<i class="fas fa-map-marked-alt"></i> ` + coordinateConverter(park.latitude, park.longitude);

        const activities = document.createElement("ul");
        activities.classList.add("activites");
        activities.innerHTML = "Popular Acitivies:";
        park.activities.slice(0, 3).map(activity => {
          let listItem = document.createElement("li");
          listItem.innerHTML = activity.name;
          activities.appendChild(listItem);
        })

        detailsContainer.appendChild(imageContainer);
        detailsContainer.appendChild(description);
        detailsContainer.appendChild(location);
        detailsContainer.appendChild(activities);

        const websiteContainer = document.createElement("p");
        websiteContainer.classList.add("link");
        const website = document.createElement("a");
        website.setAttribute("href", park.url);
        website.innerHTML = `<i class="fas fa-globe"></i> Visit this park's website`
        websiteContainer.appendChild(website);

        card.appendChild(title);
        card.appendChild(detailsContainer);
        card.appendChild(websiteContainer);
        cardsContainer.appendChild(card);
    })
  })