# Vue

Unser Framework Vue unterstützt die Entwicklung in vielerleit Hinsicht. Wie bereits beschrieben hiflt es uns die angezeigte Version akutell zu halten ohne manuell das HTML neu zu rendern. Um besser zu verstehen wie die Anwendung funktioniert werden im folgenden die zentralen Elemente und verwendete Plugins erklärt.

Das Framework Vue an sich befasst sich nahezu ausschließlich mit dem darstellen der Anwendung, also dem rendern des HTML Codes der vom Browser dann zu einer website gerendert wird. Für weitere funktionalitäten sind Plugins nötig. Die Community um Vue stellt bereits eine große Bandbreite bereit. Wir verweden neben dem Framework an sich noch den Router und das Vuex plugin.

Das Ziel ist es hierbei die Komponenten so unabhängig zu gestalten wie möglich um sie so oft wie möglich wiederverwenden zu können. Hierbei bietet Vue verschiedene Möglichkeiten die einzelnen Komponenten zu programmieren (oder definieren?). Wir haben uns für Single-File-Components entschieden, dabei ist jede Komponente in einer eigenen Datei definiert. Diese Datei besteht aus drei Abschnitten:

1. `<template>` hier wird der HTML Code geschrieben der als Basis für die Komponente dient
2. `<script>` hier kann mit Javascript funktionalität ausprogrammiert werden
3. `<style>` dient um die Komponente grafisch ansprechend zu designen.

Der `<template>` Abschnitt bietet einmal die Möglichkeit alle Funktionen von HTML5 zu verwenden allerdings fügt Vue noch einige eigene attribute hinzu um zusätzliche Funktionalitäten zu ermöglichen.

Innerhalb des `<script>` tags hat man Zugriff auf die vue runtime und alle darin verfügbare Variablen, Plugins und Methoden.

Der `<style>` Abschnitt kann so konfiguriert werden, dass er nur einfluss auf die Komponente hat um Konflikte mit anderen Komponenten die ähnliche Namen verwenden zu vermeiden.

Um eine Anwendung die aus diesen Single-File-Components besteht zu verwenden wird empfohlen den gesamten Code in einem besonderen Schritt, verglichbar mit dem Kompilieren, in einige wenige Dateien zusammenzufassen. Dieser Schritt kann man mit dem Kommandozeileninterface `vue` durchgeführt werden. Die Website besteht dann aus wenigen CSS und JS Dateien und einer `index.html` die die verschiedenen Datein verlinkt.

### Lebenszyklus

![img](https://v3.vuejs.org/images/lifecycle.png)

*Die rot (oder?) umrandetend Felder sind Methoden die in jeder Komponente definiert werden können um an bestimmten Stellen eigenen Code auszuführen.*

Jede Komponente durchläuft im Browser den selben Lebenszyklus. Die einzelnen Komponenten werden erzeugt sobald sie auf dem DOM gerendert werden sollen um die Ladezeit einer Seite so gering wie möglich zu halten. In unserem Fall fällt der vierte Schritt (template rendern) weg, da wir unsere Single-File-Components in einem extra Schritt kompilieren. Sobald eine Komponente eingehangen (mounted?) wurde aktualisiert sie sich automatisch sobald sich Daten, die bei der Darstellung verwendet werden, ändern. Diese Funktionalität erlaubt es uns Daten im Hinergrund zu aktualisieren ohne danach auf den Abschluss des Updates zu warten und alle Daten manuell zu aktualisieren.

### Aufbau

Die App besteht aus einer zentralen Komponente, die die wichtigsten Elemente definiert (Navigation und Kopfzeile). In dieser Komponente ist ein Platzhalter enthalten der durch den jeweiligen Inhalt ersetzt wird. Für diesen Inhalt gibt es eigene Komponenten die keine Logik enthalten (Views; verweis auf frontend projekt @/views/) diese bestehen dann wiederum aus Komponenten die die eigentliche Logik enthalten (verweis auf frontend projekt @/components/).

## VueRouter

Dieser Router ermöglicht es uns eine einfache Navigation innerhalb unserer Single-Page-Application (SPA). Jede URL unserer Website (abgesehen von den API Endpunkten und den Datein der Website) zeigt auf die `index.html`. Der Router entscheidet dann anhand der URL welche Komponenten angezeigt werden (Refernz auf fronten projekt -> router datei). Diese Komponenten werden dann in die zentrale App Komponente eingesetzt. Dadurch das eine Anfrage an beispielsweise `corona.example.com/login` and die `index.html ` weitergeleitet wird, kann der Router bei der Initialisierung der App dann die entsprechende Komponente einsetzen und später durch andere Komponenten austauschen ohne neue Resourcen vom Server anfragen zu müssen.

## Vuex

Da eine Website die aus unabhängigen Komponenten besteht trotzdem Daten zwischen Komponenten austauschen muss und über die Lebenszeit einer Komponente hinweg speichern muss bietet Vuex einen zentralen, geteilten Zustand (klingt komisch, eigentlich heißt es 'state'). Dieser Speicher besteht aus verschiedenen Variablen, Methoden um bestimmte Daten abzufragen (getter?), Methoden um Daten zu ändern (setter?) und Methoden um komplexe Aktionen auszuführen.

In unserer Anwendung verwenden wir diesen Speicher um beispielsweise für einen Administrator die Zeitfenster und Reservierungen zum start der App zu laden und dann bereit zu halten um die Daten schneller anzeigen zu können. Zusätzlich werden beim Aufruf einer Seite die Daten die angezeigt werden im Hintergrund automatisch aktualisiert.