@echo off
title CrowBot by Sans

if exist node_modules\ (
  node index
  pause
  exit
) else (
  call npm i >> NUL
  echo Les fichiers ont été installés!
  echo Veuillez relancer le start.
  pause
  exit
)