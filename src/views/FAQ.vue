<template>
  <div class="faq">
    <div class="question" v-for="q in questions" :key="q.id">
      <div class="md-title">{{q.title}}</div>
      <p v-html="q.body"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  data: () => {
    return {
      questions: [
        {
          id: 0,
          open: false,
          title: 'Warum benötige ich eine Reservierung?',
          body: '<p>Im Rahmen der COVID-19 Pandemie und den damit verbundenen Hygienevorschriften der Landesregierung sind wir dazu verpflichtet, Ihre Kontaktdaten beim Besuch zu erfassen und die Einhaltung der Sicherheitsabstände von mind. 1,5m einzuhalten.</p><p>Zu diesem Zweck haben wir ein Buchungssystem eingerichtet, welches eine Vorabreservierung der gewünschten Besuchszeit ermöglicht und die erforderlichen Kontaktdaten zum Zwecke der Nachverfolgung durch das Gesundheitsamt speichert.</p>'
        },
        {
          id: 1,
          open: false,
          title: 'Ich komme in Begleitung. Reicht die Angabe meiner eigenen Kontaktdaten?',
          body: 'Nein. Es kann nur Besuchern mit vollständiger Kontaktdatenangabe Einlass gewährt werden. Bitte nutzen Sie bei der Reservierung die Funktionalität „Person hinzufügen“, um sämtliche Begleitpersonen zu spezifizieren. Dies gilt ebenfalls für Begleitpersonen aus einem gemeinsamen Haushalt, hier können Sie im Buchungsprozess jedoch die bereits eingegebene Adresse automatisch übernehmen lassen.'
        },
        {
          id: 2,
          open: false,
          title: 'Wozu benötige ich den Buchungscode?',
          body: 'Der Buchungscode identifiziert Ihre Reservierung eindeutig. Bitte halten Sie beim Einlass den fünfstelligen Buchungscode oder den QR-Code bereit, den wir Ihnen nach erfolgreicher Reservierung an Ihre angegebene E-Mail Adresse gesendet haben. Bitte beachten Sie, dass ein Einlass ohne diesen Buchungscode nicht garantiert werden kann.'
        },
        {
          id: 3,
          open: false,
          title: 'Muss ich den Buchungscode ausdrucken?',
          body: 'Nein. Das Vorzeigen der Bestätigungsmail auf Ihrem Smartphone ist vollkommen ausreichend. Für den Fall, dass Ihr QR-Code von unseren Lesegeräten nicht erkannt wird, befindet sich in der Bestätigung ebenfalls ein fünfstelliger Code, mit welchem wir Sie identifizieren können.'
        },
        {
          id: 4,
          open: false,
          title: 'Ich habe keinen Buchungscode erhalten. Was muss ich tun?',
          body: 'Sollten Sie den Buchungsprozess erfolgreich abgeschlossen haben, zeigen wir Ihnen den Buchungscode zusätzlich auf einer Bestätigungsseite in unserem System an.<br>Bitte überprüfen Sie auch Ihren Spam-Ordner auf unsere Bestätigungsmail. Sollten Sie weiterhin keinen Buchungscode finden, liegt möglicherweise ein technisches Problem vor. Kontaktieren Sie bitte in diesem Fall unseren technischen Support unter <a href="mailto:contact@moehl.eu">contact@moehl.eu.</a>'
        },
        {
          id: 5,
          open: false,
          title: 'Was passiert mit meinen eigegebenen Kontaktdaten?',
          body: 'Ihre Kontaktdaten werden ausschließlich zum Zwecke der gesetzlichen Kontaktverfolgung erhoben. Eine automatische Lösung der gespeicherten Daten erfolgt vier Wochen nach Ihrem Besuch. Weitere Information zur Datenverarbeitung auf dieser Website finden Sie in unserer <a href="/privacy">Datenschutzerklärung.</a>'
        },
        {
          id: 6,
          open: false,
          title: 'Kann ich eine Reservierung auch vor Ort vornehmen?',
          body: 'Ja. Beim Ticketkauf vor Ort haben Sie weiterhin die Möglichkeit, unser Kontaktformular auszufüllen. Bitte beachten Sie jedoch, dass durch die limitierten Besucherzahlen kein Einlass garantiert werden kann, sofern Sie keine Online-Reservierung vornehmen.<br>Zur Vermeidung von unnötigen Wartezeiten und einer möglichst sicheren, kontaktlosen Besuchserfahrung empfehlen wir Ihnen unbedingt die Nutzung unseres Buchungssystems.'
        },
        {
          id: 7,
          open: false,
          title: 'Was passiert, wenn ein Buchungsslot vollständig belegt ist?',
          body: 'Sollte das Besucherlimit pro Zeitfenster erreicht sein, können wir für den entsprechenden Zeitraum keine Reservierung durchführen und leider keinen Einlass gewähren. Bitte sehen Sie hier verantwortungsvoll von Spontanbesuchen ab, da in einem solchen Fall ausschließlich online angemeldeten Gästen Einlass gewährt werden kann.'
        },
        {
          id: 8,
          open: false,
          title: 'Ich bekomme die Fehlermeldung „Ihre Buchung konnte nicht abgeschlossen werden“ beim Abschließen der Buchung. Was bedeutet das?',
          body: 'Im Falle von parallel ablaufenden Reservierungen können Zeitslots während des Buchungsprozesses von anderen Teilnehmern ausgebucht werden. In diesem Fall bitten wir Sie um die Reservierung eines alternativen Zeitfensters.<br>Sollte Ihr gewünschtes Zeitfenster anschließend nach der Ausgabe der Fehlermeldung doch noch frei sein, liegt gegebenenfalls ein technisches Problem vor. Bitte kontaktieren Sie unter diesen Umständen unseren technischen Support unter contact@moehl.eu.'
        },
        {
          id: 9,
          open: false,
          title: 'Meine Frage wurde nicht beantwortet. An wen kann ich mich mit weiteren Fragen wenden?',
          body: 'Für technische Angelegenheiten erreichen Sie unseren Support unter <a href="mailto:contact@moehl.eu">contact@moehl.eu</a>. Alle weiteren Fragen beantworten wir Ihnen gern in der eingerichteten Hotline unter <a href="tel:+49123456789">+49 123456789</a>. Bei Fragen zu Ihrer Reservierung halten Sie sich bitte den Bestätigungscode für unsere Mitarbeiterinnen und Mitarbeiter bereit.'
        }
      ]
    };
  }
}
</script>

<style scoped>
.faq {
  max-width: 600px;
  margin: auto
}
</style>