---
layout: layouts/post.njk
title: "When CPUs Stopped Scaling: Why Hardware Got Complicated"
date: 2025-09-07
keywords:
  - hardware
  - cpu
  - scaling
  - technology
  - dennard-scaling
  - computational storage
  - graphics cards
  - gpus
  - multi-core processors
  - delilah
imageAlt: "A motherboard with three RAM sticks."
image: /assets/images/blog/when-cpus-stopped-scaling.jpg
permalink: "/blog/when-cpus-stopped-scaling/"
---

When I was young, computers only had a single core. Some did not come with a dedicated graphics card, relying instead on integrated graphics. By the 2000s, computers had already been around for quite some time, and a few interesting trends had emerged. Moore's Law predicted that the number of transistors on a chip would double approximately every two years, leading to exponential increases in performance. Dennard Scaling observed that as transistors became smaller, they consumed less power, allowing for higher clock speeds and more powerful CPUs.

These trends meant that computers became faster and faster without significant changes to their architecture or how they worked. Manufacturers could cram more and more transistors into a single-core processor, keeping pace with the development of advanced and complex software.

## When the Magic Stopped

In the mid-2000s, the physical limitations of processors began to show. We kept shrinking transistors, but voltage refused to drop enough. This led to two problems. First, making transistors smaller generated more heat in a smaller space, causing overheating. Second, electricity started leaking, as it could jump across smaller gaps more easily. Had the voltage continued to drop, the heating would have been manageable and electrical leakage minimised.

However, as this was not possible, processor speeds stalled around 3–5 GHz and desktop power hovered near 100 W. We could still gain more transistors, just not in a single core. Meanwhile, software developed and introduced HD video, large games, real-time data, early machine learning. The old habit of “waiting for a faster CPU” stopped working.

_Hardware got complicated._

## Multi-Core Helped, But Not Everywhere

The obvious quick fix was more cores. Even though we could not put more transistors into a single core, we could add more cores to the chip. This enabled computers to start multitasking. Previously, a computer only did one thing at a time, but could switch between tasks very quickly. So, while it may have looked like it was doing many things at once, it was really just switching between tasks.

With multi-core processors, the computer could now do multiple things simultaneously. But this also meant that software had to know how to divide its work effectively across all the cores. For example, a video editing application could use one core to decode video, another to apply effects, and a third to encode the final output. In other cases, it was harder to split the work.

## Enter the Specialists

Since software must be able to divide tasks, there is a limit to how much work can be parallelised. Not all tasks can be broken down into smaller pieces that run simultaneously. Some tasks are inherently sequential, meaning they must be completed one after the other.

So we changed tactics. Graphics Processing Units (GPUs) emerged as a powerful tool for handling specific types of workloads. GPUs handle large amounts of identical maths. Although called Graphics Processing Units, their capabilities extend far beyond just graphics. What they really excel at is processing large blocks of data in parallel. So, if you do the same thing repeatedly, like decoding video or applying filters, a GPU can do it much faster than a CPU, because it can do it multiple times at once.

The CPU did not retire; it became the coordinator. But since GPUs are good at working on large blocks of data, this did not resolve the issue of moving data between different parts of the system. GPUs require data to be read from storage by the CPU, placed into memory, and then processed by the GPU.

This required us to rethink computer architecture once again.

## What “Computational Storage” Means

We quickly learnt that moving data takes a lot of time. Colin Scott made a website called [Latency Numbers Every Programmer Should Know](https://colin-scott.github.io/personal_website/research/interactive_latency.html), which shows the staggering differences in latency between various types of memory accesses.

Accessing a byte in the CPU was, in 2020, on the order of a few nanoseconds. Accessing the same byte in main memory takes around a hundred nanoseconds. Reading that same byte from an SSD takes 16,000 nanoseconds. This taught us a valuable lesson: the cost of moving data is often much higher than the cost of processing it. The cheapest byte is the one you never move.

Computational Storage emerged as a solution to this problem. Computational storage runs tiny, safe functions inside or right next to the SSD to do boring but high-value work early: filter, compress, parse, summarise. Instead of pulling a million records to the CPU to keep a few thousand, the drive gives you the few thousand to begin with.

The example I usually give to friends, family, and colleagues is a simple one: imagine an Excel spreadsheet that contains a million rows of data. You probably have some filters applied to show only the relevant rows. But what actually happens is that you are asking the system to fetch a million rows, and then throw away 999,000 of them. Why?

Computational Storage allows the system to do the filtering right at the storage level, so only the relevant rows are sent to the CPU in the first place. In essence, the spreadsheet asks the SSD to only return the rows that match the filter criteria.

The problem with Computational Storage is standardisation. Different SSDs have different capabilities, and there is no universal way to express the kinds of computations you might want to run. This fragmentation makes it hard for developers to take advantage of these features without getting locked into a specific vendor’s ecosystem.

This is where my research comes in.

## How My Work Fits (No PhD required)

In my research, we built Delilah, a storage device that can run small sandboxed functions. These functions can filter, compress, and transform data right at the storage level, reducing the amount of data that needs to be moved to the CPU. The interesting thing about my work was the use of eBPF as the language for these functions.

eBPF was initially built for network packet filtering and has since evolved into a powerful tool for a variety of use cases, including security and monitoring. The interesting aspect of eBPF is that it is simple and verifiable, so the computer can ensure that the functions are safe and will not cause any harm.

When plain eBPF is not fast enough, Delilah jumps to device “registered functions”, which are hardware-specific or accelerated functions. These functions do not have the limitations of eBPF, as they are written in C by the vendor.

Open-Channel SSDs were a type of SSD that I worked on before my PhD. They let you take over the drive’s “brain” (the FTL, which decides where data goes on flash). That level of control only pays off if you are willing to design your software with the data layout in mind. In essence, the SSD becomes a 2D map of data, and you need to decide where to place the data. If you cannot do that, stick to the standard path: NVMe drives, and when you want more predictable writes, Zoned Namespaces (ZNS). They are simpler, stable, and fast enough for most teams.

The bigger lesson from my thesis is more practical: you do not win by cramming more raw compute into the drive. You win by reducing data movement through good interfaces (a clean way to request work) and state on the device (so it can cache/remember and avoid re-reading). Push computation down to storage only when it reliably shrinks the data you would otherwise move.

## ARM’s Role

While GPUs and Computational Storage were helpful in speeding up computers, a side plot emerged: efficiency. Now that complex work was being done elsewhere, the CPU could focus on coordination and management tasks, optimising its workload and power consumption. The ARM architecture, with its emphasis on power efficiency and performance, became a key player in this new landscape.

## What Developers Should Actually Do In 2025

Most developers will not have the time or resources to build an entirely new storage stack. Instead, they should focus on optimising their existing systems, with an understanding of the limitations and capabilities of their hardware.

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

While both implementations produce the same result, the first one is much more efficient because it accesses memory in a cache-friendly way. Computer memory is not two-dimensional, so the access patterns matter: Version A simplifies to `i * cols + j`, while Version B simplifies to `j * rows + i`.

If you do the maths, assuming 4x4 matrices:

| Iteration | cols | Version A                      | Version B                       |
| --------- | ---- | ------------------------------ | ------------------------------- |
| 0         | 4    | i \* cols + j = 0 \* 0 + 0 = 0 | j \* cols + i = 0 \* 4 + 0 = 0  |
| 1         | 4    | i \* cols + j = 0 \* 0 + 1 = 1 | j \* cols + i = 1 \* 4 + 0 = 4  |
| 2         | 4    | i \* cols + j = 0 \* 0 + 2 = 2 | j \* cols + i = 2 \* 4 + 0 = 8  |
| 3         | 4    | i \* cols + j = 0 \* 0 + 3 = 3 | j \* cols + i = 3 \* 4 + 0 = 12 |
| 4         | 4    | i \* cols + j = 1 \* 0 + 0 = 4 | j \* cols + i = 0 \* 4 + 1 = 1  |
| 5         | 4    | i \* cols + j = 1 \* 0 + 1 = 5 | j \* cols + i = 1 \* 4 + 1 = 5  |
| 6         | 4    | i \* cols + j = 1 \* 0 + 2 = 6 | j \* cols + i = 2 \* 4 + 1 = 9  |
| 7         | 4    | i \* cols + j = 1 \* 0 + 3 = 7 | j \* cols + i = 3 \* 4 + 1 = 13 |

See the pattern? Version A reads the values one by one, while Version B jumps around, causing more cache misses and ultimately being slower. While teaching Operating Systems and C, I would show this example to my students and let them guess if there was a difference in performance. Most people would guess there was no difference, since the code is identical. In higher-level languages, you are used to thinking in O-notation. Going through a matrix from one end to the other is O(n), regardless of the access pattern. But in reality, the access pattern matters a lot for performance.

I tried running the two different versions with a matrix of 80,000 x 80,000.

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

We are not getting back the old “free speed every two years” world. That is fine, and it is how technology progresses. Modern systems win by placing work next to the data and staying within a hard power budget. The CPU runs the show. GPUs and AI parts do the heavy maths. DPUs keep the data plane honest. Computational storage trims the fat at the source. Build with those roles in mind and you will ship faster software that costs less to run, without waiting for a clock speed bump that is not coming.
