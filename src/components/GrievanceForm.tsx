import { useState } from 'react';
import { Send, Loader2, Brain, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categorizeGrievance, type CategorizationResult, type UrgencyLevel, type Category } from '@/lib/aiCategorization';
import { useToast } from '@/hooks/use-toast';

interface GrievanceFormProps {
  onSubmit?: (data: FormData & { categorization: CategorizationResult }) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  description: string;
  location: string;
}

const GrievanceForm = ({ onSubmit }: GrievanceFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    description: '',
    location: '',
  });
  const [categorization, setCategorization] = useState<CategorizationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleDescriptionChange = async (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
    
    // Only analyze if description is substantial
    if (value.length > 30) {
      setIsAnalyzing(true);
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = categorizeGrievance(value);
      setCategorization(result);
      setIsAnalyzing(false);
    } else {
      setCategorization(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || formData.description.length < 30) {
      toast({
        title: "Description too short",
        description: "Please provide more details about your grievance.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const ticketId = `VG-${Date.now().toString(36).toUpperCase()}`;
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast({
      title: "Grievance Submitted Successfully!",
      description: `Your ticket ID is ${ticketId}. Save this for tracking.`,
    });

    if (onSubmit && categorization) {
      onSubmit({ ...formData, categorization });
    }
  };

  const getUrgencyBadgeVariant = (level: UrgencyLevel) => {
    const variants = {
      low: 'urgencyLow' as const,
      medium: 'urgencyMedium' as const,
      high: 'urgencyHigh' as const,
      critical: 'urgencyCritical' as const,
    };
    return variants[level];
  };

  const getCategoryBadgeVariant = (category: Category) => {
    const variants = {
      infrastructure: 'categoryInfrastructure' as const,
      health: 'categoryHealth' as const,
      education: 'categoryEducation' as const,
      finance: 'categoryFinance' as const,
      environment: 'categoryEnvironment' as const,
      law: 'categoryLaw' as const,
      social: 'categorySocial' as const,
      other: 'categoryOther' as const,
    };
    return variants[category];
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto animate-scale-in">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-16 h-16 rounded-full bg-urgency-low/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-urgency-low" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Grievance Submitted!</h3>
          <p className="text-muted-foreground mb-6">
            Your complaint has been registered and routed to the appropriate department.
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Your Ticket ID</p>
            <p className="text-2xl font-mono font-bold text-foreground">VG-{Date.now().toString(36).toUpperCase()}</p>
          </div>
          <Button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', description: '', location: '' }); setCategorization(null); }}>
            Submit Another Grievance
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-5">
      {/* Form */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl">Describe Your Grievance</CardTitle>
          <CardDescription>
            Write your complaint in plain language. Our AI will categorize and prioritize it automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location / Address</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Street, Area, City"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                Grievance Description
                {isAnalyzing && (
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Analyzing...
                  </span>
                )}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Describe your issue in detail. For example: 'There's a large pothole on Main Road near the bus stop that has been there for 3 months. Several accidents have happened due to this...'"
                className="min-h-[160px] resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/500 characters (minimum 30 required)
              </p>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting || formData.description.length < 30}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Grievance
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Analysis Panel */}
      <Card className="lg:col-span-2 h-fit sticky top-24">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            AI Analysis
          </CardTitle>
          <CardDescription>
            Real-time categorization of your grievance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categorization ? (
            <div className="space-y-6 animate-fade-in">
              {/* Department */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Assigned Department</p>
                <Badge variant={getCategoryBadgeVariant(categorization.category)} className="text-sm">
                  {categorization.department}
                </Badge>
              </div>

              {/* Urgency */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Urgency Level</p>
                <div className="flex items-center gap-3">
                  <Badge variant={getUrgencyBadgeVariant(categorization.urgencyLevel)} className="text-sm capitalize">
                    {categorization.urgencyLevel}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Score: {categorization.urgencyScore}/10
                  </span>
                </div>
                {/* Urgency Bar */}
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      categorization.urgencyLevel === 'critical' ? 'bg-urgency-critical' :
                      categorization.urgencyLevel === 'high' ? 'bg-urgency-high' :
                      categorization.urgencyLevel === 'medium' ? 'bg-urgency-medium' :
                      'bg-urgency-low'
                    }`}
                    style={{ width: `${categorization.urgencyScore * 10}%` }}
                  />
                </div>
              </div>

              {/* Keywords */}
              {categorization.keywords.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Detected Keywords</p>
                  <div className="flex flex-wrap gap-1">
                    {categorization.keywords.slice(0, 5).map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${categorization.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{Math.round(categorization.confidence * 100)}%</span>
                </div>
              </div>

              {/* Reasoning */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">{categorization.reasoning}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Start typing your grievance to see AI analysis in real-time
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrievanceForm;
