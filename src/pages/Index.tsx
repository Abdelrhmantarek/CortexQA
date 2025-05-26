import { useState } from 'react';
import { Upload, MessageSquare, History, Sparkles, Zap, Brain } from 'lucide-react';
import PDFUpload from '@/components/PDFUpload';
import QuestionInput from '@/components/QuestionInput';
import AnswerDisplay from '@/components/AnswerDisplay';
import QuestionHistory from '@/components/QuestionHistory';
import AnimatedLogo from '@/components/AnimatedLogo';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setUploadedFile(file);
    
    try {
      // Simulate API call for demo - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsFileUploaded(true);
      toast({
        title: "PDF uploaded successfully!",
        description: `${file.name} - 50 passages extracted`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again with a valid PDF file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSubmit = async (question: string) => {
    if (!isFileUploaded) {
      toast({
        title: "No PDF uploaded",
        description: "Please upload a PDF file first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentQuestion(question);
    
    try {
      // Simulate API call for demo - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockAnswer = `Based on the uploaded PDF, here's a comprehensive answer to your question: "${question}". The document contains relevant information that addresses your query. This is a simulated response that would normally come from your AI backend processing the PDF content.`;
      
      setCurrentAnswer(mockAnswer);
      
      // Add to history
      const newQuestion: Question = {
        id: Date.now().toString(),
        question,
        answer: mockAnswer,
        timestamp: new Date(),
      };
      
      setQuestionHistory(prev => [newQuestion, ...prev]);
      
      toast({
        title: "Answer generated",
        description: "Your question has been answered successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to get answer",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (question: Question) => {
    setCurrentQuestion(question.question);
    setCurrentAnswer(question.answer);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setQuestionHistory([]);
    toast({
      title: "History cleared",
      description: "All question history has been removed",
      variant: "default",
    });
  };

  const clearAnswer = () => {
    setCurrentAnswer('');
    setCurrentQuestion('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 animate-fade-in relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-bounce-gentle"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            {i % 3 === 0 && <Brain className="w-8 h-8 text-blue-400 animate-pulse" />}
            {i % 3 === 1 && <Zap className="w-6 h-6 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />}
            {i % 3 === 2 && <Sparkles className="w-7 h-7 text-indigo-400 animate-pulse" />}
          </div>
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="relative">
                <AnimatedLogo size="lg" className="animate-fade-in transform hover:scale-110 transition-transform duration-300" />
                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="relative">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in delay-150 relative">
                  CortexQA
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite] opacity-0 hover:opacity-100" />
                </h1>
                <p className="text-gray-600 animate-fade-in delay-300 relative">
                  <Sparkles className="inline w-4 h-4 mr-1 text-purple-500 animate-pulse" />
                  Upload a PDF and ask questions about its content
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm backdrop-blur-sm animate-fade-in delay-500 group"
            >
              <History className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>History</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Upload Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 animate-fade-in delay-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group relative overflow-hidden">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              <div className="flex items-center space-x-3 mb-6 relative z-10">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-6 w-6 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Upload PDF</h2>
                <Sparkles className="h-4 w-4 text-blue-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative z-10">
                <PDFUpload 
                  onFileUpload={handleFileUpload}
                  isLoading={isLoading}
                  uploadedFile={uploadedFile}
                  isFileUploaded={isFileUploaded}
                />
              </div>
            </div>

            {/* Question Input Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 animate-fade-in delay-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group relative overflow-hidden">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              <div className="flex items-center space-x-3 mb-6 relative z-10">
                <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Ask a Question</h2>
                <Brain className="h-4 w-4 text-green-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative z-10">
                <QuestionInput
                  onQuestionSubmit={handleQuestionSubmit}
                  isLoading={isLoading}
                  isFileUploaded={isFileUploaded}
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </div>
            </div>

            {/* Answer Display */}
            <div className="animate-fade-in delay-600">
              <AnswerDisplay
                answer={currentAnswer}
                question={currentQuestion}
                isLoading={isLoading}
                onClearAnswer={clearAnswer}
              />
            </div>
          </div>

          {/* Question History Sidebar */}
          <div className={`lg:w-80 ${showHistory ? 'block' : 'hidden lg:block'} animate-fade-in delay-800`}>
            <QuestionHistory
              questions={questionHistory}
              onQuestionSelect={handleHistorySelect}
              onClearHistory={clearHistory}
              selectedQuestion={currentQuestion}
            />
          </div>
        </div>
      </div>

      {/* Mobile History Overlay */}
      {showHistory && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
          <div className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-xl animate-slide-in-right">
            <div className="p-4 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Question History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-gray-100/50 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-90"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4">
              <QuestionHistory
                questions={questionHistory}
                onQuestionSelect={handleHistorySelect}
                onClearHistory={clearHistory}
                selectedQuestion={currentQuestion}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
