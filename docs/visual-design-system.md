# 🎨 Premium Visual Design System

## Система дизайна для high-tech e-commerce проектов

---

## 🎭 Визуальные стили

### Style 1: 🌌 Cyberpunk / Futuristic

**Когда использовать**: Tech products, Gaming, Crypto, AI/ML platforms

#### Цветовая палитра
```css
/* Primary Colors */
--cyber-cyan: #00F0FF;           /* Основной неоновый */
--cyber-magenta: #FF006E;        /* Акцентный неоновый */
--cyber-purple: #8338EC;         /* Дополнительный */
--cyber-yellow: #FFBE0B;         /* Предупреждения */

/* Background Colors */
--deep-space: #0A0E27;           /* Основной фон */
--dark-tech: #1A1F3A;            /* Вторичный фон */
--tech-card: #252B47;            /* Карточки */

/* Gradients */
--gradient-neon: linear-gradient(135deg, #00F0FF 0%, #FF006E 100%);
--gradient-cyber: linear-gradient(180deg, #8338EC 0%, #00F0FF 100%);
```

#### Typography
```css
/* Fonts */
--font-display: 'Orbitron', 'Rajdhani', sans-serif;
--font-body: 'Inter', 'System UI', sans-serif;
--font-mono: 'Fira Code', 'JetBrains Mono', monospace;

/* Sizes */
--text-hero: clamp(3rem, 8vw, 8rem);      /* 48-128px */
--text-h1: clamp(2.5rem, 5vw, 4.5rem);    /* 40-72px */
--text-h2: clamp(2rem, 4vw, 3rem);        /* 32-48px */
```

#### Effects
```css
/* Glow Effect */
.neon-glow {
  text-shadow:
    0 0 10px var(--cyber-cyan),
    0 0 20px var(--cyber-cyan),
    0 0 40px var(--cyber-cyan);

  box-shadow:
    0 0 20px rgba(0, 240, 255, 0.5),
    inset 0 0 20px rgba(0, 240, 255, 0.1);
}

/* Grid Pattern */
.cyber-grid {
  background-image:
    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Scan Line Effect */
.scan-lines {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}
```

---

### Style 2: 🎮 Gaming-Inspired

**Когда использовать**: Esports, Gaming products, Interactive experiences

#### Цветовая палитра
```css
/* Primary Colors */
--game-red: #FF4655;
--game-blue: #00A8FF;
--game-green: #00FF88;
--game-yellow: #FFD60A;

/* Dark Theme */
--game-bg: #0D1117;
--game-surface: #161B22;
--game-border: #30363D;

/* Accent Gradients */
--gradient-game: linear-gradient(135deg, #FF4655 0%, #00A8FF 100%);
--gradient-win: linear-gradient(135deg, #00FF88 0%, #00A8FF 100%);
```

#### UI Elements
```css
/* HUD-Style Borders */
.hud-border {
  position: relative;
  border: 2px solid var(--game-blue);

  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--game-red);
  }

  &::before { top: -2px; left: -2px; }
  &::after { bottom: -2px; right: -2px; }
}

/* Level-Up Animation */
@keyframes levelUp {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

/* Health Bar Style */
.progress-bar {
  background: linear-gradient(90deg, #FF4655 0%, #FFD60A 50%, #00FF88 100%);
  box-shadow: 0 0 20px currentColor;
  animation: pulse 2s infinite;
}
```

---

### Style 3: 🌊 Vaporwave Aesthetic

**Когда использовать**: Fashion, Art, Creative brands, NFT

#### Цветовая палитра
```css
/* Pastel Neons */
--vapor-pink: #FF71CE;
--vapor-blue: #01CDFE;
--vapor-mint: #05FFA1;
--vapor-purple: #B967FF;
--vapor-yellow: #FFFB96;

/* Backgrounds */
--vapor-bg: linear-gradient(180deg, #0D1B2A 0%, #1B263B 50%, #415A77 100%);

/* Gradients */
--gradient-vapor: linear-gradient(135deg,
  #FF71CE 0%,
  #01CDFE 25%,
  #05FFA1 50%,
  #B967FF 75%,
  #FFFB96 100%
);
```

#### Effects
```css
/* Glitch Effect */
.glitch {
  position: relative;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 #FF71CE;
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim 3s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 #01CDFE;
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 2s infinite linear alternate-reverse;
  }
}

@keyframes glitch-anim {
  0% { clip: rect(random(100), 9999px, random(100), 0); }
  100% { clip: rect(random(100), 9999px, random(100), 0); }
}

/* Retro Grid */
.retro-grid {
  background-image:
    linear-gradient(0deg, transparent 24%, rgba(255, 113, 206, 0.3) 25%, rgba(255, 113, 206, 0.3) 26%, transparent 27%, transparent 74%, rgba(255, 113, 206, 0.3) 75%, rgba(255, 113, 206, 0.3) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(255, 113, 206, 0.3) 25%, rgba(255, 113, 206, 0.3) 26%, transparent 27%, transparent 74%, rgba(255, 113, 206, 0.3) 75%, rgba(255, 113, 206, 0.3) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  perspective: 500px;
  transform: rotateX(60deg);
}
```

---

### Style 4: ✨ Minimalist Premium

**Когда использовать**: Luxury brands, High-end fashion, Jewelry

#### Цветовая палитра
```css
/* Neutral Base */
--premium-black: #000000;
--premium-white: #FFFFFF;
--premium-gray-100: #F5F5F5;
--premium-gray-900: #1A1A1A;

/* Accent Colors */
--gold: #D4AF37;
--silver: #C0C0C0;
--bronze: #CD7F32;

/* Gradients */
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #F4E5C3 100%);
--gradient-silver: linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%);
```

#### Typography
```css
/* Elegant Fonts */
--font-display: 'Playfair Display', 'Cormorant', serif;
--font-body: 'Inter', 'SF Pro', sans-serif;

/* Refined Sizes */
--text-hero: clamp(4rem, 10vw, 10rem);
--letter-spacing-wide: 0.2em;
--letter-spacing-ultra: 0.4em;
```

#### Effects
```css
/* Subtle Hover */
.premium-hover {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }
}

/* Elegant Line Animation */
.underline-reveal {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width 0.6s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

/* Backdrop Blur */
.glass-premium {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🎬 Animation Library

### Scroll Animations

```javascript
// GSAP ScrollTrigger Example
gsap.registerPlugin(ScrollTrigger);

// Parallax Hero
gsap.to(".hero-bg", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Reveal on Scroll
gsap.from(".fade-in", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// Pin Section
ScrollTrigger.create({
  trigger: ".pin-section",
  start: "top top",
  end: "+=1000",
  pin: true,
  scrub: 1
});
```

### Framer Motion Variants

```javascript
// Container Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

// Item Animation
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

// Page Transitions
const pageTransition = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
  transition: { duration: 0.5 }
};
```

### Micro-Interactions

```javascript
// Button Ripple Effect
const rippleEffect = (e) => {
  const button = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();

  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
};

// Magnetic Button
const magneticButton = (e) => {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out"
  });
};

// Cursor Follow
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

gsap.ticker.add(() => {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  gsap.set('.custom-cursor', {
    x: cursorX,
    y: cursorY
  });
});
```

---

## 📐 Layout Patterns

### Hero Sections

```html
<!-- Full-Screen Video Hero -->
<section class="hero-video">
  <video autoplay muted loop playsinline>
    <source src="hero.mp4" type="video/mp4">
  </video>
  <div class="hero-content">
    <h1 class="hero-title">Welcome to the Future</h1>
    <p class="hero-subtitle">Experience next-gen e-commerce</p>
    <button class="cta-button">Explore Now</button>
  </div>
</section>

<!-- 3D Hero with Three.js -->
<section class="hero-3d">
  <Canvas>
    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} />
    <ProductModel />
    <OrbitControls enableZoom={false} />
  </Canvas>
</section>

<!-- Animated Typography Hero -->
<section class="hero-typo">
  <h1 class="split-text" data-gsap="split">
    Luxury Redefined
  </h1>
</section>
```

### Product Grids

```jsx
// Masonry Grid with Animation
<motion.div
  className="product-grid"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {products.map((product) => (
    <motion.div
      key={product.id}
      className="product-card"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="product-image">
        <Image src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button>Quick View</button>
        </div>
      </div>
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
    </motion.div>
  ))}
</motion.div>
```

---

## 🎯 Component Examples

### Premium Button

```jsx
const PremiumButton = ({ children, variant = "primary" }) => {
  return (
    <motion.button
      className={`premium-btn premium-btn-${variant}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={rippleEffect}
    >
      <span className="btn-text">{children}</span>
      <span className="btn-glow"></span>
    </motion.button>
  );
};

// CSS
.premium-btn {
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;

  &-primary {
    background: var(--gradient-neon);
    color: white;
  }

  .btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent,
      rgba(255,255,255,0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover .btn-glow {
    left: 100%;
  }
}
```

### 3D Product Card

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ProductCard3D = ({ modelPath }) => {
  return (
    <div className="product-card-3d">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} />
        <ProductModel path={modelPath} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape / Small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */

/* Fluid Typography */
--fluid-min: 1rem;
--fluid-max: 3rem;
--fluid-val: calc(1rem + 2vw);

font-size: clamp(var(--fluid-min), var(--fluid-val), var(--fluid-max));
```

---

**🎨 Дизайн-система готова к использованию!**

*Все компоненты оптимизированы для производительности и доступности*
