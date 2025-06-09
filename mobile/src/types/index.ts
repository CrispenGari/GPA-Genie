export interface TBody {
  gender: string;
  age: number;
  year: number;
  sleepQuality: number;
  studyHoursPerWeek: number;
  academicEngagement: number;
  symptomFrequencyLast7Days: number;
  studyStressLevel: number;
  depression: boolean;
  anxiety: boolean;
  panicAttack: boolean;
  specialistTreatment: boolean;
  mentalHealthSupport: boolean;
}

export interface Prediction {
  range: string;
  description: string;
  grade_equivalent: string;
  percentage_range: string;
  cgpa: number;
  id: string;
}

export interface TPerformance extends Prediction {
  date: Date;
}
export interface TResponse {
  time: number;
  ok: boolean;
  status: "error" | "success";
  prediction?: Prediction;
  message?: string;
  field?: string;
  id: string;
}

export interface THealth {
  anxiety: string;
  symptomsFrequency: number;
  depression: string;
  mentalHealthSupport: string;
  panicAttacks: string;
  specialistTreatment: string;
}
