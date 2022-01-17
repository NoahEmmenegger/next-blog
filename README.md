# ReadMe Datei - alles rundum die Applikation next-blog

# Benutzer

-   Admin
    E-Mail: admin@gmail.com
    Passwort: qwer1234

-   Normaler Benutzer
    E-Mail: benutzer@gmail.com
    Passwort: qwer1234

# Anleitung

Nachfolgend sind die Schritte beschrieben, welche ausgeführt werden müssen um das Projekt aufzusetzen und zu starten.



Aufsetzen:
- Datei .env.local.example duplizieren.
- Die Kopie in .env.local umbenennen

- Befehl "npm ci" ausführen




Starten:
- Befehl "npm run dev" ausführen

# Logging Konzept

Ein Logging System kann essentiell sein um bestimmte Ereignisse in der Applikation festzuhalten und auf sie zurückzuschliessen. Wichtige Informationen sind dabei Datum & Uhrzeit, Benutzer, Art des Ereignisses und wo dieses Ereigniss geschah. Unser Logging Konzept basiert auf zwei Kernelemente:

-   Aktionen
    Dazu gehören Inhalte wie Login- und Registrierungsinformationen, das Erstellen von Posts und die Änderung ihres Status.

-   Fehlschläge
    Damit gemeint sind alle möglichen Fehlschläge innerhalb der Applikation wie Login Fehlschläge, Errors im Speichervorgang etc.

Wenn wir uns nach diesem Konzept richten sollten wir die nötigen Logging informationen bereitstellen können. Da die Applikation eine Plattform ist, welche mit dem Benutzer interagiert gibt es viele Aktionen, diese werden alle festgehalten und können nachgewiesen werden. Dies ist ja auch der Sinn hinter einem Logging System.

# Erklärungen

-   Speicherung von Passwörter
    Die von uns genutzte Datenbank, Firebase von Google, unterstützt uns durch ihre fortgeschrittene Technologie. Wir können in Firebase ganz einfach neue Benutzer erstellen, diese werden dann in der Datenbank unter strengen Bedingungen abgespeichert. Die Passwörter werden mit scrypt gehasht, in der Firebase console können wir den hashing algorythmus definieren und auch einige Parameter einstellen wie z.B den salt separator oder die Anzahl Runden welche durchlaufen werden. Firebase haltet ebenfalls die EU Normen zum Datenschutz ein (EU General Data Protection Regulation - GDPR). Wir als Entwickler der Software (next-blog) können nichteinmal das Passwort unserer Benutzer einsehen, wir können dieses jedoch zurücksetzen oder (den Benutzer) löschen. Die Firebase/Firestore Cloud DB hat auch diverse Standard Security Zertifizierungen (ISO 27001, ISO 27017, ISO 27018, SOC 1, SOC 2, SOC 3). Einige Restriktionen wie zum Beispiel das Speichern des User-Agents und der IP-Adresse werden von Firebase selbst schon getätigt um diverse Angriffe schon vorab beim Login / Authentication Prozess zu verhindern. Da Firebase von Google kommt und schon ziemlich breit verwendet wird sind Sicherheitslücken ein bisschen schwieriger zu finden, und falls eine aufkommen sollte, dann würde sie direkt von Google behoben werden.

    Für noch genauere Informationen:
    https://firebaseopensource.com/projects/firebase/scrypt/

-   Verwendete Bibliotheken und externe Code-Bestandteile
    Für unsere Blog Applikation haben wir uns für folgende Tools entschieden:

    -   Firebase
        Für die Sichere Speicherung von sensiblen Daten und die eingebaute Logik für das Authentication System. Eine sehr sichere und ernstgenommene Plattform von Google zur Förderung der Applikationssicherheit.

    -   NextJS
        Um ein sicheres routing zu ermöglichen und einen hohen Sicherheitsstand zu bieten innerhalb der Applikation selbst. NextJS und Firebase harmonieren gut zusammen und bieten in dieser Kombination viele nützliche Funktionen um den richtigen Weg einzuleiten wie man sichere Applikationen bauen kann.

    -   Axios
        Für eine Aushilfe in den Requests zu unserer API nutzen wir Axios, eine library welche performante und vereinfachte Requests ermöglicht. Wir nutzen Axios im Zusammenhang mit der Kommentarfunktion, um dynamische Requests zu ermöglichen.

    -   TailwindCSS
        Für das schöne Design dürfen wir uns bei Tailwind bedanken, wir nutzen Tailwind für das Styling der Komponenten in einer einfachen Inline-Variante.

-   Schutz vor Cross-Site-Scripting (XSS) Attacken
    Dank unserem Einsatz von NextJS können wir mittels eines Konfigurationsfile XSS Attacken vorbeugen. Dabei fügen wir die XSS-Protection in unserem next.config.js hinzu. Dabei werden zum Beispiel in unseren Eingabefelder code in String umgewandelt und behandelt wie normaler Text. Ein zusätzlicher Schutzfaktor bietet ebenfalls firebase selbst. Somit kann der Code nicht ausgeführt werden und es löst auch keine Attacke aus.

    Mehr dazu gibts in der NextJS Dokumentation:
    https://nextjs.org/docs/advanced-features/security-headers
