---
layout: layouts/post.njk
title: "Malicious Compliance: How Trusted Packages Turn Into Attack Vectors"
date: 2025-09-25
keywords:
  - software supply chain
  - supply chain security
  - open source security
  - npm
  - package manager
  - dependency management
  - malicious packages
  - cybersecurity
  - software vulnerabilities
  - supply chain attacks
  - trust in software
  - package auditing
  - dependency risk
  - software development
  - open source
imageAlt: "A man holding an npm sticker."
image: /assets/images/blog/malicious-compliance.jpg
permalink: "/blog/malicious-compliance/"
---

Modern software is built largely on open-source packages and libraries. Instead of developing everything from scratch, developers often rely on third-party packages to speed up development and utilise existing solutions. For example, why implement a complex algorithm when you can simply install a package that does it for you, tested and verified by thousands or even millions of other software developers?

This approach has fundamentally transformed how we build software. Package managers like _npm_ for JavaScript, _pip_ for Python, and _gem_ for Ruby have created huge ecosystems where developers can easily share and consume code. A typical modern web application might depend on hundreds or even thousands of packages, each solving specific problems from date formatting to cryptographic functions. These dependencies form a complex tree structure, where each package may itself depend on dozens of other packages.

## The Convenience of Reuse

The convenience is undeniable. With a single command like `npm install lodash`, developers can access a mature, well-tested utility library that has been downloaded _billions_ of times. The open-source model encourages collaboration, peer review, and rapid innovation.

The interesting aspect is that even the packages you rely on have their own set of dependencies, which in turn have their own dependencies. It is like a tree, with your application at the root, and all the packages and their dependencies forming the branches and leaves.

This tree of packages is provided by the registries that host these libraries and have become critical infrastructure for the internet. They serve billions of downloads daily, automatically delivering code updates to production systems worldwide. This automation and scale, whilst enabling unprecedented developer productivity, also create new attack surfaces that malicious actors are increasingly eager to exploit.

## Behind the Leaf

Being able to reuse existing packages is a great convenience, but it also introduces significant risks. When you install a package, you are not just trusting its author, you are trusting everyone who has contributed to it, everyone who maintains its dependencies, and everyone who has access to publish updates. And this goes on for every single dependency in the tree.

This very blog is built using [Eleventy](https://www.11ty.dev/), a static site generator that relies on numerous npm packages. When I install Eleventy, it pulls several dozen dependencies. For example, it pulls `iso-639-1` and `kleur`. `iso-639-1` is a [small package](https://github.com/meikidd/iso-639-1) that provides ISO 639-1 language codes, built and maintained by a single Singaporean author. `Kleur` is a [popular package](https://github.com/lukeed/kleur) for colouring terminal output, maintained by a developer in the USA.

In essence, when I install Eleventy, I am implicitly trusting these packages and their maintainers. These are people whom I have never met, from different parts of the world, with different motivations and security practices. All these people have the ability to make my website do anything.

## When a Leaf Rots

Whilst it may sound silly to be worried about a package that just provides language codes, or colours terminal output, the reality is that attackers have found ways to exploit these dependencies to compromise systems. This is known as a supply chain attack. And they happen all the time.

npm, the package manager for JavaScript, has been a frequent target. Large-scale supply chain attacks happen several times a year. In September 2025 alone, it happened twice. Up to 18 popular npm packages were compromised with malware as part of a supply chain attack. Packages were compromised through a phishing attack on the package maintainers and the compromised packages started downloading a cryptocurrency transaction interceptor that would silently steal cryptocurrency from users of popular wallets.

Also in September 2025, a self-replicating worm appeared that steals GitHub developer credentials from affected systems to spread itself to other projects. As of 16th September, the worm had affected more than 187 packages, including packages by CrowdStrike. CrowdStrike was the very same company that caused millions of computers to crash in 2024 due to poor quality assurance.

## Package Managers, Malicious Compliance, and You

The root cause of these attacks is the very convenience that package managers provide. They make it easy to install and update packages, but they also make it easy to introduce malicious code. When you run `npm install`, you are executing code from the package's `postinstall` script, which can do anything. If an attacker can compromise a package, they can execute arbitrary code on your system.

The problem is made even worse by the fact that many developers blindly trust packages and their maintainers. They assume that popular packages are safe because they have been downloaded millions of times. But popularity does not guarantee security. Even well-maintained packages can be compromised if an attacker can gain access to the maintainer's account.

## Antivirus Is Not Enough

Traditional security measures like antivirus software are not sufficient to protect against supply chain attacks. Antivirus software relies on known signatures to detect malware, for example through hashing. However, since npm packages are frequently updated and can even be built locally, the hash of a package can differ. This means that even if a package was previously known to be safe, a new version could introduce malicious code that goes undetected by antivirus software.

_Yarn_, a popular alternative to npm, has introduced auditing features that can help identify known vulnerabilities in packages. However, these features are not foolproof and can only detect known issues. They cannot protect against zero-day vulnerabilities or sophisticated attacks that exploit trust relationships.

## Mitigating the Risks

To mitigate the risks of supply chain attacks, developers need to adopt a more cautious approach to using third-party packages. Software developers should no longer view packages, frameworks and libraries as a human right, but as a privilege that needs to be earned. Packages should only be used if absolutely necessary, and only after careful evaluation of their security practices and track record.

### Dependency Auditing

Tools like [Snyk](https://snyk.io/) and [Dependabot](https://dependabot.com/) can help identify known vulnerabilities in dependencies. Regularly auditing your dependencies and updating them to the latest secure versions is crucial. These tools can automatically create pull requests to update dependencies when vulnerabilities are found. Whilst this does not eliminate the risk of supply chain attacks, it can help reduce the attack surface by ensuring that you are not using outdated or vulnerable packages.

### Quarantine and Isolate

If possible, create a quarantine environment for your project. This could, for example, be in a Docker container or a virtual machine. This way, if a package does contain malicious code, it is isolated from your main system and can be easily discarded.

The same goes for deployments. Use isolated build and deployment environments that are separate from your development machines. When a build is successful, deploy it to a canary environment first and let it run for a while before promoting it to production. This way, if a malicious package does something unexpected, you can catch it before it affects your users.

### Code Reviews and Vetting

For critical packages, consider reviewing the source code before using them. This is not always feasible for large packages, but for smaller ones, it can help identify potential issues. Additionally, vet the maintainers of the packages you use. Look for signs of active maintenance, responsiveness to issues, and a good track record. Would you trust this person with your code?

### Pin Dependencies and Use Lock Files

Rather than accepting any version of a dependency, pin specific versions using lock files (`package-lock.json` for npm, `yarn.lock` for Yarn, `Pipfile.lock` for Python). This ensures that your application uses exactly the same versions of dependencies across all environments. When updates are needed, test them thoroughly in a staging environment before deploying to production.

### Monitor and Alert

Implement monitoring for unusual behaviour in your applications and infrastructure. This includes monitoring for unexpected network connections, file system changes, or resource usage. Set up alerts for when new dependencies are added to your projects, so you can review them promptly.

If the language code package suddenly starts making network requests to a suspicious IP, or the terminal colouring package tries to modify system files, you want to know about it immediately.

## The Human Element

Perhaps the most important aspect of supply chain security is recognising the human element. Open-source software is built by people with varying levels of security awareness, different motivations, and different circumstances. A maintainer might be overwhelmed, burnt out, or simply make a mistake. They might fall victim to phishing attacks or have their accounts compromised through no fault of their own.

The centralised nature of package registries creates single points of failure. When popular packages are compromised, the impact can be enormous. The 2021 attack on the `Codecov` bash uploader affected thousands of companies, including major technology firms. The 2022 compromise of the `node-ipc` package by its own maintainer demonstrated that even trusted contributors can become threat actors.

## A Balanced Approach

The goal is not to avoid dependencies entirely, since that would be impractical and would eliminate many of the benefits of modern software development. Instead, we need a balanced approach that weighs convenience against security. Every dependency should be justified: does it solve a complex problem that would be expensive to implement yourself? Does it have a good track record and active maintenance? Are there alternatives with better security practices? Could the package be implemented directly in your codebase with minimal effort, instead of relying on an external dependency?

Consider building a "dependency budget" for your projects. Just as you might have a performance budget to ensure your application loads quickly, a dependency budget can help you be more selective about what you include. This forces teams to be intentional about their choices rather than installing packages without consideration.

## The Future of Software Supply Chains

The software industry is slowly recognising these challenges. Initiatives like the [System Package Data Exchange](https://spdx.dev/) and [Supply-chain Levels for Software Artifacts](https://slsa.dev/) are working to improve transparency and security in software supply chains. Package registries are implementing better security measures, including two-factor authentication requirements for maintainers and improved malware detection.

However, these improvements take time to implement and adopt. In the meantime, developers must remain cautious and adopt defensive practices. The convenience of modern package managers is undeniable, but it comes with inherent responsibility and risks, so make sure you are comfortable with the implications.

## Conclusion

Software supply chain attacks exploit the very foundations of modern development: our reliance on shared, reusable code. The trust model that enables rapid innovation also creates opportunities for malicious actors. As the September 2025 attacks demonstrate, this is not a theoretical risk, it is a present reality that affects real projects and real users.

The solution is not to abandon open-source software, but to approach it with appropriate caution. Treat every dependency as what it is: code written by strangers that will run with the same privileges as your application. Implement appropriate safeguards, monitor your supply chain, and remember that security is not a one-time decision but an ongoing process.

In a world where a single compromised package can affect millions of applications, vigilance is not paranoia, it is professionalism. The convenience of modern development tools is powerful, but with great power comes great responsibility. Use it wisely.
