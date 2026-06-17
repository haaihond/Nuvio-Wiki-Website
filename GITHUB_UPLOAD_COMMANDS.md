# GitHub Upload Commands

Run these from PowerShell in the repository folder.

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\Upload-To-GitHub.ps1
```

If GitHub rejects the push because the placeholder repository already has its own initial commit, replace that placeholder history with:

```powershell
.\Upload-To-GitHub.ps1 -ForceReplaceRemoteHistory
```
