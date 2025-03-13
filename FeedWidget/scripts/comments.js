// 🔹 Access Token con permisos adecuados (debe incluir 'pages_read_engagement' o 'user_posts')
const commentsAccessToken = 'TU_ACCESS_TOKEN_AQUI';

// 🔹 Versión de la API de Facebook
const apiVersion = 'v16.0';

/**
 * Función para cargar comentarios de una publicación
 */
const loadPublicComments = (postId) => {
  const modal = document.getElementById("videoModal");
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = "<p>Cargando comentarios...</p>";
  modal.style.display = "block";

  // Endpoint para obtener comentarios de la publicación
  const commentsUrl = `https://graph.facebook.com/${apiVersion}/${postId}/comments?fields=from{name,picture},message,created_time&access_token=${commentsAccessToken}`;

  fetch(commentsUrl)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.data || data.data.length === 0) {
        modalBody.innerHTML = "<p>No hay comentarios disponibles.</p>";
        return;
      }

      const commentsHTML = data.data.map(comment => `
        <div class="comment">
          <img src="${comment.from.picture.data.url}" alt="${comment.from.name}" class="comment-avatar">
          <div class="comment-content">
            <strong>${comment.from.name}</strong>
            <p>${comment.message}</p>
            <small>${new Date(comment.created_time).toLocaleString()}</small>
          </div>
        </div>
      `).join('');

      modalBody.innerHTML = `<h5>Comentarios</h5>${commentsHTML}`;
    })
    .catch(error => {
      console.error("Error al cargar comentarios:", error);
      modalBody.innerHTML = "<p>Error al cargar los comentarios.</p>";
    });
};

// Cerrar el modal
document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("videoModal").style.display = "none";
});
