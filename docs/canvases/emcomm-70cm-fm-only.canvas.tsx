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

function FmDiagram() {
  const theme = useHostTheme();
  const box = (fill: string) => ({
    fill,
    stroke: theme.stroke.secondary,
    strokeWidth: 1,
  });
  return (
    <svg viewBox="0 0 920 300" width="100%" style={{ maxHeight: 300 }}>
      <rect x={0} y={0} width={920} height={300} fill={theme.bg.editor} />

      <rect x={320} y={20} width={280} height={100} rx={6} {...box(theme.fill.secondary)} />
      <text x={460} y={55} textAnchor="middle" fill={theme.text.primary} fontSize={14} fontWeight={600}>
        EOC — 70 cm FM base
      </text>
      <text x={460} y={80} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        Net control · high antenna · UPS
      </text>
      <text x={460} y={100} textAnchor="middle" fill={theme.accent.primary} fontSize={11}>
        Analog voice (+ optional packet)
      </text>

      <line x1={320} y1={70} x2={180} y2={180} stroke={theme.accent.primary} strokeWidth={2} />
      <line x1={600} y1={70} x2={740} y2={180} stroke={theme.accent.primary} strokeWidth={2} />
      <line x1={460} y1={120} x2={460} y2={160} stroke={theme.stroke.primary} strokeWidth={2} />
      <text x={240} y={130} fill={theme.text.tertiary} fontSize={10}>
        70 cm FM
      </text>
      <text x={660} y={130} fill={theme.text.tertiary} fontSize={10}>
        70 cm FM
      </text>

      <rect x={40} y={180} width={260} height={90} rx={6} {...box(theme.fill.tertiary)} />
      <text x={170} y={215} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Hospital A
      </text>
      <text x={170} y={240} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        70 cm base / HT · radio room
      </text>

      <rect x={330} y={180} width={260} height={90} rx={6} {...box(theme.fill.tertiary)} />
      <text x={460} y={215} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Field operators
      </text>
      <text x={460} y={240} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        70 cm HTs on tactical channel
      </text>

      <rect x={620} y={180} width={260} height={90} rx={6} {...box(theme.fill.tertiary)} />
      <text x={750} y={215} textAnchor="middle" fill={theme.text.primary} fontSize={13} fontWeight={600}>
        Hospital B
      </text>
      <text x={750} y={240} textAnchor="middle" fill={theme.text.secondary} fontSize={11}>
        70 cm base / HT · radio room
      </text>
    </svg>
  );
}

export default function Emcomm70cmFmOnly() {
  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1 style={{ margin: 0 }}>70 cm FM-only EMCOMM design</H1>
          <Pill tone="info">No NPR</Pill>
          <Pill tone="success">No Internet</Pill>
          <Pill tone="warning">No Mumble / MeshChat over RF</Pill>
        </Row>
        <Text tone="secondary">
          Yes — you can build the system with ordinary 70 cm FM-capable radios.
          That path drops NPR and any IP mesh. Voice becomes analog FM nets;
          messaging becomes RF-native packet/Winlink-style tools, not Mumble or
          MeshChat across the air.
        </Text>
      </Stack>

      <Callout tone="danger" title="Why FM radios cannot host Mumble or MeshChat">
        Mumble and MeshChat are IP applications (UDP/TCP, Ethernet/IP routing).
        A standard 70 cm FM HT or mobile is an analog voice (or narrow digital
        voice) radio — it has no IP stack and no path for a web UI or Murmur
        client. Without an IP modem layer (NPR, AREDN, etc.), those apps only
        work on a local LAN in one room, not EOC↔hospital over RF.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="70 cm FM" label="Primary RF" />
        <Stat value="Voice nets" label="Replaces Mumble" />
        <Stat value="Packet / RMS" label="Replaces MeshChat" />
        <Stat value="0" label="Internet required" />
      </Grid>

      <Stack gap={10}>
        <H2>Architecture (FM only)</H2>
        <Card>
          <CardBody style={{ padding: 12 }}>
            <FmDiagram />
          </CardBody>
        </Card>
      </Stack>

      <Stack gap={10}>
        <H2>What replaces each IP service</H2>
        <Table
          headers={["Wanted IP app", "FM-only substitute", "Notes"]}
          rowTone={["warning", "warning", "success"]}
          rows={[
            [
              "Mumble (multi-party IP voice)",
              "Directed 70 cm FM voice net with EOC as NCS",
              "Simplex or local repeater; tactical channels for hospitals / field. No conference-server software on RF.",
            ],
            [
              "MeshChat (distributed IP text)",
              "AX.25 packet BBS / keyboard chat, APRS messages, or local Winlink RMS over VHF/UHF (VARA FM / packet)",
              "Slower and more formal than MeshChat; works air-gapped if the RMS/BBS is on-site at EOC.",
            ],
            [
              "Field handhelds",
              "Same 70 cm (or dual-band) HTs on the net",
              "This is where FM shines — no special modem at the belt.",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>Recommended FM layout (EOC + 2 hospitals)</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Voice plan</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Ch 1 — Command net (EOC NCS, both hospitals)</Text>
                <Text>Ch 2 — Hospital A tactical / logistics</Text>
                <Text>Ch 3 — Hospital B tactical / logistics</Text>
                <Text>Ch 4 — Field / logistics (HTs)</Text>
                <Text tone="secondary">
                  Prefer simplex if paths work; otherwise a coordinated 70 cm
                  repeater with emergency power (still no Internet).
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Text / record traffic</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>EOC hosts a local packet or Winlink-style RMS (RF only)</Text>
                <Text>Hospitals send formal ICS traffic as messages, not voice dumps</Text>
                <Text>Optional second radio + TNC/soundmodem at each radio room</Text>
                <Text tone="secondary">
                  Keep voice and data on separate frequencies so a long file
                  transfer does not block net control.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={10}>
        <H2>Site gear (typical)</H2>
        <Table
          headers={["Site", "Radios", "Extra for messaging"]}
          rows={[
            [
              "EOC",
              "70 cm base (or dual-band), high gain antenna, spare HT, UPS/generator",
              "Second radio + TNC/sound card for packet or local RMS; printer for ICS forms",
            ],
            [
              "Hospital A / B",
              "70 cm base in radio room + HT backup; rooftop antenna toward EOC/repeater",
              "Optional data radio + TNC if formal traffic volume is high",
            ],
            [
              "Field",
              "70 cm (or dual-band) HTs, spare batteries, programmed channel list",
              "Paper ICS / runner if no data radio",
            ],
          ]}
          striped
        />
      </Stack>

      <Stack gap={10}>
        <H2>When to pick FM-only vs NPR</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill tone="success">Choose FM</Pill>}>Best if…</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Operators already live on HTs and FM nets</Text>
                <Text>You need simple, rugged, no-modem field use</Text>
                <Text>You can drop Mumble/MeshChat as requirements</Text>
                <Text>Budget and training favor radios you already own</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="info">Choose NPR</Pill>}>Best if…</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>You must keep Mumble and/or MeshChat site-to-site</Text>
                <Text>You want Ethernet apps over 70 cm without Internet</Text>
                <Text>Fixed sites can host modems + Pis</Text>
                <Text>You accept ~65 kbps and star topology limits</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Callout tone="success" title="Design verdict">
        A 70 cm FM-capable radio design is valid and fully offline — but it is a
        voice (and slow data) system, not an IP mesh. To use only FM radios,
        replace Mumble with directed FM nets and MeshChat with local packet /
        RMS messaging. NPR exists only when you insist on keeping those IP apps
        over 70 cm RF.
      </Callout>

      <Text tone="tertiary" style={{ fontSize: 12 }}>
        Related: emcomm-70cm-npr-ip.canvas.tsx and emcomm-70cm-deploy-kit.canvas.tsx
        remain the path if Mumble + MeshChat over RF are mandatory.
      </Text>
    </Stack>
  );
}
