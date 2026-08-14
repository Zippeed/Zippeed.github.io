$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$parentRoot = Split-Path -Parent $projectRoot
$destination = Join-Path $parentRoot 'Zippeed.github.io-upload'

if ($destination -eq $projectRoot -or $destination -eq $parentRoot) {
    throw 'Destino de upload invalido.'
}

if (Test-Path -LiteralPath $destination) {
    Remove-Item -LiteralPath $destination -Recurse -Force
}

New-Item -ItemType Directory -Path $destination | Out-Null

$robocopyArgs = @(
    $projectRoot,
    $destination,
    '/E',
    '/XD', 'node_modules', '.git',
    '/XF', '*.jpg', 'AGENTS.md',
    '/R:1',
    '/W:1',
    '/NFL',
    '/NDL',
    '/NJH',
    '/NJS',
    '/NP'
)

& robocopy @robocopyArgs | Out-Null
if ($LASTEXITCODE -ge 8) {
    throw "Falha ao copiar os arquivos (robocopy: $LASTEXITCODE)."
}

$forbidden = Get-ChildItem -LiteralPath $destination -Recurse -Force | Where-Object {
    $_.FullName -match '[\\/]node_modules([\\/]|$)' -or $_.Extension -eq '.jpg'
}

if ($forbidden) {
    throw 'O pacote contem node_modules ou JPGs antigos.'
}

$files = Get-ChildItem -LiteralPath $destination -Recurse -File -Force
$sizeMb = [Math]::Round(($files | Measure-Object Length -Sum).Sum / 1MB, 1)

Write-Host ''
Write-Host 'UPLOAD PRONTO' -ForegroundColor Green
Write-Host "Pasta: $destination"
Write-Host "Arquivos: $($files.Count) | Tamanho: $sizeMb MB"
Write-Host 'Arraste o conteudo dessa pasta para o GitHub.'
