# Todos

## Fixes

- [ ] Snippet card: move action buttons to right of title, to tighten up card.

- [ ] Put override styles inside starlightpage head and all other in global styles with @scope. Replace `<style is:inline>` to `<style is:global>` to prevent FOUC.
  - For sure:
    - [src/pages/cheatsheets/index.astro](src/pages/cheatsheets/index.astro)
    - [src/pages/snippets/index.astro](src/pages/snippets/index.astro)
    - [src/pages/snippets/[...lang]/[id].astro](src/pages/snippets/[...lang]/[id].astro)
  - Verify may not need it:
    - [src/components/guides/open-webui.astro](src/components/guides/open-webui.astro)
    - [src/components/guides/reference-links.astro](src/components/guides/reference-links.astro)
    - [src/components/snippet/fragment-code.astro](src/components/snippet/fragment-code.astro)

```ts
const headMeta = generateHeadMeta({
  pageTitle: "Settings",
  pageDescription,
  pageUrl,
});
```

```astro
<StarlightPage
  frontmatter={{
    head: [
      ...headMeta,
      {
        tag: "style",
        content: `
          .content-panel {
            padding-inline: 2rem;
          }
          .sl-markdown-content :not(a, strong, em, del, span, input, code, br) + :not(a, strong, em, del, span, input, code, br, :where(.not-content *)) {
            margin-top: 0;
          }
        `,
      },
    ]
  }}>
  <!-- only necessary if other styles that are not overrides -->
  <div class="settings-page">
  ...
  </div>
</StarlightPage>
```

```html
<!-- Remove style overrides -->
<!-- If other CSS exist that isnt override change to <style is:global> -->
<!-- And use @scope (.settings-page) { -->
<style is:inline>
  /* ==== Overrides ==== */

  .content-panel {
    padding-inline: 2rem;
  }

  .sl-markdown-content
    :not(a, strong, em, del, span, input, code, br)
    + :not(a, strong, em, del, span, input, code, br, :where(.not-content *)) {
    margin-top: 0;
  }
</style>
```

---

## Settings

- [ ] Add tabs for package manager in guides. e.g. apt, dnf, homebrew, macports, pacman

---

## Docs

### Linux

- [ ] Update security page with more content:
  - [ ] AppArmor / SELinux: Could add a section recommending enabling AppArmor profiles.
  - [ ] Automatic log rotation: logrotate for SSH, Fail2Ban logs.
  - [ ] Regular audit tools: Recommend lynis or chkrootkit for periodic audits.
  - [ ] Strong password policy: Could include libpam-pwquality or PAM rules for local accounts.
  - [ ] Kernel / sysctl hardening: Add /etc/sysctl.d/ tweaks (disable IP forwarding, limit ICMP, protect against SYN floods, etc.).
- [ ] Move tailscale to it’s own page.
- [ ] Move Adguard + NPM to docker apps.

### macOS

- [ ] Update to use stash instead of installing all of those packages and global configs.

### Windows

- [ ] Add setup
- [ ](winutil)[https://github.com/christitustech/winutil] `irm https://christitus.com/win | iex`

---

### Docker

- Docker apps
  - [ ] appwrite
  - [ ] archivebox
  - [ ] duplicati
  - [ ] excalidraw
  - [ ] filecloud
  - [ ] headscale
  - [ ] kasm
  - [ ] postal
  - [ ] restic and healthchecks https://nerdyarticles.com/backup-strategy-with-restic-and-healthchecks-io/
  - [ ] rustdesk
