# BOM — AMNC + FM + Mumble EMCOMM mesh

Priced bill of materials for the baseline architecture: **EOC + Hospital A + Hospital B**, air-gapped **70 cm IP400 (AMNC + FM)**, **Murmur/Mumble**, **MeshChat**, and **EOC ROIP** for field HTs.

**Currency:** USD  
**Price basis:** US retail / dealer list, approx. **Nov 2026**  
**AMNC:** no public ADRCS price yet — shown as **TBA** with a **planning placeholder** only  

Replace example radios/antennas with coordinated local gear; verify Part 97 mode/bandwidth before purchase.

---

## Scope (what this buys)

| Site | Mesh RF | Host apps | Extra |
| --- | --- | --- | --- |
| **EOC** | AMNC + FM mesh radio + antenna | Pi: Murmur + MeshChat | Second FM path: ROIP → Mumble |
| **Hospital A** | AMNC + FM mesh radio + antenna | Pi: MeshChat + Mumble client | Ops headset / laptop optional |
| **Hospital B** | Same as A | Same as A | Same as A |
| **Field** | — | — | FM HTs on **tactical** channel (not mesh RF) |

```text
Per fixed site:  Antenna → FM transceiver → AMNC → Pi (apps)
EOC only:        Field HT → FM base → USB URI → ROIP Pi → Murmur
```

---

## 1. Mesh RF plant (all three sites)

| Qty | Item | Example / notes | Unit (USD) | Ext (USD) |
| --- | ---: | --- | ---: | ---: |
| 3 | **IP400 AMNC** | ADRCS; Pi HAT or USB; OFDM-AB into FM | **TBA*** | **TBA*** |
| 3 | 70 cm-capable FM mobile (data/mic or packet port preferred) | Mid dual-band mobile class (e.g. Yaesu FTM-150 / FTM-500 class) | 350–550 | 1,050–1,650 |
| 3 | 13.8 V radio PSU (~20–30 A) | Astron / Samlex / MFJ class | 110–180 | 330–540 |
| 3 | Base antenna 2 m/70 cm | Diamond X50A / Comet GP-3 class | 80–130 | 240–390 |
| 3 | Mast / wall mount / grounding kit | Site-dependent | 40–120 | 120–360 |
| 3 | Feedline + connectors | ~50–100 ft LMR-400-class + PL-259/N | 80–180 | 240–540 |
| 3 | AMNC↔radio audio/data cable | Per ADRCS pinout; build or custom | 15–40 | 45–120 |
| | **Subtotal mesh RF (ex-AMNC)** | | | **~2,025–3,600** |
| | **AMNC (3 boards)** | *Planning placeholder $150–400 ea until list price* | 150–400* | **450–1,200*** |

\*Placeholder only — confirm with [ADRCS / ip400.adrcs.org](https://ip400.adrcs.org/) when distribution is announced.

---

## 2. Host Pis & IP apps (all three sites)

| Qty | Item | Example / notes | Unit (USD) | Ext (USD) |
| --- | ---: | --- | ---: | ---: |
| 3 | Raspberry Pi 5 (4 GB) or Pi 4 (4 GB) | EOC can use 8 GB if preferred | 55–80 | 165–240 |
| 3 | Official / quality PSU for Pi | Pi 5: 27 W USB-C | 12–20 | 36–60 |
| 3 | Case + cooler | Active cooler recommended for Pi 5 | 15–25 | 45–75 |
| 3 | microSD 32–64 GB A2 / industrial | Offline OS image | 10–25 | 30–75 |
| 1 | Tiny unmanaged GbE switch (EOC) | Murmur Pi + ROIP Pi + ops laptop | 20–35 | 20–35 |
| 3 | USB headset w/ boom mic (PTT-capable preferred) | Mumble ops | 25–60 | 75–180 |
| 0–3 | Ops laptop (optional) | Mumble/MeshChat UI; can use Pi desktop | 0–600 | 0–1,800 |
| | **Subtotal hosts (no laptops)** | | | **~370–665** |

**Software (no license cost for baseline):**

| Resource | Role | Source |
| --- | --- | --- |
| Raspberry Pi OS / Debian | Host OS (pre-stage offline) | raspberrypi.com |
| IP400 UFP + ADRCS Pi image | Mesh host stack | [ip400.adrcs.org](https://ip400.adrcs.org/) · [github.com/adrcs/ip400](https://github.com/adrcs/ip400) |
| `mumble-server` (Murmur) | Voice server @ `10.40.0.10` | mumble.info / distro packages |
| Mumble client | Operators | mumble.info |
| MeshChat | Distributed text | Community MeshChat builds (pre-stage) |
| `/etc/hosts` map | Offline names (`mumble.eoc.mesh`, etc.) | Project deploy kit |

---

## 3. EOC ROIP (field HT → Mumble)

Dedicated **second** RF path — not the AMNC mesh frequency.

| Qty | Item | Example / notes | Unit (USD) | Ext (USD) |
| --- | ---: | --- | ---: | ---: |
| 1 | FM base/mobile (tactical channel) | Can be simpler dual-band mobile | 250–450 | 250–450 |
| 1 | Antenna + feedline (or share tower with diplexer — prefer separate) | Stub/base for 2 m or 70 cm tactical | 60–150 | 60–150 |
| 1 | USB radio interface | CM108/CM119 URI, DINAH, RA-Board class | 40–120 | 40–120 |
| 1 | ROIP host Pi (4 GB) + PSU/case/SD | Can share EOC mesh Pi only if CPU/USB OK; prefer separate | 80–120 | 80–120 |
| 1 | 13.8 V feed for ROIP radio | May share EOC radio PSU if amps allow | 0–150 | 0–150 |
| 4–8 | Field FM HTs | UV-5R class → commercial dual-band | 30–150 | 120–1,200 |
| | **Subtotal ROIP + field HTs (mid)** | | | **~550–2,190** |

**ROIP software:**

| Resource | Role | Source |
| --- | --- | --- |
| AllStarLink (Asterisk + `app_rpt`) | Recommended ROIP engine | allstarlink.org |
| or SVXLink | Alternate ROIP engine | svxlink.org |
| AllStar ↔ Mumble bridge | Audio into Murmur `Field-ROIP` | Community `asl-mumble` / equivalent |
| Project notes | Air-gap rules, acceptance tests | [docs/roip-bridge.md](roip-bridge.md) |

---

## 4. Power resilience & spares

| Qty | Item | Example / notes | Unit (USD) | Ext (USD) |
| --- | ---: | --- | ---: | ---: |
| 3 | Site UPS or 12 V battery + charger (radio + Pi) | Small UPS **or** Mean Well DRC-class + SLA/LiFePO₄ | 150–400 | 450–1,200 |
| 1 | Spare AMNC | Cold spare | TBA* | TBA* |
| 1 | Spare pre-imaged Pi + SD | EOC image clone | 80–120 | 80–120 |
| 1 | Spare mesh FM mobile | Optional | 350–550 | 350–550 |
| 1 | Connector/crimp kit, ferrites, jumpers | Install consumables | 50–100 | 50–100 |
| | **Subtotal power + spares (ex-AMNC spare)** | | | **~930–1,970** |

---

## 5. Roll-up estimate (USD)

| Block | Low | Mid | High |
| --- | ---: | ---: | ---: |
| Mesh RF (radios/antennas/PSU/feed) | 2,025 | 2,800 | 3,600 |
| AMNC ×3 (placeholder) | 450* | 750* | 1,200* |
| Host Pis + headsets (no ops laptops) | 370 | 520 | 665 |
| ROIP + 6 field HTs (mid HT mix) | 700 | 1,200 | 2,190 |
| UPS/battery + spares (ex spare AMNC) | 930 | 1,400 | 1,970 |
| **Program total (with AMNC placeholder)** | **~4,500*** | **~6,700*** | **~9,600*** |
| **Same without AMNC $ (buy when priced)** | **~4,050** | **~5,950** | **~8,400** |

Optional ops laptops (3×): add **$0–1,800**.

### Interim lab (Nucleo) — not for hospital distance

| Qty | Item | Notes | Ext (USD) |
| --- | ---: | --- | ---: |
| 2–3 | Nucleo CC2 / supported IP400 dev board | ~+14 dBm; short range | Check distributor |
| 2–3 | Pi + SD + PSU | Prove Murmur/MeshChat | ~250–400 |
| | Use only to validate apps before AMNC ship | | |

---

## 6. Procurement resources

| Need | Where |
| --- | --- |
| AMNC availability / price | [ip400.adrcs.org](https://ip400.adrcs.org/) · [adrcs.org IP400](https://adrcs.org/adrcs/ip400-network-project/) · info@adrcs.org |
| IP400 firmware / docs | [github.com/adrcs/ip400](https://github.com/adrcs/ip400) |
| Architecture / IPs / Murmur caps | [docs/canvases/emcomm-ip400-deploy-kit.canvas.tsx](canvases/emcomm-ip400-deploy-kit.canvas.tsx) |
| ROIP build | [docs/roip-bridge.md](roip-bridge.md) |
| Diagrams | [docs/diagrams/](diagrams/) |
| Mumble | https://www.mumble.info/ |
| AllStarLink | https://www.allstarlink.org/ |
| Ham dealers (radios/antennas/PSU) | DX Engineering, Gigaparts, Ham Radio Outlet, etc. |
| Pi hardware | raspberrypi.com · major electronics distributors |

---

## 7. Buy order (recommended)

1. **Lab:** Nucleo/dev boards + 2–3 Pis — prove mesh table, Murmur, MeshChat offline  
2. **Site RF:** antennas, feedline, mounts, PSUs (long-lead install)  
3. **FM mobiles** for mesh (prefer data-port capable)  
4. **AMNC** when ADRCS announces price/distribution — then cable to radios  
5. **ROIP** path + field HTs  
6. **UPS/battery** and cold spares  
7. Black-sky acceptance per deploy kit  

---

## 8. Assumptions & exclusions

**Included intent:** three fixed sites, Mumble primary voice, MeshChat text, EOC ROIP for HTs, air-gapped overlay `10.40.0.0/24`.

**Excluded / not priced here:** tower climber labor, roof permits, hospital MoUs, licensed tower work, commercial repeater site fees, SIP phones/FreePBX (optional alternate), NPR hardware, Internet/cloud services, PHI-capable clinical integration (must stay off this mesh).

**License:** operators need valid amateur licenses for RF transmit under Part 97 (or local rules).
