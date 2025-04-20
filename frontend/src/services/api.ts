import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ApiResponse {
  questions: Question[];
}

export const generateQuestions = async (
  subject: string,
  topic: string,
  questionCount: number = 10
): Promise<Question[]> => {
  try {
    const response = await axios.post<ApiResponse>(`${API_BASE_URL}/generate-question`, {
      subject,
      syllabus: topic,
      questionCount
    });
    return response.data.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}; 