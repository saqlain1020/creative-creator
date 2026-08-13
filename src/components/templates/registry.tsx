import type { ReactNode } from 'react'
import type { CreativeContent, TemplateId } from '../../types'
import { CenteredCollection } from './CenteredCollection'
import { CurveShowcase } from './CurveShowcase'
import { ArchGallery } from './extras/ArchGallery'
import { BillboardNight } from './extras/BillboardNight'
import { BrutalBlock } from './extras/BrutalBlock'
import { Constellation } from './extras/Constellation'
import { DiagonalCut } from './extras/DiagonalCut'
import { FilmStrip } from './extras/FilmStrip'
import { HalftonePop } from './extras/HalftonePop'
import { LogoWatermark } from './extras/LogoWatermark'
import { LunarPhase } from './extras/LunarPhase'
import { MagazineCover } from './extras/MagazineCover'
import { MeteorShower } from './extras/MeteorShower'
import { MosaicBurst } from './extras/MosaicBurst'
import { NoirSpotlight } from './extras/NoirSpotlight'
import { OrbitCircle } from './extras/OrbitCircle'
import { PassportStamp } from './extras/PassportStamp'
import { PolaroidMemory } from './extras/PolaroidMemory'
import { ScriptOverlay } from './extras/ScriptOverlay'
import { SilkRibbon } from './extras/SilkRibbon'
import { TarotArcana } from './extras/TarotArcana'
import { TicketStub } from './extras/TicketStub'
import { TypeStorm } from './extras/TypeStorm'
import { VinylSleeve } from './extras/VinylSleeve'
import { WatercolorWash } from './extras/WatercolorWash'
import { ZenInk } from './extras/ZenInk'
import { ZodiacWheel } from './extras/ZodiacWheel'
import { PeachEditorial } from './PeachEditorial'
import { SplitEditorial } from './SplitEditorial'

export function renderTemplate(
  templateId: TemplateId,
  content: CreativeContent,
): ReactNode {
  switch (templateId) {
    case 'centered-collection':
      return <CenteredCollection content={content} />
    case 'peach-editorial':
      return <PeachEditorial content={content} />
    case 'curve-showcase':
      return <CurveShowcase content={content} />
    case 'noir-spotlight':
      return <NoirSpotlight content={content} />
    case 'diagonal-cut':
      return <DiagonalCut content={content} />
    case 'magazine-cover':
      return <MagazineCover content={content} />
    case 'orbit-circle':
      return <OrbitCircle content={content} />
    case 'arch-gallery':
      return <ArchGallery content={content} />
    case 'type-storm':
      return <TypeStorm content={content} />
    case 'ticket-stub':
      return <TicketStub content={content} />
    case 'polaroid-memory':
      return <PolaroidMemory content={content} />
    case 'film-strip':
      return <FilmStrip content={content} />
    case 'mosaic-burst':
      return <MosaicBurst content={content} />
    case 'vinyl-sleeve':
      return <VinylSleeve content={content} />
    case 'constellation':
      return <Constellation content={content} />
    case 'tarot-arcana':
      return <TarotArcana content={content} />
    case 'brutal-block':
      return <BrutalBlock content={content} />
    case 'silk-ribbon':
      return <SilkRibbon content={content} />
    case 'halftone-pop':
      return <HalftonePop content={content} />
    case 'zen-ink':
      return <ZenInk content={content} />
    case 'passport-stamp':
      return <PassportStamp content={content} />
    case 'billboard-night':
      return <BillboardNight content={content} />
    case 'watercolor-wash':
      return <WatercolorWash content={content} />
    case 'lunar-phase':
      return <LunarPhase content={content} />
    case 'zodiac-wheel':
      return <ZodiacWheel content={content} />
    case 'meteor-shower':
      return <MeteorShower content={content} />
    case 'logo-watermark':
      return <LogoWatermark content={content} />
    case 'script-overlay':
      return <ScriptOverlay content={content} />
    case 'split-editorial':
    default:
      return <SplitEditorial content={content} />
  }
}
