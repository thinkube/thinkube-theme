# thinkube-theme

The colour themes and the product icon theme of the Thinkube IDE.

## What it does

- Adds two colour themes: **Thinkube Light** and **Thinkube Dark**
  (`themes/thinkube-light.json`, `themes/thinkube-dark.json`). Each sets
  workbench colours and syntax token colours, with semantic highlighting on.
- Adds one product icon theme: **Thinkube Icons (Lucide)**, id
  `thinkube-icons` (`product-icons/thinkube-icons.json` and
  `product-icons/thinkube-icons.woff`). It replaces the workbench icons with
  Lucide icons.
- It has no code that runs in the editor. It only contributes themes.

## How it reaches a user

It is built into every code-server workspace. The code-server playbook of
[Thinkube](https://github.com/thinkube/thinkube)
(`ansible/40_thinkube/core/code-server/15_configure_environment.yaml`)
clones this repository, runs `scripts/deploy.sh --no-bump`, and code-server
installs the extension. It is not installed on its own.

## Contents

- **Color themes:** Thinkube Light and Thinkube Dark.
- **Product icon theme:** Thinkube Icons (Lucide). Select it with
  "Preferences: Product Icon Theme", or set
  `"workbench.productIconTheme": "thinkube-icons"`.

## Working on it

### Rebuilding the product icons

The built font is committed in `product-icons/`, so installing the theme needs
no build step. To change an icon, edit `scripts/thinkube-icons.ts`, then run:

```bash
npm install
npm run build:icons
```

`scripts/lucide-set.ts` is the upstream Lucide mapping. Keep it unchanged so it
can be replaced by a newer upstream copy.

### Installing a change into your workspace

`scripts/deploy.sh` (also `npm run deploy`) builds the extension and installs
it into the local code-server. It needs the Node major version named in
`.nvmrc`. Without options it also raises the patch version, commits and
pushes. With `--no-bump` it installs the version in `package.json`. The
script is the same file in every Thinkube extension repository. The playbook
refuses to install a repository whose copy differs from the master copy in
the Thinkube repository.

## License

Apache License 2.0 - See [LICENSE](LICENSE)

The product icons include third-party material under the MIT and ISC licenses.
See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

## Copyright

Copyright Alejandro Martínez Corriá and the Thinkube contributors
