
import { History, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

interface QuestionHistoryProps {
  questions: Question[];
  onQuestionSelect: (question: Question) => void;
  onClearHistory: () => void;
  selectedQuestion: string;
}

const QuestionHistory = ({
  questions,
  onQuestionSelect,
  onClearHistory,
  selectedQuestion,
}: QuestionHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isYesterday) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border h-fit animate-fade-in">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <History className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Question History</h3>
          </div>
          {questions.length > 0 && (
            <Button
              onClick={onClearHistory}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 transition-all duration-300 hover:scale-105 animate-fade-in delay-150"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-96">
        <div className="p-4">
          {questions.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <Clock className="h-8 w-8 text-gray-400 mx-auto mb-3 animate-pulse" />
              <p className="text-gray-500 text-sm animate-fade-in delay-150">No questions asked yet</p>
              <p className="text-gray-400 text-xs mt-1 animate-fade-in delay-300">
                Your question history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => onQuestionSelect(q)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] animate-fade-in ${
                    selectedQuestion === q.question
                      ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 ring-1 ring-blue-200 scale-[1.02]'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {truncateText(q.question, 60)}
                      </p>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatTime(q.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {truncateText(q.answer, 80)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {formatDate(q.timestamp)}
                      </span>
                      <span className="text-xs text-blue-600 font-medium transition-transform duration-200 group-hover:translate-x-1">
                        View Answer →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestionHistory;
