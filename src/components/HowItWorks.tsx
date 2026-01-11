import { MessageSquare, Brain, Send, Clock } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      step: '01',
      title: 'Describe Your Issue',
      description: 'Write your complaint in plain, natural language. No forms to fill, no categories to choose.',
    },
    {
      icon: Brain,
      step: '02',
      title: 'AI Analysis',
      description: 'Our NLP engine automatically detects the category, department, and urgency level.',
    },
    {
      icon: Send,
      step: '03',
      title: 'Auto-Routing',
      description: 'Your grievance is instantly forwarded to the relevant government department.',
    },
    {
      icon: Clock,
      step: '04',
      title: 'Track & Resolve',
      description: 'Monitor real-time status updates until your issue is fully resolved.',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Simple, Transparent, Effective
          </h2>
          <p className="text-muted-foreground">
            From submission to resolution, every step is designed for citizen convenience and government accountability.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50">
                {/* Step Number */}
                <div className="absolute -top-4 -left-2 text-6xl font-bold text-muted/50 select-none">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="h-7 w-7" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
