 // 节流
export const  throttle = function(func, wait, mustRun) {
        var timeout;
        var startTime = new Date();
        return function () {
          var endTime = new Date();
          clearTimeout(timeout);
          if (endTime - startTime > mustRun) {
            func.apply(this, arguments);
            startTime = new Date();
          }
          timeout = setTimeout(()=>{
            func.apply(this, arguments)
          }, wait);
        };
      }