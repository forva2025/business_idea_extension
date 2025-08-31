// Check if PageAnalyzer already exists to prevent duplicate declaration
if (typeof window.PageAnalyzer === 'undefined' && !window.businessIdeaExtensionLoaded) {
  window.businessIdeaExtensionLoaded = true; // Mark as loaded
  window.PageAnalyzer = class PageAnalyzer {
    constructor() {
      this.pageData = {};
    }
  
    extractPageContent() {
      const content = {
        url: window.location.href,
        title: document.title,
        description: this.getMetaDescription(),
        keywords: this.getMetaKeywords(),
        headings: this.extractHeadings(),
        mainContent: this.extractMainContent(),
        images: this.extractImages(),
        links: this.extractLinks(),
        socialMedia: this.extractSocialLinks(),
        contactInfo: this.extractContactInfo(),
        pricing: this.extractPricingInfo(),
        technology: this.detectTechnology()
      };
      
      return content;
    }
  
    getMetaDescription() {
      const meta = document.querySelector('meta[name="description"]');
      return meta ? meta.content : '';
    }
  
    getMetaKeywords() {
      const meta = document.querySelector('meta[name="keywords"]');
      return meta ? meta.content.split(',').map(k => k.trim()) : [];
    }
  
    extractHeadings() {
      const headings = [];
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      elements.forEach(el => {
        headings.push({
          level: el.tagName.toLowerCase(),
          text: el.textContent.trim()
        });
      });
      return headings;
    }
  
    extractMainContent() {
      // Remove navigation, footer, sidebar elements
      const elementsToRemove = 'nav, footer, aside, .sidebar, .menu, .navigation';
      const clonedDoc = document.cloneNode(true);
      clonedDoc.querySelectorAll(elementsToRemove).forEach(el => el.remove());
      
      const mainContent = clonedDoc.querySelector('main, article, .content, .main-content') 
        || clonedDoc.body;
      
      return mainContent.textContent.trim().substring(0, 2000);
    }
  
    extractImages() {
      const images = [];
      document.querySelectorAll('img').forEach(img => {
        if (img.src && img.alt) {
          images.push({
            src: img.src,
            alt: img.alt
          });
        }
      });
      return images.slice(0, 10); // Limit to 10 images
    }
  
    extractLinks() {
      const links = [];
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.href;
        if (href.startsWith('http')) {
          links.push({
            url: href,
            text: link.textContent.trim(),
            domain: new URL(href).hostname
          });
        }
      });
      return links.slice(0, 20); // Limit to 20 links
    }
  
    extractSocialLinks() {
      const socialPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'tiktok'];
      const socialLinks = [];
      
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.href.toLowerCase();
        socialPlatforms.forEach(platform => {
          if (href.includes(platform)) {
            socialLinks.push({
              platform: platform,
              url: link.href
            });
          }
        });
      });
      
      return socialLinks;
    }
  
    extractContactInfo() {
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
      
      const bodyText = document.body.textContent;
      const emails = bodyText.match(emailRegex) || [];
      const phones = bodyText.match(phoneRegex) || [];
      
      return {
        emails: [...new Set(emails)].slice(0, 5),
        phones: [...new Set(phones)].slice(0, 5)
      };
    }
  
    extractPricingInfo() {
      const priceRegex = /\$[\d,]+\.?\d*/g;
      const bodyText = document.body.textContent;
      const prices = bodyText.match(priceRegex) || [];
      
      return [...new Set(prices)].slice(0, 10);
    }
  
    detectTechnology() {
      const technologies = [];
      
      // Check for common frameworks and libraries
      if (window.React) technologies.push('React');
      if (window.Vue) technologies.push('Vue.js');
      if (window.angular) technologies.push('Angular');
      if (window.jQuery || window.$) technologies.push('jQuery');
      
      // Check meta tags and script sources
      document.querySelectorAll('script[src]').forEach(script => {
        const src = script.src.toLowerCase();
        if (src.includes('shopify')) technologies.push('Shopify');
        if (src.includes('wordpress')) technologies.push('WordPress');
        if (src.includes('wix')) technologies.push('Wix');
      });
      
      return technologies;
    }
  };
} // Close the if statement

// Listen for messages from popup (only if not already added)
if (!window.businessIdeaExtensionMessageListenerAdded) {
  window.businessIdeaExtensionMessageListenerAdded = true;
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeCurrentPage') {
    try {
      const analyzer = new window.PageAnalyzer();
      const pageData = analyzer.extractPageContent();
      sendResponse({ success: true, data: pageData });
    } catch (error) {
      console.error('Error in content script:', error);
      sendResponse({ success: false, error: error.message });
    }
  } else if (request.action === 'ping') {
    // Simple ping to test if content script is loaded
    sendResponse({ success: true, message: 'Content script is alive!' });
  }
  return true; // Keep the message channel open for async response
  });
} // Close the if statement for message listener

// Notify that content script is loaded
console.log('Business Idea Extension content script loaded');

// Add error handling for content script initialization
try {
  // Test if the content script is working properly
  if (typeof window.PageAnalyzer !== 'undefined') {
    console.log('PageAnalyzer class loaded successfully');
  } else {
    console.error('PageAnalyzer class not found');
  }
} catch (error) {
  console.error('Error in content script initialization:', error);
}