import deskDarkIMG from 'assets/images/bg-desktop-dark.jpg';
import deskLightIMG from 'assets/images/bg-desktop-light.jpg';
import mobileDarkIMG from 'assets/images/bg-mobile-dark.jpg';
import mobileLightIMG from 'assets/images/bg-mobile-light.jpg';

import { useEffect, useRef } from 'react';
import { useDarkMode, useMediaQuery } from 'usehooks-ts';

import styles from './BackgroundImage.module.css';

const BackgroundImage = () => {
  const { isDarkMode } = useDarkMode();
  const matches = useMediaQuery('(min-width: 768px)');

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const m = isDarkMode ? mobileDarkIMG : mobileLightIMG;
    const d = isDarkMode ? deskDarkIMG : deskLightIMG;

    const v = matches ? d : m;

    if (imgRef.current != undefined) {
      imgRef.current.src = v.src;
      imgRef.current.width = v.width;
      imgRef.current.height = v.height;
    }
  }, [isDarkMode, matches]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={imgRef} className={styles.bg} width={375} height={200} alt="" />
  );
};

export default BackgroundImage;
