<script lang="ts">
    import { setPref } from "../lib/browser";
    import { preferences, type Preferences } from "../lib/browser";

    type Props = {
        name: string;
        desc: string;
        iconPath: string;
    };

    let { name, desc, iconPath }: Props = $props();
</script>

<button class="big">
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
