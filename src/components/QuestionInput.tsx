
import { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface QuestionInputProps {
  onQuestionSubmit: (question: string) => void;
  isLoading: boolean;
  isFileUploaded: boolean;
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
}

const QuestionInput = ({
  onQuestionSubmit,
  isLoading,
  isFileUploaded,
  currentQuestion,
  setCurrentQuestion,
}: QuestionInputProps) => {
  const [localQuestion, setLocalQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuestion.trim() && isFileUploaded && !isLoading) {
      onQuestionSubmit(localQuestion.trim());
      setCurrentQuestion(localQuestion.trim());
      setLocalQuestion('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDisabled = !isFileUploaded || isLoading || !localQuestion.trim();

  return (
    <div className="space-y-4 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'transform scale-[1.02]' : ''
        }`}>
          <Textarea
            value={localQuestion}
            onChange={(e) => setLocalQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              isFileUploaded
                ? "Ask a question about your PDF content..."
                : "Please upload a PDF file first to ask questions"
            }
            disabled={!isFileUploaded || isLoading}
            className={`min-h-[100px] pr-12 resize-none transition-all duration-300 ${
              isFocused ? 'ring-2 ring-blue-500/50 border-blue-300' : ''
            } ${
              !isFileUploaded ? 'bg-gray-50' : ''
            }`}
            rows={4}
          />
          
          <Button
            type="submit"
            disabled={isDisabled}
            className={`absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${
              !isDisabled ? 'hover:scale-110 hover:shadow-lg' : ''
            }`}
            size="sm"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 transition-all duration-300">
          <span className={`transition-colors duration-300 ${
            !isFileUploaded ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {!isFileUploaded
              ? "Upload a PDF to start asking questions"
              : "Press Enter to submit or Shift+Enter for new line"}
          </span>
          <span className={`transition-colors duration-300 ${
            localQuestion.length > 400 ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {localQuestion.length}/500
          </span>
        </div>
      </form>

      {/* Suggested Questions with staggered animations */}
      {isFileUploaded && !currentQuestion && (
        <div className="space-y-2 animate-fade-in delay-300">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
            <p className="text-sm font-medium text-gray-700">Suggested questions:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "What is the main topic of this document?",
              "Summarize the key points",
              "What are the conclusions?",
              "List the important dates mentioned",
            ].map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => setLocalQuestion(suggestion)}
                className={`px-3 py-1 text-sm bg-gray-100 hover:bg-blue-50 hover:text-blue-700 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
