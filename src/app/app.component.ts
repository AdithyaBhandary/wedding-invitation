import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WITH_BLESSINGS } from './with-blessings.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scratchCanvas') scratchCanvas?: ElementRef<HTMLCanvasElement>;

  protected entered = false;
  protected opening = false;
  protected scratched = false;
  protected countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  protected readonly withBlessings = WITH_BLESSINGS;
  protected readonly invitation = {
    groom: 'Adithya',
    bride: 'Sameeksha',
    date: 'Sunday, 22 November 2026',
    shortDate: '22.11.2026',
    time: '11:45 AM',
    venue: 'Kacchuru Nageshwara temple, Barkur, Udupi',
    address: 'Udupi, Karnataka',
    story: 'Two hearts, two journeys, and two beautifully different worlds came together at just the right moment. What began as a simple connection slowly blossomed into a bond filled with love, laughter, and countless memories. Today, we celebrate the beginning of a beautiful journey together.'
  };

  private context?: CanvasRenderingContext2D;
  private scratchCount = 0;
  private countdownTimer?: number;

  ngAfterViewInit(): void {
    this.prepareScratchCard();
    this.updateCountdown();
    this.countdownTimer = window.setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) window.clearInterval(this.countdownTimer);
  }

  protected enterInvitation(): void {
    if (this.opening || this.entered) return;
    this.opening = true;
    window.setTimeout(() => {
      this.entered = true;
      requestAnimationFrame(() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' }));
    }, 760);
  }

  protected openMaps(): void {
    window.open('https://maps.google.com/?q=Kachuru+Nageshwara+temple', '_blank', 'noopener,noreferrer');
  }

  private updateCountdown(): void {
    const target = new Date(2026, 10, 22).getTime();
    const remaining = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    this.countdown = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
  }

  protected scratch(event: PointerEvent): void {
    if (!this.context || !this.scratchCanvas) return;
    const canvas = this.scratchCanvas.nativeElement;
    const bounds = canvas.getBoundingClientRect();
    const scaleX = canvas.width / bounds.width;
    const scaleY = canvas.height / bounds.height;
    const x = (event.clientX - bounds.left) * scaleX;
    const y = (event.clientY - bounds.top) * scaleY;
    this.context.globalCompositeOperation = 'destination-out';
    this.context.beginPath();
    this.context.arc(x, y, 30 * Math.min(scaleX, scaleY), 0, Math.PI * 2);
    this.context.fill();
    this.scratchCount++;
    if (this.scratchCount > 32) this.scratched = true;
  }

  private prepareScratchCard(): void {
    this.scratched = false;
    this.scratchCount = 0;
    if (!this.scratchCanvas) return;
    const canvas = this.scratchCanvas.nativeElement;
    canvas.width = 700;
    canvas.height = 380;
    this.context = canvas.getContext('2d') ?? undefined;
    if (!this.context) return;
    const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#b8e0e9');
    gradient.addColorStop(0.5, '#6faec0');
    gradient.addColorStop(1, '#d5edf0');
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.context.fillStyle = 'rgba(255, 255, 255, .34)';
    for (let index = 0; index < 130; index++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      this.context.fillRect(x, y, Math.random() * 7 + 2, Math.random() * 7 + 2);
    }
    this.context.fillStyle = '#234b5d';
    this.context.font = '600 34px Georgia';
    this.context.textAlign = 'center';
    this.context.fillText('Scratch here', canvas.width / 2, canvas.height / 2);
  }
}
