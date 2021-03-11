import * as state from "./store";
import { Header, Nav, Main, Footer } from "./components";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import "./env";

const router = new Navigo("/");

router.on({
  "/": () => render(state.Home),
  ":page":(params) => {
    let page = capitalize(params.data.page);
    render(state[page]);
  }
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
router.updatePageLinks();
}
// render(state.Home);

axios.get(`http://jsonplaceholder.typicode.com/posts`)
.then(response => {
  response.data.forEach(post => {
  state.Blog.posts.push(post);
});
const params = router.lastRouteResolved().params;
if (params) {
render(state[params.page]);
  }
});

axios.get(`http://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OPEN_WEATHER_API}`).then(response => {
  state.Home.weather.city = response.name;
  state.Home.weather.temp = response.main.temp;
  state.Home.weather.description = response.weather.main;

});

// import {
//   AddPicturesToGallery,
//   GalleryPictures,
//   PrintFormOnSubmit
// } from "./lib";
// render();
// render(state.Home);


document
  .querySelector(".fa-bars")
  .addEventListener("click", () =>
    document.querySelector("nav > ul").classList.toggle("hidden--mobile")
  );

// populating gallery with pictures
// const gallerySection = document.querySelector("#gallery");
// using modules to populate gallery with pictures
// AddPicturesToGallery(GalleryPictures, gallerySection);

// handle form submission with PrintFormOnSubmit module
// const form = document.querySelector("form");
// PrintFormOnSubmit(form);
