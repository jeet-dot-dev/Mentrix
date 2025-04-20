import { Anthropic } from '@anthropic-ai/sdk';
import { Request, Response, NextFunction } from 'express';
import { ANTHROPIC_API } from '../config';

const client = new Anthropic({
    apiKey: ANTHROPIC_API,
});

const genQuestion = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const { subject, questionCount = 10, syllabus } = req.body;

    if (!subject) {
        res.status(400).json({
            msg: 'subject is missing',
        });
        return;
    }

    try {
        // Improved system prompt for better JSON formatting
        let systemPrompt = `You are an expert exam creator. Your task is to generate multiple choice questions in a specific JSON format. Each question must have exactly 4 options.

Format your response as a valid JSON array of question objects. Each object must have:
- "question": string (the question text)
- "options": array of exactly 4 strings (the possible answers)
- "correctAnswer": number (0-3, indicating the index of the correct answer)

Example format:
[
  {
    "question": "What is 2+2?",
    "options": ["3", "4", "5", "6"],
    "correctAnswer": 1
  }
]

Do not include any text before or after the JSON array. Ensure all JSON is properly formatted with no unterminated strings.`;
        
        let userPrompt = `Generate ${questionCount} challenging multiple choice questions about ${subject}.`;
        
        if (syllabus) {
            userPrompt += ` Focus on these specific topics: ${syllabus}.`;
        }
        
        userPrompt += ` Return ONLY a valid JSON array of question objects with no additional text.`;

        const response = await client.messages.create({
            model: "claude-3-5-sonnet-latest",
            max_tokens: 4000,
            temperature: 0.7,
            system: systemPrompt,
            messages: [
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
        });
        
        let contentText = '';
        if (response?.content?.[0]?.type === 'text') {
            contentText = response.content[0].text.trim();
        }

        // Ensure the response starts with [ and ends with ]
        if (!contentText.startsWith('[') || !contentText.endsWith(']')) {
            throw new Error('Response is not a valid JSON array');
        }

        let questions;
        try {
            questions = JSON.parse(contentText);
            
            // Validate the questions array
            if (!Array.isArray(questions)) {
                throw new Error('Parsed content is not an array');
            }

            // Validate each question object
            questions.forEach((q, index) => {
                if (!q.question || !Array.isArray(q.options) || 
                    q.options.length !== 4 || typeof q.correctAnswer !== 'number' ||
                    q.correctAnswer < 0 || q.correctAnswer > 3) {
                    throw new Error(`Invalid question format at index ${index}`);
                }
            });

        } catch (error) {
            console.error('JSON Parse Error:', error);
            console.error('Raw Content:', contentText);
            res.status(500).json({
                msg: 'Failed to parse response from Claude',
                error: error instanceof Error ? error.message : 'Invalid response format',
            });
            return;
        }

        res.status(200).json({
            questions,
        });
    } catch (error) {
        console.error('Generation Error:', error);
        res.status(500).json({
            msg: 'Error generating questions',
            error: error instanceof Error ? error.message : 'Server error',
        });
    }
};

export { genQuestion };