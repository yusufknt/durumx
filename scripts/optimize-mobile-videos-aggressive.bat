@echo off
REM Mobil hero videolarini AGGRESSIVE optimize eder (takilma/kasma/donma onleme)
REM 480p, 600kbps - mobil icin yeterli kalite, cok daha kucuk dosyalar
REM Gereksinim: FFmpeg (https://ffmpeg.org/download.html)

set VIDEOS_DIR=%~dp0..\public\videos
cd /d "%VIDEOS_DIR%"

where ffmpeg >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo FFmpeg bulunamadi! Lutfen yukleyin: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

echo ========================================
echo Mobil videolar AGGRESSIVE optimize ediliyor...
echo 480p, 600kbps - takilma/kasma onleme
echo ========================================
echo.

REM Orijinalleri yedekle (henuz yoksa)
if not exist "mobilvideo4-orijinal.webm" if exist "mobilvideo4.webm" copy "mobilvideo4.webm" "mobilvideo4-orijinal.webm"
if not exist "hero-video-mobil-1-orijinal.webm" if exist "hero-video-mobil-1.webm" copy "hero-video-mobil-1.webm" "hero-video-mobil-1-orijinal.webm"
if not exist "hero-video-mobil-2-orijinal.webm" if exist "hero-video-mobil-2.webm" copy "hero-video-mobil-2.webm" "hero-video-mobil-2-orijinal.webm"
if not exist "hero-video-mobil-3-orijinal.webm" if exist "hero-video-mobil-3.webm" copy "hero-video-mobil-3.webm" "hero-video-mobil-3-orijinal.webm"

call :optvideo mobilvideo4
call :optvideo hero-video-mobil-1
call :optvideo hero-video-mobil-2
call :optvideo hero-video-mobil-3
goto :done

:optvideo
set "src=%~1-orijinal.webm"
if not exist "%src%" set "src=%~1.webm"
if not exist "%src%" (
    echo %~1: kaynak bulunamadi, atlaniyor
    exit /b
)

REM -mobile uzantisiyla yaz (720p, 1.2Mbps - kalite/perf denge)
echo %~1-mobile.webm isleniyor (720p, 1.2Mbps)...
ffmpeg -y -i "%src%" -vf "scale=-2:720" -c:v libvpx-vp9 -b:v 1200k -maxrate 1500k -bufsize 2M -an -row-mt 1 -deadline good "%~1-mobile.webm"
if exist "%~1-mobile.webm" echo   -> %~1-mobile.webm optimize edildi

echo %~1-mobile.mp4 isleniyor (Safari fallback)...
ffmpeg -y -i "%src%" -vf "scale=-2:720" -c:v libx264 -preset fast -crf 26 -b:v 1200k -maxrate 1500k -bufsize 2M -an -movflags +faststart "%~1-mobile.mp4"
if exist "%~1-mobile.mp4" echo   -> %~1-mobile.mp4 optimize edildi
exit /b

:done
echo.
echo Tamamlandi! -mobile.webm ve -mobile.mp4 dosyalari olusturuldu.
echo Hero.tsx bu dosyalari kullaniyor - takilma/kasma cozulmeli.
echo.
pause
