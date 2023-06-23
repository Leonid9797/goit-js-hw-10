import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfo = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');

  breedSelect.addEventListener('change', event => {
    const breedId = event.target.value;

    catInfo.style.display = 'none';
    loader.style.display = 'block';

    fetchCatByBreed(breedId)
      .then(cats => {
        catInfo.innerHTML = '';

        cats.forEach(cat => {
          const catContainer = document.createElement('div');
          catContainer.className = 'cat-container';
          catInfo.appendChild(catContainer);

          const catImage = document.createElement('img');
          catImage.src = cat.url;
          catImage.style.width = '600px';
          catImage.style.height = '700px';
          catContainer.appendChild(catImage);

          const catName = document.createElement('h3');
          catName.textContent = cat.breeds[0].name;
          catContainer.appendChild(catName);

          const catDescription = document.createElement('p');
          catDescription.textContent = cat.breeds[0].description;
          catContainer.appendChild(catDescription);

          const catTemperament = document.createElement('p');
          catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
          catContainer.appendChild(catTemperament);
        });
      })
      .catch(error => {
        console.error('Error fetching cat by breed:', error);
        Notiflix.Notify.Failure('Error fetching cat by breed');
      })
      .finally(() => {
        catInfo.style.display = 'block';
        loader.style.display = 'none';
      });
  });

  breedSelect.style.display = 'none';
  loader.style.display = 'block';

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.style.display = 'block';
      loader.style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      Notiflix.Notify.Failure('Error fetching breeds');
    });
});
