
import React from 'react';
import LoanCalculator from '@/components/LoanCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, Calculator, ChevronDown, ChevronUp, Calendar, BarChart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Calculator className="mr-2 h-6 w-6" />
                Business Loan Insights Pro
              </h1>
              <p className="text-sm md:text-base mt-2 text-primary-foreground/80">
                Empowering financial decisions for business growth
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <LoanCalculator />
        
        <section className="max-w-screen-xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-shadow hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Precise Calculations</h3>
                <p className="text-gray-600">
                  Get accurate EMI calculations based on principal amount, interest rate, and loan tenure.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-shadow hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-secondary/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visual Insights</h3>
                <p className="text-gray-600">
                  Understand your loan better with interactive charts and payment breakdowns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-shadow hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Repayment Planning</h3>
                <p className="text-gray-600">
                  Plan your business finances with a detailed amortization schedule.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-shadow">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Business Loan EMI Calculator</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Our Business Loan EMI Calculator is a powerful financial tool designed specifically for entrepreneurs and business owners who need to plan their business financing accurately. This calculator helps you understand the monthly financial commitment required for your business loan, enabling better cash flow planning and financial management.
              </p>
              
              <Separator className="my-6" />
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">
                    What is a Business Loan EMI Calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      A Business Loan EMI (Equated Monthly Installment) Calculator is a financial tool that helps entrepreneurs and business owners calculate the monthly repayment amount for their business loans. It takes into account three key parameters: the loan amount (principal), interest rate, and loan tenure to provide an accurate estimate of your monthly obligations.
                    </p>
                    <p>
                      The calculator uses the standard EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the loan tenure in months. This sophisticated mathematical calculation would be cumbersome to perform manually, making our calculator an essential tool for business financial planning.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">
                    Benefits of Using Our Business Loan EMI Calculator
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Financial Planning:</strong> Accurately forecast your monthly cash outflows related to loan repayments.</li>
                      <li><strong>Loan Comparison:</strong> Compare different loan offers with varying interest rates and tenures to find the most suitable option for your business.</li>
                      <li><strong>Budget Management:</strong> Ensure your business can accommodate the loan EMI without affecting operational expenses.</li>
                      <li><strong>Transparency:</strong> Understand exactly how much interest you'll pay over the entire loan tenure.</li>
                      <li><strong>Time-Saving:</strong> Get instant calculations without manual computation or spreadsheet formulas.</li>
                      <li><strong>Visual Representation:</strong> Our interactive charts help visualize the loan amortization schedule and payment breakdown.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">
                    How to Use the Business Loan EMI Calculator
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>
                        <strong>Enter Loan Amount:</strong> Input the principal amount you wish to borrow for your business. Our calculator supports a wide range from ₹10,000 to ₹10,00,00,000.
                      </li>
                      <li>
                        <strong>Set Interest Rate:</strong> Enter the annual interest rate offered by your lender. This is typically between 8% and 24% for business loans in India, depending on various factors like your business credit score, revenue, and industry sector.
                      </li>
                      <li>
                        <strong>Choose Loan Tenure:</strong> Select the repayment period in months. Business loans typically range from 12 months (1 year) to 84 months (7 years).
                      </li>
                      <li>
                        <strong>View Results:</strong> The calculator will instantly display your monthly EMI, total interest payable, and the total amount you will repay over the loan tenure.
                      </li>
                      <li>
                        <strong>Analyze Charts:</strong> Explore the payment breakdown charts and amortization schedule to understand how your payments will be distributed between principal and interest over time.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold">
                    Factors Affecting Business Loan EMI
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Several key factors influence the EMI amount for your business loan:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Loan Amount:</strong> Higher loan amounts result in higher EMIs if other parameters remain constant. Consider borrowing only what your business genuinely needs.
                      </li>
                      <li>
                        <strong>Interest Rate:</strong> A higher interest rate increases your EMI and the total interest outflow. Even a 1% difference can significantly impact the total cost of the loan for larger amounts.
                      </li>
                      <li>
                        <strong>Loan Tenure:</strong> Longer tenures reduce the monthly EMI but increase the total interest paid over the life of the loan. Shorter tenures mean higher EMIs but lower overall interest costs.
                      </li>
                      <li>
                        <strong>Processing Fees and Other Charges:</strong> While these don't affect the EMI calculation directly, they impact the effective cost of borrowing and should be considered in your financial planning.
                      </li>
                      <li>
                        <strong>Prepayment Options:</strong> Some loans allow partial or full prepayment, which can reduce your interest burden. Check if your lender offers this flexibility.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold">
                    Types of Business Loans in India
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Our calculator is versatile and can be used for various types of business loans available in India:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Term Loans:</strong> Traditional business loans with fixed or floating interest rates, typically used for expansion, equipment purchase, or working capital.
                      </li>
                      <li>
                        <strong>MSME Loans:</strong> Specialized loans for Micro, Small, and Medium Enterprises with potentially subsidized interest rates under government schemes.
                      </li>
                      <li>
                        <strong>Working Capital Loans:</strong> Short to medium-term financing to manage day-to-day operational expenses of your business.
                      </li>
                      <li>
                        <strong>Equipment Financing:</strong> Loans specifically for purchasing business equipment where the equipment itself serves as collateral.
                      </li>
                      <li>
                        <strong>Business Expansion Loans:</strong> Tailored for growing businesses looking to expand operations, open new locations, or enter new markets.
                      </li>
                      <li>
                        <strong>Startup Loans:</strong> Designed for new businesses, often with special terms to accommodate the unique challenges of startups.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-semibold">
                    Strategic Financial Planning for Businesses
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Using our Business Loan EMI Calculator as part of your broader financial strategy can help you:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Optimize Debt Structure:</strong> Determine the ideal balance between loan amount and tenure to align with your business cash flows.
                      </li>
                      <li>
                        <strong>Plan for Growth:</strong> Calculate how different loan scenarios could fund expansion while maintaining healthy financials.
                      </li>
                      <li>
                        <strong>Manage Seasonal Variations:</strong> Understand how loan repayments will affect your business during both peak and lean seasons.
                      </li>
                      <li>
                        <strong>Tax Planning:</strong> Interest paid on business loans is generally tax-deductible. Our calculator helps you estimate these deductions for tax planning purposes.
                      </li>
                      <li>
                        <strong>Refinancing Analysis:</strong> Evaluate whether refinancing existing loans at current interest rates would be beneficial for your business.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator className="my-6" />
              
              <h3 className="text-xl font-semibold mb-4">Making Informed Financial Decisions for Business Growth</h3>
              <p className="text-gray-700 mb-4">
                In today's competitive business environment, making informed financial decisions is crucial for sustainable growth. Our Business Loan EMI Calculator empowers entrepreneurs with the insights needed to optimize their borrowing strategy, manage cash flows effectively, and plan for long-term success.
              </p>
              
              <p className="text-gray-700 mb-4">
                Whether you're considering expanding your operations, investing in new equipment, or need working capital to seize a market opportunity, understanding the complete financial implications of your loan is essential. Our calculator gives you this clarity instantly, allowing you to proceed with confidence.
              </p>
              
              <p className="text-gray-700">
                Remember that while our calculator provides highly accurate estimates, the final terms of your business loan will depend on your lender's policies, your business credit profile, and prevailing market conditions. Always consult with a financial advisor or your lender for personalized guidance tailored to your specific business circumstances.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Business Loan Insights Pro</h3>
              <p className="text-sm text-primary-foreground/80">
                Your trusted partner for business loan calculations and financial planning.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Business Loan EMI Calculator</li>
                <li>Financial Planning Resources</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Disclaimer</h4>
              <p className="text-xs text-primary-foreground/70">
                The calculations provided by this calculator are for illustrative purposes only. Actual loan terms, EMI amounts, and total costs may vary based on lender policies, your business profile, and other factors.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Business Loan Insights Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
