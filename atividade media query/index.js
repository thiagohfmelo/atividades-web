const perceba = document.querySelector('.perceba');
const mediaObject = window.matchMedia("(max-width: 935px)")
mediaObject.addEventListener("change", function() {
    if (mediaObject.matches) {
        perceba.textContent = "perceba: como largura do viewport é de 935px ou menos, as imagens estão em coluna"
    } else {
       perceba.textContent = "perceba: como a largura do viewport é de 935px ou mais, as imagens estão em linha"
    }
});