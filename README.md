
# Team-26
# Talking Lexi - Interactive 3D Bunny Robot

An interactive Three.js application featuring a 3D bunny robot that responds to hand gestures in real-time, with a live webcam feed as the background.

## Features

### 🎮 Hand Gesture Control
- **Real-time hand tracking** using MediaPipe Hands
- **Gesture-based animations** (must hold gesture for 3 seconds):
  - ✌️ **Peace Sign** → Dance animation (Hip Hop Dancing)
  - 👍 **Thumbs Up** → Jump animation (Standing Jump FBX)
  - ✊ **Fist** → Spin animation
- **Position tracking** - Robot follows hand movement in real-time
- **Rotation control** - Robot orientation responds to hand position

### 🎬 Animations
- **FBX Animation Support**:
  - Standing Jump animation (triggered by thumbs up)
  - Hip Hop Dancing animation (triggered by peace sign)
- **Procedural Animations**:
  - Smooth spinning
  - Wave animation
  - Automatic fallback if FBX animations fail to load

### 🎨 Visual Features
- 🐰 Bunny robot with skin texture (OBJ + MTL format)
- 📷 Live mirrored webcam feed as scene background
- 💡 Professional lighting setup (Directional + Ambient)
- 🎯 Auto-centering and auto-scaling
- ⚡ Smooth interpolated movements

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- **Webcam** (required for hand tracking)
- Modern browser with WebGL support
- Good lighting conditions for optimal hand detection

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Team-26.git
cd Team-26
```

2. Install dependencies:
```bash
npm install
```

3. Add required 3D models and animations to the `public` folder:
   - `bunny robot r 34.obj` - Main robot model
   - `bunny robot r 34.mtl` - Material file with skin textures
   - `Standing Jump.fbx` - Jump animation
   - `Hip Hop Dancing.fbx` - Dance animation

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`.

**Important**: Allow webcam access when prompted - it's required for hand tracking!

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Use

1. **Launch the app** and allow webcam access
2. **Position your hand** in front of the webcam
3. **Hold a gesture for 3 seconds** to trigger animations:
   - ✌️ Peace sign → Hip hop dance
   - 👍 Thumbs up → Standing jump
   - ✊ Closed fist → Spin around
4. **Move your hand** to control the robot's position and rotation
5. The robot will automatically return to center when no hand is detected

## Project Structure

```
.
├── index.html                    # Main HTML entry point
├── src/
│   └── main.js                   # Main application logic
├── public/
│   ├── bunny robot r 34.obj      # 3D robot model
│   ├── bunny robot r 34.mtl      # Material/texture file
│   ├── Standing Jump.fbx         # Jump animation
│   └── Hip Hop Dancing.fbx       # Dance animation
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Dependencies

- **three** - 3D graphics library
- **three-fbx-loader** - FBX animation loader
- **@mediapipe/hands** - Hand tracking ML model
- **@mediapipe/camera_utils** - Camera utilities
- **vite** - Build tool and dev server

## Technical Details

### Architecture
- **Rendering**: Three.js WebGL renderer with high-performance settings
- **Hand Tracking**: MediaPipe Hands with real-time landmark detection
- **Animations**: THREE.AnimationMixer for FBX animations + procedural fallbacks
- **Background**: Live webcam feed with mirrored texture
- **Gesture Detection**: 3-second hold requirement to prevent accidental triggers

### Performance Optimizations
- Smooth interpolation for movements (0.15 smoothing factor)
- Automatic model centering and scaling
- Efficient gesture state management
- Background process for hand tracking

## Troubleshooting

### Hand tracking not working
- Ensure good lighting conditions
- Position hand clearly in front of camera
- Try adjusting hand distance from camera
- Check browser console for MediaPipe errors

### Animations not playing
- Verify all FBX files are in the `public` folder
- Check browser console for loading errors
- Ensure FBX files contain valid animation data

### Webcam issues
- Grant camera permissions in browser settings
- Close other apps using the webcam
- Try refreshing the page
- Check browser compatibility (Chrome recommended)

### Performance issues
- Close other browser tabs
- Ensure hardware acceleration is enabled
- Lower video quality in camera settings
- Check CPU/GPU usage

## Customization

### Adjust Gesture Hold Time
In `main.js`, change the hold duration:
```javascript
let gestureHoldDuration = 3000; // milliseconds (3 seconds)
```

### Modify Robot Position
Change initial position:
```javascript
robot.position.set(0, -2, 0); // x, y, z coordinates
```

### Adjust Animation Speed
Modify animation mixer time scale:
```javascript
animationMixer.timeScale = 1.0; // 1.0 = normal speed
```

### Change Lighting
Adjust light intensity:
```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
```

## Browser Support

- Chrome/Edge (Recommended) - Full WebGL and MediaPipe support
- Firefox - Supported
- Safari - Supported (may require permissions setup)

Requires:
- WebGL 2.0 support
- Webcam access
- JavaScript enabled

## Credits

- **Three.js** - 3D graphics rendering
- **MediaPipe** - Google's hand tracking solution
- **FBX Animations** - Mixamo animation library

## License

This project is for educational purposes.

---

**Made with ❤️ using Three.js and MediaPipe**

Works best in modern browsers with WebGL 2.0 support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Credits

- Three.js library
- Bunny robot model: [Add source/credits]
>>>>>>> 12dd3b1 (Initial commit)
