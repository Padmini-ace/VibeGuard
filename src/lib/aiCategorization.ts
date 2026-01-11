// VibeGuard AI Categorization Engine
// Logic-based NLP for category detection and urgency scoring

export type Category = 
  | 'infrastructure'
  | 'health'
  | 'education'
  | 'finance'
  | 'environment'
  | 'law'
  | 'social'
  | 'other';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface CategorizationResult {
  category: Category;
  urgencyScore: number; // 1-10
  urgencyLevel: UrgencyLevel;
  confidence: number; // 0-1
  keywords: string[];
  sentiment: 'negative' | 'neutral' | 'positive';
  department: string;
  reasoning: string;
}

// Department mapping
const DEPARTMENT_MAP: Record<Category, string> = {
  infrastructure: 'Public Works & Infrastructure',
  health: 'Health & Medical Services',
  education: 'Education & Youth Affairs',
  finance: 'Finance & Revenue',
  environment: 'Environment & Sustainability',
  law: 'Law & Order',
  social: 'Social Welfare',
  other: 'General Administration',
};

// Keyword patterns for categorization
const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  infrastructure: [
    'road', 'pothole', 'bridge', 'electricity', 'power cut', 'water supply', 
    'drainage', 'sewage', 'construction', 'building', 'street light', 'pavement',
    'traffic', 'signal', 'highway', 'metro', 'public transport', 'bus stop',
    'footpath', 'flyover', 'repair', 'maintenance', 'broken', 'damaged'
  ],
  health: [
    'hospital', 'doctor', 'medicine', 'ambulance', 'emergency', 'clinic',
    'disease', 'epidemic', 'vaccination', 'health center', 'medical', 'patient',
    'treatment', 'healthcare', 'pharmacy', 'sanitation', 'hygiene', 'illness',
    'injury', 'sick', 'covid', 'fever', 'infection'
  ],
  education: [
    'school', 'college', 'university', 'teacher', 'student', 'education',
    'admission', 'scholarship', 'exam', 'library', 'tuition', 'fees',
    'curriculum', 'classroom', 'hostel', 'degree', 'certificate', 'training'
  ],
  finance: [
    'tax', 'pension', 'salary', 'payment', 'refund', 'subsidy', 'loan',
    'bank', 'insurance', 'compensation', 'dues', 'arrears', 'bill',
    'revenue', 'budget', 'money', 'fund', 'grant', 'financial'
  ],
  environment: [
    'pollution', 'garbage', 'waste', 'tree', 'park', 'green', 'noise',
    'air quality', 'water pollution', 'deforestation', 'illegal dumping',
    'smoke', 'factory', 'chemical', 'wildlife', 'climate', 'plastic'
  ],
  law: [
    'crime', 'theft', 'police', 'violence', 'harassment', 'fraud', 'scam',
    'illegal', 'corruption', 'bribery', 'safety', 'security', 'assault',
    'robbery', 'threatening', 'cybercrime', 'murder', 'kidnap', 'extortion'
  ],
  social: [
    'ration', 'housing', 'shelter', 'poverty', 'employment', 'welfare',
    'disability', 'elderly', 'child', 'women', 'discrimination', 'rights',
    'community', 'neighborhood', 'homeless', 'orphan', 'widow', 'minority'
  ],
  other: []
};

// Urgency indicators
const URGENCY_INDICATORS = {
  critical: [
    'dying', 'death', 'life threatening', 'emergency', 'urgent', 'immediately',
    'collapse', 'fire', 'accident', 'critical', 'danger', 'hazard', 'fatal'
  ],
  high: [
    'serious', 'severe', 'major', 'important', 'asap', 'quickly', 'soon',
    'broken', 'blocked', 'flooding', 'outbreak', 'attack', 'crime'
  ],
  medium: [
    'problem', 'issue', 'concern', 'complaint', 'delay', 'pending',
    'waiting', 'need', 'require', 'request'
  ],
  low: [
    'suggestion', 'feedback', 'improve', 'consider', 'maybe', 'would be nice',
    'minor', 'small', 'general', 'inquiry'
  ]
};

// Sentiment words
const SENTIMENT_WORDS = {
  negative: [
    'worst', 'terrible', 'horrible', 'awful', 'disgusting', 'pathetic',
    'useless', 'incompetent', 'failed', 'never', 'nothing', 'frustrated',
    'angry', 'disappointed', 'suffering', 'neglected', 'ignored', 'corrupt'
  ],
  positive: [
    'good', 'great', 'excellent', 'thank', 'appreciate', 'helpful',
    'satisfied', 'resolved', 'working', 'improved', 'better'
  ]
};

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findMatchingKeywords(text: string, keywords: string[]): string[] {
  const normalized = normalizeText(text);
  return keywords.filter(keyword => 
    normalized.includes(keyword.toLowerCase())
  );
}

function detectCategory(text: string): { category: Category; keywords: string[]; confidence: number } {
  const normalizedText = normalizeText(text);
  let bestCategory: Category = 'other';
  let bestScore = 0;
  let matchedKeywords: string[] = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === 'other') continue;
    
    const matches = findMatchingKeywords(text, keywords);
    const score = matches.length;
    
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category as Category;
      matchedKeywords = matches;
    }
  }

  const confidence = Math.min(bestScore / 3, 1); // Max confidence at 3+ keyword matches
  return { category: bestCategory, keywords: matchedKeywords, confidence };
}

function calculateUrgencyScore(text: string): { score: number; level: UrgencyLevel } {
  const normalizedText = normalizeText(text);
  
  // Check for critical indicators first
  const criticalMatches = findMatchingKeywords(text, URGENCY_INDICATORS.critical);
  if (criticalMatches.length > 0) {
    return { score: 9 + Math.min(criticalMatches.length * 0.5, 1), level: 'critical' };
  }
  
  const highMatches = findMatchingKeywords(text, URGENCY_INDICATORS.high);
  if (highMatches.length > 0) {
    return { score: 7 + Math.min(highMatches.length * 0.5, 1.5), level: 'high' };
  }
  
  const mediumMatches = findMatchingKeywords(text, URGENCY_INDICATORS.medium);
  if (mediumMatches.length > 0) {
    return { score: 4 + Math.min(mediumMatches.length * 0.5, 2), level: 'medium' };
  }
  
  const lowMatches = findMatchingKeywords(text, URGENCY_INDICATORS.low);
  if (lowMatches.length > 0) {
    return { score: 2 + Math.min(lowMatches.length * 0.5, 1), level: 'low' };
  }
  
  // Default to medium if no clear indicators
  return { score: 5, level: 'medium' };
}

function analyzeSentiment(text: string): 'negative' | 'neutral' | 'positive' {
  const negativeMatches = findMatchingKeywords(text, SENTIMENT_WORDS.negative).length;
  const positiveMatches = findMatchingKeywords(text, SENTIMENT_WORDS.positive).length;
  
  if (negativeMatches > positiveMatches && negativeMatches > 0) {
    return 'negative';
  }
  if (positiveMatches > negativeMatches && positiveMatches > 0) {
    return 'positive';
  }
  return 'neutral';
}

function generateReasoning(result: Omit<CategorizationResult, 'reasoning'>): string {
  const parts: string[] = [];
  
  parts.push(`Detected category: ${DEPARTMENT_MAP[result.category]}`);
  
  if (result.keywords.length > 0) {
    parts.push(`Key indicators: ${result.keywords.slice(0, 3).join(', ')}`);
  }
  
  parts.push(`Urgency assessment: ${result.urgencyLevel.toUpperCase()} (score: ${result.urgencyScore.toFixed(1)}/10)`);
  
  if (result.sentiment === 'negative') {
    parts.push('Citizen sentiment indicates frustration - prioritize response');
  }
  
  return parts.join('. ') + '.';
}

export function categorizeGrievance(text: string): CategorizationResult {
  const { category, keywords, confidence } = detectCategory(text);
  const { score, level } = calculateUrgencyScore(text);
  const sentiment = analyzeSentiment(text);
  
  // Boost urgency if sentiment is very negative
  const adjustedScore = sentiment === 'negative' ? Math.min(score + 1, 10) : score;
  const adjustedLevel: UrgencyLevel = adjustedScore >= 9 ? 'critical' : adjustedScore >= 7 ? 'high' : adjustedScore >= 4 ? 'medium' : 'low';
  
  const baseResult: Omit<CategorizationResult, 'reasoning'> = {
    category,
    urgencyScore: Math.round(adjustedScore * 10) / 10,
    urgencyLevel: adjustedLevel,
    confidence,
    keywords,
    sentiment,
    department: DEPARTMENT_MAP[category],
  };
  
  return {
    ...baseResult,
    reasoning: generateReasoning(baseResult),
  };
}

export function getUrgencyColor(level: UrgencyLevel): string {
  switch (level) {
    case 'low': return 'urgency-low';
    case 'medium': return 'urgency-medium';
    case 'high': return 'urgency-high';
    case 'critical': return 'urgency-critical';
  }
}

export function getCategoryColor(category: Category): string {
  return `category-${category}`;
}
