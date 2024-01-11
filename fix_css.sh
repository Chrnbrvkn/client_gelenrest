#!/bin/bash
# Устанавливаем переменную filename равной имени этого файла (без расширения .sh)
filename=$(basename "$0" .sh)

# Переходим в директорию с вашим локальным репозиторием Git
cd /Users/moonlight/Mich/client_gelenrest

# Выполняем команды Git
git add .
git commit -m "$filename"
git push

# Ожидаем ввода пользователя для закрытия окна
read -p "Press [Enter] key to close this window..."
