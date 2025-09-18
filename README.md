# hed.am

Source code for **hed.am**, a statically generated website built with [Eleventy](https://www.11ty.dev/) and styled with [Tailwind CSS](https://tailwindcss.com/). The project includes automated formatting, spelling, and accessibility checks to keep the content high quality. You can view the live site at [https://hed.am](https://hed.am).

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later.
- [yarn](https://yarnpkg.com/)

## Installation

Clone the repository and install dependencies:

```bash
yarn install
```

## Available scripts

All project tasks are run through Yarn scripts:

| Command               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `yarn serve`          | Start a local development server with live reload.               |
| `yarn build`          | Generate the static site into the `public/` directory.           |
| `yarn format`         | Format source files using Prettier.                              |
| `yarn clean`          | Remove generated files and start fresh.                          |
| `yarn check:format`   | Verify that files are formatted correctly.                       |
| `yarn check:spelling` | Build and spell-check generated HTML using cspell.               |
| `yarn check:a11y`     | Build and audit generated HTML for accessibility using axe-core. |

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

1. Run `yarn serve` to start a dev server.
2. Edit files in `src/`; changes will automatically rebuild.
3. When ready for production, run `yarn build` and deploy the `public/` directory.

## Quality checks

Before committing, ensure all checks pass:

```bash
yarn check:format
yarn check:spelling
yarn check:a11y
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or problems you find. Run all quality checks before submitting changes.

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
