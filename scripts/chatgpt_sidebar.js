(function() {
  var sidebarWidth = '25%';
  var webappUrl = 'https://chat.openai.com';

  function createSidebar() {
    var sidebar = document.createElement('div');
    sidebar.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: ${sidebarWidth};
      min-width: 150px;
      max-width: 90%;
      height: 100vh;
      box-sizing: border-box;
      border-left: 1px solid var(--border-color);
      background-color: var(--background-color);
      font-family: 'Material Symbols Outlined', sans-serif;
      color: var(--font-color);
      overflow: hidden;
      resize: horizontal;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    `;
    sidebar.id = 'chatgpt-sidebar';

    var header = createHeader();
    var content = createContent();
    var footer = createFooter();

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    sidebar.appendChild(footer);

    document.body.appendChild(sidebar);
    document.body.style.marginRight = sidebarWidth;
  }

  function createHeader() {
    var header = document.createElement('div');
    header.style.cssText = `
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--border-color);
    `;

    var minimizeLink = createMinimizeLink();
    var openLink = createOpenLink();
    var closeLink = createCloseLink();

    header.appendChild(minimizeLink);
    header.appendChild(openLink);
    header.appendChild(closeLink);

    return header;
  }

  function createMinimizeLink() {
    var link = document.createElement('span');
    link.className = 'material-symbols-outlined';
    link.textContent = 'right_panel_close';
    link.onclick = function() {
      var sidebar = document.getElementById('chatgpt-sidebar');
      sidebar.style.width = '20px';
      document.body.style.marginRight = '20px';
      this.textContent = 'right_panel_open';
    };

    return link;
  }

  function createOpenLink() {
    var link = document.createElement('span');
    link.className = 'material-symbols-outlined';
    link.textContent = 'open_in_new';
    link.onclick = function() {
      window.open(webappUrl, '_blank');
    };

    return link;
  }

  function createCloseLink() {
    var link = document.createElement('span');
    link.className = 'material-symbols-outlined';
    link.textContent = 'cancel';
    link.onclick = function() {
      var sidebar = document.getElementById('chatgpt-sidebar');
      document.body.removeChild(sidebar);
      document.body.style.marginRight = '0';
    };

    return link;
  }

  function createContent() {
    var iframe = document.createElement('iframe');
    iframe.src = webappUrl;
    iframe.style.cssText = `
      width: 100%;
      height: calc(100vh - 40px);
      border: none;
    `;

    return iframe;
  }

  function createFooter() {
    var footer = document.createElement('div');
    footer.style.cssText = `
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
      border-top: 1px solid var(--border-color);
      font-size: 10px;
    `;

    footer.textContent = '© 2023, created by JeniCode & Chat GPT';

    return footer;
  }

  function setColors() {
    var colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    var backgroundColor, fontColor, borderColor;
    if (colorScheme === 'dark') {
      backgroundColor = '#1D1E20';
      fontColor = '#E9E9EF';
      borderColor = '#E9E9EF';
    } else {
      backgroundColor = '#FFFFFF';
      fontColor = '#2E2F39';
      borderColor = '#2E2F39';
    }

    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--font-color', fontColor);
    document.documentElement.style.setProperty('--border-color', borderColor);
  }

  function loadFont() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
    document.head.appendChild(link);
  }

  loadFont();
  setColors();
  createSidebar();
})();

