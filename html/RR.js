// 测试数据1,8,2;  2,5,5;  3,5,3;  4,2,3    1,1,3;  2,5,3   1,0,4;  2,1,4;  3,2,4;  4,3,4
function ShowRR(process, RR_time) {
    let queue = [];
    let current_time = 0;
    Find_Current();
    RR_time = RR_time * 1;
    let begin_X = (30 * queue[0][0][1]); // 计算第一个进程的矩形起始位置
    let end_X = 0;
    // if (RR_time >= queue[0][0][2])
    //     end_X = begin_X + 30 * RR_time;
    // else
    //     end_X = begin_X + 30 * queue[0][0][2];
    end_X = begin_X + 30 * RR_time;

    let rectX = begin_X; // 设置矩形当前位置为起始位置
    let rectY = 50; // 设置矩形纵向位置为 50
    let rectWidth = 30; // 设置矩形宽度为 30，1S 代表 30 的宽度
    const rectHeight = 50; // 设置矩形高度为 50
    let begin_time = queue[0][0][1]; // 记录第一个进程的起始时间
    let end_time;
    ctx.font = "14px Arial";
    RR_run();
    function Find_Current() {
        let first_process = 0;
        for (let i = 1; i < process.length; i++) {
            if (process[first_process][1] > process[i][1])
                first_process = i;
        }
        queue.push([process[first_process], 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')']);
        //js pop 弹出最后一个元素 用shift或splice
        process.splice(first_process, 1);
    }

    function animate() {
        //var animate = function(){
        drawRect(queue);
        if (rectX + rectWidth <= end_X) {

            rectX = rectX + 2 + speed; // 矩形向右移动的像素数,0.5时候与时间匹配
            //window.setTimeout('requestAnimationFrame(animate)',1000);
            //setInterval(requestAnimationFrame(animate), 500);
            animate();
        }
        //animate();
        requestAnimationFrame(animate);
    }

    function drawRect(queue) {
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);  // 绘制矩形
    }

    function drawline(queue) {
        ctx.beginPath();
        ctx.moveTo(begin_X, rectY + rectHeight + 10); // 设置起始点
        ctx.lineTo(end_X, rectY + rectHeight + 10);
        ctx.fillText(current_time + 's', begin_X - 5, rectY + rectHeight + 25);
        //ctx.fillText(queue[0][0][1]+'s',begin_X-5,rectY+rectHeight+25);
        ctx.fillText('P' + queue[0][0][0], begin_X, 35);
        ctx.strokeStyle = '#000000'; // 设置线条颜色为黑色
        ctx.stroke(); // 绘制路径线条
    }

    function RR_run() {

        while (process.length !== 0 || queue.length !== 0) {

            while (queue[0][0][2] === 0 || queue.length === 0) {
                if (queue[0][0][2] === 0) {
                    queue.shift();
                    if (queue.length === 0 && process.length !== 0)
                        Find_Current();
                }
                if (queue.length === 0 && process.length === 0)
                    return;
            }

            ctx.fillStyle = queue[0][1];

            if (queue[0][0][2] >= RR_time) {//剩余运行时间大于时间片
                if (current_time <= queue[0][0][1])
                    begin_time = queue[0][0][1];
                else
                    begin_time = current_time;

                current_time = begin_time;
                rectX = current_time * 30;
                begin_X = rectX;
                end_X = begin_X + RR_time * 30;
                rectWidth = 30*RR_time;

                animate();
                drawline(queue);

                end_time = current_time + RR_time;
                queue[0][0][1] = end_time;
                queue[0][0][2] -= RR_time;
                current_time = end_time;

                let min_process = 0;
                if (process.length !== 0) {//还有进程未上过处理机
                    for (let j = 1; j <= process.length; j++) {
                        for (let i = 0; i < process.length; i++) {
                            if (process[min_process][1] > process[i][1])
                                min_process = i;
                        }
                        if (current_time >= process[min_process][1]) {//时间片结束前有新进程到达
                            Find_Current();
                        }

                    }
                    queue.push(queue.shift());
                } else {//所有队列均上过处理机
                    queue.push(queue.shift());
                }
            } else {
                if (current_time <= queue[0][0][1])
                    begin_time = queue[0][0][1];
                else
                    begin_time = current_time;

                current_time = begin_time;
                rectX = current_time * 30;
                begin_X = rectX;
                end_X = begin_X + queue[0][0][2] * 30;
                rectWidth=30*queue[0][0][2];     //更改绘制宽度

                animate();
                drawline(queue);

                end_time = current_time + queue[0][0][2];
                queue[0][0][1] = end_time;
                queue[0][0][2] = 0;
                current_time = end_time;
            }
            // animate();
            // drawline(queue);
        }
        //animate();
    }



}

//测试数据1,8,2;2,5,5;3,5,3;4,2,3    1,1,3;2,5,3   1,0,4;2,1,4;3,2,4;4,3,4
// function ShowRR(process,RR_time){
//     function calculateQueue(process, timeSlice) {
//         const queue = [];
//         let currentTime = 0;
//         let remainingProcesses = [...process]; // 创建进程副本，用于迭代过程中的处理
//
//         while (remainingProcesses.length > 0) {
//             const currentProcess = remainingProcesses[0]; // 获取队列中的下一个进程
//             const [processId, startTime, remainingTime] = currentProcess;
//
//             if (remainingTime > timeSlice) {
//                 // 当前进程剩余执行时间大于时间片大小
//                 queue.push([processId, currentTime, currentTime + timeSlice]); // 将当前进程加入队列
//                 currentTime += timeSlice; // 更新当前时间
//                 currentProcess[2] -= timeSlice; // 更新当前进程的剩余执行时间
//             } else {
//                 // 当前进程剩余执行时间小于等于时间片大小
//                 queue.push([processId, currentTime, currentTime + remainingTime]); // 将当前进程加入队列
//                 currentTime += remainingTime; // 更新当前时间
//                 currentProcess[2] = 0; // 将当前进程的剩余执行时间置为0，表示已经执行完毕
//                 remainingProcesses.shift(); // 将当前进程从待处理进程列表中移除
//             }
//
//             // 检查是否有新的进程在当前时间片内到达并加入队列
//             for (let i = 0; i < remainingProcesses.length; i++) {
//                 const [arrivalTime] = remainingProcesses[i];
//                 if (arrivalTime <= currentTime) {
//                     // 到达时间小于等于当前时间，将进程加入队列
//                     queue.push([
//                         remainingProcesses[i][0],
//                         currentTime,
//                         currentTime + timeSlice
//                     ]);
//                     remainingProcesses[i][1] = currentTime; // 更新进程的开始执行时间为当前时间
//                     remainingProcesses[i][2] -= timeSlice; // 更新进程的剩余执行时间
//                     remainingProcesses.sort((a, b) => a[2] - b[2]); // 根据剩余执行时间进行排序
//                     remainingProcesses.splice(i, 1); // 将进程从待处理进程列表中移除
//                     i--; // 更新索引
//                 }
//             }
//         }
//
//         return queue;
//     }
//
//     const timeSlice = 2;
//
//     const queue = calculateQueue(process, timeSlice);
//     console.log(queue);
//     ShowFCFS(queue);
// }
