function openEditor(fileKey, fileData) {
    const newWindow = window.open('about:blank', '_blank');
    const editorHTML = `
    <title>${fileKey} - Save File Editor</title>
        <style>
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
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
                background-color: #eee;
                border-top: 1px solid #ccc;
            }
            #save-status {
                margin-left: 10px;
                color: green;
                font-weight: bold;
            }
        </style>
        <textarea id="editor">${fileData}</textarea>
        <div id="controls">
            <button id="saveButton">Save</button>
            <div id="save-status">Saved</div>
        </div>
        <script>
            const editor = document.getElementById('editor');
            const saveButton = document.getElementById('saveButton');
            const saveStatus = document.getElementById('save-status');

            let unsavedChanges = false;

            // Update save status on input
            editor.addEventListener('input', () => {
                saveStatus.textContent = 'Unsaved';
                saveStatus.style.color = 'red';
                unsavedChanges = true;
            });

            // Save function
            saveButton.addEventListener('click', () => {
                const updatedData = editor.value;
                localStorage.setItem('${fileKey}', updatedData);
                saveStatus.textContent = 'Saved';
                saveStatus.style.color = 'green';
                unsavedChanges = false;
            });

            // Warn before closing if unsaved changes exist
            window.addEventListener('beforeunload', (event) => {
                if (unsavedChanges) {
                    const message = 'You have unsaved changes.';
                    event.returnValue = message;
                    return message;
                }
            });
        </script>
    `;
    newWindow.document.write(editorHTML);
    newWindow.document.close();
}
