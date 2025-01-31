export class Terminal {
    constructor(commands, sfx) {
      this.COMMANDS = commands;
      this.sfx = sfx;
      this.konamiUnlocked = false;
      this.history = [];
      this.historyIndex = -1;
      this.output = document.getElementById('output');
      this.input = document.getElementById('command-input');
    }
  
    printResponse(text, style = '') {
      const div = document.createElement('div');
      div.className = 'satellite-response';
      
      let index = 0;
      const typeWriter = () => {
        if(index < text.length) {
          div.innerHTML = text.substring(0, index++) + (Math.random() < 0.1 ? '_' : '');
          setTimeout(typeWriter, Math.random() * 5);
        } else {
          div.innerHTML = text.replace(/\n/g, '<br>');
          this.autoScroll();
        }
      };
      
      typeWriter();
      if(style) div.style = style;
      this.output.appendChild(div);
    }
  
    executeCommand(cmd) {
      const [action] = cmd.toLowerCase().split(' ');
      this.printResponse(`C:\\SPACE_CMD> ${cmd}`, 'color: var(--secondary)');
      
      if(this.COMMANDS[action]) {
        const result = this.COMMANDS[action].execute(this);
        this.handleCommandResult(result);
      } else {
        this.handleUnknownCommand(cmd);
      }
    }
  
    handleCommandResult(result) {
      if(result instanceof Element) {
        this.output.appendChild(result);
      } else if(result) {
        this.printResponse(result);
      }
    }
  
    handleUnknownCommand(cmd) {
      this.printResponse(`SYSTEM ERROR: Unknown command '${cmd}'`, 'color: #f00');
      this.sfx.error.play();
    }
  
    autoScroll() {
      const container = document.getElementById('terminal-content');
      container.scrollTop = container.scrollHeight;
    }
  
    focusInput(delay = 0) {
      setTimeout(() => this.input.focus(), delay);
    }
  
    viewResume() {
      document.getElementById('crt-resume').style.display = 'block';
      document.addEventListener('keydown', this.handleEscape.bind(this), { capture: true });
    }
  
    closeResume() {
      document.getElementById('crt-resume').style.display = 'none';
      document.removeEventListener('keydown', this.handleEscape.bind(this), { capture: true });
    }
  
    handleEscape(e) {
      if(e.key === 'Escape') {
        this.closeResume();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }