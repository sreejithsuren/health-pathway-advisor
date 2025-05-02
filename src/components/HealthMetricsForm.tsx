
import { useState } from 'react';
import { HealthMetrics } from '@/lib/healthUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Weight, Height } from 'lucide-react';
import { toast } from 'sonner';

interface HealthMetricsFormProps {
  onSubmit: (metrics: HealthMetrics) => void;
}

const HealthMetricsForm = ({ onSubmit }: HealthMetricsFormProps) => {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    weight: 0,
    height: 0,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate'
  });

  const handleChange = (field: keyof HealthMetrics, value: any) => {
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (metrics.weight <= 0 || metrics.height <= 0 || metrics.age <= 0) {
      toast.error('Please enter valid values for all fields');
      return;
    }
    
    onSubmit(metrics);
    toast.success('Health metrics updated!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Weight className="h-4 w-4" />
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                min="10"
                max="300"
                step="0.1"
                placeholder="Enter your weight in kg"
                value={metrics.weight || ''}
                onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                className="focus:ring-health-primary focus:border-health-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2">
                <Height className="h-4 w-4" />
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                min="50"
                max="250"
                placeholder="Enter your height in cm"
                value={metrics.height || ''}
                onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                className="focus:ring-health-primary focus:border-health-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="Enter your age"
                value={metrics.age || ''}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={metrics.gender} 
                onValueChange={(value: 'male' | 'female') => handleChange('gender', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select 
                value={metrics.activityLevel} 
                onValueChange={(value: any) => handleChange('activityLevel', value)}
              >
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (physical job or 2x daily training)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-health-primary hover:bg-health-secondary"
          >
            Calculate My Health Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsForm;
