"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([10, 20]);
  const [inputValue, setInputValue] = useState("");

  const handlePush = () => {
    if (!inputValue) return;
    setStack([...stack, parseInt(inputValue)]);
    setInputValue("");
  };

  const handlePop = () => {
    setStack(stack.slice(0, -1));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex gap-2 w-full max-w-sm">
        <Input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number" 
          onKeyDown={(e) => e.key === 'Enter' && handlePush()}
        />
        <Button onClick={handlePush}>Push</Button>
        <Button onClick={handlePop} variant="secondary" disabled={stack.length === 0}>Pop</Button>
      </div>

      <div className="flex flex-col-reverse justify-start min-h-[300px] w-48 p-4 bg-background/50 rounded-b-xl border-x border-b border-border/50 border-t-0 shadow-inner">
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full h-12 bg-primary/20 border-b border-primary text-foreground font-bold flex flex-col items-center justify-center rounded-sm shadow-sm relative group"
            >
              <span className="text-xs absolute left-2 text-muted-foreground">{index}</span>
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
        {stack.length === 0 && (
          <p className="text-muted-foreground text-center my-auto">Stack is empty.</p>
        )}
      </div>
    </div>
  );
}
