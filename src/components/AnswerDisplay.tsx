
import { useState } from 'react';
import { Copy, X, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AnimatedLogo from './AnimatedLogo';

interface AnswerDisplayProps {
  answer: string;
  question: string;
  isLoading: boolean;
  onClearAnswer: () => void;
}

const AnswerDisplay = ({ answer, question, isLoading, onClearAnswer }: AnswerDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      toast({
        title: "Answer copied",
        description: "The answer has been copied to your clipboard",
        variant: "default",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!question && !isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <MessageSquareText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 animate-fade-in delay-150">
            No questions asked yet
          </h3>
          <p className="text-gray-500 animate-fade-in delay-300">
            Upload a PDF and ask a question to see the AI-generated answer here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 animate-fade-in">Answer</h2>
        {(answer || isLoading) && (
          <Button
            onClick={onClearAnswer}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 animate-fade-in delay-150"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Question Display */}
      {question && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400 animate-slide-in-right delay-200">
          <p className="text-sm font-medium text-blue-800 mb-1">Your Question:</p>
          <p className="text-gray-800">{question}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12 animate-fade-in">
          <div className="text-center">
            <AnimatedLogo size="lg" isLoading={true} className="mx-auto mb-4" />
            <p className="text-gray-600 animate-pulse">Processing your question...</p>
            <p className="text-sm text-gray-500 mt-1 animate-fade-in delay-500">
              This may take a few seconds
            </p>
          </div>
        </div>
      )}

      {/* Answer Display */}
      {answer && !isLoading && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between animate-slide-in-right delay-100">
            <p className="text-sm font-medium text-gray-700">AI Response:</p>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className={`text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 ${
                copied ? 'bg-green-50 text-green-600 border-green-300' : ''
              }`}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto animate-fade-in delay-200 transition-all duration-300 hover:shadow-inner">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
          </div>
          
          <div className="text-xs text-gray-500 text-right animate-fade-in delay-300">
            Generated at {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
