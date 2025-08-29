---
layout: layouts/post.njk
title: "Digitalisation: Lost Privacy by Design"
date: 2025-09-02
keywords:
  - privacy
  - data collection
  - surveillance
  - open data
  - open-source intelligence
  - mobilepay
  - data protection
  - privacy by design
  - digital rights
imageAlt: "A man lurking behind closed blinds."
image: /assets/images/blog/digitalisation-lost-privacy-by-design.jpg
permalink: "/blog/digitalisation-lost-privacy-by-design/"
---

The Danish Ministry of Foreign Affairs tells the story of Denmark as a forerunner in digitalisation on [denmark.dk](https://denmark.dk/innovation-and-design/digitalisation).

> Denmark is one of the world’s most digitalised countries. Most transactions are cashless, and almost all interaction with the Danish authorities takes place online.

This stands in contrast to neighbouring Germany, where cash still is still the default and many government services remain offline. The [European Commission](https://digital-strategy.ec.europa.eu/en/factpages/germany-2024-digital-decade-country-report) has noted Germany’s below‑average standing on digital public services within the EU, despite Germany being the largest economy in Europe.

Denmark and Germany have similar [Human Development Index (HDI)](https://en.wikipedia.org/wiki/Human_Development_Index) scores, yet their digital landscapes diverge sharply. Policy, public trust, and cultural memory all play a role. Germany’s post‑war split and reunification left uneven infrastructure, a deep sensitivity to surveillance, and a distrust of government. Caution about centralised records is embedded in the political DNA of Germans. Denmark, by contrast, is unified, with a strong welfare state and high institutional trust. That trust fuels a willingness to digitise aggressively and to share data with the state in exchange for seamless services. This shows that a high digitalisation is determined by culture, and not by a high HDI.

The result is a highly digitalised Denmark, and a cautious Germany.

## Public Registers Are Not The Enemy — But They Are Not Harmless

Public registers exist for good reasons: accountability, fraud prevention, safety, and market transparency. I am not arguing for secrecy as a governance model. Rather, I argue that we have shifted from _necessary transparency_ for the greater good to _willing exposure_. The difference lies in design.

When data is _public_, it is accessible to everyone, both good and bad actors, but it requires effort to collect the information, for example at the local court office, municipal archives, or other physical locations. When data is _public and digital_, it becomes trivial to copy, scrape, enrich, and weaponise at the speed of modern computers. The leap from a dusty folder in a municipal office to a JSON API is not merely an upgrade of user interface; it is a change in mentality.

Below are a few Danish examples that illustrate the how available data actually is in Denmark.

### MobilePay Is The Modern Phone-book

MobilePay made small payments simple and convenient. Instant transfers using a phone number instead of a bank transfer led to rapid adoption. [In 2022](https://www.mobilepay.dk/nyheder/2022/06/24/mobilepay-rapid-growth), MobilePay had almost 4.4 million users, corresponding to three-fourths of the population in Denmark.

But convenience came with an identity leakage in the form of reverse‑lookups. Because Danish financial identities are tightly coupled to civil identity (bank KYC is anchored in CPR through MitID), a phone number can often be resolved to a real name in‑app. That is incredibly useful for avoiding sending money to the wrong person. However, it is also a quiet way to unmask who owns a number. Did someone call you? Type the number into MobilePay; get a CPR-verified name.

**Open questions:** Should reverse‑lookup be opt‑in, so MobilePay only shows the phone number by default? Should searches be logged in reverse, so users can see who looked them up?

### Leakage Of Website Owners

Punktum (the .dk registry operator) allows you to look up .dk domain holders. Transparency helps fight fraud and illegal content by holding website registrars accountable. It also makes individuals behind small sites and sole proprietorships easier targets for harassment. The line between “public interest” and “public exploitation” is thin, especially when queries are free and log-less.

One could also argue that this risks limiting free speech. Minority groups who wish to share information online may be deterred by the potential for harassment. People would be able to look up their identities easily and turn up at their doors.

**Open questions:** Should registrars be required to offer privacy protection services, where individuals can choose to mask their identity behind a lawyer or other proxy? Should information access require logging in with MitID and be logged for the owner to see? Why publish this information at all?

### Business Owner? This Is Your Home Address

If you have operated a business in Denmark within the last five years, your personal details sit in the Central Business Register (CVR) and are mirrored across sites like [Proff.dk](https://www.proff.dk) and programmatic endpoints like the [CVR API](https://cvrapi.dk/). This exposes scammers through transparency, but it also permanently links your home address to your name, which is a gift to stalkers and opportunistic scammers.

Owning a business may not be a choice. It can be a means of making a living. While you can choose not to have MobilePay or a .dk domain, you cannot choose not to register a business. It is the law; if you operate a business, you must register it and have your information published.

**Open questions:** Should the address of directors and founders even be published, and not just the business address? Should there be the ability to appoint a proxy, such as a lawyer or auditing firm, to handle incoming enquiries?

### Own A House? You Are Exposed

Through OIS (Den Offentlige Informationsserver) and the Tinglysning registry, anyone can discover who owns a property, transaction prices, mortgages, and property history. That transparency disciplines markets. It also creates a high‑fidelity map of wealth, debt, and family movements.

See that big house? You can now see who owns it, what they paid for it, and even their mortgage details. This level of transparency can be beneficial for market integrity, but it also poses significant risks to individual privacy.

An interesting side note is that other Nordic countries like Norway and Finland also expose the entirety of tax information, including income of everyone, but it requires you to get in touch with the tax authorities. This is exactly how public registries should work.

**Open questions:** Do you have the right to know who owns any house? Why are renters protected, but not owners? If the financing of a house is public, why are other loans and financial information not public?

### Bankrupt? You Are Now The News

Bankruptcy records deter fraud and protect creditors, but they also become a permanent dossier of failure that follows people long after debts are discharged. In Denmark, when someone goes bankrupt, dies, or has their home foreclosed, these events are published in [Statstidende](https://statstidende.dk), sometimes including the personal identification number (CPR). This not only stigmatises those whose lives are already in turmoil, but also exposes them to further harassment. At the same time, it opens the door to fraud, as their CPR number is now public.

**Open questions:** Should bankruptcy records be public? Could they be anonymised in some way to avoid further victimisation?

## CPR Protection Helps, But At A Cost

The state offers CPR protection, which reduces how widely your personal information is shared. I enabled it for a few years in the late 2010s. It works, but it is a major headache. Ordinary processes break and interactions with employers, banks and insurance become complicated. Since you no longer exist when they look you up, they cannot fetch your information. The system punishes those who opt out, and does not offer a way for companies to be approved or to request access. No, it is all or nothing.

**Open questions:** Why is CPR data available by default? Why can the system not be more granular in its protection or offer a data request flow, where users can choose who to share information with?

## Threats We Keep Underestimating

We routinely underestimate how easily public records can be stitched together into a live map of a person’s life. For survivors of stalking and domestic abuse, a handful of queries can reveal where someone lives, where they work, what they own, and how to find them again. Safety plans collapse when registries act like a directory assistance service for bad actors.

Harassment feeds on the same visibility. Free speech online is trivially linked to legal identity when reverse‑lookups, property records, and business registers sit one tab away. The path from a controversial tweet to a home address should not be a weekend [OSINT](https://en.wikipedia.org/wiki/Open-source_intelligence) project, and yet that is where we have landed.

Commercial profiling turns public data into industrial fuel. Brokers enrich registry data with breaches and social graphs to build dossiers that outlive consent. Scam campaigns become precise: names, roles, new mortgages and fresh company registrations. All pre‑validated by the state, guaranteed to be correct.

Like I wrote about in the recent blog post [You Are the Product: Two Decades of Giving Up Data Control](/blog/you-are-the-product), this information can be used to add to the ever-growing tracking landscape, where _you are the product_. If data can be scraped, it will be scraped.

## Minimal Viable Privacy: Keep the Good, Mitigate the Harm

Public registers are not the problem. Publishing by default is. The Web made copying trivial and memory permanent; our institutions never updated their threat models. The fix is not secrecy. The fix is shipping constraints as part of the product.

Disclose context (i.e. what, where, when) before identity (i.e. who), make sensitive lookups accountable, and make identity reveals temporary. If a system cannot tell you who looked you up and why, it is not finished.

Imagine a property search that works the way people actually use it. Prices, transactions and plot information remain openly searchable. To see a private individual’s legal name, the requester authenticates, states a purpose, and leaves a receipt. The owner receives a lookup notification, with a way to challenge misuse. Newsrooms and banks keep working; not stalkers, since the receipt is proof that the access occurred, and acts as evidence in stalking cases.

Carry the same pattern into the business register. Sole proprietors publish a service address by default and keep their residence private. Banks and platforms verify attributes like identity and ownership through verifiable credentials tied to MitID without ever learning a home address.

Payments should adopt identity consents by design. In MobilePay, a number shows initials or only the first name until both parties opt to reveal their names, and only within that thread. Reverse‑lookups outside a conversation fail fast, bulk probing is rate‑limited and logged, and abnormal patterns trigger user alerts.

Sensitive records should not be immortal on the open web. Bankruptcy cases still deter fraud through public, anonymised summaries; full files reside at the courthouse with proper access controls. Search engines and archive services respect an expiry; accountability remains, stigma loses its crawler.

Ideally, scraping becomes a losing game. Registry APIs should watermark or even change tiny details in data per request, as we [already see with maps](https://www.reddit.com/r/todayilearned/comments/ewkhmm/til_cartographers_will_sometimes_create_trap/). This would make it possible to trace back any misuse to the original requester. Registries should throttle requests at human scales, i.e. limiting to what humans can do and not what automated systems can do, and prosecute commercial resale. Open data for markets remains open including prices and statistics, while personally identifying details move behind accountable gates.

## Where Do We Go From Here

Denmark already leads on usability. Now it is time to lead on privacy engineering, where we build systems that respect user privacy by design. We should not consider data a commodity, but instead treat it as a shared resource that requires accountability. Just as you can lock your home, you should be able to lock your data. Just as you can close the curtains, you should be able to control who sees your information and when. That is not paranoia, that is privacy. Understanding the risks of digitalisation is crucial to achieving this goal.
