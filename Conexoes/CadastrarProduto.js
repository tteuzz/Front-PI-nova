function previewImages(event) {
    const files = event.target.files;
    const previewsContainer = document.getElementById('image-previews');
    previewsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novas imagens

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function() {
            const img = document.createElement('img');
            img.src = reader.result;
            img.className = 'image-preview';
            previewsContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}