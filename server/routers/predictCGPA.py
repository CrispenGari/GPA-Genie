from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
from models import regressor, predict_cgpa, cgpa_ranges
from typing import Annotated
import time
import pandas as pd


predictCGPARouter = APIRouter(prefix="/api/v1/cgpa")


@predictCGPARouter.post("/predict")
def predict_tb_(
    gender: Annotated[str, Body()],
    age: Annotated[int, Body()],
    year: Annotated[int, Body()],
    sleepQuality: Annotated[int, Body()],
    studyHoursPerWeek: Annotated[int, Body()],
    academicEngagement: Annotated[int, Body()],
    symptomFrequencyLast7Days: Annotated[int, Body()],
    studyStressLevel: Annotated[int, Body()],
    depression: Annotated[bool, Body()],
    anxiety: Annotated[bool, Body()],
    panicAttack: Annotated[bool, Body()],
    specialistTreatment: Annotated[bool, Body()],
    mentalHealthSupport: Annotated[bool, Body()],
):
    start = time.time()
    try:
        body = {
            "Gender": gender.capitalize(),
            "Age": age,
            "YearOfStudy": f"YEAR {year}",
            "Depression": int(depression),
            "Anxiety": int(anxiety),
            "PanicAttack": int(panicAttack),
            "SpecialistTreatment": int(specialistTreatment),
            "SymptomFrequency_Last7Days": symptomFrequencyLast7Days,
            "HasMentalHealthSupport": int(mentalHealthSupport),
            "SleepQuality": sleepQuality,
            "StudyStressLevel": studyStressLevel,
            "StudyHoursPerWeek": studyHoursPerWeek,
            "AcademicEngagement": academicEngagement,
        }

        dataframe = pd.DataFrame([body])
        cgpa = predict_cgpa(regressor, dataframe)[0]
        if cgpa >= 4.00:
            result = cgpa_ranges[0]
        elif 3.00 <= cgpa < 4.00:
            result = cgpa_ranges[1]
        elif 2.00 <= cgpa < 3.00:
            result = cgpa_ranges[2]
        elif 1.00 <= cgpa < 2.00:
            result = cgpa_ranges[3]
        else:
            result = cgpa_ranges[4]

        result["cgpa"] = cgpa
        return JSONResponse(
            {
                "time": time.time() - start,
                "ok": True,
                "status": "success",
                "prediction": result,
            },
            status_code=200,
        )
    except Exception:
        return JSONResponse(
            {
                "time": time.time() - start,
                "ok": False,
                "field": "server",
                "status": "error",
                "message": "Internal Server Error.",
            },
            status_code=500,
        )
