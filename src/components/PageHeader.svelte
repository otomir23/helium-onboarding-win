<script lang="ts">
    export let title: string;
    export let subtitle: string;
    export let icon: ConstructorOfATypedSvelteComponent;
</script>

<div class="page-header">
    <div class="title">
        <svelte:component this={icon} />
        <h2>{title}</h2>
    </div>
    <p>{subtitle}</p>
</div>

<style>
    .page-header {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & p {
            font-size: 18px;
        }

        & .title {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;

            & > :global(svg) {
                height: 28px;
                width: 28px;
            }
        }
    }
</style>
