# BCN-2024SS-TeamWeiss-InfluenzaConnect
InfluenzaConnect: Strategische Vernetzung von Unternehmen und Influencern

### Zeiteinteilung bis zum Ende der ModA-Phase - jeden Montag in BBB:
Rot	14:00	14:15
Grün	14:20	14:35
Blau	14:00	14:55
**Weiß	15:00	15:15**
Gelb	15:20	15:35
Cyan	15:40	15:55


[React App auf den Server](localhost:3000)


## Anleitung
> [!NOTE]
> Repo clonen, am Besten mit SSH (dazu muss ein SSH-Key in euren Profil hinterlegt werden). 
> Notfalls mit HTTPS clonen.
> 
> - MAC-User - Projekt-Setup:
> ```Shell
> > cd devenv
> > chmod +x setup_devenv.sh
> > ./setup_devenv
> ```
> alle anderen skripts die ihr benutzen wollt auch erst mit chmod +x ausführbar machen
> - Windows-User - Projekt-Setup mit WSL:
> ```Shell
> > cd devenv_windows
> > wsl bash setup_devenv.sh
> ```
> 
> - Windows-User - Projekt-Setup mit PowerShell:
> ```PowerShell
> > cd devenv_windows
> > .\setup_devenv.ps1
> ```

**Docker-Container Herunterfahren:**\
`teardown_devenv.sh` fährt die mit `setup_devenv.sh` gestarteten Docker-Container herunter. 
`total_teardown_devenv.sh` löscht die Docker-Images/ Docker-Builds, sowie die Virtuelle venv-Umgebung von Python. Diese können dann anschließend wieder mit `setup_devenv.sh` erstellt werden. 
