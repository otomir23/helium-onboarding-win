<script lang="ts">
    import { setDefaultEngine } from "../lib/browser";

    type Props = {
        name: string;
        desc: string;
        iconPath: string;
        modelIndex: number;
        isDefault: boolean;
    };

    let { name, desc, iconPath, modelIndex, isDefault }: Props = $props();
</script>

<button
    class="big"
    class:selected={isDefault}
    onclick={() => {
        setDefaultEngine(modelIndex);
    }}
>
    <div>
        <img
            class="engine-icon"
            width="32"
            height="32"
            src={iconPath}
            alt="{name} logo"
        />
    </div>
    <div class="engine-text">
        <h4>{name}</h4>
        <p>{desc}</p>
    </div>
</button>

<style>
    button {
        gap: 18px;
        max-width: 600px;
    }

    .engine-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .engine-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
    }
</style>
