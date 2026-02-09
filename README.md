# EduariseAR

<div align="center">

![EduariseAR Logo](https://img.shields.io/badge/EduariseAR-Web%20AR%20Platform-brightgreen)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/react-18.0+-61DAFB.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Alpha](https://img.shields.io/badge/status-alpha-orange.svg)]()

**Open-Source Web AR Platform for Education**

*Empowering teachers and creators to build immersive AR curriculum without coding*

[Features](#features) • [Quick Start](#quick-start) • [Demo](#demo) • [Documentation](#documentation) • [Roadmap](#roadmap)

</div>

---

## 🎯 What is EduariseAR?

**EduariseAR** is a complete web-based AR platform designed for educators and content creators. Upload images and 3D models, link them to markers, and instantly create engaging augmented reality experiences for your classroom - no coding required.

### Built for Education

Born from [Eduarise.com](https://eduarise.com)'s mission to transform education through technology, this platform makes professional AR accessible to every teacher.

**For Teachers:**
- 📱 Create AR lessons in minutes
- 🎨 Upload your own images and 3D models  
- 🎯 Use AR markers students can scan
- 🌐 Share via simple web links

**For Students:**
- 📸 Point phone camera at markers
- 🔮 See 3D content come to life
- 🎧 Listen to audio explanations
- ✅ Take interactive quizzes

---

## ✨ Features

### Current (v0.1 Alpha)

✅ **Creator Dashboard**
- Project management (create, edit, publish)
- Image upload for AR content
- Marker generation (ArUco markers)
- AR scene configuration

✅ **Web AR Viewer**
- Marker-based tracking (AR.js)
- Real-time 3D rendering (A-Frame)
- Mobile-optimized camera access
- Instant deployment (works in browser)

✅ **Backend API**
- FastAPI REST API
- File upload (images, 3D models)
- Project data management
- Marker generation service

### Coming Soon

🔜 **Enhanced Features**
- 3D model upload (.obj, .gltf, .glb)
- Audio narration per marker
- Interactive quizzes
- Multi-marker scenes
- Analytics dashboard

🔜 **Production Features**
- PostgreSQL database
- JWT authentication
- AWS S3 storage
- Custom domain deployment

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 16+ (for frontend)
- Webcam or mobile device with camera

### 1. Clone Repository

```bash
git clone https://github.com/eduarise/eduarise-ar.git
cd eduarise-ar
```

### 2. Start Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 3. Start Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend runs at `http://localhost:5173`

### 4. Test AR Viewer

Open in your browser:
```
viewer/simple-ar-test.html
```

Point your camera at this marker:

![Hiro Marker](https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png)

You should see a rotating green cube! 🎉

---

## 📱 Demo

### Create Your First AR Project

1. **Start the platform** (backend + frontend)
2. **Open Dashboard**: `http://localhost:5173`
3. **Create Project**: Click "Create New Project"
4. **Upload Image**: Add an image you want to see in AR
5. **Get Marker**: Download generated ArUco marker
6. **Publish**: Get shareable AR viewer link
7. **Test**: Print marker, open viewer on phone, point & scan!

### API Endpoints

Backend API available at `http://localhost:8000`:

- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - User login
- `POST /api/projects` - Create AR project
- `GET /api/projects` - List all projects
- `POST /api/projects/{id}/markers` - Add marker to project
- `POST /api/projects/{id}/publish` - Publish project
- `POST /api/upload/image` - Upload image file
- `POST /api/upload/model` - Upload 3D model
- `GET /api/markers/generate` - Generate ArUco markers

Full API docs: `http://localhost:8000/docs` (Swagger UI)

---

## 🏗️ Architecture

### Tech Stack

**Backend**
- FastAPI (Python REST API)
- OpenCV (Marker generation)
- Uvicorn (ASGI server)

**Frontend**
- React.js (Dashboard UI)
- TypeScript
- Material-UI (Components)
- Vite (Build tool)

**AR Viewer**
- AR.js (Marker tracking)
- A-Frame (3D rendering)
- Three.js (Graphics engine)

**Infrastructure**
- Docker (Containerization)
- PostgreSQL (Database - coming)
- AWS S3 (File storage - coming)

### Project Structure

```
EduariseAR/
├── backend/              # FastAPI Backend
│   ├── main.py          # API server
│   ├── requirements.txt # Python dependencies
│   └── uploads/         # File storage
│       ├── images/      # Uploaded images
│       ├── models/      # 3D models
│       └── markers/     # Generated markers
│
├── frontend/            # React Dashboard
│   ├── src/
│   │   ├── App.tsx     # Main app component
│   │   └── pages/      # Dashboard pages
│   └── package.json    # JS dependencies
│
├── viewer/              # WebAR Student App
│   ├── simple-ar-test.html   # Demo viewer
│   └── ar-viewer.html        # Production viewer
│
├── docker-compose.yml   # Full stack deployment
├── RESEARCH.md         # AR platform research
└── README.md           # This file
```

---

## 🔧 Development

### Run with Docker

```bash
docker-compose up
```

Starts all services:
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`
- PostgreSQL: `localhost:5432`

### Run Tests

Backend API test:
```bash
cd backend
python test_api.py
```

### Add CORS for Development

Backend automatically allows CORS from `http://localhost:5173` for local development.

---

## 📚 Documentation

### For Teachers

- [Creating Your First AR Project](docs/teachers/first-project.md)
- [Uploading Images and Models](docs/teachers/upload-content.md)
- [Printing and Using Markers](docs/teachers/markers.md)
- [Sharing AR with Students](docs/teachers/sharing.md)

### For Developers

- [API Reference](docs/api/README.md)
- [Backend Architecture](docs/dev/backend.md)
- [Frontend Components](docs/dev/frontend.md)
- [AR Viewer Customization](docs/dev/viewer.md)
- [Deployment Guide](docs/dev/deployment.md)

### Research & Background

See [RESEARCH.md](RESEARCH.md) for in-depth analysis of:
- AR technologies (Vuforia, ARCore, ARKit)
- Python AR ecosystem
- Web AR comparison (AR.js vs WebXR)
- Platform architecture decisions

---

## 📊 Roadmap

### ✅ Phase 1: MVP (Current)
- [x] FastAPI backend with file upload
- [x] React dashboard prototype
- [x] AR.js viewer working
- [x] Marker generation
- [x] Basic project management

### 🔄 Phase 2: Core Features (Next)
- [ ] Complete dashboard UI (Login, Projects, Editor)
- [ ] 3D model upload and preview
- [ ] Audio attachment per marker
- [ ] Quiz builder
- [ ] Project publishing workflow

### 🔜 Phase 3: Production (2-3 weeks)
- [ ] PostgreSQL integration
- [ ] JWT authentication
- [ ] File storage (S3/MinIO)
- [ ] Multi-user support
- [ ] Analytics dashboard

### 🚀 Phase 4: Scale (1-2 months)
- [ ] Public deployment
- [ ] Custom domains
- [ ] Template library
- [ ] Marketplace (share lessons)
- [ ] Mobile apps (iOS/Android)

---

## 🤝 Contributing

We welcome contributions! Whether you're:
- 🐛 Fixing bugs
- ✨ Adding features
- 📝 Improving documentation
- 🎨 Designing UI/UX
- 🧪 Writing tests

### How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow PEP 8 (Python) and ESLint (TypeScript)
- Write clear commit messages
- Add tests for new features
- Update documentation
- Keep PRs focused and small

---

## 🎓 Use Cases

### Geography
Interactive world maps, country exploration, landmark visualization

### Science
Solar system models, molecular structures, anatomy, physics simulations

### History
Historical artifacts, timeline visualization, ancient civilizations

### Mathematics
3D geometric shapes, graph visualization, equation exploration

### Art & Culture
Museum exhibits, cultural heritage, architecture, art analysis

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

Free for educational and commercial use.

---

## 🙏 Acknowledgments

- **AR.js** - Web AR foundation
- **A-Frame** - 3D rendering framework
- **OpenCV** - Computer vision tools
- **FastAPI** - Modern Python API framework
- **React** - UI library
- **Eduarise Community** - Inspiration and feedback

---

## 📞 Support

- **Website**: [eduarise.com](https://eduarise.com)
- **Email**: support@eduarise.com
- **GitHub Issues**: [Report bugs](https://github.com/eduarise/eduarise-ar/issues)
- **Discussions**: [Community forum](https://github.com/eduarise/eduarise-ar/discussions)

---

<div align="center">

**Built with ❤️ by the Eduarise Team**

*Making AR education accessible to every classroom*

[Website](https://eduarise.com) • [GitHub](https://github.com/eduarise) • [Demo](https://demo.eduarise.com)

⭐️ Star us on GitHub if you find this useful!

</div>
