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

# Función para manejar errores
function handle_error() {
    ERROR_MSG="$1"
    if echo "$ERROR_MSG" | grep -q "ENOTEMPTY.*yarn"; then
        echo -e "$Red$ERROR_MSG$Reset"
        echo -e "$Green$CHARACTER_3: Nah, ese error es normal. No te preocupes ^^$Reset"
    else
        echo -e "$Red$ERROR_MSG$Reset"
        echo -e "$Yellow$CHARACTER_1: Uh. Al parecer ha habido un error 😶$Reset"
        echo -e "$Purple$CHARACTER_2: Bueno, ¡no te preocupes! Lo intentaremos arreglar...$Reset"
        sleep 2
        print_ascii "Arreglando"
        sleep 1
        # Intento de reparación o ignorar
        echo -e "$Green$CHARACTER_3: Intentamos solucionarlo, ¡vamos a seguir!$Reset"
    fi
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

# Ejecutar comando con gestión de errores
function safe_run() {
    OUTPUT=$(eval "$1" 2>&1)
    STATUS=$?
    if [ $STATUS -ne 0 ]; then
        handle_error "$OUTPUT"
    else
        echo "$OUTPUT"
    fi
}

# Actualización
print_ascii "Actualizando"
echo -e "$Yellow$CHARACTER_1: ¡Vamos a actualizar todo antes de empezar!$Reset"
safe_run "pkg update -y && pkg upgrade -y"

# Instalación de herramientas esenciales
print_ascii "Instalando"
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
safe_run "pkg install git -y"
safe_run "pkg install nodejs-lts -y"
safe_run "pkg install ffmpeg -y"
safe_run "pkg install python-pip -y"
safe_run "npm install -g yarn"
safe_run "pip install yt-dlp"

# Clonando repositorio
print_ascii "Clonando Repo"
echo -e "$Green$CHARACTER_3: Descargando MaycolAI desde los cielos digitales...$Reset"
safe_run "git clone https://github.com/SoySapo6/MaycolAI"

cd MaycolAI || exit

# Instalando módulos del proyecto
print_ascii "Dependencias"
echo -e "$Yellow$CHARACTER_1: Invocando todos los módulos necesarios...$Reset"
safe_run "npm install"
safe_run "npm install gemini-chatbot"

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
