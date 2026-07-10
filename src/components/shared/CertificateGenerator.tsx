"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download, Award, Loader2 } from "lucide-react";

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  uniqueId: string;
}

export default function CertificateGenerator({ studentName, courseName, completionDate, uniqueId }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a", // Match dark mode slate-900
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CodeVerse-Certificate-${studentName.replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Hidden container for rendering the certificate off-screen to get high quality without blowing up the UI */}
      <div className="relative w-full overflow-hidden flex justify-center">
        <div 
          ref={certificateRef}
          className="w-[800px] h-[565px] bg-slate-900 text-white p-12 border-8 border-primary/20 relative shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ backgroundImage: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)" }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-primary/40 -translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-primary/40 translate-x-4 translate-y-4"></div>
          
          <Award className="w-20 h-20 text-primary mb-6" />
          
          <h1 className="text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            Certificate of Completion
          </h1>
          
          <p className="text-xl text-slate-400 mt-6 mb-4">This is to certify that</p>
          
          <h2 className="text-4xl font-serif font-bold text-white mb-4 border-b-2 border-primary/50 pb-2 px-12">
            {studentName}
          </h2>
          
          <p className="text-lg text-slate-400 mt-4 mb-2">has successfully completed the course</p>
          
          <h3 className="text-2xl font-bold text-blue-300 mb-12">
            {courseName}
          </h3>
          
          <div className="flex justify-between w-full px-12 mt-auto border-t border-slate-700 pt-6">
            <div className="text-left">
              <p className="text-sm text-slate-400">Date of Completion</p>
              <p className="font-semibold">{completionDate}</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-white/10 flex items-center justify-center mx-auto mb-2 rounded border border-white/20">
                <span className="text-[10px] text-slate-400 text-center">QR Code<br/>Placeholder</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-slate-400">Certificate ID</p>
              <p className="font-mono text-sm">{uniqueId}</p>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={downloadPDF} disabled={isGenerating} size="lg" className="w-full sm:w-auto">
        {isGenerating ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF...</>
        ) : (
          <><Download className="mr-2 h-4 w-4" /> Download Certificate</>
        )}
      </Button>
    </div>
  );
}
