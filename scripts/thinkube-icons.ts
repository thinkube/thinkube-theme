/**
 * Thinkube changes applied on top of the Lucide mapping in lucide-set.ts.
 * - key: VS Code icon ID (a codicon ID with the "codicon:" prefix, or a
 *   registered workbench icon ID such as "explorer-view-icon")
 * - value: Lucide icon identifier (e.g. "lucide:folder-tree")
 */
export const thinkubeIcons: Record<string, string> = {
  // Explorer entry in the activity bar; the default "files" glyph is a plain folder.
  'explorer-view-icon': 'lucide:folder-tree',
}
