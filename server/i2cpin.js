var GPIO = require('onoff').Gpio;

var pino = new GPIO(3,'out');

pino.writeSync(0);
pino.unexport();
