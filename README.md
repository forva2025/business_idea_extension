# Business Idea Extension

![Business Idea Extension Icon](assets/icon128.png)

## Overview

The Business Idea Extension is a Chrome browser extension designed to help users discover potential business opportunities while browsing the web. By analyzing the content of any webpage, the extension identifies patterns, trends, and gaps that could inspire new business ideas or improvements to existing ones.

## Features

- **Webpage Analysis**: Automatically scans webpage content to extract relevant data for business idea generation.
- **Idea Generation**: Uses intelligent algorithms and DeepSeek AI to suggest business ideas based on the analyzed content.
- **Ready-to-Use**: Works immediately after installation - no API key required!
- **Popup Interface**: Provides a user-friendly popup window for easy access to generated ideas.
- **Export Functionality**: Allows users to export generated ideas in various formats for further use.
- **Background Processing**: Runs in the background to minimize impact on browsing performance.
- **Optional Customization**: Advanced users can add their own API key for unlimited usage.

## Installation

1. Download or clone the extension repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the `business_idea_extension` folder.
5. The extension will be installed and ready to use.

## Usage

1. Navigate to any webpage in Chrome.
2. Click on the Business Idea Extension icon in the browser toolbar.
3. Click "Analyze Current Page" to generate business ideas.
4. Use the export feature to save ideas for later reference.

## Advanced Settings (Optional)

For users who want unlimited usage or enhanced features:

1. Click the ⚙️ settings icon in the extension popup
2. Sign up for a DeepSeek account at [https://platform.deepseek.com](https://platform.deepseek.com)
3. Generate an API key from your account dashboard
4. Enter your API key in the settings section
5. Click "Save Key" to store it securely

**Note**: The extension works perfectly without an API key using built-in analysis, but with your own DeepSeek API key, you'll get unlimited usage and enhanced AI-powered insights.



## Architecture

The extension is structured as follows:

- `manifest.json`: Defines the extension's metadata, permissions, and components.
- `popup/`: Contains the popup interface files.
  - `popup.html`: HTML structure for the popup.
  - `popup.css`: Styling for the popup.
  - `popup.js`: JavaScript logic for the popup functionality.
- `content/`: Content scripts that run on web pages.
  - `content.js`: Analyzes webpage content and communicates with other parts of the extension.
- `background/`: Background scripts for persistent functionality.
  - `background.js`: Handles background tasks and messaging between components.
- `utils/`: Utility modules.
  - `analyzer.js`: Core analysis logic for generating business ideas.
  - `export.js`: Functions for exporting generated ideas.
- `assets/`: Icon and image files for the extension.

## Permissions

The extension requires the following permissions:

- `activeTab`: To access the content of the currently active tab.
- `storage`: To store user preferences, generated ideas, and DeepSeek API key.
- `tabs`: To interact with browser tabs.
- `scripting`: To inject content scripts for page analysis.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the terms specified in the LICENSE file.

## Support

For support or questions, please open an issue in the repository.
