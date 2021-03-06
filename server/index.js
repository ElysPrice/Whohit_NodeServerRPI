console.log('Iniciando servidor...');

//Botão + Led de funcionamento

var rpi_gpio_buttons = require('rpi-gpio-buttons');
var botao = rpi_gpio_buttons([4], {mode: rpi_gpio_buttons.MODE_BCM});

//* - Firebase
var FCM = require('fcm-node');
var chaveServer = '';
var fcm = new FCM(chaveServer);

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
	    console.log('Erro na notificação (CAMPAINHA)');
	}
	else{
	    console.log('Notificação (CAMPAINHA):  ', response);
	}
    });  
});

//Fechadura

/*var gpioFC = require('onoff').Gpio;
var fechadura = new gpioFC (3, 'out');

var lock = function(){
    fechadura.writeSync(0);
}

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
	    console.log('Erro na notificação (FECHADURA)');
	}
	else{
	    console.log('Notificação (FECHADURA):  ', response);
	}
    });
}

var acionarRelay = function(){

    console.log('acionarRelay()');
    setTimeout(abrir, 500);
}

acionarRelay();*/


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
