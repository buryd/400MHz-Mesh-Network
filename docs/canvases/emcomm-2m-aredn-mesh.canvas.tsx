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

function LayerDiagram() {
  const theme = useHostTheme();
  const box = (fill: string) => ({
    fill,
    stroke: theme.stroke.secondary,
    strokeWidth: 1,
  });
  return (
    <svg viewBox="0 0 920 420" width="100%" style={{ maxHeight: 420 }}>
      <rect x={0} y={0} width={920} height={420} fill={theme.bg.editor} />

      {/* Field layer */}
      <rect x={20} y={20} width={180} height={140} rx={6} {...box(theme.fill.tertiary)} />
      <text x={110} y={48} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Field Operators
      </text>
      <text x={110} y={72} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        2 m FM HTs
      </text>
      <text x={110} y={92} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Simplex / tactical net
      </text>
      <text x={110} y={112} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        Part 97 · voice / short data
      </text>
      <text x={110} y={140} textAnchor="middle" fill={theme.accent.primary} fontSize={11}>
        146 MHz FM
      </text>

      {/* Arrow to ROIP */}
      <line x1={200} y1={90} x2={250} y2={90} stroke={theme.accent.primary} strokeWidth={2} />
      <polygon points="250,84 262,90 250,96" fill={theme.accent.primary} />

      {/* ROIP / EOC radio room */}
      <rect x={262} y={20} width={220} height={140} rx={6} {...box(theme.fill.secondary)} />
      <text x={372} y={48} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        EOC Radio Room
      </text>
      <text x={372} y={72} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        ROIP gateway (AllStar / SVXLink)
      </text>
      <text x={372} y={92} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Duplex base · antenna · UPS
      </text>
      <text x={372} y={112} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        SIP ↔ radio bridge
      </text>
      <text x={372} y={140} textAnchor="middle" fill={theme.accent.primary} fontSize={11}>
        Ethernet to services LAN
      </text>

      {/* Services stack */}
      <rect x={520} y={20} width={380} height={140} rx={6} {...box(theme.fill.tertiary)} />
      <text x={710} y={48} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        EOC Services Hosts (offline)
      </text>
      <text x={710} y={72} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        FreePBX / Asterisk · Murmur (Mumble)
      </text>
      <text x={710} y={92} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        MeshChat zone · DNS / DHCP
      </text>
      <text x={710} y={112} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        No Internet uplink required
      </text>
      <text x={710} y={140} textAnchor="middle" fill={theme.accent.primary} fontSize={11}>
        DtD / VLAN to AREDN node
      </text>

      {/* Vertical to RF mesh */}
      <line x1={710} y1={160} x2={710} y2={200} stroke={theme.stroke.primary} strokeWidth={2} />
      <line x1={372} y1={160} x2={372} y2={200} stroke={theme.stroke.primary} strokeWidth={2} />
      <line x1={372} y1={200} x2={710} y2={200} stroke={theme.stroke.primary} strokeWidth={2} />
      <line x1={541} y1={200} x2={541} y2={230} stroke={theme.accent.primary} strokeWidth={2} />

      {/* AREDN backbone */}
      <rect x={20} y={230} width={880} height={70} rx={6} {...box(theme.fill.secondary)} />
      <text x={460} y={258} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        AREDN IP Mesh Backbone (not 2 m)
      </text>
      <text x={460} y={280} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        5.8 GHz PtP dishes EOC ↔ Hospital A · EOC ↔ Hospital B · optional 3.4 / 2.4 GHz fill-in
      </text>

      {/* Site nodes */}
      <rect x={20} y={320} width={280} height={80} rx={6} {...box(theme.fill.tertiary)} />
      <text x={160} y={348} textAnchor="middle" fill={theme.text.primary} fontSize={12} fontWeight={600}>
        EOC Site
      </text>
      <text x={160} y={370} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Hub node · services · ROIP
      </text>
      <text x={160} y={388} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        Primary PBX / Murmur / MeshChat
      </text>

      <rect x={320} y={320} width={280} height={80} rx={6} {...box(theme.fill.tertiary)} />
      <text x={460} y={348} textAnchor="middle" fill={theme.text.primary} fontSize={12} fontWeight={600}>
        Hospital A
      </text>
      <text x={460} y={370} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        AREDN node · SIP phones
      </text>
      <text x={460} y={388} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        MeshChat replica · Mumble client
      </text>

      <rect x={620} y={320} width={280} height={80} rx={6} {...box(theme.fill.tertiary)} />
      <text x={760} y={348} textAnchor="middle" fill={theme.text.primary} fontSize={12} fontWeight={600}>
        Hospital B
      </text>
      <text x={760} y={370} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        AREDN node · SIP phones
      </text>
      <text x={760} y={388} textAnchor="middle" fill={theme.text.tertiary} fontSize={10}>
        MeshChat replica · Mumble client
      </text>
    </svg>
  );
}

export default function Emcomm2mArednMesh() {
  const theme = useHostTheme();

  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1 style={{ margin: 0 }}>EOC / Hospital EMCOMM Mesh</H1>
          <Pill tone="info">Hybrid 2 m + AREDN</Pill>
          <Pill>Offline-capable</Pill>
        </Row>
        <Text tone="secondary">
          Design for a local Emergency Operations Center and two hospitals: 2 m
          FM for field handhelds and Radio-over-IP, AREDN microwave for
          Mumble, SIP PBX, and MeshChat with no Internet dependency.
        </Text>
      </Stack>

      <Callout tone="warning" title="2 m cannot carry the AREDN service plane">
        AREDN does not run on the 2 meter band. Treat 146 MHz as the field voice
        / ROIP access layer. Put Mumble, FreePBX/Asterisk, and MeshChat on an
        AREDN IP backbone (typically 5.8 GHz PtP, with optional 2.4 / 3.4 GHz).
        Your workspace name suggests 400 MHz interest — 70 cm can extend coverage
        or host limited IP (e.g. NPR under Part 97 limits) but is not a substitute
        for microwave AREDN between fixed sites.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="3" label="Fixed sites (EOC + 2 hospitals)" />
        <Stat value="2 m" label="Field HT / ROIP access" />
        <Stat value="5.8 GHz" label="Primary AREDN PtP backbone" />
        <Stat value="0" label="Internet links required" />
      </Grid>

      <Stack gap={10}>
        <H2>System architecture</H2>
        <Card>
          <CardHeader>Traffic planes</CardHeader>
          <CardBody style={{ padding: 12 }}>
            <LayerDiagram />
          </CardBody>
        </Card>
      </Stack>

      <Stack gap={10}>
        <H2>Recommended layering</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill tone="info">Access</Pill>}>Layer 1 — 2 m field voice</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text>
                  County / hospital tactical nets on coordinated 2 m simplex or
                  repeater pairs. Handhelds stay analog FM for reliability and
                  battery life.
                </Text>
                <Text tone="secondary">
                  EOC runs a high antenna, dual-band base (or dedicated 2 m),
                  UPS, and a hardware radio interface into the ROIP gateway.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="info">Bridge</Pill>}>Layer 2 — ROIP gateway</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text>
                  AllStar (Asterisk + app_rpt) or SVXLink at the EOC bridges the
                  2 m channel into SIP extensions and optional conference bridges
                  on the mesh PBX.
                </Text>
                <Text tone="secondary">
                  Field HTs never need IP. Operators at hospitals dial a SIP
                  extension that is locked to the ROIP conference / radio channel.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="info">Transport</Pill>}>Layer 3 — AREDN backbone</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text>
                  Point-to-point 5.8 GHz dish links: EOC↔Hospital A and
                  EOC↔Hospital B (star). Add a Hospital A↔B link only if path
                  studies show value for failover.
                </Text>
                <Text tone="secondary">
                  Use DtD tunneling / VLAN isolation so hospital IT LANs stay
                  separate from the Part 97 mesh. Advertise services via AREDN
                  OLSR service announcements.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="info">Apps</Pill>}>Layer 4 — offline services</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text>
                  Run Murmur, FreePBX/Asterisk, and MeshChat on Raspberry Pi or
                  mini-PC hosts on the EOC mesh LAN — not on the radio nodes.
                </Text>
                <Text tone="secondary">
                  MeshChat instances at each hospital sync peer-to-peer so
                  messaging survives intermittent RF. Keep Mumble codecs and
                  bitrates conservative for shared RF capacity.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Service design (no Internet)</H2>
        <Table
          headers={["Service", "Role", "Where it runs", "Who uses it"]}
          columnAlign={["left", "left", "left", "left"]}
          rows={[
            [
              "Murmur / Mumble",
              "Multi-party ops voice + text for IP-capable stations",
              "EOC Pi (primary); optional warm standby at Hospital A",
              "EOC staff, hospital radio rooms, deployable laptops on mesh Wi‑Fi",
            ],
            [
              "FreePBX / Asterisk",
              "SIP PBX, extensions, conference rooms, MeshPhone-style dial plan",
              "EOC services host; IAX2/SIP trunks only over AREDN",
              "Desk SIP phones / softphones at EOC and both hospitals",
            ],
            [
              "ROIP bridge",
              "Maps 2 m FM to a SIP conference / extension",
              "EOC radio room (AllStar or SVXLink + URI/RA interface)",
              "Field HTs ↔ mesh SIP / Mumble operators",
            ],
            [
              "MeshChat",
              "Distributed EMCOMM text + file drops; zone = your county",
              "Pi at EOC + replica at each hospital (same service name)",
              "All mesh users via browser; survives node churn",
            ],
            [
              "Local DNS / hosts",
              "Stable names without public DNS",
              "EOC DHCP/DNS or AREDN name resolution",
              "mumble.local.mesh, pbx.local.mesh, meshchat.local.mesh",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>Voice path choices</H2>
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader>Field HT path</CardHeader>
            <CardBody>
              <Text>
                HT → 2 m RF → EOC base → ROIP → Asterisk conference → SIP
                phones at hospitals. Keep this as the primary life-safety voice
                path for people who only have handhelds.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Mesh desk path</CardHeader>
            <CardBody>
              <Text>
                SIP softphone or desk set → FreePBX over AREDN. Use for
                hospital command, EOC desks, and ring groups. Optionally bridge
                one conference into Mumble for hybrid rooms.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Mumble ops path</CardHeader>
            <CardBody>
              <Text>
                Best for multi-party coordination among IP stations (EOC radio
                room, hospital ARES desks, portable mesh kits). Do not force
                every HT user onto Mumble — ROIP covers them.
              </Text>
            </CardBody>
          </Card>
        </Grid>
        <Callout tone="info" title="Keep three voice planes intentional">
          Mixing everything into one forever-open bridge creates cross-talk and
          fatigue. Default: separate Field (2 m/ROIP), Command (SIP), and Tech/Ops
          (Mumble) conferences, with supervised bridges only when the IC requests
          them.
        </Callout>
      </Stack>

      <Stack gap={10}>
        <H2>Site bill of materials (conceptual)</H2>
        <Table
          headers={["Site", "RF / mesh", "Compute / voice", "Power / notes"]}
          rows={[
            [
              "EOC (hub)",
              "2× 5.8 GHz dishes (to each hospital); AREDN node; 2 m base + high antenna; ROIP interface",
              "FreePBX, Murmur, MeshChat, DNS; managed switch; mesh SSID AP for ops laptops",
              "UPS + generator; DC preference for Pi hosts; no Internet WAN",
            ],
            [
              "Hospital A",
              "5.8 GHz dish to EOC; AREDN node; optional 2 m monitor radio",
              "2–4 SIP phones; MeshChat Pi; Mumble clients on ops PCs",
              "UPS; MoU for antenna placement; isolated Part 97 VLAN",
            ],
            [
              "Hospital B",
              "Same pattern as Hospital A",
              "Same pattern as Hospital A",
              "Same constraints; independent failover path if A–B PtP added later",
            ],
            [
              "Field kits",
              "2 m HTs (primary); optional portable AREDN node for IP teams",
              "Paper ICS forms + MeshChat when on mesh Wi‑Fi",
              "Spare batteries; programmed tactical channels; ID / net control SOPs",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>IP addressing & dial plan sketch</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Mesh addressing</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Use AREDN default 10.x addressing; document static LAN hosts.</Text>
                <Text tone="secondary">EOC services LAN: e.g. 10.EOC.0.0/24 via DtD</Text>
                <Text tone="secondary">Advertise: Murmur UDP 64738, SIP 5060, MeshChat HTTP</Text>
                <Text tone="secondary">Firewall: block non-ham encryption that obscures meaning (Part 97)</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>SIP numbering (example)</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>1xxx — EOC desks / IC / logistics</Text>
                <Text>2xxx — Hospital A</Text>
                <Text>3xxx — Hospital B</Text>
                <Text>8000 — Field ROIP bridge (2 m)</Text>
                <Text>8100 — Command conference</Text>
                <Text>8200 — Mumble↔SIP supervised bridge</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Bandwidth & capacity reality check</H2>
        <Table
          headers={["Traffic", "Typical load", "Fits on"]}
          rowTone={["success", "success", "warning", "info"]}
          rows={[
            ["MeshChat sync + text", "Very small (KB bursts)", "AREDN easily; not needed on 2 m"],
            ["SIP audio (G.722 / Opus careful)", "~30–60 kbps per call", "5.8 GHz PtP; few concurrent calls"],
            ["Mumble (Opus, quality capped)", "~20–40 kbps per active talker", "AREDN; limit rooms / bitrate"],
            ["Raw IP over 2 m / NPR-style", "Tens of kbps in US-legal narrow modes", "Backup telemetry only — not PBX backbone"],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>Build sequence</H2>
        <Grid columns={1} gap={8}>
          <Card variant="borderless">
            <CardBody>
              <Stack gap={10}>
                <Row gap={10} align="start">
                  <Pill tone="info">1</Pill>
                  <Stack gap={2}>
                    <H3 style={{ margin: 0 }}>Path study & MoUs</H3>
                    <Text tone="secondary">
                      Fresnel clearance for EOC↔hospital dish shots; hospital
                      facilities MoUs; frequency coordination for 2 m tactical
                      channels; served-agency expectations.
                    </Text>
                  </Stack>
                </Row>
                <Divider />
                <Row gap={10} align="start">
                  <Pill tone="info">2</Pill>
                  <Stack gap={2}>
                    <H3 style={{ margin: 0 }}>AREDN star backbone</H3>
                    <Text tone="secondary">
                      Install PtP links, verify OLSR neighbor quality, DtD into
                      EOC services switch, announce a test HTTP service.
                    </Text>
                  </Stack>
                </Row>
                <Divider />
                <Row gap={10} align="start">
                  <Pill tone="info">3</Pill>
                  <Stack gap={2}>
                    <H3 style={{ margin: 0 }}>PBX + MeshChat + Mumble offline</H3>
                    <Text tone="secondary">
                      Stand up FreePBX and Murmur on EOC LAN with Internet
                      disconnected. Place MeshChat at all three sites with one
                      shared zone/service name and confirm sync.
                    </Text>
                  </Stack>
                </Row>
                <Divider />
                <Row gap={10} align="start">
                  <Pill tone="info">4</Pill>
                  <Stack gap={2}>
                    <H3 style={{ margin: 0 }}>ROIP integration</H3>
                    <Text tone="secondary">
                      Interface 2 m base to AllStar/SVXLink, map to extension
                      8000, train net control on supervised bridging into
                      command conference.
                    </Text>
                  </Stack>
                </Row>
                <Divider />
                <Row gap={10} align="start">
                  <Pill tone="info">5</Pill>
                  <Stack gap={2}>
                    <H3 style={{ margin: 0 }}>Exercise & harden</H3>
                    <Text tone="secondary">
                      Full black-sky drill: kill Internet and cellular, run ICS
                      voice on 2 m + SIP + Mumble, pass hospital traffic on
                      MeshChat, measure call quality and battery endurance.
                    </Text>
                  </Stack>
                </Row>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Compliance & operational constraints</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Part 97</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>No encryption that obscures meaning on amateur RF.</Text>
                <Text>Proper station ID on 2 m and mesh nodes.</Text>
                <Text>Content must remain amateur-appropriate; hospital PHI stays off the mesh.</Text>
                <Text>Business Internet substitution is not the mission — EMCOMM support is.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Hospital / EOC practice</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Written MoUs with both hospitals and the EOC.</Text>
                <Text>Isolate mesh from clinical networks (air-gap or one-way policy).</Text>
                <Text>Train credentialed operators; maintain ICS radio plans.</Text>
                <Text>Document failover: if a dish fails, 2 m voice still works.</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Callout tone="success" title="Design verdict">
        Use 2 meters as the field handheld and ROIP access layer, and AREDN
        microwave as the offline IP fabric for Mumble, SIP PBX, and MeshChat
        among the EOC and both hospitals. That split matches physics, Part 97,
        and real EMCOMM workflows better than forcing the entire service plane
        onto VHF.
      </Callout>

      <Text tone="tertiary" style={{ fontSize: 12 }}>
        Sources: AREDN services guide (Mumble, Asterisk, MeshChat); MeshPhone /
        Asterisk community practice; NPR docs for VHF/UHF IP limits. Local path
        studies, coordination, and MoUs required before procurement.
      </Text>
    </Stack>
  );
}
