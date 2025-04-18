export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Room {
  id: string;
  code: string;
  name: string;
  type: string;
  createdBy: string;
  participants: number;
}

export interface TestSession {
  id: string;
  userId: string;
  roomId?: string;
  startTime: Date;
  endTime?: Date;
  score?: number;
  totalQuestions: number;
  isCompleted: boolean;
}