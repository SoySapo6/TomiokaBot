#!/bin/bash

clear  

# Colores
Cyan="\e[1;36m"
Purple="\e[1;35m"
Green="\e[1;32m"
Red="\e[1;31m"
Yellow="\e[1;33m"
Reset="\e[0m"

# Función para imprimir texto ASCII con estilo  
function print_ascii() {  
    echo -e "$Cyan"  
    figlet -f slant "$1"  
    echo -e "$Reset"  
}  

# Presentación mágica
CHARACTER_1="Hanako-kun $Yellow✨"
CHARACTER_2="Nene Yashiro $Purple♡"
CHARACTER_3="Kou Minamoto $Green⚔️"

echo -e "$Yellow$CHARACTER_1 aparece flotando sobre el script..."
echo -e "$Purple$CHARACTER_2: ¡Hora de instalar algo genial!"
echo -e "$Green$CHARACTER_3: ¡Vamos, que esto será rápido y fácil!$Reset"
sleep 2

print_ascii "MaycolAI"
echo -e "$PurpleAjusta la Escala de la Pantalla para una mejor experiencia...$Reset"
echo -e "$GreenHecho con amor por SoyMaycol$Reset"
sleep 2  

# Actualización  
print_ascii "Actualizando"  
echo -e "$Yellow$CHARACTER_1: ¡Vamos a actualizar todo antes de empezar!$Reset"
sudo apt update -y && sudo apt upgrade -y

# Instalación de herramientas esenciales  
print_ascii "Instalando"  
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
sudo apt install -y git ffmpeg python3-pip nodejs npm figlet
sudo npm install -g yarn
pip3 install --break-system-packages yt-dlp || pip3 install yt-dlp

# Instalando módulos del proyecto  
print_ascii "Dependencias"  
echo -e "$Yellow$CHARACTER_1: Invocando todos los módulos necesarios...$Reset"
npm install
npm install gemini-chatbot

# Eliminando sesiones antiguas  
print_ascii "Limpieza"  
echo -e "$Red$CHARACTER_3: Eliminando sesiones pasadas para evitar errores...$Reset"
rm -rf baileys  

# Mensaje final  
clear  
print_ascii "¡Listo!"  
echo -e "$PurpleGracias por usar MaycolAI, eres lo máximo <3$Reset"
echo -e "$GreenPara iniciar el bot, ejecuta manualmente el siguiente comando:$Reset"
echo -e "$Cyan"
echo "npm start"
echo -e "$Reset"
echo -e "$YellowPulsa Enter para terminar...$Reset"
read
