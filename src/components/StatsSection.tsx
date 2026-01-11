import { FileCheck, Clock, Users, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: FileCheck,
      value: '15,234',
      label: 'Grievances Resolved',
      description: 'Successfully addressed complaints',
    },
    {
      icon: Clock,
      value: '48hrs',
      label: 'Avg. Response Time',
      description: 'From submission to first response',
    },
    {
      icon: Users,
      value: '50,000+',
      label: 'Citizens Served',
      description: 'Active users on the platform',
    },
    {
      icon: TrendingUp,
      value: '94%',
      label: 'Satisfaction Rate',
      description: 'Positive citizen feedback',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4 mx-auto">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
