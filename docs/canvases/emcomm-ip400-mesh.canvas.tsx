import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

function Ip400Diagram() {
  const theme = useHostTheme();
  const box = (fill: string) => ({
    fill,
    stroke: theme.stroke.secondary,
    strokeWidth: 1,
  });
  return (
    <svg viewBox="0 0 920 340" width="100%" style={{ maxHeight: 340 }}>
      <rect x={0} y={0} width={920} height={340} fill={theme.bg.editor} />

      <rect x={320} y={20} width={280} height={110} rx={6} {...box(theme.fill.secondary)} />
      <text x={460} y={48} textAnchor="middle" fill={theme.text.primary} fontSize={14} fontWeight={600}>
        EOC — IP400 node
      </text>
      <text x={460} y={72} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Host Pi: Murmur + MeshChat
      </text>
      <text x={460} y={94} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Mesh table / beacon / digipeat
      </text>
      <text x={460} y={114} textAnchor="middle" fill={theme.accent.primary} fontSize={11}>
        70 cm · offline IP fabric
      </text>

      <line x1={320} y1={75} x2={170} y2={180} stroke={theme.accent.primary} strokeWidth={2} />
      <line x1={600} y1={75} x2={750} y2={180} stroke={theme.accent.primary} strokeWidth={2} />
      <line x1={460} y1={130} x2={460} y2={170} stroke={theme.stroke.primary} strokeWidth={2} />
      <line
        x1={170}
        y1={230}
        x2={750}
        y2={230}
        stroke={theme.stroke.primary}
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />
      <text x={460} y={248} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        Optional multi-hop / digipeat path (true mesh table)
      </text>

      <rect x={40} y={170} width={260} height={100} rx={6} {...box(theme.fill.tertiary)} />
      <text x={170} y={200} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Hospital A — IP400
      </text>
      <text x={170} y={224} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Pi: MeshChat replica · Mumble client
      </text>
      <text x={170} y={248} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        Air-gapped from clinical LAN
      </text>

      <rect x={330} y={270} width={260} height={50} rx={6} {...box(theme.fill.tertiary)} />
      <text x={460} y={300} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Field: HT voice on FM · IP kits = portable IP400
      </text>

      <rect x={620} y={170} width={260} height={100} rx={6} {...box(theme.fill.tertiary)} />
      <text x={750} y={200} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Hospital B — IP400
      </text>
      <text x={750} y={224} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Pi: MeshChat replica · Mumble client
      </text>
      <text x={750} y={248} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        Air-gapped from clinical LAN
      </text>
    </svg>
  );
}

export default function EmcommIp400Mesh() {
  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1 style={{ margin: 0 }}>IP400 node EMCOMM design</H1>
          <Pill tone="info">70 cm mesh</Pill>
          <Pill>Mumble + MeshChat</Pill>
          <Pill tone="info">ROIP ↔ HTs</Pill>
          <Pill tone="success">No Internet</Pill>
        </Row>
        <Text tone="secondary">
          IP400 (ADRCS) is a purpose-built amateur 400 MHz / 70 cm ad-hoc mesh
          with IP-capable host interfaces — a stronger fit than NPR star or
          plain FM when you need offline Mumble and MeshChat between an EOC and
          two hospitals. Field handhelds join Mumble through a local EOC ROIP
          bridge (not over IP400 RF).
        </Text>
      </Stack>

      <Callout tone="success" title="Why IP400 fits this project">
        It targets the underused 70 cm band, builds a real mesh table (not only
        Master/Client), carries IP frames to a host (Pi), includes onboard chat /
        ping / digipeat, and is explicitly positioned as an AREDN-class
        alternative at UHF. Your “400 MHz Mesh Network” workspace name matches
        this stack.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="Mesh" label="Routing model" />
        <Stat value="~100+ kbps" label="Entry 4FSK class rates" />
        <Stat value="Host Pi" label="Murmur / MeshChat" />
        <Stat value="0" label="Internet required" />
      </Grid>

      <Stack gap={10}>
        <H2>Proposed layout</H2>
        <Card>
          <CardBody style={{ padding: 12 }}>
            <Ip400Diagram />
          </CardBody>
        </Card>
      </Stack>

      <Stack gap={10}>
        <H2>How the pieces map</H2>
        <Table
          headers={["Need", "IP400 approach", "Notes"]}
          rows={[
            [
              "Site-to-site IP (no Internet)",
              "IP400 nodes at EOC + Hospital A + Hospital B",
              "Beacon + mesh table; digipeat if a hop is needed",
            ],
            [
              "Mumble",
              "Murmur on EOC Pi attached to the IP400 host interface",
              "Better headroom than US-legal NPR ~65 kbps if your on-air mode allows it",
            ],
            [
              "MeshChat",
              "Pi replicas at each site over IP400 IP path",
              "Same zone/service name; sync without Internet",
            ],
            [
              "Built-in text",
              "IP400 firmware chat mode",
              "Useful backup if MeshChat host is down",
            ],
            [
              "Field HTs → Mumble",
              "EOC ROIP gateway (AllStar / SVXLink + FM base) bridged into Murmur",
              "HTs stay analog FM. ROIP sits on EOC LAN next to 10.40.0.10 — do not trunk open ROIP audio across the mesh RF path.",
            ],
            [
              "Field HTs (ops)",
              "2 m or 70 cm tactical FM channel into EOC base",
              "Hospital Mumble users hear/speak to field via the Murmur bridge channel",
            ],
            [
              "Optional radio reuse",
              "AMNC + OFDM-AB into a conventional FM radio data/mic path",
              "Mesh radio is separate from the ROIP FM base when possible (two radios at EOC)",
            ],
          ]}
          striped
        />
        <Callout tone="info" title="ROIP path (air-gapped)">
          Field HT → FM RF → EOC base → ROIP (AllStar/SVXLink) → audio bridge →
          Murmur on 10.40.0.10 → IP400 mesh → Hospital Mumble clients. Keep the
          ROIP FM channel distinct from the AMNC OFDM-AB mesh channel.
        </Callout>
      </Stack>

      <Stack gap={10}>
        <H2>IP400 vs the other options you asked about</H2>
        <Table
          headers={["Option", "IP for Mumble/MeshChat?", "Topology", "Maturity"]}
          rowTone={["success", "warning", "danger"]}
          rows={[
            [
              "IP400 nodes",
              "Yes (host IP frames / planned Ethernet)",
              "Ad-hoc mesh table + digipeat",
              "Active project; hardware roadmap still catching up",
            ],
            [
              "NPR-70",
              "Yes (Ethernet modem)",
              "Star (Master/Client)",
              "Available hardware; US speed capped ~65 kbps",
            ],
            [
              "Plain 70 cm FM radios only",
              "No",
              "Voice / slow packet",
              "Mature radios; wrong tool for IP apps",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>Maturity & procurement reality (important)</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>What exists now</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Unified firmware: mesh table, chat, ping, KISS, SPI IP frames, 4FSK on supported boards</Text>
                <Text>Mini-node / Nucleo-class development paths (Mini-node production on hold per project site)</Text>
                <Text>OFDM-AB defined for use with conventional transceivers</Text>
                <Text tone="secondary">Treat early gear as pilot / lab until your three sites are stable.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Roadmap watch-outs</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>AMNC hardware: first run nearly debugged (project status)</Text>
                <Text>OFDM-AB / AMNC beta firmware targeted later in the roadmap</Text>
                <Text>AllStarLink + Ethernet subsystems listed as a later UFP release</Text>
                <Text tone="secondary">
                  Until native Ethernet lands, plan on Pi host via SPI/UART and
                  local services on that Pi — still fully offline.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
        <Callout tone="warning" title="US Part 97">
          Wide 4FSK / OFDM channel widths may conflict with current 70 cm data
          bandwidth / symbol-rate rules depending on mode. Coordinate frequency
          and choose a legal mode for your jurisdiction before on-air EMCOMM
          use. Narrower OFDM-AB-into-FM modes may be easier to justify on
          existing radios but are slower.
        </Callout>
      </Stack>

      <Stack gap={10}>
        <H2>Offline operating rules (unchanged)</H2>
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader>No WAN</CardHeader>
            <CardBody>
              <Text>No ISP, cellular, or cloud path. IP400 RF is the only site interconnect.</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Local apps</CardHeader>
            <CardBody>
              <Text>Murmur and MeshChat on site Pis only. Pre-stage images; no apt-during-incident.</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Hospital isolation</CardHeader>
            <CardBody>
              <Text>EMCOMM LAN stays off clinical networks. PHI stays off the amateur mesh.</Text>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Practical build sequence if you standardize on IP400</H2>
        <Table
          headers={["Step", "Action"]}
          rows={[
            ["1", "Lab three nodes + three Pis; prove mesh table, ping, firmware chat with Internet unplugged"],
            ["2", "Run Murmur on EOC Pi; join from hospital Pis; cap bitrate until RF is clean"],
            ["3", "Stand up MeshChat replicas; confirm sync over IP400 only"],
            ["4", "Rooftop antennas / path checks EOC↔each hospital; add digipeat only if needed"],
            ["5", "Black-sky drill with FM HT tactical net as voice backup if IP voice fails"],
            ["6", "Document callsigns, frequencies, legal mode, IP/host map, spare node image"],
          ]}
          striped
        />
      </Stack>

      <Callout tone="info" title="Design verdict">
        Yes — use IP400 nodes as the 70 cm IP mesh layer for offline Mumble and
        MeshChat. Prefer that over NPR if you want true mesh behavior and a
        project aimed at 400 MHz EMCOMM networking. Keep plain FM HTs for field
        voice. Plan procurement around current hardware availability and Part 97
        mode limits; do not assume multi‑Mbps OFDM on day one.
      </Callout>

      <Text tone="tertiary" style={{ fontSize: 12 }}>
        Sources: ip400.adrcs.org (status, UFP, Mini Node, OFDM-AB); IP400
        Protocol R0.3; ADRCS project overview. Verify latest hardware shipping
        status before buying for EOC/hospital install.
      </Text>
    </Stack>
  );
}
