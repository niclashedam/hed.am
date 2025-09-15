---
layout: layouts/post.njk
title: "EU Chat Control: If Privacy Is Outlawed, Only Outlaws Have Privacy"
date: 2025-09-15
keywords:
  - privacy
  - encryption
  - european union
  - chat control
  - surveillance
  - child protection
  - pre-crime
  - end-to-end encryption
  - csam
imageAlt: "European Union flags waving in the wind."
image: /assets/images/blog/if-privacy-is-outlawed-only-outlaws-have-privacy.jpg
permalink: "/blog/if-privacy-is-outlawed-only-outlaws-have-privacy/"
---

We all want children to be safe. That instinct is right. European Union's “Chat Control” proposal presents itself as a child protection measure, but at its core, it would require scanning everyone’s private messages on their devices before they are sent. This is a form of pre-emptive monitoring. The stated aim is compassion; the architecture, however, is built on deep suspicion. The real question is not whether the goal is noble, but whether the tool is legitimate, effective, and safe at scale. When the state reaches into private correspondence pre-emptively, it shifts the default relationship between citizen and authority, where everyone is treated as guilty, instead of innocent, until proven otherwise. Such a radical shift demands extraordinary evidence, careful engineering, and robust safeguards, none of which are yet convincingly in view.

## The Promise vs. The Implementation

The idea is straightforward: “detect abuse material and grooming early”. The implementation, however, is anything but simple. Chat apps today use end-to-end encryption, which means that the phone of the sender encrypts the message, and only the recipient’s phone can decrypt it. While the message is in transit or stored on servers, no one else can read it, not even the internet provider or app developer. This is a powerful privacy guarantee that protects not only criminals but also journalists, activists, domestic-violence survivors, and ordinary people.

If chat apps are to continue to use end-to-end encryption, scanning must happen on the phone _before_ encryption, i.e. just as the message is being sent. The proposal allows “detection orders” for known images (hash matching), “new/similar” images (perceptual matching), and grooming text. The model that decides what to flag will not be public. You will not see the rules. You will only encounter the system if a classifier is confident enough to escalate your case to the authorities.

This is not targeted surveillance of suspects. It is continuous monitoring of everyone. That is the fundamental change. Once device-level scanning is normalised, the citizen–state relationship changes, and so does your attack surface.

## Competence, Humility, Evidence

Most politicians are not experts in cryptography, cybersecurity or artificial intelligence. That is understandable; it is not their primary role. But when legislating in these domains, humility is essential. Assumptions must be tested, experts consulted, and their insights incorporated, even if not fully understood or agreed on by the politicians.

Examining this proposed law reveals two uncomfortable facts. First, circumvention is relatively easy. If scanning happens before encryption, determined offenders can add a second encryption layer (such as PGP or even something as simple as Caesar cipher) or move to hardened, self-hosted infrastructure. The system will scan the easy targets, catch the careless, and miss those who are most intent on avoiding detection. This is a point noted by both regulators and the [Internet Society](https://www.internetsociety.org/resources/doc/2023/client-side-scanning/). Second, the attack surface increases: mandated on-device classifiers, their update channels, indicator feeds and escalation paths become attractive targets for criminals and hostile states.

## Build It Once, Use It Everywhere

Surveillance infrastructure, once established, tends to expand in scope. Once device-level scanning is normalised and implemented, adding new categories, such as terrorism, extremism, “disinformation”, tax or copyright, becomes a configuration change, not a new public debate. The technical capability is already present; only political will is required to broaden its use.

## Real Offenders Won’t Wait to Be Caught

Chat Control focuses on mainstream platforms like WhatsApp, Messenger, Signal and Telegram. Competent offenders are unlikely to remain on mainstream channels once on-device scanning is enabled; they will move to other platforms or add encryption layers. The result is that the lawful majority are scanned, while those intent on evading detection are likely to succeed.

It is similar to searching for criminals in a police station or tax evaders in a tax office. This is not the most effective way to catch high-value offenders. [Signal’s technical analysis](https://signal.org/blog/pdfs/upload-moderation.pdf) also discussed the re-branding of Client-Side Scanning as “upload moderation” to downplay the surveillance aspect. They noted that this does not solve the core problem: if it happens before encryption, the end-to-end guarantee is broken. End-to-end encryption exists to guarantee that only the intended recipients can read the messages, and introducing scanning on the sender's device compromises this guarantee. What is the point of locking the door, if the thief has the key?

[Philip Zimmermann](https://www.philzimmermann.com/EN/essays/WhyIWrotePGP.html), the creator of PGP, observed this trend decades ago: “If privacy is outlawed, only outlaws will have privacy.” This has never been more true than today.

## AI Makes Mistakes. At EU Scale, Mistakes Become Policy

Even if we accept the premise of pre-emptive scanning, significant challenges remain. How do we guarantee the effectiveness of the underlying artificial intelligence and detection mechanisms? Even a tiny error rate becomes significant when applied across billions of messages and photos. Every time the system produces a false positive, someone at the police station must investigate, diverting resources from real cases. Each false report consumes investigator hours and can drag innocent families into processes they never deserved while real victims may wait longer for help.

At the same time, context is lost when a model sees only pixels, not relationships: pool photos, bath-time pictures to grandparents, dermatology images for a paediatric consult, screenshots from parenting forums. The artificial intelligence cannot understand who the people in these images are or who you are sending them to. If flagged, you cannot provide context or an explanation; _you are simply presumed guilty until proven innocent_.

## The Exemption Question: Professional Secrecy Or Unequal Treatment?

Another key point in the debate is the question of exemptions. Even after accepting the premise of pre-emptive scanning and the challenges of AI accuracy, who gets exempted from this surveillance? The proposal currently includes exemptions for certain professions and roles, citing professional secrecy as justification. Ministers, commissioners, generals and party leaders may be excluded from scanning, but not doctors or journalists. The rationale is that some communications require confidentiality for the public good, but the argumentation is inconsistent. A public official, like a politician, is employed by the public, so why hide their communications from public oversight?

This raises questions about equal treatment. If the technology is truly safe and necessary, why should any group be exempt at all? Professional secrecy is important, but so too is the privacy of ordinary citizens, including families, support workers, and vulnerable individuals. Exemptions risk creating a two-tier system, where privacy is protected for some but not for others. The public deserves a clear explanation of why certain groups are excluded, and whether this is genuinely about professional secrecy or simply about shielding those in power.

It is also worth noting that no group is immune to controversy. Danish politicians have had several scandals in recent times. A former Danish Minister of Foreign Affairs was implicated in a controversy involving sexual misconduct towards a 15‑year‑old participant at a Social Democratic Youth of Denmark camp. At the time of the incident, the politician was 34 years old. A former Minister of Industry, Business and Financial Affairs was reported to possess 6,242 photographs and 2,231 videos containing sexual abuse material involving minors, as well as a child‑like sex doll. Lastly, a current member of parliament acknowledged that, when he was 28, he had a romantic relationship with a 15‑year‑old girl and that this relationship still continues. The last example is the essence of grooming.

Why can this group of citizens invoke the right to privacy, while ordinary citizens cannot?

## Security Is a System, Not a Slogan

End-to-end encryption supports the security of banking, healthcare, domestic-violence shelters, journalism, elections and the private lives of ordinary people. Mandated server backdoors and client-side scanners both weaken this chain. It is not possible to have “strong” end-to-end encryption and device-level surveillance at the same time.

There is also empirical precedent on feasibility and trust. Apple [explored](https://www.wired.com/story/apple-photo-scanning-csam-communication-safety-messages/) on-device CSAM scanning for iCloud Photos, but ultimately [abandoned](https://www.theverge.com/2022/12/9/23500838/apple-csam-plans-dropped-eff-ncmec-cdt-reactions) it after expert pushback, opting instead for narrower, opt-in child-safety features. If Apple, with full control over its phones and infrastructure, could not make this trustworthy, proposing similar machinery across the EU’s diverse devices seems even more challenging.

## What Actually Moves Outcomes

If the goal is fewer victims and more convictions, efforts should focus where harm and profit concentrate, rather than treating the entire population as suspects. Target distribution networks and repeat offenders, freeze hosting infrastructure and trace payments, improve reporting pipelines so investigators receive fewer, higher-quality tips with context, and run targeted, warrant-backed operations that stand up in court.

## The Questions EU Leaders Must Answer Clearly, In Public

Legitimacy first: what is the legal precedent that justifies pre-crime scanning of private correspondence?

Effectiveness next: what measured increase in arrests and convictions do you expect from endpoint scanning versus targeted warrants and infrastructure take-downs, and where are the peer-reviewed evaluations?

Then safety: what are the audited false-positive and false-negative rates per modality at EU scale, and how will you stop automated tips overwhelming frontline units?

Finally, security: what is the threat model for the mandated scanner itself, including update channels and indicator feeds, and how will you prevent hostile reuse of those hooks? If you cannot answer these cleanly, perhaps the mechanism is not ready.

## Europe’s Choice

Europe can both defend private correspondence and protect children with precise warrants, resourced investigators and pressure where abuse actually scales. Or it can normalise pre-emptive device scanning, risk overwhelming police with false positives, and widen everyone’s attack surface. If the system is truly safe and accurate, apply it without exemptions. If that cannot be done, the public deserves to know why. The best policy is one that delivers both safety and dignity.

If you want to learn more, I suggest visiting [Fight Chat Control](https://fightchatcontrol.eu/).
