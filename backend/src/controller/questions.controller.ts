import { Anthropic } from '@anthropic-ai/sdk';
import { Request, Response, NextFunction } from 'express';
import { ANTHROPIC_API } from '../config';

const client = new Anthropic({
    apiKey: ANTHROPIC_API,
});

// Update the function signature to match Express middleware pattern
const genQuestion = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const { subject, questionCount = 10 } = req.body;

    if (!subject) {
        res.status(400).json({
            msg: 'subject is missing',
        });
        return;
    }

    try {
        const response = await client.messages.create({
            model: "claude-3-7-sonnet-latest",
            max_tokens: 1000,
            system: "You are an expert exam creator. Generate well-structured multiple choice questions with 4 options each. Include the correct answer marked clearly at the end. Format your response ONLY as a valid JSON array with no explanation text before or after. Each question object should have: 'question' (string), 'options' (array of 4 strings), and 'correctAnswer' (integer 0-3).",
            messages: [
                {
                    role: "user",
                    content: `Create ${questionCount} challenging multiple choice questions on the subject of ${subject}. Each question should have exactly 4 options (A, B, C, D) with only one correct answer. Format the output ONLY as a JSON array with no additional text before or after. Each question object should have: "question", "options" (array of 4 strings), and "correctAnswer" (index 0-3).`,
                },
            ],
        });
        
        let contentText = '';
        if (response?.content?.[0]?.type === 'text') {
            contentText = response.content[0].text;
        }

        let questions;
        try {
            questions = JSON.parse(contentText);
            if (!Array.isArray(questions)) {
                throw new Error('Parsed content is not a valid JSON array');
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Failed to parse response from Claude',
                error: error instanceof Error ? error.message : 'Server error',
            });
            return;
        }

        res.status(200).json({
            questions,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error generating questions',
            error: error instanceof Error ? error.message : 'Server error',
        });
    }
};

export { genQuestion };