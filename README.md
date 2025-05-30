# CrawJUD - RPA for Judicial Processes

[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json&style=for-the-badge)](https://github.com/astral-sh/ruff)
[![License MIT](https://img.shields.io/badge/licence-MIT-blue.svg?style=for-the-badge)](./LICENSE)
[![Python 3.13](https://shields.io/badge/python-3.13%20-green?style=for-the-badge&logo=python)](https://python.org/downloads/release/python-3132/)
[![Pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?style=for-the-badge&logo=pre-commit)](https://github.com/pre-commit/pre-commit)

[![Quart](https://img.shields.io/badge/Quart-8A2BE2?style=for-the-badge)](https://quart.palletsprojects.com/en/stable/)
[![Celery](https://img.shields.io/badge/celery-%23a9cc54.svg?style=for-the-badge&logo=celery&logoColor=ddf4a4)](https://docs.celeryq.dev/en/stable/)
[![Poetry](https://img.shields.io/badge/Poetry-430098?style=for-the-badge&logo=python&logoColor=white)](https://python-poetry.org/docs/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Description

CrawJUD is a suite of automation robots designed to streamline and enhance judicial processes. Built with Quart and Celery, CrawJUD provides a robust async-first architecture for automating routine tasks across multiple Brazilian judicial systems including Projudi, PJe, eSaj, Elaw, and Caixa.

_Total lines: `17392`_
_Last count: `22/02/2025 11:00 (América\São Paulo)`_

## Table of Contents

> Portuguese (Br) version available [here](./doc/Readme-pt-br.md)

- [Project Structure](#project-structure)
- [Dependencies](./doc/dependencies.md)
- [Installation](#installation)
- [Usage](#usage)
- [Debugging](#debugging)
- [Contributing](#contributing)
- [Project Pull Request Guidelines](./PR_GUIDELINES.md)
- [License](#license)

## Project Structure

- [`crawjud/`](./crawjud/): Core package containing all bot functionality

  - [`bot/`](./crawjud/bot/): Bot implementations and automation scripts
    - [`scripts/`](./crawjud/bot/scripts/): Individual bot implementations for each system
      - `Projudi.py`: Projudi system automation
      - `PJe.py`: PJe system automation
      - `Esaj.py`: eSaj system automation
      - `Elaw.py`: Elaw system automation
      - `Caixa.py`: Caixa system automation
      - `Calculadoras.py`: Calculator utilities

- [`app/`](./app/): Web application and API components
  - [`models/`](./app/models/): Database models and SQL bindings
  - [`Forms/`](./app/Forms/): Form definitions and validation
  - [`routes/`](./app/routes/): API endpoints and route handlers

> For more details, check the [app structure documentation](./doc/app_structure.md)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone [Repository URL](./)
   cd CrawJUD-Bots
   ```

2. **Set up the environment variables:**

   Create a `.env` file based on the provided [.env.vault](http://_vscodecontentref_/0) template.

3. **Install dependencies using Poetry:**

   ```bash
   poetry install
   ```

4. **Run the application:**

   ```bash
   poetry run python -m crawjud
   ```

## Usage

Provide instructions and examples on how to use the application.

## Debugging

### Requirements:

- **Cloudflare Tunnel (Required):** [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

  > If you have any doubts on how to set up a Cloudflare Tunnel, watch [This Video](https://www.youtube.com/watch?v=Y0LTZZCyPko&t=123s)

## Contributing

Unfortunately we are not yet accepting contributions

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
