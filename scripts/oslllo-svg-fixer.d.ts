/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

declare module 'oslllo-svg-fixer' {
  export interface SVGFixerOptions {
    showProgressBar?: boolean
    traceResolution?: number
  }

  export default function SVGFixer(
    inputDir: string,
    outputDir: string,
    options?: SVGFixerOptions,
  ): {
    fix: () => Promise<void>
  }
}
