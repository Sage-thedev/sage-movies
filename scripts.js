const page = document.querySelector(".page-wrapper");
const loader = document.querySelector(".js-preloader");
const backToHomeButton = document.getElementById("back-to-home");

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("section");
  const form = document.getElementById("form");
  const search = document.getElementById("query");

  const apiLink =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c1ed16fbbb5ac7689865af57b08a45f1&page=1";
  const searchApi =
    "https://api.themoviedb.org/3/search/movie?api_key=c1ed16fbbb5ac7689865af57b08a45f1&query=";
  const imgPath = "https://image.tmdb.org/t/p/w1280";

  function showLoader() {
    loader.classList.remove("loaded");
    page.classList.remove("show");
  }

  function hideLoader() {
    loader.classList.add("loaded");
    page.classList.add("show");
  }

  function returnMovies(url) {
    setTimeout(() => {
      showLoader();
    }, 2000);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);

        // Clear existing content
        main.innerHTML = "";

        // Loop through data collected
        data.results.forEach((element) => {
          const div_card = document.createElement("div");
          div_card.setAttribute("class", "card");

          const div_row = document.createElement("div");
          div_row.setAttribute("class", "row");

          const div_column = document.createElement("div");
          div_column.setAttribute("class", "column");

          const image = document.createElement("img");
          image.setAttribute("class", "thumbnail");
          image.src = imgPath + element.poster_path;

          const title = document.createElement("h3");
          title.setAttribute("class", "title");
          title.textContent = element.title;

          const center = document.createElement("center");
          center.appendChild(image);

          div_card.appendChild(center);
          div_card.appendChild(title);

          div_column.appendChild(div_card);
          div_row.appendChild(div_column);

          main.appendChild(div_row);
        });

        setTimeout(() => {
          hideLoader();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTimeout(() => {
          hideLoader();
        }, 2000);
      });
  }

  // Initial data fetch
  returnMovies(apiLink);

  // Form submit event
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchItem = search.value.trim();
    setTimeout(() => {
      showLoader();
    }, 500);

    if (searchItem) {
      const searchUrl = searchApi + encodeURIComponent(searchItem);
      returnMovies(searchUrl);
      // show back-to-home button

      backToHomeButton.style.display = "block";
    }
  });
});
