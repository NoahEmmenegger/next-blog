# 3.1 Setup [4 Punkte]

ID Anforderung / Aufgabe Punkte
1.1 ✔️ Es wird eine .NET MVC Applikation erstellt (sinngemäss auch für andere Pro-grammiersprachen bzw. Frameworks). / 1
1.2 ✔️ Es wird ein Git-Repository auf GitLab erstellt und frühzeitig an die Lehrperson kommuniziert. / 1
1.3 ✔️ Es wird eine (vorzugsweise dateibasierte) Datenbank erstellt (z.B. SQLite). / 1
1.4 ✔️ Ein SMS Gateway für die Zweifaktorauthentifizierung wird eingerichtet ( Support/Dienstleistung Peter Gisler) / 1

# 3.2 Authentifizierung [21 Punkte]

ID Anforderung / Aufgabe Punkte
2.1 ✔️ Ein Formular für die Benutzer-Registrierung ist erreichbar und funktionsfähig. / 2
2.2 ✔️ Relevante Benutzereingaben werden während bzw. nach dem Registrierungs-prozess angemessen validiert. / 2
2.3 ✔️ Ein Login-Formular für die Eingabe der Benutzerdaten (Username & Passwort) ist erreichbar und funktionsfähig. / 2
2.4 ✔️ Beim Absenden des Login-Formulars wird geprüft ob ein/-e Benutzer/-in mit dem angegebenen Benutzernamen überhaupt existiert. / 1
2.5 ✔️ Falls ein/-e entsprechende/-r Benutzer/-in existiert (siehe 2.4) wird ein zufälli-ges SMS Token generiert. / 1
2.6 ✔️ Das SMS Token wird mit einer maximalen Gültigkeit von 5 Minuten gespei-chert. / 1
2.7 ✔️ Das generiere und persistierte SMS Token wird an die entsprechende Mobilte-lefonnummer gesendet. / 1
2.8 ✔️ Nach dem Versand des SMS Tokens wird eines neues/erweitertes Login-Formulars für die Eingabe des SMS-Tokens angezeigt. / 1
2.9 ✔️ Nach dem Absenden des zweiten Login-Formulars werden die Benutzerdaten (Benutzername/Passwort) und das SMS Token validiert. / 1
2.10 ✔️ Wenn die Benutzerdaten sowie das SMS Token korrekt sind, wird eine Session erzeugt und das verwendete SMS Token gelöscht. / 1
2.11 ✔️ Die Benutzerin bzw. der Benutzer wird zum Dashboard weitergeleitet, welches der Rolle der angemeldeten Benutzerin bzw. des angemeldeten Benutzers entspricht. / 1
2.12 ✔️ Es wird eine Fehlermeldung angezeigt, wenn einer der zuvor genannten Punk-te aus technischen Gründen fehlschlägt. / 1
2.13 Nach 3 fehlgeschlagenen Login-Versuchen wird die Benutzerin bzw. der Be-nutzer für 5 Minuten blockiert (während diesem Zeitraum sind keine weiteren Logins möglich). / 1
2.14 ✔️ Beim Logout wird die aktuelle Session beendet. Es findet zudem eine Weiter-leitung zum Login-Formular statt. / 1
2.15 Es existiert eine Möglichkeit, bei Nicht-Verfügbarkeit der erfassten Mobiltele-fonnummer ein Login durchzuführen. / 2
2.16 ✔️ Die im Rahmen der Registrierung eingegebene Mobiltelefonnummer kann durch Benutzende selbständig geändert werden. Missbräuchlichen Manipula-tionen wird angemessen vorgebeugt. / 2

# 3.3 Geschützer Bereich [7 Punkte]

ID Anforderung / Aufgabe Punkte
3.1 ✔️ Das User-Dashboard (für Nicht-Admins) zeigt eine Liste aller Posts der jeweils aktuell angemeldeten Benutzerin bzw. des jeweils aktuell angemeldeten Be-nutzers an („eigene Posts“). / 1
3.2 ✔️ Das Admin-Dashboard (für Admins) zeigt eine Liste der Posts aller Benutzerin-nen und Benutzer an (unabhängig vom Status; inkl. gelöschte Posts). / 1
3.3 Benutzende können neue Posts erfassen. Neue Posts sind nach der Erstellung versteckt (Status = hidden). / 1
3.4 Benutzende können die selbst erstellen Posts unabhängig von deren Status löschen (Status = deleted). / 1
3.5 ✔️ Admins können den Status existierender Posts mutieren:

-   hidden  published
-   hidden  deleted
-   published  deleted / 2
    ✔️ 3.6 Die Dashboards sind vor einer URL-Tampering Attacke geschützt. / 1

# Öffentliche Startseite [9 Punkte]

ID Anforderung / Aufgabe Punkte
4.1 ✔️ Auf der Startseite wird eine Liste aller öffentlichen Posts (Status = published) angezeigt. Die Liste enthält für jeden Post den Titel sowie den Benutzernamen der Autorin bzw. des Autors. / 1
4.2 ✔️ Jeder öffentliche Post kann auf einer Detail-Seite angezeigt werden. / 1
4.3 ✔️ Auf der Detailansicht eines Posts werden alle dazugehörigen Kommentare aufgeführt. / 1
4.4 ✔️ Die Detailansicht eines Posts enthält ein Formular zur Erfassung eines neuen Kommentars. / 1
4.5 ✔️ Nur eingeloggte Benutzer/-innen dürfen Kommentare erfassen. / 1
4.6 ✔️ Beim Absenden des Kommentars wird dieser sicher in der Datenbank gespei-chert:
• Maximal 200 Zeichen
• Verhinderung von SQL-Injections
• Verhinderung von XSS-Attacken / 2
4.7 ✔️ Es ist nicht möglich via URL-Tampering verborgene oder gelöschte Posts anzu-sehen. / 1
4.8 ✔️ Die IDs von Posts können nicht (einfach) erraten werden (URL-Tampering). / 1

# 3.5 API für Posts [4 Punkte]

ID Anforderung / Aufgabe Punkte
5.1 ✔️ Unter /api soll eine JSON-Api für die Posts erstellt werden. / 1
5.2 Der Zugriff auf die API ist durch eine der folgenden Methoden geschützt:
• API Token (Übermittelt als URL Parameter oder HTTP Request Header)
• HTTP Digest Authentication
Die Verwendung einer («echten») Session zur Authentifikation an der API ist hier nicht zulässig! / 2
5.3 ✔️ Unter /api/posts werden alle öffentlichen Posts im JSON-Format ausgege-ben. / 1

# 3.6 Verschiedenes [7 Punkte]

ID Anforderung / Aufgabe Punkte
6.1 ✔️ Die gesamte Applikation ist bestmöglich vor Clickjacking-Attacken geschützt. / 2
6.2 ✔️ Für die Authentifizierung kann mindestens ein externer Provider (Google, Facebook, Twitter, GitHub, …) verwendet werden. / 2
6.3 Die Publikation von versteckten Posts durch Admins ist durch die Eingabe eines time-based one-time password (TOTP) geschützt. Das TOTP kann entwe-der bei jeder Publikation oder einmalig bei der ersten Publikation je Session eingegeben werden. / 3

# 3.7 Logging [6 Punkte]

ID Anforderung / Aufgabe Punkte
7.1 Erstellen Sie ein Konzept, welches wesentliche Aspekte für das Logging hin-sichtlich Applikationssicherheit umfasst. / 3
7.2 Die Applikation verfügt über angemessene Massnahmen zur Erkennung und Auswertung sicherheitsrelevanter Vorfälle (Logging). / 3

# 3.8 Begründung und Nachvollziehbarkeit [7 Punkte]

ID Anforderung / Aufgabe Punkte
8.1 Erklären und begründen Sie das eingesetzte Verfahren zur Speicherung von Passwörtern hinsichtlich Sicherheit nachvollziehbar und fachlich korrekt. / 2
8.2 Begründen Sie den allfälligen Einsatz von Bibliotheken und externen Code-Bestandteilen nachvollziehbar und fachlich korrekt. / 2
8.3 Erklären Sie nachvollziehbar und fachlich korrekt, inwiefern Ihre Applikation vor Cross-Site-Scripting Attacken (XSS-Attacken) geschützt ist. / 2
8.4 Stellen Sie Zugangsdaten für jeweils mindestens eine/-n Benutzer/-in aller Benutzerrollen in einer spezifischen README.md Datei auf Wurzelebene Ihres Projekts zur Verfügung. / 1
