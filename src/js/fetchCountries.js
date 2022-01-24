import Notiflix, { Notify } from 'notiflix';
import '../../node_modules/notiflix/dist/notiflix-3.2.2.min.css';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

export function fetchCountries(name) {
  const url = 'https://restcountries.com/v2/name/';
  const responseFilter = 'name,capital,population,flag,languages';

  return fetch(`${url}${name}?fields=${responseFilter}`)
    .then(data => {
      return data.json();
    })
    .then(countryInfo => {
      if (countryInfo.status === 404) {
        const errorMsg = 'Oops, there is no country with that name';
        clearPage();
        throw new Error(errorMsg);
      }
      return countryInfo;
    })
    .then(countryInfo => {
      if (countryInfo.length > 10) {
        notify();
        clearPage();
        return;
      } else if (countryInfo.length > 1) {
        createCounriesListMarkup(countryInfo);
        return;
      } else if (countryInfo[0] == undefined) {
        clearPage();
        return;
      }
      createCountryCardMarkup(countryInfo);
    })
    .catch(error);
}

function clearPage() {
  countryCard.innerHTML = '';
  countryList.innerHTML = '';
}

function createCounriesListMarkup(info) {
  const markupList = countryListTpl(info);
  countryList.innerHTML = markupList;
  countryCard.innerHTML = '';
}

function createCountryCardMarkup(info) {
  const markupCard = countryCardTpl(info);
  countryCard.innerHTML = markupCard;
  countryList.innerHTML = '';
}

function notify() {
  const infoMsg = 'Too many matches found. Please enter a more specific name.';
  Notiflix.Notify.info(infoMsg);
}

function error(errorMsg) {
  Notiflix.Notify.failure(`${errorMsg}`);
}
