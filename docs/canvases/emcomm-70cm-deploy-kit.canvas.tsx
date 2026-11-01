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

export default function Emcomm70cmDeployKit() {
  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1 style={{ margin: 0 }}>70 cm NPR Deploy Kit</H1>
          <Pill tone="info">IP map</Pill>
          <Pill>Murmur caps</Pill>
          <Pill>Site checklists</Pill>
          <Pill tone="success">No Internet</Pill>
        </Row>
        <Text tone="secondary">
          Concrete addressing, Murmur limits, and Master/Client checklists for
          EOC + Hospital A + Hospital B on a US-legal NPR-70 star (~65 kbps).
          The production system is air-gapped: no WAN, cellular, or cloud
          services. Replace placeholder callsigns/frequency after coordination.
        </Text>
      </Stack>

      <Callout tone="danger" title="Hard requirement: system must not rely on the Internet">
        Every host on 10.70.0.0/24 runs without a default route to the public
        Internet. NPR DNS_active = no. No public resolvers, no cloud Mumble,
        no phone-home updates during operations. Pre-stage all software offline.
      </Callout>

      <Callout tone="warning" title="Single flat subnet rule">
        NPR requires Master modem IP, Master-side hosts, and client-leased hosts
        all inside one IPv4 subnet. Do not put hospital clinical networks on this
        subnet. Do not enable an Internet gateway on this subnet.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="10.70.0.0/24" label="EMCOMM NPR subnet" />
        <Stat value="0" label="Internet / WAN uplinks" />
        <Stat value="16 kbps" label="Murmur bandwidth cap" />
        <Stat value="8 IPs" label="Client pool size" />
      </Grid>

      <Stack gap={10}>
        <H2>0. Air-gap lock-down (all sites)</H2>
        <Table
          headers={["Control", "Setting", "Verify"]}
          rowTone={["danger", "danger", "success", "success", "warning"]}
          rows={[
            [
              "Default route",
              "def_route_active no on NPR; no 0.0.0.0/0 on hosts",
              "ip route / route print shows no public gateway",
            ],
            [
              "DNS",
              "DNS_active no; no 8.8.8.8 / 9.9.9.9 / ISP DNS",
              "nslookup of public names fails; .mesh names work via hosts",
            ],
            [
              "Physical WAN",
              "No Ethernet to ISP/firewall WAN; disable cellular modems",
              "Unplug test: Mumble + MeshChat still work site-to-site",
            ],
            [
              "Apps",
              "Local Murmur + MeshChat only; no cloud accounts",
              "Clients point only at 10.70.0.10 / .11 / replicas",
            ],
            [
              "Provisioning",
              "Images and packages pre-loaded before incident",
              "Can rebuild a Pi with no Internet reachability",
            ],
          ]}
          striped
        />
      </Stack>

      {/* —— IP MAP —— */}
      <Stack gap={10}>
        <H2>1. IP address map</H2>
        <Text tone="secondary">
          Working plan for one NPR radio network ID. Hosts on the EOC switch use
          static addresses outside the NPR client lease pool. Hospital endpoints
          take DHCP from each client modem after RF connect.
        </Text>

        <Table
          headers={["Address / range", "Role", "Notes"]}
          rows={[
            ["10.70.0.0/24", "Entire NPR EMCOMM net", "Netmask 255.255.255.0"],
            ["10.70.0.1", "Optional EOC L3 gateway", "Only if you need inter-VLAN later; else unused"],
            ["10.70.0.10", "Murmur (Mumble) server", "EOC Pi · static · UDP 64738"],
            ["10.70.0.11", "MeshChat — EOC", "EOC Pi · HTTP · zone CountyEOCMeshChat"],
            ["10.70.0.12", "EOC ops jump / DNS hosts file publisher", "Optional small Pi"],
            ["10.70.0.20–29", "EOC wired ops PCs / SIP-less laptops", "Static or local DHCP — not NPR pool"],
            ["10.70.0.250", "modem_IP (all modems after link)", "Telnet locally only; set on Master"],
            ["10.70.0.200", "IP_begin (first client lease)", "Master master_IP_size allocates from here"],
            ["10.70.0.200–207", "NPR client IP pool (size 8)", "Covers 2 hospitals × ~3 hosts each + spare"],
            ["10.70.0.200–202", "Reserved intent: Hospital A", "MeshChat Pi, ops PC, spare"],
            ["10.70.0.203–205", "Reserved intent: Hospital B", "MeshChat Pi, ops PC, spare"],
            ["10.70.0.206–207", "Spare / exercise kit", "Portable client or test laptop"],
          ]}
          striped
        />

        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Master NPR IP parameters</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>
                  <Code>is_master yes</Code>
                </Text>
                <Text>
                  <Code>modem_IP 10.70.0.250</Code>
                </Text>
                <Text>
                  <Code>netmask 255.255.255.0</Code>
                </Text>
                <Text>
                  <Code>IP_begin 10.70.0.200</Code>
                </Text>
                <Text>
                  <Code>master_IP_size 8</Code>
                </Text>
                <Text>
                  <Code>def_route_active no</Code>
                </Text>
                <Text>
                  <Code>DNS_active no</Code>
                </Text>
                <Text tone="secondary">
                  Keep EOC switch DHCP (if any) in 10.70.0.20–29 only — never
                  overlap 200–207.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Client NPR IP parameters</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>
                  <Code>is_master no</Code>
                </Text>
                <Text>
                  <Code>DHCP_active yes</Code>
                </Text>
                <Text>
                  <Code>client_req_size 3</Code> (each hospital)
                </Text>
                <Text>
                  Match Master: frequency, modulation, radio_netw_ID
                </Text>
                <Text tone="secondary">
                  Pre-link modem_IP/IP_begin on clients are temporary; Master
                  overwrites after RF association. Request only as many IPs as
                  you need.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>

        <Card>
          <CardHeader>Name map (hosts file / local DNS)</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text>
                <Code>10.70.0.10 mumble.eoc.mesh</Code>
              </Text>
              <Text>
                <Code>10.70.0.11 meshchat.eoc.mesh</Code>
              </Text>
              <Text>
                <Code>10.70.0.200 meshchat.ha.mesh</Code>{" "}
                <Text tone="tertiary">(after A’s MeshChat Pi gets .200)</Text>
              </Text>
              <Text>
                <Code>10.70.0.203 meshchat.hb.mesh</Code>{" "}
                <Text tone="tertiary">(after B’s MeshChat Pi gets .203)</Text>
              </Text>
              <Text tone="secondary">
                Prefer DHCP reservations / static client leases once you confirm
                which IP each hospital Pi receives, then pin MeshChat peer URLs.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      {/* —— RF SHARED PARAMS —— */}
      <Stack gap={10}>
        <H2>2. Shared RF parameters (all three modems)</H2>
        <Table
          headers={["Parameter", "Value", "Why"]}
          rows={[
            ["frequency", "TBD — coordinated 70 cm digital channel", "Local band plan / coordinator"],
            ["modulation", "20", "US-legal ~100 kHz / ~65 kbps usable"],
            ["radio_netw_ID", "e.g. 42", "Must match Master+clients (like net ID)"],
            ["RF_power", "Start low; raise only as needed", "Avoid splatter; Part 97 ERP"],
            ["radio_on_at_start", "yes", "Faster recovery after power events"],
            ["callsign", "Unique per modem (EOC/M, HA/C, HB/C)", "ID + troubleshooting"],
          ]}
          striped
        />
        <Callout tone="info" title="Latency expectation">
          Bench NPR RTT is often ~150–250 ms. Mumble remains usable; avoid
          chatty background apps and large MeshChat file drops during voice.
        </Callout>
      </Stack>

      {/* —— MURMUR —— */}
      <Stack gap={10}>
        <H2>3. Murmur configuration caps</H2>
        <Text tone="secondary">
          Host Murmur only at EOC (<Code>10.70.0.10</Code>). Clients at hospitals
          point to <Code>mumble.eoc.mesh</Code> or the raw IP.
        </Text>

        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>murmur.ini (essential)</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>
                  <Code>host=10.70.0.10</Code>
                </Text>
                <Text>
                  <Code>port=64738</Code>
                </Text>
                <Text>
                  <Code>bandwidth=16000</Code>
                </Text>
                <Text tone="tertiary">bytes/sec per user — hard cap</Text>
                <Text>
                  <Code>opusthreshold=0</Code>
                </Text>
                <Text tone="tertiary">prefer Opus always</Text>
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
                  <Code>enablecertrequired=false</Code>
                </Text>
                <Text tone="tertiary">offline mesh; use server password instead</Text>
                <Text>
                  <Code>serverpassword=CHANGEME</Code>
                </Text>
                <Text>
                  <Code>bonjour=false</Code>
                </Text>
                <Text tone="tertiary">Leave default username regex unless you need tighter IDs</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Client policy (SOP)</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>Audio: Opus, quality set to lowest usable</Text>
                <Text>Transmit: Push-to-talk only (no voice activity)</Text>
                <Text>Disable: overlay, plugin RSS, image paste</Text>
                <Text>Channels: Command (talk) · Observing (listen-only ACL)</Text>
                <Text>Max expected: 1 talker + several listeners</Text>
                <Text>Long traffic → MeshChat, not Mumble paste</Text>
                <Text tone="secondary">
                  If RF is marginal, drop client quality further before raising
                  NPR power.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>

        <Table
          headers={["Knob", "Recommended", "If congested"]}
          rowTone={["success", "warning", "warning"]}
          rows={[
            ["bandwidth=", "16000", "12000 or 8000"],
            ["Simultaneous talkers", "1 (net control)", "Mute all but IC / NCS"],
            ["MeshChat file uploads", "Defer during voice nets", "Pause Murmur net, then transfer"],
          ]}
          striped
        />
      </Stack>

      {/* —— MESHCHAT —— */}
      <Stack gap={10}>
        <H2>4. MeshChat pins</H2>
        <Table
          headers={["Site", "Host IP (target)", "Service"]}
          rows={[
            ["EOC", "10.70.0.11", "Primary MeshChat · zone CountyEOCMeshChat"],
            ["Hospital A", "First DHCP in A block (aim .200)", "Replica · same zone/service name"],
            ["Hospital B", "First DHCP in B block (aim .203)", "Replica · same zone/service name"],
          ]}
          striped
        />
        <Text tone="secondary">
          All three must advertise the same MeshChat service/zone name so
          daemons discover each other over the NPR IP LAN. Confirm sync with a
          test message from each site before declaring operational.
        </Text>
      </Stack>

      {/* —— CHECKLISTS —— */}
      <Stack gap={10}>
        <H2>5. Site checklists</H2>

        <Card>
          <CardHeader trailing={<Pill tone="info">Master</Pill>}>EOC — NPR Master</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <H3 style={{ margin: 0 }}>Pre-RF / bench</H3>
              <Stack gap={4}>
                <Text>□ Flash/configure NPR as Master; unique callsign (e.g. W1EOC/M)</Text>
                <Text>□ Set frequency, modulation 20, radio_netw_ID, RF_power low</Text>
                <Text>□ Set modem_IP 10.70.0.250, IP_begin 10.70.0.200, master_IP_size 8</Text>
                <Text>□ def_route_active no · DNS_active no</Text>
                <Text>□ Ethernet Master → EOC switch; static .10 Murmur, .11 MeshChat</Text>
                <Text>□ Verify local ping Master LAN ↔ Murmur with RF off</Text>
              </Stack>
              <Divider />
              <H3 style={{ margin: 0 }}>On air</H3>
              <Stack gap={4}>
                <Text>□ Antenna / feedline checked; SWR acceptable on 70 cm</Text>
                <Text>□ radio_on; confirm Master status in modem console</Text>
                <Text>□ Associate Hospital A client; note leased IPs</Text>
                <Text>□ Associate Hospital B client; note leased IPs</Text>
                <Text>□ Ping 10.70.0.10 from each hospital PC</Text>
                <Text>□ Mumble login from A and B; PTT test under bandwidth cap</Text>
                <Text>□ MeshChat message EOC→A→B; confirm all DBs show it</Text>
                <Text>□ Document final IP assignments on the site runbook</Text>
              </Stack>
              <Divider />
              <H3 style={{ margin: 0 }}>Hardening (air-gap)</H3>
              <Stack gap={4}>
                <Text>□ UPS on Master, switch, Murmur, MeshChat</Text>
                <Text>□ Physically disconnect ISP/WAN; no cellular tether on any ops PC</Text>
                <Text>□ Confirm no default route and DNS_active no on Master</Text>
                <Text>□ Disable Wi‑Fi bridging from mesh LAN to public nets</Text>
                <Text>□ Spare modem pre-configured as Master cold spare (offline image)</Text>
                <Text>□ Printed IP map + murmur password in EOC GO kit</Text>
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill>Client</Pill>}>Hospital A</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>□ NPR Client; callsign e.g. W1EOC/HA</Text>
                <Text>□ Same frequency, mod 20, radio_netw_ID as Master</Text>
                <Text>□ is_master no · DHCP_active yes · client_req_size 3</Text>
                <Text>□ Antenna aimed/clear toward EOC</Text>
                <Text>□ Ethernet: MeshChat Pi + ops PC only</Text>
                <Text>□ After link: record leased IPs (.200–202 intent)</Text>
                <Text>□ Pin MeshChat zone = CountyEOCMeshChat</Text>
                <Text>□ Mumble → 10.70.0.10 · PTT · low Opus quality</Text>
                <Text>□ Air-gap from hospital clinical LAN</Text>
                <Text>□ UPS; written MoU; spare HT plan if NPR fails</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill>Client</Pill>}>Hospital B</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text>□ NPR Client; callsign e.g. W1EOC/HB</Text>
                <Text>□ Same frequency, mod 20, radio_netw_ID as Master</Text>
                <Text>□ is_master no · DHCP_active yes · client_req_size 3</Text>
                <Text>□ Antenna aimed/clear toward EOC</Text>
                <Text>□ Ethernet: MeshChat Pi + ops PC only</Text>
                <Text>□ After link: record leased IPs (.203–205 intent)</Text>
                <Text>□ Pin MeshChat zone = CountyEOCMeshChat</Text>
                <Text>□ Mumble → 10.70.0.10 · PTT · low Opus quality</Text>
                <Text>□ Air-gap from hospital clinical LAN</Text>
                <Text>□ UPS; written MoU; spare HT plan if NPR fails</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      {/* —— ACCEPTANCE —— */}
      <Stack gap={10}>
        <H2>6. Acceptance test (black-sky)</H2>
        <Table
          headers={["#", "Test", "Pass criteria"]}
          rows={[
            ["1", "RF association", "Both clients show connected to Master"],
            ["2", "IP reachability", "Hospital PCs ping 10.70.0.10 and .11"],
            ["3", "Mumble voice", "One PTT talker intelligible at both hospitals"],
            ["4", "Congestion check", "Second talker muted; NCS retains control"],
            ["5", "MeshChat sync", "Message from each site appears on all three"],
            ["6", "Link drop recover", "Kill client power 2 min; resync MeshChat + Mumble reconnect"],
            [
              "7",
              "Air-gap / no Internet",
              "WAN unplugged; no default route; public DNS fails; Mumble+MeshChat still pass 3–6",
            ],
            [
              "8",
              "Cloud dependency probe",
              "No process waiting on external NTP/ACME/update hosts; clocks set locally",
            ],
          ]}
          striped
        />
      </Stack>

      <Callout tone="success" title="Ready to configure (offline)">
        Use subnet 10.70.0.0/24, Master pool 10.70.0.200–207, Murmur at
        10.70.0.10 with bandwidth=16000, and identical MeshChat zones at all
        sites. Build and test with the Internet disconnected. Complete EOC
        Master checklist first, then bring hospitals up one at a time while
        logging real DHCP leases into the runbook.
      </Callout>

      <Text tone="tertiary" style={{ fontSize: 12 }}>
        Architecture context:{" "}
        emcomm-70cm-npr-ip.canvas.tsx · NPR addressing per Advanced User Guide
        (single subnet, Master IP pool, client DHCP). Frequency and callsigns
        are placeholders pending coordination.
      </Text>
    </Stack>
  );
}
