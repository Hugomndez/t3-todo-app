import { Head, Html, Main, NextScript } from 'next/document';

const setInitialTheme = `
function getUserPreference() {
  if(window.localStorage.getItem('usehooks-ts-dark-mode')) {
    return window.localStorage.getItem('usehooks-ts-dark-mode') ? 'dark' : 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
document.body.dataset.theme = getUserPreference();
`;

export default function Document() {
  return (
    <Html dir="ltr">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
