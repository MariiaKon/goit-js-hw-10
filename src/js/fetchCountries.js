import Notiflix from 'notiflix';
import '../../node_modules/notiflix/dist/notiflix-3.2.2.min.css';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

export let countries = [];

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
        throw new Error('Oops, there is no country with that name');
      }
      if (countryInfo.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countryCard.innerHTML = '';
        countryList.innerHTML = '';

        return;
      } else if (countryInfo.length > 1) {
        const markupList = countryListTpl(countryInfo);
        countryList.innerHTML = markupList;
        countryCard.innerHTML = '';
        return;
      }

      const markupCard = countryCardTpl(countryInfo);
      countryCard.innerHTML = markupCard;
      countryList.innerHTML = '';
    })
    .catch(error => {
      Notiflix.Notify.failure(`${error}`);
    });
}
