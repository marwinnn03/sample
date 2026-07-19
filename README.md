# Marwin Batis — Personal Portfolio Site

Ang project na ito ay nahahati sa dalawang bahagi: **Frontend (React + Vite)** at **Backend (Python FastAPI)**.

```
root/
├── frontend/   # React User Interface
└── backend/    # Python API Server
```

---

## 1. Patakbuhin ang Frontend (React)

Pumunta sa `frontend` directory, mag-install ng dependencies, at patakbuhin ang dev server:

```bash
cd frontend
npm install       # (Done during initial setup)
npm run dev
```

Ang frontend ay tatakbo sa **[http://localhost:5173](http://localhost:5173)**.

---

## 2. Patakbuhin ang Backend (Python FastAPI)

Pumunta sa `backend` directory, i-install ang requirements, at patakbuhin ang uvicorn server.

### A. I-setup ang Python Virtual Environment (Inirerekomenda)

Sa loob ng `backend` folder, patakbuhin ang sumusunod na commands:

**Sa Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### B. I-install ang Dependencies at Patakbuhin ang Server

Matapos ma-activate ang virtual environment (o kung gagamit ka ng global python environment), i-install ang libraries at simulan ang startup script:

```bash
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Ang backend API server ay tatakbo sa **[http://localhost:8000](http://localhost:8000)**.
- **Interactive Documentation**: Maaari mong makita ang auto-generated docs sa **[http://localhost:8000/docs](http://localhost:8000/docs)**.
- **Messages database**: Ang mga mensahe mula sa contact form ay mai-save sa `backend/messages.json`.
