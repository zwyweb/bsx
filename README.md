# bsx

Browser-side reader for the **BSX asset bundle format**, compiled to WebAssembly.  
Drop in `pkg/` and open `demo.html` — no build step, no server required.

---

## What's in this repo

| Path | Description |
|---|---|
| `pkg/bsx_wasm.js` | ES module glue |
| `pkg/bsx_wasm_bg.wasm` | WASM binary |
| `pkg/bsx_wasm.d.ts` | TypeScript declarations |
| `demo.html` | HTML Demo |

---

## Quick start

```js
import init, { BsxReader } from './pkg/bsx.js';

await init();

const bytes = new Uint8Array(await file.arrayBuffer());
const bsx   = BsxReader.from_bytes(bytes);

if (!bsx) {
  console.error(BsxReader.open_error(bytes));
} else {
  console.log(bsx.list());       // string[] — all asset paths
  console.log(bsx.categories()); // string[] — bmap categories
  console.log(bsx.banks());      // string[] — audio bank names
  bsx.free();
}
```

> **`init()` must resolve before any `BsxReader` call.**  
> Subsequent calls to `init()` are no-ops — safe to call once at app start.

---

## API

### `BsxReader.from_bytes(data: Uint8Array): BsxReader | undefined`

Parses a `.bsx` bundle from raw bytes. Returns `undefined` on any error (bad magic, CRC mismatch, etc.).  
Call `BsxReader.open_error(data)` with the same bytes to get a human-readable error string.

---

### Listing

```ts
bsx.list(): string[]                        // all asset + audio paths
bsx.categories(): string[]                  // bmap category names
bsx.list_category(category: string): string[] // aliases in a category
bsx.banks(): string[]                       // audio bank names
```

---

### Existence

```ts
bsx.has(path: string): boolean
```

---

### Asset access

```ts
// Raw bytes by path. Returns undefined if not found.
bsx.get(path: string): Uint8Array | undefined

// Raw bytes via bmap alias.
bsx.get_alias(category: string, alias: string): Uint8Array | undefined

// Audio stream re-wrapped as Ogg Opus.
// Path: "bankname/streamname" or "bankname/streamname.ogg"
bsx.get_audio(path: string): Uint8Array | undefined
```

> **Godot 3 note:** Godot 3 only plays Vorbis inside Ogg containers.  
> If the BSX was packed with Opus audio, decode it via the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) instead.

---

### String pool

The bundle may contain an encrypted string pool. Unlock it with a key before use.

```ts
bsx.unlock_strings(key: string): boolean    // decrypt pool, returns true on success
bsx.string_count(): number                  // 0 if not unlocked
bsx.string(index: number): string | undefined // O(1) lookup by index
```

---

### Cleanup

```ts
bsx.free() // or: using (bsx = BsxReader.from_bytes(bytes)) { … }
```

`BsxReader` implements `[Symbol.dispose]`, so it works with the `using` keyword in environments that support explicit resource management.

---

## demo.html

A self-contained bundle inspector — open it directly in a browser (no server needed).

- Drag & drop any `.bsx` file
- Inspect asset list, bmap categories, audio banks
- Preview images, play audio streams
- String pool unlock UI

---

## Usage example

```js
import init, { BsxReader } from './pkg/bsx.js';
await init();

const res  = await fetch('assets.bsx');
const bsx  = BsxReader.from_bytes(new Uint8Array(await res.arrayBuffer()));

const png  = bsx.get('ui/logo.png');          // Uint8Array
const blob = new Blob([png], { type: 'image/png' });
document.querySelector('img').src = URL.createObjectURL(blob);

bsx.free();
``
