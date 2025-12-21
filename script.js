// Cœurs flottants
const createHearts = () => {
  const container = document.getElementById("heartsContainer");
  const heartCount = 25;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    // Position aléatoire
    heart.style.left = `${Math.random() * 100}vw`;

    // Taille aléatoire
    const size = Math.random() * 1.5 + 1;
    heart.style.fontSize = `${size}rem`;

    // Animation avec délai aléatoire
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    container.appendChild(heart);
  }
}
  
// Cadeau virtuel
const setupGift = () => {
  const gift = document.getElementById("virtualGift");
  let opened = false;

  gift.addEventListener("click", () => {
    if (!opened) {
      opened = true;  
      const giftBox = gift.querySelector(".gift-box");
      const message = gift.querySelector(".gift-message");
      // Animation d'ouverture
      giftBox.style.transform = "scale(1.5) rotate(20deg)";
      giftBox.style.transition = "transform 0.5s";

      setTimeout(() => {
        giftBox.innerHTML = "💝";
        giftBox.style.transform = "scale(1) rotate(0deg)";
        message.innerHTML =
          "Mon plus beau cadeau, c'est ton amour. <br> Je t'aime tres fort ❤️<br> 0808 cupidon n'avait rien d'autre a faire";
        message.style.color = "var(--soft-pink)";
        message.style.fontSize = "1.4rem";

        // Créer des cœurs qui montent
        createHeartBurst();
      }, 500);
    }
  });
}

// Explosion de cœurs
const createHeartBurst = () => {
  const container = document.getElementById("heartsContainer");
  const gift = document.getElementById("virtualGift");
  const rect = gift.getBoundingClientRect();

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heart.style.fontSize = "1.5rem";
    heart.style.zIndex = "100";
    heart.style.animation = `heartBurst 1.5s ease-out forwards`;

    // Direction aléatoire
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    heart.style.setProperty("--end-x", `${endX}px`);
    heart.style.setProperty("--end-y", `${endY}px`);

    container.appendChild(heart);

    // Supprimer après animation
    setTimeout(() => heart.remove(), 1500);
  }
}

// Style pour l'explosion de cœurs
const style = document.createElement("style");
style.textContent = `
            @keyframes heartBurst {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--end-x), var(--end-y)) scale(0);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Bouton musique
const setupMusic = () => {
  const playBtn = document.getElementById("playBtn");
  let playing = false;
  const audio = new Audio("./audio.mp3");

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      playBtn.style.background =
        "linear-gradient(135deg, var(--romantic-red), var(--soft-pink))";
    } else {
      audio.pause();
      playing = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      playBtn.style.background =
        "linear-gradient(135deg, var(--deep-red), var(--romantic-red))";
    }
  });
}

// Musique de fond douce
const setupBackgroundMusic = () => {
  const bgAudio = new Audio("./background-music.mp3");
  bgAudio.loop = true;
  bgAudio.volume = 0.1; // Volume réduit pour l'ambiance
  
  // Démarrer la musique automatiquement
  bgAudio.play().catch(error => {
    // Si le navigateur bloque l'autoplay, attendre un clic utilisateur
    document.addEventListener('click', () => {
      bgAudio.play();
    }, { once: true });
  });

  // Arrêter la musique quand l'utilisateur quitte la page (mobile)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      bgAudio.pause();
    } else {
      bgAudio.play();
    }
  });

  // Arrêter la musique quand la page perd le focus
  window.addEventListener('blur', () => {
    bgAudio.pause();
  });

  // Reprendre la musique quand la page reprend le focus
  window.addEventListener('focus', () => {
    if (!document.hidden) {
      bgAudio.play();
    }
  });

  // Arrêter la musique avant de quitter la page
  window.addEventListener('pagehide', () => {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  });
}

// Animation des cartes de souvenirs
const animateCards = () => {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, 300 + index * 300);
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  createHearts();
  setupGift();
  setupMusic();
  setupBackgroundMusic();
  animateCards();

  createRomanticSnow();
});

// Neige romantique
const createRomanticSnow = () => {
  const container = document.getElementById("heartsContainer");

  setInterval(() => {
    if (Math.random() > 0.7) {
      const snowflake = document.createElement("div");
      snowflake.innerHTML = "❄";
      snowflake.style.position = "fixed";
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = "-20px";
      snowflake.style.fontSize = `${Math.random() * 1 + 1}rem`;
      snowflake.style.opacity = "1";
      snowflake.style.color = "rgba(255, 255, 255, 0.8)";
      snowflake.style.zIndex = "1";
      snowflake.style.pointerEvents = "none";

      container.appendChild(snowflake);

      // Animation de chute
      const duration = Math.random() * 5 + 5;
      snowflake.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;

      setTimeout(() => {
        snowflake.style.transform = `translateY(100vh) rotate(${
          Math.random() * 360
        }deg)`;
        snowflake.style.opacity = "0";
      }, 10);

      // Supprimer après animation
      setTimeout(() => snowflake.remove(), duration * 1000);
    }
  }, 300);
}
