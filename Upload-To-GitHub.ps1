param(
  [string]$Message = "Prepare Nuvio Wiki website",
  [switch]$ForceReplaceRemoteHistory
)

$ErrorActionPreference = "Stop"

$RemoteName = "website"
$RepoUrl = "https://github.com/haaihond/Nuvio-Wiki-Website.git"

Set-Location -LiteralPath $PSScriptRoot

git config user.email "haaihondschildpad@gmail.com"
git config user.name "haaihond"

if (git remote | Select-String -Quiet -SimpleMatch $RemoteName) {
  git remote set-url $RemoteName $RepoUrl
} else {
  git remote add $RemoteName $RepoUrl
}

git branch -M main
git add -A

$Status = git status --short

if ($Status) {
  git commit -m $Message
} else {
  Write-Host "No local changes to commit."
}

if ($ForceReplaceRemoteHistory) {
  git push -u $RemoteName main --force-with-lease
} else {
  git push -u $RemoteName main
}
