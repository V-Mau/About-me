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
  
    // Agregamos un método para eliminar una actividad por su ID
    removeActivity = (activityId) => {
      this.activities.delete(activityId);
    }
  }
  
  // Crear una instancia de Repository
  const repository = new Repository();
  
  // Obtener referencia al contenedor de tarjetas en tu HTML
  const tarjetasContainer = document.getElementById('tarjetas');
  
  // Obtener referencia al formulario
  const form = document.querySelector('.formulario-actividades');
  
  // ACTIVIDAD 02: Convertir instancia de Activity a elemento HTML
  function activityToHTML(activity) {
    const { id, title, description, imgUrl } = activity;
  
    // Crear elementos HTML
    const titleElement = document.createElement('h3');
    titleElement.innerHTML = title;
  
    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = description;
  
    const imageElement = document.createElement('img');
    imageElement.src = imgUrl;
    imageElement.alt = title;
  
    // Crear la tarjeta
    const cardElement = document.createElement('div');
    cardElement.classList.add('tarjeta-actividad');
    cardElement.dataset.activityId = id; // Guardar el ID como atributo de datos
  
    // Añadir elementos a la tarjeta
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(imageElement);
  
    return cardElement;
  }
  
  // ACTIVIDAD 03: Convertir todas las instancias de Activity a elementos HTML
  function updateTarjetas() {
    // Limpiar el contenedor de tarjetas
    tarjetasContainer.innerHTML = '';
  
    // Obtener todas las actividades del repositorio
    const activities = repository.getAllActivities();
  
    // Crear y agregar tarjetas al contenedor
    activities.forEach(activity => {
      const tarjeta = activityToHTML(activity);
      tarjetasContainer.appendChild(tarjeta);
    });
  }
  
  // ACTIVIDAD 04: Manejar clic en el botón de enviar
  function handleEnviarButtonClick(event) {
    event.preventDefault();
  
    // Obtener referencias a los inputs
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const imgUrlInput = document.getElementById('imgUrl');
  
    // Obtener valores de los inputs
    const title = titleInput.value;
    const description = descriptionInput.value;
    const imgUrl = imgUrlInput.value;
  
    // Validar que los valores estén completos
    if (!title || !description || !imgUrl) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Crear una nueva actividad y agregarla al repositorio
    repository.createActivity({ title, description, imgUrl });
  
    // Limpiar el formulario
    titleInput.value = '';
    descriptionInput.value = '';
    imgUrlInput.value = '';
  
    // Actualizar las tarjetas en la interfaz
    updateTarjetas();
  }
  
  // Agregar evento clic al botón de enviar
  form.addEventListener('submit', handleEnviarButtonClick);
  
  // ACTIVIDAD 05 (EXTRA CREDIT): Eliminar tarjetas al hacer clic
  tarjetasContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('tarjeta-actividad')) {
      // Eliminar la tarjeta del repositorio
      const activityId = event.target.dataset.activityId;
      repository.removeActivity(activityId);
  
      // Actualizar las tarjetas en la interfaz
      updateTarjetas();
    }
  });
  
  // Llamar a updateTarjetas al cargar la página
  document.addEventListener('DOMContentLoaded', updateTarjetas);
  