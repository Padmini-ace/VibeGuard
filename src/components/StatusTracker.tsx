import { useState } from 'react';
import { Search, Clock, CheckCircle2, AlertCircle, ArrowUpCircle, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Status = 'pending' | 'in-progress' | 'resolved' | 'escalated';

interface GrievanceStatus {
  ticketId: string;
  status: Status;
  title: string;
  department: string;
  category: string;
  submittedAt: string;
  lastUpdated: string;
  urgencyLevel: string;
  timeline: {
    date: string;
    status: Status;
    message: string;
    by: string;
  }[];
  response?: string;
}

// Mock data for demo
const MOCK_GRIEVANCES: Record<string, GrievanceStatus> = {
  'VG-ABC123': {
    ticketId: 'VG-ABC123',
    status: 'in-progress',
    title: 'Large pothole on Main Road near bus stop',
    department: 'Public Works & Infrastructure',
    category: 'infrastructure',
    submittedAt: '2024-01-15T10:30:00',
    lastUpdated: '2024-01-17T14:20:00',
    urgencyLevel: 'high',
    timeline: [
      {
        date: '2024-01-17T14:20:00',
        status: 'in-progress',
        message: 'Repair crew has been dispatched. Work expected to complete within 48 hours.',
        by: 'PWD Officer - Ram Kumar',
      },
      {
        date: '2024-01-16T09:00:00',
        status: 'in-progress',
        message: 'Site inspection completed. Pothole confirmed to be 2ft wide. Prioritized for repair.',
        by: 'Field Inspector - Suresh M.',
      },
      {
        date: '2024-01-15T10:30:00',
        status: 'pending',
        message: 'Grievance registered and forwarded to Public Works Department.',
        by: 'VibeGuard AI System',
      },
    ],
    response: 'We have assessed the situation and a repair team will fix the pothole within 48 hours. Thank you for reporting this issue.',
  },
  'VG-XYZ789': {
    ticketId: 'VG-XYZ789',
    status: 'resolved',
    title: 'Water supply disruption in Sector 5',
    department: 'Public Works & Infrastructure',
    category: 'infrastructure',
    submittedAt: '2024-01-10T08:00:00',
    lastUpdated: '2024-01-14T16:00:00',
    urgencyLevel: 'critical',
    timeline: [
      {
        date: '2024-01-14T16:00:00',
        status: 'resolved',
        message: 'Water supply restored. Pipeline repaired successfully. Issue resolved.',
        by: 'PWD Chief Engineer',
      },
      {
        date: '2024-01-12T10:00:00',
        status: 'in-progress',
        message: 'Emergency repair work started. Temporary water tankers arranged for residents.',
        by: 'PWD Officer - Anil K.',
      },
      {
        date: '2024-01-10T08:00:00',
        status: 'pending',
        message: 'CRITICAL: Grievance escalated immediately due to health impact.',
        by: 'VibeGuard AI System',
      },
    ],
    response: 'The pipeline has been repaired and water supply is fully restored. We apologize for the inconvenience.',
  },
};

const StatusTracker = () => {
  const [ticketId, setTicketId] = useState('');
  const [grievance, setGrievance] = useState<GrievanceStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!ticketId.trim()) {
      toast({
        title: "Enter Ticket ID",
        description: "Please enter your grievance ticket ID to track status.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setNotFound(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const normalizedId = ticketId.toUpperCase().trim();
    const found = MOCK_GRIEVANCES[normalizedId];
    
    if (found) {
      setGrievance(found);
    } else {
      setNotFound(true);
      setGrievance(null);
    }
    
    setIsSearching(false);
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in-progress': return ArrowUpCircle;
      case 'resolved': return CheckCircle2;
      case 'escalated': return AlertCircle;
    }
  };

  const getStatusBadgeVariant = (status: Status) => {
    switch (status) {
      case 'pending': return 'statusPending' as const;
      case 'in-progress': return 'statusInProgress' as const;
      case 'resolved': return 'statusResolved' as const;
      case 'escalated': return 'statusEscalated' as const;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Box */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Track Your Grievance</CardTitle>
          <CardDescription>
            Enter your ticket ID to check the current status and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter Ticket ID (e.g., VG-ABC123)"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="font-mono uppercase"
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>
          </div>
          
          {/* Demo Note */}
          <p className="mt-3 text-xs text-muted-foreground">
            Try: <button onClick={() => { setTicketId('VG-ABC123'); }} className="text-accent hover:underline">VG-ABC123</button> or <button onClick={() => { setTicketId('VG-XYZ789'); }} className="text-accent hover:underline">VG-XYZ789</button> (demo tickets)
          </p>
        </CardContent>
      </Card>

      {/* Not Found */}
      {notFound && (
        <Card className="animate-fade-in">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ticket Not Found</h3>
            <p className="text-muted-foreground">
              No grievance found with ID "{ticketId}". Please check the ticket ID and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Status Result */}
      {grievance && (
        <div className="space-y-6 animate-fade-in">
          {/* Status Overview */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-mono">{grievance.ticketId}</p>
                  <CardTitle className="text-lg mt-1">{grievance.title}</CardTitle>
                </div>
                <Badge variant={getStatusBadgeVariant(grievance.status)} className="capitalize shrink-0">
                  {grievance.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
                  <p className="text-sm font-medium mt-1">{grievance.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Urgency</p>
                  <p className="text-sm font-medium mt-1 capitalize">{grievance.urgencyLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Submitted</p>
                  <p className="text-sm font-medium mt-1">{formatDate(grievance.submittedAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Last Updated</p>
                  <p className="text-sm font-medium mt-1">{formatDate(grievance.lastUpdated)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Official Response */}
          {grievance.response && (
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  Official Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{grievance.response}</p>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Status Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                
                {grievance.timeline.map((event, index) => {
                  const StatusIcon = getStatusIcon(event.status);
                  return (
                    <div key={index} className="relative flex gap-4 pl-2">
                      {/* Icon */}
                      <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full ${
                        event.status === 'resolved' ? 'bg-status-resolved text-primary-foreground' :
                        event.status === 'in-progress' ? 'bg-status-in-progress text-primary-foreground' :
                        event.status === 'escalated' ? 'bg-status-escalated text-primary-foreground' :
                        'bg-status-pending text-primary-foreground'
                      }`}>
                        <StatusIcon className="h-3 w-3" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                        <p className="text-sm font-medium mt-1">{event.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">— {event.by}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StatusTracker;
