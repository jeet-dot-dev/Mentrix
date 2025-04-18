import { QuestionData } from "../components/test/Question";
import { Room } from "../types";

// Mock questions for testing
export const mockQuestions: QuestionData[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Mars", "Venus", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "What is the chemical symbol for water?",
    options: ["WA", "H2O", "HO2", "W"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    id: 7,
    text: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Thailand", "Korea", "Japan"],
    correctAnswer: 3
  },
  {
    id: 9,
    text: "What is the square root of 81?",
    options: ["8", "9", "10", "7"],
    correctAnswer: 1
  },
  {
    id: 10,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2
  }
];

// Mock rooms for the home page
export const mockRooms: Room[] = [
  {
    id: "1",
    code: "ABC123",
    name: "Math Practice",
    type: "math",
    createdBy: "Teacher1",
    participants: 12
  },
  {
    id: "2",
    code: "DEF456",
    name: "Science Quiz",
    type: "science",
    createdBy: "Teacher2",
    participants: 8
  },
  {
    id: "3",
    code: "GHI789",
    name: "History Test",
    type: "history",
    createdBy: "Teacher3",
    participants: 5
  }
];