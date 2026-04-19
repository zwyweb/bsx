/* tslint:disable */
/* eslint-disable */

export class BsxReader {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Audio bank names.
     */
    banks(): string[];
    /**
     * All bmap category names.
     */
    categories(): string[];
    /**
     * Open a `.bsx` bundle from raw bytes.
     * Returns `null` on any error (bad magic, CRC mismatch, …).
     */
    static from_bytes(data: Uint8Array): BsxReader | undefined;
    /**
     * Get a raw asset by path. Returns `undefined` if not found.
     */
    get(path: string): Uint8Array | undefined;
    /**
     * Get an asset via bmap alias. Returns `undefined` if not found.
     */
    get_alias(category: string, alias: string): Uint8Array | undefined;
    /**
     * Get an audio stream re-wrapped as Ogg Opus.
     * Path format: `"bankname/streamname"` or `"bankname/streamname.ogg"`.
     * Returns `undefined` if not found.
     *
     * Note: Godot 3 only plays Vorbis codec inside Ogg. If your BSX was packed
     * with Opus audio, decode it with the Web Audio API instead.
     */
    get_audio(path: string): Uint8Array | undefined;
    /**
     * Returns `true` if the path exists in the bundle.
     */
    has(path: string): boolean;
    /**
     * All asset + audio paths in the bundle.
     */
    list(): string[];
    /**
     * All aliases in a bmap category.
     */
    list_category(category: string): string[];
    /**
     * Returns the last error message as a string (call after from_bytes returns null).
     */
    static open_error(data: Uint8Array): string;
    /**
     * O(1) string lookup by index. Requires `unlock_strings(key)` first.
     */
    string(index: number): string | undefined;
    /**
     * Number of strings in the pool. Returns 0 if not unlocked.
     */
    string_count(): number;
    /**
     * Decrypt and unlock the string pool. Returns `true` on success.
     */
    unlock_strings(key: string): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_bsxreader_free: (a: number, b: number) => void;
    readonly bsxreader_from_bytes: (a: number, b: number) => number;
    readonly bsxreader_open_error: (a: number, b: number, c: number) => void;
    readonly bsxreader_list: (a: number, b: number) => void;
    readonly bsxreader_categories: (a: number, b: number) => void;
    readonly bsxreader_list_category: (a: number, b: number, c: number, d: number) => void;
    readonly bsxreader_banks: (a: number, b: number) => void;
    readonly bsxreader_has: (a: number, b: number, c: number) => number;
    readonly bsxreader_get: (a: number, b: number, c: number) => number;
    readonly bsxreader_get_alias: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly bsxreader_unlock_strings: (a: number, b: number, c: number) => number;
    readonly bsxreader_string: (a: number, b: number, c: number) => void;
    readonly bsxreader_string_count: (a: number) => number;
    readonly bsxreader_get_audio: (a: number, b: number, c: number) => number;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export2: (a: number, b: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
