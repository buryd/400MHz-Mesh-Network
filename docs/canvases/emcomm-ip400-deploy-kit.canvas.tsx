import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
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
} from "cursor/canvas";

export default function EmcommIp400DeployKit() {
  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1 style={{ margin: 0 }}>IP400 Deploy Kit</H1>
          <Pill tone="info">3 nodes</Pill>
          <Pill>IP map</Pill>
          <Pill>Murmur + MeshChat</Pill>
          <Pill tone="success">No Internet</Pill>
        </Row>
        <Text tone="secondary">
          Concrete addressing, RF identity, Murmur caps, and site checklists for
          EOC + Hospital A + Hospital B on an air-gapped IP400 mesh. Replace
          placeholder callsigns and frequency after coordination. Use the
          official ADRCS Pi disk image / UFP docs for the host SPI interface name
          on your hardware revision.
        </Text>
      </Stack>

      <Callout tone="danger" title="Hard requirement: zero Internet reliance">
        No WAN, cellular, public DNS, cloud Mumble, or online package installs
        during operations. Pre-stage Pi images offline. All site-to-site traffic
        rides IP400 RF only.
      </Callout>

      <Callout tone="warning" title="Host model (today vs later Ethernet)">
        Current IP400 hosts typically attach via SPI/UART to a Pi and present IP
        frames to that host. Until UFP Ethernet subsystems ship, run Murmur and
        MeshChat on the site Pis themselves (or on a tiny switch only for local
        peripherals). The overlay IPs below are for those host Pis across the
        mesh — not hospital clinical networks.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="10.40.0.0/24" label="EMCOMM overlay subnet" />
        <Stat value="3" label="IP400 radio nodes" />
        <Stat value="0" label="Internet / WAN uplinks" />
        <Stat value="16 kbps" label="Murmur bandwidth cap" />
      </Grid>

      {/* —— 0 AIR GAP —— */}
      <Stack gap={10}>
        <H2>0. Air-gap lock-down (all sites)</H2>
        <Table
          headers={["Control", "Setting", "Verify"]}
          rowTone={["danger", "danger", "success", "success", "warning"]}
          rows={[
            [
              "Default route",
              "No 0.0.0.0/0 on any Pi; no ISP gateway",
              "ip route shows only mesh / local links",
            ],
            [
              "DNS",
              "No 8.8.8.8 / 9.9.9.9 / ISP DNS",
              "Public names fail; .mesh names resolve via hosts",
            ],
            [
              "Physical WAN",
              "Unplug ISP; disable cellular / hotspot tethering",
              "Mumble + MeshChat still work EOC↔hospitals",
            ],
            [
              "Apps",
              "Local Murmur + MeshChat only",
              "Clients use 10.40.0.10 / .11 / .21 / .31 only",
            ],
            [
              "Provisioning",
              "ADRCS/Pi images + apt cache pre-loaded",
              "Can rebuild a site Pi with no Internet",
            ],
          ]}
          striped
        />
      </Stack>

      {/* —— 1 IDENTITY —— */}
      <Stack gap={10}>
        <H2>1. RF identity & shared radio parameters</H2>
        <Text tone="secondary">
          IP400 routes by callsign / mesh table. Each radio node needs a unique
          callsign (excess-40 coding, typically up to 6 characters in the base
          field — use your license-compliant IDs).
        </Text>
        <Table
          headers={["Site", "Node callsign (example)", "Host role"]}
          rows={[
            ["EOC", "W1EOC", "Mesh hub preference · Murmur + MeshChat primary"],
            ["Hospital A", "W1HOSA", "MeshChat replica · Mumble client"],
            ["Hospital B", "W1HOSB", "MeshChat replica · Mumble client"],
          ]}
          striped
        />
        <Table
          headers={["Parameter", "Value", "Notes"]}
          rows={[
            ["Band / frequency", "Coordinated 70 cm channel", "Local band plan; avoid ATV / weak-signal segments"],
            ["Mode", "Legal 4FSK (or OFDM-AB-into-FM if using AMNC+radio)", "Confirm Part 97 width before wide modes"],
            ["Power", "Minimum for solid mesh table entries", "Raise only after path fails at low power"],
            ["Beaconing", "Enabled on all three nodes", "Required for mesh table discovery"],
            ["Digipeat / repeat", "EOC on if A↔B needs a hop; hospitals off unless planned", "Stop hidden multipath loops"],
            ["RTC / time", "Set from EOC reference before drill", "No public NTP in ops"],
          ]}
          striped
        />
      </Stack>

      {/* —— 2 IP MAP —— */}
      <Stack gap={10}>
        <H2>2. IP address map (host overlay)</H2>
        <Text tone="secondary">
          Assign stable addresses on each site’s mesh-facing host interface
          (name depends on ADRCS image — document the real ifname in the
          runbook). Keep a single flat overlay so Mumble/MeshChat need no
          complex routing.
        </Text>
        <Table
          headers={["Address", "Role", "Where"]}
          rows={[
            ["10.40.0.0/24", "Entire EMCOMM overlay", "All mesh host Pis"],
            ["10.40.0.10", "Murmur (Mumble) server", "EOC Pi · UDP 64738"],
            ["10.40.0.11", "MeshChat — EOC", "EOC Pi · HTTP · zone CountyEOCMeshChat"],
            ["10.40.0.12", "EOC ops console / hosts publisher", "Optional second EOC Pi or same host"],
            ["10.40.0.20", "Hospital A mesh host (gateway IP on A Pi)", "IP400 host stack on A"],
            ["10.40.0.21", "MeshChat — Hospital A", "Same Pi as .20 or alias/service bind"],
            ["10.40.0.22", "Hospital A ops laptop (optional Ethernet to A Pi)", "Local only if you add a tiny switch"],
            ["10.40.0.30", "Hospital B mesh host", "IP400 host stack on B"],
            ["10.40.0.31", "MeshChat — Hospital B", "Same Pi as .30 or alias"],
            ["10.40.0.32", "Hospital B ops laptop (optional)", "Local only"],
          ]}
          striped
        />

        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Simplified bind (recommended day-one)</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>One Pi per site does radio host + apps:</Text>
                <Text>
                  <Code>EOC: 10.40.0.10</Code> Murmur + MeshChat
                </Text>
                <Text>
                  <Code>HA: 10.40.0.20</Code> MeshChat + Mumble client
                </Text>
                <Text>
                  <Code>HB: 10.40.0.30</Code> MeshChat + Mumble client
                </Text>
                <Text tone="secondary">
                  Collapse .11/.21/.31 onto those addresses if you want fewer
                  IPs — keep the table above if you split services later.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Name map (/etc/hosts on every Pi)</CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Text>
                  <Code>10.40.0.10 mumble.eoc.mesh</Code>
                </Text>
                <Text>
                  <Code>10.40.0.10 meshchat.eoc.mesh</Code>
                </Text>
                <Text>
                  <Code>10.40.0.20 meshchat.ha.mesh</Code>
                </Text>
                <Text>
                  <Code>10.40.0.30 meshchat.hb.mesh</Code>
                </Text>
                <Text tone="secondary">
                  Distribute the same hosts file with the offline image. No
                  public DNS.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      {/* —— 3 MURMUR —— */}
      <Stack gap={10}>
        <H2>3. Murmur configuration caps</H2>
        <Text tone="secondary">
          Murmur runs only at EOC (<Code>10.40.0.10</Code>). Hospital operators
          connect as clients over IP400.
        </Text>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>murmur.ini (essential)</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>
                  <Code>host=10.40.0.10</Code>
                </Text>
                <Text>
                  <Code>port=64738</Code>
                </Text>
                <Text>
                  <Code>bandwidth=16000</Code>
                </Text>
                <Text tone="tertiary">bytes/sec per user — start here</Text>
                <Text>
                  <Code>opusthreshold=0</Code>
                </Text>
                <Text>
                  <Code>messageburst=2</Code>
                </Text>
                <Text>
                  <Code>messagelimit=1</Code>
                </Text>
                <Text>
                  <Code>allowhtml=false</Code>
                </Text>
                <Text>
                  <Code>bonjour=false</Code>
                </Text>
                <Text>
                  <Code>serverpassword=CHANGEME</Code>
                </Text>
                <Text tone="tertiary">Prefer password over cloud cert workflows</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Client / NCS policy</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Server: mumble.eoc.mesh (10.40.0.10)</Text>
                <Text>Opus · lowest usable quality · PTT only</Text>
                <Text>Channels: Command · Observing (listen-only)</Text>
                <Text>One talker at a time under NCS</Text>
                <Text>Long traffic → MeshChat or IP400 firmware chat</Text>
                <Text tone="secondary">
                  If RF is marginal, drop bandwidth to 12000 or 8000 before
                  raising power.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      {/* —— 4 MESHCHAT —— */}
      <Stack gap={10}>
        <H2>4. MeshChat pins</H2>
        <Table
          headers={["Site", "URL / host", "Zone"]}
          rows={[
            ["EOC", "http://meshchat.eoc.mesh/ or http://10.40.0.10/", "CountyEOCMeshChat"],
            ["Hospital A", "http://meshchat.ha.mesh/ or http://10.40.0.20/", "CountyEOCMeshChat"],
            ["Hospital B", "http://meshchat.hb.mesh/ or http://10.40.0.30/", "CountyEOCMeshChat"],
          ]}
          striped
        />
        <Text tone="secondary">
          Identical zone/service name on all three so replicas discover and sync
          over the IP400 overlay. Keep IP400 firmware chat as a degraded-mode
          backup if a MeshChat Pi fails.
        </Text>
      </Stack>

      {/* —— 5 CHECKLISTS —— */}
      <Stack gap={10}>
        <H2>5. Site checklists</H2>

        <Card>
          <CardHeader trailing={<Pill tone="info">Hub</Pill>}>EOC — IP400 + services host</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <H3 style={{ margin: 0 }}>Bench / image</H3>
              <Stack gap={4}>
                <Text>□ Flash ADRCS-supported Pi image offline; hostname eoc-mesh</Text>
                <Text>□ Attach IP400 node (SPI/UART per hardware guide); unique callsign</Text>
                <Text>□ Set frequency, legal mode, beacon on; RTC set from local clock</Text>
                <Text>□ Assign overlay IP 10.40.0.10 on mesh host interface</Text>
                <Text>□ Install Murmur + MeshChat from offline packages; hosts file loaded</Text>
                <Text>□ Confirm no default route / no public DNS</Text>
                <Text>□ Lab-ping other two nodes’ callsigns / host IPs before rooftop</Text>
              </Stack>
              <Divider />
              <H3 style={{ margin: 0 }}>On air</H3>
              <Stack gap={4}>
                <Text>□ Antenna / feedline OK on 70 cm; start at low power</Text>
                <Text>□ Mesh table shows W1HOSA and W1HOSB (or your IDs)</Text>
                <Text>□ Ping 10.40.0.20 and 10.40.0.30 from EOC</Text>
                <Text>□ Mumble login from HA and HB; PTT test under bandwidth cap</Text>
                <Text>□ MeshChat message from each site appears on all three</Text>
                <Text>□ Enable digipeat on EOC only if A↔B needs the hop</Text>
                <Text>□ Record RSSI/mesh metrics and final freqs in runbook</Text>
              </Stack>
              <Divider />
              <H3 style={{ margin: 0 }}>Hardening (air-gap)</H3>
              <Stack gap={4}>
                <Text>□ UPS on node, Pi, optional switch</Text>
                <Text>□ Physically disconnect ISP/WAN; no cellular tether</Text>
                <Text>□ Spare IP400 node + pre-imaged Pi cold spare</Text>
                <Text>□ Printed IP/callsign map + Mumble password in GO kit</Text>
                <Text>□ ROIP gateway on EOC LAN: FM base + AllStar/SVXLink bridged into Murmur</Text>
                <Text>□ ROIP uses a dedicated FM channel (not the AMNC mesh frequency)</Text>
                <Text>□ Test: HT PTT heard in Mumble at HA/HB; Mumble PTT keyed on FM base</Text>
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill>Node</Pill>}>Hospital A</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>□ IP400 node + Pi image; callsign W1HOSA (example)</Text>
                <Text>□ Same frequency / mode family as EOC; beacon on</Text>
                <Text>□ Digipeat off unless directed by EOC</Text>
                <Text>□ Overlay IP 10.40.0.20; MeshChat zone CountyEOCMeshChat</Text>
                <Text>□ /etc/hosts matches EOC map</Text>
                <Text>□ Mumble → 10.40.0.10 · PTT · low Opus quality</Text>
                <Text>□ No cable to clinical LAN / Internet</Text>
                <Text>□ Antenna toward EOC; UPS; MoU on file</Text>
                <Text>□ After link: screenshot mesh table + ping RTT</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill>Node</Pill>}>Hospital B</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>□ IP400 node + Pi image; callsign W1HOSB (example)</Text>
                <Text>□ Same frequency / mode family as EOC; beacon on</Text>
                <Text>□ Digipeat off unless directed by EOC</Text>
                <Text>□ Overlay IP 10.40.0.30; MeshChat zone CountyEOCMeshChat</Text>
                <Text>□ /etc/hosts matches EOC map</Text>
                <Text>□ Mumble → 10.40.0.10 · PTT · low Opus quality</Text>
                <Text>□ No cable to clinical LAN / Internet</Text>
                <Text>□ Antenna toward EOC; UPS; MoU on file</Text>
                <Text>□ After link: screenshot mesh table + ping RTT</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      {/* —— 6 ACCEPTANCE —— */}
      <Stack gap={10}>
        <H2>6. Acceptance test (black-sky)</H2>
        <Table
          headers={["#", "Test", "Pass criteria"]}
          rows={[
            ["1", "Mesh discovery", "Each node lists the other two in the mesh table"],
            ["2", "IP reachability", "EOC pings 10.40.0.20 and 10.40.0.30"],
            ["3", "Mumble voice", "One PTT talker clear at both hospitals"],
            ["4", "NCS discipline", "Second talker held; Command channel stays usable"],
            ["5", "MeshChat sync", "Message from each site visible on all three"],
            ["6", "Firmware chat backup", "IP400 built-in chat works EOC↔HA if MeshChat stopped"],
            ["7", "Power cycle recover", "HA Pi offline 2 min; remeshes; MeshChat catches up"],
            [
              "8",
              "Air-gap",
              "WAN unplugged; public DNS fails; tests 1–7 still pass",
            ],
          ]}
          striped
        />
      </Stack>

      {/* —— 7 RUNBOOK SNIPPET —— */}
      <Stack gap={10}>
        <H2>7. Runbook quick card</H2>
        <Card>
          <CardBody>
            <Stack gap={6}>
              <Text>
                <Text weight="semibold">Voice:</Text> Mumble → mumble.eoc.mesh /
                10.40.0.10 · password on GO card · PTT
              </Text>
              <Text>
                <Text weight="semibold">Text:</Text> MeshChat zone
                CountyEOCMeshChat · backup = IP400 node chat
              </Text>
              <Text>
                <Text weight="semibold">If IP voice dies:</Text> fall back to 70 cm
                FM tactical channel (separate radio)
              </Text>
              <Text>
                <Text weight="semibold">If one hospital RF dies:</Text> check
                antenna/power; EOC digipeat only if path study says so
              </Text>
              <Text tone="secondary">
                Never bridge this overlay to hospital EHR / guest Wi‑Fi / Internet
                firewalls.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Callout tone="success" title="Ready to configure (IP400)">
        Three nodes, overlay 10.40.0.0/24, Murmur at 10.40.0.10 with
        bandwidth=16000, MeshChat on .10/.20/.30 with one shared zone, Internet
        disconnected. Bring EOC up first, then hospitals one at a time while
        logging mesh-table and ping results into the runbook.
      </Callout>

      <Text tone="tertiary" style={{ fontSize: 12 }}>
        Architecture: emcomm-ip400-mesh.canvas.tsx · Project refs: ip400.adrcs.org
        (UFP, status, Mini Node) · GitHub adrcs/ip400 · Protocol R0.3 callsign
        addressing. Interface names and exact host networking follow your ADRCS
        disk image — paste them into this runbook when known.
      </Text>
    </Stack>
  );
}
