---
layout: layouts/post.njk
title: "When CPUs Stopped Scaling: Why Hardware Got Complicated"
date: 2025-09-08
keywords:
  - cpu scaling
  - hardware evolution
  - moore's law
  - dennard scaling
  - computational storage
  - multi-core processors
  - gpu
  - arm architecture
  - data movement
  - computer architecture
  - performance optimisation
  - memory hierarchy
  - software engineering
  - hardware bottlenecks
  - technology trends
  - delilah
imageAlt: "A motherboard with three RAM sticks."
image: /assets/images/blog/when-cpus-stopped-scaling.jpg
permalink: "/blog/when-cpus-stopped-scaling/"
---

When I was a kid, computers only had a single core. Some did not come with a dedicated graphics card, relying instead on integrated graphics within the motherboard. By the 2000s, computers had already been around for quite some time, and a few interesting trends had emerged. Moore's Law predicted that the number of transistors on a chip would double approximately every two years, leading to exponential increases in performance. Dennard Scaling observed that as transistors became smaller, they consumed less power, allowing for higher clock speeds and more powerful CPUs.

These trends meant that computers became faster and faster without significant changes to their architecture or how they worked. Manufacturers could cram more and more transistors into a single-core processor, keeping up with the development of advanced and complex software.

## When The Magic Stopped

In the mid-2000s, the physical limitations of processors began to show. We kept shrinking transistors, but voltage refused to drop enough. This led to two problems. First, making transistors smaller generated more heat in a smaller space, causing overheating of the entire processing chip. Second, electricity started leaking, as it could jump across smaller gaps more easily. Had the voltage continued to drop, the heating would have been manageable and electrical leakage minimised.

However, as this was not possible, processor speeds stalled around 3–5 GHz and desktop power froze near 100 W. We could still add more transistors, just not in a single core. During the same period, the expectations to software exploded, introducing HD video streaming, complex 3D games, real-time data over the internet and early machine learning. The old habit of “waiting for a faster CPU” stopped working.

_Hardware got complicated._

## Multi-Core Helped, But Not Everywhere

The obvious quick fix was more cores. Even though we could not put more transistors into a single core, we could add more cores to the chip. This enabled computers to start multitasking. Previously, a computer only did one thing at a time, but could switch between tasks very quickly. So, while it may have looked like it was doing many things at once, it was really just switching between tasks.

With multi-core processors, the computer could now do multiple things simultaneously. But this also meant that software developers had to know how to divide programs effectively across all the cores. For example, a video editing application could use one core to decode video, another to apply effects, and a third to encode the final output. In other cases, it was harder to split the programs into smaller tasks.

## Enter The Specialists

Since a program must now be divided into smaller tasks, there is a natural limit to the amount of parallelism that can be achieved. Not all tasks can be broken down into smaller pieces that run simultaneously. Some tasks are inherently sequential, meaning they must be completed one after the other.

So we changed tactics. Graphics Processing Units (GPUs) emerged as a powerful tool for handling specific types of workloads. GPUs handle large amounts of identical maths. Although called Graphics Processing Units, their capabilities extend far beyond just graphics. What they really excel at is processing large blocks of data in parallel. So, if you do the same thing repeatedly, like decoding video or applying filters, a GPU can do it much faster than a CPU, because it can do it multiple times at once.

The CPU did not retire; it became the coordinator. But since GPUs are primarily good at working on large blocks of data, this did not resolve the issue of moving data between different parts of the system. GPUs require data to be read from storage by the CPU, placed into memory, and then processed by the GPU.

This required us to rethink computer architecture once again.

## What “Computational Storage” Means

We quickly learnt that moving data takes a lot of time. Colin Scott made a website called [Latency Numbers Every Programmer Should Know](https://colin-scott.github.io/personal_website/research/interactive_latency.html), which shows the staggering differences in latency between various types of memory accesses.

Accessing a byte in the CPU was, in 2020, on the order of a few nanoseconds. Accessing the same byte in main memory takes around a hundred nanoseconds. Reading that same byte from an SSD takes 16,000 nanoseconds. This taught us a valuable lesson: the cost of moving data is often much higher than the cost of processing it. The fastest byte is the one you never move.

Computational Storage emerged as a solution to this problem. Computational storage runs tiny, safe functions inside or right next to the SSD to do simple but high-value work early: filter, compress, parse, summarise. Instead of pulling a million records to the CPU to keep a few thousand, the SSD gives you the few thousand to begin with.

The example I usually give to friends, family, and colleagues is a simple one: imagine an Excel spreadsheet that contains a million rows of data. You probably have some filters applied to show only the relevant rows. But what actually happens is that you are asking the system to fetch a million rows, and then throw away 999,000 of them. Why?

Computational Storage allows the system to do the filtering right at the storage level, so only the relevant rows are sent to the CPU in the first place. In essence, Excel asks the SSD to only return the rows that match the filter criteria, limiting the amount of bytes that need to be moved.

The major challenge with Computational Storage is standardisation. Different SSDs have different capabilities, and there is no universal way to express the kinds of computations you might want to run. This fragmentation makes it hard for developers to take advantage of these features without getting locked into a specific vendor’s ecosystem.

This is where my research comes in.

## How My Work Fits (No PhD Required)

During my [PhD](/papers/2024-Thesis.pdf), we built [Delilah](/papers/2023-DaMoN.pdf), a storage device that can run small sandboxed functions. These functions can filter, compress, and transform data right at the storage level, reducing the amount of data that needs to be moved to the CPU. The interesting thing about my work was the use of [eBPF](/papers/2021-eBPF.pdf) as the language for these functions.

eBPF was initially built for network packet filtering and has since evolved into a powerful tool for a variety of use cases, including security and monitoring. The interesting aspect of eBPF is that it is simple and verifiable, so the computer can ensure that the functions are safe and will not cause any harm to the data or drive. On top of this, eBPF is vendor-neutral, meaning that the same eBPF code can run on different hardware without modification. This solves the standardisation problem, as developers can write eBPF functions without worrying about the underlying hardware.

When plain and simple eBPF is not fast enough, Delilah (or the program itself) can jump to device “registered functions”, which are hardware-specific or hardware-accelerated functions. These functions do not have the limitations of eBPF, as they are written in C by the vendor. While this breaks the vendor-neutral promise to a limited extent, it allows for high-performance operations when needed and access to hardware-specific features.

The bigger lesson from my thesis is more practical: you do not win by cramming more raw compute into the drive. Just like with CPUs, you cannot out-compute the cost of moving data. You win by reducing data movement through good interfaces (a clean way to request work) and state on the device (so it can cache/remember and avoid re-reading). Push computation down to storage only when it reliably shrinks the data you would otherwise move.

## ARM’s Role

While GPUs and Computational Storage were helpful in speeding up computers, a side plot emerged: efficiency. Now that complex work was being done elsewhere, the CPU could focus on coordination and management tasks, optimising its workload and power consumption.

Until recently, almost all computers were equipped with x86 processors from Intel or AMD. These processors were powerful and advanced, but not particularly efficient. They consumed a lot of power and generated a lot of heat. ARM processors, on the other hand, were designed to be efficient and low-power. They were not as powerful as x86 processors, but they were good enough for many tasks including running the operating system and coordinating work.

If you have a MacBook with an M chip, you are already using an ARM processor. Apple made a bold move by switching from Intel x86 processors to their own ARM-based M1 chips in 2020. This transition was driven by the need for better performance per watt, allowing for longer battery life and quieter operation without fans. I can honestly say that my MacBook Air with an M3 chip is the best laptop I have ever owned, and by far the quietest and most battery-efficient. My previous x86 MacBook had a few hours of battery life and a fan that would kick in often, while my M3 MacBook Air lasts multiple days on a single charge with no fan noise at all.

## What Developers Should Do In 2025

Most developers will not have the time or resources to build an entirely new storage stack for efficiency. Instead, they should focus on optimising their existing systems, with an understanding of the limitations and capabilities of their hardware.

Start by measuring data movement, not just CPU time. CPUs are not the only bottleneck in the system; data movement can be just as costly, if not more so. Are you reading a lot of data? Can it be cached closer to the CPU?

Look for the places where you read mountains of bytes to keep a handful. Are you reading many rows from an SQL database, just to do filtering and summarisation? If you can change your SQL queries to already filter and summarise the data, you can reduce the amount of data that needs to be moved. This is similar to computational storage; you tell the SQL server how to prepare the data, so less data has to be moved.

### Locality Is A Superpower

If possible, access data in a cache-friendly way. This means thinking about how data is laid out in memory and trying to access it in a way that takes advantage of the CPU cache. For example, if you are processing a large array, try to access it in a linear fashion rather than jumping around to random elements. A CPU can predict what you are doing, because you go through the array linearly and it can prepare the data for you in advance.

Below are two nearly identical implementations of a matrix summation function in C:

```c
// Version A: This is a great way to sum a matrix.
int sum_array_rows(int a[M][N])
{
    int i, j, sum = 0;

    for (i = 0; i < M; i++)
        for (j = 0; j < N; j++)
            sum += a[i][j];
    return sum;
}

```

```c
// Version B: This is a terrible way to sum a matrix.
int sum_array_cols(int a[M][N])
{
    int i, j, sum = 0;

    for (j = 0; j < N; j++)
        for (i = 0; i < M; i++)
            sum += a[i][j];
    return sum;
}

```

While both implementations produce the same result, the first one is much more efficient because it accesses memory in a cache-friendly way. Computer memory is not two-dimensional, so the access patterns matter.

If you do the maths, assuming 4x4 matrices:

| Iteration | cols | Version A                  | Result  | Version B                  | Result   |
| --------- | ---- | -------------------------- | ------- | -------------------------- | -------- |
| 0         | 4    | i \* cols + j = 0 \* 0 + 0 | **= 0** | j \* cols + i = 0 \* 4 + 0 | **= 0**  |
| 1         | 4    | i \* cols + j = 0 \* 0 + 1 | **= 1** | j \* cols + i = 1 \* 4 + 0 | **= 4**  |
| 2         | 4    | i \* cols + j = 0 \* 0 + 2 | **= 2** | j \* cols + i = 2 \* 4 + 0 | **= 8**  |
| 3         | 4    | i \* cols + j = 0 \* 0 + 3 | **= 3** | j \* cols + i = 3 \* 4 + 0 | **= 12** |
| 4         | 4    | i \* cols + j = 1 \* 0 + 0 | **= 4** | j \* cols + i = 0 \* 4 + 1 | **= 1**  |
| 5         | 4    | i \* cols + j = 1 \* 0 + 1 | **= 5** | j \* cols + i = 1 \* 4 + 1 | **= 5**  |
| 6         | 4    | i \* cols + j = 1 \* 0 + 2 | **= 6** | j \* cols + i = 2 \* 4 + 1 | **= 9**  |
| 7         | 4    | i \* cols + j = 1 \* 0 + 3 | **= 7** | j \* cols + i = 3 \* 4 + 1 | **= 13** |

See the pattern? Version A reads the values one by one, while Version B jumps around, causing more CPU cache misses and failed prefetching thus ultimately being slower. While teaching Operating Systems and C, I would show this example to my students and let them guess if there was a difference in performance, without telling them about locality (yet!). Most students would guess there was no difference, since the code is identical. In higher-level languages, you are used to thinking in O-notation. Going through a matrix from one end to the other is O(n), regardless of the access pattern. But in reality, the access pattern matters a lot for performance.

I ran the two different versions with a matrix of 80,000 x 80,000 on my MacBook Air, equipped with a M3 chip.

```shell
$ time ./version-a
0
./version-a  5.36s user 1.33s system 97% cpu 6,896 total

$ time ./version-b
0
./version-b  37,67s user 3,44s system 98% cpu 41,599 total
```

Accessing the same data in a different way can have a significant impact on performance.

## The Point

We will not see the old “free‑speed‑every‑two‑years” miracle return. That is simply the natural outcome of physics, economics, and the way we now build chips. Instead of chasing higher and higher clock rates we win by putting the computation where the data lives and by parallelizing as much as possible.

The CPU is still the primary processing unit in a modern computer. It orchestrates threads, schedules I/O, and makes high‑level decisions, but it can no longer be expected to do the heavy number‑crunching. Its strength is low‑latency control and coordination, not raw processing power.

In short, the era of “wait for the next GHz bump” is over. Modern performance comes from architectural awareness and knowing exactly where data lives, how it moves, and which mechanisms are best suited to work on the data.
