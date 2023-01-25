import { useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

export default function Component() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={enable}>Enable</button>
      <button onClick={disable}>Disable</button>
    </div>
  );
}
