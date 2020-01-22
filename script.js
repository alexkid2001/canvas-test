document.addEventListener('DOMContentLoaded', () => {
    
    const starsCanvas = document.getElementById("stars-canvas");
    
    const coloredCanvas = document.getElementById("colored-canvas");
    

    const starParams = [
        {cx: 100, cy: 100, radius: 30, spikes: 5, inset: 2.2, color: "red"},
        {cx: 300, cy: 300, radius: 50, spikes: 5, inset: 2.2, color: "blue"},
        {cx: 500, cy: 100, radius: 20, spikes: 5, inset: 2.2, color: "green"},
        {cx: 100, cy: 500, radius: 35, spikes: 5, inset: 2.2, color: "yellow"},
        {cx: 500, cy: 500, radius: 10, spikes: 5, inset: 2.2, color: "black"}
    ];

    const drawStar = (obj, ctx) => {
        ctx.save();
        ctx.beginPath();
        ctx.translate(obj.cx, obj.cy);
        ctx.moveTo(0,0-obj.radius);
        for (let i = 0; i < obj.spikes; i++) {
            ctx.rotate(Math.PI / obj.spikes);
            ctx.lineTo(0, 0 - (obj.radius*obj.inset));
            ctx.rotate(Math.PI / obj.spikes);
            ctx.lineTo(0, 0 - obj.radius);
        }
        ctx.closePath();
        ctx.fillStyle=obj.color;
        ctx.fill();
        ctx.restore();
    };

    const initCanvas = (ctx, endX, endY) => {
        ctx.rect(0, 0, endX, endY);
        ctx.fillStyle = 'white';
        ctx.fill();
    };

    const rgbToHex = (r, g, b) => {
        return "#" +
            ("0" + parseInt(r).toString(16)).slice(-2) +
            ("0" + parseInt(g).toString(16)).slice(-2) +
            ("0" + parseInt(b).toString(16)).slice(-2);
    };

    if (starsCanvas.getContext && coloredCanvas.getContext){
        let starsCtx = starsCanvas.getContext("2d");
        let coloredCtx = coloredCanvas.getContext("2d");
    
        initCanvas(starsCtx, 600, 600);
        initCanvas(coloredCtx, 600, 50);

        starParams.forEach((item) => {
            drawStar(item, starsCtx);
        });

        starsCanvas.addEventListener('click', () => {
            let pix = starsCtx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            let hex = "#" + ("000000" + rgbToHex(pix[0], pix[1], pix[2])).slice(-6);
            coloredCtx.fillStyle = hex;
            coloredCtx.fill();
        });
    }

    

});
