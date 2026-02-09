# 🎯 Quick Guide: Upload & Experience AR

## Step-by-Step Instructions

### 1. Make Sure Backend is Running
```bash
cd backend
uvicorn main:app --reload
```
Backend should be at: `http://localhost:8000`

### 2. Make Sure Frontend is Running
```bash
cd frontend
npm run dev
```
Frontend should be at: `http://localhost:5173`

---

## 🚀 Experience AR in 3 Easy Steps

### Step 1: Upload Content
1. Open browser: `http://localhost:5173/projects/new`
2. You'll see the Project Editor page
3. Click **"Upload Image"** or **"Upload 3D Model"**
   - For images: any JPG, PNG, etc.
   - For 3D models: `.glb`, `.gltf`, `.obj`, or `.fbx` files
4. Wait for "✓ Uploaded successfully!" message
5. Click **"Generate Marker"** to create an AR marker
6. Download the marker image (or use Hiro marker)

### Step 2: View in AR
1. Click the **"🎯 View in AR"** button (green button)
2. A new tab opens with the AR viewer
3. Allow camera access when prompted

### Step 3: Point at Marker
1. Print the marker or display it on another screen
2. Point your camera at the marker
3. **See your AR content appear!** 🎉

---

## 🎨 Pre-loaded Test Models

We already have 8 models ready to test:

| Model | Use |
|-------|-----|
| 🦆 Duck | Classic test (recommended first) |
| 📦 Box | Simple geometry |
| 🥑 Avocado | Biology lesson |
| 🧠 Brain Stem | Anatomy lesson |
| 🏮 Lantern | History |
| 📷 Camera | Technology |

These are in: `backend/uploads/models/`

---

## 🖼️ Marker Options

### Option 1: Use Pre-made Hiro Marker (Easiest)
Download: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

### Option 2: Generate Custom Marker
1. Click "Generate Marker" button in Project Editor
2. Download the generated marker
3. Print or display on screen

---

## 📱 Testing Options

### Option 1: Dynamic AR Viewer (Recommended)
```
Open: viewer/dynamic-ar.html
```
- Pre-loaded with duck model
- Buttons to switch between models
- Works with Hiro marker
- Best for quick testing

### Option 2: Simple AR Test
```
Open: viewer/simple-ar-test.html
```
- Basic demo
- Green cube appears on marker
- Good for camera testing

### Option 3: Model Previewer (No AR, just 3D view)
```
Open: viewer/model-previewer.html
```
- Preview models without AR
- Click buttons to switch models
- No marker needed

---

## 🔧 Troubleshooting

### "Failed to upload"
- ✅ Make sure backend is running: `http://localhost:8000`
- ✅ Check backend terminal for errors
- ✅ Try uploading a smaller file first

### "Camera not working"
- ✅ Allow camera permissions in browser
- ✅ Try HTTPS (some browsers require it)
- ✅ Check if another app is using camera

### "Marker not detected"
- ✅ Make sure marker is flat and well-lit
- ✅ Try moving camera closer/further
- ✅ Ensure marker is in focus
- ✅ Use Hiro marker first (most reliable)

### "Model not showing in AR"
- ✅ Wait a few seconds for model to load
- ✅ Check browser console (F12) for errors
- ✅ Make sure backend server is running
- ✅ Try a smaller model first (duck.glb)

---

## 💡 Quick Test Right Now

**Fastest way to see AR working:**

1. **Start backend:** (if not running)
   ```bash
   cd backend && uvicorn main:app --reload
   ```

2. **Open AR viewer:**
   ```
   viewer/dynamic-ar.html
   ```

3. **Download Hiro marker:**
   https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

4. **Point camera at marker → See duck in AR!** 🦆✨

---

## 📂 File Upload Formats

### Images
- ✅ JPG, JPEG
- ✅ PNG
- ✅ GIF
- ✅ WEBP

### 3D Models
- ✅ GLB (recommended - single file)
- ✅ GLTF (JSON + bin)
- ✅ OBJ (Wavefront)
- ✅ FBX (Autodesk)

**Best format:** `.glb` - optimized for web, smallest size, includes textures

---

## 🎯 Success Criteria

You'll know it's working when:
- ✓ Upload shows "✓ Uploaded successfully!"
- ✓ File appears in "Uploaded Files" list
- ✓ AR viewer opens and asks for camera permission
- ✓ Marker detection message appears: "✓ Marker detected! AR active"
- ✓ 3D model appears floating above the marker
- ✓ Model rotates and stays tracked to marker

---

## 📞 Still Having Issues?

Check:
1. Backend terminal - any errors?
2. Frontend terminal - any errors?
3. Browser console (F12) - any errors?
4. Are both servers running on correct ports?
   - Backend: localhost:8000
   - Frontend: localhost:5173

---

**Ready to experience AR?** 🚀

Start with: Open `http://localhost:5173/projects/new` in your browser!
