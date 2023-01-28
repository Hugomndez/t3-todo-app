import { Head, Html, Main, NextScript } from 'next/document';

function getUserPreference() {
  const preference = window.localStorage.getItem('use-dark-mode');
  const hasExplicitPreference = typeof preference === 'string';

  if (hasExplicitPreference) {
    return preference === 'true' ? 'dark' : 'light';
  }

  const mediaQuery = '(prefers-color-scheme: dark)';
  const mql = window.matchMedia(mediaQuery);
  const hasImplicitPreference = typeof mql.matches === 'boolean';

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light';
  }

  return 'light';
}

const setInitialTheme = `
(() => {
  ${getUserPreference.toString()}
  document.body.dataset.theme = getUserPreference();
})();
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
