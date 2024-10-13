// Function to open the text editor in a new window
function openEditor() {
    const newWindow = window.open('about:blank', '_blank');
    const editorHTML = `
        <style>
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            #editor {
                flex: 1;
                width: 100%;
                resize: none;
                border: 1px solid #000;
                padding: 10px;
                font-family: monospace;
                box-sizing: border-box;
            }
            #controls {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background-color: #f1f1f1;
            }
            #save-status {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: #4CAF50; /* Saved is green */
                color: white;
                padding: 5px;
                border-radius: 3px;
            }
        </style>
        <textarea id="editor"></textarea>
        <div id="controls">
            <button onclick="manualSave()">Save</button>
            <div id="save-status">Saved</div>
        </div>
        <script>
            const storageKey = 'coolubg-custom-saves';

            // Load or initialize the storage
            let customSaves = localStorage.getItem(storageKey);
            if (!customSaves) {
                customSaves = '# Welcome to coolubg-custom-saves!\\n# Write anything here and it will save to local storage\\n\\n# MosChess Save Data:\\n\\n\\n# Submersible Save Data:\\n\\n\\n';
                localStorage.setItem(storageKey, customSaves);
            }

            const editor = document.getElementById('editor');
            const saveStatus = document.getElementById('save-status');
            let isUnsaved = false;
            editor.value = customSaves;

            // Update save status when content changes
            editor.addEventListener('input', function() {
                if (editor.value !== customSaves) {
                    saveStatus.textContent = 'Unsaved';
                    saveStatus.style.backgroundColor = '#f44336'; // Red
                    isUnsaved = true;
                } else {
                    saveStatus.textContent = 'Saved';
                    saveStatus.style.backgroundColor = '#4CAF50'; // Green
                    isUnsaved = false;
                }
            });

            // Manual save function
            function manualSave() {
                customSaves = editor.value;
                localStorage.setItem(storageKey, customSaves);
                saveStatus.textContent = 'Saved';
                saveStatus.style.backgroundColor = '#4CAF50'; // Green
                isUnsaved = false;
            }

            // Warn the user if there are unsaved changes when closing the window
            window.addEventListener('beforeunload', function (e) {
                if (isUnsaved) {
                    const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
                    e.returnValue = confirmationMessage; // Most modern browsers
                    return confirmationMessage; // For some older browsers
                }
            });
        <\/script>
    `;
    newWindow.document.write(editorHTML);
}
