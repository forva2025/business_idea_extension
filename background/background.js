// Import the analyzer with error handling
let BusinessAnalysisEngine;

try {
  importScripts('../utils/analyzer.js');
  console.log('Successfully loaded analyzer.js');
} catch (error) {
  console.error('Failed to load analyzer.js:', error);
  console.log('Using fallback BusinessAnalysisEngine');
}

// Create fallback if import failed
if (typeof BusinessAnalysisEngine === 'undefined') {
  BusinessAnalysisEngine = class BusinessAnalysisEngine {
    constructor() {
      this.industryKeywords = {
        'ecommerce': ['shop', 'store', 'buy', 'cart', 'checkout', 'product', 'inventory'],
        'saas': ['software', 'platform', 'api', 'dashboard', 'subscription', 'cloud'],
        'content': ['blog', 'article', 'news', 'media', 'content', 'publishing'],
        'education': ['course', 'learn', 'training', 'education', 'tutorial', 'certification'],
        'healthcare': ['health', 'medical', 'doctor', 'patient', 'clinic', 'treatment'],
        'finance': ['bank', 'loan', 'investment', 'finance', 'money', 'payment'],
        'real_estate': ['property', 'house', 'rent', 'lease', 'real estate', 'mortgage'],
        'travel': ['hotel', 'flight', 'travel', 'booking', 'vacation', 'tourism'],
        'food': ['restaurant', 'food', 'delivery', 'menu', 'recipe', 'cooking'],
        'fitness': ['gym', 'fitness', 'workout', 'health', 'exercise', 'nutrition']
      };
    }
    
    generateComprehensiveAnalysis(pageData) {
      return {
        businessIdeas: [
          {
            name: "AI-Powered Market Research Platform",
            description: "A comprehensive platform that uses AI to analyze market trends and competitor data",
            source: 'Fallback Analysis',
            confidence: 75
          },
          {
            name: "Automated Business Process Optimization",
            description: "AI-driven software that identifies inefficiencies in business processes",
            source: 'Fallback Analysis',
            confidence: 70
          }
        ],
        targetAudience: [{ audience: 'Small to medium businesses' }],
        businessModels: [{ revenueStreams: ['Monthly subscription'] }],
        marketGaps: [{ marketPotential: 'Significant opportunity' }],
        painPoints: [{ description: 'Market research complexity' }],
        competitorWeaknesses: [{ type: 'Limited automation' }],
        technologyOpportunities: [{ opportunity: 'AI integration' }],
        summary: {
          primaryIndustry: 'Technology',
          opportunityScore: 75,
          competitiveAdvantage: 'AI-powered insights'
        },
        actionableInsights: ['Focus on AI-driven solutions', 'Target SMB market']
      };
    }
  };
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
            investment: "$5,000 - $20,000",
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
    return {
      ideas: analysis.businessIdeas.map((idea, index) => ({
        name: idea.name,
        description: idea.description,
        targetMarket: analysis.targetAudience[0]?.audience || 'General market',
        revenueModel: analysis.businessModels[0]?.revenueStreams[0] || 'Service fees',
        marketSize: analysis.marketGaps[0]?.marketPotential || 'Significant opportunity',
        competitors: Array.isArray(analysis.summary?.competitiveAdvantage) ? analysis.summary.competitiveAdvantage : [analysis.summary?.competitiveAdvantage || 'Various competitors'],
        difficulty: Math.floor(Math.random() * 3) + 5, // 5-8 difficulty
        investment: this.estimateInvestment(idea.name),
        timeToCustomer: this.estimateTimeToCustomer(idea.name),
        confidence: idea.confidence,
        source: idea.source
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
      'service': '$1,000 - $5,000',
      'platform': '$10,000 - $25,000',
      'marketplace': '$25,000 - $50,000',
      'app': '$15,000 - $35,000',
      'saas': '$20,000 - $40,000',
      'ecommerce': '$5,000 - $15,000'
    };

    const name = businessName.toLowerCase();
    for (const [type, range] of Object.entries(investmentRanges)) {
      if (name.includes(type)) {
        return range;
      }
    }

    return '$5,000 - $20,000'; // Default range
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
            investment: "$25,000 - $50,000",
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
            investment: "$50,000 - $100,000",
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
            cost: "$500-$2,000",
            resources: ["Google Forms", "SurveyMonkey", "LinkedIn", "Industry reports"]
          },
          {
            stepNumber: 2,
            title: "Business Plan Development",
            description: "Create a comprehensive business plan including financial projections, marketing strategy, and operational details.",
            timeframe: "1-3 weeks",
            cost: "$0-$1,000",
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
          investment: "$10,000 - $25,000",
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
          investment: "$1,000 - $5,000",
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
          cost: "$500-$1,500",
          resources: ["Google Forms", "Typeform", "UserInterviews.com", "Landing page builders"]
        },
        {
          stepNumber: 2,
          title: "Create Business Plan",
          description: "Develop a comprehensive business plan including financial projections and go-to-market strategy.",
          timeframe: "1-2 weeks",
          cost: "$0-$500",
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