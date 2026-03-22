---
layout: layouts/post.njk
title: "The Illusion of Delete"
date: 2026-03-29
keywords:
  - is data really deleted
  - right to be forgotten GDPR
  - soft delete database
  - data backup retention
  - GDPR erasure request
  - digital footprint permanent
  - cryptographic erasure
  - protonmail password recovery
  - data retention trade-offs
topics:
  - "Surveillance Society"
  - "Digital Rights"
  - "Privacy Technology"
category: Surveillance Society
tldr:
  - Deletion contradicts everything else we demand from systems. Instant performance requires caching, reliability requires backups and compliance requires retention.
  - ProtonMail proves that real deletion is possible, but frustrating. Most users do not actually want what they say they want.
  - The delete button fails not because companies are evil, but because we asked systems to do contradictory things. We cannot have it all.
imageAlt: "A trash can symbolising the illusion of data deletion."
image: /assets/images/blog/the-illusion-of-delete.jpg
permalink: "/blog/the-illusion-of-delete/"
---

I deleted my Facebook account a few years ago. Not just deactivated, but permanently deleted. Facebook walked me through the process, warned me repeatedly that this was permanent, showed me what I would lose. I clicked through all the confirmations. The account vanished. My profile, my posts, my photos, all gone.

Except they were not gone. Facebook's terms say deleted data might persist in backups for [up to 90 days](https://www.facebook.com/help/154908788002686). Every message I sent still sits in someone else's inbox for context. Every third-party app I logged into still has whatever data it pulled, and they likely never knew I sent in a deletion request. Every advertiser I interacted with still has the profile they built from my behaviour.

At the same time, I wanted Facebook to keep these backups so my account would not disappear if their servers failed. I wanted their app to be fast and reliable, which would require replication of data across multiple datacenters in different regions. And all of those reasonable expectations made true deletion nearly impossible.

We built systems that cannot forget, and then we got angry when they remembered.

## The Impossible Ask

When you press delete, you are asking a system to do something that contradicts every other expectation you have of it. You want the data gone immediately and completely. But you also want the service to be fast, reliable, and fully compliant with the law. These goals are fundamentally incompatible.

Think about what we expect from modern systems. If a service is slow, we close the tab and go to their competitor. If we lose data because a server crashed, we demand accountability and make a great deal of it. If a company cannot produce records for an audit or legal inquiry, we call it negligent. We have built an entire technological civilisation around the assumption that data is always available, always correct, and never lost.

Deletion breaks all of those guarantees. True deletion means accepting that data might vanish when you do not want it to. It means slower systems because caches cannot be trusted. It means accepting risk that backups will not save you or your data. We say we want deletion, but what we really want is selective, perfect, retroactive control over data. That does not exist.

## Why Systems Remember

Systems are designed to persist data because that is what we asked them to do. Every feature we demanded has a cost, and that cost is permanence.

### Performance Requires Caching

When you load a website, your browser does not download every image, styles, and scripts each time. It caches them locally. Content Delivery Networks, CDNs, furthermore store copies around the world so pages load in milliseconds instead of seconds. Databases keep frequently accessed data in memory. There may even be several replicas of the database in different regions for redundancy and load balancing. If you delete something, those caches do not evaporate instantly, but slowly over time. Purging a cache across a distributed system takes time, and even then, copies may persist in browser caches, proxy servers, or network infrastructure managed by third-parties.

We abandon a page that takes more than two seconds to load. Speed is not optional, and speed requires copying data everywhere. Deletion is the opposite of speed in this case.

### Reliability Requires Backups

Servers fail all the time for various reasons. Disks have limited lifespans and will fail after a certain amount of writes. Entire data centres go offline because of power outages or connectivity issues. If a company loses your data because they did not keep backups, you would rightly call it negligent. So platforms snapshot their databases hourly or daily. When you delete something, it vanishes from the live system, but it sits frozen in those backups for weeks, months or even years in rare cases.

Backups are designed to restore everything to a previous state. They are not designed to honour individual deletion requests. Cleaning deleted items from backups is technically possible, but expensive and risky. Most platforms do not bother. You wanted your data to survive disasters. That means it survives you pressing delete.

### Compliance Requires Retention

Laws require companies to keep records. Financial transactions must be retained for years for tax audits. Communications with customers may need to be preserved in case of disputes. Employment records, medical data, and legal filings all have mandatory retention periods.

Even when you delete something, the law might require the platform to keep it. GDPR allows companies to refuse deletion requests if retention is legally required. You cannot audit a company that has deleted all its records, so compliance creates a legal obligation to remember, even when users want to forget.

### Undo Requires History

We expect every action to be reversible. Accidentally deleted a file? There is a trash folder. Cloud storage keeps version history so you can recover earlier drafts.

All of this is implemented through _soft deletes_: marking data as gone without actually removing it. The system tracks what was deleted and when, so it can restore it if you change your mind. This is useful and expected. It is also fundamentally incompatible with true erasure. You cannot have both perfect undo and perfect deletion.

::: note What Is "Soft Delete"?
Simply said, _soft deleting_ marks data as deleted without actually removing it. A `deleted_at` field gets set in the database entry, and queries filter out those pieces of data automatically. From your perspective, the data is gone. From the system's perspective, it is just hidden and can be retrieved if needed.

This is the industry standard for databases, and many frameworks e.g. [Laravel](https://laravel.com/docs/12.x/eloquent#soft-deleting) support it out of the box. It allows undo, edit history, and audit trails. All useful. All reasonable. All incompatible with actual erasure.
:::

None of this is a conspiracy, and not all of it is intentional or malicious, although some may be. It is just what happens when you build systems that are fast, reliable, compliant, and forgiving. Every one of those goals requires keeping data longer than users expect.

## When Deletion Actually Works and Why It Frustrates Users

[ProtonMail](https://proton.me) is one of the few services that takes deletion and data protection seriously. Emails are end-to-end encrypted, which means that neither Proton nor any third parties can read them. Behind this guarantee is a genius architecture. Your password is not only the key to your account, but also the password to the underlying encryption key. If you forget your password, your data is gone, because Proton does not have the ability to recover your keys. Permanently. No recovery. No backdoor. No "answer these security questions" workflow.

This is exactly what privacy advocates like me have been asking for. A system where the provider genuinely cannot access your data, even if they wanted to. True deletion by design.

And _normal users_ hate it.

People forget their passwords. They try their best to have secure passwords but will not bother with password managers, so they end up forgetting them. Months or years of emails vanish because they cannot remember a passphrase they set up years ago. There is no "reset password" link that saves them. The data is gone, and Proton support cannot help. By design.

This is the trade-off. If you want a system that cannot be compelled by governments, breached by hackers, or exploited by advertisers, you get a system that also cannot save you from yourself. The same encryption that protects your data from everyone else also means no one can recover it for you.

Most people do not actually want this. What they want is a system that is perfectly secure against everyone else, but perfectly forgiving for them. They want deletion to be real when they click delete, but reversible when they realise they made a mistake. They want encryption that keeps governments out, but backdoors that let them back in when they forget their password.

You cannot have both. Security and convenience are opposites. Deletion and recovery are opposites. Systems that prioritise one must sacrifice the other.

ProtonMail made a choice. They chose security and deletion over convenience and recovery. And that choice makes the service frustrating to use for many people. Not because Proton is incompetent or malicious, but because they built what we said we wanted, and some discovered they actually wanted something else. I have seen countless stories of people who lost access to their data because they forgot their password. They wanted the security, but they did not want the consequences.

## The Right to Be Forgotten Is Somewhat Legal Fiction

GDPR's Article 17 gives EU residents the "right to erasure," commonly called the right to be forgotten. In theory, you can request that organisations and companies delete your personal data. In practice, this right forgets the technical realities of how data is stored and how compliance laws work.

::: source European Commission
[Right to Erasure (GDPR Article 17)](https://gdpr-info.eu/art-17-gdpr/) --- The legal text defining when individuals can request deletion of their personal data. Read through the exemptions and ask yourself, "which of these applies to my data, and how will I know?"
:::

The right to be forgotten sounds powerful until you hit the exemptions. Companies can refuse deletion requests for legitimate purposes, including legal compliance, security, fraud prevention, research, public interest and freedom of expression. These are reasonable reasons in theory. The problem is you have no idea which exemption applies to your data, why, or for how long.

Submit a deletion request to a platform and you might get a confirmation that your data has been deleted. But what does that actually mean? Was it purged from backups, or just marked as deleted? Was it removed from third-party systems, or just from the main database? If it was kept for a legitimate purpose, which purpose? For how long? The platform is not required to tell you, and most do not.

You are left trusting that the company deleted what it said it would delete, kept only what it was required to keep, and will purge the rest when the exemption expires. But you have no way to verify any of this. The right to be forgotten is not backed by a right to audit, so deletion happens behind closed doors with no accountability. And even if we had the right to audit, it would be a nightmare to verify. You would have to understand the company's data architecture, track every copy of your data across all systems, and confirm that each one was deleted or retained according to the law. This is not just impractical; it is impossible for any individual.

However, the right to be forgotten is not worthless. It has forced companies to build deletion workflows and take privacy more seriously. But it is a legal overlay on systems that were never designed for erasure. Deletion is often incomplete, delayed, or impossible to verify, and you have no way to know which.

## The Distributed Problem

Even if a single platform could implement perfect deletion, the internet is not a single platform. Data gets copied to places you do not control, and those copies follow their own rules.

Email is the oldest example. Once you send an email, copies exist on your mail server, the recipient's mail server, any servers the email was forwarded through, and the recipient's local mail client. There is no central delete button. You can ask the recipient to delete their copy. You cannot enforce it.

Federated social networks like Mastodon work the same way. When you post something, it is copied to multiple servers operated by different people and organisations. If you later delete the post, your server sends deletion requests to other servers, but there is no guarantee they will honour them. A malicious or malfunctioning server can ignore the request entirely. Even well-intentioned servers might have already backed up your post before the deletion request arrived.

Blockchain-based systems take this to an extreme. Data written to a blockchain is permanent and cannot be altered or removed. There is a long technical explanation to this, but in essence any newly added piece of data cryptographically depends on the data that came before it. This creates a chain, where each piece of data depends on the previous one. This immutability is the biggest selling-point for certain applications (cryptocurrency transactions, smart contracts), but it is fundamentally incompatible with deletion. You cannot unsay something on a blockchain. And yet, people want both the immutability and the ability to undo.

::: note The Blockchain Paradox
I cannot count the number of people who have said to me that blockchain is the future because it is "immutable" and "cannot be censored." They like the idea of a financial system that is not controlled by banks.

However, those same people also want the ability to reverse transactions if they send money to the wrong person or if their account is compromised. They want the security of a bank, but without the bank. This is not just a contradiction; it is an impossible ask. You cannot have a system that is both immutable and reversible. The blockchain is not the future of finance because it cannot meet these contradictory demands.

This is the same paradox as deletion. We want systems that are fast, reliable, and compliant, but we also want perfect deletion. The blockchain is the ultimate example of a system that prioritises immutability over all else, and it shows us what happens when you choose one over the other.
:::

The more distributed a system, the less feasible deletion becomes. This is a trade-off. Decentralisation offers resilience, censorship resistance, and reduced reliance on single authorities. It also sacrifices the ability to erase information.

## Living with the Trade-Off

So where does that leave us? We have built a digital infrastructure that remembers everything because we demanded systems that never fail, never lose data, load instantly, and comply with every law. Deletion contradicts all of those goals.

Yes, some companies profit from retention. Yes, surveillance capitalism creates incentives to keep more data than necessary. But even if every platform were a nonprofit run by privacy advocates, backups would still exist, caches would still persist, and compliance would still require retention. The ProtonMail example proves this; even when a company genuinely prioritises deletion, the result frustrates users.

The real question is not "why do systems not delete data?" It is "what are we willing to give up to make deletion possible?"

Slower load times because caches cannot be trusted? Riskier data storage because backups are incomplete? Legal liability because you cannot produce records for audit? The inability to recover from mistakes because undo is impossible?

I do not think most of us are willing to accept those trade-offs. We want the internet to be fast, reliable, recoverable, and compliant. We also want perfect control over our data, including the ability to erase it completely. These expectations are in direct conflict. The delete button is not broken because companies are incompetent or malicious (though some are). It is broken because we asked for the impossible.

Perhaps the real illusion is not that deletion fails, but that we ever believed we could have it all.
