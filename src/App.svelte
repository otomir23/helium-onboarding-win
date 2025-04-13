<script lang="ts">
    import * as Browser from "./lib/browser";

    const prefs = Browser.getPrefs();
    let debug = "";

    const handleInput = async (event: Event) => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            try {
                await Browser.setPref(
                    target.name as Browser.PrefKey,
                    target.type === "checkbox" ? target.checked : target.value
                );
                debug += `setPref succeeded on ${target.name}\n`;
            } catch (e) {
                debug += `err: ${e}\n`;
            }
        }
    };
</script>

<main>
    {#await prefs}
        loading prefs...
    {:then prefs}
        {#each Object.entries(prefs) as [pref, val]}
            <div>
                {#if typeof val === "boolean"}
                    <input
                        type="checkbox"
                        name={pref}
                        checked={val}
                        on:change={handleInput}
                    />
                    {pref}
                {:else if typeof val === "string"}
                    {pref}
                    <input
                        type="text"
                        name={pref}
                        value={val}
                        on:change={handleInput}
                    />
                {/if}
            </div>
        {/each}
    {/await}
    <textarea>{debug}</textarea>
</main>

<style>
    textarea {
        display: block;
        width: 800px;
        height: 320px;
        margin-top: 1em;
    }

    * {
        padding: 0.5em;
    }
</style>
