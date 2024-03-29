import * as state from "./store";
import { Header, Nav, Main, Footer } from "./components";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
// import "./env";

// const router = new Navigo("/");
const router = new Navigo(window.location.origin);

router.hooks({
  before: (done, params) => {
    // Because not all routes pass params we have to guard against is being undefined
    const page =
      params && Object.prototype.hasOwnProperty.call(params, "page")
        ? capitalize(params.page)
        : "Home";
    fetchDataByView(state[page]);
    done();
  }
});

router.on({
  "/": () => render(state.Home),
  ":page":(params) => {
    let page = capitalize(params.page);
    console.log(page);
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
addNavEventListeners();
addPicOnFormSubmit(st);
}
// render(state.Home);

// axios.get(`http://jsonplaceholder.typicode.com/posts`)
// .then(response => {
//   response.data.forEach(post => {
//   state.Blog.posts.push(post);
// });
// const params = router.lastRouteResolved().params;
// if (params) {
// render(state[params.page]);
//   }
// });

// axios.get(`http://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OPEN_WEATHER_API}`).then(response => {
//   state.Home.weather.city = response.name;
//   state.Home.weather.temp = response.main.temp;
//   state.Home.weather.description = response.weather.main;

// });

// import {
//   AddPicturesToGallery,
//   GalleryPictures,
//   PrintFormOnSubmit
// } from "./lib";
// render();
// render(state.Home);


// document
  // .querySelector(".fa-bars")
  // .addEventListener("click", () =>
    // document.querySelector("nav > ul").classList.toggle("hidden--mobile")
  // );

// populating gallery with pictures
// const gallerySection = document.querySelector("#gallery");
// using modules to populate gallery with pictures
// AddPicturesToGallery(GalleryPictures, gallerySection);

// handle form submission with PrintFormOnSubmit module
// const form = document.querySelector("form");
// PrintFormOnSubmit(form);

function addNavEventListeners() {
  // add event listeners to Nav items for navigation
  document.querySelectorAll("nav a").forEach(navLink =>
    navLink.addEventListener("click", event => {
      event.preventDefault();
      render(state[event.target.title]);
    })
  );

  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

function addPicOnFormSubmit(st) {
  if (st.page === "Form") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      // convert HTML elements to Array
      let inputList = Array.from(event.target.elements);
      // remove submit button from list
      inputList.pop();
      // construct new picture object
      let newPic = inputList.reduce((pictureObject, input) => {
        pictureObject[input.name] = input.value;
        return pictureObject;
      }, {});
      // add new picture to state.Gallery.pictures
      state.Gallery.pictures.push(newPic);
      render(state.Gallery);
    });
  }
  if (st.page === "Order") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      const inputList = event.target.elements;
      const toppings = [];
      for (let input of inputList.toppings) {
        if (input.checked) {
          toppings.push(input.value);
        }
      }
      const requestData = {
        crust: inputList.crust.value,
        cheese: inputList.cheese.value,
        sauce: inputList.sauce.value,
        toppings: toppings
      };
      axios
        .post(`https://garytest-spa.herokuapp.com/pizzas`, requestData)
        .then(response => {
          state.Pizza.pizzas.push(response.data);
          router.navigate("/Pizza");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }
}

function fetchDataByView(st = state.Home) {
  switch (st.page) {
    case "Pizza":
      axios
        .get(`https://garytest-spa.herokuapp.com/pizzas`)
        .then(response => {
          state[st.page].pizzas = response.data;
          render(st);
        })
        .catch(error => {
          console.log("It puked", error);
        });
      break;
  }
}
