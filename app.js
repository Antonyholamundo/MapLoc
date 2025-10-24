document.addEventListener("DOMContentLoaded", function() {

    // --- 1. MAPA INTERACTIVO ---
    // Inicializa el mapa y lo centra en una ubicación por defecto (p. ej., Madrid)
    const map = L.map('map').setView([40.416775, -3.703790], 13);

    // Añade una capa de mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Intenta geolocalizar al usuario para centrar el mapa
    map.locate({setView: true, maxZoom: 16});

    // Evento que se dispara si la geolocalización tiene éxito
    function onLocationFound(e) {
        L.marker(e.latlng).addTo(map)
            .bindPopup("📍 ¡Estás aquí!")
            .openPopup();
    }
    map.on('locationfound', onLocationFound);

    // Evento que se dispara si la geolocalización falla
    function onLocationError(e) {
        console.log("Error de geolocalización: " + e.message);
    }
    map.on('locationerror', onLocationError);
    

    // --- 2. SISTEMA DE ANOTACIONES ---
    // Función para añadir un marcador y su popup al mapa
    function addAnnotation(lat, lng, title, description) {
        const marker = L.marker([lat, lng]).addTo(map);

        // Formatea el contenido del popup
        const popupContent = `
            <h4>${title || 'Anotación'}</h4>
            <p>${description}</p>
        `;
        marker.bindPopup(popupContent);
    }
    
    // Escucha los clics en el mapa para crear una nueva anotación
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Usamos prompts para una entrada de datos simple (ideal para un MVP)
        const title = prompt("Título de la anotación (opcional, máx 50 caracteres):");
        // Si el usuario cancela el primer prompt, no continuamos
        if (title === null) return;
        
        const description = prompt("Mensaje (máx 280 caracteres):");
        // Si el usuario cancela el segundo prompt, no continuamos
        if (description === null) return;

        // Validación simple
        if (title.length > 50) {
            alert("El título no puede exceder los 50 caracteres.");
            return;
        }
        if (description.length > 280) {
            alert("La descripción no puede exceder los 280 caracteres.");
            return;
        }
        if (!description) {
            alert("La descripción no puede estar vacía.");
            return;
        }

        // Si todo es correcto, llamamos a la función para añadir el marcador
        addAnnotation(lat, lng, title, description);
    });

});