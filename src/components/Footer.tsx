import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero shadow-md">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">VibeGuard</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Public Grievance Portal</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered grievance redressal for transparent, efficient, and accountable public service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Submit Grievance
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Track Status
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Departments</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Public Works & Infrastructure</li>
              <li className="text-sm text-muted-foreground">Health & Medical Services</li>
              <li className="text-sm text-muted-foreground">Education & Youth Affairs</li>
              <li className="text-sm text-muted-foreground">Environment & Sustainability</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:1800123456" className="hover:text-foreground transition-colors">
                  1800-123-456 (Toll Free)
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@vibeguard.gov" className="hover:text-foreground transition-colors">
                  support@vibeguard.gov
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Government Secretariat,<br />State Capital</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 VibeGuard by Team CTRL//CHAOS. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Problem Statement 12 | Hackathon 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
