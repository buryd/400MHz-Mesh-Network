import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

function TopologyDiagram() {
  const theme = useHostTheme();
  const box = (fill: string) => ({
    fill,
    stroke: theme.stroke.secondary,
    strokeWidth: 1,
  });
  return (
    <svg viewBox="0 0 920 360" width="100%" style={{ maxHeight: 360 }}>
      <rect x={0} y={0} width={920} height={360} fill={theme.bg.editor} />

      <rect x={320} y={20} width={280} height={130} rx={6} {...box(theme.fill.secondary)} />
      <text x={460} y={48} textAnchor="middle" fill={theme.text.primary} fontSize={14} fontWeight={600}>
        EOC — NPR Master
      </text>
      <text x={460} y={72} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        NPR-70 modem + 70 cm amp / antenna
      </text>
      <text x={460} y={92} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Ethernet → Murmur + MeshChat hosts
      </text>
      <text x={460} y={112} textAnchor="middle" fill={theme.accent.primary} fontSize={11}>
        TDMA hub · ~65 kbps usable (US legal)
      </text>
      <text x={460} y={132} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        All hospital IP traffic relays here
      </text>

      <line x1={320} y1={85} x2={200} y2={200} stroke={theme.accent.primary} strokeWidth={2} />
      <line x1={600} y1={85} x2={720} y2={200} stroke={theme.accent.primary} strokeWidth={2} />
      <text x={230} y={150} fill={theme.text.tertiary} fontSize={10}>
        70 cm NPR
      </text>
      <text x={650} y={150} fill={theme.text.tertiary} fontSize={10}>
        70 cm NPR
      </text>

      <rect x={40} y={200} width={280} height={120} rx={6} {...box(theme.fill.tertiary)} />
      <text x={180} y={232} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Hospital A — NPR Client
      </text>
      <text x={180} y={256} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Modem + Ethernet LAN
      </text>
      <text x={180} y={276} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Mumble clients · MeshChat Pi
      </text>
      <text x={180} y={300} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        No direct RF to Hospital B
      </text>

      <rect x={600} y={200} width={280} height={120} rx={6} {...box(theme.fill.tertiary)} />
      <text x={740} y={232} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Hospital B — NPR Client
      </text>
      <text x={740} y={256} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Modem + Ethernet LAN
      </text>
      <text x={740} y={276} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Mumble clients · MeshChat Pi
      </text>
      <text x={740} y={300} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        Relayed via EOC master
      </text>
    </svg>
  );
}

export default function Emcomm70cmNprIp() {
  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1 style={{ margin: 0 }}>70 cm IP Fabric (AREDN replacement)</H1>
          <Pill tone="info">NPR-70 star</Pill>
          <Pill>Mumble + MeshChat</Pill>
          <Pill tone="success">Air-gapped</Pill>
        </Row>
        <Text tone="secondary">
          Offline EMCOMM IP network on the 70 centimeter amateur band for an
          EOC and two hospitals — no AREDN and no Internet dependency.
          Transport is New Packet Radio (NPR) style IP over 420–450 MHz;
          applications are Murmur (Mumble) and MeshChat.
        </Text>
      </Stack>

      <Callout tone="danger" title="Hard requirement: zero Internet reliance">
        The system must operate with WAN/cellular/Internet disconnected. Naming,
        time, voice, and chat are local only. Do not use public DNS, cloud
        licensing, remote package repos, or phone-home services during EMCOMM
        operations. Pre-stage OS images, packages, and configs before deployment.
      </Callout>

      <Callout tone="warning" title="This is a star, not an OLSR mesh">
        NPR is point-to-multipoint with one Master coordinating TDMA clients.
        Hospital A cannot RF-route directly to Hospital B; the EOC Master
        relays IP. That matches EOC-centric EMCOMM better than forcing a
        false “full mesh” label onto 70 cm hardware that does not implement
        AREDN/OLSR.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="70 cm" label="IP transport band" />
        <Stat value="~65 kbps" label="US-legal usable (NPR mod 20)" />
        <Stat value="0" label="Internet links allowed" />
        <Stat value="2 Clients" label="Hospital NPR endpoints" />
      </Grid>

      <Stack gap={10}>
        <H2>Air-gap / offline dependency policy</H2>
        <Table
          headers={["Dependency", "Internet way (forbidden in ops)", "Offline substitute"]}
          rowTone={["danger", "danger", "success", "success", "success", "warning"]}
          rows={[
            [
              "IP transport",
              "ISP / cellular backhaul",
              "70 cm NPR Master↔Clients only",
            ],
            [
              "Name resolution",
              "Public DNS (8.8.8.8, 9.9.9.9, ISP)",
              "Hosts files or local DNS on EOC LAN; DNS_active no on NPR",
            ],
            [
              "Voice",
              "Discord / Zoom / hosted Mumble",
              "Local Murmur at 10.70.0.10",
            ],
            [
              "Messaging",
              "Slack / SMS / cloud chat",
              "MeshChat replicas syncing over NPR IP",
            ],
            [
              "Time / certs",
              "NTP pool, ACME, OCSP",
              "Set clock from EOC reference; password auth; no cloud TLS dependency",
            ],
            [
              "Updates / images",
              "apt/yum during an incident",
              "Pre-baked SD cards/images and offline package cache only",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>Why NPR on 70 cm</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>What it replaces</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>
                  AREDN’s job was IP between fixed sites for apps. On 70 cm,
                  NPR-70 (F4HDK / commercial clones) gives Ethernet-presented
                  IPv4 over radio without Wi‑Fi microwave gear.
                </Text>
                <Text tone="secondary">
                  Modems speak Ethernet locally; PCs and Pis need no special
                  TNC software — route/IP as usual, just slowly.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>US Part 97 constraint (today)</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>
                  HF baud limits were reformed in 2024; <Text weight="semibold">70 cm baud /
                  100 kHz bandwidth limits remain</Text> until the VHF/UHF FNPRM
                  is adopted. Vendors therefore recommend NPR “modulation 20”
                  in the US: ~100 kbps raw / ~65 kbps usable in 100 kHz.
                </Text>
                <Text tone="secondary">
                  Design apps for that ceiling. Wider/faster NPR modes are not
                  the baseline plan for a US-legal day-one deploy.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Network topology</H2>
        <Card>
          <CardHeader>EOC hub · dual hospital clients</CardHeader>
          <CardBody style={{ padding: 12 }}>
            <TopologyDiagram />
          </CardBody>
        </Card>
      </Stack>

      <Stack gap={10}>
        <H2>Application fit on ~65 kbps shared</H2>
        <Table
          headers={["Service", "Fit", "Configuration rules"]}
          rowTone={["success", "warning"]}
          rows={[
            [
              "MeshChat",
              "Excellent",
              "Run Pi instances at EOC + both hospitals; same zone/service name; text/file sync is bursty and small. Primary store-and-forward ops channel.",
            ],
            [
              "Mumble (Murmur)",
              "Usable if capped",
              "One Murmur at EOC. Opus ~8–16 kbps/talker, low quality preset, disable positional audio, limit to 1 active talker (PTT discipline). Treat as command net, not open party line.",
            ],
          ]}
          striped
        />
        <Callout tone="info" title="Capacity math">
          One Mumble talker at 16 kbps plus TCP overhead leaves headroom for
          MeshChat sync and control traffic. Two simultaneous high-quality
          talkers will congest a US-legal NPR channel — enforce net control and
          codec caps in Murmur.
        </Callout>
      </Stack>

      <Stack gap={10}>
        <H2>Site roles & BOM</H2>
        <Table
          headers={["Site", "RF role", "Hosts", "Notes"]}
          rows={[
            [
              "EOC",
              "NPR Master; high 70 cm antenna; optional amp (legal ERP)",
              "Murmur primary; MeshChat; small router/switch; UPS",
              "Static IPs for services; advertise names via local hosts/DNS on the NPR LAN",
            ],
            [
              "Hospital A",
              "NPR Client; rooftop or window 70 cm antenna aimed/clear toward EOC",
              "MeshChat replica; ops laptop/PC with Mumble client",
              "Ethernet only to NPR modem — keep clinical networks air-gapped",
            ],
            [
              "Hospital B",
              "NPR Client (same as A)",
              "Same as A",
              "Traffic to A is IP-routed through EOC Master (by design)",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>Logical IP layout</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Addressing sketch</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Use NPR’s modem-assigned client subnet (per vendor guide).</Text>
                <Text tone="secondary">EOC LAN: Murmur, MeshChat, optional jump host</Text>
                <Text tone="secondary">Hospital LAN: MeshChat Pi + operator PCs only</Text>
                <Text tone="secondary">No default route to the Internet on any host</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Service endpoints</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>mumble.eoc.mesh → Murmur :64738/UDP</Text>
                <Text>meshchat.eoc.mesh → HTTP MeshChat</Text>
                <Text>meshchat.ha.mesh / meshchat.hb.mesh → local replicas</Text>
                <Text tone="secondary">Replicas poll peers over NPR IP when RF is up</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>RF engineering checklist</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Frequency & band plan</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Coordinate a 100 kHz digital channel in 420–450 MHz per local band plan / coordinator.</Text>
                <Text>Avoid weak-signal, satellite, and ATV segments.</Text>
                <Text>Identify with callsign beacons as required by NPR/modem and Part 97.</Text>
                <Text tone="secondary">Single shared frequency for Master + both clients (TDMA).</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Path & hardware</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>70 cm favors clearer paths than 2 m for data; still do a path study EOC↔each hospital.</Text>
                <Text>Verticals for omni hub coverage, or Yagis at hospitals aimed at EOC.</Text>
                <Text>NPR client count is limited (on the order of ~7) — three sites is comfortable.</Text>
                <Text tone="secondary">External PA only if clean, legal, and does not splat adjacent users.</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Mumble operating profile (required)</H2>
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader>Server</CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Text>Single Murmur at EOC</Text>
                <Text>Bandwidth / quality caps low</Text>
                <Text>One channel: “Command”</Text>
                <Text>Optional listen-only “Observing”</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Clients</CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Text>Push-to-talk only</Text>
                <Text>Opus, lowest usable quality</Text>
                <Text>No video / no overlays</Text>
                <Text>Disable image/file spam</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Net control</CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Text>EOC directs who talks</Text>
                <Text>Long traffic → MeshChat</Text>
                <Text>Status boards → MeshChat files</Text>
                <Text>Voice for urgency only</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>MeshChat operating profile</H2>
        <Card>
          <CardBody>
            <Stack gap={8}>
              <Text>
                MeshChat is the workhorse on a narrow 70 cm pipe: ICS traffic,
                hospital status, resource requests, and small file drops. Because
                each site keeps a full message DB, a hospital that drops offline
                resyncs when NPR reconnects — ideal for EMCOMM fade and
                portable power cycles.
              </Text>
              <Text tone="secondary">
                Use one zone name for the jurisdiction (e.g. CountyEOCMeshChat).
                Prefer LAN-attached Pis over running chat on the modem host.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Stack gap={10}>
        <H2>Optional: field voice without AREDN</H2>
        <Text tone="secondary">
          Keep 2 m FM + a local ROIP box on the EOC Ethernet LAN if handhelds
          still matter. That path is independent of NPR; do not try to trunk
          wide-open ROIP audio across the 65 kbps NPR channel alongside Mumble.
        </Text>
      </Stack>

      <Stack gap={10}>
        <H2>Build sequence</H2>
        <Card variant="borderless">
          <CardBody>
            <Stack gap={10}>
              <Row gap={10} align="start">
                <Pill tone="info">1</Pill>
                <Stack gap={2}>
                  <H3 style={{ margin: 0 }}>Lab bench</H3>
                  <Text tone="secondary">
                    Three NPR units indoors: Master + 2 clients, Ethernet to three
                    Pis. Prove MeshChat sync and a capped Mumble call before any
                    rooftop work.
                  </Text>
                </Stack>
              </Row>
              <Divider />
              <Row gap={10} align="start">
                <Pill tone="info">2</Pill>
                <Stack gap={2}>
                  <H3 style={{ margin: 0 }}>RF paths</H3>
                  <Text tone="secondary">
                    Coordinate frequency; install EOC master antenna; temporary
                    hospital antennas; measure NPR link status and ping/jitter
                    to Murmur.
                  </Text>
                </Stack>
              </Row>
              <Divider />
              <Row gap={10} align="start">
                <Pill tone="info">3</Pill>
                <Stack gap={2}>
                  <H3 style={{ margin: 0 }}>Service lock-down</H3>
                  <Text tone="secondary">
                    Freeze Murmur bitrate; publish SOPs (PTT, MeshChat for long
                    traffic); disconnect any Internet NICs; black-sky drill.
                  </Text>
                </Stack>
              </Row>
              <Divider />
              <Row gap={10} align="start">
                <Pill tone="info">4</Pill>
                <Stack gap={2}>
                  <H3 style={{ margin: 0 }}> Harden</H3>
                  <Text tone="secondary">
                    UPS/generator, spare modem, documented IP map, MoUs, and a
                    fallback: if NPR dies, MeshChat local copies + 2 m voice
                    still have value.
                  </Text>
                </Stack>
              </Row>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Stack gap={10}>
        <H2>What this is / is not</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill tone="success">Is</Pill>}>Realistic 70 cm AREDN stand-in</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Offline IPv4 between EOC and two hospitals</Text>
                <Text>MeshChat as resilient messaging</Text>
                <Text>Disciplined Mumble command voice</Text>
                <Text>Part 97–oriented, Ethernet-simple endpoints</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="warning">Is not</Pill>}>Microwave AREDN clone</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Not multi-Mbps or many concurrent VoIP streams</Text>
                <Text>Not OLSR multi-hop mesh routing</Text>
                <Text>Not a hospital clinical network</Text>
                <Text>Not unconstrained high-rate NPR until UHF rules change</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Callout tone="success" title="Design verdict">
        Replace AREDN with an NPR-70 (or equivalent) 70 cm IP star: EOC Master,
        hospital Clients, Murmur and MeshChat on Ethernet behind the modems.
        Size voice for one careful Mumble talker; put bulk EMCOMM traffic on
        MeshChat. That is the workable offline substitute on 70 cm under
        current US rules.
      </Callout>

      <Text tone="tertiary" style={{ fontSize: 12 }}>
        References: NPR protocol / NPR-70 user guidance; FCC WT Docket 16-239
        R&O (HF) and FNPRM (VHF/UHF baud proposal); MeshChat distributed sync
        model; Mumble/Murmur bandwidth controls. Verify local band plan and
        Part 97 before transmitting.
      </Text>
    </Stack>
  );
}
