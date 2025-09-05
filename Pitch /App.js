// Basic slide navigation logic

class PresentationController {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 17;
    this.slides = document.querySelectorAll('.slide');
    this.currentSlideElement = document.getElementById('currentSlide');
    this.totalSlidesElement = document.getElementById('totalSlides');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    this.init();
  }

  init() {
    this.totalSlidesElement.textContent = this.totalSlides;
    this.updateSlideDisplay();

    this.prevBtn.addEventListener('click', () => this.previousSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  updateSlideDisplay() {
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx + 1 === this.currentSlide);
    });
    this.currentSlideElement.textContent = this.currentSlide;
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.currentSlide--;
      this.updateSlideDisplay();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.currentSlide++;
      this.updateSlideDisplay();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PresentationController();
});
