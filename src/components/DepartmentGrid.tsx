import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Coins, 
  Leaf, 
  Scale, 
  Heart,
  HelpCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DepartmentGrid = () => {
  const departments = [
    {
      icon: Building2,
      name: 'Public Works & Infrastructure',
      description: 'Roads, bridges, electricity, water supply, drainage',
      category: 'infrastructure' as const,
      activeComplaints: 234,
    },
    {
      icon: Stethoscope,
      name: 'Health & Medical Services',
      description: 'Hospitals, clinics, medical supplies, healthcare',
      category: 'health' as const,
      activeComplaints: 156,
    },
    {
      icon: GraduationCap,
      name: 'Education & Youth Affairs',
      description: 'Schools, colleges, scholarships, admissions',
      category: 'education' as const,
      activeComplaints: 89,
    },
    {
      icon: Coins,
      name: 'Finance & Revenue',
      description: 'Taxes, pensions, subsidies, loans, payments',
      category: 'finance' as const,
      activeComplaints: 178,
    },
    {
      icon: Leaf,
      name: 'Environment & Sustainability',
      description: 'Pollution, waste management, parks, green initiatives',
      category: 'environment' as const,
      activeComplaints: 67,
    },
    {
      icon: Scale,
      name: 'Law & Order',
      description: 'Safety, security, crime reports, legal matters',
      category: 'law' as const,
      activeComplaints: 145,
    },
    {
      icon: Heart,
      name: 'Social Welfare',
      description: 'Housing, employment, welfare schemes, community',
      category: 'social' as const,
      activeComplaints: 112,
    },
    {
      icon: HelpCircle,
      name: 'General Administration',
      description: 'Other queries and miscellaneous issues',
      category: 'other' as const,
      activeComplaints: 45,
    },
  ];

  const categoryBadgeVariants = {
    infrastructure: 'categoryInfrastructure',
    health: 'categoryHealth',
    education: 'categoryEducation',
    finance: 'categoryFinance',
    environment: 'categoryEnvironment',
    law: 'categoryLaw',
    social: 'categorySocial',
    other: 'categoryOther',
  } as const;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Departments</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Connected to All Government Bodies
          </h2>
          <p className="text-muted-foreground">
            Your complaint is automatically routed to the appropriate department based on AI analysis.
          </p>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="group p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted text-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <dept.icon className="h-6 w-6" />
                </div>
                <Badge variant={categoryBadgeVariants[dept.category]} className="text-[10px]">
                  {dept.activeComplaints} active
                </Badge>
              </div>
              
              {/* Content */}
              <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
                {dept.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentGrid;
