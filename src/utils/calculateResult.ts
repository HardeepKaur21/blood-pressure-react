export function calculateResult(sys: number, dia: number): string {
  if (sys >= 140 || dia >= 90) {
    return "High Blood Pressure";
  } else {
    if ((dia < 90 && dia >= 80) || (sys >= 120 && sys < 140)) {
      return "Pre-High Blood Pressure";
    } else if (dia < 60 && sys < 90) {
      return "Low Blood Pressure";
    } else {
      return "Ideal Blood Pressure";
    }
  }
}
