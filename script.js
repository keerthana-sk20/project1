// Carousel logic
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  let index = 0;

  images[index].classList.add('active');

  const showImage = i => {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  };

  carousel.querySelector('.prev-btn').onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  };

  carousel.querySelector('.next-btn').onclick = () => {
    index = (index + 1) % images.length;
    showImage(index);
  };
});
