import os
from joblib import load

bundle_path = os.path.join(os.getcwd(), "models/static/cgpa_bundle.joblib")
bundle = load(bundle_path)

regressor = bundle['model']
ct = bundle['column_transformer']
scaler = bundle['scaler']

def preprocess_features(features):
    return ct.transform(features)


def predict_cgpa(regressor, features):
    features = preprocess_features(features)
    cgpa = regressor.predict(features).reshape(-1, 1)
    return scaler.inverse_transform(cgpa).reshape(-1) 


cgpa_ranges =  [
    {
        "range": "4.00",
        "description": "Excellent",
        "grade_equivalent": "A",
        "percentage_range": "90–100%"
    },
    {
        "range": "3.00–3.99",
        "description": "Good to Very Good",
        "grade_equivalent": "B",
        "percentage_range": "80–89%"
    },
    {
        "range": "2.00–2.99",
        "description": "Average",
        "grade_equivalent": "C",
        "percentage_range": "70–79%"
    },
    {
        "range": "1.00–1.99",
        "description": "Below Average",
        "grade_equivalent": "D",
        "percentage_range": "60–69%"
    },
    {
        "range": "0.00–0.99",
        "description": "Poor / Fail",
        "grade_equivalent": "F",
        "percentage_range": "0–59%"
    }
]