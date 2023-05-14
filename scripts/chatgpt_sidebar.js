// Required styles for the sidebar
const styles = `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<style>
    :root {
        --sidebar-width: 25%;
    }
    @media (prefers-color-scheme: dark) {
        --font-color: #E9E9EF;
        --bg-color: #1D1E20;
        --border-color: #E9E9EF;
    }
    @media (prefers-color-scheme: light) {
        --font-color: #2E2F39;
        --bg-color: #FFFFFF;
        --border-color: #2E2F39;
    }
    #sidebar {
        position: fixed;
        right: 0;
        width: var(--sidebar-width);
        height: 100%;
        min-width: 150px;
        max-width: 90%;
        background-color: var(--bg-color);
        color: var(--font-color);
        border-left: 1px solid var(--border-color);
        overflow: auto;
        transition: width 0.3s ease;
    }
    #sidebar.closed {
        width: 20px;
    }
    #sidebar-header {
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid var(--border-color);
    }
    #sidebar-footer {
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        border-top: 1px solid var(--border-color);
        font-size: 10px;
    }
</style>
`;

// Required HTML for the sidebar
const html = `
<div id="sidebar">
    <div id="sidebar-header">
        <span class="material-symbols-outlined">right_panel_close</span>
        <span class="material-symbols-outlined">open_in_new</span>
        <span class="material-symbols-outlined">cancel</span>
    </div>
    <div id="sidebar-content"></div>
    <div id="sidebar-footer">© 2023, created by JeniCode & Chat GPT</div>
</div>
`;

// Append the styles and the sidebar to the document
document.body.innerHTML += styles + html;

// Load the webapp content
document.getElementById('sidebar-content').innerHTML = `<object type="text/html" data="https://chat.openai.com" style="width:100%;height:calc(100% - 40px);"></object>`;

// Toggle sidebar
document.querySelector('#sidebar-header .material-symbols-outlined').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if(sidebar.classList.contains('closed')) {
        sidebar.classList.remove('closed');
        this.textContent = 'right_panel_close';
    } else {
        sidebar.classList.add('closed');
        this.textContent = 'right_panel_open';
    }
});
