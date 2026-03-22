---
layout: layouts/post.njk
title: "What Surveillance Means to Me"
opinion: true
date: 2026-03-21
keywords:
  - surveillance analysis
  - digital surveillance
  - privacy balance
  - surveillance society
  - security vs privacy
  - surveillance technology
  - cctv privacy
  - digital monitoring
  - surveillance ethics
  - privacy rights
  - surveillance systems
  - public safety surveillance
  - surveillance policy
  - privacy analysis
  - surveillance debate
topics:
  - "Surveillance Society"
  - "Digital Rights"
category: Meta
imageAlt: "Security cameras watching over a public space."
image: /assets/images/blog/what-surveillance-means-to-me.jpg
permalink: "/blog/what-surveillance-means-to-me/"
---

My posts may make it sound like I think all surveillance is inherently wrong. I write about governments watching us, companies tracking us and data being weaponised. So let me first be direct: **I am not against all surveillance**. If I were, there would be parts of my professional life that would be difficult to explain.

I am against the way some modern surveillance systems are built and used.

## Why some Surveillance Makes Sense

Take CCTV cameras in public transport as an example. If a crime occurs, like a passenger getting assaulted, the cameras record it. Police can identify the person responsible, the victim has evidence, and someone is held accountable.

I have no objection to this. If anything, it would be much worse for that assault to go unrecorded, since the victim would have no way of proving who attacked them and any police investigation would be far harder. In this scenario, the camera is a witness. It is documentation of something that occurred in a public space.

The same applies to theft, to hit-and-runs and to any other crimes in public places. A camera provides evidence. That seems straightforward and reasonable.

::: note What Is the Definition of "Surveillance"?
In public discussion, the term "_surveillance_" is often used broadly to refer to any form of monitoring or data collection. However, I think it is important to distinguish between passive recording (like a security camera capturing footage of a public space) and active tracking or profiling (like a facial recognition system that identifies and catalogs individuals). The former can be a tool for accountability and safety, while the latter raises more complex privacy concerns.
:::

## The Issue with Automation and Algorithms

There is a meaningful distinction between a camera that records an event and a camera that identifies, tracks, and catalogs. The Electronic Frontier Foundation recently brought a case against Ring, Amazon's doorbell camera service, because the company integrated facial recognition technology. The system was not just recording what happened at someone's door. It was automatically identifying faces and building searchable databases of who visited which addresses.

::: source Electronic Frontier Foundation
[The Legal Case against Ring's Face Recognition Feature](https://www.eff.org/deeplinks/2025/11/legal-case-against-rings-face-recognition-feature) --- EFF's analysis of why automated facial identification at residential doorbells crosses from safety and evidence-gathering into mass surveillance infrastructure.
:::

This is different from a CCTV camera recording a crime or a camera enabling you to see who is ringing the doorbell. Once you add automatic identification and cross-referencing, you have built something else entirely. You have built infrastructure for tracking people across time and space.

The question is not whether identification, tracking or cataloguing is useful now. It is perfectly fine and useful in some well-defined contexts. The question is what happens tomorrow, in a year or even in five years. What happens when the system is extended or the context is changed? What happens when the data is accessed by people who should not have access? And what happens if the operator of the system has a view of what is acceptable, different from mine or yours? It is not just about the current use case. It is about the potential for future misuse and abuse.

## The Role of Retention

Denmark has an interesting rule when it comes to CCTV footage. Any footage must be deleted within 30 days unless there is an active investigation. It sounds like a technical detail, but I think it matters.

::: note Denmark's 30-Day CCTV Retention Rule
Under [Danish data protection rules](https://www.datatilsynet.dk/regler-og-vejledning/optagelser-og-overvaagning), surveillance footage must be deleted within 30 days. Retention beyond that requires an active police investigation that specifically needs the footage. The law also prohibits private cameras from recording directly into public spaces (e.g. the street or side-walk) to prevent the cameras from being used for mass surveillance.

The default is deletion and not accumulation.
:::

If footage is kept indefinitely, the system changes its nature. It is no longer only about preventing or solving crimes. It is no longer about accountability and safety. It becomes infrastructure for retroactive analysis. Someone could ask, "_Where was this person on these dates?_" and get a complete answer. The camera becomes a permanent archive rather than a witness to specific events. A deletion requirement changes the incentive structure, since the system is not designed to be a comprehensive record of everything that happens. It is designed to be a tool for accountability and safety, not a tool for tracking and profiling.

In the case of Ring and their centralised facial recognition system, it is also possible to correlate who visited which addresses over time, creating a detailed map of people's movements and social interactions. This centralisation differs from typical CCTV systems, where a set of cameras store recordings temporarily on a local server or in the owner's cloud services. Ring's system creates a network of cameras across many locations, all feeding into a single central database that can be queried for patterns of movement and association.

## Data without Names

The same logic applies to data collection more broadly. There is a difference between data that is truly anonymous and data about you and me specifically. If a city planner collects and analyses how many people move through a train station at different times, they have useful information for improving flow. If they know that I specifically moved through that station at a given time, they have something different. Now it is no longer surveillance, but _tracking_.

Anonymous aggregate data are legitimate to me. Understanding usage patterns, traffic flows and infrastructure stress makes sense. The concern comes when that data either remains personal or can easily become personal.

When personal data is collected, another fine line is drawn. Danish ISPs have previously been ordered to proactively log network activity from all their customers. While this may be helpful in a future criminal investigations, the question of who can access those logs and under what conditions matters enormously. A warrant should be and was required to access detailed records about an individual. It would have been a very different situation if the logs were available to anyone with administrative access or if they were used for profiling and tracking without oversight. One of these setups is a tool for accountability guarded by the court to be used for investigations after a crime has occurred. The other is a tool for control and profit without any meaningful checks.

::: source Altinget
[Lektor: Lov om telelogning er en krænkelse af grundlæggende rettigheder](https://www.altinget.dk/digital/artikel/lektor-telelogning-kraenker-grundlaeggende-rettigheder-og-gaar-imod-faelleseuropaeiske-vaerdier) --- An Associate Professor at the University of Copenhagen argues that the Danish law requiring ISPs to log user activity is a violation of fundamental rights.
:::

## Who the System Serves

The important question is what happens with the data produced by the surveillance. A camera that catches a person committing assault helps and serves the victim. A traffic count helps urban planning and serves the public. These serve a clear individual or collective benefit.

Now contrast that with systems that serve different interests: A facial recognition system that tracks my movements helps whoever wants to know where I go. A record of my browsing history helps advertisers. These serve commercial interests at my expense.

There is a third category, and it is trickier. That is when the system does not serve me directly, but serves a public good. An example of this is [Chat Control](/blog/if-privacy-is-outlawed-only-outlaws-have-privacy/), which is a proposed system that scans all digital communications to identify child exploitation. This system arguably serves the public good, but it requires surveilling everyone's private messages. The people who benefit from the protection are not the same as the people bearing the cost of surveillance. When the group being protected and the group being monitored are different populations, you need a stronger justification than "it helps good people." You are asking the majority to sacrifice privacy to protect a subset. That may sometimes be worth doing, but it is not neutral and straightforward. It requires explicit consent, strict limits, and genuine oversight and not assumptions that the good intention makes the violation acceptable.

The underlying question across all three categories is the same: **Who pays the cost and who gets the benefit?** When they are the same person or group, the justification is more straightforward. When they diverge, for example when I bear the surveillance cost and someone else gets the benefit, that is when you need principled boundaries: explicit limits on what can be collected, how long it can be kept, who can access it, and what it can be used for.

Once you build the infrastructure, it easily gets repurposed. A camera installed for one purpose attracts new uses. Data collected to solve crimes attracts interest from those who want to solve other problems with it. And the institution holding that power, whether government or company, now controls the narrative about your movements, associations, and behaviour. You accepted bearing a cost for one purpose, but you may not have accepted the cost for the new purposes. The system drifts, and the line between acceptable and unacceptable surveillance becomes blurry.

## Mass Surveillance: A Spectrum, Rather than Binary

I believe it is meaningful to think about mass surveillance as a spectrum rather than a simple on-or-off switch.

At one end sits a society with no surveillance whatsoever. This is typically called _privacy absolutism_. No CCTV cameras, no records, no accountability mechanisms of any kind. In practice, this would border on anarchy, as crimes would be much harder to investigate and prosecute. As long as no witnesses are near, anyone could act without consequence because there would be nothing to prove they had acted at all. A complete absence of any surveillance and monitoring does not produce freedom. It produces impunity, and impunity tends to serve those who already hold power.

At the other end sits an Orwellian society: every movement tracked, every communication logged, every association noted and cross-referenced. The effect is not only that crime becomes harder to commit. It is that people stop behaving freely at all. When observation is total, behaviour becomes a performance. People self-censor, avoid controversial associations, and conform to whatever expectations the system seems to reward. Freedom in any meaningful sense disappears, not because it has been explicitly forbidden, but because it cannot survive constant scrutiny.

::: definition Orwellian Society
The term "_Orwellian_" comes from the English author George Orwell and his 1949 novel _Nineteen Eighty-Four_. In the novel, a totalitarian state called Oceania monitors its citizens through telescreens, which are two-way screens installed in every home and public space and deploys a vast surveillance apparatus to enforce political conformity. The ruling Party's figurehead, Big Brother, watches everyone at all times. Citizens who express dissent, even privately, are disappeared.

Today, "Orwellian" describes any system of pervasive surveillance, thought control, or manipulation of truth that resembles the world Orwell depicted. In essence, a society where observation is total, privacy is impossible, and behaviour is shaped by the knowledge that every action is being watched.
:::

The right place is somewhere between these two extremes, but finding the equilibrium is genuinely difficult. The challenge is not just technical or legal. It is philosophical and ethical. Reasonable people can and do disagree about where the line should be drawn, and the answer may legitimately differ depending on the context: a hospital, a city square, a private home, a political assembly. What counts as proportionate surveillance in one setting may be deeply invasive in another. That is part of what makes this discussion too complex.

The difficulty is compounded by the fact that systems and the people operating them rarely stay fixed. A camera installed for one purpose tends to find new purposes over time. Data collected to solve crimes tends to attract interest from people who want to solve other problems with it. The acceptable use of today can become the infrastructure for abuse tomorrow. So wherever you think the line sits today, it is worth asking how robust that line is against drift.

## What I Am Actually Hoping For

In the past I would have argued that perfect privacy meant pure invisibility. I have come to think that is neither realistic in 2026 nor what I actually want. I do want cameras in shared spaces to help solve crimes and to feel safe and I want accountability for harm. I want a website where I can write about my thoughts and share them with others. In the end, I do not want to be invisible. I want the option to share information about myself when it serves a purpose I care about. I want to be able to control the narrative about who I am and what I do.

What I want to avoid is comprehensive tracking and the drifting towards an Orwellian society. Systems that can connect where I go, what I look at, who I meet with, and use all of that together to build a profile that can be used against me. I want data collection that serves a specific purpose.

The distinction I am trying to make is between surveillance that has boundaries and surveillance that does not. Between systems that require human review and decision-making versus systems that are fully automated. Between data that expires and data that accumulates. Between access that is guarded by warrants and access that is available to anyone with authority over the system.

I do not think this line is arbitrary or contradictory. I think these boundaries are meaningful. A camera that records an assault is not the same as a system that identifies everyone who walks past a building. A record that is reviewed and then deleted is not the same as a permanent archive. Access that requires a warrant is not the same as administrative access.

That is the conversation worth having. Not whether surveillance is good or bad in the abstract, but where the lines are and why they matter. The technology will keep developing, which means those questions will keep coming back. Getting clear on the principles now seems like the right place to start.
