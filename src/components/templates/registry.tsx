import type { ReactNode } from 'react'
import type { CreativeContent, TemplateId } from '../../types'
import { CenteredCollection } from './CenteredCollection'
import { CurveShowcase } from './CurveShowcase'
import { ArchGallery } from './extras/ArchGallery'
import { DiagonalCut } from './extras/DiagonalCut'
import { FilmStrip } from './extras/FilmStrip'
import { MagazineCover } from './extras/MagazineCover'
import { MosaicBurst } from './extras/MosaicBurst'
import { NoirSpotlight } from './extras/NoirSpotlight'
import { OrbitCircle } from './extras/OrbitCircle'
import { PolaroidMemory } from './extras/PolaroidMemory'
import { TicketStub } from './extras/TicketStub'
import { TypeStorm } from './extras/TypeStorm'
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
    case 'split-editorial':
    default:
      return <SplitEditorial content={content} />
  }
}
