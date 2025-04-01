
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Loader2 } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculationData: {
    emi: number;
    totalInterest: number;
    totalAmount: number;
    principal: number;
    tenure: number;
    interestRate: number;
  };
}

// Mock email sending function (would be replaced by a real API call in production)
const sendEmailReport = (email: string, data: any): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      console.log('Email sent to:', email, 'with data:', data);
      resolve(true);
    }, 2000);
  });
};

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, calculationData }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async () => {
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendEmailReport(email, calculationData);
      toast({
        title: "Success!",
        description: "The loan calculation has been sent to your email.",
        variant: "default",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Loan Calculation</DialogTitle>
          <DialogDescription>
            Send your loan calculation details to your email for future reference.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="col-span-3"
              type="email"
            />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">You will receive:</p>
            <ul className="text-xs space-y-1 text-gray-500">
              <li>• Detailed EMI calculation</li>
              <li>• Complete loan amortization schedule</li> 
              <li>• Payment breakdown charts</li>
              <li>• Loan summary in PDF format</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSendEmail} 
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
