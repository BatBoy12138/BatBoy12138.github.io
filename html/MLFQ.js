//1,0,4; 2,1,3; 3,2,8; 4,3,1; 5,4,9
function runMultilevelFeedbackQueue(processes) {
    $('#log').val('');  //实现清屏操作
    const allQueues = [[], [], [], []]; // 四个队列
    const queueResults = [[], [], [], []]; // 保存每个队列中每个进程的执行情况
    let current_time=0;

    // 根据 processes[1] 进行排序
    processes.sort((a, b) => a[1] - b[1]);
// 执行 for 循环
    for (let i = 0; i < processes.length; i++) {
        allQueues[0].push(processes[i]);
    }

    let allQueuesEmpty = false; // 是否所有队列都为空

    while (!allQueuesEmpty) {
        allQueuesEmpty = true; // 假设所有队列都为空

        // 第一级队列执行FCFS算法，时间片为1
        if (allQueues[0].length > 0) {
            const currentProcess = allQueues[0].shift();
            currentProcess.push('rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')');
            queueResults[0].push([currentProcess[0], currentProcess[1], 1,currentProcess[3]]);
            currentProcess[2]--;
            current_time++;

            // 输出相关信息
            const fcfsQueueSize = allQueues[0].length + 1; // 当前一级队列中进程数量
            const fcfsQueueFinished = currentProcess[2] === 0; // 是否有进程在该队列执行完成
            let fcfsQueueInfo = `第${current_time}秒，一级队列(${fcfsQueueSize}个进程): `;

            if (fcfsQueueFinished) {
                fcfsQueueInfo += `⭐⭐⭐P${currentProcess[0]} 执行完成\n`;
            } else {
                fcfsQueueInfo += `正在执行P${currentProcess[0]}进程...\n`;
            }

            document.getElementById('log').value += fcfsQueueInfo;

            // 如果进程还有剩余时间，加入第二级队列
            if (currentProcess[2] > 0) {
                allQueues[1].push(currentProcess);
            }
        }


        // 第二级队列执行FCFS算法，时间片为2
       else if (allQueues[1].length > 0) {
            const currentProcess = allQueues[1].shift();
            currentProcess[1]=current_time;

            queueResults[1].push([currentProcess[0], currentProcess[1], Math.min(currentProcess[2], 2),currentProcess[3]]);
            current_time+=Math.min(currentProcess[2], 2);
            currentProcess[2]-=Math.min(currentProcess[2], 2);

            // 输出相关信息
            const fcfsQueueSize = allQueues[1].length + 1; // 当前一级队列中进程数量
            const fcfsQueueFinished = currentProcess[2] === 0; // 是否有进程在该队列执行完成
            let fcfsQueueInfo = `第${current_time}秒，二级队列(${fcfsQueueSize}个进程): `;
            if (fcfsQueueFinished) {
                fcfsQueueInfo += `⭐⭐⭐P${currentProcess[0]} 执行完成\n`;
            } else {
                fcfsQueueInfo += `正在执行P${currentProcess[0]}进程...\n`;
            }
            document.getElementById('log').value += fcfsQueueInfo;

            // 如果进程还有剩余时间，加入第三级队列
            if (currentProcess[2] > 0) {
                allQueues[2].push(currentProcess);
            }
        }

        // 第三级队列执行FCFS算法，时间片为3
       else if (allQueues[2].length > 0) {
            const currentProcess = allQueues[2].shift();
            currentProcess[1]=current_time;

            queueResults[2].push([currentProcess[0], currentProcess[1], Math.min(currentProcess[2], 3),currentProcess[3]]);
            current_time+=Math.min(currentProcess[2], 3);
            currentProcess[2]-=Math.min(currentProcess[2], 3);

            // 输出相关信息
            const fcfsQueueSize = allQueues[2].length + 1; // 当前一级队列中进程数量
            const fcfsQueueFinished = currentProcess[2] === 0; // 是否有进程在该队列执行完成
            let fcfsQueueInfo = `第${current_time}秒，三级队列(${fcfsQueueSize}个进程): `;
            if (fcfsQueueFinished) {
                fcfsQueueInfo += `⭐⭐⭐P${currentProcess[0]} 执行完成\n`;
            } else {
                fcfsQueueInfo += `正在执行P${currentProcess[0]}进程...\n`;
            }
            document.getElementById('log').value += fcfsQueueInfo;

            // 如果进程还有剩余时间，加入第四级队列
            if (currentProcess[2] > 0) {
                allQueues[3].push(currentProcess);
            }
        }

        // 第四级队列执行时间片轮转算法，时间片为1
       else if (allQueues[3].length > 0) {
            const currentProcess = allQueues[3].shift();
            currentProcess[1]=current_time;

            queueResults[3].push([currentProcess[0], currentProcess[1], 1,currentProcess[3]]);
            current_time++;
            currentProcess[2]--;

            // 输出相关信息
            const fcfsQueueSize = allQueues[3].length + 1; // 当前一级队列中进程数量
            const fcfsQueueFinished = currentProcess[2] === 0; // 是否有进程在该队列执行完成
            let fcfsQueueInfo = `第${current_time}秒，四级队列(${fcfsQueueSize}个进程): `;
            if (fcfsQueueFinished) {
                fcfsQueueInfo += `⭐⭐⭐P${currentProcess[0]} 执行完成\n`;
            } else {
                fcfsQueueInfo += `正在执行P${currentProcess[0]}进程...\n`;
            }
            document.getElementById('log').value += fcfsQueueInfo;

            // 如果进程还有剩余时间，重新加入第四级队列
            if (currentProcess[2] > 0) {
                allQueues[3].push(currentProcess);
            }
        }

        // 判断是否所有队列都为空
        for (let i = 0; i < allQueues.length; i++) {
            if (allQueues[i].length > 0) {
                allQueuesEmpty = false;
                break;
            }
        }
    }

    return queueResults;
}
//1,0,4; 2,5,3; 3,2,8; 4,3,1; 5,4,9

function ShowMLFQ(processes, now_select){

    const queueResults = runMultilevelFeedbackQueue(processes, 4, 1);
    //传过去画动画
    //两次调用同步执行，故应该改为异步(串行)
    // ShowFCFS(queueResults[0],now_select);
    // ShowFCFS(queueResults[1],85);//此时now_select 表示画像向下移动85px
    //ShowFCFS(queueResults[2],170);
    function runAnimation() {
        ShowFCFS(queueResults[0], now_select);
        setTimeout(() => {
            ShowFCFS(queueResults[1], 85);
            setTimeout(() => {
                ShowFCFS(queueResults[2], 170);
                setTimeout(() => {
                    ShowFCFS(queueResults[3], 255);
                },1500);// 延迟0.5秒后执行第四次调用
            }, 1000); // 延迟0.5秒后执行第三次调用
        }, 500); // 延迟0.5秒后执行第二次调用
    }

    runAnimation();
}
