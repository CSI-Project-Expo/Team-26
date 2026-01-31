// Voice Recognition Module with Web Speech API

let recognition = null;
let isListening = false;

// UI Elements
export function createVoiceUI() {
  const controlPanel = document.createElement('div');
  controlPanel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 15px;
    color: white;
    z-index: 1000;
    min-width: 300px;
    font-family: Arial, sans-serif;
  `;

  const title = document.createElement('h3');
  title.textContent = 'Voice Commands';
  title.style.margin = '0 0 15px 0';
  controlPanel.appendChild(title);

  const voiceButton = document.createElement('button');
  voiceButton.textContent = '🎤 Start Listening';
  voiceButton.style.cssText = `
    width: 100%;
    padding: 12px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 10px;
  `;
  controlPanel.appendChild(voiceButton);

  const statusDiv = document.createElement('div');
  statusDiv.style.cssText = `
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin-bottom: 10px;
    min-height: 30px;
    font-size: 14px;
  `;
  statusDiv.textContent = '🔴 Not listening';
  controlPanel.appendChild(statusDiv);

  const transcriptDiv = document.createElement('div');
  transcriptDiv.style.cssText = `
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin-bottom: 10px;
    min-height: 60px;
    font-size: 13px;
    color: #aaa;
    max-height: 120px;
    overflow-y: auto;
  `;
  transcriptDiv.innerHTML = '<em>Speech will appear here...</em>';
  controlPanel.appendChild(transcriptDiv);

  const commandsDiv = document.createElement('div');
  commandsDiv.style.cssText = `
    font-size: 12px;
    color: #888;
    line-height: 1.6;
  `;
  commandsDiv.innerHTML = `
    <strong>Try saying:</strong><br>
    • "hello" or "hi"<br>
    • "wave"<br>
    • "jump"<br>
    • "spin"<br>
    • "dance"
  `;
  controlPanel.appendChild(commandsDiv);

  document.body.appendChild(controlPanel);

  return { voiceButton, statusDiv, transcriptDiv };
}

// Initialize Voice Recognition
export function initVoiceRecognition(statusDiv, transcriptDiv, voiceButton, onCommand) {
  // Check browser support
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    statusDiv.textContent = '❌ Speech recognition not supported';
    statusDiv.style.background = 'rgba(255, 50, 50, 0.3)';
    transcriptDiv.innerHTML = '<em style="color: #ff5555;">Please use Chrome, Edge, or Safari</em>';
    console.error('Speech recognition not supported');
    return false;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  
  // Configuration
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;
  
  let finalTranscript = '';
  
  recognition.onstart = () => {
    isListening = true;
    voiceButton.textContent = '🔴 Stop Listening';
    voiceButton.style.background = '#f44336';
    statusDiv.textContent = '🟢 Listening...';
    statusDiv.style.background = 'rgba(76, 175, 80, 0.3)';
    transcriptDiv.innerHTML = '<em style="color: #4CAF50;">Listening for your voice...</em>';
    console.log('✅ Voice recognition started');
  };
  
  recognition.onresult = (event) => {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
        console.log('🗣️ Final:', transcript);
        
        // Detect and execute commands
        detectVoiceCommand(transcript.toLowerCase().trim(), statusDiv, onCommand);
      } else {
        interimTranscript += transcript;
      }
    }
    
    transcriptDiv.innerHTML = `
      <div style="color: white; font-weight: bold; margin-bottom: 5px;">${finalTranscript}</div>
      <div style="color: #aaa; font-style: italic;">${interimTranscript}</div>
    `;
  };
  
  recognition.onerror = (event) => {
    console.error('❌ Speech error:', event.error);
    
    let errorMsg = '';
    switch(event.error) {
      case 'not-allowed':
      case 'service-not-allowed':
        errorMsg = '❌ Microphone blocked. Allow mic access in browser settings.';
        voiceButton.textContent = '🎤 Start Listening';
        voiceButton.style.background = '#4CAF50';
        isListening = false;
        break;
      case 'no-speech':
        errorMsg = '⚠️ No speech detected';
        return; // Don't show error for no speech
      case 'network':
        errorMsg = '❌ Network error';
        break;
      default:
        errorMsg = `❌ Error: ${event.error}`;
    }
    
    statusDiv.textContent = errorMsg;
    statusDiv.style.background = 'rgba(255, 152, 0, 0.3)';
  };
  
  recognition.onend = () => {
    console.log('🔴 Recognition ended');
    
    if (isListening) {
      setTimeout(() => {
        try {
          recognition.start();
          console.log('🔄 Auto-restarted');
        } catch(e) {
          console.log('Cannot restart:', e);
          isListening = false;
          voiceButton.textContent = '🎤 Start Listening';
          voiceButton.style.background = '#4CAF50';
          statusDiv.textContent = '🔴 Not listening';
        }
      }, 100);
    } else {
      voiceButton.textContent = '🎤 Start Listening';
      voiceButton.style.background = '#4CAF50';
      statusDiv.textContent = '🔴 Stopped';
    }
  };
  
  return recognition;
}

// Start/Stop Voice Recognition
export function toggleVoiceRecognition(recognition, statusDiv) {
  if (isListening) {
    if (recognition) {
      recognition.stop();
      isListening = false;
    }
    return false;
  } else {
    try {
      recognition.start();
      return true;
    } catch(e) {
      console.error('Failed to start:', e);
      statusDiv.textContent = '❌ Failed to start';
      statusDiv.style.background = 'rgba(255, 50, 50, 0.3)';
      return false;
    }
  }
}

// Detect Voice Commands
function detectVoiceCommand(text, statusDiv, onCommand) {
  console.log('🔍 Checking:', text);
  
  let command = null;
  let message = '';
  let color = '';
  
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    command = 'hello';
    message = '👋 Hello! I heard you!';
    color = 'rgba(76, 175, 80, 0.3)';
  }
  else if (text.includes('wave')) {
    command = 'wave';
    message = '👋 Waving!';
    color = 'rgba(33, 150, 243, 0.3)';
  }
  else if (text.includes('jump')) {
    command = 'jump';
    message = '⬆️ Jumping!';
    color = 'rgba(156, 39, 176, 0.3)';
  }
  else if (text.includes('spin') || text.includes('turn')) {
    command = 'spin';
    message = '🌀 Spinning!';
    color = 'rgba(255, 193, 7, 0.3)';
  }
  else if (text.includes('dance')) {
    command = 'dance';
    message = '💃 Dancing!';
    color = 'rgba(233, 30, 99, 0.3)';
  }
  
  if (command) {
    statusDiv.textContent = message;
    statusDiv.style.background = color;
    console.log('✅ Detected:', command);
    
    // Execute command callback
    if (onCommand) {
      onCommand(command);
    }
    
    // Reset after 2 seconds
    setTimeout(() => {
      if (isListening) {
        statusDiv.textContent = '🟢 Listening...';
        statusDiv.style.background = 'rgba(76, 175, 80, 0.3)';
      }
    }, 2000);
  }
}

// Gemini API Integration (TODO)
export async function sendToGemini(userText, apiKey) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch(error) {
    console.error('Gemini API error:', error);
    return null;
  }
}
