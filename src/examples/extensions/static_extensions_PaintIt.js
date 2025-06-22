class PaintIt {
    getInfo() {
        return {
            id: 'paintit',
            name: 'PaintIt',
            color1: '#e67e22',
            blocks: [
                {
                    opcode: 'drawRect',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'draw rectangle at x: [X] y: [Y] width: [W] height: [H] color: [COLOR]',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        W: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        H: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        COLOR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "#ff0000"
                        }
                    }
                },
                {
                    opcode: 'clear',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'clear paint'
                }
            ],
            menus: {}
        };
    }

    getCanvas() {
        // Try to find or create a canvas overlay
        let canvas = document.getElementById('paintit-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'paintit-canvas';
            canvas.style.position = 'absolute';
            canvas.style.left = '0';
            canvas.style.top = '0';
            canvas.style.pointerEvents = 'none'; // Allow Scratch blocks to interact
            // Try to size to the stage
            const stage = document.querySelector('.stage_stage_1fD7k, .stage-wrapper_stage-wrapper_1DaGg, .stage-canvas');
            if (stage) {
                canvas.width = stage.offsetWidth;
                canvas.height = stage.offsetHeight;
                stage.appendChild(canvas);
            } else {
                canvas.width = 480;
                canvas.height = 360;
                document.body.appendChild(canvas);
            }
        }
        return canvas;
    }

    drawRect(args) {
        const canvas = this.getCanvas();
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = args.COLOR || "#ff0000";
        ctx.fillRect(args.X, args.Y, args.W, args.H);
    }

    clear() {
        const canvas = this.getCanvas();
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

Scratch.extensions.register(new PaintIt());