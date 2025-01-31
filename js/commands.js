export const COMMANDS = {
    help: {
      desc: "Show command list",
      execute: (terminal) => `
SPACE COMMAND PROTOCOLS:
-------------------------
${Object.entries(COMMANDS).map(([cmd, { desc }]) => 
          `${cmd.padEnd(12)} ${desc}`).join('\n')}`
      
    },
  
    live: {
      desc: "Real-time satellite tracking",
      execute: (terminal) => {
        const liveFeed = document.createElement('div');
        const updatePosition = () => {
          fetch('https://api.wheretheiss.at/v1/satellites/25544')
            .then(res => res.json())
            .then(data => {
              liveFeed.innerHTML = `
                ISS POSITION:
                LAT: ${data.latitude.toFixed(2)}°
                LON: ${data.longitude.toFixed(2)}°
                ALT: ${data.altitude.toFixed(1)}km
                VEL: ${(data.velocity/3600).toFixed(1)}km/s
              `;
            });
        };
        setInterval(updatePosition, 3000);
        return liveFeed;
      }
    },
  
    deploy: {
      desc: "Project portfolio",
      execute: () => `
        SPACE SYSTEMS DEVELOPMENT:
        --------------------------
        [2023] LUNAR NAVIGATION BEACON
          - Led team of 8 engineers
          - Survived 300°C temperature swings
          - 300% accuracy improvement
  
        [2022] DEEP SPACE NETWORK OPTIMIZATION
          - Reduced latency by 40%
          - Patent: #US2022178345
          - Supported 12 simultaneous missions
  
        [2021] SATELLITE CONSTELLATION MANAGER
          - Managed 48-satellite network
          - 99.98% orbital reliability
          - Automated collision avoidance
      `
    },
  
    comms: {
      desc: "Contact channels",
      execute: () => `
        GROUND STATION LINKS:
        ---------------------
        X-BAND: contact@spacenet.com
        LASCOM: +1 555-2387
        GPS: 34°N 118°W (HQ)
      `
    },
  
    clear: {
      desc: "Reset terminal",
      execute: (terminal) => {
        terminal.output.innerHTML = `
          <div class="mission-patch">
            ${document.querySelector('.mission-patch').innerHTML}
          </div>
          <div class="satellite-response">
            [SYSTEM REBOOTED]
            > READY FOR INPUT
          </div>
        `;
        return '';
      }
    },
  
    secret: {
      desc: "Classified access",
      execute: (terminal) => terminal.konamiUnlocked ? `
        CLASSIFIED ACCESS GRANTED:
        ---------------------------
        Project Stellar Horizon:
          - Next-gen quantum comms
          - Lunar dark side coverage
          - Q4 2025 launch window
      ` : "ACCESS DENIED: Security clearance required"
    },
  
    eph: {
      desc: "Orbital parameters visualization",
      execute: () => {
        const viz = document.createElement('div');
        viz.className = 'orbit-viz';
        const satellite = document.createElement('div');
        satellite.className = 'satellite-marker';
        satellite.textContent = '🛰';
        
        let angle = 0;
        const orbit = setInterval(() => {
          angle = (angle + 2) % 360;
          satellite.style.left = `${50 + Math.cos(angle * Math.PI/180) * 45}%`;
          satellite.style.top = `${50 + Math.sin(angle * Math.PI/180) * 45}%`;
        }, 50);
        
        viz.appendChild(satellite);
        setTimeout(() => clearInterval(orbit), 5000);
        return viz;
      }
    },
  
    resume: {
      desc: "View mission briefing document",
      execute: (terminal) => {
        terminal.viewResume();
        return "INITIALIZING DOCUMENT VIEWER...";
      }
    },
  
    probe: {
      desc: "Launch deep space probe",
      execute: () => {
        const bar = document.createElement('div');
        let progress = 0;
        const update = setInterval(() => {
          progress = Math.min(progress + Math.random() * 10, 100);
          bar.innerHTML = `LAUNCH PROGRESS: [${'▓'.repeat(progress/5)}${'░'.repeat(20 - progress/5)}] ${Math.floor(progress)}%`;
          if(progress >= 100) clearInterval(update);
        }, 200);
        return bar;
      }
    },
  
    decrypt: {
      desc: "Analyze cosmic signals",
      execute: () => {
        const symbols = ['♆', '♇', '⚷', '⚸', '☄', '☊', '☋'];
        const signal = document.createElement('div');
        signal.style.color = 'var(--alert)';
        
        const interval = setInterval(() => {
          signal.textContent = Array(16).fill()
            .map(() => symbols[Math.floor(Math.random() * symbols.length)])
            .join('');
        }, 100);
        
        setTimeout(() => {
          clearInterval(interval);
          signal.remove();
        }, 3000);
        
        return signal;
      }
    }
  };