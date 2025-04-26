export function handleDynamicTerminalBlocks() {
    const terminalBlocks = document.querySelectorAll('.terminal');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const block = entry.target;
                if (block.dataset.typed !== "true") {
                    typeTerminalCommand(block);
                    block.dataset.typed = "true";
                }
            }
        });
    }, {
        threshold: 1.0
    });

    terminalBlocks.forEach(block => observer.observe(block));

    function typeTerminalCommand(block) {
        const command = block.getAttribute('data-command');
        const prompt = block.getAttribute('data-prompt') || '$';
        const content = block.querySelector('.terminal-content');
        content.textContent = prompt + ' ';

        let index = 0;

        function typeNextChar() {
            if (index < command.length) {
                content.textContent = prompt + ' ' + command.substring(0, index + 1);
                index++;
                setTimeout(typeNextChar, 20);
            }
        }

        typeNextChar();

        const copyBtn = block.querySelector('.copy-button-terminal');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(command).then(() => {
                copyBtn.innerText = "Копирано!";
                setTimeout(() => {
                    copyBtn.innerText = "Копирай";
                }, 2000);
            });
        });
    }
}