import { useState } from 'react';
import { quizData } from '../../data';

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      calculateBadges();
    }
  };

  const calculateBadges = () => {
    const newBadges = [];
    const finalScore = selectedAnswer === currentQuestion.correctAnswer ? score + 1 : score;
    const percentage = (finalScore / quizData.length) * 100;

    if (percentage === 100) {
      newBadges.push({ name: '🏆 Perfect Score', description: 'Answered all questions correctly!' });
    } else if (percentage >= 80) {
      newBadges.push({ name: '🌟 Safety Expert', description: 'Scored 80% or higher!' });
    } else if (percentage >= 60) {
      newBadges.push({ name: '📚 Safety Scholar', description: 'Scored 60% or higher!' });
    }

    if (finalScore >= 1) {
      newBadges.push({ name: '🎯 Quiz Taker', description: 'Completed the safety quiz!' });
    }

    setBadges(newBadges);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const finalScore = score;
    const percentage = (finalScore / quizData.length) * 100;

    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Quiz Completed! 🎉</h1>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {finalScore} / {quizData.length}
            </div>
            <p className="text-xl text-gray-600">
              You scored {percentage.toFixed(0)}%
            </p>
          </div>

          {/* Badges Earned */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">🏅 Badges Earned</h2>
            <div className="space-y-3">
              {badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                  <h3 className="text-xl font-bold">{badge.name}</h3>
                  <p className="text-gray-700">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Feedback */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">📊 Performance Feedback</h3>
            {percentage === 100 && (
              <p className="text-gray-700">Outstanding! You have excellent disaster preparedness knowledge!</p>
            )}
            {percentage >= 80 && percentage < 100 && (
              <p className="text-gray-700">Great job! You have a strong understanding of disaster safety.</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-gray-700">Good effort! Review the survival guides to improve your knowledge.</p>
            )}
            {percentage < 60 && (
              <p className="text-gray-700">Keep learning! Review the survival guides to enhance your preparedness.</p>
            )}
          </div>

          <button
            onClick={restartQuiz}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎯 Disaster Safety Quiz</h1>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {quizData.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              {currentQuestion.category}
            </span>
            <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showResult && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-blue-300'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-blue-500 bg-blue-500'
                      : showResult && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <span className="text-white text-sm">
                        {showResult ? (index === currentQuestion.correctAnswer ? '✓' : '✗') : '✓'}
                      </span>
                    )}
                    {showResult && index === currentQuestion.correctAnswer && selectedAnswer !== index && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-blue-50 border-2 border-blue-300'
            }`}>
              <h3 className="font-bold mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : 'ℹ️ Explanation:'}
              </h3>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
