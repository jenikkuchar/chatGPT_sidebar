(function() {
    // Definování proměnných
    let sidebarWidth = 25; // procenta
    let minimizedWidth = 20; // pixely
    let defaultWidth = sidebarWidth;
    let isMinimized = false;
    let originalBodyWidth;
    let originalSidebarWidth;
    let webappUrl = "https://chat.openai.com";

    // Vytvoření sidebaru
    let sidebar = document.createElement("div");
    sidebar.id = "chatgpt_sidebar";
    sidebar.style.width = `${sidebarWidth}%`;
    sidebar.style.position = "fixed";
    sidebar.style.right = "0";
    sidebar.style.top = "0";
    sidebar.style.bottom = "0";
    sidebar.style.overflow = "auto";
    sidebar.style.zIndex = "999999";
    sidebar.style.borderLeft = "1px solid";
    sidebar.style.backgroundColor = "var(--bg-color)";
    sidebar.style.color = "var(--font-color)";

    // Vytvoření hlavičky
    let header = document.createElement("div");
    header.id = "chatgpt_header";
    header.style.height = "20px";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.padding = "5px";
    header.style.borderBottom = "1px solid var(--font-color)";

    // Vytvoření odkazů v hlavičce
    let minimizeLink = document.createElement("span");
    minimizeLink.className = "material-symbols-outlined";
    minimizeLink.textContent = "right_panel_close";
    minimizeLink.style.cursor = "pointer";

    let openLink = document.createElement("span");
    openLink.className = "material-symbols-outlined";
    openLink.textContent = "open_in_new";
    openLink.style.cursor = "pointer";

    let closeLink = document.createElement("span");
    closeLink.className = "material-symbols-outlined";
    closeLink.textContent = "cancel";
    closeLink.style.cursor = "pointer";

    // Přidání odkazů do hlavičky
    header.appendChild(minimizeLink);
    header.appendChild(closeLink);
    header.appendChild(openLink);

    // Vytvoření obsahu
    let content = document.createElement("div");
    content.id = "chatgpt_content";
    content.style.overflowY = "auto";
    content.style.padding = "5px";

    // Vložení obsahu do sidebaru
    sidebar.appendChild(header);
    sidebar.appendChild(content);

    // Přidání sidebaru do dokumentu
    document.body.appendChild(sidebar);

    // Nastavení šířky těla dokumentu
    originalBodyWidth = document.body.style.width;
    document.body.style.width = `${100 - sidebarWidth}%`;

    // Nastavení akcí pro odkazy
    minimizeLink.addEventListener("click", function() {
        if (isMinimized) {
            sidebar.style.width = `${originalSidebarWidth}%`;
            document.body.style.width = `${100 - originalSidebarWidth}%`;
            minimizeLink.textContent = "right_panel_close";
        } else {
            originalSidebarWidth = sidebarWidth;
            sidebar.style.width = `${minimizedWidth}px`;
            document.body.style.width = `calc(100% - ${minimizedWidth}px)`;
            minimizeLink.textContent = "right_panel_open";
        }
        isMinimized = !isMinimized;
    });

    closeLink.addEventListener("click", function() {
        document.body.removeChild(sidebar);
        document.body.style.width = originalBodyWidth;
    });

    openLink.addEventListener("click", function() {
        window.open(webappUrl, '_blank');
    });

    // Načtení stránky do obsahu sidebaru
    fetch(webappUrl)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, 'text/html');
            content.appendChild(doc.documentElement);
        });
    
    // Vytvoření patičky
    let footer = document.createElement("div");
    footer.id = "chatgpt_footer";
    footer.style.height = "20px";
    footer.style.display = "flex";
    footer.style.justifyContent = "center";
    footer.style.padding = "5px";
    footer.style.borderTop = "1px solid var(--font-color)";
    footer.style.fontSize = "small";
    footer.textContent = "© 2023, created by JeniCode & Chat GPT";
    sidebar.appendChild(footer);

    // CSS pro webfonty
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
    document.head.appendChild(link);

    // Nastavení tématu na základě prefers-color-scheme
    let style = document.createElement('style');
    style.innerHTML = `
        @media (prefers-color-scheme: dark) {
            :root {
                --font-color: #E9E9EF;
                --bg-color: #1D1E20;
            }
        }

        @media (prefers-color-scheme: light) {
            :root {
                --font-color: #2E2F39;
                --bg-color: #FFFFFF;
            }
        }
    `;
    document.head.appendChild(style);
})();
