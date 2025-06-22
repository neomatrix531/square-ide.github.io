class HtmlSaver {
    getInfo() {
        return {
            id: 'htmlsaver',
            name: 'HTML Saver',
            color1: '#25a18e',
            blocks: [
                {
                    opcode: 'saveText',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'save text [TEXT] as file [FILENAME].html',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '<h1>Hello, world!</h1>'
                        },
                        FILENAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'myfile'
                        }
                    }
                }
            ],
            menus: {}
        };
    }

    saveText(args) {
        const text = args.TEXT || '';
        const filename = (args.FILENAME || 'file') + '.html';
        const blob = new Blob([text], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
}

Scratch.extensions.register(new HtmlSaver());