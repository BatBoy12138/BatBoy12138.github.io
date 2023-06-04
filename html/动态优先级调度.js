var PgObj = function (name, arrivedtime, runtime, priority) {
    this.name = name;
    this.arrivedtime = arrivedtime;
    this.runtime = runtime;
    this.priority = priority;
};
PgObj.prototype.createPro = function () {

    var element=document.getElementById("ps");
    var newdiv = document.createElement("div");
    var newPg = document.createElement("progress");
    var newHN = document.createElement("h3");

    newPg.max = 100;
    newPg.value = 0;
    newPg.id = this.name;
    newHN.innerText = "作业" + this.name + "在第" + this.arrivedtime + "S到达" +
        "运行时间" + this.runtime + "S " + "优先级为" + this.priority + ".";
    newdiv.appendChild(newHN);
    newdiv.appendChild(newPg);
    element.appendChild(newdiv);

    var pg = document.getElementById(this.name);
    var f = 0;
    setInterval(function () {

        if (pg.value!=100) pg.value++;
        else {
            pg.value=100;
            if(f == 0){
                f = 1;
                flag = 1;
            }
        }
    }, this.runtime*5);
};
