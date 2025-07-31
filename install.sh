if command -v bun >/dev/null 2>&1; then
  echo "bun is already installed"
else
  asdf plugin add bun
  asdf install bun latest
  asdf set -u bun latest
fi

bun install
