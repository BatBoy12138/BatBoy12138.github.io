// 获取 Canvas 元素和 2D 绘图上下文对象
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置矩形初始位置和大小
let rectX = 0;
let rectY = 0;
const rectWidth = 50;
const rectHeight = 50;

// 绘制矩形
function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清空画布
    ctx.fillStyle = '#00FF00';  // 设置矩形填充颜色
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);  // 绘制矩形
}

// 动画循环
function animate() {
    drawRect();  // 重新绘制矩形
    if(rectX<400){
        rectX += 2;  // 矩形向右移动 2 像素
    }
    else{
        rectY+=50;
        rectX=0;
    }
    requestAnimationFrame(animate);  // 请求动画帧
}

animate();  // 开始动画循环
