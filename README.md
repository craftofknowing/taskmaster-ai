# TaskMaster-AI

TaskMaster-AI is an intelligent task management system designed to empower employees by aligning task selection with individual skills and interests. It leverages AI to enhance engagement, discover hidden talents, and optimize team performance — driving both personal growth and organizational efficiency.

---

##  Features

###  For Employees
- Visual task board with AI-estimated difficulty (green = easy, red = hard)
- Mandatory task highlighting (purple)
- AI-recommended "top choice" tasks
- Suggested learning resources for skills development
- Progress tracking on selected/completed tasks
- Feedback submission and automatic profile updates

### For Managers
- Dashboard with team performance metrics
- Summary of internal and cross-functional contributions
- NLP feedback analysis for completed tasks
- AI-assisted task definition and alignment with team skills
- Team development and efficiency improvement suggestions

---

## AI Capabilities (Powered by IBM Granite AI)

- Skill inference from unstructured feedback
- Task description generation and refinement
- Personalized task recommendations
- Learning resource suggestion engine
- Team and performance trend analysis using time series models
- Identification of hidden talent and skill trends

---

##  Demo (MVP) Overview

The MVP showcases the core loop:

- **Employee View**: Task board + AI recommendations
- **Manager View**: Team task summary and progress
- **AI Integration**:
  - Personalized task suggestion
  - Basic NLP feedback analysis
- **Machine Learning model**: Visualized predictions of task time duration
- ## Demo Video URL: https://www.youtube.com/watch?v=sJq-1khWvOI

---

##  Technologies Used

- **Frontend**: Web interface (React / basic HTML as MVP)
- **Backend**: Python (Flask/FastAPI)
- **Database**: SQLite / PostgreSQL (SQLAlchemy ORM)
- **AI Model**: IBM Granite AI, HuggingFace Embeddings
- **Vector Store**: FAISS / ChromaDB
- **Time Series**: Simulated metrics (based on IBM HR Analytics dataset)
- **Version Control**: Git + Git LFS for large files

---

## Downloading and Using Git LFS Files

This repository uses [Git Large File Storage (LFS)](https://git-lfs.github.com/) to manage large files (such as datasets and model files).  
**You must install Git LFS before cloning or pulling the repository to access these files.**

### 1. Install Git LFS

- **macOS:**  
  
bash
  brew install git-lfs


- **Windows:**  
  Download and run the installer from [git-lfs.github.com](https://git-lfs.github.com/).

- **Linux:**  
  
bash
  sudo apt-get install git-lfs


Or see [official installation instructions](https://git-lfs.github.com/) for more options[3][4][5].

### 2. Initialize Git LFS

After installing, run this command **once** (per machine):

bash
git lfs install

This sets up Git LFS for your user account[2][3][5].

### 3. Clone the Repository

Clone as usual:

bash
git clone <repository-url>
cd <repository-directory>


Git LFS will automatically download the required large files referenced in the repository[5][6].

### 4. Pulling LFS Files After Cloning

If you have already cloned the repository but do not see the large files (only pointer files), run:

bash
git lfs pull

This command downloads all Git LFS files referenced by your current checkout[8].

> **Note:** Downloading the repository as a ZIP file will not include Git LFS files. Always use git clone and ensure Git LFS is installed[9].

---

By following these steps, users will be able to access all large files managed by Git LFS in your repository.
## The Future Goal
Create a future-of-work task application that blends task autonomy, skill development, and AI insights — making workplaces more human-centric, data-informed, and growth-driven.
