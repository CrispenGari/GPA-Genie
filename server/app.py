from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import warnings
from routers.predictCGPA import predictCGPARouter
warnings.filterwarnings("ignore")


app = FastAPI(
    title="Student Cumulative Grade Point Average (CGPA).",
    description="API for predicting Student Cumulative Grade Point Average (CGPA).",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictCGPARouter)


@app.get("/")
def root():
    return JSONResponse(
        {
            "title": "Student Cumulative Grade Point Average (CGPA).",
            "description": "API for predicting Student Cumulative Grade Point Average (CGPA).",
            "version": "1.0.0",
        },
        status_code=200,
    )