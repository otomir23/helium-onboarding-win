<script lang="ts">
    import type { Writable } from "svelte/store";

    type Props = {
        title: string;
        desc: string;
        state: Writable<boolean>;
        stateOption: boolean;
        Icon: ConstructorOfATypedSvelteComponent;
    };

    const { title, desc, state, stateOption, Icon }: Props = $props();
</script>

<button
    class="big"
    class:selected={$state === stateOption}
    aria-pressed={$state === stateOption}
    onclick={() => {
        $state = stateOption;
    }}
>
    <div class="icon-container" aria-hidden="true">
        <Icon />
    </div>
    <div class="text">
        <h4>{title}</h4>
        <p>{desc}</p>
    </div>
</button>

<style>
    button {
        gap: 18px;
        max-width: 600px;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .icon-container {
        display: flex;

        & > :global(svg) {
            width: 32px;
            height: 32px;
        }
    }
</style>
