# HTS221-RPI

Se trata de un script realizado en node que permite leer la temperatura y humedad del sensor HTS221 en una Raspberry Pi para subirlo a nuestro propio canal en Thingspeak.

Solo lo he probado en una Raspberry Pi 3b+.

## Instalación 

Primero debemos clonar el repositorio y accederemos a él:
```
git clone https://github.com/juanluss31/HTS221-RPI.git
cd HTS221-RPI
```
Ahora introducimos nuestro channelId y la write key de Thingspeak en los huecos que hay en `read.js`. Podemos hacerlo con nano:

```
nano read.js
```

Ahora instalaremos npm y node, para ello simplemente ejecutamos:
```
sudo apt-get update
sudo apt-get install npm
```
Ahora debemos instalar los módulos que requiere el programa, para ello ejecutamos:
```
npm install
```
Si todo ha ido bien, al ejecutar `node test.js` deberíamos obtener una salida similar a esta:
```
Temp: 31.36
Humidity: 41.25
Thermal sensation: 33.67
CPU Temp: 63.376
```

Ahora instalaremos PM2 para que se encargue de ejecutar el script al inicio.
Para ello, introducimos el siguiente comando en la consola:
```
sudo npm install pm2 -g
```
Una vez instalado pm2, iniciamos el script con el comando:
```
pm2 start read.js
```
Ahora, para que se ejecute siempre al inicio del sistema ejecutamos:
```
pm2 save
pm2 startup systemd
```
Y por último debemos copiar y pegar el comando que se genera a la salida de lo anterior.


## Otra forma de hacer que se ejecute al inicio
Añadir al fichero /etc/rc.local lo siguiente (antes de `exit 0`):
```
#Para iniciar el servicio de lectura de temperatura y humedad:
node /home/pi/HTS221-RPI/read.js
```
