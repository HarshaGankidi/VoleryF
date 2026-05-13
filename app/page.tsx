import { AnnounceBar } from '@/components/layout/AnnounceBar';
import { Nav } from '@/components/layout/Nav';
import { Arrival } from '@/components/sections/Arrival';
import { EditorialBulletin } from '@/components/sections/EditorialBulletin';
import { Specimens } from '@/components/sections/Specimens';
import { LayerStack } from '@/components/sections/LayerStack';
import { Decision } from '@/components/sections/Decision';
import { QuietLedger } from '@/components/sections/QuietLedger';
import { Voices } from '@/components/sections/Voices';
import { Telegram } from '@/components/sections/Telegram';
import { Choice } from '@/components/sections/Choice';
import { PlanAhead } from '@/components/sections/PlanAhead';
import { Invitation } from '@/components/sections/Invitation';

export default function HomePage() {
  return (
    <main>
      <AnnounceBar />
      <Nav />
      <Arrival />
      <EditorialBulletin />
      <Specimens />
      <LayerStack />
      <Decision />
      <QuietLedger />
      <Voices />
      <Telegram />
      <Choice />
      <PlanAhead />
      <Invitation />
    </main>
  );
}
