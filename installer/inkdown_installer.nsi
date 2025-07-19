; inkdown_installer.nsi
; This script creates a standalone Windows installer for Inkdown.

!include WinMessages.nsh

; --- General Installer Settings ---
Name "Inkdown"
OutFile "Inkdown_Installer_v0.1.0.exe" ; Output installer filename.
InstallDir "$PROGRAMFILES64\Inkdown" ; Default installation directory
RequestExecutionLevel admin ; Request administrator privileges for installation

; --- Pages ---
Page directory
Page instfiles

; --- Uninstaller Settings ---
UninstallText "This will uninstall Inkdown. Do you wish to continue?"
UninstallCaption "Uninstall Inkdown"
!define MUI_ABORTWARNING ; Show a warning if the user tries to abort uninstallation

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
  File /r "..\node_modules" ; Copies the node_modules directory and its contents into $INSTDIR\app\node_modules

  ; --- Create Launcher Script (inkdown.bat) ---
  SetOutPath "$INSTDIR" ; Place the launcher in the root of the install dir
  File /oname=inkdown.bat "inkdown.bat.in"

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

  ; Delete shortcuts
  Delete "$DESKTOP\Inkdown.lnk"
  ClearErrors

  ; Delete registry entries
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Inkdown"

  ; Remove installation directory from PATH
  ReadRegStr $0 HKLM "SYSTEM\CurrentControlSet\Control\Session Manager\Environment" "Path"
  StrCpy $R1 ""
  StrLen $R2 "$INSTDIR"
  loop:
    StrCmp $R0 $0 $R2
    StrCmp $R0 "$INSTDIR" 0 +3
      StrCpy $0 $0 $R2 "$INSTDIR"
      Goto continue
    StrCpy $R0 $0 1
    StrCmp $R0 ";" 0 +2
      StrCpy $R1 "$R1$R0"
    StrCpy $0 $0 "1"
    StrCmp $0 "" 0 loop
  continue:
  WriteRegExpandStr HKLM "SYSTEM\CurrentControlSet\Control\Session Manager\Environment" "Path" "$R1"
  SendMessage ${HWND_BROADCAST} ${WM_SETTINGCHANGE} 0 "System\Environment"

  ; Create and execute a self-deleting batch file to remove the installation directory
  SetOutPath "$TEMP"
  File /oname=uninstall_inkdown.bat "uninstall_inkdown.bat.in"
  ExecShell "" "$TEMP\uninstall_inkdown.bat" "$INSTDIR"
  Quit ; Force the uninstaller GUI to close

SectionEnd
