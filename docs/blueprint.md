# **App Name**: Smart Data Migration Platform

## Core Features:

- User Authentication: Secure user authentication using Clerk, allowing users to register, log in, and manage their accounts.
- File Upload: Enable users to upload multi-sheet Excel and CSV files, which are then stored securely in AWS S3 for processing.
- AI-Driven Table Detection: Employ a tool combining Genkit and Ollama (Gemma 3) to automatically detect and extract tables from uploaded files.
- Metadata Extraction: Extract key metadata such as Data Point, Location, Time, Units, Values using AI and guided UI.
- Data Cleaning and Transformation: Provide a user-friendly interface for cleaning and transforming KPI data, with inline table editing using Handsontable.
- JSON Generation: Generate structured KPI JSON output from the transformed data, making it ready for dashboards and analytics.
- Export Functionality: Allow users to generate and download the structured JSON files for further use in analytics and reporting.
- Vector Embeddings: Create vector collections in Qdrant for locations and datapoints

## Style Guidelines:

- Primary color: A vibrant hue of cerulean (#2196F3), offering a balance of calmness and intelligence that is ideally suited for data management.
- Background color: A light, neutral background in very light gray (#F5F5F5) provides a clean and unobtrusive backdrop.
- Accent color: Utilize a vivid orange-yellow (#FFC107) to draw attention to key interactive elements and signify critical actions, thereby enhancing user engagement.
- Font Pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text, offering a blend of modern precision and readability.
- Employ clean, geometric icons from Lucide Icons to represent different data types and actions within the application.
- Maintain a consistent and well-structured layout, utilizing grid-based systems and clear visual hierarchy to ensure an intuitive user experience.
- Incorporate subtle, unobtrusive animations for transitions and loading states to enhance user engagement without overwhelming the interface.
- Login Page Theme: Implement a clean, modern design with a white background, soft blue accents, and a prominent blue primary button. Ensure clear, readable text and well-placed input fields for a seamless user experience.