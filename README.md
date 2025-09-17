# Enterprise Insight Copilot

A modern, Perplexity-inspired AI assistant for supply chain and document analysis. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Intelligent Q&A**: Ask natural language questions about supply chain, freight, contracts, and finance
- **Structured Responses**: Get answers in clear "What/Why/Recommendation" format
- **Document Integration**: View PDFs with highlighted relevant sections
- **Anomaly Detection**: Automatic detection and alerting for supply chain issues
- **Interactive Interface**: Suggested questions and clickable insights

## Architecture

### Frontend (React/TypeScript)
- **Split-screen layout**: Chat interface + document viewer
- **Modern design system**: Enterprise-grade styling with proper semantic tokens
- **Real-time updates**: Dynamic content loading and highlighting

### Backend Integration (Placeholder APIs)

Replace the placeholder endpoints in `src/lib/api.ts` with your actual backend services:

#### Core Endpoints

```typescript
// Document Search
GET /api/search?query=<string>
Response: { documents: [{ id, title, type, relevanceScore }] }

// AI Analysis  
POST /api/answer
Body: { query: string, docIds: string[] }
Response: { what, why, recommendation, references[] }

// PDF Viewer with Highlighting
GET /api/pdf/{docId}?highlight=<string>
Response: PDF blob with highlight coordinates

// Anomaly Detection
GET /api/anomalies?supplyChainId=<string>
Response: [{ type, severity, description, impact }]
```

#### Supply Chain Specific Endpoints

```typescript
// Freight Analysis
GET /api/freight/{routeId}/analysis

// Contract Analysis  
GET /api/contracts/{contractId}/analysis

// Finance Anomalies
GET /api/finance/anomalies?timeframe=<string>
```

## Quick Start

1. **Clone and install**:
   ```bash
   npm install
   npm run dev
   ```

2. **Configure your API endpoints**:
   - Update `src/lib/api.ts` with your backend URLs
   - Set environment variables for API authentication

3. **Customize for your domain**:
   - Update sample data in components
   - Modify question suggestions
   - Add your document types and classifications

## Sample Interaction Flow

1. **User asks**: "What anomalies are in freight invoices last month?"

2. **System responds** with structured analysis:
   - **What Happened**: Specific anomalies found
   - **Why It Happened**: Root cause analysis  
   - **Recommendation**: Actionable next steps

3. **Document viewer** opens with highlighted evidence

4. **Follow-up questions** appear as clickable chips

## Customization

### Design System
All colors, fonts, and spacing are defined in `src/index.css` and `tailwind.config.ts`. Modify these files to match your brand.

### Sample Data
Update the sample messages and questions in `src/components/ChatArea.tsx` to reflect your actual use cases.

### Document Types
Modify `src/components/DocumentViewer.tsx` to handle your specific document formats and metadata.

## Deployment

Built with Vite for fast development and optimized production builds:

```bash
npm run build
```

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components  
- **Lucide React** for icons
- **React Router** for navigation
