-- Create questions table to store all questions and their answers
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create follow_up_questions table to store related questions
CREATE TABLE public.follow_up_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversation_history table to track user interactions
CREATE TABLE public.conversation_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  follow_up_questions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_questions_text ON public.questions USING gin(to_tsvector('english', question_text));
CREATE INDEX idx_questions_category ON public.questions(category);
CREATE INDEX idx_follow_up_parent ON public.follow_up_questions(parent_question_id);
CREATE INDEX idx_conversation_created ON public.conversation_history(created_at DESC);

-- Enable Row Level Security (public data for this use case)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_history ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Questions are publicly readable" 
ON public.questions 
FOR SELECT 
USING (true);

CREATE POLICY "Follow-up questions are publicly readable" 
ON public.follow_up_questions 
FOR SELECT 
USING (true);

CREATE POLICY "Conversation history is publicly readable" 
ON public.conversation_history 
FOR SELECT 
USING (true);

-- Allow public insert for conversation history
CREATE POLICY "Anyone can insert conversation history" 
ON public.conversation_history 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the provided questions and answers
INSERT INTO public.questions (question_text, answer_text, category) VALUES
-- Main detailed questions
('What are the main freight cost anomalies this quarter?', 'Based on our Q3 analysis, we''ve identified three major freight cost anomalies: 1) 15% spike in cross-border shipping rates due to new customs regulations, 2) 23% increase in last-mile delivery costs in urban areas, particularly affecting routes through major metropolitan centers, and 3) Unexpected fuel surcharges averaging $2.30 per shipment due to recent oil price volatility. These anomalies have resulted in approximately $1.2M in additional costs compared to budget projections.', 'freight'),

('Which suppliers have the highest contract compliance risk?', 'Our compliance risk assessment identifies the following high-risk suppliers: MegaCorp Industries (78% compliance score) showing consistent late deliveries and quality deviations, Global Manufacturing Ltd (71% score) with recurring documentation issues and missed sustainability targets, and Regional Suppliers Inc (69% score) exhibiting payment term violations and inconsistent ESG reporting. These suppliers account for 34% of our total procurement spend and require immediate attention through enhanced monitoring and potential contract renegotiation.', 'suppliers'),

-- Additional questions
('What''s the ROI on our last supply chain automation project?', 'The supply chain automation project implemented last quarter has delivered a 187% ROI with $2.4M in cost savings against a $1.28M investment. Key benefits include 45% reduction in manual processing time, 68% decrease in order fulfillment errors, and 32% improvement in inventory accuracy. The project has also enabled reallocation of 12 FTEs to higher-value strategic activities.', 'automation'),

('Which regions have the highest transportation costs?', 'Transportation cost analysis reveals: Asia-Pacific region leads at $0.74 per kg shipped, driven by complex logistics networks and fuel costs. Europe follows at $0.61 per kg due to regulatory compliance and cross-border fees. North America shows $0.52 per kg with recent increases from driver shortages. Latin America and Africa show lower absolute costs but higher variability due to infrastructure challenges.', 'transportation'),

('How do weather patterns affect our logistics performance?', 'Weather impact analysis shows seasonal variations significantly affect performance: Winter storms cause 23% increase in delivery delays across northern routes. Hurricane season disrupts 15% of Southeast operations annually. Extreme heat events reduce truck capacity by 8% in desert regions. Flooding affects 12% of warehouse operations during peak rainfall seasons. We''ve implemented predictive weather routing to mitigate 35% of weather-related delays.', 'logistics'),

('What''s our average supplier onboarding time?', 'Current supplier onboarding averages 47 days from initial contact to first purchase order. This breaks down as: Due diligence and compliance checks (18 days), contract negotiation (12 days), system integration and testing (11 days), and final approvals (6 days). We''ve identified opportunities to reduce this by 28% through digital documentation and parallel processing workflows.', 'suppliers'),

('Which product categories have the most stockouts?', 'Stockout analysis by category: Electronics components lead with 8.3% stockout rate due to semiconductor shortages. Seasonal items show 6.7% during peak demand periods. Fast-moving consumer goods average 4.2% stockouts, primarily during promotional periods. Raw materials maintain 3.1% stockout rate, mostly from supplier capacity constraints. Implementation of advanced demand sensing has reduced overall stockouts by 22%.', 'inventory'),

('How effective are our demand forecasting models?', 'Our current demand forecasting achieves 84% accuracy across all product categories. Machine learning models outperform traditional methods by 12% for fast-moving items. Seasonal products show 78% accuracy with room for improvement in trend detection. New product launches maintain 71% forecast accuracy. Integration of external data sources (weather, economic indicators) has improved accuracy by 9% this quarter.', 'forecasting'),

('What''s the impact of fuel price volatility?', 'Fuel price volatility has created $3.2M in additional transportation costs this year, representing 7.8% above budget. Every $0.10 increase per gallon translates to approximately $185K monthly impact across our fleet. We''ve implemented fuel hedging strategies covering 65% of exposure and optimized routing to reduce fuel consumption by 11%. Dynamic fuel surcharge mechanisms with customers cover 78% of volatility impact.', 'transportation'),

('Which suppliers provide the best quality metrics?', 'Top performing suppliers by quality metrics: Premium Manufacturing Corp (99.2% quality score, 0.3% defect rate), Excellence Industries (98.7% score, 0.5% defect rate), and Quality First Ltd (98.4% score, 0.6% defect rate). These suppliers demonstrate consistent performance across delivery timeliness, product specifications, and documentation accuracy. They represent our benchmark for supplier development programs.', 'suppliers'),

('How do trade tariffs affect our sourcing strategy?', 'Current tariff impacts total $4.7M annually across affected categories. Steel products face 25% tariffs adding $1.8M costs. Electronics components subject to 15% tariffs contribute $2.1M impact. We''ve diversified sourcing to reduce tariff exposure by 34% through alternative country strategies and domestic suppliers. Duty optimization through classification reviews saved additional $800K this year.', 'sourcing'),

('What''s our carbon footprint from transportation?', 'Transportation carbon footprint totals 12,450 metric tons CO2 annually. Breakdown: Long-haul trucking (58%), air freight (23%), ocean freight (12%), last-mile delivery (7%). We''ve reduced emissions by 16% through route optimization, modal shift to rail, and electric vehicle deployment. Carbon offset programs cover 100% of remaining emissions at $1.2M annual cost.', 'sustainability'),

('Which warehouses have the highest operating costs?', 'Operating cost analysis per square foot: Metro Distribution Center leads at $8.70/sq ft due to high labor costs and urban location premiums. Coastal Facility follows at $7.20/sq ft with energy and regulatory compliance costs. Regional Hub shows $6.50/sq ft with moderate efficiency levels. Rural facilities average $4.80/sq ft with lower labor costs but higher transportation expenses for staffing.', 'warehouses'),

('How do seasonal patterns affect inventory levels?', 'Seasonal inventory patterns show significant variations: Q4 holiday season requires 65% inventory increase across consumer goods. Summer months see 40% rise in outdoor equipment stock. Back-to-school period demands 35% electronics inventory boost. Spring gardening season necessitates 45% increase in related products. Dynamic inventory planning reduces carrying costs by $2.3M while maintaining 97% service levels.', 'inventory'),

('What''s the average time to resolve supplier disputes?', 'Supplier dispute resolution averages 23 days from initial escalation to final resolution. Payment disputes resolve fastest at 12 days average. Quality issues take 28 days due to investigation requirements. Contract interpretation disputes average 35 days involving legal review. Implementation of structured escalation processes and automated tracking has reduced resolution time by 31% year-over-year.', 'suppliers'),

('Which trade lanes show the most delays?', 'Trade lane delay analysis: Asia-US West Coast averages 4.2 days delay due to port congestion. Europe-US East Coast shows 3.8 days delays from customs processing. Intra-Asia routes experience 2.7 days delays during peak seasons. Mexico-US lanes maintain 1.5 days average delays from border processing. We''ve established alternative routing options reducing critical shipment delays by 42%.', 'logistics'),

('How does our performance compare to industry benchmarks?', 'Performance vs. industry benchmarks: Order fulfillment accuracy at 98.7% exceeds industry average of 96.2%. Inventory turnover of 8.4x surpasses benchmark of 7.1x. On-time delivery at 94.3% matches top quartile performance. Cost per order at $47.50 is 12% below industry median. Supply chain responsiveness ranks in 85th percentile for our industry segment.', 'benchmarks'),

('What''s the total cost of ownership for our logistics network?', 'Total logistics network TCO equals $47.8M annually. Breakdown: Transportation (58% - $27.7M), warehousing operations (22% - $10.5M), technology systems (8% - $3.8M), labor costs (7% - $3.3M), facilities maintenance (3% - $1.4M), and insurance/risk management (2% - $1.1M). Network optimization initiatives target 12% TCO reduction over 24 months through automation and route consolidation.', 'logistics'),

('Which suppliers have the best ESG ratings?', 'Top ESG-rated suppliers: Sustainable Solutions Inc (AAA rating, carbon neutral operations), Green Manufacturing Corp (AA+ rating, 100% renewable energy), and Ethical Sourcing Ltd (AA rating, certified fair trade practices). These suppliers represent 28% of our spend and demonstrate leadership in environmental stewardship, social responsibility, and governance practices. They serve as models for our broader supplier development program.', 'suppliers'),

('How do geopolitical events impact supply continuity?', 'Geopolitical risk assessment shows potential $8.3M annual supply disruption exposure. Key vulnerabilities: 34% of critical components sourced from politically sensitive regions, 23% of suppliers located in areas with regulatory uncertainty. We''ve established dual-sourcing for 67% of critical materials and maintained strategic inventory buffers worth $3.1M to ensure 90-day supply continuity during disruptions.', 'risk'),

('What''s the financial impact of product recalls?', 'Product recall financial impact totals $2.7M over the past 24 months. Direct costs include product retrieval ($1.2M), customer notifications ($400K), replacement products ($800K), and regulatory compliance ($300K). Indirect costs from brand impact and customer service are estimated at additional $1.8M. Enhanced quality systems investment of $500K has reduced recall frequency by 78%.', 'quality'),

('Which distribution channels are most cost-effective?', 'Distribution channel cost analysis per unit: Direct-to-consumer online ($3.20 per unit), retail partnerships ($4.60 per unit), wholesale distribution ($5.80 per unit), and third-party marketplaces ($6.40 per unit including fees). Online channels provide highest margins but require significant fulfillment investment. Hybrid approach optimization has improved overall channel efficiency by 24%.', 'distribution'),

('How do labor shortages affect our operations?', 'Labor shortage impact includes 18% increase in warehouse wages, 23% longer recruitment cycles, and 15% higher overtime costs totaling $1.9M annually. Critical positions experience 67% longer time-to-fill rates. We''ve implemented automation for 35% of manual tasks, cross-training programs, and flexible scheduling to mitigate impacts. Temporary staffing partnerships provide 20% operational capacity buffer.', 'labor'),

('What''s the average lead time for critical components?', 'Critical component lead times average 47 days, up from 32 days pre-pandemic. Semiconductor components lead at 89 days average. Electronic assemblies require 56 days. Mechanical components average 38 days. Raw materials maintain 21 days lead time. Strategic partnerships and forward purchasing agreements have secured priority allocation for 73% of critical components, reducing supply risk.', 'procurement'),

('Which suppliers offer the best payment terms?', 'Favorable payment terms analysis: Regional Manufacturing Corp offers Net 90 with 3% early payment discount. Global Suppliers Ltd provides Net 75 with flexible payment scheduling. Premium Materials Inc offers Net 60 with seasonal adjustment options. Average payment terms across all suppliers: Net 52 days. Working capital optimization through payment term improvements has generated $2.4M cash flow benefit annually.', 'suppliers'),

('How do we measure supplier innovation contribution?', 'Supplier innovation metrics include: New product development contributions (24 innovations this year), cost reduction suggestions ($3.7M savings implemented), process improvements (31 initiatives adopted), and sustainability innovations (18 environmental improvements). Top innovative suppliers: TechForward Industries (12 innovations), Advanced Solutions Corp (9 innovations), and Innovation Partners Ltd (7 innovations). Innovation bonuses totaled $450K this year.', 'innovation'),

('What''s the cost impact of regulatory compliance changes?', 'Regulatory compliance cost impact totals $5.8M annually. New environmental regulations account for $2.3M in facility upgrades and process changes. Safety compliance updates require $1.7M investment. Data privacy requirements demand $900K in system enhancements. Trade regulation changes cost $600K in documentation and training. Proactive compliance monitoring prevents estimated $12M in potential penalties and disruptions.', 'compliance');

-- Insert common follow-up questions for the main detailed questions
INSERT INTO public.follow_up_questions (parent_question_id, question_text) 
SELECT q.id, fq.question_text 
FROM public.questions q
CROSS JOIN (
  VALUES 
    ('What specific routes are most affected by these anomalies?'),
    ('How can we mitigate these freight cost increases?'),
    ('What''s the projected impact for next quarter?'),
    ('Which carriers are contributing most to these costs?'),
    ('What alternative shipping methods should we consider?')
) AS fq(question_text)
WHERE q.question_text = 'What are the main freight cost anomalies this quarter?';

INSERT INTO public.follow_up_questions (parent_question_id, question_text) 
SELECT q.id, fq.question_text 
FROM public.questions q
CROSS JOIN (
  VALUES 
    ('What corrective actions are being taken with these suppliers?'),
    ('How often should we reassess supplier compliance?'),
    ('What backup suppliers do we have available?'),
    ('What are the potential contract penalties?'),
    ('How do these risks compare to last quarter?')
) AS fq(question_text)
WHERE q.question_text = 'Which suppliers have the highest contract compliance risk?';