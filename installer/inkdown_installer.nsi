; inkdown_installer.nsi
; This script creates a standalone Windows installer for Inkdown.

; --- General Installer Settings ---
Name "Inkdown"
OutFile "Inkdown_Installer_v0.1.0.exe" ; Output installer filename.
InstallDir "$PROGRAMFILES\Inkdown" ; Default installation directory
RequestExecutionLevel admin ; Request administrator privileges for installation

; --- Pages ---
Page directory
Page instfiles

; --- Uninstaller Settings ---
UninstallText "This will uninstall Inkdown. Do you wish to continue?"
UninstallCaption "Uninstall Inkdown"
!define MUI_ABORTWARNING ; Show a warning if the user tries to abort uninstallation

; --- Variables ---
Var /GLOBAL NODEJS_DIR_NAME ; To store the name of the Node.js portable directory (e.g., node-v20.11.0-win-x64)

; --- Functions ---
; Function to find the Node.js portable directory name
Function .onInit
  StrCpy $NODEJS_DIR_NAME ""
  ; Loop through directories in the installer's source directory
  FindFirst $0 $1 "$EXEDIR\node-v*-win-x64"
  loop:
    StrCmp $1 "" done
    StrCmp $1 "." next
    StrCmp $1 ".." next
    StrCpy $NODEJS_DIR_NAME $1
    Goto done
  next:
    FindNext $0 $1
    Goto loop
  done:
  FindClose $0

  StrCmp $NODEJS_DIR_NAME "" 0 +2
    MessageBox MB_OK|MB_ICONSTOP "Error: Portable Node.js directory (e.g., node-vX.Y.Z-win-x64) not found next to the installer. Please ensure it's extracted and present."
    Abort
FunctionEnd

; --- Sections ---
Section "Inkdown Core Files" SEC01

  SetOutPath "$INSTDIR"

  ; Create application directory structure
  CreateDirectory "$INSTDIR\app"
  CreateDirectory "$INSTDIR\nodejs"

  ; Copy Node.js portable files
  ; IMPORTANT: Place the extracted Node.js portable folder (e.g., node-vX.Y.Z-win-x64) directly inside the 'installer' folder.
  SetOutPath "$INSTDIR\nodejs"
  File /r "node-v22.17.1-win-x64\*" ; Copies all contents of the Node.js portable folder from the installer directory

  ; Copy Inkdown application files (dist and relevant node_modules)
  SetOutPath "$INSTDIR\app"
  File /r "..\dist\*" ; Copies your compiled Inkdown JavaScript files from the parent directory
  File /r "..\node_modules\puppeteer\*" ; Copies Puppeteer and its Chromium binaries from the parent directory

  ; --- Create Launcher Script (inkdown.bat) ---
  SetOutPath "$INSTDIR" ; Place the launcher in the root of the install dir
  File "inkdown.bat.tmp"

  ; --- Create Shortcuts ---
  CreateShortCut "$DESKTOP\Inkdown.lnk" "$INSTDIR\inkdown.bat" "" "" 0 SW_SHOWNORMAL "" "Run Inkdown CLI"
  CreateShortCut "$SMPROGRAMS\Inkdown\Inkdown.lnk" "$INSTDIR\inkdown.bat" "" "" 0 SW_SHOWNORMAL "" "Run Inkdown CLI"

  ; --- Write Uninstaller ---
  WriteUninstaller "$INSTDIR\Uninstall Inkdown.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Inkdown" "DisplayName" "Inkdown"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Inkdown" "UninstallString" "$INSTDIR\Uninstall Inkdown.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Inkdown" "Publisher" "Tim Eschmann" ; Customize this
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Inkdown" "DisplayVersion" "0.1.0" ; Customize this

SectionEnd

; --- Uninstaller Section ---
Section "Uninstall"

  ; Delete files and directories
  Delete "$INSTDIR\inkdown.bat"
  RMDir /r "$INSTDIR\app"
  RMDir /r "$INSTDIR\nodejs"
  RMDir "$INSTDIR" ; Delete the main installation directory if empty

  ; Delete shortcuts
  Delete "$DESKTOP\Inkdown.lnk"
  Delete "$SMPROGRAMS\Inkdown\Inkdown.lnk"
  RMDir "$SMPROGRAMS\Inkdown" ; Delete start menu folder if empty

  ; Delete registry entries
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Inkdown"

SectionEnd
