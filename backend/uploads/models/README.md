# 3D Test Models

This folder contains sample 3D models for testing the EduariseAR platform.

## Downloaded Models (8 files)

| Model | Size | Format | Category | Use Case |
|-------|------|--------|----------|----------|
| **duck.glb** | 117 KB | GLB | Classic Test | Standard AR test model (classic) |
| **avocado.glb** | 7.9 MB | GLB | Food/Nature | Biology, nutrition lessons |
| **brainstem.glb** | 3.1 MB | GLB | Anatomy | Science - human anatomy |
| **camera.glb** | 16.7 MB | GLB | Technology | History of technology, photography |
| **lantern.glb** | 9.1 MB | GLB | Object | History, light/energy lessons |
| **box.glb** | 1.6 KB | GLB | Geometry | Math - 3D shapes (simplest) |
| **box_animated.glb** | 11.7 KB | GLB | Geometry + Animation | Math - rotating shapes |
| **box_textured.glb** | 5.8 KB | GLB | Geometry | Math - textured 3D shapes |

## Educational Use Cases

### Science/Biology
- **brainstem.glb** - Anatomy lessons, nervous system
- **avocado.glb** - Botany, nutrition, cellular structure

### Math/Geometry
- **box.glb** - Basic 3D shapes
- **box_animated.glb** - Shape transformations
- **box_textured.glb** - Surface properties

### Technology/History
- **camera.glb** - Evolution of photography
- **lantern.glb** - History of lighting

### General Testing
- **duck.glb** - Classic AR test model (small, reliable)

## File Format

All models are in **GLB** (GL Transmission Format - Binary) format:
- ✅ Optimized for web/AR
- ✅ Works with A-Frame/AR.js
- ✅ Single file (textures embedded)
- ✅ Fast loading

## Testing Instructions

### 1. Test via Backend API
```bash
# Models are accessible at:
http://localhost:8000/uploads/models/duck.glb
http://localhost:8000/uploads/models/brainstem.glb
# etc...
```

### 2. Test in AR Viewer
Edit `viewer/ar-viewer.html` or `viewer/simple-ar-test.html` to use these models:

```html
<a-marker preset="hiro">
  <a-entity 
    gltf-model="url(http://localhost:8000/uploads/models/duck.glb)"
    scale="0.5 0.5 0.5"
  </a-entity>
</a-marker>
```

### 3. Test via Frontend Upload
- Open http://localhost:5173/projects/new
- These models simulate user uploads
- Can be used to test the project editor

## Recommendations by Size

### Small (< 1 MB) - Fast Loading
- **box.glb** (1.6 KB) ⭐ Fastest
- **box_textured.glb** (5.8 KB)
- **box_animated.glb** (11.7 KB)
- **duck.glb** (117 KB)

### Medium (1-10 MB) - Good for AR
- **brainstem.glb** (3.1 MB) ⭐ Educational
- **avocado.glb** (7.9 MB)
- **lantern.glb** (9.1 MB)

### Large (> 10 MB) - Detailed
- **camera.glb** (16.7 MB) ⚠️ May be slow on mobile

## Source

All models from [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets)
- License: Various (mostly CC0, CC-BY)
- Format: GLB (binary)
- Quality: Production-ready

## Quick Test

To quickly test a model in AR:

1. Start backend: `cd backend && uvicorn main:app --reload`
2. Open: `viewer/simple-ar-test.html`
3. Replace model URL with: `http://localhost:8000/uploads/models/duck.glb`
4. Point camera at Hiro marker

## Adding More Models

Download from:
- **Khronos Samples**: https://github.com/KhronosGroup/glTF-Sample-Assets
- **Sketchfab**: https://sketchfab.com/features/gltf (download as GLB)
- **Poly Haven**: https://polyhaven.com/models
- **Kenney Assets**: https://kenney.nl/assets (low-poly, educational)

Place in: `backend/uploads/models/`
