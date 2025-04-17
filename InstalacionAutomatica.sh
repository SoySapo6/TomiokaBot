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

# Personajes
CHARACTER_1="Hanako-kun $Yellow✨"
CHARACTER_2="Nene Yashiro $Purple♡"
CHARACTER_3="Kou Minamoto $Green⚔️"

# Gestor de errores simpático
function gestionar_error() {
    echo -e "$Red$CHARACTER_1: Uh. Al parecer ha habido un error 😶$Reset"
    echo -e "$Purple$CHARACTER_2: Bueno, ¡no te preocupes! Lo intentaremos arreglar...$Reset"
    print_ascii "Arreglando"
    sleep 2

    "$@"  # Reintenta el comando que falló

    if [ $? -ne 0 ]; then
        echo -e "$Red$CHARACTER_3: Lamentablemente no pudimos arreglar el error :c$Reset"
        exit 1
    else
        echo -e "$Green$CHARACTER_3: ¡Listo! El error fue solucionado exitosamente.$Reset"
    fi
}

# Presentación mágica
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
gestionar_error pkg update -y && pkg upgrade -y

# Instalación de herramientas esenciales
print_ascii "Instalando"
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
gestionar_error pkg install git -y
gestionar_error pkg install nodejs-lts -y
gestionar_error pkg install ffmpeg -y
gestionar_error pkg install python-pip -y
gestionar_error npm install -g yarn
gestionar_error pip install yt-dlp

# Clonando repositorio
print_ascii "Clonando Repo"
echo -e "$Green$CHARACTER_3: Descargando MaycolAI desde los cielos digitales...$Reset"
gestionar_error git clone https://github.com/SoySapo6/MaycolAI

cd MaycolAI || exit 1

# Instalando módulos del proyecto
print_ascii "Dependencias"
echo -e "$Yellow$CHARACTER_1: Invocando todos los módulos necesarios...$Reset"
gestionar_error npm install
gestionar_error npm install gemini-chatbot

# Eliminando sesiones antiguas
print_ascii "Limpieza"
echo -e "$Red$CHARACTER_3: Eliminando sesiones pasadas para evitar errores...$Reset"
rm -rf baileys

# Mensaje final
clear
print_ascii "Listo"
echo -e "$PurpleGracias por usar MaycolAI, eres lo máximo <3$Reset"
echo -e "$GreenIniciando MaycolAI con poderes mágicos...$Reset"
sleep 2

# Iniciando el bot
npm start
