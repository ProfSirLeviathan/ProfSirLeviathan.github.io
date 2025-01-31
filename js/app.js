import { Terminal } from './terminal.js';
import { setupUI } from './ui.js';
import { setupEvents } from './events.js';
import { COMMANDS } from './commands.js';
import { sfx } from './config.js';

class SpaceTerminal extends Terminal {
  constructor() {
    super(COMMANDS, sfx);
    this.init();
  }

  async init() {
    setupUI(this);
    setupEvents(this);
    this.focusInput(3000);
    window.terminal = this; // Expose for DOM access
  }
}

// Initialize application
new SpaceTerminal();