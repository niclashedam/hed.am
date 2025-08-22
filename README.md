# hed.am

Source code for **hed.am**, a statically generated website built with [Eleventy](https://www.11ty.dev/) and styled with [Tailwind CSS](https://tailwindcss.com/). The project includes automated formatting, spelling, and accessibility checks to keep the content high quality. You can view the live site at [https://hed.am](https://hed.am).

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later.
- [npm](https://www.npmjs.com/) (comes with Node).

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Available scripts

All project tasks are run through npm scripts:

| Command                  | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `npm run serve`          | Start a local development server with live reload.               |
| `npm run build`          | Generate the static site into the `public/` directory.           |
| `npm run format`         | Format source files using Prettier.                              |
| `npm run check:format`   | Verify that files are formatted correctly.                       |
| `npm run check:spelling` | Build and spell-check generated HTML using cspell.               |
| `npm run check:a11y`     | Build and audit generated HTML for accessibility using axe-core. |

## Project structure

```
.
├── eleventy/            # Eleventy configuration modules
├── public/              # Generated output (ignored from version control)
├── scripts/             # Utility scripts (e.g., accessibility audit)
├── src/                 # Site content and templates
└── tailwind.config.js   # Tailwind CSS configuration
```

## Development workflow

1. Run `npm run serve` to start a dev server.
2. Edit files in `src/`; changes will automatically rebuild.
3. When ready for production, run `npm run build` and deploy the `public/` directory.

## Quality checks

Before committing, ensure all checks pass:

```bash
npm run check:format
npm run check:spelling
npm run check:a11y
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or problems you find. Run all quality checks before submitting changes.

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
