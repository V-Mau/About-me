class Activity {
    constructor({ id, title, description, imgUrl }) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imgUrl = imgUrl;
    }
  }
  
  class Repository {
    constructor() {
      this.activities = new Map();
    }
  
    getAllActivities = () => [...this.activities.values()];
  
    createActivity = (objActivity) => {
      const activity = new Activity(objActivity);
      this.activities.set(activity.id, activity);
    }
  
    removeActivity = (activityId) => {
      this.activities.delete(activityId);
    }
  }
  
  const repository = new Repository();
  const tarjetasContainer = document.getElementById('tarjetas');
  const form = document.querySelector('.formulario-actividades');
  
  function activityToHTML(activity) {
    const { id, title, description, imgUrl } = activity;
  
    const titleElement = document.createElement('h3');
    titleElement.innerHTML = title;
  
    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = description;
  
    const imageElement = document.createElement('img');
    imageElement.src = imgUrl;
    imageElement.alt = title;
  
    const cardElement = document.createElement('div');
    cardElement.classList.add('tarjeta-actividad');
    cardElement.dataset.activityId = id;
  
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(imageElement);
  
    return cardElement;
  }
  
  function updateTarjetas() {
    tarjetasContainer.innerHTML = '';
  
    const activities = repository.getAllActivities();
  
    activities.forEach(activity => {
      const tarjeta = activityToHTML(activity);
      tarjetasContainer.appendChild(tarjeta);
    });
  }
  
  function handleEnviarButtonClick(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const imgUrlInput = document.getElementById('imgUrl');
  
    const title = titleInput.value;
    const description = descriptionInput.value;
    const imgUrl = imgUrlInput.value;
  
    if (!title || !description || !imgUrl) {
      alert('Ups! algo salio mal.');
      return;
    }
  
    repository.createActivity({ title, description, imgUrl });
  
    titleInput.value = '';
    descriptionInput.value = '';
    imgUrlInput.value = '';
  
    updateTarjetas();
  }
  
  form.addEventListener('submit', handleEnviarButtonClick);
  
//   tarjetasContainer.addEventListener('click', (event) => {
//     const targetCard = event.target.closest('.contenedor-tarjetas .tarjetas');
//     if (targetCard) {
//       const activityId = targetCard.dataset.activityId;
  
//       repository.removeActivity(activityId);
//       updateTarjetas();
//     }
//   });

//   document.addEventListener('DOMContentLoaded', updateTarjetas);
  