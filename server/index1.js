console.log('Iniciando servidor...');

//Botão + Led de funcionamento

//var gpioLB = require('onoff').Gpio;

//var LED = new gpioLB (4, 'out');

var rpi_gpio_buttons = require('rpi-gpio-buttons');

var botao = rpi_gpio_buttons([4], {mode: rpi_gpio_buttons.MODE_BCM});

//Firebase
var FCM = require('fcm-node');
var chaveServer = 'AAAAaYYvvqY:APA91bGGqWkqAa-jCvAhee2YKlpRbc6Ag9U_P6YfTCljT_b2NI2MbUPlVNdgAaFd4PU7d_OIPlO3cGMN3cS36oZdK59_V3AaWfZ1VxFiij4bplrxmo6asYfRfVe6lW6NGyltUkzRMzTM';
var fcm = new FCM(chaveServer);

/*botao.watch(function(err, value){
    if (err){
	console.error('Aconteceu um erro', err);
	return;
    }
    LED.writeSync(value);

    var ntCampainha = {
	to: '/topics/tstWhohit',
	//collapse_key: 'collapse_key';

	notification: {
	    title: 'Alguém está tocando a campainha',
	    body: 'Veja quem está na porta e atenda'
	},

	data: {
	}
    };

    fcm.send(ntCampainha, function(err, response){
	if (err){
	    console.log('Erro na notificação');
	}
	else{
	    console.log('Notificação enviada ', response);
	}
    });
    
    });*/

botao.on('button_press', function(pin){
    var ntCampainha = {
	to: '/topics/tstWhohit',
	//collapse_key: 'collapse_key';

	notification: {
	    title: 'Alguém está tocando a campainha',
	    body: 'Veja quem está na porta e atenda'
	},

	data: {
	}
    };

    fcm.send(ntCampainha, function(err, response){
	if (err){
	    console.log('Erro na notificação');
	}
	else{
	    console.log('Notificação enviada ', response);
	}
    });  
});

//Fechadura

/*r gpioFC = require('onoff').Gpio;
var fechadura = new gpioFC (21, 'out');

var lock = function(){
    //fechadura.writeSync(0);
//    fechadura.unexport();
}

//lock();

var abrir = function(){

    fechadura.writeSync(1);
    fechadura.unexport();
    console.log('abrir()');

    var ntFechadura = {
	to: '/topics/tstWhohit',
	//collapse_key: 'collapse_key';

	notification: {
	    title: 'Fechadura aberta',
	    //body: 'Veja quem está na porta e atenda'
	},

	data: {
	}
    };

    fcm.send(ntFechadura, function(err, response){
	if (err){
	    console.log('Erro na notificação');
	}
	else{
	    console.log('Notificação enviada ', response);
	}
    });
}

var acionarRelay = function(){

    console.log('acionarRelay()');
    setTimeout(abrir, 500);
}*/

//acionarRelay();


//SUBIR O SERVIDOR
var express = require('express');
var app = express();
var port = 3000;

app.get('/abrir', function(req, res){
    //res.render('index.html');
    console.log('Padrão URL: Fechadura ----- ABERTA');
    acionarRelay();
});

app.listen(port);
console.log('Servidor WhoHit em funcionamento (3000)');
