### 🎓 CGPA Prediction API

A **FastAPI-based server** for predicting university students' CGPA using demographic, mental health, academic engagement, and stress-related indicators. The model returns a predicted CGPA along with a performance description (e.g., "Excellent", "Average", etc.).

#### 🚀 Features

- Predicts CGPA based on multiple student-related factors.
- Returns a detailed result including:
  - **CGPA value**
  - **Grade equivalent** (A, B, C, D, F)
  - **Percentage range**
  - **Performance description**
- Built with **FastAPI**
- Easily testable with `pytest` and `TestClient`.

#### 📦 Requirements

- Python 3.11+
- FastAPI
- Uvicorn
- scikit-learn

Install all dependencies:

```bash
pip install -r requirements.txt
```

#### Model Inputs

The API expects a POST request to `/api/v1/cgpa/predict` with the following JSON body:

```json
{
  "gender": "female",
  "age": 24,
  "year": 3,
  "sleepQuality": 5,
  "studyHoursPerWeek": 4,
  "academicEngagement": 5,
  "symptomFrequencyLast7Days": 8,
  "studyStressLevel": 2,
  "depression": false,
  "anxiety": false,
  "panicAttack": false,
  "specialistTreatment": false,
  "mentalHealthSupport": true
}
```

### Response Example

```json
{
  "ok": true,
  "status": "success",
  "time": 0.012,
  "prediction": {
    "cgpa": 2.53,
    "range": "2.00–2.99",
    "description": "Average",
    "grade_equivalent": "C",
    "percentage_range": "70–79%"
  }
}
```
