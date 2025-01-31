export function setupEvents(terminal) {
    // Command input
    terminal.input.addEventListener('keypress', e => {
      if(e.key === 'Enter') {
        const cmd = terminal.input.value.trim();
        if(cmd) terminal.executeCommand(cmd);
        terminal.input.value = '';
        terminal.sfx.type.play();
      }
    });
  
    // Konami code
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                       'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiProgress = 0;
  
    document.addEventListener('keydown', e => {
      // History navigation
      if(e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        terminal.historyIndex = e.key === 'ArrowUp' 
          ? Math.max(0, terminal.historyIndex - 1)
          : Math.min(terminal.history.length, terminal.historyIndex + 1);
        terminal.input.value = terminal.history[terminal.historyIndex] || '';
      }
  
      // Konami code
      if(e.key === konamiCode[konamiProgress]) {
        konamiProgress++;
        if(konamiProgress === konamiCode.length) {
          terminal.konamiUnlocked = true;
          terminal.printResponse("SECURITY OVERRIDE ACCEPTED", 'color: var(--alert)');
          terminal.sfx.unlock.play();
          document.body.style.boxShadow = 'inset 0 0 50px rgba(0, 255, 0, 0.5)';
          setTimeout(() => document.body.style.boxShadow = '', 1000);
        }
      } else {
        konamiProgress = 0;
      }
    });
  }