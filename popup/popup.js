class PopupController {
    constructor() {
      this.currentBusinessIdeas = null;
      this.currentStartupGuide = null;
      this.initializeEventListeners();
      this.loadSavedApiKey();
      this.checkFirstTimeUser();
      this.checkExportUtils();
    }
  
    initializeEventListeners() {
      document.getElementById('save-key').addEventListener('click', () => this.saveApiKey());
      document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeCurrentPage());
      document.getElementById('export-pdf').addEventListener('click', () => this.exportToPDF());
      document.getElementById('export-csv').addEventListener('click', () => this.exportToCSV());
      
      // Settings toggle functionality
      const settingsToggle = document.getElementById('settings-toggle');
      const settingsSection = document.getElementById('settings-section');
      if (settingsToggle && settingsSection) {
        settingsToggle.addEventListener('click', () => {
          settingsSection.classList.toggle('hidden');
        });
      }
      
      // Add debug button for testing content script connection
      if (document.getElementById('debug-btn')) {
        document.getElementById('debug-btn').addEventListener('click', () => this.testContentScriptConnection());
      }
    }
  
    async loadSavedApiKey() {
      const result = await chrome.storage.sync.get(['deepseek_api_key']);
      if (result.deepseek_api_key) {
        document.getElementById('api-key').value = result.deepseek_api_key;
      }
    }
  
    async saveApiKey() {
      const apiKey = document.getElementById('api-key').value;
      if (apiKey) {
        await chrome.storage.sync.set({ deepseek_api_key: apiKey });
        this.updateStatus('API key saved successfully', 'success');
      }
    }
  
    async analyzeCurrentPage() {
      this.showLoading(true);
      this.updateStatus('Analyzing current page...', 'loading');
  
      try {
        // Get current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Check if we can inject content script
        if (!tab.url.startsWith('http')) {
          throw new Error('Cannot analyze this type of page (chrome://, file://, etc.)');
        }
        
        // Try to inject content script if not already loaded
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content/content.js']
          });
        } catch (injectionError) {
          console.log('Content script already loaded or injection failed:', injectionError);
        }
        
        // Wait a moment for content script to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Extract page data using content script
        let pageDataResponse;
        try {
          pageDataResponse = await chrome.tabs.sendMessage(tab.id, { 
            action: 'analyzeCurrentPage' 
          });
        } catch (messageError) {
          console.error('Content script communication failed:', messageError);
          throw new Error('Content script not available. Please refresh the page and try again.');
        }
  
        if (!pageDataResponse || !pageDataResponse.success) {
          throw new Error('Failed to extract page data');
        }
  
        // Generate business ideas
        const businessIdeasResponse = await chrome.runtime.sendMessage({
          action: 'generateBusinessIdeas',
          pageData: pageDataResponse.data
        });
  
        if (!businessIdeasResponse.success) {
          throw new Error(businessIdeasResponse.error || 'Failed to generate business ideas');
        }
  
        this.currentBusinessIdeas = businessIdeasResponse.data;
        this.displayBusinessIdeas(this.currentBusinessIdeas);
        this.updateStatus('Analysis complete', 'success');
        
      } catch (error) {
        console.error('Analysis error:', error);
        
        // Provide more specific error messages
        let errorMessage = error.message;
        if (error.message.includes('Receiving end does not exist')) {
          errorMessage = 'Content script not available. Please refresh the page and try again.';
        } else if (error.message.includes('Cannot access')) {
          errorMessage = 'Cannot analyze this page. Try a different website.';
        } else if (error.message.includes('chrome://')) {
          errorMessage = 'Cannot analyze Chrome system pages. Please navigate to a regular website.';
        }
        
        this.updateStatus('Analysis failed: ' + errorMessage, 'error');
      } finally {
        this.showLoading(false);
      }
    }
  
    displayBusinessIdeas(ideas) {
      const container = document.getElementById('business-ideas');
      container.innerHTML = '';
  
      ideas.ideas.forEach((idea, index) => {
        const ideaElement = this.createBusinessIdeaElement(idea, index);
        container.appendChild(ideaElement);
      });
  
      document.getElementById('results-section').classList.remove('hidden');
      document.getElementById('export-section').classList.remove('hidden');
    }
  
    createBusinessIdeaElement(idea, index) {
      const div = document.createElement('div');
      div.className = 'business-idea';
      div.innerHTML = `
        <h4 onclick="popupController.showStartupGuide(${index})">${idea.name}</h4>
        <p>${idea.description}</p>
        
        <div class="idea-meta">
          <div class="meta-item">
            <div class="meta-label">Target Market</div>
            <div>${idea.targetMarket}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Revenue Model</div>
            <div>${idea.revenueModel}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Market Size</div>
            <div>${idea.marketSize}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Difficulty</div>
            <div>${idea.difficulty}/10</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Investment</div>
            <div>${idea.investment}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Time to Customer</div>
            <div>${idea.timeToCustomer}</div>
          </div>
        </div>
        
        <div class="competitors">
          <div class="meta-label">Key Competitors:</div>
          ${Array.isArray(idea.competitors) ? idea.competitors.map(comp => `<span class="competitor-tag">${comp}</span>`).join('') : `<span class="competitor-tag">${idea.competitors || 'Various competitors'}</span>`}
        </div>
      `;
      return div;
    }
  
    async showStartupGuide(ideaIndex) {
      if (!this.currentBusinessIdeas || !this.currentBusinessIdeas.ideas[ideaIndex]) {
        return;
      }
  
      const businessIdea = this.currentBusinessIdeas.ideas[ideaIndex];
      this.showLoading(true);
      this.updateStatus('Generating startup guide...', 'loading');
  
      try {
        const response = await chrome.runtime.sendMessage({
          action: 'generateStartupGuide',
          businessIdea: businessIdea
        });
  
        if (!response.success) {
          throw new Error(response.error || 'Failed to generate startup guide');
        }
  
        this.currentStartupGuide = response.data;
        this.displayStartupGuide(this.currentStartupGuide);
        this.updateStatus('Startup guide generated', 'success');
        
      } catch (error) {
        console.error('Startup guide error:', error);
        this.updateStatus('Failed to generate guide: ' + error.message, 'error');
      } finally {
        this.showLoading(false);
      }
    }
  
    displayStartupGuide(guide) {
      const container = document.getElementById('startup-guide');
      container.innerHTML = '';
  
      guide.steps.forEach(step => {
        const stepElement = this.createStartupStepElement(step);
        container.appendChild(stepElement);
      });
  
      document.getElementById('startup-guide-section').classList.remove('hidden');
      
      // Scroll to startup guide
      document.getElementById('startup-guide-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  
    createStartupStepElement(step) {
      const div = document.createElement('div');
      div.className = 'startup-step';
      div.innerHTML = `
        <div class="step-header">
          <div class="step-number">${step.stepNumber}</div>
          <div class="step-title">${step.title}</div>
        </div>
        <div class="step-description">${step.description}</div>
        <div class="step-meta">
          <span><strong>Timeframe:</strong> ${step.timeframe}</span>
          <span><strong>Cost:</strong> ${step.cost}</span>
        </div>
        <div class="step-resources">
          <div class="meta-label">Resources:</div>
          ${Array.isArray(step.resources) ? step.resources.map(resource => `<span class="competitor-tag">${resource}</span>`).join('') : `<span class="competitor-tag">${step.resources || 'General resources'}</span>`}
        </div>
      `;
      return div;
    }
  
    exportToPDF() {
      try {
        if (!this.currentBusinessIdeas) {
          this.updateStatus('No business ideas to export. Please analyze a page first.', 'error');
          return;
        }
        
        console.log('Starting PDF export...');
        console.log('ExportUtils available:', typeof ExportUtils);
        
        if (typeof ExportUtils === 'undefined') {
          this.updateStatus('Export functionality not available. Please reload the extension.', 'error');
          return;
        }
        
        const exporter = new ExportUtils();
        exporter.exportToPDF({
          businessIdeas: this.currentBusinessIdeas,
          startupGuide: this.currentStartupGuide
        });
        
        this.updateStatus('PDF export initiated. Check your print dialog.', 'success');
      } catch (error) {
        console.error('PDF export error:', error);
        this.updateStatus('PDF export failed: ' + error.message, 'error');
      }
    }
  
    exportToCSV() {
      try {
        if (!this.currentBusinessIdeas) {
          this.updateStatus('No business ideas to export. Please analyze a page first.', 'error');
          return;
        }
        
        console.log('Starting CSV export...');
        console.log('ExportUtils available:', typeof ExportUtils);
        
        if (typeof ExportUtils === 'undefined') {
          this.updateStatus('Export functionality not available. Please reload the extension.', 'error');
          return;
        }
        
        const exporter = new ExportUtils();
        exporter.exportToCSV(this.currentBusinessIdeas);
        
        this.updateStatus('CSV export completed successfully!', 'success');
      } catch (error) {
        console.error('CSV export error:', error);
        this.updateStatus('CSV export failed: ' + error.message, 'error');
      }
    }
  
    showLoading(show) {
      const loadingElement = document.getElementById('loading');
      if (show) {
        loadingElement.classList.remove('hidden');
      } else {
        loadingElement.classList.add('hidden');
      }
    }
  
    updateStatus(message, type = 'info') {
      const statusElement = document.getElementById('status');
      statusElement.textContent = message;
      
      // Remove existing status classes
      statusElement.classList.remove('status-success', 'status-error', 'status-loading');
      
      // Add appropriate class
      if (type === 'success') {
        statusElement.classList.add('status-success');
      } else if (type === 'error') {
        statusElement.classList.add('status-error');
      } else if (type === 'loading') {
        statusElement.classList.add('status-loading');
      }
    }
    
    async testContentScriptConnection() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log('Current tab:', tab);
        
        // Test if content script is accessible
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
        console.log('Content script response:', response);
        this.updateStatus('Content script is working!', 'success');
      } catch (error) {
        console.error('Content script test failed:', error);
        this.updateStatus('Content script not available: ' + error.message, 'error');
      }
    }
    
    async checkFirstTimeUser() {
      const result = await chrome.storage.sync.get(['first_time_user']);
      if (!result.first_time_user) {
        this.updateStatus('Welcome! Click "Analyze Current Page" to get started.', 'success');
        await chrome.storage.sync.set({ first_time_user: false });
      }
    }
    
    async testExtensionConnection() {
      try {
        // Test background script connection
        const response = await chrome.runtime.sendMessage({ action: 'ping' });
        console.log('Background script response:', response);
        return true;
      } catch (error) {
        console.error('Background script test failed:', error);
        return false;
      }
    }
    
    checkExportUtils() {
      if (typeof ExportUtils === 'undefined') {
        console.warn('ExportUtils not loaded. Export functionality may not work.');
        this.updateStatus('Export functionality not available. Please reload the extension.', 'error');
      } else {
        console.log('ExportUtils loaded successfully');
      }
    }
  }
  
  // Initialize popup controller
  const popupController = new PopupController();