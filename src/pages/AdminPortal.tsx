import { useState } from 'react';
import { Lock, LogIn, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in production, this would be a proper auth system
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Portal",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try admin / admin123 for demo.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Admin Portal
              </h1>
            </div>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {isAuthenticated 
                ? "Manage grievances, track resolution progress, and respond to citizens."
                : "Secure access for authorized government officials only."
              }
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            {!isAuthenticated ? (
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Admin Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Enter username"
                        value={credentials.username}
                        onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <span className="animate-pulse">Authenticating...</span>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          Login
                        </>
                      )}
                    </Button>
                  </form>
                  
                  {/* Demo Hint */}
                  <div className="mt-6 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      <strong>Demo Credentials:</strong><br />
                      Username: admin | Password: admin123
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <AdminDashboard />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPortal;
