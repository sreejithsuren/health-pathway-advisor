
import { useEffect, useState } from 'react';
import { calculateBMI } from '@/lib/healthUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BMICalculatorProps {
  weight: number;
  height: number;
  className?: string;
}

const BMICalculator = ({ weight, height, className }: BMICalculatorProps) => {
  const [bmi, setBMI] = useState({ value: 0, category: '', colorClass: '' });

  useEffect(() => {
    if (weight > 0 && height > 0) {
      setBMI(calculateBMI(weight, height));
    }
  }, [weight, height]);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        {(weight > 0 && height > 0) ? (
          <div className="text-center animate-fade-in">
            <div className="text-4xl font-bold mb-2">{bmi.value.toFixed(1)}</div>
            <div className={`text-xl ${bmi.colorClass} font-semibold`}>{bmi.category}</div>
            <div className="mt-4 text-sm text-muted-foreground">
              BMI = weight(kg) / (height(m))²
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Enter your weight and height to calculate BMI
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
