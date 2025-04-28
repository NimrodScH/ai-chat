AI Chat Widget - ai-crw

Description:
ai-crw is a lightweight, fully customizable AI Chat Widget for websites. It is built with React, Framer Motion, and powered by OpenRouter AI.

Features:

- Floating chat button with smooth open/close animations
- Full conversation memory between user and AI
- Context data support (products, services, FAQs, etc.)
- Business information support for personalized AI behavior
- Responsive design for both desktop and mobile
- No backend setup required for users
- Easy integration into any React application

Installation:
npm install ai-crw
or
yarn add ai-crw

Basic Usage:
import PopChat from 'ai-crw';

function App() {
return (

<div>
<PopChat />
</div>
);
}

export default App;

Props Options

Prop Name Type Default Value Description
businessInfo string undefined A short description about the business. Helps AI personalize responses.
contextData object or array undefined Products, services, or any data you want the AI to reference.

If no props are passed, the widget will still operate correctly with default behavior.

Advanced Example:
import PopChat from 'ai-crw';
import products from './products.json';

function App() {
return (

<div>
<PopChat
        contextData={products}
        businessInfo="We are a jewelry store specializing in custom diamond rings and luxury gifts."
      />
</div>
);
}

export default App;

How It Works:

- When the user clicks the chat icon, the chat window opens.
- User messages are sent to the AI server.
- AI responses are based on:
  - Full chat conversation history
  - Business information (if provided)
  - Context data (if provided)
- The system ensures that AI responses are friendly, professional, and helpful.

Folder Structure (internal use):

src/
ChatWidget.tsx - Main widget logic
ChatWidget.css - Widget styling
http.ts - Communication with the AI server
products.json - Example context data (optional)

Built With:

- React
- TypeScript
- Framer Motion
- Express.js backend (for server side)
- OpenRouter AI API

License:
MIT License 2025

Getting Started:

1. Install the ai-crw package.
2. Import and use the <PopChat /> component inside your application.
3. (Optional) Provide contextData and businessInfo props to personalize the chat experience.
4. Deploy your website.
