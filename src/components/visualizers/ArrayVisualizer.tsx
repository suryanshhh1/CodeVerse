"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ArrayVisualizer() {
  const [array, setArray] = useState([10, 25, 45, 60, 30]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue) return;
    setArray([...array, parseInt(inputValue)]);
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex gap-2 w-full max-w-sm">
        <Input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number" 
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd}>Append</Button>
      </div>

      <div className="flex gap-2 flex-wrap justify-center min-h-[100px] items-center p-4 bg-background/50 rounded-xl border border-border/50 w-full">
        <AnimatePresence>
          {array.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative group flex flex-col items-center"
            >
              <div className="text-xs text-muted-foreground mb-1 font-mono">{index}</div>
              <div className="w-16 h-16 bg-primary/20 border border-primary text-foreground font-bold flex items-center justify-center rounded-lg shadow-sm">
                {item}
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(index)}
              >
                &times;
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
        {array.length === 0 && (
          <p className="text-muted-foreground">Array is empty.</p>
        )}
      </div>
    </div>
  );
}
