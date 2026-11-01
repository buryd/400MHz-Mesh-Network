# Recommended FM radios (AMNC + Mumble EMCOMM)

Analog **FM** radios for the baseline architecture: site mesh (AMNC), EOC ROIP, and field HTs. Prices are approximate US retail and change often.

Confirm AMNC cable/pinout with [ADRCS](https://ip400.adrcs.org/) before locking a model. Prefer **identical** mesh radios at all three sites.

---

## 1. Mesh site radios (EOC + Hospital A + Hospital B)

Need **2 m/70 cm FM**, ~**50 W**, and a **6-pin mini-DIN data port** when possible (better for OFDM-AB than mic/speaker alone).

| Priority | Radio | Notes |
| --- | --- | --- |
| **Best value** | **Yaesu FTM-150R / RASP** | Dual RX, data port 1200/9600, simple analog FM; ~$330 class |
| **Strong all-around** | **Yaesu FTM-500DR / FTM-510DR ASP** | More features/display; external data path for modem use |
| **Solid alt** | **Icom IC-2730A** | Common EMCOMM dual-band; external TNC/data |
| **Budget workhorse** | **Alinco DR-735T** | Dual RX; often 1200-baud class data — OK for narrower OFDM-AB; verify cable notes |

**Qty:** 3 (one per site) + optional 1 spare.

**Buy guidance:** Standardize on one model so AMNC cabling and configs match.

---

## 2. EOC ROIP radio (field HT channel)

Separate radio from the mesh AMNC path. Tactical **2 m or 70 cm** voice into USB URI → AllStar/SVXLink → Murmur.

| Priority | Radio | Notes |
| --- | --- | --- |
| **Good enough** | Same family as mesh (**FTM-150**, **IC-2730**) | Easy spare parts; data/mic → URI |
| **Budget / used** | Older dual-band with packet jack (e.g. FT-7900, TM-V71 class) | Voice ROIP does not need Fusion/D-STAR |

**Qty:** 1 at EOC (plus antenna/feedline or shared tower with isolation).

---

## 3. Field HTs (tactical FM — not mesh)

| Priority | Radio | Notes |
| --- | --- | --- |
| **Primary** | Yaesu **FT-65** / **FT-60**, Kenwood dual-band, or agency-standard HT | Reliable Part 97 handhelds |
| **Volume / training** | Baofeng **UV-5R** / **UV-82** class | Cheap for many field users; voice nets only |

**Qty:** 4–8 typical for drills.

HTs do **not** replace site mesh radios and do **not** run Mumble.

---

## Avoid for AMNC mesh RF

- Using an HT as the fixed-site mesh transmitter (power / duty cycle)
- Digital-voice-only paths (C4FM / D-STAR) as the **mesh** bearer — AMNC expects **analog FM** audio/data
- Mic-only radios with no usable data port if you need wider OFDM-AB modes

---

## Practical purchase set

| Role | Recommendation | Qty |
| --- | --- | ---: |
| Mesh | Yaesu **FTM-150RASP** (or chosen standard) | 3 |
| ROIP | FTM-150 or IC-2730 | 1 |
| Field | Mid dual-band HTs | 6 |
| Support | Matching PSU, antenna, feedline, AMNC cable per mesh site | 3 sets |

See also: [bom-amnc-mumble-emcomm.md](bom-amnc-mumble-emcomm.md), [roip-bridge.md](roip-bridge.md).
