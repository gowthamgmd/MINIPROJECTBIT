import OpenAI from 'openai';

/**
 * OpenAI client configuration
 * Initializes the OpenAI client with API key from environment variables
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Generates outfit recommendations based on user preferences
 * @param {Object} params - Parameters for outfit recommendation
 * @param {Object} params.mood - Selected mood object
 * @param {Object} params.weather - Weather conditions
 * @param {Object} params.preferences - User style preferences
 * @param {Object} params.userProfile - User profile data
 * @returns {Promise<Object>} AI-generated outfit recommendations
 */
export async function generateOutfitRecommendations({
  mood,
  weather,
  preferences,
  userProfile = {}
}) {
  try {
    const prompt = `You are a professional fashion stylist and personal shopper with expertise in creating personalized outfit recommendations. 

User Context:
- Mood: ${mood?.label} (${mood?.description})
- Weather: ${weather?.temperature}°F, ${weather?.condition}, Humidity: ${weather?.humidity}%, Wind: ${weather?.windSpeed} mph
- Location: ${weather?.location || 'Not specified'}
- Occasion: ${preferences?.occasion}
- Formality Level: ${preferences?.formalityLevel}/10 (1=very casual, 10=very formal)
- Comfort Priority: ${preferences?.comfortPriority}/10 (1=style focused, 10=comfort focused)
- Color Preferences: ${preferences?.colorPreferences?.join(', ') || 'None specified'}
- Items to Avoid: ${preferences?.excludedItems?.join(', ') || 'None'}
- Budget Range: ${preferences?.budgetRange || 'Not specified'}
- Style Goal: ${preferences?.styleGoal || 'Look and feel great'}

Please create 2-3 complete outfit recommendations that are:
1. Appropriate for the weather and occasion
2. Aligned with the user's mood and energy level
3. Within the specified formality and comfort preferences
4. Considerate of color preferences and excluded items
5. Practical and achievable

For each outfit, provide:
- A catchy outfit name
- Specific clothing items (be detailed about colors, styles, materials)
- Confidence score (0-1) based on how well it matches the criteria
- Explanation of why it aligns with their mood
- Explanation of weather appropriateness
- 3-4 styling reasons why this combination works
- 2-3 quick alternatives or modifications

Also provide 3 general styling insights based on their preferences and current situation.`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert fashion stylist who creates personalized, practical outfit recommendations with detailed reasoning.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'outfit_recommendations',
          schema: {
            type: 'object',
            properties: {
              outfits: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    items: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    confidence: { type: 'number' },
                    moodAlignment: { type: 'string' },
                    weatherAppropriate: { type: 'string' },
                    reasonings: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    alternatives: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['id', 'name', 'items', 'confidence', 'moodAlignment', 'weatherAppropriate', 'reasonings']
                }
              },
              insights: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            required: ['outfits', 'insights'],
            additionalProperties: false
          }
        }
      },
      reasoning_effort: 'medium',
      verbosity: 'medium'
    });

    const result = JSON.parse(response?.choices?.[0]?.message?.content);
    
    // Add IDs if missing and ensure data integrity
    result.outfits = result?.outfits?.map((outfit, index) => ({
      ...outfit,
      id: outfit?.id || Date.now() + index,
      confidence: Math.min(Math.max(outfit?.confidence || 0.8, 0), 1)
    }));

    return {
      ...result,
      context: {
        mood,
        weather,
        preferences,
        userProfile,
        timestamp: new Date()?.toISOString()
      }
    };

  } catch (error) {
    console.error('Error generating outfit recommendations:', error);
    throw new Error('Failed to generate outfit recommendations. Please try again.');
  }
}

/**
 * Handles follow-up questions about outfits
 * @param {string} question - User's follow-up question
 * @param {Object} context - Previous recommendation context
 * @returns {Promise<string>} AI response to the follow-up question
 */
export async function handleFollowUpQuestion(question, context) {
  try {
    const contextPrompt = `Previous recommendation context:
- Mood: ${context?.mood?.label}
- Weather: ${context?.weather?.temperature}°F, ${context?.weather?.condition}
- Occasion: ${context?.preferences?.occasion}
- User asked about: ${context?.outfits?.map(o => o?.name)?.join(', ')}

User's follow-up question: ${question}

Please provide a helpful, specific answer that relates to their outfit recommendations and personal style context.`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion expert providing personalized styling advice. Give practical, specific recommendations that build on previous outfit suggestions.'
        },
        {
          role: 'user',
          content: contextPrompt
        }
      ],
      reasoning_effort: 'low',
      verbosity: 'medium',
      max_completion_tokens: 500
    });

    return response?.choices?.[0]?.message?.content;

  } catch (error) {
    console.error('Error handling follow-up question:', error);
    throw new Error('Failed to process your question. Please try again.');
  }
}

export default openai;