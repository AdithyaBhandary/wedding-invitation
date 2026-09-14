import { DecimalPipe, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WITH_BLESSINGS } from './with-blessings.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DecimalPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scratchCanvas') scratchCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('scratchSection') scratchSection?: ElementRef<HTMLElement>;

  protected entered = false;
  protected opening = false;
  protected scratched = false;
  protected showScrollUp = true;
  protected musicVisible = false;
  protected musicMuted = true;
  protected countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private scrollUpMinimumVisibleUntil = 0;
  private scrollUpHideTimeout?: number;
  private scrollUpHidden = false;
  private readonly scrollUpMinimumDurationMs = 5000;
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
  private scratchDistance = 0;
  private isScratching = false;
  private scratchProgress = 0;
  private lastScratchPoint?: { x: number; y: number };
  private readonly scratchRevealThreshold = 0.28;
  private readonly scratchDistanceThreshold = 900;
  private readonly scratchCountThreshold = 18;
  private countdownTimer?: number;
  private revealCompleted = false;
  private celebrationStarted = false;
  private revealObserver?: IntersectionObserver;
  private sectionRevealObserver?: IntersectionObserver;
  private backgroundMusic?: HTMLAudioElement;
  private readonly musicSource = 'assets/Ubhayakushala.mp3.mpeg';
  private hideScrollUpListenerBound = false;
  private openingNameRevealTimeouts: number[] = [];
  private openingNameRevealTriggered = false;

  private triggerOpeningNameReveal(): void {
    if (this.openingNameRevealTriggered) return;
    this.openingNameRevealTriggered = true;

    const section = document.querySelector('.opening-names');
    const brideGroom = document.querySelector('.opening-names__bride-groom');
    const wreath = document.querySelector('.opening-names__wreath');
    const content = document.querySelector('.opening-names__content');

    this.openingNameRevealTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    this.openingNameRevealTimeouts = [];

    section?.classList.add('opening-names--manual-reveal');
    [brideGroom, wreath, content].forEach((element) => {
      element?.classList.remove('is-visible');
    });

    requestAnimationFrame(() => {
      if (brideGroom) {
        const brideGroomTimeout = window.setTimeout(() => brideGroom.classList.add('is-visible'), 0);
        this.openingNameRevealTimeouts.push(brideGroomTimeout);
      }
      if (wreath) {
        const wreathTimeout = window.setTimeout(() => wreath.classList.add('is-visible'), 900);
        this.openingNameRevealTimeouts.push(wreathTimeout);
      }
      if (content) {
        const contentTimeout = window.setTimeout(() => content.classList.add('is-visible'), 1400);
        this.openingNameRevealTimeouts.push(contentTimeout);
      }
    });
  }

  ngAfterViewInit(): void {
    this.prepareScratchCard();
    this.updateCountdown();
    this.countdownTimer = window.setInterval(() => this.updateCountdown(), 1000);
    this.bindScrollUpHideListener();

    const revealSections = document.querySelectorAll('.reveal');
    this.sectionRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains('opening-names')) {
            entry.target.classList.add('is-visible');
          }
        } else {
          if (!entry.target.classList.contains('opening-names')) {
            entry.target.classList.remove('is-visible');
          }
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    revealSections.forEach((section) => this.sectionRevealObserver?.observe(section));

    const section = this.scratchSection?.nativeElement;
    if (!section) return;

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.revealCompleted = true;
          this.tryStartCelebration();
        }
      });
    }, { threshold: 0.45 });

    this.revealObserver.observe(section);
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) window.clearInterval(this.countdownTimer);
    this.revealObserver?.disconnect();
    this.sectionRevealObserver?.disconnect();
    if (this.scrollUpHideTimeout) {
      window.clearTimeout(this.scrollUpHideTimeout);
    }
    if (this.hideScrollUpListenerBound) {
      window.removeEventListener('scroll', this.hideScrollUpOnce, { passive: true } as AddEventListenerOptions);
      window.removeEventListener('wheel', this.hideScrollUpOnce, { passive: true } as AddEventListenerOptions);
      window.removeEventListener('touchmove', this.hideScrollUpOnce, { passive: true } as AddEventListenerOptions);
    }
  }

  private readonly hideScrollUpOnce = (): void => {
    if (this.scrollUpHidden || !this.showScrollUp) return;

    const remaining = Math.max(0, this.scrollUpMinimumVisibleUntil - Date.now());
    if (remaining > 0) {
      if (this.scrollUpHideTimeout) {
        window.clearTimeout(this.scrollUpHideTimeout);
      }
      this.scrollUpHideTimeout = window.setTimeout(() => this.hideScrollUpNow(), remaining);
      return;
    }

    this.hideScrollUpNow();
  };

  private hideScrollUpNow(): void {
    if (this.scrollUpHidden || !this.showScrollUp) return;
    this.scrollUpHidden = true;
    this.showScrollUp = false;
    this.hideScrollUpListenerBound = false;
    if (this.scrollUpHideTimeout) {
      window.clearTimeout(this.scrollUpHideTimeout);
      this.scrollUpHideTimeout = undefined;
    }
    window.removeEventListener('scroll', this.hideScrollUpOnce, { passive: true } as AddEventListenerOptions);
    window.removeEventListener('wheel', this.hideScrollUpOnce, { passive: true } as AddEventListenerOptions);
    window.removeEventListener('touchmove', this.hideScrollUpOnce, { passive: true } as AddEventListenerOptions);
  }

  private bindScrollUpHideListener(): void {
    if (this.hideScrollUpListenerBound) return;
    this.hideScrollUpListenerBound = true;
    window.addEventListener('scroll', this.hideScrollUpOnce, { passive: true });
    window.addEventListener('wheel', this.hideScrollUpOnce, { passive: true });
    window.addEventListener('touchmove', this.hideScrollUpOnce, { passive: true });
  }

  protected enterInvitation(): void {
    if (this.opening || this.entered) return;
    this.opening = true;
    this.scrollUpHidden = false;
    this.showScrollUp = true;
    this.scrollUpMinimumVisibleUntil = Date.now() + this.scrollUpMinimumDurationMs;
    if (this.scrollUpHideTimeout) {
      window.clearTimeout(this.scrollUpHideTimeout);
    }
    this.scrollUpHideTimeout = window.setTimeout(() => this.hideScrollUpNow(), this.scrollUpMinimumDurationMs);
    this.bindScrollUpHideListener();
    this.musicVisible = true;
    this.musicMuted = false;
    this.startBackgroundMusic();
    window.setTimeout(() => {
      this.entered = true;
      requestAnimationFrame(() => {
        document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => {
          requestAnimationFrame(() => this.triggerOpeningNameReveal());
        }, 700);
      });
    }, 760);
  }

  protected toggleMusic(): void {
    if (!this.backgroundMusic) {
      this.backgroundMusic = new Audio(this.musicSource);
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.6;
      this.backgroundMusic.preload = 'auto';
    }

    this.musicMuted = !this.musicMuted;
    this.backgroundMusic.muted = this.musicMuted;

    if (!this.musicMuted) {
      void this.backgroundMusic.play().catch(() => {
        this.musicMuted = true;
        this.backgroundMusic!.muted = true;
      });
      return;
    }

    this.backgroundMusic.pause();
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

  protected startScratch(event: PointerEvent): void {
    if (event.button !== 0 && event.pointerType !== 'touch') {
      return;
    }

    event.preventDefault();
    this.isScratching = true;
    const canvas = this.scratchCanvas?.nativeElement;
    if (canvas && typeof canvas.setPointerCapture === 'function') {
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // ignore stale pointer capture requests from synthetic or canceled events
      }
    }

    this.lastScratchPoint = this.getScratchPoint(event);
    this.scratchDistance = 0;
    this.scratchCount = 0;
    this.scratchProgress = 0;
  }

  protected scratch(event: PointerEvent): void {
    if (!this.isScratching || !this.context || !this.scratchCanvas) return;
    if (event.buttons === 0 && event.pointerType !== 'touch') return;

    const nextPoint = this.getScratchPoint(event);
    const previousPoint = this.lastScratchPoint ?? nextPoint;
    const distance = Math.hypot(nextPoint.x - previousPoint.x, nextPoint.y - previousPoint.y);
    if (distance > 0) {
      this.scratchDistance += distance;
    }

    this.context.globalCompositeOperation = 'destination-out';
    this.context.lineWidth = 58;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.beginPath();
    this.context.moveTo(previousPoint.x, previousPoint.y);
    this.context.lineTo(nextPoint.x, nextPoint.y);
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(nextPoint.x, nextPoint.y, 30, 0, Math.PI * 2);
    this.context.fill();

    this.lastScratchPoint = nextPoint;
    this.scratchCount++;
    this.scratchProgress = this.getScratchProgress();

    const shouldReveal = this.scratchDistance >= this.scratchDistanceThreshold || this.scratchCount >= this.scratchCountThreshold || this.scratchProgress >= this.scratchRevealThreshold;
    if (shouldReveal) {
      this.scratched = true;
      this.revealCompleted = true;
      this.tryStartCelebration();
    }
  }

  protected endScratch(event?: PointerEvent): void {
    if (event && this.scratchCanvas?.nativeElement && typeof this.scratchCanvas.nativeElement.releasePointerCapture === 'function') {
      try {
        this.scratchCanvas.nativeElement.releasePointerCapture(event.pointerId);
      } catch {
        // ignore pointer release errors from stale interactions
      }
    }

    this.isScratching = false;
    this.lastScratchPoint = undefined;

    const shouldReveal = this.scratchDistance >= this.scratchDistanceThreshold || this.scratchCount >= this.scratchCountThreshold || this.scratchProgress >= this.scratchRevealThreshold;
    if (shouldReveal) {
      this.scratched = true;
      this.revealCompleted = true;
      this.tryStartCelebration();
    }
  }

  private getScratchProgress(): number {
    if (!this.context || !this.scratchCanvas) return 0;
    const canvas = this.scratchCanvas.nativeElement;
    const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;

    for (let index = 3; index < imageData.length; index += 4) {
      if (imageData[index] < 20) {
        transparentPixels++;
      }
    }

    return transparentPixels / (canvas.width * canvas.height);
  }

  private getScratchPoint(event: PointerEvent): { x: number; y: number } {
    const canvas = this.scratchCanvas?.nativeElement;
    if (!canvas) return { x: 0, y: 0 };

    const bounds = canvas.getBoundingClientRect();
    const scaleX = canvas.width / bounds.width;
    const scaleY = canvas.height / bounds.height;
    return {
      x: (event.clientX - bounds.left) * scaleX,
      y: (event.clientY - bounds.top) * scaleY
    };
  }

  private tryStartCelebration(): void {
    if (this.celebrationStarted || !this.revealCompleted || !this.scratched) return;

    this.celebrationStarted = true;
    const section = this.scratchSection?.nativeElement;
    if (section) section.classList.add('is-celebrating');
  }

  private startBackgroundMusic(): void {
    if (!this.backgroundMusic) {
      this.backgroundMusic = new Audio();
      this.backgroundMusic.src = this.musicSource;
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.6;
      this.backgroundMusic.preload = 'auto';
    }

    this.backgroundMusic.muted = this.musicMuted;
    if (this.musicMuted) {
      this.backgroundMusic.pause();
      return;
    }

    this.backgroundMusic.load();
    void this.backgroundMusic.play().catch(() => {
      this.musicMuted = true;
      this.backgroundMusic!.muted = true;
    });
  }

  private prepareScratchCard(): void {
    this.scratched = false;
    this.scratchCount = 0;
    this.scratchDistance = 0;
    this.scratchProgress = 0;
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
