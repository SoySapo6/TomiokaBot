#!/data/data/com.termux/files/usr/bin/bash

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

# Música de fondo con ffplay
AUDIO_URL="https://files.catbox.moe/596y4p.m4a"
AUDIO_FILE="$HOME/.maycol_music.m4a"

if [ ! -f "$AUDIO_FILE" ]; then
    echo -e "$PurpleDescargando música épica...$Reset"
    wget -O "$AUDIO_FILE" "$AUDIO_URL"
fi

# Reproducir música en loop silencioso (background con PID controlado)
ffplay -nodisp -autoexit -loglevel quiet "$AUDIO_FILE" &
MUSIC_PID=$!

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
apt update -y && yes | apt upgrade && pkg install -y bash wget figlet ffmpeg git nodejs-lts python-pip

# Instalación de herramientas esenciales
print_ascii "Instalando"
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
npm install -g yarn
pip install yt-dlp

# Clonando repositorio
print_ascii "Clonando Repo"
echo -e "$Green$CHARACTER_3: Descargando MaycolAI desde los cielos digitales...$Reset"
git clone https://github.com/SoySapo6/MaycolAI

cd MaycolAI

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
echo -e "$GreenIniciando MaycolAI con poderes mágicos...$Reset"
sleep 2

# Detener música antes de iniciar el bot
kill $MUSIC_PID

# Iniciar el bot
npm start
