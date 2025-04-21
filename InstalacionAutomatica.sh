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

# Función para mostrar barra de progreso
function progress_bar() {
    local i=0
    local max=30
    echo -n -e "$Green["
    while [ $i -le $max ]; do
        echo -n "#"
        sleep 0.05
        ((i++))
    done
    echo -e "]$Reset"
}

# Verificar dependencias esenciales
for cmd in jp2a mpv figlet; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "$Red[Hanako-kun]: Instalando $cmd...$Reset"
        pkg install -y $cmd > /dev/null
    fi
done

# Presentación
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
echo -e "$Yellow$CHARACTER_1: Te pondré música ^^"
mpv --really-quiet --loop https://files.catbox.moe/tmhmm8.mp3 &  
MUSIC_PID=$!
sleep 2

# Actualización
print_ascii "Actualizando"
echo -e "$Yellow$CHARACTER_1: ¡Vamos a actualizar todo antes de empezar!$Reset"
pkg update -y > /dev/null && pkg upgrade -y > /dev/null
progress_bar

# Instalación de herramientas esenciales
print_ascii "Instalando"
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
for pkg in git nodejs-lts ffmpeg python-pip; do
    echo -ne "$GreenInstalando $pkg...$Reset\r"
    pkg install -y $pkg > /dev/null
done
npm install -g yarn > /dev/null
pip install yt-dlp > /dev/null
progress_bar

# Clonar repo
print_ascii "Clonando Repo"
[ -d "MaycolAI" ] && rm -rf MaycolAI
echo -e "$Green$CHARACTER_3: Descargando MaycolAI desde los cielos digitales...$Reset"
git clone https://github.com/SoySapo6/MaycolAI > /dev/null || { echo -e "$RedFallo al clonar el repositorio.$Reset"; exit 1; }
echo -e "$Yellow$CHARACTER_1: Estamos en medio de la Instalación ♪$Reset"

cd MaycolAI || exit
curl -s -o Hanako.png https://files.catbox.moe/aml84a.png

# Instalación de módulos del proyecto
print_ascii "Dependencias"
echo -e "$Yellow$CHARACTER_1: Invocando todos los módulos necesarios...$Reset"
npm install > /dev/null
npm install gemini-chatbot > /dev/null
echo -e "$Yellow$CHARACTER_1: Todo Hecho 🥸$Reset"
progress_bar

# Limpiar sesiones pasadas
print_ascii "Limpieza"
echo -e "$Red$CHARACTER_3: Eliminando sesiones pasadas para evitar errores...$Reset"
rm -rf baileys

# Detener música
kill $MUSIC_PID

# Mensaje final
clear
print_ascii "SoyMaycol"
jp2a --color Hanako.png
echo -e "$PurpleGracias por usar MaycolAI, eres lo máximo <3$Reset"
echo -e "$GreenPara iniciar el bot, ejecuta manualmente:$Reset"
echo -e "$Cyan"
echo "cd MaycolAI && npm start"
echo -e "$Reset"
read -p "Presiona Enter para salir..."
