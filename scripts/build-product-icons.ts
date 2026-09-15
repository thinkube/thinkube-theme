/**
 * Builds the Thinkube product icon theme font from Lucide SVG icons.
 *
 * Based on scripts/build.ts from https://github.com/ZTL-UwU/vscode-icons-lucide
 * (MIT, Copyright (c) 2025 Tony Zhang). See THIRD-PARTY-NOTICES.md.
 *
 * Run with: npm install && npm run build:icons
 * Output: product-icons/thinkube-icons.{json,woff}
 */
import { createReadStream, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import SVGFixer from 'oslllo-svg-fixer'
import svg2ttf from 'svg2ttf'
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont'
import ttf2woff from 'ttf2woff'

import { set } from './lucide-set.ts'
import { thinkubeIcons } from './thinkube-icons.ts'

const FONT_NAME = 'thinkube-icons'
const OUTPUT_DIR = path.resolve('./product-icons')
const TEMP_DIR = path.resolve('./.temp')
const ICONS_DIR = path.resolve('node_modules', 'lucide-static', 'icons')

/** [glyphName, lucideIconName]; glyphName is the VS Code icon ID without the "codicon:" prefix. */
type IconDefinitionPair = [glyphName: string, lucideIconName: string]

const iconDefinitions: Record<string, { fontCharacter: string }> = {}

function prepareDirectories(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  mkdirSync(TEMP_DIR, { recursive: true })
  process.on('exit', () => {
    if (existsSync(TEMP_DIR)) {
      rmSync(TEMP_DIR, { recursive: true })
    }
  })
}

/**
 * Merges the Lucide mapping with the Thinkube changes.
 * An empty mapping falls back to a Lucide icon with the same name as the codicon.
 */
function parseIconMappings(): IconDefinitionPair[] {
  const icons = { ...set.icons, ...thinkubeIcons }
  return Object.entries(icons).map(([iconId, lucideId]) => {
    const glyphName = iconId.replace(/^codicon:/, '')
    const [, lucideIconName] = (lucideId || iconId).split(':')
    return [glyphName, lucideIconName]
  })
}

/** Converts strokes to filled outlines so the SVGs can become font glyphs; drops icons that are missing. */
async function fixSVGs(icons: IconDefinitionPair[]): Promise<IconDefinitionPair[]> {
  console.log('Fixing SVGs...')

  const results = await Promise.all(
    icons.map(async ([glyphName, lucideIconName]): Promise<IconDefinitionPair | null> => {
      const svgPath = path.resolve(ICONS_DIR, `${lucideIconName}.svg`)
      if (!existsSync(svgPath)) {
        console.warn(`Icon not found: ${lucideIconName}, skipping`)
        return null
      }
      await SVGFixer(svgPath, TEMP_DIR, { showProgressBar: false }).fix()
      return [glyphName, lucideIconName]
    }),
  )

  const fixedIcons = results.filter((r): r is IconDefinitionPair => r !== null)
  console.log(`Fixed ${fixedIcons.length} icons`)
  return fixedIcons
}

async function generateSVGFont(fixedIcons: IconDefinitionPair[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontName: FONT_NAME,
      normalize: true,
      fontHeight: 1000,
    })

    const chunks: string[] = []
    fontStream.on('data', (chunk) => chunks.push(chunk.toString()))
    fontStream.on('finish', () => resolve(chunks.join('')))
    fontStream.on('error', reject)

    let unicodeCode = 0xe000

    for (const [glyphName, lucideIconName] of fixedIcons) {
      const glyph = createReadStream(path.resolve(TEMP_DIR, `${lucideIconName}.svg`))

      // @ts-expect-error svgicons2svgfont reads glyph metadata from the stream object
      glyph.metadata = {
        unicode: [String.fromCharCode(unicodeCode)],
        name: glyphName,
      }
      fontStream.write(glyph)

      iconDefinitions[glyphName] = {
        fontCharacter: `\\${unicodeCode.toString(16).toUpperCase()}`,
      }
      unicodeCode++
    }

    fontStream.end()
  })
}

function writeWoff(svgFont: string): void {
  const ttf = svg2ttf(svgFont, {})
  const woff = ttf2woff(ttf.buffer)
  writeFileSync(path.resolve(OUTPUT_DIR, `${FONT_NAME}.woff`), Buffer.from(woff.buffer))
  console.log(`Generated ${FONT_NAME}.woff`)
}

function writeIconThemeJson(): void {
  const iconTheme = {
    fonts: [
      {
        id: FONT_NAME,
        src: [{ path: `./${FONT_NAME}.woff`, format: 'woff' }],
        weight: 'normal',
        style: 'normal',
      },
    ],
    iconDefinitions,
  }
  writeFileSync(path.resolve(OUTPUT_DIR, `${FONT_NAME}.json`), `${JSON.stringify(iconTheme, null, 2)}\n`)
  console.log(`Generated ${FONT_NAME}.json with ${Object.keys(iconDefinitions).length} icon definitions`)
}

async function main(): Promise<void> {
  prepareDirectories()
  const fixedIcons = await fixSVGs(parseIconMappings())
  const svgFont = await generateSVGFont(fixedIcons)
  writeWoff(svgFont)
  writeIconThemeJson()
}

main().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
