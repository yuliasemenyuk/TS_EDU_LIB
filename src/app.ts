import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const G_K = "";
//define that 'google' exist (added to index.html as a script)
// declare var google: any;

type GoogleGeocodingRes = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const eneteredAddress = addressInput.value;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    eneteredAddress
  )}&key=${G_K}`;

  axios
    .get<GoogleGeocodingRes>(url)
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);

// import { Product } from "./product.model";
// // import 'reflect-metadata';
// import { plainToClass } from "class-transformer";
// import { validate } from "class-validator";

// const products = [
//   { title: "A Carpet", price: 34.99 },
//   { title: "A Book", price: 23.99 },
// ];

// // const loadedProducts = products.map(prod => {
// //     return new Product(prod.title, prod.price);
// // });

// const loadedProducts = plainToClass(Product, products)

// for (const prod of loadedProducts) {
//     console.log(prod.getInformation())
// }

// const newProd = new Product('', -6)
// validate(newProd).then(errors => {
//     if (errors.length > 0) {
//         console.log("Validation errors")
//         console.log(errors)
//     } else {
//         console.log(newProd.getInformation())
//     }
// })

