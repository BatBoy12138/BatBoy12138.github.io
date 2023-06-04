// //1,1,6,1;  2,2,3,2;  3,3,4,3;  4,4,2,1;  5,5,4,2
function ShowNPPS(process,now_select){
    alert("process:"+process);
    let queue = [];
    let currentTime = 0;

    while (process.length > 0) {
        let highestPriorityIndex = -1;
        let highestPriority = -1;

        // 遍历进程数组，找到当前时间片内最高优先级的进程
        for (let i = 0; i < process.length; i++) {
            if (process[i][1] <= currentTime && process[i][3] > highestPriority) {
                highestPriority = process[i][3];
                highestPriorityIndex = i;
            }
        }

        if (highestPriorityIndex !== -1) {
            // 将最高优先级的进程插入队列
            queue.push(process[highestPriorityIndex]);
            // 更新当前时间
            currentTime += process[highestPriorityIndex][2];
            // 从进程数组中删除已插入队列的进程
            process.splice(highestPriorityIndex, 1);
        } else {
            // 当前时间片内没有进程可执行，时间加一
            currentTime++;
        }
    }

    alert("queue:"+queue);
    ShowFCFS(queue,now_select);
}
