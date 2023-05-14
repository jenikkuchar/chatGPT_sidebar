(function() {
  // Defaultní hodnoty
  const defaults = {
    webapp_url: "https://chat.openai.com",
    sidebar_width: "25%", 
    min_width: 150,
    max_width: "90%",
    min_sidebar: 20,
    header_height: 20,
    footer_height: 20,
  };

  // Vytvoření stylů
  let style = document.createElement('style');
  document.head.appendChild(style);
  let sheet = style.sheet;

  sheet.insertRule(`:root { 
    --font-color-light: #2E2F39;
    --background-color-light: #FFFFFF;
    --border-color-light: #2E2F39;
    --font-color-dark: #E9E9EF;
    --background-color-dark: #1D1E20;
    --border-color-dark: #E9E9EF;
  }`, sheet.cssRules.length);

  sheet.insertRule(`@media (prefers-color-scheme: dark) { 
    .chatgpt-sidebar { 
      color: var(--font-color-dark);
      background-color: var(--background-color-dark);
      border: 1px solid var(--border-color-dark);
    }
  }`, sheet.cssRules.length);

  sheet.insertRule(`@media (prefers-color-scheme: light) { 
    .chatgpt-sidebar { 
      color: var(--font-color-light);
      background-color: var(--background-color-light);
      border: 1px solid var(--border-color-light);
    }
  }`, sheet.cssRules.length);

  sheet.insertRule(`.chatgpt-sidebar { 
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: ${defaults.sidebar_width};
    min-width: ${defaults.min_width}px;
    max-width: ${defaults.max_width};
    display: flex;
    flex-direction: column;
    z-index: 9999;
  }`, sheet.cssRules.length);

  sheet.insertRule(`.chatgpt-header, .chatgpt-footer { 
    height: ${defaults.header_height}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid;
    font-size: 16px;
  }`, sheet.cssRules.length);

  sheet.insertRule(`.chatgpt-content { 
    flex-grow: 1;
    overflow: auto;
  }`, sheet.cssRules.length);

  sheet.insertRule(`.chatgpt-content iframe { 
    width: 100%;
    height: 100%;
    border: none;
  }`, sheet.cssRules.length);

  // Vytvoření sidebaru
  let sidebar = document.createElement('div');
  sidebar.className = "chatgpt-sidebar";
  document.body.appendChild(sidebar);

  // Vytvoření hlavičky
  let header = document.createElement('div');
  header.className = "chatgpt-header";
  sidebar.appendChild(header);

  // Vytvoření tlačítek v hlavičce
  let minimizeBtn = document.createElement('span');
  minimizeBtn.className = "material-symbols-outlined";
  minimizeBtn.innerHTML = "right_panel_close";
  minimizeBtn.onclick = function() {
    if (sidebar.style.width !== `${defaults.min_sidebar}px`) {
      sidebar.dataset.prevWidth = sidebar.style.width;
      sidebar.style.width = `${defaults.min_sidebar}px`;
      minimizeBtn.innerHTML = "right_panel_open";
    } else {       sidebar.style.width = sidebar.dataset.prevWidth || defaults.sidebar_width;
      minimizeBtn.innerHTML = "right_panel_close";
    }
  };
  header.appendChild(minimizeBtn);

  let openInNewTabBtn = document.createElement('span');
  openInNewTabBtn.className = "material-symbols-outlined";
  openInNewTabBtn.innerHTML = "open_in_new";
  openInNewTabBtn.onclick = function() {
    window.open(defaults.webapp_url, '_blank');
  };
  header.appendChild(openInNewTabBtn);

  let closeBtn = document.createElement('span');
  closeBtn.className = "material-symbols-outlined";
  closeBtn.innerHTML = "cancel";
  closeBtn.onclick = function() {
    document.body.removeChild(sidebar);
  };
  header.appendChild(closeBtn);

  // Vytvoření obsahu sidebaru
  let content = document.createElement('div');
  content.className = "chatgpt-content";
  sidebar.appendChild(content);

  let iframe = document.createElement('iframe');
  iframe.src = defaults.webapp_url;
  content.appendChild(iframe);

  // Vytvoření patičky
  let footer = document.createElement('div');
  footer.className = "chatgpt-footer";
  footer.innerHTML = "© 2023, created by JeniCode & Chat GPT";
  sidebar.appendChild(footer);
})();
