"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export default function DSAVisualizerBanner() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const generateArray = () => {
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 20);
    setArray(newArr);
    setActiveIndices([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, 150));
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }
    setActiveIndices([]);
    setIsSorting(false);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl flex items-center gap-2">
          Interactive Visualizer
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">Bubble Sort</Badge>
        </CardTitle>
        <CardDescription>Watch how bubble sort rearranges elements in real-time.</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-8">
        <div className="h-64 bg-background/50 rounded-xl border border-border/50 p-6 flex items-end justify-center gap-2">
          {array.map((value, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ height: 0 }}
              animate={{ 
                height: `${value}%`,
                backgroundColor: activeIndices.includes(idx) ? "var(--color-primary)" : "var(--color-secondary)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-10 rounded-t-md relative flex items-start justify-center pt-2 text-xs font-bold"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-secondary-foreground)"
              }}
            >
              {value}
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={bubbleSort} disabled={isSorting} className="gap-2">
            <Play className="h-4 w-4" /> Start Sorting
          </Button>
          <Button onClick={generateArray} disabled={isSorting} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Reset Array
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
