# 70 cm lab mesh — 2× Nucleo + Mumble + MeshChat

Minimal IP400 design to prove offline voice and text before AMNC + high-power FM.

## Architecture diagram

![2 Nucleo Mumble MeshChat architecture](diagrams/ip400-2-nucleo-mumble-meshchat-architecture.jpg)

## Topology

| Site | RF | Host | Services |
| --- | --- | --- | --- |
| **Site A (EOC lab)** | Nucleo CC2 (~+14 dBm, 4FSK) | Pi `10.40.0.10` | **Murmur** + **MeshChat** |
| **Site B (remote lab)** | Nucleo CC2 (~+14 dBm, 4FSK) | Pi `10.40.0.20` | **MeshChat** + **Mumble client** |

```text
Site A:  Operator → Pi (Murmur + MeshChat) → Nucleo → 70 cm antenna
                ↕ IP400 mesh (4FSK)
Site B:  Operator → Pi (MeshChat + Mumble) → Nucleo → 70 cm antenna
```

## Addressing (air-gapped)

| IP | Role |
| --- | --- |
| `10.40.0.0/24` | Lab overlay |
| `10.40.0.10` | Site A — Murmur (`:64738`) + MeshChat |
| `10.40.0.20` | Site B — MeshChat + Mumble client → `10.40.0.10` |

Use matching `/etc/hosts` names (e.g. `mumble.eoc.mesh`, `meshchat.a.mesh`, `meshchat.b.mesh`). No Internet, public DNS, or cloud.

## Stack per site

1. **Nucleo** — IP400 mesh RF / modem (SPI or UART to Pi)  
2. **Pi** — host IP + apps  
3. **Antenna** — 70 cm; outdoor helps, but range stays short at milliwatt TX  

## App settings (lab)

| Service | Setting |
| --- | --- |
| Murmur | `bandwidth=16000` (or lower); Opus; PTT only |
| Mumble clients | Server `10.40.0.10`; one talker at a time |
| MeshChat | Same zone/service name on both Pis |

## Acceptance checks

1. Both callsigns appear in each mesh table  
2. Ping `10.40.0.10` ↔ `10.40.0.20`  
3. Mumble PTT from B heard at A (and reverse)  
4. MeshChat message from each site visible on both  
5. WAN unplugged — all of the above still work  

## Limits

- **Short RF range** (~25 mW class) — room / building / short LOS only  
- Two nodes = link + mesh table; digipeat value needs a third node  
- Not a hospital-distance deploy — use **AMNC + FM** for that (see main BOM)

## Related

- [recommended-fm-radios.md](recommended-fm-radios.md) — later AMNC path  
- [bom-amnc-mumble-emcomm.md](bom-amnc-mumble-emcomm.md) — full three-site program  
- [ip400.adrcs.org](https://ip400.adrcs.org/) — Nucleo / UFP docs  
