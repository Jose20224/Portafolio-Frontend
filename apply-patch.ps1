param(
  [Parameter(Mandatory = $true)]
  [string]$FrontendPath,
  [Parameter(Mandatory = $true)]
  [string]$BackendPath
)

$ErrorActionPreference = 'Stop'
$PatchRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$FrontendPath = (Resolve-Path $FrontendPath).Path
$BackendPath = (Resolve-Path $BackendPath).Path

if (-not (Test-Path (Join-Path $FrontendPath 'src/App.jsx'))) {
  throw "No se encontró src/App.jsx dentro de FrontendPath: $FrontendPath"
}
if (-not (Test-Path (Join-Path $BackendPath 'backend/src/app.module.ts'))) {
  throw "No se encontró backend/src/app.module.ts dentro de BackendPath: $BackendPath"
}

Write-Host 'Aplicando archivos del frontend...' -ForegroundColor Cyan
Copy-Item (Join-Path $PatchRoot 'frontend-patch/src') (Join-Path $FrontendPath 'src') -Recurse -Force
Copy-Item (Join-Path $PatchRoot 'frontend-patch/index.html') (Join-Path $FrontendPath 'index.html') -Force
Copy-Item (Join-Path $PatchRoot 'frontend-patch/vercel.json') (Join-Path $FrontendPath 'vercel.json') -Force
Copy-Item (Join-Path $PatchRoot 'frontend-patch/.env.example') (Join-Path $FrontendPath '.env.example') -Force
Copy-Item (Join-Path $PatchRoot 'frontend-patch/README.md') (Join-Path $FrontendPath 'README.md') -Force

Write-Host 'Registrando AdminPortfolioModule en el backend...' -ForegroundColor Cyan
Copy-Item (Join-Path $PatchRoot 'backend-patch/backend/src/app.module.ts') (Join-Path $BackendPath 'backend/src/app.module.ts') -Force

Write-Host ''
Write-Host 'Parche aplicado en ambos repositorios.' -ForegroundColor Green
Write-Host 'No se modificaron package.json, package-lock.json ni archivos .env existentes.' -ForegroundColor Yellow
Write-Host 'Configura VITE_API_BASE_URL en .env.local y en Vercel antes de probar.' -ForegroundColor Yellow
