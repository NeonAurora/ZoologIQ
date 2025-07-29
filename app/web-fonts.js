// app/web-fonts.js
export const loadWebFonts = () => {
  if (typeof document !== 'undefined') {
    // Create font face style
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'LucidaCalligraphy';
        src: url('./assets/fonts/LucidaCalligraphy.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
    
    // Preload the font
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = './assets/fonts/LucidaCalligraphy.ttf';
    link.as = 'font';
    link.type = 'font/ttf';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
};