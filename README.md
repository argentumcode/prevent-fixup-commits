# prevent-fixup-commits

GitHub Action to prevent merging fixup commits

## Usage

```yaml
name: Prevent fixup commits

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  prevent-fixup-commits:
    name: Prevent Fixup Commits
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4

      - name: Prevent fixup commits
        uses: argentumcode/prevent-fixup-commits@v1.0.0
```
