import {
  ColumnDefWithName,
  ColumnStrategy,
} from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/modules/base/datatable/ui/datatable-header-column-header'
import React from 'react'
import { Button } from '@/components/ui/button'

const FPS = 100
const SPEEDOMETER = 1
const CAT_SIZE = 12
const SPACE = 1
const START_OFFSET = 1
const ASSETS_PATH = '/assets/cat-parade/'
const INSTRUMENTS = [
  'head.gif',
  'drum.gif',
  'guitar.gif',
  'tambourine.gif',
  'flute.gif',
  'flute.gif',
  'flute.gif',
  'xylophone.gif',
  'triangle.gif',
  'tuba.gif',
  'accordion.gif',
  'tambourine.gif',
  'drum.gif',
  'flute.gif',
  'accordion.gif',
  'xylophone.gif',
  'guitar.gif',
  'bassdrum.gif',
]

type CatInstance = {
  element: HTMLDivElement
  position: number
}

class CatParade {
  private catInstances: CatInstance[] = []
  private audio: HTMLAudioElement | null = null
  private running = false
  private catParent: HTMLDivElement

  constructor(
    private catSize: number = CAT_SIZE,
    private speedometer: number = SPEEDOMETER
  ) {
    this.catParent = this.createCatParent()
    document.body.appendChild(this.catParent)
  }

  private createCatParent(): HTMLDivElement {
    const styleTag = document.createElement('style')
    styleTag.innerHTML = `
      .cat-parade {
        position: absolute;
        bottom: 0;
        font-size: 0;
        z-index: 1000;
        width: 100vw;
      }
    `
    document.head.appendChild(styleTag)

    const catParent = document.createElement('div')
    catParent.className = 'cat-parade'
    return catParent
  }

  start() {
    if (!this.running) {
      this.running = true
      this.create()
      this.playSong()
      this.update()
    }
  }

  private async update(): Promise<void> {
    while (this.running) {
      this.move()
      await this.wait(1000 / FPS)
    }
  }

  private move(): void {
    if (!this.audio) return
    const prop =
      (this.audio.currentTime - START_OFFSET) /
      (this.audio.duration - START_OFFSET)
    this.catInstances.forEach((cat) => {
      cat.element.style.left = `${prop * (this.catParent.clientWidth + 100) * this.speedometer}px`
    })
  }

  private playSong(): void {
    this.audio = new Audio(`${ASSETS_PATH}catparade.mp3`)
    this.audio.autoplay = true
    this.audio.onended = () => this.finish()
    this.audio.volume = 0.5
    this.audio.play()
  }

  private create(): void {
    const dom = document.createElement('div')
    let position = -this.catSize / 2

    INSTRUMENTS.forEach((instrument) => {
      const image = document.createElement('img')
      image.src = `${ASSETS_PATH}${instrument}`
      image.style.position = 'absolute'
      image.style.bottom = '0'
      image.style.width = `${this.catSize}vw`
      image.style.maxWidth = `${this.catSize * 2}vh`
      image.style.left = `${position}vw`
      dom.appendChild(image)
      position -= SPACE + this.catSize
    })

    dom.className = 'cat-parade'
    dom.style.left = '-100vw'
    this.catParent.appendChild(dom)
    this.catInstances.push({ element: dom, position: position })
  }

  private wait(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  private finish(): void {
    this.running = false
    this.catInstances.forEach((cat) => this.catParent.removeChild(cat.element))
    this.catInstances = []
  }
}

export default class CatParadeColumn<T> implements ColumnStrategy<T> {
  constructor(
    private catSize?: number,
    private speedometer?: number,
    private column?: Partial<ColumnDef<T>>
  ) {}

  generate(): ColumnDefWithName<T> {
    return {
      id: 'cat-parade',
      name: 'cat-parade',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={'Cat Parade'} />
      ),
      cell: ({ row }) => {
        return (
          <Button
            onClick={() =>
              new CatParade(this.catSize, this.speedometer).start()
            }
          >
            Cat
          </Button>
        )
      },
      ...this.column,
    }
  }
}
