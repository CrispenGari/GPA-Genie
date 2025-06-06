from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

class TestCGPAPredictionAPI:
    def test_prediction_valid_case_average(self):
        payload = {
            "gender": "female",
            "age": 24,
            "year": 3,
            "sleepQuality": 5,
            "studyHoursPerWeek": 4,
            "academicEngagement": 5,
            "symptomFrequencyLast7Days": 8,
            "studyStressLevel": 2,
            "depression": False,
            "anxiety": False,
            "panicAttack": False,
            "specialistTreatment": False,
            "mentalHealthSupport": True
        }
        res = client.post("/api/v1/cgpa/predict", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["ok"] is True
        assert data["status"] == "success"
        assert "time" in data
        assert "prediction" in data

        prediction = data["prediction"]
        assert prediction["range"] == "2.00–2.99"
        assert prediction["description"] == "Average"
        assert prediction["grade_equivalent"] == "C"
        assert prediction["percentage_range"] == "70–79%"
        assert 2.0 <= prediction["cgpa"] < 3.0

    def test_prediction_invalid_field(self):
        """Tests request with missing required field."""
        payload = {
            # Missing required fields like "gender", "age"
            "year": 3,
            "sleepQuality": 5,
            "studyHoursPerWeek": 4
        }
        res = client.post("/api/v1/cgpa/predict", json=payload)
        assert res.status_code == 422  

    def test_prediction_wrong_data_type(self):
        """Tests with wrong data types (e.g., strings instead of integers)."""
        payload = {
            "gender": "female",
            "age": "twenty four",  # invalid
            "year": 3,
            "sleepQuality": "good",  # invalid
            "studyHoursPerWeek": 4,
            "academicEngagement": 5,
            "symptomFrequencyLast7Days": 8,
            "studyStressLevel": 2,
            "depression": "no",  # invalid
            "anxiety": False,
            "panicAttack": False,
            "specialistTreatment": False,
            "mentalHealthSupport": True
        }
        res = client.post("/api/v1/cgpa/predict", json=payload)
        assert res.status_code == 422  # FastAPI will raise validation error

    def test_prediction_with_extra_field(self):
        """Tests a case with unexpected extra fields in payload."""
        payload = {
            "gender": "female",
            "age": 24,
            "year": 3,
            "sleepQuality": 5,
            "studyHoursPerWeek": 4,
            "academicEngagement": 5,
            "symptomFrequencyLast7Days": 8,
            "studyStressLevel": 2,
            "depression": False,
            "anxiety": False,
            "panicAttack": False,
            "specialistTreatment": False,
            "mentalHealthSupport": True,
            "extraField": "should be ignored"  # unknown field
        }
        res = client.post("/api/v1/cgpa/predict", json=payload)
        assert res.status_code == 422 or res.status_code == 200
       