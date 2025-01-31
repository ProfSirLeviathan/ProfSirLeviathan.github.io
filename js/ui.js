export function setupUI(terminal) {
    createStarfield();
    setupClock();
  }
  
  function createStarfield() {
    const container = document.getElementById('starfield');
    for(let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = star.style.height = `${Math.random() * 2}px`;
      star.style.animationDelay = `${Math.random() * 1}s`;
      container.appendChild(star);
    }
  }
  
  function setupClock() {
    setInterval(() => {
      const clock = document.getElementById('mission-clock');
      const now = new Date();
      clock.textContent = `MISSION TIME ${now.toLocaleTimeString('en-US', { hour12: false })}`;
    }, 1000);
  }