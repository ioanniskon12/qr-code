'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #6366F1;
    --primary-dark: #4F46E5;
    --secondary: #EC4899;
    --success: #10B981;
    --warning: #F59E0B;
    --danger: #EF4444;
    --dark: #1F2937;
    --light: #F9FAFB;
    --gray: #6B7280;
    --border: #E5E7EB;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--light);
    color: var(--dark);
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }
`;