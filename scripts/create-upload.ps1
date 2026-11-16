$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
npm run verify
if ($LASTEXITCODE -ne 0) { throw 'Falha ao verificar o site.' }
Write-Host "Upload pronto em: $(Join-Path (Get-Location) 'dist')"
