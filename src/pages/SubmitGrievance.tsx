import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrievanceForm from '@/components/GrievanceForm';

const SubmitGrievance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Submit Your Grievance
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Describe your issue in plain language. Our AI will analyze, categorize, and route your complaint to the right department.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <GrievanceForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitGrievance;
