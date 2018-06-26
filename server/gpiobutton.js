var button = require('rpi-gpio-buttons')([4]);

button.on('pressed', function(pin){
    console.log('press', pin);
});
