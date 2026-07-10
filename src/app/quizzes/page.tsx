"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizzes } from "@/data/quizzes";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function QuizzesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizzes[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizzes.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === question.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="container max-w-3xl px-4 py-20 mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center py-10 shadow-xl">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
              <CardDescription className="text-lg">You have successfully finished this topic's quiz.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold text-primary mb-2">
                {Math.round((score / quizzes.length) * 100)}%
              </div>
              <p className="text-muted-foreground">You got {score} out of {quizzes.length} correct.</p>
            </CardContent>
            <CardFooter className="flex justify-center mt-6">
              <Button onClick={restartQuiz} size="lg" className="gap-2 rounded-full">
                <RotateCcw className="h-4 w-4" /> Try Again
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl px-4 py-10 mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" /> Topic Quiz
        </h1>
        <div className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
          Question {currentQuestionIndex + 1} of {quizzes.length}
        </div>
      </div>

      <Progress value={progress} className="h-2 w-full mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctAnswerIndex;
                const isSelected = index === selectedOption;
                
                let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
                let buttonClass = "w-full justify-start text-left h-auto py-4 px-6 text-base font-normal";
                
                if (isAnswered) {
                  if (isCorrect) {
                    buttonVariant = "default";
                    buttonClass += " bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/50 hover:bg-green-500/20";
                  } else if (isSelected) {
                    buttonVariant = "destructive";
                    buttonClass += " bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/50 hover:bg-red-500/20";
                  } else {
                    buttonClass += " opacity-50";
                  }
                } else if (isSelected) {
                  buttonVariant = "secondary";
                }

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={buttonClass}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                  </Button>
                );
              })}

              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm leading-relaxed"
                >
                  <span className="font-semibold text-primary mr-2">Explanation:</span>
                  {question.explanation}
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end pt-4 border-t border-border/50">
              <Button 
                onClick={handleNext} 
                disabled={!isAnswered}
                className="gap-2"
              >
                {currentQuestionIndex < quizzes.length - 1 ? "Next Question" : "Finish Quiz"} 
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
