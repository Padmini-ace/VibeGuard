import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpCircle,
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Status = 'pending' | 'in-progress' | 'resolved' | 'escalated';
type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
type Category = 'infrastructure' | 'health' | 'education' | 'finance' | 'environment' | 'law' | 'social' | 'other';

interface Grievance {
  id: string;
  ticketId: string;
  title: string;
  citizen: string;
  department: string;
  category: Category;
  status: Status;
  urgency: UrgencyLevel;
  submittedAt: string;
  lastUpdated: string;
}

// Mock data
const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: '1',
    ticketId: 'VG-K8M2XP',
    title: 'Broken street light on MG Road causing safety issues',
    citizen: 'Rahul Sharma',
    department: 'Public Works & Infrastructure',
    category: 'infrastructure',
    status: 'pending',
    urgency: 'high',
    submittedAt: '2024-01-18T09:30:00',
    lastUpdated: '2024-01-18T09:30:00',
  },
  {
    id: '2',
    ticketId: 'VG-P9N4QR',
    title: 'Hospital refusing emergency treatment without deposit',
    citizen: 'Priya Patel',
    department: 'Health & Medical Services',
    category: 'health',
    status: 'escalated',
    urgency: 'critical',
    submittedAt: '2024-01-18T08:15:00',
    lastUpdated: '2024-01-18T10:00:00',
  },
  {
    id: '3',
    ticketId: 'VG-L3K7WS',
    title: 'Pending scholarship disbursement for 6 months',
    citizen: 'Amit Kumar',
    department: 'Education & Youth Affairs',
    category: 'education',
    status: 'in-progress',
    urgency: 'medium',
    submittedAt: '2024-01-17T14:20:00',
    lastUpdated: '2024-01-18T11:30:00',
  },
  {
    id: '4',
    ticketId: 'VG-M5X2YZ',
    title: 'Illegal dumping in residential area - health hazard',
    citizen: 'Sunita Devi',
    department: 'Environment & Sustainability',
    category: 'environment',
    status: 'in-progress',
    urgency: 'high',
    submittedAt: '2024-01-17T10:45:00',
    lastUpdated: '2024-01-18T08:00:00',
  },
  {
    id: '5',
    ticketId: 'VG-R8T4UV',
    title: 'Pension not credited for 3 months',
    citizen: 'Ramesh Rao',
    department: 'Finance & Revenue',
    category: 'finance',
    status: 'resolved',
    urgency: 'medium',
    submittedAt: '2024-01-15T11:00:00',
    lastUpdated: '2024-01-18T09:00:00',
  },
  {
    id: '6',
    ticketId: 'VG-S2H6BC',
    title: 'Large pothole causing accidents on Highway 45',
    citizen: 'Vikram Singh',
    department: 'Public Works & Infrastructure',
    category: 'infrastructure',
    status: 'pending',
    urgency: 'critical',
    submittedAt: '2024-01-18T07:00:00',
    lastUpdated: '2024-01-18T07:00:00',
  },
];

const AdminDashboard = () => {
  const [grievances] = useState<Grievance[]>(MOCK_GRIEVANCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const stats = {
    total: grievances.length,
    pending: grievances.filter(g => g.status === 'pending').length,
    inProgress: grievances.filter(g => g.status === 'in-progress').length,
    resolved: grievances.filter(g => g.status === 'resolved').length,
    escalated: grievances.filter(g => g.status === 'escalated').length,
    critical: grievances.filter(g => g.urgency === 'critical').length,
  };

  const filteredGrievances = grievances.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         g.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         g.citizen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || g.urgency === urgencyFilter;
    const matchesCategory = categoryFilter === 'all' || g.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesUrgency && matchesCategory;
  });

  const getStatusBadgeVariant = (status: Status) => {
    switch (status) {
      case 'pending': return 'statusPending' as const;
      case 'in-progress': return 'statusInProgress' as const;
      case 'resolved': return 'statusResolved' as const;
      case 'escalated': return 'statusEscalated' as const;
    }
  };

  const getUrgencyBadgeVariant = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'low': return 'urgencyLow' as const;
      case 'medium': return 'urgencyMedium' as const;
      case 'high': return 'urgencyHigh' as const;
      case 'critical': return 'urgencyCritical' as const;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <FileText className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-pending/15">
                <Clock className="h-5 w-5 text-status-pending" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-in-progress/15">
                <ArrowUpCircle className="h-5 w-5 text-status-in-progress" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-resolved/15">
                <CheckCircle2 className="h-5 w-5 text-status-resolved" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.resolved}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-escalated/15">
                <AlertCircle className="h-5 w-5 text-status-escalated" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.escalated}</p>
                <p className="text-xs text-muted-foreground">Escalated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-urgency-critical/30 bg-urgency-critical/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-urgency-critical/15">
                <AlertTriangle className="h-5 w-5 text-urgency-critical" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.critical}</p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Grievance Management</CardTitle>
          <CardDescription>View and manage all citizen grievances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ticket ID, title, or citizen name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="law">Law & Order</SelectItem>
                  <SelectItem value="social">Social Welfare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Ticket ID</TableHead>
                  <TableHead>Grievance</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrievances.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No grievances found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGrievances.map((grievance) => (
                    <TableRow key={grievance.id} className="group">
                      <TableCell className="font-mono text-sm">{grievance.ticketId}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{grievance.title}</p>
                          <p className="text-xs text-muted-foreground">{grievance.department}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{grievance.citizen}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(grievance.status)} className="capitalize">
                          {grievance.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getUrgencyBadgeVariant(grievance.urgency)} className="capitalize">
                          {grievance.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(grievance.submittedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
