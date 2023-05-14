javascript:(function() {
    // Check if the sidebar is already injected
    var sidebar = document.getElementById('chatgpt-sidebar');
    if (sidebar) {
        // If the sidebar already exists, remove it
        sidebar.remove();
        return;
    }

    // Create the sidebar container
    var sidebarContainer = document.createElement('div');
    sidebarContainer.id = 'chatgpt-sidebar';
    sidebarContainer.style.width = '25%';
    sidebarContainer.style.position = 'fixed';
    sidebarContainer.style.top = '0';
    sidebarContainer.style.right = '0';
    sidebarContainer.style.bottom = '0';
    sidebarContainer.style.zIndex = '999999';
    sidebarContainer.style.overflow = 'hidden';
    sidebarContainer.style.boxSizing = 'border-box';
    sidebarContainer.style.transition = 'width 0.3s ease';

    // Create the sidebar header
    var sidebarHeader = document.createElement('div');
    sidebarHeader.style.height = '20px';
    sidebarHeader.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-bg-color');
    sidebarHeader.style.color = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-font-color');
    sidebarHeader.style.borderBottom = '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--sidebar-border-color');
    sidebarHeader.style.display = 'flex';
    sidebarHeader.style.alignItems = 'center';
    sidebarHeader.style.padding = '0 5px';

    // Create the minimize button
    var minimizeButton = document.createElement('span');
    minimizeButton.className = 'material-symbols-outlined';
    minimizeButton.textContent = 'right_panel_close';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.marginRight = 'auto';
    minimizeButton.style.marginLeft = '5px';
    minimizeButton.onclick = function() {
        sidebarContainer.style.width = '20px';
        minimizeButton.textContent = 'right_panel_open';
    };

    // Create the open in new tab button
    var openButton = document.createElement('span');
    openButton.className = 'material-symbols-outlined';
    openButton.textContent = 'open_in_new';
    openButton.style.cursor = 'pointer';
    openButton.style.marginLeft = 'auto';
    openButton.onclick = function() {
        var url = window.location.href;
        if (url.endsWith('/')) {
            url = url.slice(0, -1);
        }
        window.open(url, '_blank');
    };

    // Create the close sidebar button
    var closeButton = document.createElement('span');
    closeButton.className = 'material-symbols-outlined';
    closeButton.textContent = 'cancel';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = '5px';
    closeButton.onclick = function() {
        sidebarContainer.remove();
    };

    // Append buttons to the header
    sidebarHeader.appendChild(minimizeButton);
    sidebarHeader.appendChild(openButton);
    sidebarHeader.appendChild(closeButton);

    // Append header to the sidebar container
    sidebarContainer.appendChild(sidebarHeader);

    // Create the iframe for loading the web page
    var iframe = document.createElement('iframe');
    iframe.src = 'https://chat.openai.com/';
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 20px)';
    iframe.style.border = 'none';

    // Append iframe to the sidebar container
    sidebarContainer.appendChild(iframe);

    // Append sidebar container to the document body
    document.body.appendChild(sidebarContainer);

    // Handle drag and drop for resizing the sidebar
    var isResizing = false;
    var startX = 0;
    var startWidth = 0;

    sidebarHeader.addEventListener('mousedown', function(e) {
        if (e.offsetX > sidebarHeader.offsetWidth - 10) {
            isResizing = true;
            startX = e.pageX;
            startWidth = parseFloat(document.defaultView.getComputedStyle(sidebarContainer, null).getPropertyValue('width'));
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) {
            return;
        }

        var width = startWidth + (e.pageX - startX);
        width = Math.max(150, width);
        width = Math.min(window.innerWidth * 0.9, width);
        sidebarContainer.style.width = width + 'px';
    });

    document.addEventListener('mouseup', function(e) {
        isResizing = false;
    });

    // Append CSS for web fonts
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
    document.head.appendChild(fontLink);

    // Apply color scheme based on prefers-color-scheme
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        document.documentElement.style.setProperty('--sidebar-bg-color', '#1D1E20');
        document.documentElement.style.setProperty('--sidebar-font-color', '#E9E9EF');
        document.documentElement.style.setProperty('--sidebar-border-color', '#E9E9EF');
    } else {
        document.documentElement.style.setProperty('--sidebar-bg-color', '#FFFFFF');
        document.documentElement.style.setProperty('--sidebar-font-color', '#2E2F39');
        document.documentElement.style.setProperty('--sidebar-border-color', '#2E2F39');
    }

    // Create the footer
    var sidebarFooter = document.createElement('div');
    sidebarFooter.style.height = '20px';
    sidebarFooter.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-bg-color');
    sidebarFooter.style.color = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-font-color');
    sidebarFooter.style.borderTop = '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--sidebar-border-color');
    sidebarFooter.style.display = 'flex';
    sidebarFooter.style.alignItems = 'center';
    sidebarFooter.style.justifyContent = 'center';
    sidebarFooter.style.fontSize = '12px';
    sidebarFooter.textContent = '© 2023, created by JeniCode & Chat GPT';

    // Append footer to the sidebar container
    sidebarContainer.appendChild(sidebarFooter);

})();

