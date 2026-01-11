import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusTracker from '@/components/StatusTracker';

const TrackStatus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Track Your Grievance
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Enter your ticket ID to view real-time status updates and official responses.
            </p>
          </div>
        </section>

        {/* Tracker Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <StatusTracker />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrackStatus;
