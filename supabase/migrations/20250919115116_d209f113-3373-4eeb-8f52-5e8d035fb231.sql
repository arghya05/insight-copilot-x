-- Insert Freight Cost Analysis question
INSERT INTO public.questions (question_text, answer_text, category) VALUES (
  'Analyze quarterly freight cost anomalies and budget variances',
  'Based on Q3 2024 analysis, we identified several significant freight cost anomalies:

**Key Findings:**
- 23% increase in last-mile delivery costs due to fuel price volatility
- $2.3M budget variance in international shipping rates
- Regional variations: West Coast routes showing 18% cost increase vs. 8% decrease in Southeast corridors
- Peak season surcharges applied 3 weeks earlier than historical average

**Cost Drivers:**
- Fuel costs increased 15% quarter-over-quarter
- Carrier capacity constraints in key lanes (LA-Chicago, NYC-Miami)
- Dimensional weight pricing changes from major carriers
- Extended transit times increasing storage and handling fees

**Recommendations:**
1. Negotiate fuel surcharge caps with primary carriers
2. Diversify carrier portfolio to reduce dependency risk
3. Implement dynamic routing optimization to avoid high-cost lanes
4. Consider freight consolidation opportunities to achieve better rates
5. Establish quarterly rate review cycles with all transportation partners

**Financial Impact:**
- Current overspend: $2.3M against Q3 budget
- Projected annual impact: $8.7M if trends continue
- Potential savings from recommendations: $3.2M annually',
  'cost_analysis'
);

-- Insert Supplier Risk Analysis question  
INSERT INTO public.questions (question_text, answer_text, category) VALUES (
  'Review contract compliance issues and risk assessments',
  'Comprehensive supplier risk assessment reveals critical compliance gaps requiring immediate attention:

**High-Risk Suppliers (15 total):**
- Tier 1: GlobalTech Solutions - Contract compliance at 72%, payment delays averaging 45 days
- Tier 1: Pacific Manufacturing - Quality non-conformance rate of 8.3%, up from 3.1% last quarter
- Tier 2: Regional Logistics Partners - On-time delivery dropped to 82% (target: 95%)

**Compliance Issues:**
- 31% of suppliers missing required certifications (ISO 9001, environmental standards)
- $1.8M in penalties from contract non-compliance incidents
- 28 suppliers operating under expired contracts or pending renewals
- Quality audit failures in 12% of facilities (target: <5%)

**Risk Categories:**
- Financial Risk: 8 suppliers showing declining credit ratings
- Operational Risk: Single-source dependencies in 23 critical components
- Regulatory Risk: 6 suppliers in regions with changing trade regulations
- ESG Risk: 14 suppliers lacking sustainability compliance documentation

**Mitigation Actions:**
1. Implement monthly compliance scorecards for Tier 1 suppliers
2. Establish backup suppliers for single-source dependencies
3. Require quarterly financial health assessments
4. Launch supplier development program for underperforming partners
5. Create contract standardization template with clear KPIs

**Expected Outcomes:**
- Reduce supplier-related disruptions by 40%
- Improve overall compliance rate to 95% within 6 months
- Decrease contract-related penalties by $1.2M annually',
  'risk_analysis'
);

-- Get question IDs for follow-up questions
DO $$
DECLARE
    freight_question_id uuid;
    supplier_question_id uuid;
BEGIN
    -- Get the freight cost analysis question ID
    SELECT id INTO freight_question_id 
    FROM public.questions 
    WHERE question_text = 'Analyze quarterly freight cost anomalies and budget variances';
    
    -- Get the supplier risk analysis question ID
    SELECT id INTO supplier_question_id 
    FROM public.questions 
    WHERE question_text = 'Review contract compliance issues and risk assessments';
    
    -- Insert follow-up questions for Freight Cost Analysis
    INSERT INTO public.follow_up_questions (parent_question_id, question_text) VALUES
    (freight_question_id, 'What are the top 3 carrier performance metrics we should track?'),
    (freight_question_id, 'How can we better predict and budget for fuel surcharge fluctuations?'),
    (freight_question_id, 'Which shipping lanes have the highest cost variance and why?'),
    (freight_question_id, 'What freight consolidation opportunities exist in our current network?');
    
    -- Insert follow-up questions for Supplier Risk Analysis
    INSERT INTO public.follow_up_questions (parent_question_id, question_text) VALUES
    (supplier_question_id, 'Which suppliers pose the highest financial risk to our operations?'),
    (supplier_question_id, 'What backup supplier options exist for our single-source dependencies?'),
    (supplier_question_id, 'How do our supplier ESG scores compare to industry benchmarks?'),
    (supplier_question_id, 'What are the key contract terms that need standardization across suppliers?');
END $$;