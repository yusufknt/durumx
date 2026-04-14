@echo off
REM Mobil hero videolarini optimize eder (takilmayi azaltir)
REM Gereksinim: FFmpeg (https://ffmpeg.org/download.html)
REM Kullanim: Bu dosyayi public/videos klasorunden calistirin veya asagidaki yolu duzenleyin

set VIDEOS_DIR=%~dp0..\public\videos
cd /d "%VIDEOS_DIR%"

where ffmpeg >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo FFmpeg bulunamadi! Lutfen yukleyin: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

echo Mobil videolar optimize ediliyor...
echo.

REM Tum 4 mobil videoyu optimize et - 720p, 1Mbps, ses yok (takilma onleme)
call :optvideo mobilvideo4
call :optvideo hero-video-mobil-2
call :optvideo hero-video-mobil-3
call :optvideo hero-video-mobil-1
goto :done

:optvideo
if exist "%~1.webm" (
    echo %~1.webm isleniyor...
    ffmpeg -y -i "%~1.webm" -vf "scale=720:-2" -c:v libvpx-vp9 -b:v 1M -an -row-mt 1 "%~1-opt.webm"
    if exist "%~1-opt.webm" (
        if not exist "%~1-orijinal.webm" move "%~1.webm" "%~1-orijinal.webm" >nul
        move /y "%~1-opt.webm" "%~1.webm" >nul
        echo   -> %~1.webm optimize edildi
    )
)
if exist "%~1.mp4" (
    ffmpeg -y -i "%~1.mp4" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 28 -b:v 1M -an -movflags +faststart "%~1-opt.mp4"
) else if exist "%~1-orijinal.webm" (
    ffmpeg -y -i "%~1-orijinal.webm" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 28 -b:v 1M -an -movflags +faststart "%~1-opt.mp4"
) else if exist "%~1.webm" (
    ffmpeg -y -i "%~1.webm" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 28 -b:v 1M -an -movflags +faststart "%~1-opt.mp4"
)
if exist "%~1-opt.mp4" (
    if exist "%~1.mp4" (if not exist "%~1-orijinal.mp4" move "%~1.mp4" "%~1-orijinal.mp4" >nul)
    move /y "%~1-opt.mp4" "%~1.mp4" >nul
    echo   -> %~1.mp4 optimize edildi
)
exit /b

:done

echo.
echo Tamamlandi!
echo.
echo Videolar dogrudan optimize edildi. Orijinaller -orijinal uzantisiyla yedeklendi.
echo.
pause
