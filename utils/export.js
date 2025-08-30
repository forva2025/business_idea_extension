class ExportUtils {
    constructor() {
      this.currentDate = new Date().toISOString().split('T')[0];
    }
  
    exportToPDF(data) {
      try {
        // Create HTML content for PDF
        const htmlContent = this.generatePDFContent(data);
        
        // Create a new window for PDF generation
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
          throw new Error('Popup blocked. Please allow popups for this site.');
        }
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Trigger print dialog
        printWindow.onload = () => {
          try {
            printWindow.print();
            setTimeout(() => printWindow.close(), 1000);
          } catch (printError) {
            console.error('Print error:', printError);
            printWindow.close();
          }
        };
      } catch (error) {
        console.error('PDF export error:', error);
        throw error;
      }
    }
  
    generatePDFContent(data) {
      const { businessIdeas, startupGuide } = data;
      
      let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Business Analysis Report</title>
      <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; }
          .business-idea { margin-bottom: 30px; border: 1px solid #ddd; padding: 15px; }
          .idea-title { color: #333; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
          .meta-item { background: #f5f5f5; padding: 8px; }
          .competitors { margin-top: 10px; }
          .competitor-tag { background: #e0e0e0; padding: 2px 8px; margin: 2px; border-radius: 10px; }
          .startup-step { margin-bottom: 20px; border-left: 3px solid #007cba; padding-left: 15px; }
          .step-number { background: #007cba; color: white; width: 25px; height: 25px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; }
          @media print {
              .business-idea { page-break-inside: avoid; }
              .startup-step { page-break-inside: avoid; }
          }
      </style>
  </head>
  <body>
      <div class="header">
          <h1>🚀 Business Analysis Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p>URL: ${window.location.href}</p>
      </div>
      
      <h2>Business Opportunities</h2>
  `;
  
      businessIdeas.ideas.forEach((idea, index) => {
        html += `
          <div class="business-idea">
              <div class="idea-title">${idea.name}</div>
              <p><strong>Description:</strong> ${idea.description}</p>
              
              <div class="meta-grid">
                  <div class="meta-item"><strong>Target Market:</strong> ${idea.targetMarket}</div>
                  <div class="meta-item"><strong>Revenue Model:</strong> ${idea.revenueModel}</div>
                  <div class="meta-item"><strong>Market Size:</strong> ${idea.marketSize}</div>
                  <div class="meta-item"><strong>Difficulty:</strong> ${idea.difficulty}/10</div>
                  <div class="meta-item"><strong>Investment:</strong> ${idea.investment}</div>
                  <div class="meta-item"><strong>Time to Customer:</strong> ${idea.timeToCustomer}</div>
              </div>
              
              <div class="competitors">
                  <strong>Key Competitors:</strong>
                  ${Array.isArray(idea.competitors) ? idea.competitors.map(comp => `<span class="competitor-tag">${comp}</span>`).join('') : `<span class="competitor-tag">${idea.competitors || 'Various competitors'}</span>`}
              </div>
          </div>
        `;
      });
  
      if (startupGuide && startupGuide.steps) {
        html += `
          <h2>Startup Guide</h2>
        `;
        
        startupGuide.steps.forEach(step => {
          html += `
            <div class="startup-step">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <span class="step-number">${step.stepNumber}</span>
                    <strong>${step.title}</strong>
                </div>
                <p>${step.description}</p>
                <p><strong>Timeframe:</strong> ${step.timeframe} | <strong>Cost:</strong> ${step.cost}</p>
                <p><strong>Resources:</strong> ${Array.isArray(step.resources) ? step.resources.join(', ') : (step.resources || 'General resources')}</p>
            </div>
          `;
        });
      }
  
      html += `
  </body>
  </html>
      `;
      
      return html;
    }
  
    exportToCSV(businessIdeas) {
      try {
        const csvData = this.convertToCSV(businessIdeas);
        this.downloadCSV(csvData, `business-analysis-${this.currentDate}.csv`);
      } catch (error) {
        console.error('CSV export error:', error);
        throw error;
      }
    }
  
    convertToCSV(businessIdeas) {
      const headers = [
        'Business Name',
        'Description',
        'Target Market',
        'Revenue Model',
        'Market Size',
        'Competitors',
        'Difficulty (1-10)',
        'Investment Required',
        'Time to First Customer'
      ];
  
      const rows = businessIdeas.ideas.map(idea => [
        idea.name,
        idea.description,
        idea.targetMarket,
        idea.revenueModel,
        idea.marketSize,
        Array.isArray(idea.competitors) ? idea.competitors.join('; ') : (idea.competitors || 'Various competitors'),
        idea.difficulty,
        idea.investment,
        idea.timeToCustomer
      ]);
  
      const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(','))
        .join('\n');
  
      return csvContent;
    }
  
    downloadCSV(csvContent, filename) {
      try {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('CSV download error:', error);
        throw error;
      }
    }
  }