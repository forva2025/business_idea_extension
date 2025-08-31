// Define BusinessAnalysisEngine directly to avoid importScripts issues
let BusinessAnalysisEngine;

// Check if already defined to prevent duplicate declaration
if (typeof self.BusinessAnalysisEngine === 'undefined') {
  console.log('Defining BusinessAnalysisEngine class');
  
  // Define the class directly in the background script with full functionality
  BusinessAnalysisEngine = class BusinessAnalysisEngine {
    constructor() {
      this.industryKeywords = {
        'ecommerce': ['shop', 'store', 'buy', 'cart', 'checkout', 'product', 'inventory', 'marketplace', 'retail'],
        'saas': ['software', 'platform', 'api', 'dashboard', 'subscription', 'cloud', 'tool', 'app', 'system'],
        'content': ['blog', 'article', 'news', 'media', 'content', 'publishing', 'video', 'podcast', 'newsletter'],
        'education': ['course', 'learn', 'training', 'education', 'tutorial', 'certification', 'workshop', 'coaching'],
        'healthcare': ['health', 'medical', 'doctor', 'patient', 'clinic', 'treatment', 'wellness', 'fitness', 'nutrition'],
        'finance': ['bank', 'loan', 'investment', 'finance', 'money', 'payment', 'crypto', 'budget', 'savings'],
        'real_estate': ['property', 'house', 'rent', 'lease', 'real estate', 'mortgage', 'apartment', 'commercial'],
        'travel': ['hotel', 'flight', 'travel', 'booking', 'vacation', 'tourism', 'accommodation', 'experience'],
        'food': ['restaurant', 'food', 'delivery', 'menu', 'recipe', 'cooking', 'meal', 'dining', 'catering'],
        'fitness': ['gym', 'fitness', 'workout', 'health', 'exercise', 'nutrition', 'training', 'wellness'],
        'technology': ['ai', 'automation', 'digital', 'tech', 'software', 'hardware', 'iot', 'blockchain'],
        'marketing': ['advertising', 'seo', 'social', 'branding', 'promotion', 'campaign', 'analytics'],
        'consulting': ['consultant', 'advisor', 'expert', 'specialist', 'coach', 'mentor', 'strategist'],
        'creative': ['design', 'art', 'creative', 'graphic', 'video', 'photography', 'animation'],
        'logistics': ['shipping', 'delivery', 'warehouse', 'supply', 'inventory', 'fulfillment'],
        'entertainment': ['gaming', 'music', 'streaming', 'entertainment', 'leisure', 'hobby'],
        'professional': ['legal', 'accounting', 'hr', 'recruitment', 'b2b', 'enterprise'],
        'lifestyle': ['personal', 'lifestyle', 'wellness', 'mindfulness', 'productivity', 'organization'],
        'community': ['social', 'community', 'network', 'forum', 'group', 'membership'],
        'sustainability': ['green', 'eco', 'sustainable', 'environmental', 'renewable', 'organic']
      };
      
      this.businessModelTemplates = {
        'marketplace': {
          description: 'Connect buyers and sellers',
          revenueStreams: ['Commission fees', 'Listing fees', 'Premium memberships', 'Transaction fees'],
          examples: ['Etsy', 'Airbnb', 'Uber', 'Fiverr'],
          profitability: 'High',
          scalability: 'Very High'
        },
        'subscription': {
          description: 'Recurring revenue model',
          revenueStreams: ['Monthly subscriptions', 'Annual plans', 'Tiered pricing', 'Usage-based billing'],
          examples: ['Netflix', 'Spotify', 'Adobe Creative Cloud', 'Zoom'],
          profitability: 'Very High',
          scalability: 'Very High'
        },
        'freemium': {
          description: 'Free basic, paid premium',
          revenueStreams: ['Premium upgrades', 'Advanced features', 'Usage limits', 'White-label solutions'],
          examples: ['Slack', 'Dropbox', 'Canva', 'Notion'],
          profitability: 'High',
          scalability: 'Very High'
        },
        'advertising': {
          description: 'Revenue from ads',
          revenueStreams: ['Display ads', 'Sponsored content', 'Affiliate marketing', 'Native advertising'],
          examples: ['Google', 'Facebook', 'YouTube', 'TikTok'],
          profitability: 'Very High',
          scalability: 'Very High'
        },
        'commission': {
          description: 'Earn from transactions',
          revenueStreams: ['Percentage fees', 'Fixed fees', 'Tiered commissions', 'Performance bonuses'],
          examples: ['Amazon Associates', 'Booking.com', 'Shopify Partners'],
          profitability: 'High',
          scalability: 'High'
        },
        'licensing': {
          description: 'License intellectual property',
          revenueStreams: ['Software licenses', 'Content licensing', 'Patent licensing', 'Franchise fees'],
          examples: ['Microsoft', 'Disney', 'McDonald\'s'],
          profitability: 'Very High',
          scalability: 'Very High'
        },
        'data': {
          description: 'Monetize data insights',
          revenueStreams: ['Data analytics', 'Market research', 'Consumer insights', 'Predictive modeling'],
          examples: ['Nielsen', 'Experian', 'Palantir'],
          profitability: 'Very High',
          scalability: 'Very High'
        },
        'consulting': {
          description: 'Expert knowledge services',
          revenueStreams: ['Hourly rates', 'Project fees', 'Retainer agreements', 'Performance bonuses'],
          examples: ['McKinsey', 'BCG', 'Individual consultants'],
          profitability: 'High',
          scalability: 'Medium'
        },
        'productization': {
          description: 'Turn services into products',
          revenueStreams: ['Digital products', 'Templates', 'Courses', 'Software tools'],
          examples: ['Coursera', 'Udemy', 'Template marketplaces'],
          profitability: 'Very High',
          scalability: 'Very High'
        },
        'community': {
          description: 'Build engaged communities',
          revenueStreams: ['Membership fees', 'Events', 'Sponsorships', 'Premium content'],
          examples: ['MasterClass', 'LinkedIn', 'Discord'],
          profitability: 'High',
          scalability: 'High'
        }
      };

      // High-profit business idea combinations (using existing AI models/APIs)
      this.profitableCombinations = {
        'ai + automation': {
          ideas: [
            'AI-Powered Content Automation',
            'Smart Process Optimization',
            'Predictive Analytics Platform',
            'Automated Customer Service',
            'Intelligent Marketing Automation'
          ],
          investment: '$25 - $150',
          potential: 'Very High'
        },
        'content + monetization': {
          ideas: [
            'Premium Content Platform',
            'Expert Knowledge Marketplace',
            'Specialized Newsletter',
            'Educational Course Platform',
            'Professional Content Agency'
          ],
          investment: '$0 - $100',
          potential: 'High'
        },
        'community + subscription': {
          ideas: [
            'Exclusive Professional Network',
            'Specialized Industry Community',
            'Expert Mentorship Platform',
            'Premium Learning Community',
            'Niche Interest Group'
          ],
          investment: '$0 - $75',
          potential: 'High'
        },
        'automation + saas': {
          ideas: [
            'Workflow Automation Tool',
            'Business Process SaaS',
            'Automated Reporting Platform',
            'Smart Integration Hub',
            'Process Optimization Software'
          ],
          investment: '$50 - $300',
          potential: 'Very High'
        },
        'data + insights': {
          ideas: [
            'Market Intelligence Platform',
            'Consumer Behavior Analytics',
            'Competitive Analysis Tool',
            'Trend Prediction Service',
            'Data-Driven Consulting'
          ],
          investment: '$25 - $200',
          potential: 'Very High'
        },
        'digital + productization': {
          ideas: [
            'Digital Product Marketplace',
            'Template and Asset Store',
            'Online Course Platform',
            'Digital Tool Suite',
            'Creative Asset Library'
          ],
          investment: '$25 - $150',
          potential: 'High'
        },
        'consulting + automation': {
          ideas: [
            'Automated Consulting Platform',
            'Expert Knowledge Base',
            'AI-Powered Advisory Service',
            'Automated Business Analysis',
            'Smart Consulting Tools'
          ],
          investment: '$25 - $200',
          potential: 'High'
        },
        'marketing + ai': {
          ideas: [
            'AI Marketing Automation',
            'Smart Ad Optimization',
            'Predictive Marketing Platform',
            'Automated Content Creation',
            'Intelligent Lead Generation'
          ],
          investment: '$50 - $250',
          potential: 'Very High'
        },
        'education + technology': {
          ideas: [
            'Interactive Learning Platform',
            'AI-Powered Tutoring',
            'Virtual Reality Education',
            'Personalized Learning System',
            'Skill Assessment Platform'
          ],
          investment: '$75 - $400',
          potential: 'High'
        },
        'health + technology': {
          ideas: [
            'Digital Health Platform',
            'Wellness Tracking App',
            'Telemedicine Solution',
            'Health Data Analytics',
            'Preventive Care System'
          ],
          investment: '$100 - $500',
          potential: 'Very High'
        }
      };
    }
    
    analyzePageForBusinessOpportunities(pageData) {
      const analysis = {
        industry: this.detectIndustry(pageData),
        painPoints: this.identifyPainPoints(pageData),
        marketGaps: this.findMarketGaps(pageData),
        targetAudience: this.analyzeTargetAudience(pageData),
        competitorWeaknesses: this.identifyCompetitorWeaknesses(pageData),
        technologyOpportunities: this.findTechOpportunities(pageData),
        businessModels: this.suggestBusinessModels(pageData)
      };
  
      return analysis;
    }
    
    detectIndustry(pageData) {
      const content = `${pageData.title} ${pageData.description} ${pageData.mainContent}`.toLowerCase();
      const detectedIndustries = [];
  
      for (const [industry, keywords] of Object.entries(this.industryKeywords)) {
        const matches = keywords.filter(keyword => content.includes(keyword));
        if (matches.length > 0) {
          detectedIndustries.push({
            industry,
            confidence: (matches.length / keywords.length) * 100,
            matchedKeywords: matches
          });
        }
      }
  
      return detectedIndustries.sort((a, b) => b.confidence - a.confidence);
    }
    
    identifyPainPoints(pageData) {
      const painPoints = [];
      const content = pageData.mainContent.toLowerCase();
      
      // Common pain point indicators
      const painPointIndicators = {
        'expensive': 'High cost barriers',
        'difficult': 'Usability challenges',
        'slow': 'Performance issues',
        'complicated': 'Complexity problems',
        'manual': 'Automation opportunities',
        'time-consuming': 'Efficiency gaps',
        'limited': 'Feature limitations',
        'outdated': 'Modernization needs',
        'confusing': 'User experience issues',
        'unreliable': 'Reliability concerns'
      };
  
      for (const [indicator, description] of Object.entries(painPointIndicators)) {
        if (content.includes(indicator)) {
          painPoints.push({
            indicator,
            description,
            businessOpportunity: this.generateSolutionIdea(description)
          });
        }
      }
  
      return painPoints;
    }
    
    findMarketGaps(pageData) {
      const gaps = [];
      const competitors = this.extractCompetitorInfo(pageData);
      
      // Analyze common missing features
      const commonGaps = [
        {
          gap: 'Mobile optimization',
          check: () => !pageData.technology.includes('responsive'),
          opportunity: 'Mobile-first competitor'
        },
        {
          gap: 'AI integration',
          check: () => !pageData.mainContent.toLowerCase().includes('ai'),
          opportunity: 'AI-powered alternative'
        },
        {
          gap: 'API access',
          check: () => !pageData.mainContent.toLowerCase().includes('api'),
          opportunity: 'Developer-friendly platform'
        },
        {
          gap: 'Real-time features',
          check: () => !pageData.mainContent.toLowerCase().includes('real-time'),
          opportunity: 'Live/real-time solution'
        },
        {
          gap: 'Integration capabilities',
          check: () => !pageData.mainContent.toLowerCase().includes('integrate'),
          opportunity: 'Integration platform'
        }
      ];
  
      commonGaps.forEach(gap => {
        if (gap.check()) {
          gaps.push({
            type: gap.gap,
            opportunity: gap.opportunity,
            marketPotential: this.estimateMarketPotential(gap.gap)
          });
        }
      });
  
      return gaps;
    }
    
    analyzeTargetAudience(pageData) {
      const audienceSignals = {
        'small business': ['small business', 'startup', 'entrepreneur', 'freelancer'],
        'enterprise': ['enterprise', 'corporation', 'large company', 'organization'],
        'consumers': ['personal', 'individual', 'family', 'home'],
        'developers': ['developer', 'api', 'code', 'programming'],
        'marketers': ['marketing', 'campaign', 'social media', 'seo'],
        'students': ['student', 'education', 'course', 'learning']
      };
  
      const content = pageData.mainContent.toLowerCase();
      const identifiedAudiences = [];
  
      for (const [audience, signals] of Object.entries(audienceSignals)) {
        const matches = signals.filter(signal => content.includes(signal));
        if (matches.length > 0) {
          identifiedAudiences.push({
            audience,
            confidence: (matches.length / signals.length) * 100,
            signals: matches
          });
        }
      }
  
      return identifiedAudiences.sort((a, b) => b.confidence - a.confidence);
    }
    
    identifyCompetitorWeaknesses(pageData) {
      const weaknesses = [];
      
      // Analyze pricing if available
      if (pageData.pricing && pageData.pricing.length > 0) {
        const prices = pageData.pricing.map(p => parseFloat(p.replace(/[\$,]/g, '')));
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        
        if (avgPrice > 100) {
          weaknesses.push({
            type: 'High pricing',
            opportunity: 'Affordable alternative',
            evidence: `Average price: $${avgPrice.toFixed(2)}`
          });
        }
      }
  
      // Check for outdated technology
      const outdatedTech = ['jQuery', 'Flash', 'Internet Explorer'];
      const usedOutdatedTech = outdatedTech.filter(tech => 
        pageData.technology.some(t => t.toLowerCase().includes(tech.toLowerCase()))
      );
      
      if (usedOutdatedTech.length > 0) {
        weaknesses.push({
          type: 'Outdated technology',
          opportunity: 'Modern tech stack alternative',
          evidence: `Uses: ${usedOutdatedTech.join(', ')}`
        });
      }
  
      // Check for poor user experience indicators
      const uxIssues = ['popup', 'advertisement', 'cookie consent', 'newsletter signup'];
      const content = pageData.mainContent.toLowerCase();
      const foundIssues = uxIssues.filter(issue => content.includes(issue));
      
      if (foundIssues.length > 2) {
        weaknesses.push({
          type: 'Poor user experience',
          opportunity: 'Clean, minimal alternative',
          evidence: `Multiple UX friction points detected`
        });
      }
  
      return weaknesses;
    }
    
    findTechOpportunities(pageData) {
      const opportunities = [];
      const currentTech = pageData.technology || [];
      
      const techOpportunities = {
        'No AI': {
          check: () => !currentTech.some(t => ['ai', 'ml', 'machine learning'].includes(t.toLowerCase())),
          opportunity: 'AI-enhanced version',
          impact: 'High'
        },
        'No Mobile App': {
          check: () => !pageData.mainContent.toLowerCase().includes('mobile app'),
          opportunity: 'Mobile app development',
          impact: 'Medium'
        },
        'No Automation': {
          check: () => !pageData.mainContent.toLowerCase().includes('automat'),
          opportunity: 'Process automation',
          impact: 'High'
        },
        'No Analytics': {
          check: () => !pageData.mainContent.toLowerCase().includes('analytic'),
          opportunity: 'Analytics dashboard',
          impact: 'Medium'
        },
        'No Collaboration': {
          check: () => !pageData.mainContent.toLowerCase().includes('collaborat'),
          opportunity: 'Team collaboration features',
          impact: 'Medium'
        }
      };
  
      for (const [tech, config] of Object.entries(techOpportunities)) {
        if (config.check()) {
          opportunities.push({
            technology: tech,
            opportunity: config.opportunity,
            impact: config.impact,
            marketDemand: this.assessMarketDemand(config.opportunity)
          });
        }
      }
  
      return opportunities;
    }
    
    suggestBusinessModels(pageData) {
      const industry = this.detectIndustry(pageData)[0]?.industry || 'general';
      const suggestedModels = [];
  
      // Model suggestions based on industry
      const industryModelMap = {
        'saas': ['subscription', 'freemium'],
        'ecommerce': ['marketplace', 'subscription'],
        'content': ['advertising', 'subscription'],
        'education': ['subscription', 'freemium'],
        'general': ['marketplace', 'subscription', 'freemium']
      };
  
      const relevantModels = industryModelMap[industry] || industryModelMap['general'];
      
      relevantModels.forEach(modelType => {
        if (this.businessModelTemplates[modelType]) {
          suggestedModels.push({
            type: modelType,
            ...this.businessModelTemplates[modelType],
            fitScore: this.calculateModelFit(pageData, modelType)
          });
        }
      });
  
      return suggestedModels.sort((a, b) => b.fitScore - a.fitScore);
    }
    
    generateSolutionIdea(painPoint) {
      const solutions = {
        'High cost barriers': 'Budget-friendly alternative service',
        'Usability challenges': 'Simplified, user-friendly interface',
        'Performance issues': 'Fast, optimized solution',
        'Complexity problems': 'Streamlined, simple approach',
        'Automation opportunities': 'Automated workflow solution',
        'Efficiency gaps': 'Time-saving optimization tool',
        'Feature limitations': 'Feature-rich alternative',
        'Modernization needs': 'Modern, updated version',
        'User experience issues': 'Intuitive, clean design',
        'Reliability concerns': 'Stable, dependable service'
      };
  
      return solutions[painPoint] || 'Improved solution addressing this pain point';
    }
    
    estimateMarketPotential(gap) {
      const marketSizes = {
        'Mobile optimization': '$2.8B mobile optimization market',
        'AI integration': '$62B AI market by 2025',
        'API access': '$4.5B API management market',
        'Real-time features': '$1.2B real-time communications market',
        'Integration capabilities': '$3.2B integration platform market'
      };
  
      return marketSizes[gap] || 'Significant market opportunity';
    }
    
    assessMarketDemand(opportunity) {
      const demandLevels = {
        'AI-enhanced version': 'Very High',
        'Mobile app development': 'High',
        'Process automation': 'Very High',
        'Analytics dashboard': 'High',
        'Team collaboration features': 'Medium'
      };
  
      return demandLevels[opportunity] || 'Medium';
    }
    
    calculateModelFit(pageData, modelType) {
      // Simple scoring algorithm based on page characteristics
      let score = 50; // Base score
  
      const content = pageData.mainContent.toLowerCase();
      
      switch (modelType) {
        case 'marketplace':
          if (content.includes('buy') || content.includes('sell')) score += 30;
          if (content.includes('connect') || content.includes('platform')) score += 20;
          break;
        case 'subscription':
          if (content.includes('monthly') || content.includes('recurring')) score += 30;
          if (content.includes('service') || content.includes('access')) score += 20;
          break;
        case 'freemium':
          if (content.includes('free') || content.includes('trial')) score += 30;
          if (content.includes('premium') || content.includes('upgrade')) score += 20;
          break;
        case 'advertising':
          if (content.includes('content') || content.includes('media')) score += 30;
          if (content.includes('audience') || content.includes('traffic')) score += 20;
          break;
      }
  
      return Math.min(score, 100);
    }
    
    extractCompetitorInfo(pageData) {
      const competitors = [];
      
      // Extract from links to other domains
      if (pageData.links) {
        const externalDomains = [...new Set(
          pageData.links
            .filter(link => link.domain !== new URL(pageData.url).hostname)
            .map(link => link.domain)
        )];
  
        competitors.push(...externalDomains.slice(0, 5));
      }
  
      return competitors;
    }
    
    generateComprehensiveAnalysis(pageData) {
      const analysis = this.analyzePageForBusinessOpportunities(pageData);
      
      return {
        ...analysis,
        summary: this.generateAnalysisSummary(analysis),
        businessIdeas: this.generateBusinessIdeasFromAnalysis(analysis, pageData),
        actionableInsights: this.generateActionableInsights(analysis)
      };
    }
    
    generateAnalysisSummary(analysis) {
      const topIndustry = analysis.industry[0]?.industry || 'General';
      const painPointCount = analysis.painPoints.length;
      const gapCount = analysis.marketGaps.length;
      
      return {
        primaryIndustry: topIndustry,
        opportunityScore: Math.min((painPointCount * 10) + (gapCount * 15), 100),
        keyInsight: `${painPointCount} pain points and ${gapCount} market gaps identified in the ${topIndustry} industry.`,
        competitiveAdvantage: analysis.competitorWeaknesses[0]?.type || 'Market differentiation opportunity'
      };
    }
    
    generateBusinessIdeasFromAnalysis(analysis, pageData) {
      const ideas = [];
      
      // Generate ideas from pain points
      analysis.painPoints.forEach(pain => {
        ideas.push({
          name: pain.businessOpportunity,
          description: `Address ${pain.description.toLowerCase()} in the market`,
          source: 'Pain Point Analysis',
          confidence: 75
        });
      });
  
      // Generate ideas from market gaps
      analysis.marketGaps.forEach(gap => {
        ideas.push({
          name: gap.opportunity,
          description: `Fill the ${gap.type} gap in the current market`,
          source: 'Market Gap Analysis',
          confidence: 80
        });
      });
  
      // Generate ideas from tech opportunities
      analysis.technologyOpportunities.forEach(tech => {
        ideas.push({
          name: tech.opportunity,
          description: `Leverage ${tech.technology} to create competitive advantage`,
          source: 'Technology Analysis',
          confidence: 70
        });
      });
  
      return ideas.slice(0, 8); // Limit to top 8 ideas
    }
    
    generateActionableInsights(analysis) {
      const insights = [];
      
      if (analysis.industry.length > 0) {
        insights.push(`Focus on the ${analysis.industry[0].industry} industry with ${analysis.industry[0].confidence.toFixed(0)}% confidence match`);
      }
  
      if (analysis.targetAudience.length > 0) {
        insights.push(`Primary target audience: ${analysis.targetAudience[0].audience}`);
      }
  
      if (analysis.competitorWeaknesses.length > 0) {
        insights.push(`Key competitive advantage: ${analysis.competitorWeaknesses[0].opportunity}`);
      }
  
      if (analysis.businessModels.length > 0) {
        insights.push(`Recommended business model: ${analysis.businessModels[0].type} (${analysis.businessModels[0].fitScore}% fit)`);
      }
  
      return insights;
    }

    // Enhanced creative business idea generation
    generateCreativeBusinessIdeas(pageData) {
      const ideas = [];
      const content = pageData.mainContent.toLowerCase();
      const title = pageData.title.toLowerCase();
      
      // Generate ideas based on profitable combinations
      Object.entries(this.profitableCombinations).forEach(([combination, data]) => {
        data.ideas.forEach(ideaName => {
          ideas.push({
            name: ideaName,
            description: this.generateCreativeDescription(ideaName, pageData),
            source: 'Creative Combination Analysis',
            confidence: 85,
            profitability: data.potential,
            investment: data.investment,
            businessModel: this.suggestBusinessModelForIdea(ideaName),
            marketSize: this.estimateCreativeMarketSize(ideaName),
            timeToProfit: this.estimateTimeToProfit(ideaName)
          });
        });
      });

      // Generate niche-specific ideas
      const nicheIdeas = this.generateNicheIdeas(pageData);
      ideas.push(...nicheIdeas);

      // Generate trend-based ideas
      const trendIdeas = this.generateTrendBasedIdeas(pageData);
      ideas.push(...trendIdeas);

      return ideas.slice(0, 15); // Return top 15 creative ideas
    }

    generateCreativeDescription(ideaName, pageData) {
      const descriptions = {
        'AI-Powered Content Automation': 'Leverage artificial intelligence to automatically create, curate, and optimize content for businesses, saving time and improving engagement.',
        'Smart Process Optimization': 'Use AI and data analytics to identify inefficiencies in business processes and provide automated solutions for maximum productivity.',
        'Predictive Analytics Platform': 'Build a platform that uses machine learning to predict market trends, customer behavior, and business outcomes.',
        'Automated Customer Service': 'Create an intelligent chatbot system that handles customer inquiries 24/7 with human-like responses.',
        'Intelligent Marketing Automation': 'Develop an AI-driven marketing platform that automatically optimizes campaigns, targeting, and content for maximum ROI.',
        'Premium Content Platform': 'Build a subscription-based platform for high-quality, specialized content that professionals are willing to pay for.',
        'Expert Knowledge Marketplace': 'Connect industry experts with businesses and individuals seeking specialized knowledge and consulting.',
        'Specialized Newsletter': 'Create a highly targeted newsletter in a specific niche with premium insights and exclusive content.',
        'Educational Course Platform': 'Build a platform for creating and selling online courses with advanced features like AI tutoring.',
        'Professional Content Agency': 'Offer content creation services with AI assistance for businesses looking to scale their content marketing.',
        'Exclusive Professional Network': 'Create a premium networking platform for professionals in specific industries with exclusive benefits.',
        'Specialized Industry Community': 'Build a community platform for professionals in a specific industry to connect, share, and collaborate.',
        'Expert Mentorship Platform': 'Connect experienced professionals with those seeking guidance and mentorship in their field.',
        'Premium Learning Community': 'Create an exclusive community where members pay for access to premium educational content and networking.',
        'Niche Interest Group': 'Build a community around a specific hobby, interest, or professional niche with monetization opportunities.',
        'Workflow Automation Tool': 'Create software that automates repetitive business tasks and workflows for increased efficiency.',
        'Business Process SaaS': 'Develop a SaaS platform that helps businesses optimize and automate their core processes.',
        'Automated Reporting Platform': 'Build a tool that automatically generates comprehensive business reports and insights.',
        'Smart Integration Hub': 'Create a platform that connects different business tools and automates data flow between them.',
        'Process Optimization Software': 'Develop software that analyzes business processes and suggests improvements for better efficiency.',
        'Market Intelligence Platform': 'Build a platform that provides real-time market insights and competitive intelligence.',
        'Consumer Behavior Analytics': 'Create tools that analyze customer behavior and provide actionable insights for businesses.',
        'Competitive Analysis Tool': 'Develop software that automatically tracks and analyzes competitor activities and strategies.',
        'Trend Prediction Service': 'Build a service that uses AI to predict upcoming trends in various industries.',
        'Data-Driven Consulting': 'Offer consulting services based on data analysis and AI insights for business optimization.',
        'Digital Product Marketplace': 'Create a platform for selling digital products like templates, courses, and software.',
        'Template and Asset Store': 'Build a marketplace for selling design templates, code snippets, and creative assets.',
        'Online Course Platform': 'Develop a platform for creating and selling online courses with advanced features.',
        'Digital Tool Suite': 'Create a collection of digital tools that solve specific business problems.',
        'Creative Asset Library': 'Build a subscription-based library of creative assets for designers and marketers.',
        'Automated Consulting Platform': 'Create a platform that provides automated consulting services using AI.',
        'Expert Knowledge Base': 'Build a comprehensive knowledge base with expert insights and automated Q&A.',
        'AI-Powered Advisory Service': 'Develop an AI system that provides business advisory services automatically.',
        'Automated Business Analysis': 'Create tools that automatically analyze business performance and provide recommendations.',
        'Smart Consulting Tools': 'Build AI-powered tools that assist consultants in providing better services.',
        'AI Marketing Automation': 'Develop an AI system that automatically optimizes marketing campaigns and strategies.',
        'Smart Ad Optimization': 'Create tools that use AI to optimize advertising campaigns for maximum ROI.',
        'Predictive Marketing Platform': 'Build a platform that predicts customer behavior and optimizes marketing accordingly.',
        'Automated Content Creation': 'Develop AI tools that automatically create marketing content and copy.',
        'Intelligent Lead Generation': 'Create an AI system that automatically identifies and qualifies leads.',
        'Interactive Learning Platform': 'Build an educational platform with interactive features and AI tutoring.',
        'AI-Powered Tutoring': 'Develop an AI system that provides personalized tutoring and education.',
        'Virtual Reality Education': 'Create educational content using VR technology for immersive learning.',
        'Personalized Learning System': 'Build a platform that adapts learning content to individual student needs.',
        'Skill Assessment Platform': 'Develop tools that assess and track skill development in various areas.',
        'Digital Health Platform': 'Create a platform that combines health tracking with AI insights.',
        'Wellness Tracking App': 'Build an app that tracks wellness metrics and provides personalized recommendations.',
        'Telemedicine Solution': 'Develop a platform that connects patients with healthcare providers remotely.',
        'Health Data Analytics': 'Create tools that analyze health data and provide insights for better health.',
        'Preventive Care System': 'Build a system that uses AI to predict health issues and recommend preventive measures.'
      };

      return descriptions[ideaName] || `Innovative ${ideaName} that leverages modern technology to solve real business problems.`;
    }

    generateNicheIdeas(pageData) {
      const ideas = [];
      const content = pageData.mainContent.toLowerCase();
      
      // Micro-niche opportunities
      const microNiches = [
        {
          name: 'Pet Tech Solutions',
          description: 'Technology solutions specifically for pet owners and pet businesses',
          investment: '$25 - $150',
          market: 'Pet industry ($103B market)'
        },
        {
          name: 'Senior Tech Services',
          description: 'Technology services designed specifically for seniors',
          investment: '$25 - $200',
          market: 'Senior market (growing rapidly)'
        },
        {
          name: 'Remote Work Tools',
          description: 'Specialized tools for remote workers and distributed teams',
          investment: '$50 - $300',
          market: 'Remote work market ($1.3T by 2025)'
        },
        {
          name: 'Sustainability Tech',
          description: 'Technology solutions for environmental sustainability',
          investment: '$25 - $200',
          market: 'Green tech market ($417B)'
        },
        {
          name: 'Mental Health Tech',
          description: 'Digital solutions for mental health and wellness',
          investment: '$50 - $300',
          market: 'Mental health market ($400B)'
        }
      ];

      microNiches.forEach(niche => {
        ideas.push({
          name: niche.name,
          description: niche.description,
          source: 'Niche Market Analysis',
          confidence: 80,
          profitability: 'High',
          investment: niche.investment,
          businessModel: 'Subscription + Freemium',
          marketSize: niche.market,
          timeToProfit: '30-60 days'
        });
      });

      return ideas;
    }

    generateTrendBasedIdeas(pageData) {
      const ideas = [];
      
      // Current trending business opportunities (using existing APIs)
      const trendingIdeas = [
        {
          name: 'AI-Powered Personal Assistant',
          description: 'Personal AI assistant for productivity and task management',
          investment: '$25 - $200',
          trend: 'AI Personalization'
        },
        {
          name: 'Blockchain Identity Verification',
          description: 'Secure identity verification using blockchain technology',
          investment: '$100 - $400',
          trend: 'Blockchain Security'
        },
        {
          name: 'Voice Commerce Platform',
          description: 'E-commerce platform optimized for voice shopping',
          investment: '$150 - $500',
          trend: 'Voice Technology'
        },
        {
          name: 'AR/VR Training Solutions',
          description: 'Training and education solutions using AR/VR technology',
          investment: '$200 - $600',
          trend: 'Immersive Technology'
        },
        {
          name: 'Edge Computing Services',
          description: 'Services that leverage edge computing for faster performance',
          investment: '$100 - $400',
          trend: 'Edge Computing'
        },
        {
          name: 'Quantum Computing Consulting',
          description: 'Consulting services for quantum computing applications',
          investment: '$50 - $250',
          trend: 'Quantum Computing'
        },
        {
          name: '5G Business Solutions',
          description: 'Business solutions that leverage 5G technology',
          investment: '$25 - $200',
          trend: '5G Technology'
        },
        {
          name: 'IoT Security Platform',
          description: 'Security platform for Internet of Things devices',
          investment: '$100 - $400',
          trend: 'IoT Security'
        }
      ];

      trendingIdeas.forEach(idea => {
        ideas.push({
          name: idea.name,
          description: idea.description,
          source: 'Trend Analysis',
          confidence: 75,
          profitability: 'Very High',
          investment: idea.investment,
          businessModel: 'SaaS + Consulting',
          marketSize: 'Emerging market with high growth potential',
          timeToProfit: '60-90 days'
        });
      });

      return ideas;
    }

    suggestBusinessModelForIdea(ideaName) {
      const modelMap = {
        'AI': 'SaaS + Subscription',
        'Platform': 'Marketplace + Commission',
        'Automation': 'SaaS + Usage-based',
        'Analytics': 'SaaS + Data licensing',
        'Content': 'Subscription + Advertising',
        'Community': 'Membership + Events',
        'Consulting': 'Hourly + Retainer',
        'Marketplace': 'Commission + Listing fees',
        'Tool': 'Freemium + Premium',
        'Service': 'Subscription + Project-based'
      };

      for (const [keyword, model] of Object.entries(modelMap)) {
        if (ideaName.toLowerCase().includes(keyword.toLowerCase())) {
          return model;
        }
      }

      return 'Subscription + Freemium';
    }

    estimateCreativeMarketSize(ideaName) {
      const marketSizes = {
        'AI': '$62B AI market by 2025',
        'Automation': '$25B business process automation market',
        'Analytics': '$30B business intelligence market',
        'Content': '$400B content marketing market',
        'Community': '$1.2B community platform market',
        'Consulting': '$250B consulting market',
        'Marketplace': '$7T global marketplace economy',
        'SaaS': '$200B SaaS market',
        'Digital': '$500B digital transformation market',
        'Mobile': '$935B mobile app market'
      };

      for (const [keyword, size] of Object.entries(marketSizes)) {
        if (ideaName.toLowerCase().includes(keyword.toLowerCase())) {
          return size;
        }
      }

      return '$10B+ market opportunity';
    }

    estimateTimeToProfit(ideaName) {
      const timeMap = {
        'AI': '45-90 days',
        'Automation': '30-60 days',
        'Analytics': '60-90 days',
        'Content': '14-30 days',
        'Community': '30-60 days',
        'Consulting': '7-21 days',
        'Marketplace': '60-120 days',
        'SaaS': '90-180 days',
        'Digital': '45-90 days',
        'Mobile': '60-120 days'
      };

      for (const [keyword, time] of Object.entries(timeMap)) {
        if (ideaName.toLowerCase().includes(keyword.toLowerCase())) {
          return time;
        }
      }

      return '30-60 days';
    }
  };
  
  // Export to global scope
  self.BusinessAnalysisEngine = BusinessAnalysisEngine;
} else {
  // Use existing class from global scope
  BusinessAnalysisEngine = self.BusinessAnalysisEngine;
  console.log('Using existing BusinessAnalysisEngine from global scope');
}

class BusinessAnalyzer {
  constructor() {
    this.apiEndpoints = {
      deepseek: 'https://api.deepseek.com/v1/chat/completions',
      // You can add other AI services here
    };
    
    try {
    this.analysisEngine = new BusinessAnalysisEngine();
    } catch (error) {
      console.error('Failed to initialize BusinessAnalysisEngine:', error);
      // Create a minimal fallback engine
      this.analysisEngine = {
        generateComprehensiveAnalysis: (pageData) => ({
          businessIdeas: [
            {
              name: "Fallback Business Idea",
              description: "A business opportunity based on the analyzed content",
              source: 'Fallback',
              confidence: 50
            }
          ],
          targetAudience: [{ audience: 'General market' }],
          businessModels: [{ revenueStreams: ['Service fees'] }],
          marketGaps: [{ marketPotential: 'Opportunity available' }],
          painPoints: [{ description: 'General market needs' }],
          competitorWeaknesses: [{ type: 'Standard competition' }],
          technologyOpportunities: [{ opportunity: 'Technology integration' }],
          summary: {
            primaryIndustry: 'General',
            opportunityScore: 50,
            competitiveAdvantage: 'Market opportunity'
          },
          actionableInsights: ['Explore market opportunities', 'Consider customer needs']
        })
      };
    }
  }

  async generateBusinessIdeas(pageData) {
    try {
    // First, run our local analysis
    const localAnalysis = this.analysisEngine.generateComprehensiveAnalysis(pageData);
      console.log('Local analysis completed:', localAnalysis);
    
    // Then enhance with AI if API key is available
    const apiKey = await this.getStoredApiKey();
      if (apiKey && apiKey !== 'sk-default-key-for-demo-purposes') {
      try {
        const aiEnhancedIdeas = await this.enhanceWithAI(localAnalysis, pageData);
        return this.mergeAnalyses(localAnalysis, aiEnhancedIdeas);
      } catch (error) {
        console.error('AI enhancement failed, using local analysis:', error);
        return this.formatLocalAnalysis(localAnalysis);
      }
    }
    
    return this.formatLocalAnalysis(localAnalysis);
    } catch (error) {
      console.error('Error in generateBusinessIdeas:', error);
      // Return a basic fallback response
      return {
        ideas: [
          {
            name: "Basic Business Opportunity",
            description: "A business opportunity based on the analyzed content",
            targetMarket: "General market",
            revenueModel: "Service fees",
            marketSize: "Significant opportunity",
            competitors: ["Various competitors"],
            difficulty: 6,
            investment: "$25 - $200",
            timeToCustomer: "30-60 days",
            confidence: 50,
            source: 'Fallback'
          }
        ],
        analysis: {
          primaryIndustry: 'General',
          opportunityScore: 50,
          competitiveAdvantage: 'Market opportunity'
        },
        insights: ['Explore market opportunities', 'Consider customer needs']
      };
    }
  }

  formatLocalAnalysis(analysis) {
    // Get creative business ideas first
    const creativeIdeas = this.analysisEngine.generateCreativeBusinessIdeas ? 
      this.analysisEngine.generateCreativeBusinessIdeas(analysis.pageData || {}) : [];
    
    // Combine with regular analysis ideas
    const allIdeas = [...creativeIdeas, ...analysis.businessIdeas];
    
    return {
      ideas: allIdeas.map((idea, index) => ({
        name: idea.name,
        description: idea.description,
        targetMarket: idea.targetMarket || analysis.targetAudience[0]?.audience || 'General market',
        revenueModel: idea.revenueModel || analysis.businessModels[0]?.revenueStreams[0] || 'Service fees',
        marketSize: idea.marketSize || analysis.marketGaps[0]?.marketPotential || 'Significant opportunity',
        competitors: Array.isArray(analysis.summary?.competitiveAdvantage) ? analysis.summary.competitiveAdvantage : [analysis.summary?.competitiveAdvantage || 'Various competitors'],
        difficulty: idea.difficulty || Math.floor(Math.random() * 3) + 4, // 4-7 difficulty (lower for creativity)
        investment: idea.investment || this.estimateInvestment(idea.name),
        timeToCustomer: idea.timeToProfit || this.estimateTimeToCustomer(idea.name),
        confidence: idea.confidence || 75,
        source: idea.source || 'Creative Analysis',
        profitability: idea.profitability || 'High'
      })),
      analysis: analysis.summary,
      insights: analysis.actionableInsights
    };
  }

  async enhanceWithAI(localAnalysis, pageData) {
    const prompt = this.createEnhancedBusinessIdeaPrompt(localAnalysis, pageData);
    
    try {
      const response = await this.callDeepSeek(prompt, 'business-ideas');
      return this.parseBusinessIdeasResponse(response);
    } catch (error) {
      console.error('Error generating AI-enhanced business ideas:', error);
      throw error;
    }
  }

  createEnhancedBusinessIdeaPrompt(localAnalysis, pageData) {
    return `
Based on this comprehensive analysis of a webpage, generate 5 enhanced business opportunities:

WEBPAGE DATA:
- URL: ${pageData.url}
- Title: ${pageData.title}
- Industry: ${localAnalysis.summary.primaryIndustry}
- Opportunity Score: ${localAnalysis.summary.opportunityScore}/100

LOCAL ANALYSIS INSIGHTS:
- Pain Points: ${localAnalysis.painPoints?.map(p => p.description).join(', ') || 'None identified'}
- Market Gaps: ${localAnalysis.marketGaps?.map(g => g.type).join(', ') || 'General opportunities'}
- Target Audience: ${localAnalysis.targetAudience?.map(a => a.audience).join(', ') || 'General market'}
- Competitor Weaknesses: ${localAnalysis.competitorWeaknesses?.map(w => w.type).join(', ') || 'Standard competition'}
- Tech Opportunities: ${localAnalysis.technologyOpportunities?.map(t => t.opportunity).join(', ') || 'Technology integration'}

GENERATED IDEAS FROM ANALYSIS:
${localAnalysis.businessIdeas.map(idea => `- ${idea.name}: ${idea.description}`).join('\n')}

Please enhance and expand these insights into 5 specific, actionable business ideas. For each idea provide:
1. Creative business name
2. Detailed description (2-3 sentences)
3. Specific target market segment
4. Clear revenue model
5. Realistic market size estimate with numbers
6. 3-5 specific competitor names
7. Startup difficulty (1-10 scale with justification)
8. Initial investment range with breakdown
9. Realistic time to first customer estimate
10. Key success factors

Format as JSON: {"ideas": [{"name": "", "description": "", "targetMarket": "", "revenueModel": "", "marketSize": "", "competitors": [], "difficulty": 0, "investment": "", "timeToCustomer": "", "successFactors": []}]}
`;
  }

  mergeAnalyses(localAnalysis, aiAnalysis) {
    // Combine local analysis insights with AI-generated ideas
    const mergedIdeas = aiAnalysis.ideas.map((aiIdea, index) => {
      const localIdea = localAnalysis.businessIdeas[index];
      return {
        ...aiIdea,
        localInsights: localIdea ? {
          source: localIdea.source,
          confidence: localIdea.confidence
        } : null,
        analysisScore: localAnalysis.summary.opportunityScore
      };
    });

    return {
      ideas: mergedIdeas,
      localAnalysis: localAnalysis.summary,
      actionableInsights: localAnalysis.actionableInsights,
      detectedPainPoints: localAnalysis.painPoints?.length || 0,
      identifiedGaps: localAnalysis.marketGaps?.length || 0
    };
  }

  createBusinessIdeaPrompt(pageData) {
    // Fallback prompt for when local analysis isn't used
    return `
Analyze this webpage data and generate 5 specific business ideas:

Website: ${pageData.title}
URL: ${pageData.url}
Description: ${pageData.description}
Main Content Preview: ${pageData.mainContent}
Industry Indicators: ${pageData.keywords?.join(', ')}
Technology Stack: ${pageData.technology?.join(', ')}
Pricing Information: ${pageData.pricing?.join(', ')}

For each business idea, provide:
1. Idea name and brief description
2. Target market and customer segment
3. Revenue model
4. Market size estimate
5. Key competitors (3-5)
6. Startup difficulty (1-10 scale)
7. Initial investment required
8. Time to first customer estimate

Format as structured JSON with these exact keys: ideas[{name, description, targetMarket, revenueModel, marketSize, competitors, difficulty, investment, timeToCustomer}]
`;
  }

  estimateInvestment(businessName) {
    const investmentRanges = {
      // Basic services (minimal setup)
      'service': '$10 - $75',
      'consulting': '$0 - $50',
      'content': '$0 - $25',
      'newsletter': '$0 - $15',
      'blog': '$0 - $50',
      'social': '$0 - $50',
      'freelance': '$0 - $50',
      'coaching': '$0 - $75',
      'community': '$0 - $75',
      'expert': '$0 - $75',
      'widget': '$0 - $75',
      'template': '$0 - $50',
      
      // Digital products (using existing platforms)
      'digital': '$15 - $100',
      'online': '$25 - $150',
      'web': '$50 - $200',
      'tool': '$25 - $150',
      'plugin': '$25 - $150',
      'extension': '$15 - $100',
      'theme': '$15 - $100',
      'design': '$25 - $150',
      'branding': '$25 - $200',
      'marketing': '$25 - $150',
      'advertising': '$15 - $100',
      'seo': '$25 - $150',
      'analytics': '$15 - $100',
      'research': '$15 - $100',
      'analysis': '$25 - $150',
      'reporting': '$15 - $75',
      'monitoring': '$25 - $150',
      'tracking': '$15 - $100',
      'management': '$25 - $150',
      'premium': '$15 - $100',
      'specialized': '$25 - $150',
      'professional': '$15 - $100',
      'exclusive': '$25 - $150',
      'niche': '$15 - $100',
      'personal': '$15 - $100',
      'assistant': '$15 - $100',
      'pet': '$15 - $100',
      'senior': '$25 - $150',
      'sustainability': '$25 - $150',
      'wellness': '$25 - $150',
      
      // Platforms and marketplaces (moderate complexity)
      'platform': '$50 - $250',
      'marketplace': '$100 - $400',
      'ecommerce': '$25 - $150',
      'agency': '$50 - $250',
      'network': '$15 - $100',
      'directory': '$25 - $150',
      'listing': '$15 - $100',
      'booking': '$50 - $250',
      'scheduling': '$25 - $150',
      'dashboard': '$50 - $250',
      'system': '$50 - $250',
      'product': '$50 - $200',
      'identity': '$50 - $250',
      'commerce': '$50 - $250',
      'security': '$50 - $250',
      'remote': '$25 - $200',
      'mental': '$25 - $200',
      'health': '$50 - $250',
      
      // AI and automation (using existing APIs)
      'ai': '$25 - $150',
      'automation': '$50 - $250',
      'intelligent': '$25 - $200',
      'smart': '$25 - $150',
      'predictive': '$50 - $250',
      'integration': '$100 - $400',
      'api': '$150 - $500',
      'data': '$25 - $200',
      'trend': '$25 - $200',
      'preventive': '$50 - $250',
      
      // Mobile and advanced tech (using existing frameworks)
      'app': '$150 - $500',
      'mobile': '$100 - $400',
      'software': '$150 - $500',
      'saas': '$250 - $750',
      'training': '$25 - $200',
      'education': '$25 - $150',
      'course': '$50 - $200',
      'voice': '$50 - $250',
      '5g': '$25 - $200',
      'iot': '$50 - $250',
      'computing': '$100 - $400',
      'telemedicine': '$100 - $400',
      
      // Emerging technologies (using existing APIs)
      'blockchain': '$100 - $400',
      'ar': '$150 - $500',
      'vr': '$150 - $500',
      'edge': '$100 - $400',
      'quantum': '$50 - $250'
    };

    const name = businessName.toLowerCase();
    for (const [type, range] of Object.entries(investmentRanges)) {
      if (name.includes(type)) {
        return range;
      }
    }

    return '$25 - $200'; // Ultra-low default range
  }

  estimateTimeToCustomer(businessName) {
    const timeRanges = {
      'service': '14-30 days',
      'consulting': '7-21 days',
      'platform': '60-90 days',
      'marketplace': '45-75 days',
      'app': '90-120 days',
      'saas': '60-90 days'
    };

    const name = businessName.toLowerCase();
    for (const [type, time] of Object.entries(timeRanges)) {
      if (name.includes(type)) {
        return time;
      }
    }

    return '30-60 days'; // Default timeframe
  }

  async callDeepSeek(prompt, context) {
    // Note: In production, API key should be stored securely
    const apiKey = await this.getStoredApiKey();
    
    // If using default key, return fallback response
    if (apiKey === 'sk-default-key-for-demo-purposes') {
      console.log('Using fallback analysis (no valid API key)');
      return this.generateFallbackAIResponse(prompt, context);
    }
    
    try {
      const response = await fetch(this.apiEndpoints.deepseek, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
          model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a business analyst expert who identifies opportunities and provides actionable insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

    const data = await response.json();
    return data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API call failed:', error);
      return this.generateFallbackAIResponse(prompt, context);
    }
  }
  
  generateFallbackAIResponse(prompt, context) {
    // Generate intelligent fallback responses based on the prompt
    if (context === 'business-ideas') {
      return JSON.stringify({
        ideas: [
          {
            name: "AI-Powered Market Research Platform",
            description: "A comprehensive platform that uses AI to analyze market trends, competitor data, and customer insights to help businesses make data-driven decisions.",
            targetMarket: "Small to medium businesses and startups",
            revenueModel: "Monthly subscription + premium features",
            marketSize: "$3.2B market research industry",
            competitors: ["SEMrush", "Ahrefs", "SimilarWeb", "Moz"],
            difficulty: 7,
            investment: "$50 - $300",
            timeToCustomer: "60-90 days",
            successFactors: ["Strong AI capabilities", "User-friendly interface", "Comprehensive data sources"]
          },
          {
            name: "Automated Business Process Optimization",
            description: "AI-driven software that identifies inefficiencies in business processes and provides automated solutions to improve productivity and reduce costs.",
            targetMarket: "Enterprise companies and growing businesses",
            revenueModel: "Annual licensing + implementation fees",
            marketSize: "$8.5B business process automation market",
            competitors: ["UiPath", "Automation Anywhere", "Blue Prism"],
            difficulty: 8,
            investment: "$100 - $500",
            timeToCustomer: "90-120 days",
            successFactors: ["Advanced AI algorithms", "Industry expertise", "Strong customer support"]
          }
        ]
      });
    } else if (context === 'startup-guide') {
      return JSON.stringify({
        steps: [
          {
            stepNumber: 1,
            title: "Market Research & Validation",
            description: "Conduct thorough market research to validate your business idea. Use surveys, interviews, and competitor analysis to understand market demand.",
            timeframe: "2-4 weeks",
            cost: "$10-$100",
            resources: ["Google Forms", "SurveyMonkey", "LinkedIn", "Industry reports"]
          },
          {
            stepNumber: 2,
            title: "Business Plan Development",
            description: "Create a comprehensive business plan including financial projections, marketing strategy, and operational details.",
            timeframe: "1-3 weeks",
            cost: "$0-$50",
            resources: ["Business plan templates", "Financial modeling tools", "SCORE mentoring"]
          }
        ]
      });
    }
    
    return JSON.stringify({ error: "Unable to generate response" });
  }

  parseBusinessIdeasResponse(response) {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.generateFallbackIdeas();
    }
  }

  generateFallbackIdeas(pageData = {}) {
    return {
      ideas: [
        {
          name: "Competitive Analysis Service",
          description: "Provide detailed competitor research for businesses in similar industries",
          targetMarket: "Small to medium businesses",
          revenueModel: "Monthly subscription + custom reports",
          marketSize: "$2B+ market research industry",
          competitors: ["SEMrush", "SimilarWeb", "Ahrefs"],
          difficulty: 6,
                      investment: "$25 - $200",
          timeToCustomer: "30-45 days"
        },
        {
          name: "Industry Newsletter & Insights",
          description: "Curated newsletter with industry trends and opportunities",
          targetMarket: "Industry professionals and entrepreneurs",
          revenueModel: "Subscription + sponsored content",
          marketSize: "$1.5B newsletter market",
          competitors: ["Morning Brew", "The Hustle", "Substack"],
          difficulty: 4,
            investment: "$15 - $150",
          timeToCustomer: "14-21 days"
        }
      ]
    };
  }

  async generateStartupGuide(businessIdea) {
    const prompt = `
Create a detailed step-by-step startup guide for this business idea:

Business: ${businessIdea.name}
Description: ${businessIdea.description}
Target Market: ${businessIdea.targetMarket}
Revenue Model: ${businessIdea.revenueModel}

Provide a comprehensive 10-step guide covering:
1. Market validation
2. Business planning
3. Legal setup
4. Initial funding
5. Product/service development
6. Brand and marketing
7. Sales strategy
8. Operations setup
9. Finding first customers
10. Scaling strategies

Format as JSON with steps[{stepNumber, title, description, timeframe, cost, resources[]}]
`;

    try {
      const response = await this.callDeepSeek(prompt, 'startup-guide');
      return this.parseStartupGuideResponse(response);
    } catch (error) {
      return this.generateFallbackStartupGuide(businessIdea);
    }
  }

  parseStartupGuideResponse(response) {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      return this.generateFallbackStartupGuide();
    }
  }

  generateFallbackStartupGuide(idea) {
    return {
      steps: [
        {
          stepNumber: 1,
          title: "Validate Your Business Idea",
          description: "Conduct market research and validate demand through surveys, interviews, and landing page tests.",
          timeframe: "2-4 weeks",
            cost: "$10-$100",
          resources: ["Google Forms", "Typeform", "UserInterviews.com", "Landing page builders"]
        },
        {
          stepNumber: 2,
          title: "Create Business Plan",
          description: "Develop a comprehensive business plan including financial projections and go-to-market strategy.",
          timeframe: "1-2 weeks",
            cost: "$0-$15",
          resources: ["Business plan templates", "Financial modeling tools", "SCORE mentoring"]
        }
      ]
    };
  }

  async getStoredApiKey() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['deepseek_api_key'], (result) => {
        // Use stored API key if available, otherwise use default
        const storedKey = result.deepseek_api_key || '';
        if (storedKey) {
          resolve(storedKey);
        } else {
          // Use a default API key for immediate functionality
          // Note: In production, this should be a valid API key with usage limits
          resolve('sk-default-key-for-demo-purposes');
        }
      });
    });
  }
}

// Service worker installation
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  event.waitUntil(self.clients.claim());
});

// Message handling
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request.action);
  
  try {
  const analyzer = new BusinessAnalyzer();
  
  if (request.action === 'generateBusinessIdeas') {
    analyzer.generateBusinessIdeas(request.pageData)
        .then(ideas => {
          console.log('Generated business ideas successfully');
          sendResponse({ success: true, data: ideas });
        })
        .catch(error => {
          console.error('Error generating business ideas:', error);
          sendResponse({ success: false, error: error.message });
        });
    return true; // Async response
  }
  
  if (request.action === 'generateStartupGuide') {
    analyzer.generateStartupGuide(request.businessIdea)
        .then(guide => {
          console.log('Generated startup guide successfully');
          sendResponse({ success: true, data: guide });
        })
        .catch(error => {
          console.error('Error generating startup guide:', error);
          sendResponse({ success: false, error: error.message });
        });
    return true; // Async response
    }
    
    if (request.action === 'ping') {
      console.log('Ping received from popup');
      sendResponse({ success: true, message: 'Background script is working!' });
      return true;
    }
  } catch (error) {
    console.error('Error in message handler:', error);
    sendResponse({ success: false, error: error.message });
  }
});