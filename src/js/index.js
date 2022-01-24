import '../css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
let country = '';

searchBox.addEventListener(
  'input',
  debounce(() => {
    country = searchBox.value.trim();
    fetchCountries(country);
  }, DEBOUNCE_DELAY),
);
