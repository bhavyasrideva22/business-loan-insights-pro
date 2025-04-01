
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from '@/components/ui/use-toast';

interface CalculatorResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  principal: number;
  tenure: number;
  interestRate: number;
}

// Format currency for PDF
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const generatePDF = async (result: CalculatorResult) => {
  try {
    const { emi, totalInterest, totalAmount, principal, tenure, interestRate } = result;
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add header with logo and date
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    });
    
    // Add colors
    const primaryColor = '#245e4f';
    const secondaryColor = '#7ac9a7';
    const accentColor = '#e9c46a';
    
    // Header
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    pdf.setFontSize(22);
    pdf.setTextColor(primaryColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Business Loan EMI Calculator', 20, 20);
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Generated on: ${currentDate}`, 20, 30);
    
    // Add divider
    pdf.setDrawColor(230, 230, 230);
    pdf.line(20, 45, pageWidth - 20, 45);
    
    // Loan parameters section
    pdf.setFontSize(16);
    pdf.setTextColor(primaryColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Loan Parameters', 20, 60);
    
    const parameterStartY = 70;
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.setFont(undefined, 'normal');
    
    const drawParameter = (label: string, value: string, y: number) => {
      pdf.setFont(undefined, 'normal');
      pdf.text(label, 20, y);
      pdf.setFont(undefined, 'bold');
      pdf.text(value, 100, y);
    };
    
    drawParameter('Loan Amount:', formatCurrency(principal), parameterStartY);
    drawParameter('Interest Rate:', `${interestRate.toFixed(2)}% p.a.`, parameterStartY + 10);
    drawParameter('Loan Tenure:', `${tenure} months (${(tenure / 12).toFixed(1)} years)`, parameterStartY + 20);
    
    // Add divider
    pdf.setDrawColor(230, 230, 230);
    pdf.line(20, parameterStartY + 30, pageWidth - 20, parameterStartY + 30);
    
    // Loan summary section
    pdf.setFontSize(16);
    pdf.setTextColor(primaryColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Loan Summary', 20, parameterStartY + 45);
    
    // Add colorful boxes for EMI, Total Interest, Total Amount
    const boxWidth = (pageWidth - 40) / 3 - 5;
    const boxHeight = 40;
    const boxStartY = parameterStartY + 55;
    
    // Box 1 - EMI
    pdf.setFillColor(primaryColor);
    pdf.roundedRect(20, boxStartY, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text('Monthly EMI', 20 + boxWidth/2 - 15, boxStartY + 15);
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    pdf.text(formatCurrency(emi), 20 + boxWidth/2 - 25, boxStartY + 30);
    
    // Box 2 - Principal Amount
    pdf.setFillColor(secondaryColor);
    pdf.roundedRect(20 + boxWidth + 5, boxStartY, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text('Principal Amount', 20 + boxWidth + 5 + boxWidth/2 - 25, boxStartY + 15);
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    pdf.text(formatCurrency(principal), 20 + boxWidth + 5 + boxWidth/2 - 25, boxStartY + 30);
    
    // Box 3 - Total Interest
    pdf.setFillColor(accentColor);
    pdf.roundedRect(20 + (boxWidth + 5) * 2, boxStartY, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text('Total Interest', 20 + (boxWidth + 5) * 2 + boxWidth/2 - 20, boxStartY + 15);
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    pdf.text(formatCurrency(totalInterest), 20 + (boxWidth + 5) * 2 + boxWidth/2 - 25, boxStartY + 30);
    
    // Total Payment
    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(20, boxStartY + boxHeight + 10, pageWidth - 40, 30, 3, 3, 'F');
    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text('Total Amount to be Paid', 30, boxStartY + boxHeight + 25);
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(primaryColor);
    pdf.text(formatCurrency(totalAmount), pageWidth - 60, boxStartY + boxHeight + 25);
    
    // Display breakdown
    const breakdownStartY = boxStartY + boxHeight + 50;
    pdf.setFontSize(16);
    pdf.setTextColor(primaryColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Payment Breakdown', 20, breakdownStartY);
    
    // Principal vs Interest pie chart representation (text only here)
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.setFont(undefined, 'normal');
    
    const principalPercent = ((principal / totalAmount) * 100).toFixed(1);
    const interestPercent = ((totalInterest / totalAmount) * 100).toFixed(1);
    
    pdf.text(`Principal: ${principalPercent}% of total payment`, 20, breakdownStartY + 20);
    pdf.text(`Interest: ${interestPercent}% of total payment`, 20, breakdownStartY + 30);
    
    // Add color legend
    pdf.setFillColor(primaryColor);
    pdf.rect(15, breakdownStartY + 17, 3, 3, 'F');
    pdf.setFillColor(accentColor);
    pdf.rect(15, breakdownStartY + 27, 3, 3, 'F');
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Business Loan EMI Calculator | business-loan-insights-pro.com', 20, pageHeight - 20);
    pdf.text('Page 1 of 1', pageWidth - 40, pageHeight - 20);
    
    // Disclaimers
    pdf.setFontSize(8);
    pdf.text('Disclaimer: This is an estimate and actual values may vary based on your lender\'s terms and conditions.', 
      20, pageHeight - 30);
      
    // Save the PDF
    pdf.save('Business_Loan_EMI_Calculator.pdf');
    return true;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
