/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await loginUser(email, password);
        });
        console.log(selectedPrice)
    }

    // ici on s'occupera du formulaire d'avis
    const reviewForm = document.getElementById('add-review');
    const token = getCookie('token');
    const placeId = getPlaceIdFromURL();

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Récupère les valeurs du formulaire
            const rating = document.getElementById('review-rating').value;
            const comment = document.getElementById('review-comment').value;
            await submitReview(token, placeId, rating, comment, reviewForm);
        });
        console.log('Handler review prêt');
    }
});

async function loginUser(email, password) {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.access_token}; path=/`;
        window.location.href = 'index.html';
    } else {
        alert('Login failed: ' + response.statusText);
    }
}

 function checkAuthentication() {
      const token = getCookie('token');
      const loginLink = document.getElementById('login-link');
      const addReviewSection = document.getElementById('add-review');

    // Logique pour la page d'acceuil (index.html)
    if(loginLink) {
      if (!token) {
          loginLink.style.display = 'block';
      } else {
          loginLink.style.display = 'none';
          // Fetch places data if the user is authenticated
          fetchPlaces(token);
      }
  }

  // Logique pour la page de détails (place.html)
    if (addReviewSection) {
        if (!token)  {
            addReviewSection.style.display = 'none';
    }   else {
        addReviewSection.style.display = 'block';
        const placeId = getPlaceIdFromURL();
        fetchPlaceDetails(token, placeId);
    }
    }
  }
  function getCookie(name) {
      const cook_name = document.cookie.split(';').find(row => row.startsWith(name + '='));
      if (!cook_name) {
        return null;
      }
      const cook_part = cook_name.split('=');
      const cook_value = cook_part[1];
      return cook_value
  
  }

    async function fetchPlaces(token) {
        const response = await fetch('http://127.0.0.1:5000/api/v1/places/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log('fetchPlaces appelée')

        if (response.ok) {
            const data = await response.json();
            window.allPlaces = data;
            displayPlaces(data); // adapte selon la structure de ta réponse
        } else {
            alert('Impossible de récupérer les lieux');
        }
    }

    function displayPlaces(places) {
      const placesList = document.getElementById('places-list');
      placesList.innerHTML = '';

      places.forEach(place => {
        const article = document.createElement('article');
        article.className = 'place-card';

        // Image
        if (place.image_url) {
          const img = document.createElement('img');
          img.src = place.image_url;
          img.alt = place.title;
          img.className = 'place-img';
          article.appendChild(img);
        }

        // Bloc info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'place-info';

        // Titre
        const title = document.createElement('h2');
        title.textContent = place.title;
        infoDiv.appendChild(title);

        // Prix
        const price = document.createElement('p');
        price.textContent = `Prix par nuit : ${place.price}€`;
        infoDiv.appendChild(price);

        // Bouton
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'details-button';
        detailsBtn.textContent = 'View Details';
        detailsBtn.addEventListener('click', () => {
            window.location.href = `place.html?id=${place.id}`;
        });
        infoDiv.appendChild(detailsBtn);

        // Ajoute le bloc info à la carte
        article.appendChild(infoDiv);

        // Ajoute la carte à la liste
        placesList.appendChild(article);
      });
    }

    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (event) => {
            const selectedPrice = event.target.value
            if (selectedPrice == 'All') {
                displayPlaces(window.allPlaces);
            }
            else {
                
                displayPlaces(window.allPlaces.filter(place => place.price <= parseInt(selectedPrice)));


            }
            
      });
    }

    function getPlaceIdFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
  }

    async function fetchPlaceDetails(token, placeId) {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
        method: 'GET',
        headers: token ? { 'Authorization': 'Bearer ' + token } : {}
      });
      if (response.ok) {
        const place = await response.json();
        displayPlaceDetails(place);
      } else {
        alert('Impossible de récupérer les détails du lieu');
      }
  }

    function displayPlaceDetails(place) {
      document.getElementById('place-title').textContent = place.title;
      document.getElementById('place-host').textContent = place.owner
          ? `${place.owner.first_name} ${place.owner.last_name}` : 'N/A';
      document.getElementById('place-price').textContent = `${place.price}€`;
      document.getElementById('place-description').textContent = place.description;
      document.getElementById('place-amenities').textContent = place.amenities
          ? place.amenities.map(a => a.name || a).join(', ') : '';
      if (place.image_url) {
          document.getElementById('place-image').src = place.image_url;
      }
      // Affichage des reviews si la div existe
      const reviewsDiv = document.getElementById('place-reviews');
      if (reviewsDiv) {
          reviewsDiv.innerHTML = '';
          if (place.reviews && place.reviews.length > 0) {
              place.reviews.forEach(review => {
                  const reviewElem = document.createElement('div');
                  reviewElem.className = 'review';
                  reviewElem.innerHTML = `
                      <strong>Note : ${review.rating}/5</strong>
                      <p>${review.text}</p>
                  `;
                  reviewsDiv.appendChild(reviewElem);
              });
          } else {
              reviewsDiv.textContent = 'Aucun avis pour ce lieu.';
          }
      }
  }

    async function submitReview(token, placeId, rating, comment, form) {
        const messageDiv = document.getElementById('review-message');
        messageDiv.textContent = "";
        try {
            console.log(token, placeId, rating, comment)
            const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    rating: parseInt(rating),
                    text: comment
                })
            });

            if (response.ok) {
                messageDiv.style.color = 'green'
                messageDiv.textContent = 'Review submitted successfully!';
                form.reset();
                setTimeout(() => location.reload(), 1000);
            } else {
                const error = await response.json();
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Erreur lors de l\'envoi de la review : ' + (error.error || response.statusText); 
            }

        } catch (err) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Erreur réseau : ' +err.message;
        }

  }

