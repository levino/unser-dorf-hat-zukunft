---
title: Einloggen
---

<div class="container padding-top--lg">

# Bitte einloggen

Bitte logge Dich ein, um die Inhalte zu sehen.

<div class="padding-bottom--xl">
<button type="button" class="button button--primary" id="loginWithGithub">
    Login mit GitHub
</button>

<button type="button" class="button button--primary" id="loginWithGoogle">
    Login mit Google
</button>
</div>

## FAQ

### Warum bietest du keinen Login mit Benutzername und Passwort an?

Der Login mit Benutzername und Passwort, bzw. E-Mail und Passwort ist technisch
überholt, weil er für Euch unbequem und unsicher und für mich als
Seitenbetreiber sehr teuer ist. Die Authentifizierung über Anbieter wie Google
oder Github ist dagegen günstig für mich und bequem und sicher für Euch.

#### Unbequem

Würde ich es Euch erlauben, Euch mit E-Mail-Adresse und Passwort anzumelden,
müsstet ihr Euch ein neues Passwort ausdenken oder erstellen lassen. Dieses
müsstet ihr entweder aufschreiben oder speichern. Alles sehr umständlich.
Außerdem würden viele Nutzer:innen ein Passwort verwenden, was sie bereits schon
woanders verwendet haben, was sehr
[gefährlich](https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/Umgang-mit-Passwoertern/umgang-mit-passwoertern_node.html#:~:text=Viele%20Anwenderinnen%20und,ebenfalls%20verwendet%20wird.)
ist.

#### Unsicher

Um den Zugang korrekt abzusichern, müsste ich zusätzlich
Zwei-Faktor-Authentifizierung implementieren und anbieten. Das ist aber auch
Kostengründen nicht abzubilden. Insofern wäre nur ein einfacher Login mit
E-Mail-Adresse und Passwort möglich, was nicht sicher ist.

#### Kosten

Login mit E-Mail-Adresse und Passwort bedeutet, dass ich:

- **Passwort-Resets** anbieten müsste, was kompliziert und wartungsintensiv ist.
- **E-Mails** verschicken müsste (z. B. für Bestätigungen oder
  Passwortänderungen), wofür ein zuverlässiger Mailserver notwendig ist – das
  kostet Geld und erfordert Pflege.
- **Sicherheitsmaßnahmen** wie Hashing und Schutz gegen Angriffe ständig aktuell
  halten müsste.

Das alles sind Ressourcen, die ich lieber in andere Bereiche investieren möchte.

#### Warum nutzt du Google und GitHub für den Login?

Die beiden Anbieter sind seriös und sicher. Um möglichst einfach an den Inhalten
mitwirken zu können braucht man ohnehin einen Github-Account, deshalb habe ich
Github eingebunden. Viele wollen aber nur lesen, für diese Leute habe ich Google
eingebunden. Man kann auch beides gleichzeitig verwenden.

Sowohl Github als auch Google bieten modernste Sicherheit für den Account und
haben 2-Faktor-Authentifizierung und unterstützen sogar
[Passkeys](https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Passkeys/passkeys-anmelden-ohne-passwort_node.html).

Ich kann auch weitere Anbieter einbinden. Der Dienst, den ich benutze,
unterstützt die folgenden Anbieter zusätzlich zu Google und GitHub:

- Microsoft
- Facebook
- GitLab
- Discord
- Spotify

Wenn du dir einen dieser Anbieter wünschst, schreibe mir einfach eine E-Mail an
**[post@levinkeller.de](mailto:post@levinkeller.de)**. Ich prüfe dann, ob ich
diesen Anbieter für den Login hinzufügen kann. Das ist allerings relativ
aufwendig. Prüfe bitte, ob es nicht für Dich leichter ist, einen Google- oder
Github-Account anzulegen.

</div>

<script src="/public/pocketbase.umd.js"></script>

<script>

  const pb = new PocketBase('https://api.xn--rssing-wxa.de/');
  const loginWithGithub = () =>
    pb
      .collection('users')
      .authWithOAuth2({ provider: 'github' })
      .then(saveTokenFromAuthStoreAsCookieAndReloadPage);

  const loginWithGoogle = () =>
    pb
      .collection('users')
      .authWithOAuth2({ provider: 'google' })
      .then(saveTokenFromAuthStoreAsCookieAndReloadPage);

  const saveTokenFromAuthStoreAsCookieAndReloadPage = () =>
    fetch('/api/cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: pb.authStore.token }),
    }).then(() => window.location.reload());

  document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('loginWithGoogle')
      .addEventListener('click', loginWithGoogle);
    document
      .getElementById('loginWithGithub')
      .addEventListener('click', loginWithGithub);
  });

</script>
