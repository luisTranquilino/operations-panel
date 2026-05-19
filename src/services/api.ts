import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://script.google.com/macros/s/AKfycbyoDElgz3p7GCB5hm2bRgGN4Q6io6APRrsAKOWHmVa1uhHMoaWwn0hjJpP8hXO3Dw/exec",
});