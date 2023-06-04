// //1,0,5,1;2,2,2,2;3,6,6,2;4,9,4,3;5,11,2,4
// function ShowPPS(process,now_select) {
//     for(let i=0;i<process.length;i++){
//         process[i].push(['rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'])
//     }
//     alert("process:"+process);
//     function preemptivePriorityScheduling(process) {
//         // 根据进程的到达时间进行排序
//         process.sort((a, b) => a[1] - b[1]);
//
//         let queue = []; // 存储执行过程的队列
//         let time = 0; // 当前时间
//         let completed = 0; // 已完成的进程数
//
//         while (completed < process.length) {
//             let highestPriority = -1; // 最高优先级
//             let highestPriorityIndex = -1; // 最高优先级进程在进程数组中的索引
//
//             // 找到当前时间下优先级最高的进程
//             for (let i = 0; i < process.length; i++) {
//                 if (process[i][1] <= time && process[i][3] > highestPriority && process[i][2] > 0) {
//                     highestPriority = process[i][3];
//                     highestPriorityIndex = i;
//                 }
//             }
//
//             if (highestPriorityIndex === -1) {
//                 time++; // 当前时间无进程可执行，时间加1
//                 continue;
//             }
//
//             // 合并时间片，取预计执行时间和剩余执行时间中较小的值
//             const timeSlice = Math.min(1, process[highestPriorityIndex][2]);
//
//             if (queue.length > 0 && queue[queue.length - 1][0] === process[highestPriorityIndex][0]) {
//                 // 如果队列中已经有该进程，并且前一次执行的结束时间和当前时间相同，则将时间片合并
//                 queue[queue.length - 1][2] += timeSlice;
//             } else {
//                 // 否则，将新的时间片加入队列
//                 queue.push([
//                     process[highestPriorityIndex][0], // 进程ID
//                     time, // 到达时间
//                     timeSlice, // 该次执行时间
//                     process[highestPriorityIndex][3], // 优先级
//                 ]);
//             }
//
//             // 更新进程信息
//             process[highestPriorityIndex][2] -= timeSlice;
//             time++;
//
//             if (process[highestPriorityIndex][2] === 0) {
//                 completed++; // 进程执行完毕，已完成的进程数加1
//             }
//         }
//
//         // 返回队列和整个程序的执行时间
//         return { queue, totalTime: queue[queue.length - 1][1] + queue[queue.length - 1][2] };
//     }
//
// // 调用函数并输出结果
//     const { queue, totalTime } = preemptivePriorityScheduling(process);
//     console.log(queue);
//     console.log("整个程序的执行时间：" + totalTime);
//     ShowFCFS(queue,now_select);
// }
//
// //1,0,5,1;  2,2,2,2;  3,6,6,2;  4,9,4,3;  5,11,2,4
function ShowPPS(process, now_select) {
    for (let i = 0; i < process.length; i++) {
        process[i].push(['rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')']);
    }
    function preemptivePriorityScheduling(process) {
        // 根据进程的到达时间进行排序
        process.sort((a, b) => a[1] - b[1]);

        let queue = []; // 存储执行过程的队列
        let time = 0; // 当前时间
        let completed = 0; // 已完成的进程数

        while (completed < process.length) {
            let highestPriority = -1; // 最高优先级
            let highestPriorityIndex = -1; // 最高优先级进程在进程数组中的索引

            // 找到当前时间下优先级最高的进程
            for (let i = 0; i < process.length; i++) {
                if (process[i][1] <= time && process[i][3] > highestPriority && process[i][2] > 0) {
                    highestPriority = process[i][3];
                    highestPriorityIndex = i;
                }
            }

            if (highestPriorityIndex === -1) {
                time++; // 当前时间无进程可执行，时间加1
                continue;
            }

            // 合并时间片，取预计执行时间和剩余执行时间中较小的值
            const timeSlice = Math.min(1, process[highestPriorityIndex][2]);

            if (queue.length > 0 && queue[queue.length - 1][0] === process[highestPriorityIndex][0]) {
                // 如果队列中已经有该进程，并且前一次执行的结束时间和当前时间相同，则将时间片合并
                queue[queue.length - 1][2] += timeSlice;
            } else {
                // 否则，将新的时间片加入队列
                queue.push([
                    process[highestPriorityIndex][0], // 进程ID
                    time, // 到达时间
                    timeSlice, // 该次执行时间
                    process[highestPriorityIndex][3], // 优先级
                    process[highestPriorityIndex][4], // 颜色 (新增)
                ]);
            }

            // 更新进程信息
            process[highestPriorityIndex][2] -= timeSlice;
            time++;

            if (process[highestPriorityIndex][2] === 0) {
                completed++; // 进程执行完毕，已完成的进程数加1
            }
        }

        // 返回队列和整个程序的执行时间
        return { queue, totalTime: queue[queue.length - 1][1] + queue[queue.length - 1][2] };
    }

    // 调用函数并输出结果
    const { queue, totalTime } = preemptivePriorityScheduling(process);
    console.log(queue);
    alert("queue:" + queue);
    console.log("整个程序的执行时间：" + totalTime);
    ShowFCFS(queue, now_select);
}