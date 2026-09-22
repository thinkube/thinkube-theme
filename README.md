# ⚠️ Under Development - Not Ready for Use

## Contents

- **Color themes:** Thinkube Light and Thinkube Dark.
- **Product icon theme:** Thinkube Icons (Lucide). Select it with
  "Preferences: Product Icon Theme", or set
  `"workbench.productIconTheme": "thinkube-icons"`.

## Rebuilding the product icons

The built font is committed in `product-icons/`, so installing the theme needs
no build step. To change an icon, edit `scripts/thinkube-icons.ts`, then run:

```bash
npm install
npm run build:icons
```

`scripts/lucide-set.ts` is the upstream Lucide mapping. Keep it unchanged so it
can be replaced by a newer upstream copy.

## License

Apache License 2.0 - See [LICENSE](LICENSE)

The product icons include third-party material under the MIT and ISC licenses.
See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

## Copyright

Copyright Alejandro Martínez Corriá and the Thinkube contributors
