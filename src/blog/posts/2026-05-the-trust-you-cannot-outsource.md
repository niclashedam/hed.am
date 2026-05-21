---
layout: layouts/post.njk
title: "The Trust You Cannot Outsource: Notes From V2 Security 2026"
opinion: true
date: 2026-05-21
description: "Cloud and AI dominated every booth at V2 Security 2026. Both move trust somewhere you cannot inspect, and that is a strange direction for the security industry, of all industries, to be moving in."
keywords:
  - cloud security risk
  - ai security risk
  - digital sovereignty
  - cloud act eu
  - security vendor analysis
  - on-prem vs cloud security
  - ai soc analyst risks
  - agentic ai security
  - prompt injection security tools
  - security supply chain
  - sovereign cloud
  - v2 security 2026
  - security industry trends
  - cybersecurity expert copenhagen
  - law enforcement cybersecurity
topics:
  - "AI Security"
  - "System Architecture"
  - "Threat Analysis"
  - "Data Governance"
category: Meta
tldr:
  - Cloud and AI dominated V2 Security 2026, and not a single high-profile vendor I spoke to would support running their platform fully on-prem.
  - A decade ago you were laughed at for staying on-prem. Today you are laughed at for running on a non-EU cloud due to digital sovereignty concerns. Being a first mover in security is not the same as being right.
  - Both trends are trust transfers dressed as capability upgrades. For institutions whose failure is not measured in fines, that trade has barely been examined.
imageAlt: "Rows of chairs at a security conference."
image: /assets/images/blog/the-trust-you-cannot-outsource.jpg
permalink: "/blog/the-trust-you-cannot-outsource/"
---

A few weeks ago, I walked the floor at V2 Security 2026. Two themes were inescapable. Many vendors were selling either cloud-delivered security or AI-assisted security. The marketing had converged. The keynotes had converged. The vendor demos had converged.

I am not against either. I am against the answer I got when I started asking various vendors the same question.

I work with national security, in one of those seats where the job is to find the mistake before it ships. The police, no matter the country, are not allowed to fail, and that constraint sits on every architectural decision before it is signed off. A leaked password can be rotated. An adversary learning the shape of our defences, or a public losing trust in the institution itself, cannot. That perspective shapes which vendor pitches I find serious, and which I find decorative.

Just behind the security checkpoint at the Danish National Police, there is a memorial for officers who died in the line of duty. The names are not abstract to me. Each one stands for a moment where someone walked into a situation no-one had quite anticipated, and was not prepared for.

On 18 September 1965, four officers were killed in Copenhagen within ten minutes, at two different locations, by a single gunman. It was the first time in Danish history that one person had killed four officers. The thing that strikes me, reading the case now, is how unimaginable that day would have looked the morning before, and how completely it reshaped what the institution then had to imagine could happen.

::: source Rigspolitiet / Danish National Police
[Palle Sørensen-sagen, 18. september 1965](https://politi.dk/om-politiet/politimuseet/palle-soerensen) --- The case file from the Danish Police Museum. Four officers were killed in two separate Copenhagen locations within ten minutes by a single gunman; the first time in Danish history that one individual had killed four officers.
:::

The question I find myself asking, walking past that memorial, is the one without an obvious answer. Every name on that wall represents a moment where someone, somewhere, had previously made a decision about what risk the institution would carry, and the decision did not survive contact with reality. The people who made those decisions almost certainly did not think they were making them.

The decisions I help sign off on are the same kind. If I accept a vendor dependency that turns out to be unsafe, or an architecture that looks fine in 2026 and catastrophic in 2030, the cost is not paid in fines. In an institution whose job is keeping people alive, an architectural mistake can have a body count. I am not being dramatic. That is the worst-case shape of the risk I am asked to carry, and worst cases are the part of the work that has to be taken seriously. _What are we doing today that we will look back on in twenty years and wish we had done differently?_ That question is the difference between a product I can consider and a product I cannot.

## The Question Nobody Said Yes To

I went around to a handful of high-profile vendors and asked roughly the same thing each time. _Can we run this on-prem?_ Not as a hostile question, and not because on-prem is automatically better. For some of the data my organisation handles, the answer to that question decides whether the conversation continues at all.

None of them said yes. Some said the on-prem option had been discontinued. Some said a "private" or "sovereign" deployment was available, but on closer inspection, that meant the vendor's software running in a dedicated tenancy on the same hyperscaler. Some said the architecture simply did not support it any more, because telemetry, model inference, threat intel correlation, or update delivery all assumed a connection back to their cloud.

The honest version of every answer was the same. _You cannot have this product without also accepting our operating model._ That is a perfectly reasonable commercial position. It is also a quiet statement about who manages the risk, and the answer is no longer the customer.

That is the post. Everything below is just me trying to explain why it was the wrong answer to hear from the security industry specifically.

## Fashion Has a Half-Life

A decade ago, running infrastructure on-prem was unfashionable. You were behind the curve. You were the IT department that did not "get it." Every consultant and every vendor agreed that the cloud was where serious organisations went, and the holdouts were going to learn the hard way.

Today, the joke has flipped. Now you are the one being laughed at if your infrastructure runs on a non-EU cloud. Digital sovereignty obligations and CLOUD Act exposure are rewriting procurement rules in real time. The organisations that moved to the cloud first are now spending the next budget cycle figuring out how to move off it, or at least how to wrap it in enough sovereign packaging to satisfy a regulator who did not exist when they signed the original contract.

::: note Digital Sovereignty
"Digital sovereignty" refers to a country or bloc's ability to retain meaningful control over the data of its citizens and institutions, especially against the legal reach of foreign jurisdictions. In the EU context, it has shifted from a talking point to a procurement requirement. The U.S. CLOUD Act has long obliged U.S.-headquartered providers to surrender customer data on lawful U.S. request, regardless of where the data physically sits. What changed in 2026 was the politics. Open U.S. threats toward Greenland, part of the Kingdom of Denmark, forced European governments --- the Danish one in particular --- to stop assuming that the country hosting their critical infrastructure could still be treated as an ally. The legal exposure was always there. The political assumption underneath it has now broken.
:::

This is the lesson I want to put underneath everything else in this post. _Being a first mover, particularly in security, is not the same as being right._

## A Strange Direction for Security Specifically

Take that lesson and look at the floor at V2 again. The thing being moved into the cloud, fastest, is the security stack itself. SIEMs are cloud-delivered. EDR telemetry is cloud-stored. Threat intelligence platforms are cloud-hosted. Case management for incident response is, increasingly, cloud-managed.

These are the tools that exist _because_ you do not trust the rest of your stack. They are the witnesses and the recorders. Moving them into someone else's environment, while the lesson of the last decade is still being written out in real time, is a strange thing for the _security_ industry of all industries to be cheerful about.

Pause on what that move actually means in practice.

- Your detections live where their breach lives. If the upstream provider is compromised, and the past few years of cloud-provider incident history says this is not hypothetical, then the very system you would use to spot it is co-located with the attacker.
- Their legal jurisdiction is your legal jurisdiction. A subpoena served on the operator covers your data. You learn about it from a press release, if at all.
- Their supply chain is your supply chain. The same logic I wrote about in [How Trusted Packages Turn Into Attack Vectors](/blog/how-trusted-packages-turn-into-attack-vectors/) applies upstream of any SaaS vendor, only with less visibility and fewer levers.
- Their roadmap is your roadmap. When the vendor decides a feature is deprecated, or that a region is no longer supported, or that pricing now reflects a per-event model, you adapt. The control was never yours.

For most enterprises, this trade is reasonable. The thing you are protecting is replaceable, the operational gain is real, and the residual risk lives within an acceptable envelope. For organisations that hold assets which cannot be re-issued, the envelope is the wrong shape, and no amount of certifications changes that.

## AI and the False Floor

The second theme on the V2 floor was AI. Every vendor had an AI story. Detection summarisation, triage, autonomous response, code review, threat intelligence enrichment, alert deduplication. The pitch was always the same: this lets your team do more with less.

There are two failures hiding underneath that pitch, and both of them are quiet enough to miss until something goes wrong.

### If the AI Did Not Flag It, It Did Not Happen

A confident interface is a powerful sedative. When an AI assistant produces a clean summary, ranks an alert as low priority, or returns "no findings" on a sweep, the temptation to treat that output as authoritative is enormous. Especially when the alternative is an analyst opening a four-thousand-line log themselves.

Coverage gaps in an AI-assisted workflow do not look like gaps. They look like calm. The pile of unread alerts shrinks, the dashboard turns green, and the things the model never learned to see become invisible by construction. _Triage atrophies._ The skill of looking at a raw artefact with suspicion is exactly the skill the tool is designed to relieve you of, and skills do not survive long once relief arrives.

This is a different shape of risk than the classic false-negative. A traditional signature-based tool that misses something at least leaves the raw log in front of you. An AI assistant that misses something hands you a summary that says everything is fine.

### The AI Does Not Think

The second failure is louder when it happens, but rarer in the demos. Models hallucinate. Given a tool, they take actions. Given a tool with production credentials, which is the direction every vendor with an "agentic" story is heading, they take actions in production. There is no internal narrator weighing whether the action is proportionate, reversible, or even sensible. The model finishes the sentence it was generating.

::: warning Agentic Security Tools Run with Real Credentials
The "AI SOC analyst" pitch, in its strongest form, is an agent with read and write access to your environment. That means a model, whose behaviour is unverifiable and whose training data you cannot audit, is one prompt injection away from quarantining a production host, revoking a service account, or pushing a remediation that turns an incident into an outage. The model does not know it is doing this. It is finishing tokens.
:::

And separate from either failure mode, there is the input side. To be useful at all, these systems need to be fed the material you were trying to protect. Cases. Tickets. Logs. Threat intel. Internal source code. Identities. The data goes somewhere. At minimum into an indexing pipeline. Often into model context windows that span vendors. Sometimes into training corpora, despite contractual assurances. Those contractual assurances are worth exactly as much as your ability to audit them, which is, in practice, nothing.

For a marketing department, that may be acceptable. For a police force, it is not.

## Both Trends, Same Shape

Step back from the cloud half and the AI half, and what they have in common comes into focus.

Both are trust transfers dressed as capability upgrades. The vendor narrative is built around what you gain. The question that kept getting answered with a polite "no" at V2 was whether the customer could keep the system inside their own walls, and the risk along with it. The architecture has decided in advance that they cannot.

In the cloud case, the trust moves to the operator and their upstream supply chain. In the AI case, it moves to a model whose behaviour you cannot inspect, and whose training set you may be involuntarily contributing to. In both cases, the security industry itself is the one packaging the transfer as a step forward.

I do not think this is malicious. I think it is what happens when a market converges on a fashion and stops asking foundational questions because the answers would be inconvenient to the quarterly roadmap. Conferences amplify it. Procurement teams looking at the same vendor slides reach the same conclusions. The unasked question stays unasked.

## The Point

A trend being everywhere does not make it stable. It makes it _current_. Those are not the same thing, and confusing them is how security organisations end up unwinding, five years from now, the decisions they were mocked for not making five years ago.

I am not arguing against cloud. I am not arguing against AI. I am arguing that neither should be adopted _as a security control_ without being able to name, out loud, the trust you are transferring and the assets that depend on that transfer holding. If the assets in question can be re-issued, the conversation is easy. If they cannot, the conversation has barely started.

The defenders who look unfashionable today, slow to move, on-prem where it matters, sceptical of model output, conservative about where sensitive data lives, may turn out to be the ones who understood that fashion and stability are not the same thing. I would rather be in that group when the next regulatory reversal arrives.
