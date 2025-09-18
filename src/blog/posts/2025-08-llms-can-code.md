---
layout: layouts/post.njk
title: "LLMs Can Write Code, But Cannot Read Your Mind"
date: 2025-08-26
keywords:
  - llm
  - ai coding
  - chatgpt
  - copilot
  - software engineering
  - code generation
  - programming ai
  - developer tools
  - code security
  - context awareness
  - software bugs
  - prompt engineering
  - machine learning
  - artificial intelligence
  - code review
imageAlt: "A developer using ChatGPT to generate code snippets."
image: /assets/images/blog/llms-can-code.jpg
permalink: "/blog/llms-can-write-code-but-cannot-read-your-mind/"
---

Large language models (_LLMs_) such as ChatGPT, Claude, and Copilot are highly capable. They can complete your code directly in your editor within seconds, set up initial implementations, and even explain confusing stack traces and error codes. However, there is one important caveat that most developers overlook: _capability without context is a risk_. An LLM can index and understand millions of implementations and still choose the wrong one for your situation because it cannot read your mind or understand your context. It does not understand your threat model, failure modes, data flows, latency budgets, regulatory boundaries, or operational quirks.

If that sounds abstract, it is not. In code, missing context can be subtle. Two snippets may appear equivalent but have very different underlying characteristics. When you write code yourself, the context is often clear in your mind, guiding your decisions as you code. When a solution is offered to you off the shelf by an LLM, it may not come with the same context, leading to potential misunderstandings.

## A Simple Example: Looks the Same, Breaks Your Security

```python
# Version A — looks fine, absolutely wrong for security
import random, string

ALPHABET = string.ascii_letters + string.digits

def password(n: int = 16) -> str:
    return ''.join(random.choice(ALPHABET) for _ in range(n))

print(password())
```

```python
# Version B — looks the same, actually correct
import secrets, string

ALPHABET = string.ascii_letters + string.digits

def password(n: int = 16) -> str:
    return ''.join(secrets.choice(ALPHABET) for _ in range(n))

print(password())
```

On the surface, the difference is tiny: Version A imports `random`, while Version B imports `secrets`. The difference in outcome is huge when it comes to security.

Version A can produce predictable sequences under observation and is not designed for cryptography. Use it for testing, or when security and predictability are not a concern.

Version B uses a cryptographically secure generator. Same shape, radically different security properties. While it is still not _truly_ random, it is the best a computer can do.

Research has shown that humans are unable to generate truly random sequences and tend to rely on predictable patterns, [a study has shown](https://journals.sagepub.com/doi/epdf/10.2466/pms.1995.81.3f.1347). The same applies to computers. Randomness in computers may be a predictable pattern or may be derived from input such as time or user behaviour. The randomness generator in the `secrets` module is designed to be secure against these issues by using a significantly more complex algorithm.

This is a fact that developers should know by heart, but an LLM prompted with “write a function to generate random passwords” may default to Version A because it is more common in public code and matches the _naïve_ reading of “random”. Unless you state the context explicitly (e.g., “cryptographically secure password for authentication”), it does not know your context or where the code will be used.

## Yet Another Example: The Importance of Context

```c
// Version A — looks fine, absolutely wrong for security
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define PASSWORD_LENGTH 16
#define CHARSET "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

int main(void) {
    const char charset[] = CHARSET;
    const int charset_size = sizeof(charset) - 1; // exclude null terminator

    for (int i = 0; i < PASSWORD_LENGTH; i++) {
        int index = rand() % charset_size;
        putchar(charset[index]);
    }

    putchar('\n');

    return 0;
}
```

```c
// Version B — looks very similar, more correct
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define PASSWORD_LENGTH 16
#define CHARSET "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

int main(void) {
    const char charset[] = CHARSET;
    const int charset_size = sizeof(charset) - 1; // exclude null terminator

    srand((unsigned) time(NULL));

    for (int i = 0; i < PASSWORD_LENGTH; i++) {
        int index = rand() % charset_size;
        putchar(charset[index]);
    }

    putchar('\n');

    return 0;
}
```

Do you see the difference? In Version A, the use of `rand()` without seeding it with a secure source of randomness makes it predictable. In Version B, the use of `srand((unsigned) time(NULL));` seeds the random number generator with the current time, making it less predictable (**but still insecure!**). If you run Version A multiple times, you will likely get the same output over and over, even though you used randomness.

Even though Version B is more secure, it still has weaknesses. If an attacker can predict the time when the program was started, they might be able to reproduce the random sequence. How does the LLM know what level of randomness is required for a given application?

Let’s run Version A, so you can see how random the `rand()` function actually is.

```shell
$ gcc -o version-a version-a.c
$ ./version-a
FZXC0wg0LvaJ6atJ

$ ./version-a
FZXC0wg0LvaJ6atJ

$ ./version-a
FZXC0wg0LvaJ6atJ
```

## Where the Missing Context Actually Lives

Most software development context is implicit. It lives in your mind as information you never wrote down. The LLM does not know if predictable random numbers are good enough or if cryptographic strength is required in your particular project. LLMs excel at syntax, but they are blind to system context unless you force-feed it. _They cannot read your mind._

The LLMs do not know if you work in a financial institution or if you are just a hobbyist developer. They do not know if you have specific compliance requirements or if you are building a prototype. They only know what you tell them.

## The Tendencies You Will See, If You Do Not Push Back

The model tends to choose what is popular over what is correct or appropriate. It tends to default to patterns that are plausible but may be unsafe. It confuses APIs that look the same but have vastly different underlying guarantees. It produces code that passes a test suite while violating your compliance obligations or performance constraints.

> We’ll Just Add More Context to the Prompt

Good instinct. Still insufficient. Important knowledge lives outside the prompt. You cannot cram your entire architecture, threat model, and operational history into a prompt. This is both impossible in terms of capacity, as well as a matter of security. Pasting your entire architecture into an LLM prompt would reveal your entire company’s code, including API keys and security flaws.

Even if you tried adding all relevant context, you would likely forget something important. The model does not know what you have forgotten.

## Where LLMs Do Shine, And Where To Use Them

Use the model to move faster where the stakes are low and the context is simple. For example, use it to write test skeletons and perform mundane refactors when you already have test coverage to account for misunderstandings. Use it to explain an error, while also providing relevant code and logs.

Use it as an unpaid intern. Sometimes the intern produces great work, and sometimes it does not. You need to review everything carefully. Developers need to learn to treat LLMs as a tool, not as a senior developer.

## Where They Do Not Get to Autopilot

Would you let an intern design your system architecture? LLMs should not be in charge of working on security-critical systems, concurrency and lifecycle management, or anything compliance-sensitive. The model can draft, but you are accountable. Make sure to test and review the code, and assume that there is a bug somewhere.

## Stack Overflow Is Not Always Correct, But LLMs Think It Is

Developers copy from Q&A sites because it saves time. The risk is that popularity and upvotes are not the same thing as security. [A 2021 conference paper at the Annual Computer Security Applications Conference](https://ssp.korea.ac.kr/assets/papers/ACSAC21.pdf) analysed 1,958,283 Stack Overflow answers tagged C, C++, and Android and discovered 12,458 insecure posts containing 14,719 insecure snippets, with reported precision around 91–93%. The authors also found those insecure snippets had propagated into the latest releases of 151 out of 2,000 popular C/C++ projects.

Their example is almost exactly the pitfall above, but hidden behind an LLM. A C string-trimming function called `isspace` on a plain char, which can go negative and thus trigger undefined behaviour. It was later “fixed” in the same Stack Overflow thread by casting to unsigned char and handling boundary conditions. LLMs are trained on exactly this kind of code. One person made a mistake on Stack Overflow, and suddenly this same mistake is being propagated to hundreds of other codebases. LLMs then train themselves on the question and those public codebases, increasing the belief that this specific implementation is correct. Why would it not be, if everyone is using it?

LLMs are trained on a vast amount of public code that includes code and Q&A text. Even if a particular model has a way to find and filter out insecure code, the statistical gravity still pulls towards common patterns. If those patterns encode subtle landmines, the model will happily reproduce them unless you inject the missing context: target standard, platform assumptions, data characteristics, failure modes, and forbidden APIs. If you are not explicit, you are asking a frequency-learner to substitute popularity for correctness.

## The Bottom Line

LLMs multiply implementation speed; they do not substitute for engineering judgement. They do not know your compliance requirements, your customers, or your adversaries. LLMs will produce code that is correct in isolation and wrong for your specific system. Use them where context is simple and consequences are small. Where context is complex and the stakes are high, make the context explicit, test it thoroughly, and keep a human firmly in the loop.

Speed is a feature only when the direction is right.
