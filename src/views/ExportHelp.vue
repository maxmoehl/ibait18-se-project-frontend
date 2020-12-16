<template>
  <div class="help">
    <div class="md-title">Wie kann ich die exportierte Datei öffnen?</div>
    <p>
      Exportierte Zeitfenster werden im Dateiformat .csv (comma separated values) bereitgestellt. Um die Besucherlisten
      optimal anzeigen zu können, empfehlen wir die Verwendung eines geeigneten Programmes, wie Microsoft Excel oder
      TOOL.
    </p>
    <p>
      Beim Öffnen der Datei mit Microsoft Excel beachten Sie bitte die folgenden Hinweise, um die Anzeigestruktur nicht
      zu beeinträchtigen:
    </p>
    <ol>
      <li>Öffnen Sie Microsoft Excel</li>
      <li>Öffnen Sie das Dokument in das Sie die Daten einfügen möchten</li>
      <li>Navigieren Sie zum Tab "Daten" ("Data")</li>
      <li>Klicken Sie auf die Schaltfläche "Aus Text" ("From Text")</li>
      <li>Wählen Sie die die Besucherlisten enthaltene .csv-Datei aus</li>
      <li>Bestätigen Sie im darauffolgenden Import-Assistenten die Eingabe mit Klick auf "Fertig stellen" oder "Laden" ("Load")</li>
    </ol>
    <p>
      Weitere Informationen zur Verwendung von .csv-Datein mit Excel erhalten Sie auf den
      <a href="https://support.microsoft.com/de-de/office/importieren-oder-exportieren-von-textdateien-txt-oder-csv-5250ac4c-663c-47ce-937b-339e391393ba">Hilfeseiten von Microsoft</a>
      (externer Link).
    </p>
  </div>
</template>

<script>
export default {
  name: "ExportHelp"
}
</script>

<style scoped>
.help {
  max-width: 600px;
  margin: auto
}
</style>