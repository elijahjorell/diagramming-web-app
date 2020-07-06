var mLogProxied = [];
var mLog = new Proxy(mLogProxied, {
    set: function(target, property, value) {
        if (property === 'length') {
          console.log(mLog[value - 1])
        }
        target[property] = value;
        return true;
      }
}); 