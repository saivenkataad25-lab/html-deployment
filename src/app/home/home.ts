import { Component, OnDestroy, OnInit } from '@angular/core';

interface FoodSlide {
  title: string;
  description: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit, OnDestroy {
  protected currentSlide = 0;
  protected readonly slides: FoodSlide[] = [
    {
      title: 'A table full of joy',
      description: 'Colourful plates, shared stories, unforgettable evenings.',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85',
      alt: 'Fresh salad in a bowl on a dining table',
    },
    {
      title: 'Cravings, beautifully served',
      description: 'Find the perfect bite for every mood and moment.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
      alt: 'Fresh pizza topped with vegetables',
    },
    {
      title: 'Made for slow mornings',
      description: 'Start your day with something warm, fresh and delicious.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
      alt: 'A beautiful spread of food on a table',
    },
  ];

  private carouselTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.carouselTimer = setInterval(() => this.nextSlide(), 5000);
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
    }
  }

  protected nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  protected previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  protected selectSlide(index: number): void {
    this.currentSlide = index;
  }
}
