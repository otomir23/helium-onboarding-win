<script lang="ts">
    export let title: string;
    export let desc: string;
    export let enabled: boolean = false;
</script>

<button
    class="big"
    onclick={() => {
        enabled = !enabled;
    }}
>
    <div class="toggle-text">
        <h4>{title}</h4>
        <p>{desc}</p>
    </div>
    <div class="toggle" class:enabled>
        <div class="runner"></div>
    </div>
</button>

<style>
    .toggle-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .toggle {
        min-width: 48px;
        width: 48px;
        height: 28px;
        border-radius: 50px;

        background-color: var(--helium-elevated-30);

        transition: background-color 0.25s;

        & .runner {
            width: 22px;
            height: 22px;
            margin: 3px;
            background-color: var(--white);
            border-radius: 50px;
            will-change: transform;
            transition: transform 0.15s;
        }

        &.enabled {
            background-color: var(--helium-elevated-80);

            & .runner {
                transform: translateX(20px);
            }
        }
    }
</style>
