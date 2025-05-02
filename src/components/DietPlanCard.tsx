
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';

interface DietPlanCardProps {
  plan: string[];
  className?: string;
}

const DietPlanCard = ({ plan, className }: DietPlanCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-bold">Your Diet Plan</CardTitle>
        <Utensils className="h-5 w-5 text-health-primary" />
      </CardHeader>
      <CardContent>
        {plan.length > 0 ? (
          <ul className="space-y-2">
            {plan.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-health-light text-health-dark font-medium flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Complete your health metrics to receive a personalized diet plan
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DietPlanCard;
