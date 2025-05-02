
import { useState } from 'react';
import { HealthMetrics, BMIResult, calculateBMI, calculateCalorieNeeds, generateFitnessPlan, generateDietPlan } from '@/lib/healthUtils';
import HealthMetricsForm from '@/components/HealthMetricsForm';
import BMICalculator from '@/components/BMICalculator';
import FitnessPlanCard from '@/components/FitnessPlanCard';
import DietPlanCard from '@/components/DietPlanCard';
import { Heart, Calendar } from 'lucide-react';

const Index = () => {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [bmi, setBMI] = useState<BMIResult | null>(null);
  const [calorieNeeds, setCalorieNeeds] = useState(0);
  const [fitnessPlan, setFitnessPlan] = useState<string[]>([]);
  const [dietPlan, setDietPlan] = useState<string[]>([]);
  
  const handleMetricsSubmit = (newMetrics: HealthMetrics) => {
    setMetrics(newMetrics);
    
    const calculatedBMI = calculateBMI(newMetrics.weight, newMetrics.height);
    setBMI(calculatedBMI);
    
    const calories = calculateCalorieNeeds(newMetrics);
    setCalorieNeeds(calories);
    
    const fitness = generateFitnessPlan(newMetrics, calculatedBMI);
    setFitnessPlan(fitness);
    
    const diet = generateDietPlan(newMetrics, calculatedBMI, calories);
    setDietPlan(diet);
  };
  
  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="health-gradient text-white py-10 px-4 shadow-lg">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center mb-3">
            <Heart className="h-8 w-8 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">Health Pathway Advisor</h1>
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            Enter your health metrics to receive personalized fitness and diet plans tailored to your needs.
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 -mt-6">
        <div className="grid gap-6">
          {/* Health Metrics Form */}
          <HealthMetricsForm onSubmit={handleMetricsSubmit} />
          
          {/* Results Section */}
          {metrics && metrics.weight > 0 && metrics.height > 0 && (
            <div className="grid gap-6 animate-fade-in">
              {/* BMI and Calorie Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BMICalculator weight={metrics.weight} height={metrics.height} />
                
                <div className="bg-white rounded-lg shadow overflow-hidden border border-border">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Daily Calorie Needs
                    </h3>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-4xl font-bold mb-2">{calorieNeeds} kcal</div>
                    <div className="text-sm text-muted-foreground">
                      Based on your metrics and activity level
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Plans Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FitnessPlanCard plan={fitnessPlan} />
                <DietPlanCard plan={dietPlan} />
              </div>
            </div>
          )}
          
          {/* Information Section */}
          <div className="bg-accent/50 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-3">Why Health Tracking Matters</h2>
            <p className="text-muted-foreground mb-4">
              Monitoring your health metrics and following personalized fitness and diet plans can lead to significant improvements in your overall wellbeing, energy levels, and long-term health outcomes.
            </p>
            <p className="text-sm text-muted-foreground">
              Note: The recommendations provided are general guidelines. Please consult with healthcare professionals before making significant changes to your diet or exercise routines.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
