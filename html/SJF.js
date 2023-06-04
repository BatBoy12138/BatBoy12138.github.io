//测试数据1,8,2;  2,5,5;  3,5,3;  4,2,3
function ShowSJF(process, now_select) {
// 调用SjfSort函数对进程按照短作业优先排序
    process = SjfSort(process);
// 弹出排序后的进程数组，方便调试
    alert(process);
// 调用ShowFCFS函数展示进程的执行过程和结果
    ShowFCFS(process, now_select);
    // SjfSort函数用于对进程按照短作业优先排序
// 接收一个包含多个进程信息的数组，每个进程信息由进程ID，到达时间和执行时间组成
// 函数返回排序后的进程数组
    function SjfSort(process) {
        // 用一个新的数组来保存已排序的进程
        let sortedProcess = [];
        // 用一个变量来记录当前时间
        let time = 0;
        // 循环直到所有进程都被排序
        while (sortedProcess.length < process.length) {
            let shortestProcessIndex = null;
            let shortestProcessTime = Infinity;
            // 找到最短的未完成的进程
            for (let i = 0; i < process.length; i++) {
                if (process[i][1] <= time && process[i][2] < shortestProcessTime && !sortedProcess.includes(process[i])) {
                    shortestProcessIndex = i;
                    shortestProcessTime = process[i][2];
                }
            }
            // 如果找到了最短的进程，将其添加到已排序数组中，并更新时间
            if (shortestProcessIndex !== null) {
                sortedProcess.push(process[shortestProcessIndex]);
                time += process[shortestProcessIndex][2];
            } else {
                // 如果没有找到最短的进程，时间加1
                time++;
            }
        }
        return sortedProcess;
    }

}