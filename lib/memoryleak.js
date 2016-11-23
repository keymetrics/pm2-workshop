module.exports = function memoryleak(options, callback) {

  const time            = options.interval || 400;
  const max             = options.max_size * 10 || 5e9; //~500mb
  const bigMemoryLeak = [];

  let size            = 0; //number of iterations

  const stress = function(cb) {

    let j = 1e5, arr = [];

    size += j * 500;

    while (j--) {
        //wc -c => 500
        arr[j] = {
          lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non odio venenatis, pretium ligula nec, fringilla ipsum. Sed a erat et sem blandit dignissim. Pellentesque sollicitudin felis eu mattis porta. Nullam nec nibh nisl. Phasellus convallis vulputate massa vitae fringilla. Etiam facilisis lectus in odio lacinia rutrum. Praesent facilisis vitae urna a suscipit. Aenean lacinia blandit lorem, et ullamcorper metus sagittis faucibus. Nam porta eros nisi, at adipiscing quam varius eulfak.'
        };
    }

    bigMemoryLeak[bigMemoryLeak.length] = arr;

    if (size > max)
      return cb(true);
    else
      return cb(false);
  };

  const interval = function() {
    return setTimeout(function() {

      stress(function(stop) {
        if (stop)
          return callback(size);
        else
          return interval();
      });

    }, time);
  };

  interval();
};
