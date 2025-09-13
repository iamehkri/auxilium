import { NextRequest, NextResponse } from 'next/server';

// Make direct REST API call to Claude
async function callClaude(prompt: string) {
  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    throw new Error('CLAUDE_API_KEY environment variable is not set');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 3000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data;
}

const SYSTEM_PROMPT = `You are an expert digital strategy consultant for Auxilium.io. Based on the phase and user input, you will provide appropriate JSON responses for the chip-based clarification system.

**CRITICAL: Your response must be valid JSON only. Do not include any text before or after the JSON structure.**

**LOGIC**: Always use the progressive chip clarification system unless the initial challenge is highly specific and actionable.

**PHASE 1 - Industry Selection:**
{
  "response_type": "industry_selection",
  "message": "I can help you identify the best solution for your challenge. First, which industry best describes your organization?",
  "industries": [
    {"id": "nonprofit", "label": "Nonprofit Organization", "icon": "Heart", "description": "501(c)(3), charity, foundation"},
    {"id": "healthcare", "label": "Healthcare", "icon": "Activity", "description": "Hospital, clinic, medical practice"},
    {"id": "education", "label": "Education", "icon": "GraduationCap", "description": "School, university, training organization"},
    {"id": "government", "label": "Government", "icon": "Building", "description": "Agency, municipality, public service"},
    {"id": "faith", "label": "Faith-Based", "icon": "Church", "description": "Church, religious organization"},
    {"id": "social_enterprise", "label": "Social Enterprise", "icon": "Sprout", "description": "B-Corp, social impact business"},
    {"id": "association", "label": "Association", "icon": "Users", "description": "Professional association, membership org"},
    {"id": "community", "label": "Community Organization", "icon": "Home", "description": "Local group, community center"}
  ]
}

**PHASE 2 - Challenge Category:**
{
  "response_type": "challenge_category",
  "message": "Thanks! Now let's narrow down your challenge. Which area best describes your main concern?",
  "categories": [
    {"id": "website_digital_presence", "label": "Website & Digital Presence", "icon": "Globe", "description": "Website issues, online visibility, branding", "color": "text-blue-400"},
    {"id": "data_analytics", "label": "Data & Analytics", "icon": "BarChart3", "description": "Tracking, reporting, measurement challenges", "color": "text-orange-400"},
    {"id": "automation_efficiency", "label": "Automation & Efficiency", "icon": "Zap", "description": "Manual processes, workflow bottlenecks", "color": "text-yellow-400"},
    {"id": "communication_engagement", "label": "Communication & Engagement", "icon": "MessageCircle", "description": "Email, social media, audience connection", "color": "text-green-400"},
    {"id": "systems_integration", "label": "Systems & Integration", "icon": "GitBranch", "description": "Software doesn't work together, data silos", "color": "text-purple-400"},
    {"id": "security_compliance", "label": "Security & Compliance", "icon": "Shield", "description": "Data protection, regulatory requirements", "color": "text-red-400"},
    {"id": "growth_scaling", "label": "Growth & Scaling", "icon": "TrendingUp", "description": "Can't handle increased volume/demand", "color": "text-emerald-400"},
    {"id": "mobile_accessibility", "label": "Mobile & Accessibility", "icon": "Smartphone", "description": "Mobile experience, inclusive design", "color": "text-pink-400"}
  ]
}

**PHASE 3 - Specific Details (Generate based on industry + category combination):**
{
  "response_type": "specific_details",
  "message": "Let's get specific about your [category] challenges:",
  "details": [
    // Generate 6-8 specific options based on industry + category
  ],
  "allow_multiple": true,
  "max_selections": 3
}

**PHASE 4 - Final Assessment:**
{
  "response_type": "final_assessment",
  "organization": {
    "industry": "Selected industry",
    "category": "Selected challenge category",
    "specific_challenges": ["Array of selected specific issues"]
  },
  "clear_analysis": {
    "credibility": {"current_score": 1-10, "primary_issue": "Main problem", "specific_impact": "How it hurts them", "quick_win": "30-day fix", "strategic_solution": "Long-term strategy"},
    "logic": {"current_score": 1-10, "primary_issue": "Main problem", "specific_impact": "How it hurts them", "quick_win": "30-day fix", "strategic_solution": "Long-term strategy"},
    "empowerment": {"current_score": 1-10, "primary_issue": "Main problem", "specific_impact": "How it hurts them", "quick_win": "30-day fix", "strategic_solution": "Long-term strategy"},
    "accessibility": {"current_score": 1-10, "primary_issue": "Main problem", "specific_impact": "How it hurts them", "quick_win": "30-day fix", "strategic_solution": "Long-term strategy"},
    "resilience": {"current_score": 1-10, "primary_issue": "Main problem", "specific_impact": "How it hurts them", "quick_win": "30-day fix", "strategic_solution": "Long-term strategy"}
  },
  "solution_roadmap": {
    "immediate_actions": [{"action": "30-day action", "addresses": "Which challenge", "effort": "Low|Medium|High", "impact": "Low|Medium|High"}],
    "strategic_initiatives": [{"action": "6-month project", "addresses": "Which challenges", "investment": "Small|Medium|Large", "roi_timeline": "3-12 months"}]
  },
  "next_step": {
    "recommended_meeting": "Strategy Session|Technical Audit|Quick Assessment",
    "meeting_agenda": ["Agenda based on selections"],
    "urgency": "Why timing matters"
  }
}

Analysis Guidelines: Make strategic inferences based on common patterns. Create urgency through hidden costs, competitive risks, missed growth opportunities, and compliance vulnerabilities. Be consultative, not salesy.`;

export async function POST(request: NextRequest) {
  try {
    const { message, industry, category, specificDetails, context, phase } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Create the appropriate prompt based on the phase and context
    let fullPrompt = '';

    if (phase === 'industry_selection') {
      fullPrompt = `${SYSTEM_PROMPT}

User's challenge: "${message}"

Analyze if this challenge is specific and actionable. If YES, provide a final_assessment. If NO (vague), provide industry_selection response.`;
    } else if (phase === 'challenge_category') {
      fullPrompt = `${SYSTEM_PROMPT}

User selected industry: ${industry}
Original challenge: "${message}"

Provide challenge_category response with categories tailored to the ${industry} industry.`;
    } else if (phase === 'specific_details') {
      fullPrompt = `${SYSTEM_PROMPT}

User selected:
- Industry: ${industry}
- Category: ${category}
Original challenge: "${message}"

Provide specific_details response with 6-8 specific issues for ${industry} organizations facing ${category} challenges.`;
    } else {
      // Final assessment
      const contextInfo = specificDetails ?
        `Selected: Industry: ${industry}, Category: ${category}, Specific Details: ${specificDetails.join(', ')}` :
        `Industry: ${industry || 'inferred'}, Challenge: ${message}`;

      fullPrompt = `${SYSTEM_PROMPT}

${contextInfo}
Original challenge: "${message}"

Provide final_assessment response with comprehensive CLEAR analysis based on their specific selections and industry.`;
    }

    // Generate response using Claude
    const result = await callClaude(fullPrompt) as any;
    const text = result.content?.[0]?.text || '';

    // Try to parse as JSON
    try {
      const parsedResponse = JSON.parse(text);

      // Return the response with appropriate type based on response_type
      if (parsedResponse.response_type) {
        return NextResponse.json({
          type: parsedResponse.response_type,
          data: parsedResponse,
          timestamp: new Date().toISOString(),
        });
      } else {
        // Legacy support - assume it's a final assessment
        return NextResponse.json({
          type: 'final_assessment',
          data: parsedResponse,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      // Fallback to simple text response if JSON parsing fails
      return NextResponse.json({
        type: 'text',
        response: text || 'Thank you for sharing your challenge. We\'ll provide strategic insights to help you transform it.',
        timestamp: new Date().toISOString(),
      });
    }

  } catch (error) {
    console.error('Claude API Error:', error);

    // Fallback response - simple and direct
    const fallbackResponse = `We're experiencing high demand right now. Please try again in a moment, and we'll provide you with personalized strategic insights for your challenge.`;

    return NextResponse.json({
      type: 'text',
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
}