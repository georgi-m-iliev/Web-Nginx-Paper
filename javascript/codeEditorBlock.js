export function handleCodeEditorBlockCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-editor').querySelector('code');
            const rawCode = codeBlock.getAttribute('data-code') || codeBlock.innerText;
            navigator.clipboard.writeText(rawCode).then(() => {
                this.innerText = "Копирано!";
                setTimeout(() => {
                    this.innerText = "Копирай";
                }, 2000);
            });
        });
    });
}