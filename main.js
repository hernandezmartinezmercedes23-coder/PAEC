/* ===============================
   UTILIDADES
================================ */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

/* ===============================
   ANIMACIÓN CONFETTI
================================ */

function launchConfetti(container) {
  const colors = ['#0b5ed7', '#60a5fa', '#16a34a', '#f59e0b', '#e11d48'];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('span');
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 1 + Math.random() + 's';

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 1600);
  }
}

/* ===============================
   QUIZ / EVALUACIÓN
================================ */

function initQuiz() {
  const quiz = $('#quiz');
  if (!quiz) return;

  const button = quiz.querySelector('button');
  const result = quiz.querySelector('.result');
  const trophy = quiz.querySelector('.trophy');

  button.addEventListener('click', () => {
    const answers = quiz.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    answers.forEach(a => {
      if (a.dataset.correct === 'true') score++;
    });

    result.textContent = `Tu puntaje es: ${score} / ${answers.length}`;
    result.style.display = 'block';

    if (score === answers.length && answers.length > 0) {
      trophy.classList.add('show');
      launchConfetti(quiz);
    } else {
      trophy.classList.remove('show');
    }
  });
}

/* ===============================
   EFECTO SCROLL SUAVE
================================ */

function smoothScroll() {
  $all('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = $(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ===============================
   ANIMACIÓN DE ENTRADA
================================ */

function revealOnScroll() {
  const cards = $all('.card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.1s';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

/* ===============================
   INICIALIZACIÓN
================================ */

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  smoothScroll();
  revealOnScroll();
});
