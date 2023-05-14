(function () {
  // Constants
  const DEFAULT_URL = 'https://chat.openai.com';
  const MIN_WIDTH = 150;
  const MAX_WIDTH_PERCENTAGE = 90;
  const DEFAULT_WIDTH_PERCENTAGE = 25;
  const HEADER_HEIGHT = 10;
  const FOOTER_HEIGHT = 10;
  const MATERIAL_SYMBOLS_LINK = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';

  // Check for dark mode
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const fontColor = isDarkMode ? '#E9E9EF' : '#2E2F39';
  const bgColor = isDarkMode ? '#1D1E20' : '#FFFFFF';
  const borderColor = isDarkMode ? '#E9E9EF' : '#2E2F39';

  // Create sidebar
  const sidebar = document.createElement('div');
  sidebar.style.position = 'fixed';
  sidebar.style.right = '0';
  sidebar.style.top = '0';
  sidebar.style.bottom = '0';
  sidebar.style.width = `${DEFAULT_WIDTH_PERCENTAGE}%`;
  sidebar.style.minWidth = `${MIN_WIDTH}px`;
  sidebar.style.maxWidth = `${MAX_WIDTH_PERCENTAGE}%`;
  sidebar.style.backgroundColor = bgColor;
  sidebar.style.color = fontColor;
  sidebar.style.borderLeft = `1px solid ${borderColor}`;
  sidebar.style.overflow = 'auto';
  
  // Create header
  const header = document.createElement('div');
  header.style.height = `${HEADER_HEIGHT}px`;
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.borderBottom = `1px solid ${borderColor}`;

  // Create footer
  const footer = document.createElement('div');
  footer.style.height = `${FOOTER_HEIGHT}px`;
  footer.style.display = 'flex';
  footer.style.justifyContent = 'center';
  footer.style.alignItems = 'center';
  footer.style.borderTop = `1px solid ${borderColor}`;
  footer.textContent = '© 2023, created by JeniCode & Chat GPT';

  // Create sidebar content
  const sidebarContent = document.createElement('object');
  sidebarContent.data = DEFAULT_URL;
  sidebarContent.style.width = '100%';
  sidebarContent.style.height = `calc(100% - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`;

  // Create control buttons
  const minimizeBtn = document.createElement('span');
  minimizeBtn.classList.add('material-symbols-outlined');
  minimizeBtn.textContent = 'right_panel_close';
  minimizeBtn.onclick = () => {
    const currentWidth = sidebar.style.width;
    sidebar.dataset.previousWidth = currentWidth;
    sidebar.style.width = '0';
    minimizeBtn.textContent = 'right_panel_open';
  };
  
  const openInNewTabBtn = document.createElement('span');
  openInNewTabBtn.classList.add('material-symbols-outlined');
  openInNewTabBtn.textContent = 'open_in_new';
  openInNewTabBtn.onclick = () => {
    window.open(DEFAULT_URL, '_blank');
  };

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('material-symbols-outlined');
  closeBtn.textContent = 'cancel';
  closeBtn.onclick = () => {
    document.body.removeChild(sidebar);
  };

  // Append control buttons to header
  header.append(minimizeBtn, openInNewTabBtn, closeBtn);

  // Append elements
  sidebar.append(header, sidebarContent, footer);
  document.body.append(sidebar);

  // Add Google Material Icons CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MATERIAL_SYMBOLS_LINK;
  document.head.append(link);

  // Handle resizing
  sidebar.addEventListener('mousedown', (e) => {
    const initialWidth = sidebar.offsetWidth;
    const initialMouseX = e.clientX;

    const handleMousemove = (e) => {
      const newWidth = initialWidth - (e.clientX - initialMouseX);
      sidebar.style.width = `${Math.max(Math.min(newWidth, window.innerWidth * MAX_WIDTH_PERCENTAGE / 100), MIN_WIDTH)}px`;
    };
    
    const handleMouseup = () => {
      document.removeEventListener('mousemove', handleMousemove);
      document.removeEventListener('mouseup', handleMouseup);
    };
    
    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);
  });
})();
