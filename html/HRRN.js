//测试数据1,0,6; 2,2,6;  3,5,1;  4,7,10
function ShowHRRN(process, now_select) {
    function calculateResponseRatio(processes, currentTime) {
        const responseRatios = [];
        for (const process of processes) {
            const [processId, arrivalTime, burstTime] = process;//解构赋值：process 数组中的元素解构为单独的变量 processId、arrivalTime 和 burstTime
            if (arrivalTime > currentTime) {
                responseRatios.push(0); // 若进程尚未到达，响应比设为0
            } else {
                const waitTime = Math.max(0, currentTime - arrivalTime); // 等待时间为当前时间减去到达时间，若小于0则设为0
                const responseRatio = (burstTime + waitTime) / burstTime;
                responseRatios.push(responseRatio);
            }
        }
        return responseRatios;
    }

    function highResponseRatio(processes) {
        let currentTime = 0;
        const results = [];
        const logTextarea = document.querySelector("#log"); // 获取输出日志的textarea元素
        logTextarea.value = ""; // 清空日志
        while (processes.length > 0) {
            const responseRatios = calculateResponseRatio(processes, currentTime);
            let logStr = `第${currentTime}秒时，\n`;
            for (let i = 0; i < processes.length; i++) {
                const [processId, arrivalTime, burstTime] = processes[i];
                if (arrivalTime <= currentTime) {
                    logStr += `P${processId}响应比为(${burstTime}+${Math.max(0, currentTime - arrivalTime)})/${burstTime}=${responseRatios[i].toFixed(2)}，\n`;
                }
            }
            logTextarea.value += logStr + "\n";
            const maxResponseRatio = Math.max(...responseRatios);//...responseRatios 将数组 responseRatios 展开为一系列参数
            const maxIndex = responseRatios.indexOf(maxResponseRatio);
            const [processId, arrivalTime, burstTime] = processes[maxIndex];
            const waitTime = Math.max(0, currentTime - arrivalTime);
            // logTextarea.value += `第${currentTime}秒时，P${processId}上处理机，剩余时间${burstTime - waitTime}秒\n`;
            // currentTime += burstTime;
            logTextarea.value += `⭐⭐⭐第${currentTime}秒时，P${processId}上处理机\n`;
            currentTime += burstTime;
            results.push(processes[maxIndex]);
            processes.splice(maxIndex, 1);
        }
        return results;
    }

    const results = highResponseRatio(process);
    const logTextarea = document.querySelector("#log");
    logTextarea.value += "\n按照高响应比优先调度算法排序后的进程列表：\n";
    for (const process of results) {
        logTextarea.value += `P${process[0]}，`;
    }
    logTextarea.value = logTextarea.value.slice(0, -1); // 去掉最后一个逗号
    logTextarea.value += "\n\n";
    ShowFCFS(results, "HRRN");
}

