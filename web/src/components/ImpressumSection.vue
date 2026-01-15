<template>
    <section class="section" id="impressum">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title">Impressum</h2>
                    <p class="section-subtitle">Angaben gemäß § 5 TMG</p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="impressum-content">
                    <div class="impressum-section">
                        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
                        <p>
                            <strong>{{ ownerName }}</strong><br />
                            {{ address.street }}<br />
                            {{ address.postalCode }} {{ address.city }}<br />
                            {{ address.country }}
                        </p>
                    </div>

                    <div class="impressum-section" v-if="contact.email">
                        <h3>Kontakt:</h3>
                        <p>
                            <strong>E-Mail:</strong> 
                            <a :href="`mailto:${contact.email}`" class="contact-link">{{ contact.email }}</a>
                        </p>
                        <p v-if="contact.phone">
                            <strong>Telefon:</strong> 
                            <a :href="`tel:${contact.phone}`" class="contact-link">{{ contact.phone }}</a>
                        </p>
                    </div>


                    <div class="impressum-section">
                        <h3>Haftungsausschluss (Disclaimer):</h3>
                        
                        <h4>Haftung für Inhalte</h4>
                        <p>
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                            unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                            Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </p>
                        <p>
                            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der 
                            Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </p>

                        <h4>Haftung für Links</h4>
                        <p>
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
                            verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                        </p>
                        <p>
                            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                            einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                            Links umgehend entfernen.
                        </p>

                        <h4>Urheberrecht</h4>
                        <p>
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb 
                            der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. 
                            Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
                            gestattet.
                        </p>
                        <p>
                            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                            auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei 
                            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                        </p>
                    </div>

                    <div class="impressum-section">
                        <h3>Datenschutz</h3>
                        <p>
                            Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf 
                            unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben 
                            werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre 
                            ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                        </p>
                        <p>
                            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) 
                            Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist 
                            nicht möglich.
                        </p>
                        <p>
                            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur 
                            Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit 
                            ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte 
                            im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                        </p>
                    </div>
                </div>
            </FadeInWrapper>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FadeInWrapper from './FadeInWrapper.vue'

// Private page - Impressum information
const ownerName = ref('Andre Dilger')
const address = ref({
    street: 'Berger halde 31/2',
    postalCode: '88074',
    city: 'Meckenbeuren',
    country: 'Deutschland'
})

const contact = ref({
    email: 'info@emberstone.net',
    phone: '' // Add phone number if you want to provide it
})

const legalInfo = ref({
    vatId: '', // Not applicable for private page
    tradeRegister: null, // Not applicable for private page
    managingDirector: '' // Not applicable for private page
})
</script>

<style scoped>
.impressum-content {
    max-width: 900px;
    margin: 0 auto;
    text-align: left;
}

.impressum-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
}

.impressum-section h3 {
    color: var(--secondary-orange);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.impressum-section h4 {
    color: var(--secondary-orange);
    font-size: 1.2rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.impressum-section p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 1rem;
}

.impressum-section strong {
    color: var(--text-primary);
    font-weight: 600;
}

.contact-link {
    color: var(--secondary-orange);
    text-decoration: none;
    transition: color 0.3s;
}

.contact-link:hover {
    color: var(--primary-orange);
    text-decoration: underline;
}

@media (max-width: 768px) {
    .impressum-section {
        padding: 1.5rem;
    }

    .impressum-section h3 {
        font-size: 1.3rem;
    }
}
</style>
