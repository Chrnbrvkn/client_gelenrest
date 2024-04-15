@echo off
:: Устанавливаем переменную %filename% равной имени этого файла (без расширения .bat)
setlocal enabledelayedexpansion
for %%F in ("%~dp0%~n0") do set "filename=%%~nF"
:: Переходим в директорию с вашим локальным репозиторием Git
cd /d C:\Users\prosh\Desktop\client_gelenrest

:: Выполняем команды Git
git add .
git commit -m "!filename!"
git push

:: Ожидаем ввода пользователя для закрытия окна
pause


