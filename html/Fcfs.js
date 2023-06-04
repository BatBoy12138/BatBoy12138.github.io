//测试数据1,2,4;  2,8,4;  3,10,4;  4,17,3
function ShowFCFS(process, now_select) {
    // 设置矩形初始位置和大小
    if (now_select === "FCFS") {
        process.sort((a, b) => a[1] - b[1]); // 按照 process[i][1] 从小到大排序
    }
    // for (let i = 0; i < process.length; i++) {
    //     process[i].push(['rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')']);
    // }
    const rectWidth = 30; // 设置矩形宽度为 30，1S 代表 30 的宽度
    const rectHeight = 50; // 设置矩形高度为 50
    let begin_X = (30 * process[0][1]); // 计算第一个进程的矩形起始位置
    let end_X = begin_X + (30 * process[0][2]); // 计算第一个进程的矩形结束位置
    let rectX = begin_X; // 设置矩形当前位置为起始位置
    let rectY = 50; // 设置矩形纵向位置为 50
    let begin_time = process[0][1]; // 记录第一个进程的起始时间
    let end_time = begin_time + process[0][2]; // 记录第一个进程的结束时间
    let i = 1; // 初始化进程计数器为 1
    let flag = 1; // 用于避免数字重影
    let Y_position;
    var infoBox = null;
    ctx.font = "15px Arial";
    ctx.fillStyle=process[0][process[i].length-1];
    if(!isInt(now_select))
        Y_position=0;
    else
        Y_position=now_select;
    drawline();

    function isInt(value) {
        return !isNaN(value) &&
            parseInt(Number(value)) === value &&
            !isNaN(parseInt(value, 10));
    }
    function drawRect() {
        ctx.fillRect(rectX, rectY+Y_position, rectWidth, rectHeight);  // 绘制矩形
    }

    function drawline() {
        ctx.beginPath();
        ctx.moveTo(begin_X, (rectY + rectHeight + 10)+Y_position); // 设置起始点
        // 绘制时间轴和对应时间
        if (flag === 1)
            ctx.fillText(begin_time + 's', (begin_X - 5), rectY + rectHeight + 25+Y_position);

        ctx.lineTo(end_X, (rectY + rectHeight + 10)+Y_position);
        ctx.fillText(end_time + 's', (end_X - 5), (rectY + rectHeight + 25)+Y_position);

        ctx.fillText('P' + process[i - 1][0], end_X - 5, 45+Y_position);
        ctx.strokeStyle = '#000000'; // 设置线条颜色为黑色
        ctx.stroke(); // 绘制路径线条

    }

    const animate = function () {
        // function animate() {
        // 绘制矩形和分割线条

        drawRect();
        // 如果当前矩形没有到达目标位置，继续向右移动
        if (rectX + rectWidth <= end_X) {
            rectX = rectX + 5 + speed; // 矩形向右移动的像素数,0.5时候与时间匹配
            // if (rectX + rectWidth > canvas.width) {
            //     canvas.width = rectX + 100; // 调整 Canvas 宽度以容纳整个矩形
            // }
            if (rectX + rectWidth > canvas.width) {
                end_X-=rectX;
                Y_position+=100;
                rectX = 0; // 重置矩形位置到起始位置
                begin_X=0;
                flag=0;
                drawline();
            }
        } else if (i >= process.length) { // 如果所有进程已经绘制完成，就退出动画循环
            return;
        } else if (i < process.length) { // 如果当前进程已经完成，准备绘制下一个进程
            // 计算下一个进程矩形的起始和结束位置
            if (end_X < 30 * process[i][1]) {// 如果下一个进程的起始时间在当前进程之后，就把当前矩形移动到下一个进程的起始位置
                rectX = 30 * process[i][1];
                begin_X = rectX;
                end_X = 30 * process[i][1] + 30 * process[i][2];
                begin_time = process[i][1];
                flag = 1;
                end_time = begin_time + process[i][2];
            } else {// 如果下一个进程的起始时间在当前进程之前，就把当前矩形移动到当前进程的结束位置
                rectX = end_X;
                begin_X = rectX;
                end_X += (30 * process[i][2]);
                begin_time += process[i - 1][2];
                flag = 0;//此时不显示数字，否则会显示重影
                end_time = begin_time + process[i][2];
            }

            if (rectX + rectWidth > canvas.width) {
                end_X=process[process.length-1][1]*30-880;
                Y_position+=100;
                rectX = 0; // 重置矩形位置到起始位置
                begin_X=0;
                // flag=0;
                end_time=process[process.length-1][1];
                drawline();
            }
            // 随机生成矩形填充色
            if(now_select!=='PPS'&&!isInt(now_select)&&now_select!=='MLFQ')
            ctx.fillStyle = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
            else ctx.fillStyle=process[i][process[i].length-1];
            // 准备绘制下一个进程
            i++;
            drawline();
        }
        //请求动画帧
        if(pause_flag===false){
            animationId = requestAnimationFrame(animate);
        }
    }

    animate();
    // 开始动画循环
}
