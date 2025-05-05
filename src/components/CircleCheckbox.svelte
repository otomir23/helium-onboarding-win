<script lang="ts">
    import IconCheck from "../icons/tabler/IconCheck.svelte";

    type Props = {
        checked: boolean;
    };

    const { checked }: Props = $props();
</script>

<div class="circle-checkbox" class:checked>
    <IconCheck />
</div>

<style>
    .circle-checkbox {
        height: 28px;
        width: 28px;
        min-height: 28px;
        min-width: 28px;
        border-radius: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--helium-elevated-20);

        & > :global(svg) {
            width: 21px;
            height: 21px;
            opacity: 0;
        }

        &.checked {
            background-color: var(--helium-elevated-40);

            & > :global(svg) {
                opacity: 1;
            }
        }
    }
</style>
