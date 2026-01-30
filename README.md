
# Team-26
# CSI - 3D Bunny Robot with Webcam Background

A Three.js application that renders a 3D bunny robot model over a live webcam feed.

## Features

- 🐰 3D bunny robot model (GLTF format)
- 📷 Live webcam as scene background
- 💡 Enhanced lighting setup for optimal model visibility
- 📱 Responsive design that adapts to window resizing
- ⚡ Built with Vite for fast development

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A webcam
- Modern browser with WebGL support

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Add your 3D model:
   - Place your `bunny_robot_r_34.glb` file in the `public/models/` directory
   - Create the directory if it doesn't exist:
   ```bash
   mkdir -p public/models
   ```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is busy).

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
.
├── index.html          # Main HTML file
├── src/
│   └── main.js         # Three.js scene setup and logic
├── public/
│   └── models/
│       └── bunny_robot_r_34.glb  # 3D model file
├── package.json
└── README.md
```

## Dependencies

- **three** - 3D graphics library
- **vite** - Build tool and development server

## How It Works

1. **Scene Setup**: Creates a Three.js scene with perspective camera and WebGL renderer
2. **Lighting**: Implements directional, ambient, and front lighting for optimal model visibility
3. **Model Loading**: Loads the GLTF bunny robot model and positions it in the bottom-left corner
4. **Webcam Integration**: Captures webcam feed and uses it as the scene background
5. **Auto-scaling**: Automatically scales the model to fit properly in the scene
6. **Responsive**: Adjusts camera and renderer on window resize

## Webcam Permissions

On first run, your browser will request webcam access. You must grant permission for the background video feed to work.

## Troubleshooting

### Model not loading
- Ensure `bunny_robot_r_34.glb` is in the `public/models/` directory
- Check browser console for error messages
- Verify the file path in `main.js` matches your model location

### Webcam not working
- Check browser permissions for camera access
- Ensure no other application is using the webcam
- Try a different browser if issues persist

### Performance issues
- Lower the model polygon count if performance is poor
- Reduce renderer quality settings in `main.js`
- Close other browser tabs using hardware acceleration

## Customization

### Change Model Position
Edit the position values in `main.js`:
```javascript
robot.position.set(-5, -3.5, 0); // x, y, z coordinates
```

### Adjust Model Size
Modify the scale factor:
```javascript
const scale = 4.5 / maxAxis; // Change 4.5 to desired size
```

### Change Lighting
Adjust light intensity and position:
```javascript
const light = new THREE.DirectionalLight(0xffffff, 1.5); // color, intensity
light.position.set(5, 10, 7); // x, y, z position
```

## Browser Support

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
