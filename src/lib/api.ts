// API service layer for Algonomy Supply Chain Control Tower
// Replace these placeholder endpoints with your actual backend APIs

const API_BASE_URL = process.env.VITE_API_URL || 'https://your-api-endpoint.com/api';

export interface SearchResult {
  documents: Array<{
    id: string;
    title: string;
    type: string;
    relevanceScore: number;
  }>;
}

export interface AnalysisResponse {
  what: string;
  why: string;
  recommendation: string;
  references: Array<{
    document: string;
    excerpt: string;
    page?: number;
  }>;
}

export interface Anomaly {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  impact: string;
  detectedAt: Date;
  supplyChainId: string;
}

// Example API service functions
export const apiService = {
  // Search for relevant documents
  async searchDocuments(query: string): Promise<SearchResult> {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    return response.json();
  },

  // Get AI analysis for a query
  async getAnalysis(query: string, docIds: string[]): Promise<AnalysisResponse> {
    const response = await fetch(`${API_BASE_URL}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        docIds
      }),
    });
    return response.json();
  },

  // Get PDF with highlighting
  async getPdfWithHighlights(docId: string, highlight?: string): Promise<Blob> {
    const url = `${API_BASE_URL}/pdf/${docId}${highlight ? `?highlight=${encodeURIComponent(highlight)}` : ''}`;
    const response = await fetch(url);
    return response.blob();
  },

  // Get anomalies for a supply chain
  async getAnomalies(supplyChainId: string): Promise<Anomaly[]> {
    const response = await fetch(`${API_BASE_URL}/anomalies?supplyChainId=${supplyChainId}`);
    return response.json();
  },

  // Additional endpoint examples for supply chain operations
  async getFreightAnalysis(routeId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/freight/${routeId}/analysis`);
    return response.json();
  },

  async getContractAnalysis(contractId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/analysis`);
    return response.json();
  },

  async getFinanceAnomalies(timeframe: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/finance/anomalies?timeframe=${timeframe}`);
    return response.json();
  }
};