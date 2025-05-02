
export interface HealthMetrics {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
}

export interface BMIResult {
  value: number;
  category: string;
  colorClass: string;
}

export const calculateBMI = (weight: number, height: number): BMIResult => {
  // BMI = weight(kg) / (height(m))²
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBMI = Math.round(bmi * 10) / 10;
  
  let category = '';
  let colorClass = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    colorClass = 'text-health-warning';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Healthy';
    colorClass = 'text-health-success';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    colorClass = 'text-health-warning';
  } else {
    category = 'Obese';
    colorClass = 'text-health-danger';
  }
  
  return { value: roundedBMI, category, colorClass };
};

export const calculateCalorieNeeds = (metrics: HealthMetrics): number => {
  // Harris-Benedict equation for BMR
  let bmr = 0;
  
  if (metrics.gender === 'male') {
    bmr = 88.362 + (13.397 * metrics.weight) + (4.799 * metrics.height) - (5.677 * metrics.age);
  } else {
    bmr = 447.593 + (9.247 * metrics.weight) + (3.098 * metrics.height) - (4.330 * metrics.age);
  }
  
  // Activity multipliers
  const activityMultipliers = {
    'sedentary': 1.2,      // Little or no exercise
    'light': 1.375,        // Light exercise 1-3 days/week
    'moderate': 1.55,      // Moderate exercise 3-5 days/week
    'active': 1.725,       // Hard exercise 6-7 days/week
    'very-active': 1.9     // Very hard exercise & physical job or training twice a day
  };
  
  const tdee = bmr * activityMultipliers[metrics.activityLevel];
  return Math.round(tdee);
};

export const generateFitnessPlan = (metrics: HealthMetrics, bmi: BMIResult): string[] => {
  const plans = {
    'Underweight': [
      'Focus on strength training to build muscle mass',
      'Start with bodyweight exercises like push-ups, squats, and lunges',
      'Gradually incorporate resistance training 3-4 times per week',
      'Include some light cardio 2-3 times per week for heart health',
      'Ensure adequate rest between workouts (48 hours for muscle groups)'
    ],
    'Healthy': [
      'Maintain a balanced workout regimen with both cardio and strength training',
      'Aim for 150 minutes of moderate activity per week',
      'Include 2-3 days of strength training targeting major muscle groups',
      'Add flexibility and mobility work like yoga or stretching sessions',
      'Try interval training for efficient workouts'
    ],
    'Overweight': [
      'Begin with low-impact cardio like walking, swimming, or cycling',
      'Gradually build up to 30-45 minutes of moderate cardio 5 times weekly',
      'Incorporate strength training 2-3 times per week for metabolic boost',
      'Consider circuit training to maximize calorie burn',
      'Add daily activity like taking stairs or short walks throughout the day'
    ],
    'Obese': [
      'Start with gentle movement like walking or water exercises',
      'Focus on consistency with 20-30 minute sessions, gradually increasing duration',
      'Incorporate strength exercises with bodyweight or light resistance',
      'Consider working with a fitness professional for proper form and guidance',
      'Aim for increased daily activity through small, sustainable changes'
    ]
  };
  
  return plans[bmi.category] || plans['Healthy'];
};

export const generateDietPlan = (metrics: HealthMetrics, bmi: BMIResult, calorieNeeds: number): string[] => {
  let calorieAdjustment = 0;
  
  if (bmi.category === 'Underweight') {
    calorieAdjustment = 300; // Surplus for weight gain
  } else if (bmi.category === 'Overweight' || bmi.category === 'Obese') {
    calorieAdjustment = -500; // Deficit for weight loss
  }
  
  const adjustedCalories = calorieNeeds + calorieAdjustment;
  
  const plans = {
    'Underweight': [
      `Consume approximately ${adjustedCalories} calories daily for healthy weight gain`,
      'Focus on nutrient-dense foods with healthy fats like avocados, nuts, and olive oil',
      'Include protein with each meal (eggs, lean meat, dairy, legumes)',
      'Add healthy carbohydrates like whole grains, fruits, and starchy vegetables',
      'Consider small, frequent meals if you struggle with large portions'
    ],
    'Healthy': [
      `Maintain your balanced diet with approximately ${adjustedCalories} calories daily`,
      'Focus on whole foods with a colorful variety of fruits and vegetables',
      'Include lean proteins, whole grains, and healthy fats in balanced proportions',
      'Stay hydrated with at least 8 glasses of water daily',
      'Practice mindful eating and portion control'
    ],
    'Overweight': [
      `Aim for approximately ${adjustedCalories} calories daily for gradual weight loss`,
      'Emphasize vegetables, fruits, lean proteins, and whole grains',
      'Limit processed foods, added sugars, and refined carbohydrates',
      'Practice portion control using smaller plates and mindful eating techniques',
      'Stay well hydrated and consider drinking water before meals'
    ],
    'Obese': [
      `Target approximately ${adjustedCalories} calories daily for sustainable weight loss`,
      'Focus on high-volume, low-calorie foods like vegetables and clear soups',
      'Choose lean proteins and high-fiber foods to increase satiety',
      'Consider keeping a food journal to increase awareness of eating habits',
      'Work on establishing consistent meal times and eliminating mindless snacking'
    ]
  };
  
  return plans[bmi.category] || plans['Healthy'];
};
