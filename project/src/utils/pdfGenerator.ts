import { QuestionData } from "../components/test/Question";
import { jsPDF } from "jspdf";

interface PDFData {
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  questions: QuestionData[];
  timeSpent: string;
  percentage: number;
  resultMessage: string;
}

export const generatePDF = (data: PDFData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 200);
  doc.text("Test Results", pageWidth / 2, 20, { align: "center" });
  
  // Score information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Score: ${data.score}/${data.totalQuestions} (${data.percentage}%)`, 20, 40);
  doc.text(`Time Spent: ${data.timeSpent}`, 20, 50);
  doc.text(`Result: ${data.resultMessage}`, 20, 60);
  
  // Horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 70, pageWidth - 20, 70);
  
  // Questions and answers
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 150);
  doc.text("Question Summary", 20, 85);
  
  let yPosition = 100;
  
  data.questions.forEach((question, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    const selectedAnswer = data.answers[index];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Q${index + 1}: ${question.text}`, 20, yPosition);
    
    yPosition += 10;
    
    // Show all options
    question.options.forEach((option, optIndex) => {
      const optionText = `${String.fromCharCode(65 + optIndex)}: ${option}`;
      
      if (optIndex === question.correctAnswer) {
        doc.setTextColor(0, 150, 0); // Green for correct answer
      } else if (optIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
        doc.setTextColor(200, 0, 0); // Red for incorrect selected answer
      } else {
        doc.setTextColor(100, 100, 100); // Gray for other options
      }
      
      doc.text(optionText, 25, yPosition);
      yPosition += 8;
    });
    
    // Result of this question
    doc.setTextColor(isCorrect ? 0 : 200, isCorrect ? 150 : 0, 0);
    doc.text(
      isCorrect 
        ? "✓ Correct" 
        : `✗ Incorrect (Correct answer: ${String.fromCharCode(65 + question.correctAnswer)})`,
      25, 
      yPosition
    );
    
    yPosition += 15;
  });
  
  // Footer
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on ${currentDate} | EduTest Platform`, pageWidth / 2, 285, { align: "center" });
  
  // Save the PDF
  doc.save("test-result.pdf");
};

export default { generatePDF };